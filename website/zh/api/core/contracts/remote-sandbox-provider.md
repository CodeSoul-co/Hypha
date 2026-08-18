# `@codesoul-co/hypha-core` / `contracts/remote-sandbox-provider`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/remote-sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)
- 导出数: **11**

## 模块用法

用于声明并运行时校验契约。Remote sandbox provider 模块公开 10 接口、1 类型。

### 从包入口导入

```ts
import type {
  RemoteArtifactChunk,
  RemoteArtifactChunkSequenceExpectation,
  RemoteArtifactDownloadRequest,
  RemoteArtifactTransferReceipt,
  RemoteArtifactUploadRequest,
  RemoteExecutionReconciliationRequest,
  RemoteExecutionReconciliationResult,
  RemoteOutputStreamRequest,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 11 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RemoteArtifactChunk` | 接口 | <code>interface RemoteArtifactChunk</code> | Remote Artifact Chunk 接口，共包含 9 个公开字段或方法。 |
| `RemoteArtifactChunkSequenceExpectation` | 接口 | <code>interface RemoteArtifactChunkSequenceExpectation</code> | Remote Artifact Chunk Sequence Expectation 接口，共包含 3 个公开字段或方法。 |
| `RemoteArtifactDownloadRequest` | 接口 | <code>interface RemoteArtifactDownloadRequest</code> | Remote Artifact Download Request 接口，共包含 9 个公开字段或方法。 |
| `RemoteArtifactTransferReceipt` | 接口 | <code>interface RemoteArtifactTransferReceipt</code> | Remote Artifact Transfer Receipt 接口，共包含 12 个公开字段或方法。 |
| `RemoteArtifactUploadRequest` | 接口 | <code>interface RemoteArtifactUploadRequest</code> | Remote Artifact Upload Request 接口，共包含 12 个公开字段或方法。 |
| `RemoteExecutionReconciliationRequest` | 接口 | <code>interface RemoteExecutionReconciliationRequest</code> | Remote Execution Reconciliation Request 接口，共包含 8 个公开字段或方法。 |
| `RemoteExecutionReconciliationResult` | 接口 | <code>interface RemoteExecutionReconciliationResult</code> | Remote Execution Reconciliation Result 接口，共包含 8 个公开字段或方法。 |
| `RemoteOutputStreamRequest` | 接口 | <code>interface RemoteOutputStreamRequest</code> | Remote Output Stream Request 接口，共包含 8 个公开字段或方法。 |
| `RemoteSandboxProvider` | 接口 | <code>interface RemoteSandboxProvider extends SandboxProvider</code> | Remote Sandbox Provider 接口，共包含 15 个公开字段或方法。 |
| `RemoteSandboxProviderCapabilities` | 接口 | <code>interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities</code> | Remote Sandbox Provider Capabilities 接口，共包含 12 个公开字段或方法。 |
| `RemoteExecutionReconciliationState` | 类型 | <code>type RemoteExecutionReconciliationState = 'not_found' &#124; 'accepted' &#124; 'running' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'unknown'</code> | Remote Execution Reconciliation State 公共类型别名；完整类型表达式见声明。 |

## `RemoteArtifactChunk`

Remote Artifact Chunk 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteArtifactChunk } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteArtifactChunk {
    transferId: string;
    artifactRef: string;
    sequence: number;
    offsetBytes: number;
    encoding: 'base64';
    content: string;
    byteLength: number;
    contentHash: string;
    final: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `byteLength` | 属性 | <code>byteLength: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `encoding` | 属性 | <code>encoding: "base64"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `final` | 属性 | <code>final: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `offsetBytes` | 属性 | <code>offsetBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sequence` | 属性 | <code>sequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transferId` | 属性 | <code>transferId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteArtifactChunkSequenceExpectation`

Remote Artifact Chunk Sequence Expectation 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteArtifactChunkSequenceExpectation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteArtifactChunkSequenceExpectation {
    transferId: string;
    artifactRef: string;
    sizeBytes: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transferId` | 属性 | <code>transferId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteArtifactDownloadRequest`

Remote Artifact Download Request 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteArtifactDownloadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteArtifactDownloadRequest {
    operationId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    artifactRef: string;
    maxBytes: number;
    expectedContentHash?: string;
    correlationId?: string;
    causationId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteArtifactTransferReceipt`

Remote Artifact Transfer Receipt 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteArtifactTransferReceipt } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteArtifactTransferReceipt {
    id: string;
    providerId: string;
    sandboxId: string;
    artifactRef: string;
    direction: 'upload' | 'download';
    status: 'accepted' | 'completed' | 'rejected' | 'unknown';
    sizeBytes: number;
    contentHash?: string;
    providerTransferRef?: string;
    issuedAt: string;
    receiptHash: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `direction` | 属性 | <code>direction: "upload" &#124; "download"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issuedAt` | 属性 | <code>issuedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerTransferRef` | 属性 | <code>providerTransferRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptHash` | 属性 | <code>receiptHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteArtifactUploadRequest`

Remote Artifact Upload Request 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteArtifactUploadRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteArtifactUploadRequest {
    operationId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    expectedSandboxRevision: number;
    artifactRef: string;
    sizeBytes: number;
    contentHash: string;
    mediaType?: string;
    idempotencyKey: string;
    correlationId?: string;
    causationId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedSandboxRevision` | 属性 | <code>expectedSandboxRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mediaType` | 属性 | <code>mediaType?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteExecutionReconciliationRequest`

Remote Execution Reconciliation Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteExecutionReconciliationRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteExecutionReconciliationRequest {
    operationId: string;
    executionId: string;
    sandboxId: string;
    principal: ExecutionPrincipal;
    providerExecutionRef?: string;
    idempotencyKey?: string;
    correlationId?: string;
    causationId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteExecutionReconciliationResult`

Remote Execution Reconciliation Result 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteExecutionReconciliationResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteExecutionReconciliationResult {
    executionId: string;
    sandboxId: string;
    state: RemoteExecutionReconciliationState;
    providerExecutionRef?: string;
    observedAt: string;
    result?: CommandExecutionResult;
    receipt?: ExecutionReceipt;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receipt` | 属性 | <code>receipt?: ExecutionReceipt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `result` | 属性 | <code>result?: CommandExecutionResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state: RemoteExecutionReconciliationState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteOutputStreamRequest`

Remote Output Stream Request 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteOutputStreamRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteOutputStreamRequest {
    operationId: string;
    executionId: string;
    principal: ExecutionPrincipal;
    fromSequence?: number;
    maxChunks?: number;
    follow?: boolean;
    correlationId?: string;
    causationId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `correlationId` | 属性 | <code>correlationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `follow` | 属性 | <code>follow?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fromSequence` | 属性 | <code>fromSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxChunks` | 属性 | <code>maxChunks?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteSandboxProvider`

Remote Sandbox Provider 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteSandboxProvider } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteSandboxProvider extends SandboxProvider {
    capabilities(): Promise<RemoteSandboxProviderCapabilities>;
    reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise<RemoteExecutionReconciliationResult>;
    streamOutput(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
    uploadArtifact(request: RemoteArtifactUploadRequest, chunks: AsyncIterable<RemoteArtifactChunk>): Promise<RemoteArtifactTransferReceipt>;
    downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable<RemoteArtifactChunk>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;RemoteSandboxProviderCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `cleanup` | 方法 | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `create` | 方法 | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `downloadArtifact` | 方法 | <code>downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable&lt;RemoteArtifactChunk&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconcileExecution` | 方法 | <code>reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise&lt;RemoteExecutionReconciliationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `streamOutput` | 方法 | <code>streamOutput(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `terminate` | 方法 | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `uploadArtifact` | 方法 | <code>uploadArtifact(request: RemoteArtifactUploadRequest, chunks: AsyncIterable&lt;RemoteArtifactChunk&gt;): Promise&lt;RemoteArtifactTransferReceipt&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RemoteSandboxProviderCapabilities`

Remote Sandbox Provider Capabilities 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RemoteSandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities {
    remoteExecution: true;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cpuLimits` | 属性 | <code>cpuLimits: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `diskLimits` | 属性 | <code>diskLimits: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `filesystemIsolation` | 属性 | <code>filesystemIsolation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imageDigestPinning` | 属性 | <code>imageDigestPinning: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryLimits` | 属性 | <code>memoryLimits: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkIsolation` | 属性 | <code>networkIsolation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pidsLimit` | 属性 | <code>pidsLimit: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processIsolation` | 属性 | <code>processIsolation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processTreeKill` | 属性 | <code>processTreeKill: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `remoteExecution` | 属性 | <code>remoteExecution: true</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshots` | 属性 | <code>snapshots: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RemoteExecutionReconciliationState`

Remote Execution Reconciliation State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RemoteExecutionReconciliationState } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### 声明

```text
export type RemoteExecutionReconciliationState = 'not_found' | 'accepted' | 'running' | 'completed' | 'failed' | 'cancelled' | 'unknown';
```
