# `@codesoul-co/hypha-core` / `modules/execution-port/contracts`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-port/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)
- 导出数: **13**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionAuthorizationEvidenceExample` | 常量 | <code>const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence</code> | execution Authorization Evidence 的有效示例值。 |
| `executionAuthorizationEvidenceJsonSchema` | 常量 | <code>const executionAuthorizationEvidenceJsonSchema: JsonSchema</code> | execution Authorization Evidence 的 JSON Schema。 |
| `executionAuthorizationEvidenceSchema` | 常量 | <code>const executionAuthorizationEvidenceSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; invocationId: z.ZodString; activityId: z.ZodString; runId: z.ZodString; toolId: z.ZodString; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodString; inputHash: z.ZodString; policyDecisionRef: z.ZodString; riskAssessmentId: z.ZodString; approvalRef: z.ZodOptional&lt;z.Zod...</code> | execution Authorization Evidence 的运行时 Schema。 |
| `executionAuthorizationVerificationResultExample` | 常量 | <code>const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult</code> | execution Authorization Verification Result 的有效示例值。 |
| `executionAuthorizationVerificationResultJsonSchema` | 常量 | <code>const executionAuthorizationVerificationResultJsonSchema: JsonSchema</code> | execution Authorization Verification Result 的 JSON Schema。 |
| `executionAuthorizationVerificationResultSchema` | 常量 | <code>const executionAuthorizationVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ valid: z.ZodBoolean; verificationRef: z.ZodString; verifiedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string &#124; undefined; expiresAt?: string &#124; undefined; }, { valid: boolean; verificationR...</code> | execution Authorization Verification Result 的运行时 Schema。 |
| `executionDispatchRequestExample` | 常量 | <code>const executionDispatchRequestExample: ExecutionDispatchRequest</code> | execution Dispatch Request 的有效示例值。 |
| `executionDispatchRequestJsonSchema` | 常量 | <code>const executionDispatchRequestJsonSchema: JsonSchema</code> | execution Dispatch Request 的 JSON Schema。 |
| `executionDispatchRequestSchema` | 常量 | <code>const executionDispatchRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activity: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user"...</code> | execution Dispatch Request 的运行时 Schema。 |
| `executionPortJsonSchemas` | 常量 | <code>const executionPortJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-port/contracts` 模块导出的 execution Port Json Schemas 常量。 |
| `validateExecutionAuthorizationEvidence` | 函数 | <code>validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence</code> | 校验 Execution Authorization Evidence。 |
| `validateExecutionAuthorizationVerificationResult` | 函数 | <code>validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult</code> | 校验 Execution Authorization Verification Result。 |
| `validateExecutionDispatchRequest` | 函数 | <code>validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest</code> | 校验 Execution Dispatch Request。 |
