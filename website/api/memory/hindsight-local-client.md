# `@codesoul-co/hypha-memory` / `hindsight-local-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/hindsight-local-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-client.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HindsightLocalMemoryBankClient` | class | <code>new HindsightLocalMemoryBankClient(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | Native adapter for Hindsight Self-hosted HTTP API 0.8. |
| `HINDSIGHT_LOCAL_PROTOCOL` | constant | <code>const HINDSIGHT_LOCAL_PROTOCOL: "hindsight.http.v0.8"</code> | HINDSIGHT LOCAL PROTOCOL constant exported by the `hindsight-local-client` module. |
| `HINDSIGHT_LOCAL_VERSION` | constant | <code>const HINDSIGHT_LOCAL_VERSION: "0.8.5"</code> | HINDSIGHT LOCAL VERSION constant exported by the `hindsight-local-client` module. |
| `bankIdForScope` | function | <code>bankIdForScope(scope: ManagedMemoryScope): string</code> | Public runtime operation for bank Id For Scope. |
| `documentIdForOperation` | function | <code>documentIdForOperation(operationId: string): string</code> | Public runtime operation for document Id For Operation. |
| `HindsightLocalMemoryBankClientOptions` | interface | <code>interface HindsightLocalMemoryBankClientOptions</code> | Field contract for Hindsight Local Memory Bank Client Options; see all contract members below. |

## `HindsightLocalMemoryBankClient` public members

Native adapter for Hindsight Self-hosted HTTP API 0.8.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: HindsightLocalMemoryBankClientOptions): HindsightLocalMemoryBankClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `protocol` | property | <code>protocol: "hindsight.http.v0.8"</code> | Public protocol property. |
| `reconcileOperation` | method | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | Public runtime operation for reconcile Operation. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `HindsightLocalMemoryBankClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `bearerToken` | property | <code>bearerToken: string</code> | Public bearer Token property. |
| `expectedApiVersion` | property | <code>expectedApiVersion: string</code> | Public expected Api Version property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs: number</code> | Public operation Deadline Ms property. |
| `operationProfile` | property | <code>operationProfile: ExternalMemoryMappingRuntimeProfile</code> | Public operation Profile property. |
| `operationStore` | property | <code>operationStore: ExternalProviderOperationStore</code> | Public operation Store property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
