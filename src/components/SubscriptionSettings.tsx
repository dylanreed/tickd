// ABOUTME: Component for managing subscription status and checkout.
// ABOUTME: Shows trial status, subscribe button, or manage subscription link.

import { useState } from 'react'
import { useSubscription } from '../hooks/useSubscription'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../hooks/useProfile'
import { supabase } from '../lib/supabase'

export default function SubscriptionSettings() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const { status, isTrialing, trialDaysRemaining, loading } = useSubscription()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isHinged = profile?.theme !== 'unhinged'

  if (loading) {
    return (
      <div className="space-y-6">
        <h3 className={isHinged ? 'font-bold text-lg text-charcoal' : 'font-pixel text-sm text-clock-black'}>
          {isHinged ? 'Subscription' : 'THE DEAL'}
        </h3>
        <p className={isHinged ? 'text-dusty-purple' : 'text-clock-black/60 font-mono'}>Loading...</p>
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
        // Validate URL is a legitimate Stripe checkout URL
        if (data.url.startsWith('https://checkout.stripe.com/')) {
          window.location.href = data.url
        } else {
          setError('Invalid checkout URL')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleManageSubscription = async () => {
    setCheckoutLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-portal-session', {
        body: {
          return_url: `${window.location.origin}/#settings`,
        },
      })

      if (fnError) {
        setError(fnError.message)
      } else if (data?.error) {
        setError(data.error)
      } else if (data?.url) {
        // Validate URL is a legitimate Stripe portal URL
        if (data.url.startsWith('https://billing.stripe.com/')) {
          window.location.href = data.url
        } else {
          setError('Invalid portal URL')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open portal')
    } finally {
      setCheckoutLoading(false)
    }
  }

  if (isHinged) {
    return (
      <div className="space-y-6">
        <h3 className="font-bold text-lg text-charcoal">Subscription</h3>

        <div className="bg-lavender/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-charcoal">
                {status === 'active' && 'Active Subscription'}
                {status === 'trialing' && 'Free Trial'}
                {status === 'past_due' && 'Payment Past Due'}
                {status === 'canceled' && 'Subscription Canceled'}
                {status === 'expired' && 'Trial Expired'}
              </p>
              <p className="text-sm text-dusty-purple">
                {isTrialing && trialDaysRemaining !== null && (
                  <>{trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} remaining</>
                )}
                {status === 'active' && '$1/month'}
                {status === 'past_due' && 'Please update your payment method'}
                {status === 'canceled' && 'Subscribe to continue using Tick\'d'}
                {status === 'expired' && 'Subscribe for $1/month to continue'}
              </p>
            </div>

            {(isTrialing || status === 'expired' || status === 'canceled') && (
              <button onClick={handleSubscribe} disabled={checkoutLoading} className="px-4 py-2 bg-hinged-accent text-white rounded-md font-medium hover:bg-hinged-accent-hover transition-colors disabled:opacity-50">
                {checkoutLoading ? '...' : 'Subscribe $1/mo'}
              </button>
            )}
            {status === 'active' && (
              <button onClick={handleManageSubscription} className="px-4 py-2 bg-lavender text-charcoal rounded-md font-medium hover:bg-peach transition-colors">Manage</button>
            )}
            {status === 'past_due' && (
              <button onClick={handleManageSubscription} className="px-4 py-2 bg-coral text-white rounded-md font-medium hover:bg-hot-pink transition-colors">Update Payment</button>
            )}
          </div>
          {error && <p className="text-coral text-sm mt-2">{error}</p>}
        </div>

        {isTrialing && trialDaysRemaining !== null && trialDaysRemaining <= 3 && (
          <div className="bg-golden/20 rounded-xl p-4 text-center">
            <p className="text-charcoal font-medium">Your trial ends soon! Subscribe to keep Tick lying to you.</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-pixel text-sm text-clock-black">THE DEAL</h3>

      <div className="bg-clock-ivory border-3 border-clock-black p-5 shadow-[4px_4px_0_0_#1c1917]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-clock-black">
              {status === 'active' && 'You\'re locked in'}
              {status === 'trialing' && 'Free trial mode'}
              {status === 'past_due' && 'Payment issues'}
              {status === 'canceled' && 'You abandoned me'}
              {status === 'expired' && 'Trial\'s over, bestie'}
            </p>
            <p className="text-sm text-clock-black/60 font-mono">
              {isTrialing && trialDaysRemaining !== null && (
                <>{trialDaysRemaining} day{trialDaysRemaining !== 1 ? 's' : ''} left to decide</>
              )}
              {status === 'active' && '$1/month · cheaper than therapy'}
              {status === 'past_due' && 'fix your payment or I stop lying'}
              {status === 'canceled' && 'come back, I miss judging you'}
              {status === 'expired' && '$1/month to continue the chaos'}
            </p>
          </div>

          {(isTrialing || status === 'expired' || status === 'canceled') && (
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading}
              className="px-5 py-3 bg-clock-red text-clock-ivory font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 whitespace-nowrap"
            >
              {checkoutLoading ? '...' : 'Subscribe $1/mo'}
            </button>
          )}
          {status === 'active' && (
            <button onClick={handleManageSubscription} className="px-5 py-3 bg-clock-parchment text-clock-black font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Manage
            </button>
          )}
          {status === 'past_due' && (
            <button onClick={handleManageSubscription} className="px-5 py-3 bg-clock-brass text-clock-black font-bold border-3 border-clock-black shadow-[3px_3px_0_0_#1c1917] hover:shadow-[1px_1px_0_0_#1c1917] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Fix Payment
            </button>
          )}
        </div>
        {error && <p className="text-clock-red text-sm mt-3 font-mono">{error}</p>}
      </div>

      {isTrialing && trialDaysRemaining !== null && trialDaysRemaining <= 3 && (
        <div className="bg-clock-brass/20 border-3 border-clock-black p-4 text-center -rotate-1 shadow-[3px_3px_0_0_#1c1917]">
          <p className="text-clock-black font-bold">⚠️ Your trial ends soon!</p>
          <p className="text-clock-black/60 text-sm font-mono">subscribe or lose your favorite gaslighter</p>
        </div>
      )}
    </div>
  )
}
