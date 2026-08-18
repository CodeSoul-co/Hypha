# `@codesoul-co/hypha-inference` / `cache`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)
- 导出数: **10**

## 模块用法

用于读写或协调缓存状态。Cache 模块公开 2 类、4 函数、3 接口、1 类型。

### 从包入口导入

```ts
import {
  InferenceCacheManager,
  InferenceCacheOperationTimeoutError,
  hashContent,
  inferenceCacheScopeHash,
  isKvCacheExpired,
  runInferenceCacheOperation,
} from '@codesoul-co/hypha-inference';

import type {
  InferenceCacheManagerOptions,
  KvCacheCreateInput,
  PrefixCacheCreateInput,
  InferenceCacheOperation,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 4 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InferenceCacheManager` | 类 | <code>new InferenceCacheManager(options: InferenceCacheManagerOptions): InferenceCacheManager</code> | Inference Cache Manager 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InferenceCacheOperationTimeoutError` | 类 | <code>new InferenceCacheOperationTimeoutError(operation: InferenceCacheOperation, timeoutMs: number): InferenceCacheOperationTimeoutError</code> | Inference Cache Operation Timeout Error 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `hashContent` | 函数 | <code>hashContent(content: string): string</code> | Hash Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `inferenceCacheScopeHash` | 函数 | <code>inferenceCacheScopeHash(scope: InferenceCacheScope &#124; undefined): string</code> | Inference Cache Scope Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isKvCacheExpired` | 函数 | <code>isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean</code> | Is Kv Cache Expired 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `runInferenceCacheOperation` | 函数 | <code>runInferenceCacheOperation&lt;T&gt;(operation: InferenceCacheOperation, task: () =&gt; Promise&lt;T&gt;, timeoutMs: number): Promise&lt;T&gt;</code> | Run Inference Cache Operation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `InferenceCacheManagerOptions` | 接口 | <code>interface InferenceCacheManagerOptions</code> | Inference Cache Manager Options 接口，共包含 4 个公开字段或方法。 |
| `KvCacheCreateInput` | 接口 | <code>interface KvCacheCreateInput</code> | Kv Cache Create Input 接口，共包含 7 个公开字段或方法。 |
| `PrefixCacheCreateInput` | 接口 | <code>interface PrefixCacheCreateInput</code> | Prefix Cache Create Input 接口，共包含 6 个公开字段或方法。 |
| `InferenceCacheOperation` | 类型 | <code>type InferenceCacheOperation = 'prefix_read' &#124; 'prefix_write' &#124; 'kv_read' &#124; 'kv_write' &#124; 'invalidate'</code> | Inference Cache Operation 公共类型别名；完整类型表达式见声明。 |

## `InferenceCacheManager`

Inference Cache Manager 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InferenceCacheManager } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export declare class InferenceCacheManager {
    constructor(options: InferenceCacheManagerOptions);
    putPrefix(input: PrefixCacheCreateInput): Promise<PrefixCacheRef>;
    getPrefix(ref: PrefixCacheRef): Promise<string | null>;
    putKv(input: KvCacheCreateInput, value: unknown): Promise<KvCacheRef>;
    getKv(ref: KvCacheRef): Promise<unknown | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: InferenceCacheManagerOptions): InferenceCacheManager</code> | 创建该类的实例。 |
| `getKv` | 方法 | <code>getKv(ref: KvCacheRef): Promise&lt;unknown &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPrefix` | 方法 | <code>getPrefix(ref: PrefixCacheRef): Promise&lt;string &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `putKv` | 方法 | <code>putKv(input: KvCacheCreateInput, value: unknown): Promise&lt;KvCacheRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `putPrefix` | 方法 | <code>putPrefix(input: PrefixCacheCreateInput): Promise&lt;PrefixCacheRef&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InferenceCacheOperationTimeoutError`

Inference Cache Operation Timeout Error 类，共公开 11 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InferenceCacheOperationTimeoutError } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export declare class InferenceCacheOperationTimeoutError extends Error {
    readonly operation: InferenceCacheOperation;
    readonly timeoutMs: number;
    readonly code = "INFERENCE_CACHE_OPERATION_TIMEOUT";
    constructor(operation: InferenceCacheOperation, timeoutMs: number);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>readonly code: "INFERENCE_CACHE_OPERATION_TIMEOUT"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constructor` | 构造函数 | <code>(operation: InferenceCacheOperation, timeoutMs: number): InferenceCacheOperationTimeoutError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operation` | 属性 | <code>readonly operation: InferenceCacheOperation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stack` | 属性 | <code>stack?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `static captureStackTrace` | 方法 | <code>static captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>static prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | 公开方法；参数与返回类型以签名列为准。 |
| `static stackTraceLimit` | 属性 | <code>static stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |
| `timeoutMs` | 属性 | <code>readonly timeoutMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `hashContent`

Hash Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { hashContent } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export declare function hashContent(content: string): string;
```

### 调用签名

```text
hashContent(content: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `content` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `inferenceCacheScopeHash`

Inference Cache Scope Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { inferenceCacheScopeHash } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export declare function inferenceCacheScopeHash(scope: InferenceCacheScope | undefined): string;
```

### 调用签名

```text
inferenceCacheScopeHash(scope: InferenceCacheScope | undefined): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>InferenceCacheScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `isKvCacheExpired`

Is Kv Cache Expired 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isKvCacheExpired } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export declare function isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean;
```

### 调用签名

```text
isKvCacheExpired(ref: KvCacheRef, now?: Date): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `ref` | <code>KvCacheRef</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>Date</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `runInferenceCacheOperation`

Run Inference Cache Operation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { runInferenceCacheOperation } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export declare function runInferenceCacheOperation<T>(operation: InferenceCacheOperation, task: () => Promise<T>, timeoutMs: number): Promise<T>;
```

### 调用签名

```text
runInferenceCacheOperation<T>(operation: InferenceCacheOperation, task: () => Promise<T>, timeoutMs: number): Promise<T>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `operation` | <code>InferenceCacheOperation</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `task` | <code>() =&gt; Promise&lt;T&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `timeoutMs` | <code>number</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<T>`
- 说明: 返回值契约由上述类型定义。

## `InferenceCacheManagerOptions`

Inference Cache Manager Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InferenceCacheManagerOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export interface InferenceCacheManagerOptions {
    prefixCache: PrefixCacheProvider;
    kvCache: KvCacheProvider;
    now?: () => Date;
    operationTimeoutMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `kvCache` | 属性 | <code>kvCache: KvCacheProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixCache` | 属性 | <code>prefixCache: PrefixCacheProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `KvCacheCreateInput`

Kv Cache Create Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { KvCacheCreateInput } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export interface KvCacheCreateInput {
    id: string;
    provider: string;
    modelAlias: string;
    scope: KvCacheScope;
    cacheScope?: InferenceCacheScope;
    ttlMs?: number;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: KvCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `PrefixCacheCreateInput`

Prefix Cache Create Input 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixCacheCreateInput } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export interface PrefixCacheCreateInput {
    id: string;
    version: string;
    content: string;
    tokenCount?: number;
    cacheScope?: InferenceCacheScope;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tokenCount` | 属性 | <code>tokenCount?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InferenceCacheOperation`

Inference Cache Operation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { InferenceCacheOperation } from '@codesoul-co/hypha-inference';`
- 源码模块: [`cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts)

### 声明

```text
export type InferenceCacheOperation = 'prefix_read' | 'prefix_write' | 'kv_read' | 'kv_write' | 'invalidate';
```
