# `@codesoul-co/hypha-memory` / `memory-server-redis-migration-fixtures`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-redis-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryRedisStreamMigrationClient` | 类 | <code>new InMemoryRedisStreamMigrationClient(): InMemoryRedisStreamMigrationClient</code> | In Memory Redis Stream Migration Client 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryWorkingMemoryMigrationPort` | 类 | <code>new InMemoryWorkingMemoryMigrationPort(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | In Memory Working Memory Migration Port 的运行时实现；公开构造函数与成员见下表。 |
| `redisWorkingMemoryBoundaryCases` | 常量 | <code>const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[]</code> | 由 `memory-server-redis-migration-fixtures` 模块导出的 redis Working Memory Boundary Cases 常量。 |
| `createInMemoryWorkingMemoryMigrationHarness` | 函数 | <code>createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness</code> | 创建 In Memory Working Memory Migration Harness。 |
| `createRedisStreamWorkingMemoryMigrationHarness` | 函数 | <code>createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness &amp; { client: InMemoryRedisStreamMigrationClient; }</code> | 创建 Redis Stream Working Memory Migration Harness。 |
| `RedisWorkingMemoryBoundaryCase` | 接口 | <code>interface RedisWorkingMemoryBoundaryCase</code> | Redis Working Memory Boundary Case 的字段契约；完整字段见下表。 |
| `WorkingMemoryMigrationAcceptanceHarness` | 接口 | <code>interface WorkingMemoryMigrationAcceptanceHarness</code> | Working Memory Migration Acceptance Harness 的字段契约；完整字段见下表。 |
| `RedisMigrationCommand` | 类型 | <code>type RedisMigrationCommand = { name: 'XADD'; key: string; } &#124; { name: 'XTRIM'; key: string; strategy: 'MAXLEN'; threshold: number; } &#124; { name: 'XRANGE'; key: string; start: '-'; end: '+'; } &#124; { name: 'XREVRANGE'; key: string; end: '+'; start: '-'; count: 1; } &#124; { name: 'SCAN'; cursor: string; pattern: string; count: number; } &#124; { name: 'DEL'; keys: string[]; }</code> | Redis Migration Command 的公共类型别名。 |
| `WorkingMemoryMigrationHarnessFactory` | 类型 | <code>type WorkingMemoryMigrationHarnessFactory = (fixtureId: string) =&gt; WorkingMemoryMigrationAcceptanceHarness</code> | Working Memory Migration Harness Factory 的公共类型别名。 |

## `InMemoryRedisStreamMigrationClient` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commands` | 属性 | <code>commands: RedisMigrationCommand[]</code> | commands 字段。 |
| `constructor` | 构造函数 | <code>(): InMemoryRedisStreamMigrationClient</code> | 创建该类的实例。 |
| `del` | 方法 | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | del 的公开运行时操作。 |
| `repeatScanCursor` | 方法 | <code>repeatScanCursor(cursor: string): void</code> | repeat Scan Cursor 的公开运行时操作。 |
| `scan` | 方法 | <code>scan(cursor: string, _matchToken: "MATCH", pattern: string, _countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | scan 的公开运行时操作。 |
| `seedStream` | 方法 | <code>seedStream(key: string): void</code> | seed Stream 的公开运行时操作。 |
| `xadd` | 方法 | <code>xadd(key: string, _id: "*", field: "entry", value: string): Promise&lt;string&gt;</code> | xadd 的公开运行时操作。 |
| `xrange` | 方法 | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | xrange 的公开运行时操作。 |
| `xrevrange` | 方法 | <code>xrevrange(key: string, end: "+", start: "-", _countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | xrevrange 的公开运行时操作。 |
| `xtrim` | 方法 | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | xtrim 的公开运行时操作。 |

## `InMemoryWorkingMemoryMigrationPort` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `append` | 方法 | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | 追加 append。 |
| `clearScope` | 方法 | <code>clearScope(scope: ManagedMemoryScope, _budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | clear Scope 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | 创建该类的实例。 |
| `latest` | 方法 | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | latest 的公开运行时操作。 |
| `list` | 方法 | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | 列出 list。 |

## `RedisWorkingMemoryBoundaryCase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appendCount` | 属性 | <code>appendCount: number</code> | append Count 字段。 |
| `concurrent` | 属性 | <code>concurrent: boolean</code> | concurrent 字段。 |
| `exactOrder` | 属性 | <code>exactOrder: boolean</code> | exact Order 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | max Messages 字段。 |
| `preloadCount` | 属性 | <code>preloadCount: number</code> | preload Count 字段。 |

## `WorkingMemoryMigrationAcceptanceHarness` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `port` | 属性 | <code>port: WorkingMemoryMigrationPort</code> | port 字段。 |
| `restart` | 方法 | <code>restart(): WorkingMemoryMigrationPort</code> | restart 的公开运行时操作。 |
