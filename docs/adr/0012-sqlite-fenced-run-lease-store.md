# ADR 0012: SQLite Fenced Run Lease Store

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: only one worker may own and advance a Run after restart or worker failure
- Existing Hypha capability: fenced Run Lease contracts and an in-memory reference store
- Current gap: lease ownership, fencing high-water marks, and idempotent acquisition results disappear on process restart
- Why this cannot be solved only in the business project: worker exclusion and stale completion rejection are Runtime Framework invariants
- Cross-business reuse: yes
- Classification: Framework adapter
- Target directory: `packages/adapters-local/src`
- Spec change: none
- Event change: none
- Compatibility impact: additive; the in-memory store remains the reference implementation
- Test plan: restart persistence, idempotency, expiry takeover, cancellation preemption, heartbeat, release, concurrent acquisition, partition isolation, ID reuse, and corruption detection
- Other module impact: the State Execution Claim adapter will authorize every mutation through this store

## Context

An in-memory lease can prevent duplicate work only inside one process lifetime. After restart it loses both the active owner and the fencing high-water mark, allowing a stale worker result to appear current.

## Decision

Add `SQLiteRunLeaseStore` implementing the current fenced `RunLeaseStore` contract. It persists:

- one slot for each tenant/user/Run scope;
- the immutable partition key;
- fencing-token and revision high-water marks;
- the active lease and canonical integrity hash;
- globally consumed lease IDs;
- acquire and cancellation-preempt idempotency results.

All mutations run inside `BEGIN IMMEDIATE`. Expired takeover, explicit release, and cancellation preemption never reset high-water marks. Missing, expired, or stale guards fail with `RUNTIME_FENCING_REJECTED`.

## Migration

The lease tables use Runtime migration version 4 and may share the SQLite database with Event, Projection, and Checkpoint tables.

## Consequences

- Lease ownership and fencing remain valid across restart.
- Exactly one concurrent acquisition wins for a scope.
- A released or expired lease ID cannot be reused.
- Cancellation can preempt an active worker while immediately fencing the previous owner.
- Persisted lease corruption blocks scheduling instead of silently accepting an untrusted owner.
- Durable State Execution Claim remains the next required coordination adapter.
