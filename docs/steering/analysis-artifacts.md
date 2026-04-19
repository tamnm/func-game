# Analysis Artifacts

Epic analysis outputs are stored in the repository so future sessions and agents can resume with full context.

Notion remains the planning/task tracking system. Analysis artifacts in this repo are the implementation handoff and reasoning record.

## Directory Layout

Use:

```text
docs/analysis/epics/
  01-game-scope-and-ux-direction/
    analysis.md
    review-1.md
    review-2.md
    review-3.md
    implementation-handoff.md
  02-deployable-app-shell-and-design-foundation/
    analysis.md
    ...
```

Use two-digit epic numbers so directory order is stable.

## File Purposes

### `analysis.md`

The main analysis artifact for the epic. It should include:

- Epic intent.
- In scope/out of scope.
- Dependencies.
- Task breakdown.
- Verification plan.
- Drift checklist.
- Notion updates needed.
- Repo docs updates needed.
- Implementation handoff draft.

### `review-<round>.md`

Independent reviewer output for each review round.

Expected rounds:

- `review-1.md`
- `review-2.md`
- `review-3.md`

Not every epic needs all three files. Stop when the reviewer approves.

### `implementation-handoff.md`

Final concise handoff for a future implementation session. It should be written after reviewer approval and should include:

- Active Notion epic/task links.
- Final task list.
- Implementation order.
- Files/modules expected to be touched.
- Verification commands/checks.
- Known risks and non-goals.

## Storage Rules

- Put durable analysis in repo files, not only in chat.
- Put backlog/task status in Notion.
- Put durable architecture decisions in steering docs.
- If analysis changes architecture, update steering docs and mention that in Notion.
- If analysis creates implementation tasks, update Notion task breakdown after approval.

## Naming Rules

Directory format:

```text
<two-digit-epic-number>-<short-kebab-slug>
```

Examples:

```text
01-game-scope-and-ux-direction
02-deployable-app-shell-and-design-foundation
05-trystero-p2p-transport
08-vietnamese-caro
```

## Review State

The latest review verdict is the review state.

If the latest verdict is:

- `Approved`: implementation can start.
- `Approved with changes`: apply required changes, then implementation can start unless the user asks for another review.
- `Needs rework`: do not implement yet.

## Cross-Session Resume

A new session should:

1. Read `AGENTS.md`.
2. Read steering docs.
3. Fetch the Notion epic/task.
4. Read the epic analysis directory.
5. Confirm latest review verdict.
6. Continue from `implementation-handoff.md` if approved.
