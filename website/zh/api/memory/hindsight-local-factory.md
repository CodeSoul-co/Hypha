# `@codesoul-co/hypha-memory` / `hindsight-local-factory`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/hindsight-local-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)
- 导出数: **5**

## 模块用法

用于使用该功能边界的公共契约与操作。Hindsight local factory 模块公开 1 常量、2 函数、2 接口。

### 从包入口导入

```ts
import {
  HINDSIGHT_LOCAL_FACTORY_ID,
  createHindsightLocalMemoryProviderFactory,
  registerHindsightLocalMemoryProvider,
} from '@codesoul-co/hypha-memory';

import type {
  HindsightLocalConnection,
  HindsightLocalFactoryOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HINDSIGHT_LOCAL_FACTORY_ID` | 常量 | <code>const HINDSIGHT_LOCAL_FACTORY_ID: "memory.factory.memorybank.hindsight-local"</code> | 由 `hindsight-local-factory` 模块导出的 HINDSIGHT LOCAL FACTORY ID 常量。 |
| `createHindsightLocalMemoryProviderFactory` | 函数 | <code>createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory</code> | Create Hindsight Local Memory Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerHindsightLocalMemoryProvider` | 函数 | <code>registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry</code> | Register Hindsight Local Memory Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `HindsightLocalConnection` | 接口 | <code>interface HindsightLocalConnection</code> | Hindsight Local Connection 接口，共包含 3 个公开字段或方法。 |
| `HindsightLocalFactoryOptions` | 接口 | <code>interface HindsightLocalFactoryOptions</code> | Hindsight Local Factory Options 接口，共包含 2 个公开字段或方法。 |

## `HINDSIGHT_LOCAL_FACTORY_ID`

由 `hindsight-local-factory` 模块导出的 HINDSIGHT LOCAL FACTORY ID 常量。

- 种类: 常量
- 导入: `import { HINDSIGHT_LOCAL_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### 声明

```text
export declare const HINDSIGHT_LOCAL_FACTORY_ID: "memory.factory.memorybank.hindsight-local";
```

## `createHindsightLocalMemoryProviderFactory`

Create Hindsight Local Memory Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createHindsightLocalMemoryProviderFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### 声明

```text
export declare function createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory;
```

### 调用签名

```text
createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>HindsightLocalFactoryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderFactory`
- 说明: 返回值契约由上述类型定义。

## `registerHindsightLocalMemoryProvider`

Register Hindsight Local Memory Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { registerHindsightLocalMemoryProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### 声明

```text
export declare function registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry;
```

### 调用签名

```text
registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `registry` | <code>MemoryManagementProviderRegistry</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>HindsightLocalFactoryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderRegistry`
- 说明: 返回值契约由上述类型定义。

## `HindsightLocalConnection`

Hindsight Local Connection 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HindsightLocalConnection } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### 声明

```text
export interface HindsightLocalConnection {
    baseUrl: string;
    bearerToken?: string;
    fetch?: Mem0HttpFetch;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `bearerToken` | 属性 | <code>bearerToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HindsightLocalFactoryOptions`

Hindsight Local Factory Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HindsightLocalFactoryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)

### 声明

```text
export interface HindsightLocalFactoryOptions {
    fetch?: Mem0HttpFetch;
    operationDeadlineMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
