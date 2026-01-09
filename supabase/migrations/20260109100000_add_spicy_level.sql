-- ABOUTME: Migration to add spicy_level column for roast preferences.
-- ABOUTME: Also creates monthly_stats_log table to prevent duplicate monthly emails.

-- Add spicy_level column to profiles
ALTER TABLE profiles ADD COLUMN spicy_level integer DEFAULT 3;

-- Add constraint to ensure valid range
ALTER TABLE profiles ADD CONSTRAINT spicy_level_range CHECK (spicy_level >= 1 AND spicy_level <= 5);

-- Create monthly_stats_log table for deduplication
CREATE TABLE monthly_stats_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  month_year text NOT NULL,
  sent_at timestamptz DEFAULT now(),
  UNIQUE(user_id, month_year)
);

-- Enable RLS
ALTER TABLE monthly_stats_log ENABLE ROW LEVEL SECURITY;

-- Users can only see their own logs
CREATE POLICY "Users can view own stats log" ON monthly_stats_log
  FOR SELECT USING (auth.uid() = user_id);
