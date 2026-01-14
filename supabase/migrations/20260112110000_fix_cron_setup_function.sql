-- ABOUTME: Fixes the cron setup function to handle non-existent jobs gracefully.
-- ABOUTME: The unschedule call now checks if job exists before attempting removal.

-- Replace the function with a version that handles non-existent jobs
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
  v_job_exists BOOLEAN;
BEGIN
  -- Check if job already exists before trying to unschedule
  SELECT EXISTS(SELECT 1 FROM cron.job WHERE jobname = p_job_name) INTO v_job_exists;

  IF v_job_exists THEN
    PERFORM cron.unschedule(p_job_name);
  END IF;

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
