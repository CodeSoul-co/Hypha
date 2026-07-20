# Serving Cache Layer

Hypha Serving Cache is a lightweight middleware around `ModelProvider.generate()`.
It caches exact LLM API responses and records prompt prefix metadata without
changing ReAct, FSM, DomainPack, Session, Run, or Event semantics.

It also records provider-side prefix cache shape. Hypha does not own the
physical provider prefix cache; it keeps the rendered prefix stable, canonicalizes
tool schemas, and records provider-reported cached/missed prompt tokens when the
provider exposes them.

## Placement

```text
Agent / Workflow / Domain Pack
        |
Hypha Runtime
        |
ModelProvider / LLMClient
        |
ServingCache
        |
ProviderAdapter
        |
OpenAI / Anthropic / DeepSeek / Qwen / Gemini
```

The cache is provider-call middleware. Domain Packs do not need to know it
exists, and agent run/step/action interfaces are unchanged.

## Request Key

Exact response keys are deterministic hashes over:

| Field        | Description                                              |
| ------------ | -------------------------------------------------------- |
| `provider`   | Resolved provider id, such as `openai` or `deepseek`.    |
| `model`      | Resolved model alias/id used by the request.             |
| `system`     | System prompt plus cache prefix content when supplied.   |
| `messages`   | Normalized request messages or structured input.         |
| `tools`      | Canonicalized tool/function schemas.                     |
| `params`     | Generation params such as temperature and max tokens.    |
| `cacheScope` | Optional tenant, user, project, session, DomainPack ids. |

`undefined`, timestamps, request ids, and random values are excluded. Object
keys are sorted, and tool schemas are sorted by stable id/name before hashing.
OpenAI-compatible provider requests also export tool schemas in sorted provider
name order so the byte shape sent to the model is stable.

## Provider Prefix Cache Shape

`PrefixCacheShapeTracker` compares the current stable prefix with the previous
request for the same provider/model/scope. Trace payloads may include:

| Field | Description |
| --- | --- |
| `prefixHash` | Hash of stable prompt blocks. |
| `toolSchemaHash` | Hash of canonicalized tool schemas. |
| `domainPackHash` | Hash of DomainPack scope when present. |
| `dynamicSuffixHash` | Hash of current turn messages/input. |
| `stablePrefixChanged` | Whether provider-side prefix reuse is likely reset. |
| `dynamicSuffixChanged` | Whether only the dynamic suffix changed. |
| `changedReasons` | `first_request`, `prefix_changed`, `tool_schema_changed`, `domain_pack_changed`, `dynamic_suffix_changed`, or `unchanged`. |

Provider usage is normalized into `cacheHitTokens` and `cacheMissTokens`.
DeepSeek-style `prompt_cache_hit_tokens` and `prompt_cache_miss_tokens`, plus
OpenAI-style `prompt_tokens_details.cached_tokens`, are mapped into Hypha usage
fields and surfaced under `servingCache.providerPrefixCache`.

## Policy

`CachePolicy` fields:

| Field                | Default     | Description                                                   |
| -------------------- | ----------- | ------------------------------------------------------------- |
| `enabled`            | `false`     | Enables the middleware.                                       |
| `mode`               | `readwrite` | One of `off`, `read`, `write`, or `readwrite`.                |
| `ttlMs`              | `86400000`  | Entry TTL. Omit for no expiration.                            |
| `respectNoCache`     | `true`      | Honors per-request no-cache metadata.                         |
| `failureMode`        | `bypass`    | Bypasses an unavailable cache or throws in `strict` mode.     |
| `scopeRequirement`   | `user`      | Requires no scope, a user, or both a user and session.        |
| `operationTimeoutMs` | `250`       | Bounds each store operation before bypass or failure.         |
| `singleflight`       | `true`      | Coalesces concurrent exact misses for the same scoped key.    |
| `maxEntryBytes`      | `1048576`   | Rejects oversized value plus metadata before store mutation.  |
| `circuitBreaker`     | see config  | Opens after repeated store failures and later probes recovery. |

Configure the server with:

```bash
HYPHA_SERVING_CACHE=off
HYPHA_SERVING_CACHE=memory
HYPHA_SERVING_CACHE=sqlite
HYPHA_SERVING_CACHE=redis
```

`store` is the single server enable switch. SQLite entries use
`HYPHA_SERVING_CACHE_SQLITE_PATH`; Redis uses the shared Redis deployment and
`HYPHA_SERVING_CACHE_REDIS_PREFIX`. Streaming requests and provider errors are
never cached.

## Stores

`@hypha/serving-cache` exposes `CacheStore`, `NoopCacheStore`,
`MemoryCacheStore`, `SQLiteCacheStore`, and `RedisCacheStore`. Store
implementations persist versioned, runtime-validated `CacheEntry` records.
Every store verifies that the physical lookup key matches `CacheEntry.key`;
malformed or mismatched records are removed and treated as misses. Cache policy
values are runtime-validated before a manager or middleware is created.
Only `CachedModelResponseProjection` is persisted: content, tool calls, and
usage. Provider `raw` payloads, old response ids, and arbitrary response
metadata are excluded; every hit receives a new runtime response id. Memory,
SQLite, and prefix-shape indexes are bounded.

## Trace Events

Runtime traces may include:

| Event              | When emitted                                      |
| ------------------ | ------------------------------------------------- |
| `llm.cache.lookup` | A cache-enabled non-streaming request is checked. |
| `llm.cache.hit`    | A fresh exact cache entry is reused.              |
| `llm.cache.miss`   | No entry exists, entry expired, or read disabled. |
| `llm.cache.write`  | A provider response is stored.                    |
| `llm.cache.bypass` | Cache is disabled, unscoped, unavailable, no-cache, mode off, or stream. |

These events are regular Hypha events and can be replayed, audited, and
evaluated like other runtime facts.

## Non-Goals

This layer does not implement semantic cache, fuzzy matching, cache trees,
WorkCache graph scheduling, tool result cache, provider KV cache management,
CPU/GPU cache migration, or streaming chunk cache.
