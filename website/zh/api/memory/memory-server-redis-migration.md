# `@codesoul-co/hypha-memory` / `memory-server-redis-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-redis-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RedisStreamWorkingMemoryMigrationAdapter` | 类 | <code>new RedisStreamWorkingMemoryMigrationAdapter(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite. |
| `scanRedisWorkingMemoryKeys` | 函数 | <code>scanRedisWorkingMemoryKeys(client: Pick&lt;RedisStreamMigrationClient, "scan"&gt;, pattern: string, budget?: RedisScanBudget, nowMs?: () =&gt; number): Promise&lt;RedisScanReport&gt;</code> | scan Redis Working Memory Keys 的公开运行时操作。 |
| `RedisScanBudget` | 接口 | <code>interface RedisScanBudget</code> | Redis Scan Budget 的字段契约；完整字段见下表。 |
| `RedisScanReport` | 接口 | <code>interface RedisScanReport</code> | Redis Scan Report 的字段契约；完整字段见下表。 |
| `RedisStreamMigrationClient` | 接口 | <code>interface RedisStreamMigrationClient</code> | Redis Stream Migration Client 的字段契约；完整字段见下表。 |
| `RedisStreamWorkingMemoryMigrationAdapterOptions` | 接口 | <code>interface RedisStreamWorkingMemoryMigrationAdapterOptions</code> | Redis Stream Working Memory Migration Adapter Options 的字段契约；完整字段见下表。 |
| `WorkingMemoryMigrationAppend` | 接口 | <code>interface WorkingMemoryMigrationAppend</code> | Working Memory Migration Append 的字段契约；完整字段见下表。 |
| `WorkingMemoryMigrationEntry` | 接口 | <code>interface WorkingMemoryMigrationEntry</code> | Working Memory Migration Entry 的字段契约；完整字段见下表。 |
| `WorkingMemoryMigrationPort` | 接口 | <code>interface WorkingMemoryMigrationPort</code> | Working Memory Migration Port 的字段契约；完整字段见下表。 |

## `RedisStreamWorkingMemoryMigrationAdapter` 公开成员

Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | 追加 append。 |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | clear Scope 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | 创建该类的实例。 |
| `latest` | 方法 | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | 列出 list。 |

## `RedisScanBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `count` | 属性 | <code>count: number</code> | count 字段。 |
| `maxCalls` | 属性 | <code>maxCalls: number</code> | max Calls 字段。 |
| `maxDurationMs` | 属性 | <code>maxDurationMs: number</code> | max Duration Ms 字段。 |
| `maxItems` | 属性 | <code>maxItems: number</code> | max Items 字段。 |

## `RedisScanReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `calls` | 属性 | <code>calls: number</code> | calls 字段。 |
| `keys` | 属性 | <code>keys: string[]</code> | keys 字段。 |
| `terminated` | 属性 | <code>terminated: boolean</code> | terminated 字段。 |

## `RedisStreamMigrationClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `scan` | 方法 | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | scan 的公开运行时操作。 |
| `xadd` | 方法 | <code>xadd(key: string, id: "*", field: "entry", value: string): Promise&lt;string &#124; null&gt;</code> | xadd 的公开运行时操作。 |
| `xrange` | 方法 | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | xrange 的公开运行时操作。 |
| `xrevrange` | 方法 | <code>xrevrange(key: string, end: "+", start: "-", countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | xrevrange 的公开运行时操作。 |
| `xtrim` | 方法 | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | xtrim 的公开运行时操作。 |

## `RedisStreamWorkingMemoryMigrationAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `client` | 属性 | <code>client: RedisStreamMigrationClient</code> | client 字段。 |
| `namespace` | 属性 | <code>namespace: string</code> | namespace 字段。 |
| `nowMs` | 方法 | <code>nowMs(): number</code> | now Ms 的公开运行时操作。 |
| `scanBudget` | 属性 | <code>scanBudget: Partial&lt;RedisScanBudget&gt;</code> | scan Budget 字段。 |

## `WorkingMemoryMigrationAppend` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | max Messages 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `value` | 属性 | <code>value: TValue</code> | value 字段。 |

## `WorkingMemoryMigrationEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `value` | 属性 | <code>value: TValue</code> | value 字段。 |

## `WorkingMemoryMigrationPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | 追加 append。 |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | clear Scope 的公开运行时操作。 |
| `latest` | 方法 | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | 列出 list。 |
