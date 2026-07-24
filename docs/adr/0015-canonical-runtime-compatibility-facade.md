# ADR 0015: Canonical Runtime Compatibility Facade

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: Server startup must establish one durable Runtime authority before accepting work
- Existing Hypha capability: durable Runtime backbone and legacy `EventRuntimeService` HTTP facade
- Current gap: the backbone is tested but is not owned by Server startup, readiness, or shutdown
- Why this cannot be solved only in the business project: Runtime lifecycle and Server readiness are cross-business framework invariants
- Cross-business reuse: yes
- Classification: Framework and Server App Surface composition
- Target directory: `apps/server/src/runtime`, `apps/server/src/services`, and `apps/server/src/app.ts`
- Spec change: none
- Event change: none
- Compatibility impact: additive; current request execution remains on the legacy path in this slice
- Test plan: concurrent initialization, unhealthy storage rejection, retry, guarded access, idempotent close, Server typecheck, lint, build, and unit regression
- Other module impact: creates the controlled activation point for route migration and legacy state removal

## Context

The durable Runtime backbone needs a process owner. Constructing it from individual routes would create multiple SQLite handles and competing coordination authorities. Marking the Server ready before the durable event store passes health checks would also accept work that cannot be recorded safely.

The existing request methods still depend on `EventFirstRuntime`, a legacy event store, and an in-memory run map. Moving those methods in the same change would mix lifecycle activation with execution behavior changes.

## Decision

Add a `RuntimeBackboneLifecycle` that:

- coalesces concurrent initialization into one backbone;
- requires the durable event store to report `healthy` before exposing the backbone;
- fails closed for degraded, unhealthy, or unknown storage;
- closes rejected candidates and permits an explicit retry after startup failure;
- guards access before initialization and after shutdown;
- closes the accepted backbone once.

`EventRuntimeService` becomes the compatibility facade that owns this lifecycle and exposes explicit initialize, access, status, and close methods. `Application` initializes it after tool adapters are available but before recovery and readiness, then closes it before shared databases.

The canonical database defaults to a dedicated migration file beside the legacy event database. `HYPHA_CANONICAL_RUNTIME_DB` can select an explicit path. This prevents legacy JSON-mode storage and SQLite storage from sharing a file during migration.

The schema registry is explicit and fail-closed. This slice does not register a permissive payload schema because no canonical route writes events yet. R1b3 must register the concrete event schemas needed by each migrated writer before that writer is activated.

## Consequences

- Server readiness now includes successful creation and health validation of the canonical durable Runtime backbone.
- Shutdown deterministically releases the backbone before database teardown.
- Existing HTTP behavior and recovery behavior remain compatible.
- Canonical event writes still fail for unregistered schemas, preventing accidental partial migration.
- R1b3 can migrate routes through one facade and then remove the legacy run map and event authority.
