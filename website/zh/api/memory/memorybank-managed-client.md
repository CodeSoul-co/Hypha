# `@codesoul-co/hypha-memory` / `memorybank-managed-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memorybank-managed-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)
- 导出数: **2**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Memorybank managed client 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  MemoryBankManagedClient,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryBankManagedClientOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryBankManagedClient` | 类 | <code>new MemoryBankManagedClient(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | Google Vertex AI Agent Engine Memory Bank managed client. |
| `MemoryBankManagedClientOptions` | 接口 | <code>interface MemoryBankManagedClientOptions</code> | Memory Bank Managed Client Options 接口，共包含 16 个公开字段或方法。 |

## `MemoryBankManagedClient`

Google Vertex AI Agent Engine Memory Bank managed client.

- 种类: 类
- 导入: `import { MemoryBankManagedClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memorybank-managed-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)

### 声明

```text
export declare class MemoryBankManagedClient implements ExternalMemoryClient {
    constructor(options: MemoryBankManagedClientOptions);
    capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    reconcileOperation(operationId: string, signal?: AbortSignal): Promise<ManagedMemoryWriteResult | null>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcileOperation` | 方法 | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryBankManagedClientOptions`

Memory Bank Managed Client Options 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryBankManagedClientOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memorybank-managed-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)

### 声明

```text
export interface MemoryBankManagedClientOptions {
    projectId: string;
    location: string;
    reasoningEngineId: string;
    accessToken?: string;
    credentialProvider?: RenewableCredentialProvider;
    fetch?: Mem0HttpFetch;
    baseUrl?: string;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    profileRef?: MemoryContractSpecRef;
    operationStore?: ExternalProviderOperationStore;
    operationDeadlineMs?: number;
    maxOperationAttempts?: number;
    now?: () => Date;
    allowInsecureForTests?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | 属性 | <code>accessToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `credentialProvider` | 属性 | <code>credentialProvider?: RenewableCredentialProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `location` | 属性 | <code>location: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxOperationAttempts` | 属性 | <code>maxOperationAttempts?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationStore` | 属性 | <code>operationStore?: ExternalProviderOperationStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectId` | 属性 | <code>projectId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningEngineId` | 属性 | <code>reasoningEngineId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
