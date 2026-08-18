# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-permanent-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runPermanentMemoryBehaviorAcceptance` | function | <code>runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise&lt;PermanentMemoryBehaviorReport&gt;</code> | Public runtime operation for run Permanent Memory Behavior Acceptance. |
| `PermanentMemoryBehaviorFinding` | interface | <code>interface PermanentMemoryBehaviorFinding</code> | Field contract for Permanent Memory Behavior Finding; see all contract members below. |
| `PermanentMemoryBehaviorReport` | interface | <code>interface PermanentMemoryBehaviorReport</code> | Field contract for Permanent Memory Behavior Report; see all contract members below. |

## `PermanentMemoryBehaviorFinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public code property. |
| `fixtureId` | property | <code>fixtureId: string</code> | Public fixture Id property. |
| `message` | property | <code>message: string</code> | Public message property. |

## `PermanentMemoryBehaviorReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: number</code> | Public cases property. |
| `findings` | property | <code>findings: PermanentMemoryBehaviorFinding[]</code> | Public findings property. |
| `passed` | property | <code>passed: boolean</code> | Public passed property. |
