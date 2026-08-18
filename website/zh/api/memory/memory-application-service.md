# `@codesoul-co/hypha-memory` / `memory-application-service`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-application-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory application service 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  DefaultMemoryApplicationService,
} from '@codesoul-co/hypha-memory';

import type {
  DefaultMemoryApplicationServiceOptions,
  MemoryApplicationService,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryApplicationService` | 类 | <code>new DefaultMemoryApplicationService(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store. |
| `DefaultMemoryApplicationServiceOptions` | 接口 | <code>interface DefaultMemoryApplicationServiceOptions</code> | Default Memory Application Service Options 接口，共包含 6 个公开字段或方法。 |
| `MemoryApplicationService` | 接口 | <code>interface MemoryApplicationService</code> | Memory Application Service 接口，共包含 12 个公开字段或方法。 |

## `DefaultMemoryApplicationService`

Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store.

- 种类: 类
- 导入: `import { DefaultMemoryApplicationService } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-application-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)

### 声明

```text
export declare class DefaultMemoryApplicationService implements MemoryApplicationService {
    constructor(options: DefaultMemoryApplicationServiceOptions);
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise<ContextEnvelope>;
    explainContext(contextHash: string): Promise<ContextBuildExplanation | null>;
    providerCapabilities(): Promise<MemoryManagementCapabilities>;
    providerHealth(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `buildContext` | 方法 | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `explainContext` | 方法 | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerCapabilities` | 方法 | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerHealth` | 方法 | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultMemoryApplicationServiceOptions`

Default Memory Application Service Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DefaultMemoryApplicationServiceOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-application-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)

### 声明

```text
export interface DefaultMemoryApplicationServiceOptions {
    manager: GovernedMemoryManager;
    activities: MemoryActivityPort;
    provider: MemoryManagementProvider;
    contextBuilder?: MemoryContextBuilder;
    eventContext: MemoryEventContext | ((request: ContextBuildInput) => MemoryEventContext);
    contextTimeoutMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: MemoryActivityPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextBuilder` | 属性 | <code>contextBuilder?: MemoryContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextTimeoutMs` | 属性 | <code>contextTimeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventContext` | 属性 | <code>eventContext: MemoryEventContext &#124; ((request: ContextBuildInput) =&gt; MemoryEventContext)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `manager` | 属性 | <code>manager: GovernedMemoryManager</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryApplicationService`

Memory Application Service 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryApplicationService } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-application-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)

### 声明

```text
export interface MemoryApplicationService {
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise<ContextEnvelope>;
    explainContext(contextHash: string): Promise<ContextBuildExplanation | null>;
    providerCapabilities(): Promise<MemoryManagementCapabilities>;
    providerHealth(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `buildContext` | 方法 | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `explainContext` | 方法 | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerCapabilities` | 方法 | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerHealth` | 方法 | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
