# `@codesoul-co/hypha-core` / `contracts/runtime-projection-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-projection-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeOrchestrationProjectionDefinition` | 常量 | <code>const runtimeOrchestrationProjectionDefinition: SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | 由 `contracts/runtime-projection-schemas` 模块导出的 runtime Orchestration Projection Definition 常量。 |
| `runtimeOrchestrationProjectionExample` | 常量 | <code>const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection</code> | runtime Orchestration Projection 的有效示例值。 |
| `runtimeOrchestrationProjectionJsonSchema` | 常量 | <code>const runtimeOrchestrationProjectionJsonSchema: JsonSchema</code> | runtime Orchestration Projection 的 JSON Schema。 |
| `runtimeOrchestrationProjectionSchema` | 常量 | <code>const runtimeOrchestrationProjectionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;; currentState: z.ZodOptional&lt;z.ZodString&gt;; terminalState: z.ZodOptional&lt;z.ZodString&gt;; statePath: z.ZodArray&lt;z.ZodString, "many"&gt;; stateVisitCounts: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; stateAttempt: z.ZodNumber; pendingTransition: z.Z...</code> | runtime Orchestration Projection 的运行时 Schema。 |
| `runtimeOrchestrationRunStatusSchema` | 常量 | <code>const runtimeOrchestrationRunStatusSchema: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;</code> | runtime Orchestration Run Status 的运行时 Schema。 |
| `runtimeProjectionContractDefinitions` | 常量 | <code>const runtimeProjectionContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;]</code> | 由 `contracts/runtime-projection-schemas` 模块导出的 runtime Projection Contract Definitions 常量。 |
| `runtimeProjectionContractJsonSchemas` | 常量 | <code>const runtimeProjectionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-projection-schemas` 模块导出的 runtime Projection Contract Json Schemas 常量。 |
| `validateRuntimeOrchestrationProjection` | 函数 | <code>validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection</code> | 校验 Runtime Orchestration Projection。 |
