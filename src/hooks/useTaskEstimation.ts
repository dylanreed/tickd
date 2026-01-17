// ABOUTME: Hook for tracking task time estimates vs actuals.
// ABOUTME: Manages focus tracking and estimate comparison.

import { useState, useCallback, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getEstimateContext, getEstimationMessage } from '../data/estimationMessages'
import type { EstimateContext } from '../types/timeTools'
import type { SpicyLevel } from '../data/estimationMessages'

const STORAGE_KEY_PREFIX = 'tickd-task-focus'

interface FocusState {
  taskId: string
  startTime: number // timestamp
  totalPausedMs: number
  pausedAt: number | null
}

interface EstimateResult {
  estimatedMinutes: number
  actualMinutes: number
  context: EstimateContext
  message: string
  percentDiff: number
}

interface UseTaskEstimationReturn {
  // Focus tracking
  activeTaskId: string | null
  focusTask: (taskId: string) => void
  unfocusTask: () => void
  pauseFocus: () => void
  resumeFocus: () => void
  isPaused: boolean
  elapsedMinutes: number

  // Estimation comparison
  getEstimateResult: (
    taskId: string,
    estimatedMinutes: number,
    spicyLevel: SpicyLevel
  ) => EstimateResult | null

  // Calibration tracking
  recentEstimates: { taskId: string; ratio: number }[]
  averageAccuracy: number | null
}

export function useTaskEstimation(): UseTaskEstimationReturn {
  const { user } = useAuth()
  const [focusState, setFocusState] = useState<FocusState | null>(null)
  const [elapsedMinutes, setElapsedMinutes] = useState(0)
  const [recentEstimates, setRecentEstimates] = useState<{ taskId: string; ratio: number }[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Load focus state from localStorage
  useEffect(() => {
    if (!user) return

    const key = `${STORAGE_KEY_PREFIX}-${user.id}`
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const state = JSON.parse(stored) as FocusState
        setFocusState(state)
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [user])

  // Save focus state to localStorage
  useEffect(() => {
    if (!user || !focusState) return

    const key = `${STORAGE_KEY_PREFIX}-${user.id}`
    try {
      localStorage.setItem(key, JSON.stringify(focusState))
    } catch {
      // Ignore localStorage errors
    }
  }, [user, focusState])

  // Update elapsed time
  useEffect(() => {
    if (!focusState || focusState.pausedAt !== null) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    const updateElapsed = () => {
      const now = Date.now()
      const totalMs = now - focusState.startTime - focusState.totalPausedMs
      setElapsedMinutes(Math.floor(totalMs / (1000 * 60)))
    }

    updateElapsed()
    intervalRef.current = setInterval(updateElapsed, 10000) // Update every 10 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [focusState])

  // Focus on a task (start tracking time)
  const focusTask = useCallback((taskId: string) => {
    setFocusState({
      taskId,
      startTime: Date.now(),
      totalPausedMs: 0,
      pausedAt: null,
    })
    setElapsedMinutes(0)
  }, [])

  // Unfocus task and return elapsed time
  const unfocusTask = useCallback(() => {
    if (!focusState) return

    const key = `${STORAGE_KEY_PREFIX}-${user?.id}`
    try {
      localStorage.removeItem(key)
    } catch {
      // Ignore
    }

    setFocusState(null)
    setElapsedMinutes(0)
  }, [focusState, user])

  // Pause focus tracking
  const pauseFocus = useCallback(() => {
    if (!focusState || focusState.pausedAt !== null) return

    setFocusState({
      ...focusState,
      pausedAt: Date.now(),
    })
  }, [focusState])

  // Resume focus tracking
  const resumeFocus = useCallback(() => {
    if (!focusState || focusState.pausedAt === null) return

    const pausedDuration = Date.now() - focusState.pausedAt
    setFocusState({
      ...focusState,
      totalPausedMs: focusState.totalPausedMs + pausedDuration,
      pausedAt: null,
    })
  }, [focusState])

  // Get estimate comparison result
  const getEstimateResult = useCallback((
    taskId: string,
    estimatedMinutes: number,
    spicyLevel: SpicyLevel
  ): EstimateResult | null => {
    // Use elapsed time if this is the focused task, otherwise can't compute
    const actualMinutes = focusState?.taskId === taskId ? elapsedMinutes : 0

    if (actualMinutes === 0 || estimatedMinutes === 0) {
      return null
    }

    const context = getEstimateContext(estimatedMinutes, actualMinutes)
    const message = getEstimationMessage(context, spicyLevel)
    const percentDiff = Math.round(((actualMinutes - estimatedMinutes) / estimatedMinutes) * 100)

    // Track for calibration
    const ratio = actualMinutes / estimatedMinutes
    setRecentEstimates(prev => {
      const updated = [...prev, { taskId, ratio }].slice(-10) // Keep last 10
      return updated
    })

    return {
      estimatedMinutes,
      actualMinutes,
      context,
      message,
      percentDiff,
    }
  }, [focusState, elapsedMinutes])

  // Calculate average accuracy from recent estimates
  const averageAccuracy = recentEstimates.length >= 3
    ? Math.round(
        (recentEstimates.reduce((sum, e) => sum + Math.min(e.ratio, 1 / e.ratio), 0) /
        recentEstimates.length) * 100
      )
    : null

  return {
    activeTaskId: focusState?.taskId ?? null,
    focusTask,
    unfocusTask,
    pauseFocus,
    resumeFocus,
    isPaused: focusState?.pausedAt !== null,
    elapsedMinutes,
    getEstimateResult,
    recentEstimates,
    averageAccuracy,
  }
}
