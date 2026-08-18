# `@codesoul-co/hypha-core` / `modules/execution-activities/index`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/execution-activities/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/execution-activities/index.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionActivityJsonSchemas` | constant | <code>const executionActivityJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | execution Activity Json Schemas constant exported by the `modules/execution-activities/index` module. |
| `executionActivityRequestExample` | constant | <code>const executionActivityRequestExample: ExecutionActivityRequest</code> | Valid example value for execution Activity Request. |
| `executionActivityRequestJsonSchema` | constant | <code>const executionActivityRequestJsonSchema: JsonSchema</code> | JSON Schema for execution Activity Request. |
| `executionActivityRequestSchema` | constant | <code>const executionActivityRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; runId: z.ZodString; stateAttemptId: z.ZodString; workspaceId: z.ZodString; request: z.ZodUnion&lt;[z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; ten...</code> | Runtime schema for execution Activity Request. |
| `executionActivityResultExample` | constant | <code>const executionActivityResultExample: ExecutionActivityResult</code> | Valid example value for execution Activity Result. |
| `executionActivityResultJsonSchema` | constant | <code>const executionActivityResultJsonSchema: JsonSchema</code> | JSON Schema for execution Activity Result. |
| `executionActivityResultSchema` | constant | <code>const executionActivityResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;; executionId: z.ZodOptional&lt;z.ZodString&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; snapshotRef: z.ZodOptional&lt;z.ZodString&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["EXECUTION...</code> | Runtime schema for execution Activity Result. |
| `executionActivityStatusSchema` | constant | <code>const executionActivityStatusSchema: z.ZodEnum&lt;["completed", "failed", "timeout", "cancelled", "unknown"]&gt;</code> | Runtime schema for execution Activity Status. |
| `workspaceExecutionActivityRequestExample` | constant | <code>const workspaceExecutionActivityRequestExample: ExecutionActivityRequest</code> | Valid example value for workspace Execution Activity Request. |
| `workspaceOperationRequestJsonSchema` | constant | <code>const workspaceOperationRequestJsonSchema: JsonSchema</code> | JSON Schema for workspace Operation Request. |
| `workspaceOperationRequestSchema` | constant | <code>const workspaceOperationRequestSchema: z.ZodUnion&lt;[z.ZodObject&lt;{ workspaceId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; m...</code> | Runtime schema for workspace Operation Request. |
| `validateExecutionActivityRequest` | function | <code>validateExecutionActivityRequest(input: unknown): ExecutionActivityRequest</code> | Validates Execution Activity Request at this module boundary. |
| `validateExecutionActivityResult` | function | <code>validateExecutionActivityResult(input: unknown): ExecutionActivityResult</code> | Validates Execution Activity Result at this module boundary. |
| `validateWorkspaceOperationRequest` | function | <code>validateWorkspaceOperationRequest(input: unknown): WorkspaceOperationRequest</code> | Validates Workspace Operation Request at this module boundary. |
