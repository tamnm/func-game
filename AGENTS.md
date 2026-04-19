# Agent Steering

This repository is the source-of-truth for implementation steering. Notion is used for project planning, epics, and task tracking; repo docs are used for durable agent instructions and technical decisions.

## Project Context

- Project: Web Games Platform - Multiplayer 2D
- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Goal: build a small casual 2D web game platform for friends to play together in browser.
- First game: Tic Tac Toe online.
- Second game: Vietnamese Caro.

## Expected Plugins / Capabilities

This project expects these Codex plugin capabilities when available:

- Game Studio: use for browser-game architecture, game UX, engine/renderer decisions, game-specific implementation guidance, and playtesting.
- Notion: use for project, epic, task lookup, planning updates, status updates, and approved backlog/task changes.

Before planning, analyzing, or implementing an epic:

1. Check whether Notion tools are available. If unavailable, continue from repo docs where possible, but report that Notion lookup/update is blocked.
2. Check whether Game Studio skills are available. If unavailable, continue from repo docs where possible, but report that Game Studio-specific workflow guidance is unavailable.
3. Prefer repo steering docs for durable project decisions even when plugins are available.

## Working Rules

1. Start from the current epic/task in Notion, but read these repo steering docs before changing code.
2. Keep work incremental, isolated, verifiable, and deployable.
3. Build foundation only when a concrete game slice needs it. Avoid generic platform work that is not required by Tic Tac Toe or Vietnamese Caro.
4. Keep Notion updated for planning/status. Keep architectural decisions, agent instructions, and implementation conventions in this repo.
5. Do not make broad refactors unrelated to the active epic.

## Key Decisions

- Stack: React + Vite + TypeScript.
- Multiplayer: Trystero P2P for production transport.
- Network topology: host-authoritative.
- Room lifecycle: host leaves = room ends.
- Auth: none.
- Persistence: none, except localStorage for client identity/preferences.
- Chat: included in MVP.
- Renderer: per-game. DOM/CSS for board games; Phaser/canvas only when a game needs it.
- Testing: unit tests and automated E2E use local deterministic transports. Real Trystero is manual smoke first.

## Docs

- `docs/steering/project-brief.md`: product scope, games, MVP boundaries.
- `docs/steering/notion-workflow.md`: how agents should use Notion.
- `docs/steering/plugin-capabilities.md`: expected Game Studio and Notion plugin usage.
- `docs/steering/architecture.md`: architecture and technical decisions.
- `docs/steering/roadmap.md`: epic sequence and dependencies.
- `docs/steering/verification.md`: verification and test strategy.
- `docs/steering/epic-analysis-instructions.md`: how to analyze one epic before implementation.
- `docs/steering/analysis-reviewer-instructions.md`: how to run the epic analysis review gate for drift and quality.
- `docs/steering/analysis-artifacts.md`: where analysis outputs and review rounds are stored.

## Documentation Layout

- `docs/steering/`: durable agent instructions, architecture/process steering, roadmap, verification, and analysis/review workflows.
- `docs/product/`: durable product deliverables and decisions that humans and agents should read directly, such as the MVP definition, user flow, UX direction, and out-of-scope decisions.
- `docs/analysis/epics/`: per-epic analysis gate artifacts, reviews, and implementation handoffs. These files explain how the deliverables were derived and reviewed; they should reference durable deliverables instead of being the only place those deliverables exist.
- Notion: project, epic, task status, planning notes, and links back to repo artifacts/deliverables.

## Epic Analysis Gate

Before implementing a roadmap epic, create an analysis artifact in `docs/analysis/epics/` using `docs/templates/epic-analysis-template.md`.

If an epic produces durable product or technical deliverables, store those deliverables under the appropriate durable docs folder, for example `docs/product/` for product scope/UX deliverables or `docs/steering/` for lasting architecture/process decisions. The epic analysis directory should include references to those deliverables and the review/handoff trail.

For foundation, transport, game, UX/audio/effects, deployment, or release-hardening epics, run a review gate using `docs/steering/analysis-reviewer-instructions.md`. Use a subagent reviewer only when the user explicitly asks for subagents, delegation, or independent subagent review. Otherwise run a same-session review pass and label it as such. Store each review round beside the analysis. Fix findings and repeat review up to three rounds or until approved.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **fun-game** (232 symbols, 230 relationships, 0 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/fun-game/context` | Codebase overview, check index freshness |
| `gitnexus://repo/fun-game/clusters` | All functional areas |
| `gitnexus://repo/fun-game/processes` | All execution flows |
| `gitnexus://repo/fun-game/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
