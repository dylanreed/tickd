// ABOUTME: Manages daily brain state check-in for time awareness.
// ABOUTME: Persists to database and determines if check-in is needed.

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import type { BrainState } from '../types/timeTools'

interface UseDailyCheckinReturn {
  /** Current brain state for today, null if not checked in */
  todaysBrainState: BrainState | null
  /** Whether the user needs to check in today */
  needsCheckin: boolean
  /** Whether we're loading the check-in state */
  loading: boolean
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

export function useDailyCheckin(): UseDailyCheckinReturn {
  const { user } = useAuth()
  const [todaysBrainState, setTodaysBrainState] = useState<BrainState | null>(null)
  const [needsCheckin, setNeedsCheckin] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch today's check-in from database
  useEffect(() => {
    if (!user) {
      setLoading(false)
      setNeedsCheckin(false)
      return
    }

    async function fetchTodaysCheckin() {
      const today = getTodayString()

      const { data, error } = await supabase
        .from('daily_checkins')
        .select('brain_state')
        .eq('user_id', user!.id)
        .eq('checkin_date', today)
        .maybeSingle()

      if (error) {
        console.error('Error fetching daily check-in:', error)
        setNeedsCheckin(true)
      } else if (data) {
        setTodaysBrainState(data.brain_state as BrainState)
        setNeedsCheckin(false)
      } else {
        setTodaysBrainState(null)
        setNeedsCheckin(true)
      }

      setLoading(false)
    }

    fetchTodaysCheckin()
  }, [user])

  const setBrainState = useCallback(async (state: BrainState) => {
    if (!user) return

    const today = getTodayString()

    // Upsert the check-in (insert or update if exists)
    const { error } = await supabase
      .from('daily_checkins')
      .upsert(
        {
          user_id: user.id,
          checkin_date: today,
          brain_state: state,
        },
        {
          onConflict: 'user_id,checkin_date',
        }
      )

    if (error) {
      console.error('Error saving daily check-in:', error)
      return
    }

    setTodaysBrainState(state)
    setNeedsCheckin(false)
  }, [user])

  const clearCheckin = useCallback(async () => {
    if (!user) return

    const today = getTodayString()

    const { error } = await supabase
      .from('daily_checkins')
      .delete()
      .eq('user_id', user.id)
      .eq('checkin_date', today)

    if (error) {
      console.error('Error clearing daily check-in:', error)
      return
    }

    setTodaysBrainState(null)
    setNeedsCheckin(true)
  }, [user])

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
    loading,
    setBrainState,
    clearCheckin,
    getEffectiveSpicyLevel,
  }
}
