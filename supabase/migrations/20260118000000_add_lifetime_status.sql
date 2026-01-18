-- ABOUTME: Adds 'lifetime' as a valid subscription status for free-forever accounts.
-- ABOUTME: Used for admin/founder accounts that don't need to pay.

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_subscription_status_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_subscription_status_check
  CHECK (subscription_status IN ('trialing', 'active', 'past_due', 'canceled', 'expired', 'lifetime'));

-- Set dylan@dylanreed.com to lifetime
UPDATE profiles SET subscription_status = 'lifetime', trial_ends_at = NULL WHERE email = 'dylan@dylanreed.com';
