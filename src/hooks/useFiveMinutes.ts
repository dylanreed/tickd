// ABOUTME: Manages "Just 5 Minutes" commitment sessions.
// ABOUTME: Handles phase progression and clean exit logic.

import { useState, useEffect, useCallback, useRef } from 'react'
import type { FiveMinutePhase } from '../types/paralysisTools'
import { getFiveMinutePhase } from '../types/paralysisTools'

interface UseFiveMinutesState {
  isActive: boolean
  taskId: string | null
  startedAt: Date | null
  phase: FiveMinutePhase
  elapsedMs: number
  isPaused: boolean
}

type StopReason = 'clean_exit' | 'completed' | 'continue'

interface UseFiveMinutesReturn {
  state: UseFiveMinutesState
  start: (taskId: string) => void
  pause: () => void
  resume: () => void
  stop: (reason: StopReason) => void
  elapsedMinutes: number
  shouldShowCheckpoint: boolean
  acknowledgeCheckpoint: () => void
}

const STORAGE_KEY = 'tickd_five_minutes_session'

interface StoredSession {
  taskId: string
  startedAt: number
  totalPausedMs: number
  pausedAt: number | null
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

export function useFiveMinutes(): UseFiveMinutesReturn {
  const [state, setState] = useState<UseFiveMinutesState>({
    isActive: false,
    taskId: null,
    startedAt: null,
    phase: 'first_five',
    elapsedMs: 0,
    isPaused: false,
  })

  const [shouldShowCheckpoint, setShouldShowCheckpoint] = useState(false)
  const [lastAcknowledgedPhase, setLastAcknowledgedPhase] = useState<FiveMinutePhase | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const pausedMsRef = useRef(0)

  // Restore session on mount
  useEffect(() => {
    const stored = getStoredSession()
    if (!stored) return

    const now = Date.now()
    const startedAt = new Date(stored.startedAt)

    // Calculate total paused time
    let totalPausedMs = stored.totalPausedMs
    if (stored.pausedAt) {
      // Currently paused, add time since pause
      totalPausedMs += now - stored.pausedAt
    }

    const elapsedMs = now - stored.startedAt - totalPausedMs
    const elapsedMinutes = elapsedMs / 60000
    const phase = getFiveMinutePhase(elapsedMinutes)

    pausedMsRef.current = totalPausedMs

    setState({
      isActive: true,
      taskId: stored.taskId,
      startedAt,
      phase,
      elapsedMs,
      isPaused: stored.pausedAt !== null,
    })
  }, [])

  // Timer interval
  useEffect(() => {
    if (!state.isActive || state.isPaused || !state.startedAt) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const updateElapsed = () => {
      const now = Date.now()
      const elapsedMs = now - state.startedAt!.getTime() - pausedMsRef.current
      const elapsedMinutes = elapsedMs / 60000
      const newPhase = getFiveMinutePhase(elapsedMinutes)

      setState(prev => {
        // Check for phase transition
        if (prev.phase !== newPhase && newPhase !== 'flow_state') {
          // Show checkpoint for phase transitions (except flow state)
          if (lastAcknowledgedPhase !== newPhase) {
            setShouldShowCheckpoint(true)
          }
        }

        return {
          ...prev,
          elapsedMs,
          phase: newPhase,
        }
      })
    }

    // Update immediately
    updateElapsed()

    // Then update every second
    intervalRef.current = setInterval(updateElapsed, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [state.isActive, state.isPaused, state.startedAt, lastAcknowledgedPhase])

  const start = useCallback((taskId: string) => {
    const now = Date.now()
    pausedMsRef.current = 0

    const session: StoredSession = {
      taskId,
      startedAt: now,
      totalPausedMs: 0,
      pausedAt: null,
    }
    saveSession(session)

    setState({
      isActive: true,
      taskId,
      startedAt: new Date(now),
      phase: 'first_five',
      elapsedMs: 0,
      isPaused: false,
    })
    setLastAcknowledgedPhase(null)
    setShouldShowCheckpoint(false)
  }, [])

  const pause = useCallback(() => {
    const stored = getStoredSession()
    if (!stored) return

    const now = Date.now()
    saveSession({
      ...stored,
      pausedAt: now,
    })

    setState(prev => ({
      ...prev,
      isPaused: true,
    }))
  }, [])

  const resume = useCallback(() => {
    const stored = getStoredSession()
    if (!stored || !stored.pausedAt) return

    const now = Date.now()
    const additionalPausedMs = now - stored.pausedAt
    const newTotalPaused = stored.totalPausedMs + additionalPausedMs

    pausedMsRef.current = newTotalPaused

    saveSession({
      ...stored,
      totalPausedMs: newTotalPaused,
      pausedAt: null,
    })

    setState(prev => ({
      ...prev,
      isPaused: false,
    }))
  }, [])

  const stop = useCallback((_reason: StopReason) => {
    saveSession(null)
    pausedMsRef.current = 0

    setState({
      isActive: false,
      taskId: null,
      startedAt: null,
      phase: 'first_five',
      elapsedMs: 0,
      isPaused: false,
    })
    setLastAcknowledgedPhase(null)
    setShouldShowCheckpoint(false)
  }, [])

  const acknowledgeCheckpoint = useCallback(() => {
    setLastAcknowledgedPhase(state.phase)
    setShouldShowCheckpoint(false)
  }, [state.phase])

  const elapsedMinutes = Math.floor(state.elapsedMs / 60000)

  return {
    state,
    start,
    pause,
    resume,
    stop,
    elapsedMinutes,
    shouldShowCheckpoint,
    acknowledgeCheckpoint,
  }
}
