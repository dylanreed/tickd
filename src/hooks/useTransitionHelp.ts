// ABOUTME: Manages transition prompts and startup rituals.
// ABOUTME: Detects when user might need help transitioning to work mode.

import { useState, useCallback, useEffect, useRef } from 'react'

export type TransitionPhase =
  | 'idle'
  | 'prompt'
  | 'environment_check'
  | 'ritual'
  | 'countdown'
  | 'ready'

interface UseTransitionHelpState {
  phase: TransitionPhase
  lastActivityAt: Date | null
  listViewsWithoutAction: number
  hasStartedTask: boolean
  currentRitualStep: number
}

interface UseTransitionHelpReturn {
  state: UseTransitionHelpState
  /** Check if transition should be offered based on behavior */
  shouldOfferTransition: () => boolean
  /** Start the transition flow */
  startTransition: () => void
  /** Move to environment check */
  goToEnvironmentCheck: () => void
  /** Move to ritual walkthrough */
  goToRitual: () => void
  /** Complete environment check */
  completeEnvironmentCheck: () => void
  /** Complete current ritual step */
  completeRitualStep: () => void
  /** Skip ritual entirely */
  skipRitual: () => void
  /** Move to countdown */
  goToCountdown: () => void
  /** Complete countdown (ready to work) */
  completeCountdown: () => void
  /** Cancel transition flow */
  cancel: () => void
  /** Record a list view */
  recordListView: () => void
  /** Record task started */
  recordTaskStarted: () => void
}

const STORAGE_KEY = 'tickd_last_activity'
const ABSENCE_THRESHOLD_MS = 30 * 60 * 1000 // 30 minutes
const LIST_VIEW_THRESHOLD = 3

function getStoredActivity(): Date | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    return new Date(stored)
  } catch {
    return null
  }
}

function saveActivity(date: Date | null): void {
  try {
    if (date) {
      localStorage.setItem(STORAGE_KEY, date.toISOString())
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage might be unavailable
  }
}

export function useTransitionHelp(): UseTransitionHelpReturn {
  const [state, setState] = useState<UseTransitionHelpState>({
    phase: 'idle',
    lastActivityAt: getStoredActivity(),
    listViewsWithoutAction: 0,
    hasStartedTask: false,
    currentRitualStep: 0,
  })

  const sessionListViewsRef = useRef(0)

  // Update last activity timestamp on any significant action
  useEffect(() => {
    const updateActivity = () => {
      const now = new Date()
      setState(prev => ({ ...prev, lastActivityAt: now }))
      saveActivity(now)
    }

    // Record activity on task-related interactions
    const events = ['click', 'keydown']
    events.forEach(event => {
      window.addEventListener(event, updateActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateActivity)
      })
    }
  }, [])

  // Check if we should offer transition help
  const shouldOfferTransition = useCallback(() => {
    const now = new Date()

    // Returning after long absence
    if (state.lastActivityAt) {
      const absenceMs = now.getTime() - state.lastActivityAt.getTime()
      if (absenceMs > ABSENCE_THRESHOLD_MS) return true
    }

    // Stuck on list without starting anything
    if (
      sessionListViewsRef.current >= LIST_VIEW_THRESHOLD &&
      !state.hasStartedTask
    ) {
      return true
    }

    return false
  }, [state.lastActivityAt, state.hasStartedTask])

  // Start the transition flow
  const startTransition = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'prompt',
      currentRitualStep: 0,
    }))
  }, [])

  // Move to environment check
  const goToEnvironmentCheck = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'environment_check' }))
  }, [])

  // Move to ritual
  const goToRitual = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'ritual', currentRitualStep: 0 }))
  }, [])

  // Complete environment check
  const completeEnvironmentCheck = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'ritual', currentRitualStep: 0 }))
  }, [])

  // Complete current ritual step
  const completeRitualStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentRitualStep: prev.currentRitualStep + 1,
    }))
  }, [])

  // Skip ritual entirely
  const skipRitual = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'countdown' }))
  }, [])

  // Move to countdown
  const goToCountdown = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'countdown' }))
  }, [])

  // Complete countdown
  const completeCountdown = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'ready',
      hasStartedTask: true,
    }))
    // Reset counters
    sessionListViewsRef.current = 0
  }, [])

  // Cancel flow
  const cancel = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'idle',
      currentRitualStep: 0,
    }))
  }, [])

  // Record list view
  const recordListView = useCallback(() => {
    sessionListViewsRef.current += 1
    setState(prev => ({
      ...prev,
      listViewsWithoutAction: sessionListViewsRef.current,
    }))
  }, [])

  // Record task started
  const recordTaskStarted = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasStartedTask: true,
      phase: 'idle',
    }))
    sessionListViewsRef.current = 0
  }, [])

  return {
    state,
    shouldOfferTransition,
    startTransition,
    goToEnvironmentCheck,
    goToRitual,
    completeEnvironmentCheck,
    completeRitualStep,
    skipRitual,
    goToCountdown,
    completeCountdown,
    cancel,
    recordListView,
    recordTaskStarted,
  }
}
