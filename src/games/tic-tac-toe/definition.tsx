import type { GameDefinition } from "../types";
import {
  applyTicTacToeMove,
  createInitialTicTacToeState,
  type TicTacToeMove,
  type TicTacToeState,
} from "./rules";
import { TicTacToeBoard } from "./renderer/TicTacToeBoard";

export type TicTacToeSettings = Record<string, never>;

export const ticTacToeDefinition: GameDefinition<
  TicTacToeState,
  TicTacToeMove,
  TicTacToeSettings
> = {
  id: "tic-tac-toe",
  title: "Tic Tac Toe",
  minPlayers: 2,
  maxPlayers: 2,
  defaultSettings: {},
  playerSlots: [
    { index: 0, label: "X", name: "X player" },
    { index: 1, label: "O", name: "O player" },
  ],
  createInitialState: createInitialTicTacToeState,
  applyMove: applyTicTacToeMove,
  render: (state) => <TicTacToeBoard state={state} />,
};
