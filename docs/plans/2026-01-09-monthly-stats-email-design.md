# Monthly Stats Email Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Send users a monthly recap email on the 1st of each month with stats, roasts, and the time-saved reveal.

**Architecture:** Scheduled Edge Function queries previous month's data, generates HTML email per user's spicy level, sends via Resend API.

**Tech Stack:** Supabase Edge Functions, pg_cron, Resend API, HTML email templates

---

## Email Trigger

- **When:** 1st of each month at 9am UTC
- **How:** pg_cron triggers `send-monthly-stats` Edge Function
- **Who:** All users with email notifications enabled

## Data Collected Per User

| Stat | Source |
|------|--------|
| Tasks created | `tasks` table, `created_at` in previous month |
| Tasks completed | `tasks` table, `status = 'completed'`, `completed_at` in previous month |
| Tasks missed | `tasks` table, `status != 'completed'`, `real_due_date` passed |
| Reliability trend | `profiles.reliability_score` (need to add historical tracking or calculate from task outcomes) |
| Excuses | `excuses` table, sorted by `LENGTH(excuse_text)` ascending |
| Time saved | For completed tasks: `real_due_date - completed_at` (actual buffer) and `fake_due_date - completed_at` (perceived buffer) |
| Spicy level | `profiles.spicy_level` (new column) |

## Email Structure

### Subject Lines by Spicy Level

| Level | Subject |
|-------|---------|
| 1 | "Your [Month] stats are in" |
| 2 | "[Month] recap: Here's how you did" |
| 3 | "[Month] Report: Tick has thoughts" |
| 4 | "[Month] DEBRIEF: We need to discuss this" |
| 5 | "[MONTH] IS OVER AND WE NEED TO TALK" |

### Sections

1. **Header** - Tick logo + month name
2. **Task Summary** - "You completed X of Y tasks (Z%)"
3. **Reliability Trend** - "Score: 45% → 52% (+7)" with directional indicator
4. **Time Saved Reveal** - "You thought you were cutting it close X times. You actually had Y hours of buffer total."
5. **Excuse Hall of Shame** - Top 3 shortest excuses with character counts
6. **Tick's Monthly Roast** - Performance-based commentary at user's spicy level
7. **Footer** - App link, unsubscribe

## Database Changes

### New column on `profiles`:
```sql
ALTER TABLE profiles ADD COLUMN spicy_level integer DEFAULT 3 CHECK (spicy_level >= 1 AND spicy_level <= 5);
```

### New table for deduplication:
```sql
CREATE TABLE monthly_stats_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  month_year text NOT NULL, -- e.g., "2026-01"
  sent_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month_year)
);
```

## App Changes

1. Update `useProfile` hook to include `spicy_level`
2. Update `SpicinessModal` to save to database via `updateProfile()`
3. Add migration: on app load, if localStorage has spicy level, save to DB and clear localStorage
4. Update `database.types.ts` with new column

## Edge Function: `send-monthly-stats`

```
Input: None (scheduled)
Process:
  1. Calculate previous month date range
  2. Query all users with email enabled
  3. For each user:
     a. Check monthly_stats_log - skip if already sent
     b. Query tasks, excuses for previous month
     c. Calculate stats
     d. Generate HTML email based on spicy_level
     e. Send via Resend
     f. Log to monthly_stats_log
Output: { success: true, emailsSent: N }
```

## Edge Cases

| Scenario | Handling |
|----------|----------|
| New user (no data) | Skip or send welcome variant |
| No tasks created | "You didn't add any tasks. Tick is worried." |
| No excuses | Skip section or "Zero excuses. Suspicious." |
| 100% completion | Special praise variant (still roasty at level 5) |
| Email fails | Log failure, don't retry |
| Already sent this month | Check `monthly_stats_log`, skip |

## Roast Examples by Spicy Level

### Task completion < 50%

| Level | Copy |
|-------|------|
| 1 | "Room for improvement next month!" |
| 2 | "We've seen better months from you." |
| 3 | "Less than half. Tick is taking notes." |
| 4 | "LESS THAN HALF?? In THIS economy??" |
| 5 | "ABSOLUTELY UNHINGED BEHAVIOR. I'M TELLING EVERYONE." |

### Task completion 100%

| Level | Copy |
|-------|------|
| 1 | "Perfect month! Well done!" |
| 2 | "100%! Color us impressed." |
| 3 | "Perfect score. Who are you and what have you done with the usual mess?" |
| 4 | "100%?! EXCUSE ME?? Is this a bit??" |
| 5 | "100%??? I DON'T BELIEVE IT. SHOW ME THE RECEIPTS. ACTUALLY DON'T I'M SCARED." |

## Cron Configuration

Add to `supabase/config.toml`:
```toml
[functions.send-monthly-stats]
schedule = "0 9 1 * *"
```

## Testing

- Unit tests for stat calculations
- Unit tests for email copy generation at each spicy level
- Integration test with mock data
- Manual test by triggering function with test user
