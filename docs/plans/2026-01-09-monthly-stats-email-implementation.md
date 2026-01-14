# Monthly Stats Email Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Send users a monthly recap email on the 1st of each month with task stats, reliability trends, time-saved reveals, and roasts matching their spicy level.

**Architecture:** Add `spicy_level` to profiles table, migrate localStorage values, create Edge Function triggered by pg_cron that calculates stats and sends HTML emails via Resend.

**Tech Stack:** Supabase (Postgres, Edge Functions, pg_cron), Resend API, TypeScript/Deno, React

---

### Task 1: Database Migration - Add spicy_level to profiles

**Files:**
- Create: `supabase/migrations/20260109100000_add_spicy_level.sql`
- Modify: `src/lib/database.types.ts:15-51`

**Step 1: Create the migration file**

```sql
-- Add spicy_level column to profiles
ALTER TABLE profiles ADD COLUMN spicy_level integer DEFAULT 3;

-- Add constraint to ensure valid range
ALTER TABLE profiles ADD CONSTRAINT spicy_level_range CHECK (spicy_level >= 1 AND spicy_level <= 5);

-- Create monthly_stats_log table for deduplication
CREATE TABLE monthly_stats_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  month_year text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month_year)
);

-- Enable RLS
ALTER TABLE monthly_stats_log ENABLE ROW LEVEL SECURITY;

-- Users can only see their own logs
CREATE POLICY "Users can view own stats log" ON monthly_stats_log
  FOR SELECT USING (auth.uid() = user_id);
```

**Step 2: Update database.types.ts**

Add to `profiles.Row`:
```typescript
spicy_level: number
```

Add to `profiles.Insert`:
```typescript
spicy_level?: number
```

Add to `profiles.Update`:
```typescript
spicy_level?: number
```

Add new table type:
```typescript
monthly_stats_log: {
  Row: {
    id: string
    user_id: string
    month_year: string
    sent_at: string
  }
  Insert: {
    id?: string
    user_id: string
    month_year: string
    sent_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    month_year?: string
    sent_at?: string
  }
}
```

**Step 3: Run migration locally**

Run: `supabase db push`
Expected: Migration applied successfully

**Step 4: Commit**

```bash
git add supabase/migrations/20260109100000_add_spicy_level.sql src/lib/database.types.ts
git commit -m "feat: add spicy_level column and monthly_stats_log table"
```

---

### Task 2: Update useProfile hook and Profile type

**Files:**
- Modify: `src/hooks/useProfile.ts:8-19`

**Step 1: Add spicy_level to Profile interface**

Update the Profile interface to include:
```typescript
spicy_level: number
```

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/hooks/useProfile.ts
git commit -m "feat: add spicy_level to Profile type"
```

---

### Task 3: Migrate localStorage spicy_level to database

**Files:**
- Modify: `src/pages/TaskListPage.tsx:42-56`

**Step 1: Update the spicy level loading effect**

Replace the localStorage loading with DB-first approach that migrates:

```typescript
// Load spicy level - migrate from localStorage to DB if needed
useEffect(() => {
  if (user && profile) {
    const localKey = `${SPICY_LEVEL_KEY}-${user.id}`
    const localValue = localStorage.getItem(localKey)

    if (localValue && profile.spicy_level === 3) {
      // Migrate localStorage value to database
      const level = Number(localValue)
      if (level >= 1 && level <= 5) {
        updateProfile({ spicy_level: level })
        setSpicyLevel(level)
      }
      localStorage.removeItem(localKey)
    } else {
      // Use database value
      setSpicyLevel(profile.spicy_level)
    }
  }
}, [user, profile, updateProfile])
```

**Step 2: Update handleSpicySave to save to database**

```typescript
const handleSpicySave = async (level: number) => {
  setSpicyLevel(level)
  await updateProfile({ spicy_level: level })
}
```

**Step 3: Verify app loads correctly**

Run: `npm run dev`
Expected: App loads, spicy level persists across refresh

**Step 4: Commit**

```bash
git add src/pages/TaskListPage.tsx
git commit -m "feat: migrate spicy_level from localStorage to database"
```

---

### Task 4: Create email template generator

**Files:**
- Create: `supabase/functions/_shared/email-templates.ts`

**Step 1: Create the shared email template module**

```typescript
// ABOUTME: HTML email templates for monthly stats.
// ABOUTME: Generates content based on stats and spicy level.

export interface MonthlyStats {
  month: string // "January 2026"
  tasksCreated: number
  tasksCompleted: number
  tasksMissed: number
  completionRate: number // 0-100
  reliabilityStart: number
  reliabilityEnd: number
  reliabilityChange: number
  totalBufferHours: number // actual time saved
  perceivedCloseCallCount: number // times they thought they were cutting it close
  worstExcuses: Array<{ text: string; length: number }>
  userName: string
}

const SUBJECT_LINES: Record<number, (month: string) => string> = {
  1: (m) => `Your ${m} stats are in`,
  2: (m) => `${m} recap: Here's how you did`,
  3: (m) => `${m} Report: Tick has thoughts`,
  4: (m) => `${m} DEBRIEF: We need to discuss this`,
  5: (m) => `${m.toUpperCase()} IS OVER AND WE NEED TO TALK`,
}

function getCompletionRoast(rate: number, spicy: number): string {
  if (rate === 100) {
    const roasts: Record<number, string> = {
      1: "Perfect month! Well done!",
      2: "100%! Color us impressed.",
      3: "Perfect score. Who are you and what have you done with the usual mess?",
      4: "100%?! EXCUSE ME?? Is this a bit??",
      5: "100%??? I DON'T BELIEVE IT. SHOW ME THE RECEIPTS. ACTUALLY DON'T I'M SCARED.",
    }
    return roasts[spicy]
  }
  if (rate >= 80) {
    const roasts: Record<number, string> = {
      1: "Solid month! Keep it up.",
      2: "Pretty good! Room for a little improvement.",
      3: "Not bad. Tick is cautiously optimistic.",
      4: "DECENT. Could be better but Tick won't yell. Much.",
      5: "OKAY FINE THIS IS ACCEPTABLE. BARELY. DON'T GET COMFORTABLE.",
    }
    return roasts[spicy]
  }
  if (rate >= 50) {
    const roasts: Record<number, string> = {
      1: "Room for improvement next month!",
      2: "Half and half. We believe in you.",
      3: "Fifty-fifty. Tick is watching.",
      4: "HALF?? Just HALF?? We need to talk.",
      5: "COIN FLIP PRODUCTIVITY. ARE YOU EVEN TRYING??",
    }
    return roasts[spicy]
  }
  // Below 50%
  const roasts: Record<number, string> = {
    1: "Tough month. Tomorrow is a fresh start!",
    2: "We've seen better months from you.",
    3: "Less than half. Tick is taking notes.",
    4: "LESS THAN HALF?? In THIS economy??",
    5: "ABSOLUTELY UNHINGED BEHAVIOR. I'M TELLING EVERYONE.",
  }
  return roasts[spicy]
}

function getReliabilityComment(change: number, spicy: number): string {
  if (change > 0) {
    return spicy >= 4 ? `UP ${change} POINTS. SUSPICIOUS BUT OKAY.` : `Up ${change} points. Nice work.`
  }
  if (change < 0) {
    return spicy >= 4 ? `DOWN ${Math.abs(change)} POINTS. TICK IS DISAPPOINTED.` : `Down ${Math.abs(change)} points. Let's turn that around.`
  }
  return spicy >= 4 ? "NO CHANGE. STAGNANT. CONCERNING." : "Held steady."
}

function getTimeSavedReveal(buffer: number, closeCalls: number, spicy: number): string {
  if (closeCalls === 0) {
    return spicy >= 4
      ? "YOU DIDN'T PANIC ONCE. ARE YOU EVEN HUMAN??"
      : "No close calls this month. Suspiciously calm."
  }
  const hours = Math.round(buffer)
  if (spicy >= 4) {
    return `YOU THOUGHT YOU WERE CUTTING IT CLOSE ${closeCalls} TIMES. YOU ACTUALLY HAD ${hours} HOURS OF BUFFER. YOU'RE WELCOME.`
  }
  return `You thought you were cutting it close ${closeCalls} times. You actually had ${hours} hours of buffer total. You're welcome.`
}

function getExcuseSection(excuses: Array<{ text: string; length: number }>, spicy: number): string {
  if (excuses.length === 0) {
    return spicy >= 4
      ? "<p>ZERO EXCUSES. SUSPICIOUS. ARE YOU OKAY??</p>"
      : "<p>No excuses this month. Impressive... or concerning.</p>"
  }

  const header = spicy >= 4 ? "EXCUSE HALL OF SHAME" : "Excuse Hall of Shame"
  const intro = spicy >= 4
    ? "YOUR LAZIEST ATTEMPTS AT JUSTIFICATION:"
    : "Your laziest excuses this month:"

  const list = excuses.map((e, i) => {
    const rank = i + 1
    return `<li>"${e.text}" <span style="color: #9F8BA3;">(${e.length} chars${e.length === 10 ? ' - THE BARE MINIMUM' : ''})</span></li>`
  }).join('')

  return `
    <h3 style="color: #2D2D2D; margin-top: 24px;">${header}</h3>
    <p style="color: #9F8BA3;">${intro}</p>
    <ol style="color: #2D2D2D;">${list}</ol>
  `
}

export function generateSubject(stats: MonthlyStats, spicyLevel: number): string {
  return SUBJECT_LINES[spicyLevel](stats.month)
}

export function generateEmailHtml(stats: MonthlyStats, spicyLevel: number): string {
  const isUnhinged = spicyLevel >= 4
  const completionRoast = getCompletionRoast(stats.completionRate, spicyLevel)
  const reliabilityComment = getReliabilityComment(stats.reliabilityChange, spicyLevel)
  const timeSaved = getTimeSavedReveal(stats.totalBufferHours, stats.perceivedCloseCallCount, spicyLevel)
  const excuseSection = getExcuseSection(stats.worstExcuses, spicyLevel)

  const greeting = isUnhinged
    ? `${stats.userName.toUpperCase()}. WE NEED TO TALK.`
    : `Hey ${stats.userName}, here's your ${stats.month} recap.`

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F5F0F7; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 32px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="font-family: 'Press Start 2P', monospace; font-size: 18px; color: #2D2D2D; margin: 0;">
        ${isUnhinged ? "TICK'D MONTHLY REPORT" : "Tick'd Monthly Report"}
      </h1>
      <p style="color: #9F8BA3; margin-top: 8px;">${stats.month}</p>
    </div>

    <!-- Greeting -->
    <p style="color: #2D2D2D; font-size: 16px;">${greeting}</p>

    <!-- Task Summary -->
    <div style="background: #F5F0F7; border-radius: 12px; padding: 20px; margin: 20px 0;">
      <h2 style="color: #2D2D2D; margin: 0 0 12px 0; font-size: 16px;">
        ${isUnhinged ? "THE DAMAGE REPORT" : "Task Summary"}
      </h2>
      <p style="font-size: 32px; font-weight: bold; color: #FF6B9D; margin: 0;">
        ${stats.tasksCompleted}/${stats.tasksCreated} tasks
      </p>
      <p style="color: #9F8BA3; margin: 8px 0 0 0;">
        ${stats.completionRate}% completion rate
        ${stats.tasksMissed > 0 ? ` • ${stats.tasksMissed} missed` : ''}
      </p>
    </div>

    <!-- Tick's Take -->
    <p style="color: #2D2D2D; font-size: 16px; font-style: italic; background: #FFF5E6; padding: 16px; border-radius: 8px; border-left: 4px solid #FFB347;">
      "${completionRoast}"
    </p>

    <!-- Reliability Score -->
    <h3 style="color: #2D2D2D; margin-top: 24px;">${isUnhinged ? "RELIABILITY CHECK" : "Reliability Score"}</h3>
    <p style="color: #2D2D2D;">
      <span style="font-size: 24px; font-weight: bold;">${stats.reliabilityStart}%</span>
      <span style="color: #9F8BA3;"> → </span>
      <span style="font-size: 24px; font-weight: bold;">${stats.reliabilityEnd}%</span>
      <span style="color: ${stats.reliabilityChange >= 0 ? '#4CAF50' : '#FF6B9D'};">
        (${stats.reliabilityChange >= 0 ? '+' : ''}${stats.reliabilityChange})
      </span>
    </p>
    <p style="color: #9F8BA3;">${reliabilityComment}</p>

    <!-- Time Saved Reveal -->
    <h3 style="color: #2D2D2D; margin-top: 24px;">${isUnhinged ? "THE BIG REVEAL" : "Time Saved"}</h3>
    <p style="color: #2D2D2D;">${timeSaved}</p>

    <!-- Excuse Hall of Shame -->
    ${excuseSection}

    <!-- Footer -->
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E8E0ED; text-align: center;">
      <p style="color: #9F8BA3; font-size: 14px;">
        <a href="https://tick-d.com" style="color: #FF6B9D; text-decoration: none;">Open Tick'd</a>
        ${isUnhinged ? " • DON'T MAKE ME SEND ANOTHER ONE OF THESE" : ""}
      </p>
      <p style="color: #C4B8C9; font-size: 12px; margin-top: 12px;">
        You're receiving this because you have email notifications enabled.
        <br>Manage preferences in Settings.
      </p>
    </div>

  </div>
</body>
</html>
  `
}

export function generatePlainText(stats: MonthlyStats, spicyLevel: number): string {
  const isUnhinged = spicyLevel >= 4
  const completionRoast = getCompletionRoast(stats.completionRate, spicyLevel)

  return `
${isUnhinged ? "TICK'D MONTHLY REPORT" : "Tick'd Monthly Report"}
${stats.month}

${isUnhinged ? `${stats.userName.toUpperCase()}. WE NEED TO TALK.` : `Hey ${stats.userName}, here's your ${stats.month} recap.`}

${isUnhinged ? "THE DAMAGE REPORT" : "Task Summary"}
${stats.tasksCompleted}/${stats.tasksCreated} tasks (${stats.completionRate}%)
${stats.tasksMissed > 0 ? `${stats.tasksMissed} missed` : ''}

"${completionRoast}"

Reliability: ${stats.reliabilityStart}% → ${stats.reliabilityEnd}% (${stats.reliabilityChange >= 0 ? '+' : ''}${stats.reliabilityChange})

${getTimeSavedReveal(stats.totalBufferHours, stats.perceivedCloseCallCount, spicyLevel)}

${stats.worstExcuses.length > 0 ? `Laziest excuses:\n${stats.worstExcuses.map((e, i) => `${i + 1}. "${e.text}" (${e.length} chars)`).join('\n')}` : ''}

---
Open Tick'd: https://tick-d.com
  `.trim()
}
```

**Step 2: Commit**

```bash
git add supabase/functions/_shared/email-templates.ts
git commit -m "feat: add monthly stats email templates"
```

---

### Task 5: Create send-monthly-stats Edge Function

**Files:**
- Create: `supabase/functions/send-monthly-stats/index.ts`

**Step 1: Create the Edge Function**

```typescript
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
  was_on_time: boolean | null
  created_at: string
}

interface Excuse {
  id: string
  user_id: string
  excuse_text: string
  created_at: string
}

function getMonthDateRange(date: Date): { start: Date; end: Date; monthName: string } {
  // Get previous month
  const year = date.getMonth() === 0 ? date.getFullYear() - 1 : date.getFullYear()
  const month = date.getMonth() === 0 ? 11 : date.getMonth() - 1

  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999)

  const monthName = start.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return { start, end, monthName }
}

function calculateFakeDueDate(realDueDate: Date, reliabilityScore: number): Date {
  const now = Date.now()
  const realDueMs = realDueDate.getTime()
  const msRemaining = realDueMs - now
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
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else if (daysRemaining > 0) {
    const targetHours = 1 + (reliabilityScore / 100) * 5
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else {
    fakeDueMs = realDueMs
  }

  if (fakeDueMs < now && realDueMs > now) {
    fakeDueMs = now + MS_IN_HOUR
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
        from: 'Tick <tick@updates.tick-d.com>',
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

    // Get all users with email notifications enabled
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, email, reliability_score, spicy_level, notification_preferences')
      .or('notification_preferences.eq.email,notification_preferences.eq.both')

    if (profilesError || !profiles) {
      console.error('Failed to fetch profiles:', profilesError)
      return new Response(JSON.stringify({ error: 'Failed to fetch profiles' }), { status: 500 })
    }

    // Check which users already received this month's email
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

    // Fetch all tasks for the month
    const { data: tasks } = await supabase
      .from('tasks')
      .select('*')
      .in('user_id', userIds)
      .gte('created_at', start.toISOString())
      .lte('created_at', end.toISOString())

    // Fetch all excuses for the month
    const { data: excuses } = await supabase
      .from('excuses')
      .select('*')
      .in('user_id', userIds)
      .gte('created_at', start.toISOString())
      .lte('created_at', end.toISOString())

    // Group by user
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

      // Calculate stats
      const tasksCreated = userTasks.length
      const tasksCompleted = userTasks.filter((t: Task) => t.status === 'completed').length
      const tasksMissed = userTasks.filter((t: Task) =>
        t.status !== 'completed' && new Date(t.real_due_date) < now
      ).length
      const completionRate = tasksCreated > 0 ? Math.round((tasksCompleted / tasksCreated) * 100) : 0

      // Calculate time saved (buffer hours)
      let totalBufferHours = 0
      let perceivedCloseCallCount = 0

      for (const task of userTasks.filter((t: Task) => t.status === 'completed' && t.completed_at)) {
        const realDue = new Date(task.real_due_date)
        const completedAt = new Date(task.completed_at!)
        const fakeDue = calculateFakeDueDate(realDue, profile.reliability_score)

        // Actual buffer: real due - completed
        const actualBufferMs = realDue.getTime() - completedAt.getTime()
        if (actualBufferMs > 0) {
          totalBufferHours += actualBufferMs / MS_IN_HOUR
        }

        // Perceived close call: if fake due was within 24 hours of completion
        const perceivedBufferMs = fakeDue.getTime() - completedAt.getTime()
        if (perceivedBufferMs < 24 * MS_IN_HOUR && perceivedBufferMs > -24 * MS_IN_HOUR) {
          perceivedCloseCallCount++
        }
      }

      // Get worst (shortest) excuses
      const worstExcuses = userExcuses
        .map((e: Excuse) => ({ text: e.excuse_text, length: e.excuse_text.length }))
        .sort((a, b) => a.length - b.length)
        .slice(0, 3)

      // Get user's name from email
      const userName = profile.email.split('@')[0]

      const stats: MonthlyStats = {
        month: monthName,
        tasksCreated,
        tasksCompleted,
        tasksMissed,
        completionRate,
        reliabilityStart: profile.reliability_score, // Simplified: use current score
        reliabilityEnd: profile.reliability_score,
        reliabilityChange: 0, // Would need historical tracking for accurate change
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
```

**Step 2: Commit**

```bash
git add supabase/functions/send-monthly-stats/index.ts
git commit -m "feat: add send-monthly-stats Edge Function"
```

---

### Task 6: Deploy and test

**Step 1: Deploy the Edge Function**

Run: `supabase functions deploy send-monthly-stats --no-verify-jwt`
Expected: Function deployed successfully

**Step 2: Deploy the migration**

Run: `supabase db push`
Expected: Migration applied

**Step 3: Test manually (optional)**

Run: `curl -X POST https://<project>.supabase.co/functions/v1/send-monthly-stats`
Expected: Returns JSON with emailsSent count

**Step 4: Commit any final changes and push**

```bash
git push origin main
```

---

### Task 7: Add pg_cron schedule (manual step)

**Note:** pg_cron scheduling needs to be configured in the Supabase dashboard or via SQL.

Run this SQL in Supabase SQL Editor:

```sql
-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule monthly stats email for 1st of month at 9am UTC
SELECT cron.schedule(
  'monthly-stats-email',
  '0 9 1 * *',
  $$
  SELECT net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/send-monthly-stats',
    headers := '{"Authorization": "Bearer <service-role-key>"}'::jsonb
  );
  $$
);
```

Replace `<project-ref>` and `<service-role-key>` with actual values.

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Database migration | migration, database.types.ts |
| 2 | Update Profile type | useProfile.ts |
| 3 | Migrate localStorage to DB | TaskListPage.tsx |
| 4 | Email templates | _shared/email-templates.ts |
| 5 | Edge Function | send-monthly-stats/index.ts |
| 6 | Deploy & test | CLI commands |
| 7 | pg_cron schedule | SQL in dashboard |
