# Stripe Setup Guide

Set up Stripe for $1/month subscriptions with 14-day trial.

## 1. Create Stripe Account

1. Go to https://stripe.com
2. Sign up / log in
3. Complete account activation (for production payments)

## 2. Create Product & Price

In Stripe Dashboard:

1. Go to **Products** → **Add product**
2. Create product:
   - Name: `Tick'd Subscription`
   - Description: `Monthly access to Tick'd - the to-do app that lies about your deadlines`
3. Add price:
   - Pricing model: **Recurring**
   - Amount: **$1.00**
   - Billing period: **Monthly**
4. Save and copy the **Price ID** (starts with `price_`)

## 3. Get API Keys

In Stripe Dashboard:

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key** (starts with `pk_`)
   - **Secret key** (starts with `sk_`)

⚠️ Use **test keys** (`pk_test_`, `sk_test_`) for development, **live keys** for production.

## 4. Set Up Webhook

In Stripe Dashboard:

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://ndflrqxqhfnudumastnu.supabase.co/functions/v1/stripe-webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

## 5. Set Supabase Secrets

Run these commands (replace with your actual values):

```bash
# Stripe API key (secret key)
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxxxx

# Webhook signing secret
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Price ID for the $1/month subscription
supabase secrets set STRIPE_PRICE_ID=price_xxxxx
```

For local development, also add to `.env`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

## 6. Deploy Edge Functions

The subscription system needs two Edge Functions:

### create-checkout-session
Creates Stripe Checkout sessions for new subscribers.

```bash
supabase functions deploy create-checkout-session
```

### stripe-webhook
Handles Stripe webhook events to sync subscription status.

```bash
supabase functions deploy stripe-webhook
```

## 7. Database Migration

Run the subscription fields migration:

```bash
supabase db push
```

This adds to `profiles`:
- `subscription_status` (trialing, active, past_due, canceled, expired)
- `trial_ends_at` (timestamp)
- `stripe_customer_id`
- `subscription_id`

## 8. Test the Flow

### Test Mode (recommended first)
1. Use test API keys (`pk_test_`, `sk_test_`)
2. Use Stripe test cards: https://stripe.com/docs/testing
3. Test card that works: `4242 4242 4242 4242`

### Test Checklist
- [ ] User signs up → `subscription_status = 'trialing'`, `trial_ends_at` set
- [ ] Click Subscribe → redirects to Stripe Checkout
- [ ] Complete payment → webhook fires → `subscription_status = 'active'`
- [ ] Cancel in portal → webhook fires → `subscription_status = 'canceled'`

## Environment Summary

| Secret | Where | Example |
|--------|-------|---------|
| `STRIPE_SECRET_KEY` | Supabase secrets | `sk_live_xxx` |
| `STRIPE_WEBHOOK_SECRET` | Supabase secrets | `whsec_xxx` |
| `STRIPE_PRICE_ID` | Supabase secrets | `price_xxx` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `.env` / hosting env | `pk_live_xxx` |

## Stripe Customer Portal (Optional)

Let users manage their own subscriptions:

1. Go to **Settings** → **Billing** → **Customer portal**
2. Enable portal
3. Configure allowed actions (cancel, update payment method)
4. Use portal link in your settings page

## Going Live Checklist

- [ ] Switch from test keys to live keys
- [ ] Update webhook endpoint to use live signing secret
- [ ] Verify webhook is receiving events (check Stripe Dashboard → Webhooks → Logs)
- [ ] Complete Stripe account activation for payouts
- [ ] Test a real $1 payment (you can refund it)
