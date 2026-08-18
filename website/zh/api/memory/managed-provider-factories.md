# `@codesoul-co/hypha-memory` / `managed-provider-factories`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/managed-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)
- 导出数: **5**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Managed provider factories 模块公开 2 常量、2 函数、1 接口。

### 从包入口导入

```ts
import {
  MEM0_PLATFORM_FACTORY_ID,
  MEMORYBANK_MANAGED_FACTORY_ID,
  createMem0PlatformMemoryProviderFactory,
  createMemoryBankManagedProviderFactory,
} from '@codesoul-co/hypha-memory';

import type {
  ManagedExternalProviderFactoryOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MEM0_PLATFORM_FACTORY_ID` | 常量 | <code>const MEM0_PLATFORM_FACTORY_ID: "memory.factory.mem0.platform-v3"</code> | 由 `managed-provider-factories` 模块导出的 MEM0 PLATFORM FACTORY ID 常量。 |
| `MEMORYBANK_MANAGED_FACTORY_ID` | 常量 | <code>const MEMORYBANK_MANAGED_FACTORY_ID: "memory.factory.memorybank.vertex-ai-managed"</code> | 由 `managed-provider-factories` 模块导出的 MEMORYBANK MANAGED FACTORY ID 常量。 |
| `createMem0PlatformMemoryProviderFactory` | 函数 | <code>createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | Create Mem0 Platform Memory Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createMemoryBankManagedProviderFactory` | 函数 | <code>createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | Create Memory Bank Managed Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ManagedExternalProviderFactoryOptions` | 接口 | <code>interface ManagedExternalProviderFactoryOptions</code> | Managed External Provider Factory Options 接口，共包含 1 个公开字段或方法。 |

## `MEM0_PLATFORM_FACTORY_ID`

由 `managed-provider-factories` 模块导出的 MEM0 PLATFORM FACTORY ID 常量。

- 种类: 常量
- 导入: `import { MEM0_PLATFORM_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### 声明

```text
export declare const MEM0_PLATFORM_FACTORY_ID: "memory.factory.mem0.platform-v3";
```

## `MEMORYBANK_MANAGED_FACTORY_ID`

由 `managed-provider-factories` 模块导出的 MEMORYBANK MANAGED FACTORY ID 常量。

- 种类: 常量
- 导入: `import { MEMORYBANK_MANAGED_FACTORY_ID } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### 声明

```text
export declare const MEMORYBANK_MANAGED_FACTORY_ID: "memory.factory.memorybank.vertex-ai-managed";
```

## `createMem0PlatformMemoryProviderFactory`

Create Mem0 Platform Memory Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMem0PlatformMemoryProviderFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### 声明

```text
export declare function createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory;
```

### 调用签名

```text
createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>ManagedExternalProviderFactoryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderFactory`
- 说明: 返回值契约由上述类型定义。

## `createMemoryBankManagedProviderFactory`

Create Memory Bank Managed Provider Factory 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemoryBankManagedProviderFactory } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### 声明

```text
export declare function createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory;
```

### 调用签名

```text
createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>ManagedExternalProviderFactoryOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryManagementProviderFactory`
- 说明: 返回值契约由上述类型定义。

## `ManagedExternalProviderFactoryOptions`

Managed External Provider Factory Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ManagedExternalProviderFactoryOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`managed-provider-factories`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)

### 声明

```text
export interface ManagedExternalProviderFactoryOptions {
    fetch?: Mem0HttpFetch;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
