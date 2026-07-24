# ADR 0020: Event-Derived Workflow Executions

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: Workflow status and cancellation must remain available after Server restart
- Existing Hypha capability: durable Run Events, orchestration projections, fenced Run leases, and cancellation service
- Current gap: `WorkflowEngine` stores status and stage results in a process-local `executions` Map; Workflow HTTP reads and mutates that Map
- Why this cannot be solved only in the business project: every Server Workflow consumer needs the same restart-safe query and cancellation semantics
- Cross-business reuse: yes
- Classification: Framework-backed reusable Server App Surface
- Target source branch: `runtime`
- Target directories: `packages/core/src/modules/runtime` and `apps/server/src`
- Spec change: none
- Event change: none; existing Run, FSM, Workflow stage, and cancellation Events are projected
- Compatibility impact: new Workflow executions use `runId` as `executionId`; historical random execution IDs remain queryable from persisted Events
- Test plan: pure execution projection, owner-scoped routes, real SQLite cancellation path, core canonical JSON tests, Server unit tests, package tests, typecheck, lint, and build
- Other module impact: child Run discovery remains empty until the Server composes a durable parent-child Run registry

## Decision

Remove the `WorkflowEngine.executions` Map. The Engine retains immutable Workflow definitions and delegates execution to `EventRuntimeService`, but it no longer owns execution query or cancellation state.

Add an Event-derived Workflow execution projection. It rebuilds status, current stage, stage results, owner, timestamps, and terminal error from persisted Run and Workflow stage Events. Workflow HTTP queries this projection through an owner-scoped Runtime facade.

Use `runId` as the canonical execution alias for new executions. The projection also recognizes historical execution IDs recorded in stage or terminal Events.

Route cancellation through `RuntimeCancellationService`. The service writes fenced, idempotent cancellation Events through the canonical Runtime and uses durable Run leases. Workflow execution checks the durable Run status between stages so a cancelled Run cannot later be completed by the legacy execution loop.

The Server supplies globally unique cancellation Event and Lease IDs. Canonical JSON accepts plain objects from another JavaScript Realm so persisted projection state remains valid across VM and Worker boundaries, while class instances remain rejected.

## Consequences

- Server restart no longer erases Workflow query state.
- Workflow cancellation no longer mutates a process-local object.
- Owner checks use the Event-derived Run owner and preserve not-found responses for cross-user access.
- New API responses expose both `runId` and `executionId`; they are identical for new executions.
- Existing in-flight stage work is observed at the next stage boundary. Generic activity interruption depends on the activity cancellation adapter composed by the Server.
- Workflow definitions remain process-loaded configuration; only execution truth moves to durable Events.
