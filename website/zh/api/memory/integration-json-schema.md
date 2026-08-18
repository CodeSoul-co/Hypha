# `@codesoul-co/hypha-memory` / `integration-json-schema`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/integration-json-schema.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-json-schema.ts)
- 导出数: **21**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainMemoryDependencySnapshotExample` | 常量 | <code>const domainMemoryDependencySnapshotExample: DomainMemoryDependencySnapshot</code> | domain Memory Dependency Snapshot 的有效示例值。 |
| `domainMemoryDependencySnapshotJsonSchema` | 常量 | <code>const domainMemoryDependencySnapshotJsonSchema: JsonSchema</code> | domain Memory Dependency Snapshot 的 JSON Schema。 |
| `domainMemoryDependencySnapshotSpecDefinition` | 常量 | <code>const domainMemoryDependencySnapshotSpecDefinition: SpecSchemaDefinition&lt;DomainMemoryDependencySnapshot&gt;</code> | domain Memory Dependency Snapshot Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryCacheInvalidationExample` | 常量 | <code>const memoryCacheInvalidationExample: MemoryCacheInvalidation</code> | memory Cache Invalidation 的有效示例值。 |
| `memoryCacheInvalidationJsonSchema` | 常量 | <code>const memoryCacheInvalidationJsonSchema: JsonSchema</code> | memory Cache Invalidation 的 JSON Schema。 |
| `memoryCacheInvalidationSpecDefinition` | 常量 | <code>const memoryCacheInvalidationSpecDefinition: SpecSchemaDefinition&lt;MemoryCacheInvalidation&gt;</code> | memory Cache Invalidation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryCacheValidityInputJsonSchema` | 常量 | <code>const memoryCacheValidityInputJsonSchema: JsonSchema</code> | memory Cache Validity Input 的 JSON Schema。 |
| `memoryCacheValidityInputSpecDefinition` | 常量 | <code>const memoryCacheValidityInputSpecDefinition: SpecSchemaDefinition&lt;MemoryCacheValidityInput&gt;</code> | memory Cache Validity Input Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryEvaluationCaseJsonSchema` | 常量 | <code>const memoryEvaluationCaseJsonSchema: JsonSchema</code> | memory Evaluation Case 的 JSON Schema。 |
| `memoryEvaluationCaseSpecDefinition` | 常量 | <code>const memoryEvaluationCaseSpecDefinition: SpecSchemaDefinition&lt;MemoryEvaluationCase&gt;</code> | memory Evaluation Case Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryEvaluationObservationExample` | 常量 | <code>const memoryEvaluationObservationExample: MemoryEvaluationObservation</code> | memory Evaluation Observation 的有效示例值。 |
| `memoryEvaluationObservationJsonSchema` | 常量 | <code>const memoryEvaluationObservationJsonSchema: JsonSchema</code> | memory Evaluation Observation 的 JSON Schema。 |
| `memoryEvaluationObservationSpecDefinition` | 常量 | <code>const memoryEvaluationObservationSpecDefinition: SpecSchemaDefinition&lt;MemoryEvaluationObservation&gt;</code> | memory Evaluation Observation Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `memoryIntegrationJsonSchemas` | 常量 | <code>const memoryIntegrationJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `integration-json-schema` 模块导出的 memory Integration Json Schemas 常量。 |
| `memoryIntegrationSpecDefinitions` | 常量 | <code>const memoryIntegrationSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowStateMemoryBinding&gt;, SpecSchemaDefinition&lt;SessionMemoryBinding&gt;, SpecSchemaDefinition&lt;DomainMemoryDependencySnapshot&gt;, SpecSchemaDefinition&lt;MemoryCacheValidityInput&gt;, SpecSchemaDefinition&lt;MemoryCacheInvalidation&gt;, SpecSchemaDefinition&lt;MemoryReplayReference&gt;, SpecSchemaDefinition&lt;MemoryEvaluationCase&gt;, SpecSchemaDefinition&lt;MemoryEvaluati...</code> | 由 `integration-json-schema` 模块导出的 memory Integration Spec Definitions 常量。 |
| `memoryReplayReferenceJsonSchema` | 常量 | <code>const memoryReplayReferenceJsonSchema: JsonSchema</code> | memory Replay Reference 的 JSON Schema。 |
| `memoryReplayReferenceSpecDefinition` | 常量 | <code>const memoryReplayReferenceSpecDefinition: SpecSchemaDefinition&lt;MemoryReplayReference&gt;</code> | memory Replay Reference Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `sessionMemoryBindingJsonSchema` | 常量 | <code>const sessionMemoryBindingJsonSchema: JsonSchema</code> | session Memory Binding 的 JSON Schema。 |
| `sessionMemoryBindingSpecDefinition` | 常量 | <code>const sessionMemoryBindingSpecDefinition: SpecSchemaDefinition&lt;SessionMemoryBinding&gt;</code> | session Memory Binding Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workflowStateMemoryBindingJsonSchema` | 常量 | <code>const workflowStateMemoryBindingJsonSchema: JsonSchema</code> | workflow State Memory Binding 的 JSON Schema。 |
| `workflowStateMemoryBindingSpecDefinition` | 常量 | <code>const workflowStateMemoryBindingSpecDefinition: SpecSchemaDefinition&lt;WorkflowStateMemoryBinding&gt;</code> | workflow State Memory Binding Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
