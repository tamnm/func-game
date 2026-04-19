# Project Brief

## Goal

Build a small casual 2D web game platform for friends to play together in browser. The experience should be easy to share, easy to join, and pleasant on desktop and mobile.

Frontend deploys to GitHub Pages. Multiplayer starts with P2P via Trystero. The project intentionally avoids account systems, database persistence, public matchmaking, leaderboards, achievements, and serious anti-cheat in the MVP.

## Product Sequence

1. Tic Tac Toe online.
2. Vietnamese Caro.
3. Additional casual turn-based or party games after the first two games prove the platform foundation.

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

## MVP Foundation Required By Tic Tac Toe

- React + Vite + TypeScript app shell deployable to GitHub Pages.
- Home, create room, join room, lobby, game screen, chat, connection status.
- Room code sharing.
- Host/player/spectator data model.
- Host-authoritative session: clients send intents; host broadcasts state.
- Transport abstraction with LocalTestTransport for automated E2E and TrysteroTransport for production P2P.
- GameDefinition abstraction so Tic Tac Toe and Vietnamese Caro can plug into the same lobby/session.
- Basic look and feel, audio cues, and small effects for casual game feel.

## Later Foundation Required By Vietnamese Caro

- Larger responsive board UX.
- Game settings for board size and rules.
- Vietnamese Caro win detection edge cases.
- Potential board zoom/pan or compact mobile interactions.

## Visual And Audio Direction

Friendly casual web game. Clean, bright, tactile, mobile-first, playful but not childish. Game area should be the focus, with clear room code, player names, turn state, chat, and connection status.

Audio/effects should be lightweight:

- Audio cues: join/leave, chat message, start game, place move, invalid move, your turn, win/draw, host disconnected.
- Audio must be gated behind user interaction and have a mute control.
- Effects should start with CSS/Web Animations: cell press, mark placement, last move highlight, win highlight, subtle celebration.

## Out Of Scope For MVP

- Account/login.
- Database/server persistence.
- Serious anti-cheat.
- Public matchmaking/lobby list.
- Leaderboard/achievement.
- Full spectator UI.
- Host migration.
- Chat moderation.
