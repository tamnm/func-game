import { describe, expect, it } from "vitest";
import { createLocalRoomController } from "./host-session";

describe("local host-authoritative session", () => {
  it("covers the deterministic Tic Tac Toe online happy path", () => {
    const session = createLocalRoomController("Tam");

    let state = session.dispatch({ type: "join", name: "Guest" });
    const guest = state.participants.find((participant) => participant.name === "Guest");
    expect(guest?.role).toBe("player");
    expect(guest?.slotIndex).toBe(1);

    state = session.dispatch({
      type: "rename",
      participantId: guest?.id ?? "",
      name: "Lan",
    });
    expect(state.participants.find((participant) => participant.id === guest?.id)?.name)
      .toBe("Lan");

    state = session.dispatch({
      type: "chat",
      participantId: guest?.id ?? "",
      body: "ready",
    });
    expect(state.chat.at(-1)).toMatchObject({ author: "Lan", body: "ready" });

    state = session.dispatch({ type: "start", participantId: state.hostId });
    expect(state.phase).toBe("playing");

    state = session.dispatch({ type: "move", participantId: state.hostId, cellIndex: 0 });
    state = session.dispatch({
      type: "move",
      participantId: guest?.id ?? "",
      cellIndex: 3,
    });
    state = session.dispatch({ type: "move", participantId: state.hostId, cellIndex: 1 });
    state = session.dispatch({
      type: "move",
      participantId: guest?.id ?? "",
      cellIndex: 4,
    });
    state = session.dispatch({ type: "move", participantId: state.hostId, cellIndex: 2 });

    expect(state.phase).toBe("finished");
    expect(state.game.result).toEqual({
      type: "win",
      winner: "X",
      line: [0, 1, 2],
    });

    state = session.dispatch({ type: "rematch", participantId: state.hostId });
    expect(state.phase).toBe("playing");
    expect(state.game.board.every((cell) => cell === null)).toBe(true);

    state = session.dispatch({ type: "host-disconnect" });
    expect(state.phase).toBe("host-disconnected");
    expect(state.chat.at(-1)).toMatchObject({
      author: "System",
      body: "Host disconnected. Room ended.",
    });
  });

  it("assigns spectators after game-defined player slots are full", () => {
    const session = createLocalRoomController("Host");

    session.dispatch({ type: "join", name: "Player 2" });
    const state = session.dispatch({ type: "join", name: "Spectator" });

    expect(state.participants.at(-1)).toMatchObject({
      name: "Spectator",
      role: "spectator",
      slotIndex: undefined,
    });
  });
});
