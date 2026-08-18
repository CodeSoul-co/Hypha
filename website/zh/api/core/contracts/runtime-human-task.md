# `@codesoul-co/hypha-core` / `contracts/runtime-human-task`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。Runtime human task 模块公开 3 常量、3 接口、3 类型。

### 从包入口导入

```ts
import {
  RUNTIME_HUMAN_TASK_DECISIONS,
  RUNTIME_HUMAN_TASK_KINDS,
  RUNTIME_HUMAN_TASK_STATUSES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeHumanTask,
  RuntimeHumanTaskDecisionCommand,
  RuntimeHumanTaskRequest,
  RuntimeHumanTaskDecision,
  RuntimeHumanTaskKind,
  RuntimeHumanTaskStatus,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_HUMAN_TASK_DECISIONS` | 常量 | <code>const RUNTIME_HUMAN_TASK_DECISIONS: readonly ["approved", "rejected", "expired", "cancelled", "superseded"]</code> | 由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK DECISIONS 常量。 |
| `RUNTIME_HUMAN_TASK_KINDS` | 常量 | <code>const RUNTIME_HUMAN_TASK_KINDS: readonly ["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]</code> | 由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK KINDS 常量。 |
| `RUNTIME_HUMAN_TASK_STATUSES` | 常量 | <code>const RUNTIME_HUMAN_TASK_STATUSES: readonly ["pending", "approved", "rejected", "expired", "cancelled", "superseded"]</code> | 由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK STATUSES 常量。 |
| `RuntimeHumanTask` | 接口 | <code>interface RuntimeHumanTask</code> | Runtime Human Task 接口，共包含 26 个公开字段或方法。 |
| `RuntimeHumanTaskDecisionCommand` | 接口 | <code>interface RuntimeHumanTaskDecisionCommand</code> | Runtime Human Task Decision Command 接口，共包含 11 个公开字段或方法。 |
| `RuntimeHumanTaskRequest` | 接口 | <code>interface RuntimeHumanTaskRequest</code> | Runtime Human Task Request 接口，共包含 15 个公开字段或方法。 |
| `RuntimeHumanTaskDecision` | 类型 | <code>type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number]</code> | Runtime Human Task Decision 公共类型别名；完整类型表达式见声明。 |
| `RuntimeHumanTaskKind` | 类型 | <code>type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number]</code> | Runtime Human Task Kind 公共类型别名；完整类型表达式见声明。 |
| `RuntimeHumanTaskStatus` | 类型 | <code>type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number]</code> | Runtime Human Task Status 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_HUMAN_TASK_DECISIONS`

由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK DECISIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_HUMAN_TASK_DECISIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export declare const RUNTIME_HUMAN_TASK_DECISIONS: readonly ["approved", "rejected", "expired", "cancelled", "superseded"];
```

## `RUNTIME_HUMAN_TASK_KINDS`

由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK KINDS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_HUMAN_TASK_KINDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export declare const RUNTIME_HUMAN_TASK_KINDS: readonly ["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"];
```

## `RUNTIME_HUMAN_TASK_STATUSES`

由 `contracts/runtime-human-task` 模块导出的 RUNTIME HUMAN TASK STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_HUMAN_TASK_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export declare const RUNTIME_HUMAN_TASK_STATUSES: readonly ["pending", "approved", "rejected", "expired", "cancelled", "superseded"];
```

## `RuntimeHumanTask`

Runtime Human Task 接口，共包含 26 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanTask } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export interface RuntimeHumanTask {
    taskId: string;
    runId: string;
    stateId: string;
    stateAttempt: number;
    kind: RuntimeHumanTaskKind;
    subjectRef: string;
    subjectHash: string;
    status: RuntimeHumanTaskStatus;
    requestedBy: string;
    allowedDecisionScopes: string[];
    requestedAt: string;
    expiresAt?: string;
    revision: number;
    checkpointRef?: string;
    policyRef?: string;
    providerRevision?: string;
    activityDescriptorRef?: string;
    activityDescriptorHash?: string;
    decisionEventId?: string;
    decisionCommandId?: string;
    decisionIdempotencyKey?: string;
    decidedBy?: string;
    decidedAt?: string;
    supersededByTaskId?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedDecisionScopes` | 属性 | <code>allowedDecisionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointRef` | 属性 | <code>checkpointRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decidedAt` | 属性 | <code>decidedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decidedBy` | 属性 | <code>decidedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decisionCommandId` | 属性 | <code>decisionCommandId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decisionEventId` | 属性 | <code>decisionEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decisionIdempotencyKey` | 属性 | <code>decisionIdempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRef` | 属性 | <code>policyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedBy` | 属性 | <code>requestedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved" &#124; "superseded"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectRef` | 属性 | <code>subjectRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supersededByTaskId` | 属性 | <code>supersededByTaskId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHumanTaskDecisionCommand`

Runtime Human Task Decision Command 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanTaskDecisionCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export interface RuntimeHumanTaskDecisionCommand {
    commandId: string;
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    taskId: string;
    expectedRevision: number;
    expectedSubjectHash: string;
    decision: RuntimeHumanTaskDecision;
    decidedAt: string;
    supersededByTaskId?: string;
    reason?: string;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decidedAt` | 属性 | <code>decidedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved" &#124; "superseded"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedRevision` | 属性 | <code>expectedRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSubjectHash` | 属性 | <code>expectedSubjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supersededByTaskId` | 属性 | <code>supersededByTaskId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHumanTaskRequest`

Runtime Human Task Request 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanTaskRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export interface RuntimeHumanTaskRequest {
    taskId: string;
    kind: RuntimeHumanTaskKind;
    subjectRef: string;
    subjectHash: string;
    requestedBy: string;
    allowedDecisionScopes: string[];
    requestedAt: string;
    expiresAt?: string;
    checkpointRef?: string;
    policyRef?: string;
    providerRevision?: string;
    activityDescriptorRef?: string;
    activityDescriptorHash?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityDescriptorHash` | 属性 | <code>activityDescriptorHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityDescriptorRef` | 属性 | <code>activityDescriptorRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedDecisionScopes` | 属性 | <code>allowedDecisionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointRef` | 属性 | <code>checkpointRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRef` | 属性 | <code>policyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedBy` | 属性 | <code>requestedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectRef` | 属性 | <code>subjectRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHumanTaskDecision`

Runtime Human Task Decision 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeHumanTaskDecision } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number];
```

## `RuntimeHumanTaskKind`

Runtime Human Task Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeHumanTaskKind } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number];
```

## `RuntimeHumanTaskStatus`

Runtime Human Task Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeHumanTaskStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### 声明

```text
export type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number];
```
