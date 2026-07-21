# ADR 0013: SQLite State Execution Claim Store

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: a retried or restarted worker must not execute the same FSM state attempt concurrently or publish a stale completion
- Existing Hypha capability: State Execution Claim contracts and an in-memory reference store
- Current gap: active claims, terminal completion, consumed claim IDs, and acquisition idempotency disappear on process restart
- Why this cannot be solved only in the business project: per-state exclusion and stale-worker fencing are Runtime Framework invariants
- Cross-business reuse: yes
- Classification: Framework adapter
- Target directory: `packages/adapters-local/src`
- Spec change: none
- Event change: none
- Compatibility impact: additive; the in-memory store remains the reference implementation
- Test plan: restart persistence, terminal completion, bounded renewal, release and reassignment, Run Lease fencing, concurrent acquisition, idempotency, scope isolation, ID reuse, and corruption detection
- Other module impact: the canonical Server graph can bind durable Run Lease and State Claim coordination to the FSM driver

## Context

The Run Lease elects the worker allowed to advance a Run. A State Execution Claim narrows that authority to one concrete FSM state attempt. Without durable claims, restart loses active ownership and terminal completion, allowing duplicate tool effects or stale state transitions.

## Decision

Add `SQLiteStateExecutionClaimStore` implementing the existing `StateExecutionClaimStore` contract. It persists:

- one current claim for each tenant/user/Run/state/attempt scope;
- the immutable process revision for that attempt;
- canonical integrity hashes for current claims and idempotent results;
- globally consumed claim IDs;
- successful and blocked acquisition idempotency results.

Each mutation first validates the current fenced Run Lease and then commits the State Claim change in a `BEGIN IMMEDIATE` transaction. Claim expiry remains bounded by the Run Lease expiry. Completed attempts remain terminal, while released or expired attempts may be reassigned only with a new claim ID and the same process revision.

## Migration

The State Claim tables use Runtime migration version 5 and may share the SQLite database with Event, Projection, Checkpoint, and Run Lease tables.

## Consequences

- State-attempt ownership and terminal completion survive restart.
- Exactly one concurrent acquisition wins for a state attempt.
- Old workers are rejected after Run Lease fencing advances.
- Used claim IDs cannot be recycled after release or expiry.
- Persisted claim corruption blocks execution instead of restoring untrusted ownership.
- Runtime coordination persistence is complete enough to activate the canonical Server composition root next.
