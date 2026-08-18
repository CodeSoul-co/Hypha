# `@codesoul-co/hypha-inference` / `types`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)
- 导出数: **41**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CompiledPrompt` | 接口 | <code>interface CompiledPrompt</code> | Compiled Prompt 的字段契约；完整字段见下表。 |
| `InferenceBackend` | 接口 | <code>interface InferenceBackend</code> | Inference Backend 的字段契约；完整字段见下表。 |
| `InferenceBackendCapabilities` | 接口 | <code>interface InferenceBackendCapabilities</code> | Inference Backend Capabilities 的字段契约；完整字段见下表。 |
| `InferenceBackendRegistryEntry` | 接口 | <code>interface InferenceBackendRegistryEntry</code> | Inference Backend Registry Entry 的字段契约；完整字段见下表。 |
| `InferenceBackendRequest` | 接口 | <code>interface InferenceBackendRequest</code> | Inference Backend Request 的字段契约；完整字段见下表。 |
| `InferenceBackendResponse` | 接口 | <code>interface InferenceBackendResponse</code> | Inference Backend Response 的字段契约；完整字段见下表。 |
| `InferenceCacheIssue` | 接口 | <code>interface InferenceCacheIssue</code> | Inference Cache Issue 的字段契约；完整字段见下表。 |
| `InferenceCachePolicy` | 接口 | <code>interface InferenceCachePolicy</code> | Inference Cache Policy 的字段契约；完整字段见下表。 |
| `InferenceCacheScope` | 接口 | <code>interface InferenceCacheScope</code> | Inference Cache Scope 的字段契约；完整字段见下表。 |
| `InferenceCacheUsage` | 接口 | <code>interface InferenceCacheUsage</code> | Inference Cache Usage 的字段契约；完整字段见下表。 |
| `InferenceGenerationOptions` | 接口 | <code>interface InferenceGenerationOptions</code> | Inference Generation Options 的字段契约；完整字段见下表。 |
| `InferenceManagerOptions` | 接口 | <code>interface InferenceManagerOptions</code> | Inference Manager Options 的字段契约；完整字段见下表。 |
| `InferenceProvider` | 接口 | <code>interface InferenceProvider</code> | Inference Provider 的字段契约；完整字段见下表。 |
| `InferenceRequest` | 接口 | <code>interface InferenceRequest</code> | Inference Request 的字段契约；完整字段见下表。 |
| `InferenceResponse` | 接口 | <code>interface InferenceResponse</code> | Inference Response 的字段契约；完整字段见下表。 |
| `InferenceToolDescriptor` | 接口 | <code>interface InferenceToolDescriptor</code> | Inference Tool Descriptor 的字段契约；完整字段见下表。 |
| `InferenceUsage` | 接口 | <code>interface InferenceUsage</code> | Inference Usage 的字段契约；完整字段见下表。 |
| `KvCacheProvider` | 接口 | <code>interface KvCacheProvider</code> | Kv Cache Provider 的字段契约；完整字段见下表。 |
| `KvCacheRef` | 接口 | <code>interface KvCacheRef</code> | Kv Cache Ref 的字段契约；完整字段见下表。 |
| `KvCacheWritePolicy` | 接口 | <code>interface KvCacheWritePolicy</code> | Kv Cache Write Policy 的字段契约；完整字段见下表。 |
| `PlasmodCacheMetadata` | 接口 | <code>interface PlasmodCacheMetadata</code> | Plasmod Cache Metadata 的字段契约；完整字段见下表。 |
| `PlasmodHotLayer` | 接口 | <code>interface PlasmodHotLayer</code> | Plasmod Hot Layer 的字段契约；完整字段见下表。 |
| `PlasmodHotLayerPrepareInput` | 接口 | <code>interface PlasmodHotLayerPrepareInput</code> | Plasmod Hot Layer Prepare Input 的字段契约；完整字段见下表。 |
| `PlasmodHotLayerPrepareResult` | 接口 | <code>interface PlasmodHotLayerPrepareResult</code> | Plasmod Hot Layer Prepare Result 的字段契约；完整字段见下表。 |
| `PlasmodReusePolicy` | 接口 | <code>interface PlasmodReusePolicy</code> | Plasmod Reuse Policy 的字段契约；完整字段见下表。 |
| `PlasmodSessionState` | 接口 | <code>interface PlasmodSessionState</code> | Plasmod Session State 的字段契约；完整字段见下表。 |
| `PrefixCacheProvider` | 接口 | <code>interface PrefixCacheProvider</code> | Prefix Cache Provider 的字段契约；完整字段见下表。 |
| `PrefixCacheRef` | 接口 | <code>interface PrefixCacheRef</code> | Prefix Cache Ref 的字段契约；完整字段见下表。 |
| `PrefixSegment` | 接口 | <code>interface PrefixSegment</code> | Prefix Segment 的字段契约；完整字段见下表。 |
| `PrefixSegmentationResult` | 接口 | <code>interface PrefixSegmentationResult</code> | Prefix Segmentation Result 的字段契约；完整字段见下表。 |
| `PrefixSegmenter` | 接口 | <code>interface PrefixSegmenter</code> | Prefix Segmenter 的字段契约；完整字段见下表。 |
| `PromptCompileInput` | 接口 | <code>interface PromptCompileInput</code> | Prompt Compile Input 的字段契约；完整字段见下表。 |
| `PromptCompiler` | 接口 | <code>interface PromptCompiler</code> | Prompt Compiler 的字段契约；完整字段见下表。 |
| `PromptMessage` | 接口 | <code>interface PromptMessage</code> | Prompt Message 的字段契约；完整字段见下表。 |
| `InferenceBackendKind` | 类型 | <code>type InferenceBackendKind = 'ollama' &#124; 'sglang' &#124; 'vllm' &#124; 'llama.cpp' &#124; 'openai-api'</code> | Inference Backend Kind 的公共类型别名。 |
| `InferenceCacheMissReason` | 类型 | <code>type InferenceCacheMissReason = 'missing' &#124; 'expired' &#124; 'not_configured' &#124; 'error'</code> | Inference Cache Miss Reason 的公共类型别名。 |
| `KvCacheScope` | 类型 | <code>type KvCacheScope = 'run' &#124; 'session' &#124; 'workspace'</code> | Kv Cache Scope 的公共类型别名。 |
| `KvCacheWriteMode` | 类型 | <code>type KvCacheWriteMode = 'write_through' &#124; 'write_if_missing' &#124; 'refresh'</code> | Kv Cache Write Mode 的公共类型别名。 |
| `PrefixSegmentKind` | 类型 | <code>type PrefixSegmentKind = 'system' &#124; 'developer' &#124; 'context' &#124; 'memory' &#124; 'tool' &#124; 'user' &#124; 'assistant'</code> | Prefix Segment Kind 的公共类型别名。 |
| `PrefixSegmentScope` | 类型 | <code>type PrefixSegmentScope = 'global' &#124; 'agent' &#124; 'session' &#124; 'run' &#124; 'dynamic'</code> | Prefix Segment Scope 的公共类型别名。 |
| `PromptRole` | 类型 | <code>type PromptRole = 'system' &#124; 'developer' &#124; 'user' &#124; 'assistant' &#124; 'tool' &#124; 'context' &#124; 'memory'</code> | Prompt Role 的公共类型别名。 |

## `CompiledPrompt` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `messages` | 属性 | <code>messages: PromptMessage[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |

## `InferenceBackend` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | capabilities 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | infer 的公开运行时操作。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | kind 字段。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | stream 的公开运行时操作。 |

## `InferenceBackendCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheInvalidation` | 属性 | <code>cacheInvalidation: boolean</code> | cache Invalidation 字段。 |
| `chatCompletions` | 属性 | <code>chatCompletions: boolean</code> | chat Completions 字段。 |
| `kvCaching` | 属性 | <code>kvCaching: boolean</code> | kv Caching 字段。 |
| `prefixCaching` | 属性 | <code>prefixCaching: boolean</code> | prefix Caching 字段。 |
| `streaming` | 属性 | <code>streaming: boolean</code> | streaming 字段。 |
| `textCompletions` | 属性 | <code>textCompletions: boolean</code> | text Completions 字段。 |

## `InferenceBackendRegistryEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backend` | 属性 | <code>backend: InferenceBackend</code> | backend 字段。 |
| `default` | 属性 | <code>default: boolean</code> | default 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |

## `InferenceBackendRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `compiledPrompt` | 属性 | <code>compiledPrompt: CompiledPrompt</code> | compiled Prompt 字段。 |
| `kvCache` | 属性 | <code>kvCache: KvCacheRef</code> | kv Cache 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `options` | 属性 | <code>options: InferenceGenerationOptions</code> | options 字段。 |
| `physicalKvCache` | 属性 | <code>physicalKvCache: unknown</code> | physical Kv Cache 字段。 |
| `prefixRefs` | 属性 | <code>prefixRefs: PrefixCacheRef[]</code> | prefix Refs 字段。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue: unknown</code> | resolved Kv Cache Value 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `segmentation` | 属性 | <code>segmentation: PrefixSegmentationResult</code> | segmentation 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tools` | 属性 | <code>tools: InferenceToolDescriptor[]</code> | tools 字段。 |

## `InferenceBackendResponse` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |
| `physicalKvCache` | 属性 | <code>physicalKvCache: unknown</code> | physical Kv Cache 字段。 |
| `raw` | 属性 | <code>raw: unknown</code> | raw 字段。 |
| `usage` | 属性 | <code>usage: InferenceUsage</code> | usage 字段。 |

## `InferenceCacheIssue` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bypassed` | 属性 | <code>bypassed: boolean</code> | bypassed 字段。 |
| `code` | 属性 | <code>code: string</code> | code 字段。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `operation` | 属性 | <code>operation: "prefix_read" &#124; "kv_read" &#124; "kv_write" &#124; "invalidate"</code> | operation 字段。 |

## `InferenceCachePolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kvCache` | 属性 | <code>kvCache: KvCacheRef</code> | kv Cache 字段。 |
| `prefix` | 属性 | <code>prefix: PrefixCacheRef</code> | prefix 字段。 |
| `writeKvCache` | 属性 | <code>writeKvCache: KvCacheWritePolicy</code> | write Kv Cache 字段。 |

## `InferenceCacheScope` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `InferenceCacheUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bypassed` | 属性 | <code>bypassed: boolean</code> | bypassed 字段。 |
| `issues` | 属性 | <code>issues: InferenceCacheIssue[]</code> | issues 字段。 |
| `kvCacheHit` | 属性 | <code>kvCacheHit: boolean</code> | kv Cache Hit 字段。 |
| `kvCacheMissReason` | 属性 | <code>kvCacheMissReason: InferenceCacheMissReason</code> | kv Cache Miss Reason 字段。 |
| `kvCacheRef` | 属性 | <code>kvCacheRef: KvCacheRef</code> | kv Cache Ref 字段。 |
| `kvCacheWriteRef` | 属性 | <code>kvCacheWriteRef: KvCacheRef</code> | kv Cache Write Ref 字段。 |
| `kvCacheWritten` | 属性 | <code>kvCacheWritten: boolean</code> | kv Cache Written 字段。 |
| `prefixHit` | 属性 | <code>prefixHit: boolean</code> | prefix Hit 字段。 |
| `prefixRef` | 属性 | <code>prefixRef: PrefixCacheRef</code> | prefix Ref 字段。 |
| `reusedTokens` | 属性 | <code>reusedTokens: number</code> | reused Tokens 字段。 |
| `servingCache` | 属性 | <code>servingCache: Record&lt;string, unknown&gt;</code> | serving Cache 字段。 |

## `InferenceGenerationOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `extra` | 属性 | <code>extra: Record&lt;string, unknown&gt;</code> | extra 字段。 |
| `maxTokens` | 属性 | <code>maxTokens: number</code> | max Tokens 字段。 |
| `responseFormat` | 属性 | <code>responseFormat: "text" &#124; "json_object" &#124; { type: string; schema?: unknown; }</code> | response Format 字段。 |
| `seed` | 属性 | <code>seed: number</code> | seed 字段。 |
| `stop` | 属性 | <code>stop: string[]</code> | stop 字段。 |
| `stream` | 属性 | <code>stream: boolean</code> | stream 字段。 |
| `temperature` | 属性 | <code>temperature: number</code> | temperature 字段。 |
| `topK` | 属性 | <code>topK: number</code> | top K 字段。 |
| `topP` | 属性 | <code>topP: number</code> | top P 字段。 |

## `InferenceManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheFailureMode` | 属性 | <code>cacheFailureMode: "strict" &#124; "bypass"</code> | cache Failure Mode 字段。 |
| `cacheOperationTimeoutMs` | 属性 | <code>cacheOperationTimeoutMs: number</code> | cache Operation Timeout Ms 字段。 |
| `kvCache` | 属性 | <code>kvCache: KvCacheProvider</code> | kv Cache 字段。 |
| `onRecoveryFailure` | 方法 | <code>onRecoveryFailure(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | 处理 Recovery Failure。 |
| `policyRevision` | 属性 | <code>policyRevision: string</code> | policy Revision 字段。 |
| `prefixCache` | 属性 | <code>prefixCache: PrefixCacheProvider</code> | prefix Cache 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `specRevision` | 属性 | <code>specRevision: string</code> | spec Revision 字段。 |

## `InferenceProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | infer 的公开运行时操作。 |
| `stream` | 方法 | <code>stream(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | stream 的公开运行时操作。 |

## `InferenceRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `backendId` | 属性 | <code>backendId: string</code> | backend Id 字段。 |
| `cachePolicy` | 属性 | <code>cachePolicy: InferenceCachePolicy</code> | cache Policy 字段。 |
| `cacheScope` | 属性 | <code>cacheScope: InferenceCacheScope</code> | cache Scope 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `kvCache` | 属性 | <code>kvCache: KvCacheRef</code> | kv Cache 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `options` | 属性 | <code>options: InferenceGenerationOptions</code> | options 字段。 |
| `prefix` | 属性 | <code>prefix: PrefixCacheRef</code> | prefix 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue: unknown</code> | resolved Kv Cache Value 字段。 |
| `resolvedPrefixContent` | 属性 | <code>resolvedPrefixContent: string</code> | resolved Prefix Content 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tools` | 属性 | <code>tools: InferenceToolDescriptor[]</code> | tools 字段。 |
| `trace` | 属性 | <code>trace: boolean</code> | trace 字段。 |

## `InferenceResponse` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache: InferenceCacheUsage</code> | cache 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `nextKvCacheValue` | 属性 | <code>nextKvCacheValue: unknown</code> | next Kv Cache Value 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |
| `raw` | 属性 | <code>raw: unknown</code> | raw 字段。 |
| `usage` | 属性 | <code>usage: InferenceUsage</code> | usage 字段。 |

## `InferenceToolDescriptor` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: Record&lt;string, unknown&gt;</code> | input schema 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |

## `InferenceUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inputTokens` | 属性 | <code>inputTokens: number</code> | input Tokens 字段。 |
| `outputTokens` | 属性 | <code>outputTokens: number</code> | output Tokens 字段。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | total Tokens 字段。 |

## `KvCacheProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | 读取 get。 |
| `invalidate` | 方法 | <code>invalidate(ref: KvCacheRef, reason: string): Promise&lt;void&gt;</code> | invalidate 的公开运行时操作。 |
| `put` | 方法 | <code>put(ref: KvCacheRef, value: unknown): Promise&lt;void&gt;</code> | put 的公开运行时操作。 |

## `KvCacheRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope: InferenceCacheScope</code> | cache Scope 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `scope` | 属性 | <code>scope: KvCacheScope</code> | scope 字段。 |

## `KvCacheWritePolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: KvCacheWriteMode</code> | mode 字段。 |
| `ref` | 属性 | <code>ref: KvCacheRef</code> | ref 字段。 |
| `value` | 属性 | <code>value: unknown</code> | value 字段。 |

## `PlasmodCacheMetadata` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backendId` | 属性 | <code>backendId: string</code> | backend Id 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |
| `scope` | 属性 | <code>scope: PrefixSegmentScope</code> | scope 字段。 |
| `segmentId` | 属性 | <code>segmentId: string</code> | segment Id 字段。 |
| `tokenCount` | 属性 | <code>tokenCount: number</code> | token Count 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `PlasmodHotLayer` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `getCacheMetadata` | 方法 | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | 读取 Cache Metadata。 |
| `getSessionState` | 方法 | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | 读取 Session State。 |
| `invalidateSegment` | 方法 | <code>invalidateSegment(segmentId: string, reason: string): Promise&lt;void&gt;</code> | invalidate Segment 的公开运行时操作。 |
| `prepare` | 方法 | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | prepare 的公开运行时操作。 |

## `PlasmodHotLayerPrepareInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `backendId` | 属性 | <code>backendId: string</code> | backend Id 字段。 |
| `cacheScope` | 属性 | <code>cacheScope: InferenceCacheScope</code> | cache Scope 字段。 |
| `kvCache` | 属性 | <code>kvCache: KvCacheRef</code> | kv Cache 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue: unknown</code> | resolved Kv Cache Value 字段。 |
| `reusePolicy` | 属性 | <code>reusePolicy: PlasmodReusePolicy</code> | reuse Policy 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `segmentation` | 属性 | <code>segmentation: PrefixSegmentationResult</code> | segmentation 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |

## `PlasmodHotLayerPrepareResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidatedSegmentIds` | 属性 | <code>invalidatedSegmentIds: string[]</code> | invalidated Segment Ids 字段。 |
| `kvCacheRef` | 属性 | <code>kvCacheRef: KvCacheRef</code> | kv Cache Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `physicalKvCache` | 属性 | <code>physicalKvCache: unknown</code> | physical Kv Cache 字段。 |
| `prefixRefs` | 属性 | <code>prefixRefs: PrefixCacheRef[]</code> | prefix Refs 字段。 |
| `reusedSegmentIds` | 属性 | <code>reusedSegmentIds: string[]</code> | reused Segment Ids 字段。 |

## `PlasmodReusePolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCrossAgent` | 属性 | <code>allowCrossAgent: boolean</code> | allow Cross Agent 字段。 |
| `allowCrossSession` | 属性 | <code>allowCrossSession: boolean</code> | allow Cross Session 字段。 |
| `maxPrefixRefs` | 属性 | <code>maxPrefixRefs: number</code> | max Prefix Refs 字段。 |
| `minTokenCount` | 属性 | <code>minTokenCount: number</code> | min Token Count 字段。 |
| `requireExactHash` | 属性 | <code>requireExactHash: boolean</code> | require Exact Hash 字段。 |

## `PlasmodSessionState` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `backendId` | 属性 | <code>backendId: string</code> | backend Id 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kvCacheRef` | 属性 | <code>kvCacheRef: KvCacheRef</code> | kv Cache Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `prefixRefs` | 属性 | <code>prefixRefs: PrefixCacheRef[]</code> | prefix Refs 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `PrefixCacheProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | 读取 get。 |
| `invalidate` | 方法 | <code>invalidate(ref: PrefixCacheRef, reason: string): Promise&lt;void&gt;</code> | invalidate 的公开运行时操作。 |
| `put` | 方法 | <code>put(ref: PrefixCacheRef, content: string): Promise&lt;void&gt;</code> | put 的公开运行时操作。 |

## `PrefixCacheRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope: InferenceCacheScope</code> | cache Scope 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `tokenCount` | 属性 | <code>tokenCount: number</code> | token Count 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `PrefixSegment` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheable` | 属性 | <code>cacheable: boolean</code> | cacheable 字段。 |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `dependencies` | 属性 | <code>dependencies: string[]</code> | dependencies 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: PrefixSegmentKind</code> | kind 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `scope` | 属性 | <code>scope: PrefixSegmentScope</code> | scope 字段。 |
| `tokenCount` | 属性 | <code>tokenCount: number</code> | token Count 字段。 |

## `PrefixSegmentationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compiled` | 属性 | <code>compiled: CompiledPrompt</code> | compiled 字段。 |
| `dynamicPrompt` | 属性 | <code>dynamicPrompt: string</code> | dynamic Prompt 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `segments` | 属性 | <code>segments: PrefixSegment[]</code> | segments 字段。 |
| `stablePrefix` | 属性 | <code>stablePrefix: string</code> | stable Prefix 字段。 |

## `PrefixSegmenter` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `segment` | 方法 | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | segment 的公开运行时操作。 |

## `PromptCompileInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `context` | 属性 | <code>context: Record&lt;string, unknown&gt;</code> | context 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `messages` | 属性 | <code>messages: PromptMessage[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `resolvedPrefixContent` | 属性 | <code>resolvedPrefixContent: string</code> | resolved Prefix Content 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |

## `PromptCompiler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | 编译 compile。 |

## `PromptMessage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `role` | 属性 | <code>role: PromptRole</code> | role 字段。 |
