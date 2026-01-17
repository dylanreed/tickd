// ABOUTME: Hook for fetching and updating user profile.
// ABOUTME: Provides reliability score and theme preference.

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Profile {
  id: string
  email: string
  reliability_score: number
  spicy_level: number | null
  theme: 'hinged' | 'unhinged'
  notification_preferences: 'email' | 'browser' | 'both' | 'none'
  subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired'
  trial_ends_at: string | null
  stripe_customer_id: string | null
  subscription_id: string | null
  onboarding_completed: boolean
  created_at: string
  // Focus Tools settings
  pick_for_me_enabled: boolean
  single_task_escalation_enabled: boolean
  show_earnout_progress: boolean
}

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

      if (error) {
        setError(error)
      } else {
        setProfile(data as Profile)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Not authenticated') }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates as never)
      .eq('id', user.id)
      .select()
      .single()

    if (!error && data) {
      setProfile(data as Profile)
    }

    return { data, error }
  }

  const adjustReliabilityScore = async (wasOnTime: boolean) => {
    if (!profile) return

    // Adjust score: +5 for on-time, -10 for late (asymmetric penalty)
    const adjustment = wasOnTime ? 5 : -10
    const newScore = Math.max(0, Math.min(100, profile.reliability_score + adjustment))

    await updateProfile({ reliability_score: newScore })
  }

  return { profile, loading, error, updateProfile, adjustReliabilityScore }
}
