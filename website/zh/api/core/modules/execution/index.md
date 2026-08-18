# `@codesoul-co/hypha-core` / `modules/execution/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution/index.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionErrorCodes` | 常量 | <code>const executionErrorCodes: readonly ["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IMAGE_UNTRUSTED", "EXECUTION_NETWO...</code> | 由 `modules/execution/index` 模块导出的 execution Error Codes 常量。 |
| `executionPrincipalJsonSchema` | 常量 | <code>const executionPrincipalJsonSchema: JsonSchema</code> | execution Principal 的 JSON Schema。 |
| `executionPrincipalSchema` | 常量 | <code>const executionPrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "st...</code> | execution Principal 的运行时 Schema。 |
| `normalizedExecutionErrorJsonSchema` | 常量 | <code>const normalizedExecutionErrorJsonSchema: JsonSchema</code> | normalized Execution Error 的 JSON Schema。 |
| `normalizedExecutionErrorSchema` | 常量 | <code>const normalizedExecutionErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION_INVALID_REQUEST", "EXECUTION_PERMISSION_DENIED", "EXECUTION_POLICY_DENIED", "EXECUTION_APPROVAL_REQUIRED", "EXECUTION_WORKSPACE_NOT_FOUND", "EXECUTION_PATH_ESCAPE", "EXECUTION_PATH_DENIED", "EXECUTION_QUOTA_EXCEEDED", "EXECUTION_ENVIRONMENT_UNAVAILABLE", "EXECUTION_SANDBOX_CREATE_FAILED", "EXECUTION_SANDBOX_START_FAILED", "EXECUTION_IM...</code> | normalized Execution Error 的运行时 Schema。 |
| `validateExecutionPrincipal` | 函数 | <code>validateExecutionPrincipal(input: unknown): ExecutionPrincipal</code> | 校验 Execution Principal。 |
| `validateNormalizedExecutionError` | 函数 | <code>validateNormalizedExecutionError(input: unknown): NormalizedExecutionError</code> | 校验 Normalized Execution Error。 |
