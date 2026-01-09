-- ABOUTME: Adds subscription fields to profiles table for Stripe integration.
-- ABOUTME: Tracks trial status, subscription status, and Stripe IDs.

-- Add subscription fields to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_status TEXT NOT NULL DEFAULT 'trialing'
  CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'expired'));

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subscription_id TEXT;

-- Set trial_ends_at for existing users (14 days from now)
UPDATE profiles
SET trial_ends_at = NOW() + INTERVAL '14 days'
WHERE trial_ends_at IS NULL;

-- Update the handle_new_user function to set trial_ends_at on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, trial_ends_at)
  VALUES (new.id, new.email, NOW() + INTERVAL '14 days');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Index for looking up users by stripe_customer_id (webhook lookups)
CREATE INDEX IF NOT EXISTS idx_profiles_stripe_customer_id ON profiles(stripe_customer_id);
