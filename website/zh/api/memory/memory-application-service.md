# `@codesoul-co/hypha-memory` / `memory-application-service`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-application-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-application-service.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryApplicationService` | 类 | <code>new DefaultMemoryApplicationService(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store. |
| `DefaultMemoryApplicationServiceOptions` | 接口 | <code>interface DefaultMemoryApplicationServiceOptions</code> | Default Memory Application Service Options 的字段契约；完整字段见下表。 |
| `MemoryApplicationService` | 接口 | <code>interface MemoryApplicationService</code> | Memory Application Service 的字段契约；完整字段见下表。 |

## `DefaultMemoryApplicationService` 公开成员

Canonical application-facing Memory surface. HTTP, Chat, Workflow and Harness integrations consume this service instead of selecting a Provider or Store.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `buildContext` | 方法 | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | 构建 Context。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryApplicationServiceOptions): DefaultMemoryApplicationService</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `explainContext` | 方法 | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | explain Context 的公开运行时操作。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `providerCapabilities` | 方法 | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | provider Capabilities 的公开运行时操作。 |
| `providerHealth` | 方法 | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | provider Health 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |

## `DefaultMemoryApplicationServiceOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: MemoryActivityPort</code> | activities 字段。 |
| `contextBuilder` | 属性 | <code>contextBuilder: MemoryContextBuilder</code> | context Builder 字段。 |
| `contextTimeoutMs` | 属性 | <code>contextTimeoutMs: number</code> | context Timeout Ms 字段。 |
| `eventContext` | 属性 | <code>eventContext: MemoryEventContext &#124; ((request: ContextBuildInput) =&gt; MemoryEventContext)</code> | event Context 字段。 |
| `manager` | 属性 | <code>manager: GovernedMemoryManager</code> | manager 字段。 |
| `provider` | 属性 | <code>provider: MemoryManagementProvider</code> | provider 字段。 |

## `MemoryApplicationService` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `add` | 方法 | <code>add(request: MemoryAddRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | add 的公开运行时操作。 |
| `buildContext` | 方法 | <code>buildContext(request: ContextBuildInput, signal?: AbortSignal): Promise&lt;ContextEnvelope&gt;</code> | 构建 Context。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(request: ManagedMemoryDeleteRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryDeleteResult&gt;</code> | 删除 delete。 |
| `explainContext` | 方法 | <code>explainContext(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | explain Context 的公开运行时操作。 |
| `get` | 方法 | <code>get(request: MemoryGetRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryRecord &#124; null&gt;</code> | 读取 get。 |
| `history` | 方法 | <code>history(request: MemoryHistoryRequest, signal?: AbortSignal): Promise&lt;MemoryVersion[]&gt;</code> | history 的公开运行时操作。 |
| `list` | 方法 | <code>list(request: MemoryListRequest, signal?: AbortSignal): Promise&lt;MemoryListResult&gt;</code> | 列出 list。 |
| `providerCapabilities` | 方法 | <code>providerCapabilities(): Promise&lt;MemoryManagementCapabilities&gt;</code> | provider Capabilities 的公开运行时操作。 |
| `providerHealth` | 方法 | <code>providerHealth(): Promise&lt;ProviderHealth&gt;</code> | provider Health 的公开运行时操作。 |
| `search` | 方法 | <code>search(request: ManagedMemorySearchRequest, signal?: AbortSignal): Promise&lt;ManagedMemorySearchResult[]&gt;</code> | search 的公开运行时操作。 |
| `update` | 方法 | <code>update(request: ManagedMemoryUpdateRequest, signal?: AbortSignal): Promise&lt;ManagedMemoryWriteResult&gt;</code> | update 的公开运行时操作。 |
