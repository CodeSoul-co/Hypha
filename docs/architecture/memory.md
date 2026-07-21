# Governed Memory Architecture

`@hypha/memory` provides provider-neutral contracts for durable, scoped memory and bounded model
context. Memory remains persisted state; context is a per-call view assembled from authorized
sources. Domain Packs select versioned profiles, while Runtime and Harness own policy, events,
recovery, replay, and cache invalidation around every operation.

## Public Contract Layers

| Layer       | Main contracts                                          | Responsibility                                                                                                                                  |
| ----------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile     | `MemoryProfileSpec`                                     | Provider, record/vector/artifact stores, scope, retrieval, write, retention, privacy, indexing, fallback, and context references.               |
| Operation   | `MemoryManagementProvider`, `MemoryManager`             | Scoped add, search, get, list, optimistic update, delete, history, capabilities, health, and close.                                             |
| Record      | `ManagedMemoryRecord`                                   | Versioned content, explicit scope and scope hash, provenance, visibility, status, relations, index state, and content hash.                     |
| Persistence | `MemoryPersistenceUnitOfWork`                           | Atomic record/version and index-outbox mutation with declared durability capabilities.                                                          |
| Retrieval   | `MemoryRetrievalPipeline`                               | Candidate generation, hard authorization filters, deterministic score fusion, stable tie-breaks, snapshots, and explanations.                   |
| Context     | `MemoryContextBuilder`, `ContextSourceResolverRegistry` | Resolve sources, enforce policy and token budgets, compact deterministically, preserve provenance, and inject data with instruction boundaries. |
| Integration | `MemoryActivityPort`, `MemoryActivityHarnessHook`       | Policy decision, provider call, trace, cache validity, replay, evaluation, and Domain/Workflow binding.                                         |

All managed operations carry an `operationId`, `MemoryPrincipal`, `ManagedMemoryScope`, and the
relevant profile reference. Scope hashes are derived from the explicit tenant, user, workspace,
project, session, run, agent, and Domain Pack dimensions. A record is never selected merely because
its provider returns a matching id or vector.

## Write and Index Flow

`NativeMemoryManagementProvider` applies scoped idempotency and deterministic maintenance planning
before a mutation. New content either creates a record, creates a compare-and-set version, reuses an
existing canonical record, requires review, or is rejected. The record mutation and its index job
are committed through one `MemoryPersistenceUnitOfWork` transaction.

Vector indexing is asynchronous when a profile selects `async_outbox`. `IndexOutboxWorker` leases
jobs, embeds the exact record version, writes only the declared vector stores, retries with a bounded
attempt budget, and dead-letters exhausted jobs without deleting the structured source record.
Hard deletion removes both the current record and its version history; soft deletion creates a
revisioned tombstone. Vector deletion remains an outbox action so structured state is the source of
truth during recovery.

Local and self-hosted deployments can use `StructuredMemoryPersistenceUnitOfWork` over a
transactional `StructuredStoreProvider`. `InMemoryMemoryPersistenceUnitOfWork` is deterministic and
atomic for tests but declares `durable: false`.
`StructuredMemoryExtractionStateStore` persists extraction jobs, batches, and compare-and-set
cursors. `StructuredMemoryLifecycleTaskStore` persists leased lifecycle and provider reconciliation
tasks so expired work can be reclaimed after a process restart. The in-memory state and task stores
remain test fixtures rather than production recovery stores.

## Retrieval and Context Safety

The default retrieval pipeline rejects principal/scope mismatches before ranking. It also applies
status, validity, type, source, visibility, policy, and deletion filters before deterministic score
fusion. Returned results include a retrieval snapshot and explanation so replay and evaluation can
identify which candidates, policy revision, profile revision, and ranking configuration were used.

`DefaultMemoryContextBuilder` converts authorized records and other registered sources into bounded
context items. It applies per-source and total token limits, explicit truncation/compaction policy,
deduplication, stable ordering, sensitivity handling, and provenance. `DefaultContextInjectionGateway`
keeps memory data separate from developer or system instructions; model-visible text is not treated
as executable policy.

## External Providers

`ExternalMemoryManagementAdapter` keeps provider-specific transport and payloads behind the common
management contract. `Mem0RestClient` maps Hypha scope dimensions to Mem0 metadata and discards
responses whose returned scope hash does not match the request. External mutations are not retried
after a write may have started unless reconciliation proves that replay is safe. MemoryBank-specific
policy remains adapter configuration rather than a Core or Domain abstraction.

## Events, Cache, Replay, and Domain Binding

Memory activity emits bounded reference events such as `memory.read.requested`,
`memory.read.completed`, `memory.write.requested`, `memory.write.committed`,
`memory.write.rejected`, index lifecycle events, and maintenance worker events. Event payloads omit
raw memory bodies, embeddings, credentials, and connection strings.

Domain and Workflow bindings use versioned memory/context profile references. The Domain compiler's
dependency snapshot includes the selected profiles in its deterministic hash. Cache validity binds
record version, content hash, profile/policy revision, provider revision, and scope; a mismatch
invalidates reuse. Replay stores references and snapshots rather than consulting mutable current
memory as if it were historical truth.

`CachedMemoryManagementProvider` is the optional read-through adapter for managed search. It hashes
the full principal permission boundary, scope, profile revision, provider revision, query, filters,
retrieval options, and pagination without placing raw query text or embeddings in the Store key.
Only searches with `updateAccessStats: false` are reusable; searches that may mutate access counters
always reach the Memory provider. Add, update, and delete operations execute against the source
provider first and then invalidate every cached query in the same scope. Cache Store timeouts,
oversized records, and trace failures bypass by default, while a provider failure is never retried by
the Cache adapter. Every scope has a monotonic cache revision. A successful mutation advances that
revision before old keys are removed, so a search that overlaps the mutation cannot publish a stale
result; one bounded retry recomputes against the new revision. Failed invalidation quarantines the
scope locally and is retried before another lookup instead of serving the prior view.

`InMemoryMemorySearchCacheStore` supplies bounded local storage.
`RedisMemorySearchCacheStore` supplies key-bound, TTL-limited shared storage for local,
self-hosted, or managed Redis. Both enforce the same record schema, hard scope, scope revision, size,
and physical/logical key rules.

## Minimal Managed Provider

```ts
import {
  DefaultMemoryActivityPort,
  GovernedMemoryManager,
  NativeMemoryManagementProvider,
  memoryProfileSpecExample,
  registerMemoryManagementProviderHandlers,
} from '@hypha/memory';

const provider = new NativeMemoryManagementProvider({ profile: memoryProfileSpecExample });
const activities = new DefaultMemoryActivityPort({ policy, events, harness });
registerMemoryManagementProviderHandlers(activities, provider);
const memory = new GovernedMemoryManager({
  activities,
  profileRef: memoryProfileSpecExample,
  eventContext: (request) => ({
    runId: request.scope.runId ?? request.operationId,
    workspaceId: request.scope.workspaceId,
  }),
});

await memory.add({
  operationId: 'memory:add:preference',
  principal: {
    principalId: 'user:owner',
    type: 'user',
    userId: 'owner',
    permissionScopes: ['memory:write'],
  },
  scope: { userId: 'owner', workspaceId: 'workspace:default' },
  input: { responseStyle: 'concise' },
  memoryType: 'preference',
  source: { type: 'user_message', sourceId: 'message:1' },
  profileRef: { id: memoryProfileSpecExample.id, version: memoryProfileSpecExample.version },
  idempotencyKey: 'preference:response-style:v1',
});
```

`GovernedMemoryManager` is the canonical managed API. Production assembly must supply policy,
harness, event, persistence, provider health, and external receipt hooks required by the selected
profile. The legacy `MemoryManager` remains only as a compatibility surface while consumers migrate.
Direct provider or store writes bypassing those boundaries are not framework-compliant. See the
[Managed Memory migration guide](../guides/memory-managed-migration.md).
