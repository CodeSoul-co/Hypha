# `@codesoul-co/hypha-core` / `contracts/remote-sandbox-provider`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/remote-sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)
- Exports: **11**

## Using this module

Use the Remote sandbox provider module for declaring and runtime-validating contracts. It exports 10 interfaces, 1 type.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RemoteArtifactChunk` | interface | <code>interface RemoteArtifactChunk</code> | Remote Artifact Chunk interface with 9 public fields or methods. |
| `RemoteArtifactChunkSequenceExpectation` | interface | <code>interface RemoteArtifactChunkSequenceExpectation</code> | Remote Artifact Chunk Sequence Expectation interface with 3 public fields or methods. |
| `RemoteArtifactDownloadRequest` | interface | <code>interface RemoteArtifactDownloadRequest</code> | Remote Artifact Download Request interface with 9 public fields or methods. |
| `RemoteArtifactTransferReceipt` | interface | <code>interface RemoteArtifactTransferReceipt</code> | Remote Artifact Transfer Receipt interface with 12 public fields or methods. |
| `RemoteArtifactUploadRequest` | interface | <code>interface RemoteArtifactUploadRequest</code> | Remote Artifact Upload Request interface with 12 public fields or methods. |
| `RemoteExecutionReconciliationRequest` | interface | <code>interface RemoteExecutionReconciliationRequest</code> | Remote Execution Reconciliation Request interface with 8 public fields or methods. |
| `RemoteExecutionReconciliationResult` | interface | <code>interface RemoteExecutionReconciliationResult</code> | Remote Execution Reconciliation Result interface with 8 public fields or methods. |
| `RemoteOutputStreamRequest` | interface | <code>interface RemoteOutputStreamRequest</code> | Remote Output Stream Request interface with 8 public fields or methods. |
| `RemoteSandboxProvider` | interface | <code>interface RemoteSandboxProvider extends SandboxProvider</code> | Remote Sandbox Provider interface with 15 public fields or methods. |
| `RemoteSandboxProviderCapabilities` | interface | <code>interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities</code> | Remote Sandbox Provider Capabilities interface with 12 public fields or methods. |
| `RemoteExecutionReconciliationState` | type | <code>type RemoteExecutionReconciliationState = 'not_found' &#124; 'accepted' &#124; 'running' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'unknown'</code> | Public type alias for Remote Execution Reconciliation State; the declaration contains its complete type expression. |

## `RemoteArtifactChunk`

Remote Artifact Chunk interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RemoteArtifactChunk } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `byteLength` | property | <code>byteLength: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encoding` | property | <code>encoding: "base64"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `final` | property | <code>final: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `offsetBytes` | property | <code>offsetBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transferId` | property | <code>transferId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteArtifactChunkSequenceExpectation`

Remote Artifact Chunk Sequence Expectation interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RemoteArtifactChunkSequenceExpectation } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

```text
export interface RemoteArtifactChunkSequenceExpectation {
    transferId: string;
    artifactRef: string;
    sizeBytes: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transferId` | property | <code>transferId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteArtifactDownloadRequest`

Remote Artifact Download Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RemoteArtifactDownloadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBytes` | property | <code>maxBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteArtifactTransferReceipt`

Remote Artifact Transfer Receipt interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RemoteArtifactTransferReceipt } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `direction` | property | <code>direction: "upload" &#124; "download"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issuedAt` | property | <code>issuedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerTransferRef` | property | <code>providerTransferRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptHash` | property | <code>receiptHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteArtifactUploadRequest`

Remote Artifact Upload Request interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RemoteArtifactUploadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSandboxRevision` | property | <code>expectedSandboxRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mediaType` | property | <code>mediaType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteExecutionReconciliationRequest`

Remote Execution Reconciliation Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RemoteExecutionReconciliationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerExecutionRef` | property | <code>providerExecutionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteExecutionReconciliationResult`

Remote Execution Reconciliation Result interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RemoteExecutionReconciliationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerExecutionRef` | property | <code>providerExecutionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receipt` | property | <code>receipt?: ExecutionReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `result` | property | <code>result?: CommandExecutionResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: RemoteExecutionReconciliationState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteOutputStreamRequest`

Remote Output Stream Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RemoteOutputStreamRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `follow` | property | <code>follow?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fromSequence` | property | <code>fromSequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxChunks` | property | <code>maxChunks?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteSandboxProvider`

Remote Sandbox Provider interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { RemoteSandboxProvider } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

```text
export interface RemoteSandboxProvider extends SandboxProvider {
    capabilities(): Promise<RemoteSandboxProviderCapabilities>;
    reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise<RemoteExecutionReconciliationResult>;
    streamOutput(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
    uploadArtifact(request: RemoteArtifactUploadRequest, chunks: AsyncIterable<RemoteArtifactChunk>): Promise<RemoteArtifactTransferReceipt>;
    downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable<RemoteArtifactChunk>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;RemoteSandboxProviderCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cleanup` | method | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `create` | method | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `downloadArtifact` | method | <code>downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable&lt;RemoteArtifactChunk&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconcileExecution` | method | <code>reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise&lt;RemoteExecutionReconciliationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `streamOutput` | method | <code>streamOutput(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `terminate` | method | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `uploadArtifact` | method | <code>uploadArtifact(request: RemoteArtifactUploadRequest, chunks: AsyncIterable&lt;RemoteArtifactChunk&gt;): Promise&lt;RemoteArtifactTransferReceipt&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RemoteSandboxProviderCapabilities`

Remote Sandbox Provider Capabilities interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RemoteSandboxProviderCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

```text
export interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities {
    remoteExecution: true;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cpuLimits` | property | <code>cpuLimits: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `diskLimits` | property | <code>diskLimits: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filesystemIsolation` | property | <code>filesystemIsolation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imageDigestPinning` | property | <code>imageDigestPinning: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryLimits` | property | <code>memoryLimits: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkIsolation` | property | <code>networkIsolation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pidsLimit` | property | <code>pidsLimit: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processIsolation` | property | <code>processIsolation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processTreeKill` | property | <code>processTreeKill: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `remoteExecution` | property | <code>remoteExecution: true</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshots` | property | <code>snapshots: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RemoteExecutionReconciliationState`

Public type alias for Remote Execution Reconciliation State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RemoteExecutionReconciliationState } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/remote-sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)

### Declaration

```text
export type RemoteExecutionReconciliationState = 'not_found' | 'accepted' | 'running' | 'completed' | 'failed' | 'cancelled' | 'unknown';
```
