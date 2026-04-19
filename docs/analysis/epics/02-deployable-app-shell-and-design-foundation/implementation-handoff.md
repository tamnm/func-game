# Implementation Handoff: Epic 2 - Deployable App Shell And Design Foundation

## Active Context

- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Notion epic/task: https://www.notion.so/34782a74570d816692f5cfc167a16f09
- Repo analysis: `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/analysis.md`
- Latest review: `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/review-3.md`
- Durable deliverable to read: `docs/product/mvp-definition.md`
- Review verdict: Approved

The Notion task title is `Epic 2 - Web app foundation and GitHub Pages`; the repo roadmap title is `Epic 2 - Deployable App Shell And Design Foundation`. Treat them as the same epic.

## Final Task List

1. Scaffold and build baseline
   - Create or normalize a React + Vite + TypeScript app.
   - Add local dev, build, and preview scripts.
   - Configure GitHub Pages-compatible base path and static output assumptions.

2. App shell and routing
   - Add home, create room, join room, lobby mock, and game mock screens.
   - Use local/mock state only.
   - Keep the route flow aligned with the MVP user flow from `docs/product/mvp-definition.md`.

3. Design tokens and base styles
   - Add CSS variables or equivalent tokens for color, typography, spacing, radii, focus, buttons, inputs, panels, board cells, player badges, notifications, and connection states.
   - Keep the visual direction friendly, clean, bright, tactile, mobile-first, and playful but not childish.

4. Reusable UI components
   - Build only the components needed by the Epic 2 mock screens: buttons, inputs, panels/sections, room-code display/copy affordance, player badges, status banners, chat shell, board placeholder/cells, and mute control.

5. Mock lobby and game surfaces
   - Lobby mock should show host/player/spectator representation, rename affordance placeholder, host Start placeholder, room code, chat placeholder, and connection status.
   - Game mock should show board placeholder, player badges, current-turn/result placeholder, chat placeholder, room/connection status, rematch placeholder, and host-disconnected banner state.

6. Audio and effects skeletons
   - Add a minimal audio manager module/hook gated behind user interaction.
   - Add muted state and a visible mute control.
   - Optionally persist only mute/volume preference in localStorage.
   - Add CSS classes, hooks, or utilities for press, highlight, notification, disabled/invalid, last-move, win-highlight, draw, and disconnected banner states.
   - Respect reduced-motion for non-essential animation.

7. Verification and Notion update
   - Run build and static preview.
   - Smoke desktop and mobile viewport layouts.
   - Smoke mute/effect states.
   - Update Notion with verification results and follow-up tasks.

## Implementation Order

1. Read `AGENTS.md`, `docs/product/mvp-definition.md`, `docs/steering/architecture.md`, `docs/steering/verification.md`, and the approved analysis.
2. Inspect the current repository structure before scaffolding. Preserve existing docs and do not rewrite prior analysis artifacts.
3. Establish the app scaffold and GitHub Pages base-path config first.
4. Add route/screen structure with mock state.
5. Add design tokens and base responsive layout.
6. Add reusable UI components where the mock screens actually consume them.
7. Add audio manager/mute and effect placeholders against visible UI states.
8. Run verification and record results in Notion.

## Files Or Modules Expected To Be Touched

Exact paths may differ if the scaffold creates a conventional Vite layout, but expected areas are:

- `package.json`
- `index.html`
- `vite.config.ts`
- `tsconfig*.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/app/`
- `src/design/`
- `src/effects/`
- `src/styles/` or equivalent CSS files
- Optional deploy workflow/config if a simple existing GitHub Pages path is present or explicitly requested.

Do not modify Epic 1 artifacts except to read them.

## Verification Commands And Checks

Use the package manager selected by the scaffold or existing repo. Expected checks:

- Install dependencies.
- Run the local dev server for interactive inspection.
- Run the production build.
- Run static preview of the production build.
- Inspect desktop and mobile viewport layouts.
- Check browser console for runtime/autoplay errors after toggling mute.

If tests or lint scripts are introduced, run them before handoff.

## Known Risks

- GitHub Pages base-path configuration can easily be forgotten; handle it before UI work grows.
- Mock screens can accidentally imply real room/chat behavior; keep implementation local/mock.
- Generic components can expand beyond MVP needs; only build what the mock screens use.
- Audio can fail under browser autoplay rules; gate audio behind user interaction and make mute safe.
- Mobile layout can regress if desktop panels are designed first; work mobile-first.

## Non-Goals

- Do not implement Tic Tac Toe rules, GameDefinition, move validation, win/draw detection, or real board state.
- Do not implement lobby/session authority.
- Do not add transport interfaces, LocalTestTransport, MemoryTransport, Trystero, or WebRTC.
- Do not implement real room creation, real room joining, real chat sync, or live share links.
- Do not add auth, database/server persistence, public matchmaking, leaderboard, achievements, host migration, or chat moderation.
- Do not add Vietnamese Caro-specific board complexity.
- Do not introduce Phaser/canvas for this shell.
- Do not do the full visual/audio polish pass; Epic 7 owns that.

## Durable Deliverables To Read

- `docs/product/mvp-definition.md`
- `docs/steering/project-brief.md`
- `docs/steering/architecture.md`
- `docs/steering/verification.md`
- `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/analysis.md`
- `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/review-3.md`
