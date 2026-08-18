# `@codesoul-co/hypha-memory` / `memory-server-migration-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-migration-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-schema.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptanceJsonSchema` | 常量 | <code>const memoryServerMigrationAcceptanceJsonSchema: JsonSchema</code> | memory Server Migration Acceptance 的 JSON Schema。 |
| `memoryServerMigrationAcceptanceSchema` | 常量 | <code>const memoryServerMigrationAcceptanceSchema: ZodType&lt;MemoryServerMigrationAcceptance, ZodTypeDef, MemoryServerMigrationAcceptance&gt;</code> | memory Server Migration Acceptance 的运行时 Schema。 |
| `validateMemoryServerMigrationAcceptance` | 函数 | <code>validateMemoryServerMigrationAcceptance(input: unknown): MemoryServerMigrationAcceptance</code> | 校验 Memory Server Migration Acceptance。 |
