# `@codesoul-co/hypha-core` / `modules/execution-governance/contracts`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-governance/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-governance/contracts.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionGovernanceJsonSchemas` | constant | <code>const executionGovernanceJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | execution Governance Json Schemas constant exported by the `modules/execution-governance/contracts` module. |
| `executionRiskAssessmentExample` | constant | <code>const executionRiskAssessmentExample: ExecutionRiskAssessment</code> | Valid example value for execution Risk Assessment. |
| `executionRiskAssessmentJsonSchema` | constant | <code>const executionRiskAssessmentJsonSchema: JsonSchema</code> | JSON Schema for execution Risk Assessment. |
| `executionRiskAssessmentSchema` | constant | <code>const executionRiskAssessmentSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; level: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; reasons: z.ZodArray&lt;z.ZodString, "many"&gt;; matchedRules: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; requiresApproval: z.ZodBoolean; recommendedSandboxLevel: z.ZodOptional&lt;z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;&gt;; evaluatedAt: z.ZodString; }, "strict", z.ZodTypeA...</code> | Runtime schema for execution Risk Assessment. |
| `executionSandboxLevelSchema` | constant | <code>const executionSandboxLevelSchema: z.ZodEnum&lt;["local", "container", "remote_isolated"]&gt;</code> | Runtime schema for execution Sandbox Level. |
| `executionToolBindingExample` | constant | <code>const executionToolBindingExample: ExecutionToolBinding</code> | Valid example value for execution Tool Binding. |
| `executionToolBindingJsonSchema` | constant | <code>const executionToolBindingJsonSchema: JsonSchema</code> | JSON Schema for execution Tool Binding. |
| `executionToolBindingSchema` | constant | <code>const executionToolBindingSchema: z.ZodEffects&lt;z.ZodObject&lt;{ toolId: z.ZodString; operation: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;; executionProfileRef: z.ZodString; requiredScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; sideEffectLevel: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;; humanReviewPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { operat...</code> | Runtime schema for execution Tool Binding. |
| `executionToolOperationSchema` | constant | <code>const executionToolOperationSchema: z.ZodEnum&lt;["file_read", "file_write", "command", "sandbox", "artifact"]&gt;</code> | Runtime schema for execution Tool Operation. |
| `executionToolSideEffectLevelSchema` | constant | <code>const executionToolSideEffectLevelSchema: z.ZodEnum&lt;["read", "write", "external_effect", "irreversible"]&gt;</code> | Runtime schema for execution Tool Side Effect Level. |
| `validateExecutionRiskAssessment` | function | <code>validateExecutionRiskAssessment(input: unknown): ExecutionRiskAssessment</code> | Validates Execution Risk Assessment at this module boundary. |
| `validateExecutionToolBinding` | function | <code>validateExecutionToolBinding(input: unknown): ExecutionToolBinding</code> | Validates Execution Tool Binding at this module boundary. |
