// ABOUTME: Manages micro-steps for task shrinking feature.
// ABOUTME: Handles step creation, completion, and momentum detection.

import { useState, useCallback } from 'react'
import type { MicroStep } from '../types/paralysisTools'

interface UseTaskShrinkingReturn {
  /** Add a micro-step to a task */
  addMicroStep: (taskId: string, stepText: string) => void
  /** Complete the current micro-step */
  completeCurrentStep: (taskId: string) => void
  /** Clear all micro-steps for a task */
  clearMicroSteps: (taskId: string) => void
  /** Get micro-steps for a task */
  getMicroSteps: (taskId: string) => MicroStep[]
  /** Get current step index for a task */
  getCurrentStepIndex: (taskId: string) => number
  /** Check if user has momentum (completed 2+ steps) */
  hasMomentum: (taskId: string) => boolean
  /** User indicates they have momentum and want to continue without steps */
  setHasMomentum: (taskId: string) => void
}

// Store micro-steps in memory (they'll persist via task updates to DB)
const microStepsMap = new Map<string, MicroStep[]>()
const currentStepMap = new Map<string, number>()
const momentumMap = new Map<string, boolean>()

export function useTaskShrinking(): UseTaskShrinkingReturn {
  // Force re-render when state changes
  const [, setVersion] = useState(0)
  const forceUpdate = useCallback(() => setVersion(v => v + 1), [])

  const addMicroStep = useCallback((taskId: string, stepText: string) => {
    const existing = microStepsMap.get(taskId) || []
    const newStep: MicroStep = {
      text: stepText,
      completed: false,
      completedAt: null,
    }
    microStepsMap.set(taskId, [...existing, newStep])

    // If this is the first step, set current to 0
    if (!currentStepMap.has(taskId)) {
      currentStepMap.set(taskId, 0)
    }

    forceUpdate()
  }, [forceUpdate])

  const completeCurrentStep = useCallback((taskId: string) => {
    const steps = microStepsMap.get(taskId)
    const currentIndex = currentStepMap.get(taskId) ?? 0

    if (!steps || currentIndex >= steps.length) return

    // Mark current step as complete
    steps[currentIndex] = {
      ...steps[currentIndex],
      completed: true,
      completedAt: new Date().toISOString(),
    }
    microStepsMap.set(taskId, [...steps])

    // Move to next step
    if (currentIndex < steps.length - 1) {
      currentStepMap.set(taskId, currentIndex + 1)
    }

    forceUpdate()
  }, [forceUpdate])

  const clearMicroSteps = useCallback((taskId: string) => {
    microStepsMap.delete(taskId)
    currentStepMap.delete(taskId)
    momentumMap.delete(taskId)
    forceUpdate()
  }, [forceUpdate])

  const getMicroSteps = useCallback((taskId: string): MicroStep[] => {
    return microStepsMap.get(taskId) || []
  }, [])

  const getCurrentStepIndex = useCallback((taskId: string): number => {
    return currentStepMap.get(taskId) ?? 0
  }, [])

  const hasMomentum = useCallback((taskId: string): boolean => {
    // User explicitly said they have momentum
    if (momentumMap.get(taskId)) return true

    // Or they've completed 2+ steps
    const steps = microStepsMap.get(taskId) || []
    const completedCount = steps.filter(s => s.completed).length
    return completedCount >= 2
  }, [])

  const setHasMomentum = useCallback((taskId: string) => {
    momentumMap.set(taskId, true)
    forceUpdate()
  }, [forceUpdate])

  return {
    addMicroStep,
    completeCurrentStep,
    clearMicroSteps,
    getMicroSteps,
    getCurrentStepIndex,
    hasMomentum,
    setHasMomentum,
  }
}
