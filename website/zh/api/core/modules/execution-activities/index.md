# `@codesoul-co/hypha-core` / `modules/execution-activities/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/execution-activities/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executionActivityJsonSchemas` | 常量 | <code>const executionActivityJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/execution-activities/index` 模块导出的 execution Activity Json Schemas 常量。 |
| `executionActivityRequestExample` | 常量 | <code>const executionActivityRequestExample: ExecutionActivityRequest</code> | execution Activity Request 的有效示例值。 |
| `executionActivityRequestJsonSchema` | 常量 | <code>const executionActivityRequestJsonSchema: JsonSchema</code> | execution Activity Request 的 JSON Schema。 |
| `executionActivityRequestSchema` | 常量 | <code>const executionActivityRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; ten...</code> | execution Activity Request 的运行时 Schema。 |
| `executionActivityResultExample` | 常量 | <code>const executionActivityResultExample: ExecutionActivityResult</code> | execution Activity Result 的有效示例值。 |
| `executionActivityResultJsonSchema` | 常量 | <code>const executionActivityResultJsonSchema: JsonSchema</code> | execution Activity Result 的 JSON Schema。 |
| `executionActivityResultSchema` | 常量 | <code>const executionActivityResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; snapshotRef: z.ZodOptional&lt;z.ZodString&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION...</code> | execution Activity Result 的运行时 Schema。 |
| `executionActivityStatusSchema` | 常量 | <code>const executionActivityStatusSchema: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;</code> | execution Activity Status 的运行时 Schema。 |
| `workspaceExecutionActivityRequestExample` | 常量 | <code>const workspaceExecutionActivityRequestExample: ExecutionActivityRequest</code> | workspace Execution Activity Request 的有效示例值。 |
| `workspaceOperationRequestJsonSchema` | 常量 | <code>const workspaceOperationRequestJsonSchema: JsonSchema</code> | workspace Operation Request 的 JSON Schema。 |
| `workspaceOperationRequestSchema` | 常量 | <code>const workspaceOperationRequestSchema: z.ZodUnion&lt;[z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; m...</code> | workspace Operation Request 的运行时 Schema。 |
| `validateExecutionActivityRequest` | 函数 | <code>validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest</code> | 校验 Execution Activity Request。 |
| `validateExecutionActivityResult` | 函数 | <code>validateExecutionActivityResult(input: unknown): ExecutionActivityResult</code> | 校验 Execution Activity Result。 |
| `validateWorkspaceOperationRequest` | 函数 | <code>validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest</code> | 校验 Workspace Operation Request。 |
