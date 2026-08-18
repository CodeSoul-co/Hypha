# `@codesoul-co/hypha-core` / `contracts/runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)
- 导出数: **20**

## 模块用法

用于声明并运行时校验契约。Runtime 模块公开 6 常量、8 接口、6 类型。

### 从包入口导入

```ts
import {
  RUNTIME_ERROR_CODES,
  RUNTIME_PRINCIPAL_TYPES,
  RUNTIME_RUN_STATUSES,
  RUNTIME_SESSION_STATUSES,
  RUNTIME_WAIT_STATUSES,
  RUNTIME_WAIT_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  NormalizedRuntimeError,
  RunSignalRequest,
  RuntimePrincipal,
  RuntimeRun,
  RuntimeScope,
  RuntimeSession,
  RuntimeWaitRecord,
  RuntimeWaitRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 14 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 6 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ERROR_CODES` | 常量 | <code>const RUNTIME_ERROR_CODES: readonly ["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RU...</code> | 由 `contracts/runtime` 模块导出的 RUNTIME ERROR CODES 常量。 |
| `RUNTIME_PRINCIPAL_TYPES` | 常量 | <code>const RUNTIME_PRINCIPAL_TYPES: readonly ["user", "agent", "service", "system"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME PRINCIPAL TYPES 常量。 |
| `RUNTIME_RUN_STATUSES` | 常量 | <code>const RUNTIME_RUN_STATUSES: readonly ["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME RUN STATUSES 常量。 |
| `RUNTIME_SESSION_STATUSES` | 常量 | <code>const RUNTIME_SESSION_STATUSES: readonly ["active", "closed", "archived"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME SESSION STATUSES 常量。 |
| `RUNTIME_WAIT_STATUSES` | 常量 | <code>const RUNTIME_WAIT_STATUSES: readonly ["waiting", "received", "expired", "cancelled"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME WAIT STATUSES 常量。 |
| `RUNTIME_WAIT_TYPES` | 常量 | <code>const RUNTIME_WAIT_TYPES: readonly ["human", "signal", "timer", "external_operation"]</code> | 由 `contracts/runtime` 模块导出的 RUNTIME WAIT TYPES 常量。 |
| `NormalizedRuntimeError` | 接口 | <code>interface NormalizedRuntimeError</code> | Normalized Runtime Error 接口，共包含 7 个公开字段或方法。 |
| `RunSignalRequest` | 接口 | <code>interface RunSignalRequest</code> | Run Signal Request 接口，共包含 7 个公开字段或方法。 |
| `RuntimePrincipal` | 接口 | <code>interface RuntimePrincipal</code> | Runtime Principal 接口，共包含 8 个公开字段或方法。 |
| `RuntimeRun` | 接口 | <code>interface RuntimeRun</code> | Runtime Run 接口，共包含 32 个公开字段或方法。 |
| `RuntimeScope` | 接口 | <code>interface RuntimeScope</code> | Runtime Scope 接口，共包含 6 个公开字段或方法。 |
| `RuntimeSession` | 接口 | <code>interface RuntimeSession</code> | Runtime Session 接口，共包含 13 个公开字段或方法。 |
| `RuntimeWaitRecord` | 接口 | <code>interface RuntimeWaitRecord</code> | Runtime Wait Record 接口，共包含 11 个公开字段或方法。 |
| `RuntimeWaitRequest` | 接口 | <code>interface RuntimeWaitRequest</code> | Runtime Wait Request 接口，共包含 7 个公开字段或方法。 |
| `RuntimeErrorCode` | 类型 | <code>type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number]</code> | Runtime Error Code 公共类型别名；完整类型表达式见声明。 |
| `RuntimePrincipalType` | 类型 | <code>type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number]</code> | Runtime Principal Type 公共类型别名；完整类型表达式见声明。 |
| `RuntimeRunStatus` | 类型 | <code>type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number]</code> | Runtime Run Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeSessionStatus` | 类型 | <code>type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number]</code> | Runtime Session Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeWaitStatus` | 类型 | <code>type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number]</code> | Runtime Wait Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeWaitType` | 类型 | <code>type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number]</code> | Runtime Wait Type 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_ERROR_CODES`

由 `contracts/runtime` 模块导出的 RUNTIME ERROR CODES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ERROR_CODES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export declare const RUNTIME_ERROR_CODES: readonly ["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RUNTIME_RUN_CONFLICT", "RUNTIME_LEASE_CONFLICT", "RUNTIME_WORKFLOW_INVALID", "RUNTIME_PROCESS_MISMATCH", "RUNTIME_STATE_NOT_FOUND", "RUNTIME_TRANSITION_REJECTED", "RUNTIME_GUARD_FAILED", "RUNTIME_INVARIANT_FAILED", "RUNTIME_STATE_TIMEOUT", "RUNTIME_RUN_TIMEOUT", "RUNTIME_CANCELLED", "RUNTIME_SIGNAL_INVALID", "RUNTIME_SIGNAL_EXPIRED", "RUNTIME_RETRY_EXHAUSTED", "RUNTIME_CHECKPOINT_FAILED", "RUNTIME_EVENT_APPEND_FAILED", "RUNTIME_PROJECTION_FAILED", "RUNTIME_REPLAY_DIVERGENCE", "RUNTIME_INTERNAL_ERROR"];
```

## `RUNTIME_PRINCIPAL_TYPES`

由 `contracts/runtime` 模块导出的 RUNTIME PRINCIPAL TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_PRINCIPAL_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export declare const RUNTIME_PRINCIPAL_TYPES: readonly ["user", "agent", "service", "system"];
```

## `RUNTIME_RUN_STATUSES`

由 `contracts/runtime` 模块导出的 RUNTIME RUN STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RUN_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export declare const RUNTIME_RUN_STATUSES: readonly ["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"];
```

## `RUNTIME_SESSION_STATUSES`

由 `contracts/runtime` 模块导出的 RUNTIME SESSION STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_SESSION_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export declare const RUNTIME_SESSION_STATUSES: readonly ["active", "closed", "archived"];
```

## `RUNTIME_WAIT_STATUSES`

由 `contracts/runtime` 模块导出的 RUNTIME WAIT STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_WAIT_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export declare const RUNTIME_WAIT_STATUSES: readonly ["waiting", "received", "expired", "cancelled"];
```

## `RUNTIME_WAIT_TYPES`

由 `contracts/runtime` 模块导出的 RUNTIME WAIT TYPES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_WAIT_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export declare const RUNTIME_WAIT_TYPES: readonly ["human", "signal", "timer", "external_operation"];
```

## `NormalizedRuntimeError`

Normalized Runtime Error 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedRuntimeError } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface NormalizedRuntimeError {
    code: RuntimeErrorCode;
    message: string;
    retryable: boolean;
    stateId?: string;
    transitionId?: string;
    details?: Record<string, unknown>;
    causeRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causeRef` | 属性 | <code>causeRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" &#124; "RUNTIME_FENCING_REJECTED" &#124; "RUNTIME_RESOURCE_CONFLICT" &#124; "RUNTIME_IDEMPOTENCY_CONFLICT" &#124; "RUNTIME_EVENT_STREAM_CORRUPT" &#124; "RUNTIME_RECOVERY_REQUIRES_REVIEW" &#124; "RUNTIME_RUN_NOT_FOUND" &#124; "RUNTIME_RUN_CONFLICT"...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `details` | 属性 | <code>details?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transitionId` | 属性 | <code>transitionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RunSignalRequest`

Run Signal Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RunSignalRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RunSignalRequest {
    signalId: string;
    runId: string;
    key: string;
    principal: RuntimePrincipal;
    payload: unknown;
    idempotencyKey?: string;
    sentAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sentAt` | 属性 | <code>sentAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signalId` | 属性 | <code>signalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimePrincipal`

Runtime Principal 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimePrincipal } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RuntimePrincipal {
    principalId: string;
    type: RuntimePrincipalType;
    tenantId?: string;
    userId?: string;
    agentId?: string;
    roles?: string[];
    permissionScopes: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `roles` | 属性 | <code>roles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRun`

Runtime Run 接口，共包含 32 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRun } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RuntimeRun {
    id: string;
    revision: number;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    domainPackRef?: SpecRef;
    workflowRef: SpecRef;
    workflowRevision: string;
    processSpecRef: string;
    processHash: string;
    rootAgentRef?: SpecRef;
    runtimeProfileRef?: SpecRef;
    status: RuntimeRunStatus;
    input: unknown;
    inputHash: string;
    output?: unknown;
    outputHash?: string;
    currentState?: string;
    terminalState?: string;
    correlationId: string;
    idempotencyKey?: string;
    deadlineAt?: string;
    cancelRequestedAt?: string;
    cancelReason?: string;
    createdAt: string;
    queuedAt?: string;
    startedAt?: string;
    updatedAt: string;
    completedAt?: string;
    error?: NormalizedRuntimeError;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancelReason` | 属性 | <code>cancelReason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancelRequestedAt` | 属性 | <code>cancelRequestedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentState` | 属性 | <code>currentState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedRuntimeError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processHash` | 属性 | <code>processHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processSpecRef` | 属性 | <code>processSpecRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queuedAt` | 属性 | <code>queuedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootAgentRef` | 属性 | <code>rootAgentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runtimeProfileRef` | 属性 | <code>runtimeProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "starting" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "acquiring" &#124; "waiting" &#124; "waiting_human" &#124; "waiting_signal" &#124; "waiting_timer" &#124; "pausing" &#124; "paused" &#124; "retry_scheduled" &#124; "recovering"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalState` | 属性 | <code>terminalState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRevision` | 属性 | <code>workflowRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeScope`

Runtime Scope 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RuntimeScope {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    runId: string;
    agentId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeSession`

Runtime Session 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeSession } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RuntimeSession {
    id: string;
    revision: number;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    domainPackRef?: SpecRef;
    sessionProfileRef?: SpecRef;
    title?: string;
    metadata: Record<string, unknown>;
    status: RuntimeSessionStatus;
    createdAt: string;
    updatedAt: string;
    closedAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `closedAt` | 属性 | <code>closedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "archived" &#124; "active" &#124; "closed"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `title` | 属性 | <code>title?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeWaitRecord`

Runtime Wait Record 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeWaitRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RuntimeWaitRecord {
    id: string;
    runId: string;
    stateId: string;
    type: RuntimeWaitType;
    key?: string;
    status: RuntimeWaitStatus;
    expectedSchemaHash?: string;
    createdAt: string;
    expiresAt?: string;
    resolvedAt?: string;
    signalRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSchemaHash` | 属性 | <code>expectedSchemaHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedAt` | 属性 | <code>resolvedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signalRef` | 属性 | <code>signalRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "cancelled" &#124; "expired" &#124; "waiting" &#124; "received"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeWaitRequest`

Runtime Wait Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeWaitRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export interface RuntimeWaitRequest {
    type: RuntimeWaitType;
    key?: string;
    expectedSchema?: JsonSchema;
    expiresAt?: string;
    timeoutTransitionId?: string;
    pendingActionRef?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedSchema` | 属性 | <code>expectedSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutTransitionId` | 属性 | <code>timeoutTransitionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeErrorCode`

Runtime Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeErrorCode } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number];
```

## `RuntimePrincipalType`

Runtime Principal Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimePrincipalType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number];
```

## `RuntimeRunStatus`

Runtime Run Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeRunStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number];
```

## `RuntimeSessionStatus`

Runtime Session Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeSessionStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number];
```

## `RuntimeWaitStatus`

Runtime Wait Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeWaitStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number];
```

## `RuntimeWaitType`

Runtime Wait Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeWaitType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### 声明

```text
export type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number];
```
