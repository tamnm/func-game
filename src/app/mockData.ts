import type { ChatMessage, Participant, ScreenId } from "./types";

export const screens: Array<{ id: ScreenId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "create", label: "Create" },
  { id: "join", label: "Join" },
  { id: "lobby", label: "Lobby" },
  { id: "game", label: "Game" },
];

export const mockParticipants: Participant[] = [
  {
    id: "host",
    name: "Tam",
    role: "host",
    slotLabel: "X",
    connected: true,
  },
  {
    id: "guest",
    name: "Mina",
    role: "player",
    slotLabel: "O",
    connected: true,
  },
  {
    id: "spectator",
    name: "An",
    role: "spectator",
    connected: true,
  },
];

export const mockChat: ChatMessage[] = [
  {
    id: "m1",
    author: "Tam",
    body: "Room is ready.",
    tone: "system",
  },
  {
    id: "m2",
    author: "Mina",
    body: "Joining from mobile.",
  },
  {
    id: "m3",
    author: "System",
    body: "Chat stays visible while the table gets ready.",
    tone: "system",
  },
];

export const mockBoard = ["X", "", "O", "", "X", "", "", "O", ""] as const;
