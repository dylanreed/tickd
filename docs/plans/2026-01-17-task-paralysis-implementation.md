# Task Paralysis Toolkit — Implementation Plan

**Feature:** Suite of tools helping ADHD brains overcome "frozen" executive dysfunction
**Date:** 2026-01-17
**Complexity:** HIGH
**Recommended Order:** Implement THIRD (after Pick For Me and Time Blindness)

---

## Complexity Assessment

### Why This is the Most Complex

1. **Highest component count** — 5 distinct tools with significant interaction
2. **Behavioral detection** — Must detect paralysis patterns (repeated views, no action)
3. **Session state complexity** — Body doubling requires continuous presence simulation
4. **Cross-feature integration** — Many touchpoints with other features
5. **User ritual customization** — User-defined checklists and workflows
6. **Activity tracking** — Must detect app switching, pauses, task focus

### Dependencies

- **Pick For Me** — Integrates with "Just 5 Minutes" trigger
- **Time Blindness** — Sessions respect time budgets/deadlines, brain state affects gentleness
- **Existing systems** — Tasks, profile, spiciness, Tick expressions

### What Makes It Manageable

- Components can be built independently
- Most copy already written in design doc
- Builds on existing modal and hook patterns
- No external API integrations

---

## Component Breakdown

### Component Priority Order

| Order | Component | Value | Complexity | Dependencies |
|-------|-----------|-------|------------|--------------|
| 1 | "Just 5 Minutes" | Very High | Medium | Minimal |
| 2 | Task Shrinking | High | Low | Minimal |
| 3 | Momentum Builder | High | Medium | Quick win detection |
| 4 | Body Doubling | Medium | High | Activity detection |
| 5 | Transition Help | Medium | High | Ritual storage |

---

## Phase 1: Data Layer & Types

**Estimated Time:** 2-3 hours

### Database Migration

```sql
-- Add to profiles table
ALTER TABLE profiles ADD COLUMN
  just_five_minutes_enabled boolean DEFAULT true,
  task_shrinking_enabled boolean DEFAULT true,
  body_doubling_enabled boolean DEFAULT true,
  body_doubling_intensity text DEFAULT 'coworking', -- 'passive' | 'checkins' | 'activity_aware' | 'coworking'
  momentum_builder_enabled boolean DEFAULT true,
  warmup_streak_size integer DEFAULT 3,
  transition_prompts_enabled boolean DEFAULT true,
  countdown_length integer DEFAULT 5, -- seconds
  startup_ritual jsonb DEFAULT '[]',
  environment_checklist jsonb DEFAULT '["Water nearby?", "Phone away/silent?", "Snacks if needed?", "Bathroom break taken?", "Music/silence set?"]';

-- New table for body doubling sessions
CREATE TABLE body_doubling_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  tasks_touched uuid[],
  pauses_detected integer DEFAULT 0,
  total_active_seconds integer DEFAULT 0,
  session_notes text,
  created_at timestamptz DEFAULT now()
);

-- New table for paralysis events (for pattern detection)
CREATE TABLE paralysis_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  event_type text NOT NULL, -- 'list_view' | 'task_view' | 'no_action_timeout' | 'tool_offered'
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  tool_offered text, -- 'five_minutes' | 'shrink' | 'warmup' | 'body_double'
  tool_accepted boolean,
  created_at timestamptz DEFAULT now()
);

-- Add to tasks table for micro-steps
ALTER TABLE tasks ADD COLUMN
  micro_steps jsonb DEFAULT null,
  current_micro_step integer DEFAULT null;
```

### TypeScript Types

```typescript
// src/types/paralysisTools.ts
// ABOUTME: TypeScript types for Task Paralysis Toolkit features.
// ABOUTME: Defines sessions, rituals, and paralysis detection.

export type BodyDoublingIntensity = 'passive' | 'checkins' | 'activity_aware' | 'coworking'

export interface BodyDoublingSession {
  id: string
  userId: string
  startedAt: string
  endedAt: string | null
  tasksTouched: string[]
  pausesDetected: number
  totalActiveSeconds: number
  sessionNotes: string | null
}

export interface FiveMinuteSession {
  taskId: string
  startedAt: Date
  phase: 'first_five' | 'five_to_ten' | 'ten_to_fifteen' | 'flow_state'
  isPaused: boolean
  pausedAt: Date | null
  totalPausedMs: number
}

export interface MicroStep {
  text: string
  completed: boolean
  completedAt: string | null
}

export interface StartupRitualStep {
  id: string
  text: string
  isDefault: boolean
}

export interface ParalysisDetectionConfig {
  listViewThreshold: number      // seconds on list without action
  taskViewThreshold: number      // seconds viewing single task
  repeatViewThreshold: number    // times viewing same item
}
```

---

## Phase 2: "Just 5 Minutes" Commitment

**Estimated Time:** 6-8 hours

### Files to Create

1. `src/hooks/useFiveMinutes.ts` — Session state and phase management
2. `src/components/FiveMinutesPrompt.tsx` — "Just do 5 minutes" button
3. `src/components/FiveMinutesTimer.tsx` — Active timer display
4. `src/components/FiveMinutesCheckpoint.tsx` — Phase transition modal
5. `src/data/fiveMinutesMessages.ts` — Copy for all phases

### useFiveMinutes Hook

```typescript
// src/hooks/useFiveMinutes.ts
// ABOUTME: Manages "Just 5 Minutes" commitment sessions.
// ABOUTME: Handles phase progression and clean exit logic.

interface UseFiveMinutesState {
  isActive: boolean
  taskId: string | null
  startedAt: Date | null
  phase: 'first_five' | 'five_to_ten' | 'ten_to_fifteen' | 'flow_state'
  elapsedMs: number
  isPaused: boolean
}

interface UseFiveMinutesReturn {
  state: UseFiveMinutesState
  start: (taskId: string) => void
  pause: () => void
  resume: () => void
  stop: (reason: 'clean_exit' | 'completed' | 'continue') => void
  complete: () => void
}
```

### Phase Logic

```typescript
function getPhase(elapsedMinutes: number): FiveMinutePhase {
  if (elapsedMinutes < 5) return 'first_five'
  if (elapsedMinutes < 10) return 'five_to_ten'
  if (elapsedMinutes < 15) return 'ten_to_fifteen'
  return 'flow_state'
}

function shouldShowCheckpoint(previousPhase: FiveMinutePhase, currentPhase: FiveMinutePhase): boolean {
  // Show checkpoint modal at phase transitions
  return previousPhase !== currentPhase
}
```

### Checkpoint Modal

At each phase transition:
- **First 5 complete:** "You kept your promise! Stop or keep going?"
  - Buttons: "I'm done" (no judgment) | "Keep going"
- **10 minutes:** Soft push with encouraging copy
  - Buttons: "Stop here" | "Keep going"
- **15 minutes:** Momentum capture
  - Tick goes quiet, no more checkpoints

### Integration with TaskCard

Add "Just 5 min" button to task cards when:
- Task is not already being worked on
- User has enabled the feature
- Paralysis might be detected (task viewed multiple times)

---

## Phase 3: Task Shrinking

**Estimated Time:** 4-5 hours

### Files to Create

1. `src/hooks/useTaskShrinking.ts` — Micro-step management
2. `src/components/ShrinkTaskModal.tsx` — "What's the first tiny step?"
3. `src/components/MicroStepView.tsx` — Display current micro-step
4. `src/data/taskShrinkingMessages.ts` — Copy and suggestions

### Suggested First Steps Database

```typescript
// src/data/taskShrinkingSuggestions.ts
// ABOUTME: Keyword-based suggestions for micro-steps.
// ABOUTME: Maps task title patterns to actionable first steps.

export const microStepSuggestions: Record<string, string[]> = {
  write: ['Open document', 'Write one sentence', 'Write the header'],
  draft: ['Open document', 'Write one sentence', 'Write the header'],
  email: ['Open inbox', 'Find the thread', 'Type the first line'],
  reply: ['Open inbox', 'Find the thread', 'Type the first line'],
  call: ['Find the number', 'Open phone app', 'Dial (don\'t call yet)'],
  phone: ['Find the number', 'Open phone app', 'Dial (don\'t call yet)'],
  clean: ['Pick up one item', 'Clear one surface', 'Set 2-minute timer'],
  organize: ['Pick up one item', 'Clear one surface', 'Set 2-minute timer'],
  fix: ['Open the file', 'Read the error', 'Google one thing'],
  debug: ['Open the file', 'Read the error', 'Google one thing'],
  plan: ['Open notes', 'Write the question', 'List 3 options'],
  figure: ['Open notes', 'Write the question', 'List 3 options'],
}

export function getSuggestedMicroSteps(taskTitle: string): string[] {
  const titleLower = taskTitle.toLowerCase()
  for (const [keyword, steps] of Object.entries(microStepSuggestions)) {
    if (titleLower.includes(keyword)) {
      return steps
    }
  }
  return ['Open what you need', 'Do one tiny thing', 'Write down the next action']
}
```

### ShrinkTaskModal

```typescript
// src/components/ShrinkTaskModal.tsx
// ABOUTME: Modal for breaking tasks into micro-steps.
// ABOUTME: Shows suggestions and accepts user input.

interface ShrinkTaskModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
  suggestions: string[]
  onSubmit: (microStep: string) => void
  spicyLevel: number
  theme: 'hinged' | 'unhinged'
}
```

### MicroStepView

When a task has active micro-steps:
- Replace task card content with current micro-step
- Show progress: "Step 1 of 3"
- Buttons: "Done with this step" | "I've got momentum"

---

## Phase 4: Momentum Builder

**Estimated Time:** 5-6 hours

### Files to Create

1. `src/hooks/useMomentumBuilder.ts` — Warmup queue management
2. `src/components/WarmupOffer.tsx` — "Want to warm up first?"
3. `src/components/WarmupQueue.tsx` — Queue of quick tasks
4. `src/components/WarmupComplete.tsx` — "Ready for the big one?"
5. `src/data/momentumMessages.ts` — Copy for offers and progress

### Quick Task Detection

Reuse from Pick For Me algorithm:

```typescript
// src/lib/quickWinDetection.ts
// ABOUTME: Identifies tasks likely to be quick wins.
// ABOUTME: Used by Pick For Me and Momentum Builder.

export function isQuickWin(task: Task): boolean {
  const quickKeywords = ['call', 'email', 'text', 'check', 'send', 'reply', 'book', 'schedule', 'confirm', 'order']
  const titleLower = task.title.toLowerCase()

  // Keyword match
  if (quickKeywords.some(kw => titleLower.includes(kw))) return true

  // Short title (likely simple task)
  if (task.title.length < 25) return true

  // Has estimate under 30 minutes
  if (task.estimated_minutes && task.estimated_minutes <= 30) return true

  return false
}
```

### useMomentumBuilder Hook

```typescript
// src/hooks/useMomentumBuilder.ts
// ABOUTME: Manages warmup task queue for momentum building.
// ABOUTME: Tracks streak progress before main task.

interface UseMomentumBuilderState {
  isActive: boolean
  targetTaskId: string | null      // The scary task to tackle after warmup
  warmupQueue: string[]            // Task IDs in warmup order
  completedCount: number
  requiredCount: number
}

interface UseMomentumBuilderReturn {
  state: UseMomentumBuilderState
  startWarmup: (targetTaskId: string, streakSize?: number) => void
  completeWarmupTask: (taskId: string) => void
  skipToTarget: () => void
  cancel: () => void
}
```

### Warmup Flow

1. User clicks "Warm up first" on scary task
2. Show WarmupQueue with 3-5 quick tasks
3. User completes quick tasks, progress tracked
4. After streak: "Warmed up! Ready for the big one?"
5. Scary task becomes active focus

---

## Phase 5: Body Doubling

**Estimated Time:** 8-10 hours (Most Complex)

### Files to Create

1. `src/hooks/useBodyDoubling.ts` — Session and activity tracking
2. `src/components/BodyDoublingStart.tsx` — "Work with me" entry point
3. `src/components/BodyDoublingSession.tsx` — Active session overlay
4. `src/components/BodyDoublingTick.tsx` — Animated Tick co-working
5. `src/components/BodyDoublingCheckin.tsx` — Periodic check-in toast
6. `src/data/bodyDoublingMessages.ts` — Copy for all interactions

### Activity Detection

```typescript
// src/hooks/useActivityDetection.ts
// ABOUTME: Detects user activity patterns for body doubling.
// ABOUTME: Tracks focus, pauses, and task switching.

interface ActivityState {
  lastActivityAt: Date
  currentTaskId: string | null
  isPaused: boolean
  pauseStartedAt: Date | null
  totalPausedMs: number
}

interface UseActivityDetectionReturn {
  state: ActivityState
  recordActivity: () => void
  onTaskFocus: (taskId: string) => void
  onTaskBlur: () => void
  isPausedTooLong: (threshold: number) => boolean
}
```

Activity is recorded on:
- Mouse movement (throttled)
- Key presses (throttled)
- Touch events
- Task interactions

### Body Doubling Intensities

```typescript
// Level A: Passive Presence
// - Tick visible, occasional expression changes
// - No interruptions

// Level B: Check-ins
// - Ping every 10-15 minutes (configurable)
// - "Still working? You got this!"

// Level C: Activity Aware
// - Notices pauses longer than 2 minutes
// - "You paused. Need a break or got stuck?"
// - Notices task switching
// - "Switching tasks? That's okay, just noting it."

// Level D: Co-working (Default)
// - All of above plus:
// - Tick animates (typing, thinking, nodding)
// - Celebrates small progress
// - Session summary at end
```

### BodyDoublingTick Component

Extended Tick with:
- Animation states: `idle`, `typing`, `thinking`, `nodding`, `celebrating`
- Speech bubble for check-ins
- Different behavior based on intensity level

```typescript
// src/components/BodyDoublingTick.tsx
// ABOUTME: Animated Tick for body doubling sessions.
// ABOUTME: Simulates active co-working presence.

interface BodyDoublingTickProps {
  intensity: BodyDoublingIntensity
  isPaused: boolean
  lastActivityAt: Date
  onCheckIn: () => void
  spicyLevel: number
}
```

### Session Summary

At session end, show:
- Duration
- Tasks touched
- Pauses detected
- Encouraging message based on productivity

---

## Phase 6: Transition Help

**Estimated Time:** 6-7 hours

### Files to Create

1. `src/hooks/useTransitionHelp.ts` — Transition detection and rituals
2. `src/components/TransitionPrompt.tsx` — "Ready to start?"
3. `src/components/RitualWalkthrough.tsx` — Step-by-step ritual
4. `src/components/CountdownTimer.tsx` — Visual countdown to start
5. `src/components/EnvironmentCheck.tsx` — Pre-work checklist
6. `src/components/RitualEditor.tsx` — Settings page ritual customization
7. `src/data/transitionMessages.ts` — Copy for prompts and completions

### Transition Detection

```typescript
// Trigger transition prompt when:
// 1. App opened after significant absence (> 30 min)
// 2. Repeated list views without starting a task
// 3. Manual "Start my ritual" button press

function shouldOfferTransition(
  lastActivityAt: Date | null,
  listViewCount: number,
  hasStartedTask: boolean
): boolean {
  const now = new Date()

  // Returning after long absence
  if (lastActivityAt) {
    const absenceMinutes = (now.getTime() - lastActivityAt.getTime()) / 60000
    if (absenceMinutes > 30) return true
  }

  // Stuck on list
  if (listViewCount >= 3 && !hasStartedTask) return true

  return false
}
```

### Ritual Walkthrough

```typescript
// src/components/RitualWalkthrough.tsx
// ABOUTME: Step-by-step guide through user's startup ritual.
// ABOUTME: Each step must be confirmed before proceeding.

interface RitualWalkthroughProps {
  steps: StartupRitualStep[]
  onComplete: () => void
  onSkip: () => void
  spicyLevel: number
  theme: 'hinged' | 'unhinged'
}
```

Default ritual steps:
1. Close unnecessary tabs/apps
2. Get water/coffee
3. Phone on silent or away
4. Take 3 deep breaths
5. Pick your first task

### CountdownTimer

```typescript
// src/components/CountdownTimer.tsx
// ABOUTME: Visual countdown before starting work.
// ABOUTME: Provides mental runway for task transition.

interface CountdownTimerProps {
  seconds: number  // 5, 10, or 30
  onComplete: () => void
  onCancel: () => void
}
```

Visual:
- Large numbers in center
- Progress ring animation
- Tick watching anticipatorily
- "Starting in 5... 4... 3... 2... 1... Go."

### Environment Check

Quick checklist modal:
- Checkboxes for each item
- User can add/remove items in settings
- "All set!" button when ready

---

## Phase 7: Paralysis Detection System

**Estimated Time:** 4-5 hours

### Files to Create

1. `src/hooks/useParalysisDetection.ts` — Pattern recognition
2. `src/components/ParalysisIntervention.tsx` — Tool suggestion overlay

### Detection Patterns

```typescript
// src/hooks/useParalysisDetection.ts
// ABOUTME: Detects paralysis patterns from user behavior.
// ABOUTME: Triggers appropriate tool suggestions.

interface ParalysisSignals {
  listViewsWithoutAction: number
  taskViewsWithoutStart: number
  sameTaskViewedRepeatedly: boolean
  timeOnListWithoutProgress: number  // seconds
}

interface ParalysisDetectionReturn {
  signals: ParalysisSignals
  suggestedTool: 'five_minutes' | 'shrink' | 'warmup' | 'body_double' | null
  offerIntervention: () => void
  dismissIntervention: () => void
}
```

### Tool Selection Logic

```typescript
function selectToolForParalysis(signals: ParalysisSignals, brainState?: BrainState): SuggestedTool {
  // If same task viewed repeatedly: Task Shrinking
  if (signals.sameTaskViewedRepeatedly) return 'shrink'

  // If low brain state: Body Doubling (gentle company)
  if (brainState && brainState <= 2) return 'body_double'

  // If browsing list but not starting: Momentum Builder
  if (signals.listViewsWithoutAction >= 3) return 'warmup'

  // Default: Just 5 Minutes
  return 'five_minutes'
}
```

### Intervention Overlay

Non-blocking suggestion:
- Small banner at bottom
- "Looks like you're stuck. Want to try [tool]?"
- "Yes, help me" | "I'm fine"
- Auto-dismisses if ignored twice, backs off

---

## Phase 8: Settings Integration

**Estimated Time:** 2-3 hours

### New Settings Section: "Paralysis Tools"

```typescript
<section>
  <h2>Paralysis Tools</h2>

  <Toggle label='"Just 5 Minutes"' setting="just_five_minutes_enabled" />
  <Toggle label="Task shrinking" setting="task_shrinking_enabled" />
  <Toggle label="Body doubling" setting="body_doubling_enabled" />

  <Select
    label="Body doubling intensity"
    setting="body_doubling_intensity"
    options={['passive', 'checkins', 'activity_aware', 'coworking']}
    disabled={!profile.body_doubling_enabled}
  />

  <Toggle label="Momentum builder" setting="momentum_builder_enabled" />

  <NumberInput
    label="Warmup streak size"
    setting="warmup_streak_size"
    min={1}
    max={5}
    disabled={!profile.momentum_builder_enabled}
  />

  <Toggle label="Transition prompts" setting="transition_prompts_enabled" />

  <Select
    label="Countdown length"
    setting="countdown_length"
    options={[5, 10, 30]}
  />

  <RitualEditor
    steps={profile.startup_ritual}
    onChange={(steps) => updateProfile({ startup_ritual: steps })}
  />

  <ChecklistEditor
    items={profile.environment_checklist}
    onChange={(items) => updateProfile({ environment_checklist: items })}
  />
</section>
```

---

## File Summary

### New Files (25+)

| File | Purpose |
|------|---------|
| `src/types/paralysisTools.ts` | TypeScript types |
| `src/lib/quickWinDetection.ts` | Quick win identification |
| `src/lib/quickWinDetection.test.ts` | Quick win tests |
| `src/hooks/useFiveMinutes.ts` | 5-minute session management |
| `src/hooks/useTaskShrinking.ts` | Micro-step management |
| `src/hooks/useMomentumBuilder.ts` | Warmup queue management |
| `src/hooks/useBodyDoubling.ts` | Body doubling sessions |
| `src/hooks/useActivityDetection.ts` | Activity pattern tracking |
| `src/hooks/useTransitionHelp.ts` | Transition detection |
| `src/hooks/useParalysisDetection.ts` | Paralysis pattern recognition |
| `src/data/fiveMinutesMessages.ts` | 5-minute copy |
| `src/data/taskShrinkingMessages.ts` | Shrinking copy |
| `src/data/taskShrinkingSuggestions.ts` | Micro-step suggestions |
| `src/data/momentumMessages.ts` | Momentum copy |
| `src/data/bodyDoublingMessages.ts` | Body doubling copy |
| `src/data/transitionMessages.ts` | Transition copy |
| `src/components/FiveMinutesPrompt.tsx` | Start 5-minute button |
| `src/components/FiveMinutesTimer.tsx` | Active timer display |
| `src/components/FiveMinutesCheckpoint.tsx` | Phase transition modal |
| `src/components/ShrinkTaskModal.tsx` | Micro-step creation |
| `src/components/MicroStepView.tsx` | Current step display |
| `src/components/WarmupOffer.tsx` | Warmup suggestion |
| `src/components/WarmupQueue.tsx` | Quick task queue |
| `src/components/WarmupComplete.tsx` | Ready for main task |
| `src/components/BodyDoublingStart.tsx` | Session entry |
| `src/components/BodyDoublingSession.tsx` | Session overlay |
| `src/components/BodyDoublingTick.tsx` | Animated co-working Tick |
| `src/components/BodyDoublingCheckin.tsx` | Check-in toast |
| `src/components/TransitionPrompt.tsx` | Transition offer |
| `src/components/RitualWalkthrough.tsx` | Step-by-step ritual |
| `src/components/CountdownTimer.tsx` | Visual countdown |
| `src/components/EnvironmentCheck.tsx` | Pre-work checklist |
| `src/components/RitualEditor.tsx` | Ritual customization |
| `src/components/ParalysisIntervention.tsx` | Tool suggestion |
| `supabase/migrations/xxx_add_paralysis_tools.sql` | Database changes |

### Modified Files (5)

| File | Changes |
|------|---------|
| `src/components/TaskCard.tsx` | Add 5-min button, micro-step view |
| `src/components/Tick.tsx` | Add body doubling expressions |
| `src/pages/TaskListPage.tsx` | Integrate all paralysis tools |
| `src/pages/SettingsPage.tsx` | Add Paralysis Tools section |
| `src/hooks/useProfile.ts` | Add new profile fields |

---

## Testing Strategy

### Unit Tests

1. Phase calculation for 5-minute sessions
2. Micro-step suggestion matching
3. Quick win detection accuracy
4. Paralysis signal calculation
5. Tool selection logic

### Integration Tests

1. 5-minute flow: start → checkpoint → complete/exit
2. Shrinking flow: prompt → step → next step → momentum
3. Warmup flow: offer → queue → complete → target
4. Body doubling: start → activity → pause detection → end
5. Transition: detection → prompt → ritual → countdown → start

### Manual Testing

1. Activity detection accuracy
2. Paralysis detection timing
3. Session persistence across refresh
4. Ritual editor functionality
5. Multi-tool interaction (e.g., 5 min within body double session)

---

## Technical Decisions Needed

1. **Activity Detection Method:** Mouse/keyboard events vs Page Visibility API
   - Recommendation: Combination — events for active, visibility for away

2. **Tick Animation:** CSS animations vs requestAnimationFrame vs Lottie
   - Recommendation: CSS keyframe animations for simplicity

3. **Session Overlap:** Can user have body double + 5 min session simultaneously?
   - Recommendation: Yes, body double is ambient, 5 min is focused

4. **Paralysis Detection Persistence:** Session-only vs persist patterns?
   - Recommendation: Session-only for privacy, aggregate stats to DB

5. **Ritual Storage:** JSON in profile vs separate table
   - Recommendation: JSON in profile (simpler, rituals are small)

---

## Integration with Other Features

### Pick For Me

- "Just 5 Minutes" can be triggered on picked task
- Single-task mode can use body doubling

### Time Blindness

- 5-minute sessions respect hard deadlines
- Brain state affects prompt gentleness
- Time sessions can trigger body doubling

### Spiciness System

All copy respects current spiciness level.

### Monthly Stats

Track:
- 5-minute sessions started/completed
- Tasks shrunk / micro-steps completed
- Body doubling sessions and duration
- Paralysis interventions offered/accepted

---

## Incremental Delivery Plan

### MVP (Week 1)
- "Just 5 Minutes" commitment
- Task Shrinking

### Core Features (Week 2)
- Momentum Builder
- Basic paralysis detection

### Full Experience (Week 3)
- Body Doubling (all intensities)
- Transition Help (prompts, countdown)

### Polish (Week 4)
- Ritual editor
- Environment check
- Settings integration
- Cross-feature integration

**Total Estimated Time:** 40-50 hours
