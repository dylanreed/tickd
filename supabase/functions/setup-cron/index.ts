// ABOUTME: One-time setup function to configure pg_cron jobs.
// ABOUTME: Call this once to set up hourly notifications and monthly stats cron jobs.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

serve(async (_req) => {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Get the project ref from the URL
    const projectRef = SUPABASE_URL.replace('https://', '').split('.')[0]
    const functionsUrl = `https://${projectRef}.supabase.co/functions/v1`

    const results: string[] = []

    // Set up hourly notifications cron job
    const { data: notifyResult, error: notifyError } = await supabase.rpc(
      'setup_edge_function_cron',
      {
        p_job_name: 'send-notifications-hourly',
        p_schedule: '0 * * * *', // Every hour at minute 0
        p_function_url: `${functionsUrl}/send-notifications`,
        p_service_key: SUPABASE_SERVICE_ROLE_KEY,
      }
    )

    if (notifyError) {
      results.push(`Hourly notifications: ${notifyError.message}`)
    } else {
      results.push(`Hourly notifications: ${notifyResult}`)
    }

    // Set up monthly stats cron job
    const { data: monthlyResult, error: monthlyError } = await supabase.rpc(
      'setup_edge_function_cron',
      {
        p_job_name: 'send-monthly-stats',
        p_schedule: '0 9 1 * *', // 9am UTC on 1st of each month
        p_function_url: `${functionsUrl}/send-monthly-stats`,
        p_service_key: SUPABASE_SERVICE_ROLE_KEY,
      }
    )

    if (monthlyError) {
      results.push(`Monthly stats: ${monthlyError.message}`)
    } else {
      results.push(`Monthly stats: ${monthlyResult}`)
    }

    // List current cron jobs
    const { data: jobs, error: jobsError } = await supabase.rpc('get_cron_jobs')

    return new Response(JSON.stringify({
      success: true,
      results,
      currentJobs: jobsError ? jobsError.message : jobs,
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
