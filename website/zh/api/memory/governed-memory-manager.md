# `@codesoul-co/hypha-memory` / `governed-memory-manager`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/governed-memory-manager.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/governed-memory-manager.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `GovernedMemoryManager` | 类 | <code>new GovernedMemoryManager(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort. |
| `governedMemoryProviderCapabilities` | 函数 | <code>governedMemoryProviderCapabilities(provider: MemoryManagementProvider): Promise&lt;MemoryManagementCapabilities&gt;</code> | governed Memory Provider Capabilities 的公开运行时操作。 |
| `governedMemoryProviderHealth` | 函数 | <code>governedMemoryProviderHealth(provider: MemoryManagementProvider): Promise&lt;ProviderHealth&gt;</code> | governed Memory Provider Health 的公开运行时操作。 |
| `registerMemoryManagementProviderHandlers` | 函数 | <code>registerMemoryManagementProviderHandlers(activities: MemoryActivityRegistrar &#124; DefaultMemoryActivityPort, provider: MemoryManagementProvider): void</code> | 注册 Memory Management Provider Handlers。 |
| `GovernedMemoryManagerOptions` | 接口 | <code>interface GovernedMemoryManagerOptions</code> | Governed Memory Manager Options 的字段契约；完整字段见下表。 |
| `MemoryActivityRegistrar` | 接口 | <code>interface MemoryActivityRegistrar</code> | Memory Activity Registrar 的字段契约；完整字段见下表。 |

## `GovernedMemoryManager` 公开成员

Canonical managed-memory entry point. Every operation is executed through the policy, harness, event, cancellation and timeout boundary of MemoryActivityPort.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: GovernedMemoryManagerOptions): GovernedMemoryManager</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `GovernedMemoryManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: MemoryActivityPort</code> | activities 字段。 |
| `eventContext` | 属性 | <code>eventContext: MemoryEventContext &#124; ((request: GovernedMemoryRequest) =&gt; MemoryEventContext)</code> | event Context 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef &#124; ((request: GovernedMemoryRequest) =&gt; MemoryContractSpecRef)</code> | profile Ref 字段。 |
| `projectionInvalidation` | 属性 | <code>projectionInvalidation: MemoryProjectionInvalidationPort</code> | projection Invalidation 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `reconciliationStore` | 属性 | <code>reconciliationStore: MemoryLifecycleTaskStore</code> | reconciliation Store 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `MemoryActivityRegistrar` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `register` | 方法 | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): unknown</code> | 注册 register。 |
