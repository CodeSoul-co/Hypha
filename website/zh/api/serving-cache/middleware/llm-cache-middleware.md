# `@codesoul-co/hypha-serving-cache` / `middleware/llm-cache-middleware`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/middleware/llm-cache-middleware.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)
- 导出数: **3**

## 模块用法

用于读写或协调缓存状态。Llm cache middleware 模块公开 1 类、2 函数。

### 从包入口导入

```ts
import {
  CachedLLMProvider,
  requestHashForModelRequest,
  servingCacheResponseMetadata,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CachedLLMProvider` | 类 | <code>new CachedLLMProvider(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | Cached LLM Provider 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `requestHashForModelRequest` | 函数 | <code>requestHashForModelRequest(request: ModelRequest): string</code> | Request Hash For Model Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `servingCacheResponseMetadata` | 函数 | <code>servingCacheResponseMetadata(response: ModelResponse): Record&lt;string, unknown&gt; &#124; undefined</code> | Serving Cache Response Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `CachedLLMProvider`

Cached LLM Provider 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { CachedLLMProvider } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`middleware/llm-cache-middleware`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ReturnType&lt;ModelProvider["capabilities"]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(inner: ModelProvider&lt;ModelRequest, ModelResponse&gt;, cache: ServingCacheManager, options?: CachedLLMProviderOptions): CachedLLMProvider</code> | 创建该类的实例。 |
| `countTokens` | 方法 | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `requestHashForModelRequest`

Request Hash For Model Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { requestHashForModelRequest } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`middleware/llm-cache-middleware`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)

### 声明

```text
export declare function requestHashForModelRequest(request: ModelRequest): string;
```

### 调用签名

```text
requestHashForModelRequest(request: ModelRequest): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>ModelRequest&lt;unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `servingCacheResponseMetadata`

Serving Cache Response Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { servingCacheResponseMetadata } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`middleware/llm-cache-middleware`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts)

### 声明

```text
export declare function servingCacheResponseMetadata(response: ModelResponse): Record<string, unknown> | undefined;
```

### 调用签名

```text
servingCacheResponseMetadata(response: ModelResponse): Record<string, unknown> | undefined
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `response` | <code>ModelResponse&lt;string&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Record<string, unknown>`
- 说明: 返回值契约由上述类型定义。
