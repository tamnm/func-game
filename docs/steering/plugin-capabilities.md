# Plugin Capabilities

This project is designed to work with Codex plugin capabilities when they are available. Repo docs remain the durable source for project steering and technical decisions.

## Game Studio

Use Game Studio capabilities for:

- Browser-game architecture.
- Game UX and look/feel guidance.
- Engine and renderer decisions.
- Playtesting and visual/browser QA.
- Game-specific implementation planning.

Relevant work:

- Choosing DOM/CSS vs Phaser/canvas for a game.
- Reviewing game feel, audio, effects, HUD, and mobile layout.
- Playtesting Tic Tac Toe and Vietnamese Caro flows.
- Planning future casual games.

If Game Studio is unavailable, continue from repo steering docs and note that plugin-specific game workflow guidance was not available.

## Notion

Use Notion capabilities for:

- Fetching the project page.
- Finding epics and tasks.
- Reading and updating acceptance criteria.
- Updating planning/status after approved changes.
- Recording implementation and verification summaries.

Current project:

```text
https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
```

If Notion is unavailable, do not invent or assume task state. Continue from repo docs only where appropriate and report the Notion blocker.

## Priority

Use sources in this order:

1. Newest explicit user instruction.
2. Repo steering docs.
3. Notion project/epic/task data.
4. Plugin skill guidance.
5. Existing code/tests.

When sources conflict, stop and reconcile before implementation. Durable decisions should be written back into repo docs; backlog/status should be written to Notion.
