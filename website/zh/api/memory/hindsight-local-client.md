# `@codesoul-co/hypha-memory` / `hindsight-local-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/hindsight-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HindsightLocalMemoryBankClient` | 类 | <code>new HindsightLocalMemoryBankClient(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | Native adapter for Hindsight Self-hosted HTTP API 0.8. |
| `HINDSIGHT_LOCAL_PROTOCOL` | 常量 | <code>const HINDSIGHT_LOCAL_PROTOCOL: "hindsight.http.v0.8"</code> | 由 `hindsight-local-client` 模块导出的 HINDSIGHT LOCAL PROTOCOL 常量。 |
| `HINDSIGHT_LOCAL_VERSION` | 常量 | <code>const HINDSIGHT_LOCAL_VERSION: "0.8.5"</code> | 由 `hindsight-local-client` 模块导出的 HINDSIGHT LOCAL VERSION 常量。 |
| `bankIdForScope` | 函数 | <code>bankIdForScope(scope: ManagedMemoryScope): string</code> | bank Id For Scope 的公开运行时操作。 |
| `documentIdForOperation` | 函数 | <code>documentIdForOperation(operationId: string): string</code> | document Id For Operation 的公开运行时操作。 |
| `HindsightLocalMemoryBankClientOptions` | 接口 | <code>interface HindsightLocalMemoryBankClientOptions</code> | Hindsight Local Memory Bank Client Options 的字段契约；完整字段见下表。 |

## `HindsightLocalMemoryBankClient` 公开成员

Native adapter for Hindsight Self-hosted HTTP API 0.8.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `protocol` | 属性 | <code>protocol: "hindsight.http.v0.8"</code> | protocol 字段。 |
| `reconcileOperation` | 方法 | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | reconcile Operation 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `HindsightLocalMemoryBankClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `bearerToken` | 属性 | <code>bearerToken: string</code> | bearer Token 字段。 |
| `expectedApiVersion` | 属性 | <code>expectedApiVersion: string</code> | expected Api Version 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs: number</code> | operation Deadline Ms 字段。 |
| `operationProfile` | 属性 | <code>operationProfile: ExternalMemoryMappingRuntimeProfile</code> | operation Profile 字段。 |
| `operationStore` | 属性 | <code>operationStore: ExternalProviderOperationStore</code> | operation Store 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
