// ABOUTME: TypeScript types for Task Paralysis Toolkit features.
// ABOUTME: Defines sessions, rituals, and paralysis detection.

export type BodyDoublingIntensity = 'passive' | 'checkins' | 'activity_aware' | 'coworking'

export type FiveMinutePhase = 'first_five' | 'five_to_ten' | 'ten_to_fifteen' | 'flow_state'

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
  phase: FiveMinutePhase
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

export interface WarmupState {
  isActive: boolean
  targetTaskId: string | null
  warmupQueue: string[]
  completedCount: number
  requiredCount: number
}

export interface ParalysisSignals {
  listViewsWithoutAction: number
  taskViewsWithoutStart: number
  sameTaskViewedRepeatedly: boolean
  timeOnListWithoutProgress: number
}

export type SuggestedTool = 'five_minutes' | 'shrink' | 'warmup' | 'body_double'

export const DEFAULT_STARTUP_RITUAL: StartupRitualStep[] = [
  { id: 'close-tabs', text: 'Close unnecessary tabs/apps', isDefault: true },
  { id: 'water', text: 'Get water/coffee', isDefault: true },
  { id: 'phone', text: 'Phone on silent or away', isDefault: true },
  { id: 'breathe', text: 'Take 3 deep breaths', isDefault: true },
  { id: 'pick-task', text: 'Pick your first task', isDefault: true },
]

export const DEFAULT_ENVIRONMENT_CHECKLIST: string[] = [
  'Water nearby?',
  'Phone away/silent?',
  'Snacks if needed?',
  'Bathroom break taken?',
  'Music/silence set?',
]

export const BODY_DOUBLING_LABELS: Record<BodyDoublingIntensity, { hinged: string; unhinged: string }> = {
  passive: { hinged: 'Passive presence', unhinged: 'Tick just vibin' },
  checkins: { hinged: 'Periodic check-ins', unhinged: 'Occasional pokes' },
  activity_aware: { hinged: 'Activity aware', unhinged: 'Watching your every move' },
  coworking: { hinged: 'Full co-working', unhinged: 'Work buddy mode' },
}

/**
 * Get the current phase based on elapsed minutes
 */
export function getFiveMinutePhase(elapsedMinutes: number): FiveMinutePhase {
  if (elapsedMinutes < 5) return 'first_five'
  if (elapsedMinutes < 10) return 'five_to_ten'
  if (elapsedMinutes < 15) return 'ten_to_fifteen'
  return 'flow_state'
}
