# `@codesoul-co/hypha-inference` / `types`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)
- 导出数: **41**

## 模块用法

用于声明并运行时校验契约。Types 模块公开 34 接口、7 类型。

### 从包入口导入

```ts
import type {
  CompiledPrompt,
  InferenceBackend,
  InferenceBackendCapabilities,
  InferenceBackendRegistryEntry,
  InferenceBackendRequest,
  InferenceBackendResponse,
  InferenceCacheIssue,
  InferenceCachePolicy,
} from '@codesoul-co/hypha-inference';

// 完整导出列表见下方。
```

### 使用要点

- 41 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CompiledPrompt` | 接口 | <code>interface CompiledPrompt</code> | Compiled Prompt 接口，共包含 4 个公开字段或方法。 |
| `InferenceBackend` | 接口 | <code>interface InferenceBackend</code> | Inference Backend 接口，共包含 5 个公开字段或方法。 |
| `InferenceBackendCapabilities` | 接口 | <code>interface InferenceBackendCapabilities</code> | Inference Backend Capabilities 接口，共包含 6 个公开字段或方法。 |
| `InferenceBackendRegistryEntry` | 接口 | <code>interface InferenceBackendRegistryEntry</code> | Inference Backend Registry Entry 接口，共包含 3 个公开字段或方法。 |
| `InferenceBackendRequest` | 接口 | <code>interface InferenceBackendRequest</code> | Inference Backend Request 接口，共包含 14 个公开字段或方法。 |
| `InferenceBackendResponse` | 接口 | <code>interface InferenceBackendResponse</code> | Inference Backend Response 接口，共包含 6 个公开字段或方法。 |
| `InferenceCacheIssue` | 接口 | <code>interface InferenceCacheIssue</code> | Inference Cache Issue 接口，共包含 4 个公开字段或方法。 |
| `InferenceCachePolicy` | 接口 | <code>interface InferenceCachePolicy</code> | Inference Cache Policy 接口，共包含 3 个公开字段或方法。 |
| `InferenceCacheScope` | 接口 | <code>interface InferenceCacheScope</code> | Inference Cache Scope 接口，共包含 3 个公开字段或方法。 |
| `InferenceCacheUsage` | 接口 | <code>interface InferenceCacheUsage</code> | Inference Cache Usage 接口，共包含 11 个公开字段或方法。 |
| `InferenceGenerationOptions` | 接口 | <code>interface InferenceGenerationOptions</code> | Inference Generation Options 接口，共包含 9 个公开字段或方法。 |
| `InferenceManagerOptions` | 接口 | <code>interface InferenceManagerOptions</code> | Inference Manager Options 接口，共包含 8 个公开字段或方法。 |
| `InferenceProvider` | 接口 | <code>interface InferenceProvider</code> | Inference Provider 接口，共包含 3 个公开字段或方法。 |
| `InferenceRequest` | 接口 | <code>interface InferenceRequest</code> | Inference Request 接口，共包含 18 个公开字段或方法。 |
| `InferenceResponse` | 接口 | <code>interface InferenceResponse</code> | Inference Response 接口，共包含 7 个公开字段或方法。 |
| `InferenceToolDescriptor` | 接口 | <code>interface InferenceToolDescriptor</code> | Inference Tool Descriptor 接口，共包含 4 个公开字段或方法。 |
| `InferenceUsage` | 接口 | <code>interface InferenceUsage</code> | Inference Usage 接口，共包含 3 个公开字段或方法。 |
| `KvCacheProvider` | 接口 | <code>interface KvCacheProvider</code> | Kv Cache Provider 接口，共包含 3 个公开字段或方法。 |
| `KvCacheRef` | 接口 | <code>interface KvCacheRef</code> | Kv Cache Ref 接口，共包含 7 个公开字段或方法。 |
| `KvCacheWritePolicy` | 接口 | <code>interface KvCacheWritePolicy</code> | Kv Cache Write Policy 接口，共包含 3 个公开字段或方法。 |
| `PlasmodCacheMetadata` | 接口 | <code>interface PlasmodCacheMetadata</code> | Plasmod Cache Metadata 接口，共包含 10 个公开字段或方法。 |
| `PlasmodHotLayer` | 接口 | <code>interface PlasmodHotLayer</code> | Plasmod Hot Layer 接口，共包含 4 个公开字段或方法。 |
| `PlasmodHotLayerPrepareInput` | 接口 | <code>interface PlasmodHotLayerPrepareInput</code> | Plasmod Hot Layer Prepare Input 接口，共包含 12 个公开字段或方法。 |
| `PlasmodHotLayerPrepareResult` | 接口 | <code>interface PlasmodHotLayerPrepareResult</code> | Plasmod Hot Layer Prepare Result 接口，共包含 6 个公开字段或方法。 |
| `PlasmodReusePolicy` | 接口 | <code>interface PlasmodReusePolicy</code> | Plasmod Reuse Policy 接口，共包含 5 个公开字段或方法。 |
| `PlasmodSessionState` | 接口 | <code>interface PlasmodSessionState</code> | Plasmod Session State 接口，共包含 10 个公开字段或方法。 |
| `PrefixCacheProvider` | 接口 | <code>interface PrefixCacheProvider</code> | Prefix Cache Provider 接口，共包含 3 个公开字段或方法。 |
| `PrefixCacheRef` | 接口 | <code>interface PrefixCacheRef</code> | Prefix Cache Ref 接口，共包含 6 个公开字段或方法。 |
| `PrefixSegment` | 接口 | <code>interface PrefixSegment</code> | Prefix Segment 接口，共包含 9 个公开字段或方法。 |
| `PrefixSegmentationResult` | 接口 | <code>interface PrefixSegmentationResult</code> | Prefix Segmentation Result 接口，共包含 5 个公开字段或方法。 |
| `PrefixSegmenter` | 接口 | <code>interface PrefixSegmenter</code> | Prefix Segmenter 接口，共包含 1 个公开字段或方法。 |
| `PromptCompileInput` | 接口 | <code>interface PromptCompileInput</code> | Prompt Compile Input 接口，共包含 11 个公开字段或方法。 |
| `PromptCompiler` | 接口 | <code>interface PromptCompiler</code> | Prompt Compiler 接口，共包含 1 个公开字段或方法。 |
| `PromptMessage` | 接口 | <code>interface PromptMessage</code> | Prompt Message 接口，共包含 4 个公开字段或方法。 |
| `InferenceBackendKind` | 类型 | <code>type InferenceBackendKind = 'ollama' &#124; 'sglang' &#124; 'vllm' &#124; 'llama.cpp' &#124; 'openai-api'</code> | Inference Backend Kind 公共类型别名；完整类型表达式见声明。 |
| `InferenceCacheMissReason` | 类型 | <code>type InferenceCacheMissReason = 'missing' &#124; 'expired' &#124; 'not_configured' &#124; 'error'</code> | Inference Cache Miss Reason 公共类型别名；完整类型表达式见声明。 |
| `KvCacheScope` | 类型 | <code>type KvCacheScope = 'run' &#124; 'session' &#124; 'workspace'</code> | Kv Cache Scope 公共类型别名；完整类型表达式见声明。 |
| `KvCacheWriteMode` | 类型 | <code>type KvCacheWriteMode = 'write_through' &#124; 'write_if_missing' &#124; 'refresh'</code> | Kv Cache Write Mode 公共类型别名；完整类型表达式见声明。 |
| `PrefixSegmentKind` | 类型 | <code>type PrefixSegmentKind = 'system' &#124; 'developer' &#124; 'context' &#124; 'memory' &#124; 'tool' &#124; 'user' &#124; 'assistant'</code> | Prefix Segment Kind 公共类型别名；完整类型表达式见声明。 |
| `PrefixSegmentScope` | 类型 | <code>type PrefixSegmentScope = 'global' &#124; 'agent' &#124; 'session' &#124; 'run' &#124; 'dynamic'</code> | Prefix Segment Scope 公共类型别名；完整类型表达式见声明。 |
| `PromptRole` | 类型 | <code>type PromptRole = 'system' &#124; 'developer' &#124; 'user' &#124; 'assistant' &#124; 'tool' &#124; 'context' &#124; 'memory'</code> | Prompt Role 公共类型别名；完整类型表达式见声明。 |

## `CompiledPrompt`

Compiled Prompt 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CompiledPrompt } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface CompiledPrompt {
    id: string;
    messages: PromptMessage[];
    text: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: PromptMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceBackend`

Inference Backend 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceBackend } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceBackend {
    id: string;
    kind: InferenceBackendKind;
    capabilities(): InferenceBackendCapabilities;
    infer(request: InferenceBackendRequest): Promise<InferenceBackendResponse>;
    stream?(request: InferenceBackendRequest): AsyncIterable<InferenceBackendResponse>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>kind: InferenceBackendKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream?(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InferenceBackendCapabilities`

Inference Backend Capabilities 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceBackendCapabilities } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceBackendCapabilities {
    streaming: boolean;
    chatCompletions: boolean;
    textCompletions: boolean;
    prefixCaching: boolean;
    kvCaching: boolean;
    cacheInvalidation: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheInvalidation` | 属性 | <code>cacheInvalidation: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `chatCompletions` | 属性 | <code>chatCompletions: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCaching` | 属性 | <code>kvCaching: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixCaching` | 属性 | <code>prefixCaching: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `streaming` | 属性 | <code>streaming: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `textCompletions` | 属性 | <code>textCompletions: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceBackendRegistryEntry`

Inference Backend Registry Entry 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceBackendRegistryEntry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceBackendRegistryEntry {
    id: string;
    backend: InferenceBackend;
    default?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backend` | 属性 | <code>backend: InferenceBackend</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `default` | 属性 | <code>default?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceBackendRequest`

Inference Backend Request 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceBackendRequest } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceBackendRequest {
    runId: string;
    stepId: string;
    sessionId?: string;
    agentId?: string;
    modelAlias: string;
    compiledPrompt: CompiledPrompt;
    segmentation: PrefixSegmentationResult;
    prefixRefs: PrefixCacheRef[];
    kvCache?: KvCacheRef;
    resolvedKvCacheValue?: unknown;
    physicalKvCache?: unknown;
    options?: InferenceGenerationOptions;
    tools?: InferenceToolDescriptor[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compiledPrompt` | 属性 | <code>compiledPrompt: CompiledPrompt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCache` | 属性 | <code>kvCache?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: InferenceGenerationOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `physicalKvCache` | 属性 | <code>physicalKvCache?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixRefs` | 属性 | <code>prefixRefs: PrefixCacheRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `segmentation` | 属性 | <code>segmentation: PrefixSegmentationResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: InferenceToolDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceBackendResponse`

Inference Backend Response 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceBackendResponse } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceBackendResponse<TOutput = unknown> {
    id: string;
    output: TOutput;
    usage?: InferenceUsage;
    physicalKvCache?: unknown;
    metadata?: Record<string, unknown>;
    raw?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `physicalKvCache` | 属性 | <code>physicalKvCache?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `raw` | 属性 | <code>raw?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage?: InferenceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceCacheIssue`

Inference Cache Issue 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceCacheIssue } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceCacheIssue {
    operation: 'prefix_read' | 'kv_read' | 'kv_write' | 'invalidate';
    code: string;
    message: string;
    bypassed: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bypassed` | 属性 | <code>bypassed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation: "prefix_read" &#124; "kv_read" &#124; "kv_write" &#124; "invalidate"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceCachePolicy`

Inference Cache Policy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceCachePolicy } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceCachePolicy {
    prefix?: PrefixCacheRef;
    kvCache?: KvCacheRef;
    writeKvCache?: KvCacheWritePolicy;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kvCache` | 属性 | <code>kvCache?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefix` | 属性 | <code>prefix?: PrefixCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `writeKvCache` | 属性 | <code>writeKvCache?: KvCacheWritePolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceCacheScope`

Inference Cache Scope 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceCacheScope } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceCacheScope {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceCacheUsage`

Inference Cache Usage 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceCacheUsage } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceCacheUsage {
    prefixHit?: boolean;
    kvCacheHit?: boolean;
    servingCache?: Record<string, unknown>;
    prefixRef?: PrefixCacheRef;
    kvCacheRef?: KvCacheRef;
    kvCacheMissReason?: InferenceCacheMissReason;
    kvCacheWritten?: boolean;
    kvCacheWriteRef?: KvCacheRef;
    reusedTokens?: number;
    bypassed?: boolean;
    issues?: InferenceCacheIssue[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `bypassed` | 属性 | <code>bypassed?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issues` | 属性 | <code>issues?: InferenceCacheIssue[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheHit` | 属性 | <code>kvCacheHit?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheMissReason` | 属性 | <code>kvCacheMissReason?: InferenceCacheMissReason</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheRef` | 属性 | <code>kvCacheRef?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheWriteRef` | 属性 | <code>kvCacheWriteRef?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheWritten` | 属性 | <code>kvCacheWritten?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixHit` | 属性 | <code>prefixHit?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixRef` | 属性 | <code>prefixRef?: PrefixCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reusedTokens` | 属性 | <code>reusedTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `servingCache` | 属性 | <code>servingCache?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceGenerationOptions`

Inference Generation Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceGenerationOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceGenerationOptions {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    topK?: number;
    stop?: string[];
    seed?: number;
    stream?: boolean;
    responseFormat?: 'text' | 'json_object' | {
        type: string;
        schema?: unknown;
    };
    extra?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `extra` | 属性 | <code>extra?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTokens` | 属性 | <code>maxTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseFormat` | 属性 | <code>responseFormat?: "text" &#124; "json_object" &#124; { type: string; schema?: unknown; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `seed` | 属性 | <code>seed?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stop` | 属性 | <code>stop?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 属性 | <code>stream?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `temperature` | 属性 | <code>temperature?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topK` | 属性 | <code>topK?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `topP` | 属性 | <code>topP?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceManagerOptions`

Inference Manager Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceManagerOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceManagerOptions {
    prefixCache?: PrefixCacheProvider;
    kvCache?: KvCacheProvider;
    cacheFailureMode?: 'bypass' | 'strict';
    cacheOperationTimeoutMs?: number;
    providerRevision?: string;
    policyRevision?: string;
    specRevision?: string;
    onRecoveryFailure?: (failure: RecoveryFailure) => void | Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheFailureMode` | 属性 | <code>cacheFailureMode?: "strict" &#124; "bypass"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheOperationTimeoutMs` | 属性 | <code>cacheOperationTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCache` | 属性 | <code>kvCache?: KvCacheProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onRecoveryFailure` | 方法 | <code>onRecoveryFailure?(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixCache` | 属性 | <code>prefixCache?: PrefixCacheProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceProvider`

Inference Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceProvider } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceProvider {
    id: string;
    infer(request: InferenceRequest): Promise<InferenceResponse>;
    stream?(request: InferenceRequest): AsyncIterable<InferenceResponse>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream?(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InferenceRequest`

Inference Request 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceRequest } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceRequest<TInput = unknown> {
    runId: string;
    stepId: string;
    sessionId?: string;
    agentId?: string;
    modelAlias: string;
    providerId?: string;
    backendId?: string;
    input: TInput;
    options?: InferenceGenerationOptions;
    tools?: InferenceToolDescriptor[];
    cachePolicy?: InferenceCachePolicy;
    cacheScope?: InferenceCacheScope;
    prefix?: PrefixCacheRef;
    resolvedPrefixContent?: string;
    kvCache?: KvCacheRef;
    resolvedKvCacheValue?: unknown;
    trace?: boolean;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `backendId` | 属性 | <code>backendId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cachePolicy` | 属性 | <code>cachePolicy?: InferenceCachePolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCache` | 属性 | <code>kvCache?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: InferenceGenerationOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefix` | 属性 | <code>prefix?: PrefixCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedPrefixContent` | 属性 | <code>resolvedPrefixContent?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: InferenceToolDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceResponse`

Inference Response 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceResponse } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceResponse<TOutput = unknown> {
    id: string;
    output: TOutput;
    usage?: InferenceUsage;
    cache?: InferenceCacheUsage;
    nextKvCacheValue?: unknown;
    metadata?: Record<string, unknown>;
    raw?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cache` | 属性 | <code>cache?: InferenceCacheUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextKvCacheValue` | 属性 | <code>nextKvCacheValue?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output: TOutput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `raw` | 属性 | <code>raw?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage?: InferenceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceToolDescriptor`

Inference Tool Descriptor 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceToolDescriptor } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceToolDescriptor {
    id: string;
    name: string;
    description?: string;
    inputSchema: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceUsage`

Inference Usage 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceUsage } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface InferenceUsage {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `inputTokens` | 属性 | <code>inputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputTokens` | 属性 | <code>outputTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalTokens` | 属性 | <code>totalTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `KvCacheProvider`

Kv Cache Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { KvCacheProvider } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface KvCacheProvider {
    get(ref: KvCacheRef): Promise<unknown | null>;
    put(ref: KvCacheRef, value: unknown): Promise<void>;
    invalidate(ref: KvCacheRef, reason: string): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(ref: KvCacheRef, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(ref: KvCacheRef, value: unknown): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `KvCacheRef`

Kv Cache Ref 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { KvCacheRef } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface KvCacheRef {
    id: string;
    provider: string;
    modelAlias: string;
    scope: KvCacheScope;
    cacheScope?: InferenceCacheScope;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: KvCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `KvCacheWritePolicy`

Kv Cache Write Policy 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { KvCacheWritePolicy } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface KvCacheWritePolicy {
    ref: KvCacheRef;
    value?: unknown;
    mode?: KvCacheWriteMode;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode?: KvCacheWriteMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ref` | 属性 | <code>ref: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PlasmodCacheMetadata`

Plasmod Cache Metadata 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PlasmodCacheMetadata } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PlasmodCacheMetadata {
    segmentId: string;
    contentHash: string;
    backendId: string;
    modelAlias: string;
    scope: PrefixSegmentScope;
    tokenCount?: number;
    reused: boolean;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backendId` | 属性 | <code>backendId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: PrefixSegmentScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `segmentId` | 属性 | <code>segmentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenCount` | 属性 | <code>tokenCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PlasmodHotLayer`

Plasmod Hot Layer 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PlasmodHotLayer } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PlasmodHotLayer {
    prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult>;
    invalidateSegment(segmentId: string, reason: string): Promise<void>;
    getSessionState(stateId: string): PlasmodSessionState | null;
    getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `getCacheMetadata` | 方法 | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getSessionState` | 方法 | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidateSegment` | 方法 | <code>invalidateSegment(segmentId: string, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `prepare` | 方法 | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PlasmodHotLayerPrepareInput`

Plasmod Hot Layer Prepare Input 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PlasmodHotLayerPrepareInput } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PlasmodHotLayerPrepareInput {
    runId: string;
    stepId: string;
    sessionId?: string;
    agentId?: string;
    modelAlias: string;
    backendId: string;
    cacheScope?: InferenceCacheScope;
    segmentation: PrefixSegmentationResult;
    kvCache?: KvCacheRef;
    resolvedKvCacheValue?: unknown;
    reusePolicy?: PlasmodReusePolicy;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `backendId` | 属性 | <code>backendId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCache` | 属性 | <code>kvCache?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reusePolicy` | 属性 | <code>reusePolicy?: PlasmodReusePolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `segmentation` | 属性 | <code>segmentation: PrefixSegmentationResult</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PlasmodHotLayerPrepareResult`

Plasmod Hot Layer Prepare Result 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PlasmodHotLayerPrepareResult } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PlasmodHotLayerPrepareResult {
    prefixRefs: PrefixCacheRef[];
    kvCacheRef?: KvCacheRef;
    physicalKvCache?: unknown;
    reusedSegmentIds: string[];
    invalidatedSegmentIds: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `invalidatedSegmentIds` | 属性 | <code>invalidatedSegmentIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheRef` | 属性 | <code>kvCacheRef?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `physicalKvCache` | 属性 | <code>physicalKvCache?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixRefs` | 属性 | <code>prefixRefs: PrefixCacheRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reusedSegmentIds` | 属性 | <code>reusedSegmentIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PlasmodReusePolicy`

Plasmod Reuse Policy 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PlasmodReusePolicy } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PlasmodReusePolicy {
    allowCrossSession?: boolean;
    allowCrossAgent?: boolean;
    minTokenCount?: number;
    requireExactHash?: boolean;
    maxPrefixRefs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowCrossAgent` | 属性 | <code>allowCrossAgent?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowCrossSession` | 属性 | <code>allowCrossSession?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxPrefixRefs` | 属性 | <code>maxPrefixRefs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `minTokenCount` | 属性 | <code>minTokenCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requireExactHash` | 属性 | <code>requireExactHash?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PlasmodSessionState`

Plasmod Session State 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PlasmodSessionState } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PlasmodSessionState {
    id: string;
    sessionId?: string;
    runId: string;
    agentId?: string;
    modelAlias: string;
    backendId: string;
    prefixRefs: PrefixCacheRef[];
    kvCacheRef?: KvCacheRef;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `backendId` | 属性 | <code>backendId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCacheRef` | 属性 | <code>kvCacheRef?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixRefs` | 属性 | <code>prefixRefs: PrefixCacheRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PrefixCacheProvider`

Prefix Cache Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixCacheProvider } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PrefixCacheProvider {
    get(ref: PrefixCacheRef): Promise<string | null>;
    put(ref: PrefixCacheRef, content: string): Promise<void>;
    invalidate(ref: PrefixCacheRef, reason: string): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(ref: PrefixCacheRef, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(ref: PrefixCacheRef, content: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PrefixCacheRef`

Prefix Cache Ref 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixCacheRef } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PrefixCacheRef {
    id: string;
    version: string;
    contentHash: string;
    tokenCount?: number;
    cacheScope?: InferenceCacheScope;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenCount` | 属性 | <code>tokenCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PrefixSegment`

Prefix Segment 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixSegment } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PrefixSegment {
    id: string;
    kind: PrefixSegmentKind;
    scope: PrefixSegmentScope;
    content: string;
    contentHash: string;
    tokenCount?: number;
    cacheable: boolean;
    dependencies?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheable` | 属性 | <code>cacheable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencies` | 属性 | <code>dependencies?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kind` | 属性 | <code>kind: PrefixSegmentKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: PrefixSegmentScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenCount` | 属性 | <code>tokenCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PrefixSegmentationResult`

Prefix Segmentation Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixSegmentationResult } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PrefixSegmentationResult {
    compiled: CompiledPrompt;
    segments: PrefixSegment[];
    stablePrefix: string;
    dynamicPrompt: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compiled` | 属性 | <code>compiled: CompiledPrompt</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dynamicPrompt` | 属性 | <code>dynamicPrompt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `segments` | 属性 | <code>segments: PrefixSegment[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stablePrefix` | 属性 | <code>stablePrefix: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PrefixSegmenter`

Prefix Segmenter 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixSegmenter } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PrefixSegmenter {
    segment(prompt: CompiledPrompt): Promise<PrefixSegmentationResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `segment` | 方法 | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PromptCompileInput`

Prompt Compile Input 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptCompileInput } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PromptCompileInput<TInput = unknown> {
    runId: string;
    stepId: string;
    sessionId?: string;
    agentId?: string;
    modelAlias: string;
    instructions?: string;
    messages?: PromptMessage[];
    input: TInput;
    context?: Record<string, unknown>;
    resolvedPrefixContent?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages?: PromptMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedPrefixContent` | 属性 | <code>resolvedPrefixContent?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PromptCompiler`

Prompt Compiler 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptCompiler } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PromptCompiler {
    compile<TInput = unknown>(input: PromptCompileInput<TInput>): Promise<CompiledPrompt>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PromptMessage`

Prompt Message 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PromptMessage } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export interface PromptMessage {
    role: PromptRole;
    content: string;
    name?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: PromptRole</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceBackendKind`

Inference Backend Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { InferenceBackendKind } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type InferenceBackendKind = 'ollama' | 'sglang' | 'vllm' | 'llama.cpp' | 'openai-api';
```

## `InferenceCacheMissReason`

Inference Cache Miss Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { InferenceCacheMissReason } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type InferenceCacheMissReason = 'missing' | 'expired' | 'not_configured' | 'error';
```

## `KvCacheScope`

Kv Cache Scope 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { KvCacheScope } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type KvCacheScope = 'run' | 'session' | 'workspace';
```

## `KvCacheWriteMode`

Kv Cache Write Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { KvCacheWriteMode } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type KvCacheWriteMode = 'write_through' | 'write_if_missing' | 'refresh';
```

## `PrefixSegmentKind`

Prefix Segment Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PrefixSegmentKind } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type PrefixSegmentKind = 'system' | 'developer' | 'context' | 'memory' | 'tool' | 'user' | 'assistant';
```

## `PrefixSegmentScope`

Prefix Segment Scope 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PrefixSegmentScope } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type PrefixSegmentScope = 'global' | 'agent' | 'session' | 'run' | 'dynamic';
```

## `PromptRole`

Prompt Role 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { PromptRole } from '@codesoul-co/hypha-inference';`
- 源码模块: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### 声明

```text
export type PromptRole = 'system' | 'developer' | 'user' | 'assistant' | 'tool' | 'context' | 'memory';
```
