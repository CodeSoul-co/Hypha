# `@codesoul-co/hypha-serving-cache` / `stores/memory-store`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/stores/memory-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryCacheStore` | class | <code>new MemoryCacheStore(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | Runtime implementation for Memory Cache Store; see its public constructor and members below. |
| `NoopCacheStore` | class | <code>new NoopCacheStore(): NoopCacheStore</code> | Runtime implementation for Noop Cache Store; see its public constructor and members below. |

## `MemoryCacheStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(options?: { maxEntries?: number; maxBytes?: number; }): MemoryCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | Public runtime operation for health. |
| `set` | method | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
| `stats` | method | <code>stats(): Promise&lt;CacheStoreStats&gt;</code> | Public runtime operation for stats. |
| `touch` | method | <code>touch(key: string): Promise&lt;void&gt;</code> | Public runtime operation for touch. |

## `NoopCacheStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `constructor` | constructor | <code>(): NoopCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set&lt;T&gt;(): Promise&lt;void&gt;</code> | Sets set at this module boundary. |
