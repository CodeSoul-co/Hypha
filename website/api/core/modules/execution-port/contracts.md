# `@codesoul-co/hypha-core` / `modules/execution-port/contracts`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-port/contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-port/contracts.ts)
- Exports: **13**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionAuthorizationEvidenceExample` | constant | <code>const executionAuthorizationEvidenceExample: ExecutionAuthorizationEvidence</code> | Valid example value for execution Authorization Evidence. |
| `executionAuthorizationEvidenceJsonSchema` | constant | <code>const executionAuthorizationEvidenceJsonSchema: JsonSchema</code> | JSON Schema for execution Authorization Evidence. |
| `executionAuthorizationEvidenceSchema` | constant | <code>const executionAuthorizationEvidenceSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; invocationId: z.ZodString; activityId: z.ZodString; runId: z.ZodString; toolId: z.ZodString; toolRevision: z.ZodOptional&lt;z.ZodString&gt;; contractSnapshotRef: z.ZodOptional&lt;z.ZodString&gt;; principalId: z.ZodString; inputHash: z.ZodString; policyDecisionRef: z.ZodString; riskAssessmentId: z.ZodString; approvalRef: z.ZodOptional&lt;z.Zod...</code> | Runtime schema for execution Authorization Evidence. |
| `executionAuthorizationVerificationResultExample` | constant | <code>const executionAuthorizationVerificationResultExample: ExecutionAuthorizationVerificationResult</code> | Valid example value for execution Authorization Verification Result. |
| `executionAuthorizationVerificationResultJsonSchema` | constant | <code>const executionAuthorizationVerificationResultJsonSchema: JsonSchema</code> | JSON Schema for execution Authorization Verification Result. |
| `executionAuthorizationVerificationResultSchema` | constant | <code>const executionAuthorizationVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ valid: z.ZodBoolean; verificationRef: z.ZodString; verifiedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { valid: boolean; verificationRef: string; verifiedAt: string; reason?: string &#124; undefined; expiresAt?: string &#124; undefined; }, { valid: boolean; verificationR...</code> | Runtime schema for execution Authorization Verification Result. |
| `executionDispatchRequestExample` | constant | <code>const executionDispatchRequestExample: ExecutionDispatchRequest</code> | Valid example value for execution Dispatch Request. |
| `executionDispatchRequestJsonSchema` | constant | <code>const executionDispatchRequestJsonSchema: JsonSchema</code> | JSON Schema for execution Dispatch Request. |
| `executionDispatchRequestSchema` | constant | <code>const executionDispatchRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activity: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user"...</code> | Runtime schema for execution Dispatch Request. |
| `executionPortJsonSchemas` | constant | <code>const executionPortJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | execution Port Json Schemas constant exported by the `modules/execution-port/contracts` module. |
| `validateExecutionAuthorizationEvidence` | function | <code>validateExecutionAuthorizationEvidence(input: unknown): ExecutionAuthorizationEvidence</code> | Validates Execution Authorization Evidence at this module boundary. |
| `validateExecutionAuthorizationVerificationResult` | function | <code>validateExecutionAuthorizationVerificationResult(input: unknown): ExecutionAuthorizationVerificationResult</code> | Validates Execution Authorization Verification Result at this module boundary. |
| `validateExecutionDispatchRequest` | function | <code>validateExecutionDispatchRequest(input: unknown): ExecutionDispatchRequest</code> | Validates Execution Dispatch Request at this module boundary. |
