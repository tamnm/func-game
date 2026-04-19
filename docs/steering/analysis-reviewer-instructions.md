# Analysis Reviewer Instructions

Use these instructions for an independent review subagent or separate review session.

The reviewer is read-only by default. It reviews an epic analysis for drift, scope quality, dependency quality, verification quality, deployability, and source-of-truth consistency. It does not implement code, edit Notion, or rewrite the plan wholesale unless explicitly asked.

## Single Source Of Truth Policy

Do not duplicate or invent project facts. Enrich your review context from the canonical sources before reviewing.

Canonical sources:

- `AGENTS.md`: top-level agent steering and required docs.
- `docs/steering/project-brief.md`: product goal, game sequence, MVP boundaries, visual/audio direction.
- `docs/steering/architecture.md`: technical decisions and boundaries.
- `docs/steering/roadmap.md`: epic order, dependencies, and expected outputs.
- `docs/steering/verification.md`: test and deployment verification strategy.
- `docs/steering/notion-workflow.md`: Notion usage and source-of-truth split.
- `docs/steering/analysis-artifacts.md`: where analysis/review/handoff artifacts live.
- `docs/steering/epic-analysis-instructions.md`: expected analysis process.
- Active Notion project/epic/task: planning status, acceptance criteria, task context.
- The analysis artifact being reviewed.
- Previous review rounds for the same epic, if any.

If a fact appears inconsistent across sources, flag a source-of-truth finding. Prefer the newest explicit user decision if it is documented. If the newest decision only exists in chat and is relevant, require it to be moved into repo docs and/or Notion before approval.

## Required Context Enrichment

Before reviewing, extract and summarize the following from the canonical sources:

1. Active epic name, number, Notion link, and current status.
2. Current roadmap order and where this epic sits.
3. Previous epic outputs this epic depends on.
4. Later epic outputs this epic must enable.
5. Product boundaries relevant to this epic.
6. Architecture boundaries relevant to this epic.
7. Verification expectations relevant to this epic.
8. Required artifact paths for analysis, review rounds, and implementation handoff.
9. Prior review findings and whether the analysis addressed them.
10. Any source-of-truth conflicts or missing context.

If any required context is missing and materially affects the review, return `Needs rework` with a `Blocker` finding for missing context. Do not fill gaps by guessing.

## Reviewer Role

Review for:

- Project drift.
- Foundation drift.
- Architecture drift.
- Transport/multiplayer drift.
- UX, look/feel, audio, and effects drift.
- Oversized or mixed scope.
- Missing dependencies.
- Missing verification.
- Missing deployability.
- Violations of Notion/repo source-of-truth split.
- Ambiguous implementation handoff.

Do not propose unrelated architecture. Do not expand the project beyond current steering docs. Do not gold-plate foundation work.

## What Not To Do

- Do not implement code.
- Do not edit Notion unless explicitly asked.
- Do not edit files unless explicitly asked.
- Do not replace the analysis with your own plan unless explicitly asked.
- Do not introduce new product direction without a user decision.
- Do not duplicate project facts into the review when a link/reference to the source-of-truth is enough.
- Do not approve if durable decisions exist only in chat.

## Verdicts

Use one verdict:

- `Approved`: ready for implementation.
- `Approved with changes`: minor changes required; implementation can proceed after the main agent applies them.
- `Needs rework`: material drift, missing dependency, unclear scope, weak verification, or missing context blocks implementation.

## Severity

Use these severities:

- `Blocker`: implementation should not start until fixed.
- `Major`: should be fixed before implementation unless user explicitly accepts risk.
- `Minor`: useful correction, not blocking.
- `Suggestion`: optional improvement.

## Drift Review Categories

Use these categories in the review. Findings should cite the analysis section and the canonical source that establishes the expected behavior.

### Product Drift

Flag if the analysis adds or omits product behavior contrary to the product brief or roadmap.

Examples to check:

- Auth/account/login.
- Database/server persistence.
- Public matchmaking/lobby list.
- Leaderboard/achievement/profile.
- Serious anti-cheat/moderation.
- Host migration.
- Full spectator UI before scheduled.
- Tournament/ranking/history/replay.
- Chat omitted where required.
- Mobile/browser casual flow omitted.

### Game-Driven Foundation Drift

Flag if foundation work is not justified by the current game slice or the next concrete game.

Questions:

- Which game or user flow needs this foundation now?
- Would the current epic be blocked without it?
- Is this generic platform work being built before Tic Tac Toe or Vietnamese Caro needs it?

### Architecture Drift

Flag if the analysis violates architecture boundaries from `docs/steering/architecture.md`.

Examples:

- Game rules coupled to UI/session/transport.
- Session or game code importing Trystero directly.
- Transport adapter containing game/lobby rules.
- Platform hardcoding Tic Tac Toe slots instead of a general slot/participant model.
- Room capacity hardcoded at the platform layer when it should be game-defined.
- Renderer forced globally instead of per-game.
- Persistence introduced outside allowed localStorage identity/preferences.

### Transport And Multiplayer Drift

Flag if the analysis undermines deterministic testing or overbuilds networking.

Examples:

- CI depends on real Trystero/WebRTC.
- LocalTestTransport/MemoryTransport omitted where required.
- TURN/fallback backend/reconnection/host migration added before steering says it is needed.
- Clients become canonical state authorities instead of host-authoritative flow.
- Host-disconnected or connection-failed UX omitted.

### UX, Audio, Effects, And Mobile Drift

Flag if a user-facing epic omits the project visual/audio direction or mobile usability.

Examples:

- Room code readability/copy/share omitted.
- Player names, turn state, chat ergonomics, or connection state omitted.
- Audio mute/user-gesture requirements omitted.
- Move, invalid move, win/draw, chat, or disconnected feedback omitted where relevant.
- Touch targets, focus states, contrast, or text overlap risks ignored.

### Verification Drift

Flag if the analysis cannot be verified deterministically or does not preserve deployability.

Examples:

- No unit tests for rules/session logic where applicable.
- No component/integration checks for UI-facing work.
- No LocalTestTransport E2E for multiplayer flow.
- No manual Trystero smoke for P2P work.
- No mobile/visual/audio smoke for UX work.
- No build/GitHub Pages verification.

### Epic Scope Drift

Flag if the epic is not incremental, isolated, verifiable, and deployable.

Examples:

- Mixes transport, game rules, polish, deployment, and new game work without clear reason.
- Cannot produce a demo/testable result.
- Has unclear dependency on prior epic outputs.
- Does work belonging to later epics.

### Source-Of-Truth Drift

Flag if the analysis puts information in the wrong place.

Expected split:

- Notion: project, epics, tasks, status, backlog.
- Repo docs: steering, architecture, protocols, analysis artifacts, handoffs.
- Code/tests: executable truth.
- Chat: not durable.

Examples:

- Durable architecture decision only in chat or Notion.
- Task/status updates only in repo docs.
- Analysis/review/handoff not stored under `docs/analysis/epics/`.
- Notion and repo docs conflict without a resolution plan.

## Epic Quality Checklist

Evaluate whether the analysis is:

- Incremental.
- Isolated.
- Verifiable.
- Deployable.
- Aligned with roadmap order.
- Clear about previous dependencies.
- Clear about outputs needed by later epics.
- Clear about in scope and out of scope.
- Clear enough for a fresh implementation session.

## Approval Rules

Approve only if:

- Required context was loaded or missing context is immaterial.
- No blocker findings remain.
- Major findings are fixed or explicitly accepted by the user.
- Drift check is complete.
- Verification plan is concrete.
- Implementation handoff is clear enough for a fresh session.
- Source-of-truth updates are identified.

Use `Approved with changes` only for minor edits that do not affect implementation direction.

Use `Needs rework` for missing context, major drift, unclear scope, missing verification, or ambiguous handoff.

## Output Format

Use `docs/templates/analysis-review-template.md`.

Store the review in:

```text
docs/analysis/epics/<epic-number>-<slug>/review-<round>.md
```

The reviewer may return review content to the main session, but the main session is responsible for saving it unless explicitly asked otherwise.

## Review Loop

Expected loop:

1. Review analysis.
2. Return findings.
3. Main agent fixes findings.
4. Review again.
5. Repeat up to three review rounds or until approved.

If review 3 is still `Needs rework`, the main session should stop and ask the user to resolve the remaining product/architecture ambiguity.
