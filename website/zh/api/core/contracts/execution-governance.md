# `@codesoul-co/hypha-core` / `contracts/execution-governance`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EXECUTION_SANDBOX_LEVELS` | 常量 | <code>const EXECUTION_SANDBOX_LEVELS: readonly ["local", "container", "remote_isolated"]</code> | 由 `contracts/execution-governance` 模块导出的 EXECUTION SANDBOX LEVELS 常量。 |
| `EXECUTION_TOOL_OPERATIONS` | 常量 | <code>const EXECUTION_TOOL_OPERATIONS: readonly ["file_read", "file_write", "command", "sandbox", "artifact"]</code> | 由 `contracts/execution-governance` 模块导出的 EXECUTION TOOL OPERATIONS 常量。 |
| `ExecutionRiskAssessment` | 接口 | <code>interface ExecutionRiskAssessment</code> | Execution Risk Assessment 的字段契约；完整字段见下表。 |
| `ExecutionRiskEvaluationInput` | 接口 | <code>interface ExecutionRiskEvaluationInput</code> | Execution Risk Evaluation Input 的字段契约；完整字段见下表。 |
| `ExecutionRiskEvaluator` | 接口 | <code>interface ExecutionRiskEvaluator</code> | Execution Risk Evaluator 的字段契约；完整字段见下表。 |
| `ExecutionToolBinding` | 接口 | <code>interface ExecutionToolBinding</code> | Execution Tool Binding 的字段契约；完整字段见下表。 |
| `ExecutionSandboxLevel` | 类型 | <code>type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number]</code> | Execution Sandbox Level 的公共类型别名。 |
| `ExecutionToolOperation` | 类型 | <code>type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number]</code> | Execution Tool Operation 的公共类型别名。 |
| `ExecutionToolSideEffectLevel` | 类型 | <code>type ExecutionToolSideEffectLevel = Exclude&lt;SideEffectLevel, 'none'&gt;</code> | Execution Tool Side Effect Level 的公共类型别名。 |

## `ExecutionRiskAssessment` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | evaluated At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `level` | 属性 | <code>level: RiskLevel</code> | level 字段。 |
| `matchedRules` | 属性 | <code>matchedRules: string[]</code> | matched Rules 字段。 |
| `reasons` | 属性 | <code>reasons: string[]</code> | reasons 字段。 |
| `recommendedSandboxLevel` | 属性 | <code>recommendedSandboxLevel: "local" &#124; "container" &#124; "remote_isolated"</code> | recommended Sandbox Level 字段。 |
| `requiresApproval` | 属性 | <code>requiresApproval: boolean</code> | requires Approval 字段。 |

## `ExecutionRiskEvaluationInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `assessmentId` | 属性 | <code>assessmentId: string</code> | assessment Id 字段。 |
| `binding` | 属性 | <code>binding: ExecutionToolBinding</code> | binding 字段。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | environment 字段。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | evaluated At 字段。 |
| `request` | 属性 | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | request 字段。 |
| `workspace` | 属性 | <code>workspace: WorkspaceSpec</code> | workspace 字段。 |

## `ExecutionRiskEvaluator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | 评估 evaluate。 |

## `ExecutionToolBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionProfileRef` | 属性 | <code>executionProfileRef: string</code> | execution Profile Ref 字段。 |
| `humanReviewPolicyRef` | 属性 | <code>humanReviewPolicyRef: string</code> | human Review Policy Ref 字段。 |
| `operation` | 属性 | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | operation 字段。 |
| `requiredScopes` | 属性 | <code>requiredScopes: string[]</code> | required Scopes 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | side Effect Level 字段。 |
| `toolId` | 属性 | <code>toolId: string</code> | tool Id 字段。 |
