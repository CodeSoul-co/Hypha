# `@codesoul-co/hypha-memory` / `mem0-platform-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/mem0-platform-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `Mem0PlatformClient` | 类 | <code>new Mem0PlatformClient(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | Client for the documented Mem0 Platform v3 additive/search/list protocol. |
| `Mem0PlatformClientOptions` | 接口 | <code>interface Mem0PlatformClientOptions</code> | Mem0 Platform Client Options 的字段契约；完整字段见下表。 |
| `Mem0PlatformEvent` | 接口 | <code>interface Mem0PlatformEvent</code> | Mem0 Platform Event 的字段契约；完整字段见下表。 |

## `Mem0PlatformClient` 公开成员

Client for the documented Mem0 Platform v3 additive/search/list protocol.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | 读取 get。 |
| `getEvent` | 方法 | <code>getEvent(eventId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent&gt;</code> | 读取 Event。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `reconcile` | 方法 | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | reconcile 的公开运行时操作。 |
| `resumeEvent` | 方法 | <code>resumeEvent(operationId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent &#124; null&gt;</code> | resume Event 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `Mem0PlatformClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests: boolean</code> | allow Insecure For Tests 字段。 |
| `apiToken` | 属性 | <code>apiToken: string</code> | api Token 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `credentialProvider` | 属性 | <code>credentialProvider: RenewableCredentialProvider</code> | credential Provider 字段。 |
| `expectedCapabilities` | 属性 | <code>expectedCapabilities: Partial&lt;MemoryManagementCapabilities&gt;</code> | expected Capabilities 字段。 |
| `expectedProviderVersion` | 属性 | <code>expectedProviderVersion: string</code> | expected Provider Version 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `maxOperationAttempts` | 属性 | <code>maxOperationAttempts: number</code> | max Operation Attempts 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs: number</code> | operation Deadline Ms 字段。 |
| `operationStore` | 属性 | <code>operationStore: ExternalProviderOperationStore</code> | operation Store 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | provider Version 字段。 |

## `Mem0PlatformEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `payload` | 属性 | <code>payload: Record&lt;string, unknown&gt;</code> | payload 字段。 |
| `results` | 属性 | <code>results: unknown[]</code> | results 字段。 |
| `status` | 属性 | <code>status: "PENDING" &#124; "RUNNING" &#124; "FAILED" &#124; "SUCCEEDED"</code> | status 字段。 |
