# Notion Workflow

Notion is the planning and tracking system. This repository is the durable technical steering system.

## Required Capability

Use the Notion plugin/app tools when available for:

- Fetching the project page.
- Finding epics/tasks.
- Reading acceptance criteria.
- Updating task status and approved task breakdowns.
- Recording verification summaries after implementation.

If Notion tools are unavailable, do not invent project/task state. Continue from repo docs only where possible, and report that Notion sync is blocked.

## Source Of Truth Split

- Notion stores project, epics, tasks, status, acceptance criteria, and planning notes.
- Repo docs store agent instructions, architecture decisions, implementation conventions, and verification strategy.
- Code and tests store executable truth.

When these conflict, prefer the newest explicit user decision. Then update both Notion and repo docs as needed.

## Project And Epic Links

- Project: https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4

Current epic sequence:

1. Epic 1 - Game scope and UX direction
2. Epic 2 - Deployable app shell and design foundation
3. Epic 3 - Tic Tac Toe local vertical slice
4. Epic 4 - Local lobby, chat, and session
5. Epic 5 - Trystero P2P transport
6. Epic 6 - Online Tic Tac Toe MVP
7. Epic 7 - Look, feel, audio, and effects pass
8. Epic 8 - Vietnamese Caro
9. Epic 9 - Release hardening and next games backlog

## Agent Workflow With Notion

1. Before implementation, fetch the active Notion epic/task.
2. Read `AGENTS.md` and the steering docs in `docs/steering/`.
3. Confirm the active epic has clear scope, acceptance criteria, and verification.
4. If scope is ambiguous, clarify before writing code or update the task with assumptions.
5. During implementation, keep code changes scoped to the active epic.
6. After implementation, update Notion with status, what changed, verification results, and any follow-up tasks.

## Task Quality Bar

Tasks should be small enough to verify independently. A good task has:

- Context.
- Objective.
- In scope / out of scope.
- Acceptance criteria.
- Verification steps.
- Dependencies.

Avoid tasks that combine unrelated concerns, for example implementing Trystero, visual polish, Caro rules, and deployment in one task.

## Status Guidance

- `Not Started`: no code work has begun.
- `In Progress`: actively being implemented or verified.
- `Done`: acceptance criteria and verification are complete.
- `Archived`: no longer relevant.

If a task produces follow-up work, create or note the follow-up instead of expanding the current task.
