// ABOUTME: Sends monthly stats emails to all users.
// ABOUTME: Triggered by pg_cron on 1st of each month at 9am UTC.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { generateSubject, generateEmailHtml, generatePlainText, type MonthlyStats } from '../_shared/email-templates.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const MS_IN_HOUR = 1000 * 60 * 60

interface Profile {
  id: string
  email: string
  reliability_score: number
  spicy_level: number
  notification_preferences: string
}

interface Task {
  id: string
  user_id: string
  title: string
  real_due_date: string
  status: string
  completed_at: string | null
  created_at: string
}

interface Excuse {
  id: string
  user_id: string
  excuse_text: string
  created_at: string
}

function getMonthDateRange(date: Date): { start: Date; end: Date; monthName: string } {
  const year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()
  const month = date.getMonth() === 0 ? 11 : date.getMonth() - 1
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999)
  const monthName = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  return { start, end, monthName }
}

function calculateFakeDueDate(realDueDate: Date, reliabilityScore: number, completedAt: Date): Date {
  const realDueMs = realDueDate.getTime()
  const completedMs = completedAt.getTime()
  const msRemaining = realDueMs - completedMs
  const daysRemaining = msRemaining / (MS_IN_HOUR * 24)
  const lieMultiplier = 1 - (reliabilityScore / 100)

  let fakeDueMs: number

  if (daysRemaining > 7) {
    fakeDueMs = realDueMs
  } else if (daysRemaining > 4) {
    const shaveMs = MS_IN_HOUR * 24 * (0.5 + lieMultiplier)
    fakeDueMs = realDueMs - shaveMs
  } else if (daysRemaining > 2) {
    const shavePercent = 0.3 + (lieMultiplier * 0.2)
    fakeDueMs = realDueMs - (msRemaining * shavePercent)
  } else if (daysRemaining > 1) {
    const targetHours = 12 + (reliabilityScore / 100) * 6
    fakeDueMs = completedMs + (targetHours * MS_IN_HOUR)
  } else if (daysRemaining > 0) {
    const targetHours = 1 + (reliabilityScore / 100) * 5
    fakeDueMs = completedMs + (targetHours * MS_IN_HOUR)
  } else {
    fakeDueMs = realDueMs
  }

  return new Date(fakeDueMs)
}

async function sendEmail(to: string, subject: string, html: string, text: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tick <tick@tick-d.com>',
        to: [to],
        subject,
        html,
        text,
      }),
    })
    return response.ok
  } catch (err) {
    console.error('Failed to send email:', err)
    return false
  }
}

serve(async (_req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    const now = new Date()
    const { start, end, monthName } = getMonthDateRange(now)
    const monthYear = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`

    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, reliability_score, spicy_level, notification_preferences')
      .or('notification_preferences.eq.email,notification_preferences.eq.both')

    if (profilesError || !profiles) {
      console.error('Failed to fetch profiles:', profilesError)
      return new Response(JSON.stringify({ error: 'Failed to fetch profiles' }), { status: 500 })
    }

    const { data: sentLogs } = await supabase
      .from('monthly_stats_log')
      .select('user_id')
      .eq('month_year', monthYear)

    const alreadySent = new Set(sentLogs?.map(l => l.user_id) || [])
    const eligibleProfiles = profiles.filter((p: Profile) => !alreadySent.has(p.id))

    if (eligibleProfiles.length === 0) {
      return new Response(JSON.stringify({ success: true, emailsSent: 0, message: 'No eligible users' }), {
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const userIds = eligibleProfiles.map((p: Profile) => p.id)

    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .in('user_id', userIds)
      .gte('created_at', start.toISOString())
      .lte('created_at', end.toISOString())

    const { data: excuses } = await supabase
      .from('excuses')
      .select('*')
      .in('user_id', userIds)
      .gte('created_at', start.toISOString())
      .lte('created_at', end.toISOString())

    const tasksByUser = new Map<string, Task[]>()
    const excusesByUser = new Map<string, Excuse[]>()

    tasks?.forEach((t: Task) => {
      const existing = tasksByUser.get(t.user_id) || []
      existing.push(t)
      tasksByUser.set(t.user_id, existing)
    })

    excuses?.forEach((e: Excuse) => {
      const existing = excusesByUser.get(e.user_id) || []
      existing.push(e)
      excusesByUser.set(e.user_id, existing)
    })

    let emailsSent = 0

    for (const profile of eligibleProfiles) {
      const userTasks = tasksByUser.get(profile.id) || []
      const userExcuses = excusesByUser.get(profile.id) || []

      const tasksCreated = userTasks.length
      const tasksCompleted = userTasks.filter((t: Task) => t.status === 'completed').length
      const tasksMissed = userTasks.filter((t: Task) =>
        t.status !== 'completed' && new Date(t.real_due_date) < now
      ).length
      const completionRate = tasksCreated > 0 ? Math.round((tasksCompleted / tasksCreated) * 100) : 0

      let totalBufferHours = 0
      let perceivedCloseCallCount = 0

      for (const task of userTasks.filter((t: Task) => t.status === 'completed' && t.completed_at)) {
        const realDue = new Date(task.real_due_date)
        const completedAt = new Date(task.completed_at!)
        const fakeDue = calculateFakeDueDate(realDue, profile.reliability_score, completedAt)

        const actualBufferMs = realDue.getTime() - completedAt.getTime()
        if (actualBufferMs > 0) {
          totalBufferHours += actualBufferMs / MS_IN_HOUR
        }

        const perceivedBufferMs = fakeDue.getTime() - completedAt.getTime()
        if (perceivedBufferMs < 24 * MS_IN_HOUR && perceivedBufferMs > -24 * MS_IN_HOUR) {
          perceivedCloseCallCount++
        }
      }

      const worstExcuses = userExcuses
        .map((e: Excuse) => ({ text: e.excuse_text, length: e.excuse_text.length }))
        .sort((a, b) => a.length - b.length)
        .slice(0, 3)

      const userName = profile.email.split('@')[0]

      const stats: MonthlyStats = {
        month: monthName,
        tasksCreated,
        tasksCompleted,
        tasksMissed,
        completionRate,
        reliabilityStart: profile.reliability_score,
        reliabilityEnd: profile.reliability_score,
        reliabilityChange: 0,
        totalBufferHours: Math.round(totalBufferHours),
        perceivedCloseCallCount,
        worstExcuses,
        userName,
      }

      const subject = generateSubject(stats, profile.spicy_level)
      const html = generateEmailHtml(stats, profile.spicy_level)
      const text = generatePlainText(stats, profile.spicy_level)

      const success = await sendEmail(profile.email, subject, html, text)

      if (success) {
        await supabase.from('monthly_stats_log').insert({
          user_id: profile.id,
          month_year: monthYear,
        })
        emailsSent++
      }
    }

    return new Response(JSON.stringify({ success: true, emailsSent }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
