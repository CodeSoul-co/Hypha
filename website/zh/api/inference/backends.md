# `@codesoul-co/hypha-inference` / `backends`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/backends.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)
- 导出数: **11**

## 模块用法

用于使用该功能边界的公共契约与操作。Backends 模块公开 7 类、1 函数、3 接口。

### 从包入口导入

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

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 7 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FetchInferenceBackendTransport` | 类 | <code>new FetchInferenceBackendTransport(): FetchInferenceBackendTransport</code> | Fetch Inference Backend Transport 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InferenceBackendRegistry` | 类 | <code>new InferenceBackendRegistry(defaultBackendId?: string): InferenceBackendRegistry</code> | Inference Backend Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LlamaCppInferenceBackend` | 类 | <code>new LlamaCppInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | Llama Cpp Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `OllamaInferenceBackend` | 类 | <code>new OllamaInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | Ollama Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `OpenAIAPIInferenceBackend` | 类 | <code>new OpenAIAPIInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | Open AIAPI Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SGLangInferenceBackend` | 类 | <code>new SGLangInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | SG Lang Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `VLLMInferenceBackend` | 类 | <code>new VLLMInferenceBackend(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | VLLM Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createDefaultInferenceBackendRegistry` | 函数 | <code>createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry</code> | Create Default Inference Backend Registry 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `DefaultInferenceBackendRegistryOptions` | 接口 | <code>interface DefaultInferenceBackendRegistryOptions</code> | Default Inference Backend Registry Options 接口，共包含 6 个公开字段或方法。 |
| `HttpInferenceBackendConfig` | 接口 | <code>interface HttpInferenceBackendConfig</code> | Http Inference Backend Config 接口，共包含 8 个公开字段或方法。 |
| `InferenceBackendTransport` | 接口 | <code>interface InferenceBackendTransport</code> | Inference Backend Transport 接口，共包含 2 个公开字段或方法。 |

## `FetchInferenceBackendTransport`

Fetch Inference Backend Transport 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FetchInferenceBackendTransport } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare class FetchInferenceBackendTransport implements InferenceBackendTransport {
    postJson<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamJson<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): AsyncIterable<TResponse>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): FetchInferenceBackendTransport</code> | 创建该类的实例。 |
| `postJson` | 方法 | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `streamJson` | 方法 | <code>streamJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InferenceBackendRegistry`

Inference Backend Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InferenceBackendRegistry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(defaultBackendId?: string): InferenceBackendRegistry</code> | 创建该类的实例。 |
| `default` | 方法 | <code>default(): InferenceBackend</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(id: string): InferenceBackend &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): InferenceBackendRegistryEntry[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(backend: InferenceBackend, options?: { default?: boolean; }): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `require` | 方法 | <code>require(id: string): InferenceBackend</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LlamaCppInferenceBackend`

Llama Cpp Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LlamaCppInferenceBackend } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare class LlamaCppInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): LlamaCppInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: InferenceBackendKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OllamaInferenceBackend`

Ollama Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { OllamaInferenceBackend } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare class OllamaInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OllamaInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: InferenceBackendKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OpenAIAPIInferenceBackend`

Open AIAPI Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { OpenAIAPIInferenceBackend } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare class OpenAIAPIInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): OpenAIAPIInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: InferenceBackendKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SGLangInferenceBackend`

SG Lang Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SGLangInferenceBackend } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare class SGLangInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): SGLangInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: InferenceBackendKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `VLLMInferenceBackend`

VLLM Inference Backend 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { VLLMInferenceBackend } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare class VLLMInferenceBackend extends HttpInferenceBackend {
    constructor(config?: Partial<HttpInferenceBackendConfig>);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): InferenceBackendCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config?: Partial&lt;HttpInferenceBackendConfig&gt;): VLLMInferenceBackend</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceBackendRequest): Promise&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `kind` | 属性 | <code>readonly kind: InferenceBackendKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: InferenceBackendRequest): AsyncIterable&lt;InferenceBackendResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createDefaultInferenceBackendRegistry`

Create Default Inference Backend Registry 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createDefaultInferenceBackendRegistry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export declare function createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry;
```

### 调用签名

```text
createDefaultInferenceBackendRegistry(options?: DefaultInferenceBackendRegistryOptions): InferenceBackendRegistry
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>DefaultInferenceBackendRegistryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `InferenceBackendRegistry`
- 说明: 返回值契约由上述类型定义。

## `DefaultInferenceBackendRegistryOptions`

Default Inference Backend Registry Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultInferenceBackendRegistryOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultBackendId` | 属性 | <code>defaultBackendId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `llamaCpp` | 属性 | <code>llamaCpp?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ollama` | 属性 | <code>ollama?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `openaiApi` | 属性 | <code>openaiApi?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sglang` | 属性 | <code>sglang?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `vllm` | 属性 | <code>vllm?: Partial&lt;HttpInferenceBackendConfig&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `HttpInferenceBackendConfig`

Http Inference Backend Config 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HttpInferenceBackendConfig } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilities` | 属性 | <code>capabilities?: Partial&lt;InferenceBackendCapabilities&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `endpoint` | 属性 | <code>endpoint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transport` | 属性 | <code>transport?: InferenceBackendTransport</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceBackendTransport`

Inference Backend Transport 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceBackendTransport } from '@codesoul-co/hypha-inference';`
- 源码模块: [`backends`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts)

### 声明

```text
export interface InferenceBackendTransport {
    postJson<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamJson?<TResponse = unknown>(url: string, body: unknown, headers?: Record<string, string>, timeoutMs?: number): AsyncIterable<TResponse>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `postJson` | 方法 | <code>postJson&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `streamJson` | 方法 | <code>streamJson?&lt;TResponse = unknown&gt;(url: string, body: unknown, headers?: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
