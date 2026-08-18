# `@codesoul-co/hypha-memory` / `structured-external-mapping-store`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/structured-external-mapping-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/structured-external-mapping-store.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `StructuredExternalMemoryMappingStore` | 类 | <code>new StructuredExternalMemoryMappingStore(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | Persistent, restart-safe mapping between Hypha memory IDs and provider IDs. |
| `StructuredExternalMemoryMappingStoreOptions` | 接口 | <code>interface StructuredExternalMemoryMappingStoreOptions</code> | Structured External Memory Mapping Store Options 的字段契约；完整字段见下表。 |

## `StructuredExternalMemoryMappingStore` 公开成员

Persistent, restart-safe mapping between Hypha memory IDs and provider IDs.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: StructuredExternalMemoryMappingStoreOptions): StructuredExternalMemoryMappingStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>durability: "durable"</code> | durability 字段。 |
| `get` | 方法 | <code>get(providerId: string, memoryId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 读取 get。 |
| `getByExternalId` | 方法 | <code>getByExternalId(providerId: string, externalId: string): Promise&lt;ExternalMemoryMapping &#124; null&gt;</code> | 读取 By External Id。 |
| `list` | 方法 | <code>list(providerId: string): Promise&lt;ExternalMemoryMapping[]&gt;</code> | 列出 list。 |
| `set` | 方法 | <code>set(mapping: ExternalMemoryMapping): Promise&lt;void&gt;</code> | 写入 set。 |

## `StructuredExternalMemoryMappingStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `store` | 属性 | <code>store: StructuredStoreProvider</code> | store 字段。 |
| `table` | 属性 | <code>table: string</code> | table 字段。 |
