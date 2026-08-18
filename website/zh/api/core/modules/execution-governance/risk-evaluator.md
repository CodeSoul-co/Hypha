# `@codesoul-co/hypha-core` / `modules/execution-governance/risk-evaluator`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/execution-governance/risk-evaluator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Risk evaluator 模块公开 1 类、1 常量。

### 从包入口导入

```ts
import {
  DefaultExecutionRiskEvaluator,
  EXECUTION_RISK_RULE_IDS,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultExecutionRiskEvaluator` | 类 | <code>new DefaultExecutionRiskEvaluator(): DefaultExecutionRiskEvaluator</code> | Default Execution Risk Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `EXECUTION_RISK_RULE_IDS` | 常量 | <code>const EXECUTION_RISK_RULE_IDS: { readonly governedRead: "execution.risk.governed_read"; readonly workspaceWrite: "execution.risk.workspace_write"; readonly externalEffect: "execution.risk.external_effect"; readonly irreversibleEffect: "execution.risk.irreversible_effect"; readonly shellExecution: "execution.risk.shell_execution"; readonly recursiveDelete: "execution.risk.recursive_delete"; readonly inputDirectoryW...</code> | 由 `modules/execution-governance/risk-evaluator` 模块导出的 EXECUTION RISK RULE IDS 常量。 |

## `DefaultExecutionRiskEvaluator`

Default Execution Risk Evaluator 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultExecutionRiskEvaluator } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/risk-evaluator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)

### 声明

```text
export declare class DefaultExecutionRiskEvaluator implements ExecutionRiskEvaluator {
    evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultExecutionRiskEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | 公开方法；参数与返回类型以签名列为准。 |

## `EXECUTION_RISK_RULE_IDS`

由 `modules/execution-governance/risk-evaluator` 模块导出的 EXECUTION RISK RULE IDS 常量。

- 种类: 常量
- 导入: `import { EXECUTION_RISK_RULE_IDS } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/execution-governance/risk-evaluator`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/risk-evaluator.ts)

### 声明

```text
export declare const EXECUTION_RISK_RULE_IDS: { readonly governedRead: "execution.risk.governed_read"; readonly workspaceWrite: "execution.risk.workspace_write"; readonly externalEffect: "execution.risk.external_effect"; readonly irreversibleEffect: "execution.risk.irreversible_effect"; readonly shellExecution: "execution.risk.shell_execution"; readonly recursiveDelete: "execution.risk.recursive_delete"; readonly inputDirectoryWrite: "execution.risk.input_directory_write"; readonly networkAccess: "execution.risk.network_access"; readonly packageInstall: "execution.risk.package_install"; readonly downloadedScriptExecution: "execution.risk.downloaded_script_execution"; readonly permissionModification: "execution.risk.permission_modification"; readonly executableNotAllowed: "execution.risk.executable_not_allowed"; readonly executableDenied: "execution.risk.executable_denied"; readonly secretAccess: "execution.risk.secret_access"; readonly backgroundProcess: "execution.risk.background_process"; readonly externalPublish: "execution.risk.external_publish"; };
```
