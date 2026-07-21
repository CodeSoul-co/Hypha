# ADR 0019: Event-Derived Server Run Context

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: Chat, Workflow, Tool approval, and recovery must continue a Run after process restart without depending on process-local Run state
- Existing Hypha capability: canonical durable orchestration Events and validated Run/FSM context projection
- Current gap: `EventRuntimeService` still reads and mutates a `runs` Map after startup recovery
- Why this cannot be solved only in the business project: all Server Runtime surfaces share this lifecycle authority
- Cross-business reuse: yes
- Classification: Framework-backed reusable Server App Surface
- Target source branch: `runtime`
- Target directories: `apps/server/src/runtime` and `apps/server/src/services`
- Spec change: none
- Event change: none
- Compatibility impact: new canonical Runs are unchanged; pre-migration Runs without persisted context remain non-resumable
- Test plan: single-Run context projection, missing Run behavior, Workflow execution, Chat/Runtime route tests, package tests, Server unit tests, typecheck, lint, and build
- Other module impact: Workflow execution response storage remains a separate migration slice

## Decision

Remove the process-local `runs` Map from `EventRuntimeService`. Every operation that needs Run ownership, DomainPack identity, FSM process data, or the latest snapshot resolves that context from canonical durable Events.

Startup still scans all recoverable Run contexts before activity recovery. The scan validates persisted FSM data and restores only the non-authoritative session creation hint; it does not repopulate Run business state.

Chat, streaming Chat, Tool approval/rejection, recovery supervision, cache tracing, completion, failure, and generic Event append all use the same Event-derived context query.

## Consequences

- Process restart cannot erase or supersede Run/FSM truth.
- An Event append cannot proceed for a Run whose persisted context is missing or corrupt.
- Accepted transition snapshots immediately become the context observed by subsequent operations.
- Context lookup currently reads the canonical Run stream through the compatibility bridge. A dedicated indexed query projection may optimize this path without changing authority.
- `knownSessions` remains a discardable duplicate-session hint; session authority remains in Events.
- The legacy `WorkflowEngine.executions` Map is not addressed here and must be removed in the next slice.
