-- ABOUTME: Adds onboarding_completed flag to profiles table.
-- ABOUTME: Backfills existing users who have tasks as having completed onboarding.

-- Add the onboarding_completed column
ALTER TABLE profiles
ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- Backfill: Mark users who have tasks as having completed onboarding
-- If they created tasks, they definitely went through onboarding
UPDATE profiles
SET onboarding_completed = TRUE
WHERE id IN (SELECT DISTINCT user_id FROM tasks);

-- Also mark any user with non-default settings as having completed onboarding
-- (they've customized their experience)
UPDATE profiles
SET onboarding_completed = TRUE
WHERE theme != 'hinged'
   OR notification_preferences != 'both'
   OR spicy_level IS NOT NULL;
