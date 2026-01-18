// ABOUTME: Hook for tracking task time estimates vs actuals.
// ABOUTME: Manages focus tracking with database persistence.

import { useState, useCallback, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getEstimateContext, getEstimationMessage } from '../data/estimationMessages'
import type { EstimateContext } from '../types/timeTools'
import type { SpicyLevel } from '../data/estimationMessages'

interface FocusState {
  sessionId: string
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

  // Load active session from database on mount
  useEffect(() => {
    if (!user) return

    async function loadActiveSession() {
      const { data, error } = await supabase
        .from('time_sessions')
        .select('id, task_id, started_at, total_paused_seconds, paused_at, status')
        .eq('user_id', user!.id)
        .in('status', ['active', 'paused'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (error) {
        console.error('Error loading active session:', error)
        return
      }

      if (data && data.task_id) {
        const startTime = new Date(data.started_at).getTime()
        const pausedAt = data.paused_at ? new Date(data.paused_at).getTime() : null

        setFocusState({
          sessionId: data.id,
          taskId: data.task_id,
          startTime,
          totalPausedMs: (data.total_paused_seconds || 0) * 1000,
          pausedAt,
        })
      }
    }

    loadActiveSession()
  }, [user])

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
  const focusTask = useCallback(async (taskId: string) => {
    if (!user) return

    const now = new Date()
    // Default planned end to 1 hour from now (can be updated later)
    const plannedEnd = new Date(now.getTime() + 60 * 60 * 1000)

    const { data, error } = await supabase
      .from('time_sessions')
      .insert({
        user_id: user.id,
        task_id: taskId,
        session_type: 'focus',
        started_at: now.toISOString(),
        planned_end_at: plannedEnd.toISOString(),
        status: 'active',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error creating time session:', error)
      return
    }

    setFocusState({
      sessionId: data.id,
      taskId,
      startTime: now.getTime(),
      totalPausedMs: 0,
      pausedAt: null,
    })
    setElapsedMinutes(0)
  }, [user])

  // Unfocus task and complete the session
  const unfocusTask = useCallback(async () => {
    if (!focusState || !user) return

    const now = new Date()

    // Update the session as completed
    const { error } = await supabase
      .from('time_sessions')
      .update({
        actual_end_at: now.toISOString(),
        total_paused_seconds: Math.floor(focusState.totalPausedMs / 1000),
        status: 'completed',
      })
      .eq('id', focusState.sessionId)

    if (error) {
      console.error('Error completing time session:', error)
    }

    // Also update the task's actual_minutes if we have a task
    if (focusState.taskId && elapsedMinutes > 0) {
      await supabase
        .from('tasks')
        .update({ actual_minutes: elapsedMinutes })
        .eq('id', focusState.taskId)
    }

    setFocusState(null)
    setElapsedMinutes(0)
  }, [focusState, user, elapsedMinutes])

  // Pause focus tracking
  const pauseFocus = useCallback(async () => {
    if (!focusState || focusState.pausedAt !== null || !user) return

    const now = new Date()

    const { error } = await supabase
      .from('time_sessions')
      .update({
        paused_at: now.toISOString(),
        status: 'paused',
      })
      .eq('id', focusState.sessionId)

    if (error) {
      console.error('Error pausing time session:', error)
      return
    }

    setFocusState({
      ...focusState,
      pausedAt: now.getTime(),
    })
  }, [focusState, user])

  // Resume focus tracking
  const resumeFocus = useCallback(async () => {
    if (!focusState || focusState.pausedAt === null || !user) return

    const pausedDuration = Date.now() - focusState.pausedAt
    const newTotalPausedMs = focusState.totalPausedMs + pausedDuration

    const { error } = await supabase
      .from('time_sessions')
      .update({
        paused_at: null,
        total_paused_seconds: Math.floor(newTotalPausedMs / 1000),
        status: 'active',
      })
      .eq('id', focusState.sessionId)

    if (error) {
      console.error('Error resuming time session:', error)
      return
    }

    setFocusState({
      ...focusState,
      totalPausedMs: newTotalPausedMs,
      pausedAt: null,
    })
  }, [focusState, user])

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
