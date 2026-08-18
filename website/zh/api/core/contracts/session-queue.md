# `@codesoul-co/hypha-core` / `contracts/session-queue`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)
- 导出数: **27**

## 模块用法

用于声明并运行时校验契约。Session queue 模块公开 5 常量、20 接口、2 类型。

### 从包入口导入

```ts
import {
  DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS,
  SESSION_COMMAND_MAX_ATTEMPTS_LIMIT,
  SESSION_COMMAND_RUN_CANCELLED_CODE,
  SESSION_COMMAND_STATUSES,
  SESSION_COMMAND_TYPES,
} from '@codesoul-co/hypha-core';

import type {
  CancelSessionCommandsRequest,
  CancelSessionCommandsResult,
  ClaimSessionCommandRequest,
  CloseDeadLetterSessionCommandRequest,
  CompleteSessionCommandRequest,
  EnqueueSessionCommandRequest,
  FailSessionCommandRequest,
  ListSessionCommandsRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 22 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 5 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS` | 常量 | <code>const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS: 5</code> | 由 `contracts/session-queue` 模块导出的 DEFAULT SESSION COMMAND MAX ATTEMPTS 常量。 |
| `SESSION_COMMAND_MAX_ATTEMPTS_LIMIT` | 常量 | <code>const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT: 100</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND MAX ATTEMPTS LIMIT 常量。 |
| `SESSION_COMMAND_RUN_CANCELLED_CODE` | 常量 | <code>const SESSION_COMMAND_RUN_CANCELLED_CODE: "RUNTIME_RUN_CANCELLED"</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND RUN CANCELLED CODE 常量。 |
| `SESSION_COMMAND_STATUSES` | 常量 | <code>const SESSION_COMMAND_STATUSES: readonly ["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND STATUSES 常量。 |
| `SESSION_COMMAND_TYPES` | 常量 | <code>const SESSION_COMMAND_TYPES: readonly ["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]</code> | 由 `contracts/session-queue` 模块导出的 SESSION COMMAND TYPES 常量。 |
| `CancelSessionCommandsRequest` | 接口 | <code>interface CancelSessionCommandsRequest</code> | Cancel Session Commands Request 接口，共包含 6 个公开字段或方法。 |
| `CancelSessionCommandsResult` | 接口 | <code>interface CancelSessionCommandsResult</code> | Cancel Session Commands Result 接口，共包含 4 个公开字段或方法。 |
| `ClaimSessionCommandRequest` | 接口 | <code>interface ClaimSessionCommandRequest</code> | Claim Session Command Request 接口，共包含 4 个公开字段或方法。 |
| `CloseDeadLetterSessionCommandRequest` | 接口 | <code>interface CloseDeadLetterSessionCommandRequest</code> | Close Dead Letter Session Command Request 接口，共包含 6 个公开字段或方法。 |
| `CompleteSessionCommandRequest` | 接口 | <code>interface CompleteSessionCommandRequest</code> | Complete Session Command Request 接口，共包含 7 个公开字段或方法。 |
| `EnqueueSessionCommandRequest` | 接口 | <code>interface EnqueueSessionCommandRequest</code> | Enqueue Session Command Request 接口，共包含 15 个公开字段或方法。 |
| `FailSessionCommandRequest` | 接口 | <code>interface FailSessionCommandRequest</code> | Fail Session Command Request 接口，共包含 7 个公开字段或方法。 |
| `ListSessionCommandsRequest` | 接口 | <code>interface ListSessionCommandsRequest</code> | List Session Commands Request 接口，共包含 4 个公开字段或方法。 |
| `ListStuckSessionCommandsRequest` | 接口 | <code>interface ListStuckSessionCommandsRequest</code> | List Stuck Session Commands Request 接口，共包含 4 个公开字段或方法。 |
| `RedriveDeadLetterSessionCommandRequest` | 接口 | <code>interface RedriveDeadLetterSessionCommandRequest</code> | Redrive Dead Letter Session Command Request 接口，共包含 12 个公开字段或方法。 |
| `ReleaseSessionCommandRequest` | 接口 | <code>interface ReleaseSessionCommandRequest</code> | Release Session Command Request 接口，共包含 6 个公开字段或方法。 |
| `RenewSessionCommandRequest` | 接口 | <code>interface RenewSessionCommandRequest</code> | Renew Session Command Request 接口，共包含 6 个公开字段或方法。 |
| `SessionCommandClaim` | 接口 | <code>interface SessionCommandClaim</code> | Session Command Claim 接口，共包含 5 个公开字段或方法。 |
| `SessionCommandDeadLetterResolution` | 接口 | <code>interface SessionCommandDeadLetterResolution</code> | Session Command Dead Letter Resolution 接口，共包含 6 个公开字段或方法。 |
| `SessionCommandLeaseRecovery` | 接口 | <code>interface SessionCommandLeaseRecovery</code> | Session Command Lease Recovery 接口，共包含 6 个公开字段或方法。 |
| `SessionCommandRecord` | 接口 | <code>interface SessionCommandRecord</code> | Session Command Record 接口，共包含 29 个公开字段或方法。 |
| `SessionCommandRedrive` | 接口 | <code>interface SessionCommandRedrive</code> | Session Command Redrive 接口，共包含 5 个公开字段或方法。 |
| `SessionQueueHealthSnapshot` | 接口 | <code>interface SessionQueueHealthSnapshot extends Record&lt;string, unknown&gt;</code> | Session Queue Health Snapshot 接口，共包含 12 个公开字段或方法。 |
| `SessionQueueScope` | 接口 | <code>interface SessionQueueScope</code> | Session Queue Scope 接口，共包含 3 个公开字段或方法。 |
| `StuckSessionCommand` | 接口 | <code>interface StuckSessionCommand</code> | Stuck Session Command 接口，共包含 3 个公开字段或方法。 |
| `SessionCommandStatus` | 类型 | <code>type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number]</code> | Session Command Status 公共类型别名；完整类型表达式见声明。 |
| `SessionCommandType` | 类型 | <code>type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number]</code> | Session Command Type 公共类型别名；完整类型表达式见声明。 |

## `DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS`

由 `contracts/session-queue` 模块导出的 DEFAULT SESSION COMMAND MAX ATTEMPTS 常量。

- 种类: 常量
- 导入: `import { DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export declare const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS: 5;
```

## `SESSION_COMMAND_MAX_ATTEMPTS_LIMIT`

由 `contracts/session-queue` 模块导出的 SESSION COMMAND MAX ATTEMPTS LIMIT 常量。

- 种类: 常量
- 导入: `import { SESSION_COMMAND_MAX_ATTEMPTS_LIMIT } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export declare const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT: 100;
```

## `SESSION_COMMAND_RUN_CANCELLED_CODE`

由 `contracts/session-queue` 模块导出的 SESSION COMMAND RUN CANCELLED CODE 常量。

- 种类: 常量
- 导入: `import { SESSION_COMMAND_RUN_CANCELLED_CODE } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export declare const SESSION_COMMAND_RUN_CANCELLED_CODE: "RUNTIME_RUN_CANCELLED";
```

## `SESSION_COMMAND_STATUSES`

由 `contracts/session-queue` 模块导出的 SESSION COMMAND STATUSES 常量。

- 种类: 常量
- 导入: `import { SESSION_COMMAND_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export declare const SESSION_COMMAND_STATUSES: readonly ["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"];
```

## `SESSION_COMMAND_TYPES`

由 `contracts/session-queue` 模块导出的 SESSION COMMAND TYPES 常量。

- 种类: 常量
- 导入: `import { SESSION_COMMAND_TYPES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export declare const SESSION_COMMAND_TYPES: readonly ["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"];
```

## `CancelSessionCommandsRequest`

Cancel Session Commands Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CancelSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface CancelSessionCommandsRequest {
    version: '1.0.0';
    scope: SessionQueueScope;
    targetRunId: string;
    cancellationCommandId: string;
    reason: string;
    cancelledAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellationCommandId` | 属性 | <code>cancellationCommandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancelledAt` | 属性 | <code>cancelledAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CancelSessionCommandsResult`

Cancel Session Commands Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CancelSessionCommandsResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface CancelSessionCommandsResult {
    targetRunId: string;
    cancelledCommandIds: string[];
    alreadyCancelledCommandIds: string[];
    alreadyTerminalCommandIds: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alreadyCancelledCommandIds` | 属性 | <code>alreadyCancelledCommandIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `alreadyTerminalCommandIds` | 属性 | <code>alreadyTerminalCommandIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancelledCommandIds` | 属性 | <code>cancelledCommandIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ClaimSessionCommandRequest`

Claim Session Command Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ClaimSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface ClaimSessionCommandRequest {
    workerId: string;
    now: string;
    leaseMs: number;
    scope?: SessionQueueScope;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 属性 | <code>now: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CloseDeadLetterSessionCommandRequest`

Close Dead Letter Session Command Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CloseDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface CloseDeadLetterSessionCommandRequest {
    version: '1.0.0';
    scope: SessionQueueScope;
    commandId: string;
    operatorId: string;
    reason: string;
    closedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `closedAt` | 属性 | <code>closedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operatorId` | 属性 | <code>operatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `CompleteSessionCommandRequest`

Complete Session Command Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CompleteSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface CompleteSessionCommandRequest {
    commandId: string;
    workerId: string;
    claimToken: string;
    leaseEpoch: number;
    completedAt: string;
    resultRunId?: string;
    resultEventIds?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultEventIds` | 属性 | <code>resultEventIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultRunId` | 属性 | <code>resultRunId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EnqueueSessionCommandRequest`

Enqueue Session Command Request 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EnqueueSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface EnqueueSessionCommandRequest {
    id: string;
    commandType: SessionCommandType;
    idempotencyKey: string;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    targetRunId?: string;
    priority?: number;
    maxAttempts?: number;
    payloadRef?: string;
    payloadHash: string;
    createdAt?: string;
    availableAt?: string;
    expiresAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandType` | 属性 | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadRef` | 属性 | <code>payloadRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetRunId` | 属性 | <code>targetRunId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `FailSessionCommandRequest`

Fail Session Command Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { FailSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface FailSessionCommandRequest {
    commandId: string;
    workerId: string;
    claimToken: string;
    leaseEpoch: number;
    failedAt: string;
    rejectionCode: string;
    deadLetter?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetter` | 属性 | <code>deadLetter?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failedAt` | 属性 | <code>failedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectionCode` | 属性 | <code>rejectionCode: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ListSessionCommandsRequest`

List Session Commands Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ListSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface ListSessionCommandsRequest {
    scope: SessionQueueScope;
    statuses?: SessionCommandStatus[];
    fromSequence?: number;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSequence` | 属性 | <code>fromSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statuses` | 属性 | <code>statuses?: ("rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ListStuckSessionCommandsRequest`

List Stuck Session Commands Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ListStuckSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface ListStuckSessionCommandsRequest {
    scope: SessionQueueScope;
    checkedAt: string;
    graceMs?: number;
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `graceMs` | 属性 | <code>graceMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedriveDeadLetterSessionCommandRequest`

Redrive Dead Letter Session Command Request 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedriveDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface RedriveDeadLetterSessionCommandRequest {
    version: '1.0.0';
    scope: SessionQueueScope;
    sourceCommandId: string;
    id: string;
    idempotencyKey: string;
    operatorId: string;
    reason: string;
    requestedAt?: string;
    availableAt?: string;
    expiresAt?: string;
    priority?: number;
    maxAttempts?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operatorId` | 属性 | <code>operatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: SessionQueueScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceCommandId` | 属性 | <code>sourceCommandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReleaseSessionCommandRequest`

Release Session Command Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReleaseSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface ReleaseSessionCommandRequest {
    commandId: string;
    workerId: string;
    claimToken: string;
    leaseEpoch: number;
    releasedAt: string;
    availableAt?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `releasedAt` | 属性 | <code>releasedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RenewSessionCommandRequest`

Renew Session Command Request 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RenewSessionCommandRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface RenewSessionCommandRequest {
    commandId: string;
    workerId: string;
    claimToken: string;
    leaseEpoch: number;
    renewedAt: string;
    leaseMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseMs` | 属性 | <code>leaseMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `renewedAt` | 属性 | <code>renewedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandClaim`

Session Command Claim 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandClaim } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionCommandClaim {
    commandId: string;
    workerId: string;
    claimToken: string;
    leaseEpoch: number;
    leaseExpiresAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workerId` | 属性 | <code>workerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandDeadLetterResolution`

Session Command Dead Letter Resolution 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandDeadLetterResolution } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionCommandDeadLetterResolution {
    version: '1.0.0';
    disposition: 'redriven' | 'closed';
    operatorId: string;
    reason: string;
    resolvedAt: string;
    redriveCommandId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "closed" &#124; "redriven"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operatorId` | 属性 | <code>operatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redriveCommandId` | 属性 | <code>redriveCommandId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedAt` | 属性 | <code>resolvedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandLeaseRecovery`

Session Command Lease Recovery 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandLeaseRecovery } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionCommandLeaseRecovery {
    version: '1.0.0';
    previousWorkerId: string;
    previousLeaseEpoch: number;
    leaseExpiredAt: string;
    recoveredAt: string;
    disposition: 'requeued' | 'dead_lettered';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "requeued" &#124; "dead_lettered"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiredAt` | 属性 | <code>leaseExpiredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousLeaseEpoch` | 属性 | <code>previousLeaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `previousWorkerId` | 属性 | <code>previousWorkerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recoveredAt` | 属性 | <code>recoveredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandRecord`

Session Command Record 接口，共包含 29 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionCommandRecord {
    id: string;
    commandType: SessionCommandType;
    idempotencyKey: string;
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId: string;
    targetRunId?: string;
    enqueueSequence: number;
    priority: number;
    attempts: number;
    maxAttempts: number;
    leaseEpoch: number;
    payloadRef?: string;
    payloadHash: string;
    status: SessionCommandStatus;
    claimedBy?: string;
    claimToken?: string;
    leaseExpiresAt?: string;
    resultRunId?: string;
    resultEventIds?: string[];
    rejectionCode?: string;
    createdAt: string;
    availableAt: string;
    expiresAt?: string;
    completedAt?: string;
    redrive?: SessionCommandRedrive;
    deadLetterResolution?: SessionCommandDeadLetterResolution;
    leaseRecoveries?: SessionCommandLeaseRecovery[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableAt` | 属性 | <code>availableAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimedBy` | 属性 | <code>claimedBy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimToken` | 属性 | <code>claimToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandType` | 属性 | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetterResolution` | 属性 | <code>deadLetterResolution?: SessionCommandDeadLetterResolution</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enqueueSequence` | 属性 | <code>enqueueSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseExpiresAt` | 属性 | <code>leaseExpiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseRecoveries` | 属性 | <code>leaseRecoveries?: SessionCommandLeaseRecovery[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadHash` | 属性 | <code>payloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payloadRef` | 属性 | <code>payloadRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redrive` | 属性 | <code>redrive?: SessionCommandRedrive</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectionCode` | 属性 | <code>rejectionCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultEventIds` | 属性 | <code>resultEventIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultRunId` | 属性 | <code>resultRunId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `targetRunId` | 属性 | <code>targetRunId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandRedrive`

Session Command Redrive 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionCommandRedrive } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionCommandRedrive {
    version: '1.0.0';
    sourceCommandId: string;
    operatorId: string;
    reason: string;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `operatorId` | 属性 | <code>operatorId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceCommandId` | 属性 | <code>sourceCommandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionQueueHealthSnapshot`

Session Queue Health Snapshot 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionQueueHealthSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionQueueHealthSnapshot extends Record<string, unknown> {
    version: '1.0.0';
    totalCommands: number;
    pendingCommands: number;
    queuedCommands: number;
    claimedCommands: number;
    deadLetterCommands: number;
    resolvedDeadLetterCommands: number;
    retryingCommands: number;
    redeliveredCommands: number;
    recoveredExpiredLeases: number;
    leaseRecoveryCount: number;
    oldestPendingAgeMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `claimedCommands` | 属性 | <code>claimedCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadLetterCommands` | 属性 | <code>deadLetterCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseRecoveryCount` | 属性 | <code>leaseRecoveryCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `oldestPendingAgeMs` | 属性 | <code>oldestPendingAgeMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingCommands` | 属性 | <code>pendingCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `queuedCommands` | 属性 | <code>queuedCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recoveredExpiredLeases` | 属性 | <code>recoveredExpiredLeases: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redeliveredCommands` | 属性 | <code>redeliveredCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedDeadLetterCommands` | 属性 | <code>resolvedDeadLetterCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryingCommands` | 属性 | <code>retryingCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalCommands` | 属性 | <code>totalCommands: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionQueueScope`

Session Queue Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionQueueScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface SessionQueueScope {
    tenantId?: string;
    userId: string;
    sessionId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `StuckSessionCommand`

Stuck Session Command 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { StuckSessionCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export interface StuckSessionCommand {
    command: SessionCommandRecord;
    detectedAt: string;
    overdueMs: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: SessionCommandRecord</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `detectedAt` | 属性 | <code>detectedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `overdueMs` | 属性 | <code>overdueMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionCommandStatus`

Session Command Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SessionCommandStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number];
```

## `SessionCommandType`

Session Command Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SessionCommandType } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### 声明

```text
export type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number];
```
