// ABOUTME: Supabase Edge Function for sending scheduled notifications.
// ABOUTME: Called hourly by pg_cron to check and send due notifications.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const MS_IN_HOUR = 1000 * 60 * 60
const MS_IN_DAY = MS_IN_HOUR * 24
const HOURS_IN_DAY = 24

interface Task {
  id: string
  user_id: string
  title: string
  real_due_date: string
  status: string
}

interface Profile {
  id: string
  email: string
  reliability_score: number
  theme: 'hinged' | 'unhinged'
  notification_preferences: string
}

interface PushSubscription {
  user_id: string
  endpoint: string
  p256dh_key: string
  auth_key: string
}

type NotificationTier = '4_day' | '1_day' | 'day_of' | 'overdue'

/**
 * Calculates the fake due date shown to the user based on their reliability score.
 * Lower reliability = more aggressive fake deadlines to account for procrastination.
 */
function calculateFakeDueDate(realDueDate: Date, reliabilityScore: number): Date {
  const now = Date.now()
  const realDueMs = realDueDate.getTime()
  const msRemaining = realDueMs - now
  const daysRemaining = msRemaining / MS_IN_DAY
  const lieMultiplier = 1 - (reliabilityScore / 100)

  let fakeDueMs: number

  if (daysRemaining > 7) {
    // Far away - show real date
    fakeDueMs = realDueMs
  } else if (daysRemaining > 4) {
    // A week out - shave off 0.5 to 1.5 days based on reliability
    const shaveMs = MS_IN_DAY * (0.5 + lieMultiplier)
    fakeDueMs = realDueMs - shaveMs
  } else if (daysRemaining > 2) {
    // Getting closer - shave 30-50% of remaining time
    const shavePercent = 0.3 + (lieMultiplier * 0.2)
    fakeDueMs = realDueMs - (msRemaining * shavePercent)
  } else if (daysRemaining > 1) {
    // Tomorrow-ish - compress to 12-18 hours based on reliability
    const targetHours = 12 + (reliabilityScore / 100) * 6
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else if (daysRemaining > 0) {
    // Today - compress to 1-6 hours based on reliability
    const targetHours = 1 + (reliabilityScore / 100) * 5
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else {
    // Already past due - show real date
    fakeDueMs = realDueMs
  }

  // Safety: never show fake date in the past if real date is in the future
  if (fakeDueMs < now && realDueMs > now) {
    fakeDueMs = now + MS_IN_HOUR
  }

  return new Date(fakeDueMs)
}

/**
 * Determines which notification tier a task falls into based on fake due date.
 * Returns null if no notification should be sent yet.
 */
function getNotificationTier(fakeDueDate: Date): NotificationTier | null {
  const now = Date.now()
  const msRemaining = fakeDueDate.getTime() - now
  const hoursRemaining = msRemaining / MS_IN_HOUR
  const daysRemaining = hoursRemaining / HOURS_IN_DAY

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 24) return 'day_of'
  if (daysRemaining < 2) return '1_day'
  if (daysRemaining < 5) return '4_day'
  return null
}

/**
 * Generates notification message based on tier and user's theme preference.
 * Unhinged theme is more dramatic and ALL CAPS.
 */
function getMessage(
  tier: NotificationTier,
  theme: 'hinged' | 'unhinged',
  taskTitle: string
): { title: string; body: string } {
  const title = taskTitle.length > 30 ? taskTitle.substring(0, 27) + '...' : taskTitle
  const displayTitle = theme === 'unhinged' ? title.toUpperCase() : title

  const messages = {
    hinged: {
      '4_day': { title: 'Tick Reminder', body: `${displayTitle} is coming up in 4 days` },
      '1_day': { title: 'Tick Reminder', body: `${displayTitle} is due tomorrow` },
      day_of: { title: 'Tick Reminder', body: `${displayTitle} is due today` },
      overdue: { title: 'Tick Reminder', body: `${displayTitle} is now overdue` },
    },
    unhinged: {
      '4_day': { title: 'TICK SAYS', body: `4 DAYS. ${displayTitle}. TICK TOCK.` },
      '1_day': { title: 'TICK SAYS', body: `TOMORROW. ${displayTitle}. HELLO??` },
      day_of: { title: 'TICK SAYS', body: `TODAY. ${displayTitle}. WHY ARE YOU LIKE THIS.` },
      overdue: { title: 'TICK SAYS', body: `${displayTitle} IS OVERDUE. I AM NOT MAD. (I AM MAD.)` },
    },
  }
  return messages[theme][tier]
}

/**
 * Sends an email notification via Resend API.
 */
async function sendEmail(to: string, subject: string, body: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Tick <tick@updates.liars.todo>',
        to: [to],
        subject,
        text: body,
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

    // Get all pending tasks
    const { data: tasks, error: tasksError } = await supabase
      .from('tasks')
      .select('id, user_id, title, real_due_date, status')
      .eq('status', 'pending')

    if (tasksError || !tasks) {
      console.error('Failed to fetch tasks:', tasksError)
      return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), { status: 500 })
    }

    if (tasks.length === 0) {
      return new Response(
        JSON.stringify({ success: true, notificationsSent: 0, message: 'No pending tasks' }),
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Get unique user IDs
    const userIds = [...new Set(tasks.map((t: Task) => t.user_id))]

    // Get profiles for all users
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email, reliability_score, theme, notification_preferences')
      .in('id', userIds)

    const profileMap = new Map<string, Profile>()
    profiles?.forEach((p: Profile) => profileMap.set(p.id, p))

    // Get push subscriptions
    const { data: subscriptions } = await supabase
      .from('push_subscriptions')
      .select('user_id, endpoint, p256dh_key, auth_key')
      .in('user_id', userIds)

    const subscriptionMap = new Map<string, PushSubscription[]>()
    subscriptions?.forEach((s: PushSubscription) => {
      const existing = subscriptionMap.get(s.user_id) || []
      existing.push(s)
      subscriptionMap.set(s.user_id, existing)
    })

    // Check for active postponements (excuses)
    const { data: activeExcuses, error: excusesError } = await supabase
      .from('excuses')
      .select('task_id, postponed_until')
      .gt('postponed_until', new Date().toISOString())

    if (excusesError) {
      console.error('Failed to fetch excuses:', excusesError)
    }

    const postponedTasks = new Set(activeExcuses?.map((e: { task_id: string }) => e.task_id) || [])

    // Batch fetch notification logs for all tasks to avoid N+1 queries
    const taskIds = tasks.map((t: Task) => t.id)

    const { data: allLogs, error: logsError } = await supabase
      .from('notification_log')
      .select('task_id, notification_type, sent_at')
      .in('task_id', taskIds)

    if (logsError) {
      console.error('Failed to fetch notification logs:', logsError)
    }

    // Build lookup maps for O(1) access
    const oneTimeLogsSet = new Set<string>() // "taskId:tier" for one-time notifications
    const recentLogsMap = new Map<string, Date>() // "taskId:tier" -> most recent sent_at

    allLogs?.forEach((log: { task_id: string; notification_type: string; sent_at: string }) => {
      const key = `${log.task_id}:${log.notification_type}`
      if (log.notification_type === '4_day' || log.notification_type === '1_day') {
        oneTimeLogsSet.add(key)
      }
      // Track most recent for cooldown checks
      const existingDate = recentLogsMap.get(key)
      const logDate = new Date(log.sent_at)
      if (!existingDate || logDate > existingDate) {
        recentLogsMap.set(key, logDate)
      }
    })

    let notificationsSent = 0

    for (const task of tasks) {
      // Skip postponed tasks
      if (postponedTasks.has(task.id)) continue

      const profile = profileMap.get(task.user_id)
      if (!profile || profile.notification_preferences === 'none') continue

      // Validate email before proceeding
      if (!profile.email || !profile.email.includes('@')) {
        console.warn(`Invalid email for user ${task.user_id}`)
        continue
      }

      const fakeDueDate = calculateFakeDueDate(new Date(task.real_due_date), profile.reliability_score)
      const tier = getNotificationTier(fakeDueDate)
      if (!tier) continue

      // Check if already sent this tier (for 4_day and 1_day which are one-time)
      if ((tier === '4_day' || tier === '1_day') && oneTimeLogsSet.has(`${task.id}:${tier}`)) {
        continue
      }

      // For day_of and overdue, check cooldown period using O(1) lookup
      if (tier === 'day_of' || tier === 'overdue') {
        const cooldownHours = tier === 'overdue' ? 1 : 3
        const lastSent = recentLogsMap.get(`${task.id}:${tier}`)
        if (lastSent && Date.now() - lastSent.getTime() < cooldownHours * MS_IN_HOUR) {
          continue
        }
      }

      const message = getMessage(tier, profile.theme, task.title)
      const prefs = profile.notification_preferences

      // Send email (only for 4_day and 1_day tiers to avoid spam)
      if ((prefs === 'email' || prefs === 'both') && (tier === '4_day' || tier === '1_day')) {
        const emailBody = `${message.body}\n\nView your tasks: https://liars.todo\n\n- Tick`
        const success = await sendEmail(profile.email, `${message.title}: ${task.title}`, emailBody)
        if (success) {
          const { error: logError } = await supabase.from('notification_log').insert({
            task_id: task.id,
            user_id: task.user_id,
            notification_type: tier,
            channel: 'email',
          })
          if (logError) {
            console.error('Failed to log email notification:', logError)
          } else {
            notificationsSent++
          }
        }
      }

      // Log browser notification intent (actual push sending requires web-push library)
      // Browser push implementation will be completed in Task 11 with VAPID key setup
      if (prefs === 'browser' || prefs === 'both') {
        const userSubs = subscriptionMap.get(task.user_id) || []
        if (userSubs.length > 0) {
          // TODO: Implement actual web-push sending with VAPID keys in Task 11
          const { error: logError } = await supabase.from('notification_log').insert({
            task_id: task.id,
            user_id: task.user_id,
            notification_type: tier,
            channel: 'browser',
          })
          if (logError) {
            console.error('Failed to log browser notification:', logError)
          } else {
            notificationsSent++
          }
          console.log(`Would send browser push to ${profile.email}: ${message.body}`)
        }
      }
    }

    return new Response(JSON.stringify({ success: true, notificationsSent }), {
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
