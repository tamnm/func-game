import type { ReactNode } from "react";

export type GamePlayerSlot = {
  index: number;
  label: string;
  name: string;
};

export type GameDefinition<TState, TMove, TSettings = Record<string, never>> = {
  id: string;
  title: string;
  minPlayers: number;
  maxPlayers: number;
  defaultSettings: TSettings;
  playerSlots: GamePlayerSlot[];
  createInitialState: () => TState;
  applyMove: (state: TState, move: TMove) => TState;
  render: (state: TState) => ReactNode;
};
