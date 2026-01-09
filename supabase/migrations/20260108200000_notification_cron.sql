-- ABOUTME: Migration to set up hourly notification cron job.
-- ABOUTME: Requires pg_cron and pg_net extensions enabled in Supabase.

-- Note: pg_cron and pg_net must be enabled in Supabase dashboard first.
-- This migration creates the scheduled job to call the notifications edge function.
--
-- IMPORTANT: Before running this migration, enable these extensions in Supabase Dashboard:
--   Database > Extensions > pg_cron
--   Database > Extensions > pg_net
--
-- After deployment, you must manually configure the cron job via SQL Editor
-- with your actual project URL and service role key. See docs/NOTIFICATION_SETUP.md

-- Enable pg_net extension if not already enabled (required for HTTP calls)
-- Note: This may require dashboard enablement first
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- The actual cron job must be created manually after deployment because it requires:
-- 1. Your specific Supabase project URL
-- 2. Your service role key (which should not be in version control)
--
-- Run this in SQL Editor after deployment:
--
-- SELECT cron.schedule(
--   'send-notifications-hourly',  -- unique job name
--   '0 * * * *',                  -- every hour at minute 0
--   $$
--   SELECT net.http_post(
--     url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
--     headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb,
--     body := '{}'::jsonb
--   ) AS request_id;
--   $$
-- );
