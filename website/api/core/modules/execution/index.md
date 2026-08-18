# `@codesoul-co/hypha-core` / `modules/execution/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionErrorCodes` | constant | <code>const executionErrorCodes: readonly ["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWO...</code> | execution Error Codes constant exported by the `modules/execution/index` module. |
| `executionPrincipalJsonSchema` | constant | <code>const executionPrincipalJsonSchema: JsonSchema</code> | JSON Schema for execution Principal. |
| `executionPrincipalSchema` | constant | <code>const executionPrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "st...</code> | Runtime schema for execution Principal. |
| `normalizedExecutionErrorJsonSchema` | constant | <code>const normalizedExecutionErrorJsonSchema: JsonSchema</code> | JSON Schema for normalized Execution Error. |
| `normalizedExecutionErrorSchema` | constant | <code>const normalizedExecutionErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IM...</code> | Runtime schema for normalized Execution Error. |
| `validateExecutionPrincipal` | function | <code>validateExecutionPrincipal(input: unknown): ExecutionPrincipal</code> | Validates Execution Principal at this module boundary. |
| `validateNormalizedExecutionError` | function | <code>validateNormalizedExecutionError(input: unknown): NormalizedExecutionError</code> | Validates Normalized Execution Error at this module boundary. |
