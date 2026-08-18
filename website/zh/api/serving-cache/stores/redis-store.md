# `@codesoul-co/hypha-serving-cache` / `stores/redis-store`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 模块指南: [学习与组合说明](/zh/packages/serving-cache)
- 源码: [`packages/serving-cache/src/stores/redis-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisCacheStore` | 类 | <code>new RedisCacheStore(options: RedisCacheStoreOptions): RedisCacheStore</code> | Redis Cache Store 的运行时实现；公开构造函数与成员见下表。 |
| `RedisCacheClient` | 接口 | <code>interface RedisCacheClient</code> | Redis Cache Client 的字段契约；完整字段见下表。 |
| `RedisCacheStoreOptions` | 接口 | <code>interface RedisCacheStoreOptions</code> | Redis Cache Store Options 的字段契约；完整字段见下表。 |

## `RedisCacheStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: RedisCacheStoreOptions): RedisCacheStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;T&gt;(key: string): Promise&lt;CacheEntry&lt;T&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;CacheStoreHealth&gt;</code> | health 的公开运行时操作。 |
| `set` | 方法 | <code>set&lt;T&gt;(key: string, entry: CacheEntry&lt;T&gt;): Promise&lt;void&gt;</code> | 写入 set。 |

## `RedisCacheClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `ping` | 方法 | <code>ping(): Promise&lt;string&gt;</code> | ping 的公开运行时操作。 |
| `quit` | 方法 | <code>quit(): Promise&lt;unknown&gt;</code> | quit 的公开运行时操作。 |
| `scan` | 方法 | <code>scan(cursor: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;[string, string[]]&gt;</code> | scan 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: string, ...args: Array&lt;string &#124; number&gt;): Promise&lt;unknown&gt;</code> | 写入 set。 |

## `RedisCacheStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisCacheClient</code> | client 字段。 |
| `closeClient` | 属性 | <code>closeClient: boolean</code> | close Client 字段。 |
| `now` | 方法 | <code>now(): number</code> | now 的公开运行时操作。 |
| `prefix` | 属性 | <code>prefix: string</code> | prefix 字段。 |
