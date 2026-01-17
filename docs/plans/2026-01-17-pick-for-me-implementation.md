# Pick For Me — Implementation Plan

**Feature:** Decision overwhelm helper with escalating single-task mode
**Date:** 2026-01-17
**Complexity:** LOW-MEDIUM (Easiest of the three features)
**Recommended Order:** Implement FIRST

---

## Complexity Assessment

### Why This is the Easiest

1. **Self-contained UI** — Button + modal + single-task view, minimal page restructuring
2. **No new database tables** — Uses existing `tasks` table, state is local/session
3. **Simple algorithm** — Weighted random selection, no time tracking required
4. **Existing patterns** — Similar to ExcuseModal, CompletionModal patterns already in place
5. **No timers** — Unlike Time Blindness, no background intervals or timing logic

### Dependencies

- Existing `useTasks` hook for task data
- Existing `useProfile` for reliability score
- Existing spiciness level system for copy selection
- Existing Tick component for expressions

---

## Phase 1: Core Selection Algorithm

**Estimated Time:** 2-3 hours

### Files to Create

1. `src/lib/pickForMe.ts` — Selection algorithm
2. `src/data/pickForMeMessages.ts` — All copy organized by spiciness level

### Algorithm Implementation

```typescript
// src/lib/pickForMe.ts
// ABOUTME: Weighted random task selection algorithm for Pick For Me.
// ABOUTME: Pretends to be random but uses smart prioritization.

interface TaskWeight {
  taskId: string
  weight: number
  reasons: string[]
}

interface PickConfig {
  deadlineProximityWeight: number  // 0.3 - high
  taskAgeWeight: number            // 0.2 - medium
  quickWinWeight: number           // 0.2 - medium
  streakProtectionWeight: number   // 0.25 - high
  randomnessWeight: number         // 0.05 - keeps it feeling random
}
```

### Quick Win Detection (Phase 1)

Keywords that indicate quick tasks:
- "call", "email", "text", "check", "send", "reply", "book", "schedule", "confirm", "order"
- Title length < 30 characters
- No complex punctuation (no colons suggesting multi-step)

### Files to Modify

None in Phase 1 — pure utility functions.

### Tests to Write

1. `src/lib/pickForMe.test.ts`
   - Weight calculation for deadline proximity
   - Weight calculation for task age
   - Quick win keyword detection
   - Randomness factor application
   - Edge case: only overdue tasks

---

## Phase 2: Copy Data File

**Estimated Time:** 1-2 hours

### File to Create

`src/data/pickForMeMessages.ts` — Following pattern from `overdueMessages.ts`

```typescript
// ABOUTME: Contains all Pick For Me messages organized by context and spiciness.
// ABOUTME: Messages use <user_name> as a placeholder for personalization.

export type PickForMeContext =
  | 'random_selection'
  | 'escalation_trigger'
  | 'dismissal'
  | 'earnout_progress'
  | 'earnout_complete'
  | 'all_overdue'

export type SpicyLevel = 1 | 2 | 3 | 4 | 5

export interface PickForMeMessage {
  text: string
  context: PickForMeContext
  spicyLevel: SpicyLevel
  hasUserName: boolean
}
```

### Copy Migration

Copy all messages from design doc:
- Random Selection: 10 messages
- Escalation Trigger: 50 messages (10 per level)
- Dismissal ("Can't right now"): 50 messages (10 per level)
- Earn-Out Progress: 10 messages
- Earn-Out Complete: 50 messages (10 per level)
- All Tasks Overdue: 10 messages

---

## Phase 3: Pick For Me Hook

**Estimated Time:** 2-3 hours

### File to Create

`src/hooks/usePickForMe.ts`

```typescript
// ABOUTME: Hook for Pick For Me feature state and actions.
// ABOUTME: Manages selection, escalation, and single-task mode.

interface PickForMeState {
  isActive: boolean
  pickedTaskId: string | null
  pickCount: number
  inSingleTaskMode: boolean
  tasksToComplete: number
  tasksCompleted: number
}

interface UsePickForMeReturn {
  state: PickForMeState
  pickTask: () => string | null
  dismissPick: () => void
  completePick: () => void
  exitSingleTaskMode: () => void
  canUsePick: boolean
}
```

### State Management

- Store in React state (session-level persistence)
- Consider localStorage for cross-refresh persistence:
  - `tickd-single-task-mode-{userId}`: boolean
  - `tickd-earnout-remaining-{userId}`: number

### Reliability-Based Earn-Out Thresholds

```typescript
function getEarnOutThreshold(reliabilityScore: number): number {
  if (reliabilityScore >= 80) return 1
  if (reliabilityScore >= 50) return 2
  if (reliabilityScore >= 25) return 3
  return 4
}
```

### Tests to Write

1. `src/hooks/usePickForMe.test.ts`
   - Initial state is inactive
   - First pick selects a task
   - Second pick triggers escalation
   - Dismissal doesn't count toward earn-out
   - Completion counts toward earn-out
   - Earn-out threshold based on reliability

---

## Phase 4: UI Components

**Estimated Time:** 3-4 hours

### Files to Create

1. `src/components/PickForMeButton.tsx`
2. `src/components/PickedTaskHighlight.tsx`
3. `src/components/SingleTaskMode.tsx`
4. `src/components/EscalationModal.tsx`

### PickForMeButton

```typescript
// ABOUTME: Floating button to trigger Pick For Me selection.
// ABOUTME: Hidden when < 2 tasks or in single-task mode.

interface PickForMeButtonProps {
  onPick: () => void
  isFirstPick: boolean
  theme: 'hinged' | 'unhinged'
}
```

- Positioned near Tick (bottom right, above Tick)
- Icon: dice or shuffle
- Shows "Pick For Me" initially, "Pick Again" after first pick

### PickedTaskHighlight

Modify `TaskCard.tsx` to accept `isHighlighted` prop:
- Glow/border effect
- Other cards get `opacity-50` class

### SingleTaskMode

```typescript
// ABOUTME: Full-view replacement showing one task at a time.
// ABOUTME: User must complete tasks to unlock full list.

interface SingleTaskModeProps {
  task: TaskWithFakeDate
  tasksRemaining: number
  totalRequired: number
  onComplete: () => void
  onDismiss: () => void
  theme: 'hinged' | 'unhinged'
  spicyLevel: number
}
```

- Full screen replacement (not modal)
- Large, centered task card
- Progress indicator: "Complete 2 more to unlock your list"
- Two buttons: "Done" and "Can't right now"

### EscalationModal

Similar to `ExcuseModal.tsx` pattern:
- Shows when escalation triggers
- Displays escalation copy based on spiciness
- "Got it" button enters single-task mode

---

## Phase 5: TaskListPage Integration

**Estimated Time:** 2-3 hours

### Modifications to TaskListPage.tsx

```typescript
// Add to imports
import { usePickForMe } from '../hooks/usePickForMe'
import PickForMeButton from '../components/PickForMeButton'
import SingleTaskMode from '../components/SingleTaskMode'
import EscalationModal from '../components/EscalationModal'

// Add to component
const pickForMe = usePickForMe(pendingTasks, profile?.reliability_score ?? 50)

// Conditional rendering
if (pickForMe.state.inSingleTaskMode) {
  const currentTask = pendingTasks.find(t => t.id === pickForMe.state.pickedTaskId)
  return <SingleTaskMode ... />
}
```

### Button Visibility Logic

```typescript
const showPickForMeButton =
  !pickForMe.state.inSingleTaskMode &&
  pendingTasks.length >= 2
```

### Task Highlighting

```typescript
{pendingTasks.map(task => (
  <TaskCard
    key={task.id}
    task={task}
    isHighlighted={task.id === pickForMe.state.pickedTaskId}
    isDimmed={pickForMe.state.pickedTaskId && task.id !== pickForMe.state.pickedTaskId}
    ...
  />
))}
```

---

## Phase 6: Settings Integration

**Estimated Time:** 1 hour

### Modifications

Add to profile type and database:
- `pick_for_me_enabled: boolean` (default: true)
- `single_task_escalation_enabled: boolean` (default: true)
- `show_earnout_progress: boolean` (default: true)

### Database Migration

```sql
ALTER TABLE profiles
ADD COLUMN pick_for_me_enabled boolean DEFAULT true,
ADD COLUMN single_task_escalation_enabled boolean DEFAULT true,
ADD COLUMN show_earnout_progress boolean DEFAULT true;
```

### SettingsPage Addition

Add "Focus Tools" section with toggles.

---

## File Summary

### New Files (9)

| File | Purpose |
|------|---------|
| `src/lib/pickForMe.ts` | Selection algorithm |
| `src/lib/pickForMe.test.ts` | Algorithm tests |
| `src/data/pickForMeMessages.ts` | Copy organized by context/spiciness |
| `src/hooks/usePickForMe.ts` | State management hook |
| `src/hooks/usePickForMe.test.ts` | Hook tests |
| `src/components/PickForMeButton.tsx` | Floating action button |
| `src/components/SingleTaskMode.tsx` | Full-view single task display |
| `src/components/EscalationModal.tsx` | Escalation notification |
| `supabase/migrations/xxx_add_pick_for_me_settings.sql` | DB migration |

### Modified Files (4)

| File | Changes |
|------|---------|
| `src/pages/TaskListPage.tsx` | Add hook, button, conditional rendering |
| `src/components/TaskCard.tsx` | Add highlight/dim props |
| `src/pages/SettingsPage.tsx` | Add Focus Tools section |
| `src/hooks/useProfile.ts` | Add new profile fields |

---

## Testing Strategy

### Unit Tests

1. Algorithm weight calculations
2. Quick win keyword detection
3. Earn-out threshold logic
4. Hook state transitions

### Integration Tests

1. Button appears with 2+ tasks
2. First pick highlights task
3. Second pick shows escalation modal
4. Single-task mode renders correctly
5. Completion counts toward earn-out
6. Earn-out restores full list

### E2E Tests (Manual)

1. Full flow: pick → pick again → single-task → earn out
2. Settings toggles respected
3. Persistence across page refresh

---

## Technical Decisions Needed

1. **State Persistence:** localStorage vs database for single-task mode state
   - Recommendation: localStorage (faster, session-appropriate)

2. **Tick Integration:** Should Tick show special expression during single-task mode?
   - Recommendation: Yes, add "focused" or use "judgmental" expression

3. **Notification Handling:** If user completes task via push notification while in single-task mode
   - Recommendation: Count toward earn-out, handled by completeTask callback

---

## Implementation Order

1. Create `pickForMeMessages.ts` (copy from design doc)
2. Create `pickForMe.ts` algorithm with tests
3. Create `usePickForMe.ts` hook with tests
4. Create UI components
5. Integrate into TaskListPage
6. Add settings controls
7. Manual testing and polish

**Total Estimated Time:** 12-16 hours
