# WorkCache

`@hypha/workcache` is a typed runtime cache that consumes Hypha events and
materializes reusable `CacheBlock` records. It is not the source of truth:
DomainPack, Session, Run, and Event semantics stay unchanged, and replay,
audit, regression, and projections still derive from events.

## Runtime Type Alignment

WorkCache V1 maps only current `FrameworkEventType` values by default.
Unknown events are ignored or rejected according to `unknownEventPolicy`; they
are not accepted as source events unless extension events are explicitly
enabled.

| Source events | Work node | Primary tree |
| --- | --- | --- |
| `agent.reasoning.completed`, `thinking.completed`, `agent.deliberation.completed`, `reasoning.decision.recorded` | `plan` | `PlanTree` |
| `inference.completed`, `model.call.completed` | `computation` | `ComputationTree` |
| `tool.call.completed`, `mcp.call.completed` | `tool` | `ToolTree` |
| `context.build.completed`, `context.compacted` | `observation` | `ObservationTree` |
| `eval.completed`, `regression.completed` | `verification` | `VerificationTree` |
| `memory.read.completed`, `memory.write.committed` | `memory` | `MemoryTree` |
| `llm.cache.write` with prompt prefix metadata | `prompt_prefix` | `PromptPrefixTree` |

`MessageTree` and `KVPrefixTree` are not V1 roots. PromptPrefixTree only
materializes stable prefix content; it does not manage provider KV cache.

## Core Exports

| Export | Purpose |
| --- | --- |
| `RuntimeTypeDefinition` | Source event to work node/tree alignment plus materializer. |
| `NormalizedWorkEvent` | Event payload normalized for a primary tree. |
| `WorkGraphNode`, `WorkGraphEdge` | Graph-compatible node and dependency metadata. |
| `CacheBlock<T>` | Typed cache artifact with validity, provenance, utility, and source event linkage. |
| `CacheTree<T>`, `TypedCacheForest` | Tree lookup/write/invalidation over a shared store. |
| `WorkCacheManager` | Ingests events, enforces TTL/validity, and emits audit events. |
| `WorkCachePolicy` | Store mode, prompt budget, unknown-event behavior, and per-tree TTLs. |

## Stores

`MemoryWorkCacheStore` is for local runs and tests. `SQLiteWorkCacheStore`
persists `workcache_blocks` with `id`, `tree_type`, `node_type`, `cache_key`,
serialized block JSON, timestamps, expiry, and source event linkage.

Configure the server with:

```bash
HYPHA_WORKCACHE=off
HYPHA_WORKCACHE=memory
HYPHA_WORKCACHE=sqlite
HYPHA_WORKCACHE_SQLITE_PATH=./data/runtime/cache/hypha-workcache.sqlite
HYPHA_WORKCACHE_PROMPT_BUDGET_TOKENS=4096
```

## Reuse Rules

Tool result reuse is conservative. Tool blocks are written only when the source
event declares read-only side effects, stable args, permission scope, and
validity or provenance hashes. Verification blocks require source, test, and
environment hashes or an equivalent validity proof. Observation blocks
invalidate when provenance or content hashes change.

## Audit Events

WorkCache may append derived audit events after the source event:

| Event | Meaning |
| --- | --- |
| `workcache.lookup` | A tree lookup was attempted for a source event. |
| `workcache.hit` | A fresh block with matching validity was reused. |
| `workcache.miss` | No block existed, or the block expired/was invalid. |
| `workcache.write` | A new block was stored. |
| `workcache.invalidate` | A stale, expired, or changed-validity block was removed. |
| `workcache.bypass` | The source event was known but not safe to cache. |
| `workcache.prefix.materialized` | Stable prefix content was assembled from PromptPrefixTree. |

Each audit payload includes `sourceEventId`, `sourceEventType`, `treeType`,
`blockId`, and `cacheKey`.
