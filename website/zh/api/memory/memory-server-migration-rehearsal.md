# `@codesoul-co/hypha-memory` / `memory-server-migration-rehearsal`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-migration-rehearsal.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryServerMigrationRehearsal` | 类 | <code>new MemoryServerMigrationRehearsal(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | Memory Server Migration Rehearsal 的运行时实现；公开构造函数与成员见下表。 |
| `planMemoryServerMigrationInventories` | 函数 | <code>planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan</code> | 规划 Memory Server Migration Inventories。 |
| `MemoryServerMigrationFinishInput` | 接口 | <code>interface MemoryServerMigrationFinishInput</code> | Memory Server Migration Finish Input 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationInventoryPlan` | 接口 | <code>interface MemoryServerMigrationInventoryPlan</code> | Memory Server Migration Inventory Plan 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationInventoryRecord` | 接口 | <code>interface MemoryServerMigrationInventoryRecord</code> | Memory Server Migration Inventory Record 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationPrepareInput` | 接口 | <code>interface MemoryServerMigrationPrepareInput</code> | Memory Server Migration Prepare Input 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationRehearsalCheckpoint` | 接口 | <code>interface MemoryServerMigrationRehearsalCheckpoint</code> | Memory Server Migration Rehearsal Checkpoint 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationRehearsalCheckpointStore` | 接口 | <code>interface MemoryServerMigrationRehearsalCheckpointStore</code> | Memory Server Migration Rehearsal Checkpoint Store 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationRehearsalDataPort` | 接口 | <code>interface MemoryServerMigrationRehearsalDataPort</code> | Memory Server Migration Rehearsal Data Port 的字段契约；完整字段见下表。 |

## `MemoryServerMigrationRehearsal` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(): Promise&lt;MemoryServerMigrationInventoryPlan&gt;</code> | 规划 plan。 |
| `prepare` | 方法 | <code>prepare(input: MemoryServerMigrationPrepareInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | prepare 的公开运行时操作。 |
| `retire` | 方法 | <code>retire(input: MemoryServerMigrationFinishInput &amp; { rollbackWindowEndsAt: string; }): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | retire 的公开运行时操作。 |
| `rollback` | 方法 | <code>rollback(input: MemoryServerMigrationFinishInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | rollback 的公开运行时操作。 |

## `MemoryServerMigrationFinishInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: string</code> | expected Revision 字段。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | migration Id 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |

## `MemoryServerMigrationInventoryPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalRecords` | 属性 | <code>canonicalRecords: number</code> | canonical Records 字段。 |
| `digestMismatchKeys` | 属性 | <code>digestMismatchKeys: string[]</code> | digest Mismatch Keys 字段。 |
| `legacyRecords` | 属性 | <code>legacyRecords: number</code> | legacy Records 字段。 |
| `matchingRecords` | 属性 | <code>matchingRecords: number</code> | matching Records 字段。 |
| `missingCanonicalKeys` | 属性 | <code>missingCanonicalKeys: string[]</code> | missing Canonical Keys 字段。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | reconciliation 字段。 |
| `unexpectedCanonicalKeys` | 属性 | <code>unexpectedCanonicalKeys: string[]</code> | unexpected Canonical Keys 字段。 |

## `MemoryServerMigrationInventoryRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `digest` | 属性 | <code>digest: string</code> | digest 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |

## `MemoryServerMigrationPrepareInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | checkpoint Ref 字段。 |
| `dualWriteDeadlineAt` | 属性 | <code>dualWriteDeadlineAt: string</code> | dual Write Deadline At 字段。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | migration Id 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |

## `MemoryServerMigrationRehearsalCheckpoint` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: readonly MemoryServerMigrationTransitionEvent[]</code> | events 字段。 |
| `importedCanonicalIds` | 属性 | <code>importedCanonicalIds: readonly string[]</code> | imported Canonical Ids 字段。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | reconciliation 字段。 |
| `state` | 属性 | <code>state: MemoryServerCanonicalMigrationState</code> | state 字段。 |

## `MemoryServerMigrationRehearsalCheckpointStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `load` | 方法 | <code>load(migrationId: string): Promise&lt;MemoryServerMigrationRehearsalCheckpoint &#124; null&gt;</code> | 加载 load。 |
| `save` | 方法 | <code>save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise&lt;void&gt;</code> | 保存 save。 |

## `MemoryServerMigrationRehearsalDataPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `importCanonical` | 方法 | <code>importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string): Promise&lt;{ canonicalId: string; }&gt;</code> | import Canonical 的公开运行时操作。 |
| `listCanonical` | 方法 | <code>listCanonical(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | 列出 Canonical。 |
| `listLegacy` | 方法 | <code>listLegacy(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | 列出 Legacy。 |
| `observeRetirement` | 方法 | <code>observeRetirement(): Promise&lt;Omit&lt;MemoryServerMigrationRetirementEvidence, "rollbackWindowEndsAt"&gt;&gt;</code> | observe Retirement 的公开运行时操作。 |
| `removeCanonical` | 方法 | <code>removeCanonical(canonicalIds: readonly string[]): Promise&lt;void&gt;</code> | 移除 Canonical。 |
| `writeDualProbe` | 方法 | <code>writeDualProbe(idempotencyKey: string): Promise&lt;{ record: MemoryServerMigrationInventoryRecord; canonicalId: string; }&gt;</code> | write Dual Probe 的公开运行时操作。 |
