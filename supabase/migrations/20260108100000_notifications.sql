-- ABOUTME: Database migration for notification system tables.
-- ABOUTME: Creates push_subscriptions, notification_log, and excuses tables with RLS.

-- Create push_subscriptions table (stores browser push endpoints)
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, endpoint)
);

-- Create notification_log table (tracks sent notifications)
CREATE TABLE notification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL,
  channel TEXT NOT NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create excuses table (the hall of shame for snooze reasons)
CREATE TABLE excuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  excuse_text TEXT NOT NULL CHECK (char_length(excuse_text) >= 10),
  postponed_until TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE excuses ENABLE ROW LEVEL SECURITY;

-- Push subscriptions policies
CREATE POLICY "Users can view own push subscriptions" ON push_subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own push subscriptions" ON push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own push subscriptions" ON push_subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own push subscriptions" ON push_subscriptions
  FOR DELETE USING (auth.uid() = user_id);

-- Notification log policies
CREATE POLICY "Users can view own notification log" ON notification_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notification log" ON notification_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Excuses policies
CREATE POLICY "Users can view own excuses" ON excuses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own excuses" ON excuses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own excuses" ON excuses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own excuses" ON excuses
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX push_subscriptions_user_id_idx ON push_subscriptions(user_id);
CREATE INDEX notification_log_lookup_idx ON notification_log(task_id, notification_type, channel);
CREATE INDEX notification_log_sent_at_idx ON notification_log(sent_at);
CREATE INDEX excuses_task_id_idx ON excuses(task_id);
CREATE INDEX excuses_user_id_idx ON excuses(user_id);
CREATE INDEX excuses_postponed_until_idx ON excuses(postponed_until);
