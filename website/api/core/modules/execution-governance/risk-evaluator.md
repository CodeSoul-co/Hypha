# `@codesoul-co/hypha-core` / `modules/execution-governance/risk-evaluator`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/execution-governance/risk-evaluator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)
- Exports: **2**

## Using this module

Use the Risk evaluator module for executing runtime behavior at this boundary. It exports 1 class, 1 constant.

### Import from the package entrypoint

```ts
import {
  DefaultExecutionRiskEvaluator,
  EXECUTION_RISK_RULE_IDS,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultExecutionRiskEvaluator` | class | <code>new DefaultExecutionRiskEvaluator(): DefaultExecutionRiskEvaluator</code> | Default Execution Risk Evaluator class with 2 public constructor or member entries; its exact declarations are listed below. |
| `EXECUTION_RISK_RULE_IDS` | constant | <code>const EXECUTION_RISK_RULE_IDS: { readonly governedRead: "execution.risk.governed_read"; readonly workspaceWrite: "execution.risk.workspace_write"; readonly externalEffect: "execution.risk.external_effect"; readonly irreversibleEffect: "execution.risk.irreversible_effect"; readonly shellExecution: "execution.risk.shell_execution"; readonly recursiveDelete: "execution.risk.recursive_delete"; readonly inputDirectoryW...</code> | EXECUTION RISK RULE IDS constant exported by the `modules/execution-governance/risk-evaluator` module. |

## `DefaultExecutionRiskEvaluator`

Default Execution Risk Evaluator class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultExecutionRiskEvaluator } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/risk-evaluator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)

### Declaration

```text
export declare class DefaultExecutionRiskEvaluator implements ExecutionRiskEvaluator {
    evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultExecutionRiskEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | Public method; parameters and return type are shown in the signature. |

## `EXECUTION_RISK_RULE_IDS`

EXECUTION RISK RULE IDS constant exported by the `modules/execution-governance/risk-evaluator` module.

- Kind: constant
- Import: `import { EXECUTION_RISK_RULE_IDS } from '@codesoul-co/hypha-core';`
- Source module: [`modules/execution-governance/risk-evaluator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)

### Declaration

```text
export declare const EXECUTION_RISK_RULE_IDS: { readonly governedRead: "execution.risk.governed_read"; readonly workspaceWrite: "execution.risk.workspace_write"; readonly externalEffect: "execution.risk.external_effect"; readonly irreversibleEffect: "execution.risk.irreversible_effect"; readonly shellExecution: "execution.risk.shell_execution"; readonly recursiveDelete: "execution.risk.recursive_delete"; readonly inputDirectoryWrite: "execution.risk.input_directory_write"; readonly networkAccess: "execution.risk.network_access"; readonly packageInstall: "execution.risk.package_install"; readonly downloadedScriptExecution: "execution.risk.downloaded_script_execution"; readonly permissionModification: "execution.risk.permission_modification"; readonly executableNotAllowed: "execution.risk.executable_not_allowed"; readonly executableDenied: "execution.risk.executable_denied"; readonly secretAccess: "execution.risk.secret_access"; readonly backgroundProcess: "execution.risk.background_process"; readonly externalPublish: "execution.risk.external_publish"; };
```
