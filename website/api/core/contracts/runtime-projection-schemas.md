# `@codesoul-co/hypha-core` / `contracts/runtime-projection-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-projection-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-projection-schemas.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeOrchestrationProjectionDefinition` | constant | <code>const runtimeOrchestrationProjectionDefinition: SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | runtime Orchestration Projection Definition constant exported by the `contracts/runtime-projection-schemas` module. |
| `runtimeOrchestrationProjectionExample` | constant | <code>const runtimeOrchestrationProjectionExample: RuntimeOrchestrationProjection</code> | Valid example value for runtime Orchestration Projection. |
| `runtimeOrchestrationProjectionJsonSchema` | constant | <code>const runtimeOrchestrationProjectionJsonSchema: JsonSchema</code> | JSON Schema for runtime Orchestration Projection. |
| `runtimeOrchestrationProjectionSchema` | constant | <code>const runtimeOrchestrationProjectionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;; currentState: z.ZodOptional&lt;z.ZodString&gt;; terminalState: z.ZodOptional&lt;z.ZodString&gt;; statePath: z.ZodArray&lt;z.ZodString, "many"&gt;; stateVisitCounts: z.ZodRecord&lt;z.ZodString, z.ZodNumber&gt;; stateAttempt: z.ZodNumber; pendingTransition: z.Z...</code> | Runtime schema for runtime Orchestration Projection. |
| `runtimeOrchestrationRunStatusSchema` | constant | <code>const runtimeOrchestrationRunStatusSchema: z.ZodEnum&lt;[RuntimeOrchestrationRunStatus, ...RuntimeOrchestrationRunStatus[]]&gt;</code> | Runtime schema for runtime Orchestration Run Status. |
| `runtimeProjectionContractDefinitions` | constant | <code>const runtimeProjectionContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeOrchestrationProjection&gt;]</code> | runtime Projection Contract Definitions constant exported by the `contracts/runtime-projection-schemas` module. |
| `runtimeProjectionContractJsonSchemas` | constant | <code>const runtimeProjectionContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | runtime Projection Contract Json Schemas constant exported by the `contracts/runtime-projection-schemas` module. |
| `validateRuntimeOrchestrationProjection` | function | <code>validateRuntimeOrchestrationProjection(input: unknown): RuntimeOrchestrationProjection</code> | Validates Runtime Orchestration Projection at this module boundary. |
