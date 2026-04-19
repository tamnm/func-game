# Epic Analysis: Epic 1 - Game Scope And UX Direction

## Metadata

- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Notion epic: https://www.notion.so/34782a74570d817796e1e517bdbe4b3f
- Durable deliverable: `docs/product/mvp-definition.md`
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

Prior analysis/reviews: none existed before this artifact.

Notion title note: the active Notion task is titled `Epic 1 - Product scope and game rules`, while the repo roadmap names Epic 1 `Game Scope And UX Direction`. The Notion objective and acceptance criteria match the roadmap output, so this analysis treats them as the same epic and preserves the roadmap slug for artifact paths.

## Epic Intent

Epic 1 turns the project from a broad "multiplayer 2D web games platform" idea into a constrained first release direction. It should make the first two games, MVP user flow, architecture decisions, UX/audio/effects direction, and out-of-scope boundaries explicit before any code or platform abstraction work begins.

The main outcome is not implementation. The outcome is a durable decision and planning baseline that prevents later epics from overbuilding auth, persistence, matchmaking, generic engine work, or transport complexity before Tic Tac Toe and Vietnamese Caro require it.

## Game Or Foundation Need

This epic serves the Tic Tac Toe online MVP first. It defines only the foundation required for:

- A host creating a room and sharing a room code/link.
- A second player joining, renaming, chatting, and starting from a lobby.
- Host-authoritative Tic Tac Toe state.
- A game-over and rematch loop.
- Host disconnected behavior.

It also records the second-game direction, Vietnamese Caro, so early foundations leave room for a larger board and rule variants later without building Caro-specific behavior now.

## In Scope

- Confirm first game: online Tic Tac Toe.
- Confirm second game: Vietnamese Caro.
- Define MVP user flow from app open through room end.
- Record UX direction: friendly casual, clean, bright, tactile, mobile-first, playful but not childish.
- Record minimum visual hierarchy requirements: game area focus, readable room code, player names, turn state, chat, connection status.
- Record lightweight audio/effects direction and constraints.
- Record key architecture decisions already accepted in steering docs and Notion:
  - React + Vite + TypeScript.
  - Trystero P2P for production transport.
  - Host-authoritative topology.
  - Host leaves = room ends.
  - No auth.
  - No database/server persistence.
  - localStorage only for identity/preferences.
  - Chat included in MVP.
  - Renderer per game, DOM/CSS for board games first.
  - Deterministic local transports for automated tests.
- Define the explicit MVP out-of-scope list.
- Prepare a downstream backlog shape for Epic 2 and later epics.
- Update Notion with analysis and handoff links/status notes after review approval.

## Out Of Scope

- Creating or modifying application code.
- Creating the React/Vite/TypeScript app shell.
- Implementing routes, mock screens, components, audio manager, effects hooks, or build/deploy config.
- Implementing Tic Tac Toe rules or renderer.
- Implementing lobby/session/chat/transport.
- Adding Trystero, WebRTC behavior, TURN, fallback servers, or reconnect logic.
- Adding Vietnamese Caro rules, settings, renderer, zoom/pan, or blocked-line logic.
- Adding account/login, database/server persistence, public matchmaking, leaderboard, achievements, serious anti-cheat, chat moderation, host migration, replay/history, or tournament features.
- Designing a full spectator UI. Spectator remains a data-model concept for later flow support.

## Dependencies

### Previous Dependencies

- No prior roadmap epic dependency.
- Required source-of-truth context:
  - Notion project and Epic 1 task.
  - Repo steering docs listed in `AGENTS.md`.

### Outputs Needed By Later Epics

- Epic 2 needs the decision baseline for app shell scope, mock screen list, visual foundation, audio skeleton, mute control, and basic effects.
- Epic 3 needs Tic Tac Toe MVP behavior and the rule/UI separation expectation.
- Epic 4 needs the lobby, chat, participant model, host-authoritative session, and deterministic local transport requirements.
- Epic 5 needs the transport boundary and manual Trystero smoke expectation.
- Epic 6 needs the complete online Tic Tac Toe flow and host-disconnected/rematch expectations.
- Epic 7 needs the visual/audio/effects direction and mobile quality bar.
- Epic 8 needs the Vietnamese Caro second-game direction without requiring Caro implementation early.
- Epic 9 needs the release boundaries and repeatable verification expectations.

## Durable Deliverables

- `docs/product/mvp-definition.md`: official Epic 1 product deliverable containing the decision record, MVP user flow, UX/audio/effects direction, MVP foundation boundaries, later Caro implications, out-of-scope list, and downstream implications.
- `docs/analysis/epics/01-game-scope-and-ux-direction/references.md`: index linking the durable deliverable, analysis trail, Notion pages, and steering sources.

## Proposed Task Breakdown

Each task is planning/documentation work only. No code changes are required.

1. Reconcile Epic 1 naming and source-of-truth links.
   - Confirm Notion `Epic 1 - Product scope and game rules` maps to roadmap `Epic 1 - Game Scope And UX Direction`.
   - Record both links/titles in the analysis artifact.
   - Verification: analysis metadata contains both Notion and repo roadmap context.

2. Finalize product scope decision record.
   - Confirm Tic Tac Toe online as game 1.
   - Confirm Vietnamese Caro as game 2.
   - Confirm MVP exclusions.
   - Verification: Notion project/epic and repo analysis agree on games and exclusions.

3. Finalize MVP flow.
   - Capture app open, display name, create room, share/join, rename, lobby chat, host start, play, game chat, win/draw, rematch, and host disconnected.
   - Verification: flow covers all Notion acceptance criteria and project brief MVP flow.

4. Finalize UX, audio, and effects direction.
   - Capture visual tone, mobile-first expectations, room/game/chat/connection readability, audio cues, user-interaction audio gating, mute control, and CSS/Web Animations first.
   - Verification: direction is explicit enough for Epic 2 mock screens and design foundation.

5. Finalize architecture boundary record for later implementation.
   - Confirm stack, Trystero adapter boundary, host authority, no auth, no persistence, localStorage limits, per-game renderer, deterministic testing transports, and no real Trystero in CI.
   - Verification: analysis drift checklist has explicit yes/no answers for each boundary.

6. Convert the approved analysis into an implementation handoff.
   - Write `implementation-handoff.md` for the next session.
   - Include links, final task list, durable deliverables, expected files/modules, verification checks, risks, and non-goals.
   - Verification: handoff is usable by a fresh session without relying on chat.

7. Update Notion after review approval.
   - Add a concise comment or page update with the approved artifact paths, durable deliverable path, final task list summary, and verification note.
   - Do not move implementation status to done unless the team treats Epic 1 as completed planning work.
   - Verification: Notion has a durable pointer back to repo analysis/handoff.

## Verification Plan

### Unit

- None. Epic 1 is planning and decision analysis only.

### Component/Integration

- None. No UI code should be produced in this epic.

### E2E

- None. No app shell or browser flow exists yet.

### Manual Smoke

- Read-through verification:
  - Notion Epic 1 acceptance criteria are all represented.
  - Repo roadmap Epic 1 outputs are all represented.
  - The MVP user flow is complete from entry through host-disconnected end state.
  - The out-of-scope list is explicit and matches steering docs.

### Deployability

- No build/deploy verification applies because this epic has no code dependency.
- Later implementation epics must preserve deployability once a deployable app exists.

## Look, Feel, Audio, Effects

Epic 1 should define direction, not implement assets or runtime behavior.

- Look and feel: friendly casual web game, clean, bright, tactile, mobile-first, playful but not childish.
- Layout direction: game area is primary; room code, player names, turn state, chat, and connection status remain readable and accessible on desktop and mobile.
- Audio cues to plan for: join/leave, chat message, start game, place move, invalid move, your turn, win/draw, host disconnected.
- Audio constraints: play only after user interaction; include mute control and preference persistence later.
- Effects direction: start with CSS/Web Animations for cell press, mark placement, last move highlight, win highlight, chat notification, disconnected banner, and subtle celebration.
- Engine boundary: DOM/CSS is enough for Tic Tac Toe and likely Vietnamese Caro board rendering; Phaser/canvas waits for a game that needs sprites, physics, a camera, or a game loop.

## Risks And Mitigations

- Risk: Epic 1 becomes a design exercise that delays implementation.
  - Mitigation: keep outputs to decisions, flow, direction, scope boundaries, and handoff. No high-fidelity design system or code.

- Risk: Foundation scope expands into generic platform architecture.
  - Mitigation: every foundation decision must map to Tic Tac Toe MVP or leave room for Vietnamese Caro without implementing Caro early.

- Risk: Notion and repo names differ for Epic 1.
  - Mitigation: record the mismatch in analysis metadata and use the Notion URL as the active epic identity.

- Risk: Audio/effects expectations are forgotten until late polish.
  - Mitigation: record required cues/effect hooks now; implement skeletons in Epic 2 and concrete game events in Epic 3/7.

- Risk: Multiplayer testing drifts toward real WebRTC in CI.
  - Mitigation: preserve the LocalTestTransport/MemoryTransport requirement for automated E2E and manual Trystero smoke only.

## Drift Check

- Auth/account added? No. MVP explicitly excludes account/login.
- Database/server persistence added? No. Persistence remains limited to localStorage identity/preferences later.
- Generic foundation not required by Tic Tac Toe or Vietnamese Caro? No. This epic records constraints and avoids implementation.
- Game rules coupled to UI/session/transport? No. Future rules must be pure TypeScript and independent.
- Trystero leaks outside transport adapter? No. Future Trystero work belongs behind `TrysteroTransport`.
- CI depends on real Trystero/WebRTC? No. Automated tests must use deterministic local transports.
- Phaser/canvas introduced when DOM/CSS is enough? No. DOM/CSS remains the board-game default.
- Chat omitted where required? No. Chat is included in lobby and game MVP flow.
- Mobile considerations included? Yes. Mobile-first layout/readability/touch ergonomics are part of direction.
- Look/feel/audio/effects included where relevant? Yes. Epic 1 defines them; later epics implement them.
- GitHub Pages deployability preserved? Yes. No code changes here; later app shell must be deployable to GitHub Pages.
- Durable decisions stored in repo docs? Yes. Steering docs already hold durable decisions; this analysis stores the Epic 1 handoff under `docs/analysis/epics/`.

## Notion Updates Needed

- Add a Notion update/comment linking:
  - `docs/product/mvp-definition.md`
  - `docs/analysis/epics/01-game-scope-and-ux-direction/analysis.md`
  - `docs/analysis/epics/01-game-scope-and-ux-direction/review-2.md`
  - `docs/analysis/epics/01-game-scope-and-ux-direction/implementation-handoff.md`
- Note that no code verification applies for Epic 1.
- Note the recommended next action: begin Epic 2 analysis/implementation only after accepting this planning baseline.
- Optional: rename Notion task to match roadmap, or leave as-is and rely on the recorded title mapping.

## Repo Docs Updates Needed

- No steering doc change is required by this analysis. Existing repo docs and Notion content are aligned on scope and decisions.
- Optional cleanup: align the Epic 1 title in Notion or roadmap if the team wants exact naming consistency.

## Open Questions

- Should the Notion Epic 1 task title be renamed from `Product scope and game rules` to `Game Scope And UX Direction` for consistency?
- Should Epic 1 be marked `Done` in Notion after this approved analysis, or should it remain `Not Started` until a human accepts the decision record?

## Implementation Handoff Draft

Epic 1 implementation is documentation/planning completion, not application code.

First, preserve the official MVP deliverable at `docs/product/mvp-definition.md` and the approved analysis/review artifacts under `docs/analysis/epics/01-game-scope-and-ux-direction/`. Next, update Notion with links to those artifacts and the concise final scope summary. Then move to Epic 2 only after confirming the planning baseline is accepted.

Do not create the app shell, game rules, transport, lobby, chat, audio runtime, or deployment configuration in Epic 1. Those begin in later epics.
