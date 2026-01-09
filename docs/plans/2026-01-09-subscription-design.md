# Subscription System Design

$1/month subscription with 14-day trial, Stripe integration.

## Summary

- **Price:** $1/month
- **Trial:** 14 days, starts on signup
- **Lock behavior:** Soft lock (read-only, can see tasks but not add/complete)
- **Payment:** Stripe Checkout (hosted)
- **Management:** Stripe Customer Portal
- **Status sync:** Stripe webhooks → Supabase Edge Function → profiles table

## Data Model

Extend `profiles` table:

```sql
ALTER TABLE profiles ADD COLUMN subscription_status TEXT DEFAULT 'trialing';
ALTER TABLE profiles ADD COLUMN trial_ends_at TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN stripe_customer_id TEXT;
ALTER TABLE profiles ADD COLUMN subscription_id TEXT;
```

**Subscription statuses:**
- `trialing` - In 14-day trial (default for new signups)
- `active` - Paid and current
- `past_due` - Payment failed, grace period
- `canceled` - Subscription ended
- `expired` - Trial ended without payment

On signup:
- `subscription_status = 'trialing'`
- `trial_ends_at = NOW() + 14 days`

## Checkout Flow

1. User clicks "Subscribe" in the app
2. App calls Supabase Edge Function (`create-checkout-session`)
3. Edge Function creates Stripe Checkout Session:
   - Price: $1/month recurring
   - Customer email from Supabase auth
   - Success/cancel URLs back to app
   - Metadata: `user_id` for webhook matching
4. Edge Function returns Checkout URL
5. App redirects user to Stripe
6. User pays on Stripe's hosted page
7. Stripe redirects back to app success page

```typescript
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [{ price: 'price_xxx', quantity: 1 }],
  customer_email: user.email,
  success_url: 'https://app.com/settings?success=true',
  cancel_url: 'https://app.com/settings?canceled=true',
  metadata: { user_id: user.id },
  subscription_data: {
    trial_period_days: 0,
  },
})
```

## Webhook Handling

Supabase Edge Function (`stripe-webhook`) receives Stripe events:

| Stripe Event | Action |
|--------------|--------|
| `checkout.session.completed` | Set `status = 'active'`, save `stripe_customer_id` and `subscription_id` |
| `customer.subscription.updated` | Sync status (`active`, `past_due`, etc.) |
| `customer.subscription.deleted` | Set `status = 'canceled'` |
| `invoice.payment_failed` | Set `status = 'past_due'` |

Flow:
1. Stripe POSTs to Edge Function URL
2. Verify Stripe signature
3. Extract `user_id` from metadata or lookup by `stripe_customer_id`
4. Update `profiles` table
5. Return 200 OK

## UI/UX

**Trial banner (last 3 days):**
- Yellow banner: "Your trial ends in X days. Subscribe to keep Tick'd."
- Links to settings page

**Soft-lock overlay (expired/canceled):**
- Modal covering task list
- Tick with disappointed expression
- "Your trial ended. Subscribe for $1/month to keep using Tick'd."
- Subscribe button → Stripe Checkout
- Tasks visible but grayed out behind overlay

**Settings page:**
- If trialing: "Trial ends [date]" + "Subscribe now" button
- If active: "Subscribed" + "Manage subscription" → Stripe Portal
- If expired: "Subscribe" button

**Tick roasts for non-payers:**
- "I can't lie to you if you don't pay me."
- "A whole dollar. You spend more on worse things."
- "Your tasks miss me. I can tell."

## Lock Status Check

```typescript
function useSubscription() {
  const { profile } = useProfile()

  const isLocked =
    profile?.subscription_status === 'expired' ||
    profile?.subscription_status === 'canceled' ||
    (profile?.subscription_status === 'trialing' &&
     new Date(profile.trial_ends_at) < new Date())

  return { isLocked, status: profile?.subscription_status }
}
```

## Edge Cases

- **Clock sync:** Check `trial_ends_at` server-side to prevent cheating
- **Existing users:** Migration sets to `trialing` with 14 days from migration date
- **Payment fails:** Status → `past_due`, Stripe retries ~3 weeks, then `canceled`
- **Re-subscribe after cancel:** New checkout → webhook sets `active`

## Implementation Components

1. Database migration (subscription fields)
2. Update profile creation to set trial dates
3. Edge Function: `create-checkout-session`
4. Edge Function: `stripe-webhook`
5. React hook: `useSubscription`
6. Settings page: subscription UI
7. Soft-lock overlay component
8. Trial expiring banner component
