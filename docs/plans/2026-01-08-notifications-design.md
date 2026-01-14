# Notifications System Design

## Overview

A notification system for Tickd that sends escalating reminders via browser push and email. Notifications are based on the fake due date (not real), with tone varying by hinged/unhinged theme.

## Architecture

### Three Main Components

1. **Subscription Management (Client-side)**
   - Request browser notification permission
   - Create Web Push subscription with VAPID keys
   - Store subscription in `push_subscriptions` table
   - Service worker handles incoming pushes

2. **Notification Scheduler (Supabase Edge Function + pg_cron)**
   - Hourly cron job triggers Edge Function
   - Queries tasks approaching fake deadlines
   - Checks `notification_log` to avoid duplicates
   - Sends browser pushes (web-push) and emails (Resend)
   - Logs each notification sent

3. **Excuse System ("Make an Excuse")**
   - Hidden menu option on task cards
   - User must enter reason (min 10 chars)
   - Postpones escalation by 6 hours
   - Tick can reference past excuses in messages

## Database Schema

### `push_subscriptions`
```sql
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);
```

### `notification_log`
```sql
CREATE TABLE notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL, -- '4_day', '1_day', 'day_of', 'overdue'
  channel TEXT NOT NULL, -- 'email', 'browser'
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX notification_log_lookup_idx
  ON notification_log(task_id, notification_type, channel);
```

### `excuses`
```sql
CREATE TABLE excuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  excuse_text TEXT NOT NULL CHECK (char_length(excuse_text) >= 10),
  postponed_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX excuses_task_idx ON excuses(task_id);
```

## Browser Push Flow

1. User enables notifications (settings or onboarding)
2. Check browser support for Push API
3. Request permission via `Notification.requestPermission()`
4. If granted, call `pushManager.subscribe()` with VAPID public key
5. POST subscription to Supabase, store in `push_subscriptions`

### Service Worker Additions

```javascript
self.addEventListener('push', (event) => {
  const data = event.data.json()
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/tick-icon.png',
    tag: data.tag,
    data: { taskId: data.taskId }
  })
})

self.addEventListener('notificationclick', (event) => {
  clients.openWindow('/?task=' + event.notification.data.taskId)
})
```

## Email Flow

- Provider: Resend
- API key stored as Supabase secret `RESEND_API_KEY`
- From address: `Tick <tick@domain.com>`

### Email Types
- **4-day warning** - Gentle heads up (email only)
- **1-day warning** - Getting serious (email + browser)
- **Overdue digest** - Daily summary of overdue tasks

## Escalation Logic

### Notification Tiers

| Fake Time Left | Type | Channels | Frequency |
|----------------|------|----------|-----------|
| 3-4 days | `4_day` | Email | Once |
| 1-2 days | `1_day` | Email + Browser | Once |
| 0-1 days | `day_of` | Browser | Every 3 hours |
| Overdue | `overdue` | Browser | Every hour |

### Cron Job Process

```
Every hour:
1. Fetch pending tasks with user profiles
2. For each task:
   a. Calculate fake due date
   b. Determine notification tier
   c. Check notification_log (already sent?)
   d. Check excuses (postponed?)
   e. If should send: dispatch, log it
```

### Rate Limits
- Max 1 email per task per day
- Max 1 browser push per task per 3 hours (day-of) or 1 hour (overdue)

## Excuse System ("Make an Excuse")

### UI
- Three-dot menu on task cards
- "Make an excuse" option (hidden in plain sight)
- Modal with skeptical Tick
- Header: "What's your excuse this time?"
- Textarea: min 10 chars required
- Submit: "Fine, I'll believe you... for now"

### Behavior
- Stores in `excuses` table
- Sets `postponed_until` = now + 6 hours
- Cron checks this before sending
- Tick can reference past excuses ("You've used 'dentist' 3 times...")

## Notification Content

### Browser Push (body ~50 chars)

| Tier | Hinged | Unhinged |
|------|--------|----------|
| 4_day | "Task X is coming up in 4 days" | "4 days. Tick tock." |
| 1_day | "Task X is due tomorrow" | "TOMORROW. Task X. Hello??" |
| day_of | "Task X is due today" | "TODAY. WHY ARE YOU LIKE THIS." |
| overdue | "Task X is now overdue" | "It's overdue. I'm disappointed. (I'm mad.)" |

### Email Subjects

| Tier | Hinged | Unhinged |
|------|--------|----------|
| 4_day | "Upcoming: Task X" | "Task X is watching you" |
| 1_day | "Reminder: Task X due tomorrow" | "Task X. Tomorrow. I'm serious." |
| overdue | "You have overdue tasks" | "We need to talk about your tasks" |

### Implementation
- Create `src/data/notificationMessages.ts`
- Random selection within tier/theme
- Dynamic task title insertion

## Secrets Required

- `VAPID_PUBLIC_KEY` - for client subscription
- `VAPID_PRIVATE_KEY` - for server push sending
- `RESEND_API_KEY` - for email sending

## Files to Create/Modify

### New Files
- `supabase/migrations/XXXXXX_notifications.sql` - schema
- `supabase/functions/send-notifications/index.ts` - cron handler
- `src/data/notificationMessages.ts` - message content
- `src/hooks/usePushSubscription.ts` - subscription management
- `src/components/ExcuseModal.tsx` - make excuse UI

### Modified Files
- `public/sw.js` - push event handlers
- `src/components/TaskCard.tsx` - add excuse menu option
- `src/pages/TaskListPage.tsx` - excuse modal integration
- `vite.config.ts` - ensure SW handles push

## Testing Plan

1. Unit tests for notification tier calculation
2. Unit tests for message content selection
3. Integration test for subscription flow (mocked)
4. Integration test for Edge Function logic
5. E2E test for excuse flow
