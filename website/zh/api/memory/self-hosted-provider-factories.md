# `@codesoul-co/hypha-memory` / `self-hosted-provider-factories`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/self-hosted-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MEM0_OSS_FACTORY_ID` | 常量 | <code>const MEM0_OSS_FACTORY_ID: "memory.factory.mem0.oss-rest"</code> | 由 `self-hosted-provider-factories` 模块导出的 MEM0 OSS FACTORY ID 常量。 |
| `createMem0OssMemoryProviderFactory` | 函数 | <code>createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory</code> | 创建 Mem0 Oss Memory Provider Factory。 |
| `registerMem0OssMemoryProvider` | 函数 | <code>registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry</code> | 注册 Mem0 Oss Memory Provider。 |
| `Mem0OssConnection` | 接口 | <code>interface Mem0OssConnection</code> | Mem0 Oss Connection 的字段契约；完整字段见下表。 |
| `Mem0OssProviderFactoryOptions` | 接口 | <code>interface Mem0OssProviderFactoryOptions</code> | Mem0 Oss Provider Factory Options 的字段契约；完整字段见下表。 |

## `Mem0OssConnection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `apiKey` | 属性 | <code>apiKey: string</code> | api Key 字段。 |
| `authMode` | 属性 | <code>authMode: "none" &#124; "x-api-key" &#124; "bearer"</code> | auth Mode 字段。 |
| `baseUrl` | 属性 | <code>baseUrl: string</code> | base Url 字段。 |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | provider Version 字段。 |

## `Mem0OssProviderFactoryOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fetch` | 方法 | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | fetch 的公开运行时操作。 |
