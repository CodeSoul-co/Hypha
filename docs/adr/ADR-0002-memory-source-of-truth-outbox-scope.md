# ADR 0002: Memory Source of Truth, Outbox, Consistency, and Scope

## Status

Accepted

## Context

Memory management spans authoritative records, versions, ephemeral working state, semantic indexes, and runtime events. Treating all of these as interchangeable providers would make deletion, replay, isolation, and recovery ambiguous. The M0-M3 implementation also needs deterministic behavior locally without assigning Runtime, EventStore, or business responsibilities to the Memory Owner.

## Decision

### Authoritative state

The structured `ManagedMemoryRecordStore` is the source of truth for current records, immutable versions, lifecycle status, provenance, relations, and tombstones. The local persistent target is the existing `SQLiteStructuredStore` through `StructuredStoreProvider`; in-memory implementations are test and development substitutes.

Vector stores contain rebuildable embeddings and filter metadata only. They never own the authoritative memory content or version history. Working-memory stores contain TTL-bound ephemeral values and are not promoted to long-term truth implicitly.

### Local implementation choices

Hypha keeps the repository's existing local choices: `node:sqlite` when available with the existing `better-sqlite3` compatibility fallback, and the existing file-backed local vector provider. This ADR adds no dependency and no provider-specific value to a business or memory profile. The in-memory vector adapter remains a deterministic M2 test primitive, not a production source of truth.

### Write and outbox consistency

A governed write has one logical commit boundary for the structured record/version and its index-outbox intent. The record is committed before it is considered available to retrieval. Vector indexing runs asynchronously from a leased, idempotent outbox worker.

An index failure does not roll back or delete the authoritative record. The outbox records retry state, normalized failure details, and dead-letter state. The vector index can be rebuilt from structured records. Persistent deployments must bind the record and outbox stores to the same transaction-capable backing or provide an equivalent atomic unit of work; an adapter that cannot provide this guarantee must report degraded capability rather than claim durable atomic writes.

Lifecycle/event publication follows the same rule when an EventStore cannot share the transaction: publish through the Runtime-owned event path or a durable event outbox. Memory does not create a second EventStore.

### Scope and principal

Every governed operation carries both a `MemoryPrincipal` and an explicit `ManagedMemoryScope`. Scope identity is derived from canonical ordered fields and stored as a stable hash. Tenant and user boundaries are mandatory for long-term records; workspace, session, run, and agent fields narrow access further.

Store reads, writes, version lookup, deletion, index metadata filters, working-memory keys, idempotency keys, and retrieval caches must include the scope boundary. A caller-supplied hash is never trusted without validating it against the structured scope. Cross-scope lookup returns no record rather than revealing existence.

### Management boundary

`MemoryManager` is the public memory facade. It delegates managed request-object operations to a `MemoryManagementProvider`; storage ports remain internal dependencies of providers and workers. Existing legacy method signatures remain temporarily for kernel compatibility, but new integrations must not bypass the manager to call stores.

### Event ownership

Memory owns event names, safe payload fields, sanitization, and idempotency-key derivation. It exposes a `MemoryEventPublisher` port only. Runtime Owner owns the EventRuntime, event sequencing, persistence, replay integration, and cancellation semantics.

## Consequences

- A structured write may succeed while its semantic index is pending, retrying, or dead-lettered; callers can observe this through index job state.
- Retrieval remains correct under index failure by using structured candidates and explicit degraded behavior.
- Deletion and invalidation must update structured truth first and enqueue index cleanup.
- Scope isolation is enforced consistently across records, versions, outbox jobs, working memory, and retrieval.
- External management providers and additional vector backends remain M4 work.
- Canonical Runtime/Domain/Cache/EventStore integration remains M5 work and requires the corresponding owners.
