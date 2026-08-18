# `@codesoul-co/hypha-memory` / `managed-provider-factories`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/managed-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MEM0_PLATFORM_FACTORY_ID` | 常量 | <code>const MEM0_PLATFORM_FACTORY_ID: "memory.factory.mem0.platform-v3"</code> | 由 `managed-provider-factories` 模块导出的 MEM0 PLATFORM FACTORY ID 常量。 |
| `MEMORYBANK_MANAGED_FACTORY_ID` | 常量 | <code>const MEMORYBANK_MANAGED_FACTORY_ID: "memory.factory.memorybank.vertex-ai-managed"</code> | 由 `managed-provider-factories` 模块导出的 MEMORYBANK MANAGED FACTORY ID 常量。 |
| `createMem0PlatformMemoryProviderFactory` | 函数 | <code>createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | 创建 Mem0 Platform Memory Provider Factory。 |
| `createMemoryBankManagedProviderFactory` | 函数 | <code>createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | 创建 Memory Bank Managed Provider Factory。 |
| `ManagedExternalProviderFactoryOptions` | 接口 | <code>interface ManagedExternalProviderFactoryOptions</code> | Managed External Provider Factory Options 的字段契约；完整字段见下表。 |

## `ManagedExternalProviderFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
