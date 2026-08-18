# `@codesoul-co/hypha-core` / `modules/runtime/orchestration-projection`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/orchestration-projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/orchestration-projection.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RUNTIME_ORCHESTRATION_PROJECTION_ID` | 常量 | <code>const RUNTIME_ORCHESTRATION_PROJECTION_ID: "runtime.orchestration"</code> | 由 `modules/runtime/orchestration-projection` 模块导出的 RUNTIME ORCHESTRATION PROJECTION ID 常量。 |
| `RUNTIME_ORCHESTRATION_PROJECTION_VERSION` | 常量 | <code>const RUNTIME_ORCHESTRATION_PROJECTION_VERSION: "1.5.0"</code> | 由 `modules/runtime/orchestration-projection` 模块导出的 RUNTIME ORCHESTRATION PROJECTION VERSION 常量。 |
| `createRuntimeOrchestrationProjectionDefinition` | 函数 | <code>createRuntimeOrchestrationProjectionDefinition(runId: string): ProjectionDefinition&lt;RuntimeOrchestrationProjection&gt;</code> | 创建 Runtime Orchestration Projection Definition。 |
| `reduceRuntimeOrchestrationProjection` | 函数 | <code>reduceRuntimeOrchestrationProjection(state: RuntimeOrchestrationProjection, event: PersistedFrameworkEvent): RuntimeOrchestrationProjection</code> | reduce Runtime Orchestration Projection 的公开运行时操作。 |
