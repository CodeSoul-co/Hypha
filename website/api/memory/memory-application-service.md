# `@codesoul-co/hypha-memory` / `memory-application-service`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-application-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryApplicationService` | class | <code>new DefaultMemoryApplicationService(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store. |
| `DefaultMemoryApplicationServiceOptions` | interface | <code>interface DefaultMemoryApplicationServiceOptions</code> | Field contract for Default Memory Application Service Options; see all contract members below. |
| `MemoryApplicationService` | interface | <code>interface MemoryApplicationService</code> | Field contract for Memory Application Service; see all contract members below. |

## `DefaultMemoryApplicationService` public members

Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `buildContext` | method | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | Builds Context at this module boundary. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `explainContext` | method | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public runtime operation for explain Context. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `providerCapabilities` | method | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for provider Capabilities. |
| `providerHealth` | method | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for provider Health. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `DefaultMemoryApplicationServiceOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: MemoryActivityPort</code> | Public activities property. |
| `contextBuilder` | property | <code>contextBuilder: MemoryContextBuilder</code> | Public context Builder property. |
| `contextTimeoutMs` | property | <code>contextTimeoutMs: number</code> | Public context Timeout Ms property. |
| `eventContext` | property | <code>eventContext: MemoryEventContext &#124; ((request: ContextBuildInput) =&gt; MemoryEventContext)</code> | Public event Context property. |
| `manager` | property | <code>manager: GovernedMemoryManager</code> | Public manager property. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public provider property. |

## `MemoryApplicationService` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `buildContext` | method | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | Builds Context at this module boundary. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `explainContext` | method | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public runtime operation for explain Context. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `providerCapabilities` | method | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for provider Capabilities. |
| `providerHealth` | method | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for provider Health. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |
