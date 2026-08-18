# `@codesoul-co/hypha-core` / `modules/execution-output/collector`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-output/collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/collector.ts)
- Exports: **1**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultExecutionOutputCollector` | class | <code>new DefaultExecutionOutputCollector(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | Runtime implementation for Default Execution Output Collector; see its public constructor and members below. |

## `DefaultExecutionOutputCollector` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(rawPlan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | Public runtime operation for collect. |
| `constructor` | constructor | <code>(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | Creates an instance of this class. |
