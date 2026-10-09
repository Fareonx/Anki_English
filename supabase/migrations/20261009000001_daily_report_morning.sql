-- The daily report now goes out at 08:00 Asia/Baku (04:00 UTC) and covers the previous
-- study day, which ends at 04:00 Baku. At 00:00 it missed everything studied after midnight.
select cron.alter_job(jobid, schedule := '0 4 * * *') from cron.job where jobname = 'daily-report';
