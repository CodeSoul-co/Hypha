# `@codesoul-co/hypha-core` / `contracts/react-continuation`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/react-continuation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CONTINUE_REACT_COMMAND_PAYLOAD_VERSION` | constant | <code>const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION: "1.0.0"</code> | CONTINUE REACT COMMAND PAYLOAD VERSION constant exported by the `contracts/react-continuation` module. |
| `REACT_QUANTUM_DESCRIPTOR_VERSION` | constant | <code>const REACT_QUANTUM_DESCRIPTOR_VERSION: "1.0.0"</code> | REACT QUANTUM DESCRIPTOR VERSION constant exported by the `contracts/react-continuation` module. |
| `ContinuationReActQuantumDescriptor` | interface | <code>interface ContinuationReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Field contract for Continuation Re Act Quantum Descriptor; see all contract members below. |
| `ContinueReActCommandPayloadV1` | interface | <code>interface ContinueReActCommandPayloadV1</code> | Field contract for Continue Re Act Command Payload V1; see all contract members below. |
| `InitialReActQuantumDescriptor` | interface | <code>interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Field contract for Initial Re Act Quantum Descriptor; see all contract members below. |
| `ReActGlobalBudget` | interface | <code>interface ReActGlobalBudget</code> | Field contract for Re Act Global Budget; see all contract members below. |
| `ReActQuantumDescriptorBase` | interface | <code>interface ReActQuantumDescriptorBase</code> | Field contract for Re Act Quantum Descriptor Base; see all contract members below. |
| `ContinueReActCommandPayload` | type | <code>type ContinueReActCommandPayload = ContinueReActCommandPayloadV1</code> | Public type alias for Continue Re Act Command Payload. |
| `ReActQuantumDescriptor` | type | <code>type ReActQuantumDescriptor = InitialReActQuantumDescriptor &#124; ContinuationReActQuantumDescriptor</code> | Public type alias for Re Act Quantum Descriptor. |

## `ContinuationReActQuantumDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public cancellation Revision property. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public capability Snapshot Hash property. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public capability Snapshot Ref property. |
| `checkpointHash` | property | <code>checkpointHash: string</code> | Public checkpoint Hash property. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public checkpoint Ref property. |
| `checkpointSequence` | property | <code>checkpointSequence: number</code> | Public checkpoint Sequence property. |
| `claimToken` | property | <code>claimToken: string</code> | Public claim Token property. |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `commandPayloadHash` | property | <code>commandPayloadHash: string</code> | Public command Payload Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `executionRef` | property | <code>executionRef: string</code> | Public execution Ref property. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public global Budget property. |
| `leaseEpoch` | property | <code>leaseEpoch: number</code> | Public lease Epoch property. |
| `memoryContextRef` | property | <code>memoryContextRef: string</code> | Public memory Context Ref property. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts: string[]</code> | Public pending Operation Receipts property. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public prompt Snapshot Hash property. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public prompt Snapshot Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `trigger` | property | <code>trigger: "continuation"</code> | Public trigger property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
| `workspaceRef` | property | <code>workspaceRef: string</code> | Public workspace Ref property. |

## `ContinueReActCommandPayloadV1` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public cancellation Revision property. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public capability Snapshot Hash property. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public capability Snapshot Ref property. |
| `checkpointHash` | property | <code>checkpointHash: string</code> | Public checkpoint Hash property. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public checkpoint Ref property. |
| `checkpointSequence` | property | <code>checkpointSequence: number</code> | Public checkpoint Sequence property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `executionRef` | property | <code>executionRef: string</code> | Public execution Ref property. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public global Budget property. |
| `memoryContextRef` | property | <code>memoryContextRef: string</code> | Public memory Context Ref property. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts: string[]</code> | Public pending Operation Receipts property. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public prompt Snapshot Hash property. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public prompt Snapshot Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
| `workspaceRef` | property | <code>workspaceRef: string</code> | Public workspace Ref property. |

## `InitialReActQuantumDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public cancellation Revision property. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public capability Snapshot Hash property. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public capability Snapshot Ref property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `executionRef` | property | <code>executionRef: string</code> | Public execution Ref property. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public global Budget property. |
| `memoryContextRef` | property | <code>memoryContextRef: string</code> | Public memory Context Ref property. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts: string[]</code> | Public pending Operation Receipts property. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public prompt Snapshot Hash property. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public prompt Snapshot Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `trigger` | property | <code>trigger: "initial"</code> | Public trigger property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
| `workspaceRef` | property | <code>workspaceRef: string</code> | Public workspace Ref property. |

## `ReActGlobalBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `iterations` | property | <code>iterations: number</code> | Public iterations property. |
| `modelCalls` | property | <code>modelCalls: number</code> | Public model Calls property. |
| `toolCalls` | property | <code>toolCalls: number</code> | Public tool Calls property. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public total Tokens property. |

## `ReActQuantumDescriptorBase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public cancellation Revision property. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public capability Snapshot Hash property. |
| `capabilitySnapshotRef` | property | <code>capabilitySnapshotRef: string</code> | Public capability Snapshot Ref property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `executionRef` | property | <code>executionRef: string</code> | Public execution Ref property. |
| `globalBudget` | property | <code>globalBudget: ReActGlobalBudget</code> | Public global Budget property. |
| `memoryContextRef` | property | <code>memoryContextRef: string</code> | Public memory Context Ref property. |
| `pendingOperationReceipts` | property | <code>pendingOperationReceipts: string[]</code> | Public pending Operation Receipts property. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public prompt Snapshot Hash property. |
| `promptSnapshotRef` | property | <code>promptSnapshotRef: string</code> | Public prompt Snapshot Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
| `workspaceRef` | property | <code>workspaceRef: string</code> | Public workspace Ref property. |
