# `@codesoul-co/hypha-adapters-local` / `redis-execution-cache-store`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/redis-execution-cache-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/redis-execution-cache-store.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisExecutionCacheStore` | 类 | <code>new RedisExecutionCacheStore(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core. |
| `RedisExecutionCacheStoreOptions` | 接口 | <code>interface RedisExecutionCacheStoreOptions</code> | Redis Execution Cache Store Options 的字段契约；完整字段见下表。 |
| `RedisLikeExecutionCacheClient` | 接口 | <code>interface RedisLikeExecutionCacheClient</code> | Redis Like Execution Cache Client 的字段契约；完整字段见下表。 |

## `RedisExecutionCacheStore` 公开成员

Key-bound shared Execution Cache Store. The client port can wrap local, self-hosted, or managed Redis without exposing a Redis SDK to Core.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RedisExecutionCacheStoreOptions): RedisExecutionCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(key: string, input: ExecutionCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `RedisExecutionCacheStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeExecutionCacheClient</code> | client 字段。 |
| `defaultTtlMs` | 属性 | <code>defaultTtlMs: number</code> | default Ttl Ms 字段。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes: number</code> | max Entry Bytes 字段。 |
| `namespace` | 属性 | <code>namespace: string</code> | namespace 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |

## `RedisLikeExecutionCacheClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(key: string, value: string, mode: "PX", durationMilliseconds: number): Promise&lt;unknown&gt;</code> | 写入 set。 |
