# `@codesoul-co/hypha-memory` / `profile-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/profile-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)
- 导出数: **39**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `embeddingProviderSpecDefinition` | 常量 | <code>const embeddingProviderSpecDefinition: SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;</code> | embedding Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `embeddingProviderSpecExample` | 常量 | <code>const embeddingProviderSpecExample: EmbeddingProviderSpec</code> | embedding Provider Spec 的有效示例值。 |
| `embeddingProviderSpecSchema` | 常量 | <code>const embeddingProviderSpecSchema: z.ZodType&lt;EmbeddingProviderSpec, z.ZodTypeDef, EmbeddingProviderSpec&gt;</code> | embedding Provider Spec 的运行时 Schema。 |
| `memoryConflictPolicySpecSchema` | 常量 | <code>const memoryConflictPolicySpecSchema: z.ZodType&lt;MemoryConflictPolicySpec, z.ZodTypeDef, MemoryConflictPolicySpec&gt;</code> | memory Conflict Policy Spec 的运行时 Schema。 |
| `memoryConsolidationPolicySpecSchema` | 常量 | <code>const memoryConsolidationPolicySpecSchema: z.ZodType&lt;MemoryConsolidationPolicySpec, z.ZodTypeDef, MemoryConsolidationPolicySpec&gt;</code> | memory Consolidation Policy Spec 的运行时 Schema。 |
| `memoryContractJsonSchemas` | 常量 | <code>const memoryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `profile-contract` 模块导出的 memory Contract Json Schemas 常量。 |
| `memoryContractSpecDefinitions` | 常量 | <code>const memoryContractSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;, SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;, SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;, SpecSchemaDefinition&lt;VectorStoreSpec&gt;, SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;]</code> | 由 `profile-contract` 模块导出的 memory Contract Spec Definitions 常量。 |
| `memoryContractSpecRefJsonSchema` | 常量 | <code>const memoryContractSpecRefJsonSchema: JsonSchema</code> | memory Contract Spec Ref 的 JSON Schema。 |
| `memoryContractSpecRefSchema` | 常量 | <code>const memoryContractSpecRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }&gt;</code> | memory Contract Spec Ref 的运行时 Schema。 |
| `memoryFallbackPolicySpecSchema` | 常量 | <code>const memoryFallbackPolicySpecSchema: z.ZodType&lt;MemoryFallbackPolicySpec, z.ZodTypeDef, MemoryFallbackPolicySpec&gt;</code> | memory Fallback Policy Spec 的运行时 Schema。 |
| `memoryIndexingPolicySpecSchema` | 常量 | <code>const memoryIndexingPolicySpecSchema: z.ZodType&lt;MemoryIndexingPolicySpec, z.ZodTypeDef, MemoryIndexingPolicySpec&gt;</code> | memory Indexing Policy Spec 的运行时 Schema。 |
| `memoryManagementCapabilitiesSchema` | 常量 | <code>const memoryManagementCapabilitiesSchema: z.ZodType&lt;MemoryManagementCapabilities, z.ZodTypeDef, MemoryManagementCapabilities&gt;</code> | memory Management Capabilities 的运行时 Schema。 |
| `memoryManagementProviderSpecDefinition` | 常量 | <code>const memoryManagementProviderSpecDefinition: SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;</code> | memory Management Provider Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryManagementProviderSpecExample` | 常量 | <code>const memoryManagementProviderSpecExample: MemoryManagementProviderSpec</code> | memory Management Provider Spec 的有效示例值。 |
| `memoryManagementProviderSpecSchema` | 常量 | <code>const memoryManagementProviderSpecSchema: z.ZodType&lt;MemoryManagementProviderSpec, z.ZodTypeDef, MemoryManagementProviderSpec&gt;</code> | memory Management Provider Spec 的运行时 Schema。 |
| `memoryPrivacyPolicySpecSchema` | 常量 | <code>const memoryPrivacyPolicySpecSchema: z.ZodType&lt;MemoryPrivacyPolicySpec, z.ZodTypeDef, MemoryPrivacyPolicySpec&gt;</code> | memory Privacy Policy Spec 的运行时 Schema。 |
| `memoryProfileSpecDefinition` | 常量 | <code>const memoryProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryProfileSpec&gt;</code> | memory Profile Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryProfileSpecExample` | 常量 | <code>const memoryProfileSpecExample: MemoryProfileSpec</code> | memory Profile Spec 的有效示例值。 |
| `memoryProfileSpecJsonSchema` | 常量 | <code>const memoryProfileSpecJsonSchema: JsonSchema</code> | memory Profile Spec 的 JSON Schema。 |
| `memoryProfileSpecSchema` | 常量 | <code>const memoryProfileSpecSchema: z.ZodType&lt;MemoryProfileSpec, z.ZodTypeDef, MemoryProfileSpec&gt;</code> | memory Profile Spec 的运行时 Schema。 |
| `memoryRecordStoreSpecDefinition` | 常量 | <code>const memoryRecordStoreSpecDefinition: SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;</code> | memory Record Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryRecordStoreSpecExample` | 常量 | <code>const memoryRecordStoreSpecExample: MemoryRecordStoreSpec</code> | memory Record Store Spec 的有效示例值。 |
| `memoryRecordStoreSpecSchema` | 常量 | <code>const memoryRecordStoreSpecSchema: z.ZodType&lt;MemoryRecordStoreSpec, z.ZodTypeDef, MemoryRecordStoreSpec&gt;</code> | memory Record Store Spec 的运行时 Schema。 |
| `memoryRetentionPolicySpecSchema` | 常量 | <code>const memoryRetentionPolicySpecSchema: z.ZodType&lt;MemoryRetentionPolicySpec, z.ZodTypeDef, MemoryRetentionPolicySpec&gt;</code> | memory Retention Policy Spec 的运行时 Schema。 |
| `memoryRetrievalPolicySpecSchema` | 常量 | <code>const memoryRetrievalPolicySpecSchema: z.ZodType&lt;MemoryRetrievalPolicySpec, z.ZodTypeDef, MemoryRetrievalPolicySpec&gt;</code> | memory Retrieval Policy Spec 的运行时 Schema。 |
| `memoryScopePolicySpecSchema` | 常量 | <code>const memoryScopePolicySpecSchema: z.ZodType&lt;MemoryScopePolicySpec, z.ZodTypeDef, MemoryScopePolicySpec&gt;</code> | memory Scope Policy Spec 的运行时 Schema。 |
| `memoryWritePolicySpecSchema` | 常量 | <code>const memoryWritePolicySpecSchema: z.ZodType&lt;MemoryWritePolicySpec, z.ZodTypeDef, MemoryWritePolicySpec&gt;</code> | memory Write Policy Spec 的运行时 Schema。 |
| `vectorStoreCapabilitiesSchema` | 常量 | <code>const vectorStoreCapabilitiesSchema: z.ZodType&lt;VectorStoreCapabilities, z.ZodTypeDef, VectorStoreCapabilities&gt;</code> | vector Store Capabilities 的运行时 Schema。 |
| `vectorStoreSpecDefinition` | 常量 | <code>const vectorStoreSpecDefinition: SpecSchemaDefinition&lt;VectorStoreSpec&gt;</code> | vector Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `vectorStoreSpecExample` | 常量 | <code>const vectorStoreSpecExample: VectorStoreSpec</code> | vector Store Spec 的有效示例值。 |
| `vectorStoreSpecSchema` | 常量 | <code>const vectorStoreSpecSchema: z.ZodType&lt;VectorStoreSpec, z.ZodTypeDef, VectorStoreSpec&gt;</code> | vector Store Spec 的运行时 Schema。 |
| `workingMemoryStoreSpecDefinition` | 常量 | <code>const workingMemoryStoreSpecDefinition: SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;</code> | working Memory Store Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workingMemoryStoreSpecExample` | 常量 | <code>const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec</code> | working Memory Store Spec 的有效示例值。 |
| `workingMemoryStoreSpecSchema` | 常量 | <code>const workingMemoryStoreSpecSchema: z.ZodType&lt;WorkingMemoryStoreSpec, z.ZodTypeDef, WorkingMemoryStoreSpec&gt;</code> | working Memory Store Spec 的运行时 Schema。 |
| `validateEmbeddingProviderSpec` | 函数 | <code>validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec</code> | 校验 Embedding Provider Spec。 |
| `validateMemoryProfileSpec` | 函数 | <code>validateMemoryProfileSpec(input: unknown): MemoryProfileSpec</code> | 校验 Memory Profile Spec。 |
| `validateMemoryRecordStoreSpec` | 函数 | <code>validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec</code> | 校验 Memory Record Store Spec。 |
| `validateVectorStoreSpec` | 函数 | <code>validateVectorStoreSpec(input: unknown): VectorStoreSpec</code> | 校验 Vector Store Spec。 |
| `validateWorkingMemoryStoreSpec` | 函数 | <code>validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec</code> | 校验 Working Memory Store Spec。 |
