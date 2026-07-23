# Native Memory deployment and operations

This guide describes the supported deployment boundaries and operational checks for Hypha Native
Memory. It does not replace environment-specific Redis, MongoDB, vector-store, or artifact-store
runbooks.

## Deployment profiles

### `native-lite`

Use `native-lite` for an offline or single-process deployment:

```text
working state: bounded in-memory store
record/history: SQLite
vector: local in-memory adapter
artifact: local filesystem
coordination: single process
```

Do not run more than one writer process against this profile. Its working state and local vector
index are process-local even though structured records are durable.

### `native-default`

Use `native-default` when Redis and MongoDB are available:

```text
working state: Redis
record/history/outbox/coordination: MongoDB
vector: configured adapter
artifact: configured adapter
coordination: fenced distributed contract
```

The default repository profile uses a local vector adapter, so it is not a high-availability profile.
A deployment must provide a shared, multi-instance-safe vector store and shared artifact storage before
making an HA claim.

## Startup checks

Before accepting traffic:

1. Load `configs/memory-profiles.yaml` through `CanonicalMemoryRuntimeLoader`.
2. Resolve every connection, secret, Store, Vector, Artifact, and Embedding reference.
3. Verify the selected Provider factory is unique and its negotiated capabilities satisfy the profile.
4. Initialize required structured-store indexes and confirm transaction support.
5. Check Redis, MongoDB, vector, artifact, and embedding dependencies.
6. Start the supervised outbox and lifecycle workers.
7. Publish readiness only after runtime health and worker state are healthy.

Startup must fail closed when a required reference, transaction capability, Provider, or dependency is
missing. It must not silently fall back to another profile.

## Multi-instance safety

Every leased lifecycle or outbox record carries an attempt-specific lease token. Completion and
failure updates must verify the current owner and token inside the store transaction. A worker whose
lease expired may finish local computation, but it must not commit over a newer owner.

An environment that runs multiple instances must verify:

- only one worker owns a claim at a time;
- takeover occurs only after lease expiry;
- stale-owner completion and failure updates are rejected;
- task, outbox, idempotency, mapping, and operation state survive restart;
- provider side effects are reconciled after an unknown outcome instead of blindly repeated;
- scope isolation remains intact during concurrent work;
- shared vector and artifact stores are used by every instance.

## Readiness and health

Expose dependency states separately so operators can distinguish configuration, Store, Provider, and
worker failures. A degraded optional projection must not be reported as a healthy source of truth.
Readiness should be removed when a required Provider or Store cannot safely accept new work.

At minimum, monitor:

- Redis and MongoDB availability and latency;
- structured-store transaction capability;
- worker state, lease age, takeover count, and stale-owner rejection;
- outbox backlog, retry budget, quarantine, and DLQ size;
- Provider operation/event reconciliation age;
- duplicate side-effect detection;
- shutdown drain duration and incomplete work.

## Shutdown and rolling restart

A graceful shutdown follows this order:

1. stop accepting new requests;
2. stop scheduling new worker claims;
3. drain in-flight Provider operations within a bounded deadline;
4. persist uncertain outcomes for reconciliation;
5. stop lifecycle and outbox workers;
6. close Provider transports, Store clients, timers, and other resources.

A process must never report a successful drain while supervised workers or Provider pollers remain
open. Rolling restarts should preserve enough healthy instances to service reads and reconciliation.

## Failure and recovery checks

Before enabling multi-instance traffic, exercise:

- Redis or MongoDB interruption and recovery;
- process termination while holding a lease;
- process termination after a Provider side effect but before local commit;
- network partition and delayed responses;
- rolling drain and restart under sustained traffic;
- mapping, outbox, operation-journal, and idempotency recovery;
- Cache enabled and disabled with identical Memory side-effect semantics.

Record dependency versions, topology, fault-injection method, timestamps, skipped cases, duplicate
side effects, lease takeovers, recovery duration, drain duration, and cleanup results. A skipped
partition or Provider-side-effect case is not a pass.

## High-availability boundary

Do not describe `native-default` as HA until a release environment has verified at least two
independent processes with real shared dependencies, a shared vector store, network-partition
recovery, Provider-side-effect reconciliation, rolling drain, and measured readiness/recovery SLOs.
Until then, use the status `framework-validated-non-ha`.
