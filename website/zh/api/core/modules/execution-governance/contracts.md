# `@codesoul-co/hypha-core` / `modules/execution-governance/contracts`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-governance/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionGovernanceJsonSchemas` | 常量 | <code>const executionGovernanceJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-governance/contracts` 模块导出的 execution Governance Json Schemas 常量。 |
| `executionRiskAssessmentExample` | 常量 | <code>const executionRiskAssessmentExample: ExecutionRiskAssessment</code> | execution Risk Assessment 的有效示例值。 |
| `executionRiskAssessmentJsonSchema` | 常量 | <code>const executionRiskAssessmentJsonSchema: JsonSchema</code> | execution Risk Assessment 的 JSON Schema。 |
| `executionRiskAssessmentSchema` | 常量 | <code>const executionRiskAssessmentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; level: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; reasons: z.ZodArray&lt;z.ZodString, "many"&gt;; matchedRules: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiresApproval: z.ZodBoolean; recommendedSandboxLevel: z.ZodOptional&lt;z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;&gt;; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeA...</code> | execution Risk Assessment 的运行时 Schema。 |
| `executionSandboxLevelSchema` | 常量 | <code>const executionSandboxLevelSchema: z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;</code> | execution Sandbox Level 的运行时 Schema。 |
| `executionToolBindingExample` | 常量 | <code>const executionToolBindingExample: ExecutionToolBinding</code> | execution Tool Binding 的有效示例值。 |
| `executionToolBindingJsonSchema` | 常量 | <code>const executionToolBindingJsonSchema: JsonSchema</code> | execution Tool Binding 的 JSON Schema。 |
| `executionToolBindingSchema` | 常量 | <code>const executionToolBindingSchema: z.ZodEffects&lt;z.ZodObject&lt;{ toolId: z.ZodString; operation: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;; executionProfileRef: z.ZodString; requiredScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; sideEffectLevel: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;; humanReviewPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { operat...</code> | execution Tool Binding 的运行时 Schema。 |
| `executionToolOperationSchema` | 常量 | <code>const executionToolOperationSchema: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;</code> | execution Tool Operation 的运行时 Schema。 |
| `executionToolSideEffectLevelSchema` | 常量 | <code>const executionToolSideEffectLevelSchema: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;</code> | execution Tool Side Effect Level 的运行时 Schema。 |
| `validateExecutionRiskAssessment` | 函数 | <code>validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment</code> | 校验 Execution Risk Assessment。 |
| `validateExecutionToolBinding` | 函数 | <code>validateExecutionToolBinding(input: unknown): ExecutionToolBinding</code> | 校验 Execution Tool Binding。 |
