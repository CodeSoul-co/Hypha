# `@codesoul-co/hypha-core` / `contracts/runtime-human-task`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-human-task.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)
- Exports: **9**

## Using this module

Use the Runtime human task module for declaring and runtime-validating contracts. It exports 3 constants, 3 interfaces, 3 types.

### Import from the package entrypoint

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

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_HUMAN_TASK_DECISIONS` | constant | <code>const RUNTIME_HUMAN_TASK_DECISIONS: readonly ["approved", "rejected", "expired", "cancelled", "superseded"]</code> | RUNTIME HUMAN TASK DECISIONS constant exported by the `contracts/runtime-human-task` module. |
| `RUNTIME_HUMAN_TASK_KINDS` | constant | <code>const RUNTIME_HUMAN_TASK_KINDS: readonly ["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]</code> | RUNTIME HUMAN TASK KINDS constant exported by the `contracts/runtime-human-task` module. |
| `RUNTIME_HUMAN_TASK_STATUSES` | constant | <code>const RUNTIME_HUMAN_TASK_STATUSES: readonly ["pending", "approved", "rejected", "expired", "cancelled", "superseded"]</code> | RUNTIME HUMAN TASK STATUSES constant exported by the `contracts/runtime-human-task` module. |
| `RuntimeHumanTask` | interface | <code>interface RuntimeHumanTask</code> | Runtime Human Task interface with 26 public fields or methods. |
| `RuntimeHumanTaskDecisionCommand` | interface | <code>interface RuntimeHumanTaskDecisionCommand</code> | Runtime Human Task Decision Command interface with 11 public fields or methods. |
| `RuntimeHumanTaskRequest` | interface | <code>interface RuntimeHumanTaskRequest</code> | Runtime Human Task Request interface with 15 public fields or methods. |
| `RuntimeHumanTaskDecision` | type | <code>type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number]</code> | Public type alias for Runtime Human Task Decision; the declaration contains its complete type expression. |
| `RuntimeHumanTaskKind` | type | <code>type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number]</code> | Public type alias for Runtime Human Task Kind; the declaration contains its complete type expression. |
| `RuntimeHumanTaskStatus` | type | <code>type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number]</code> | Public type alias for Runtime Human Task Status; the declaration contains its complete type expression. |

## `RUNTIME_HUMAN_TASK_DECISIONS`

RUNTIME HUMAN TASK DECISIONS constant exported by the `contracts/runtime-human-task` module.

- Kind: constant
- Import: `import { RUNTIME_HUMAN_TASK_DECISIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

```text
export declare const RUNTIME_HUMAN_TASK_DECISIONS: readonly ["approved", "rejected", "expired", "cancelled", "superseded"];
```

## `RUNTIME_HUMAN_TASK_KINDS`

RUNTIME HUMAN TASK KINDS constant exported by the `contracts/runtime-human-task` module.

- Kind: constant
- Import: `import { RUNTIME_HUMAN_TASK_KINDS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

```text
export declare const RUNTIME_HUMAN_TASK_KINDS: readonly ["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"];
```

## `RUNTIME_HUMAN_TASK_STATUSES`

RUNTIME HUMAN TASK STATUSES constant exported by the `contracts/runtime-human-task` module.

- Kind: constant
- Import: `import { RUNTIME_HUMAN_TASK_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

```text
export declare const RUNTIME_HUMAN_TASK_STATUSES: readonly ["pending", "approved", "rejected", "expired", "cancelled", "superseded"];
```

## `RuntimeHumanTask`

Runtime Human Task interface with 26 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanTask } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedDecisionScopes` | property | <code>allowedDecisionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointRef` | property | <code>checkpointRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decidedAt` | property | <code>decidedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decidedBy` | property | <code>decidedBy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decisionCommandId` | property | <code>decisionCommandId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decisionEventId` | property | <code>decisionEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decisionIdempotencyKey` | property | <code>decisionIdempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRef` | property | <code>policyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedBy` | property | <code>requestedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "rejected" &#124; "cancelled" &#124; "expired" &#124; "pending" &#124; "approved" &#124; "superseded"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectRef` | property | <code>subjectRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supersededByTaskId` | property | <code>supersededByTaskId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanTaskDecisionCommand`

Runtime Human Task Decision Command interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanTaskDecisionCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decidedAt` | property | <code>decidedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved" &#124; "superseded"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSubjectHash` | property | <code>expectedSubjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supersededByTaskId` | property | <code>supersededByTaskId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanTaskRequest`

Runtime Human Task Request interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeHumanTaskRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedDecisionScopes` | property | <code>allowedDecisionScopes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointRef` | property | <code>checkpointRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "memory" &#124; "skill" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "prompt"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRef` | property | <code>policyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedBy` | property | <code>requestedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectRef` | property | <code>subjectRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeHumanTaskDecision`

Public type alias for Runtime Human Task Decision; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeHumanTaskDecision } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

```text
export type RuntimeHumanTaskDecision = (typeof RUNTIME_HUMAN_TASK_DECISIONS)[number];
```

## `RuntimeHumanTaskKind`

Public type alias for Runtime Human Task Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeHumanTaskKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

```text
export type RuntimeHumanTaskKind = (typeof RUNTIME_HUMAN_TASK_KINDS)[number];
```

## `RuntimeHumanTaskStatus`

Public type alias for Runtime Human Task Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeHumanTaskStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-human-task`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task.ts)

### Declaration

```text
export type RuntimeHumanTaskStatus = (typeof RUNTIME_HUMAN_TASK_STATUSES)[number];
```
