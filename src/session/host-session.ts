import type { Participant } from "../app/types";
import { ticTacToeDefinition } from "../games/tic-tac-toe/definition";
import type { TicTacToeMove } from "../games/tic-tac-toe/rules";
import { createMemoryTransport } from "../transport/memory-transport";
import type { TestTransportHub } from "../transport/types";
import {
  createInitialRoomState,
  getParticipantMark,
  type RoomState,
} from "./room-state";

export type LocalRoomAction =
  | { type: "create"; hostName: string }
  | { type: "join"; name: string }
  | { type: "rename"; participantId: string; name: string }
  | { type: "chat"; participantId: string; body: string }
  | { type: "start"; participantId: string }
  | { type: "move"; participantId: string; cellIndex: number }
  | { type: "rematch"; participantId: string }
  | { type: "host-disconnect" };

export type LocalRoomController = {
  readonly transport: TestTransportHub;
  getState: () => RoomState;
  dispatch: (action: LocalRoomAction) => RoomState;
};

export function createLocalRoomController(
  hostName: string,
  transport = createMemoryTransport(),
): LocalRoomController {
  let state = createInitialRoomState(hostName);
  let nextParticipantId = 2;
  let nextChatId = 2;

  const hostPeer = transport.connect(state.code, state.hostId);
  hostPeer.subscribe(() => undefined);

  function update(nextState: RoomState) {
    state = nextState;
    return state;
  }

  function addSystemMessage(body: string) {
    state = {
      ...state,
      chat: [
        ...state.chat,
        {
          id: `chat-system-${nextChatId++}`,
          author: "System",
          body,
          tone: "system",
        },
      ],
    };
  }

  function dispatch(action: LocalRoomAction): RoomState {
    if (state.phase === "host-disconnected" && action.type !== "create") {
      return state;
    }

    switch (action.type) {
      case "create":
        return update(createInitialRoomState(action.hostName));
      case "join":
        return update(joinRoom(state, action.name, nextPeerId()));
      case "rename":
        return update({
          ...state,
          participants: state.participants.map((participant) =>
            participant.id === action.participantId
              ? { ...participant, name: action.name || participant.name }
              : participant,
          ),
        });
      case "chat":
        return update(sendChat(state, action.participantId, action.body, `chat-${nextChatId++}`));
      case "start":
        if (action.participantId !== state.hostId || state.participants.filter(isPlayer).length < 2) {
          return state;
        }

        return update({ ...state, phase: "playing" });
      case "move":
        return update(applyHostMove(state, action.participantId, action.cellIndex));
      case "rematch":
        if (state.phase === "lobby") {
          return state;
        }

        return update({
          ...state,
          phase: "playing",
          game: ticTacToeDefinition.createInitialState(),
        });
      case "host-disconnect":
        addSystemMessage("Host disconnected. Room ended.");
        return update({ ...state, phase: "host-disconnected" });
      default:
        return state;
    }
  }

  function nextPeerId() {
    const id = `peer-${nextParticipantId++}`;
    transport.connect(state.code, id).subscribe(() => undefined);
    return id;
  }

  return {
    transport,
    getState: () => state,
    dispatch,
  };
}

function joinRoom(state: RoomState, name: string, id: string): RoomState {
  if (state.participants.length >= state.maxParticipants) {
    return state;
  }

  const playerCount = state.participants.filter(isPlayer).length;
  const participant: Participant = {
    id,
    name: name || `Guest ${state.participants.length}`,
    role: playerCount < ticTacToeDefinition.maxPlayers ? "player" : "spectator",
    connected: true,
    slotIndex: playerCount < ticTacToeDefinition.maxPlayers ? playerCount : undefined,
    slotLabel:
      playerCount === 0 ? "X" : playerCount === 1 ? "O" : undefined,
  };

  return {
    ...state,
    participants: [...state.participants, participant],
    chat: [
      ...state.chat,
      {
        id: `join-${id}`,
        author: "System",
        body: `${participant.name} joined as ${participant.role}.`,
        tone: "system",
      },
    ],
  };
}

function sendChat(
  state: RoomState,
  participantId: string,
  body: string,
  id: string,
): RoomState {
  const trimmed = body.trim();
  const participant = state.participants.find((entry) => entry.id === participantId);

  if (!trimmed || !participant) {
    return state;
  }

  return {
    ...state,
    chat: [...state.chat, { id, author: participant.name, body: trimmed }],
  };
}

function applyHostMove(
  state: RoomState,
  participantId: string,
  cellIndex: number,
): RoomState {
  if (state.phase !== "playing") {
    return state;
  }

  const participant = state.participants.find((entry) => entry.id === participantId);
  const player = getParticipantMark(participant);

  if (!player) {
    return state;
  }

  const move: TicTacToeMove = { cellIndex, player };
  const game = ticTacToeDefinition.applyMove(state.game, move);

  return {
    ...state,
    phase: game.result.type === "playing" ? "playing" : "finished",
    game,
  };
}

function isPlayer(participant: Participant) {
  return participant.role === "host" || participant.role === "player";
}
