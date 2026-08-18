# `@codesoul-co/hypha-memory` / `structured-external-mapping-store`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/structured-external-mapping-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `StructuredExternalMemoryMappingStore` | class | <code>new StructuredExternalMemoryMappingStore(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | Persistent, restart-safe mapping between Hypha memory IDs and provider IDs. |
| `StructuredExternalMemoryMappingStoreOptions` | interface | <code>interface StructuredExternalMemoryMappingStoreOptions</code> | Field contract for Structured External Memory Mapping Store Options; see all contract members below. |

## `StructuredExternalMemoryMappingStore` public members

Persistent, restart-safe mapping between Hypha memory IDs and provider IDs.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | Creates an instance of this class. |
| `durability` | property | <code>durability: "durable"</code> | Public durability property. |
| `get` | method | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Gets get at this module boundary. |
| `getByExternalId` | method | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | Gets By External Id at this module boundary. |
| `list` | method | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | Lists list at this module boundary. |
| `set` | method | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `StructuredExternalMemoryMappingStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `store` | property | <code>store: StructuredStoreProvider</code> | Public store property. |
| `table` | property | <code>table: string</code> | Public table property. |
