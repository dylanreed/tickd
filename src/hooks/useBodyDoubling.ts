// ABOUTME: Manages body doubling sessions for virtual co-working.
// ABOUTME: Tracks activity, pauses, and provides check-in prompts.

import { useState, useCallback, useEffect, useRef } from 'react'
import type { BodyDoublingIntensity } from '../types/paralysisTools'
import { useActivityDetection } from './useActivityDetection'

interface BodyDoublingSession {
  id: string
  startedAt: Date
  tasksTouched: string[]
  pausesDetected: number
  checkinsDismissed: number
}

interface UseBodyDoublingState {
  isActive: boolean
  session: BodyDoublingSession | null
  intensity: BodyDoublingIntensity
  showCheckin: boolean
  lastPauseNotifiedAt: Date | null
}

interface UseBodyDoublingReturn {
  state: UseBodyDoublingState
  activity: ReturnType<typeof useActivityDetection>
  /** Start a body doubling session */
  startSession: (intensity?: BodyDoublingIntensity) => void
  /** End the current session */
  endSession: () => SessionSummary | null
  /** Record a task touch */
  touchTask: (taskId: string) => void
  /** Dismiss the current checkin */
  dismissCheckin: () => void
  /** Get session duration in seconds */
  getSessionDurationSeconds: () => number
}

interface SessionSummary {
  durationSeconds: number
  tasksTouched: number
  pausesDetected: number
  checkinsDismissed: number
}

const STORAGE_KEY = 'tickd_body_doubling_session'
const CHECKIN_INTERVALS: Record<BodyDoublingIntensity, number> = {
  passive: 0, // No check-ins
  checkins: 15 * 60 * 1000, // 15 minutes
  activity_aware: 10 * 60 * 1000, // 10 minutes
  coworking: 8 * 60 * 1000, // 8 minutes
}
const PAUSE_THRESHOLD_MS = 2 * 60 * 1000 // 2 minutes

interface StoredSession {
  id: string
  startedAt: string
  tasksTouched: string[]
  pausesDetected: number
  checkinsDismissed: number
  intensity: BodyDoublingIntensity
}

function getStoredSession(): StoredSession | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as StoredSession
  } catch {
    return null
  }
}

function saveSession(session: StoredSession | null): void {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage might be unavailable
  }
}

function generateId(): string {
  return `bd_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function useBodyDoubling(): UseBodyDoublingReturn {
  const activity = useActivityDetection()

  const [state, setState] = useState<UseBodyDoublingState>(() => {
    const stored = getStoredSession()
    if (stored) {
      return {
        isActive: true,
        session: {
          id: stored.id,
          startedAt: new Date(stored.startedAt),
          tasksTouched: stored.tasksTouched,
          pausesDetected: stored.pausesDetected,
          checkinsDismissed: stored.checkinsDismissed,
        },
        intensity: stored.intensity,
        showCheckin: false,
        lastPauseNotifiedAt: null,
      }
    }
    return {
      isActive: false,
      session: null,
      intensity: 'coworking',
      showCheckin: false,
      lastPauseNotifiedAt: null,
    }
  })

  const lastCheckinRef = useRef<number>(Date.now())
  const checkinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Start a session
  const startSession = useCallback((intensity: BodyDoublingIntensity = 'coworking') => {
    const session: BodyDoublingSession = {
      id: generateId(),
      startedAt: new Date(),
      tasksTouched: [],
      pausesDetected: 0,
      checkinsDismissed: 0,
    }

    saveSession({
      ...session,
      startedAt: session.startedAt.toISOString(),
      intensity,
    })

    setState({
      isActive: true,
      session,
      intensity,
      showCheckin: false,
      lastPauseNotifiedAt: null,
    })

    lastCheckinRef.current = Date.now()
  }, [])

  // End session and return summary
  const endSession = useCallback((): SessionSummary | null => {
    if (!state.session) return null

    const summary: SessionSummary = {
      durationSeconds: Math.floor(
        (Date.now() - state.session.startedAt.getTime()) / 1000
      ),
      tasksTouched: state.session.tasksTouched.length,
      pausesDetected: state.session.pausesDetected,
      checkinsDismissed: state.session.checkinsDismissed,
    }

    saveSession(null)
    setState({
      isActive: false,
      session: null,
      intensity: 'coworking',
      showCheckin: false,
      lastPauseNotifiedAt: null,
    })

    return summary
  }, [state.session])

  // Record a task touch
  const touchTask = useCallback((taskId: string) => {
    setState(prev => {
      if (!prev.session) return prev

      // Don't add duplicate
      if (prev.session.tasksTouched.includes(taskId)) return prev

      const newTasks = [...prev.session.tasksTouched, taskId]
      const newSession = { ...prev.session, tasksTouched: newTasks }

      // Update storage
      const stored = getStoredSession()
      if (stored) {
        saveSession({ ...stored, tasksTouched: newTasks })
      }

      return {
        ...prev,
        session: newSession,
      }
    })
  }, [])

  // Dismiss checkin
  const dismissCheckin = useCallback(() => {
    lastCheckinRef.current = Date.now()

    setState(prev => {
      if (!prev.session) return prev

      const newDismissed = prev.session.checkinsDismissed + 1
      const newSession = { ...prev.session, checkinsDismissed: newDismissed }

      // Update storage
      const stored = getStoredSession()
      if (stored) {
        saveSession({ ...stored, checkinsDismissed: newDismissed })
      }

      return {
        ...prev,
        session: newSession,
        showCheckin: false,
      }
    })
  }, [])

  // Get session duration
  const getSessionDurationSeconds = useCallback(() => {
    if (!state.session) return 0
    return Math.floor((Date.now() - state.session.startedAt.getTime()) / 1000)
  }, [state.session])

  // Periodic check-in logic
  useEffect(() => {
    if (!state.isActive || state.intensity === 'passive') {
      return
    }

    const interval = CHECKIN_INTERVALS[state.intensity]
    if (interval === 0) return

    checkinIntervalRef.current = setInterval(() => {
      const timeSinceLastCheckin = Date.now() - lastCheckinRef.current

      if (timeSinceLastCheckin >= interval) {
        setState(prev => ({ ...prev, showCheckin: true }))
      }
    }, 30000) // Check every 30 seconds

    return () => {
      if (checkinIntervalRef.current) {
        clearInterval(checkinIntervalRef.current)
      }
    }
  }, [state.isActive, state.intensity])

  // Pause detection for activity_aware and coworking
  useEffect(() => {
    if (!state.isActive) return
    if (state.intensity !== 'activity_aware' && state.intensity !== 'coworking') {
      return
    }

    const checkPause = () => {
      if (activity.isPausedTooLong(PAUSE_THRESHOLD_MS)) {
        // Only notify once per pause
        if (!state.lastPauseNotifiedAt) {
          setState(prev => {
            if (!prev.session) return prev

            const newPauses = prev.session.pausesDetected + 1
            const newSession = { ...prev.session, pausesDetected: newPauses }

            // Update storage
            const stored = getStoredSession()
            if (stored) {
              saveSession({ ...stored, pausesDetected: newPauses })
            }

            return {
              ...prev,
              session: newSession,
              showCheckin: true,
              lastPauseNotifiedAt: new Date(),
            }
          })
        }
      } else {
        // Reset pause notification when activity resumes
        if (state.lastPauseNotifiedAt) {
          setState(prev => ({ ...prev, lastPauseNotifiedAt: null }))
        }
      }
    }

    const interval = setInterval(checkPause, 10000) // Check every 10 seconds
    return () => clearInterval(interval)
  }, [state.isActive, state.intensity, state.lastPauseNotifiedAt, activity])

  return {
    state,
    activity,
    startSession,
    endSession,
    touchTask,
    dismissCheckin,
    getSessionDurationSeconds,
  }
}
