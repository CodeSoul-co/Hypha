# `@codesoul-co/hypha-memory` / `self-hosted-provider-factories`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/self-hosted-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/self-hosted-provider-factories.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MEM0_OSS_FACTORY_ID` | constant | <code>const MEM0_OSS_FACTORY_ID: "memory.factory.mem0.oss-rest"</code> | MEM0 OSS FACTORY ID constant exported by the `self-hosted-provider-factories` module. |
| `createMem0OssMemoryProviderFactory` | function | <code>createMem0OssMemoryProviderFactory(options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderFactory</code> | Creates Mem0 Oss Memory Provider Factory at this module boundary. |
| `registerMem0OssMemoryProvider` | function | <code>registerMem0OssMemoryProvider(registry: MemoryManagementProviderRegistry, options?: Mem0OssProviderFactoryOptions): MemoryManagementProviderRegistry</code> | Registers Mem0 Oss Memory Provider at this module boundary. |
| `Mem0OssConnection` | interface | <code>interface Mem0OssConnection</code> | Field contract for Mem0 Oss Connection; see all contract members below. |
| `Mem0OssProviderFactoryOptions` | interface | <code>interface Mem0OssProviderFactoryOptions</code> | Field contract for Mem0 Oss Provider Factory Options; see all contract members below. |

## `Mem0OssConnection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKey` | property | <code>apiKey: string</code> | Public api Key property. |
| `authMode` | property | <code>authMode: "none" &#124; "x-api-key" &#124; "bearer"</code> | Public auth Mode property. |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public provider Version property. |

## `Mem0OssProviderFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
