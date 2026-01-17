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

// Deadline urgency levels for visual treatment
export type DeadlineUrgency = 'none' | 'low' | 'medium' | 'high' | 'critical' | 'overdue'

// Estimate comparison contexts for messaging
export type EstimateContext =
  | 'over_1_5x'            // 1.5x over estimate
  | 'over_2x'              // 2x over estimate
  | 'over_3x'              // 3x+ over estimate
  | 'under'                // Finished under estimate
  | 'way_under'            // 50%+ faster
  | 'spot_on'              // Within 10% of estimate
  | 'calibration_positive' // Getting more accurate
  | 'calibration_negative' // Pattern of underestimating

// Quick estimate presets
export const ESTIMATE_PRESETS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '1 hour', value: 60 },
  { label: '2 hours', value: 120 },
  { label: 'Half day', value: 240 },
] as const

// Brain state labels
export const BRAIN_STATE_LABELS: Record<BrainState, { hinged: string; unhinged: string }> = {
  1: { hinged: 'Very low energy', unhinged: 'Absolute garbage fire' },
  2: { hinged: 'Low energy', unhinged: 'Running on fumes' },
  3: { hinged: 'Moderate', unhinged: 'Baseline chaos' },
  4: { hinged: 'Good energy', unhinged: 'Actually functional' },
  5: { hinged: 'High energy', unhinged: 'Unstoppable chaos goblin' },
}
