// Daily progress e-mail for the admin: one letter with a section per student.
//
// Called every morning at 08:00 Baku by pg_cron (see supabase/migrations/*_daily_report_cron.sql)
// and reports on the previous study day, which ends at 04:00 Baku.
// Reads each student's review log, builds a short report and sends it through Resend.
// Secrets (Resend key, shared cron secret, recipient) live in Supabase Vault and are
// read through public.get_secret(), which only the service role may call.
//
// Study days: the app starts a new day at 04:00 Asia/Baku (UTC+4, no DST), which is
// exactly 00:00 UTC, so "study day number" = floor(unix ms / 86 400 000).
//
// Query parameters: ?dry=1 (build but do not send), ?day=YYYY-MM-DD (report on that day
// instead of yesterday).

import { createClient } from 'jsr:@supabase/supabase-js@2';

const DAY_MS = 86_400_000;
const FROM = 'IELTS Words <onboarding@resend.dev>';
const APP_URL = 'https://fareonx.github.io/Anki_English/';
const DEFAULT_NEW_WORDS = 25;
const DEFAULT_REVIEWS = 200;

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

const dayOf = (iso: string) => Math.floor(Date.parse(iso) / DAY_MS);

interface Section {
  /** Short status for the subject line, e.g. "Nicat 49 сл." or "Deniz —". */
  short: string;
  html: string;
  text: string;
}

async function buildSection(student: Row, day: number): Promise<Section> {
  const settings = (student.settings ?? {}) as Row;
  const newPerDay = Number(settings.newPerDay) > 0 ? Number(settings.newPerDay) : DEFAULT_NEW_WORDS;
  const reviewsPerDay = Number(settings.reviewsPerDay) > 0 ? Number(settings.reviewsPerDay) : DEFAULT_REVIEWS;
  const dayEnd = new Date((day + 1) * DAY_MS).toISOString();

  const [revlog, cards, notes, sentences, beginnerRoot, topups] = await Promise.all([
    fetchAll('revlog', 'card_id, reviewed_at, ease, last_ivl, time_ms, rtype', (q) =>
      q.eq('student_id', student.id).lt('reviewed_at', dayEnd).order('id')),
    fetchAll('cards', 'id, note_id, queue, ctype, due, ivl, lapses, leech', (q) =>
      q.eq('student_id', student.id).order('id')),
    fetchAll('notes', 'id, word, translation_ru', (q) => q.eq('student_id', student.id).order('id')),
    fetchAll('sentences', 'note_id, text, created_at', (q) =>
      q
        .eq('student_id', student.id)
        .gte('created_at', new Date(day * DAY_MS).toISOString())
        .lt('created_at', dayEnd)
        .order('created_at')),
    fetchAll('decks', 'id', (q) => q.eq('student_id', student.id).is('parent_id', null).eq('name', '1. Начало A1')),
    // Automatic top-ups since the reported day began (they run at 04:05 Baku).
    fetchAll('word_topups', 'words, first_day, last_day, courses, created_at', (q) =>
      q.eq('student_id', student.id).gte('created_at', new Date(day * DAY_MS).toISOString()).order('created_at')),
  ]);
  const isBeginner = beginnerRoot.length > 0;
  let bankLeft: number | null = null;
  if (isBeginner) {
    const { data } = await sb.rpc('bank_remaining', { p_student: student.id });
    bankLeft = typeof data === 'number' ? data : null;
  }

  const wordOf = new Map(notes.map((n) => [n.id as string, n]));
  const noteOfCard = new Map(cards.map((c) => [c.id as string, c.note_id as string]));

  // Activity per study day and the day each word was first answered.
  const days = new Map<number, { answers: number; newCards: number; reviews: number; ok: number; ms: number }>();
  const firstDayOfNote = new Map<string, number>();
  for (const r of revlog) {
    const d = dayOf(r.reviewed_at);
    const s = days.get(d) ?? { answers: 0, newCards: 0, reviews: 0, ok: 0, ms: 0 };
    s.answers++;
    s.ms += r.time_ms ?? 0;
    if (r.ease > 1) s.ok++;
    if (r.rtype === 0 && r.last_ivl === 0) s.newCards++;
    if (r.rtype === 1) s.reviews++;
    days.set(d, s);
    const note = noteOfCard.get(r.card_id);
    if (note && !firstDayOfNote.has(note)) firstDayOfNote.set(note, d);
  }
  const t = days.get(day) ?? { answers: 0, newCards: 0, reviews: 0, ok: 0, ms: 0 };
  const studied = t.answers > 0;
  const newWords = [...firstDayOfNote.values()].filter((d) => d === day).length;

  let streak = 0;
  for (let d = day; days.has(d); d--) streak++;

  const missed: number[] = [];
  for (let d = day - 6; d < day; d++) if (!days.has(d)) missed.push(d);

  // What was left undone that day. Cards are read now (08:00), a few hours after the day
  // ended, so this is accurate unless the student already studied this morning.
  const dayEndSec = (day + 1) * 86_400;
  const dueReviews = cards.filter((c) => (c.queue === 2 || c.queue === 3) && Number(c.due) <= day).length;
  const reviewsLeft = Math.min(dueReviews, Math.max(0, reviewsPerDay - t.reviews));
  const learningLeft = cards.filter((c) => c.queue === 1 && Number(c.due) < dayEndSec).length;

  // Fresh words: both cards still new.
  const started = new Set(cards.filter((c) => c.ctype !== 0).map((c) => c.note_id));
  const freshWords = new Set(cards.filter((c) => !started.has(c.note_id)).map((c) => c.note_id)).size;
  const newLeft = Math.min(Math.max(0, newPerDay - newWords), freshWords);
  const leftTotal = reviewsLeft + learningLeft + newLeft;
  const daysOfWords = Math.floor(freshWords / newPerDay);

  const learned = cards.filter((c) => c.ctype === 2 && c.ivl >= 21).length;
  const forgotten = [
    ...new Set(
      revlog
        .filter((r) => r.ease === 1 && dayOf(r.reviewed_at) === day)
        .map((r) => noteOfCard.get(r.card_id))
        .filter((id): id is string => !!id),
    ),
  ]
    .map((id) => wordOf.get(id))
    .filter(Boolean);
  const leeches = [...new Set(cards.filter((c) => c.leech).map((c) => wordOf.get(c.note_id)?.word).filter(Boolean))];

  const mins = Math.round(t.ms / 60_000);
  const pct = t.answers > 0 ? `${Math.round((t.ok / t.answers) * 100)}%` : '—';

  const alerts: string[] = [];
  if (notes.length === 0) alerts.push('Слов пока нет.');
  else if (!studied) alerts.push('В этот день занятий не было.');
  if (missed.length > 0 && notes.length > 0) alerts.push(`Пропущенные дни за неделю до этого: ${missed.map(fmtDay).join(', ')}.`);
  // Beginners get new words automatically; warn only when the word bank itself runs low.
  if (!isBeginner && notes.length > 0 && daysOfWords < 2) {
    alerts.push(
      freshWords === 0
        ? '<b>Новые слова закончились.</b> Добавь новую категорию.'
        : `<b>Новых слов хватит меньше чем на 2 дня</b> (осталось слов: ${freshWords}). Добавь новую категорию.`,
    );
  }
  if (bankLeft !== null && bankLeft < 14 * newPerDay) {
    alerts.push(`<b>Банк слов для автопополнения скоро закончится</b>: осталось ${bankLeft} слов (меньше чем на 14 дней). Попроси пополнить банк.`);
  }
  if (leeches.length > 0) alerts.push(`Трудные слова (забыты много раз): ${esc(leeches.slice(0, 8).join(', '))}.`);

  const stat = (label: string, value: string) =>
    `<td style="padding:10px 6px;text-align:center"><div style="font-size:20px;font-weight:700">${value}</div><div style="font-size:12px;color:#687089">${label}</div></td>`;

  const html = `<div style="background:#fff;border-radius:16px;padding:16px;margin-top:14px">
  <h2 style="font-size:19px;margin:0 0 10px">${esc(student.name)}${studied ? '' : ' <span style="font-size:14px;color:#687089;font-weight:400">— без занятий</span>'}</h2>
  ${alerts.length ? `<div style="background:#fff4e0;color:#7a4a00;border-radius:12px;padding:10px 12px;margin-bottom:10px;font-size:14px">${alerts.map((a) => `<div style="margin:3px 0">⚠️ ${a}</div>`).join('')}</div>` : ''}
  <table style="width:100%;border-collapse:collapse"><tr>
    ${stat('новых слов', String(newWords))}${stat('повторений', String(t.reviews))}${stat('минут', String(mins))}${stat('верных ответов', pct)}
  </tr><tr>
    ${stat('ответов', String(t.answers))}${stat('не доделано', leftTotal === 0 ? '✓' : String(leftTotal))}${stat('дней подряд', String(streak))}${stat('выучено карточек', String(learned))}
  </tr></table>
  ${topups.length ? `<div style="background:#eaeefe;color:#2846c4;border-radius:12px;padding:10px 12px;margin-top:10px;font-size:14px">${topups.map((u) => `➕ Автоматически добавлено ${u.words} слов: День ${u.first_day}–${u.last_day} (${esc(u.courses)})`).join('<br>')}</div>` : ''}
  ${forgotten.length ? `<div style="margin-top:10px;font-size:14px"><b>Забыл(а):</b> ${forgotten.slice(0, 10).map((n) => `${esc(n!.word)} (${esc(n!.translation_ru)})`).join(', ')}</div>` : ''}
  ${sentences.length ? `<div style="margin-top:10px;font-size:14px"><b>Предложения:</b>${sentences.map((s) => `<div style="margin-top:6px"><span style="color:#687089">${esc(wordOf.get(s.note_id)?.word ?? '')}:</span> ${esc(s.text)}</div>`).join('')}</div>` : ''}
  <div style="margin-top:10px;font-size:12px;color:#687089">Лимит: ${newPerDay} новых слов в день. Слов в запасе: ${freshWords} (около ${daysOfWords} дн.).</div>
</div>`;

  const text = [
    `${student.name}: ${studied ? `${newWords} новых слов, ${t.reviews} повторений, ${t.answers} ответов, ${mins} мин, верных ${pct}` : 'занятий не было'}`,
    `  не доделано: ${leftTotal}, дней подряд: ${streak}, слов в запасе: ${freshWords} (около ${daysOfWords} дн.)`,
    ...topups.map((u) => `  + добавлено автоматически: ${u.words} слов, День ${u.first_day}–${u.last_day} (${u.courses})`),
  ].join('\n');

  return { short: `${student.name} ${studied ? `${newWords} сл.` : '—'}`, html, text };
}

function parseDay(param: string | null, nowMs: number): number {
  if (param && /^\d{4}-\d{2}-\d{2}$/.test(param)) return Date.parse(`${param}T00:00:00Z`) / DAY_MS;
  return Math.floor(nowMs / DAY_MS) - 1;
}

Deno.serve(async (req) => {
  try {
    if (req.headers.get('x-cron-secret') !== (await secret('report_cron_secret'))) {
      return new Response('Unauthorized', { status: 401 });
    }
    const params = new URL(req.url).searchParams;
    const dry = params.get('dry') === '1';
    const day = parseDay(params.get('day'), Date.now());

    const { data: students, error } = await sb
      .from('profiles')
      .select('id, name, settings')
      .eq('role', 'student')
      .order('created_at');
    if (error) throw new Error(error.message);

    const sections: Section[] = [];
    for (const student of students ?? []) sections.push(await buildSection(student, day));

    const date = fmtDay(day);
    const subject = `IELTS Words · ${date}: ${sections.map((s) => s.short).join(', ')}`;
    const html = `<!doctype html><html lang="ru"><body style="margin:0;background:#f4f5f9;font-family:Inter,Arial,sans-serif;color:#141a29">
<div style="max-width:560px;margin:0 auto;padding:20px 16px">
  <div style="font-size:13px;color:#687089">IELTS Words · учебный день ${date} (до 04:00 следующего дня)</div>
  <h1 style="font-size:22px;margin:4px 0 0">Итоги дня</h1>
  ${sections.map((s) => s.html).join('\n')}
  <div style="margin-top:14px;font-size:12px;color:#687089"><a href="${APP_URL}" style="color:#3557e6">Открыть приложение</a></div>
</div></body></html>`;
    const text = `IELTS Words · итоги дня ${date}\n\n${sections.map((s) => s.text).join('\n\n')}\n\n${APP_URL}\n`;

    if (dry) return Response.json({ ok: true, dry: true, subject, text, htmlLength: html.length });

    const apiKey = await secret('resend_api_key');
    const to = await secret('report_recipient');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [to], reply_to: to, subject, html, text }),
    });
    return Response.json({ ok: res.ok, subject, status: res.status, body: await res.json().catch(() => null) });
  } catch (e) {
    return Response.json({ ok: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
});
