# `@codesoul-co/hypha-memory` / `governed-memory-manager`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/governed-memory-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `GovernedMemoryManager` | class | <code>new GovernedMemoryManager(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort. |
| `governedMemoryProviderCapabilities` | function | <code>governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for governed Memory Provider Capabilities. |
| `governedMemoryProviderHealth` | function | <code>governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for governed Memory Provider Health. |
| `registerMemoryManagementProviderHandlers` | function | <code>registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar &#124; DefaultMemoryActivityPort, provider: MemoryManagementProvider): void</code> | Registers Memory Management Provider Handlers at this module boundary. |
| `GovernedMemoryManagerOptions` | interface | <code>interface GovernedMemoryManagerOptions</code> | Field contract for Governed Memory Manager Options; see all contract members below. |
| `MemoryActivityRegistrar` | interface | <code>interface MemoryActivityRegistrar</code> | Field contract for Memory Activity Registrar; see all contract members below. |

## `GovernedMemoryManager` public members

Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `constructor` | constructor | <code>(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `GovernedMemoryManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: MemoryActivityPort</code> | Public activities property. |
| `eventContext` | property | <code>eventContext: MemoryEventContext &#124; ((request: GovernedMemoryRequest) =&gt; MemoryEventContext)</code> | Public event Context property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef &#124; ((request: GovernedMemoryRequest) =&gt; MemoryContractSpecRef)</code> | Public profile Ref property. |
| `projectionInvalidation` | property | <code>projectionInvalidation: MemoryProjectionInvalidationPort</code> | Public projection Invalidation property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `reconciliationStore` | property | <code>reconciliationStore: MemoryLifecycleTaskStore</code> | Public reconciliation Store property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `MemoryActivityRegistrar` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `register` | method | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown</code> | Registers register at this module boundary. |
