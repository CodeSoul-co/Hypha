# `@codesoul-co/hypha-memory` / `memory-data-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-data-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryDataMigrationCoordinator` | class | <code>new MemoryDataMigrationCoordinator(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | Resumable migration/rollback runner. Step implementations remain with the data owner. |
| `StructuredMemoryDataMigrationStateStore` | class | <code>new StructuredMemoryDataMigrationStateStore(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | Runtime implementation for Structured Memory Data Migration State Store; see its public constructor and members below. |
| `migrationPlanHash` | function | <code>migrationPlanHash(plan: MemoryDataMigrationPlan): string</code> | Public runtime operation for migration Plan Hash. |
| `MemoryDataMigrationCoordinatorOptions` | interface | <code>interface MemoryDataMigrationCoordinatorOptions</code> | Field contract for Memory Data Migration Coordinator Options; see all contract members below. |
| `MemoryDataMigrationPlan` | interface | <code>interface MemoryDataMigrationPlan</code> | Field contract for Memory Data Migration Plan; see all contract members below. |
| `MemoryDataMigrationState` | interface | <code>interface MemoryDataMigrationState</code> | Field contract for Memory Data Migration State; see all contract members below. |
| `MemoryDataMigrationStateStore` | interface | <code>interface MemoryDataMigrationStateStore</code> | Field contract for Memory Data Migration State Store; see all contract members below. |
| `MemoryDataMigrationStep` | interface | <code>interface MemoryDataMigrationStep</code> | Field contract for Memory Data Migration Step; see all contract members below. |

## `MemoryDataMigrationCoordinator` public members

Resumable migration/rollback runner. Step implementations remain with the data owner.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | Applies apply at this module boundary. |
| `constructor` | constructor | <code>(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | Creates an instance of this class. |
| `rollback` | method | <code>rollback(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | Public runtime operation for rollback. |

## `StructuredMemoryDataMigrationStateStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | Gets get at this module boundary. |
| `save` | method | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MemoryDataMigrationCoordinatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `stateStore` | property | <code>stateStore: MemoryDataMigrationStateStore</code> | Public state Store property. |

## `MemoryDataMigrationPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `source` | property | <code>source: string</code> | Public source property. |
| `steps` | property | <code>steps: readonly MemoryDataMigrationStep[]</code> | Public steps property. |
| `target` | property | <code>target: string</code> | Public target property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `MemoryDataMigrationState` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeStepId` | property | <code>activeStepId: string</code> | Public active Step Id property. |
| `appliedStepIds` | property | <code>appliedStepIds: string[]</code> | Public applied Step Ids property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `lastError` | property | <code>lastError: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | Public last Error property. |
| `planHash` | property | <code>planHash: string</code> | Public plan Hash property. |
| `planId` | property | <code>planId: string</code> | Public plan Id property. |
| `planVersion` | property | <code>planVersion: string</code> | Public plan Version property. |
| `state` | property | <code>state: "failed" &#124; "applied" &#124; "pending" &#124; "applying" &#124; "rolling_back" &#124; "rolled_back"</code> | Public state property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `MemoryDataMigrationStateStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | Gets get at this module boundary. |
| `save` | method | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MemoryDataMigrationStep` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(): Promise&lt;void&gt;</code> | Applies apply at this module boundary. |
| `id` | property | <code>id: string</code> | Public id property. |
| `rollback` | method | <code>rollback(): Promise&lt;void&gt;</code> | Public runtime operation for rollback. |
