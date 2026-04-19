# Analysis Review: Epic 2 - Deployable App Shell And Design Foundation, Round 1

## Metadata

- Reviewed analysis: `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/analysis.md`
- Review date: 2026-04-19
- Reviewer: Codex
- Reviewer mode: same-session
- Verdict: Approved with changes

## Summary

The analysis is aligned with Notion, the repo roadmap, Epic 1 outputs, and Game Studio foundation/UI guidance. It keeps Epic 2 correctly scoped to a deployable shell, mock screens, design tokens, audio/effects skeletons, and GitHub Pages readiness. One clarification should be applied before handoff: resolve the deployment open question into an explicit implementation assumption so the next session does not overbuild live deployment automation.

## Context Enrichment

- Active epic: Epic 2 - Web app foundation and GitHub Pages, Notion status `Not Started`, https://www.notion.so/34782a74570d816692f5cfc167a16f09
- Roadmap position: second roadmap epic, after Epic 1 product/UX direction and before Epic 3 local Tic Tac Toe.
- Previous dependencies: Epic 1 approved MVP flow, game sequence, architecture boundaries, UX/audio/effects direction, and out-of-scope list in `docs/product/mvp-definition.md`.
- Later outputs: Epic 3 needs shell/game mock/audio/effects foundation; Epic 4 needs lobby/chat mock surfaces; Epic 5 and Epic 6 need deployable shell and connection/create/join surfaces; Epic 7 needs tokens/audio/effects foundation.
- Product boundaries: no auth, persistence, public matchmaking, leaderboard, full spectator UI, host migration, or chat moderation.
- Architecture boundaries: React + Vite + TypeScript; DOM/CSS for board-game shell; per-game renderer; no Trystero outside transport adapter; no transport work in this epic.
- Verification expectations: build succeeds, static preview/deploy works, desktop/mobile visual smoke, audio mute smoke, no real Trystero/WebRTC in CI.
- Artifact paths: `docs/analysis/epics/02-deployable-app-shell-and-design-foundation/analysis.md`, `review-1.md`, optional later review rounds, and `implementation-handoff.md`.
- Prior review status: no prior review for Epic 2.
- Missing context or source-of-truth conflicts: none material. Notion and repo titles differ but describe the same epic.

## Findings

### Minor: Resolve deployment scope before handoff

- Evidence: `Open Questions` asks whether GitHub Pages deployment should be a workflow or only build/base-path configuration plus static preview. Notion acceptance requires build/base-path config and static output preview/deploy, while the roadmap output says GitHub Pages build config.
- Risk: A later implementation session could add unnecessary deployment automation or live release work during a foundation epic.
- Required change: Replace the open question with an explicit assumption: Epic 2 should implement GitHub Pages-compatible build/base-path config and static preview; add a workflow/live deployment only if the repository already has a simple established deployment path or the user explicitly asks.

## Drift Review

- Auth/account: no drift.
- Persistence: no drift; only allowed localStorage mute/volume preference is mentioned.
- Generic platform foundation: no drift; component scope is tied to mock screens and MVP surfaces.
- Rules/UI/session/transport separation: no drift; game rules and session logic are out of scope.
- Trystero adapter boundary: no drift; Trystero is out of scope.
- CI transport strategy: no drift; no real WebRTC in CI.
- Renderer/engine choice: no drift; DOM/CSS is used for board-game shell.
- Chat: no drift; chat mock surfaces are included.
- Mobile: no drift; mobile-first layout and smoke checks are required.
- Look/feel/audio/effects: no drift; tokens, mute, audio skeleton, and effect states are included.
- Deployability: acceptable after the deployment-scope clarification.
- Source-of-truth split: no drift; Notion updates and possible steering-doc updates are identified.

## Scope And Dependency Review

- Incremental: yes, produces a visible deployable shell.
- Isolated: yes, avoids game rules, transport, and real multiplayer.
- Verifiable: yes, with build, preview, visual, audio, and optional component/unit checks.
- Deployable: yes, once deployment scope is clarified.
- Dependency clarity: yes.
- Later-epic outputs: clear and aligned with roadmap.

## Required Changes Before Implementation

- Clarify GitHub Pages/live deployment scope in the analysis before writing the implementation handoff.

## Optional Improvements

- None.

## Reviewer Notes

No subagent was used because the user did not request delegation or independent subagent review. Same-session review mode is correct for this analysis gate.
