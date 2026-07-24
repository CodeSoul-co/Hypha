# ADR 0021: RunManager Canonical Event Boundary

- Status: Accepted
- Date: 2026-07-23
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: a Run must retain one durable event truth across restart, replay, approval, and FSM execution
- Existing Hypha capability: canonical Event Runtime, versioned Runtime schemas, fenced Run leases, and a legacy/canonical read facade
- Current gap: Server composition injects a compatibility EventStore into RunManager, allowing RunManager event families to continue writing legacy truth
- Why this cannot be solved only in the business project: RunManager ownership, event routing, fencing, migration, and replay are shared Runtime responsibilities
- Cross-business reuse: yes
- Classification: Framework and reusable Server App Surface
- Target source branch: `runtime`
- Target directories: `packages/core/src/modules/runtime`, `packages/harness`, and `apps/server/src`
- Spec change: the Runtime schema catalog declares canonical and RunManager migration event-family sets
- Event change: Session and Harness RunManager observation events receive versioned canonical schemas
- Compatibility impact: migrated RunManager families write canonical only; historical module-owned observations remain available through merged reads
- Test plan: schema completeness, migration idempotency, canonical-only dependency test, fenced bridge conflicts, replay compatibility, Server unit tests, package tests, typecheck, lint, and build
- Other module impact: Tool, Model, Inference, Memory, MCP, and Workflow event families remain on their owner-provided event ports

## Decision

Declare three explicit event sets:

1. `RUNTIME_ORCHESTRATION_EVENT_TYPES` remains the authoritative state-transition history.
2. `RUNTIME_RUN_MANAGER_EVENT_TYPES` contains only events RunManager is allowed to emit.
3. `RUNTIME_CANONICAL_EVENT_TYPES` is the schema-backed union accepted by the canonical Runtime store.

Server RunManager receives a canonical-only write view. Attempts to append module-owned events through RunManager fail closed. Replay reads remain merged so historical Tool, Model, Memory, and other owner events are still visible without granting RunManager a legacy write path.

The durable EventStore bridge acquires a Run lease and supplies the current fencing token whenever a stream has entered fenced execution. New, unfenced bootstrap streams continue to use sequence CAS until the first fenced Runtime operation.

At startup, newly activated RunManager event families are migrated idempotently. Legacy Human Wait upcasting runs first. Invalid migration candidates are quarantined in a structured report and prevent Runtime readiness.

## Consequences

- `ServerRuntimeComposition` no longer accepts or names a compatibility EventStore.
- RunManager cannot create a second legacy truth for a canonical Runtime family.
- Existing canonical orchestration streams remain authoritative over stale legacy lifecycle copies.
- Historical non-orchestration observations can coexist in merged replay until their owning modules complete independent migrations.
- Session creation is restart-safe because an existing projected Session is reused instead of emitting a conflicting duplicate.
- Fenced streams reject RunManager writes while another owner holds the Run lease.
- The compatibility read facade remains transitional and can be removed after all module-owned event families migrate.
