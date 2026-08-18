# `@codesoul-co/hypha-memory` / `mem0-rest-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/mem0-rest-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-rest-client.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `Mem0OssClient` | class | <code>new Mem0OssClient(options: Mem0OssClientOptions): Mem0OssClient</code> | Runtime implementation for Mem0 Oss Client; see its public constructor and members below. |
| `Mem0RestClient` | class | <code>new Mem0RestClient(options: Mem0RestClientOptions): Mem0RestClient</code> | Runtime implementation for Mem0 Rest Client; see its public constructor and members below. |
| `Mem0HttpResponse` | interface | <code>interface Mem0HttpResponse</code> | Field contract for Mem0 Http Response; see all contract members below. |
| `Mem0OssClientOptions` | interface | <code>interface Mem0OssClientOptions</code> | Field contract for Mem0 Oss Client Options; see all contract members below. |
| `Mem0HttpFetch` | type | <code>type Mem0HttpFetch = (url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }) =&gt; Promise&lt;Mem0HttpResponse&gt;</code> | Public type alias for Mem0 Http Fetch. |
| `Mem0RestClientOptions` | type | <code>type Mem0RestClientOptions = Mem0OssClientOptions &amp; { deployment?: 'self_hosted'; }</code> | Public type alias for Mem0 Rest Client Options. |

## `Mem0OssClient` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: Mem0OssClientOptions): Mem0OssClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `reconcile` | method | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for reconcile. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `Mem0RestClient` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: Mem0RestClientOptions): Mem0RestClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `reconcile` | method | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for reconcile. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `Mem0HttpResponse` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `headers` | property | <code>headers: { get(name: string): string &#124; null; }</code> | Public headers property. |
| `json` | method | <code>json(): Promise&lt;unknown&gt;</code> | Public runtime operation for json. |
| `ok` | property | <code>ok: boolean</code> | Public ok property. |
| `status` | property | <code>status: number</code> | Public status property. |
| `statusText` | property | <code>statusText: string</code> | Public status Text property. |
| `text` | method | <code>text(): Promise&lt;string&gt;</code> | Public runtime operation for text. |

## `Mem0OssClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureForTests` | property | <code>allowInsecureForTests: boolean</code> | Public allow Insecure For Tests property. |
| `apiKey` | property | <code>apiKey: string</code> | Public api Key property. |
| `authMode` | property | <code>authMode: "none" &#124; "x-api-key" &#124; "bearer"</code> | Public auth Mode property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `expectedCapabilities` | property | <code>expectedCapabilities: Partial&lt;MemoryManagementCapabilities&gt;</code> | Public expected Capabilities property. |
| `expectedProviderVersion` | property | <code>expectedProviderVersion: string</code> | Public expected Provider Version property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `healthPath` | property | <code>healthPath: string</code> | Public health Path property. |
| `listPaginationMode` | property | <code>listPaginationMode: "top-k-offset" &#124; "provider-cursor"</code> | Public list Pagination Mode property. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `operationProfile` | property | <code>operationProfile: ExternalMemoryMappingRuntimeProfile</code> | Public operation Profile property. |
| `operationStore` | property | <code>operationStore: ExternalProviderOperationStore</code> | Public operation Store property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public provider Version property. |
