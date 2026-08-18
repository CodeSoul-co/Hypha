# `@codesoul-co/hypha-memory` / `external-adapters`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/external-adapters.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-adapters.ts)
- 导出数: **19**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExternalMemoryManagementAdapter` | 类 | <code>new ExternalMemoryManagementAdapter(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | External Memory Management Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryExternalMemoryMappingStore` | 类 | <code>new InMemoryExternalMemoryMappingStore(): InMemoryExternalMemoryMappingStore</code> | In Memory External Memory Mapping Store 的运行时实现；公开构造函数与成员见下表。 |
| `Mem0MemoryManagementAdapter` | 类 | <code>new Mem0MemoryManagementAdapter(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | Mem0 Memory Management Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryBankMemoryManagementAdapter` | 类 | <code>new MemoryBankMemoryManagementAdapter(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | Memory Bank Memory Management Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `externalMemoryMappingSchema` | 常量 | <code>const externalMemoryMappingSchema: ZodType&lt;ExternalMemoryMapping, ZodTypeDef, ExternalMemoryMapping&gt;</code> | external Memory Mapping 的运行时 Schema。 |
| `unsupportedMemoryManagementCapabilities` | 常量 | <code>const unsupportedMemoryManagementCapabilities: MemoryManagementCapabilities</code> | 由 `external-adapters` 模块导出的 unsupported Memory Management Capabilities 常量。 |
| `negotiateMemoryManagementCapabilities` | 函数 | <code>negotiateMemoryManagementCapabilities(value: unknown): MemoryManagementCapabilities</code> | negotiate Memory Management Capabilities 的公开运行时操作。 |
| `resolveExternalMemoryMappingStore` | 函数 | <code>resolveExternalMemoryMappingStore(store: ExternalMemoryMappingStore &#124; undefined, profile: ExternalMemoryMappingRuntimeProfile): ExternalMemoryMappingStore</code> | 解析 External Memory Mapping Store。 |
| `ExternalMemoryAdapterOptions` | 接口 | <code>interface ExternalMemoryAdapterOptions</code> | External Memory Adapter Options 的字段契约；完整字段见下表。 |
| `ExternalMemoryClient` | 接口 | <code>interface ExternalMemoryClient</code> | External Memory Client 的字段契约；完整字段见下表。 |
| `ExternalMemoryMapping` | 接口 | <code>interface ExternalMemoryMapping</code> | External Memory Mapping 的字段契约；完整字段见下表。 |
| `ExternalMemoryMappingBinding` | 接口 | <code>interface ExternalMemoryMappingBinding</code> | External Memory Mapping Binding 的字段契约；完整字段见下表。 |
| `ExternalMemoryMappingStore` | 接口 | <code>interface ExternalMemoryMappingStore</code> | External Memory Mapping Store 的字段契约；完整字段见下表。 |
| `ExternalProviderStateChange` | 接口 | <code>interface ExternalProviderStateChange</code> | External Provider State Change 的字段契约；完整字段见下表。 |
| `Mem0MemoryManagementAdapterOptions` | 接口 | <code>interface Mem0MemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Mem0 Memory Management Adapter Options 的字段契约；完整字段见下表。 |
| `MemoryBankMemoryManagementAdapterOptions` | 接口 | <code>interface MemoryBankMemoryManagementAdapterOptions extends Omit&lt;ExternalMemoryAdapterOptions, 'id'&gt;</code> | Memory Bank Memory Management Adapter Options 的字段契约；完整字段见下表。 |
| `MemoryBankPolicySpec` | 接口 | <code>interface MemoryBankPolicySpec</code> | Memory Bank Policy Spec 的字段契约；完整字段见下表。 |
| `ExternalMemoryMappingRuntimeProfile` | 类型 | <code>type ExternalMemoryMappingRuntimeProfile = 'production' &#124; 'test' &#124; 'ephemeral'</code> | External Memory Mapping Runtime Profile 的公共类型别名。 |
| `ExternalMemoryMappingStoreDurability` | 类型 | <code>type ExternalMemoryMappingStoreDurability = 'ephemeral' &#124; 'durable'</code> | External Memory Mapping Store Durability 的公共类型别名。 |

## `ExternalMemoryManagementAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: ExternalMemoryAdapterOptions): ExternalMemoryManagementAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `InMemoryExternalMemoryMappingStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryExternalMemoryMappingStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>durability: "ephemeral"</code> | durability 字段。 |
| `get` | 方法 | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 读取 get。 |
| `getByExternalId` | 方法 | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 读取 By External Id。 |
| `list` | 方法 | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | 写入 set。 |

## `Mem0MemoryManagementAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: Mem0MemoryManagementAdapterOptions): Mem0MemoryManagementAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `deployment` | 属性 | <code>deployment: "self_hosted" &#124; "managed"</code> | deployment 字段。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `MemoryBankMemoryManagementAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MemoryBankMemoryManagementAdapterOptions): MemoryBankMemoryManagementAdapter</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `policy` | 属性 | <code>policy: MemoryBankPolicySpec</code> | policy 字段。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `ExternalMemoryAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker: { failureThreshold: number; resetAfterMs: number; }</code> | circuit Breaker 字段。 |
| `client` | 属性 | <code>client: ExternalMemoryClient</code> | client 字段。 |
| `fallback` | 属性 | <code>fallback: MemoryManagementProvider</code> | fallback 字段。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | fallback Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `onStateChange` | 方法 | <code>onStateChange(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | 处理 State Change。 |
| `retryAttempts` | 属性 | <code>retryAttempts: number</code> | retry Attempts 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `ExternalMemoryClient` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `capabilities` | 方法 | <code>capabilities(signal?: AbortSignal): Promise&lt;Partial&lt;MemoryManagementCapabilities&gt;&gt;</code> | capabilities 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `health` | 方法 | <code>health(signal?: AbortSignal): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `ExternalMemoryMapping` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `binding` | 属性 | <code>binding: ExternalMemoryMappingBinding</code> | binding 字段。 |
| `externalId` | 属性 | <code>externalId: string</code> | external Id 字段。 |
| `externalVersion` | 属性 | <code>externalVersion: string</code> | external Version 字段。 |
| `lastSyncedAt` | 属性 | <code>lastSyncedAt: string</code> | last Synced At 字段。 |
| `memoryId` | 属性 | <code>memoryId: string</code> | memory Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `syncState` | 属性 | <code>syncState: "failed" &#124; "deleted" &#124; "pending" &#124; "synced"</code> | sync State 字段。 |

## `ExternalMemoryMappingBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `provenance` | 属性 | <code>provenance: MemoryProvenance</code> | provenance 字段。 |
| `recordRevision` | 属性 | <code>recordRevision: number</code> | record Revision 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |

## `ExternalMemoryMappingStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `durability` | 属性 | <code>durability: ExternalMemoryMappingStoreDurability</code> | durability 字段。 |
| `get` | 方法 | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 读取 get。 |
| `getByExternalId` | 方法 | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 读取 By External Id。 |
| `list` | 方法 | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | 写入 set。 |

## `ExternalProviderStateChange` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: NormalizedMemoryError</code> | error 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `type` | 属性 | <code>type: "degraded" &#124; "quarantined" &#124; "recovered" &#124; "circuit_opened"</code> | type 字段。 |

## `Mem0MemoryManagementAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker: { failureThreshold: number; resetAfterMs: number; }</code> | circuit Breaker 字段。 |
| `client` | 属性 | <code>client: ExternalMemoryClient</code> | client 字段。 |
| `deployment` | 属性 | <code>deployment: "self_hosted" &#124; "managed"</code> | deployment 字段。 |
| `fallback` | 属性 | <code>fallback: MemoryManagementProvider</code> | fallback 字段。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | fallback Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `onStateChange` | 方法 | <code>onStateChange(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | 处理 State Change。 |
| `retryAttempts` | 属性 | <code>retryAttempts: number</code> | retry Attempts 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `MemoryBankMemoryManagementAdapterOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `circuitBreaker` | 属性 | <code>circuitBreaker: { failureThreshold: number; resetAfterMs: number; }</code> | circuit Breaker 字段。 |
| `client` | 属性 | <code>client: ExternalMemoryClient</code> | client 字段。 |
| `fallback` | 属性 | <code>fallback: MemoryManagementProvider</code> | fallback 字段。 |
| `fallbackPolicy` | 属性 | <code>fallbackPolicy: MemoryFallbackPolicySpec</code> | fallback Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mappingProfile` | 属性 | <code>mappingProfile: ExternalMemoryMappingRuntimeProfile</code> | mapping Profile 字段。 |
| `mappingStore` | 属性 | <code>mappingStore: ExternalMemoryMappingStore</code> | mapping Store 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `onStateChange` | 方法 | <code>onStateChange(event: ExternalProviderStateChange): void &#124; Promise&lt;void&gt;</code> | 处理 State Change。 |
| `policy` | 属性 | <code>policy: MemoryBankPolicySpec</code> | policy 字段。 |
| `retryAttempts` | 属性 | <code>retryAttempts: number</code> | retry Attempts 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `MemoryBankPolicySpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consolidationMinItems` | 属性 | <code>consolidationMinItems: number</code> | consolidation Min Items 字段。 |
| `consolidationThreshold` | 属性 | <code>consolidationThreshold: number</code> | consolidation Threshold 字段。 |
| `decayFunction` | 属性 | <code>decayFunction: "custom" &#124; "exponential" &#124; "linear"</code> | decay Function 字段。 |
| `decayHalfLifeSeconds` | 属性 | <code>decayHalfLifeSeconds: number</code> | decay Half Life Seconds 字段。 |
| `extractionProfileRef` | 属性 | <code>extractionProfileRef: MemoryContractSpecRef</code> | extraction Profile Ref 字段。 |
| `importanceThreshold` | 属性 | <code>importanceThreshold: number</code> | importance Threshold 字段。 |
| `preserveOriginals` | 属性 | <code>preserveOriginals: boolean</code> | preserve Originals 字段。 |
| `reinforcementFactor` | 属性 | <code>reinforcementFactor: number</code> | reinforcement Factor 字段。 |
