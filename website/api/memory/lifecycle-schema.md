# `@codesoul-co/hypha-memory` / `lifecycle-schema`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/lifecycle-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-schema.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryExtractionProfileSpecDefinition` | constant | <code>const memoryExtractionProfileSpecDefinition: SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;</code> | Runtime validation entrypoint for the memory Extraction Profile spec, combining its parser, example and JSON Schema. |
| `memoryExtractionProfileSpecExample` | constant | <code>const memoryExtractionProfileSpecExample: MemoryExtractionProfileSpec</code> | Valid example value for memory Extraction Profile Spec. |
| `memoryExtractionProfileSpecJsonSchema` | constant | <code>const memoryExtractionProfileSpecJsonSchema: JsonSchema</code> | JSON Schema for memory Extraction Profile Spec. |
| `memoryExtractionProfileSpecSchema` | constant | <code>const memoryExtractionProfileSpecSchema: z.ZodType&lt;MemoryExtractionProfileSpec, z.ZodTypeDef, MemoryExtractionProfileSpec&gt;</code> | Runtime schema for memory Extraction Profile Spec. |
| `memoryExtractionSourceRefSchema` | constant | <code>const memoryExtractionSourceRefSchema: z.ZodType&lt;MemoryExtractionSourceRef, z.ZodTypeDef, MemoryExtractionSourceRef&gt;</code> | Runtime schema for memory Extraction Source Ref. |
| `memoryExtractionSourceTypeSchema` | constant | <code>const memoryExtractionSourceTypeSchema: z.ZodEnum&lt;["conversation", "truth", "episodic_record", "runtime_event", "tool_observation", "artifact", "structured_record", "custom"]&gt;</code> | Runtime schema for memory Extraction Source Type. |
| `memoryLifecycleJsonSchemas` | constant | <code>const memoryLifecycleJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | memory Lifecycle Json Schemas constant exported by the `lifecycle-schema` module. |
| `memoryLifecycleSpecDefinitions` | constant | <code>const memoryLifecycleSpecDefinitions: readonly [SpecSchemaDefinition&lt;MemoryExtractionProfileSpec&gt;, SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;]</code> | memory Lifecycle Spec Definitions constant exported by the `lifecycle-schema` module. |
| `memoryMaintenancePolicySpecDefinition` | constant | <code>const memoryMaintenancePolicySpecDefinition: SpecSchemaDefinition&lt;MemoryMaintenancePolicySpec&gt;</code> | Runtime validation entrypoint for the memory Maintenance Policy spec, combining its parser, example and JSON Schema. |
| `memoryMaintenancePolicySpecExample` | constant | <code>const memoryMaintenancePolicySpecExample: MemoryMaintenancePolicySpec</code> | Valid example value for memory Maintenance Policy Spec. |
| `memoryMaintenancePolicySpecJsonSchema` | constant | <code>const memoryMaintenancePolicySpecJsonSchema: JsonSchema</code> | JSON Schema for memory Maintenance Policy Spec. |
| `memoryMaintenancePolicySpecSchema` | constant | <code>const memoryMaintenancePolicySpecSchema: z.ZodType&lt;MemoryMaintenancePolicySpec, z.ZodTypeDef, MemoryMaintenancePolicySpec&gt;</code> | Runtime schema for memory Maintenance Policy Spec. |
| `validateMemoryExtractionProfileSpec` | function | <code>validateMemoryExtractionProfileSpec(input: unknown): MemoryExtractionProfileSpec</code> | Validates Memory Extraction Profile Spec at this module boundary. |
| `validateMemoryMaintenancePolicySpec` | function | <code>validateMemoryMaintenancePolicySpec(input: unknown): MemoryMaintenancePolicySpec</code> | Validates Memory Maintenance Policy Spec at this module boundary. |
