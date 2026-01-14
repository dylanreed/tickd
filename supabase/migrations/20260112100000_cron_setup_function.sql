-- ABOUTME: Creates a helper function to set up cron jobs for edge functions.
-- ABOUTME: Used by the setup-cron edge function to configure scheduled tasks.

-- Enable pg_cron extension (requires enabling in Dashboard first)
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

-- Grant usage on cron schema to postgres role
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Create a function that sets up a cron job to call an edge function
CREATE OR REPLACE FUNCTION setup_edge_function_cron(
  p_job_name TEXT,
  p_schedule TEXT,
  p_function_url TEXT,
  p_service_key TEXT
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_result TEXT;
BEGIN
  -- First, try to unschedule any existing job with this name
  PERFORM cron.unschedule(p_job_name);

  -- Schedule the new job
  PERFORM cron.schedule(
    p_job_name,
    p_schedule,
    format(
      'SELECT net.http_post(url := %L, headers := %L::jsonb, body := ''{}''::jsonb) AS request_id;',
      p_function_url,
      json_build_object('Authorization', 'Bearer ' || p_service_key, 'Content-Type', 'application/json')::text
    )
  );

  RETURN 'Scheduled: ' || p_job_name || ' (' || p_schedule || ')';
EXCEPTION
  WHEN OTHERS THEN
    RETURN 'Error: ' || SQLERRM;
END;
$$;

-- Grant execute permission to authenticated users (edge functions use service role)
GRANT EXECUTE ON FUNCTION setup_edge_function_cron TO service_role;

-- Create a function to list current cron jobs
CREATE OR REPLACE FUNCTION get_cron_jobs()
RETURNS TABLE (
  jobid BIGINT,
  schedule TEXT,
  command TEXT,
  nodename TEXT,
  nodeport INT,
  database TEXT,
  username TEXT,
  active BOOLEAN,
  jobname TEXT
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT jobid, schedule, command, nodename, nodeport, database, username, active, jobname
  FROM cron.job;
$$;

GRANT EXECUTE ON FUNCTION get_cron_jobs TO service_role;
