// ABOUTME: Hook for fetching and updating user profile.
// ABOUTME: Provides reliability score and theme preference.

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Profile {
  id: string
  email: string
  reliability_score: number
  theme: 'hinged' | 'unhinged'
  notification_preferences: 'email' | 'browser' | 'both' | 'none'
  created_at: string
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
        setProfile(data)
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
      setProfile(data)
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
