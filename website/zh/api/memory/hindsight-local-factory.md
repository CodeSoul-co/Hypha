# `@codesoul-co/hypha-memory` / `hindsight-local-factory`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/hindsight-local-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HINDSIGHT_LOCAL_FACTORY_ID` | 常量 | <code>const HINDSIGHT_LOCAL_FACTORY_ID: "memory.factory.memorybank.hindsight-local"</code> | 由 `hindsight-local-factory` 模块导出的 HINDSIGHT LOCAL FACTORY ID 常量。 |
| `createHindsightLocalMemoryProviderFactory` | 函数 | <code>createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory</code> | 创建 Hindsight Local Memory Provider Factory。 |
| `registerHindsightLocalMemoryProvider` | 函数 | <code>registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry</code> | 注册 Hindsight Local Memory Provider。 |
| `HindsightLocalConnection` | 接口 | <code>interface HindsightLocalConnection</code> | Hindsight Local Connection 的字段契约；完整字段见下表。 |
| `HindsightLocalFactoryOptions` | 接口 | <code>interface HindsightLocalFactoryOptions</code> | Hindsight Local Factory Options 的字段契约；完整字段见下表。 |

## `HindsightLocalConnection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `bearerToken` | 属性 | <code>bearerToken: string</code> | bearer Token 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |

## `HindsightLocalFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `operationDeadlineMs` | 属性 | <code>operationDeadlineMs: number</code> | operation Deadline Ms 字段。 |
