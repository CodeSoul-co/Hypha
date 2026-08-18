# `@codesoul-co/hypha-serving-cache` / `middleware/llm-cache-middleware`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/middleware/llm-cache-middleware.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)
- Exports: **3**

## Using this module

Use the Llm cache middleware module for reading, writing, or coordinating cache state. It exports 1 class, 2 functions.

### Import from the package entrypoint

```ts
import {
  CachedLLMProvider,
  requestHashForModelRequest,
  servingCacheResponseMetadata,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CachedLLMProvider` | class | <code>new CachedLLMProvider(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | Cached LLM Provider class with 6 public constructor or member entries; its exact declarations are listed below. |
| `requestHashForModelRequest` | function | <code>requestHashForModelRequest(request: ModelRequest): string</code> | Request Hash For Model Request function with 1 public call signature; parameters and return types are listed below. |
| `servingCacheResponseMetadata` | function | <code>servingCacheResponseMetadata(response: ModelResponse): Record&lt;string, unknown&gt; &#124; undefined</code> | Serving Cache Response Metadata function with 1 public call signature; parameters and return types are listed below. |

## `CachedLLMProvider`

Cached LLM Provider class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { CachedLLMProvider } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`middleware/llm-cache-middleware`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)

### Declaration

```text
export declare class CachedLLMProvider implements ModelProvider<ModelRequest, ModelResponse> {
    readonly id: string;
    constructor(inner: ModelProvider<ModelRequest, ModelResponse>, cache: ServingCacheManager, options?: CachedLLMProviderOptions);
    capabilities(): ReturnType<ModelProvider['capabilities']>;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
    countTokens(input: unknown): Promise<ModelUsage>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ReturnType&lt;ModelProvider["capabilities"]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | Creates an instance of this class. |
| `countTokens` | method | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `requestHashForModelRequest`

Request Hash For Model Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { requestHashForModelRequest } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`middleware/llm-cache-middleware`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)

### Declaration

```text
export declare function requestHashForModelRequest(request: ModelRequest): string;
```

### Call signature

```text
requestHashForModelRequest(request: ModelRequest): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>ModelRequest&lt;unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `servingCacheResponseMetadata`

Serving Cache Response Metadata function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { servingCacheResponseMetadata } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`middleware/llm-cache-middleware`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)

### Declaration

```text
export declare function servingCacheResponseMetadata(response: ModelResponse): Record<string, unknown> | undefined;
```

### Call signature

```text
servingCacheResponseMetadata(response: ModelResponse): Record<string, unknown> | undefined
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `response` | <code>ModelResponse&lt;string&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, unknown>`
- Description: The return contract is defined by the type shown above.
