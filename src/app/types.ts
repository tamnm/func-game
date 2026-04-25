export type ScreenId = "home" | "create" | "join" | "lobby" | "game";

export type ParticipantRole = "host" | "player" | "spectator";

export type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  connected: boolean;
  slotLabel?: string;
};

export type ChatMessage = {
  id: string;
  author: string;
  body: string;
  tone?: "default" | "system";
};
