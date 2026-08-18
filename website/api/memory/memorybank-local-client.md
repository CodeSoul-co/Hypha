# `@codesoul-co/hypha-memory` / `memorybank-local-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memorybank-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-local-client.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryBankLocalClient` | class | <code>new MemoryBankLocalClient(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | Runtime implementation for Memory Bank Local Client; see its public constructor and members below. |
| `MEMORYBANK_LOCAL_PROTOCOL` | constant | <code>const MEMORYBANK_LOCAL_PROTOCOL: "hypha.memorybank.v1"</code> | MEMORYBANK LOCAL PROTOCOL constant exported by the `memorybank-local-client` module. |
| `MemoryBankClient` | interface | <code>interface MemoryBankClient extends ExternalMemoryClient</code> | Field contract for Memory Bank Client; see all contract members below. |
| `MemoryBankLocalClientOptions` | interface | <code>interface MemoryBankLocalClientOptions</code> | Field contract for Memory Bank Local Client Options; see all contract members below. |

## `MemoryBankLocalClient` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: MemoryBankLocalClientOptions): MemoryBankLocalClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;import("./contracts").ManagedMemoryRecord&lt;unknown&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `protocol` | property | <code>protocol: "hypha.memorybank.v1"</code> | Public protocol property. |
| `reconcile` | method | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for reconcile. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `MemoryBankClient` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `protocol` | property | <code>protocol: string</code> | Public protocol property. |
| `reconcile` | method | <code>reconcile(operationId: string, request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for reconcile. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `MemoryBankLocalClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey: string</code> | Public api Key property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
