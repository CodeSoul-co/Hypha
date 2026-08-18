# `@codesoul-co/hypha-core` / `contracts/react-continuation`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/react-continuation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)
- 导出数: **9**

## 模块用法

用于声明并运行时校验契约。React continuation 模块公开 2 常量、5 接口、2 类型。

### 从包入口导入

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

### 使用要点

- 7 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CONTINUE_REACT_COMMAND_PAYLOAD_VERSION` | 常量 | <code>const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION: "1.0.0"</code> | 由 `contracts/react-continuation` 模块导出的 CONTINUE REACT COMMAND PAYLOAD VERSION 常量。 |
| `REACT_QUANTUM_DESCRIPTOR_VERSION` | 常量 | <code>const REACT_QUANTUM_DESCRIPTOR_VERSION: "1.0.0"</code> | 由 `contracts/react-continuation` 模块导出的 REACT QUANTUM DESCRIPTOR VERSION 常量。 |
| `ContinuationReActQuantumDescriptor` | 接口 | <code>interface ContinuationReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Continuation ReAct Quantum Descriptor 接口，共包含 29 个公开字段或方法。 |
| `ContinueReActCommandPayloadV1` | 接口 | <code>interface ContinueReActCommandPayloadV1</code> | Continue ReAct Command Payload V1 接口，共包含 24 个公开字段或方法。 |
| `InitialReActQuantumDescriptor` | 接口 | <code>interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase</code> | Initial ReAct Quantum Descriptor 接口，共包含 22 个公开字段或方法。 |
| `ReActGlobalBudget` | 接口 | <code>interface ReActGlobalBudget</code> | ReAct Global Budget 接口，共包含 4 个公开字段或方法。 |
| `ReActQuantumDescriptorBase` | 接口 | <code>interface ReActQuantumDescriptorBase</code> | ReAct Quantum Descriptor Base 接口，共包含 21 个公开字段或方法。 |
| `ContinueReActCommandPayload` | 类型 | <code>type ContinueReActCommandPayload = ContinueReActCommandPayloadV1</code> | Continue ReAct Command Payload 公共类型别名；完整类型表达式见声明。 |
| `ReActQuantumDescriptor` | 类型 | <code>type ReActQuantumDescriptor = InitialReActQuantumDescriptor &#124; ContinuationReActQuantumDescriptor</code> | ReAct Quantum Descriptor 公共类型别名；完整类型表达式见声明。 |

## `CONTINUE_REACT_COMMAND_PAYLOAD_VERSION`

由 `contracts/react-continuation` 模块导出的 CONTINUE REACT COMMAND PAYLOAD VERSION 常量。

- 种类: 常量
- 导入: `import { CONTINUE_REACT_COMMAND_PAYLOAD_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

```text
export declare const CONTINUE_REACT_COMMAND_PAYLOAD_VERSION: "1.0.0";
```

## `REACT_QUANTUM_DESCRIPTOR_VERSION`

由 `contracts/react-continuation` 模块导出的 REACT QUANTUM DESCRIPTOR VERSION 常量。

- 种类: 常量
- 导入: `import { REACT_QUANTUM_DESCRIPTOR_VERSION } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

```text
export declare const REACT_QUANTUM_DESCRIPTOR_VERSION: "1.0.0";
```

## `ContinuationReActQuantumDescriptor`

Continuation ReAct Quantum Descriptor 接口，共包含 29 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContinuationReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointHash` | 属性 | <code>checkpointHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointSequence` | 属性 | <code>checkpointSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `claimToken` | 属性 | <code>claimToken: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandPayloadHash` | 属性 | <code>commandPayloadHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionRef` | 属性 | <code>executionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseEpoch` | 属性 | <code>leaseEpoch: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trigger` | 属性 | <code>trigger: "continuation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRef` | 属性 | <code>workspaceRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContinueReActCommandPayloadV1`

Continue ReAct Command Payload V1 接口，共包含 24 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContinueReActCommandPayloadV1 } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointHash` | 属性 | <code>checkpointHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointSequence` | 属性 | <code>checkpointSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionRef` | 属性 | <code>executionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRef` | 属性 | <code>workspaceRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InitialReActQuantumDescriptor`

Initial ReAct Quantum Descriptor 接口，共包含 22 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InitialReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

```text
export interface InitialReActQuantumDescriptor extends ReActQuantumDescriptorBase {
    trigger: 'initial';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionRef` | 属性 | <code>executionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trigger` | 属性 | <code>trigger: "initial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRef` | 属性 | <code>workspaceRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActGlobalBudget`

ReAct Global Budget 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActGlobalBudget } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

```text
export interface ReActGlobalBudget {
    iterations: number;
    modelCalls: number;
    toolCalls: number;
    totalTokens: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `iterations` | 属性 | <code>iterations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActQuantumDescriptorBase`

ReAct Quantum Descriptor Base 接口，共包含 21 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActQuantumDescriptorBase } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilitySnapshotRef` | 属性 | <code>capabilitySnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionRef` | 属性 | <code>executionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `globalBudget` | 属性 | <code>globalBudget: ReActGlobalBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryContextRef` | 属性 | <code>memoryContextRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingOperationReceipts` | 属性 | <code>pendingOperationReceipts?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptSnapshotRef` | 属性 | <code>promptSnapshotRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceRef` | 属性 | <code>workspaceRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContinueReActCommandPayload`

Continue ReAct Command Payload 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ContinueReActCommandPayload } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

```text
export type ContinueReActCommandPayload = ContinueReActCommandPayloadV1;
```

## `ReActQuantumDescriptor`

ReAct Quantum Descriptor 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReActQuantumDescriptor } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/react-continuation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation.ts)

### 声明

```text
export type ReActQuantumDescriptor = InitialReActQuantumDescriptor | ContinuationReActQuantumDescriptor;
```
