# `@codesoul-co/hypha-memory` / `memory-server-migration-rehearsal`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-rehearsal.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)
- 导出数: **9**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server migration rehearsal 模块公开 1 类、1 函数、7 接口。

### 从包入口导入

```ts
import {
  MemoryServerMigrationRehearsal,
  planMemoryServerMigrationInventories,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryServerMigrationFinishInput,
  MemoryServerMigrationInventoryPlan,
  MemoryServerMigrationInventoryRecord,
  MemoryServerMigrationPrepareInput,
  MemoryServerMigrationRehearsalCheckpoint,
  MemoryServerMigrationRehearsalCheckpointStore,
  MemoryServerMigrationRehearsalDataPort,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryServerMigrationRehearsal` | 类 | <code>new MemoryServerMigrationRehearsal(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | Memory Server Migration Rehearsal 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `planMemoryServerMigrationInventories` | 函数 | <code>planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan</code> | Plan Memory Server Migration Inventories 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryServerMigrationFinishInput` | 接口 | <code>interface MemoryServerMigrationFinishInput</code> | Memory Server Migration Finish Input 接口，共包含 3 个公开字段或方法。 |
| `MemoryServerMigrationInventoryPlan` | 接口 | <code>interface MemoryServerMigrationInventoryPlan</code> | Memory Server Migration Inventory Plan 接口，共包含 7 个公开字段或方法。 |
| `MemoryServerMigrationInventoryRecord` | 接口 | <code>interface MemoryServerMigrationInventoryRecord</code> | Memory Server Migration Inventory Record 接口，共包含 2 个公开字段或方法。 |
| `MemoryServerMigrationPrepareInput` | 接口 | <code>interface MemoryServerMigrationPrepareInput</code> | Memory Server Migration Prepare Input 接口，共包含 5 个公开字段或方法。 |
| `MemoryServerMigrationRehearsalCheckpoint` | 接口 | <code>interface MemoryServerMigrationRehearsalCheckpoint</code> | Memory Server Migration Rehearsal Checkpoint 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerMigrationRehearsalCheckpointStore` | 接口 | <code>interface MemoryServerMigrationRehearsalCheckpointStore</code> | Memory Server Migration Rehearsal Checkpoint Store 接口，共包含 2 个公开字段或方法。 |
| `MemoryServerMigrationRehearsalDataPort` | 接口 | <code>interface MemoryServerMigrationRehearsalDataPort</code> | Memory Server Migration Rehearsal Data Port 接口，共包含 6 个公开字段或方法。 |

## `MemoryServerMigrationRehearsal`

Memory Server Migration Rehearsal 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryServerMigrationRehearsal } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export declare class MemoryServerMigrationRehearsal {
    constructor(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore);
    plan(): Promise<MemoryServerMigrationInventoryPlan>;
    prepare(input: MemoryServerMigrationPrepareInput): Promise<MemoryServerMigrationRehearsalCheckpoint>;
    rollback(input: MemoryServerMigrationFinishInput): Promise<MemoryServerMigrationRehearsalCheckpoint>;
    retire(input: MemoryServerMigrationFinishInput & {
            rollbackWindowEndsAt: string;
        }): Promise<MemoryServerMigrationRehearsalCheckpoint>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(): Promise&lt;MemoryServerMigrationInventoryPlan&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `prepare` | 方法 | <code>prepare(input: MemoryServerMigrationPrepareInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retire` | 方法 | <code>retire(input: MemoryServerMigrationFinishInput &amp; { rollbackWindowEndsAt: string; }): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `rollback` | 方法 | <code>rollback(input: MemoryServerMigrationFinishInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `planMemoryServerMigrationInventories`

Plan Memory Server Migration Inventories 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { planMemoryServerMigrationInventories } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export declare function planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan;
```

### 调用签名

```text
planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `legacyInput` | <code>readonly MemoryServerMigrationInventoryRecord[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `canonicalInput` | <code>readonly MemoryServerMigrationInventoryRecord[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryServerMigrationInventoryPlan`
- 说明: 返回值契约由上述类型定义。

## `MemoryServerMigrationFinishInput`

Memory Server Migration Finish Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationFinishInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationFinishInput {
    migrationId: string;
    expectedRevision: string;
    occurredAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedRevision` | 属性 | <code>expectedRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationInventoryPlan`

Memory Server Migration Inventory Plan 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationInventoryPlan } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationInventoryPlan {
    legacyRecords: number;
    canonicalRecords: number;
    matchingRecords: number;
    missingCanonicalKeys: string[];
    unexpectedCanonicalKeys: string[];
    digestMismatchKeys: string[];
    reconciliation: MemoryServerMigrationReconciliation;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalRecords` | 属性 | <code>canonicalRecords: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `digestMismatchKeys` | 属性 | <code>digestMismatchKeys: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyRecords` | 属性 | <code>legacyRecords: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `matchingRecords` | 属性 | <code>matchingRecords: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missingCanonicalKeys` | 属性 | <code>missingCanonicalKeys: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `unexpectedCanonicalKeys` | 属性 | <code>unexpectedCanonicalKeys: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationInventoryRecord`

Memory Server Migration Inventory Record 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationInventoryRecord } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationInventoryRecord {
    key: string;
    digest: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `digest` | 属性 | <code>digest: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationPrepareInput`

Memory Server Migration Prepare Input 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationPrepareInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationPrepareInput {
    migrationId: string;
    revision: string;
    occurredAt: string;
    dualWriteDeadlineAt: string;
    checkpointRef: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dualWriteDeadlineAt` | 属性 | <code>dualWriteDeadlineAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationRehearsalCheckpoint`

Memory Server Migration Rehearsal Checkpoint 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationRehearsalCheckpoint } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationRehearsalCheckpoint {
    state: MemoryServerCanonicalMigrationState;
    events: readonly MemoryServerMigrationTransitionEvent[];
    importedCanonicalIds: readonly string[];
    reconciliation: MemoryServerMigrationReconciliation;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: readonly MemoryServerMigrationTransitionEvent[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importedCanonicalIds` | 属性 | <code>importedCanonicalIds: readonly string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: MemoryServerCanonicalMigrationState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationRehearsalCheckpointStore`

Memory Server Migration Rehearsal Checkpoint Store 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationRehearsalCheckpointStore } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationRehearsalCheckpointStore {
    load(migrationId: string): Promise<MemoryServerMigrationRehearsalCheckpoint | null>;
    save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `load` | 方法 | <code>load(migrationId: string): Promise&lt;MemoryServerMigrationRehearsalCheckpoint &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `save` | 方法 | <code>save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryServerMigrationRehearsalDataPort`

Memory Server Migration Rehearsal Data Port 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationRehearsalDataPort } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### 声明

```text
export interface MemoryServerMigrationRehearsalDataPort {
    listLegacy(): Promise<readonly MemoryServerMigrationInventoryRecord[]>;
    listCanonical(): Promise<readonly MemoryServerMigrationInventoryRecord[]>;
    importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string): Promise<{
        canonicalId: string;
    }>;
    writeDualProbe(idempotencyKey: string): Promise<{
        record: MemoryServerMigrationInventoryRecord;
        canonicalId: string;
    }>;
    removeCanonical(canonicalIds: readonly string[]): Promise<void>;
    observeRetirement(): Promise<Omit<MemoryServerMigrationRetirementEvidence, 'rollbackWindowEndsAt'>>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `importCanonical` | 方法 | <code>importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string): Promise&lt;{ canonicalId: string; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listCanonical` | 方法 | <code>listCanonical(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `listLegacy` | 方法 | <code>listLegacy(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `observeRetirement` | 方法 | <code>observeRetirement(): Promise&lt;Omit&lt;MemoryServerMigrationRetirementEvidence, "rollbackWindowEndsAt"&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `removeCanonical` | 方法 | <code>removeCanonical(canonicalIds: readonly string[]): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `writeDualProbe` | 方法 | <code>writeDualProbe(idempotencyKey: string): Promise&lt;{ record: MemoryServerMigrationInventoryRecord; canonicalId: string; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
