# Liars Todo - Design Document

## Overview

A PWA todo app for ADHD brains that strategically lies about due dates to create artificial urgency. The worse you are at meeting deadlines, the more aggressively it lies to protect you from yourself.

## Core Concept

### The Problem
People with certain types of ADHD work best under pressure. Real deadlines create real urgency. But knowing a deadline is "actually" far away kills motivation.

### The Solution
Enter tasks with real due dates. The app shows you fake (earlier) due dates. You can't see the real date until you complete the task. Completing early gives you a dopamine hit: "You finished 2 days early! (You thought you had 6 hours)".

## User Flow

1. **Add a task** - Title, real due date, optional category
2. **App calculates the lie** - Based on reliability score and time until deadline
3. **You see fake dates** - Progressively earlier as real deadline approaches
4. **Notifications escalate** - Calm emails become urgent browser pings
5. **Complete the task** - Reveal shows real date and early completion
6. **Reliability score adjusts** - Hit deadlines = less lying. Miss them = more lying.

## The Lie Algorithm (Escalating Urgency)

The fake due date is calculated dynamically based on real time remaining and user reliability score (0-100%, starts at 50%).

| Real Time Left | Lie Behavior |
|----------------|--------------|
| 7+ days | Shows real date (no lie yet) |
| 4-7 days | Shaves off 1 day |
| 2-4 days | Shaves off 30-50% of remaining time |
| 1-2 days | "DUE TOMORROW" (even if 2 days) |
| Day of (fake) | Full panic mode |

Reliability score scales these multipliers. Lower score = more aggressive lying.

## Data Model

### Users
- `id` (UUID, from Supabase Auth)
- `email`
- `reliability_score` (0-100, starts at 50)
- `theme` ("hinged" | "unhinged")
- `notification_preferences` (email, browser, both)
- `created_at`

### Tasks
- `id` (UUID)
- `user_id` (FK to users)
- `title`
- `description` (optional)
- `real_due_date` (the truth)
- `category` (optional)
- `status` ("pending" | "completed" | "overdue")
- `completed_at` (nullable)
- `was_on_time` (boolean, calculated on completion)
- `created_at`

**Key decision:** Fake dates are never stored. Always calculated on-the-fly so the lie stays fresh.

## UI Design

### Layout
- Single-page app
- Header: logo, theme toggle, settings
- Main: Task list sorted by (fake) due date
- Footer: Add task button/form

### Hinged Mode (calm liar)
- Clean sans-serif, muted colors (soft grays, blues)
- Plain due dates: "Due Tuesday"
- Subtle urgency: amber for soon, soft red for overdue
- Completion: "Nice work. You finished 2 days ahead of schedule."

### Unhinged Mode (chaotic liar)
- Bold fonts, high contrast, expressive colors
- Due dates with commentary: "Due Tuesday (tick tock)"
- Aggressive urgency: pulsing red, countdowns, "3 HOURS LEFT"
- Completion: "OH THANK GOD. You actually did it. 2 days early. I'm shocked tbh."

Theme toggle saves to user profile. Replaces traditional light/dark mode.

## Notification System

### Channels
- **Browser:** Web Push API via service worker
- **Email:** Daily digest + escalating alerts

### Escalation Example (task due in 5 real days)

| Real Time | Fake Time | Channel | Hinged | Unhinged |
|-----------|-----------|---------|--------|----------|
| 5 days | 4 days | Email | "Upcoming: Task X due in 4 days" | "Heads up: Task X is lurking. 4 days." |
| 3 days | 1.5 days | Email + Browser | "Task X is due tomorrow" | "Task X. Tomorrow. Just saying." |
| 2 days | "Tomorrow" | Browser (2x) | "Task X is due tomorrow" | "HELLO? Task X?? TOMORROW???" |
| 1 day | "TODAY" | Browser (3hr) | "Task X is due today" | "IT'S TODAY. WHY ARE YOU LIKE THIS." |
| 0 days | "OVERDUE" | Browser (hourly) | "Task X is overdue" | "You absolute gremlin. It's overdue." |

### Snooze
Hidden snooze option exists but is not prominently displayed. You have to find it.

## Tech Stack

### Frontend
- React + TypeScript
- Vite (with vite-plugin-pwa)
- TailwindCSS

### Backend
- Supabase Auth (magic link login)
- Supabase PostgreSQL
- Supabase Edge Functions (notification scheduling)

### Notifications
- Browser: Web Push API
- Email: Resend (or similar) via Edge Functions

### Hosting
- Frontend: Vercel or Netlify
- Backend: Supabase (managed)

### PWA Features
- Installable on desktop/mobile
- Offline capable (view tasks, queue changes)
- Custom app icon and splash screen

## Future Considerations (not in v1)
- Categories with per-category reliability scores
- Shared tasks / accountability partners
- Integration with calendars
- Mobile app (if PWA isn't enough)
