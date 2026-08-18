# `@codesoul-co/hypha-core` / `contracts/runtime`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)
- Exports: **20**

## Using this module

Use the Runtime module for declaring and runtime-validating contracts. It exports 6 constants, 8 interfaces, 6 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 14 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 6 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ERROR_CODES` | constant | <code>const RUNTIME_ERROR_CODES: readonly ["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RU...</code> | RUNTIME ERROR CODES constant exported by the `contracts/runtime` module. |
| `RUNTIME_PRINCIPAL_TYPES` | constant | <code>const RUNTIME_PRINCIPAL_TYPES: readonly ["user", "agent", "service", "system"]</code> | RUNTIME PRINCIPAL TYPES constant exported by the `contracts/runtime` module. |
| `RUNTIME_RUN_STATUSES` | constant | <code>const RUNTIME_RUN_STATUSES: readonly ["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]</code> | RUNTIME RUN STATUSES constant exported by the `contracts/runtime` module. |
| `RUNTIME_SESSION_STATUSES` | constant | <code>const RUNTIME_SESSION_STATUSES: readonly ["active", "closed", "archived"]</code> | RUNTIME SESSION STATUSES constant exported by the `contracts/runtime` module. |
| `RUNTIME_WAIT_STATUSES` | constant | <code>const RUNTIME_WAIT_STATUSES: readonly ["waiting", "received", "expired", "cancelled"]</code> | RUNTIME WAIT STATUSES constant exported by the `contracts/runtime` module. |
| `RUNTIME_WAIT_TYPES` | constant | <code>const RUNTIME_WAIT_TYPES: readonly ["human", "signal", "timer", "external_operation"]</code> | RUNTIME WAIT TYPES constant exported by the `contracts/runtime` module. |
| `NormalizedRuntimeError` | interface | <code>interface NormalizedRuntimeError</code> | Normalized Runtime Error interface with 7 public fields or methods. |
| `RunSignalRequest` | interface | <code>interface RunSignalRequest</code> | Run Signal Request interface with 7 public fields or methods. |
| `RuntimePrincipal` | interface | <code>interface RuntimePrincipal</code> | Runtime Principal interface with 8 public fields or methods. |
| `RuntimeRun` | interface | <code>interface RuntimeRun</code> | Runtime Run interface with 32 public fields or methods. |
| `RuntimeScope` | interface | <code>interface RuntimeScope</code> | Runtime Scope interface with 6 public fields or methods. |
| `RuntimeSession` | interface | <code>interface RuntimeSession</code> | Runtime Session interface with 13 public fields or methods. |
| `RuntimeWaitRecord` | interface | <code>interface RuntimeWaitRecord</code> | Runtime Wait Record interface with 11 public fields or methods. |
| `RuntimeWaitRequest` | interface | <code>interface RuntimeWaitRequest</code> | Runtime Wait Request interface with 7 public fields or methods. |
| `RuntimeErrorCode` | type | <code>type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number]</code> | Public type alias for Runtime Error Code; the declaration contains its complete type expression. |
| `RuntimePrincipalType` | type | <code>type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number]</code> | Public type alias for Runtime Principal Type; the declaration contains its complete type expression. |
| `RuntimeRunStatus` | type | <code>type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number]</code> | Public type alias for Runtime Run Status; the declaration contains its complete type expression. |
| `RuntimeSessionStatus` | type | <code>type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number]</code> | Public type alias for Runtime Session Status; the declaration contains its complete type expression. |
| `RuntimeWaitStatus` | type | <code>type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number]</code> | Public type alias for Runtime Wait Status; the declaration contains its complete type expression. |
| `RuntimeWaitType` | type | <code>type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number]</code> | Public type alias for Runtime Wait Type; the declaration contains its complete type expression. |

## `RUNTIME_ERROR_CODES`

RUNTIME ERROR CODES constant exported by the `contracts/runtime` module.

- Kind: constant
- Import: `import { RUNTIME_ERROR_CODES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export declare const RUNTIME_ERROR_CODES: readonly ["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND", "RUNTIME_RUN_CONFLICT", "RUNTIME_LEASE_CONFLICT", "RUNTIME_WORKFLOW_INVALID", "RUNTIME_PROCESS_MISMATCH", "RUNTIME_STATE_NOT_FOUND", "RUNTIME_TRANSITION_REJECTED", "RUNTIME_GUARD_FAILED", "RUNTIME_INVARIANT_FAILED", "RUNTIME_STATE_TIMEOUT", "RUNTIME_RUN_TIMEOUT", "RUNTIME_CANCELLED", "RUNTIME_SIGNAL_INVALID", "RUNTIME_SIGNAL_EXPIRED", "RUNTIME_RETRY_EXHAUSTED", "RUNTIME_CHECKPOINT_FAILED", "RUNTIME_EVENT_APPEND_FAILED", "RUNTIME_PROJECTION_FAILED", "RUNTIME_REPLAY_DIVERGENCE", "RUNTIME_INTERNAL_ERROR"];
```

## `RUNTIME_PRINCIPAL_TYPES`

RUNTIME PRINCIPAL TYPES constant exported by the `contracts/runtime` module.

- Kind: constant
- Import: `import { RUNTIME_PRINCIPAL_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export declare const RUNTIME_PRINCIPAL_TYPES: readonly ["user", "agent", "service", "system"];
```

## `RUNTIME_RUN_STATUSES`

RUNTIME RUN STATUSES constant exported by the `contracts/runtime` module.

- Kind: constant
- Import: `import { RUNTIME_RUN_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export declare const RUNTIME_RUN_STATUSES: readonly ["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"];
```

## `RUNTIME_SESSION_STATUSES`

RUNTIME SESSION STATUSES constant exported by the `contracts/runtime` module.

- Kind: constant
- Import: `import { RUNTIME_SESSION_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export declare const RUNTIME_SESSION_STATUSES: readonly ["active", "closed", "archived"];
```

## `RUNTIME_WAIT_STATUSES`

RUNTIME WAIT STATUSES constant exported by the `contracts/runtime` module.

- Kind: constant
- Import: `import { RUNTIME_WAIT_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export declare const RUNTIME_WAIT_STATUSES: readonly ["waiting", "received", "expired", "cancelled"];
```

## `RUNTIME_WAIT_TYPES`

RUNTIME WAIT TYPES constant exported by the `contracts/runtime` module.

- Kind: constant
- Import: `import { RUNTIME_WAIT_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export declare const RUNTIME_WAIT_TYPES: readonly ["human", "signal", "timer", "external_operation"];
```

## `NormalizedRuntimeError`

Normalized Runtime Error interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedRuntimeError } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causeRef` | property | <code>causeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" &#124; "RUNTIME_FENCING_REJECTED" &#124; "RUNTIME_RESOURCE_CONFLICT" &#124; "RUNTIME_IDEMPOTENCY_CONFLICT" &#124; "RUNTIME_EVENT_STREAM_CORRUPT" &#124; "RUNTIME_RECOVERY_REQUIRES_REVIEW" &#124; "RUNTIME_RUN_NOT_FOUND" &#124; "RUNTIME_RUN_CONFLICT"...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `details` | property | <code>details?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transitionId` | property | <code>transitionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunSignalRequest`

Run Signal Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RunSignalRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sentAt` | property | <code>sentAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signalId` | property | <code>signalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimePrincipal`

Runtime Principal interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimePrincipal } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `roles` | property | <code>roles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "system" &#124; "agent" &#124; "user" &#124; "service"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRun`

Runtime Run interface with 32 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRun } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancelReason` | property | <code>cancelReason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancelRequestedAt` | property | <code>cancelRequestedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `currentState` | property | <code>currentState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedRuntimeError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processHash` | property | <code>processHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processSpecRef` | property | <code>processSpecRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queuedAt` | property | <code>queuedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rootAgentRef` | property | <code>rootAgentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeProfileRef` | property | <code>runtimeProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "starting" &#124; "running" &#124; "cancelling" &#124; "cancelled" &#124; "failed" &#124; "timed_out" &#124; "created" &#124; "acquiring" &#124; "waiting" &#124; "waiting_human" &#124; "waiting_signal" &#124; "waiting_timer" &#124; "pausing" &#124; "paused" &#124; "retry_scheduled" &#124; "recovering"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalState` | property | <code>terminalState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRevision` | property | <code>workflowRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeScope`

Runtime Scope interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeSession`

Runtime Session interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeSession } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `closedAt` | property | <code>closedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfileRef` | property | <code>sessionProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "archived" &#124; "active" &#124; "closed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `title` | property | <code>title?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeWaitRecord`

Runtime Wait Record interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeWaitRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSchemaHash` | property | <code>expectedSchemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedAt` | property | <code>resolvedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signalRef` | property | <code>signalRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "cancelled" &#124; "expired" &#124; "waiting" &#124; "received"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeWaitRequest`

Runtime Wait Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeWaitRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedSchema` | property | <code>expectedSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutTransitionId` | property | <code>timeoutTransitionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "human" &#124; "signal" &#124; "timer" &#124; "external_operation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeErrorCode`

Public type alias for Runtime Error Code; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeErrorCode } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export type RuntimeErrorCode = (typeof RUNTIME_ERROR_CODES)[number];
```

## `RuntimePrincipalType`

Public type alias for Runtime Principal Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimePrincipalType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export type RuntimePrincipalType = (typeof RUNTIME_PRINCIPAL_TYPES)[number];
```

## `RuntimeRunStatus`

Public type alias for Runtime Run Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeRunStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export type RuntimeRunStatus = (typeof RUNTIME_RUN_STATUSES)[number];
```

## `RuntimeSessionStatus`

Public type alias for Runtime Session Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeSessionStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export type RuntimeSessionStatus = (typeof RUNTIME_SESSION_STATUSES)[number];
```

## `RuntimeWaitStatus`

Public type alias for Runtime Wait Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeWaitStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export type RuntimeWaitStatus = (typeof RUNTIME_WAIT_STATUSES)[number];
```

## `RuntimeWaitType`

Public type alias for Runtime Wait Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeWaitType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime.ts)

### Declaration

```text
export type RuntimeWaitType = (typeof RUNTIME_WAIT_TYPES)[number];
```
