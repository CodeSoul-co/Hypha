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
last update time. Hot and Redis indexes verify their tree/key binding before a
hit; stale aliases are removed instead of returning a differently keyed block.

The intended runtime layout is:

```text
source events in event log
  -> WorkGraphIndex and DemandSignal in CPU memory
  -> HotIndexedWorkCacheStore in CPU memory
  -> MemoryWorkCacheStore, SQLiteWorkCacheStore, or RedisWorkCacheStore
```

SQLite and Redis modes give persistent or shared cache trees; the event log
remains the rebuild source of truth. Cache blocks and keys include tenant,
user, workspace, session, agent, and DomainPack scope where available. The
default policy requires `userId`. Unscoped events bypass caching, scope
mismatches miss, and `validity.status=unknown` is never reusable.

Configure the server with:

```bash
HYPHA_WORKCACHE=off
HYPHA_WORKCACHE=memory  # bundled server default
HYPHA_WORKCACHE=sqlite
HYPHA_WORKCACHE=redis
HYPHA_WORKCACHE_SQLITE_PATH=./data/runtime/cache/hypha-workcache.sqlite
HYPHA_WORKCACHE_PROMPT_BUDGET_TOKENS=4096
HYPHA_WORKCACHE_FAILURE_MODE=bypass
HYPHA_WORKCACHE_SCOPE_REQUIREMENT=user
```

Memory and tree stores enforce configured entry and byte limits. WorkGraph
history and demand signals are also bounded. Redis mode publishes versioned
invalidation messages so peer hot indexes cannot continue serving a deleted
block; Redis index replacement and deletion use atomic operations when the
client supports them. Store calls are time-bounded and optional cache failures
do not change the source event, inference result, or recovery outcome.
Thinking Cache also requires the configured WorkCache scope before it can use
its in-process singleflight map, so an unscoped request cannot be coalesced with
another request even when no persistent write occurs.

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

Recovery knowledge is keyed by tenant/user/workspace/session/agent/DomainPack
scope, failure fingerprint, participant id, and policy/spec/provider revisions.
`WorkCacheManager.getRecoveryKnowledgePort()` validates scoped knowledge with
the Core runtime schema before persistence and removes malformed legacy blocks.
A new revision removes stale entries only inside the same scope; invalidation
cannot remove another user's hint. The recovery supervisor still revalidates
every hit and uses only a verified strategy for a handler declared by the
current participant. Negative knowledge records a failed strategy but does not
authorize a different side effect. Store outages bypass recovery hints rather
than interrupting the recovery supervisor.

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
