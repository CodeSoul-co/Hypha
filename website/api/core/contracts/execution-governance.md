# `@codesoul-co/hypha-core` / `contracts/execution-governance`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-governance.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EXECUTION_SANDBOX_LEVELS` | constant | <code>const EXECUTION_SANDBOX_LEVELS: readonly ["local", "container", "remote_isolated"]</code> | EXECUTION SANDBOX LEVELS constant exported by the `contracts/execution-governance` module. |
| `EXECUTION_TOOL_OPERATIONS` | constant | <code>const EXECUTION_TOOL_OPERATIONS: readonly ["file_read", "file_write", "command", "sandbox", "artifact"]</code> | EXECUTION TOOL OPERATIONS constant exported by the `contracts/execution-governance` module. |
| `ExecutionRiskAssessment` | interface | <code>interface ExecutionRiskAssessment</code> | Field contract for Execution Risk Assessment; see all contract members below. |
| `ExecutionRiskEvaluationInput` | interface | <code>interface ExecutionRiskEvaluationInput</code> | Field contract for Execution Risk Evaluation Input; see all contract members below. |
| `ExecutionRiskEvaluator` | interface | <code>interface ExecutionRiskEvaluator</code> | Field contract for Execution Risk Evaluator; see all contract members below. |
| `ExecutionToolBinding` | interface | <code>interface ExecutionToolBinding</code> | Field contract for Execution Tool Binding; see all contract members below. |
| `ExecutionSandboxLevel` | type | <code>type ExecutionSandboxLevel = (typeof EXECUTION_SANDBOX_LEVELS)[number]</code> | Public type alias for Execution Sandbox Level. |
| `ExecutionToolOperation` | type | <code>type ExecutionToolOperation = (typeof EXECUTION_TOOL_OPERATIONS)[number]</code> | Public type alias for Execution Tool Operation. |
| `ExecutionToolSideEffectLevel` | type | <code>type ExecutionToolSideEffectLevel = Exclude&lt;SideEffectLevel, 'none'&gt;</code> | Public type alias for Execution Tool Side Effect Level. |

## `ExecutionRiskAssessment` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public evaluated At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `level` | property | <code>level: RiskLevel</code> | Public level property. |
| `matchedRules` | property | <code>matchedRules: string[]</code> | Public matched Rules property. |
| `reasons` | property | <code>reasons: string[]</code> | Public reasons property. |
| `recommendedSandboxLevel` | property | <code>recommendedSandboxLevel: "local" &#124; "container" &#124; "remote_isolated"</code> | Public recommended Sandbox Level property. |
| `requiresApproval` | property | <code>requiresApproval: boolean</code> | Public requires Approval property. |

## `ExecutionRiskEvaluationInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assessmentId` | property | <code>assessmentId: string</code> | Public assessment Id property. |
| `binding` | property | <code>binding: ExecutionToolBinding</code> | Public binding property. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public environment property. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public evaluated At property. |
| `request` | property | <code>request: CommandExecutionRequest &#124; WorkspaceOperationRequest</code> | Public request property. |
| `workspace` | property | <code>workspace: WorkspaceSpec</code> | Public workspace property. |

## `ExecutionRiskEvaluator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(input: ExecutionRiskEvaluationInput): ExecutionRiskAssessment</code> | Evaluates evaluate at this module boundary. |

## `ExecutionToolBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionProfileRef` | property | <code>executionProfileRef: string</code> | Public execution Profile Ref property. |
| `humanReviewPolicyRef` | property | <code>humanReviewPolicyRef: string</code> | Public human Review Policy Ref property. |
| `operation` | property | <code>operation: "artifact" &#124; "command" &#124; "file_read" &#124; "file_write" &#124; "sandbox"</code> | Public operation property. |
| `requiredScopes` | property | <code>requiredScopes: string[]</code> | Public required Scopes property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: ExecutionToolSideEffectLevel</code> | Public side Effect Level property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |
