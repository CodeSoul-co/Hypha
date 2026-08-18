# `@codesoul-co/hypha-memory` / `mem0-rest-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/mem0-rest-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `Mem0OssClient` | 类 | <code>new Mem0OssClient(options: Mem0OssClientOptions): Mem0OssClient</code> | Mem0 Oss Client 的运行时实现；公开构造函数与成员见下表。 |
| `Mem0RestClient` | 类 | <code>new Mem0RestClient(options: Mem0RestClientOptions): Mem0RestClient</code> | Mem0 Rest Client 的运行时实现；公开构造函数与成员见下表。 |
| `Mem0HttpResponse` | 接口 | <code>interface Mem0HttpResponse</code> | Mem0 Http Response 的字段契约；完整字段见下表。 |
| `Mem0OssClientOptions` | 接口 | <code>interface Mem0OssClientOptions</code> | Mem0 Oss Client Options 的字段契约；完整字段见下表。 |
| `Mem0HttpFetch` | 类型 | <code>type Mem0HttpFetch = (url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }) =&gt; Promise&lt;Mem0HttpResponse&gt;</code> | Mem0 Http Fetch 的公共类型别名。 |
| `Mem0RestClientOptions` | 类型 | <code>type Mem0RestClientOptions = Mem0OssClientOptions &amp; { deployment?: 'self_hosted'; }</code> | Mem0 Rest Client Options 的公共类型别名。 |

## `Mem0OssClient` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: Mem0OssClientOptions): Mem0OssClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | reconcile 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `Mem0RestClient` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: Mem0RestClientOptions): Mem0RestClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | reconcile 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `Mem0HttpResponse` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `headers` | 属性 | <code>headers: { get(name: string): string &#124; null; }</code> | headers 字段。 |
| `json` | 方法 | <code>json(): Promise&lt;unknown&gt;</code> | json 的公开运行时操作。 |
| `ok` | 属性 | <code>ok: boolean</code> | ok 字段。 |
| `status` | 属性 | <code>status: number</code> | status 字段。 |
| `statusText` | 属性 | <code>statusText: string</code> | status Text 字段。 |
| `text` | 方法 | <code>text(): Promise&lt;string&gt;</code> | text 的公开运行时操作。 |

## `Mem0OssClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests: boolean</code> | allow Insecure For Tests 字段。 |
| `apiKey` | 属性 | <code>apiKey: string</code> | api Key 字段。 |
| `authMode` | 属性 | <code>authMode: "none" &#124; "x-api-key" &#124; "bearer"</code> | auth Mode 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `expectedCapabilities` | 属性 | <code>expectedCapabilities: Partial&lt;MemoryManagementCapabilities&gt;</code> | expected Capabilities 字段。 |
| `expectedProviderVersion` | 属性 | <code>expectedProviderVersion: string</code> | expected Provider Version 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `healthPath` | 属性 | <code>healthPath: string</code> | health Path 字段。 |
| `listPaginationMode` | 属性 | <code>listPaginationMode: "top-k-offset" &#124; "provider-cursor"</code> | list Pagination Mode 字段。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `operationProfile` | 属性 | <code>operationProfile: ExternalMemoryMappingRuntimeProfile</code> | operation Profile 字段。 |
| `operationStore` | 属性 | <code>operationStore: ExternalProviderOperationStore</code> | operation Store 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | provider Version 字段。 |
