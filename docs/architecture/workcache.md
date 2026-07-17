# WorkCache

`@hypha/workcache` is a typed runtime cache that consumes Hypha events and
materializes reusable `CacheBlock` records. It is not the source of truth:
DomainPack, Session, Run, and Event semantics stay unchanged, and replay,
audit, regression, and projections still derive from events.

Recovery outcomes use the same boundary. `RecoveryTree` stores revision-safe
strategy knowledge derived from recovery events; it never marks an FSM case
complete or replaces a durable receipt.

## Runtime Type Alignment

WorkCache V1 maps only current `FrameworkEventType` values by default.
Unknown events are ignored or rejected according to `unknownEventPolicy`; they
are not accepted as source events unless extension events are explicitly
enabled.

| Source events                                                                                                    | Work node       | Primary tree       |
| ---------------------------------------------------------------------------------------------------------------- | --------------- | ------------------ |
| `agent.reasoning.completed`, `thinking.completed`, `agent.deliberation.completed`, `reasoning.decision.recorded` | `plan`          | `PlanTree`         |
| `inference.completed`, `model.call.completed`                                                                    | `computation`   | `ComputationTree`  |
| `tool.call.completed`, `mcp.call.completed`                                                                      | `tool`          | `ToolTree`         |
| `context.build.completed`, `context.compacted`                                                                   | `observation`   | `ObservationTree`  |
| `message.enqueued`, `message.delivered`, `message.acknowledged`, `message.failed`, `message.dead_lettered`       | `observation`   | `ObservationTree`  |
| `eval.completed`, `regression.completed`                                                                         | `verification`  | `VerificationTree` |
| `memory.read.completed`, `memory.write.committed`                                                                | `memory`        | `MemoryTree`       |
| `recovery.attempt.completed`, `recovery.case.resolved`, `recovery.case.escalated`                                | `recovery`      | `RecoveryTree`     |
| `llm.cache.write` with prompt prefix metadata                                                                    | `prompt_prefix` | `PromptPrefixTree` |

`MessageTree` and `KVPrefixTree` are not V1 roots. PromptPrefixTree stores
stable prompt blocks and can materialize a logical prefix string; it does not
manage provider KV cache.

## Core Exports

| Export                                                        | Purpose                                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `RuntimeTypeDefinition`                                       | Source event to work node/tree alignment plus materializer.                        |
| `NormalizedWorkEvent`                                         | Event payload normalized for a primary tree.                                       |
| `WorkGraphNode`, `WorkGraphEdge`, `WorkGraph`, `DemandSignal` | Event-derived scheduling graph, typed dependencies, and cache demand signals.      |
| `CacheBlock<T>`                                               | Typed cache artifact with validity, provenance, utility, and source event linkage. |
| `CacheTree<T>`, `TypedCacheForest`                            | Tree lookup/write/invalidation over a shared store.                                |
| `WorkCacheManager`                                            | Ingests events, enforces TTL/validity, and emits audit events.                     |
| `WorkCachePolicy`                                             | Store mode, prompt budget, unknown-event behavior, and per-tree TTLs.              |
| `WorkCacheRecoveryKnowledgeStore`                             | `RecoveryKnowledgePort` backed by revision-safe `RecoveryTree` blocks.             |

## Work Graph and Tree Updates

WorkCache updates follow three rules:

- `event-first`: source runtime events are recorded before WorkCache ingests them.
- `graph-derived`: each normalized source event becomes a typed `WorkGraphNode`, dependency `WorkGraphEdge` records are derived from payload references/provenance/cache links, and `DemandSignal` scores are computed from proximity, recompute cost, fanout, criticality, staleness risk, and validation cost.
- `tree-local`: each `CacheTree` only updates blocks in its own tree. Demand signals update block utility and hot-index priority; they do not mutate source events or agent state.

The graph is a scheduling view over events, computations, and cache blocks. It
is rebuildable by replaying source events through `WorkCacheManager.ingest()`.
It is not a second event log and it does not introduce additional runtime
event names.

## Stores

`MemoryWorkCacheStore` is for local runs and tests. `SQLiteWorkCacheStore`
persists `workcache_blocks` with `id`, `tree_type`, `node_type`, `cache_key`,
serialized block JSON, timestamps, expiry, and source event linkage.
`HotIndexedWorkCacheStore` wraps either store and keeps an in-process index by
block id and tree/cache key. Runtime lookup checks the hot index first, writes
through to the backing store, and evicts low-utility entries by demand score and
last update time.

The intended runtime layout is:

```text
source events in event log
  -> WorkGraphIndex and DemandSignal in CPU memory
  -> HotIndexedWorkCacheStore in CPU memory
  -> MemoryWorkCacheStore or SQLiteWorkCacheStore backing store
```

SQLite mode gives persistent cache trees; the event log remains the rebuild
source of truth. Current-run graph and tree updates happen synchronously so a
fresh block can be reused immediately. More expensive maintenance such as
global pruning, graph compaction, or cross-run rebuilds should run behind the
same store and graph interfaces without blocking an agent step.

Configure the server with:

```bash
HYPHA_WORKCACHE=off
HYPHA_WORKCACHE=memory  # bundled server default
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

PromptPrefixTree reuse is block-level. `llm.cache.write` prefix metadata is
split into stable blocks such as `system`, `tool-schema`, `prompt-template`,
`project-context`, `domain-pack`, and `memory`. Each block is keyed by
`prefixHash`, block type/id, and block hash, and stores the block content plus
ordering/template metadata. Dynamic suffix hashes and request ids are trace
metadata only; they do not invalidate stable prefix blocks. A template content
or version change should produce a new block hash and therefore a new block.

Recovery knowledge is keyed by failure fingerprint, participant id, and
policy/spec/provider revisions. `WorkCacheManager.getRecoveryKnowledgePort()`
stores verified and negative outcomes with an evidence hash and TTL. Lookup
removes expired entries; a new revision removes stale entries for the same
failure and participant. The recovery supervisor still revalidates every hit
and uses only a verified strategy for a handler declared by the current
participant. Negative knowledge records a failed strategy but does not
authorize a different side effect.

## Audit Events

WorkCache may append derived audit events after the source event:

| Event                           | Meaning                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `workcache.lookup`              | A tree lookup was attempted for a source event.            |
| `workcache.hit`                 | A fresh block with matching validity was reused.           |
| `workcache.miss`                | No block existed, or the block expired/was invalid.        |
| `workcache.write`               | A new block was stored.                                    |
| `workcache.invalidate`          | A stale, expired, or changed-validity block was removed.   |
| `workcache.bypass`              | The source event was known but not safe to cache.          |
| `workcache.prefix.materialized` | Stable prefix content was assembled from PromptPrefixTree. |

Each audit payload includes `sourceEventId`, `sourceEventType`, `treeType`,
`blockId`, and `cacheKey`.
