# `@codesoul-co/hypha-memory` / `profile-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/profile-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/profile-contract.ts)
- Exports: **39**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `embeddingProviderSpecDefinition` | constant | <code>const embeddingProviderSpecDefinition: SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;</code> | Runtime validation entrypoint for the embedding Provider spec, combining its parser, example and JSON Schema. |
| `embeddingProviderSpecExample` | constant | <code>const embeddingProviderSpecExample: EmbeddingProviderSpec</code> | Valid example value for embedding Provider Spec. |
| `embeddingProviderSpecSchema` | constant | <code>const embeddingProviderSpecSchema: z.ZodType&lt;EmbeddingProviderSpec, z.ZodTypeDef, EmbeddingProviderSpec&gt;</code> | Runtime schema for embedding Provider Spec. |
| `memoryConflictPolicySpecSchema` | constant | <code>const memoryConflictPolicySpecSchema: z.ZodType&lt;MemoryConflictPolicySpec, z.ZodTypeDef, MemoryConflictPolicySpec&gt;</code> | Runtime schema for memory Conflict Policy Spec. |
| `memoryConsolidationPolicySpecSchema` | constant | <code>const memoryConsolidationPolicySpecSchema: z.ZodType&lt;MemoryConsolidationPolicySpec, z.ZodTypeDef, MemoryConsolidationPolicySpec&gt;</code> | Runtime schema for memory Consolidation Policy Spec. |
| `memoryContractJsonSchemas` | constant | <code>const memoryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | memory Contract Json Schemas constant exported by the `profile-contract` module. |
| `memoryContractSpecDefinitions` | constant | <code>const memoryContractSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;, SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;, SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;, SpecSchemaDefinition&lt;VectorStoreSpec&gt;, SpecSchemaDefinition&lt;EmbeddingProviderSpec&gt;]</code> | memory Contract Spec Definitions constant exported by the `profile-contract` module. |
| `memoryContractSpecRefJsonSchema` | constant | <code>const memoryContractSpecRefJsonSchema: JsonSchema</code> | JSON Schema for memory Contract Spec Ref. |
| `memoryContractSpecRefSchema` | constant | <code>const memoryContractSpecRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; }&gt;</code> | Runtime schema for memory Contract Spec Ref. |
| `memoryFallbackPolicySpecSchema` | constant | <code>const memoryFallbackPolicySpecSchema: z.ZodType&lt;MemoryFallbackPolicySpec, z.ZodTypeDef, MemoryFallbackPolicySpec&gt;</code> | Runtime schema for memory Fallback Policy Spec. |
| `memoryIndexingPolicySpecSchema` | constant | <code>const memoryIndexingPolicySpecSchema: z.ZodType&lt;MemoryIndexingPolicySpec, z.ZodTypeDef, MemoryIndexingPolicySpec&gt;</code> | Runtime schema for memory Indexing Policy Spec. |
| `memoryManagementCapabilitiesSchema` | constant | <code>const memoryManagementCapabilitiesSchema: z.ZodType&lt;MemoryManagementCapabilities, z.ZodTypeDef, MemoryManagementCapabilities&gt;</code> | Runtime schema for memory Management Capabilities. |
| `memoryManagementProviderSpecDefinition` | constant | <code>const memoryManagementProviderSpecDefinition: SpecSchemaDefinition&lt;MemoryManagementProviderSpec&gt;</code> | Runtime validation entrypoint for the memory Management Provider spec, combining its parser, example and JSON Schema. |
| `memoryManagementProviderSpecExample` | constant | <code>const memoryManagementProviderSpecExample: MemoryManagementProviderSpec</code> | Valid example value for memory Management Provider Spec. |
| `memoryManagementProviderSpecSchema` | constant | <code>const memoryManagementProviderSpecSchema: z.ZodType&lt;MemoryManagementProviderSpec, z.ZodTypeDef, MemoryManagementProviderSpec&gt;</code> | Runtime schema for memory Management Provider Spec. |
| `memoryPrivacyPolicySpecSchema` | constant | <code>const memoryPrivacyPolicySpecSchema: z.ZodType&lt;MemoryPrivacyPolicySpec, z.ZodTypeDef, MemoryPrivacyPolicySpec&gt;</code> | Runtime schema for memory Privacy Policy Spec. |
| `memoryProfileSpecDefinition` | constant | <code>const memoryProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryProfileSpec&gt;</code> | Runtime validation entrypoint for the memory Profile spec, combining its parser, example and JSON Schema. |
| `memoryProfileSpecExample` | constant | <code>const memoryProfileSpecExample: MemoryProfileSpec</code> | Valid example value for memory Profile Spec. |
| `memoryProfileSpecJsonSchema` | constant | <code>const memoryProfileSpecJsonSchema: JsonSchema</code> | JSON Schema for memory Profile Spec. |
| `memoryProfileSpecSchema` | constant | <code>const memoryProfileSpecSchema: z.ZodType&lt;MemoryProfileSpec, z.ZodTypeDef, MemoryProfileSpec&gt;</code> | Runtime schema for memory Profile Spec. |
| `memoryRecordStoreSpecDefinition` | constant | <code>const memoryRecordStoreSpecDefinition: SpecSchemaDefinition&lt;MemoryRecordStoreSpec&gt;</code> | Runtime validation entrypoint for the memory Record Store spec, combining its parser, example and JSON Schema. |
| `memoryRecordStoreSpecExample` | constant | <code>const memoryRecordStoreSpecExample: MemoryRecordStoreSpec</code> | Valid example value for memory Record Store Spec. |
| `memoryRecordStoreSpecSchema` | constant | <code>const memoryRecordStoreSpecSchema: z.ZodType&lt;MemoryRecordStoreSpec, z.ZodTypeDef, MemoryRecordStoreSpec&gt;</code> | Runtime schema for memory Record Store Spec. |
| `memoryRetentionPolicySpecSchema` | constant | <code>const memoryRetentionPolicySpecSchema: z.ZodType&lt;MemoryRetentionPolicySpec, z.ZodTypeDef, MemoryRetentionPolicySpec&gt;</code> | Runtime schema for memory Retention Policy Spec. |
| `memoryRetrievalPolicySpecSchema` | constant | <code>const memoryRetrievalPolicySpecSchema: z.ZodType&lt;MemoryRetrievalPolicySpec, z.ZodTypeDef, MemoryRetrievalPolicySpec&gt;</code> | Runtime schema for memory Retrieval Policy Spec. |
| `memoryScopePolicySpecSchema` | constant | <code>const memoryScopePolicySpecSchema: z.ZodType&lt;MemoryScopePolicySpec, z.ZodTypeDef, MemoryScopePolicySpec&gt;</code> | Runtime schema for memory Scope Policy Spec. |
| `memoryWritePolicySpecSchema` | constant | <code>const memoryWritePolicySpecSchema: z.ZodType&lt;MemoryWritePolicySpec, z.ZodTypeDef, MemoryWritePolicySpec&gt;</code> | Runtime schema for memory Write Policy Spec. |
| `vectorStoreCapabilitiesSchema` | constant | <code>const vectorStoreCapabilitiesSchema: z.ZodType&lt;VectorStoreCapabilities, z.ZodTypeDef, VectorStoreCapabilities&gt;</code> | Runtime schema for vector Store Capabilities. |
| `vectorStoreSpecDefinition` | constant | <code>const vectorStoreSpecDefinition: SpecSchemaDefinition&lt;VectorStoreSpec&gt;</code> | Runtime validation entrypoint for the vector Store spec, combining its parser, example and JSON Schema. |
| `vectorStoreSpecExample` | constant | <code>const vectorStoreSpecExample: VectorStoreSpec</code> | Valid example value for vector Store Spec. |
| `vectorStoreSpecSchema` | constant | <code>const vectorStoreSpecSchema: z.ZodType&lt;VectorStoreSpec, z.ZodTypeDef, VectorStoreSpec&gt;</code> | Runtime schema for vector Store Spec. |
| `workingMemoryStoreSpecDefinition` | constant | <code>const workingMemoryStoreSpecDefinition: SpecSchemaDefinition&lt;WorkingMemoryStoreSpec&gt;</code> | Runtime validation entrypoint for the working Memory Store spec, combining its parser, example and JSON Schema. |
| `workingMemoryStoreSpecExample` | constant | <code>const workingMemoryStoreSpecExample: WorkingMemoryStoreSpec</code> | Valid example value for working Memory Store Spec. |
| `workingMemoryStoreSpecSchema` | constant | <code>const workingMemoryStoreSpecSchema: z.ZodType&lt;WorkingMemoryStoreSpec, z.ZodTypeDef, WorkingMemoryStoreSpec&gt;</code> | Runtime schema for working Memory Store Spec. |
| `validateEmbeddingProviderSpec` | function | <code>validateEmbeddingProviderSpec(input: unknown): EmbeddingProviderSpec</code> | Validates Embedding Provider Spec at this module boundary. |
| `validateMemoryProfileSpec` | function | <code>validateMemoryProfileSpec(input: unknown): MemoryProfileSpec</code> | Validates Memory Profile Spec at this module boundary. |
| `validateMemoryRecordStoreSpec` | function | <code>validateMemoryRecordStoreSpec(input: unknown): MemoryRecordStoreSpec</code> | Validates Memory Record Store Spec at this module boundary. |
| `validateVectorStoreSpec` | function | <code>validateVectorStoreSpec(input: unknown): VectorStoreSpec</code> | Validates Vector Store Spec at this module boundary. |
| `validateWorkingMemoryStoreSpec` | function | <code>validateWorkingMemoryStoreSpec(input: unknown): WorkingMemoryStoreSpec</code> | Validates Working Memory Store Spec at this module boundary. |
