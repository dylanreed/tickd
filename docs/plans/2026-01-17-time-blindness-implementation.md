# Time Blindness Toolkit — Implementation Plan

**Feature:** Suite of tools helping ADHD brains perceive, track, and work within time
**Date:** 2026-01-17
**Complexity:** MEDIUM-HIGH
**Recommended Order:** Implement SECOND

---

## Complexity Assessment

### Why This is Medium Complexity

1. **Multiple independent components** — 5 distinct tools that can be built separately
2. **Timer logic required** — Background intervals, pause/resume, app lifecycle
3. **New database columns** — Time estimates, brain state, session data
4. **Visual complexity** — Deadline creep colors, countdown displays, animations
5. **State management** — Active timers must survive navigation and refresh

### What Makes It Manageable

- Components are mostly independent (can ship incrementally)
- No multi-user coordination
- Existing profile/task hooks provide foundation
- Copy already written in design doc

### Dependencies

- Pick For Me (optional) — Estimation data improves quick-win detection
- Existing task and profile systems
- Existing spiciness/theme infrastructure

---

## Component Breakdown

### Component Priority Order

| Order | Component | Value | Complexity | Standalone |
|-------|-----------|-------|------------|------------|
| 1 | Estimation Training | High | Low | Yes |
| 2 | Deadline Creep Visuals | High | Low | Yes |
| 3 | Time Passing Alerts | Medium | Medium | Yes |
| 4 | "I Have X Time" Mode | High | Medium | Yes |
| 5 | Daily Check-in | Medium | Medium | Depends on others |

---

## Phase 1: Data Layer & Types

**Estimated Time:** 2-3 hours

### Database Migration

```sql
-- Add to profiles table
ALTER TABLE profiles ADD COLUMN
  time_tools_enabled boolean DEFAULT true,
  daily_checkin_enabled boolean DEFAULT true,
  brain_state_affects_spiciness boolean DEFAULT true,
  time_sessions_enabled boolean DEFAULT true,
  milestone_alerts text DEFAULT 'off', -- 'off' | 'on' | 'custom'
  estimate_alerts_enabled boolean DEFAULT true,
  ambient_timer_enabled boolean DEFAULT true,
  deadline_visuals text DEFAULT 'match_app', -- 'hinged' | 'unhinged' | 'match_app'
  estimation_prompts_enabled boolean DEFAULT true,
  auto_pause_tracking boolean DEFAULT true,
  day_start_time time DEFAULT '00:00';

-- Add to tasks table
ALTER TABLE tasks ADD COLUMN
  estimated_minutes integer DEFAULT null,
  actual_minutes integer DEFAULT null;

-- New table for time sessions
CREATE TABLE time_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  session_type text NOT NULL, -- 'focus' | 'hard_deadline'
  started_at timestamptz NOT NULL,
  planned_end_at timestamptz NOT NULL,
  actual_end_at timestamptz,
  paused_at timestamptz,
  total_paused_seconds integer DEFAULT 0,
  status text DEFAULT 'active', -- 'active' | 'paused' | 'completed' | 'abandoned'
  created_at timestamptz DEFAULT now()
);

-- New table for daily check-ins
CREATE TABLE daily_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  checkin_date date NOT NULL,
  brain_state integer NOT NULL CHECK (brain_state BETWEEN 1 AND 5),
  time_budget_minutes integer,
  hard_stop_time time,
  selected_task_ids uuid[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, checkin_date)
);
```

### TypeScript Types

```typescript
// src/types/timeTools.ts
// ABOUTME: TypeScript types for Time Blindness Toolkit features.
// ABOUTME: Defines brain state, sessions, and time-related data.

export type BrainState = 1 | 2 | 3 | 4 | 5

export interface DailyCheckin {
  id: string
  userId: string
  checkinDate: string
  brainState: BrainState
  timeBudgetMinutes: number | null
  hardStopTime: string | null
  selectedTaskIds: string[]
  createdAt: string
}

export interface TimeSession {
  id: string
  userId: string
  taskId: string | null
  sessionType: 'focus' | 'hard_deadline'
  startedAt: string
  plannedEndAt: string
  actualEndAt: string | null
  pausedAt: string | null
  totalPausedSeconds: number
  status: 'active' | 'paused' | 'completed' | 'abandoned'
}

export interface TaskEstimate {
  taskId: string
  estimatedMinutes: number | null
  actualMinutes: number | null
}
```

---

## Phase 2: Estimation Training (Simplest Component)

**Estimated Time:** 4-5 hours

### Files to Create

1. `src/data/estimationMessages.ts` — Copy for over/under estimates
2. `src/hooks/useTaskEstimation.ts` — Track and compare estimates
3. `src/components/EstimatePrompt.tsx` — "How long?" on task creation
4. `src/components/EstimateReveal.tsx` — Show comparison on completion

### EstimatePrompt Integration

Modify `AddTaskForm.tsx`:

```typescript
// Add optional estimation step
const [showEstimate, setShowEstimate] = useState(false)
const [estimate, setEstimate] = useState<number | null>(null)

// Quick presets
const ESTIMATE_PRESETS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: 'Half day', value: 240 },
]
```

### Silent Time Tracking

Add to `useTasks.ts`:

```typescript
// Track when a task gains focus
const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
const [taskStartTime, setTaskStartTime] = useState<Date | null>(null)

const focusTask = (taskId: string) => {
  if (activeTaskId && taskStartTime) {
    // Record elapsed time for previous task
    saveElapsedTime(activeTaskId, taskStartTime)
  }
  setActiveTaskId(taskId)
  setTaskStartTime(new Date())
}
```

### Estimate Reveal on Completion

Modify `CompletionModal.tsx` to include:
- Estimated vs actual comparison
- Percentage over/under
- Accuracy-based copy from `estimationMessages.ts`

### Copy File Structure

```typescript
// src/data/estimationMessages.ts
export type EstimateContext =
  | 'over_1_5x'     // 1.5x over estimate
  | 'over_2x'       // 2x over estimate
  | 'over_3x'       // 3x+ over estimate
  | 'under'         // Finished under estimate
  | 'way_under'     // 50%+ faster
  | 'calibration_positive'  // Getting more accurate
  | 'calibration_negative'  // Pattern of underestimating
```

---

## Phase 3: Deadline Creep Visuals

**Estimated Time:** 3-4 hours

### Files to Create

1. `src/lib/deadlineUrgency.ts` — Calculate urgency level from time remaining
2. `src/components/DeadlineIndicator.tsx` — Visual urgency display

### Urgency Calculation

```typescript
// src/lib/deadlineUrgency.ts
// ABOUTME: Calculate visual urgency level from deadline proximity.
// ABOUTME: Used by DeadlineIndicator for color and animation.

export type DeadlineUrgency = 'none' | 'low' | 'medium' | 'high' | 'critical' | 'overdue'

export function getDeadlineUrgency(dueDate: Date, now: Date = new Date()): DeadlineUrgency {
  const hoursRemaining = (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60)

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 4) return 'critical'
  if (hoursRemaining < 24) return 'high'
  if (hoursRemaining < 72) return 'medium'  // 3 days
  if (hoursRemaining < 168) return 'low'    // 7 days
  return 'none'
}
```

### Visual Treatment

Modify `TaskCard.tsx` to use urgency colors:

```typescript
// Hinged mode - subtle colors
const hingedUrgencyColors: Record<DeadlineUrgency, string> = {
  none: '',
  low: 'border-l-4 border-l-amber-200',
  medium: 'border-l-4 border-l-amber-400',
  high: 'border-l-4 border-l-orange-500',
  critical: 'border-l-4 border-l-red-500',
  overdue: 'border-l-4 border-l-red-700 bg-red-50',
}

// Unhinged mode - dramatic
const unhingedUrgencyClasses: Record<DeadlineUrgency, string> = {
  none: '',
  low: 'animate-pulse-slow',
  medium: 'scale-[1.01] shadow-lg',
  high: 'scale-[1.02] shadow-xl animate-pulse',
  critical: 'scale-[1.03] shadow-2xl animate-bounce-subtle',
  overdue: 'scale-[1.05] animate-shake ring-2 ring-red-500',
}
```

### DeadlineIndicator Component

```typescript
// src/components/DeadlineIndicator.tsx
// ABOUTME: Visual countdown display that changes with urgency.
// ABOUTME: Shows relative time with escalating drama in unhinged mode.

interface DeadlineIndicatorProps {
  dueDate: Date
  urgency: DeadlineUrgency
  mode: 'hinged' | 'unhinged'
}
```

---

## Phase 4: Time Passing Alerts

**Estimated Time:** 4-5 hours

### Files to Create

1. `src/hooks/useTimeAlerts.ts` — Manage alert timers
2. `src/data/timeAlertMessages.ts` — Copy for milestone/estimate alerts
3. `src/components/TimeAlertToast.tsx` — Non-blocking notification display

### Alert Types

1. **Milestone Alerts** — Every 30 min, 1 hr, 2 hr, 3+ hr
2. **Estimate-Relative Alerts** — At 1.5x, 2x, 3x of estimate
3. **Ambient Timer** — Small elapsed display, no interruptions

### useTimeAlerts Hook

```typescript
// src/hooks/useTimeAlerts.ts
// ABOUTME: Manages background timers for time awareness alerts.
// ABOUTME: Handles milestone and estimate-relative notifications.

interface UseTimeAlertsConfig {
  milestoneInterval?: number  // minutes, default 30
  checkEstimates?: boolean
  onMilestone?: (minutes: number) => void
  onEstimateOverage?: (ratio: number) => void
}
```

### Toast Component

Follow similar pattern to speech bubble from Tick, but:
- Appears top-center
- Auto-dismisses after 5 seconds
- Can be manually dismissed
- Respects spiciness level for copy

### Ambient Timer (Optional Sub-component)

```typescript
// src/components/AmbientTimer.tsx
// ABOUTME: Small, glanceable elapsed time display.
// ABOUTME: Shows in corner, optionally pulses at intervals.

interface AmbientTimerProps {
  startTime: Date
  pulseInterval?: number  // minutes, 0 = no pulse
}
```

---

## Phase 5: "I Have X Time" Mode

**Estimated Time:** 5-6 hours

### Files to Create

1. `src/hooks/useTimeSession.ts` — Session state and timer
2. `src/components/TimeSessionModal.tsx` — Start session dialog
3. `src/components/TimeSessionBar.tsx` — Persistent countdown display
4. `src/components/TimeSessionEnd.tsx` — End/extend dialog
5. `src/data/timeSessionMessages.ts` — Copy for warnings and endings

### useTimeSession Hook

```typescript
// src/hooks/useTimeSession.ts
// ABOUTME: Manages timed work sessions with optional hard deadlines.
// ABOUTME: Handles start, pause, resume, and completion.

interface TimeSessionState {
  isActive: boolean
  sessionType: 'focus' | 'hard_deadline' | null
  startedAt: Date | null
  plannedEndAt: Date | null
  isPaused: boolean
  pausedAt: Date | null
  totalPausedMs: number
  remainingMs: number
}

interface UseTimeSessionReturn {
  state: TimeSessionState
  startSession: (type: 'focus' | 'hard_deadline', durationMinutes: number) => void
  startHardDeadline: (endTime: Date) => void
  pause: () => void
  resume: () => void
  extend: (additionalMinutes: number) => void
  end: () => void
}
```

### Session Bar Component

Persistent display at top of screen:
- Shows remaining time
- Color changes as time runs low
- Quick actions: pause/resume, end

### Warning Flow (Hard Deadline)

1. 15 minutes: Toast notification
2. 5 minutes: More urgent toast
3. 0 minutes: Full modal interruption

### Session Persistence

Store in localStorage for refresh survival:
- `tickd-time-session-{userId}`: SessionState

On page load, check for active session and resume timer.

---

## Phase 6: Daily Check-in

**Estimated Time:** 5-6 hours

### Files to Create

1. `src/hooks/useDailyCheckin.ts` — Check-in state and submission
2. `src/components/DailyCheckinModal.tsx` — Multi-step check-in flow
3. `src/data/dailyCheckinMessages.ts` — Brain state responses

### Check-in Detection

```typescript
// Trigger check-in if:
// 1. First visit of the day (after day_start_time)
// 2. No check-in exists for today
// 3. check-in is enabled in settings

const shouldShowCheckin = () => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const hasCheckinToday = checkins.some(c => c.checkinDate === today)
  return !hasCheckinToday && profile?.daily_checkin_enabled
}
```

### Multi-Step Modal

**Step 1: Brain State**
- 5 buttons with Tick expressions
- Labels: "Absolute garbage fire" to "Unstoppable chaos goblin"

**Step 2: Time Budget**
- Quick presets: 1 hour, 2-3 hours, Half day, Full day, No idea
- Optional: "I need to stop at [time picker]"

**Step 3: Task Selection**
- Show incomplete tasks
- Multi-select checkboxes
- Warning if selections exceed time budget

### Brain State Effects

```typescript
function getAdjustedSpiciness(baseLevel: number, brainState: BrainState): number {
  if (brainState <= 2) {
    // Low energy - reduce spiciness by 1-2 levels
    return Math.max(1, baseLevel - (3 - brainState))
  }
  return baseLevel  // Normal spiciness for state 3-5
}
```

---

## Phase 7: Settings Integration

**Estimated Time:** 2-3 hours

### New Settings Section: "Time Tools"

Add to `SettingsPage.tsx`:

```typescript
<section>
  <h2>Time Tools</h2>

  <Toggle label="Daily check-in" setting="daily_checkin_enabled" />
  <Toggle label="Brain state affects spiciness" setting="brain_state_affects_spiciness" />
  <Toggle label="Time sessions" setting="time_sessions_enabled" />

  <Select
    label="Milestone alerts"
    setting="milestone_alerts"
    options={['off', 'on', 'custom']}
  />

  <Toggle label="Estimate alerts" setting="estimate_alerts_enabled" />
  <Toggle label="Ambient timer" setting="ambient_timer_enabled" />

  <Select
    label="Deadline visuals"
    setting="deadline_visuals"
    options={['hinged', 'unhinged', 'match_app']}
  />

  <Toggle label="Estimation prompts" setting="estimation_prompts_enabled" />
  <Toggle label="Auto-pause tracking" setting="auto_pause_tracking" />
</section>
```

---

## File Summary

### New Files (18)

| File | Purpose |
|------|---------|
| `src/types/timeTools.ts` | TypeScript types |
| `src/lib/deadlineUrgency.ts` | Urgency calculation |
| `src/lib/deadlineUrgency.test.ts` | Urgency tests |
| `src/data/estimationMessages.ts` | Estimation copy |
| `src/data/timeAlertMessages.ts` | Alert copy |
| `src/data/timeSessionMessages.ts` | Session copy |
| `src/data/dailyCheckinMessages.ts` | Check-in copy |
| `src/hooks/useTaskEstimation.ts` | Estimation tracking |
| `src/hooks/useTimeAlerts.ts` | Alert timers |
| `src/hooks/useTimeSession.ts` | Session management |
| `src/hooks/useDailyCheckin.ts` | Check-in state |
| `src/components/EstimatePrompt.tsx` | Task estimate input |
| `src/components/EstimateReveal.tsx` | Completion comparison |
| `src/components/DeadlineIndicator.tsx` | Visual urgency |
| `src/components/TimeAlertToast.tsx` | Alert display |
| `src/components/AmbientTimer.tsx` | Elapsed display |
| `src/components/TimeSessionModal.tsx` | Start session |
| `src/components/TimeSessionBar.tsx` | Session countdown |
| `src/components/TimeSessionEnd.tsx` | End/extend dialog |
| `src/components/DailyCheckinModal.tsx` | Check-in flow |
| `supabase/migrations/xxx_add_time_tools.sql` | Database changes |

### Modified Files (5)

| File | Changes |
|------|---------|
| `src/components/AddTaskForm.tsx` | Add estimate prompt |
| `src/components/CompletionModal.tsx` | Add estimate reveal |
| `src/components/TaskCard.tsx` | Add urgency visuals |
| `src/pages/TaskListPage.tsx` | Integrate time tools |
| `src/pages/SettingsPage.tsx` | Add Time Tools section |

---

## Testing Strategy

### Unit Tests

1. Deadline urgency calculation
2. Estimate comparison math
3. Session timer logic
4. Brain state spiciness adjustment

### Integration Tests

1. Estimation flow: prompt → track → reveal
2. Session flow: start → warnings → end
3. Check-in flow: brain state → time → tasks
4. Alert triggers at correct times

### Manual Testing

1. Timer accuracy over long sessions
2. Session survival across refresh
3. Check-in appears correctly on new day
4. Visual urgency updates in real-time

---

## Technical Decisions Needed

1. **Timer Implementation:** `setInterval` vs `requestAnimationFrame` vs Web Workers
   - Recommendation: `setInterval` with drift correction for simplicity

2. **Session Persistence:** localStorage vs database
   - Recommendation: localStorage for active state, database for history

3. **Notification Method:** In-app toast vs browser notifications
   - Recommendation: Both — in-app for visible, browser for background

4. **Estimate Tracking:** Per-task timer vs manual entry
   - Recommendation: Automatic tracking with manual override option

---

## Incremental Delivery Plan

### MVP (Week 1)
- Estimation Training (prompt + reveal)
- Deadline Creep Visuals

### Full Feature (Week 2)
- Time Passing Alerts
- "I Have X Time" Mode

### Enhancement (Week 3)
- Daily Check-in
- Settings integration
- Calibration feedback

**Total Estimated Time:** 25-32 hours
