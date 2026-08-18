# `@codesoul-co/hypha-core` / `contracts/runtime-checkpoint`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-checkpoint.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)
- 导出数: **16**

## 模块用法

用于声明并运行时校验契约。Runtime checkpoint 模块公开 4 常量、8 接口、4 类型。

### 从包入口导入

```ts
import {
  RUNTIME_CHECKPOINT_COMPRESSIONS,
  RUNTIME_CHECKPOINT_DISPOSITIONS,
  RUNTIME_CHECKPOINT_MODES,
  RUNTIME_CHECKPOINT_REASONS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCheckpointCreateCommand,
  RuntimeCheckpointCreateResult,
  RuntimeCheckpointLoadRequest,
  RuntimeCheckpointLoadResult,
  RuntimeCheckpointPolicySpec,
  RuntimeCheckpointPutResult,
  RuntimeCheckpointRecord,
  RuntimeCheckpointStore,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_CHECKPOINT_COMPRESSIONS` | 常量 | <code>const RUNTIME_CHECKPOINT_COMPRESSIONS: readonly ["none", "gzip", "zstd"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT COMPRESSIONS 常量。 |
| `RUNTIME_CHECKPOINT_DISPOSITIONS` | 常量 | <code>const RUNTIME_CHECKPOINT_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT DISPOSITIONS 常量。 |
| `RUNTIME_CHECKPOINT_MODES` | 常量 | <code>const RUNTIME_CHECKPOINT_MODES: readonly ["none", "state_boundary", "every_n_events", "wait_boundary", "custom"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT MODES 常量。 |
| `RUNTIME_CHECKPOINT_REASONS` | 常量 | <code>const RUNTIME_CHECKPOINT_REASONS: readonly ["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"]</code> | 由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT REASONS 常量。 |
| `RuntimeCheckpointCreateCommand` | 接口 | <code>interface RuntimeCheckpointCreateCommand</code> | Runtime Checkpoint Create Command 接口，共包含 15 个公开字段或方法。 |
| `RuntimeCheckpointCreateResult` | 接口 | <code>interface RuntimeCheckpointCreateResult</code> | Runtime Checkpoint Create Result 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCheckpointLoadRequest` | 接口 | <code>interface RuntimeCheckpointLoadRequest</code> | Runtime Checkpoint Load Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeCheckpointLoadResult` | 接口 | <code>interface RuntimeCheckpointLoadResult</code> | Runtime Checkpoint Load Result 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCheckpointPolicySpec` | 接口 | <code>interface RuntimeCheckpointPolicySpec</code> | Runtime Checkpoint Policy Spec 接口，共包含 6 个公开字段或方法。 |
| `RuntimeCheckpointPutResult` | 接口 | <code>interface RuntimeCheckpointPutResult</code> | Runtime Checkpoint Put Result 接口，共包含 2 个公开字段或方法。 |
| `RuntimeCheckpointRecord` | 接口 | <code>interface RuntimeCheckpointRecord</code> | Runtime Checkpoint Record 接口，共包含 20 个公开字段或方法。 |
| `RuntimeCheckpointStore` | 接口 | <code>interface RuntimeCheckpointStore</code> | Runtime Checkpoint Store 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCheckpointCompression` | 类型 | <code>type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number]</code> | Runtime Checkpoint Compression 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCheckpointDisposition` | 类型 | <code>type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number]</code> | Runtime Checkpoint Disposition 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCheckpointMode` | 类型 | <code>type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number]</code> | Runtime Checkpoint Mode 公共类型别名；完整类型表达式见声明。 |
| `RuntimeCheckpointReason` | 类型 | <code>type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number]</code> | Runtime Checkpoint Reason 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_CHECKPOINT_COMPRESSIONS`

由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT COMPRESSIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CHECKPOINT_COMPRESSIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export declare const RUNTIME_CHECKPOINT_COMPRESSIONS: readonly ["none", "gzip", "zstd"];
```

## `RUNTIME_CHECKPOINT_DISPOSITIONS`

由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT DISPOSITIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CHECKPOINT_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export declare const RUNTIME_CHECKPOINT_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"];
```

## `RUNTIME_CHECKPOINT_MODES`

由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT MODES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CHECKPOINT_MODES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export declare const RUNTIME_CHECKPOINT_MODES: readonly ["none", "state_boundary", "every_n_events", "wait_boundary", "custom"];
```

## `RUNTIME_CHECKPOINT_REASONS`

由 `contracts/runtime-checkpoint` 模块导出的 RUNTIME CHECKPOINT REASONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_CHECKPOINT_REASONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export declare const RUNTIME_CHECKPOINT_REASONS: readonly ["state_boundary", "human_wait", "signal_wait", "timer_wait", "manual", "failure"];
```

## `RuntimeCheckpointCreateCommand`

Runtime Checkpoint Create Command 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointCreateCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointCreateCommand {
    checkpointId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    workflowRevision: string;
    processHash: string;
    variablesHash: string;
    dependencySnapshotRef: string;
    toolContractSnapshotRef?: string;
    workspaceSnapshotRef?: string;
    contextSnapshotRefs?: string[];
    reason: RuntimeCheckpointReason;
    createdAt: string;
    idempotencyKey?: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSnapshotRefs` | 属性 | <code>contextSnapshotRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencySnapshotRef` | 属性 | <code>dependencySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processHash` | 属性 | <code>processHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolContractSnapshotRef` | 属性 | <code>toolContractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variablesHash` | 属性 | <code>variablesHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceSnapshotRef` | 属性 | <code>workspaceSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointCreateResult`

Runtime Checkpoint Create Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointCreateResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointCreateResult {
    checkpointId: string;
    disposition: RuntimeCheckpointDisposition;
    eventIds: string[];
    record?: RuntimeCheckpointRecord;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointId` | 属性 | <code>checkpointId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record?: RuntimeCheckpointRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointLoadRequest`

Runtime Checkpoint Load Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointLoadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointLoadRequest {
    scope: RuntimeScope;
    checkpointId?: string;
    checkedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointId` | 属性 | <code>checkpointId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointLoadResult`

Runtime Checkpoint Load Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointLoadResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointLoadResult {
    record: RuntimeCheckpointRecord;
    currentHeadSequence: number;
    deltaFromSequence: number;
    deltaEventCount: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentHeadSequence` | 属性 | <code>currentHeadSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deltaEventCount` | 属性 | <code>deltaEventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deltaFromSequence` | 属性 | <code>deltaFromSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `record` | 属性 | <code>record: RuntimeCheckpointRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointPolicySpec`

Runtime Checkpoint Policy Spec 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointPolicySpec } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointPolicySpec {
    mode: RuntimeCheckpointMode;
    everyNEvents?: number;
    retainLast?: number;
    persistWorkspaceSnapshot?: boolean;
    persistContextRefs?: boolean;
    compression?: RuntimeCheckpointCompression;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compression` | 属性 | <code>compression?: "none" &#124; "gzip" &#124; "zstd"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `everyNEvents` | 属性 | <code>everyNEvents?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "none" &#124; "custom" &#124; "state_boundary" &#124; "every_n_events" &#124; "wait_boundary"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persistContextRefs` | 属性 | <code>persistContextRefs?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persistWorkspaceSnapshot` | 属性 | <code>persistWorkspaceSnapshot?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retainLast` | 属性 | <code>retainLast?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointPutResult`

Runtime Checkpoint Put Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointPutResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointPutResult {
    record: RuntimeCheckpointRecord;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 属性 | <code>record: RuntimeCheckpointRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointRecord`

Runtime Checkpoint Record 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointRecord {
    id: string;
    scope: RuntimeScope;
    sequence: number;
    workflowRevision: string;
    processHash: string;
    currentState: string;
    variablesHash: string;
    projectionVersion: string;
    projectionSnapshot: RuntimeOrchestrationProjection;
    dependencySnapshotRef: string;
    toolContractSnapshotRef?: string;
    workspaceSnapshotRef?: string;
    contextSnapshotRefs?: string[];
    pendingWaitRef?: string;
    lastEventSequence: number;
    reason: RuntimeCheckpointReason;
    requestHash: string;
    checksum: string;
    createdAt: string;
    metadata?: Record<string, RuntimeJsonValue>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checksum` | 属性 | <code>checksum: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSnapshotRefs` | 属性 | <code>contextSnapshotRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentState` | 属性 | <code>currentState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencySnapshotRef` | 属性 | <code>dependencySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastEventSequence` | 属性 | <code>lastEventSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingWaitRef` | 属性 | <code>pendingWaitRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processHash` | 属性 | <code>processHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionSnapshot` | 属性 | <code>projectionSnapshot: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "manual" &#124; "state_boundary" &#124; "human_wait" &#124; "signal_wait" &#124; "timer_wait" &#124; "failure"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestHash` | 属性 | <code>requestHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolContractSnapshotRef` | 属性 | <code>toolContractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variablesHash` | 属性 | <code>variablesHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceSnapshotRef` | 属性 | <code>workspaceSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCheckpointStore`

Runtime Checkpoint Store 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export interface RuntimeCheckpointStore {
    put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise<RuntimeCheckpointPutResult>;
    get(scope: RuntimeScope, checkpointId: string): Promise<RuntimeCheckpointRecord | null>;
    latest(scope: RuntimeScope): Promise<RuntimeCheckpointRecord | null>;
    list(scope: RuntimeScope, limit?: number): Promise<RuntimeCheckpointRecord[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(scope: RuntimeScope, checkpointId: string): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `latest` | 方法 | <code>latest(scope: RuntimeScope): Promise&lt;RuntimeCheckpointRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(scope: RuntimeScope, limit?: number): Promise&lt;RuntimeCheckpointRecord[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(record: RuntimeCheckpointRecord, idempotencyKey: string): Promise&lt;RuntimeCheckpointPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeCheckpointCompression`

Runtime Checkpoint Compression 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCheckpointCompression } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export type RuntimeCheckpointCompression = (typeof RUNTIME_CHECKPOINT_COMPRESSIONS)[number];
```

## `RuntimeCheckpointDisposition`

Runtime Checkpoint Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCheckpointDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export type RuntimeCheckpointDisposition = (typeof RUNTIME_CHECKPOINT_DISPOSITIONS)[number];
```

## `RuntimeCheckpointMode`

Runtime Checkpoint Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCheckpointMode } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export type RuntimeCheckpointMode = (typeof RUNTIME_CHECKPOINT_MODES)[number];
```

## `RuntimeCheckpointReason`

Runtime Checkpoint Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeCheckpointReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-checkpoint`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-checkpoint.ts)

### 声明

```text
export type RuntimeCheckpointReason = (typeof RUNTIME_CHECKPOINT_REASONS)[number];
```
