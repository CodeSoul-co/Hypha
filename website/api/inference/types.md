# `@codesoul-co/hypha-inference` / `types`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/types.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)
- Exports: **41**

## Using this module

Use the Types module for declaring and runtime-validating contracts. It exports 34 interfaces, 7 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 41 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CompiledPrompt` | interface | <code>interface CompiledPrompt</code> | Compiled Prompt interface with 4 public fields or methods. |
| `InferenceBackend` | interface | <code>interface InferenceBackend</code> | Inference Backend interface with 5 public fields or methods. |
| `InferenceBackendCapabilities` | interface | <code>interface InferenceBackendCapabilities</code> | Inference Backend Capabilities interface with 6 public fields or methods. |
| `InferenceBackendRegistryEntry` | interface | <code>interface InferenceBackendRegistryEntry</code> | Inference Backend Registry Entry interface with 3 public fields or methods. |
| `InferenceBackendRequest` | interface | <code>interface InferenceBackendRequest</code> | Inference Backend Request interface with 14 public fields or methods. |
| `InferenceBackendResponse` | interface | <code>interface InferenceBackendResponse</code> | Inference Backend Response interface with 6 public fields or methods. |
| `InferenceCacheIssue` | interface | <code>interface InferenceCacheIssue</code> | Inference Cache Issue interface with 4 public fields or methods. |
| `InferenceCachePolicy` | interface | <code>interface InferenceCachePolicy</code> | Inference Cache Policy interface with 3 public fields or methods. |
| `InferenceCacheScope` | interface | <code>interface InferenceCacheScope</code> | Inference Cache Scope interface with 3 public fields or methods. |
| `InferenceCacheUsage` | interface | <code>interface InferenceCacheUsage</code> | Inference Cache Usage interface with 11 public fields or methods. |
| `InferenceGenerationOptions` | interface | <code>interface InferenceGenerationOptions</code> | Inference Generation Options interface with 9 public fields or methods. |
| `InferenceManagerOptions` | interface | <code>interface InferenceManagerOptions</code> | Inference Manager Options interface with 8 public fields or methods. |
| `InferenceProvider` | interface | <code>interface InferenceProvider</code> | Inference Provider interface with 3 public fields or methods. |
| `InferenceRequest` | interface | <code>interface InferenceRequest</code> | Inference Request interface with 18 public fields or methods. |
| `InferenceResponse` | interface | <code>interface InferenceResponse</code> | Inference Response interface with 7 public fields or methods. |
| `InferenceToolDescriptor` | interface | <code>interface InferenceToolDescriptor</code> | Inference Tool Descriptor interface with 4 public fields or methods. |
| `InferenceUsage` | interface | <code>interface InferenceUsage</code> | Inference Usage interface with 3 public fields or methods. |
| `KvCacheProvider` | interface | <code>interface KvCacheProvider</code> | Kv Cache Provider interface with 3 public fields or methods. |
| `KvCacheRef` | interface | <code>interface KvCacheRef</code> | Kv Cache Ref interface with 7 public fields or methods. |
| `KvCacheWritePolicy` | interface | <code>interface KvCacheWritePolicy</code> | Kv Cache Write Policy interface with 3 public fields or methods. |
| `PlasmodCacheMetadata` | interface | <code>interface PlasmodCacheMetadata</code> | Plasmod Cache Metadata interface with 10 public fields or methods. |
| `PlasmodHotLayer` | interface | <code>interface PlasmodHotLayer</code> | Plasmod Hot Layer interface with 4 public fields or methods. |
| `PlasmodHotLayerPrepareInput` | interface | <code>interface PlasmodHotLayerPrepareInput</code> | Plasmod Hot Layer Prepare Input interface with 12 public fields or methods. |
| `PlasmodHotLayerPrepareResult` | interface | <code>interface PlasmodHotLayerPrepareResult</code> | Plasmod Hot Layer Prepare Result interface with 6 public fields or methods. |
| `PlasmodReusePolicy` | interface | <code>interface PlasmodReusePolicy</code> | Plasmod Reuse Policy interface with 5 public fields or methods. |
| `PlasmodSessionState` | interface | <code>interface PlasmodSessionState</code> | Plasmod Session State interface with 10 public fields or methods. |
| `PrefixCacheProvider` | interface | <code>interface PrefixCacheProvider</code> | Prefix Cache Provider interface with 3 public fields or methods. |
| `PrefixCacheRef` | interface | <code>interface PrefixCacheRef</code> | Prefix Cache Ref interface with 6 public fields or methods. |
| `PrefixSegment` | interface | <code>interface PrefixSegment</code> | Prefix Segment interface with 9 public fields or methods. |
| `PrefixSegmentationResult` | interface | <code>interface PrefixSegmentationResult</code> | Prefix Segmentation Result interface with 5 public fields or methods. |
| `PrefixSegmenter` | interface | <code>interface PrefixSegmenter</code> | Prefix Segmenter interface with 1 public fields or methods. |
| `PromptCompileInput` | interface | <code>interface PromptCompileInput</code> | Prompt Compile Input interface with 11 public fields or methods. |
| `PromptCompiler` | interface | <code>interface PromptCompiler</code> | Prompt Compiler interface with 1 public fields or methods. |
| `PromptMessage` | interface | <code>interface PromptMessage</code> | Prompt Message interface with 4 public fields or methods. |
| `InferenceBackendKind` | type | <code>type InferenceBackendKind = 'ollama' &#124; 'sglang' &#124; 'vllm' &#124; 'llama.cpp' &#124; 'openai-api'</code> | Public type alias for Inference Backend Kind; the declaration contains its complete type expression. |
| `InferenceCacheMissReason` | type | <code>type InferenceCacheMissReason = 'missing' &#124; 'expired' &#124; 'not_configured' &#124; 'error'</code> | Public type alias for Inference Cache Miss Reason; the declaration contains its complete type expression. |
| `KvCacheScope` | type | <code>type KvCacheScope = 'run' &#124; 'session' &#124; 'workspace'</code> | Public type alias for Kv Cache Scope; the declaration contains its complete type expression. |
| `KvCacheWriteMode` | type | <code>type KvCacheWriteMode = 'write_through' &#124; 'write_if_missing' &#124; 'refresh'</code> | Public type alias for Kv Cache Write Mode; the declaration contains its complete type expression. |
| `PrefixSegmentKind` | type | <code>type PrefixSegmentKind = 'system' &#124; 'developer' &#124; 'context' &#124; 'memory' &#124; 'tool' &#124; 'user' &#124; 'assistant'</code> | Public type alias for Prefix Segment Kind; the declaration contains its complete type expression. |
| `PrefixSegmentScope` | type | <code>type PrefixSegmentScope = 'global' &#124; 'agent' &#124; 'session' &#124; 'run' &#124; 'dynamic'</code> | Public type alias for Prefix Segment Scope; the declaration contains its complete type expression. |
| `PromptRole` | type | <code>type PromptRole = 'system' &#124; 'developer' &#124; 'user' &#124; 'assistant' &#124; 'tool' &#124; 'context' &#124; 'memory'</code> | Public type alias for Prompt Role; the declaration contains its complete type expression. |

## `CompiledPrompt`

Compiled Prompt interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { CompiledPrompt } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface CompiledPrompt {
    id: string;
    messages: PromptMessage[];
    text: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: PromptMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceBackend`

Inference Backend interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { InferenceBackend } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceBackend {
    id: string;
    kind: InferenceBackendKind;
    capabilities(): InferenceBackendCapabilities;
    infer(request: InferenceBackendRequest): Promise<InferenceBackendResponse>;
    stream?(request: InferenceBackendRequest): AsyncIterable<InferenceBackendResponse>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>kind: InferenceBackendKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream?(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InferenceBackendCapabilities`

Inference Backend Capabilities interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { InferenceBackendCapabilities } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheInvalidation` | property | <code>cacheInvalidation: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `chatCompletions` | property | <code>chatCompletions: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCaching` | property | <code>kvCaching: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixCaching` | property | <code>prefixCaching: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streaming` | property | <code>streaming: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `textCompletions` | property | <code>textCompletions: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceBackendRegistryEntry`

Inference Backend Registry Entry interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InferenceBackendRegistryEntry } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceBackendRegistryEntry {
    id: string;
    backend: InferenceBackend;
    default?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backend` | property | <code>backend: InferenceBackend</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `default` | property | <code>default?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceBackendRequest`

Inference Backend Request interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { InferenceBackendRequest } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compiledPrompt` | property | <code>compiledPrompt: CompiledPrompt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCache` | property | <code>kvCache?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: InferenceGenerationOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `physicalKvCache` | property | <code>physicalKvCache?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixRefs` | property | <code>prefixRefs: PrefixCacheRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `segmentation` | property | <code>segmentation: PrefixSegmentationResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: InferenceToolDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceBackendResponse`

Inference Backend Response interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { InferenceBackendResponse } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `physicalKvCache` | property | <code>physicalKvCache?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `raw` | property | <code>raw?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage?: InferenceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceCacheIssue`

Inference Cache Issue interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { InferenceCacheIssue } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceCacheIssue {
    operation: 'prefix_read' | 'kv_read' | 'kv_write' | 'invalidate';
    code: string;
    message: string;
    bypassed: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bypassed` | property | <code>bypassed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: "prefix_read" &#124; "kv_read" &#124; "kv_write" &#124; "invalidate"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceCachePolicy`

Inference Cache Policy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InferenceCachePolicy } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceCachePolicy {
    prefix?: PrefixCacheRef;
    kvCache?: KvCacheRef;
    writeKvCache?: KvCacheWritePolicy;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kvCache` | property | <code>kvCache?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefix` | property | <code>prefix?: PrefixCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writeKvCache` | property | <code>writeKvCache?: KvCacheWritePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceCacheScope`

Inference Cache Scope interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InferenceCacheScope } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceCacheScope {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceCacheUsage`

Inference Cache Usage interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { InferenceCacheUsage } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bypassed` | property | <code>bypassed?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issues` | property | <code>issues?: InferenceCacheIssue[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheHit` | property | <code>kvCacheHit?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheMissReason` | property | <code>kvCacheMissReason?: InferenceCacheMissReason</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheRef` | property | <code>kvCacheRef?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheWriteRef` | property | <code>kvCacheWriteRef?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheWritten` | property | <code>kvCacheWritten?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixHit` | property | <code>prefixHit?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixRef` | property | <code>prefixRef?: PrefixCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reusedTokens` | property | <code>reusedTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `servingCache` | property | <code>servingCache?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceGenerationOptions`

Inference Generation Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { InferenceGenerationOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `extra` | property | <code>extra?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTokens` | property | <code>maxTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseFormat` | property | <code>responseFormat?: "text" &#124; "json_object" &#124; { type: string; schema?: unknown; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `seed` | property | <code>seed?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stop` | property | <code>stop?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | property | <code>stream?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `temperature` | property | <code>temperature?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topK` | property | <code>topK?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topP` | property | <code>topP?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceManagerOptions`

Inference Manager Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { InferenceManagerOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheFailureMode` | property | <code>cacheFailureMode?: "strict" &#124; "bypass"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheOperationTimeoutMs` | property | <code>cacheOperationTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCache` | property | <code>kvCache?: KvCacheProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `onRecoveryFailure` | method | <code>onRecoveryFailure?(failure: RecoveryFailure): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixCache` | property | <code>prefixCache?: PrefixCacheProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specRevision` | property | <code>specRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceProvider`

Inference Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InferenceProvider } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceProvider {
    id: string;
    infer(request: InferenceRequest): Promise<InferenceResponse>;
    stream?(request: InferenceRequest): AsyncIterable<InferenceResponse>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream?(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InferenceRequest`

Inference Request interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { InferenceRequest } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `backendId` | property | <code>backendId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cachePolicy` | property | <code>cachePolicy?: InferenceCachePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCache` | property | <code>kvCache?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: InferenceGenerationOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefix` | property | <code>prefix?: PrefixCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedPrefixContent` | property | <code>resolvedPrefixContent?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: InferenceToolDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceResponse`

Inference Response interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { InferenceResponse } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache?: InferenceCacheUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextKvCacheValue` | property | <code>nextKvCacheValue?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `raw` | property | <code>raw?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage?: InferenceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceToolDescriptor`

Inference Tool Descriptor interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { InferenceToolDescriptor } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceToolDescriptor {
    id: string;
    name: string;
    description?: string;
    inputSchema: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceUsage`

Inference Usage interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InferenceUsage } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface InferenceUsage {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `inputTokens` | property | <code>inputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputTokens` | property | <code>outputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalTokens` | property | <code>totalTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `KvCacheProvider`

Kv Cache Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { KvCacheProvider } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface KvCacheProvider {
    get(ref: KvCacheRef): Promise<unknown | null>;
    put(ref: KvCacheRef, value: unknown): Promise<void>;
    invalidate(ref: KvCacheRef, reason: string): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(ref: KvCacheRef, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(ref: KvCacheRef, value: unknown): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `KvCacheRef`

Kv Cache Ref interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { KvCacheRef } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: KvCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `KvCacheWritePolicy`

Kv Cache Write Policy interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { KvCacheWritePolicy } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface KvCacheWritePolicy {
    ref: KvCacheRef;
    value?: unknown;
    mode?: KvCacheWriteMode;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode?: KvCacheWriteMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ref` | property | <code>ref: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PlasmodCacheMetadata`

Plasmod Cache Metadata interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { PlasmodCacheMetadata } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backendId` | property | <code>backendId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: PrefixSegmentScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `segmentId` | property | <code>segmentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenCount` | property | <code>tokenCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PlasmodHotLayer`

Plasmod Hot Layer interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { PlasmodHotLayer } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PlasmodHotLayer {
    prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult>;
    invalidateSegment(segmentId: string, reason: string): Promise<void>;
    getSessionState(stateId: string): PlasmodSessionState | null;
    getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `getCacheMetadata` | method | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `getSessionState` | method | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateSegment` | method | <code>invalidateSegment(segmentId: string, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `prepare` | method | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PlasmodHotLayerPrepareInput`

Plasmod Hot Layer Prepare Input interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { PlasmodHotLayerPrepareInput } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `backendId` | property | <code>backendId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCache` | property | <code>kvCache?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reusePolicy` | property | <code>reusePolicy?: PlasmodReusePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `segmentation` | property | <code>segmentation: PrefixSegmentationResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PlasmodHotLayerPrepareResult`

Plasmod Hot Layer Prepare Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PlasmodHotLayerPrepareResult } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invalidatedSegmentIds` | property | <code>invalidatedSegmentIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheRef` | property | <code>kvCacheRef?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `physicalKvCache` | property | <code>physicalKvCache?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixRefs` | property | <code>prefixRefs: PrefixCacheRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reusedSegmentIds` | property | <code>reusedSegmentIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PlasmodReusePolicy`

Plasmod Reuse Policy interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { PlasmodReusePolicy } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PlasmodReusePolicy {
    allowCrossSession?: boolean;
    allowCrossAgent?: boolean;
    minTokenCount?: number;
    requireExactHash?: boolean;
    maxPrefixRefs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowCrossAgent` | property | <code>allowCrossAgent?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowCrossSession` | property | <code>allowCrossSession?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPrefixRefs` | property | <code>maxPrefixRefs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minTokenCount` | property | <code>minTokenCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requireExactHash` | property | <code>requireExactHash?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PlasmodSessionState`

Plasmod Session State interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { PlasmodSessionState } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `backendId` | property | <code>backendId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheRef` | property | <code>kvCacheRef?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixRefs` | property | <code>prefixRefs: PrefixCacheRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PrefixCacheProvider`

Prefix Cache Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { PrefixCacheProvider } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PrefixCacheProvider {
    get(ref: PrefixCacheRef): Promise<string | null>;
    put(ref: PrefixCacheRef, content: string): Promise<void>;
    invalidate(ref: PrefixCacheRef, reason: string): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(ref: PrefixCacheRef, reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(ref: PrefixCacheRef, content: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PrefixCacheRef`

Prefix Cache Ref interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PrefixCacheRef } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenCount` | property | <code>tokenCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PrefixSegment`

Prefix Segment interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { PrefixSegment } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheable` | property | <code>cacheable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencies` | property | <code>dependencies?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: PrefixSegmentKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: PrefixSegmentScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenCount` | property | <code>tokenCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PrefixSegmentationResult`

Prefix Segmentation Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { PrefixSegmentationResult } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PrefixSegmentationResult {
    compiled: CompiledPrompt;
    segments: PrefixSegment[];
    stablePrefix: string;
    dynamicPrompt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compiled` | property | <code>compiled: CompiledPrompt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dynamicPrompt` | property | <code>dynamicPrompt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `segments` | property | <code>segments: PrefixSegment[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stablePrefix` | property | <code>stablePrefix: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PrefixSegmenter`

Prefix Segmenter interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { PrefixSegmenter } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PrefixSegmenter {
    segment(prompt: CompiledPrompt): Promise<PrefixSegmentationResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `segment` | method | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PromptCompileInput`

Prompt Compile Input interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { PromptCompileInput } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages?: PromptMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedPrefixContent` | property | <code>resolvedPrefixContent?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PromptCompiler`

Prompt Compiler interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { PromptCompiler } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PromptCompiler {
    compile<TInput = unknown>(input: PromptCompileInput<TInput>): Promise<CompiledPrompt>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile&lt;TInput = unknown&gt;(input: PromptCompileInput&lt;TInput&gt;): Promise&lt;CompiledPrompt&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PromptMessage`

Prompt Message interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { PromptMessage } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export interface PromptMessage {
    role: PromptRole;
    content: string;
    name?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: PromptRole</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceBackendKind`

Public type alias for Inference Backend Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { InferenceBackendKind } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type InferenceBackendKind = 'ollama' | 'sglang' | 'vllm' | 'llama.cpp' | 'openai-api';
```

## `InferenceCacheMissReason`

Public type alias for Inference Cache Miss Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { InferenceCacheMissReason } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type InferenceCacheMissReason = 'missing' | 'expired' | 'not_configured' | 'error';
```

## `KvCacheScope`

Public type alias for Kv Cache Scope; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { KvCacheScope } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type KvCacheScope = 'run' | 'session' | 'workspace';
```

## `KvCacheWriteMode`

Public type alias for Kv Cache Write Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { KvCacheWriteMode } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type KvCacheWriteMode = 'write_through' | 'write_if_missing' | 'refresh';
```

## `PrefixSegmentKind`

Public type alias for Prefix Segment Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PrefixSegmentKind } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type PrefixSegmentKind = 'system' | 'developer' | 'context' | 'memory' | 'tool' | 'user' | 'assistant';
```

## `PrefixSegmentScope`

Public type alias for Prefix Segment Scope; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PrefixSegmentScope } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type PrefixSegmentScope = 'global' | 'agent' | 'session' | 'run' | 'dynamic';
```

## `PromptRole`

Public type alias for Prompt Role; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PromptRole } from '@codesoul-co/hypha-inference';`
- Source module: [`types`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts)

### Declaration

```text
export type PromptRole = 'system' | 'developer' | 'user' | 'assistant' | 'tool' | 'context' | 'memory';
```
