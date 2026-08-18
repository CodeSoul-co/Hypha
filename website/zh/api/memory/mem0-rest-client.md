# `@codesoul-co/hypha-memory` / `mem0-rest-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/mem0-rest-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)
- 导出数: **6**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Mem0 rest client 模块公开 2 类、2 接口、2 类型。

### 从包入口导入

```ts
import {
  Mem0OssClient,
  Mem0RestClient,
} from '@codesoul-co/hypha-memory';

import type {
  Mem0HttpResponse,
  Mem0OssClientOptions,
  Mem0HttpFetch,
  Mem0RestClientOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 4 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `Mem0OssClient` | 类 | <code>new Mem0OssClient(options: Mem0OssClientOptions): Mem0OssClient</code> | Mem0 Oss Client 类，共公开 12 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `Mem0RestClient` | 类 | <code>new Mem0RestClient(options: Mem0RestClientOptions): Mem0RestClient</code> | Mem0 Rest Client 类，共公开 12 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `Mem0HttpResponse` | 接口 | <code>interface Mem0HttpResponse</code> | Mem0 Http Response 接口，共包含 6 个公开字段或方法。 |
| `Mem0OssClientOptions` | 接口 | <code>interface Mem0OssClientOptions</code> | Mem0 Oss Client Options 接口，共包含 16 个公开字段或方法。 |
| `Mem0HttpFetch` | 类型 | <code>type Mem0HttpFetch = (url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }) =&gt; Promise&lt;Mem0HttpResponse&gt;</code> | Mem0 Http Fetch 公共类型别名；完整类型表达式见声明。 |
| `Mem0RestClientOptions` | 类型 | <code>type Mem0RestClientOptions = Mem0OssClientOptions &amp; { deployment?: 'self_hosted'; }</code> | Mem0 Rest Client Options 公共类型别名；完整类型表达式见声明。 |

## `Mem0OssClient`

Mem0 Oss Client 类，共公开 12 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { Mem0OssClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### 声明

```text
export declare class Mem0OssClient implements ExternalMemoryClient {
    constructor(options: Mem0OssClientOptions);
    capabilities(): Promise<Partial<MemoryManagementCapabilities>>;
    add(request: MemoryAddRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
    get(request: MemoryGetRequest, signal?: AbortSignal): Promise<ManagedMemoryRecord | null>;
    list(request: MemoryListRequest, signal?: AbortSignal): Promise<MemoryListResult>;
    update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise<ManagedMemoryWriteResult>;
    delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise<ManagedMemoryDeleteResult>;
    history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise<MemoryVersion[]>;
    reconcile(operationId: string, signal?: AbortSignal): Promise<ManagedMemorySearchResult[]>;
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
| `constructor` | 构造函数 | <code>(options: Mem0OssClientOptions): Mem0OssClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `Mem0RestClient`

Mem0 Rest Client 类，共公开 12 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { Mem0RestClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### 声明

```text
export declare class Mem0RestClient extends Mem0OssClient {
    constructor(options: Mem0RestClientOptions);
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: Mem0RestClientOptions): Mem0RestClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `Mem0HttpResponse`

Mem0 Http Response 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0HttpResponse } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### 声明

```text
export interface Mem0HttpResponse {
    ok: boolean;
    status: number;
    statusText: string;
    headers?: {
        get(name: string): string | null;
    };
    json(): Promise<unknown>;
    text(): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `headers` | 属性 | <code>headers?: { get(name: string): string &#124; null; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `json` | 方法 | <code>json(): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `ok` | 属性 | <code>ok: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statusText` | 属性 | <code>statusText: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 方法 | <code>text(): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `Mem0OssClientOptions`

Mem0 Oss Client Options 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Mem0OssClientOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### 声明

```text
export interface Mem0OssClientOptions {
    baseUrl: string;
    apiKey?: string;
    authMode?: 'x-api-key' | 'bearer' | 'none';
    fetch?: Mem0HttpFetch;
    providerId?: string;
    healthPath?: string;
    now?: () => Date;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    operationStore?: ExternalProviderOperationStore;
    operationProfile?: ExternalMemoryMappingRuntimeProfile;
    providerVersion?: string;
    expectedProviderVersion?: string;
    expectedCapabilities?: Partial<MemoryManagementCapabilities>;
    listPaginationMode?: 'top-k-offset' | 'provider-cursor';
    allowInsecureForTests?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `apiKey` | 属性 | <code>apiKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `authMode` | 属性 | <code>authMode?: "none" &#124; "x-api-key" &#124; "bearer"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedCapabilities` | 属性 | <code>expectedCapabilities?: Partial&lt;MemoryManagementCapabilities&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedProviderVersion` | 属性 | <code>expectedProviderVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `healthPath` | 属性 | <code>healthPath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `listPaginationMode` | 属性 | <code>listPaginationMode?: "top-k-offset" &#124; "provider-cursor"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationProfile` | 属性 | <code>operationProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationStore` | 属性 | <code>operationStore?: ExternalProviderOperationStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerVersion` | 属性 | <code>providerVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `Mem0HttpFetch`

Mem0 Http Fetch 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { Mem0HttpFetch } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### 声明

```text
export type Mem0HttpFetch = (url: string, init?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    signal?: AbortSignal;
}) => Promise<Mem0HttpResponse>;
```

## `Mem0RestClientOptions`

Mem0 Rest Client Options 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { Mem0RestClientOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`mem0-rest-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)

### 声明

```text
export type Mem0RestClientOptions = Mem0OssClientOptions & {
    deployment?: 'self_hosted';
};
```
