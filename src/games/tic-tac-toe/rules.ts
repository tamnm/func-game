export type TicTacToeMark = "X" | "O";
export type TicTacToeCell = TicTacToeMark | null;
export type TicTacToeResult =
  | { type: "playing" }
  | { type: "draw" }
  | { type: "win"; winner: TicTacToeMark; line: number[] };

export type TicTacToeState = {
  board: TicTacToeCell[];
  currentTurn: TicTacToeMark;
  result: TicTacToeResult;
  lastMoveIndex: number | null;
  moveCount: number;
  invalidMove: TicTacToeInvalidMove | null;
  invalidMoveIndex: number | null;
};

export type TicTacToeMove = {
  cellIndex: number;
  player: TicTacToeMark;
};

export type TicTacToeInvalidMove =
  | "cell-out-of-range"
  | "cell-occupied"
  | "game-finished"
  | "wrong-turn";

export const ticTacToeBoardSize = 9;

export const ticTacToeWinLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const;

export function createInitialTicTacToeState(): TicTacToeState {
  return {
    board: Array<TicTacToeCell>(ticTacToeBoardSize).fill(null),
    currentTurn: "X",
    result: { type: "playing" },
    lastMoveIndex: null,
    moveCount: 0,
    invalidMove: null,
    invalidMoveIndex: null,
  };
}

export function applyTicTacToeMove(
  state: TicTacToeState,
  move: TicTacToeMove,
): TicTacToeState {
  const invalidMove = getInvalidMoveReason(state, move);

  if (invalidMove) {
    return {
      ...state,
      invalidMove,
      invalidMoveIndex: move.cellIndex,
    };
  }

  const board = [...state.board];
  board[move.cellIndex] = move.player;
  const moveCount = state.moveCount + 1;
  const result = getTicTacToeResult(board, moveCount);

  return {
    board,
    currentTurn:
      result.type === "playing" ? getNextTicTacToeTurn(move.player) : state.currentTurn,
    result,
    lastMoveIndex: move.cellIndex,
    moveCount,
    invalidMove: null,
    invalidMoveIndex: null,
  };
}

export function getTicTacToeResult(
  board: TicTacToeCell[],
  moveCount = board.filter(Boolean).length,
): TicTacToeResult {
  for (const line of ticTacToeWinLines) {
    const [firstIndex, secondIndex, thirdIndex] = line;
    const mark = board[firstIndex];

    if (mark && mark === board[secondIndex] && mark === board[thirdIndex]) {
      return { type: "win", winner: mark, line: [...line] };
    }
  }

  if (moveCount >= ticTacToeBoardSize) {
    return { type: "draw" };
  }

  return { type: "playing" };
}

export function resetTicTacToeState() {
  return createInitialTicTacToeState();
}

export function getNextTicTacToeTurn(mark: TicTacToeMark): TicTacToeMark {
  return mark === "X" ? "O" : "X";
}

function getInvalidMoveReason(
  state: TicTacToeState,
  move: TicTacToeMove,
): TicTacToeInvalidMove | null {
  if (
    !Number.isInteger(move.cellIndex) ||
    move.cellIndex < 0 ||
    move.cellIndex >= ticTacToeBoardSize
  ) {
    return "cell-out-of-range";
  }

  if (state.result.type !== "playing") {
    return "game-finished";
  }

  if (move.player !== state.currentTurn) {
    return "wrong-turn";
  }

  if (state.board[move.cellIndex]) {
    return "cell-occupied";
  }

  return null;
}
