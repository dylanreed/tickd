// ABOUTME: Hook for checking subscription status and lock state.
// ABOUTME: Determines if user can access app based on trial/subscription.

import { useProfile } from './useProfile'

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired'

interface SubscriptionHookResult {
  status: SubscriptionStatus | null
  isLocked: boolean
  isTrialing: boolean
  trialDaysRemaining: number | null
  loading: boolean
}

export function useSubscription(): SubscriptionHookResult {
  const { profile, loading } = useProfile()

  if (loading || !profile) {
    return {
      status: null,
      isLocked: false,
      isTrialing: false,
      trialDaysRemaining: null,
      loading,
    }
  }

  const status = (profile.subscription_status as SubscriptionStatus) || 'trialing'
  const trialEndsAt = profile.trial_ends_at ? new Date(profile.trial_ends_at) : null
  const now = new Date()

  // Check if trial has expired
  const trialExpired = status === 'trialing' && trialEndsAt && trialEndsAt < now

  // User is locked if:
  // - Trial expired (trialing but past trial_ends_at)
  // - Status is 'expired'
  // - Status is 'canceled'
  const isLocked =
    trialExpired || status === 'expired' || status === 'canceled'

  // Still in valid trial period
  const isTrialing = status === 'trialing' && !trialExpired

  // Calculate days remaining in trial
  let trialDaysRemaining: number | null = null
  if (status === 'trialing' && trialEndsAt && !trialExpired) {
    const msRemaining = trialEndsAt.getTime() - now.getTime()
    trialDaysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24))
  }

  return {
    status,
    isLocked,
    isTrialing,
    trialDaysRemaining,
    loading: false,
  }
}
