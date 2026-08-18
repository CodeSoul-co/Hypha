# `@codesoul-co/hypha-inference` / `backends`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/backends.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)
- Exports: **11**

## Using this module

Use the Backends module for using the public contracts and operations for this capability boundary. It exports 7 classes, 1 function, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  FetchInferenceBackendTransport,
  InferenceBackendRegistry,
  LlamaCppInferenceBackend,
  OllamaInferenceBackend,
  OpenAIAPIInferenceBackend,
  SGLangInferenceBackend,
  VLLMInferenceBackend,
  createDefaultInferenceBackendRegistry,
} from '@codesoul-co/hypha-inference';

import type {
  DefaultInferenceBackendRegistryOptions,
  HttpInferenceBackendConfig,
  InferenceBackendTransport,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 7 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FetchInferenceBackendTransport` | class | <code>new FetchInferenceBackendTransport(): FetchInferenceBackendTransport</code> | Fetch Inference Backend Transport class with 3 public constructor or member entries; its exact declarations are listed below. |
| `InferenceBackendRegistry` | class | <code>new InferenceBackendRegistry(defaultBackendId?: string): InferenceBackendRegistry</code> | Inference Backend Registry class with 6 public constructor or member entries; its exact declarations are listed below. |
| `LlamaCppInferenceBackend` | class | <code>new LlamaCppInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | Llama Cpp Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below. |
| `OllamaInferenceBackend` | class | <code>new OllamaInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | Ollama Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below. |
| `OpenAIAPIInferenceBackend` | class | <code>new OpenAIAPIInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | Open AIAPI Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below. |
| `SGLangInferenceBackend` | class | <code>new SGLangInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | SG Lang Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below. |
| `VLLMInferenceBackend` | class | <code>new VLLMInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | VLLM Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below. |
| `createDefaultInferenceBackendRegistry` | function | <code>createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry</code> | Create Default Inference Backend Registry function with 1 public call signature; parameters and return types are listed below. |
| `DefaultInferenceBackendRegistryOptions` | interface | <code>interface DefaultInferenceBackendRegistryOptions</code> | Default Inference Backend Registry Options interface with 6 public fields or methods. |
| `HttpInferenceBackendConfig` | interface | <code>interface HttpInferenceBackendConfig</code> | Http Inference Backend Config interface with 8 public fields or methods. |
| `InferenceBackendTransport` | interface | <code>interface InferenceBackendTransport</code> | Inference Backend Transport interface with 2 public fields or methods. |

## `FetchInferenceBackendTransport`

Fetch Inference Backend Transport class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FetchInferenceBackendTransport } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class FetchInferenceBackendTransport implements InferenceBackendTransport {
    postJson<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamJson<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): AsyncIterable<TResponse>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): FetchInferenceBackendTransport</code> | Creates an instance of this class. |
| `postJson` | method | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `streamJson` | method | <code>streamJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InferenceBackendRegistry`

Inference Backend Registry class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InferenceBackendRegistry } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class InferenceBackendRegistry {
    constructor(defaultBackendId?: string);
    register(backend: InferenceBackend, options?: {
            default?: boolean;
        }): void;
    get(id: string): InferenceBackend | null;
    require(id: string): InferenceBackend;
    default(): InferenceBackend;
    list(): InferenceBackendRegistryEntry[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(defaultBackendId?: string): InferenceBackendRegistry</code> | Creates an instance of this class. |
| `default` | method | <code>default(): InferenceBackend</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(id: string): InferenceBackend &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): InferenceBackendRegistryEntry[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(backend: InferenceBackend, options?: { default?: boolean; }): void</code> | Public method; parameters and return type are shown in the signature. |
| `require` | method | <code>require(id: string): InferenceBackend</code> | Public method; parameters and return type are shown in the signature. |

## `LlamaCppInferenceBackend`

Llama Cpp Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LlamaCppInferenceBackend } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class LlamaCppInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>readonly kind: InferenceBackendKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OllamaInferenceBackend`

Ollama Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { OllamaInferenceBackend } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class OllamaInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>readonly kind: InferenceBackendKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OpenAIAPIInferenceBackend`

Open AIAPI Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { OpenAIAPIInferenceBackend } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class OpenAIAPIInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>readonly kind: InferenceBackendKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SGLangInferenceBackend`

SG Lang Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SGLangInferenceBackend } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class SGLangInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>readonly kind: InferenceBackendKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `VLLMInferenceBackend`

VLLM Inference Backend class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { VLLMInferenceBackend } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare class VLLMInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): InferenceBackendCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>readonly kind: InferenceBackendKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createDefaultInferenceBackendRegistry`

Create Default Inference Backend Registry function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createDefaultInferenceBackendRegistry } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export declare function createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry;
```

### Call signature

```text
createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>DefaultInferenceBackendRegistryOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `InferenceBackendRegistry`
- Description: The return contract is defined by the type shown above.

## `DefaultInferenceBackendRegistryOptions`

Default Inference Backend Registry Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { DefaultInferenceBackendRegistryOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export interface DefaultInferenceBackendRegistryOptions {
    defaultBackendId?: string;
    ollama?: Partial<HttpInferenceBackendConfig>;
    sglang?: Partial<HttpInferenceBackendConfig>;
    vllm?: Partial<HttpInferenceBackendConfig>;
    llamaCpp?: Partial<HttpInferenceBackendConfig>;
    openaiApi?: Partial<HttpInferenceBackendConfig>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultBackendId` | property | <code>defaultBackendId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `llamaCpp` | property | <code>llamaCpp?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ollama` | property | <code>ollama?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `openaiApi` | property | <code>openaiApi?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sglang` | property | <code>sglang?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `vllm` | property | <code>vllm?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HttpInferenceBackendConfig`

Http Inference Backend Config interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { HttpInferenceBackendConfig } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export interface HttpInferenceBackendConfig {
    id?: string;
    baseUrl: string;
    endpoint: string;
    apiKey?: string;
    apiKeyEnv?: string;
    timeoutMs?: number;
    transport?: InferenceBackendTransport;
    capabilities?: Partial<InferenceBackendCapabilities>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `apiKeyEnv` | property | <code>apiKeyEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilities` | property | <code>capabilities?: Partial&lt;InferenceBackendCapabilities&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `endpoint` | property | <code>endpoint: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transport` | property | <code>transport?: InferenceBackendTransport</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceBackendTransport`

Inference Backend Transport interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InferenceBackendTransport } from '@codesoul-co/hypha-inference';`
- Source module: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### Declaration

```text
export interface InferenceBackendTransport {
    postJson<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamJson?<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): AsyncIterable<TResponse>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `postJson` | method | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `streamJson` | method | <code>streamJson?&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
