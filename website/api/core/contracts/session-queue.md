# `@codesoul-co/hypha-core` / `contracts/session-queue`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/session-queue.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)
- Exports: **27**

## Using this module

Use the Session queue module for declaring and runtime-validating contracts. It exports 5 constants, 20 interfaces, 2 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 22 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 5 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS` | constant | <code>const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS: 5</code> | DEFAULT SESSION COMMAND MAX ATTEMPTS constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_MAX_ATTEMPTS_LIMIT` | constant | <code>const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT: 100</code> | SESSION COMMAND MAX ATTEMPTS LIMIT constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_RUN_CANCELLED_CODE` | constant | <code>const SESSION_COMMAND_RUN_CANCELLED_CODE: "RUNTIME_RUN_CANCELLED"</code> | SESSION COMMAND RUN CANCELLED CODE constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_STATUSES` | constant | <code>const SESSION_COMMAND_STATUSES: readonly ["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"]</code> | SESSION COMMAND STATUSES constant exported by the `contracts/session-queue` module. |
| `SESSION_COMMAND_TYPES` | constant | <code>const SESSION_COMMAND_TYPES: readonly ["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"]</code> | SESSION COMMAND TYPES constant exported by the `contracts/session-queue` module. |
| `CancelSessionCommandsRequest` | interface | <code>interface CancelSessionCommandsRequest</code> | Cancel Session Commands Request interface with 6 public fields or methods. |
| `CancelSessionCommandsResult` | interface | <code>interface CancelSessionCommandsResult</code> | Cancel Session Commands Result interface with 4 public fields or methods. |
| `ClaimSessionCommandRequest` | interface | <code>interface ClaimSessionCommandRequest</code> | Claim Session Command Request interface with 4 public fields or methods. |
| `CloseDeadLetterSessionCommandRequest` | interface | <code>interface CloseDeadLetterSessionCommandRequest</code> | Close Dead Letter Session Command Request interface with 6 public fields or methods. |
| `CompleteSessionCommandRequest` | interface | <code>interface CompleteSessionCommandRequest</code> | Complete Session Command Request interface with 7 public fields or methods. |
| `EnqueueSessionCommandRequest` | interface | <code>interface EnqueueSessionCommandRequest</code> | Enqueue Session Command Request interface with 15 public fields or methods. |
| `FailSessionCommandRequest` | interface | <code>interface FailSessionCommandRequest</code> | Fail Session Command Request interface with 7 public fields or methods. |
| `ListSessionCommandsRequest` | interface | <code>interface ListSessionCommandsRequest</code> | List Session Commands Request interface with 4 public fields or methods. |
| `ListStuckSessionCommandsRequest` | interface | <code>interface ListStuckSessionCommandsRequest</code> | List Stuck Session Commands Request interface with 4 public fields or methods. |
| `RedriveDeadLetterSessionCommandRequest` | interface | <code>interface RedriveDeadLetterSessionCommandRequest</code> | Redrive Dead Letter Session Command Request interface with 12 public fields or methods. |
| `ReleaseSessionCommandRequest` | interface | <code>interface ReleaseSessionCommandRequest</code> | Release Session Command Request interface with 6 public fields or methods. |
| `RenewSessionCommandRequest` | interface | <code>interface RenewSessionCommandRequest</code> | Renew Session Command Request interface with 6 public fields or methods. |
| `SessionCommandClaim` | interface | <code>interface SessionCommandClaim</code> | Session Command Claim interface with 5 public fields or methods. |
| `SessionCommandDeadLetterResolution` | interface | <code>interface SessionCommandDeadLetterResolution</code> | Session Command Dead Letter Resolution interface with 6 public fields or methods. |
| `SessionCommandLeaseRecovery` | interface | <code>interface SessionCommandLeaseRecovery</code> | Session Command Lease Recovery interface with 6 public fields or methods. |
| `SessionCommandRecord` | interface | <code>interface SessionCommandRecord</code> | Session Command Record interface with 29 public fields or methods. |
| `SessionCommandRedrive` | interface | <code>interface SessionCommandRedrive</code> | Session Command Redrive interface with 5 public fields or methods. |
| `SessionQueueHealthSnapshot` | interface | <code>interface SessionQueueHealthSnapshot extends Record&lt;string, unknown&gt;</code> | Session Queue Health Snapshot interface with 12 public fields or methods. |
| `SessionQueueScope` | interface | <code>interface SessionQueueScope</code> | Session Queue Scope interface with 3 public fields or methods. |
| `StuckSessionCommand` | interface | <code>interface StuckSessionCommand</code> | Stuck Session Command interface with 3 public fields or methods. |
| `SessionCommandStatus` | type | <code>type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number]</code> | Public type alias for Session Command Status; the declaration contains its complete type expression. |
| `SessionCommandType` | type | <code>type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number]</code> | Public type alias for Session Command Type; the declaration contains its complete type expression. |

## `DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS`

DEFAULT SESSION COMMAND MAX ATTEMPTS constant exported by the `contracts/session-queue` module.

- Kind: constant
- Import: `import { DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export declare const DEFAULT_SESSION_COMMAND_MAX_ATTEMPTS: 5;
```

## `SESSION_COMMAND_MAX_ATTEMPTS_LIMIT`

SESSION COMMAND MAX ATTEMPTS LIMIT constant exported by the `contracts/session-queue` module.

- Kind: constant
- Import: `import { SESSION_COMMAND_MAX_ATTEMPTS_LIMIT } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export declare const SESSION_COMMAND_MAX_ATTEMPTS_LIMIT: 100;
```

## `SESSION_COMMAND_RUN_CANCELLED_CODE`

SESSION COMMAND RUN CANCELLED CODE constant exported by the `contracts/session-queue` module.

- Kind: constant
- Import: `import { SESSION_COMMAND_RUN_CANCELLED_CODE } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export declare const SESSION_COMMAND_RUN_CANCELLED_CODE: "RUNTIME_RUN_CANCELLED";
```

## `SESSION_COMMAND_STATUSES`

SESSION COMMAND STATUSES constant exported by the `contracts/session-queue` module.

- Kind: constant
- Import: `import { SESSION_COMMAND_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export declare const SESSION_COMMAND_STATUSES: readonly ["queued", "claimed", "applied", "reused", "rejected", "expired", "failed", "dead_letter", "dead_letter_resolved"];
```

## `SESSION_COMMAND_TYPES`

SESSION COMMAND TYPES constant exported by the `contracts/session-queue` module.

- Kind: constant
- Import: `import { SESSION_COMMAND_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export declare const SESSION_COMMAND_TYPES: readonly ["start_run", "user_input", "resume", "signal", "cancel", "transition", "continue_react", "close_session"];
```

## `CancelSessionCommandsRequest`

Cancel Session Commands Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { CancelSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellationCommandId` | property | <code>cancellationCommandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancelledAt` | property | <code>cancelledAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CancelSessionCommandsResult`

Cancel Session Commands Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { CancelSessionCommandsResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface CancelSessionCommandsResult {
    targetRunId: string;
    cancelledCommandIds: string[];
    alreadyCancelledCommandIds: string[];
    alreadyTerminalCommandIds: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alreadyCancelledCommandIds` | property | <code>alreadyCancelledCommandIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `alreadyTerminalCommandIds` | property | <code>alreadyTerminalCommandIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancelledCommandIds` | property | <code>cancelledCommandIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ClaimSessionCommandRequest`

Claim Session Command Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ClaimSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface ClaimSessionCommandRequest {
    workerId: string;
    now: string;
    leaseMs: number;
    scope?: SessionQueueScope;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `leaseMs` | property | <code>leaseMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | property | <code>now: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CloseDeadLetterSessionCommandRequest`

Close Dead Letter Session Command Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { CloseDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `closedAt` | property | <code>closedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operatorId` | property | <code>operatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CompleteSessionCommandRequest`

Complete Session Command Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { CompleteSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultEventIds` | property | <code>resultEventIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultRunId` | property | <code>resultRunId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EnqueueSessionCommandRequest`

Enqueue Session Command Request interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { EnqueueSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandType` | property | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadRef` | property | <code>payloadRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetRunId` | property | <code>targetRunId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FailSessionCommandRequest`

Fail Session Command Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { FailSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetter` | property | <code>deadLetter?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failedAt` | property | <code>failedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectionCode` | property | <code>rejectionCode: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ListSessionCommandsRequest`

List Session Commands Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ListSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface ListSessionCommandsRequest {
    scope: SessionQueueScope;
    statuses?: SessionCommandStatus[];
    fromSequence?: number;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fromSequence` | property | <code>fromSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statuses` | property | <code>statuses?: ("rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ListStuckSessionCommandsRequest`

List Stuck Session Commands Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ListStuckSessionCommandsRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface ListStuckSessionCommandsRequest {
    scope: SessionQueueScope;
    checkedAt: string;
    graceMs?: number;
    limit?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkedAt` | property | <code>checkedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `graceMs` | property | <code>graceMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedriveDeadLetterSessionCommandRequest`

Redrive Dead Letter Session Command Request interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RedriveDeadLetterSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operatorId` | property | <code>operatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: SessionQueueScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceCommandId` | property | <code>sourceCommandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReleaseSessionCommandRequest`

Release Session Command Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ReleaseSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `releasedAt` | property | <code>releasedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RenewSessionCommandRequest`

Renew Session Command Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RenewSessionCommandRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseMs` | property | <code>leaseMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `renewedAt` | property | <code>renewedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandClaim`

Session Command Claim interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandClaim } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface SessionCommandClaim {
    commandId: string;
    workerId: string;
    claimToken: string;
    leaseEpoch: number;
    leaseExpiresAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workerId` | property | <code>workerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandDeadLetterResolution`

Session Command Dead Letter Resolution interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandDeadLetterResolution } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "closed" &#124; "redriven"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operatorId` | property | <code>operatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redriveCommandId` | property | <code>redriveCommandId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedAt` | property | <code>resolvedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandLeaseRecovery`

Session Command Lease Recovery interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandLeaseRecovery } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "requeued" &#124; "dead_lettered"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiredAt` | property | <code>leaseExpiredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousLeaseEpoch` | property | <code>previousLeaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousWorkerId` | property | <code>previousWorkerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recoveredAt` | property | <code>recoveredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandRecord`

Session Command Record interface with 29 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimedBy` | property | <code>claimedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimToken` | property | <code>claimToken?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandType` | property | <code>commandType: "user_input" &#124; "cancel" &#124; "signal" &#124; "start_run" &#124; "resume" &#124; "transition" &#124; "continue_react" &#124; "close_session"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetterResolution` | property | <code>deadLetterResolution?: SessionCommandDeadLetterResolution</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enqueueSequence` | property | <code>enqueueSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseRecoveries` | property | <code>leaseRecoveries?: SessionCommandLeaseRecovery[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadRef` | property | <code>payloadRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redrive` | property | <code>redrive?: SessionCommandRedrive</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectionCode` | property | <code>rejectionCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultEventIds` | property | <code>resultEventIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultRunId` | property | <code>resultRunId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "rejected" &#124; "queued" &#124; "failed" &#124; "expired" &#124; "applied" &#124; "dead_letter" &#124; "claimed" &#124; "reused" &#124; "dead_letter_resolved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetRunId` | property | <code>targetRunId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandRedrive`

Session Command Redrive interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandRedrive } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface SessionCommandRedrive {
    version: '1.0.0';
    sourceCommandId: string;
    operatorId: string;
    reason: string;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `operatorId` | property | <code>operatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceCommandId` | property | <code>sourceCommandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionQueueHealthSnapshot`

Session Queue Health Snapshot interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { SessionQueueHealthSnapshot } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimedCommands` | property | <code>claimedCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetterCommands` | property | <code>deadLetterCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseRecoveryCount` | property | <code>leaseRecoveryCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `oldestPendingAgeMs` | property | <code>oldestPendingAgeMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingCommands` | property | <code>pendingCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queuedCommands` | property | <code>queuedCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recoveredExpiredLeases` | property | <code>recoveredExpiredLeases: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redeliveredCommands` | property | <code>redeliveredCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedDeadLetterCommands` | property | <code>resolvedDeadLetterCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryingCommands` | property | <code>retryingCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalCommands` | property | <code>totalCommands: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionQueueScope`

Session Queue Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SessionQueueScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface SessionQueueScope {
    tenantId?: string;
    userId: string;
    sessionId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StuckSessionCommand`

Stuck Session Command interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { StuckSessionCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export interface StuckSessionCommand {
    command: SessionCommandRecord;
    detectedAt: string;
    overdueMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: SessionCommandRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `detectedAt` | property | <code>detectedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `overdueMs` | property | <code>overdueMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandStatus`

Public type alias for Session Command Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SessionCommandStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export type SessionCommandStatus = (typeof SESSION_COMMAND_STATUSES)[number];
```

## `SessionCommandType`

Public type alias for Session Command Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SessionCommandType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/session-queue`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/session-queue.ts)

### Declaration

```text
export type SessionCommandType = (typeof SESSION_COMMAND_TYPES)[number];
```
