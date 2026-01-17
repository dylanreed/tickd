-- ABOUTME: Migration to add Time Blindness Toolkit database schema.
-- ABOUTME: Adds time estimation fields and settings for time awareness features.

-- Add time estimation columns to tasks table
ALTER TABLE tasks
ADD COLUMN IF NOT EXISTS estimated_minutes integer DEFAULT null,
ADD COLUMN IF NOT EXISTS actual_minutes integer DEFAULT null;

-- Add Time Tools settings columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS time_tools_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS daily_checkin_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS brain_state_affects_spiciness boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS time_sessions_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS milestone_alerts text DEFAULT 'off',
ADD COLUMN IF NOT EXISTS estimate_alerts_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS ambient_timer_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS deadline_visuals text DEFAULT 'match_app',
ADD COLUMN IF NOT EXISTS estimation_prompts_enabled boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS auto_pause_tracking boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS day_start_time time DEFAULT '00:00';

-- Create time_sessions table for tracking work sessions
CREATE TABLE IF NOT EXISTS time_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  task_id uuid REFERENCES tasks(id) ON DELETE SET NULL,
  session_type text NOT NULL CHECK (session_type IN ('focus', 'hard_deadline')),
  started_at timestamptz NOT NULL,
  planned_end_at timestamptz NOT NULL,
  actual_end_at timestamptz,
  paused_at timestamptz,
  total_paused_seconds integer DEFAULT 0,
  status text DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'abandoned')),
  created_at timestamptz DEFAULT now()
);

-- Create daily_checkins table for brain state tracking
CREATE TABLE IF NOT EXISTS daily_checkins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  checkin_date date NOT NULL,
  brain_state integer NOT NULL CHECK (brain_state BETWEEN 1 AND 5),
  time_budget_minutes integer,
  hard_stop_time time,
  selected_task_ids uuid[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, checkin_date)
);

-- Add indexes for common queries
CREATE INDEX IF NOT EXISTS idx_time_sessions_user_id ON time_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_time_sessions_status ON time_sessions(status);
CREATE INDEX IF NOT EXISTS idx_daily_checkins_user_date ON daily_checkins(user_id, checkin_date);

-- Add comments for documentation
COMMENT ON COLUMN tasks.estimated_minutes IS 'User estimate of how long task will take';
COMMENT ON COLUMN tasks.actual_minutes IS 'Tracked actual time spent on task';
COMMENT ON TABLE time_sessions IS 'Tracks focused work sessions with optional hard deadlines';
COMMENT ON TABLE daily_checkins IS 'Daily brain state and time budget check-ins';
