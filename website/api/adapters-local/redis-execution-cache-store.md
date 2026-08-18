# `@codesoul-co/hypha-adapters-local` / `redis-execution-cache-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/redis-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisExecutionCacheStore` | class | <code>new RedisExecutionCacheStore(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core. |
| `RedisExecutionCacheStoreOptions` | interface | <code>interface RedisExecutionCacheStoreOptions</code> | Field contract for Redis Execution Cache Store Options; see all contract members below. |
| `RedisLikeExecutionCacheClient` | interface | <code>interface RedisLikeExecutionCacheClient</code> | Field contract for Redis Like Execution Cache Client; see all contract members below. |

## `RedisExecutionCacheStore` public members

Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(key: string, input: ExecutionCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `RedisExecutionCacheStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisLikeExecutionCacheClient</code> | Public client property. |
| `defaultTtlMs` | property | <code>defaultTtlMs: number</code> | Public default Ttl Ms property. |
| `maxEntryBytes` | property | <code>maxEntryBytes: number</code> | Public max Entry Bytes property. |
| `namespace` | property | <code>namespace: string</code> | Public namespace property. |
| `now` | method | <code>now(): number</code> | Public runtime operation for now. |

## `RedisLikeExecutionCacheClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `get` | method | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | Sets set at this module boundary. |
