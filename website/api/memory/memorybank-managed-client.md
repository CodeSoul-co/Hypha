# `@codesoul-co/hypha-memory` / `memorybank-managed-client`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memorybank-managed-client.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memorybank-managed-client.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryBankManagedClient` | class | <code>new MemoryBankManagedClient(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | Google Vertex AI Agent Engine Memory Bank managed client. |
| `MemoryBankManagedClientOptions` | interface | <code>interface MemoryBankManagedClientOptions</code> | Field contract for Memory Bank Managed Client Options; see all contract members below. |

## `MemoryBankManagedClient` public members

Google Vertex AI Agent Engine Memory Bank managed client.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: MemoryBankManagedClientOptions): MemoryBankManagedClient</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `reconcileOperation` | method | <code>reconcileOperation(operationId: string, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult &#124; null&gt;</code> | Public runtime operation for reconcile Operation. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `MemoryBankManagedClientOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `accessToken` | property | <code>accessToken: string</code> | Public access Token property. |
| `allowInsecureForTests` | property | <code>allowInsecureForTests: boolean</code> | Public allow Insecure For Tests property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `credentialProvider` | property | <code>credentialProvider: RenewableCredentialProvider</code> | Public credential Provider property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `location` | property | <code>location: string</code> | Public location property. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `maxOperationAttempts` | property | <code>maxOperationAttempts: number</code> | Public max Operation Attempts property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs: number</code> | Public operation Deadline Ms property. |
| `operationStore` | property | <code>operationStore: ExternalProviderOperationStore</code> | Public operation Store property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `projectId` | property | <code>projectId: string</code> | Public project Id property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `reasoningEngineId` | property | <code>reasoningEngineId: string</code> | Public reasoning Engine Id property. |
