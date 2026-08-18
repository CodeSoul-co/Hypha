# `@codesoul-co/hypha-memory` / `governed-memory-manager`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/governed-memory-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)
- 导出数: **6**

## 模块用法

用于使用该功能边界的公共契约与操作。Governed memory manager 模块公开 1 类、3 函数、2 接口。

### 从包入口导入

```ts
import {
  GovernedMemoryManager,
  governedMemoryProviderCapabilities,
  governedMemoryProviderHealth,
  registerMemoryManagementProviderHandlers,
} from '@codesoul-co/hypha-memory';

import type {
  GovernedMemoryManagerOptions,
  MemoryActivityRegistrar,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 3 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `GovernedMemoryManager` | 类 | <code>new GovernedMemoryManager(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort. |
| `governedMemoryProviderCapabilities` | 函数 | <code>governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise&lt;MemoryManagementCapabilities&gt;</code> | Governed Memory Provider Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `governedMemoryProviderHealth` | 函数 | <code>governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise&lt;ProviderHealth&gt;</code> | Governed Memory Provider Health 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `registerMemoryManagementProviderHandlers` | 函数 | <code>registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar &#124; DefaultMemoryActivityPort, provider: MemoryManagementProvider): void</code> | Register Memory Management Provider Handlers 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `GovernedMemoryManagerOptions` | 接口 | <code>interface GovernedMemoryManagerOptions</code> | Governed Memory Manager Options 接口，共包含 8 个公开字段或方法。 |
| `MemoryActivityRegistrar` | 接口 | <code>interface MemoryActivityRegistrar</code> | Memory Activity Registrar 接口，共包含 1 个公开字段或方法。 |

## `GovernedMemoryManager`

Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort.

- 种类: 类
- 导入: `import { GovernedMemoryManager } from '@codesoul-co/hypha-memory';`
- 源码模块: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### 声明

```text
export declare class GovernedMemoryManager {
    constructor(options: GovernedMemoryManagerOptions);
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `governedMemoryProviderCapabilities`

Governed Memory Provider Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { governedMemoryProviderCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### 声明

```text
export declare function governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise<MemoryManagementCapabilities>;
```

### 调用签名

```text
governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise<MemoryManagementCapabilities>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `provider` | <code>MemoryManagementProvider</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<MemoryManagementCapabilities>`
- 说明: 返回值契约由上述类型定义。

## `governedMemoryProviderHealth`

Governed Memory Provider Health 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { governedMemoryProviderHealth } from '@codesoul-co/hypha-memory';`
- 源码模块: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### 声明

```text
export declare function governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise<ProviderHealth>;
```

### 调用签名

```text
governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise<ProviderHealth>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `provider` | <code>MemoryManagementProvider</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<ProviderHealth>`
- 说明: 返回值契约由上述类型定义。

## `registerMemoryManagementProviderHandlers`

Register Memory Management Provider Handlers 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { registerMemoryManagementProviderHandlers } from '@codesoul-co/hypha-memory';`
- 源码模块: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### 声明

```text
export declare function registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar | DefaultMemoryActivityPort, provider: MemoryManagementProvider): void;
```

### 调用签名

```text
registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar | DefaultMemoryActivityPort, provider: MemoryManagementProvider): void
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `activities` | <code>MemoryActivityRegistrar &#124; DefaultMemoryActivityPort</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `provider` | <code>MemoryManagementProvider</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `void`
- 说明: 不返回值。

## `GovernedMemoryManagerOptions`

Governed Memory Manager Options 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { GovernedMemoryManagerOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### 声明

```text
export interface GovernedMemoryManagerOptions {
    activities: MemoryActivityPort;
    providerId: string;
    profileRef: MemoryContractSpecRef | ((request: GovernedMemoryRequest) => MemoryContractSpecRef);
    eventContext: MemoryEventContext | ((request: GovernedMemoryRequest) => MemoryEventContext);
    timeoutMs?: number;
    reconciliationStore?: MemoryLifecycleTaskStore;
    projectionInvalidation?: MemoryProjectionInvalidationPort;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: MemoryActivityPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventContext` | 属性 | <code>eventContext: MemoryEventContext &#124; ((request: GovernedMemoryRequest) =&gt; MemoryEventContext)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef &#124; ((request: GovernedMemoryRequest) =&gt; MemoryContractSpecRef)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionInvalidation` | 属性 | <code>projectionInvalidation?: MemoryProjectionInvalidationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconciliationStore` | 属性 | <code>reconciliationStore?: MemoryLifecycleTaskStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryActivityRegistrar`

Memory Activity Registrar 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryActivityRegistrar } from '@codesoul-co/hypha-memory';`
- 源码模块: [`governed-memory-manager`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)

### 声明

```text
export interface MemoryActivityRegistrar {
    register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `register` | 方法 | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown</code> | 公开方法；参数与返回类型以签名列为准。 |
