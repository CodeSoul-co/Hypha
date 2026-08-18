# `@codesoul-co/hypha-core` / `contracts/runtime-recovery`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)
- 导出数: **25**

## 模块用法

用于声明并运行时校验契约。Runtime recovery 模块公开 5 常量、15 接口、5 类型。

### 从包入口导入

```ts
import {
  RUNTIME_ACTIVITY_COMPENSATION_STATUSES,
  RUNTIME_ACTIVITY_RECONCILIATION_STATUSES,
  RUNTIME_RECOVERY_CANDIDATE_REASONS,
  RUNTIME_RECOVERY_DISPOSITIONS,
  RUNTIME_RECOVERY_SAFE_ACTIONS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityCompensationRequest,
  RuntimeActivityCompensationResult,
  RuntimeActivityReconciliationPort,
  RuntimeActivityReconciliationRequest,
  RuntimeActivityReconciliationResult,
  RuntimeActivityRetryRequest,
  RuntimeCancellationRecoveryPort,
  RuntimeRecoveryCandidate,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 20 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 5 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_COMPENSATION_STATUSES` | 常量 | <code>const RUNTIME_ACTIVITY_COMPENSATION_STATUSES: readonly ["completed", "failed", "requires_review"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME ACTIVITY COMPENSATION STATUSES 常量。 |
| `RUNTIME_ACTIVITY_RECONCILIATION_STATUSES` | 常量 | <code>const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled", "not_started", "unknown"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME ACTIVITY RECONCILIATION STATUSES 常量。 |
| `RUNTIME_RECOVERY_CANDIDATE_REASONS` | 常量 | <code>const RUNTIME_RECOVERY_CANDIDATE_REASONS: readonly ["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJECTION_BEHIND", "CHECKPOINT_BEHIND", "ACTIVITY_RESULT_UNAPPLIED", "ACTIVITY_COMPENSATION_REQUIRED", "ACTIVITY_REDISPATCH_INCOMPLETE", "MESSAGE_UNACKED", "OUTBOX_UNPUBLISHED", "WAIT_WITHOUT_REGISTRATION", "TIMER_OVERDUE", "SESSION_COMMAND_INCOMPLETE", "RUN_PROJECTION_CONFLICT", "CANCELLATION_INCOMPLETE", "CUSTOM"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY CANDIDATE REASONS 常量。 |
| `RUNTIME_RECOVERY_DISPOSITIONS` | 常量 | <code>const RUNTIME_RECOVERY_DISPOSITIONS: readonly ["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY DISPOSITIONS 常量。 |
| `RUNTIME_RECOVERY_SAFE_ACTIONS` | 常量 | <code>const RUNTIME_RECOVERY_SAFE_ACTIONS: readonly ["rebuild_projection", "requeue", "apply_observation", "compensate_activity", "reconcile_redispatch", "restore_wait", "fire_timer", "republish_message", "mark_failed", "manual_review"]</code> | 由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY SAFE ACTIONS 常量。 |
| `RuntimeActivityCompensationRequest` | 接口 | <code>interface RuntimeActivityCompensationRequest</code> | Runtime Activity Compensation Request 接口，共包含 5 个公开字段或方法。 |
| `RuntimeActivityCompensationResult` | 接口 | <code>interface RuntimeActivityCompensationResult</code> | Runtime Activity Compensation Result 接口，共包含 5 个公开字段或方法。 |
| `RuntimeActivityReconciliationPort` | 接口 | <code>interface RuntimeActivityReconciliationPort</code> | Runtime Activity Reconciliation Port 接口，共包含 3 个公开字段或方法。 |
| `RuntimeActivityReconciliationRequest` | 接口 | <code>interface RuntimeActivityReconciliationRequest</code> | Runtime Activity Reconciliation Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeActivityReconciliationResult` | 接口 | <code>interface RuntimeActivityReconciliationResult</code> | Runtime Activity Reconciliation Result 接口，共包含 5 个公开字段或方法。 |
| `RuntimeActivityRetryRequest` | 接口 | <code>interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest</code> | Runtime Activity Retry Request 接口，共包含 4 个公开字段或方法。 |
| `RuntimeCancellationRecoveryPort` | 接口 | <code>interface RuntimeCancellationRecoveryPort</code> | Runtime Cancellation Recovery Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeRecoveryCandidate` | 接口 | <code>interface RuntimeRecoveryCandidate</code> | Runtime Recovery Candidate 接口，共包含 12 个公开字段或方法。 |
| `RuntimeRecoveryCommand` | 接口 | <code>interface RuntimeRecoveryCommand</code> | Runtime Recovery Command 接口，共包含 4 个公开字段或方法。 |
| `RuntimeRecoveryRequeuePort` | 接口 | <code>interface RuntimeRecoveryRequeuePort</code> | Runtime Recovery Requeue Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeRecoveryRequeueRequest` | 接口 | <code>interface RuntimeRecoveryRequeueRequest</code> | Runtime Recovery Requeue Request 接口，共包含 7 个公开字段或方法。 |
| `RuntimeRecoveryResult` | 接口 | <code>interface RuntimeRecoveryResult</code> | Runtime Recovery Result 接口，共包含 4 个公开字段或方法。 |
| `RuntimeRecoveryScanRequest` | 接口 | <code>interface RuntimeRecoveryScanRequest</code> | Runtime Recovery Scan Request 接口，共包含 3 个公开字段或方法。 |
| `RuntimeRecoveryScanResult` | 接口 | <code>interface RuntimeRecoveryScanResult</code> | Runtime Recovery Scan Result 接口，共包含 3 个公开字段或方法。 |
| `RuntimeRecoveryScope` | 接口 | <code>interface RuntimeRecoveryScope</code> | Runtime Recovery Scope 接口，共包含 3 个公开字段或方法。 |
| `RuntimeActivityCompensationStatus` | 类型 | <code>type RuntimeActivityCompensationStatus = (typeof RUNTIME_ACTIVITY_COMPENSATION_STATUSES)[number]</code> | Runtime Activity Compensation Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeActivityReconciliationStatus` | 类型 | <code>type RuntimeActivityReconciliationStatus = (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number]</code> | Runtime Activity Reconciliation Status 公共类型别名；完整类型表达式见声明。 |
| `RuntimeRecoveryCandidateReason` | 类型 | <code>type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number]</code> | Runtime Recovery Candidate Reason 公共类型别名；完整类型表达式见声明。 |
| `RuntimeRecoveryDisposition` | 类型 | <code>type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number]</code> | Runtime Recovery Disposition 公共类型别名；完整类型表达式见声明。 |
| `RuntimeRecoverySafeAction` | 类型 | <code>type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number]</code> | Runtime Recovery Safe Action 公共类型别名；完整类型表达式见声明。 |

## `RUNTIME_ACTIVITY_COMPENSATION_STATUSES`

由 `contracts/runtime-recovery` 模块导出的 RUNTIME ACTIVITY COMPENSATION STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_COMPENSATION_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_COMPENSATION_STATUSES: readonly ["completed", "failed", "requires_review"];
```

## `RUNTIME_ACTIVITY_RECONCILIATION_STATUSES`

由 `contracts/runtime-recovery` 模块导出的 RUNTIME ACTIVITY RECONCILIATION STATUSES 常量。

- 种类: 常量
- 导入: `import { RUNTIME_ACTIVITY_RECONCILIATION_STATUSES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export declare const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled", "not_started", "unknown"];
```

## `RUNTIME_RECOVERY_CANDIDATE_REASONS`

由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY CANDIDATE REASONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RECOVERY_CANDIDATE_REASONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export declare const RUNTIME_RECOVERY_CANDIDATE_REASONS: readonly ["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJECTION_BEHIND", "CHECKPOINT_BEHIND", "ACTIVITY_RESULT_UNAPPLIED", "ACTIVITY_COMPENSATION_REQUIRED", "ACTIVITY_REDISPATCH_INCOMPLETE", "MESSAGE_UNACKED", "OUTBOX_UNPUBLISHED", "WAIT_WITHOUT_REGISTRATION", "TIMER_OVERDUE", "SESSION_COMMAND_INCOMPLETE", "RUN_PROJECTION_CONFLICT", "CANCELLATION_INCOMPLETE", "CUSTOM"];
```

## `RUNTIME_RECOVERY_DISPOSITIONS`

由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY DISPOSITIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RECOVERY_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export declare const RUNTIME_RECOVERY_DISPOSITIONS: readonly ["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"];
```

## `RUNTIME_RECOVERY_SAFE_ACTIONS`

由 `contracts/runtime-recovery` 模块导出的 RUNTIME RECOVERY SAFE ACTIONS 常量。

- 种类: 常量
- 导入: `import { RUNTIME_RECOVERY_SAFE_ACTIONS } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export declare const RUNTIME_RECOVERY_SAFE_ACTIONS: readonly ["rebuild_projection", "requeue", "apply_observation", "compensate_activity", "reconcile_redispatch", "restore_wait", "fire_timer", "republish_message", "mark_failed", "manual_review"];
```

## `RuntimeActivityCompensationRequest`

Runtime Activity Compensation Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityCompensationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeActivityCompensationRequest {
    invocation: RuntimeActivityInvocation;
    reason: string;
    requestedAt: string;
    fencingToken: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocation` | 属性 | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityCompensationResult`

Runtime Activity Compensation Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityCompensationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeActivityCompensationResult {
    activityId: string;
    status: RuntimeActivityCompensationStatus;
    providerRevision?: string;
    receiptId?: string;
    errorCode?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `errorCode` | 属性 | <code>errorCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptId` | 属性 | <code>receiptId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "failed" &#124; "requires_review"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityReconciliationPort`

Runtime Activity Reconciliation Port 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityReconciliationPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeActivityReconciliationPort {
    reconcile(request: RuntimeActivityReconciliationRequest): Promise<RuntimeActivityReconciliationResult>;
    retry(request: RuntimeActivityRetryRequest): Promise<RuntimeActivityObservation>;
    compensate?(request: RuntimeActivityCompensationRequest): Promise<RuntimeActivityCompensationResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compensate` | 方法 | <code>compensate?(request: RuntimeActivityCompensationRequest): Promise&lt;RuntimeActivityCompensationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(request: RuntimeActivityReconciliationRequest): Promise&lt;RuntimeActivityReconciliationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retry` | 方法 | <code>retry(request: RuntimeActivityRetryRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityReconciliationRequest`

Runtime Activity Reconciliation Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityReconciliationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeActivityReconciliationRequest {
    invocation: RuntimeActivityInvocation;
    checkedAt: string;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocation` | 属性 | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityReconciliationResult`

Runtime Activity Reconciliation Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityReconciliationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeActivityReconciliationResult {
    activityId: string;
    status: RuntimeActivityReconciliationStatus;
    observation?: RuntimeActivityObservation;
    providerRevision?: string;
    receiptId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observation` | 属性 | <code>observation?: RuntimeActivityObservation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptId` | 属性 | <code>receiptId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "not_started" &#124; "waiting"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityRetryRequest`

Runtime Activity Retry Request 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRetryRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest {
    fencingToken: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocation` | 属性 | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeCancellationRecoveryPort`

Runtime Cancellation Recovery Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancellationRecoveryPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeCancellationRecoveryPort {
    cancel(input: RuntimeCancelCommand): Promise<RuntimeCancelResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeRecoveryCandidate`

Runtime Recovery Candidate 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryCandidate } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryCandidate {
    candidateId: string;
    scope: RuntimeRecoveryScope;
    reason: RuntimeRecoveryCandidateReason;
    safeAction: RuntimeRecoverySafeAction;
    eventHeadSequence: number;
    projectionSequence?: number;
    activityId?: string;
    redispatchRequestEventId?: string;
    stateId?: string;
    stateAttempt?: number;
    currentLease?: FencedRunLease;
    detectedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityId` | 属性 | <code>activityId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `candidateId` | 属性 | <code>candidateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `currentLease` | 属性 | <code>currentLease?: FencedRunLease</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `detectedAt` | 属性 | <code>detectedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventHeadSequence` | 属性 | <code>eventHeadSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionSequence` | 属性 | <code>projectionSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redispatchRequestEventId` | 属性 | <code>redispatchRequestEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `safeAction` | 属性 | <code>safeAction: "rebuild_projection" &#124; "requeue" &#124; "apply_observation" &#124; "compensate_activity" &#124; "reconcile_redispatch" &#124; "restore_wait" &#124; "fire_timer" &#124; "republish_message" &#124; "mark_failed" &#124; "manual_review"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeRecoveryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRecoveryCommand`

Runtime Recovery Command 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryCommand {
    candidate: RuntimeRecoveryCandidate;
    ownerId: string;
    leaseTtlMs: number;
    requestedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidate` | 属性 | <code>candidate: RuntimeRecoveryCandidate</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRecoveryRequeuePort`

Runtime Recovery Requeue Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryRequeuePort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryRequeuePort {
    requeue(request: RuntimeRecoveryRequeueRequest): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `requeue` | 方法 | <code>requeue(request: RuntimeRecoveryRequeueRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeRecoveryRequeueRequest`

Runtime Recovery Requeue Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryRequeueRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryRequeueRequest {
    scope: RuntimeRecoveryScope;
    reason: RuntimeRecoveryCandidateReason;
    requestedAt: string;
    fencingToken: number;
    expectedStateId?: string;
    expectedStateAttempt?: number;
    idempotencyKey: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedStateAttempt` | 属性 | <code>expectedStateAttempt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedStateId` | 属性 | <code>expectedStateId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeRecoveryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRecoveryResult`

Runtime Recovery Result 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryResult {
    candidateId: string;
    disposition: RuntimeRecoveryDisposition;
    eventIds: string[];
    projection?: RuntimeOrchestrationProjection;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidateId` | 属性 | <code>candidateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "recovered" &#124; "compensated" &#124; "reused" &#124; "requeued" &#124; "lease_unavailable" &#124; "requires_review" &#124; "stale"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection?: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRecoveryScanRequest`

Runtime Recovery Scan Request 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryScanRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryScanRequest {
    checkedAt: string;
    limit: number;
    cursor?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkedAt` | 属性 | <code>checkedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cursor` | 属性 | <code>cursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRecoveryScanResult`

Runtime Recovery Scan Result 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryScanResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryScanResult {
    candidates: RuntimeRecoveryCandidate[];
    scannedStreams: number;
    nextCursor?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `candidates` | 属性 | <code>candidates: RuntimeRecoveryCandidate[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextCursor` | 属性 | <code>nextCursor?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scannedStreams` | 属性 | <code>scannedStreams: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeRecoveryScope`

Runtime Recovery Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export interface RuntimeRecoveryScope {
    tenantId?: string;
    userId: string;
    runId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeActivityCompensationStatus`

Runtime Activity Compensation Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityCompensationStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export type RuntimeActivityCompensationStatus = (typeof RUNTIME_ACTIVITY_COMPENSATION_STATUSES)[number];
```

## `RuntimeActivityReconciliationStatus`

Runtime Activity Reconciliation Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeActivityReconciliationStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export type RuntimeActivityReconciliationStatus = (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number];
```

## `RuntimeRecoveryCandidateReason`

Runtime Recovery Candidate Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeRecoveryCandidateReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number];
```

## `RuntimeRecoveryDisposition`

Runtime Recovery Disposition 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeRecoveryDisposition } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number];
```

## `RuntimeRecoverySafeAction`

Runtime Recovery Safe Action 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RuntimeRecoverySafeAction } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### 声明

```text
export type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number];
```
