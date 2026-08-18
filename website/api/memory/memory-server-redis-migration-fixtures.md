# `@codesoul-co/hypha-memory` / `memory-server-redis-migration-fixtures`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-redis-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-fixtures.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRedisStreamMigrationClient` | class | <code>new InMemoryRedisStreamMigrationClient(): InMemoryRedisStreamMigrationClient</code> | Runtime implementation for In Memory Redis Stream Migration Client; see its public constructor and members below. |
| `InMemoryWorkingMemoryMigrationPort` | class | <code>new InMemoryWorkingMemoryMigrationPort(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | Runtime implementation for In Memory Working Memory Migration Port; see its public constructor and members below. |
| `redisWorkingMemoryBoundaryCases` | constant | <code>const redisWorkingMemoryBoundaryCases: readonly RedisWorkingMemoryBoundaryCase[]</code> | redis Working Memory Boundary Cases constant exported by the `memory-server-redis-migration-fixtures` module. |
| `createInMemoryWorkingMemoryMigrationHarness` | function | <code>createInMemoryWorkingMemoryMigrationHarness(): WorkingMemoryMigrationAcceptanceHarness</code> | Creates In Memory Working Memory Migration Harness at this module boundary. |
| `createRedisStreamWorkingMemoryMigrationHarness` | function | <code>createRedisStreamWorkingMemoryMigrationHarness(fixtureId: string, client?: InMemoryRedisStreamMigrationClient): WorkingMemoryMigrationAcceptanceHarness &amp; { client: InMemoryRedisStreamMigrationClient; }</code> | Creates Redis Stream Working Memory Migration Harness at this module boundary. |
| `RedisWorkingMemoryBoundaryCase` | interface | <code>interface RedisWorkingMemoryBoundaryCase</code> | Field contract for Redis Working Memory Boundary Case; see all contract members below. |
| `WorkingMemoryMigrationAcceptanceHarness` | interface | <code>interface WorkingMemoryMigrationAcceptanceHarness</code> | Field contract for Working Memory Migration Acceptance Harness; see all contract members below. |
| `RedisMigrationCommand` | type | <code>type RedisMigrationCommand = { name: 'XADD'; key: string; } &#124; { name: 'XTRIM'; key: string; strategy: 'MAXLEN'; threshold: number; } &#124; { name: 'XRANGE'; key: string; start: '-'; end: '+'; } &#124; { name: 'XREVRANGE'; key: string; end: '+'; start: '-'; count: 1; } &#124; { name: 'SCAN'; cursor: string; pattern: string; count: number; } &#124; { name: 'DEL'; keys: string[]; }</code> | Public type alias for Redis Migration Command. |
| `WorkingMemoryMigrationHarnessFactory` | type | <code>type WorkingMemoryMigrationHarnessFactory = (fixtureId: string) =&gt; WorkingMemoryMigrationAcceptanceHarness</code> | Public type alias for Working Memory Migration Harness Factory. |

## `InMemoryRedisStreamMigrationClient` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commands` | property | <code>commands: RedisMigrationCommand[]</code> | Public commands property. |
| `constructor` | constructor | <code>(): InMemoryRedisStreamMigrationClient</code> | Creates an instance of this class. |
| `del` | method | <code>del(...keys: string[]): Promise&lt;number&gt;</code> | Public runtime operation for del. |
| `repeatScanCursor` | method | <code>repeatScanCursor(cursor: string): void</code> | Public runtime operation for repeat Scan Cursor. |
| `scan` | method | <code>scan(cursor: string, _matchToken: "MATCH", pattern: string, _countToken: "COUNT", count: number): Promise&lt;[string, string[]]&gt;</code> | Public runtime operation for scan. |
| `seedStream` | method | <code>seedStream(key: string): void</code> | Public runtime operation for seed Stream. |
| `xadd` | method | <code>xadd(key: string, _id: "*", field: "entry", value: string): Promise&lt;string&gt;</code> | Public runtime operation for xadd. |
| `xrange` | method | <code>xrange(key: string, start: "-", end: "+"): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public runtime operation for xrange. |
| `xrevrange` | method | <code>xrevrange(key: string, end: "+", start: "-", _countToken: "COUNT", count: 1): Promise&lt;Array&lt;[string, string[]]&gt;&gt;</code> | Public runtime operation for xrevrange. |
| `xtrim` | method | <code>xtrim(key: string, strategy: "MAXLEN", threshold: number): Promise&lt;number&gt;</code> | Public runtime operation for xtrim. |

## `InMemoryWorkingMemoryMigrationPort` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;TValue = unknown&gt;(input: WorkingMemoryMigrationAppend&lt;TValue&gt;): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `clearScope` | method | <code>clearScope(scope: ManagedMemoryScope, _budget?: Partial&lt;RedisScanBudget&gt;): Promise&lt;RedisScanReport&gt;</code> | Public runtime operation for clear Scope. |
| `constructor` | constructor | <code>(storage?: Map&lt;string, WorkingMemoryMigrationEntry&lt;unknown&gt;[]&gt;): InMemoryWorkingMemoryMigrationPort</code> | Creates an instance of this class. |
| `latest` | method | <code>latest&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;WorkingMemoryMigrationEntry&lt;TValue&gt; &#124; null&gt;</code> | Public runtime operation for latest. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;Array&lt;WorkingMemoryMigrationEntry&lt;TValue&gt;&gt;&gt;</code> | Lists list at this module boundary. |

## `RedisWorkingMemoryBoundaryCase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appendCount` | property | <code>appendCount: number</code> | Public append Count property. |
| `concurrent` | property | <code>concurrent: boolean</code> | Public concurrent property. |
| `exactOrder` | property | <code>exactOrder: boolean</code> | Public exact Order property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public max Messages property. |
| `preloadCount` | property | <code>preloadCount: number</code> | Public preload Count property. |

## `WorkingMemoryMigrationAcceptanceHarness` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `port` | property | <code>port: WorkingMemoryMigrationPort</code> | Public port property. |
| `restart` | method | <code>restart(): WorkingMemoryMigrationPort</code> | Public runtime operation for restart. |
