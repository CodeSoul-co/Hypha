# `@codesoul-co/hypha-memory` / `memory-server-redis-migration-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-redis-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-acceptance.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runRedisWorkingMemoryBehaviorAcceptance` | function | <code>runRedisWorkingMemoryBehaviorAcceptance(factory: WorkingMemoryMigrationHarnessFactory, cases?: readonly RedisWorkingMemoryBoundaryCase[]): Promise&lt;RedisWorkingMemoryBehaviorReport&gt;</code> | Public runtime operation for run Redis Working Memory Behavior Acceptance. |
| `RedisWorkingMemoryBehaviorFinding` | interface | <code>interface RedisWorkingMemoryBehaviorFinding</code> | Field contract for Redis Working Memory Behavior Finding; see all contract members below. |
| `RedisWorkingMemoryBehaviorReport` | interface | <code>interface RedisWorkingMemoryBehaviorReport</code> | Field contract for Redis Working Memory Behavior Report; see all contract members below. |

## `RedisWorkingMemoryBehaviorFinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `fixtureId` | property | <code>fixtureId: string</code> | Public fixture Id property. |
| `message` | property | <code>message: string</code> | Public message property. |

## `RedisWorkingMemoryBehaviorReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: number</code> | Public cases property. |
| `findings` | property | <code>findings: RedisWorkingMemoryBehaviorFinding[]</code> | Public findings property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |
