# MVP Definition

## Metadata

- Project: Web Games Platform - Multiplayer 2D
- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Source epic: Epic 1 - Game Scope And UX Direction
- Source Notion task: https://www.notion.so/34782a74570d817796e1e517bdbe4b3f
- Last updated: 2026-04-19

## Decision Record

- First game: Tic Tac Toe online.
- Second game: Vietnamese Caro.
- Platform goal: a small casual 2D web game platform for friends to play together in browser.
- Stack: React + Vite + TypeScript.
- Production multiplayer transport: Trystero P2P.
- Network topology: host-authoritative.
- Room lifecycle: host leaves = room ends.
- Auth: none.
- Persistence: none, except localStorage for client identity/preferences.
- Chat: included in MVP.
- Renderer: per game. Board games start with DOM/CSS. Phaser/canvas is introduced only when a game needs animation, physics, sprites, camera, or a game loop.
- Testing: unit tests and automated E2E use local deterministic transports. Real Trystero is manual smoke first.

## MVP User Flow

1. User opens the app and enters a display name.
2. Host creates a room and gets a short room code/link.
3. Other players join by room code/link.
4. Participants can rename in the lobby before the game starts.
5. Lobby shows host, players, and the spectator concept.
6. Participants can chat in the lobby.
7. Host presses Start.
8. Players complete a Tic Tac Toe game with synchronized state.
9. Players can chat during the game.
10. Game shows win/draw state and supports a basic rematch flow.
11. If host leaves, guests see host disconnected and the room ends.

## UX Direction

- Friendly casual web game.
- Clean, bright, tactile, mobile-first, playful but not childish.
- Game area is the focus.
- Room code must be easy to read, copy, and share.
- Player names, turn state, chat, and connection status must remain clear on desktop and mobile.
- Touch targets should be comfortable on mobile.
- Text and controls should not overlap at common desktop or mobile widths.

## Audio Direction

Plan for lightweight audio cues:

- Join/leave.
- Chat message.
- Start game.
- Place move.
- Invalid move.
- Your turn.
- Win/draw.
- Host disconnected.

Audio constraints:

- Audio must be gated behind user interaction.
- The app must include a mute control.
- Mute/volume preference may be stored in localStorage.

## Effects Direction

Use CSS/Web Animations first for board-game feedback:

- Cell press.
- Mark placement.
- Last move highlight.
- Win highlight.
- Draw state.
- Chat notification.
- Disconnected banner.
- Subtle celebration.

Do not introduce Phaser/canvas for Tic Tac Toe unless a later explicit decision changes the renderer requirement.

## MVP Foundation Required By Tic Tac Toe

- React + Vite + TypeScript app shell deployable to GitHub Pages.
- Home, create room, join room, lobby, game screen, chat, connection status.
- Room code sharing.
- Host/player/spectator participant model.
- Host-authoritative session: clients send intents; host broadcasts canonical state.
- Transport abstraction with LocalTestTransport or MemoryTransport for automated tests and TrysteroTransport for production P2P.
- GameDefinition abstraction so Tic Tac Toe and Vietnamese Caro can plug into the same lobby/session.
- Basic look and feel, audio cues, and small effects for casual game feel.

## Later Foundation Required By Vietnamese Caro

- Larger responsive board UX.
- Game settings for board size and rules.
- Vietnamese Caro win detection edge cases.
- Potential board zoom/pan or compact mobile interactions.

Do not implement Caro-specific board complexity before the Vietnamese Caro epic.

## Out Of Scope For MVP

- Account/login.
- Database/server persistence.
- Serious anti-cheat.
- Public matchmaking/lobby list.
- Leaderboard/achievement.
- Full spectator UI.
- Host migration.
- Chat moderation.
- Tournament/ranking/history/replay.

## Downstream Implications

- Epic 2 should build only the deployable shell, mock screens, design tokens/basic components, audio skeleton, mute control, and basic effect hooks needed by this MVP.
- Epic 3 should keep Tic Tac Toe rules pure and independent from UI/session/transport.
- Epic 4 should use deterministic local transport for automated lobby/session/chat flow.
- Epic 5 should keep Trystero behind a transport adapter and rely on manual smoke for real P2P.
- Epic 6 should wire online Tic Tac Toe without adding auth, persistence, public matchmaking, or host migration.
- Epic 7 should raise the visual/audio/effects quality bar without changing MVP scope.
- Epic 8 should add Vietnamese Caro by reusing the foundation and extending only what Caro needs.

## Analysis Trail

- Analysis: `docs/analysis/epics/01-game-scope-and-ux-direction/analysis.md`
- Latest review: `docs/analysis/epics/01-game-scope-and-ux-direction/review-2.md`
- Handoff: `docs/analysis/epics/01-game-scope-and-ux-direction/implementation-handoff.md`
