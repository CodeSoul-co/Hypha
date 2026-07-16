# RFC: Memory and Context Foundation (M0-M3)

## Status

Accepted for implementation on the `memory` source branch. Integration into `dev` remains subject to review and the repository merge rules.

## Summary

This RFC defines the M0-M3 checkpoint for Hypha's memory and context foundation. It introduces governed memory contracts, a native management provider, extraction and lifecycle primitives, durable-index outbox contracts, deterministic retrieval, and a single context injection boundary. It deliberately excludes external memory providers and canonical Runtime/Domain/Cache integration.

The repository baseline is the existing npm-workspaces monorepo. No package, workspace, package manager, or release boundary is added.

## Baseline Audit

| Existing area                                                                                             | Decision for M0-M3                                                                                       | Reason                                                                                             |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `packages/memory` legacy `MemorySpec`, `MemoryProvider`, and `MemoryManager`                              | Retain as compatibility API; extend the existing `MemoryManager` to front the governed provider contract | Existing kernel consumers must keep compiling while managed operations gain one public entry point |
| `StructuredStoreProvider`, `VectorIndexProvider`, and local adapters                                      | Retain and adapt behind memory-owned store interfaces                                                    | Storage mechanics must not become memory-management semantics                                      |
| `packages/adapters-local` SQLite and local-vector implementations                                         | Retain; add only operations required by the memory store contracts                                       | Reuses the repository's existing local storage boundary                                            |
| Agent- or business-specific memory behavior                                                               | Do not add; migrate later through profiles and the canonical runtime                                     | M0-M3 is framework substrate only                                                                  |
| Mem0, MemoryBank, provider fallback, circuit breakers, and second vector adapter                          | Exclude from this checkpoint                                                                             | These are M4                                                                                       |
| Domain bindings, Runtime activities, inference bridge, cache validity, replay hooks, and evaluation hooks | Exclude from this checkpoint                                                                             | These are M5                                                                                       |
| Memory-owned EventRuntime or EventStore                                                                   | Delete from the checkpoint; expose payloads and a publisher port only                                    | Runtime Owner owns event execution and persistence                                                 |

## Scope

### M0: architecture and contracts

- Provider/store separation, source-of-truth and consistency decisions.
- Dependency direction and owner boundaries.
- TypeScript types, Zod schemas, JSON schemas, examples, and contract fixtures.
- Event types, safe payloads, and idempotency keys without a second event runtime.

### M1: core contracts

- `MemoryProfileSpec`, provider/store references, and capability declarations.
- Versioned `ManagedMemoryRecord`, scope, principal, source, visibility, and provenance.
- Add/search/get/list/update/delete/history request and result contracts.
- Normalized errors and contract tests.

### M2: native memory

- The existing `MemoryManager` as the public facade for legacy and governed providers.
- Native management provider, record/version stores, idempotency, pre-write maintenance planning, extraction jobs/cursors/batches, working-memory TTL stores, index outbox, lifecycle workers, and local vector primitives.
- Memory defines event semantics and a publisher port; Runtime remains responsible for the EventRuntime and EventStore.

### M3: context construction

- Source resolution, scope/policy hard filtering, deduplication, candidate generation, score fusion, deterministic ranking, and explanations.
- Budgeting, truncation/compaction, provenance, stable context hashes, and one `ContextInjectionGateway` boundary.

## Provider and Store Separation

```text
caller
  |
  v
MemoryManager
  |
  v
MemoryManagementProvider (native in M2; external providers are M4)
  |-- extraction / maintenance / lifecycle semantics
  |-- retrieval orchestration and explanations
  |
  +--> ManagedMemoryRecordStore ----> StructuredStoreProvider ----> SQLite/local backing
  +--> MemoryIndexOutboxStore ------> index worker -------------> local vector index
  +--> WorkingMemoryStore ----------> in-memory or Redis-compatible client

ContextInjectionGateway
  |
  v
ContextBuilder --> source resolvers --> policy/dedup/ranking/budget --> ContextEnvelope
```

A management provider decides how memory is extracted, governed, versioned, maintained, and retrieved. A store only persists records, ephemeral values, or rebuildable index points. A vector index never owns the authoritative memory body.

## Dependency Direction

```text
@hypha/core contracts and framework events
        |
        v
@hypha/memory contracts -> schemas -> stores -> native provider/retrieval/context
        ^
        |
@hypha/adapters-local implements storage ports

future Runtime/Domain/Inference/Cache integrations -> import memory contracts (M5)
@hypha/memory -X-> Runtime state machines, EventStore, server handlers, or business packs
```

The memory package must not import `@hypha/adapters-local`; concrete adapters are injected from composition roots. Shared contracts flow outward, and owner modules do not get reimplemented inside memory.

## Public Contract Shape

All governed operations enter through `MemoryManager` and delegate to `MemoryManagementProvider`:

```text
capabilities
add / get / list / search
update / delete / history
health / close
```

The legacy facade methods remain for current kernel compatibility. New managed call sites use request objects containing `operationId`, `principal`, `scope`, and the relevant profile reference. Provider-specific configuration and credentials do not enter the public requests.

## Native Write and Index Flow

```text
request
  -> validate profile, principal, scope, provenance and policy inputs
  -> idempotency lookup
  -> pre-write lookup and maintenance decision
  -> record/version plus index-outbox commit boundary
  -> return committed structured record
  -> leased outbox worker embeds and updates the vector index
  -> retry, partial state, or dead letter without deleting the source record
```

Structured data is authoritative. Index failure is observable and retryable; it cannot erase or silently replace the structured record.

## Retrieval and Context Flow

```text
normalized query
  -> scope and policy hard filters
  -> structured/keyword/local-vector candidate generators
  -> deterministic normalization and score fusion
  -> stable tie-break and explanation snapshot
  -> context source resolution
  -> deduplication and ranking
  -> token budget and truncation/compaction
  -> provenance-bearing ContextEnvelope
  -> ContextInjectionGateway
```

The gateway is the only supported model-input boundary. Consumers must not query a memory store and append raw content to prompts.

## Compatibility and Migration

- No new npm package or workspace is introduced.
- Existing kernel uses of the legacy `MemoryManager` signatures continue to compile.
- New managed providers are passed to the same manager and use request-object overloads.
- Existing storage adapters remain storage adapters; no provider SDK leaks into memory contracts.
- M5 will migrate canonical runtime callers to the managed request-object API after owner review.

## Verification Required for This Checkpoint

- Schema and JSON-schema fixtures validate.
- Scope isolation, idempotent add, optimistic revision conflict, history, and outbox behavior pass.
- Extraction cursor restart, lifecycle retry/dead-letter, and working-memory TTL pass.
- Retrieval hard filters, stable ranking, explanations, context budgets, provenance, hashes, and the injection gateway pass.
- `typecheck`, `lint`, package builds, package tests, and diff checks pass, apart from documented environment-only baseline failures.

## Deferred Work

- M4: Mem0, MemoryBank, multiple production vector adapters, capability fallback, circuit breaker, and remote health behavior.
- M5: Domain profile registration, Runtime activities/events, inference integration, cache validity, replay references, and evaluation hooks.
- M6: independent business demos, migration guide, final operational report, and post-merge regression.
