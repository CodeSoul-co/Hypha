# `@codesoul-co/hypha-memory` / `memory-server-migration-package-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-migration-package-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-package-schema.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationPackageSpecJsonSchema` | 常量 | <code>const memoryServerMigrationPackageSpecJsonSchema: JsonSchema</code> | memory Server Migration Package Spec 的 JSON Schema。 |
| `memoryServerMigrationPackageSpecSchema` | 常量 | <code>const memoryServerMigrationPackageSpecSchema: ZodType&lt;MemoryServerMigrationPackageSpec, ZodTypeDef, MemoryServerMigrationPackageSpec&gt;</code> | memory Server Migration Package Spec 的运行时 Schema。 |
| `validateMemoryServerMigrationPackageSpec` | 函数 | <code>validateMemoryServerMigrationPackageSpec(input: unknown): MemoryServerMigrationPackageSpec</code> | 校验 Memory Server Migration Package Spec。 |
