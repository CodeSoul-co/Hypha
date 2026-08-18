# `@codesoul-co/hypha-core` / `modules/runtime/orchestration-projection`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/orchestration-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ORCHESTRATION_PROJECTION_ID` | constant | <code>const RUNTIME_ORCHESTRATION_PROJECTION_ID: "runtime.orchestration"</code> | RUNTIME ORCHESTRATION PROJECTION ID constant exported by the `modules/runtime/orchestration-projection` module. |
| `RUNTIME_ORCHESTRATION_PROJECTION_VERSION` | constant | <code>const RUNTIME_ORCHESTRATION_PROJECTION_VERSION: "1.5.0"</code> | RUNTIME ORCHESTRATION PROJECTION VERSION constant exported by the `modules/runtime/orchestration-projection` module. |
| `createRuntimeOrchestrationProjectionDefinition` | function | <code>createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | Creates Runtime Orchestration Projection Definition at this module boundary. |
| `reduceRuntimeOrchestrationProjection` | function | <code>reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection</code> | Public runtime operation for reduce Runtime Orchestration Projection. |
