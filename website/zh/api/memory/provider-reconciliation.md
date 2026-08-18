# `@codesoul-co/hypha-memory` / `provider-reconciliation`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/provider-reconciliation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)
- 导出数: **4**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Provider reconciliation 模块公开 2 函数、2 接口。

### 从包入口导入

```ts
import {
  createProviderReconciliationHandler,
  enqueueProviderDeleteReconciliation,
} from '@codesoul-co/hypha-memory';

import type {
  ProviderDeleteReconciliationPayload,
  ProviderReconciliationHandlerOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createProviderReconciliationHandler` | 函数 | <code>createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler</code> | Create Provider Reconciliation Handler 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `enqueueProviderDeleteReconciliation` | 函数 | <code>enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise&lt;MemoryLifecycleTask&lt;ProviderDeleteReconciliationPayload&gt;[]&gt;</code> | Enqueue Provider Delete Reconciliation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `ProviderDeleteReconciliationPayload` | 接口 | <code>interface ProviderDeleteReconciliationPayload</code> | Provider Delete Reconciliation Payload 接口，共包含 3 个公开字段或方法。 |
| `ProviderReconciliationHandlerOptions` | 接口 | <code>interface ProviderReconciliationHandlerOptions</code> | Provider Reconciliation Handler Options 接口，共包含 1 个公开字段或方法。 |

## `createProviderReconciliationHandler`

Create Provider Reconciliation Handler 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createProviderReconciliationHandler } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### 声明

```text
export declare function createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler;
```

### 调用签名

```text
createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>ProviderReconciliationHandlerOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryLifecycleTaskHandler`
- 说明: 返回值契约由上述类型定义。

## `enqueueProviderDeleteReconciliation`

Enqueue Provider Delete Reconciliation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { enqueueProviderDeleteReconciliation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### 声明

```text
export declare function enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]>;
```

### 调用签名

```text
enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `request` | <code>ManagedMemoryDeleteRequest</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `result` | <code>ManagedMemoryDeleteResult</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `store` | <code>MemoryLifecycleTaskStore</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `now` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryLifecycleTask<ProviderDeleteReconciliationPayload>[]>`
- 说明: 返回值契约由上述类型定义。

## `ProviderDeleteReconciliationPayload`

Provider Delete Reconciliation Payload 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderDeleteReconciliationPayload } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### 声明

```text
export interface ProviderDeleteReconciliationPayload {
    operation: 'delete';
    providerId: string;
    request: ManagedMemoryDeleteRequest;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `operation` | 属性 | <code>operation: "delete"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `request` | 属性 | <code>request: ManagedMemoryDeleteRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ProviderReconciliationHandlerOptions`

Provider Reconciliation Handler Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ProviderReconciliationHandlerOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-reconciliation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)

### 声明

```text
export interface ProviderReconciliationHandlerOptions {
    resolveProvider(providerId: string): MemoryManagementProvider | undefined;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolveProvider` | 方法 | <code>resolveProvider(providerId: string): MemoryManagementProvider &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
