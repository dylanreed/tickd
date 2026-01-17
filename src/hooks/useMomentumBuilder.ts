// ABOUTME: Manages warmup task queue for momentum building.
// ABOUTME: Tracks streak progress before tackling main task.

import { useState, useCallback } from 'react'
import type { Task } from '../types/task'
import type { WarmupState } from '../types/paralysisTools'
import { getQuickWins } from '../lib/quickWinDetection'

interface UseMomentumBuilderReturn {
  state: WarmupState
  /** Start warmup mode with a target task */
  startWarmup: (targetTaskId: string, allTasks: Task[], streakSize?: number) => void
  /** Mark a warmup task as complete */
  completeWarmupTask: (taskId: string) => void
  /** Skip warmup and go directly to target */
  skipToTarget: () => void
  /** Cancel warmup mode */
  cancel: () => void
  /** Get current warmup queue as task IDs */
  warmupTaskIds: string[]
  /** Check if warmup is complete */
  isWarmupComplete: boolean
}

const STORAGE_KEY = 'tickd_warmup_session'

interface StoredWarmup {
  targetTaskId: string
  warmupQueue: string[]
  completedCount: number
  requiredCount: number
}

function getStoredWarmup(): StoredWarmup | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as StoredWarmup
  } catch {
    return null
  }
}

function saveWarmup(warmup: StoredWarmup | null): void {
  try {
    if (warmup) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(warmup))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage might be unavailable
  }
}

export function useMomentumBuilder(): UseMomentumBuilderReturn {
  const [state, setState] = useState<WarmupState>(() => {
    const stored = getStoredWarmup()
    if (stored) {
      return {
        isActive: true,
        targetTaskId: stored.targetTaskId,
        warmupQueue: stored.warmupQueue,
        completedCount: stored.completedCount,
        requiredCount: stored.requiredCount,
      }
    }
    return {
      isActive: false,
      targetTaskId: null,
      warmupQueue: [],
      completedCount: 0,
      requiredCount: 3,
    }
  })

  const startWarmup = useCallback((
    targetTaskId: string,
    allTasks: Task[],
    streakSize: number = 3
  ) => {
    // Get quick wins excluding the target task
    const availableTasks = allTasks.filter(t => t.id !== targetTaskId)
    const quickWins = getQuickWins(availableTasks, streakSize)
    const warmupQueue = quickWins.map(t => t.id)

    const warmup: StoredWarmup = {
      targetTaskId,
      warmupQueue,
      completedCount: 0,
      requiredCount: Math.min(streakSize, warmupQueue.length),
    }
    saveWarmup(warmup)

    setState({
      isActive: true,
      targetTaskId,
      warmupQueue,
      completedCount: 0,
      requiredCount: Math.min(streakSize, warmupQueue.length),
    })
  }, [])

  const completeWarmupTask = useCallback((taskId: string) => {
    setState(prev => {
      if (!prev.isActive) return prev

      // Remove from queue and increment completed
      const newQueue = prev.warmupQueue.filter(id => id !== taskId)
      const newCompleted = prev.completedCount + 1

      const newState = {
        ...prev,
        warmupQueue: newQueue,
        completedCount: newCompleted,
      }

      // Update storage
      const stored = getStoredWarmup()
      if (stored) {
        saveWarmup({
          ...stored,
          warmupQueue: newQueue,
          completedCount: newCompleted,
        })
      }

      return newState
    })
  }, [])

  const skipToTarget = useCallback(() => {
    // Clear warmup but keep target task reference for UI
    saveWarmup(null)
    setState(prev => ({
      isActive: false,
      targetTaskId: prev.targetTaskId, // Keep for one render
      warmupQueue: [],
      completedCount: prev.completedCount,
      requiredCount: prev.requiredCount,
    }))
  }, [])

  const cancel = useCallback(() => {
    saveWarmup(null)
    setState({
      isActive: false,
      targetTaskId: null,
      warmupQueue: [],
      completedCount: 0,
      requiredCount: 3,
    })
  }, [])

  const isWarmupComplete = state.isActive && state.completedCount >= state.requiredCount

  return {
    state,
    startWarmup,
    completeWarmupTask,
    skipToTarget,
    cancel,
    warmupTaskIds: state.warmupQueue,
    isWarmupComplete,
  }
}
