# Implementation Handoff: Epic 3 - Local Tic Tac Toe

## Active Notion Links

- Project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Epic: https://www.notion.so/34782a74570d819b8a24cbb46bf520c2

## Final Task List

1. Add minimal shared game definition types under `src/games/`.
2. Add pure Tic Tac Toe rules under `src/games/tic-tac-toe/rules.ts`.
3. Add Tic Tac Toe definition under `src/games/tic-tac-toe/definition.tsx`.
4. Replace the mock board preview in the game screen with a local playable board.
5. Add board/result/invalid/reset styling while preserving mobile layout.
6. Add unit tests and run typecheck/build.

## Implementation Order

1. Rules and tests first.
2. Game definition second.
3. React board integration third.
4. CSS and manual smoke last.

## Expected Files Or Modules

- `src/games/types.ts`
- `src/games/tic-tac-toe/rules.ts`
- `src/games/tic-tac-toe/definition.tsx`
- `src/games/tic-tac-toe/rules.test.ts`
- `src/games/tic-tac-toe/renderer/TicTacToeBoard.tsx`
- `src/App.tsx`
- `src/styles/main.css`
- `package.json` and lockfile only if the test runner needs to be added

## Verification

- `npm test -- --run` if Vitest is added.
- `npm run typecheck`
- `npm run build`
- Manual: local Game screen supports valid moves, invalid occupied click feedback, win highlight, draw state, and reset/rematch.
- Manual: mobile viewport keeps board and controls readable without overlap.

## Known Risks And Non-Goals

- Do not implement transport, lobby/session state, real chat, Trystero, Caro, auth, persistence, public matchmaking, or Phaser/canvas.
- Keep Tic Tac Toe rules pure; React should consume rule outputs, not own rule logic.
- Keep `GameDefinition` minimal. Add only what this slice needs.

## Durable Deliverables To Read

- `docs/product/mvp-definition.md`
- `docs/steering/architecture.md`
- `docs/steering/verification.md`
- `docs/analysis/epics/03-local-tic-tac-toe/analysis.md`
- `docs/analysis/epics/03-local-tic-tac-toe/review-1.md`
