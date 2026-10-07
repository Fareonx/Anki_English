-- Daily progress e-mail: every day at 22:00 Asia/Baku (18:00 UTC; Baku has no DST).
-- The Edge Function checks the shared secret that is kept in Supabase Vault
-- (secrets resend_api_key, report_cron_secret and report_recipient are created
-- separately and are never stored in the repository).

create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

create or replace function public.get_secret(secret_name text)
returns text
language sql
security definer
set search_path = ''
as $$
  select decrypted_secret from vault.decrypted_secrets where name = secret_name limit 1;
$$;

revoke all on function public.get_secret(text) from public, anon, authenticated;
grant execute on function public.get_secret(text) to service_role;

select cron.unschedule('daily-report') where exists (select 1 from cron.job where jobname = 'daily-report');

select cron.schedule(
  'daily-report',
  '0 18 * * *',
  $$
  select net.http_post(
    url := 'https://lrjyfsqvqddzgcugqidb.supabase.co/functions/v1/daily-report',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', (select decrypted_secret from vault.decrypted_secrets where name = 'report_cron_secret')
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 30000
  );
  $$
);
