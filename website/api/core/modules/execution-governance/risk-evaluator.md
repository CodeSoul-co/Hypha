# `@codesoul-co/hypha-core` / `modules/execution-governance/risk-evaluator`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-governance/risk-evaluator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultExecutionRiskEvaluator` | class | <code>new DefaultExecutionRiskEvaluator(): DefaultExecutionRiskEvaluator</code> | Runtime implementation for Default Execution Risk Evaluator; see its public constructor and members below. |
| `EXECUTION_RISK_RULE_IDS` | constant | <code>const EXECUTION_RISK_RULE_IDS: { readonly governedRead: "execution.risk.governed_read"; readonly workspaceWrite: "execution.risk.workspace_write"; readonly externalEffect: "execution.risk.external_effect"; readonly irreversibleEffect: "execution.risk.irreversible_effect"; readonly shellExecution: "execution.risk.shell_execution"; readonly recursiveDelete: "execution.risk.recursive_delete"; readonly inputDirectoryW...</code> | EXECUTION RISK RULE IDS constant exported by the `modules/execution-governance/risk-evaluator` module. |

## `DefaultExecutionRiskEvaluator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultExecutionRiskEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | Evaluates evaluate at this module boundary. |
