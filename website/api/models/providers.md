# `@codesoul-co/hypha-models` / `providers`

- Package index: [`@codesoul-co/hypha-models`](/api/models)
- Source: [`packages/models/src/providers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)
- Exports: **9**

## Using this module

Use the Providers module for binding external or local providers to Hypha ports. It exports 3 classes, 3 functions, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  FetchModelTransport,
  OpenAICompatibleModelProvider,
  OpenAIModelProvider,
  createDeepSeekProvider,
  normalizeOpenAIChatResponse,
  providerSpecFromConfig,
} from '@codesoul-co/hypha-models';

import type {
  ModelTransport,
  OpenAIChatCompletionResponse,
  OpenAICompatibleProviderConfig,
} from '@codesoul-co/hypha-models';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FetchModelTransport` | class | <code>new FetchModelTransport(): FetchModelTransport</code> | Fetch Model Transport class with 3 public constructor or member entries; its exact declarations are listed below. |
| `OpenAICompatibleModelProvider` | class | <code>new OpenAICompatibleModelProvider(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | Open AI Compatible Model Provider class with 5 public constructor or member entries; its exact declarations are listed below. |
| `OpenAIModelProvider` | class | <code>new OpenAIModelProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | Open AI Model Provider class with 5 public constructor or member entries; its exact declarations are listed below. |
| `createDeepSeekProvider` | function | <code>createDeepSeekProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAICompatibleModelProvider</code> | Create Deep Seek Provider function with 1 public call signature; parameters and return types are listed below. |
| `normalizeOpenAIChatResponse` | function | <code>normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse</code> | Normalize Open AI Chat Response function with 1 public call signature; parameters and return types are listed below. |
| `providerSpecFromConfig` | function | <code>providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec</code> | Provider Spec From Config function with 1 public call signature; parameters and return types are listed below. |
| `ModelTransport` | interface | <code>interface ModelTransport</code> | Model Transport interface with 2 public fields or methods. |
| `OpenAIChatCompletionResponse` | interface | <code>interface OpenAIChatCompletionResponse</code> | Open AI Chat Completion Response interface with 4 public fields or methods. |
| `OpenAICompatibleProviderConfig` | interface | <code>interface OpenAICompatibleProviderConfig</code> | Open AI Compatible Provider Config interface with 9 public fields or methods. |

## `FetchModelTransport`

Fetch Model Transport class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FetchModelTransport } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export declare class FetchModelTransport implements ModelTransport {
    postJson<TResponse>(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamSse(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): AsyncIterable<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): FetchModelTransport</code> | Creates an instance of this class. |
| `postJson` | method | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `streamSse` | method | <code>streamSse(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OpenAICompatibleModelProvider`

Open AI Compatible Model Provider class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { OpenAICompatibleModelProvider } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export declare class OpenAICompatibleModelProvider implements ModelProvider<ModelRequest, ModelResponse> {
    readonly id: string;
    constructor(config: OpenAICompatibleProviderConfig);
    capabilities(): ModelCapabilities;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OpenAIModelProvider`

Open AI Model Provider class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { OpenAIModelProvider } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export declare class OpenAIModelProvider extends OpenAICompatibleModelProvider {
    constructor(config: Omit<OpenAICompatibleProviderConfig, 'type' | 'baseUrl'> & {
            baseUrl?: string;
        });
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | Creates an instance of this class. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createDeepSeekProvider`

Create Deep Seek Provider function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createDeepSeekProvider } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export declare function createDeepSeekProvider(config: Omit<OpenAICompatibleProviderConfig, 'type' | 'baseUrl'> & {
    baseUrl?: string;
}): OpenAICompatibleModelProvider;
```

### Call signature

```text
createDeepSeekProvider(config: Omit<OpenAICompatibleProviderConfig, "type" | "baseUrl"> & { baseUrl?: string; }): OpenAICompatibleModelProvider
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | <code>Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `OpenAICompatibleModelProvider`
- Description: The return contract is defined by the type shown above.

## `normalizeOpenAIChatResponse`

Normalize Open AI Chat Response function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeOpenAIChatResponse } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export declare function normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse;
```

### Call signature

```text
normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `response` | <code>OpenAIChatCompletionResponse</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>OpenAIChatCompletionNormalizationContext</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ModelResponse<string>`
- Description: The return contract is defined by the type shown above.

## `providerSpecFromConfig`

Provider Spec From Config function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { providerSpecFromConfig } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export declare function providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec;
```

### Call signature

```text
providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `config` | <code>OpenAICompatibleProviderConfig</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ModelProviderSpec`
- Description: The return contract is defined by the type shown above.

## `ModelTransport`

Model Transport interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ModelTransport } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export interface ModelTransport {
    postJson<TResponse>(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamSse?(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): AsyncIterable<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `postJson` | method | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `streamSse` | method | <code>streamSse?(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OpenAIChatCompletionResponse`

Open AI Chat Completion Response interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { OpenAIChatCompletionResponse } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export interface OpenAIChatCompletionResponse {
    id: string;
    choices: Array<{
        message?: {
            content?: string | null;
            tool_calls?: Array<{
                id: string;
                function?: {
                    name: string;
                    arguments: string;
                };
            }>;
        };
        finish_reason?: string | null;
    }>;
    usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
        prompt_cache_hit_tokens?: number;
        prompt_cache_miss_tokens?: number;
        prompt_tokens_details?: {
            cached_tokens?: number;
        };
    };
    model?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `choices` | property | <code>choices: { message?: { content?: string &#124; null; tool_calls?: Array&lt;{ id: string; function?: { name: string; arguments: string; }; }&gt;; }; finish_reason?: string &#124; null; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; prompt_cache_hit_tokens?: number; prompt_cache_miss_tokens?: number; prompt_tokens_details?: { cached_tokens?: number; }; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OpenAICompatibleProviderConfig`

Open AI Compatible Provider Config interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { OpenAICompatibleProviderConfig } from '@codesoul-co/hypha-models';`
- Source module: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### Declaration

```text
export interface OpenAICompatibleProviderConfig {
    id: string;
    type: 'openai' | 'openai-compatible';
    baseUrl: string;
    apiKey?: string;
    apiKeyEnv?: string;
    providerModelByAlias: Record<string, string>;
    capabilities?: ModelCapabilities;
    timeoutMs?: number;
    transport?: ModelTransport;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `apiKeyEnv` | property | <code>apiKeyEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilities` | property | <code>capabilities?: ModelCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerModelByAlias` | property | <code>providerModelByAlias: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transport` | property | <code>transport?: ModelTransport</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "openai" &#124; "openai-compatible"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
