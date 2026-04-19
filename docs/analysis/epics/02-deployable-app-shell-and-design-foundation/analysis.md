# Epic Analysis: Epic 2 - Deployable App Shell And Design Foundation

## Metadata

- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Notion epic: https://www.notion.so/34782a74570d816692f5cfc167a16f09
- Analysis date: 2026-04-19
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
- [x] Game Studio `game-studio`, `web-game-foundations`, and `game-ui-frontend` guidance

## Epic Intent

Create the first deployable React + Vite + TypeScript application shell and a small design foundation that future Tic Tac Toe, lobby, chat, and connection flows can reuse. The epic should make the product visible and statically previewable without implementing real game rules, session authority, local transport, or Trystero.

The Notion task title is `Epic 2 - Web app foundation and GitHub Pages`; the repo roadmap title is `Epic 2 - Deployable App Shell And Design Foundation`. Treat them as the same epic because the objective, acceptance criteria, and outputs align.

## Game Or Foundation Need

This epic serves the Tic Tac Toe MVP user flow by creating the screens and UI primitives needed before the local Tic Tac Toe and multiplayer slices:

- Home and display-name entry direction.
- Create and join room mock flows.
- Lobby mock with participant, room code, host Start, and chat placeholders.
- Game mock with board area, turn/status area, player badges, chat placeholder, connection status, mute control, and effect-ready states.
- GitHub Pages deployment baseline so every later implementation epic remains deployable.

## In Scope

- Scaffold or configure a React + Vite + TypeScript app if one does not already exist.
- Add GitHub Pages-compatible build/base-path configuration early.
- Build mock routes/screens for home, create room, join room, lobby, and game using local/mock state only.
- Add design tokens for color, typography, spacing, buttons, inputs, panels, board cells, player badges, focus states, and responsive layout.
- Add basic reusable components required by the mock screens.
- Add an audio manager skeleton that is gated behind user interaction and exposes mute preference wiring.
- Add a visible mute control and store only mute/volume preference in localStorage if persistence is implemented.
- Add lightweight effect hooks/classes for press, highlight, notification, and disabled/invalid-style states using CSS or Web Animations.
- Verify desktop and mobile visual smoke with a local build/preview.

## Out Of Scope

- Real Tic Tac Toe rules, move validation, win/draw detection, or GameDefinition implementation.
- Real lobby/session state machine.
- Transport interface, LocalTestTransport, MemoryTransport, Trystero, or WebRTC behavior.
- Real room creation, room codes backed by networking, or share links that join a live room.
- Real chat transport or chat history synchronization.
- Auth, account system, database/server persistence, public matchmaking, leaderboard, achievements, host migration, or chat moderation.
- Vietnamese Caro board complexity, rule settings, zoom/pan, or Caro-specific UI.
- Phaser/canvas renderer; DOM/CSS is sufficient for this board-game shell.
- Final audio assets or full visual polish pass. Epic 7 owns the later quality pass.

## Dependencies

### Previous Dependencies

- Epic 1 approved the product direction, MVP flow, first two games, out-of-scope list, UX/audio/effects direction, and architecture boundaries.
- `docs/product/mvp-definition.md` is the durable product deliverable to read before implementation.
- Notion Epic 1 is `Done` and has an approval/status comment.

### Outputs Needed By Later Epics

- Epic 3 needs the app shell, game mock surface, design tokens, board-cell styles, audio/effects skeleton, and deployable build before local Tic Tac Toe is implemented.
- Epic 4 needs lobby, chat, participant, and connection-state mock surfaces to replace with deterministic local session/transport behavior.
- Epic 5 needs GitHub Pages/base-path and connection-state surfaces to add Trystero behind the transport adapter.
- Epic 6 needs create/join/lobby/game route surfaces to wire online Tic Tac Toe.
- Epic 7 needs tokens, components, audio manager, mute control, and effects hooks/classes to polish without rewriting the shell.
- Epic 8 needs the renderer choice to remain per-game and DOM/CSS-first for board games.

## Durable Deliverables

- None. This epic primarily produces code, test/build config, and deployable UI foundation. If implementation discovers a lasting convention that is not already in `docs/steering/architecture.md` or `docs/steering/verification.md`, update the appropriate steering doc.

## Proposed Task Breakdown

Each task should keep the app buildable and previewable after completion.

1. Scaffold and build baseline
   - Create or normalize React + Vite + TypeScript package structure.
   - Add scripts for local dev, build, preview, lint/test if selected by the implementer.
   - Configure GitHub Pages-compatible base path and static output assumptions.
   - Verification: install succeeds, app runs locally, build succeeds, preview loads.

2. App shell and routing
   - Add the app entry, route definitions, and shell layout for home, create room, join room, lobby mock, and game mock.
   - Use local/mock navigation state only.
   - Keep screen labels and flows aligned with the MVP user flow.
   - Verification: each route/screen is reachable in local preview on desktop and mobile viewport.

3. Design tokens and base styles
   - Define CSS variables or equivalent tokens for palette, typography, spacing, radii, shadows, focus rings, button/input states, panel surfaces, board cells, player badges, notifications, and connection states.
   - Use a friendly, clean, bright, tactile, mobile-first look that is playful but not childish.
   - Avoid a one-note palette and avoid text/control overlap.
   - Verification: tokens are consumed by the mock screens and responsive layout holds at common mobile and desktop widths.

4. Reusable UI components for the MVP shell
   - Add basic components for buttons, text inputs, panels/sections, room-code display/copy affordance, player badges, status banners, chat shell, board placeholder/cells, and mute control.
   - Keep components generic only where Epic 2 screens need them now.
   - Verification: components render in mock screens with keyboard focus states and touch-friendly sizing.

5. Mock lobby and game surfaces
   - Build lobby mock with host/player/spectator representation, rename affordance placeholder, host Start placeholder, room code area, chat placeholder, and connection status.
   - Build game mock with board placeholder, player badges, current-turn/result placeholder, chat placeholder, room/connection status, rematch placeholder, and host-disconnected banner state.
   - Verification: mobile layout keeps board/game area prominent and chat/status readable without dominating the view.

6. Audio manager skeleton and mute control
   - Add a minimal audio manager module/hook with user-interaction gating, event names for future cues, muted state, and optional localStorage preference for mute/volume.
   - Do not add final sound assets.
   - Verification: mute control toggles state without autoplay errors; reduced/no-audio environments do not break the app.

7. Effects skeleton
   - Add CSS classes, hooks, or small utilities for press, highlight, notification, disabled/invalid, last-move, win-highlight, draw, and disconnected banner states as placeholders.
   - Respect reduced-motion for non-essential animation.
   - Verification: mock screens can demonstrate at least press/highlight/notification states without layout shift.

8. Verification and documentation handoff
   - Run build and static preview checks.
   - Run visual smoke on desktop and mobile viewport.
   - Record verification results and follow-ups in Notion after implementation.

## Verification Plan

### Unit

- Unit tests are optional for this shell epic unless utility logic is introduced.
- If audio preference/localStorage helpers are non-trivial, add focused tests for default state, persistence parse failure, and mute toggle.

### Component/Integration

- Smoke-render main routes/screens if the project adds a component test setup in this epic.
- Verify mute control state and core component states if test setup cost is reasonable.
- Do not add broad test infrastructure beyond what this shell needs.

### E2E

- Full multiplayer E2E is out of scope.
- A lightweight browser smoke is acceptable if tooling is added: load home, navigate to create/join/lobby/game mocks, confirm no runtime errors.

### Manual Smoke

- Desktop viewport: load home, create room mock, join room mock, lobby mock, game mock.
- Mobile viewport: confirm no overlapping text/controls, comfortable touch targets, readable room code, readable player/status/chat areas, board/game area remains primary.
- Audio: click/tap first, toggle mute, confirm no autoplay error or console error.
- Motion: confirm press/highlight/notification styles are visible and reduced-motion is respected where implemented.

### Deployability

- `npm run build` or equivalent succeeds.
- Static preview loads with the configured base path.
- GitHub Pages configuration is present, but a live deploy is not required unless repository workflow already supports it.

## Look, Feel, Audio, Effects

- Visual direction: friendly casual web game; clean, bright, tactile, mobile-first, playful but not childish.
- UI hierarchy: game/play area and primary action are most prominent; room code, player names, turn/status, chat, connection state, and mute remain visible or easily reachable.
- DOM/CSS should own text-heavy UI and board-game shell surfaces.
- Use CSS variables for theme tokens.
- Keep persistent UI dense enough for board games but not dashboard-like.
- Audio skeleton should expose future cue events for join/leave, chat, start game, move, invalid move, your turn, win/draw, and host disconnected, but does not need final assets.
- Effects should be lightweight CSS/Web Animation placeholders for press, placement/highlight, notifications, and disconnected state.

## Risks And Mitigations

- Risk: Generic platform foundation grows beyond Tic Tac Toe needs.
  - Mitigation: only build components used by home/create/join/lobby/game mock screens.
- Risk: GitHub Pages base path is deferred and later breaks deployability.
  - Mitigation: configure base path and preview static output in the first task.
- Risk: Mock screens imply real networking or chat behavior.
  - Mitigation: label implementation scope internally as mock/local state and do not add transport/session modules.
- Risk: Audio skeleton triggers autoplay restrictions.
  - Mitigation: gate audio initialization/playback behind user interaction and make mute safe by default.
- Risk: Mobile layout becomes secondary.
  - Mitigation: use mobile-first CSS, fixed board aspect ratio, stable controls, and manual mobile visual smoke.

## Drift Check

- Auth/account added? No. Display-name entry/mock identity only.
- Database/server persistence added? No. Only localStorage mute/volume preference is allowed if implemented.
- Generic foundation not required by Tic Tac Toe or Vietnamese Caro? Avoided by limiting components to Epic 2 mock screens and future MVP surfaces.
- Game rules coupled to UI/session/transport? No game rules are implemented in this epic.
- Trystero leaks outside transport adapter? No Trystero or transport code is in scope.
- CI depends on real Trystero/WebRTC? No.
- Phaser/canvas introduced when DOM/CSS is enough? No. DOM/CSS is the renderer path for this shell.
- Chat omitted where required? No. Chat appears as a mock shell in lobby/game, with real behavior deferred.
- Mobile considerations included? Yes. Mobile-first layout and visual smoke are required.
- Look/feel/audio/effects included where relevant? Yes. Tokens, audio skeleton, mute control, and effect states are in scope.
- GitHub Pages deployability preserved? Yes. Build/base-path/static preview are core acceptance criteria.
- Durable decisions stored in repo docs? Existing steering docs cover current decisions; update steering only if implementation creates a new lasting convention.

## Notion Updates Needed

- Before implementation starts, note that Epic 2 analysis is approved and link:
  - `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/analysis.md`
  - `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/review-1.md`
  - `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/implementation-handoff.md`
- After implementation, update Epic 2 with verification results: build, static preview, desktop/mobile visual smoke, audio mute smoke, and any follow-up tasks.

## Repo Docs Updates Needed

- No durable product or architecture doc update is required before implementation.
- If implementation chooses a specific test stack, route strategy, deploy workflow, or component convention that future epics must follow, update the relevant steering doc rather than leaving it only in code or chat.

## Open Questions

- Which test tooling should be introduced in Epic 2, if any? Keep it minimal unless the scaffold already provides a clear path.

## Implementation Assumptions

- GitHub Pages scope for Epic 2 is GitHub Pages-compatible build/base-path configuration plus static preview verification. Add a workflow or live deployment only if the repository already has a simple established deployment path or the user explicitly asks for live deployment during implementation.

## Implementation Handoff Draft

Start by reading `AGENTS.md`, `docs/product/mvp-definition.md`, the steering docs, and this analysis. Then scaffold or normalize the React + Vite + TypeScript app with GitHub Pages base-path support. Build the mock route flow and design foundation before adding audio/effects skeletons, so the skeletons are attached to visible UI states instead of abstract modules.

Keep all behavior local/mock. Do not implement Tic Tac Toe rules, session logic, transport, Trystero, real chat sync, or Caro-specific board behavior. Verify with build, static preview, desktop/mobile visual smoke, and mute/effects smoke. Record results in Notion after implementation.
