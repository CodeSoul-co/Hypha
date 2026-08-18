# `@codesoul-co/hypha-core` / `modules/execution-output/planner`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-output/planner.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-output/planner.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultExecutionOutputPlanner` | 类 | <code>new DefaultExecutionOutputPlanner(): DefaultExecutionOutputPlanner</code> | Default Execution Output Planner 的运行时实现；公开构造函数与成员见下表。 |
| `classifyExecutionOutput` | 函数 | <code>classifyExecutionOutput(relativePath: string): ArtifactClassification</code> | classify Execution Output 的公开运行时操作。 |

## `DefaultExecutionOutputPlanner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultExecutionOutputPlanner</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(rawResult: CommandExecutionResult, rawPolicy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | 规划 plan。 |
