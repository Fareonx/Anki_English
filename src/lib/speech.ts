// Pronunciation through the browser's built-in speech synthesis (free, works offline on most devices).

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice !== undefined && cachedVoice !== null) return cachedVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  cachedVoice =
    voices.find((v) => v.lang === 'en-GB') ??
    voices.find((v) => v.lang.startsWith('en-GB')) ??
    voices.find((v) => v.lang.startsWith('en')) ??
    null;
  return cachedVoice;
}

export function canSpeak(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function speak(text: string) {
  if (!canSpeak() || !text.trim()) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) u.voice = voice;
  u.lang = voice?.lang ?? 'en-GB';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}
