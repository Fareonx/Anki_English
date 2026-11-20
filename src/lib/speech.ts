// Pronunciation through the browser's built-in speech synthesis (free, works offline on most devices).

import { SPEECH_LANG, type StudyLang } from './studyLang';

const cachedVoice = new Map<StudyLang, SpeechSynthesisVoice>();

function pickVoice(lang: StudyLang): SpeechSynthesisVoice | null {
  const cached = cachedVoice.get(lang);
  if (cached) return cached;
  const tag = SPEECH_LANG[lang];
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const voice =
    voices.find((v) => v.lang === tag) ??
    voices.find((v) => v.lang.replace('_', '-').startsWith(tag)) ??
    voices.find((v) => v.lang.startsWith(lang)) ??
    null;
  if (voice) cachedVoice.set(lang, voice);
  return voice;
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string, lang: StudyLang = 'en') {
  if (!canSpeak() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice(lang);
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? SPEECH_LANG[lang];
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}
