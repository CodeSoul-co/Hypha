# `@codesoul-co/hypha-core` / `modules/execution-cache/runtime`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-cache/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  ExecutionResultCache,
} from '@codesoul-co/hypha-core';

import type {
  ExecutionResultCacheOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionResultCache` | 类 | <code>new ExecutionResultCache(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect. |
| `ExecutionResultCacheOptions` | 接口 | <code>interface ExecutionResultCacheOptions</code> | Execution Result Cache Options 接口，共包含 9 个公开字段或方法。 |

## `ExecutionResultCache`

Conservative Result Cache for deterministic, read-only command executions. It returns an Execution-owned projection and never fabricates a new receipt, mutates a Workspace, or treats a hit as an executed side effect.

- 种类: 类
- 导入: `import { ExecutionResultCache } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)

### 声明

```text
export declare class ExecutionResultCache {
    constructor(options: ExecutionResultCacheOptions);
    lookup(rawInput: ExecutionCacheLookupInput): Promise<ExecutionCacheLookupResult>;
    write(rawInput: ExecutionCacheWriteInput): Promise<boolean>;
    invalidate(rawInput: ExecutionCacheLookupInput): Promise<boolean>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: ExecutionResultCacheOptions): ExecutionResultCache</code> | 创建该类的实例。 |
| `invalidate` | 方法 | <code>invalidate(rawInput: ExecutionCacheLookupInput): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `lookup` | 方法 | <code>lookup(rawInput: ExecutionCacheLookupInput): Promise&lt;ExecutionCacheLookupResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `write` | 方法 | <code>write(rawInput: ExecutionCacheWriteInput): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionResultCacheOptions`

Execution Result Cache Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionResultCacheOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-cache/runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-cache/runtime.ts)

### 声明

```text
export interface ExecutionResultCacheOptions {
    store: ExecutionCacheStore;
    hasher: ExecutionFingerprintHasher;
    artifactVerifier?: ExecutionCacheArtifactVerifier;
    failureMode?: ExecutionCacheFailureMode;
    operationTimeoutMs?: number;
    ttlMs?: number;
    maxEntryBytes?: number;
    now?: () => number;
    trace?: (event: ExecutionCacheEvent) => Promise<void> | void;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactVerifier` | 属性 | <code>artifactVerifier?: ExecutionCacheArtifactVerifier</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failureMode` | 属性 | <code>failureMode?: ExecutionCacheFailureMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hasher` | 属性 | <code>hasher: ExecutionFingerprintHasher</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxEntryBytes` | 属性 | <code>maxEntryBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationTimeoutMs` | 属性 | <code>operationTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `store` | 属性 | <code>store: ExecutionCacheStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 方法 | <code>trace?(event: ExecutionCacheEvent): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
