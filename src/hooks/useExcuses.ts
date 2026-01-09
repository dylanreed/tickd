// ABOUTME: Hook for managing task excuses (snooze with accountability).
// ABOUTME: Provides excuse creation and postponement checking functionality.

import { useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Excuse {
  id: string
  task_id: string
  user_id: string
  excuse_text: string
  postponed_until: string
  created_at: string
}

interface MakeExcuseResult {
  success: boolean
  data?: Excuse
  error?: string
}

const POSTPONE_HOURS = 6
const MIN_EXCUSE_LENGTH = 10

export function useExcuses() {
  const { user } = useAuth()

  const makeExcuse = useCallback(async (taskId: string, excuseText: string): Promise<MakeExcuseResult> => {
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    if (excuseText.length < MIN_EXCUSE_LENGTH) {
      return { success: false, error: `Excuse must be at least ${MIN_EXCUSE_LENGTH} characters` }
    }

    const postponedUntil = new Date(Date.now() + POSTPONE_HOURS * 60 * 60 * 1000)

    const { data, error } = await supabase
      .from('excuses')
      .insert({
        task_id: taskId,
        user_id: user.id,
        excuse_text: excuseText,
        postponed_until: postponedUntil.toISOString(),
      })
      .select()
      .single()

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, data: data as Excuse }
  }, [user])

  const getExcusesForTask = useCallback(async (taskId: string): Promise<Excuse[]> => {
    if (!user) {
      return []
    }

    const { data, error } = await supabase
      .from('excuses')
      .select('*')
      .eq('task_id', taskId)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to get excuses for task:', error)
      return []
    }

    return (data || []) as Excuse[]
  }, [user])

  const getRecentExcuses = useCallback(async (limit: number = 10): Promise<Excuse[]> => {
    if (!user) {
      return []
    }

    const { data, error } = await supabase
      .from('excuses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Failed to get recent excuses:', error)
      return []
    }

    return (data || []) as Excuse[]
  }, [user])

  const isTaskPostponed = useCallback(async (taskId: string): Promise<boolean> => {
    if (!user) {
      return false
    }

    const now = new Date().toISOString()

    const { data, error } = await supabase
      .from('excuses')
      .select('*')
      .eq('task_id', taskId)
      .eq('user_id', user.id)
      .gt('postponed_until', now)
      .limit(1)

    if (error || !data) {
      console.error('Failed to check task postponement:', error)
      return false
    }

    return data.length > 0
  }, [user])

  return {
    makeExcuse,
    getExcusesForTask,
    getRecentExcuses,
    isTaskPostponed,
  }
}
