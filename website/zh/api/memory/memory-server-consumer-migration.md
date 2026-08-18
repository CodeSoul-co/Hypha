# `@codesoul-co/hypha-memory` / `memory-server-consumer-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-consumer-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)
- 导出数: **13**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory server consumer migration 模块公开 1 常量、3 函数、7 接口、2 类型。

### 从包入口导入

```ts
import {
  allowedLegacyAdapterResponsibilities,
  assertCanonicalConsumerSet,
  createMemoryServerCanonicalMigrationState,
  transitionMemoryServerCanonicalMigration,
} from '@codesoul-co/hypha-memory';

import type {
  CanonicalProfileSwitchObservation,
  MemoryServerCanonicalMigrationState,
  MemoryServerMigrationReconciliation,
  MemoryServerMigrationRetirementEvidence,
  MemoryServerMigrationTransitionEvent,
  MemoryServerMigrationTransitionInput,
  MemoryServerMigrationTransitionResult,
  AllowedLegacyAdapterResponsibility,
} from '@codesoul-co/hypha-memory';

// 完整导出列表见下方。
```

### 使用要点

- 9 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedLegacyAdapterResponsibilities` | 常量 | <code>const allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]</code> | 由 `memory-server-consumer-migration` 模块导出的 Allowed Legacy Adapter Responsibilities 常量。 |
| `assertCanonicalConsumerSet` | 函数 | <code>assertCanonicalConsumerSet(bindings: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void</code> | Assert Canonical Consumer Set 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createMemoryServerCanonicalMigrationState` | 函数 | <code>createMemoryServerCanonicalMigrationState(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState</code> | Create Memory Server Canonical Migration State 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `transitionMemoryServerCanonicalMigration` | 函数 | <code>transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult</code> | Transition Memory Server Canonical Migration 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CanonicalProfileSwitchObservation` | 接口 | <code>interface CanonicalProfileSwitchObservation</code> | Canonical Profile Switch Observation 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerCanonicalMigrationState` | 接口 | <code>interface MemoryServerCanonicalMigrationState</code> | Memory Server Canonical Migration State 接口，共包含 8 个公开字段或方法。 |
| `MemoryServerMigrationReconciliation` | 接口 | <code>interface MemoryServerMigrationReconciliation</code> | Memory Server Migration Reconciliation 接口，共包含 4 个公开字段或方法。 |
| `MemoryServerMigrationRetirementEvidence` | 接口 | <code>interface MemoryServerMigrationRetirementEvidence</code> | Memory Server Migration Retirement Evidence 接口，共包含 5 个公开字段或方法。 |
| `MemoryServerMigrationTransitionEvent` | 接口 | <code>interface MemoryServerMigrationTransitionEvent</code> | Memory Server Migration Transition Event 接口，共包含 10 个公开字段或方法。 |
| `MemoryServerMigrationTransitionInput` | 接口 | <code>interface MemoryServerMigrationTransitionInput</code> | Memory Server Migration Transition Input 接口，共包含 7 个公开字段或方法。 |
| `MemoryServerMigrationTransitionResult` | 接口 | <code>interface MemoryServerMigrationTransitionResult</code> | Memory Server Migration Transition Result 接口，共包含 2 个公开字段或方法。 |
| `AllowedLegacyAdapterResponsibility` | 类型 | <code>type AllowedLegacyAdapterResponsibility = (typeof allowedLegacyAdapterResponsibilities)[number]</code> | Allowed Legacy Adapter Responsibility 公共类型别名；完整类型表达式见声明。 |
| `MemoryServerMigrationPhase` | 类型 | <code>type MemoryServerMigrationPhase = 'planned' &#124; 'shadow_read' &#124; 'bounded_dual_write' &#124; 'verify' &#124; 'cutover' &#124; 'retire' &#124; 'rollback'</code> | Memory Server Migration Phase 公共类型别名；完整类型表达式见声明。 |

## `allowedLegacyAdapterResponsibilities`

由 `memory-server-consumer-migration` 模块导出的 Allowed Legacy Adapter Responsibilities 常量。

- 种类: 常量
- 导入: `import { allowedLegacyAdapterResponsibilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export declare const allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"];
```

## `assertCanonicalConsumerSet`

Assert Canonical Consumer Set 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { assertCanonicalConsumerSet } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export declare function assertCanonicalConsumerSet(bindings: Partial<Record<MemoryServerConsumer, string>>, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void;
```

### 调用签名

```text
assertCanonicalConsumerSet(bindings: Partial<Record<MemoryServerConsumer, string>>, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `bindings` | <code>Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `expectedServiceInstanceId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `consumers` | <code>readonly MemoryServerConsumer[]</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `createMemoryServerCanonicalMigrationState`

Create Memory Server Canonical Migration State 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemoryServerCanonicalMigrationState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export declare function createMemoryServerCanonicalMigrationState(input: {
    migrationId: string;
    revision: string;
    createdAt: string;
}): MemoryServerCanonicalMigrationState;
```

### 调用签名

```text
createMemoryServerCanonicalMigrationState(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ migrationId: string; revision: string; createdAt: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryServerCanonicalMigrationState`
- 说明: 返回值契约由上述类型定义。

## `transitionMemoryServerCanonicalMigration`

Transition Memory Server Canonical Migration 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { transitionMemoryServerCanonicalMigration } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export declare function transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult;
```

### 调用签名

```text
transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `current` | <code>MemoryServerCanonicalMigrationState</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>MemoryServerMigrationTransitionInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryServerMigrationTransitionResult`
- 说明: 返回值契约由上述类型定义。

## `CanonicalProfileSwitchObservation`

Canonical Profile Switch Observation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CanonicalProfileSwitchObservation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface CanonicalProfileSwitchObservation {
    profileId: string;
    expectedProviderId: string;
    observedReadProviderId: string;
    observedWriteProviderId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedProviderId` | 属性 | <code>expectedProviderId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedReadProviderId` | 属性 | <code>observedReadProviderId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedWriteProviderId` | 属性 | <code>observedWriteProviderId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerCanonicalMigrationState`

Memory Server Canonical Migration State 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerCanonicalMigrationState } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface MemoryServerCanonicalMigrationState {
    migrationId: string;
    revision: string;
    phase: MemoryServerMigrationPhase;
    activePath: 'legacy' | 'dual' | 'canonical';
    updatedAt: string;
    dualWrite?: {
        deadlineAt: string;
        idempotencyKey: string;
        checkpointRef: string;
    };
    reconciliation: MemoryServerMigrationReconciliation;
    retirement?: MemoryServerMigrationRetirementEvidence;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activePath` | 属性 | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dualWrite` | 属性 | <code>dualWrite?: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `phase` | 属性 | <code>phase: MemoryServerMigrationPhase</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retirement` | 属性 | <code>retirement?: MemoryServerMigrationRetirementEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationReconciliation`

Memory Server Migration Reconciliation 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationReconciliation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface MemoryServerMigrationReconciliation {
    status: 'not_run' | 'passed' | 'failed';
    comparedRecords: number;
    mismatchCount: number;
    shadowResult: 'not_run' | 'matched' | 'mismatched';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `comparedRecords` | 属性 | <code>comparedRecords: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mismatchCount` | 属性 | <code>mismatchCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shadowResult` | 属性 | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "failed" &#124; "not_run" &#124; "passed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationRetirementEvidence`

Memory Server Migration Retirement Evidence 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationRetirementEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface MemoryServerMigrationRetirementEvidence {
    legacyReadTraffic: number;
    legacyWriteTraffic: number;
    legacyImports: number;
    legacyRegistrations: number;
    rollbackWindowEndsAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `legacyImports` | 属性 | <code>legacyImports: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyReadTraffic` | 属性 | <code>legacyReadTraffic: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyRegistrations` | 属性 | <code>legacyRegistrations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `legacyWriteTraffic` | 属性 | <code>legacyWriteTraffic: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rollbackWindowEndsAt` | 属性 | <code>rollbackWindowEndsAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationTransitionEvent`

Memory Server Migration Transition Event 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationTransitionEvent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface MemoryServerMigrationTransitionEvent {
    type: 'memory.server_migration.transitioned';
    migrationId: string;
    migrationRevision: string;
    fromPhase: MemoryServerMigrationPhase;
    toPhase: MemoryServerMigrationPhase;
    activePath: 'legacy' | 'dual' | 'canonical';
    shadowResult: MemoryServerMigrationReconciliation['shadowResult'];
    checkpointRef?: string;
    reason: string;
    occurredAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activePath` | 属性 | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointRef` | 属性 | <code>checkpointRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fromPhase` | 属性 | <code>fromPhase: MemoryServerMigrationPhase</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migrationRevision` | 属性 | <code>migrationRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `shadowResult` | 属性 | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toPhase` | 属性 | <code>toPhase: MemoryServerMigrationPhase</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "memory.server_migration.transitioned"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationTransitionInput`

Memory Server Migration Transition Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationTransitionInput } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface MemoryServerMigrationTransitionInput {
    targetPhase: Exclude<MemoryServerMigrationPhase, 'planned'>;
    expectedRevision: string;
    occurredAt: string;
    reason: string;
    dualWrite?: {
        deadlineAt: string;
        idempotencyKey: string;
        checkpointRef: string;
    };
    reconciliation?: MemoryServerMigrationReconciliation;
    retirement?: MemoryServerMigrationRetirementEvidence;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dualWrite` | 属性 | <code>dualWrite?: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliation` | 属性 | <code>reconciliation?: MemoryServerMigrationReconciliation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retirement` | 属性 | <code>retirement?: MemoryServerMigrationRetirementEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetPhase` | 属性 | <code>targetPhase: "verify" &#124; "shadow_read" &#124; "bounded_dual_write" &#124; "cutover" &#124; "retire" &#124; "rollback"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationTransitionResult`

Memory Server Migration Transition Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationTransitionResult } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export interface MemoryServerMigrationTransitionResult {
    state: MemoryServerCanonicalMigrationState;
    event: MemoryServerMigrationTransitionEvent;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `event` | 属性 | <code>event: MemoryServerMigrationTransitionEvent</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: MemoryServerCanonicalMigrationState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AllowedLegacyAdapterResponsibility`

Allowed Legacy Adapter Responsibility 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { AllowedLegacyAdapterResponsibility } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export type AllowedLegacyAdapterResponsibility = (typeof allowedLegacyAdapterResponsibilities)[number];
```

## `MemoryServerMigrationPhase`

Memory Server Migration Phase 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryServerMigrationPhase } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### 声明

```text
export type MemoryServerMigrationPhase = 'planned' | 'shadow_read' | 'bounded_dual_write' | 'verify' | 'cutover' | 'retire' | 'rollback';
```
