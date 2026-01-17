-- Add Paralysis Tools settings to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS just_five_minutes_enabled boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS task_shrinking_enabled boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS body_doubling_enabled boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS body_doubling_intensity text DEFAULT 'coworking';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS momentum_builder_enabled boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS warmup_streak_size integer DEFAULT 3;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS transition_prompts_enabled boolean DEFAULT true;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS countdown_length integer DEFAULT 5;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS startup_ritual jsonb DEFAULT '[]';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS environment_checklist jsonb DEFAULT '["Water nearby?", "Phone away/silent?", "Snacks if needed?", "Bathroom break taken?", "Music/silence set?"]';

-- Add micro_steps to tasks table
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS micro_steps jsonb DEFAULT null;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS current_micro_step integer DEFAULT null;
