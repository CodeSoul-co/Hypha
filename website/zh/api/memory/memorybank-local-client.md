# `@codesoul-co/hypha-memory` / `memorybank-local-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memorybank-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryBankLocalClient` | 类 | <code>new MemoryBankLocalClient(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | Memory Bank Local Client 的运行时实现；公开构造函数与成员见下表。 |
| `MEMORYBANK_LOCAL_PROTOCOL` | 常量 | <code>const MEMORYBANK_LOCAL_PROTOCOL: "hypha.memorybank.v1"</code> | 由 `memorybank-local-client` 模块导出的 MEMORYBANK LOCAL PROTOCOL 常量。 |
| `MemoryBankClient` | 接口 | <code>interface MemoryBankClient extends ExternalMemoryClient</code> | Memory Bank Client 的字段契约；完整字段见下表。 |
| `MemoryBankLocalClientOptions` | 接口 | <code>interface MemoryBankLocalClientOptions</code> | Memory Bank Local Client Options 的字段契约；完整字段见下表。 |

## `MemoryBankLocalClient` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `protocol` | 属性 | <code>protocol: "hypha.memorybank.v1"</code> | protocol 字段。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | reconcile 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `MemoryBankClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `protocol` | 属性 | <code>protocol: string</code> | protocol 字段。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | reconcile 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `MemoryBankLocalClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey: string</code> | api Key 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
