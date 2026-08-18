# `@codesoul-co/hypha-memory` / `memorybank-local-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memorybank-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)
- 导出数: **4**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Memorybank local client 模块公开 1 类、1 常量、2 接口。

### 从包入口导入

```ts
import {
  MemoryBankLocalClient,
  MEMORYBANK_LOCAL_PROTOCOL,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryBankClient,
  MemoryBankLocalClientOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryBankLocalClient` | 类 | <code>new MemoryBankLocalClient(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | Memory Bank Local Client 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MEMORYBANK_LOCAL_PROTOCOL` | 常量 | <code>const MEMORYBANK_LOCAL_PROTOCOL: "hypha.memorybank.v1"</code> | 由 `memorybank-local-client` 模块导出的 MEMORYBANK LOCAL PROTOCOL 常量。 |
| `MemoryBankClient` | 接口 | <code>interface MemoryBankClient extends ExternalMemoryClient</code> | Memory Bank Client 接口，共包含 12 个公开字段或方法。 |
| `MemoryBankLocalClientOptions` | 接口 | <code>interface MemoryBankLocalClientOptions</code> | Memory Bank Local Client Options 接口，共包含 7 个公开字段或方法。 |

## `MemoryBankLocalClient`

Memory Bank Local Client 类，共公开 13 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryBankLocalClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### 声明

```text
export declare class MemoryBankLocalClient implements MemoryBankClient {
    readonly protocol: "hypha.memorybank.v1";
    constructor(options: MemoryBankLocalClientOptions);
    capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<import("./contracts").ManagedMemoryRecord<unknown> | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    health(signal?: AbortSignal): Promise<ProviderHealth>;
    close(): Promise<void>;
    reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `protocol` | 属性 | <code>readonly protocol: "hypha.memorybank.v1"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MEMORYBANK_LOCAL_PROTOCOL`

由 `memorybank-local-client` 模块导出的 MEMORYBANK LOCAL PROTOCOL 常量。

- 种类: 常量
- 导入: `import { MEMORYBANK_LOCAL_PROTOCOL } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### 声明

```text
export declare const MEMORYBANK_LOCAL_PROTOCOL: "hypha.memorybank.v1";
```

## `MemoryBankClient`

Memory Bank Client 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryBankClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### 声明

```text
export interface MemoryBankClient extends ExternalMemoryClient {
    readonly protocol: string;
    reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history?(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `protocol` | 属性 | <code>readonly protocol: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update?(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryBankLocalClientOptions`

Memory Bank Local Client Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryBankLocalClientOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memorybank-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)

### 声明

```text
export interface MemoryBankLocalClientOptions {
    baseUrl: string;
    fetch?: Mem0HttpFetch;
    apiKey?: string;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    now?: () => Date;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
