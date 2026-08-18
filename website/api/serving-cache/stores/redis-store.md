# `@codesoul-co/hypha-serving-cache` / `stores/redis-store`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Package guide: [learning and composition guide](/packages/serving-cache)
- Source: [`packages/serving-cache/src/stores/redis-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisCacheStore` | class | <code>new RedisCacheStore(options: RedisCacheStoreOptions): RedisCacheStore</code> | Runtime implementation for Redis Cache Store; see its public constructor and members below. |
| `RedisCacheClient` | interface | <code>interface RedisCacheClient</code> | Field contract for Redis Cache Client; see all contract members below. |
| `RedisCacheStoreOptions` | interface | <code>interface RedisCacheStoreOptions</code> | Field contract for Redis Cache Store Options; see all contract members below. |

## `RedisCacheStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: RedisCacheStoreOptions): RedisCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | Public runtime operation for health. |
| `set` | method | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `RedisCacheClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `ping` | method | <code>ping(): Promise&lt;string&gt;</code> | Public runtime operation for ping. |
| `quit` | method | <code>quit(): Promise&lt;unknown&gt;</code> | Public runtime operation for quit. |
| `scan` | method | <code>scan(cursor: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;[string, string[]]&gt;</code> | Public runtime operation for scan. |
| `set` | method | <code>set(key: string, value: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;unknown&gt;</code> | Sets set at this module boundary. |

## `RedisCacheStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisCacheClient</code> | Public client property. |
| `closeClient` | property | <code>closeClient: boolean</code> | Public close Client property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |
| `prefix` | property | <code>prefix: string</code> | Public prefix property. |
