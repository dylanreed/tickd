// ABOUTME: Handles Stripe webhook events for subscription status sync.
// ABOUTME: Updates profiles table when subscription status changes.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.10.0?target=deno'

const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')!
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')!
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.user_id
        const customerId = session.customer as string
        const subscriptionId = session.subscription as string

        if (!userId) {
          console.error('No user_id in checkout session metadata')
          break
        }

        // Update profile with Stripe IDs and active status
        const { error } = await supabase
          .from('profiles')
          .update({
            subscription_status: 'active',
            stripe_customer_id: customerId,
            subscription_id: subscriptionId,
          })
          .eq('id', userId)

        if (error) {
          console.error('Failed to update profile on checkout complete:', error)
        } else {
          console.log(`Subscription activated for user ${userId}`)
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.user_id
        const customerId = subscription.customer as string

        // Map Stripe status to our status
        let status: string
        switch (subscription.status) {
          case 'active':
            status = 'active'
            break
          case 'past_due':
            status = 'past_due'
            break
          case 'canceled':
          case 'unpaid':
            status = 'canceled'
            break
          default:
            status = 'active'
        }

        // Try to find user by metadata first, then by stripe_customer_id
        if (userId) {
          const { error } = await supabase
            .from('profiles')
            .update({ subscription_status: status })
            .eq('id', userId)

          if (error) {
            console.error('Failed to update subscription status:', error)
          }
        } else {
          const { error } = await supabase
            .from('profiles')
            .update({ subscription_status: status })
            .eq('stripe_customer_id', customerId)

          if (error) {
            console.error('Failed to update subscription status by customer_id:', error)
          }
        }
        console.log(`Subscription updated to ${status}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.user_id
        const customerId = subscription.customer as string

        if (userId) {
          const { error } = await supabase
            .from('profiles')
            .update({ subscription_status: 'canceled' })
            .eq('id', userId)

          if (error) {
            console.error('Failed to cancel subscription:', error)
          }
        } else {
          const { error } = await supabase
            .from('profiles')
            .update({ subscription_status: 'canceled' })
            .eq('stripe_customer_id', customerId)

          if (error) {
            console.error('Failed to cancel subscription by customer_id:', error)
          }
        }
        console.log('Subscription canceled')
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = invoice.customer as string

        const { error } = await supabase
          .from('profiles')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_customer_id', customerId)

        if (error) {
          console.error('Failed to set past_due status:', error)
        }
        console.log('Payment failed, set to past_due')
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return new Response(JSON.stringify({ error: 'Webhook handler failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
