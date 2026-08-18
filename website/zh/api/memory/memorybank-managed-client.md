# `@codesoul-co/hypha-memory` / `memorybank-managed-client`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memorybank-managed-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryBankManagedClient` | 类 | <code>new MemoryBankManagedClient(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | Google Vertex AI Agent Engine Memory Bank managed client. |
| `MemoryBankManagedClientOptions` | 接口 | <code>interface MemoryBankManagedClientOptions</code> | Memory Bank Managed Client Options 的字段契约；完整字段见下表。 |

## `MemoryBankManagedClient` 公开成员

Google Vertex AI Agent Engine Memory Bank managed client.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `reconcileOperation` | 方法 | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | reconcile Operation 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `MemoryBankManagedClientOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `accessToken` | 属性 | <code>accessToken: string</code> | access Token 字段。 |
| `allowInsecureForTests` | 属性 | <code>allowInsecureForTests: boolean</code> | allow Insecure For Tests 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `credentialProvider` | 属性 | <code>credentialProvider: RenewableCredentialProvider</code> | credential Provider 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `location` | 属性 | <code>location: string</code> | location 字段。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `maxOperationAttempts` | 属性 | <code>maxOperationAttempts: number</code> | max Operation Attempts 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs: number</code> | operation Deadline Ms 字段。 |
| `operationStore` | 属性 | <code>operationStore: ExternalProviderOperationStore</code> | operation Store 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `projectId` | 属性 | <code>projectId: string</code> | project Id 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `reasoningEngineId` | 属性 | <code>reasoningEngineId: string</code> | reasoning Engine Id 字段。 |
