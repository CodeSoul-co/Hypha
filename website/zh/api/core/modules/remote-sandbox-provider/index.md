# `@codesoul-co/hypha-core` / `modules/remote-sandbox-provider/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/remote-sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/remote-sandbox-provider/index.ts)
- 导出数: **39**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RemoteArtifactChunkSequenceValidator` | 类 | <code>new RemoteArtifactChunkSequenceValidator(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | Validates a remote Artifact transfer incrementally without retaining chunk content. |
| `remoteArtifactChunkExample` | 常量 | <code>const remoteArtifactChunkExample: RemoteArtifactChunk</code> | remote Artifact Chunk 的有效示例值。 |
| `remoteArtifactChunkJsonSchema` | 常量 | <code>const remoteArtifactChunkJsonSchema: JsonSchema</code> | remote Artifact Chunk 的 JSON Schema。 |
| `remoteArtifactChunkSchema` | 常量 | <code>const remoteArtifactChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sequence: z.ZodNumber; offsetBytes: z.ZodNumber; encoding: z.ZodLiteral&lt;"base64"&gt;; content: z.ZodEffects&lt;z.ZodString, string, string&gt;; byteLength: z.ZodNumber; contentHash: z.ZodString; final: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentHash: string; final: boolean; sequence: number; content: string...</code> | remote Artifact Chunk 的运行时 Schema。 |
| `remoteArtifactChunkSequenceExpectationExample` | 常量 | <code>const remoteArtifactChunkSequenceExpectationExample: RemoteArtifactChunkSequenceExpectation</code> | remote Artifact Chunk Sequence Expectation 的有效示例值。 |
| `remoteArtifactChunkSequenceExpectationJsonSchema` | 常量 | <code>const remoteArtifactChunkSequenceExpectationJsonSchema: JsonSchema</code> | remote Artifact Chunk Sequence Expectation 的 JSON Schema。 |
| `remoteArtifactChunkSequenceExpectationSchema` | 常量 | <code>const remoteArtifactChunkSequenceExpectationSchema: z.ZodObject&lt;{ transferId: z.ZodString; artifactRef: z.ZodString; sizeBytes: z.ZodNumber; }, "strict", z.ZodTypeAny, { sizeBytes: number; artifactRef: string; transferId: string; }, { sizeBytes: number; artifactRef: string; transferId: string; }&gt;</code> | remote Artifact Chunk Sequence Expectation 的运行时 Schema。 |
| `remoteArtifactDownloadRequestExample` | 常量 | <code>const remoteArtifactDownloadRequestExample: RemoteArtifactDownloadRequest</code> | remote Artifact Download Request 的有效示例值。 |
| `remoteArtifactDownloadRequestJsonSchema` | 常量 | <code>const remoteArtifactDownloadRequestJsonSchema: JsonSchema</code> | remote Artifact Download Request 的 JSON Schema。 |
| `remoteArtifactDownloadRequestSchema` | 常量 | <code>const remoteArtifactDownloadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodSt...</code> | remote Artifact Download Request 的运行时 Schema。 |
| `remoteArtifactTransferReceiptExample` | 常量 | <code>const remoteArtifactTransferReceiptExample: RemoteArtifactTransferReceipt</code> | remote Artifact Transfer Receipt 的有效示例值。 |
| `remoteArtifactTransferReceiptJsonSchema` | 常量 | <code>const remoteArtifactTransferReceiptJsonSchema: JsonSchema</code> | remote Artifact Transfer Receipt 的 JSON Schema。 |
| `remoteArtifactTransferReceiptSchema` | 常量 | <code>const remoteArtifactTransferReceiptSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; sandboxId: z.ZodString; artifactRef: z.ZodString; direction: z.ZodEnum&lt;["upload", "download"]&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; sizeBytes: z.ZodNumber; contentHash: z.ZodOptional&lt;z.ZodString&gt;; providerTransferRef: z.ZodOptional&lt;z.ZodString&gt;; issuedAt: z.ZodString; rec...</code> | remote Artifact Transfer Receipt 的运行时 Schema。 |
| `remoteArtifactUploadRequestExample` | 常量 | <code>const remoteArtifactUploadRequestExample: RemoteArtifactUploadRequest</code> | remote Artifact Upload Request 的有效示例值。 |
| `remoteArtifactUploadRequestJsonSchema` | 常量 | <code>const remoteArtifactUploadRequestJsonSchema: JsonSchema</code> | remote Artifact Upload Request 的 JSON Schema。 |
| `remoteArtifactUploadRequestSchema` | 常量 | <code>const remoteArtifactUploadRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | remote Artifact Upload Request 的运行时 Schema。 |
| `remoteExecutionReconciliationRequestExample` | 常量 | <code>const remoteExecutionReconciliationRequestExample: RemoteExecutionReconciliationRequest</code> | remote Execution Reconciliation Request 的有效示例值。 |
| `remoteExecutionReconciliationRequestJsonSchema` | 常量 | <code>const remoteExecutionReconciliationRequestJsonSchema: JsonSchema</code> | remote Execution Reconciliation Request 的 JSON Schema。 |
| `remoteExecutionReconciliationRequestSchema` | 常量 | <code>const remoteExecutionReconciliationRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; sandboxId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, ...</code> | remote Execution Reconciliation Request 的运行时 Schema。 |
| `remoteExecutionReconciliationResultExample` | 常量 | <code>const remoteExecutionReconciliationResultExample: RemoteExecutionReconciliationResult</code> | remote Execution Reconciliation Result 的有效示例值。 |
| `remoteExecutionReconciliationResultJsonSchema` | 常量 | <code>const remoteExecutionReconciliationResultJsonSchema: JsonSchema</code> | remote Execution Reconciliation Result 的 JSON Schema。 |
| `remoteExecutionReconciliationResultSchema` | 常量 | <code>const remoteExecutionReconciliationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sandboxId: z.ZodString; state: z.ZodEnum&lt;["not_found", "accepted", "running", "completed", "failed", "cancelled", "unknown"]&gt;; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; observedAt: z.ZodString; result: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.Zo...</code> | remote Execution Reconciliation Result 的运行时 Schema。 |
| `remoteOutputStreamRequestExample` | 常量 | <code>const remoteOutputStreamRequestExample: RemoteOutputStreamRequest</code> | remote Output Stream Request 的有效示例值。 |
| `remoteOutputStreamRequestJsonSchema` | 常量 | <code>const remoteOutputStreamRequestJsonSchema: JsonSchema</code> | remote Output Stream Request 的 JSON Schema。 |
| `remoteOutputStreamRequestSchema` | 常量 | <code>const remoteOutputStreamRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | remote Output Stream Request 的运行时 Schema。 |
| `remoteSandboxProviderCapabilitiesExample` | 常量 | <code>const remoteSandboxProviderCapabilitiesExample: RemoteSandboxProviderCapabilities</code> | remote Sandbox Provider Capabilities 的有效示例值。 |
| `remoteSandboxProviderCapabilitiesJsonSchema` | 常量 | <code>const remoteSandboxProviderCapabilitiesJsonSchema: JsonSchema</code> | remote Sandbox Provider Capabilities 的 JSON Schema。 |
| `remoteSandboxProviderCapabilitiesSchema` | 常量 | <code>const remoteSandboxProviderCapabilitiesSchema: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPinning: z.ZodBoolean; } &amp; { remoteExecution: z.ZodLiteral...</code> | remote Sandbox Provider Capabilities 的运行时 Schema。 |
| `remoteSandboxProviderContractJsonSchemas` | 常量 | <code>const remoteSandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/remote-sandbox-provider/index` 模块导出的 remote Sandbox Provider Contract Json Schemas 常量。 |
| `validateRemoteArtifactChunk` | 函数 | <code>validateRemoteArtifactChunk(input: unknown): RemoteArtifactChunk</code> | 校验 Remote Artifact Chunk。 |
| `validateRemoteArtifactChunkSequence` | 函数 | <code>validateRemoteArtifactChunkSequence(input: readonly unknown[], expectationInput: unknown): RemoteArtifactChunk[]</code> | 校验 Remote Artifact Chunk Sequence。 |
| `validateRemoteArtifactDownloadRequest` | 函数 | <code>validateRemoteArtifactDownloadRequest(input: unknown): RemoteArtifactDownloadRequest</code> | 校验 Remote Artifact Download Request。 |
| `validateRemoteArtifactTransferReceipt` | 函数 | <code>validateRemoteArtifactTransferReceipt(input: unknown): RemoteArtifactTransferReceipt</code> | 校验 Remote Artifact Transfer Receipt。 |
| `validateRemoteArtifactUploadRequest` | 函数 | <code>validateRemoteArtifactUploadRequest(input: unknown): RemoteArtifactUploadRequest</code> | 校验 Remote Artifact Upload Request。 |
| `validateRemoteExecutionReconciliationRequest` | 函数 | <code>validateRemoteExecutionReconciliationRequest(input: unknown): RemoteExecutionReconciliationRequest</code> | 校验 Remote Execution Reconciliation Request。 |
| `validateRemoteExecutionReconciliationResult` | 函数 | <code>validateRemoteExecutionReconciliationResult(input: unknown): RemoteExecutionReconciliationResult</code> | 校验 Remote Execution Reconciliation Result。 |
| `validateRemoteOutputStreamRequest` | 函数 | <code>validateRemoteOutputStreamRequest(input: unknown): RemoteOutputStreamRequest</code> | 校验 Remote Output Stream Request。 |
| `validateRemoteSandboxProviderCapabilities` | 函数 | <code>validateRemoteSandboxProviderCapabilities(input: unknown): RemoteSandboxProviderCapabilities</code> | 校验 Remote Sandbox Provider Capabilities。 |
| `RemoteArtifactChunkSequenceProgress` | 接口 | <code>interface RemoteArtifactChunkSequenceProgress</code> | Remote Artifact Chunk Sequence Progress 的字段契约；完整字段见下表。 |

## `RemoteArtifactChunkSequenceValidator` 公开成员

Validates a remote Artifact transfer incrementally without retaining chunk content.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(expectationInput: unknown): RemoteArtifactChunkSequenceValidator</code> | 创建该类的实例。 |
| `finish` | 方法 | <code>finish(): RemoteArtifactChunkSequenceProgress</code> | finish 的公开运行时操作。 |
| `progress` | 方法 | <code>progress(): RemoteArtifactChunkSequenceProgress</code> | progress 的公开运行时操作。 |
| `push` | 方法 | <code>push(input: unknown): RemoteArtifactChunk</code> | push 的公开运行时操作。 |

## `RemoteArtifactChunkSequenceProgress` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bytesValidated` | 属性 | <code>bytesValidated: number</code> | bytes Validated 字段。 |
| `chunksValidated` | 属性 | <code>chunksValidated: number</code> | chunks Validated 字段。 |
| `completed` | 属性 | <code>completed: boolean</code> | completed 字段。 |
