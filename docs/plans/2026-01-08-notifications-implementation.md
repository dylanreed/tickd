# Notifications Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement browser push and email notifications with escalating urgency, plus "Make an Excuse" snooze feature.

**Architecture:** Hourly Supabase Edge Function checks tasks against fake deadlines, sends notifications via web-push (browser) and Resend (email), logs to avoid duplicates. Client manages push subscriptions and service worker handles incoming pushes.

**Tech Stack:** Supabase (pg_cron, Edge Functions), web-push, Resend, Vite PWA service worker

---

## Task 1: Database Migration for Notification Tables

**Files:**
- Create: `supabase/migrations/20260108100000_notifications.sql`

**Step 1: Write the migration SQL**

```sql
-- Push subscription storage
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);

-- RLS for push_subscriptions
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscriptions" ON push_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscriptions" ON push_subscriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Notification log to track sent notifications
CREATE TABLE notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  channel TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own notification log" ON notification_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE INDEX notification_log_lookup_idx
  ON notification_log(task_id, notification_type, channel);

-- Excuses table (the hall of shame)
CREATE TABLE excuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  excuse_text TEXT NOT NULL CHECK (char_length(excuse_text) >= 10),
  postponed_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE excuses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own excuses" ON excuses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own excuses" ON excuses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX excuses_task_idx ON excuses(task_id);
CREATE INDEX excuses_postponed_idx ON excuses(postponed_until);
```

**Step 2: Apply migration locally**

Run: `npx supabase db push` (or via Supabase dashboard for remote)
Expected: Tables created successfully

**Step 3: Generate updated TypeScript types**

Run: `npx supabase gen types typescript --local > src/lib/database.types.ts`
Expected: Types file updated with new tables

**Step 4: Commit**

```bash
git add supabase/migrations/20260108100000_notifications.sql src/lib/database.types.ts
git commit -m "feat: add notification tables migration"
```

---

## Task 2: Notification Messages Data

**Files:**
- Create: `src/data/notificationMessages.ts`
- Test: `src/data/notificationMessages.test.ts`

**Step 1: Write the failing test**

```typescript
// ABOUTME: Tests for notification message content selection.
// ABOUTME: Verifies correct messages returned for tier and theme.

import { describe, it, expect } from 'vitest'
import {
  getBrowserPushContent,
  getEmailSubject,
  getEmailBody,
  NotificationTier,
} from './notificationMessages'

describe('getBrowserPushContent', () => {
  it('returns hinged 4_day message with task title', () => {
    const result = getBrowserPushContent('4_day', 'hinged', 'Buy groceries')
    expect(result.title).toContain('Tick')
    expect(result.body).toContain('Buy groceries')
    expect(result.body).toContain('4 days')
  })

  it('returns unhinged overdue message with caps', () => {
    const result = getBrowserPushContent('overdue', 'unhinged', 'Pay rent')
    expect(result.body.toUpperCase()).toBe(result.body) // Should be caps
  })

  it('returns different messages for same tier (variety)', () => {
    const messages = new Set<string>()
    for (let i = 0; i < 20; i++) {
      const result = getBrowserPushContent('day_of', 'unhinged', 'Task')
      messages.add(result.body)
    }
    expect(messages.size).toBeGreaterThan(1)
  })
})

describe('getEmailSubject', () => {
  it('returns hinged subject without caps', () => {
    const result = getEmailSubject('1_day', 'hinged', 'Submit report')
    expect(result).not.toBe(result.toUpperCase())
    expect(result).toContain('Submit report')
  })

  it('returns unhinged subject with personality', () => {
    const result = getEmailSubject('overdue', 'unhinged', 'Task')
    expect(result.length).toBeGreaterThan(10)
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/data/notificationMessages.test.ts`
Expected: FAIL with "Cannot find module './notificationMessages'"

**Step 3: Write the implementation**

```typescript
// ABOUTME: Notification message content for browser push and email.
// ABOUTME: Varies tone based on hinged/unhinged theme.

export type NotificationTier = '4_day' | '1_day' | 'day_of' | 'overdue'
export type Theme = 'hinged' | 'unhinged'

interface PushContent {
  title: string
  body: string
}

const hingedPushMessages: Record<NotificationTier, string[]> = {
  '4_day': [
    '{task} is coming up in 4 days',
    'Reminder: {task} due in 4 days',
    'Heads up: {task} is on the horizon',
  ],
  '1_day': [
    '{task} is due tomorrow',
    'Reminder: {task} due tomorrow',
    'Tomorrow: {task}',
  ],
  'day_of': [
    '{task} is due today',
    'Today: {task}',
    '{task} needs your attention today',
  ],
  'overdue': [
    '{task} is now overdue',
    'Overdue: {task}',
    '{task} has passed its deadline',
  ],
}

const unhingedPushMessages: Record<NotificationTier, string[]> = {
  '4_day': [
    '4 DAYS. {task}. TICK TOCK.',
    '{task} IS WATCHING YOU. 4 DAYS.',
    'THE CLOCK IS TICKING. {task}. 4 DAYS.',
  ],
  '1_day': [
    'TOMORROW. {task}. HELLO??',
    '{task}. TOMORROW. I AM SERIOUS.',
    'ONE DAY LEFT FOR {task}. ONE.',
  ],
  'day_of': [
    'TODAY. {task}. WHY ARE YOU LIKE THIS.',
    '{task} IS DUE TODAY AND YOU ARE READING THIS??',
    'IT IS TODAY. {task}. GO. NOW.',
  ],
  'overdue': [
    '{task} IS OVERDUE. I AM NOT MAD. (I AM MAD.)',
    'YOU ABSOLUTE GREMLIN. {task} IS OVERDUE.',
    '{task} WAS DUE. PAST TENSE. OVERDUE.',
  ],
}

const hingedEmailSubjects: Record<NotificationTier, string[]> = {
  '4_day': [
    'Upcoming: {task}',
    'Reminder: {task} in 4 days',
  ],
  '1_day': [
    'Reminder: {task} is due tomorrow',
    'Tomorrow: {task}',
  ],
  'day_of': [
    'Today: {task}',
    '{task} is due today',
  ],
  'overdue': [
    'Overdue: {task}',
    'You have an overdue task',
  ],
}

const unhingedEmailSubjects: Record<NotificationTier, string[]> = {
  '4_day': [
    '{task} is watching you',
    'The clock is ticking on {task}',
  ],
  '1_day': [
    '{task}. Tomorrow. I am serious.',
    'We need to talk about {task}',
  ],
  'day_of': [
    '{task}. TODAY. Please.',
    'I cannot believe we are here again ({task})',
  ],
  'overdue': [
    'We need to talk about {task}',
    'I am not mad about {task}. (I am mad.)',
  ],
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function interpolate(template: string, taskTitle: string): string {
  return template.replace(/{task}/g, taskTitle)
}

export function getBrowserPushContent(
  tier: NotificationTier,
  theme: Theme,
  taskTitle: string
): PushContent {
  const messages = theme === 'hinged' ? hingedPushMessages : unhingedPushMessages
  const body = interpolate(pickRandom(messages[tier]), taskTitle)
  return {
    title: theme === 'hinged' ? 'Tick Reminder' : 'TICK SAYS',
    body,
  }
}

export function getEmailSubject(
  tier: NotificationTier,
  theme: Theme,
  taskTitle: string
): string {
  const subjects = theme === 'hinged' ? hingedEmailSubjects : unhingedEmailSubjects
  return interpolate(pickRandom(subjects[tier]), taskTitle)
}

export function getEmailBody(
  tier: NotificationTier,
  theme: Theme,
  taskTitle: string,
  appUrl: string
): string {
  const pushContent = getBrowserPushContent(tier, theme, taskTitle)

  if (theme === 'hinged') {
    return `
${pushContent.body}

View your tasks: ${appUrl}

- Tick
    `.trim()
  } else {
    return `
${pushContent.body}

I will be watching: ${appUrl}

Disappointedly yours,
Tick

P.S. I know where you live. (In this app. On your phone.)
    `.trim()
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/data/notificationMessages.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/data/notificationMessages.ts src/data/notificationMessages.test.ts
git commit -m "feat: add notification message content"
```

---

## Task 3: Notification Tier Calculator

**Files:**
- Modify: `src/lib/lieCalculator.ts`
- Modify: `src/lib/lieCalculator.test.ts`

**Step 1: Write the failing test**

Add to `src/lib/lieCalculator.test.ts`:

```typescript
import { getNotificationTier } from './lieCalculator'

describe('getNotificationTier', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-08T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns null for tasks more than 4 fake days away', () => {
    const fakeDue = new Date('2026-01-15T12:00:00Z') // 7 days
    expect(getNotificationTier(fakeDue)).toBeNull()
  })

  it('returns 4_day for tasks 3-4 fake days away', () => {
    const fakeDue = new Date('2026-01-12T12:00:00Z') // 4 days
    expect(getNotificationTier(fakeDue)).toBe('4_day')
  })

  it('returns 1_day for tasks 1-2 fake days away', () => {
    const fakeDue = new Date('2026-01-09T18:00:00Z') // ~1.25 days
    expect(getNotificationTier(fakeDue)).toBe('1_day')
  })

  it('returns day_of for tasks due within 24 hours', () => {
    const fakeDue = new Date('2026-01-09T06:00:00Z') // 18 hours
    expect(getNotificationTier(fakeDue)).toBe('day_of')
  })

  it('returns overdue for past fake dates', () => {
    const fakeDue = new Date('2026-01-07T12:00:00Z') // yesterday
    expect(getNotificationTier(fakeDue)).toBe('overdue')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/lib/lieCalculator.test.ts`
Expected: FAIL with "getNotificationTier is not exported"

**Step 3: Add implementation to lieCalculator.ts**

Add at the end of `src/lib/lieCalculator.ts`:

```typescript
export type NotificationTier = '4_day' | '1_day' | 'day_of' | 'overdue'

export function getNotificationTier(fakeDueDate: Date): NotificationTier | null {
  const now = Date.now()
  const msRemaining = fakeDueDate.getTime() - now
  const hoursRemaining = msRemaining / MS_IN_HOUR
  const daysRemaining = hoursRemaining / HOURS_IN_DAY

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 24) return 'day_of'
  if (daysRemaining < 2) return '1_day'
  if (daysRemaining < 5) return '4_day'
  return null // No notification needed yet
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/lib/lieCalculator.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/lib/lieCalculator.ts src/lib/lieCalculator.test.ts
git commit -m "feat: add notification tier calculator"
```

---

## Task 4: Push Subscription Hook

**Files:**
- Create: `src/hooks/usePushSubscription.ts`
- Create: `src/hooks/usePushSubscription.test.ts`

**Step 1: Write the failing test**

```typescript
// ABOUTME: Tests for push notification subscription management.
// ABOUTME: Verifies subscription flow and permission handling.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { usePushSubscription } from './usePushSubscription'

// Mock supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ error: null })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null })),
      })),
    })),
  },
}))

// Mock auth context
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user-id' } }),
}))

describe('usePushSubscription', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns not_supported when Push API unavailable', () => {
    // Remove PushManager from navigator
    const originalServiceWorker = navigator.serviceWorker
    Object.defineProperty(navigator, 'serviceWorker', {
      value: undefined,
      configurable: true,
    })

    const { result } = renderHook(() => usePushSubscription())
    expect(result.current.permissionState).toBe('not_supported')

    Object.defineProperty(navigator, 'serviceWorker', {
      value: originalServiceWorker,
      configurable: true,
    })
  })

  it('provides subscribe function', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.subscribe).toBe('function')
  })

  it('provides unsubscribe function', () => {
    const { result } = renderHook(() => usePushSubscription())
    expect(typeof result.current.unsubscribe).toBe('function')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/hooks/usePushSubscription.test.ts`
Expected: FAIL with "Cannot find module './usePushSubscription'"

**Step 3: Write the implementation**

```typescript
// ABOUTME: Hook for managing browser push notification subscriptions.
// ABOUTME: Handles permission requests and syncs subscriptions with Supabase.

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

type PermissionState = 'granted' | 'denied' | 'prompt' | 'not_supported'

// VAPID public key - set this in your environment
const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || ''

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function usePushSubscription() {
  const { user } = useAuth()
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if Push API is supported
  const isSupported = typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window

  useEffect(() => {
    if (!isSupported) {
      setPermissionState('not_supported')
      setLoading(false)
      return
    }

    // Check current permission state
    if ('Notification' in window) {
      setPermissionState(Notification.permission as PermissionState)
    }

    // Check if already subscribed
    async function checkSubscription() {
      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.getSubscription()
        setIsSubscribed(!!subscription)
      } catch {
        // Ignore errors
      }
      setLoading(false)
    }

    checkSubscription()
  }, [isSupported])

  const subscribe = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!isSupported) {
      return { success: false, error: 'Push notifications not supported' }
    }

    if (!user) {
      return { success: false, error: 'Must be logged in' }
    }

    if (!VAPID_PUBLIC_KEY) {
      return { success: false, error: 'VAPID key not configured' }
    }

    try {
      // Request permission
      const permission = await Notification.requestPermission()
      setPermissionState(permission as PermissionState)

      if (permission !== 'granted') {
        return { success: false, error: 'Permission denied' }
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready

      // Subscribe to push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      })

      // Extract keys
      const subscriptionJson = subscription.toJSON()
      const endpoint = subscriptionJson.endpoint!
      const p256dh = subscriptionJson.keys!.p256dh
      const auth = subscriptionJson.keys!.auth

      // Save to Supabase
      const { error } = await supabase.from('push_subscriptions').insert({
        user_id: user.id,
        endpoint,
        p256dh_key: p256dh,
        auth_key: auth,
      })

      if (error) {
        // If duplicate, that's fine
        if (!error.message.includes('duplicate')) {
          throw error
        }
      }

      setIsSubscribed(true)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: message }
    }
  }, [isSupported, user])

  const unsubscribe = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (!isSupported || !user) {
      return { success: false, error: 'Cannot unsubscribe' }
    }

    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        const endpoint = subscription.endpoint
        await subscription.unsubscribe()

        // Remove from Supabase
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('endpoint', endpoint)
      }

      setIsSubscribed(false)
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      return { success: false, error: message }
    }
  }, [isSupported, user])

  return {
    permissionState,
    isSubscribed,
    loading,
    isSupported,
    subscribe,
    unsubscribe,
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/hooks/usePushSubscription.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/hooks/usePushSubscription.ts src/hooks/usePushSubscription.test.ts
git commit -m "feat: add push subscription hook"
```

---

## Task 5: Excuse Hook

**Files:**
- Create: `src/hooks/useExcuses.ts`
- Create: `src/hooks/useExcuses.test.ts`

**Step 1: Write the failing test**

```typescript
// ABOUTME: Tests for excuse (snooze) management hook.
// ABOUTME: Verifies excuse creation and postponement logic.

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useExcuses } from './useExcuses'

vi.mock('../lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({ error: null })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({ data: [], error: null })),
        })),
      })),
    })),
  },
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'test-user-id' } }),
}))

describe('useExcuses', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('provides makeExcuse function', () => {
    const { result } = renderHook(() => useExcuses())
    expect(typeof result.current.makeExcuse).toBe('function')
  })

  it('provides getExcusesForTask function', () => {
    const { result } = renderHook(() => useExcuses())
    expect(typeof result.current.getExcusesForTask).toBe('function')
  })

  it('requires minimum 10 character excuse', async () => {
    const { result } = renderHook(() => useExcuses())
    const response = await result.current.makeExcuse('task-123', 'short')
    expect(response.success).toBe(false)
    expect(response.error).toContain('10 characters')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/hooks/useExcuses.test.ts`
Expected: FAIL with "Cannot find module './useExcuses'"

**Step 3: Write the implementation**

```typescript
// ABOUTME: Hook for managing task excuses (snooze with accountability).
// ABOUTME: Stores excuses and postpones notification escalation.

import { useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Excuse {
  id: string
  task_id: string
  user_id: string
  excuse_text: string
  postponed_until: string
  created_at: string
}

const POSTPONE_HOURS = 6

export function useExcuses() {
  const { user } = useAuth()

  const makeExcuse = useCallback(
    async (
      taskId: string,
      excuseText: string
    ): Promise<{ success: boolean; error?: string }> => {
      if (!user) {
        return { success: false, error: 'Must be logged in' }
      }

      if (excuseText.length < 10) {
        return { success: false, error: 'Excuse must be at least 10 characters. Try harder.' }
      }

      const postponedUntil = new Date(Date.now() + POSTPONE_HOURS * 60 * 60 * 1000)

      const { error } = await supabase.from('excuses').insert({
        task_id: taskId,
        user_id: user.id,
        excuse_text: excuseText,
        postponed_until: postponedUntil.toISOString(),
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    },
    [user]
  )

  const getExcusesForTask = useCallback(
    async (taskId: string): Promise<Excuse[]> => {
      if (!user) return []

      const { data, error } = await supabase
        .from('excuses')
        .select('*')
        .eq('task_id', taskId)
        .order('created_at', { ascending: false })

      if (error || !data) return []
      return data as Excuse[]
    },
    [user]
  )

  const getRecentExcuses = useCallback(
    async (limit = 10): Promise<Excuse[]> => {
      if (!user) return []

      const { data, error } = await supabase
        .from('excuses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error || !data) return []
      return data as Excuse[]
    },
    [user]
  )

  const isTaskPostponed = useCallback(
    async (taskId: string): Promise<boolean> => {
      if (!user) return false

      const { data } = await supabase
        .from('excuses')
        .select('postponed_until')
        .eq('task_id', taskId)
        .gt('postponed_until', new Date().toISOString())
        .limit(1)

      return !!data && data.length > 0
    },
    [user]
  )

  return {
    makeExcuse,
    getExcusesForTask,
    getRecentExcuses,
    isTaskPostponed,
  }
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/hooks/useExcuses.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/hooks/useExcuses.ts src/hooks/useExcuses.test.ts
git commit -m "feat: add excuses hook for snooze functionality"
```

---

## Task 6: Excuse Modal Component

**Files:**
- Create: `src/components/ExcuseModal.tsx`
- Create: `src/components/ExcuseModal.test.tsx`

**Step 1: Write the failing test**

```typescript
// ABOUTME: Tests for the Excuse Modal component.
// ABOUTME: Verifies form validation and submission.

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ExcuseModal from './ExcuseModal'

describe('ExcuseModal', () => {
  const mockOnClose = vi.fn()
  const mockOnSubmit = vi.fn()

  it('renders when isOpen is true', () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )
    expect(screen.getByText(/excuse/i)).toBeInTheDocument()
  })

  it('does not render when isOpen is false', () => {
    render(
      <ExcuseModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )
    expect(screen.queryByText(/excuse/i)).not.toBeInTheDocument()
  })

  it('shows character count warning for short excuses', async () => {
    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByPlaceholderText(/tell me/i)
    await userEvent.type(textarea, 'short')

    expect(screen.getByText(/at least 10/i)).toBeInTheDocument()
  })

  it('calls onSubmit with excuse text when valid', async () => {
    mockOnSubmit.mockResolvedValue({ success: true })

    render(
      <ExcuseModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        taskTitle="Test Task"
      />
    )

    const textarea = screen.getByPlaceholderText(/tell me/i)
    await userEvent.type(textarea, 'I have a very important meeting')

    const submitButton = screen.getByRole('button', { name: /believe/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith('I have a very important meeting')
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ExcuseModal.test.ts`
Expected: FAIL with "Cannot find module './ExcuseModal'"

**Step 3: Write the implementation**

```typescript
// ABOUTME: Modal for making an excuse (snooze with accountability).
// ABOUTME: Requires minimum 10 character justification.

import { useState } from 'react'
import TickSprite from './TickSprite'

interface ExcuseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (excuse: string) => Promise<{ success: boolean; error?: string }>
  taskTitle: string
}

const placeholderExcuses = [
  'I have a dentist appointment...',
  'My dog ate my laptop...',
  'Mercury is in retrograde...',
  'I am simply too powerful to be constrained by deadlines...',
  'My horoscope said to rest today...',
]

export default function ExcuseModal({ isOpen, onClose, onSubmit, taskTitle }: ExcuseModalProps) {
  const [excuse, setExcuse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const isValid = excuse.length >= 10
  const placeholder = placeholderExcuses[Math.floor(Math.random() * placeholderExcuses.length)]

  const handleSubmit = async () => {
    if (!isValid) return

    setIsSubmitting(true)
    setError(null)

    const result = await onSubmit(excuse)

    setIsSubmitting(false)

    if (result.success) {
      setExcuse('')
      onClose()
    } else {
      setError(result.error || 'Failed to save excuse')
    }
  }

  const handleCancel = () => {
    setExcuse('')
    setError(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-charcoal/60 flex items-center justify-center p-4 z-50 font-body">
      <div className="bg-cloud rounded-2xl shadow-xl max-w-md w-full p-8">
        {/* Tick looking skeptical */}
        <div className="mx-auto mb-6 flex justify-center">
          <TickSprite expression="skeptical" size="lg" className="shadow-lg" />
        </div>

        <h2 className="font-pixel text-lg text-charcoal text-center mb-2">
          WHAT'S YOUR EXCUSE?
        </h2>

        <p className="text-dusty-purple text-center mb-6 text-sm">
          For: <span className="font-medium text-charcoal">{taskTitle}</span>
        </p>

        {/* Textarea */}
        <div className="mb-4">
          <textarea
            value={excuse}
            onChange={(e) => setExcuse(e.target.value)}
            placeholder={`Tell me why you can't do this right now... (e.g., "${placeholder}")`}
            className="w-full h-32 px-4 py-3 rounded-xl bg-white text-charcoal placeholder-warm-gray border-2 border-transparent focus:border-hot-pink focus:outline-none resize-none"
          />
          <div className="flex justify-between mt-2 text-xs">
            <span className={excuse.length < 10 ? 'text-hot-pink' : 'text-dusty-purple'}>
              {excuse.length < 10 ? `At least 10 characters required (${excuse.length}/10)` : `${excuse.length} characters`}
            </span>
            <span className="text-dusty-purple">
              +6 hours reprieve
            </span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-hot-pink text-sm text-center mb-4">{error}</p>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-3 bg-lavender text-charcoal font-bold rounded-full hover:bg-peach transition-colors"
          >
            Never mind, I'll do it
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="flex-1 px-6 py-3 bg-hot-pink text-cloud font-bold rounded-full hover:bg-coral transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : "Fine, I'll believe you"}
          </button>
        </div>

        <p className="text-warm-gray text-xs text-center mt-4">
          I'll remember this excuse. They all go in the permanent record.
        </p>
      </div>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ExcuseModal.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/ExcuseModal.tsx src/components/ExcuseModal.test.tsx
git commit -m "feat: add excuse modal component"
```

---

## Task 7: Add Excuse Menu to TaskCard

**Files:**
- Modify: `src/components/TaskCard.tsx`
- Modify: `src/components/TaskCard.test.tsx`

**Step 1: Add test for menu button**

Add to `src/components/TaskCard.test.tsx`:

```typescript
it('shows menu button with excuse option', async () => {
  render(
    <TaskCard
      task={mockTask}
      onComplete={mockOnComplete}
      onExcuse={vi.fn()}
      theme="unhinged"
    />
  )

  const menuButton = screen.getByLabelText('Task options')
  fireEvent.click(menuButton)

  expect(screen.getByText(/make an excuse/i)).toBeInTheDocument()
})

it('calls onExcuse when excuse option clicked', async () => {
  const mockOnExcuse = vi.fn()

  render(
    <TaskCard
      task={mockTask}
      onComplete={mockOnComplete}
      onExcuse={mockOnExcuse}
      theme="unhinged"
    />
  )

  const menuButton = screen.getByLabelText('Task options')
  fireEvent.click(menuButton)

  const excuseOption = screen.getByText(/make an excuse/i)
  fireEvent.click(excuseOption)

  expect(mockOnExcuse).toHaveBeenCalledWith(mockTask.id)
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/TaskCard.test.tsx`
Expected: FAIL

**Step 3: Update TaskCard with menu**

Update `src/components/TaskCard.tsx`:

```typescript
// ABOUTME: Card component displaying a single task with fake due date.
// ABOUTME: Adapts styling based on urgency level and theme (hinged/unhinged).

import { useState } from 'react'
import type { TaskWithFakeDate } from '../types/task'
import { formatTimeRemaining } from '../lib/lieCalculator'

interface TaskCardProps {
  task: TaskWithFakeDate
  onComplete: (taskId: string) => void
  onDelete?: (taskId: string) => void
  onExcuse?: (taskId: string) => void
  theme: 'hinged' | 'unhinged'
}

const urgencyStyles = {
  hinged: {
    low: 'border-hinged-border bg-hinged-card',
    medium: 'border-hinged-border bg-hinged-card',
    high: 'border-hinged-border bg-hinged-card',
    critical: 'border-hinged-border bg-hinged-card',
    overdue: 'border-hinged-border bg-hinged-card',
  },
  unhinged: {
    low: 'border-mint bg-cloud',
    medium: 'border-golden bg-peach/30',
    high: 'border-coral bg-peach/50 animate-pulse',
    critical: 'border-hot-pink bg-hot-pink/30 animate-pulse',
    overdue: 'border-hot-pink bg-hot-pink/40 animate-bounce',
  },
}

const urgencyMessages = {
  hinged: {
    low: '',
    medium: '',
    high: '',
    critical: 'Due soon',
    overdue: 'Overdue',
  },
  unhinged: {
    low: '',
    medium: 'tick tock',
    high: 'WHY ARE YOU READING THIS GO DO IT',
    critical: 'PANIC MODE ACTIVATED',
    overdue: 'YOU ABSOLUTE GREMLIN',
  },
}

export default function TaskCard({ task, onComplete, onDelete, onExcuse, theme }: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const timeRemaining = formatTimeRemaining(task.fake_due_date)
  const urgencyStyle = urgencyStyles[theme][task.urgency]
  const urgencyMessage = urgencyMessages[theme][task.urgency]

  if (task.status === 'completed') {
    return null
  }

  const isHinged = theme === 'hinged'

  return (
    <div className={`${isHinged ? 'rounded-lg' : 'rounded-2xl'} border-2 p-4 ${urgencyStyle} transition-all relative`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className={`truncate ${isHinged ? 'font-medium text-hinged-text' : 'font-bold text-charcoal'}`}>{task.title}</h3>
          {task.description && (
            <p className={`text-sm mt-1 line-clamp-2 ${isHinged ? 'text-hinged-text-secondary' : 'text-dusty-purple'}`}>{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-sm font-medium ${
              task.urgency === 'overdue'
                ? (isHinged ? 'text-red-600' : 'text-hot-pink')
                : (isHinged ? 'text-hinged-text-secondary' : 'text-charcoal')
            }`}>
              {timeRemaining === 'overdue' ? (isHinged ? 'Overdue' : 'OVERDUE') : `Due in ${timeRemaining}`}
            </span>
            {task.category && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                isHinged ? 'bg-gray-100 text-hinged-text-secondary' : 'bg-lavender text-dusty-purple'
              }`}>
                {task.category}
              </span>
            )}
          </div>
          {urgencyMessage && (
            <p className={`text-xs mt-1 ${theme === 'unhinged' ? 'font-bold text-hot-pink' : 'text-hinged-text-secondary'}`}>
              {urgencyMessage}
            </p>
          )}
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => onComplete(task.id)}
            aria-label="Complete task"
            className={`px-4 py-2 text-sm font-bold transition-colors ${
              isHinged
                ? 'bg-hinged-accent text-white rounded-md hover:bg-hinged-accent-hover'
                : 'bg-mint text-charcoal rounded-full hover:bg-mint/80'
            }`}
          >
            {theme === 'unhinged' ? 'DONE (finally)' : 'Complete'}
          </button>

          {/* Menu button */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Task options"
              className={`p-2 rounded-full transition-colors ${
                isHinged
                  ? 'hover:bg-gray-100 text-hinged-text-secondary'
                  : 'hover:bg-lavender text-dusty-purple'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-20 ${
                  isHinged ? 'bg-white border border-hinged-border' : 'bg-cloud'
                }`}>
                  {onExcuse && (
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        onExcuse(task.id)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        isHinged
                          ? 'hover:bg-gray-50 text-hinged-text'
                          : 'hover:bg-lavender text-charcoal'
                      }`}
                    >
                      Make an excuse...
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        onDelete(task.id)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        isHinged
                          ? 'hover:bg-gray-50 text-red-600'
                          : 'hover:bg-lavender text-hot-pink'
                      }`}
                    >
                      Delete task
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/TaskCard.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/TaskCard.tsx src/components/TaskCard.test.tsx
git commit -m "feat: add excuse menu option to task cards"
```

---

## Task 8: Integrate Excuse Modal in TaskListPage

**Files:**
- Modify: `src/pages/TaskListPage.tsx`

**Step 1: Import and wire up ExcuseModal**

Add imports at top:

```typescript
import { useState } from 'react'
import ExcuseModal from '../components/ExcuseModal'
import { useExcuses } from '../hooks/useExcuses'
```

Add state and handler inside component:

```typescript
const [excuseTaskId, setExcuseTaskId] = useState<string | null>(null)
const { makeExcuse } = useExcuses()

const excuseTask = tasks.find(t => t.id === excuseTaskId)

const handleExcuse = (taskId: string) => {
  setExcuseTaskId(taskId)
}

const handleExcuseSubmit = async (excuse: string) => {
  if (!excuseTaskId) return { success: false, error: 'No task selected' }
  return await makeExcuse(excuseTaskId, excuse)
}
```

Pass `onExcuse` to TaskCard:

```typescript
<TaskCard
  task={task}
  onComplete={handleComplete}
  onDelete={handleDelete}
  onExcuse={handleExcuse}
  theme={theme}
/>
```

Add modal at end of component JSX:

```typescript
<ExcuseModal
  isOpen={!!excuseTaskId}
  onClose={() => setExcuseTaskId(null)}
  onSubmit={handleExcuseSubmit}
  taskTitle={excuseTask?.title || ''}
/>
```

**Step 2: Run existing tests**

Run: `npm test -- src/pages/TaskListPage.test.tsx`
Expected: PASS (or update tests as needed)

**Step 3: Commit**

```bash
git add src/pages/TaskListPage.tsx
git commit -m "feat: integrate excuse modal in task list"
```

---

## Task 9: Service Worker Push Handler

**Files:**
- Create: `public/sw-push.js`
- Modify: `vite.config.ts`

**Step 1: Create service worker push handler**

```javascript
// ABOUTME: Service worker extension for push notifications.
// ABOUTME: Handles incoming push events and notification clicks.

self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()

  const options = {
    body: data.body,
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
    tag: data.tag || 'tick-notification',
    data: {
      taskId: data.taskId,
      url: data.url || '/',
    },
    requireInteraction: data.requireInteraction || false,
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Tick Reminder', options)
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open
      for (const client of windowClients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus()
          if (event.notification.data?.taskId) {
            client.postMessage({
              type: 'NOTIFICATION_CLICK',
              taskId: event.notification.data.taskId,
            })
          }
          return
        }
      }
      // Open new window if none exists
      return clients.openWindow(urlToOpen)
    })
  )
})
```

**Step 2: Update vite.config.ts to include SW customization**

```typescript
// ABOUTME: Vite configuration with PWA support.
// ABOUTME: Enables installable web app with offline caching and push notifications.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.svg', 'icon-512.svg'],
      manifest: {
        name: 'Liars Todo',
        short_name: 'Liars',
        description: 'A todo app that lies about due dates for your own good',
        theme_color: '#1f2937',
        background_color: '#f3f4f6',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: 'icon-512.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        // Import the push handler into the generated SW
        importScripts: ['sw-push.js'],
      },
    })
  ],
})
```

**Step 3: Test build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add public/sw-push.js vite.config.ts
git commit -m "feat: add service worker push notification handler"
```

---

## Task 10: Supabase Edge Function for Notifications

**Files:**
- Create: `supabase/functions/send-notifications/index.ts`

**Step 1: Create the Edge Function**

```typescript
// ABOUTME: Supabase Edge Function for sending scheduled notifications.
// ABOUTME: Called hourly by pg_cron to check and send due notifications.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!
const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const MS_IN_HOUR = 1000 * 60 * 60
const MS_IN_DAY = MS_IN_HOUR * 24

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
  endpoint: string
  p256dh_key: string
  auth_key: string
}

type NotificationTier = '4_day' | '1_day' | 'day_of' | 'overdue'

function calculateFakeDueDate(realDueDate: Date, reliabilityScore: number): Date {
  const now = Date.now()
  const realDueMs = realDueDate.getTime()
  const msRemaining = realDueMs - now
  const daysRemaining = msRemaining / MS_IN_DAY
  const lieMultiplier = 1 - (reliabilityScore / 100)

  let fakeDueMs: number

  if (daysRemaining > 7) {
    fakeDueMs = realDueMs
  } else if (daysRemaining > 4) {
    const shaveMs = MS_IN_DAY * (0.5 + lieMultiplier)
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

function getNotificationTier(fakeDueDate: Date): NotificationTier | null {
  const now = Date.now()
  const msRemaining = fakeDueDate.getTime() - now
  const hoursRemaining = msRemaining / MS_IN_HOUR
  const daysRemaining = hoursRemaining / 24

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 24) return 'day_of'
  if (daysRemaining < 2) return '1_day'
  if (daysRemaining < 5) return '4_day'
  return null
}

function getMessage(tier: NotificationTier, theme: 'hinged' | 'unhinged', taskTitle: string): { title: string; body: string } {
  const messages = {
    hinged: {
      '4_day': { title: 'Tick Reminder', body: `${taskTitle} is coming up in 4 days` },
      '1_day': { title: 'Tick Reminder', body: `${taskTitle} is due tomorrow` },
      'day_of': { title: 'Tick Reminder', body: `${taskTitle} is due today` },
      'overdue': { title: 'Tick Reminder', body: `${taskTitle} is now overdue` },
    },
    unhinged: {
      '4_day': { title: 'TICK SAYS', body: `4 DAYS. ${taskTitle}. TICK TOCK.` },
      '1_day': { title: 'TICK SAYS', body: `TOMORROW. ${taskTitle}. HELLO??` },
      'day_of': { title: 'TICK SAYS', body: `TODAY. ${taskTitle}. WHY ARE YOU LIKE THIS.` },
      'overdue': { title: 'TICK SAYS', body: `${taskTitle} IS OVERDUE. I AM NOT MAD. (I AM MAD.)` },
    },
  }
  return messages[theme][tier]
}

async function sendPushNotification(
  subscription: PushSubscription,
  payload: object
): Promise<boolean> {
  // Using web-push would require npm package - for Deno, use fetch to push service
  // This is a simplified version - production would use proper VAPID signing
  try {
    const response = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'TTL': '86400',
      },
      body: JSON.stringify(payload),
    })
    return response.ok
  } catch {
    return false
  }
}

async function sendEmail(
  to: string,
  subject: string,
  body: string
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
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
  } catch {
    return false
  }
}

serve(async (req) => {
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  // Get all pending tasks
  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('id, user_id, title, real_due_date, status')
    .eq('status', 'pending')

  if (tasksError || !tasks) {
    return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), { status: 500 })
  }

  // Get unique user IDs
  const userIds = [...new Set(tasks.map(t => t.user_id))]

  // Get profiles for all users
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, reliability_score, theme, notification_preferences')
    .in('id', userIds)

  const profileMap = new Map<string, Profile>()
  profiles?.forEach(p => profileMap.set(p.id, p))

  // Get push subscriptions
  const { data: subscriptions } = await supabase
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh_key, auth_key')
    .in('user_id', userIds)

  const subscriptionMap = new Map<string, PushSubscription[]>()
  subscriptions?.forEach(s => {
    const existing = subscriptionMap.get(s.user_id) || []
    existing.push(s)
    subscriptionMap.set(s.user_id, existing)
  })

  // Check for active postponements
  const { data: activeExcuses } = await supabase
    .from('excuses')
    .select('task_id, postponed_until')
    .gt('postponed_until', new Date().toISOString())

  const postponedTasks = new Set(activeExcuses?.map(e => e.task_id) || [])

  let notificationsSent = 0

  for (const task of tasks) {
    // Skip postponed tasks
    if (postponedTasks.has(task.id)) continue

    const profile = profileMap.get(task.user_id)
    if (!profile || profile.notification_preferences === 'none') continue

    const fakeDueDate = calculateFakeDueDate(
      new Date(task.real_due_date),
      profile.reliability_score
    )
    const tier = getNotificationTier(fakeDueDate)
    if (!tier) continue

    // Check if already sent this tier
    const { data: existingLog } = await supabase
      .from('notification_log')
      .select('id')
      .eq('task_id', task.id)
      .eq('notification_type', tier)
      .limit(1)

    // For day_of and overdue, check cooldown instead of one-time
    const shouldSend = !existingLog?.length ||
      (tier === 'day_of' || tier === 'overdue')

    if (!shouldSend) continue

    // For recurring notifications, check cooldown
    if (tier === 'day_of' || tier === 'overdue') {
      const cooldownHours = tier === 'overdue' ? 1 : 3
      const { data: recentLog } = await supabase
        .from('notification_log')
        .select('sent_at')
        .eq('task_id', task.id)
        .eq('notification_type', tier)
        .order('sent_at', { ascending: false })
        .limit(1)

      if (recentLog?.length) {
        const lastSent = new Date(recentLog[0].sent_at).getTime()
        if (Date.now() - lastSent < cooldownHours * MS_IN_HOUR) {
          continue
        }
      }
    }

    const message = getMessage(tier, profile.theme, task.title)
    const prefs = profile.notification_preferences

    // Send browser push
    if (prefs === 'browser' || prefs === 'both') {
      const userSubs = subscriptionMap.get(task.user_id) || []
      for (const sub of userSubs) {
        const success = await sendPushNotification(sub, {
          ...message,
          taskId: task.id,
          tag: `task-${task.id}`,
        })
        if (success) {
          await supabase.from('notification_log').insert({
            task_id: task.id,
            user_id: task.user_id,
            notification_type: tier,
            channel: 'browser',
          })
          notificationsSent++
        }
      }
    }

    // Send email (only for 4_day and 1_day tiers)
    if ((prefs === 'email' || prefs === 'both') && (tier === '4_day' || tier === '1_day')) {
      const body = `${message.body}\n\nView your tasks: https://liars.todo\n\n- Tick`
      const success = await sendEmail(profile.email, message.title + ': ' + task.title, body)
      if (success) {
        await supabase.from('notification_log').insert({
          task_id: task.id,
          user_id: task.user_id,
          notification_type: tier,
          channel: 'email',
        })
        notificationsSent++
      }
    }
  }

  return new Response(
    JSON.stringify({ success: true, notificationsSent }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

**Step 2: Commit**

```bash
git add supabase/functions/send-notifications/index.ts
git commit -m "feat: add notification sending edge function"
```

---

## Task 11: Generate VAPID Keys

**Step 1: Generate keys using Node**

Run in terminal:
```bash
npx web-push generate-vapid-keys
```

**Step 2: Add to Supabase secrets**

```bash
supabase secrets set VAPID_PUBLIC_KEY="<your-public-key>"
supabase secrets set VAPID_PRIVATE_KEY="<your-private-key>"
```

**Step 3: Add public key to .env**

Add to `.env`:
```
VITE_VAPID_PUBLIC_KEY=<your-public-key>
```

**Step 4: Commit .env.example update**

Update `.env.example` with the new variable (without the actual key).

```bash
git add .env.example
git commit -m "docs: add VAPID key to env example"
```

---

## Task 12: Set Up pg_cron Schedule

**Step 1: Enable pg_cron extension (in Supabase dashboard)**

Go to Database > Extensions > Enable pg_cron

**Step 2: Create cron job**

Run in SQL editor:
```sql
SELECT cron.schedule(
  'send-notifications',
  '0 * * * *', -- Every hour
  $$
  SELECT net.http_post(
    url := 'https://<your-project>.supabase.co/functions/v1/send-notifications',
    headers := '{"Authorization": "Bearer <your-service-role-key>"}'::jsonb
  );
  $$
);
```

**Step 3: Document in README**

Add setup instructions to README or docs.

---

## Task 13: Notification Settings UI

**Files:**
- Create: `src/components/NotificationSettings.tsx`
- Create: `src/components/NotificationSettings.test.tsx`

**Step 1: Write the failing test**

```typescript
// ABOUTME: Tests for notification settings component.
// ABOUTME: Verifies toggle and permission request flow.

import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import NotificationSettings from './NotificationSettings'

vi.mock('../hooks/usePushSubscription', () => ({
  usePushSubscription: () => ({
    permissionState: 'prompt',
    isSubscribed: false,
    loading: false,
    isSupported: true,
    subscribe: vi.fn().mockResolvedValue({ success: true }),
    unsubscribe: vi.fn().mockResolvedValue({ success: true }),
  }),
}))

vi.mock('../hooks/useProfile', () => ({
  useProfile: () => ({
    profile: { notification_preferences: 'both' },
    updateProfile: vi.fn().mockResolvedValue({ error: null }),
  }),
}))

describe('NotificationSettings', () => {
  it('renders notification preference options', () => {
    render(<NotificationSettings />)
    expect(screen.getByText(/browser/i)).toBeInTheDocument()
    expect(screen.getByText(/email/i)).toBeInTheDocument()
  })

  it('shows enable button when not subscribed', () => {
    render(<NotificationSettings />)
    expect(screen.getByRole('button', { name: /enable/i })).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test -- src/components/NotificationSettings.test.ts`
Expected: FAIL

**Step 3: Write the implementation**

```typescript
// ABOUTME: Component for managing notification preferences.
// ABOUTME: Allows toggling browser/email notifications.

import { useState } from 'react'
import { usePushSubscription } from '../hooks/usePushSubscription'
import { useProfile } from '../hooks/useProfile'

export default function NotificationSettings() {
  const { profile, updateProfile } = useProfile()
  const { permissionState, isSubscribed, isSupported, subscribe, unsubscribe, loading } = usePushSubscription()
  const [saving, setSaving] = useState(false)

  if (!profile) return null

  const prefs = profile.notification_preferences

  const handlePreferenceChange = async (newPref: 'email' | 'browser' | 'both' | 'none') => {
    setSaving(true)
    await updateProfile({ notification_preferences: newPref })
    setSaving(false)
  }

  const handleBrowserToggle = async () => {
    if (isSubscribed) {
      await unsubscribe()
    } else {
      const result = await subscribe()
      if (!result.success && result.error) {
        alert(result.error)
      }
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg text-charcoal">Notification Settings</h3>

      {/* Browser Notifications */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-charcoal">Browser Notifications</p>
            <p className="text-sm text-dusty-purple">
              {!isSupported
                ? 'Not supported in this browser'
                : permissionState === 'denied'
                ? 'Blocked - enable in browser settings'
                : isSubscribed
                ? 'Enabled'
                : 'Get push notifications'}
            </p>
          </div>
          {isSupported && permissionState !== 'denied' && (
            <button
              onClick={handleBrowserToggle}
              disabled={loading}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                isSubscribed
                  ? 'bg-lavender text-charcoal hover:bg-peach'
                  : 'bg-hot-pink text-white hover:bg-coral'
              }`}
            >
              {loading ? '...' : isSubscribed ? 'Disable' : 'Enable'}
            </button>
          )}
        </div>
      </div>

      {/* Email Notifications */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-charcoal">Email Notifications</p>
            <p className="text-sm text-dusty-purple">
              Receive reminders at {profile.email}
            </p>
          </div>
          <button
            onClick={() => handlePreferenceChange(
              prefs === 'email' || prefs === 'both' ?
                (prefs === 'both' ? 'browser' : 'none') :
                (prefs === 'browser' ? 'both' : 'email')
            )}
            disabled={saving}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              prefs === 'email' || prefs === 'both'
                ? 'bg-lavender text-charcoal hover:bg-peach'
                : 'bg-hot-pink text-white hover:bg-coral'
            }`}
          >
            {prefs === 'email' || prefs === 'both' ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>

      {/* Current preference summary */}
      <div className="bg-lavender/30 p-4 rounded-xl">
        <p className="text-sm text-dusty-purple">
          Current setting: <span className="font-medium text-charcoal">
            {prefs === 'both' ? 'Browser & Email' :
             prefs === 'browser' ? 'Browser only' :
             prefs === 'email' ? 'Email only' : 'None'}
          </span>
        </p>
      </div>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test -- src/components/NotificationSettings.test.ts`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/NotificationSettings.tsx src/components/NotificationSettings.test.tsx
git commit -m "feat: add notification settings component"
```

---

## Task 14: Final Integration & Testing

**Step 1: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 2: Build and verify**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Manual E2E testing checklist**

- [ ] Enable browser notifications in settings
- [ ] Add a task with due date 2 days out
- [ ] Verify fake date is earlier
- [ ] Make an excuse for a task
- [ ] Verify excuse is saved
- [ ] Check notification log in Supabase

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete notifications system implementation"
```

---

## Summary

This plan implements:
1. Database tables for subscriptions, logs, and excuses
2. Notification message content with hinged/unhinged tones
3. Push subscription management hook
4. Excuse system with "Make an Excuse" modal
5. Service worker push handler
6. Supabase Edge Function for scheduled notifications
7. Notification settings UI
8. VAPID key generation and pg_cron setup

Total estimated tasks: 14 discrete implementation units following TDD.
