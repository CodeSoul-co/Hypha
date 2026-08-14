# `@codesoul-co/hypha-serving-cache`

`hypha-serving-cache` stores bounded response projections for repeated model requests. It supports memory, SQLite and Redis stores, exact cache keys, policy controls, prefix-shape observation and an LLM-provider wrapper.

```bash
npm install @codesoul-co/hypha-serving-cache@1.0.1
```

## Main exports

| Export | Use |
| --- | --- |
| `ServingCacheManager` | Policy-aware get/set/invalidate API |
| `MemoryCacheStore` | Deterministic process-local cache |
| `SQLiteCacheStore` | Durable single-node cache |
| `RedisCacheStore` | Shared cache adapter |
| `createLLMCacheKey` | Canonical, hashed request identity |
| `CachedLLMProvider` | Wrap a provider with cache read/write behavior |
| `PrefixCacheShapeTracker` | Observe provider prefix-cache reuse shape |
| `CachePolicy` | Enable, mode, TTL, size and failure behavior |

## Minimal exact cache

```ts
import {
  MemoryCacheStore,
  ServingCacheManager,
} from '@codesoul-co/hypha-serving-cache';

const cache = new ServingCacheManager({
  store: new MemoryCacheStore(),
});

const key = cache.keyFor({
  provider: 'primary',
  model: 'reasoning-v1',
  messages: [{ role: 'user', content: 'Explain Event sourcing.' }],
});

await cache.set(
  key,
  { content: 'Cached projection' },
  { provider: 'primary', model: 'reasoning-v1', cacheType: 'exact' },
);

const hit = await cache.get(key);
```

## Key and scope rules

Canonicalize every request field that changes the result: provider/model, messages, instructions, Tools, response format and relevant generation settings. Add user/tenant, policy and data-version scope wherever cross-scope reuse would be unsafe.

## Cache is not truth

A cache hit accelerates inference but does not replace Run/Event evidence. Record that a cached projection was used, validate its artifact/data dependencies and invalidate it when those inputs change.

## Failure behavior

Choose fail-open or fail-closed based on the operation. A cache outage may be safe to bypass for pure inference, while malformed or cross-scope data must be rejected. Enforce entry size, TTL and serialization limits before writing.

## Store selection

- Memory: unit tests and one-process development.
- SQLite: persistent local/single-node service.
- Redis: shared multi-instance cache with explicit connection and failure policy.
- No-op store: disable caching without branching application logic.

Test exact hits/misses, key stability, TTL, oversize rejection, corruption, store timeout and scope isolation.
