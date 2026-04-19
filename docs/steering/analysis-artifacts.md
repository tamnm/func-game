# Analysis Artifacts

Epic analysis outputs are stored in the repository so future sessions and agents can resume with full context.

Notion remains the planning/task tracking system. Analysis artifacts in this repo are the implementation handoff and reasoning record. Official deliverables that should be read directly outside the analysis process belong in durable docs folders such as `docs/product/` or `docs/steering/`.

## Documentation Roles

- `docs/steering/`: durable agent/process/architecture steering.
- `docs/product/`: durable product deliverables such as MVP definitions, user flows, UX direction, and out-of-scope decisions.
- `docs/analysis/epics/`: per-epic reasoning, review rounds, and handoff trail.
- Notion: planning, status, task tracking, and links to repo artifacts.

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
    references.md
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

Reviewer output for each review round.

Each review must record one review mode:

- `same-session`: the same Codex session performed the reviewer pass.
- `subagent`: a reviewer subagent performed the review after the user explicitly requested subagents/delegation.
- `separate-session`: another Codex session performed the review.

Only `subagent` and `separate-session` reviews should be described as independently executed. A `same-session` review is still a useful quality gate, but it is not an independent subagent review.

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
- Durable deliverables to read before implementation.

### `references.md`

Optional index of the durable deliverables and external planning links that an epic produced or depends on. Use it when the epic has official outputs outside the analysis directory, for example:

- Product deliverables in `docs/product/`.
- Steering updates in `docs/steering/`.
- Notion project/epic/task links.
- Follow-up epic artifact links.

## Storage Rules

- Put durable analysis in repo files, not only in chat.
- Put backlog/task status in Notion.
- Put durable product deliverables in `docs/product/`.
- Put durable architecture/process decisions in `docs/steering/`.
- If analysis changes architecture, update steering docs and mention that in Notion.
- If analysis produces official product scope, user flow, UX direction, or out-of-scope decisions, update `docs/product/` and mention that in Notion.
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
