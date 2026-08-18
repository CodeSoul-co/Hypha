# `@codesoul-co/hypha-core` / `contracts/react-continuation`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/react-continuation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CONTINUE_REACT_COMMAND_PAYLOAD_VERSION` | 常量 | <code>const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION: "1.0.0"</code> | 由 `contracts/react-continuation` 模块导出的 CONTINUE REACT COMMAND PAYLOAD VERSION 常量。 |
| `REACT_QUANTUM_DESCRIPTOR_VERSION` | 常量 | <code>const REACT_QUANTUM_DESCRIPTOR_VERSION: "1.0.0"</code> | 由 `contracts/react-continuation` 模块导出的 REACT QUANTUM DESCRIPTOR VERSION 常量。 |
| `ContinuationReActQuantumDescriptor` | 接口 | <code>interface ContinuationReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Continuation Re Act Quantum Descriptor 的字段契约；完整字段见下表。 |
| `ContinueReActCommandPayloadV1` | 接口 | <code>interface ContinueReActCommandPayloadV1</code> | Continue Re Act Command Payload V1 的字段契约；完整字段见下表。 |
| `InitialReActQuantumDescriptor` | 接口 | <code>interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Initial Re Act Quantum Descriptor 的字段契约；完整字段见下表。 |
| `ReActGlobalBudget` | 接口 | <code>interface ReActGlobalBudget</code> | Re Act Global Budget 的字段契约；完整字段见下表。 |
| `ReActQuantumDescriptorBase` | 接口 | <code>interface ReActQuantumDescriptorBase</code> | Re Act Quantum Descriptor Base 的字段契约；完整字段见下表。 |
| `ContinueReActCommandPayload` | 类型 | <code>type ContinueReActCommandPayload = ContinueReActCommandPayloadV1</code> | Continue Re Act Command Payload 的公共类型别名。 |
| `ReActQuantumDescriptor` | 类型 | <code>type ReActQuantumDescriptor = InitialReActQuantumDescriptor &#124; ContinuationReActQuantumDescriptor</code> | Re Act Quantum Descriptor 的公共类型别名。 |

## `ContinuationReActQuantumDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | cancellation Revision 字段。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | capability Snapshot Hash 字段。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | capability Snapshot Ref 字段。 |
| `checkpointHash` | 属性 | <code>checkpointHash: string</code> | checkpoint Hash 字段。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | checkpoint Ref 字段。 |
| `checkpointSequence` | 属性 | <code>checkpointSequence: number</code> | checkpoint Sequence 字段。 |
| `claimToken` | 属性 | <code>claimToken: string</code> | claim Token 字段。 |
| `commandId` | 属性 | <code>commandId: string</code> | command Id 字段。 |
| `commandPayloadHash` | 属性 | <code>commandPayloadHash: string</code> | command Payload Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `executionRef` | 属性 | <code>executionRef: string</code> | execution Ref 字段。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | global Budget 字段。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | lease Epoch 字段。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef: string</code> | memory Context Ref 字段。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts: string[]</code> | pending Operation Receipts 字段。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | prompt Snapshot Hash 字段。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | prompt Snapshot Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `trigger` | 属性 | <code>trigger: "continuation"</code> | trigger 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
| `workspaceRef` | 属性 | <code>workspaceRef: string</code> | workspace Ref 字段。 |

## `ContinueReActCommandPayloadV1` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | cancellation Revision 字段。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | capability Snapshot Hash 字段。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | capability Snapshot Ref 字段。 |
| `checkpointHash` | 属性 | <code>checkpointHash: string</code> | checkpoint Hash 字段。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | checkpoint Ref 字段。 |
| `checkpointSequence` | 属性 | <code>checkpointSequence: number</code> | checkpoint Sequence 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `executionRef` | 属性 | <code>executionRef: string</code> | execution Ref 字段。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | global Budget 字段。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef: string</code> | memory Context Ref 字段。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts: string[]</code> | pending Operation Receipts 字段。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | prompt Snapshot Hash 字段。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | prompt Snapshot Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
| `workspaceRef` | 属性 | <code>workspaceRef: string</code> | workspace Ref 字段。 |

## `InitialReActQuantumDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | cancellation Revision 字段。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | capability Snapshot Hash 字段。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | capability Snapshot Ref 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `executionRef` | 属性 | <code>executionRef: string</code> | execution Ref 字段。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | global Budget 字段。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef: string</code> | memory Context Ref 字段。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts: string[]</code> | pending Operation Receipts 字段。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | prompt Snapshot Hash 字段。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | prompt Snapshot Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `trigger` | 属性 | <code>trigger: "initial"</code> | trigger 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
| `workspaceRef` | 属性 | <code>workspaceRef: string</code> | workspace Ref 字段。 |

## `ReActGlobalBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `iterations` | 属性 | <code>iterations: number</code> | iterations 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: number</code> | model Calls 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: number</code> | tool Calls 字段。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | total Tokens 字段。 |

## `ReActQuantumDescriptorBase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | cancellation Revision 字段。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | capability Snapshot Hash 字段。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | capability Snapshot Ref 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `executionRef` | 属性 | <code>executionRef: string</code> | execution Ref 字段。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | global Budget 字段。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef: string</code> | memory Context Ref 字段。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts: string[]</code> | pending Operation Receipts 字段。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | prompt Snapshot Hash 字段。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | prompt Snapshot Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
| `workspaceRef` | 属性 | <code>workspaceRef: string</code> | workspace Ref 字段。 |
