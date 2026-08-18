# `@codesoul-co/hypha-core` / `contracts/runtime-recovery`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)
- Exports: **25**

## Using this module

Use the Runtime recovery module for declaring and runtime-validating contracts. It exports 5 constants, 15 interfaces, 5 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 20 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 5 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_COMPENSATION_STATUSES` | constant | <code>const RUNTIME_ACTIVITY_COMPENSATION_STATUSES: readonly ["completed", "failed", "requires_review"]</code> | RUNTIME ACTIVITY COMPENSATION STATUSES constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_ACTIVITY_RECONCILIATION_STATUSES` | constant | <code>const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled", "not_started", "unknown"]</code> | RUNTIME ACTIVITY RECONCILIATION STATUSES constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_RECOVERY_CANDIDATE_REASONS` | constant | <code>const RUNTIME_RECOVERY_CANDIDATE_REASONS: readonly ["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJECTION_BEHIND", "CHECKPOINT_BEHIND", "ACTIVITY_RESULT_UNAPPLIED", "ACTIVITY_COMPENSATION_REQUIRED", "ACTIVITY_REDISPATCH_INCOMPLETE", "MESSAGE_UNACKED", "OUTBOX_UNPUBLISHED", "WAIT_WITHOUT_REGISTRATION", "TIMER_OVERDUE", "SESSION_COMMAND_INCOMPLETE", "RUN_PROJECTION_CONFLICT", "CANCELLATION_INCOMPLETE", "CUSTOM"]</code> | RUNTIME RECOVERY CANDIDATE REASONS constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_RECOVERY_DISPOSITIONS` | constant | <code>const RUNTIME_RECOVERY_DISPOSITIONS: readonly ["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"]</code> | RUNTIME RECOVERY DISPOSITIONS constant exported by the `contracts/runtime-recovery` module. |
| `RUNTIME_RECOVERY_SAFE_ACTIONS` | constant | <code>const RUNTIME_RECOVERY_SAFE_ACTIONS: readonly ["rebuild_projection", "requeue", "apply_observation", "compensate_activity", "reconcile_redispatch", "restore_wait", "fire_timer", "republish_message", "mark_failed", "manual_review"]</code> | RUNTIME RECOVERY SAFE ACTIONS constant exported by the `contracts/runtime-recovery` module. |
| `RuntimeActivityCompensationRequest` | interface | <code>interface RuntimeActivityCompensationRequest</code> | Runtime Activity Compensation Request interface with 5 public fields or methods. |
| `RuntimeActivityCompensationResult` | interface | <code>interface RuntimeActivityCompensationResult</code> | Runtime Activity Compensation Result interface with 5 public fields or methods. |
| `RuntimeActivityReconciliationPort` | interface | <code>interface RuntimeActivityReconciliationPort</code> | Runtime Activity Reconciliation Port interface with 3 public fields or methods. |
| `RuntimeActivityReconciliationRequest` | interface | <code>interface RuntimeActivityReconciliationRequest</code> | Runtime Activity Reconciliation Request interface with 3 public fields or methods. |
| `RuntimeActivityReconciliationResult` | interface | <code>interface RuntimeActivityReconciliationResult</code> | Runtime Activity Reconciliation Result interface with 5 public fields or methods. |
| `RuntimeActivityRetryRequest` | interface | <code>interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest</code> | Runtime Activity Retry Request interface with 4 public fields or methods. |
| `RuntimeCancellationRecoveryPort` | interface | <code>interface RuntimeCancellationRecoveryPort</code> | Runtime Cancellation Recovery Port interface with 1 public fields or methods. |
| `RuntimeRecoveryCandidate` | interface | <code>interface RuntimeRecoveryCandidate</code> | Runtime Recovery Candidate interface with 12 public fields or methods. |
| `RuntimeRecoveryCommand` | interface | <code>interface RuntimeRecoveryCommand</code> | Runtime Recovery Command interface with 4 public fields or methods. |
| `RuntimeRecoveryRequeuePort` | interface | <code>interface RuntimeRecoveryRequeuePort</code> | Runtime Recovery Requeue Port interface with 1 public fields or methods. |
| `RuntimeRecoveryRequeueRequest` | interface | <code>interface RuntimeRecoveryRequeueRequest</code> | Runtime Recovery Requeue Request interface with 7 public fields or methods. |
| `RuntimeRecoveryResult` | interface | <code>interface RuntimeRecoveryResult</code> | Runtime Recovery Result interface with 4 public fields or methods. |
| `RuntimeRecoveryScanRequest` | interface | <code>interface RuntimeRecoveryScanRequest</code> | Runtime Recovery Scan Request interface with 3 public fields or methods. |
| `RuntimeRecoveryScanResult` | interface | <code>interface RuntimeRecoveryScanResult</code> | Runtime Recovery Scan Result interface with 3 public fields or methods. |
| `RuntimeRecoveryScope` | interface | <code>interface RuntimeRecoveryScope</code> | Runtime Recovery Scope interface with 3 public fields or methods. |
| `RuntimeActivityCompensationStatus` | type | <code>type RuntimeActivityCompensationStatus = (typeof RUNTIME_ACTIVITY_COMPENSATION_STATUSES)[number]</code> | Public type alias for Runtime Activity Compensation Status; the declaration contains its complete type expression. |
| `RuntimeActivityReconciliationStatus` | type | <code>type RuntimeActivityReconciliationStatus = (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number]</code> | Public type alias for Runtime Activity Reconciliation Status; the declaration contains its complete type expression. |
| `RuntimeRecoveryCandidateReason` | type | <code>type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number]</code> | Public type alias for Runtime Recovery Candidate Reason; the declaration contains its complete type expression. |
| `RuntimeRecoveryDisposition` | type | <code>type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number]</code> | Public type alias for Runtime Recovery Disposition; the declaration contains its complete type expression. |
| `RuntimeRecoverySafeAction` | type | <code>type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number]</code> | Public type alias for Runtime Recovery Safe Action; the declaration contains its complete type expression. |

## `RUNTIME_ACTIVITY_COMPENSATION_STATUSES`

RUNTIME ACTIVITY COMPENSATION STATUSES constant exported by the `contracts/runtime-recovery` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_COMPENSATION_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_COMPENSATION_STATUSES: readonly ["completed", "failed", "requires_review"];
```

## `RUNTIME_ACTIVITY_RECONCILIATION_STATUSES`

RUNTIME ACTIVITY RECONCILIATION STATUSES constant exported by the `contracts/runtime-recovery` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_RECONCILIATION_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_RECONCILIATION_STATUSES: readonly ["completed", "failed", "waiting", "cancelled", "not_started", "unknown"];
```

## `RUNTIME_RECOVERY_CANDIDATE_REASONS`

RUNTIME RECOVERY CANDIDATE REASONS constant exported by the `contracts/runtime-recovery` module.

- Kind: constant
- Import: `import { RUNTIME_RECOVERY_CANDIDATE_REASONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export declare const RUNTIME_RECOVERY_CANDIDATE_REASONS: readonly ["LEASE_EXPIRED", "STATE_CLAIM_EXPIRED", "PROJECTION_BEHIND", "CHECKPOINT_BEHIND", "ACTIVITY_RESULT_UNAPPLIED", "ACTIVITY_COMPENSATION_REQUIRED", "ACTIVITY_REDISPATCH_INCOMPLETE", "MESSAGE_UNACKED", "OUTBOX_UNPUBLISHED", "WAIT_WITHOUT_REGISTRATION", "TIMER_OVERDUE", "SESSION_COMMAND_INCOMPLETE", "RUN_PROJECTION_CONFLICT", "CANCELLATION_INCOMPLETE", "CUSTOM"];
```

## `RUNTIME_RECOVERY_DISPOSITIONS`

RUNTIME RECOVERY DISPOSITIONS constant exported by the `contracts/runtime-recovery` module.

- Kind: constant
- Import: `import { RUNTIME_RECOVERY_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export declare const RUNTIME_RECOVERY_DISPOSITIONS: readonly ["recovered", "reused", "requeued", "compensated", "requires_review", "lease_unavailable", "stale"];
```

## `RUNTIME_RECOVERY_SAFE_ACTIONS`

RUNTIME RECOVERY SAFE ACTIONS constant exported by the `contracts/runtime-recovery` module.

- Kind: constant
- Import: `import { RUNTIME_RECOVERY_SAFE_ACTIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export declare const RUNTIME_RECOVERY_SAFE_ACTIONS: readonly ["rebuild_projection", "requeue", "apply_observation", "compensate_activity", "reconcile_redispatch", "restore_wait", "fire_timer", "republish_message", "mark_failed", "manual_review"];
```

## `RuntimeActivityCompensationRequest`

Runtime Activity Compensation Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityCompensationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeActivityCompensationRequest {
    invocation: RuntimeActivityInvocation;
    reason: string;
    requestedAt: string;
    fencingToken: number;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocation` | property | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityCompensationResult`

Runtime Activity Compensation Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityCompensationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeActivityCompensationResult {
    activityId: string;
    status: RuntimeActivityCompensationStatus;
    providerRevision?: string;
    receiptId?: string;
    errorCode?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `errorCode` | property | <code>errorCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptId` | property | <code>receiptId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "failed" &#124; "requires_review"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityReconciliationPort`

Runtime Activity Reconciliation Port interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityReconciliationPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeActivityReconciliationPort {
    reconcile(request: RuntimeActivityReconciliationRequest): Promise<RuntimeActivityReconciliationResult>;
    retry(request: RuntimeActivityRetryRequest): Promise<RuntimeActivityObservation>;
    compensate?(request: RuntimeActivityCompensationRequest): Promise<RuntimeActivityCompensationResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compensate` | method | <code>compensate?(request: RuntimeActivityCompensationRequest): Promise&lt;RuntimeActivityCompensationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `reconcile` | method | <code>reconcile(request: RuntimeActivityReconciliationRequest): Promise&lt;RuntimeActivityReconciliationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `retry` | method | <code>retry(request: RuntimeActivityRetryRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeActivityReconciliationRequest`

Runtime Activity Reconciliation Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityReconciliationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeActivityReconciliationRequest {
    invocation: RuntimeActivityInvocation;
    checkedAt: string;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocation` | property | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityReconciliationResult`

Runtime Activity Reconciliation Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityReconciliationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeActivityReconciliationResult {
    activityId: string;
    status: RuntimeActivityReconciliationStatus;
    observation?: RuntimeActivityObservation;
    providerRevision?: string;
    receiptId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observation` | property | <code>observation?: RuntimeActivityObservation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptId` | property | <code>receiptId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "not_started" &#124; "waiting"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityRetryRequest`

Runtime Activity Retry Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityRetryRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeActivityRetryRequest extends RuntimeActivityReconciliationRequest {
    fencingToken: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocation` | property | <code>invocation: RuntimeActivityInvocation&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/index").RuntimeJsonValue&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeCancellationRecoveryPort`

Runtime Cancellation Recovery Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeCancellationRecoveryPort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeCancellationRecoveryPort {
    cancel(input: RuntimeCancelCommand): Promise<RuntimeCancelResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeRecoveryCandidate`

Runtime Recovery Candidate interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryCandidate } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `candidateId` | property | <code>candidateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentLease` | property | <code>currentLease?: FencedRunLease</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `detectedAt` | property | <code>detectedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventHeadSequence` | property | <code>eventHeadSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionSequence` | property | <code>projectionSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redispatchRequestEventId` | property | <code>redispatchRequestEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `safeAction` | property | <code>safeAction: "rebuild_projection" &#124; "requeue" &#124; "apply_observation" &#124; "compensate_activity" &#124; "reconcile_redispatch" &#124; "restore_wait" &#124; "fire_timer" &#124; "republish_message" &#124; "mark_failed" &#124; "manual_review"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeRecoveryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRecoveryCommand`

Runtime Recovery Command interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeRecoveryCommand {
    candidate: RuntimeRecoveryCandidate;
    ownerId: string;
    leaseTtlMs: number;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: RuntimeRecoveryCandidate</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRecoveryRequeuePort`

Runtime Recovery Requeue Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryRequeuePort } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeRecoveryRequeuePort {
    requeue(request: RuntimeRecoveryRequeueRequest): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `requeue` | method | <code>requeue(request: RuntimeRecoveryRequeueRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeRecoveryRequeueRequest`

Runtime Recovery Requeue Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryRequeueRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedStateAttempt` | property | <code>expectedStateAttempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedStateId` | property | <code>expectedStateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "LEASE_EXPIRED" &#124; "STATE_CLAIM_EXPIRED" &#124; "PROJECTION_BEHIND" &#124; "CHECKPOINT_BEHIND" &#124; "ACTIVITY_RESULT_UNAPPLIED" &#124; "ACTIVITY_COMPENSATION_REQUIRED" &#124; "ACTIVITY_REDISPATCH_INCOMPLETE" &#124; "MESSAGE_UNACKED" &#124; "OUTBOX_UNPUBLISHED" &#124; "WAIT_WITHOUT_REGISTRATION" &#124; "TIMER_OVERDUE" &#124; "SESSION_COMMAND_INCOMPLETE" &#124; "RUN_PROJECTION_CONFLICT" &#124; "CANCELLATION_INCOMPLETE" &#124; "CUSTOM"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeRecoveryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRecoveryResult`

Runtime Recovery Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeRecoveryResult {
    candidateId: string;
    disposition: RuntimeRecoveryDisposition;
    eventIds: string[];
    projection?: RuntimeOrchestrationProjection;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidateId` | property | <code>candidateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "recovered" &#124; "compensated" &#124; "reused" &#124; "requeued" &#124; "lease_unavailable" &#124; "requires_review" &#124; "stale"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection?: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRecoveryScanRequest`

Runtime Recovery Scan Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryScanRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeRecoveryScanRequest {
    checkedAt: string;
    limit: number;
    cursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cursor` | property | <code>cursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRecoveryScanResult`

Runtime Recovery Scan Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryScanResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeRecoveryScanResult {
    candidates: RuntimeRecoveryCandidate[];
    scannedStreams: number;
    nextCursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidates` | property | <code>candidates: RuntimeRecoveryCandidate[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scannedStreams` | property | <code>scannedStreams: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRecoveryScope`

Runtime Recovery Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRecoveryScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export interface RuntimeRecoveryScope {
    tenantId?: string;
    userId: string;
    runId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityCompensationStatus`

Public type alias for Runtime Activity Compensation Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityCompensationStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export type RuntimeActivityCompensationStatus = (typeof RUNTIME_ACTIVITY_COMPENSATION_STATUSES)[number];
```

## `RuntimeActivityReconciliationStatus`

Public type alias for Runtime Activity Reconciliation Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityReconciliationStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export type RuntimeActivityReconciliationStatus = (typeof RUNTIME_ACTIVITY_RECONCILIATION_STATUSES)[number];
```

## `RuntimeRecoveryCandidateReason`

Public type alias for Runtime Recovery Candidate Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeRecoveryCandidateReason } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export type RuntimeRecoveryCandidateReason = (typeof RUNTIME_RECOVERY_CANDIDATE_REASONS)[number];
```

## `RuntimeRecoveryDisposition`

Public type alias for Runtime Recovery Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeRecoveryDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export type RuntimeRecoveryDisposition = (typeof RUNTIME_RECOVERY_DISPOSITIONS)[number];
```

## `RuntimeRecoverySafeAction`

Public type alias for Runtime Recovery Safe Action; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeRecoverySafeAction } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-recovery.ts)

### Declaration

```text
export type RuntimeRecoverySafeAction = (typeof RUNTIME_RECOVERY_SAFE_ACTIONS)[number];
```
