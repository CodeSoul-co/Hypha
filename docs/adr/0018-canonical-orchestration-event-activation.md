# ADR 0018: Canonical Orchestration Event Activation

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: an interrupted Run must resume with the same FSM definition and snapshot after Server restart
- Existing Hypha capability: canonical durable Event streams, orchestration schemas, a legacy EventStore bridge, and FSM snapshot validation
- Current gap: the Server still writes all events to the legacy store and keeps recoverable Run/FSM context only in a process-local Map
- Why this cannot be solved only in the business project: durable Run ownership and FSM recovery are cross-business Runtime responsibilities
- Cross-business reuse: yes
- Classification: Framework and reusable Server App Surface
- Target source branch: `runtime`
- Target directories: `packages/harness`, `apps/server/src/runtime`, and `apps/server/src/services`
- Spec change: `run.created` carries canonical `runId` and optional caller-owned recovery metadata
- Event change: existing orchestration events gain recovery data through schema-compatible additional properties
- Compatibility impact: additive for new Runs; pre-migration Runs without recovery context remain readable but are not reconstructed into the Server cache
- Test plan: event-family routing, authoritative merged reads, canonical Run payload compatibility, context projection, latest snapshot selection, corruption rejection, package tests, Server tests, typecheck, and build
- Other module impact: Tool, Inference, Memory, and other unregistered event families remain on legacy storage until their schemas migrate

## Decision

The Server uses a partitioned `EventStore` boundary:

- event types in `RUNTIME_ORCHESTRATION_EVENT_TYPES` are written through `DurableEventStoreBridge` to the canonical Runtime;
- event families without registered canonical schemas continue to use the legacy SQLite store;
- unfiltered reads merge both stores, discard legacy copies of orchestration events, and treat canonical orchestration facts as authoritative;
- typed reads go directly to the owning store.

Each new `run.created` Event persists a validated Runtime recovery context containing the user/session ownership, DomainPack identity, FSM process spec, and initial snapshot. Accepted transitions and entered states persist their resulting snapshot. At startup, the Server rebuilds its disposable Run context cache from canonical Events before Tool invocation recovery begins.

## Consequences

- New orchestration writes fail closed on missing or invalid schemas.
- A process restart no longer loses the FSM definition or latest accepted snapshot for new Runs.
- A crash after `fsm.transition.accepted` can recover the accepted snapshot even if the following entered-state Event was not written.
- The in-memory Run Map remains a transitional cache in this slice; it is no longer the only recovery source and will be removed in the next migration slice.
- Session events and non-orchestration operational events remain in legacy storage until their own schema families are registered.
