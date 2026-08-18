# `@codesoul-co/hypha-models` / `router`

- 包索引: [`@codesoul-co/hypha-models`](/zh/api/models)
- 源码: [`packages/models/src/router.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)
- 导出数: **10**

## 模块用法

用于使用该功能边界的公共契约与操作。Router 模块公开 3 类、2 函数、4 接口、1 类型。

### 从包入口导入

```ts
import {
  ModelAliasRegistry,
  ModelProviderError,
  ModelRouter,
  normalizeModelProviderError,
  parseModelTarget,
} from '@codesoul-co/hypha-models';

import type {
  ModelProviderErrorInit,
  ModelRouterOptions,
  NormalizedProviderErrorContext,
  ResolvedModelRoute,
  ModelProviderErrorCode,
} from '@codesoul-co/hypha-models';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 3 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ModelAliasRegistry` | 类 | <code>new ModelAliasRegistry(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | Model Alias Registry 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ModelProviderError` | 类 | <code>new ModelProviderError(init: ModelProviderErrorInit): ModelProviderError</code> | Model Provider Error 类，共公开 15 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ModelRouter` | 类 | <code>new ModelRouter(options: ModelRouterOptions): ModelRouter</code> | Model Router 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `normalizeModelProviderError` | 函数 | <code>normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError</code> | Normalize Model Provider Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `parseModelTarget` | 函数 | <code>parseModelTarget(target: string): Pick&lt;ResolvedModelRoute, "providerId" &#124; "providerModel"&gt; &#124; null</code> | Parse Model Target 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ModelProviderErrorInit` | 接口 | <code>interface ModelProviderErrorInit</code> | Model Provider Error Init 接口，共包含 8 个公开字段或方法。 |
| `ModelRouterOptions` | 接口 | <code>interface ModelRouterOptions</code> | Model Router Options 接口，共包含 5 个公开字段或方法。 |
| `NormalizedProviderErrorContext` | 接口 | <code>interface NormalizedProviderErrorContext</code> | Normalized Provider Error Context 接口，共包含 3 个公开字段或方法。 |
| `ResolvedModelRoute` | 接口 | <code>interface ResolvedModelRoute</code> | Resolved Model Route 接口，共包含 4 个公开字段或方法。 |
| `ModelProviderErrorCode` | 类型 | <code>type ModelProviderErrorCode = 'MODEL_PROVIDER_ERROR' &#124; 'MODEL_PROVIDER_HTTP_ERROR' &#124; 'MODEL_PROVIDER_TIMEOUT' &#124; 'MODEL_PROVIDER_RATE_LIMITED' &#124; 'MODEL_PROVIDER_AUTH_FAILED' &#124; 'MODEL_PROVIDER_BAD_REQUEST' &#124; 'MODEL_PROVIDER_STREAM_ERROR' &#124; 'MODEL_PROVIDER_NOT_FOUND' &#124; 'MODEL_ALIAS_NOT_FOUND' &#124; 'MODEL_ROUTING_FAILED'</code> | Model Provider Error Code 公共类型别名；完整类型表达式见声明。 |

## `ModelAliasRegistry`

Model Alias Registry 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ModelAliasRegistry } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export declare class ModelAliasRegistry {
    constructor(aliases?: ModelAliasSpec[]);
    register(alias: ModelAliasSpec): void;
    registerTarget(alias: string, target: string, version?: string): ModelAliasSpec;
    resolve(aliasOrTarget: string): ResolvedModelRoute;
    list(): ModelAliasSpec[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(aliases?: ModelAliasSpec[]): ModelAliasRegistry</code> | 创建该类的实例。 |
| `list` | 方法 | <code>list(): ModelAliasSpec[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(alias: ModelAliasSpec): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerTarget` | 方法 | <code>registerTarget(alias: string, target: string, version?: string): ModelAliasSpec</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ModelProviderError`

Model Provider Error 类，共公开 15 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ModelProviderError } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export declare class ModelProviderError extends FrameworkError {
    readonly code: ModelProviderErrorCode;
    readonly providerId?: string;
    readonly modelAlias?: string;
    readonly status?: number;
    readonly retryable: boolean;
    readonly raw?: unknown;
    constructor(init: ModelProviderErrorInit);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>readonly cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: ModelProviderErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(init: ModelProviderErrorInit): ModelProviderError</code> | 创建该类的实例。 |
| `context` | 属性 | <code>readonly context?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>readonly modelAlias?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>readonly providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `raw` | 属性 | <code>readonly raw?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>readonly retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `status` | 属性 | <code>readonly status?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelRouter`

Model Router 类，共公开 7 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ModelRouter } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export declare class ModelRouter implements ModelProvider<ModelRequest, ModelResponse> {
    readonly id: string;
    constructor(options: ModelRouterOptions);
    capabilities(): ModelCapabilities;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
    resolve(aliasOrTarget: string): ResolvedModelRoute;
    listAliases(): ModelAliasSpec[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 方法 | <code>capabilities(): ModelCapabilities</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: ModelRouterOptions): ModelRouter</code> | 创建该类的实例。 |
| `generate` | 方法 | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `listAliases` | 方法 | <code>listAliases(): ModelAliasSpec[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(aliasOrTarget: string): ResolvedModelRoute</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `normalizeModelProviderError`

Normalize Model Provider Error 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { normalizeModelProviderError } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export declare function normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError;
```

### 调用签名

```text
normalizeModelProviderError(error: unknown, context?: NormalizedProviderErrorContext): ModelProviderError
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `context` | <code>NormalizedProviderErrorContext</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ModelProviderError`
- 说明: 返回值契约由上述类型定义。

## `parseModelTarget`

Parse Model Target 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseModelTarget } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export declare function parseModelTarget(target: string): Pick<ResolvedModelRoute, 'providerId' | 'providerModel'> | null;
```

### 调用签名

```text
parseModelTarget(target: string): Pick<ResolvedModelRoute, "providerId" | "providerModel"> | null
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `target` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Pick<ResolvedModelRoute, "providerId" | "providerModel">`
- 说明: 返回值契约由上述类型定义。

## `ModelProviderErrorInit`

Model Provider Error Init 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelProviderErrorInit } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export interface ModelProviderErrorInit {
    code: ModelProviderErrorCode;
    message: string;
    providerId?: string;
    modelAlias?: string;
    status?: number;
    retryable?: boolean;
    raw?: unknown;
    cause?: unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: ModelProviderErrorCode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `raw` | 属性 | <code>raw?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelRouterOptions`

Model Router Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ModelRouterOptions } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export interface ModelRouterOptions {
    id?: string;
    registry: Pick<ModelRegistry, 'get' | 'list'>;
    aliases?: ModelAliasSpec[];
    routing?: ModelRoutingSpec;
    fallbackAliases?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aliases` | 属性 | <code>aliases?: ModelAliasSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fallbackAliases` | 属性 | <code>fallbackAliases?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `registry` | 属性 | <code>registry: Pick&lt;ModelRegistry, "list" &#124; "get"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `routing` | 属性 | <code>routing?: ModelRoutingSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `NormalizedProviderErrorContext`

Normalized Provider Error Context 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { NormalizedProviderErrorContext } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export interface NormalizedProviderErrorContext {
    providerId?: string;
    modelAlias?: string;
    operation?: 'generate' | 'stream' | 'count_tokens' | 'health';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `modelAlias` | 属性 | <code>modelAlias?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>operation?: "generate" &#124; "stream" &#124; "count_tokens" &#124; "health"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResolvedModelRoute`

Resolved Model Route 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedModelRoute } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export interface ResolvedModelRoute {
    alias: string;
    providerId: string;
    providerModel: string;
    spec?: ModelAliasSpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `alias` | 属性 | <code>alias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerModel` | 属性 | <code>providerModel: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec?: ModelAliasSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ModelProviderErrorCode`

Model Provider Error Code 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ModelProviderErrorCode } from '@codesoul-co/hypha-models';`
- 源码模块: [`router`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts)

### 声明

```text
export type ModelProviderErrorCode = 'MODEL_PROVIDER_ERROR' | 'MODEL_PROVIDER_HTTP_ERROR' | 'MODEL_PROVIDER_TIMEOUT' | 'MODEL_PROVIDER_RATE_LIMITED' | 'MODEL_PROVIDER_AUTH_FAILED' | 'MODEL_PROVIDER_BAD_REQUEST' | 'MODEL_PROVIDER_STREAM_ERROR' | 'MODEL_PROVIDER_NOT_FOUND' | 'MODEL_ALIAS_NOT_FOUND' | 'MODEL_ROUTING_FAILED';
```
