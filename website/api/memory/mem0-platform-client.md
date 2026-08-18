# `@codesoul-co/hypha-memory` / `mem0-platform-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/mem0-platform-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/mem0-platform-client.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `Mem0PlatformClient` | class | <code>new Mem0PlatformClient(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | Client for the documented Mem0 Platform v3 additive/search/list protocol. |
| `Mem0PlatformClientOptions` | interface | <code>interface Mem0PlatformClientOptions</code> | Field contract for Mem0 Platform Client Options; see all contract members below. |
| `Mem0PlatformEvent` | interface | <code>interface Mem0PlatformEvent</code> | Field contract for Mem0 Platform Event; see all contract members below. |

## `Mem0PlatformClient` public members

Client for the documented Mem0 Platform v3 additive/search/list protocol.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: Mem0PlatformClientOptions): Mem0PlatformClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `getEvent` | method | <code>getEvent(eventId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent&gt;</code> | Gets Event at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `reconcile` | method | <code>reconcile(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for reconcile. |
| `resumeEvent` | method | <code>resumeEvent(operationId: string, signal?: AbortSignal): Promise&lt;Mem0PlatformEvent &#124; null&gt;</code> | Public runtime operation for resume Event. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `Mem0PlatformClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureForTests` | property | <code>allowInsecureForTests: boolean</code> | Public allow Insecure For Tests property. |
| `apiToken` | property | <code>apiToken: string</code> | Public api Token property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `credentialProvider` | property | <code>credentialProvider: RenewableCredentialProvider</code> | Public credential Provider property. |
| `expectedCapabilities` | property | <code>expectedCapabilities: Partial&lt;MemoryManagementCapabilities&gt;</code> | Public expected Capabilities property. |
| `expectedProviderVersion` | property | <code>expectedProviderVersion: string</code> | Public expected Provider Version property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `maxOperationAttempts` | property | <code>maxOperationAttempts: number</code> | Public max Operation Attempts property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs: number</code> | Public operation Deadline Ms property. |
| `operationStore` | property | <code>operationStore: ExternalProviderOperationStore</code> | Public operation Store property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public provider Version property. |

## `Mem0PlatformEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `payload` | property | <code>payload: Record&lt;string, unknown&gt;</code> | Public payload property. |
| `results` | property | <code>results: unknown[]</code> | Public results property. |
| `status` | property | <code>status: "PENDING" &#124; "RUNNING" &#124; "FAILED" &#124; "SUCCEEDED"</code> | Public status property. |
