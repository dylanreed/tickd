// ABOUTME: Component for managing subscription status and checkout.
// ABOUTME: Shows trial status, subscribe button, or manage subscription link.

import { useState } from 'react'
import { useSubscription } from '../hooks/useSubscription'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export default function SubscriptionSettings() {
  const { user } = useAuth()
  const { status, isTrialing, trialDaysRemaining, loading } = useSubscription()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal dark:text-lavender">Subscription</h3>
        <p className="text-dusty-purple">Loading...</p>
      </div>
    )
  }

  const handleSubscribe = async () => {
    if (!user) return

    setCheckoutLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          success_url: `${window.location.origin}/#settings?success=true`,
          cancel_url: `${window.location.origin}/#settings?canceled=true`,
        },
      })

      if (fnError) {
        setError(fnError.message)
      } else if (data?.error) {
        setError(data.error)
      } else if (data?.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleManageSubscription = () => {
    // Stripe Customer Portal URL - would need to be set up
    window.open('https://billing.stripe.com/p/login/test', '_blank')
  }

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg text-charcoal dark:text-lavender">Subscription</h3>

      {/* Status Display */}
      <div className="bg-lavender/30 dark:bg-dusty-purple/30 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-charcoal dark:text-lavender">
              {status === 'active' && 'Active Subscription'}
              {status === 'trialing' && 'Free Trial'}
              {status === 'past_due' && 'Payment Past Due'}
              {status === 'canceled' && 'Subscription Canceled'}
              {status === 'expired' && 'Trial Expired'}
            </p>
            <p className="text-sm text-dusty-purple dark:text-lavender/70">
              {isTrialing && trialDaysRemaining !== null && (
                <>
                  {trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining
                </>
              )}
              {status === 'active' && '$1/month'}
              {status === 'past_due' && 'Please update your payment method'}
              {status === 'canceled' && 'Subscribe to continue using Tick\'d'}
              {status === 'expired' && 'Subscribe for $1/month to continue'}
            </p>
          </div>

          {/* Action Button */}
          {(isTrialing || status === 'expired' || status === 'canceled') && (
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading}
              className="px-4 py-2 bg-hot-pink text-white rounded-full font-medium hover:bg-coral transition-colors disabled:opacity-50"
            >
              {checkoutLoading ? '...' : 'Subscribe $1/mo'}
            </button>
          )}

          {status === 'active' && (
            <button
              onClick={handleManageSubscription}
              className="px-4 py-2 bg-lavender text-charcoal rounded-full font-medium hover:bg-peach transition-colors"
            >
              Manage
            </button>
          )}

          {status === 'past_due' && (
            <button
              onClick={handleManageSubscription}
              className="px-4 py-2 bg-coral text-white rounded-full font-medium hover:bg-hot-pink transition-colors"
            >
              Update Payment
            </button>
          )}
        </div>

        {error && <p className="text-coral text-sm mt-2">{error}</p>}
      </div>

      {/* Trial upsell message */}
      {isTrialing && trialDaysRemaining !== null && trialDaysRemaining <= 3 && (
        <div className="bg-golden/20 rounded-xl p-4 text-center">
          <p className="text-charcoal font-medium">
            Your trial ends soon! Subscribe to keep Tick lying to you.
          </p>
        </div>
      )}
    </div>
  )
}
