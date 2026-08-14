# `@codesoul-co/hypha-serving-cache`

`hypha-serving-cache` 保存有界的模型响应投影，支持 Memory、SQLite、Redis Store、精确 Key、Policy、Prefix Shape 观测与 LLM Provider Wrapper。

```bash
npm install @codesoul-co/hypha-serving-cache@1.0.1
```

## 主要导出

| 导出 | 用途 |
| --- | --- |
| `ServingCacheManager` | Policy-aware Get/Set/Invalidate |
| `MemoryCacheStore` | 进程内确定性 Cache |
| `SQLiteCacheStore` | 单节点持久 Cache |
| `RedisCacheStore` | 多实例共享 Cache |
| `createLLMCacheKey` | 规范化并 Hash 请求 |
| `CachedLLMProvider` | 为 Provider 包装读写 Cache |
| `PrefixCacheShapeTracker` | 观测 Prefix Cache 复用 |
| `CachePolicy` | Mode、TTL、大小与故障策略 |

## 最小精确 Cache

```ts
import {
  MemoryCacheStore,
  ServingCacheManager,
} from '@codesoul-co/hypha-serving-cache';

const cache = new ServingCacheManager({ store: new MemoryCacheStore() });
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

Key 必须纳入所有影响结果的字段：Provider/Model、Message、Instruction、Tool、Response Format 和 Generation 参数；跨作用域不安全时还要加入 User/Tenant、Policy 与数据版本。

Cache Hit 是优化而非事实。仍要记录本 Run 使用了 Cache，并校验 Artifact/Data 依赖。根据业务选择 Fail-open/Fail-closed；畸形或跨 Scope 数据必须拒绝。测试 Key 稳定性、TTL、Oversize、Corruption、Timeout 与 Scope Isolation。

