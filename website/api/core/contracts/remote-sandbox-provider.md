# `@codesoul-co/hypha-core` / `contracts/remote-sandbox-provider`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/remote-sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/remote-sandbox-provider.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RemoteArtifactChunk` | interface | <code>interface RemoteArtifactChunk</code> | Field contract for Remote Artifact Chunk; see all contract members below. |
| `RemoteArtifactChunkSequenceExpectation` | interface | <code>interface RemoteArtifactChunkSequenceExpectation</code> | Field contract for Remote Artifact Chunk Sequence Expectation; see all contract members below. |
| `RemoteArtifactDownloadRequest` | interface | <code>interface RemoteArtifactDownloadRequest</code> | Field contract for Remote Artifact Download Request; see all contract members below. |
| `RemoteArtifactTransferReceipt` | interface | <code>interface RemoteArtifactTransferReceipt</code> | Field contract for Remote Artifact Transfer Receipt; see all contract members below. |
| `RemoteArtifactUploadRequest` | interface | <code>interface RemoteArtifactUploadRequest</code> | Field contract for Remote Artifact Upload Request; see all contract members below. |
| `RemoteExecutionReconciliationRequest` | interface | <code>interface RemoteExecutionReconciliationRequest</code> | Field contract for Remote Execution Reconciliation Request; see all contract members below. |
| `RemoteExecutionReconciliationResult` | interface | <code>interface RemoteExecutionReconciliationResult</code> | Field contract for Remote Execution Reconciliation Result; see all contract members below. |
| `RemoteOutputStreamRequest` | interface | <code>interface RemoteOutputStreamRequest</code> | Field contract for Remote Output Stream Request; see all contract members below. |
| `RemoteSandboxProvider` | interface | <code>interface RemoteSandboxProvider extends SandboxProvider</code> | Field contract for Remote Sandbox Provider; see all contract members below. |
| `RemoteSandboxProviderCapabilities` | interface | <code>interface RemoteSandboxProviderCapabilities extends SandboxProviderCapabilities</code> | Field contract for Remote Sandbox Provider Capabilities; see all contract members below. |
| `RemoteExecutionReconciliationState` | type | <code>type RemoteExecutionReconciliationState = 'not_found' &#124; 'accepted' &#124; 'running' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'unknown'</code> | Public type alias for Remote Execution Reconciliation State. |

## `RemoteArtifactChunk` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `byteLength` | property | <code>byteLength: number</code> | Public byte Length property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `encoding` | property | <code>encoding: "base64"</code> | Public encoding property. |
| `final` | property | <code>final: boolean</code> | Public final property. |
| `offsetBytes` | property | <code>offsetBytes: number</code> | Public offset Bytes property. |
| `sequence` | property | <code>sequence: number</code> | Public sequence property. |
| `transferId` | property | <code>transferId: string</code> | Public transfer Id property. |

## `RemoteArtifactChunkSequenceExpectation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `transferId` | property | <code>transferId: string</code> | Public transfer Id property. |

## `RemoteArtifactDownloadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `maxBytes` | property | <code>maxBytes: number</code> | Public max Bytes property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |

## `RemoteArtifactTransferReceipt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `direction` | property | <code>direction: "upload" &#124; "download"</code> | Public direction property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `issuedAt` | property | <code>issuedAt: string</code> | Public issued At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerTransferRef` | property | <code>providerTransferRef: string</code> | Public provider Transfer Ref property. |
| `receiptHash` | property | <code>receiptHash: string</code> | Public receipt Hash property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `status` | property | <code>status: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | Public status property. |

## `RemoteArtifactUploadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `expectedSandboxRevision` | property | <code>expectedSandboxRevision: number</code> | Public expected Sandbox Revision property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `mediaType` | property | <code>mediaType: string</code> | Public media Type property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `RemoteExecutionReconciliationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `providerExecutionRef` | property | <code>providerExecutionRef: string</code> | Public provider Execution Ref property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |

## `RemoteExecutionReconciliationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `providerExecutionRef` | property | <code>providerExecutionRef: string</code> | Public provider Execution Ref property. |
| `receipt` | property | <code>receipt: ExecutionReceipt</code> | Public receipt property. |
| `result` | property | <code>result: CommandExecutionResult</code> | Public result property. |
| `sandboxId` | property | <code>sandboxId: string</code> | Public sandbox Id property. |
| `state` | property | <code>state: RemoteExecutionReconciliationState</code> | Public state property. |

## `RemoteOutputStreamRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `correlationId` | property | <code>correlationId: string</code> | Public correlation Id property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `follow` | property | <code>follow: boolean</code> | Public follow property. |
| `fromSequence` | property | <code>fromSequence: number</code> | Public from Sequence property. |
| `maxChunks` | property | <code>maxChunks: number</code> | Public max Chunks property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |

## `RemoteSandboxProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;RemoteSandboxProviderCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `cleanup` | method | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public runtime operation for cleanup. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `create` | method | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Creates create at this module boundary. |
| `downloadArtifact` | method | <code>downloadArtifact(request: RemoteArtifactDownloadRequest): AsyncIterable&lt;RemoteArtifactChunk&gt;</code> | Public runtime operation for download Artifact. |
| `execute` | method | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `reconcileExecution` | method | <code>reconcileExecution(request: RemoteExecutionReconciliationRequest): Promise&lt;RemoteExecutionReconciliationResult&gt;</code> | Public runtime operation for reconcile Execution. |
| `start` | method | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public runtime operation for status. |
| `streamOutput` | method | <code>streamOutput(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | Public runtime operation for stream Output. |
| `terminate` | method | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public runtime operation for terminate. |
| `uploadArtifact` | method | <code>uploadArtifact(request: RemoteArtifactUploadRequest, chunks: AsyncIterable&lt;RemoteArtifactChunk&gt;): Promise&lt;RemoteArtifactTransferReceipt&gt;</code> | Public runtime operation for upload Artifact. |

## `RemoteSandboxProviderCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancellation` | property | <code>cancellation: boolean</code> | Public cancellation property. |
| `cpuLimits` | property | <code>cpuLimits: boolean</code> | Public cpu Limits property. |
| `diskLimits` | property | <code>diskLimits: boolean</code> | Public disk Limits property. |
| `filesystemIsolation` | property | <code>filesystemIsolation: boolean</code> | Public filesystem Isolation property. |
| `imageDigestPinning` | property | <code>imageDigestPinning: boolean</code> | Public image Digest Pinning property. |
| `memoryLimits` | property | <code>memoryLimits: boolean</code> | Public memory Limits property. |
| `networkIsolation` | property | <code>networkIsolation: boolean</code> | Public network Isolation property. |
| `pidsLimit` | property | <code>pidsLimit: boolean</code> | Public pids Limit property. |
| `processIsolation` | property | <code>processIsolation: boolean</code> | Public process Isolation property. |
| `processTreeKill` | property | <code>processTreeKill: boolean</code> | Public process Tree Kill property. |
| `remoteExecution` | property | <code>remoteExecution: true</code> | Public remote Execution property. |
| `snapshots` | property | <code>snapshots: boolean</code> | Public snapshots property. |
