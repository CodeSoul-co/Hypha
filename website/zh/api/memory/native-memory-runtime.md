# `@codesoul-co/hypha-memory` / `native-memory-runtime`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/native-memory-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/native-memory-runtime.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createNativeMemoryManagementProviderFactory` | 函数 | <code>createNativeMemoryManagementProviderFactory(dependencies: NativeMemoryRuntimeDependencies): MemoryManagementProviderFactory</code> | 创建 Native Memory Management Provider Factory。 |
| `NativeMemoryRuntimeDependencies` | 接口 | <code>interface NativeMemoryRuntimeDependencies</code> | Native Memory Runtime Dependencies 的字段契约；完整字段见下表。 |
| `NativeMemoryRuntimeResources` | 接口 | <code>interface NativeMemoryRuntimeResources</code> | Native Memory Runtime Resources 的字段契约；完整字段见下表。 |

## `NativeMemoryRuntimeDependencies` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `embeddingProvider` | 属性 | <code>embeddingProvider: EmbeddingProvider</code> | embedding Provider 字段。 |
| `embeddingProviderId` | 属性 | <code>embeddingProviderId: string</code> | embedding Provider Id 字段。 |
| `events` | 属性 | <code>events: MemoryEventPublisher</code> | events 字段。 |
| `lifecycleHandlers` | 属性 | <code>lifecycleHandlers: Partial&lt;Record&lt;MemoryLifecycleWorkerType, MemoryLifecycleTaskHandler&gt;&gt;</code> | lifecycle Handlers 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `onIndexEvent` | 方法 | <code>onIndexEvent(event: IndexOutboxWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 处理 Index Event。 |
| `onLifecycleEvent` | 方法 | <code>onLifecycleEvent(event: MemoryLifecycleWorkerEvent): void &#124; Promise&lt;void&gt;</code> | 处理 Lifecycle Event。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | owner Id 字段。 |
| `redisClient` | 属性 | <code>redisClient: RedisLikeWorkingMemoryClient</code> | redis Client 字段。 |
| `structuredStore` | 属性 | <code>structuredStore: StructuredStoreProvider</code> | structured Store 字段。 |
| `structuredStoreId` | 属性 | <code>structuredStoreId: string</code> | structured Store Id 字段。 |
| `vectorStores` | 属性 | <code>vectorStores: ManagedVectorStoreAdapter[]</code> | vector Stores 字段。 |
| `workingMemoryNamespace` | 属性 | <code>workingMemoryNamespace: string</code> | working Memory Namespace 字段。 |
| `workingMemoryTtlSeconds` | 属性 | <code>workingMemoryTtlSeconds: number</code> | working Memory Ttl Seconds 字段。 |

## `NativeMemoryRuntimeResources` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `lifecycleStore` | 属性 | <code>lifecycleStore: StructuredMemoryLifecycleTaskStore</code> | lifecycle Store 字段。 |
| `supervisor` | 属性 | <code>supervisor: MemoryWorkerSupervisor</code> | supervisor 字段。 |
| `workingStore` | 属性 | <code>workingStore: WorkingMemoryStore</code> | working Store 字段。 |
