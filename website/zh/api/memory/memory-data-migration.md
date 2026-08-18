# `@codesoul-co/hypha-memory` / `memory-data-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-data-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryDataMigrationCoordinator` | 类 | <code>new MemoryDataMigrationCoordinator(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | Resumable migration/rollback runner. Step implementations remain with the data owner. |
| `StructuredMemoryDataMigrationStateStore` | 类 | <code>new StructuredMemoryDataMigrationStateStore(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | Structured Memory Data Migration State Store 的运行时实现；公开构造函数与成员见下表。 |
| `migrationPlanHash` | 函数 | <code>migrationPlanHash(plan: MemoryDataMigrationPlan): string</code> | migration Plan Hash 的公开运行时操作。 |
| `MemoryDataMigrationCoordinatorOptions` | 接口 | <code>interface MemoryDataMigrationCoordinatorOptions</code> | Memory Data Migration Coordinator Options 的字段契约；完整字段见下表。 |
| `MemoryDataMigrationPlan` | 接口 | <code>interface MemoryDataMigrationPlan</code> | Memory Data Migration Plan 的字段契约；完整字段见下表。 |
| `MemoryDataMigrationState` | 接口 | <code>interface MemoryDataMigrationState</code> | Memory Data Migration State 的字段契约；完整字段见下表。 |
| `MemoryDataMigrationStateStore` | 接口 | <code>interface MemoryDataMigrationStateStore</code> | Memory Data Migration State Store 的字段契约；完整字段见下表。 |
| `MemoryDataMigrationStep` | 接口 | <code>interface MemoryDataMigrationStep</code> | Memory Data Migration Step 的字段契约；完整字段见下表。 |

## `MemoryDataMigrationCoordinator` 公开成员

Resumable migration/rollback runner. Step implementations remain with the data owner.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | 应用 apply。 |
| `constructor` | 构造函数 | <code>(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | 创建该类的实例。 |
| `rollback` | 方法 | <code>rollback(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | rollback 的公开运行时操作。 |

## `StructuredMemoryDataMigrationStateStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | 读取 get。 |
| `save` | 方法 | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | 保存 save。 |

## `MemoryDataMigrationCoordinatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `stateStore` | 属性 | <code>stateStore: MemoryDataMigrationStateStore</code> | state Store 字段。 |

## `MemoryDataMigrationPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `steps` | 属性 | <code>steps: readonly MemoryDataMigrationStep[]</code> | steps 字段。 |
| `target` | 属性 | <code>target: string</code> | target 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `MemoryDataMigrationState` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeStepId` | 属性 | <code>activeStepId: string</code> | active Step Id 字段。 |
| `appliedStepIds` | 属性 | <code>appliedStepIds: string[]</code> | applied Step Ids 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `lastError` | 属性 | <code>lastError: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | last Error 字段。 |
| `planHash` | 属性 | <code>planHash: string</code> | plan Hash 字段。 |
| `planId` | 属性 | <code>planId: string</code> | plan Id 字段。 |
| `planVersion` | 属性 | <code>planVersion: string</code> | plan Version 字段。 |
| `state` | 属性 | <code>state: "failed" &#124; "applied" &#124; "pending" &#124; "applying" &#124; "rolling_back" &#124; "rolled_back"</code> | state 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `MemoryDataMigrationStateStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | 读取 get。 |
| `save` | 方法 | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | 保存 save。 |

## `MemoryDataMigrationStep` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apply` | 方法 | <code>apply(): Promise&lt;void&gt;</code> | 应用 apply。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `rollback` | 方法 | <code>rollback(): Promise&lt;void&gt;</code> | rollback 的公开运行时操作。 |
