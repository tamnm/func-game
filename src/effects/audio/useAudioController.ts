import { useMemo, useState } from "react";
import {
  AudioManager,
  type AudioCue,
  readMutedPreference,
  writeMutedPreference,
} from "./audioManager";

export function useAudioController() {
  const manager = useMemo(() => new AudioManager(), []);
  const [muted, setMuted] = useState(readMutedPreference);
  const [unlocked, setUnlocked] = useState(false);

  function unlock() {
    try {
      manager.unlock();
      setUnlocked(true);
    } catch {
      setUnlocked(false);
    }
  }

  function toggleMuted() {
    const nextMuted = !muted;
    setMuted(nextMuted);
    writeMutedPreference(nextMuted);
  }

  function playCue(cue: AudioCue) {
    unlock();
    manager.play(cue, muted);
  }

  return {
    muted,
    unlocked,
    toggleMuted,
    playCue,
    unlock,
  };
}
