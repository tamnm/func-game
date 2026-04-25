import type { TicTacToeMark, TicTacToeState } from "../rules";

type TicTacToeBoardProps = {
  state: TicTacToeState;
  onCellSelect?: (cellIndex: number) => void;
};

export function TicTacToeBoard({ state, onCellSelect }: TicTacToeBoardProps) {
  const winningCells =
    state.result.type === "win" ? new Set(state.result.line) : new Set<number>();

  return (
    <div
      aria-label="Local Tic Tac Toe board"
      className={
        state.result.type === "draw"
          ? "tic-tac-toe-board fx-draw"
          : "tic-tac-toe-board"
      }
      role="grid"
    >
      {state.board.map((cell, index) => {
        const isLastMove = state.lastMoveIndex === index;
        const isWinningCell = winningCells.has(index);
        const isInvalidCell = state.invalidMoveIndex === index;
        const disabled = state.result.type !== "playing" || !onCellSelect;

        return (
          <button
            aria-label={getCellLabel(index, cell)}
            className={[
              "board-cell",
              cell ? "board-cell-filled" : "",
              isLastMove ? "fx-last-move" : "",
              isWinningCell ? "fx-win" : "",
              isInvalidCell ? "fx-invalid" : "",
              "fx-pressable",
            ].join(" ")}
            disabled={disabled}
            key={index}
            onClick={() => onCellSelect?.(index)}
            role="gridcell"
            type="button"
          >
            {cell}
          </button>
        );
      })}
    </div>
  );
}

function getCellLabel(index: number, cell: TicTacToeMark | null) {
  return `Cell ${index + 1}${cell ? `, ${cell}` : ", empty"}`;
}
