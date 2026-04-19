# Roadmap

The roadmap is organized as incremental, isolated, verifiable, deployable slices.

## Epic 1 - Game Scope And UX Direction

Define the first games, MVP flow, UX direction, and the minimum foundation required by Tic Tac Toe.

Output:

- Decision record.
- User flow.
- Visual/audio direction.
- Out-of-scope list.

No code dependency.

## Epic 2 - Deployable App Shell And Design Foundation

Create a deployable React + Vite + TypeScript shell with visual foundations.

Output:

- React/Vite/TS app.
- GitHub Pages build config.
- Mock home/create/join/lobby/game screens.
- Design tokens and basic components.
- Audio manager skeleton and mute control.
- Effect hooks/classes for press/highlight/notification states.

Verification:

- Build succeeds.
- Static preview/deploy works.
- Basic desktop/mobile visual smoke.

## Epic 3 - Tic Tac Toe Local Vertical Slice

Ship local playable Tic Tac Toe independent from networking.

Output:

- Pure Tic Tac Toe rules.
- Tic Tac Toe GameDefinition.
- Responsive DOM board renderer.
- Basic move/invalid/win/draw effects and audio events.

Verification:

- Local game playable.
- Rules unit tests pass.
- Build remains deployable.

## Epic 4 - Local Lobby, Chat, And Session

Implement reusable lobby/session/chat using deterministic local test transport before real P2P.

Output:

- Transport interface.
- LocalTestTransport or MemoryTransport.
- Host-authoritative session flow.
- Lobby with host/player/spectator model.
- Rename, host Start, chat, rematch, host disconnected state.
- E2E happy path using LocalTestTransport.

Verification:

- Automated E2E passes without Trystero.
- Local app remains playable and deployable.

## Epic 5 - Trystero P2P Transport

Add Trystero as production transport behind the existing interface.

Output:

- TrysteroTransport.
- Peer join/leave and host disconnected handling.
- Connection states and connection failed UI.
- Manual smoke test plan.

Verification:

- Manual two-browser Trystero smoke passes.
- Existing automated E2E still passes with LocalTestTransport.
- Build remains deployable.

## Epic 6 - Online Tic Tac Toe MVP

Wire Tic Tac Toe to the real lobby/session/chat flow and make it playable online through Trystero.

Output:

- Host create room/share code.
- Player join/rename/chat/start/play.
- Host applies Tic Tac Toe rules and broadcasts state.
- Rematch and host disconnected behavior.
- GitHub Pages smoke.

Verification:

- LocalTestTransport E2E happy path passes.
- Manual Trystero smoke completes a full game.
- Static build deploys.

## Epic 7 - Look, Feel, Audio, And Effects Pass

Bring the first online game to a casual game quality bar before adding Vietnamese Caro.

Output:

- Consistent visual direction across home, lobby, chat, game, result, connection states.
- Audio cues for major events.
- Mute control.
- Effects for press, mark placement, last move, win highlight, draw, chat notification, disconnected banner.
- Mobile layout and accessibility basics.

Verification:

- Visual smoke on desktop/mobile.
- Manual playtest confirms actions feel responsive and readable.
- Automated happy path still passes.

## Epic 8 - Vietnamese Caro

Add Vietnamese Caro as the second game, reusing the platform foundation.

Output:

- Vietnamese Caro GameDefinition.
- Rule engine for selected Vietnamese Caro variant.
- Board settings.
- Large responsive board renderer.
- Caro-specific effects.

Verification:

- Local and online Caro playable through existing session flow.
- Rules tests cover win detection and blocked-line cases.
- Build remains deployable.

## Epic 9 - Release Hardening And Next Games Backlog

Stabilize release and define the repeatable path for future games.

Output:

- Stable unit/component/E2E suites.
- Manual Trystero smoke checklist.
- Playtest bug triage.
- New-game checklist.
- Backlog of candidate games.

Verification:

- Release checklist passes.
- Deployed app has Tic Tac Toe and Vietnamese Caro playable.
- Next-game checklist is usable without reading implementation internals.
