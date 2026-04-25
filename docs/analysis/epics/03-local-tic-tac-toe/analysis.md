# Epic Analysis: Epic 3 - Local Tic Tac Toe

## Metadata

- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Notion epic: https://www.notion.so/34782a74570d819b8a24cbb46bf520c2
- Analysis date: 2026-04-25
- Analyst: Codex
- Latest review verdict: Approved

## Loaded Context

- [x] `AGENTS.md`
- [x] `docs/steering/project-brief.md`
- [x] `docs/steering/architecture.md`
- [x] `docs/steering/roadmap.md`
- [x] `docs/steering/verification.md`
- [x] `docs/steering/notion-workflow.md`
- [x] `docs/steering/analysis-artifacts.md`
- [x] Active Notion epic/task
- [x] Prior analysis/reviews, if any

## Epic Intent

Ship a local playable Tic Tac Toe vertical slice that proves the first game rules, `GameDefinition` boundary, responsive DOM board, and basic game-feel feedback without introducing lobby/session transport.

## Game Or Foundation Need

This work directly serves the first game, Tic Tac Toe online. The local slice gives later lobby/session and Trystero epics a pure rules module and game definition to host-authoritatively drive.

## In Scope

- Pure TypeScript Tic Tac Toe rules for initial state, valid moves, turn switching, win detection, draw detection, invalid move reasons, and reset.
- A minimal shared game definition type needed by Tic Tac Toe and later Caro integration.
- Tic Tac Toe `GameDefinition` with min/max players, settings shape, initial state, move application, status/result detection, and player slot metadata.
- React DOM board renderer wired into the existing game screen for two local players in one browser.
- Visible current turn, last move, invalid move feedback, win highlight, draw state, and reset/rematch.
- Existing audio/effects foundation used for move, invalid move, and result cues.
- Unit tests for Tic Tac Toe rule edge cases.

## Out Of Scope

- Lobby/session/chat implementation beyond the existing mock shell.
- Transport interfaces, MemoryTransport, LocalTestTransport, or Trystero.
- Host-authoritative networking wiring.
- Online room lifecycle, host disconnected handling, reconnect, or connection failure logic.
- Vietnamese Caro rules, settings, or board interactions.
- New auth, persistence, public matchmaking, leaderboards, achievements, or moderation.
- Phaser/canvas renderer.

## Dependencies

### Previous Dependencies

- Epic 1 decisions in `docs/product/mvp-definition.md` and steering docs: Tic Tac Toe first, Caro second, DOM/CSS for board games, audio gated behind user interaction.
- Epic 2 app shell, mock game screen, design components, audio manager skeleton, mute control, and effect classes.

### Outputs Needed By Later Epics

- Epic 4 needs game rules and definition boundaries that can be called from a deterministic local host/session flow.
- Epic 6 needs a Tic Tac Toe definition that can be reused by online room state rather than rewritten.
- Epic 7 needs board state classes and events to polish audio/effects without changing rules.
- Epic 8 needs a precedent for adding a second game through a game-definition boundary.

## Durable Deliverables

None. This epic produces code/tests plus this analysis and handoff trail; no durable product or architecture decision changes are required.

## Proposed Task Breakdown

1. Add shared game definition types under `src/games/` with only the fields needed by Tic Tac Toe now.
2. Implement `src/games/tic-tac-toe/rules.ts` as a pure module with tested helpers for initial state, moves, wins, draws, and reset.
3. Implement `src/games/tic-tac-toe/definition.tsx` to expose Tic Tac Toe metadata, renderer, and pure rules.
4. Replace the mock board preview on the game screen with a local playable Tic Tac Toe component while keeping existing shell navigation and chat mocks intact.
5. Extend CSS for interactive board states, result messaging, invalid feedback, mobile layout, and reduced-motion compatibility.
6. Add unit tests for rules and edge cases, plus keep the static build/typecheck passing.

## Verification Plan

### Unit

- Test initial state, alternating turns, occupied-cell invalid moves, out-of-turn/finished-game invalid moves, row/column/diagonal wins, draw, and reset.

### Component/Integration

- Typecheck the React board renderer and game screen integration.
- Confirm local board interactions update current turn, last move, result, and invalid move status.

### E2E

- No new browser E2E in this epic. Deterministic room/session E2E starts in Epic 4.

### Manual Smoke

- Run the app locally.
- Navigate to Game.
- Play a valid X/O game to win and verify win highlight/result cue.
- Try clicking an occupied cell and verify invalid feedback.
- Reset/rematch and play a draw.
- Check mobile width for no overlapping controls or board text.

### Deployability

- `npm run typecheck`
- `npm run build`

## Look, Feel, Audio, Effects

The board stays DOM/CSS and responsive. Cells should feel tactile, last move should be visually distinct, winning cells should be highlighted, draw should be readable, and invalid moves should produce short feedback without blocking play. Audio should use existing cues only after interaction and respect mute.

## Risks And Mitigations

- Risk: Building too much platform abstraction before session work. Mitigation: keep shared game types minimal and Tic Tac Toe-driven.
- Risk: Coupling rules to React state. Mitigation: keep rules in `src/games/tic-tac-toe/rules.ts` with unit tests.
- Risk: UI polish expanding into Epic 7. Mitigation: implement only required move/invalid/win/draw feedback.
- Risk: Board layout breaks on small screens. Mitigation: use fixed aspect ratio, responsive sizing, and build/manual mobile smoke.

## Drift Check

- Auth/account added? No.
- Database/server persistence added? No.
- Generic foundation not required by Tic Tac Toe or Vietnamese Caro? No; `GameDefinition` is required by Tic Tac Toe and later Caro.
- Game rules coupled to UI/session/transport? No; rules stay pure.
- Trystero leaks outside transport adapter? No Trystero work.
- CI depends on real Trystero/WebRTC? No.
- Phaser/canvas introduced when DOM/CSS is enough? No.
- Chat omitted where required? Chat remains mocked from Epic 2; real chat is Epic 4.
- Mobile considerations included? Yes.
- Look/feel/audio/effects included where relevant? Yes, move/invalid/win/draw only.
- GitHub Pages deployability preserved? Yes, build remains required.
- Durable decisions stored in repo docs? No new durable decisions required.

## Notion Updates Needed

- Mark Epic 3 In Progress when implementation starts.
- After implementation, add a verification summary and mark Done only if acceptance criteria pass.

## Repo Docs Updates Needed

- None expected unless implementation discovers a durable architecture decision that changes existing steering.

## Open Questions

- None blocking. Use standard Tic Tac Toe rules: 3x3 board, X first, two local players, draw when all cells fill without a winner.

## Implementation Handoff Draft

Start by adding pure Tic Tac Toe rules and tests. Then create the minimal game definition, wire a local React board into the existing Game screen, and apply existing audio/effect hooks for move, invalid, and result cues. Verify with rule tests, typecheck, build, and manual desktop/mobile smoke.
