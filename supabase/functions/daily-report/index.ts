// Daily progress e-mail for the admin.
//
// Called every evening by pg_cron (see supabase/migrations/*_daily_report_cron.sql).
// Reads each student's review log, builds a short report and sends it through Resend.
// Secrets (Resend key, shared cron secret, recipient) live in Supabase Vault and are
// read through public.get_secret(), which only the service role may call.
//
// Study days: the app starts a new day at 04:00 Asia/Baku (UTC+4, no DST), which is
// exactly 00:00 UTC, so "study day number" = floor(unix ms / 86 400 000).

import { createClient } from 'jsr:@supabase/supabase-js@2';

const DAY_MS = 86_400_000;
const LOOKBACK_DAYS = 14;
const FROM = 'IELTS Words <onboarding@resend.dev>';

const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

// deno-lint-ignore no-explicit-any
type Row = Record<string, any>;

async function secret(name: string): Promise<string> {
  const { data, error } = await sb.rpc('get_secret', { secret_name: name });
  if (error || !data) throw new Error(`Secret "${name}" is missing`);
  return data as string;
}

async function fetchAll(table: string, columns: string, filter: (q: Row) => Row): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await filter(sb.from(table).select(columns)).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data ?? []));
    if (!data || data.length < 1000) return out;
  }
}

const esc = (s: unknown) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const fmtDay = (day: number) => {
  const d = new Date(day * DAY_MS);
  return `${String(d.getUTCDate()).padStart(2, '0')}.${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
};

interface Report {
  subject: string;
  html: string;
}

async function buildReport(student: Row, nowMs: number): Promise<Report> {
  const today = Math.floor(nowMs / DAY_MS);
  const settings = (student.settings ?? {}) as Row;
  const newPerDay = Number(settings.newPerDay) > 0 ? Number(settings.newPerDay) : 50;
  const reviewsPerDay = Number(settings.reviewsPerDay) > 0 ? Number(settings.reviewsPerDay) : 200;

  const since = new Date((today - LOOKBACK_DAYS + 1) * DAY_MS).toISOString();
  const [revlog, cards, notes, sentences] = await Promise.all([
    fetchAll('revlog', 'card_id, reviewed_at, ease, last_ivl, time_ms, rtype', (q) =>
      q.eq('student_id', student.id).gte('reviewed_at', since).order('id')),
    fetchAll('cards', 'id, note_id, queue, ctype, due, ivl, lapses, leech', (q) =>
      q.eq('student_id', student.id).order('id')),
    fetchAll('notes', 'id, word, translation_ru', (q) => q.eq('student_id', student.id).order('id')),
    fetchAll('sentences', 'note_id, text, created_at', (q) =>
      q.eq('student_id', student.id).gte('created_at', new Date(today * DAY_MS).toISOString()).order('created_at')),
  ]);

  const wordOf = new Map(notes.map((n) => [n.id as string, n]));
  const noteOfCard = new Map(cards.map((c) => [c.id as string, c.note_id as string]));

  // Per study day.
  const days = new Map<number, { answers: number; newCards: number; reviews: number; ok: number; ms: number }>();
  for (const r of revlog) {
    const d = Math.floor(Date.parse(r.reviewed_at) / DAY_MS);
    const s = days.get(d) ?? { answers: 0, newCards: 0, reviews: 0, ok: 0, ms: 0 };
    s.answers++;
    s.ms += r.time_ms ?? 0;
    if (r.rtype === 0 && r.last_ivl === 0) s.newCards++;
    if (r.rtype === 1) {
      s.reviews++;
      if (r.ease > 1) s.ok++;
    }
    days.set(d, s);
  }
  const t = days.get(today) ?? { answers: 0, newCards: 0, reviews: 0, ok: 0, ms: 0 };
  const studiedToday = t.answers > 0;

  // Streak: consecutive study days ending today (or yesterday if nothing yet today).
  let streak = 0;
  for (let d = studiedToday ? today : today - 1; days.has(d); d--) streak++;

  const missed: number[] = [];
  for (let d = today - 6; d < today; d++) if (!days.has(d)) missed.push(d);

  // What is still left today (approximate: the real queue also buries siblings).
  const dayEndSec = (today + 1) * 86_400;
  const dueReviews = cards.filter((c) => (c.queue === 2 || c.queue === 3) && Number(c.due) <= today).length;
  const reviewsLeft = Math.min(dueReviews, Math.max(0, reviewsPerDay - t.reviews));
  const learningLeft = cards.filter((c) => c.queue === 1 && Number(c.due) < dayEndSec).length;
  const newAvailable = cards.filter((c) => c.queue === 0).length;
  const newLeft = Math.min(Math.max(0, newPerDay - t.newCards), newAvailable);
  const leftTotal = reviewsLeft + learningLeft + newLeft;

  // How many days of fresh words remain (words with both cards still untouched).
  const touched = new Set(cards.filter((c) => c.queue !== 0).map((c) => c.note_id));
  const freshWords = new Set(cards.filter((c) => c.queue === 0 && !touched.has(c.note_id)).map((c) => c.note_id)).size;
  const wordsPerDay = Math.max(1, Math.floor(newPerDay / 2));
  const daysOfWords = Math.floor(freshWords / wordsPerDay);

  const learned = cards.filter((c) => c.ctype === 2 && c.ivl >= 21).length;
  const forgottenToday = [
    ...new Set(
      revlog
        .filter((r) => r.ease === 1 && Math.floor(Date.parse(r.reviewed_at) / DAY_MS) === today)
        .map((r) => noteOfCard.get(r.card_id))
        .filter((id): id is string => !!id),
    ),
  ]
    .map((id) => wordOf.get(id))
    .filter(Boolean);
  const leeches = cards.filter((c) => c.leech).map((c) => wordOf.get(c.note_id)?.word).filter(Boolean);

  const mins = Math.round(t.ms / 60_000);
  const pct = t.reviews > 0 ? `${Math.round((t.ok / t.reviews) * 100)}%` : '—';

  const alerts: string[] = [];
  if (!studiedToday) alerts.push(`Сегодня ${esc(student.name)} не занимался.`);
  if (missed.length > 0) alerts.push(`Пропущенные дни за неделю: ${missed.map(fmtDay).join(', ')}.`);
  if (daysOfWords < 2) {
    alerts.push(
      freshWords === 0
        ? '<b>Новые слова закончились.</b> Добавь новую категорию.'
        : `<b>Новых слов хватит меньше чем на 2 дня</b> (осталось слов: ${freshWords}). Добавь новую категорию.`,
    );
  }
  if (leeches.length > 0) alerts.push(`Трудные слова (забыты много раз): ${esc([...new Set(leeches)].slice(0, 8).join(', '))}.`);

  const stat = (label: string, value: string) =>
    `<td style="padding:10px 12px;text-align:center"><div style="font-size:22px;font-weight:700">${value}</div><div style="font-size:12px;color:#687089">${label}</div></td>`;

  const html = `<!doctype html><html lang="ru"><body style="margin:0;background:#f4f5f9;font-family:Inter,Arial,sans-serif;color:#141a29">
<div style="max-width:560px;margin:0 auto;padding:20px 16px">
  <div style="font-size:13px;color:#687089">${fmtDay(today)} · IELTS Words</div>
  <h1 style="font-size:22px;margin:4px 0 14px">${esc(student.name)}: ${studiedToday ? 'итоги дня' : 'сегодня без занятий'}</h1>
  ${alerts.length ? `<div style="background:#fff4e0;color:#7a4a00;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:14px">${alerts.map((a) => `<div style="margin:3px 0">⚠️ ${a}</div>`).join('')}</div>` : ''}
  <table style="width:100%;background:#fff;border-radius:14px;border-collapse:separate"><tr>
    ${stat('новых карточек', String(t.newCards))}${stat('повторений', String(t.reviews))}${stat('минут', String(mins))}${stat('верных', pct)}
  </tr></table>
  <table style="width:100%;background:#fff;border-radius:14px;margin-top:12px;border-collapse:separate"><tr>
    ${stat('осталось на сегодня', leftTotal === 0 ? '✓' : String(leftTotal))}${stat('дней подряд', String(streak))}${stat('выучено карточек', String(learned))}
  </tr></table>
  ${forgottenToday.length ? `<div style="background:#fff;border-radius:14px;padding:14px;margin-top:12px;font-size:14px"><b>Забыл сегодня:</b> ${forgottenToday.slice(0, 10).map((n) => `${esc(n!.word)} (${esc(n!.translation_ru)})`).join(', ')}</div>` : ''}
  ${sentences.length ? `<div style="background:#fff;border-radius:14px;padding:14px;margin-top:12px;font-size:14px"><b>Его предложения:</b>${sentences.map((s) => `<div style="margin-top:8px"><span style="color:#687089">${esc(wordOf.get(s.note_id)?.word ?? '')}:</span> ${esc(s.text)}</div>`).join('')}</div>` : ''}
  <div style="margin-top:14px;font-size:12px;color:#687089">Слов в запасе: ${freshWords} (около ${daysOfWords} дн.). <a href="https://fareonx.github.io/Anki_English/" style="color:#3557e6">Открыть приложение</a></div>
</div></body></html>`;

  const subject = studiedToday
    ? `IELTS Words · ${student.name}: ${t.newCards} нов., ${t.reviews} повт., ${mins} мин`
    : `IELTS Words · ${student.name}: сегодня занятий не было`;
  return { subject, html };
}

Deno.serve(async (req) => {
  try {
    if (req.headers.get('x-cron-secret') !== (await secret('report_cron_secret'))) {
      return new Response('Unauthorized', { status: 401 });
    }
    const dry = new URL(req.url).searchParams.get('dry') === '1';

    const { data: students, error } = await sb
      .from('profiles')
      .select('id, name, settings')
      .eq('role', 'student')
      .order('created_at');
    if (error) throw new Error(error.message);

    const apiKey = await secret('resend_api_key');
    const to = await secret('report_recipient');
    const results: Row[] = [];
    for (const student of students ?? []) {
      const report = await buildReport(student, Date.now());
      if (dry) {
        results.push({ student: student.name, subject: report.subject, htmlLength: report.html.length });
        continue;
      }
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: FROM, to: [to], subject: report.subject, html: report.html }),
      });
      results.push({ student: student.name, status: res.status, body: await res.json().catch(() => null) });
    }
    return Response.json({ ok: true, results });
  } catch (e) {
    return Response.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
});
