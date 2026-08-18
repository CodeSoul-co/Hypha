# `@codesoul-co/hypha-memory` / `hindsight-local-factory`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/hindsight-local-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/hindsight-local-factory.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HINDSIGHT_LOCAL_FACTORY_ID` | constant | <code>const HINDSIGHT_LOCAL_FACTORY_ID: "memory.factory.memorybank.hindsight-local"</code> | HINDSIGHT LOCAL FACTORY ID constant exported by the `hindsight-local-factory` module. |
| `createHindsightLocalMemoryProviderFactory` | function | <code>createHindsightLocalMemoryProviderFactory(options?: HindsightLocalFactoryOptions): MemoryManagementProviderFactory</code> | Creates Hindsight Local Memory Provider Factory at this module boundary. |
| `registerHindsightLocalMemoryProvider` | function | <code>registerHindsightLocalMemoryProvider(registry: MemoryManagementProviderRegistry, options?: HindsightLocalFactoryOptions): MemoryManagementProviderRegistry</code> | Registers Hindsight Local Memory Provider at this module boundary. |
| `HindsightLocalConnection` | interface | <code>interface HindsightLocalConnection</code> | Field contract for Hindsight Local Connection; see all contract members below. |
| `HindsightLocalFactoryOptions` | interface | <code>interface HindsightLocalFactoryOptions</code> | Field contract for Hindsight Local Factory Options; see all contract members below. |

## `HindsightLocalConnection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public base Url property. |
| `bearerToken` | property | <code>bearerToken: string</code> | Public bearer Token property. |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |

## `HindsightLocalFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
| `operationDeadlineMs` | property | <code>operationDeadlineMs: number</code> | Public operation Deadline Ms property. |
