# ADR 0017: Durable EventStore Compatibility Bridge

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: existing Server surfaces must migrate to durable Events without changing their public response contracts in one unsafe step
- Existing Hypha capability: legacy `EventStore` append/list consumers and canonical `EventRuntime` durable streams
- Current gap: the two interfaces cannot be connected without bypassing expected-sequence CAS and scoped stream ownership
- Why this cannot be solved only in the business project: the compatibility boundary is shared by all existing Hypha Server surfaces and Harness users
- Cross-business reuse: yes
- Classification: Framework compatibility
- Target directory: `packages/harness/src`
- Spec change: adds an `EventStore`/`TraceRecorder` adapter over canonical `EventRuntime`
- Event change: none
- Compatibility impact: additive; bridge activation requires concrete schemas for every Event family used by a caller
- Test plan: ownership normalization, durable readback, duplicate reuse, conflicting Event ID rejection, concurrent CAS retry, stream-head pagination, legacy filters, and schema failure
- Other module impact: prepares `EventFirstRuntime` and `RunManager` consumers for staged durable migration

## Context

`EventFirstRuntime` and several Harness components consume the original `EventStore` interface, which exposes only single-Event append and filtered list operations. `DurableEventRuntime` requires an explicit user/run stream scope, expected sequence, and idempotency key.

Replacing the durable contract with an in-memory compatibility cache would preserve the old API but restore a second source of truth. Blindly reading a head and appending once would also lose Events under concurrent writers.

## Decision

Add `DurableEventStoreBridge`, a stateless compatibility adapter that:

- derives stream scope from tenant, user, and Run identity;
- accepts the legacy user metadata convention while persisting an explicit `userId`;
- assigns a stable Event-based idempotency key when one is absent;
- checks existing Event identity before append;
- retries expected-sequence CAS conflicts with a bounded attempt budget;
- rejects the same Event ID with different canonical content;
- rebuilds legacy filtered lists by paging durable stream heads and reading matching streams;
- orders cross-stream results by durable global sequence.

The bridge does not register schemas, acquire leases, or hold Run/FSM state. Those responsibilities remain with the canonical composition root and caller.

## Consequences

- Existing Harness consumers can move to durable storage without changing their immediate API shape.
- Concurrent compatibility writers preserve all distinct Events and coalesce duplicate Event retries.
- Cross-stream legacy queries may be expensive because they scan stream-head pages; canonical query projections should replace them after migration.
- The bridge fails closed when ownership or Event schemas are missing.
- Server activation is intentionally deferred until every Event family emitted by the selected facade path has a concrete registered schema.
