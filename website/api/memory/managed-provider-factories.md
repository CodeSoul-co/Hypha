# `@codesoul-co/hypha-memory` / `managed-provider-factories`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/managed-provider-factories.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-provider-factories.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MEM0_PLATFORM_FACTORY_ID` | constant | <code>const MEM0_PLATFORM_FACTORY_ID: "memory.factory.mem0.platform-v3"</code> | MEM0 PLATFORM FACTORY ID constant exported by the `managed-provider-factories` module. |
| `MEMORYBANK_MANAGED_FACTORY_ID` | constant | <code>const MEMORYBANK_MANAGED_FACTORY_ID: "memory.factory.memorybank.vertex-ai-managed"</code> | MEMORYBANK MANAGED FACTORY ID constant exported by the `managed-provider-factories` module. |
| `createMem0PlatformMemoryProviderFactory` | function | <code>createMem0PlatformMemoryProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | Creates Mem0 Platform Memory Provider Factory at this module boundary. |
| `createMemoryBankManagedProviderFactory` | function | <code>createMemoryBankManagedProviderFactory(options?: ManagedExternalProviderFactoryOptions): MemoryManagementProviderFactory</code> | Creates Memory Bank Managed Provider Factory at this module boundary. |
| `ManagedExternalProviderFactoryOptions` | interface | <code>interface ManagedExternalProviderFactoryOptions</code> | Field contract for Managed External Provider Factory Options; see all contract members below. |

## `ManagedExternalProviderFactoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fetch` | method | <code>fetch(url: string, init?: { method?: string; headers?: Record&lt;string, string&gt;; body?: string; signal?: AbortSignal; }): Promise&lt;import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/mem0-rest-client").Mem0HttpResponse&gt;</code> | Public runtime operation for fetch. |
