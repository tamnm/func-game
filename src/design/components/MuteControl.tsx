import { Button } from "./Button";

type MuteControlProps = {
  muted: boolean;
  unlocked: boolean;
  onPlaySample: () => void;
  onToggle: () => void;
};

export function MuteControl({
  muted,
  unlocked,
  onPlaySample,
  onToggle,
}: MuteControlProps) {
  return (
    <div className="mute-control">
      <Button
        aria-pressed={muted}
        icon={muted ? "Off" : "On"}
        onClick={onToggle}
        variant="ghost"
      >
        {muted ? "Muted" : "Sound"}
      </Button>
      <Button
        aria-label="Play sample UI sound"
        onClick={onPlaySample}
        variant="ghost"
      >
        {unlocked ? "Cue" : "Enable audio"}
      </Button>
    </div>
  );
}
