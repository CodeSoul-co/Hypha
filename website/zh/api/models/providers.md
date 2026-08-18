# `@codesoul-co/hypha-models` / `providers`

- 包索引: [`@codesoul-co/hypha-models`](/zh/api/models)
- 源码: [`packages/models/src/providers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)
- 导出数: **9**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Providers 模块公开 3 类、3 函数、3 接口。

### 从包入口导入

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

### 使用要点

- 3 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FetchModelTransport` | 类 | <code>new FetchModelTransport(): FetchModelTransport</code> | Fetch Model Transport 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `OpenAICompatibleModelProvider` | 类 | <code>new OpenAICompatibleModelProvider(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | Open AI Compatible Model Provider 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `OpenAIModelProvider` | 类 | <code>new OpenAIModelProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | Open AI Model Provider 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createDeepSeekProvider` | 函数 | <code>createDeepSeekProvider(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAICompatibleModelProvider</code> | Create Deep Seek Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `normalizeOpenAIChatResponse` | 函数 | <code>normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse</code> | Normalize Open AI Chat Response 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `providerSpecFromConfig` | 函数 | <code>providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec</code> | Provider Spec From Config 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ModelTransport` | 接口 | <code>interface ModelTransport</code> | Model Transport 接口，共包含 2 个公开字段或方法。 |
| `OpenAIChatCompletionResponse` | 接口 | <code>interface OpenAIChatCompletionResponse</code> | Open AI Chat Completion Response 接口，共包含 4 个公开字段或方法。 |
| `OpenAICompatibleProviderConfig` | 接口 | <code>interface OpenAICompatibleProviderConfig</code> | Open AI Compatible Provider Config 接口，共包含 9 个公开字段或方法。 |

## `FetchModelTransport`

Fetch Model Transport 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { FetchModelTransport } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export declare class FetchModelTransport implements ModelTransport {
    postJson<TResponse>(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamSse(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): AsyncIterable<string>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): FetchModelTransport</code> | 创建该类的实例。 |
| `postJson` | 方法 | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `streamSse` | 方法 | <code>streamSse(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OpenAICompatibleModelProvider`

Open AI Compatible Model Provider 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { OpenAICompatibleModelProvider } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export declare class OpenAICompatibleModelProvider implements ModelProvider<ModelRequest, ModelResponse> {
    readonly id: string;
    constructor(config: OpenAICompatibleProviderConfig);
    capabilities(): ModelCapabilities;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config: OpenAICompatibleProviderConfig): OpenAICompatibleModelProvider</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OpenAIModelProvider`

Open AI Model Provider 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { OpenAIModelProvider } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export declare class OpenAIModelProvider extends OpenAICompatibleModelProvider {
    constructor(config: Omit<OpenAICompatibleProviderConfig, 'type' | 'baseUrl'> & {
            baseUrl?: string;
        });
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(config: Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }): OpenAIModelProvider</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createDeepSeekProvider`

Create Deep Seek Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createDeepSeekProvider } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export declare function createDeepSeekProvider(config: Omit<OpenAICompatibleProviderConfig, 'type' | 'baseUrl'> & {
    baseUrl?: string;
}): OpenAICompatibleModelProvider;
```

### 调用签名

```text
createDeepSeekProvider(config: Omit<OpenAICompatibleProviderConfig, "type" | "baseUrl"> & { baseUrl?: string; }): OpenAICompatibleModelProvider
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `config` | <code>Omit&lt;OpenAICompatibleProviderConfig, "type" &#124; "baseUrl"&gt; &amp; { baseUrl?: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `OpenAICompatibleModelProvider`
- 说明: 返回值契约由上述类型定义。

## `normalizeOpenAIChatResponse`

Normalize Open AI Chat Response 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeOpenAIChatResponse } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export declare function normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse;
```

### 调用签名

```text
normalizeOpenAIChatResponse(response: OpenAIChatCompletionResponse, context?: OpenAIChatCompletionNormalizationContext): ModelResponse
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `response` | <code>OpenAIChatCompletionResponse</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>OpenAIChatCompletionNormalizationContext</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ModelResponse<string>`
- 说明: 返回值契约由上述类型定义。

## `providerSpecFromConfig`

Provider Spec From Config 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { providerSpecFromConfig } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export declare function providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec;
```

### 调用签名

```text
providerSpecFromConfig(config: OpenAICompatibleProviderConfig): ModelProviderSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `config` | <code>OpenAICompatibleProviderConfig</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ModelProviderSpec`
- 说明: 返回值契约由上述类型定义。

## `ModelTransport`

Model Transport 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelTransport } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

```text
export interface ModelTransport {
    postJson<TResponse>(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): Promise<TResponse>;
    streamSse?(url: string, body: unknown, headers: Record<string, string>, timeoutMs?: number): AsyncIterable<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `postJson` | 方法 | <code>postJson&lt;TResponse&gt;(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): Promise&lt;TResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `streamSse` | 方法 | <code>streamSse?(url: string, body: unknown, headers: Record&lt;string, string&gt;, timeoutMs?: number): AsyncIterable&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OpenAIChatCompletionResponse`

Open AI Chat Completion Response 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OpenAIChatCompletionResponse } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `choices` | 属性 | <code>choices: { message?: { content?: string &#124; null; tool_calls?: Array&lt;{ id: string; function?: { name: string; arguments: string; }; }&gt;; }; finish_reason?: string &#124; null; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `model` | 属性 | <code>model?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `usage` | 属性 | <code>usage?: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number; prompt_cache_hit_tokens?: number; prompt_cache_miss_tokens?: number; prompt_tokens_details?: { cached_tokens?: number; }; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OpenAICompatibleProviderConfig`

Open AI Compatible Provider Config 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OpenAICompatibleProviderConfig } from '@codesoul-co/hypha-models';`
- 源码模块: [`providers`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `apiKeyEnv` | 属性 | <code>apiKeyEnv?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilities` | 属性 | <code>capabilities?: ModelCapabilities</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerModelByAlias` | 属性 | <code>providerModelByAlias: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transport` | 属性 | <code>transport?: ModelTransport</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "openai" &#124; "openai-compatible"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
