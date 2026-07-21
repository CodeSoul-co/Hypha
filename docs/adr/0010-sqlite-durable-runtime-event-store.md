# ADR 0010: SQLite Durable Runtime Event Store

- Status: Accepted
- Date: 2026-07-21
- Owner: Runtime
- Source branch: `runtime`

## Feedback Record

- Source agent: Timing learning planner, used only as an integration consumer
- Source business requirement: an interrupted Agent Run must retain ordered, replayable facts across local Server restart
- Existing Hypha capability: `DurableEventStore`, `DurableEventRuntime`, schema registry, projections, and an in-memory reference store
- Current gap: the local SQLite adapter implements only the legacy `EventStore` and has no CAS, revision, fencing, or durable idempotency records
- Why this cannot be solved only in the business project: event ordering and concurrency guarantees are Runtime Framework invariants
- Cross-business reuse: yes
- Classification: Framework adapter
- Target directories: `packages/core/src/modules/runtime`, `packages/adapters-local/src`
- Spec change: reuse the core append-schema validation gate for every durable adapter
- Event change: none
- Compatibility impact: additive; the legacy SQLite EventStore remains available during Server migration
- Test plan: restart persistence, CAS, revision, fencing, idempotency, schema rejection, atomic rollback, pagination, health, and corruption detection
- Other module impact: R1 Server activation can use this adapter after projection, lease, claim, and runner factories are composed

## Context

The legacy local EventStore persists JSON events but overwrites duplicate IDs and does not maintain stream sequence, Run revision, fencing tokens, or append idempotency. It cannot serve as the event authority for a multi-worker or restart-safe Runtime.

## Decision

Add `SQLiteDurableEventStore` as a separate implementation of the core `DurableEventStore` contract. It uses dedicated tables for:

- schema migrations;
- stream heads;
- immutable persisted events;
- append idempotency records.

Every append validates the request and event schema before opening a write transaction. `BEGIN IMMEDIATE` serializes the head check and write. The transaction checks expected sequence, optional expected Run revision, current fencing token, and globally unique event IDs before atomically updating the head, events, and idempotency result.

Reads verify stream scope, sequence continuity, JSON integrity, and canonical payload hash. SQLite `quick_check` supplies provider health.

## Migration

The adapter creates migration version 1 idempotently. Existing legacy `framework_events` tables may coexist in the same database, but their rows are not automatically imported. Legacy rows do not contain enough trusted information to infer user scope, sequence, revision, fencing, and idempotency guarantees. A later explicit migration tool must require scope mapping and produce a verifiable import report.

## Consequences

- Local Runtime streams survive process restart with the same append semantics as the in-memory reference implementation.
- Missing or stale fencing tokens cannot mutate an already fenced stream.
- Identical append retries return their original result; changed input with the same key is rejected.
- Corrupted JSON or payload hashes fail reads with `RUNTIME_EVENT_STREAM_CORRUPT`.
- PostgreSQL and the remaining durable checkpoint, wait, queue, inbox/outbox, lease, and claim adapters remain separate R2 work.
