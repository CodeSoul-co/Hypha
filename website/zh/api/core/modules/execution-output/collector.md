# `@codesoul-co/hypha-core` / `modules/execution-output/collector`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-output/collector.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/collector.ts)
- 导出数: **1**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultExecutionOutputCollector` | 类 | <code>new DefaultExecutionOutputCollector(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | Default Execution Output Collector 的运行时实现；公开构造函数与成员见下表。 |

## `DefaultExecutionOutputCollector` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `collect` | 方法 | <code>collect(rawPlan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | collect 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(artifacts: ExecutionOutputArtifactManager): DefaultExecutionOutputCollector</code> | 创建该类的实例。 |
