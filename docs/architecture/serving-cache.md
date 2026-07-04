# Serving Cache Layer

Hypha Serving Cache is a lightweight middleware around `ModelProvider.generate()`.
It caches exact LLM API responses and records prompt prefix metadata without
changing ReAct, FSM, DomainPack, Session, Run, or Event semantics.

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

## Policy

`CachePolicy` fields:

| Field            | Default     | Description                                    |
| ---------------- | ----------- | ---------------------------------------------- |
| `enabled`        | `false`     | Enables the middleware.                        |
| `mode`           | `readwrite` | One of `off`, `read`, `write`, or `readwrite`. |
| `ttlMs`          | `86400000`  | Entry TTL. Omit for no expiration.             |
| `cacheErrors`    | `false`     | Reserved; provider errors are not cached.      |
| `cacheStreaming` | `false`     | Streaming requests bypass cache by default.    |
| `respectNoCache` | `true`      | Honors per-request no-cache metadata.          |

Configure the server with:

```bash
HYPHA_SERVING_CACHE=off
HYPHA_SERVING_CACHE=memory
HYPHA_SERVING_CACHE=sqlite
```

SQLite entries are stored at `HYPHA_SERVING_CACHE_SQLITE_PATH`, defaulting to
`./data/runtime/cache/hypha-serving-cache.sqlite`.

## Stores

`@hypha/serving-cache` exposes `CacheStore`, `NoopCacheStore`,
`MemoryCacheStore`, and `SQLiteCacheStore`. Store implementations persist
`CacheEntry` records with `key`, `value`, `createdAt`, optional `expiresAt`,
and `CacheMetadata`.

## Trace Events

Runtime traces may include:

| Event              | When emitted                                      |
| ------------------ | ------------------------------------------------- |
| `llm.cache.lookup` | A cache-enabled non-streaming request is checked. |
| `llm.cache.hit`    | A fresh exact cache entry is reused.              |
| `llm.cache.miss`   | No entry exists, entry expired, or read disabled. |
| `llm.cache.write`  | A provider response is stored.                    |
| `llm.cache.bypass` | Cache is disabled, no-cache, mode off, or stream. |

These events are regular Hypha events and can be replayed, audited, and
evaluated like other runtime facts.

## Non-Goals

This layer does not implement semantic cache, fuzzy matching, cache trees,
WorkCache graph scheduling, tool result cache, provider KV cache management,
CPU/GPU cache migration, or streaming chunk cache.
