# `@codesoul-co/hypha-memory` / `external-adapters`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/external-adapters.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)
- Exports: **19**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExternalMemoryManagementAdapter` | class | <code>new ExternalMemoryManagementAdapter(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | Runtime implementation for External Memory Management Adapter; see its public constructor and members below. |
| `InMemoryExternalMemoryMappingStore` | class | <code>new InMemoryExternalMemoryMappingStore(): InMemoryExternalMemoryMappingStore</code> | Runtime implementation for In Memory External Memory Mapping Store; see its public constructor and members below. |
| `Mem0MemoryManagementAdapter` | class | <code>new Mem0MemoryManagementAdapter(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | Runtime implementation for Mem0 Memory Management Adapter; see its public constructor and members below. |
| `MemoryBankMemoryManagementAdapter` | class | <code>new MemoryBankMemoryManagementAdapter(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | Runtime implementation for Memory Bank Memory Management Adapter; see its public constructor and members below. |
| `externalMemoryMappingSchema` | constant | <code>const externalMemoryMappingSchema: ZodType&lt;ExternalMemoryMapping, ZodTypeDef, ExternalMemoryMapping&gt;</code> | Runtime schema for external Memory Mapping. |
| `unsupportedMemoryManagementCapabilities` | constant | <code>const unsupportedMemoryManagementCapabilities: MemoryManagementCapabilities</code> | unsupported Memory Management Capabilities constant exported by the `external-adapters` module. |
| `negotiateMemoryManagementCapabilities` | function | <code>negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities</code> | Public runtime operation for negotiate Memory Management Capabilities. |
| `resolveExternalMemoryMappingStore` | function | <code>resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore &#124; undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore</code> | Resolves External Memory Mapping Store at this module boundary. |
| `ExternalMemoryAdapterOptions` | interface | <code>interface ExternalMemoryAdapterOptions</code> | Field contract for External Memory Adapter Options; see all contract members below. |
| `ExternalMemoryClient` | interface | <code>interface ExternalMemoryClient</code> | Field contract for External Memory Client; see all contract members below. |
| `ExternalMemoryMapping` | interface | <code>interface ExternalMemoryMapping</code> | Field contract for External Memory Mapping; see all contract members below. |
| `ExternalMemoryMappingBinding` | interface | <code>interface ExternalMemoryMappingBinding</code> | Field contract for External Memory Mapping Binding; see all contract members below. |
| `ExternalMemoryMappingStore` | interface | <code>interface ExternalMemoryMappingStore</code> | Field contract for External Memory Mapping Store; see all contract members below. |
| `ExternalProviderStateChange` | interface | <code>interface ExternalProviderStateChange</code> | Field contract for External Provider State Change; see all contract members below. |
| `Mem0MemoryManagementAdapterOptions` | interface | <code>interface Mem0MemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Field contract for Mem0 Memory Management Adapter Options; see all contract members below. |
| `MemoryBankMemoryManagementAdapterOptions` | interface | <code>interface MemoryBankMemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Field contract for Memory Bank Memory Management Adapter Options; see all contract members below. |
| `MemoryBankPolicySpec` | interface | <code>interface MemoryBankPolicySpec</code> | Field contract for Memory Bank Policy Spec; see all contract members below. |
| `ExternalMemoryMappingRuntimeProfile` | type | <code>type ExternalMemoryMappingRuntimeProfile = 'production' &#124; 'test' &#124; 'ephemeral'</code> | Public type alias for External Memory Mapping Runtime Profile. |
| `ExternalMemoryMappingStoreDurability` | type | <code>type ExternalMemoryMappingStoreDurability = 'ephemeral' &#124; 'durable'</code> | Public type alias for External Memory Mapping Store Durability. |

## `ExternalMemoryManagementAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `InMemoryExternalMemoryMappingStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryExternalMemoryMappingStore</code> | Creates an instance of this class. |
| `durability` | property | <code>durability: "ephemeral"</code> | Public durability property. |
| `get` | method | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Gets get at this module boundary. |
| `getByExternalId` | method | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Gets By External Id at this module boundary. |
| `list` | method | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `Mem0MemoryManagementAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `deployment` | property | <code>deployment: "self_hosted" &#124; "managed"</code> | Public deployment property. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `MemoryBankMemoryManagementAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `add` | method | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for add. |
| `capabilities` | method | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `history` | method | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | Public runtime operation for history. |
| `id` | property | <code>id: string</code> | Public id property. |
| `list` | method | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | Lists list at this module boundary. |
| `policy` | property | <code>policy: MemoryBankPolicySpec</code> | Public policy property. |
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `ExternalMemoryAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker: { failureThreshold: number; resetAfterMs: number; }</code> | Public circuit Breaker property. |
| `client` | property | <code>client: ExternalMemoryClient</code> | Public client property. |
| `fallback` | property | <code>fallback: MemoryManagementProvider</code> | Public fallback property. |
| `fallbackPolicy` | property | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | Public fallback Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `onStateChange` | method | <code>onStateChange(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | Handles State Change at this module boundary. |
| `retryAttempts` | property | <code>retryAttempts: number</code> | Public retry Attempts property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `ExternalMemoryClient` contract members

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
| `search` | method | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | Public runtime operation for search. |
| `update` | method | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public runtime operation for update. |

## `ExternalMemoryMapping` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `binding` | property | <code>binding: ExternalMemoryMappingBinding</code> | Public binding property. |
| `externalId` | property | <code>externalId: string</code> | Public external Id property. |
| `externalVersion` | property | <code>externalVersion: string</code> | Public external Version property. |
| `lastSyncedAt` | property | <code>lastSyncedAt: string</code> | Public last Synced At property. |
| `memoryId` | property | <code>memoryId: string</code> | Public memory Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `syncState` | property | <code>syncState: "failed" &#124; "deleted" &#124; "pending" &#124; "synced"</code> | Public sync State property. |

## `ExternalMemoryMappingBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `provenance` | property | <code>provenance: MemoryProvenance</code> | Public provenance property. |
| `recordRevision` | property | <code>recordRevision: number</code> | Public record Revision property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |

## `ExternalMemoryMappingStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `durability` | property | <code>durability: ExternalMemoryMappingStoreDurability</code> | Public durability property. |
| `get` | method | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Gets get at this module boundary. |
| `getByExternalId` | method | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Gets By External Id at this module boundary. |
| `list` | method | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `ExternalProviderStateChange` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public error property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `type` | property | <code>type: "degraded" &#124; "quarantined" &#124; "recovered" &#124; "circuit_opened"</code> | Public type property. |

## `Mem0MemoryManagementAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker: { failureThreshold: number; resetAfterMs: number; }</code> | Public circuit Breaker property. |
| `client` | property | <code>client: ExternalMemoryClient</code> | Public client property. |
| `deployment` | property | <code>deployment: "self_hosted" &#124; "managed"</code> | Public deployment property. |
| `fallback` | property | <code>fallback: MemoryManagementProvider</code> | Public fallback property. |
| `fallbackPolicy` | property | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | Public fallback Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `onStateChange` | method | <code>onStateChange(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | Handles State Change at this module boundary. |
| `retryAttempts` | property | <code>retryAttempts: number</code> | Public retry Attempts property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `MemoryBankMemoryManagementAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `circuitBreaker` | property | <code>circuitBreaker: { failureThreshold: number; resetAfterMs: number; }</code> | Public circuit Breaker property. |
| `client` | property | <code>client: ExternalMemoryClient</code> | Public client property. |
| `fallback` | property | <code>fallback: MemoryManagementProvider</code> | Public fallback property. |
| `fallbackPolicy` | property | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | Public fallback Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mappingProfile` | property | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | Public mapping Profile property. |
| `mappingStore` | property | <code>mappingStore: ExternalMemoryMappingStore</code> | Public mapping Store property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `onStateChange` | method | <code>onStateChange(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | Handles State Change at this module boundary. |
| `policy` | property | <code>policy: MemoryBankPolicySpec</code> | Public policy property. |
| `retryAttempts` | property | <code>retryAttempts: number</code> | Public retry Attempts property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `MemoryBankPolicySpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consolidationMinItems` | property | <code>consolidationMinItems: number</code> | Public consolidation Min Items property. |
| `consolidationThreshold` | property | <code>consolidationThreshold: number</code> | Public consolidation Threshold property. |
| `decayFunction` | property | <code>decayFunction: "custom" &#124; "exponential" &#124; "linear"</code> | Public decay Function property. |
| `decayHalfLifeSeconds` | property | <code>decayHalfLifeSeconds: number</code> | Public decay Half Life Seconds property. |
| `extractionProfileRef` | property | <code>extractionProfileRef: MemoryContractSpecRef</code> | Public extraction Profile Ref property. |
| `importanceThreshold` | property | <code>importanceThreshold: number</code> | Public importance Threshold property. |
| `preserveOriginals` | property | <code>preserveOriginals: boolean</code> | Public preserve Originals property. |
| `reinforcementFactor` | property | <code>reinforcementFactor: number</code> | Public reinforcement Factor property. |
