// ABOUTME: Soft-lock overlay shown when trial expired or subscription canceled.
// ABOUTME: Shows Tick and prompts user to subscribe, tasks visible but grayed behind.

import { useState } from 'react'
import TickSprite from './TickSprite'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

const TICK_ROASTS = [
  "I can't lie to you if you don't pay me.",
  'A whole dollar. You spend more on worse things.',
  'Your tasks miss me. I can tell.',
  "Without me, you'll actually have to manage time. Good luck.",
  'One dollar. Less than a coffee. More than your excuses are worth.',
]

interface SubscriptionLockOverlayProps {
  status: 'expired' | 'canceled'
}

export default function SubscriptionLockOverlay({ status }: SubscriptionLockOverlayProps) {
  const { user } = useAuth()
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [roastIndex] = useState(() => Math.floor(Math.random() * TICK_ROASTS.length))

  const handleSubscribe = async () => {
    if (!user) return

    setCheckoutLoading(true)
    setError(null)

    try {
      const { data, error: fnError } = await supabase.functions.invoke('create-checkout-session', {
        body: {
          success_url: `${window.location.origin}/?success=true`,
          cancel_url: `${window.location.origin}/?canceled=true`,
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

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-charcoal/80 backdrop-blur-sm">
      <div className="bg-cloud rounded-2xl shadow-xl max-w-md w-full mx-4 p-8 text-center">
        {/* Tick */}
        <div className="mb-6">
          <TickSprite expression="disappointed" size="xl" className="mx-auto" />
        </div>

        {/* Title */}
        <h2 className="font-pixel text-lg text-charcoal mb-4">
          {status === 'expired' ? 'YOUR TRIAL ENDED' : 'SUBSCRIPTION CANCELED'}
        </h2>

        {/* Roast */}
        <p className="text-dusty-purple italic mb-6">"{TICK_ROASTS[roastIndex]}"</p>

        {/* Price */}
        <p className="text-charcoal mb-6">
          Subscribe for <span className="font-bold text-hot-pink">$1/month</span> to keep using
          Tick'd
        </p>

        {/* Subscribe button */}
        <button
          onClick={handleSubscribe}
          disabled={checkoutLoading}
          className="w-full px-6 py-4 bg-hot-pink text-white font-bold rounded-full hover:bg-coral transition-colors disabled:opacity-50 text-lg"
        >
          {checkoutLoading ? 'Loading...' : 'Subscribe Now'}
        </button>

        {error && <p className="text-coral text-sm mt-4">{error}</p>}

        {/* Small print */}
        <p className="text-dusty-purple text-xs mt-4">Cancel anytime. No hard feelings.</p>
      </div>
    </div>
  )
}
