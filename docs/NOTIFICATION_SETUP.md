# Notification System Setup

This guide covers the setup required for Liars Todo's notification system, including push notifications and scheduled email reminders.

## Prerequisites

1. Supabase project with Edge Functions enabled
2. pg_cron extension enabled (Database > Extensions)
3. pg_net extension enabled (for HTTP calls from SQL)
4. Resend.com account for email delivery

## Step 1: Enable Extensions

In Supabase Dashboard > Database > Extensions, enable:
- `pg_cron` - For scheduling recurring jobs
- `pg_net` - For making HTTP requests from SQL

## Step 2: Set Up Secrets

In Supabase Dashboard > Settings > Edge Functions > Secrets, add:

| Secret Name | Description |
|-------------|-------------|
| `VAPID_PUBLIC_KEY` | Your generated VAPID public key |
| `VAPID_PRIVATE_KEY` | Your generated VAPID private key |
| `RESEND_API_KEY` | Your Resend.com API key |

### Generating VAPID Keys

You can generate VAPID keys using the web-push npm package:

```bash
npx web-push generate-vapid-keys
```

## Step 3: Deploy Edge Function

Deploy the notifications edge function:

```bash
supabase functions deploy send-notifications
```

## Step 4: Create Cron Job

Run this SQL in Supabase SQL Editor (Database > SQL Editor):

```sql
SELECT cron.schedule(
  'send-notifications-hourly',
  '0 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
```

Replace:
- `YOUR_PROJECT_REF` - Your Supabase project reference (from Settings > General)
- `YOUR_SERVICE_ROLE_KEY` - Your service role key (from Settings > API > service_role key)

## Step 5: Verify Setup

### Check cron jobs are registered

```sql
SELECT * FROM cron.job;
```

### Check recent job runs

```sql
SELECT * FROM cron.job_run_details ORDER BY start_time DESC LIMIT 10;
```

### Check for errors

```sql
SELECT * FROM cron.job_run_details
WHERE status = 'failed'
ORDER BY start_time DESC
LIMIT 10;
```

## Environment Variables

The frontend needs these environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_VAPID_PUBLIC_KEY` | Public VAPID key for push subscriptions |
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key |

## Troubleshooting

### Cron job not running

1. Verify pg_cron extension is enabled
2. Check job exists: `SELECT * FROM cron.job;`
3. Review job history for errors: `SELECT * FROM cron.job_run_details ORDER BY start_time DESC;`

### HTTP calls failing

1. Verify pg_net extension is enabled
2. Check service role key is correct
3. Verify edge function is deployed and accessible
4. Check edge function logs in Supabase Dashboard

### Push notifications not received

1. Verify browser supports push notifications
2. Check user granted notification permission
3. Verify VAPID keys match between frontend and backend
4. Check push subscription is stored in database

### Emails not sending

1. Verify RESEND_API_KEY is set correctly
2. Check Resend.com dashboard for delivery status
3. Verify sender domain is configured in Resend

## Managing the Cron Job

### Pause the job

```sql
SELECT cron.unschedule('send-notifications-hourly');
```

### Resume/recreate the job

Run the Step 4 SQL again.

### Change schedule

Unschedule first, then reschedule with new cron expression:

```sql
SELECT cron.unschedule('send-notifications-hourly');

SELECT cron.schedule(
  'send-notifications-hourly',
  '*/30 * * * *',  -- Every 30 minutes
  $$
  SELECT net.http_post(
    url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications',
    headers := '{"Authorization": "Bearer YOUR_SERVICE_ROLE_KEY", "Content-Type": "application/json"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
```

## Testing

### Manual trigger

You can manually call the edge function to test:

```bash
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/send-notifications \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json"
```

### Check notification logs

```sql
SELECT * FROM notification_log ORDER BY sent_at DESC LIMIT 20;
```
