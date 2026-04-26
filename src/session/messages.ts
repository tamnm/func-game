import type { TicTacToeMove } from "../games/tic-tac-toe/rules";
import type { MessageScope, TransportEnvelope } from "../transport/types";

export type LobbyMessage =
  | { type: "join"; name: string }
  | { type: "rename"; name: string }
  | { type: "start" };

export type GameMessage =
  | { type: "move-intent"; move: TicTacToeMove }
  | { type: "state-broadcast" }
  | { type: "rematch" };

export type ChatMessagePayload = {
  type: "send";
  body: string;
};

export type SystemMessage =
  | { type: "host-disconnected" }
  | { type: "error"; message: string };

export type SessionMessagePayload =
  | LobbyMessage
  | GameMessage
  | ChatMessagePayload
  | SystemMessage;

export type SessionEnvelope = TransportEnvelope<SessionMessagePayload> & {
  scope: MessageScope;
};
