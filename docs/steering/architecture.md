# Architecture Steering

## Core Decisions

- Stack: React + Vite + TypeScript.
- Multiplayer production transport: Trystero P2P.
- Network topology: host-authoritative.
- Auth: none.
- Persistence: none, except localStorage for client identity/preferences.
- Room lifecycle: host leaves = room ends.
- Room capacity: game-defined, max 8 participants initially.
- Chat: included in MVP.
- Renderer: per-game.

## Architecture Principles

1. Game rules are pure TypeScript and independent of UI, transport, and session plumbing.
2. Session logic is host-authoritative and shared across games.
3. Transport is an adapter. Game/session code must not import Trystero directly.
4. Renderer is per-game. Board games start with DOM/CSS. Phaser/canvas is introduced only when a game needs animation, physics, sprites, camera, or a game loop.
5. Foundation is built only when a concrete game slice needs it.

## Suggested Module Boundaries

```text
src/
  app/
    routes/
    shell/
  design/
    tokens/
    components/
  effects/
    audio/
    events/
  games/
    registry.ts
    types.ts
    tic-tac-toe/
      definition.ts
      rules.ts
      renderer/
    vietnamese-caro/
      definition.ts
      rules.ts
      renderer/
  session/
    room-state.ts
    host-session.ts
    client-session.ts
    messages.ts
  transport/
    types.ts
    local-test-transport.ts
    memory-transport.ts
    trystero-transport.ts
```

This structure is guidance, not a mandate. Prefer repo-local patterns once code exists.

## Room And Participant Model

Use a general participant model so future games are not hardcoded to X/O:

```ts
type ParticipantRole = "host" | "player" | "spectator";

type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  slotIndex?: number;
  connected: boolean;
};
```

Tic Tac Toe can map:

- slot 0 = X
- slot 1 = O

Vietnamese Caro can map:

- slot 0 = black/first
- slot 1 = white/second

## Message Scopes

Network messages should be scoped so lobby, game, chat, and system behavior can evolve separately:

```ts
type MessageScope = "lobby" | "game" | "chat" | "system";
```

Examples:

- lobby: join, leave, rename, start, participant update.
- game: move, state update, rematch.
- chat: send message, chat history in memory.
- system: connection status, host disconnected, errors.

## Host Authority

Clients send intents. Host validates intent at the casual-game level and broadcasts canonical state.

Examples:

- Client sends `makeMove`.
- Host checks phase, player slot, turn, occupied cell.
- Host applies game rules.
- Host broadcasts new room/game state.

This is not serious anti-cheat. It is a simple consistency model.

## Storage

No server-side persistence in MVP.

Allowed localStorage values:

- client id.
- display name.
- audio mute/volume preference.
- last room code only if useful for best-effort reconnect.

Room, game, and chat state live in host browser memory.
