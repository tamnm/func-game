import type { Participant } from "../../app/types";

type PlayerBadgeProps = {
  participant: Participant;
};

export function PlayerBadge({ participant }: PlayerBadgeProps) {
  return (
    <article className={`player-badge player-${participant.role}`}>
      <span className="player-slot">{participant.slotLabel ?? "View"}</span>
      <span className="player-copy">
        <strong>{participant.name}</strong>
        <small>{participant.role}</small>
      </span>
      <span
        className={`connection-pill ${
          participant.connected ? "connected" : "disconnected"
        }`}
      >
        {participant.connected ? "Online" : "Away"}
      </span>
    </article>
  );
}
