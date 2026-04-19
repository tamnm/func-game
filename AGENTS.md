# Agent Steering

This repository is the source-of-truth for implementation steering. Notion is used for project planning, epics, and task tracking; repo docs are used for durable agent instructions and technical decisions.

## Project Context

- Project: Web Games Platform - Multiplayer 2D
- Notion project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
- Goal: build a small casual 2D web game platform for friends to play together in browser.
- First game: Tic Tac Toe online.
- Second game: Vietnamese Caro.

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
- `docs/steering/architecture.md`: architecture and technical decisions.
- `docs/steering/roadmap.md`: epic sequence and dependencies.
- `docs/steering/verification.md`: verification and test strategy.
- `docs/steering/epic-analysis-instructions.md`: how to analyze one epic before implementation.
- `docs/steering/analysis-reviewer-instructions.md`: how to independently review an epic analysis for drift and quality.
- `docs/steering/analysis-artifacts.md`: where analysis outputs and review rounds are stored.

## Epic Analysis Gate

Before implementing a roadmap epic, create an analysis artifact in `docs/analysis/epics/` using `docs/templates/epic-analysis-template.md`.

For foundation, transport, game, UX/audio/effects, deployment, or release-hardening epics, run an independent review pass using `docs/steering/analysis-reviewer-instructions.md`. Store each review round beside the analysis. Fix findings and repeat review up to three rounds or until approved.
