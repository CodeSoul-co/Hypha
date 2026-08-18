# `@codesoul-co/hypha-memory` / `mem0-platform-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/mem0-platform-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)
- 导出数: **3**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Mem0 platform client 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  Mem0PlatformClient,
} from '@codesoul-co/hypha-memory';

import type {
  Mem0PlatformClientOptions,
  Mem0PlatformEvent,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `Mem0PlatformClient` | 类 | <code>new Mem0PlatformClient(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | Client for the documented Mem0 Platform v3 additive/search/list protocol. |
| `Mem0PlatformClientOptions` | 接口 | <code>interface Mem0PlatformClientOptions</code> | Mem0 Platform Client Options 接口，共包含 15 个公开字段或方法。 |
| `Mem0PlatformEvent` | 接口 | <code>interface Mem0PlatformEvent</code> | Mem0 Platform Event 接口，共包含 4 个公开字段或方法。 |

## `Mem0PlatformClient`

Client for the documented Mem0 Platform v3 additive/search/list protocol.

- 种类: 类
- 导入: `import { Mem0PlatformClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-platform-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)

### 声明

```text
export declare class Mem0PlatformClient implements ExternalMemoryClient {
    constructor(options: Mem0PlatformClientOptions);
    capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<import("./contracts").ManagedMemoryRecord<unknown> | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close(): Promise<void>;
    getEvent(eventId: string, signal?: AbortSignal): Promise<Mem0PlatformEvent>;
    resumeEvent(operationId: string, signal?: AbortSignal): Promise<Mem0PlatformEvent | null>;
    reconcile(operationId: string, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getEvent` | 方法 | <code>getEvent(eventId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resumeEvent` | 方法 | <code>resumeEvent(operationId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `Mem0PlatformClientOptions`

Mem0 Platform Client Options 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0PlatformClientOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-platform-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)

### 声明

```text
export interface Mem0PlatformClientOptions {
    baseUrl?: string;
    apiToken?: string;
    credentialProvider?: RenewableCredentialProvider;
    fetch?: Mem0HttpFetch;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    operationStore?: ExternalProviderOperationStore;
    operationDeadlineMs?: number;
    maxOperationAttempts?: number;
    providerVersion?: string;
    expectedProviderVersion?: string;
    expectedCapabilities?: Partial<MemoryManagementCapabilities>;
    now?: () => Date;
    allowInsecureForTests?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `apiToken` | 属性 | <code>apiToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `credentialProvider` | 属性 | <code>credentialProvider?: RenewableCredentialProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedCapabilities` | 属性 | <code>expectedCapabilities?: Partial&lt;MemoryManagementCapabilities&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedProviderVersion` | 属性 | <code>expectedProviderVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxOperationAttempts` | 属性 | <code>maxOperationAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationStore` | 属性 | <code>operationStore?: ExternalProviderOperationStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerVersion` | 属性 | <code>providerVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `Mem0PlatformEvent`

Mem0 Platform Event 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0PlatformEvent } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-platform-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)

### 声明

```text
export interface Mem0PlatformEvent {
    id: string;
    status: 'PENDING' | 'RUNNING' | 'FAILED' | 'SUCCEEDED';
    results?: unknown[];
    payload?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `payload` | 属性 | <code>payload?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `results` | 属性 | <code>results?: unknown[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "PENDING" &#124; "RUNNING" &#124; "FAILED" &#124; "SUCCEEDED"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
