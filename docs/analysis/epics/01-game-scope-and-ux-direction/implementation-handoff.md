# Implementation Handoff: Epic 1 - Game Scope And UX Direction

## Active Context

- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Notion epic/task: https://www.notion.so/34782a74570d817796e1e517bdbe4b3f
- Repo analysis: `docs/analysis/epics/01-game-scope-and-ux-direction/analysis.md`
- Latest review: `docs/analysis/epics/01-game-scope-and-ux-direction/review-2.md`
- Durable deliverable: `docs/product/mvp-definition.md`
- Review verdict: Approved

The Notion task title is `Epic 1 - Product scope and game rules`; the repo roadmap title is `Epic 1 - Game Scope And UX Direction`. Treat them as the same epic because the objective and acceptance criteria match.

## Final Task List

1. Preserve the approved decision baseline:
   - Game 1 is online Tic Tac Toe.
   - Game 2 is Vietnamese Caro.
   - Foundation is derived from those two games, not designed as a generic platform upfront.

2. Preserve the MVP user flow:
   - App opens and user enters display name.
   - Host creates room and shares short room code/link.
   - Player joins by code/link.
   - Participants can rename in lobby before start.
   - Lobby shows host, players, and spectator concept.
   - Lobby and game include chat.
   - Host starts game.
   - Players complete Tic Tac Toe with synchronized state.
   - Game shows win/draw and supports basic rematch.
   - Host leaving ends the room and guests see host disconnected.

3. Preserve UX/audio/effects direction:
   - Friendly casual, clean, bright, tactile, mobile-first, playful but not childish.
   - Game area is the focus.
   - Room code, player names, turn state, chat, and connection status stay readable.
   - Audio cues: join/leave, chat, start game, place move, invalid move, your turn, win/draw, host disconnected.
   - Audio is gated behind user interaction and has mute control.
   - Effects start with CSS/Web Animations.

4. Preserve architecture boundaries:
   - React + Vite + TypeScript.
   - Trystero P2P only behind a production transport adapter.
   - Host-authoritative session.
   - Host leaves = room ends.
   - No auth.
   - No database/server persistence.
   - localStorage only for client identity/preferences.
   - Chat included in MVP.
   - Game rules are pure TypeScript, independent of UI/session/transport.
   - Renderer is per-game; DOM/CSS for board games first.
   - Automated tests use deterministic local transports, not real Trystero.

5. Update Notion with artifact links and verification notes.

## Durable Deliverables To Read

- `docs/product/mvp-definition.md`: official product deliverable for Epic 1.
- `docs/analysis/epics/01-game-scope-and-ux-direction/references.md`: reference index for the analysis trail and source links.

## Implementation Order

Epic 1 itself should not create application code. After Notion is updated, the next implementation session should start Epic 2:

1. Read `AGENTS.md` and steering docs.
2. Fetch the active Notion Epic 2 task.
3. Read this Epic 1 handoff.
4. Create the Epic 2 analysis artifact and review before code, following the analysis gate.

## Files Expected To Be Touched

For Epic 1 completion:

- `docs/analysis/epics/01-game-scope-and-ux-direction/analysis.md`
- `docs/analysis/epics/01-game-scope-and-ux-direction/review-1.md`
- `docs/analysis/epics/01-game-scope-and-ux-direction/review-2.md`
- `docs/analysis/epics/01-game-scope-and-ux-direction/implementation-handoff.md`
- `docs/analysis/epics/01-game-scope-and-ux-direction/references.md`
- `docs/product/mvp-definition.md`
- Notion Epic 1 task comment/status note.

No `src/`, package, build, or deployment files should be touched for Epic 1.

## Verification Checks

- Confirm the analysis covers Notion acceptance criteria:
  - Decision record identifies Tic Tac Toe MVP and Vietnamese Caro.
  - User flow covers create, join, rename, chat, host start, play, rematch, host disconnected.
  - UX direction covers look/feel, mobile-first layout, audio cues, and lightweight effects.
  - Architecture decisions are captured.
  - Out-of-scope list is explicit.
- Confirm `review-2.md` verdict is `Approved`.
- Confirm `docs/product/mvp-definition.md` exists and contains the durable Epic 1 deliverable.
- Confirm Notion has a pointer to the repo artifacts.

No unit, component, E2E, build, or deploy command is required for Epic 1.

## Known Risks

- Epic 1 naming differs between Notion and roadmap. The mapping is documented and not blocking.
- Human acceptance may be needed before marking the Notion task `Done`.
- Later epics can still drift if they skip this handoff, especially around generic platform abstractions, real Trystero in CI, or premature Caro-specific board complexity.

## Non-Goals

- Do not scaffold the app.
- Do not implement Tic Tac Toe.
- Do not implement lobby/session/chat.
- Do not add Trystero.
- Do not add deployment config.
- Do not design a full spectator UI.
- Do not add auth, persistence, matchmaking, leaderboard, host migration, chat moderation, or serious anti-cheat.
