import { mockBoard } from "../../app/mockData";

export function BoardPreview() {
  return (
    <div className="board-preview" aria-label="Mock Tic Tac Toe board">
      {mockBoard.map((value, index) => {
        const isLastMove = index === 4;
        const isWinCell = index === 0 || index === 4 || index === 8;

        return (
          <button
            aria-label={`Cell ${index + 1}${value ? `, ${value}` : ", empty"}`}
            className={[
              "board-cell",
              value ? "board-cell-filled" : "",
              isLastMove ? "fx-last-move" : "",
              isWinCell ? "fx-win" : "",
              "fx-pressable",
            ].join(" ")}
            key={index}
            type="button"
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
