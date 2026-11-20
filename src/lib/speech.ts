// Pronunciation through the browser's built-in speech synthesis (free, works offline on most devices).
// Only a voice of the studied language is used: without one the app stays silent instead of
// reading Italian with an English voice. The student can switch the voice off on the device.

import { useEffect, useState } from 'react';
import { SPEECH_LANG, type StudyLang } from './studyLang';

const OFF_KEY = 'speechOff';
const CHANGE_EVENT = 'speechchange';

function synth(): SpeechSynthesis | null {
  return typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
}

/** The voice for a language, e.g. it-IT for Italian, or null when the device has none. */
function voiceFor(lang: StudyLang): SpeechSynthesisVoice | null {
  const voices = synth()?.getVoices() ?? [];
  const tag = SPEECH_LANG[lang];
  const norm = (v: SpeechSynthesisVoice) => v.lang.replace('_', '-').toLowerCase();
  return (
    voices.find((v) => norm(v) === tag.toLowerCase()) ??
    voices.find((v) => norm(v).startsWith(`${lang}-`) || norm(v) === lang) ??
    null
  );
}

export function speechEnabled(): boolean {
  try {
    return localStorage.getItem(OFF_KEY) !== '1';
  } catch {
    return true;
  }
}

export function setSpeechEnabled(on: boolean) {
  try {
    if (on) localStorage.removeItem(OFF_KEY);
    else localStorage.setItem(OFF_KEY, '1');
  } catch {
    // Storage may be unavailable; the switch then lasts until the page is closed.
  }
  if (!on) synth()?.cancel();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** True when the device has a voice for the language (regardless of the on/off switch). */
export function hasVoice(lang: StudyLang): boolean {
  return voiceFor(lang) !== null;
}

export function canSpeak(lang: StudyLang = 'en'): boolean {
  return speechEnabled() && hasVoice(lang);
}

export function speak(text: string, lang: StudyLang = 'en') {
  const s = synth();
  const voice = voiceFor(lang);
  if (!s || !voice || !speechEnabled() || !text.trim()) return;
  s.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.voice = voice;
  u.lang = voice.lang;
  u.rate = 0.9;
  s.speak(u);
}

/** Voice state for the UI; follows the switch and voices that load late (iOS, Chrome). */
export function useSpeech(lang: StudyLang) {
  const [, rerender] = useState(0);
  useEffect(() => {
    const update = () => rerender((n) => n + 1);
    const s = synth();
    s?.addEventListener('voiceschanged', update);
    window.addEventListener(CHANGE_EVENT, update);
    // Some browsers fill the voice list a moment after the page loads without an event.
    const timer = setTimeout(update, 1000);
    return () => {
      s?.removeEventListener('voiceschanged', update);
      window.removeEventListener(CHANGE_EVENT, update);
      clearTimeout(timer);
    };
  }, []);
  return { available: hasVoice(lang), enabled: speechEnabled(), setEnabled: setSpeechEnabled };
}
