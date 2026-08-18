# `@codesoul-co/hypha-memory` / `self-hosted-provider-factories`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/self-hosted-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)
- 导出数: **5**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Self hosted provider factories 模块公开 1 常量、2 函数、2 接口。

### 从包入口导入

```ts
import {
  MEM0_OSS_FACTORY_ID,
  createMem0OssMemoryProviderFactory,
  registerMem0OssMemoryProvider,
} from '@codesoul-co/hypha-memory';

import type {
  Mem0OssConnection,
  Mem0OssProviderFactoryOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MEM0_OSS_FACTORY_ID` | 常量 | <code>const MEM0_OSS_FACTORY_ID: "memory.factory.mem0.oss-rest"</code> | 由 `self-hosted-provider-factories` 模块导出的 MEM0 OSS FACTORY ID 常量。 |
| `createMem0OssMemoryProviderFactory` | 函数 | <code>createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory</code> | Create Mem0 Oss Memory Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerMem0OssMemoryProvider` | 函数 | <code>registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry</code> | Register Mem0 Oss Memory Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `Mem0OssConnection` | 接口 | <code>interface Mem0OssConnection</code> | Mem0 Oss Connection 接口，共包含 5 个公开字段或方法。 |
| `Mem0OssProviderFactoryOptions` | 接口 | <code>interface Mem0OssProviderFactoryOptions</code> | Mem0 Oss Provider Factory Options 接口，共包含 1 个公开字段或方法。 |

## `MEM0_OSS_FACTORY_ID`

由 `self-hosted-provider-factories` 模块导出的 MEM0 OSS FACTORY ID 常量。

- 种类: 常量
- 导入: `import { MEM0_OSS_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- 源码模块: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### 声明

```text
export declare const MEM0_OSS_FACTORY_ID: "memory.factory.mem0.oss-rest";
```

## `createMem0OssMemoryProviderFactory`

Create Mem0 Oss Memory Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMem0OssMemoryProviderFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### 声明

```text
export declare function createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory;
```

### 调用签名

```text
createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>Mem0OssProviderFactoryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderFactory`
- 说明: 返回值契约由上述类型定义。

## `registerMem0OssMemoryProvider`

Register Mem0 Oss Memory Provider 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { registerMem0OssMemoryProvider } from '@codesoul-co/hypha-memory';`
- 源码模块: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### 声明

```text
export declare function registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry;
```

### 调用签名

```text
registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `registry` | <code>MemoryManagementProviderRegistry</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>Mem0OssProviderFactoryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderRegistry`
- 说明: 返回值契约由上述类型定义。

## `Mem0OssConnection`

Mem0 Oss Connection 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0OssConnection } from '@codesoul-co/hypha-memory';`
- 源码模块: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### 声明

```text
export interface Mem0OssConnection {
    baseUrl: string;
    apiKey?: string;
    authMode?: Mem0OssClientOptions['authMode'];
    providerVersion?: string;
    fetch?: Mem0HttpFetch;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authMode` | 属性 | <code>authMode?: "none" &#124; "x-api-key" &#124; "bearer"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerVersion` | 属性 | <code>providerVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `Mem0OssProviderFactoryOptions`

Mem0 Oss Provider Factory Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0OssProviderFactoryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`self-hosted-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)

### 声明

```text
export interface Mem0OssProviderFactoryOptions {
    fetch?: Mem0HttpFetch;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
