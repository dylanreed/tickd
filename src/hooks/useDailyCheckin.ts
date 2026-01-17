// ABOUTME: Manages daily brain state check-in for time awareness.
// ABOUTME: Persists to localStorage and determines if check-in is needed.

import { useState, useEffect, useCallback } from 'react'
import type { BrainState } from '../types/timeTools'

const CHECKIN_STORAGE_KEY = 'tickd_daily_checkin'

interface StoredCheckin {
  date: string // YYYY-MM-DD format
  brainState: BrainState
  timestamp: number
}

interface UseDailyCheckinReturn {
  /** Current brain state for today, null if not checked in */
  todaysBrainState: BrainState | null
  /** Whether the user needs to check in today */
  needsCheckin: boolean
  /** Set today's brain state */
  setBrainState: (state: BrainState) => void
  /** Clear today's check-in (for testing/reset) */
  clearCheckin: () => void
  /** Get effective spicy level based on brain state (if enabled) */
  getEffectiveSpicyLevel: (baseLevel: number, affectSpiciness: boolean) => number
}

function getTodayString(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function getStoredCheckin(): StoredCheckin | null {
  try {
    const stored = localStorage.getItem(CHECKIN_STORAGE_KEY)
    if (!stored) return null
    return JSON.parse(stored) as StoredCheckin
  } catch {
    return null
  }
}

function saveCheckin(checkin: StoredCheckin): void {
  try {
    localStorage.setItem(CHECKIN_STORAGE_KEY, JSON.stringify(checkin))
  } catch {
    // localStorage might be full or unavailable
  }
}

export function useDailyCheckin(): UseDailyCheckinReturn {
  const [todaysBrainState, setTodaysBrainState] = useState<BrainState | null>(null)
  const [needsCheckin, setNeedsCheckin] = useState(false)

  // Check on mount if we have a valid check-in for today
  useEffect(() => {
    const stored = getStoredCheckin()
    const today = getTodayString()

    if (stored && stored.date === today) {
      setTodaysBrainState(stored.brainState)
      setNeedsCheckin(false)
    } else {
      setTodaysBrainState(null)
      setNeedsCheckin(true)
    }
  }, [])

  const setBrainState = useCallback((state: BrainState) => {
    const today = getTodayString()
    const checkin: StoredCheckin = {
      date: today,
      brainState: state,
      timestamp: Date.now(),
    }
    saveCheckin(checkin)
    setTodaysBrainState(state)
    setNeedsCheckin(false)
  }, [])

  const clearCheckin = useCallback(() => {
    localStorage.removeItem(CHECKIN_STORAGE_KEY)
    setTodaysBrainState(null)
    setNeedsCheckin(true)
  }, [])

  // Calculate effective spicy level based on brain state
  // Low brain state = gentler messages, high brain state = can handle spicier
  const getEffectiveSpicyLevel = useCallback((
    baseLevel: number,
    affectSpiciness: boolean
  ): number => {
    if (!affectSpiciness || todaysBrainState === null) {
      return baseLevel
    }

    // Brain state affects spiciness:
    // Brain 1 (low): reduce spiciness by 2 (min 1)
    // Brain 2: reduce by 1
    // Brain 3: no change
    // Brain 4: increase by 1
    // Brain 5 (high): increase by 2 (max 5)
    const adjustment = todaysBrainState - 3 // Range: -2 to +2
    const adjusted = baseLevel + adjustment
    return Math.min(5, Math.max(1, adjusted))
  }, [todaysBrainState])

  return {
    todaysBrainState,
    needsCheckin,
    setBrainState,
    clearCheckin,
    getEffectiveSpicyLevel,
  }
}
