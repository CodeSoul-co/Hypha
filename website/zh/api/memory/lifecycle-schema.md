# `@codesoul-co/hypha-memory` / `lifecycle-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/lifecycle-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryExtractionProfileSpecDefinition` | 常量 | <code>const memoryExtractionProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;</code> | memory Extraction Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryExtractionProfileSpecExample` | 常量 | <code>const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec</code> | memory Extraction Profile Spec 的有效示例值。 |
| `memoryExtractionProfileSpecJsonSchema` | 常量 | <code>const memoryExtractionProfileSpecJsonSchema: JsonSchema</code> | memory Extraction Profile Spec 的 JSON Schema。 |
| `memoryExtractionProfileSpecSchema` | 常量 | <code>const memoryExtractionProfileSpecSchema: z.ZodType&lt;MemoryExtractionProfileSpec, z.ZodTypeDef, MemoryExtractionProfileSpec&gt;</code> | memory Extraction Profile Spec 的运行时 Schema。 |
| `memoryExtractionSourceRefSchema` | 常量 | <code>const memoryExtractionSourceRefSchema: z.ZodType&lt;MemoryExtractionSourceRef, z.ZodTypeDef, MemoryExtractionSourceRef&gt;</code> | memory Extraction Source Ref 的运行时 Schema。 |
| `memoryExtractionSourceTypeSchema` | 常量 | <code>const memoryExtractionSourceTypeSchema: z.ZodEnum&lt;["conversation", "truth", "episodic_record", "runtime_event", "tool_observation", "artifact", "structured_record", "custom"]&gt;</code> | memory Extraction Source Type 的运行时 Schema。 |
| `memoryLifecycleJsonSchemas` | 常量 | <code>const memoryLifecycleJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `lifecycle-schema` 模块导出的 memory Lifecycle Json Schemas 常量。 |
| `memoryLifecycleSpecDefinitions` | 常量 | <code>const memoryLifecycleSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;]</code> | 由 `lifecycle-schema` 模块导出的 memory Lifecycle Spec Definitions 常量。 |
| `memoryMaintenancePolicySpecDefinition` | 常量 | <code>const memoryMaintenancePolicySpecDefinition: SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;</code> | memory Maintenance Policy Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryMaintenancePolicySpecExample` | 常量 | <code>const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec</code> | memory Maintenance Policy Spec 的有效示例值。 |
| `memoryMaintenancePolicySpecJsonSchema` | 常量 | <code>const memoryMaintenancePolicySpecJsonSchema: JsonSchema</code> | memory Maintenance Policy Spec 的 JSON Schema。 |
| `memoryMaintenancePolicySpecSchema` | 常量 | <code>const memoryMaintenancePolicySpecSchema: z.ZodType&lt;MemoryMaintenancePolicySpec, z.ZodTypeDef, MemoryMaintenancePolicySpec&gt;</code> | memory Maintenance Policy Spec 的运行时 Schema。 |
| `validateMemoryExtractionProfileSpec` | 函数 | <code>validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec</code> | 校验 Memory Extraction Profile Spec。 |
| `validateMemoryMaintenancePolicySpec` | 函数 | <code>validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec</code> | 校验 Memory Maintenance Policy Spec。 |
