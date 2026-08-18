# `@codesoul-co/hypha-core` / `modules/remote-sandbox-provider/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/remote-sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)
- Exports: **39**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RemoteArtifactChunkSequenceValidator` | class | <code>new RemoteArtifactChunkSequenceValidator(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | Validates a remote Artifact transfer incrementally without retaining chunk content. |
| `remoteArtifactChunkExample` | constant | <code>const remoteArtifactChunkExample: RemoteArtifactChunk</code> | Valid example value for remote Artifact Chunk. |
| `remoteArtifactChunkJsonSchema` | constant | <code>const remoteArtifactChunkJsonSchema: JsonSchema</code> | JSON Schema for remote Artifact Chunk. |
| `remoteArtifactChunkSchema` | constant | <code>const remoteArtifactChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sequence: z.ZodNumber; offsetBytes: z.ZodNumber; encoding: z.ZodLiteral&lt;"base64"&gt;; content: z.ZodEffects&lt;z.ZodString, string, string&gt;; byteLength: z.ZodNumber; contentHash: z.ZodString; final: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentHash: string; final: boolean; sequence: number; content: string...</code> | Runtime schema for remote Artifact Chunk. |
| `remoteArtifactChunkSequenceExpectationExample` | constant | <code>const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation</code> | Valid example value for remote Artifact Chunk Sequence Expectation. |
| `remoteArtifactChunkSequenceExpectationJsonSchema` | constant | <code>const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema</code> | JSON Schema for remote Artifact Chunk Sequence Expectation. |
| `remoteArtifactChunkSequenceExpectationSchema` | constant | <code>const remoteArtifactChunkSequenceExpectationSchema: z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; }, "strict", z.ZodTypeAny, { sizeBytes: number; artifactRef: string; transferId: string; }, { sizeBytes: number; artifactRef: string; transferId: string; }&gt;</code> | Runtime schema for remote Artifact Chunk Sequence Expectation. |
| `remoteArtifactDownloadRequestExample` | constant | <code>const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest</code> | Valid example value for remote Artifact Download Request. |
| `remoteArtifactDownloadRequestJsonSchema` | constant | <code>const remoteArtifactDownloadRequestJsonSchema: JsonSchema</code> | JSON Schema for remote Artifact Download Request. |
| `remoteArtifactDownloadRequestSchema` | constant | <code>const remoteArtifactDownloadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodSt...</code> | Runtime schema for remote Artifact Download Request. |
| `remoteArtifactTransferReceiptExample` | constant | <code>const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt</code> | Valid example value for remote Artifact Transfer Receipt. |
| `remoteArtifactTransferReceiptJsonSchema` | constant | <code>const remoteArtifactTransferReceiptJsonSchema: JsonSchema</code> | JSON Schema for remote Artifact Transfer Receipt. |
| `remoteArtifactTransferReceiptSchema` | constant | <code>const remoteArtifactTransferReceiptSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; sandboxId: z.ZodString; artifactRef: z.ZodString; direction: z.ZodEnum&lt;["upload", "download"]&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; sizeBytes: z.ZodNumber; contentHash: z.ZodOptional&lt;z.ZodString&gt;; providerTransferRef: z.ZodOptional&lt;z.ZodString&gt;; issuedAt: z.ZodString; rec...</code> | Runtime schema for remote Artifact Transfer Receipt. |
| `remoteArtifactUploadRequestExample` | constant | <code>const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest</code> | Valid example value for remote Artifact Upload Request. |
| `remoteArtifactUploadRequestJsonSchema` | constant | <code>const remoteArtifactUploadRequestJsonSchema: JsonSchema</code> | JSON Schema for remote Artifact Upload Request. |
| `remoteArtifactUploadRequestSchema` | constant | <code>const remoteArtifactUploadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Runtime schema for remote Artifact Upload Request. |
| `remoteExecutionReconciliationRequestExample` | constant | <code>const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest</code> | Valid example value for remote Execution Reconciliation Request. |
| `remoteExecutionReconciliationRequestJsonSchema` | constant | <code>const remoteExecutionReconciliationRequestJsonSchema: JsonSchema</code> | JSON Schema for remote Execution Reconciliation Request. |
| `remoteExecutionReconciliationRequestSchema` | constant | <code>const remoteExecutionReconciliationRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, ...</code> | Runtime schema for remote Execution Reconciliation Request. |
| `remoteExecutionReconciliationResultExample` | constant | <code>const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult</code> | Valid example value for remote Execution Reconciliation Result. |
| `remoteExecutionReconciliationResultJsonSchema` | constant | <code>const remoteExecutionReconciliationResultJsonSchema: JsonSchema</code> | JSON Schema for remote Execution Reconciliation Result. |
| `remoteExecutionReconciliationResultSchema` | constant | <code>const remoteExecutionReconciliationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sandboxId: z.ZodString; state: z.ZodEnum&lt;["not_found", "accepted", "running", "completed", "failed", "cancelled", "unknown"]&gt;; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; observedAt: z.ZodString; result: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.Zo...</code> | Runtime schema for remote Execution Reconciliation Result. |
| `remoteOutputStreamRequestExample` | constant | <code>const remoteOutputStreamRequestExample: RemoteOutputStreamRequest</code> | Valid example value for remote Output Stream Request. |
| `remoteOutputStreamRequestJsonSchema` | constant | <code>const remoteOutputStreamRequestJsonSchema: JsonSchema</code> | JSON Schema for remote Output Stream Request. |
| `remoteOutputStreamRequestSchema` | constant | <code>const remoteOutputStreamRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | Runtime schema for remote Output Stream Request. |
| `remoteSandboxProviderCapabilitiesExample` | constant | <code>const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities</code> | Valid example value for remote Sandbox Provider Capabilities. |
| `remoteSandboxProviderCapabilitiesJsonSchema` | constant | <code>const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema</code> | JSON Schema for remote Sandbox Provider Capabilities. |
| `remoteSandboxProviderCapabilitiesSchema` | constant | <code>const remoteSandboxProviderCapabilitiesSchema: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; } &amp; { remoteExecution: z.ZodLiteral...</code> | Runtime schema for remote Sandbox Provider Capabilities. |
| `remoteSandboxProviderContractJsonSchemas` | constant | <code>const remoteSandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | remote Sandbox Provider Contract Json Schemas constant exported by the `modules/remote-sandbox-provider/index` module. |
| `validateRemoteArtifactChunk` | function | <code>validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk</code> | Validates Remote Artifact Chunk at this module boundary. |
| `validateRemoteArtifactChunkSequence` | function | <code>validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[]</code> | Validates Remote Artifact Chunk Sequence at this module boundary. |
| `validateRemoteArtifactDownloadRequest` | function | <code>validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest</code> | Validates Remote Artifact Download Request at this module boundary. |
| `validateRemoteArtifactTransferReceipt` | function | <code>validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt</code> | Validates Remote Artifact Transfer Receipt at this module boundary. |
| `validateRemoteArtifactUploadRequest` | function | <code>validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest</code> | Validates Remote Artifact Upload Request at this module boundary. |
| `validateRemoteExecutionReconciliationRequest` | function | <code>validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest</code> | Validates Remote Execution Reconciliation Request at this module boundary. |
| `validateRemoteExecutionReconciliationResult` | function | <code>validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult</code> | Validates Remote Execution Reconciliation Result at this module boundary. |
| `validateRemoteOutputStreamRequest` | function | <code>validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest</code> | Validates Remote Output Stream Request at this module boundary. |
| `validateRemoteSandboxProviderCapabilities` | function | <code>validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities</code> | Validates Remote Sandbox Provider Capabilities at this module boundary. |
| `RemoteArtifactChunkSequenceProgress` | interface | <code>interface RemoteArtifactChunkSequenceProgress</code> | Field contract for Remote Artifact Chunk Sequence Progress; see all contract members below. |

## `RemoteArtifactChunkSequenceValidator` public members

Validates a remote Artifact transfer incrementally without retaining chunk content.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | Creates an instance of this class. |
| `finish` | method | <code>finish(): RemoteArtifactChunkSequenceProgress</code> | Public runtime operation for finish. |
| `progress` | method | <code>progress(): RemoteArtifactChunkSequenceProgress</code> | Public runtime operation for progress. |
| `push` | method | <code>push(input: unknown): RemoteArtifactChunk</code> | Public runtime operation for push. |

## `RemoteArtifactChunkSequenceProgress` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bytesValidated` | property | <code>bytesValidated: number</code> | Public bytes Validated property. |
| `chunksValidated` | property | <code>chunksValidated: number</code> | Public chunks Validated property. |
| `completed` | property | <code>completed: boolean</code> | Public completed property. |
