import { describe, expect, it } from "vitest";
import {
  applyTicTacToeMove,
  createInitialTicTacToeState,
  getTicTacToeResult,
  resetTicTacToeState,
  type TicTacToeCell,
} from "./rules";

function playMoves(moves: number[]) {
  return moves.reduce((state, cellIndex) => {
    return applyTicTacToeMove(state, {
      cellIndex,
      player: state.currentTurn,
    });
  }, createInitialTicTacToeState());
}

describe("tic tac toe rules", () => {
  it("creates an empty board with X to move first", () => {
    const state = createInitialTicTacToeState();

    expect(state.board).toHaveLength(9);
    expect(state.board.every((cell) => cell === null)).toBe(true);
    expect(state.currentTurn).toBe("X");
    expect(state.result).toEqual({ type: "playing" });
  });

  it("applies a valid move and switches turns", () => {
    const next = applyTicTacToeMove(createInitialTicTacToeState(), {
      cellIndex: 4,
      player: "X",
    });

    expect(next.board[4]).toBe("X");
    expect(next.currentTurn).toBe("O");
    expect(next.lastMoveIndex).toBe(4);
    expect(next.invalidMove).toBeNull();
  });

  it("rejects occupied cells", () => {
    const afterFirstMove = applyTicTacToeMove(createInitialTicTacToeState(), {
      cellIndex: 4,
      player: "X",
    });
    const rejected = applyTicTacToeMove(afterFirstMove, {
      cellIndex: 4,
      player: "O",
    });

    expect(rejected.board[4]).toBe("X");
    expect(rejected.currentTurn).toBe("O");
    expect(rejected.invalidMove).toBe("cell-occupied");
  });

  it("rejects wrong-turn and out-of-range moves", () => {
    const initial = createInitialTicTacToeState();

    expect(
      applyTicTacToeMove(initial, { cellIndex: 0, player: "O" }).invalidMove,
    ).toBe("wrong-turn");
    expect(
      applyTicTacToeMove(initial, { cellIndex: 9, player: "X" }).invalidMove,
    ).toBe("cell-out-of-range");
  });

  it("detects row, column, and diagonal wins", () => {
    expect(playMoves([0, 3, 1, 4, 2]).result).toEqual({
      type: "win",
      winner: "X",
      line: [0, 1, 2],
    });
    expect(playMoves([0, 1, 3, 2, 6]).result).toEqual({
      type: "win",
      winner: "X",
      line: [0, 3, 6],
    });
    expect(playMoves([0, 1, 4, 2, 8]).result).toEqual({
      type: "win",
      winner: "X",
      line: [0, 4, 8],
    });
  });

  it("detects a draw", () => {
    const state = playMoves([0, 1, 2, 4, 3, 5, 7, 6, 8]);

    expect(state.result).toEqual({ type: "draw" });
  });

  it("rejects moves after a game is finished", () => {
    const won = playMoves([0, 3, 1, 4, 2]);
    const rejected = applyTicTacToeMove(won, {
      cellIndex: 8,
      player: won.currentTurn,
    });

    expect(rejected.invalidMove).toBe("game-finished");
  });

  it("can evaluate a board directly and reset state", () => {
    const board: TicTacToeCell[] = ["O", "O", "O", null, "X", null, "X", null, "X"];

    expect(getTicTacToeResult(board)).toEqual({
      type: "win",
      winner: "O",
      line: [0, 1, 2],
    });
    expect(resetTicTacToeState()).toEqual(createInitialTicTacToeState());
  });
});
