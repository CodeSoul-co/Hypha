# `@codesoul-co/hypha-core` / `contracts/execution-activities`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-activities.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)
- Exports: **5**

## Using this module

Use the Execution activities module for declaring and runtime-validating contracts. It exports 1 constant, 2 interfaces, 2 types.

### Import from the package entrypoint

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

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EXECUTION_ACTIVITY_STATUSES` | constant | <code>const EXECUTION_ACTIVITY_STATUSES: readonly ["completed", "failed", "timeout", "cancelled", "unknown"]</code> | EXECUTION ACTIVITY STATUSES constant exported by the `contracts/execution-activities` module. |
| `ExecutionActivityRequest` | interface | <code>interface ExecutionActivityRequest</code> | Execution Activity Request interface with 9 public fields or methods. |
| `ExecutionActivityResult` | interface | <code>interface ExecutionActivityResult</code> | Execution Activity Result interface with 7 public fields or methods. |
| `ExecutionActivityStatus` | type | <code>type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number]</code> | Public type alias for Execution Activity Status; the declaration contains its complete type expression. |
| `WorkspaceOperationRequest` | type | <code>type WorkspaceOperationRequest = WorkspacePathRequest &#124; WorkspaceListRequest &#124; WorkspaceReadRequest &#124; WorkspaceWriteRequest &#124; WorkspaceDeleteRequest &#124; WorkspaceSnapshotRequest &#124; WorkspaceRestoreRequest &#124; WorkspaceDiffRequest &#124; WorkspacePatchRequest</code> | Public type alias for Workspace Operation Request; the declaration contains its complete type expression. |

## `EXECUTION_ACTIVITY_STATUSES`

EXECUTION ACTIVITY STATUSES constant exported by the `contracts/execution-activities` module.

- Kind: constant
- Import: `import { EXECUTION_ACTIVITY_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### Declaration

```text
export declare const EXECUTION_ACTIVITY_STATUSES: readonly ["completed", "failed", "timeout", "cancelled", "unknown"];
```

## `ExecutionActivityRequest`

Execution Activity Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionActivityRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttemptId` | property | <code>stateAttemptId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionActivityResult`

Execution Activity Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionActivityResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedExecutionError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshotRef` | property | <code>snapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "unknown" &#124; "completed" &#124; "cancelled" &#124; "failed" &#124; "timeout"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionActivityStatus`

Public type alias for Execution Activity Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionActivityStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### Declaration

```text
export type ExecutionActivityStatus = (typeof EXECUTION_ACTIVITY_STATUSES)[number];
```

## `WorkspaceOperationRequest`

Public type alias for Workspace Operation Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceOperationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-activities`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-activities.ts)

### Declaration

```text
export type WorkspaceOperationRequest = WorkspacePathRequest | WorkspaceListRequest | WorkspaceReadRequest | WorkspaceWriteRequest | WorkspaceDeleteRequest | WorkspaceSnapshotRequest | WorkspaceRestoreRequest | WorkspaceDiffRequest | WorkspacePatchRequest;
```
