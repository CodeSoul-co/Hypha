# `@codesoul-co/hypha-core` / `contracts/remote-sandbox-provider`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/remote-sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RemoteArtifactChunk` | 接口 | <code>interface RemoteArtifactChunk</code> | Remote Artifact Chunk 的字段契约；完整字段见下表。 |
| `RemoteArtifactChunkSequenceExpectation` | 接口 | <code>interface RemoteArtifactChunkSequenceExpectation</code> | Remote Artifact Chunk Sequence Expectation 的字段契约；完整字段见下表。 |
| `RemoteArtifactDownloadRequest` | 接口 | <code>interface RemoteArtifactDownloadRequest</code> | Remote Artifact Download Request 的字段契约；完整字段见下表。 |
| `RemoteArtifactTransferReceipt` | 接口 | <code>interface RemoteArtifactTransferReceipt</code> | Remote Artifact Transfer Receipt 的字段契约；完整字段见下表。 |
| `RemoteArtifactUploadRequest` | 接口 | <code>interface RemoteArtifactUploadRequest</code> | Remote Artifact Upload Request 的字段契约；完整字段见下表。 |
| `RemoteExecutionReconciliationRequest` | 接口 | <code>interface RemoteExecutionReconciliationRequest</code> | Remote Execution Reconciliation Request 的字段契约；完整字段见下表。 |
| `RemoteExecutionReconciliationResult` | 接口 | <code>interface RemoteExecutionReconciliationResult</code> | Remote Execution Reconciliation Result 的字段契约；完整字段见下表。 |
| `RemoteOutputStreamRequest` | 接口 | <code>interface RemoteOutputStreamRequest</code> | Remote Output Stream Request 的字段契约；完整字段见下表。 |
| `RemoteSandboxProvider` | 接口 | <code>interface RemoteSandboxProvider extends SandboxProvider</code> | Remote Sandbox Provider 的字段契约；完整字段见下表。 |
| `RemoteSandboxProviderCapabilities` | 接口 | <code>interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities</code> | Remote Sandbox Provider Capabilities 的字段契约；完整字段见下表。 |
| `RemoteExecutionReconciliationState` | 类型 | <code>type RemoteExecutionReconciliationState = 'not_found' &#124; 'accepted' &#124; 'running' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'unknown'</code> | Remote Execution Reconciliation State 的公共类型别名。 |

## `RemoteArtifactChunk` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `byteLength` | 属性 | <code>byteLength: number</code> | byte Length 字段。 |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `encoding` | 属性 | <code>encoding: "base64"</code> | encoding 字段。 |
| `final` | 属性 | <code>final: boolean</code> | final 字段。 |
| `offsetBytes` | 属性 | <code>offsetBytes: number</code> | offset Bytes 字段。 |
| `sequence` | 属性 | <code>sequence: number</code> | sequence 字段。 |
| `transferId` | 属性 | <code>transferId: string</code> | transfer Id 字段。 |

## `RemoteArtifactChunkSequenceExpectation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `transferId` | 属性 | <code>transferId: string</code> | transfer Id 字段。 |

## `RemoteArtifactDownloadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `expectedContentHash` | 属性 | <code>expectedContentHash: string</code> | expected Content Hash 字段。 |
| `maxBytes` | 属性 | <code>maxBytes: number</code> | max Bytes 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |

## `RemoteArtifactTransferReceipt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `direction` | 属性 | <code>direction: "upload" &#124; "download"</code> | direction 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `issuedAt` | 属性 | <code>issuedAt: string</code> | issued At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerTransferRef` | 属性 | <code>providerTransferRef: string</code> | provider Transfer Ref 字段。 |
| `receiptHash` | 属性 | <code>receiptHash: string</code> | receipt Hash 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
| `status` | 属性 | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | status 字段。 |

## `RemoteArtifactUploadRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `expectedSandboxRevision` | 属性 | <code>expectedSandboxRevision: number</code> | expected Sandbox Revision 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `mediaType` | 属性 | <code>mediaType: string</code> | media Type 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `RemoteExecutionReconciliationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef: string</code> | provider Execution Ref 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |

## `RemoteExecutionReconciliationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `providerExecutionRef` | 属性 | <code>providerExecutionRef: string</code> | provider Execution Ref 字段。 |
| `receipt` | 属性 | <code>receipt: ExecutionReceipt</code> | receipt 字段。 |
| `result` | 属性 | <code>result: CommandExecutionResult</code> | result 字段。 |
| `sandboxId` | 属性 | <code>sandboxId: string</code> | sandbox Id 字段。 |
| `state` | 属性 | <code>state: RemoteExecutionReconciliationState</code> | state 字段。 |

## `RemoteOutputStreamRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `correlationId` | 属性 | <code>correlationId: string</code> | correlation Id 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `follow` | 属性 | <code>follow: boolean</code> | follow 字段。 |
| `fromSequence` | 属性 | <code>fromSequence: number</code> | from Sequence 字段。 |
| `maxChunks` | 属性 | <code>maxChunks: number</code> | max Chunks 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |

## `RemoteSandboxProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;RemoteSandboxProviderCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `cleanup` | 方法 | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | cleanup 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `create` | 方法 | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 创建 create。 |
| `downloadArtifact` | 方法 | <code>downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable&lt;RemoteArtifactChunk&gt;</code> | download Artifact 的公开运行时操作。 |
| `execute` | 方法 | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `reconcileExecution` | 方法 | <code>reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise&lt;RemoteExecutionReconciliationResult&gt;</code> | reconcile Execution 的公开运行时操作。 |
| `start` | 方法 | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | status 的公开运行时操作。 |
| `streamOutput` | 方法 | <code>streamOutput(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | stream Output 的公开运行时操作。 |
| `terminate` | 方法 | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | terminate 的公开运行时操作。 |
| `uploadArtifact` | 方法 | <code>uploadArtifact(request: RemoteArtifactUploadRequest, chunks: AsyncIterable&lt;RemoteArtifactChunk&gt;): Promise&lt;RemoteArtifactTransferReceipt&gt;</code> | upload Artifact 的公开运行时操作。 |

## `RemoteSandboxProviderCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancellation` | 属性 | <code>cancellation: boolean</code> | cancellation 字段。 |
| `cpuLimits` | 属性 | <code>cpuLimits: boolean</code> | cpu Limits 字段。 |
| `diskLimits` | 属性 | <code>diskLimits: boolean</code> | disk Limits 字段。 |
| `filesystemIsolation` | 属性 | <code>filesystemIsolation: boolean</code> | filesystem Isolation 字段。 |
| `imageDigestPinning` | 属性 | <code>imageDigestPinning: boolean</code> | image Digest Pinning 字段。 |
| `memoryLimits` | 属性 | <code>memoryLimits: boolean</code> | memory Limits 字段。 |
| `networkIsolation` | 属性 | <code>networkIsolation: boolean</code> | network Isolation 字段。 |
| `pidsLimit` | 属性 | <code>pidsLimit: boolean</code> | pids Limit 字段。 |
| `processIsolation` | 属性 | <code>processIsolation: boolean</code> | process Isolation 字段。 |
| `processTreeKill` | 属性 | <code>processTreeKill: boolean</code> | process Tree Kill 字段。 |
| `remoteExecution` | 属性 | <code>remoteExecution: true</code> | remote Execution 字段。 |
| `snapshots` | 属性 | <code>snapshots: boolean</code> | snapshots 字段。 |
