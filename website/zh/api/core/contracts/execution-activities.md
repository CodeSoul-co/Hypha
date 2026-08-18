# `@codesoul-co/hypha-core` / `contracts/execution-activities`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)
- 导出数: **5**

## 模块用法

用于声明并运行时校验契约。Execution activities 模块公开 1 常量、2 接口、2 类型。

### 从包入口导入

```ts
import {
  EXECUTION_ACTIVITY_STATUSES,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionActivityRequest,
  ExecutionActivityResult,
  ExecutionActivityStatus,
  WorkspaceOperationRequest,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EXECUTION_ACTIVITY_STATUSES` | 常量 | <code>const EXECUTION_ACTIVITY_STATUSES: readonly ["completed", "failed", "timeout", "cancelled", "unknown"]</code> | 由 `contracts/execution-activities` 模块导出的 EXECUTION ACTIVITY STATUSES 常量。 |
| `ExecutionActivityRequest` | 接口 | <code>interface ExecutionActivityRequest</code> | Execution Activity Request 接口，共包含 9 个公开字段或方法。 |
| `ExecutionActivityResult` | 接口 | <code>interface ExecutionActivityResult</code> | Execution Activity Result 接口，共包含 7 个公开字段或方法。 |
| `ExecutionActivityStatus` | 类型 | <code>type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number]</code> | Execution Activity Status 公共类型别名；完整类型表达式见声明。 |
| `WorkspaceOperationRequest` | 类型 | <code>type WorkspaceOperationRequest = WorkspacePathRequest &#124; WorkspaceListRequest &#124; WorkspaceReadRequest &#124; WorkspaceWriteRequest &#124; WorkspaceDeleteRequest &#124; WorkspaceSnapshotRequest &#124; WorkspaceRestoreRequest &#124; WorkspaceDiffRequest &#124; WorkspacePatchRequest</code> | Workspace Operation Request 公共类型别名；完整类型表达式见声明。 |

## `EXECUTION_ACTIVITY_STATUSES`

由 `contracts/execution-activities` 模块导出的 EXECUTION ACTIVITY STATUSES 常量。

- 种类: 常量
- 导入: `import { EXECUTION_ACTIVITY_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### 声明

```text
export declare const EXECUTION_ACTIVITY_STATUSES: readonly ["completed", "failed", "timeout", "cancelled", "unknown"];
```

## `ExecutionActivityRequest`

Execution Activity Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionActivityRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### 声明

```text
export interface ExecutionActivityRequest {
    activityId: string;
    operationId: string;
    runId: string;
    stateAttemptId: string;
    workspaceId: string;
    request: CommandExecutionRequest | WorkspaceOperationRequest;
    fencingToken: number;
    deadlineAt?: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttemptId` | 属性 | <code>stateAttemptId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionActivityResult`

Execution Activity Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionActivityResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### 声明

```text
export interface ExecutionActivityResult {
    activityId: string;
    status: ExecutionActivityStatus;
    executionId?: string;
    artifactRefs?: string[];
    snapshotRef?: string;
    eventIds: string[];
    error?: NormalizedExecutionError;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedExecutionError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshotRef` | 属性 | <code>snapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timeout"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionActivityStatus`

Execution Activity Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionActivityStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### 声明

```text
export type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number];
```

## `WorkspaceOperationRequest`

Workspace Operation Request 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { WorkspaceOperationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### 声明

```text
export type WorkspaceOperationRequest = WorkspacePathRequest | WorkspaceListRequest | WorkspaceReadRequest | WorkspaceWriteRequest | WorkspaceDeleteRequest | WorkspaceSnapshotRequest | WorkspaceRestoreRequest | WorkspaceDiffRequest | WorkspacePatchRequest;
```
