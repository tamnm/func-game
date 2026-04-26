import type { ChatMessage, Participant } from "../app/types";
import { ticTacToeDefinition } from "../games/tic-tac-toe/definition";
import type { TicTacToeMark, TicTacToeState } from "../games/tic-tac-toe/rules";

export type RoomPhase = "lobby" | "playing" | "finished" | "host-disconnected";

export type RoomState = {
  code: string;
  hostId: string;
  localPeerId: string;
  phase: RoomPhase;
  participants: Participant[];
  chat: ChatMessage[];
  game: TicTacToeState;
  maxParticipants: number;
};

export const initialRoomCode = "F7KQ";
export const maxInitialParticipants = 8;

export function createInitialRoomState(hostName: string, hostId = "host"): RoomState {
  return {
    code: initialRoomCode,
    hostId,
    localPeerId: hostId,
    phase: "lobby",
    participants: [
      {
        id: hostId,
        name: hostName || "Host",
        role: "host",
        connected: true,
        slotIndex: 0,
        slotLabel: "X",
      },
    ],
    chat: [
      {
        id: "chat-system-1",
        author: "System",
        body: "Room created with deterministic local transport.",
        tone: "system",
      },
    ],
    game: ticTacToeDefinition.createInitialState(),
    maxParticipants: Math.min(maxInitialParticipants, ticTacToeDefinition.maxPlayers + 6),
  };
}

export function getParticipantMark(participant?: Participant): TicTacToeMark | null {
  if (participant?.slotIndex === 0) {
    return "X";
  }

  if (participant?.slotIndex === 1) {
    return "O";
  }

  return null;
}

export function getParticipantByMark(
  participants: Participant[],
  mark: TicTacToeMark,
) {
  return participants.find((participant) => getParticipantMark(participant) === mark);
}
