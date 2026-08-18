# `@codesoul-co/hypha-core` / `contracts/react-continuation`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/react-continuation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)
- Exports: **9**

## Using this module

Use the React continuation module for declaring and runtime-validating contracts. It exports 2 constants, 5 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  CONTINUE_REACT_COMMAND_PAYLOAD_VERSION,
  REACT_QUANTUM_DESCRIPTOR_VERSION,
} from '@codesoul-co/hypha-core';

import type {
  ContinuationReActQuantumDescriptor,
  ContinueReActCommandPayloadV1,
  InitialReActQuantumDescriptor,
  ReActGlobalBudget,
  ReActQuantumDescriptorBase,
  ContinueReActCommandPayload,
  ReActQuantumDescriptor,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CONTINUE_REACT_COMMAND_PAYLOAD_VERSION` | constant | <code>const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION: "1.0.0"</code> | CONTINUE REACT COMMAND PAYLOAD VERSION constant exported by the `contracts/react-continuation` module. |
| `REACT_QUANTUM_DESCRIPTOR_VERSION` | constant | <code>const REACT_QUANTUM_DESCRIPTOR_VERSION: "1.0.0"</code> | REACT QUANTUM DESCRIPTOR VERSION constant exported by the `contracts/react-continuation` module. |
| `ContinuationReActQuantumDescriptor` | interface | <code>interface ContinuationReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Continuation ReAct Quantum Descriptor interface with 29 public fields or methods. |
| `ContinueReActCommandPayloadV1` | interface | <code>interface ContinueReActCommandPayloadV1</code> | Continue ReAct Command Payload V1 interface with 24 public fields or methods. |
| `InitialReActQuantumDescriptor` | interface | <code>interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Initial ReAct Quantum Descriptor interface with 22 public fields or methods. |
| `ReActGlobalBudget` | interface | <code>interface ReActGlobalBudget</code> | ReAct Global Budget interface with 4 public fields or methods. |
| `ReActQuantumDescriptorBase` | interface | <code>interface ReActQuantumDescriptorBase</code> | ReAct Quantum Descriptor Base interface with 21 public fields or methods. |
| `ContinueReActCommandPayload` | type | <code>type ContinueReActCommandPayload = ContinueReActCommandPayloadV1</code> | Public type alias for Continue ReAct Command Payload; the declaration contains its complete type expression. |
| `ReActQuantumDescriptor` | type | <code>type ReActQuantumDescriptor = InitialReActQuantumDescriptor &#124; ContinuationReActQuantumDescriptor</code> | Public type alias for ReAct Quantum Descriptor; the declaration contains its complete type expression. |

## `CONTINUE_REACT_COMMAND_PAYLOAD_VERSION`

CONTINUE REACT COMMAND PAYLOAD VERSION constant exported by the `contracts/react-continuation` module.

- Kind: constant
- Import: `import { CONTINUE_REACT_COMMAND_PAYLOAD_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export declare const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION: "1.0.0";
```

## `REACT_QUANTUM_DESCRIPTOR_VERSION`

REACT QUANTUM DESCRIPTOR VERSION constant exported by the `contracts/react-continuation` module.

- Kind: constant
- Import: `import { REACT_QUANTUM_DESCRIPTOR_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export declare const REACT_QUANTUM_DESCRIPTOR_VERSION: "1.0.0";
```

## `ContinuationReActQuantumDescriptor`

Continuation ReAct Quantum Descriptor interface with 29 public fields or methods.

- Kind: interface
- Import: `import type { ContinuationReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export interface ContinuationReActQuantumDescriptor extends ReActQuantumDescriptorBase {
    trigger: 'continuation';
    commandId: string;
    commandPayloadHash: string;
    claimToken: string;
    leaseEpoch: number;
    checkpointRef: string;
    checkpointHash: string;
    checkpointSequence: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointHash` | property | <code>checkpointHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointSequence` | property | <code>checkpointSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimToken` | property | <code>claimToken: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandPayloadHash` | property | <code>commandPayloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionRef` | property | <code>executionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryContextRef` | property | <code>memoryContextRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trigger` | property | <code>trigger: "continuation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRef` | property | <code>workspaceRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContinueReActCommandPayloadV1`

Continue ReAct Command Payload V1 interface with 24 public fields or methods.

- Kind: interface
- Import: `import type { ContinueReActCommandPayloadV1 } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export interface ContinueReActCommandPayloadV1 {
    version: typeof CONTINUE_REACT_COMMAND_PAYLOAD_VERSION;
    runId: string;
    sessionId: string;
    userId: string;
    stepId: string;
    checkpointRef: string;
    checkpointHash: string;
    checkpointSequence: number;
    scopeHash: string;
    agentRef: SpecRef;
    domainPackRef: SpecRef;
    workflowRef?: SpecRef;
    promptSnapshotRef: string;
    promptSnapshotHash: string;
    capabilitySnapshotRef: string;
    capabilitySnapshotHash: string;
    memoryContextRef?: string;
    workspaceRef?: string;
    executionRef?: string;
    pendingOperationReceipts?: string[];
    globalBudget: ReActGlobalBudget;
    deadlineAt?: string;
    cancellationRevision: number;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointHash` | property | <code>checkpointHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointSequence` | property | <code>checkpointSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionRef` | property | <code>executionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryContextRef` | property | <code>memoryContextRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRef` | property | <code>workspaceRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InitialReActQuantumDescriptor`

Initial ReAct Quantum Descriptor interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { InitialReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase {
    trigger: 'initial';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionRef` | property | <code>executionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryContextRef` | property | <code>memoryContextRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trigger` | property | <code>trigger: "initial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRef` | property | <code>workspaceRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActGlobalBudget`

ReAct Global Budget interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ReActGlobalBudget } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export interface ReActGlobalBudget {
    iterations: number;
    modelCalls: number;
    toolCalls: number;
    totalTokens: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `iterations` | property | <code>iterations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActQuantumDescriptorBase`

ReAct Quantum Descriptor Base interface with 21 public fields or methods.

- Kind: interface
- Import: `import type { ReActQuantumDescriptorBase } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export interface ReActQuantumDescriptorBase {
    version: typeof REACT_QUANTUM_DESCRIPTOR_VERSION;
    runId: string;
    sessionId: string;
    userId: string;
    stepId: string;
    scopeHash: string;
    agentRef: SpecRef;
    domainPackRef: SpecRef;
    workflowRef?: SpecRef;
    promptSnapshotRef: string;
    promptSnapshotHash: string;
    capabilitySnapshotRef: string;
    capabilitySnapshotHash: string;
    memoryContextRef?: string;
    workspaceRef?: string;
    executionRef?: string;
    pendingOperationReceipts?: string[];
    globalBudget: ReActGlobalBudget;
    deadlineAt?: string;
    cancellationRevision: number;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionRef` | property | <code>executionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryContextRef` | property | <code>memoryContextRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRef` | property | <code>workspaceRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContinueReActCommandPayload`

Public type alias for Continue ReAct Command Payload; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ContinueReActCommandPayload } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export type ContinueReActCommandPayload = ContinueReActCommandPayloadV1;
```

## `ReActQuantumDescriptor`

Public type alias for ReAct Quantum Descriptor; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### Declaration

```text
export type ReActQuantumDescriptor = InitialReActQuantumDescriptor | ContinuationReActQuantumDescriptor;
```
