# `@codesoul-co/hypha-memory` / `working-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/working-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/working-store.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryWorkingMemoryStore` | 类 | <code>new InMemoryWorkingMemoryStore(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | In Memory Working Memory Store 的运行时实现；公开构造函数与成员见下表。 |
| `RedisWorkingMemoryStore` | 类 | <code>new RedisWorkingMemoryStore(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | Redis Working Memory Store 的运行时实现；公开构造函数与成员见下表。 |
| `RedisLikeWorkingMemoryClient` | 接口 | <code>interface RedisLikeWorkingMemoryClient</code> | Redis Like Working Memory Client 的字段契约；完整字段见下表。 |
| `RedisWorkingMemoryStoreOptions` | 接口 | <code>interface RedisWorkingMemoryStoreOptions</code> | Redis Working Memory Store Options 的字段契约；完整字段见下表。 |
| `WorkingMemoryEntry` | 接口 | <code>interface WorkingMemoryEntry</code> | Working Memory Entry 的字段契约；完整字段见下表。 |
| `WorkingMemoryStore` | 接口 | <code>interface WorkingMemoryStore</code> | Working Memory Store 的字段契约；完整字段见下表。 |

## `InMemoryWorkingMemoryStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | clear Scope 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(now?: () =&gt; Date): InMemoryWorkingMemoryStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | 写入 set。 |

## `RedisWorkingMemoryStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | clear Scope 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: RedisWorkingMemoryStoreOptions): RedisWorkingMemoryStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number &#124; undefined): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | 写入 set。 |

## `RedisLikeWorkingMemoryClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `ping` | 方法 | <code>ping(): Promise&lt;string&gt;</code> | ping 的公开运行时操作。 |
| `scan` | 方法 | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | scan 的公开运行时操作。 |
| `set` | 方法 | <code>set(key: string, value: string, mode?: "EX", durationSeconds?: number): Promise&lt;unknown&gt;</code> | 写入 set。 |

## `RedisWorkingMemoryStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisLikeWorkingMemoryClient</code> | client 字段。 |
| `defaultTtlSeconds` | 属性 | <code>defaultTtlSeconds: number</code> | default Ttl Seconds 字段。 |
| `namespace` | 属性 | <code>namespace: string</code> | namespace 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `nowMs` | 方法 | <code>nowMs(): number</code> | now Ms 的公开运行时操作。 |
| `scanBudget` | 属性 | <code>scanBudget: Partial&lt;Omit&lt;RedisScanBudget, "count"&gt;&gt;</code> | scan Budget 字段。 |
| `scanCount` | 属性 | <code>scanCount: number</code> | scan Count 字段。 |

## `WorkingMemoryEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `value` | 属性 | <code>value: TValue</code> | value 字段。 |

## `WorkingMemoryStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope): Promise&lt;void&gt;</code> | clear Scope 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(scope: ManagedMemoryScope, id: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, id: string): Promise&lt;WorkingMemoryEntry&lt;TValue&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set&lt;TValue = unknown&gt;(entry: Omit&lt;WorkingMemoryEntry&lt;TValue&gt;, "scopeHash"&gt;, ttlSeconds?: number): Promise&lt;WorkingMemoryEntry&lt;TValue&gt;&gt;</code> | 写入 set。 |
