# `@codesoul-co/hypha-core` / `modules/execution-governance/risk-evaluator`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-governance/risk-evaluator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultExecutionRiskEvaluator` | 类 | <code>new DefaultExecutionRiskEvaluator(): DefaultExecutionRiskEvaluator</code> | Default Execution Risk Evaluator 的运行时实现；公开构造函数与成员见下表。 |
| `EXECUTION_RISK_RULE_IDS` | 常量 | <code>const EXECUTION_RISK_RULE_IDS: { readonly governedRead: "execution.risk.governed_read"; readonly workspaceWrite: "execution.risk.workspace_write"; readonly externalEffect: "execution.risk.external_effect"; readonly irreversibleEffect: "execution.risk.irreversible_effect"; readonly shellExecution: "execution.risk.shell_execution"; readonly recursiveDelete: "execution.risk.recursive_delete"; readonly inputDirectoryW...</code> | 由 `modules/execution-governance/risk-evaluator` 模块导出的 EXECUTION RISK RULE IDS 常量。 |

## `DefaultExecutionRiskEvaluator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultExecutionRiskEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | 评估 evaluate。 |
