# `@codesoul-co/hypha-inference` / `types`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)
- Exports: **41**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CompiledPrompt` | interface | <code>interface CompiledPrompt</code> | Field contract for Compiled Prompt; see all contract members below. |
| `InferenceBackend` | interface | <code>interface InferenceBackend</code> | Field contract for Inference Backend; see all contract members below. |
| `InferenceBackendCapabilities` | interface | <code>interface InferenceBackendCapabilities</code> | Field contract for Inference Backend Capabilities; see all contract members below. |
| `InferenceBackendRegistryEntry` | interface | <code>interface InferenceBackendRegistryEntry</code> | Field contract for Inference Backend Registry Entry; see all contract members below. |
| `InferenceBackendRequest` | interface | <code>interface InferenceBackendRequest</code> | Field contract for Inference Backend Request; see all contract members below. |
| `InferenceBackendResponse` | interface | <code>interface InferenceBackendResponse</code> | Field contract for Inference Backend Response; see all contract members below. |
| `InferenceCacheIssue` | interface | <code>interface InferenceCacheIssue</code> | Field contract for Inference Cache Issue; see all contract members below. |
| `InferenceCachePolicy` | interface | <code>interface InferenceCachePolicy</code> | Field contract for Inference Cache Policy; see all contract members below. |
| `InferenceCacheScope` | interface | <code>interface InferenceCacheScope</code> | Field contract for Inference Cache Scope; see all contract members below. |
| `InferenceCacheUsage` | interface | <code>interface InferenceCacheUsage</code> | Field contract for Inference Cache Usage; see all contract members below. |
| `InferenceGenerationOptions` | interface | <code>interface InferenceGenerationOptions</code> | Field contract for Inference Generation Options; see all contract members below. |
| `InferenceManagerOptions` | interface | <code>interface InferenceManagerOptions</code> | Field contract for Inference Manager Options; see all contract members below. |
| `InferenceProvider` | interface | <code>interface InferenceProvider</code> | Field contract for Inference Provider; see all contract members below. |
| `InferenceRequest` | interface | <code>interface InferenceRequest</code> | Field contract for Inference Request; see all contract members below. |
| `InferenceResponse` | interface | <code>interface InferenceResponse</code> | Field contract for Inference Response; see all contract members below. |
| `InferenceToolDescriptor` | interface | <code>interface InferenceToolDescriptor</code> | Field contract for Inference Tool Descriptor; see all contract members below. |
| `InferenceUsage` | interface | <code>interface InferenceUsage</code> | Field contract for Inference Usage; see all contract members below. |
| `KvCacheProvider` | interface | <code>interface KvCacheProvider</code> | Field contract for Kv Cache Provider; see all contract members below. |
| `KvCacheRef` | interface | <code>interface KvCacheRef</code> | Field contract for Kv Cache Ref; see all contract members below. |
| `KvCacheWritePolicy` | interface | <code>interface KvCacheWritePolicy</code> | Field contract for Kv Cache Write Policy; see all contract members below. |
| `PlasmodCacheMetadata` | interface | <code>interface PlasmodCacheMetadata</code> | Field contract for Plasmod Cache Metadata; see all contract members below. |
| `PlasmodHotLayer` | interface | <code>interface PlasmodHotLayer</code> | Field contract for Plasmod Hot Layer; see all contract members below. |
| `PlasmodHotLayerPrepareInput` | interface | <code>interface PlasmodHotLayerPrepareInput</code> | Field contract for Plasmod Hot Layer Prepare Input; see all contract members below. |
| `PlasmodHotLayerPrepareResult` | interface | <code>interface PlasmodHotLayerPrepareResult</code> | Field contract for Plasmod Hot Layer Prepare Result; see all contract members below. |
| `PlasmodReusePolicy` | interface | <code>interface PlasmodReusePolicy</code> | Field contract for Plasmod Reuse Policy; see all contract members below. |
| `PlasmodSessionState` | interface | <code>interface PlasmodSessionState</code> | Field contract for Plasmod Session State; see all contract members below. |
| `PrefixCacheProvider` | interface | <code>interface PrefixCacheProvider</code> | Field contract for Prefix Cache Provider; see all contract members below. |
| `PrefixCacheRef` | interface | <code>interface PrefixCacheRef</code> | Field contract for Prefix Cache Ref; see all contract members below. |
| `PrefixSegment` | interface | <code>interface PrefixSegment</code> | Field contract for Prefix Segment; see all contract members below. |
| `PrefixSegmentationResult` | interface | <code>interface PrefixSegmentationResult</code> | Field contract for Prefix Segmentation Result; see all contract members below. |
| `PrefixSegmenter` | interface | <code>interface PrefixSegmenter</code> | Field contract for Prefix Segmenter; see all contract members below. |
| `PromptCompileInput` | interface | <code>interface PromptCompileInput</code> | Field contract for Prompt Compile Input; see all contract members below. |
| `PromptCompiler` | interface | <code>interface PromptCompiler</code> | Field contract for Prompt Compiler; see all contract members below. |
| `PromptMessage` | interface | <code>interface PromptMessage</code> | Field contract for Prompt Message; see all contract members below. |
| `InferenceBackendKind` | type | <code>type InferenceBackendKind = 'ollama' &#124; 'sglang' &#124; 'vllm' &#124; 'llama.cpp' &#124; 'openai-api'</code> | Public type alias for Inference Backend Kind. |
| `InferenceCacheMissReason` | type | <code>type InferenceCacheMissReason = 'missing' &#124; 'expired' &#124; 'not_configured' &#124; 'error'</code> | Public type alias for Inference Cache Miss Reason. |
| `KvCacheScope` | type | <code>type KvCacheScope = 'run' &#124; 'session' &#124; 'workspace'</code> | Public type alias for Kv Cache Scope. |
| `KvCacheWriteMode` | type | <code>type KvCacheWriteMode = 'write_through' &#124; 'write_if_missing' &#124; 'refresh'</code> | Public type alias for Kv Cache Write Mode. |
| `PrefixSegmentKind` | type | <code>type PrefixSegmentKind = 'system' &#124; 'developer' &#124; 'context' &#124; 'memory' &#124; 'tool' &#124; 'user' &#124; 'assistant'</code> | Public type alias for Prefix Segment Kind. |
| `PrefixSegmentScope` | type | <code>type PrefixSegmentScope = 'global' &#124; 'agent' &#124; 'session' &#124; 'run' &#124; 'dynamic'</code> | Public type alias for Prefix Segment Scope. |
| `PromptRole` | type | <code>type PromptRole = 'system' &#124; 'developer' &#124; 'user' &#124; 'assistant' &#124; 'tool' &#124; 'context' &#124; 'memory'</code> | Public type alias for Prompt Role. |

## `CompiledPrompt` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `messages` | property | <code>messages: PromptMessage[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `text` | property | <code>text: string</code> | Public text property. |

## `InferenceBackend` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public runtime operation for capabilities. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for infer. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public kind property. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public runtime operation for stream. |

## `InferenceBackendCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheInvalidation` | property | <code>cacheInvalidation: boolean</code> | Public cache Invalidation property. |
| `chatCompletions` | property | <code>chatCompletions: boolean</code> | Public chat Completions property. |
| `kvCaching` | property | <code>kvCaching: boolean</code> | Public kv Caching property. |
| `prefixCaching` | property | <code>prefixCaching: boolean</code> | Public prefix Caching property. |
| `streaming` | property | <code>streaming: boolean</code> | Public streaming property. |
| `textCompletions` | property | <code>textCompletions: boolean</code> | Public text Completions property. |

## `InferenceBackendRegistryEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backend` | property | <code>backend: InferenceBackend</code> | Public backend property. |
| `default` | property | <code>default: boolean</code> | Public default property. |
| `id` | property | <code>id: string</code> | Public id property. |

## `InferenceBackendRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `compiledPrompt` | property | <code>compiledPrompt: CompiledPrompt</code> | Public compiled Prompt property. |
| `kvCache` | property | <code>kvCache: KvCacheRef</code> | Public kv Cache property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `options` | property | <code>options: InferenceGenerationOptions</code> | Public options property. |
| `physicalKvCache` | property | <code>physicalKvCache: unknown</code> | Public physical Kv Cache property. |
| `prefixRefs` | property | <code>prefixRefs: PrefixCacheRef[]</code> | Public prefix Refs property. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue: unknown</code> | Public resolved Kv Cache Value property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `segmentation` | property | <code>segmentation: PrefixSegmentationResult</code> | Public segmentation property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tools` | property | <code>tools: InferenceToolDescriptor[]</code> | Public tools property. |

## `InferenceBackendResponse` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |
| `physicalKvCache` | property | <code>physicalKvCache: unknown</code> | Public physical Kv Cache property. |
| `raw` | property | <code>raw: unknown</code> | Public raw property. |
| `usage` | property | <code>usage: InferenceUsage</code> | Public usage property. |

## `InferenceCacheIssue` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bypassed` | property | <code>bypassed: boolean</code> | Public bypassed property. |
| `code` | property | <code>code: string</code> | Public code property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `operation` | property | <code>operation: "prefix_read" &#124; "kv_read" &#124; "kv_write" &#124; "invalidate"</code> | Public operation property. |

## `InferenceCachePolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kvCache` | property | <code>kvCache: KvCacheRef</code> | Public kv Cache property. |
| `prefix` | property | <code>prefix: PrefixCacheRef</code> | Public prefix property. |
| `writeKvCache` | property | <code>writeKvCache: KvCacheWritePolicy</code> | Public write Kv Cache property. |

## `InferenceCacheScope` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `InferenceCacheUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bypassed` | property | <code>bypassed: boolean</code> | Public bypassed property. |
| `issues` | property | <code>issues: InferenceCacheIssue[]</code> | Public issues property. |
| `kvCacheHit` | property | <code>kvCacheHit: boolean</code> | Public kv Cache Hit property. |
| `kvCacheMissReason` | property | <code>kvCacheMissReason: InferenceCacheMissReason</code> | Public kv Cache Miss Reason property. |
| `kvCacheRef` | property | <code>kvCacheRef: KvCacheRef</code> | Public kv Cache Ref property. |
| `kvCacheWriteRef` | property | <code>kvCacheWriteRef: KvCacheRef</code> | Public kv Cache Write Ref property. |
| `kvCacheWritten` | property | <code>kvCacheWritten: boolean</code> | Public kv Cache Written property. |
| `prefixHit` | property | <code>prefixHit: boolean</code> | Public prefix Hit property. |
| `prefixRef` | property | <code>prefixRef: PrefixCacheRef</code> | Public prefix Ref property. |
| `reusedTokens` | property | <code>reusedTokens: number</code> | Public reused Tokens property. |
| `servingCache` | property | <code>servingCache: Record&lt;string, unknown&gt;</code> | Public serving Cache property. |

## `InferenceGenerationOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `extra` | property | <code>extra: Record&lt;string, unknown&gt;</code> | Public extra property. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public max Tokens property. |
| `responseFormat` | property | <code>responseFormat: "text" &#124; "json_object" &#124; { type: string; schema?: unknown; }</code> | Public response Format property. |
| `seed` | property | <code>seed: number</code> | Public seed property. |
| `stop` | property | <code>stop: string[]</code> | Public stop property. |
| `stream` | property | <code>stream: boolean</code> | Public stream property. |
| `temperature` | property | <code>temperature: number</code> | Public temperature property. |
| `topK` | property | <code>topK: number</code> | Public top K property. |
| `topP` | property | <code>topP: number</code> | Public top P property. |

## `InferenceManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheFailureMode` | property | <code>cacheFailureMode: "strict" &#124; "bypass"</code> | Public cache Failure Mode property. |
| `cacheOperationTimeoutMs` | property | <code>cacheOperationTimeoutMs: number</code> | Public cache Operation Timeout Ms property. |
| `kvCache` | property | <code>kvCache: KvCacheProvider</code> | Public kv Cache property. |
| `onRecoveryFailure` | method | <code>onRecoveryFailure(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | Handles Recovery Failure at this module boundary. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public policy Revision property. |
| `prefixCache` | property | <code>prefixCache: PrefixCacheProvider</code> | Public prefix Cache property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `specRevision` | property | <code>specRevision: string</code> | Public spec Revision property. |

## `InferenceProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for infer. |
| `stream` | method | <code>stream(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public runtime operation for stream. |

## `InferenceRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `backendId` | property | <code>backendId: string</code> | Public backend Id property. |
| `cachePolicy` | property | <code>cachePolicy: InferenceCachePolicy</code> | Public cache Policy property. |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `kvCache` | property | <code>kvCache: KvCacheRef</code> | Public kv Cache property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `options` | property | <code>options: InferenceGenerationOptions</code> | Public options property. |
| `prefix` | property | <code>prefix: PrefixCacheRef</code> | Public prefix property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue: unknown</code> | Public resolved Kv Cache Value property. |
| `resolvedPrefixContent` | property | <code>resolvedPrefixContent: string</code> | Public resolved Prefix Content property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tools` | property | <code>tools: InferenceToolDescriptor[]</code> | Public tools property. |
| `trace` | property | <code>trace: boolean</code> | Public trace property. |

## `InferenceResponse` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache: InferenceCacheUsage</code> | Public cache property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `nextKvCacheValue` | property | <code>nextKvCacheValue: unknown</code> | Public next Kv Cache Value property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |
| `raw` | property | <code>raw: unknown</code> | Public raw property. |
| `usage` | property | <code>usage: InferenceUsage</code> | Public usage property. |

## `InferenceToolDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputSchema` | property | <code>inputSchema: Record&lt;string, unknown&gt;</code> | Public input schema property. |
| `name` | property | <code>name: string</code> | Public name property. |

## `InferenceUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inputTokens` | property | <code>inputTokens: number</code> | Public input Tokens property. |
| `outputTokens` | property | <code>outputTokens: number</code> | Public output Tokens property. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public total Tokens property. |

## `KvCacheProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | Gets get at this module boundary. |
| `invalidate` | method | <code>invalidate(ref: KvCacheRef, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate. |
| `put` | method | <code>put(ref: KvCacheRef, value: unknown): Promise&lt;void&gt;</code> | Public runtime operation for put. |

## `KvCacheRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `scope` | property | <code>scope: KvCacheScope</code> | Public scope property. |

## `KvCacheWritePolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: KvCacheWriteMode</code> | Public mode property. |
| `ref` | property | <code>ref: KvCacheRef</code> | Public ref property. |
| `value` | property | <code>value: unknown</code> | Public value property. |

## `PlasmodCacheMetadata` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backendId` | property | <code>backendId: string</code> | Public backend Id property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |
| `scope` | property | <code>scope: PrefixSegmentScope</code> | Public scope property. |
| `segmentId` | property | <code>segmentId: string</code> | Public segment Id property. |
| `tokenCount` | property | <code>tokenCount: number</code> | Public token Count property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `PlasmodHotLayer` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `getCacheMetadata` | method | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | Gets Cache Metadata at this module boundary. |
| `getSessionState` | method | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | Gets Session State at this module boundary. |
| `invalidateSegment` | method | <code>invalidateSegment(segmentId: string, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate Segment. |
| `prepare` | method | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | Public runtime operation for prepare. |

## `PlasmodHotLayerPrepareInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `backendId` | property | <code>backendId: string</code> | Public backend Id property. |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `kvCache` | property | <code>kvCache: KvCacheRef</code> | Public kv Cache property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue: unknown</code> | Public resolved Kv Cache Value property. |
| `reusePolicy` | property | <code>reusePolicy: PlasmodReusePolicy</code> | Public reuse Policy property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `segmentation` | property | <code>segmentation: PrefixSegmentationResult</code> | Public segmentation property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |

## `PlasmodHotLayerPrepareResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidatedSegmentIds` | property | <code>invalidatedSegmentIds: string[]</code> | Public invalidated Segment Ids property. |
| `kvCacheRef` | property | <code>kvCacheRef: KvCacheRef</code> | Public kv Cache Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `physicalKvCache` | property | <code>physicalKvCache: unknown</code> | Public physical Kv Cache property. |
| `prefixRefs` | property | <code>prefixRefs: PrefixCacheRef[]</code> | Public prefix Refs property. |
| `reusedSegmentIds` | property | <code>reusedSegmentIds: string[]</code> | Public reused Segment Ids property. |

## `PlasmodReusePolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCrossAgent` | property | <code>allowCrossAgent: boolean</code> | Public allow Cross Agent property. |
| `allowCrossSession` | property | <code>allowCrossSession: boolean</code> | Public allow Cross Session property. |
| `maxPrefixRefs` | property | <code>maxPrefixRefs: number</code> | Public max Prefix Refs property. |
| `minTokenCount` | property | <code>minTokenCount: number</code> | Public min Token Count property. |
| `requireExactHash` | property | <code>requireExactHash: boolean</code> | Public require Exact Hash property. |

## `PlasmodSessionState` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `backendId` | property | <code>backendId: string</code> | Public backend Id property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kvCacheRef` | property | <code>kvCacheRef: KvCacheRef</code> | Public kv Cache Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `prefixRefs` | property | <code>prefixRefs: PrefixCacheRef[]</code> | Public prefix Refs property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `PrefixCacheProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | Gets get at this module boundary. |
| `invalidate` | method | <code>invalidate(ref: PrefixCacheRef, reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate. |
| `put` | method | <code>put(ref: PrefixCacheRef, content: string): Promise&lt;void&gt;</code> | Public runtime operation for put. |

## `PrefixCacheRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `tokenCount` | property | <code>tokenCount: number</code> | Public token Count property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `PrefixSegment` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheable` | property | <code>cacheable: boolean</code> | Public cacheable property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `dependencies` | property | <code>dependencies: string[]</code> | Public dependencies property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: PrefixSegmentKind</code> | Public kind property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `scope` | property | <code>scope: PrefixSegmentScope</code> | Public scope property. |
| `tokenCount` | property | <code>tokenCount: number</code> | Public token Count property. |

## `PrefixSegmentationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compiled` | property | <code>compiled: CompiledPrompt</code> | Public compiled property. |
| `dynamicPrompt` | property | <code>dynamicPrompt: string</code> | Public dynamic Prompt property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `segments` | property | <code>segments: PrefixSegment[]</code> | Public segments property. |
| `stablePrefix` | property | <code>stablePrefix: string</code> | Public stable Prefix property. |

## `PrefixSegmenter` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `segment` | method | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | Public runtime operation for segment. |

## `PromptCompileInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `context` | property | <code>context: Record&lt;string, unknown&gt;</code> | Public context property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `messages` | property | <code>messages: PromptMessage[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `resolvedPrefixContent` | property | <code>resolvedPrefixContent: string</code> | Public resolved Prefix Content property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |

## `PromptCompiler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | Compiles compile at this module boundary. |

## `PromptMessage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `role` | property | <code>role: PromptRole</code> | Public role property. |
