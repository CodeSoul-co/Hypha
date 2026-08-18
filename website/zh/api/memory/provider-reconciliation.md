# `@codesoul-co/hypha-memory` / `provider-reconciliation`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/provider-reconciliation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-reconciliation.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createProviderReconciliationHandler` | 函数 | <code>createProviderReconciliationHandler(options: ProviderReconciliationHandlerOptions): MemoryLifecycleTaskHandler</code> | 创建 Provider Reconciliation Handler。 |
| `enqueueProviderDeleteReconciliation` | 函数 | <code>enqueueProviderDeleteReconciliation(request: ManagedMemoryDeleteRequest, result: ManagedMemoryDeleteResult, store: MemoryLifecycleTaskStore, now?: string): Promise&lt;MemoryLifecycleTask&lt;ProviderDeleteReconciliationPayload&gt;[]&gt;</code> | enqueue Provider Delete Reconciliation 的公开运行时操作。 |
| `ProviderDeleteReconciliationPayload` | 接口 | <code>interface ProviderDeleteReconciliationPayload</code> | Provider Delete Reconciliation Payload 的字段契约；完整字段见下表。 |
| `ProviderReconciliationHandlerOptions` | 接口 | <code>interface ProviderReconciliationHandlerOptions</code> | Provider Reconciliation Handler Options 的字段契约；完整字段见下表。 |

## `ProviderDeleteReconciliationPayload` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `operation` | 属性 | <code>operation: "delete"</code> | operation 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `request` | 属性 | <code>request: ManagedMemoryDeleteRequest</code> | request 字段。 |

## `ProviderReconciliationHandlerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `resolveProvider` | 方法 | <code>resolveProvider(providerId: string): MemoryManagementProvider &#124; undefined</code> | 解析 Provider。 |
