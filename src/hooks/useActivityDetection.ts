// ABOUTME: Detects user activity patterns for body doubling.
// ABOUTME: Tracks focus, pauses, and task switching.

import { useState, useCallback, useEffect, useRef } from 'react'

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
  isPausedTooLong: (thresholdMs: number) => boolean
  getIdleTimeMs: () => number
}

const IDLE_THRESHOLD_MS = 30000 // 30 seconds without activity = idle
const ACTIVITY_THROTTLE_MS = 1000 // Throttle activity recording

export function useActivityDetection(): UseActivityDetectionReturn {
  const [state, setState] = useState<ActivityState>({
    lastActivityAt: new Date(),
    currentTaskId: null,
    isPaused: false,
    pauseStartedAt: null,
    totalPausedMs: 0,
  })

  const lastRecordedRef = useRef<number>(Date.now())
  const checkIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Record activity (throttled)
  const recordActivity = useCallback(() => {
    const now = Date.now()
    if (now - lastRecordedRef.current < ACTIVITY_THROTTLE_MS) {
      return // Throttle
    }
    lastRecordedRef.current = now

    setState(prev => {
      // If we were paused, calculate pause duration
      let additionalPauseMs = 0
      if (prev.isPaused && prev.pauseStartedAt) {
        additionalPauseMs = now - prev.pauseStartedAt.getTime()
      }

      return {
        ...prev,
        lastActivityAt: new Date(now),
        isPaused: false,
        pauseStartedAt: null,
        totalPausedMs: prev.totalPausedMs + additionalPauseMs,
      }
    })
  }, [])

  // Task focus tracking
  const onTaskFocus = useCallback((taskId: string) => {
    recordActivity()
    setState(prev => ({
      ...prev,
      currentTaskId: taskId,
    }))
  }, [recordActivity])

  const onTaskBlur = useCallback(() => {
    recordActivity()
    setState(prev => ({
      ...prev,
      currentTaskId: null,
    }))
  }, [recordActivity])

  // Check if paused too long
  const isPausedTooLong = useCallback((thresholdMs: number) => {
    if (!state.isPaused || !state.pauseStartedAt) return false
    return Date.now() - state.pauseStartedAt.getTime() > thresholdMs
  }, [state.isPaused, state.pauseStartedAt])

  // Get current idle time
  const getIdleTimeMs = useCallback(() => {
    return Date.now() - state.lastActivityAt.getTime()
  }, [state.lastActivityAt])

  // Check for pause state periodically
  useEffect(() => {
    checkIntervalRef.current = setInterval(() => {
      setState(prev => {
        const idleTime = Date.now() - prev.lastActivityAt.getTime()

        // If idle beyond threshold and not already paused
        if (idleTime > IDLE_THRESHOLD_MS && !prev.isPaused) {
          return {
            ...prev,
            isPaused: true,
            pauseStartedAt: new Date(prev.lastActivityAt.getTime() + IDLE_THRESHOLD_MS),
          }
        }

        return prev
      })
    }, 5000) // Check every 5 seconds

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current)
      }
    }
  }, [])

  // Listen for activity events
  useEffect(() => {
    const events = ['mousemove', 'keydown', 'touchstart', 'click', 'scroll']

    events.forEach(event => {
      window.addEventListener(event, recordActivity, { passive: true })
    })

    // Page visibility
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        recordActivity()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, recordActivity)
      })
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [recordActivity])

  return {
    state,
    recordActivity,
    onTaskFocus,
    onTaskBlur,
    isPausedTooLong,
    getIdleTimeMs,
  }
}
