const STORAGE_KEY = "fun-game-audio-muted";

export type AudioCue =
  | "join"
  | "leave"
  | "chat"
  | "start"
  | "move"
  | "invalid"
  | "turn"
  | "result"
  | "host-disconnected";

export class AudioManager {
  private context: AudioContext | null = null;
  private unlocked = false;

  unlock() {
    if (this.unlocked) {
      return;
    }

    const AudioContextClass = window.AudioContext;
    this.context = new AudioContextClass();
    this.unlocked = true;
  }

  play(cue: AudioCue, muted: boolean) {
    if (muted || !this.unlocked || !this.context) {
      return;
    }

    const tone = cueToneMap[cue];
    const oscillator = this.context.createOscillator();
    const gain = this.context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = tone.frequency;
    gain.gain.value = 0.0001;

    oscillator.connect(gain);
    gain.connect(this.context.destination);

    const now = this.context.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);
    oscillator.start(now);
    oscillator.stop(now + tone.duration + 0.02);
  }
}

export function readMutedPreference() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function writeMutedPreference(muted: boolean) {
  window.localStorage.setItem(STORAGE_KEY, String(muted));
}

const cueToneMap: Record<AudioCue, { frequency: number; duration: number }> = {
  join: { frequency: 520, duration: 0.12 },
  leave: { frequency: 260, duration: 0.12 },
  chat: { frequency: 620, duration: 0.08 },
  start: { frequency: 740, duration: 0.16 },
  move: { frequency: 440, duration: 0.08 },
  invalid: { frequency: 180, duration: 0.14 },
  turn: { frequency: 660, duration: 0.1 },
  result: { frequency: 880, duration: 0.2 },
  "host-disconnected": { frequency: 220, duration: 0.2 },
};
