# `@codesoul-co/hypha-core` / `modules/execution-output/planner`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-output/planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultExecutionOutputPlanner` | class | <code>new DefaultExecutionOutputPlanner(): DefaultExecutionOutputPlanner</code> | Runtime implementation for Default Execution Output Planner; see its public constructor and members below. |
| `classifyExecutionOutput` | function | <code>classifyExecutionOutput(relativePath: string): ArtifactClassification</code> | Public runtime operation for classify Execution Output. |

## `DefaultExecutionOutputPlanner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultExecutionOutputPlanner</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(rawResult: CommandExecutionResult, rawPolicy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | Plans plan at this module boundary. |
