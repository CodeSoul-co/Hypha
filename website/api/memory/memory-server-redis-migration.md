# `@codesoul-co/hypha-memory` / `memory-server-redis-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-redis-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RedisStreamWorkingMemoryMigrationAdapter` | class | <code>new RedisStreamWorkingMemoryMigrationAdapter(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite. |
| `scanRedisWorkingMemoryKeys` | function | <code>scanRedisWorkingMemoryKeys(client: Pick&lt;RedisStreamMigrationClient, "scan"&gt;, pattern: string, budget?: RedisScanBudget, nowMs?: () =&gt; number): Promise&lt;RedisScanReport&gt;</code> | Public runtime operation for scan Redis Working Memory Keys. |
| `RedisScanBudget` | interface | <code>interface RedisScanBudget</code> | Field contract for Redis Scan Budget; see all contract members below. |
| `RedisScanReport` | interface | <code>interface RedisScanReport</code> | Field contract for Redis Scan Report; see all contract members below. |
| `RedisStreamMigrationClient` | interface | <code>interface RedisStreamMigrationClient</code> | Field contract for Redis Stream Migration Client; see all contract members below. |
| `RedisStreamWorkingMemoryMigrationAdapterOptions` | interface | <code>interface RedisStreamWorkingMemoryMigrationAdapterOptions</code> | Field contract for Redis Stream Working Memory Migration Adapter Options; see all contract members below. |
| `WorkingMemoryMigrationAppend` | interface | <code>interface WorkingMemoryMigrationAppend</code> | Field contract for Working Memory Migration Append; see all contract members below. |
| `WorkingMemoryMigrationEntry` | interface | <code>interface WorkingMemoryMigrationEntry</code> | Field contract for Working Memory Migration Entry; see all contract members below. |
| `WorkingMemoryMigrationPort` | interface | <code>interface WorkingMemoryMigrationPort</code> | Field contract for Working Memory Migration Port; see all contract members below. |

## `RedisStreamWorkingMemoryMigrationAdapter` public members

Redis Stream adapter used by dev to execute the Framework-owned migration acceptance suite.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | Public runtime operation for clear Scope. |
| `constructor` | constructor | <code>(options: RedisStreamWorkingMemoryMigrationAdapterOptions): RedisStreamWorkingMemoryMigrationAdapter</code> | Creates an instance of this class. |
| `latest` | method | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | Lists list at this module boundary. |

## `RedisScanBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `count` | property | <code>count: number</code> | Public count property. |
| `maxCalls` | property | <code>maxCalls: number</code> | Public max Calls property. |
| `maxDurationMs` | property | <code>maxDurationMs: number</code> | Public max Duration Ms property. |
| `maxItems` | property | <code>maxItems: number</code> | Public max Items property. |

## `RedisScanReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `calls` | property | <code>calls: number</code> | Public calls property. |
| `keys` | property | <code>keys: string[]</code> | Public keys property. |
| `terminated` | property | <code>terminated: boolean</code> | Public terminated property. |

## `RedisStreamMigrationClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `scan` | method | <code>scan(cursor: string, matchToken: "MATCH", pattern: string, countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | Public runtime operation for scan. |
| `xadd` | method | <code>xadd(key: string, id: "*", field: "entry", value: string): Promise&lt;string &#124; null&gt;</code> | Public runtime operation for xadd. |
| `xrange` | method | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public runtime operation for xrange. |
| `xrevrange` | method | <code>xrevrange(key: string, end: "+", start: "-", countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public runtime operation for xrevrange. |
| `xtrim` | method | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | Public runtime operation for xtrim. |

## `RedisStreamWorkingMemoryMigrationAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `client` | property | <code>client: RedisStreamMigrationClient</code> | Public client property. |
| `namespace` | property | <code>namespace: string</code> | Public namespace property. |
| `nowMs` | method | <code>nowMs(): number</code> | Public runtime operation for now Ms. |
| `scanBudget` | property | <code>scanBudget: Partial&lt;RedisScanBudget&gt;</code> | Public scan Budget property. |

## `WorkingMemoryMigrationAppend` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public max Messages property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `value` | property | <code>value: TValue</code> | Public value property. |

## `WorkingMemoryMigrationEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `value` | property | <code>value: TValue</code> | Public value property. |

## `WorkingMemoryMigrationPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope, budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | Public runtime operation for clear Scope. |
| `latest` | method | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | Lists list at this module boundary. |
