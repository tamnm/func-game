import { Button } from "./Button";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  async function copyCode() {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(code);
  }

  return (
    <div className="room-code">
      <span className="room-code-label">Room code</span>
      <strong>{code}</strong>
      <Button aria-label="Copy mock room code" onClick={copyCode} variant="secondary">
        Copy
      </Button>
    </div>
  );
}
