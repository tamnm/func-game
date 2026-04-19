# Epic Analysis Instructions

Use these instructions when a Codex session is dedicated to analyzing one roadmap epic before implementation.

The goal of analysis is to turn one Notion epic into an implementation-ready backlog that is aligned with project steering, scoped to a deployable slice, and easy for a later implementation session to pick up.

## Required Context

Before analyzing, read:

1. `AGENTS.md`
2. `docs/steering/project-brief.md`
3. `docs/steering/architecture.md`
4. `docs/steering/roadmap.md`
5. `docs/steering/verification.md`
6. `docs/steering/notion-workflow.md`
7. `docs/steering/analysis-artifacts.md`
8. The active Notion project and epic/task.

If prior analysis exists for the epic, read it too:

```text
docs/analysis/epics/<epic-number>-<slug>/
```

## Notion Lookup

Current Notion project:

```text
https://www.notion.so/34782a74570d81d7a43dc6cd295c1ce4
```

Preferred lookup flow:

1. Fetch the project page by URL/id.
2. Read the `Tasks` relation on the project page.
3. Fetch the target epic page from the relation.
4. If the relation is unavailable, search Notion for:

```text
Web Games Platform - Multiplayer 2D
Epic <number>
```

5. Confirm the fetched epic title matches the requested epic.

Planning, epics, and tasks currently live in Notion. If the team later moves backlog/task tracking to Confluence or another system, update `docs/steering/notion-workflow.md` and this lookup section.

## Analysis Output Location

Create or update:

```text
docs/analysis/epics/<epic-number>-<short-slug>/analysis.md
```

Use `docs/templates/epic-analysis-template.md` as the structure.

Do not store implementation-only details exclusively in chat. If a later session needs it, put it in the analysis artifact, Notion task, or steering docs.

## Analysis Workflow

1. Restate the epic intent in project terms.
2. Identify which concrete game or foundation slice this epic serves.
3. List dependencies from earlier epics and outputs needed by later epics.
4. Define in scope and out of scope.
5. Break the epic into implementation tasks small enough to verify independently.
6. Define verification for each task and for the whole epic.
7. Check for project drift.
8. Identify Notion updates needed.
9. Identify repo steering updates needed.
10. Write an implementation handoff section.

## Scope Rules

Keep the epic:

- Incremental: produces a visible or testable improvement.
- Isolated: does not mix unrelated transport, UI, game-rule, deployment, and polish work unless the epic explicitly owns that integration.
- Verifiable: has unit/component/E2E/manual checks.
- Deployable: the app should remain runnable and deployable after implementation.

## Drift Checklist

Every analysis must explicitly answer:

- Does this add account/auth? If yes, why is it allowed?
- Does this add database/server persistence? If yes, why is it allowed?
- Does this add generic platform abstraction not needed by Tic Tac Toe or Vietnamese Caro?
- Does this put game rules inside UI, session, or transport code?
- Does this make game/session code import Trystero directly?
- Does this make CI depend on real Trystero/WebRTC?
- Does this introduce Phaser/canvas when DOM/CSS is sufficient?
- Does this preserve deployability after the epic?
- Does this include mobile considerations?
- Does this include look, feel, audio, and effects where relevant?
- Does this update Notion for backlog/status and repo docs for durable decisions?

## When To Invoke Reviewer

Invoke an independent reviewer for:

- Every roadmap epic before implementation.
- Any epic touching architecture, transport, session, lobby, chat, renderer, audio/effects, deployment, or release strategy.
- Any analysis with unresolved assumptions or meaningful scope risk.

Small bugfix tasks do not require the full reviewer loop unless they change project direction.

## Expected Session Flow

1. Start Codex session.
2. Load these analysis instructions and required context.
3. Fetch the next Notion epic.
4. Produce or update `analysis.md`.
5. Invoke independent analysis reviewer.
6. Save review as `review-1.md`.
7. Fix findings in `analysis.md`.
8. Invoke reviewer again.
9. Save review as `review-2.md`.
10. Fix findings if any.
11. Invoke reviewer a third time if needed.
12. Save review as `review-3.md`.
13. Once approved, write `implementation-handoff.md`.
14. Update Notion with the approved task breakdown and verification plan.

Do not start implementation in the analysis session unless the user explicitly asks for it.
