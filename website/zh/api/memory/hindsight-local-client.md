# `@codesoul-co/hypha-memory` / `hindsight-local-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/hindsight-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)
- 导出数: **6**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Hindsight local client 模块公开 1 类、2 常量、2 函数、1 接口。

### 从包入口导入

```ts
import {
  HindsightLocalMemoryBankClient,
  HINDSIGHT_LOCAL_PROTOCOL,
  HINDSIGHT_LOCAL_VERSION,
  bankIdForScope,
  documentIdForOperation,
} from '@codesoul-co/hypha-memory';

import type {
  HindsightLocalMemoryBankClientOptions,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HindsightLocalMemoryBankClient` | 类 | <code>new HindsightLocalMemoryBankClient(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | Native adapter for Hindsight Self-hosted HTTP API 0.8. |
| `HINDSIGHT_LOCAL_PROTOCOL` | 常量 | <code>const HINDSIGHT_LOCAL_PROTOCOL: "hindsight.http.v0.8"</code> | 由 `hindsight-local-client` 模块导出的 HINDSIGHT LOCAL PROTOCOL 常量。 |
| `HINDSIGHT_LOCAL_VERSION` | 常量 | <code>const HINDSIGHT_LOCAL_VERSION: "0.8.5"</code> | 由 `hindsight-local-client` 模块导出的 HINDSIGHT LOCAL VERSION 常量。 |
| `bankIdForScope` | 函数 | <code>bankIdForScope(scope: ManagedMemoryScope): string</code> | Bank ID For Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `documentIdForOperation` | 函数 | <code>documentIdForOperation(operationId: string): string</code> | Document ID For Operation 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `HindsightLocalMemoryBankClientOptions` | 接口 | <code>interface HindsightLocalMemoryBankClientOptions</code> | Hindsight Local Memory Bank Client Options 接口，共包含 12 个公开字段或方法。 |

## `HindsightLocalMemoryBankClient`

Native adapter for Hindsight Self-hosted HTTP API 0.8.

- 种类: 类
- 导入: `import { HindsightLocalMemoryBankClient } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### 声明

```text
export declare class HindsightLocalMemoryBankClient implements ExternalMemoryClient {
    readonly protocol: "hindsight.http.v0.8";
    constructor(options: HindsightLocalMemoryBankClientOptions);
    capabilities(signal?: AbortSignal): Promise<Partial<MemoryManagementCapabilities>>;
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
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `protocol` | 属性 | <code>readonly protocol: "hindsight.http.v0.8"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reconcileOperation` | 方法 | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HINDSIGHT_LOCAL_PROTOCOL`

由 `hindsight-local-client` 模块导出的 HINDSIGHT LOCAL PROTOCOL 常量。

- 种类: 常量
- 导入: `import { HINDSIGHT_LOCAL_PROTOCOL } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### 声明

```text
export declare const HINDSIGHT_LOCAL_PROTOCOL: "hindsight.http.v0.8";
```

## `HINDSIGHT_LOCAL_VERSION`

由 `hindsight-local-client` 模块导出的 HINDSIGHT LOCAL VERSION 常量。

- 种类: 常量
- 导入: `import { HINDSIGHT_LOCAL_VERSION } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### 声明

```text
export declare const HINDSIGHT_LOCAL_VERSION: "0.8.5";
```

## `bankIdForScope`

Bank ID For Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { bankIdForScope } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### 声明

```text
export declare function bankIdForScope(scope: ManagedMemoryScope): string;
```

### 调用签名

```text
bankIdForScope(scope: ManagedMemoryScope): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `scope` | <code>ManagedMemoryScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `documentIdForOperation`

Document ID For Operation 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { documentIdForOperation } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### 声明

```text
export declare function documentIdForOperation(operationId: string): string;
```

### 调用签名

```text
documentIdForOperation(operationId: string): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `operationId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `HindsightLocalMemoryBankClientOptions`

Hindsight Local Memory Bank Client Options 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HindsightLocalMemoryBankClientOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`hindsight-local-client`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)

### 声明

```text
export interface HindsightLocalMemoryBankClientOptions {
    baseUrl: string;
    bearerToken?: string;
    fetch?: Mem0HttpFetch;
    providerId?: string;
    mappingStore?: ExternalMemoryMappingStore;
    mappingProfile?: ExternalMemoryMappingRuntimeProfile;
    operationStore?: ExternalProviderOperationStore;
    operationProfile?: ExternalMemoryMappingRuntimeProfile;
    profileRef?: MemoryContractSpecRef;
    operationDeadlineMs?: number;
    now?: () => Date;
    expectedApiVersion?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `bearerToken` | 属性 | <code>bearerToken?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedApiVersion` | 属性 | <code>expectedApiVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fetch` | 方法 | <code>fetch?(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `mappingProfile` | 属性 | <code>mappingProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mappingStore` | 属性 | <code>mappingStore?: ExternalMemoryMappingStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): Date</code> | 公开方法；参数与返回类型以签名列为准。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationProfile` | 属性 | <code>operationProfile?: ExternalMemoryMappingRuntimeProfile</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationStore` | 属性 | <code>operationStore?: ExternalProviderOperationStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileRef` | 属性 | <code>profileRef?: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
