-- ABOUTME: Migration to add Pick For Me settings to profiles table.
-- ABOUTME: Adds toggles for Pick For Me, escalation, and earn-out visibility.

-- Add Pick For Me settings columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS pick_for_me_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS single_task_escalation_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_earnout_progress boolean DEFAULT true;

-- Add comment for documentation
COMMENT ON COLUMN profiles.pick_for_me_enabled IS 'Whether Pick For Me feature is enabled for this user';
COMMENT ON COLUMN profiles.single_task_escalation_enabled IS 'Whether picking twice without completing triggers single-task mode';
COMMENT ON COLUMN profiles.show_earnout_progress IS 'Whether to show earn-out progress bar in single-task mode';
