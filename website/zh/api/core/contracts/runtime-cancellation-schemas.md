# `@codesoul-co/hypha-core` / `contracts/runtime-cancellation-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-cancellation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-cancellation-schemas.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeCancelCommandDefinition` | 常量 | <code>const runtimeCancelCommandDefinition: SpecSchemaDefinition&lt;RuntimeCancelCommand&gt;</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 runtime Cancel Command Definition 常量。 |
| `runtimeCancelCommandExample` | 常量 | <code>const runtimeCancelCommandExample: RuntimeCancelCommand</code> | runtime Cancel Command 的有效示例值。 |
| `runtimeCancelCommandJsonSchema` | 常量 | <code>const runtimeCancelCommandJsonSchema: JsonSchema</code> | runtime Cancel Command 的 JSON Schema。 |
| `runtimeCancelCommandSchema` | 常量 | <code>const runtimeCancelCommandSchema: z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; ...</code> | runtime Cancel Command 的运行时 Schema。 |
| `runtimeCancellationContractDefinitions` | 常量 | <code>const runtimeCancellationContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeCancelCommand&gt;, SpecSchemaDefinition&lt;RuntimeCancelResult&gt;]</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 runtime Cancellation Contract Definitions 常量。 |
| `runtimeCancellationContractJsonSchemas` | 常量 | <code>const runtimeCancellationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 runtime Cancellation Contract Json Schemas 常量。 |
| `runtimeCancellationPolicySchema` | 常量 | <code>const runtimeCancellationPolicySchema: z.ZodObject&lt;{ propagation: z.ZodEnum&lt;["none", "children", "all_descendants"]&gt;; cancelRunningActivities: z.ZodBoolean; waitGraceMs: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { propagation: "none" &#124; "children" &#124; "all_descendants"; cancelRunningActivities: boolean; waitGraceMs?: number &#124; undefined; }, { propagation: "none" &#124; "children" &#124; "all_descendants"; cancelRun...</code> | runtime Cancellation Policy 的运行时 Schema。 |
| `runtimeCancellationTargetResultSchema` | 常量 | <code>const runtimeCancellationTargetResultSchema: z.ZodObject&lt;{ targetType: z.ZodEnum&lt;["activity", "child_run", "session_command"]&gt;; targetId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "already_terminal", "not_found", "failed"]&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_S...</code> | runtime Cancellation Target Result 的运行时 Schema。 |
| `runtimeCancelResultDefinition` | 常量 | <code>const runtimeCancelResultDefinition: SpecSchemaDefinition&lt;RuntimeCancelResult&gt;</code> | 由 `contracts/runtime-cancellation-schemas` 模块导出的 runtime Cancel Result Definition 常量。 |
| `runtimeCancelResultExample` | 常量 | <code>const runtimeCancelResultExample: RuntimeCancelResult</code> | runtime Cancel Result 的有效示例值。 |
| `runtimeCancelResultJsonSchema` | 常量 | <code>const runtimeCancelResultJsonSchema: JsonSchema</code> | runtime Cancel Result 的 JSON Schema。 |
| `runtimeCancelResultSchema` | 常量 | <code>const runtimeCancelResultSchema: z.ZodObject&lt;{ commandId: z.ZodString; disposition: z.ZodEnum&lt;["applied", "reused"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; targetResults: z.ZodArray&lt;z.ZodObject&lt;{ targetType: z.ZodEnum&lt;["activity", "child_run", "session_command"]&gt;; targetId: z.ZodString; status: z.ZodEnum&lt;["cancelled", "already_terminal", "not_found", "failed"]&gt;; error: z.ZodOptional&lt;z.ZodObject&lt;{ code: z.ZodE...</code> | runtime Cancel Result 的运行时 Schema。 |
| `validateRuntimeCancelCommand` | 函数 | <code>validateRuntimeCancelCommand(input: unknown): RuntimeCancelCommand</code> | 校验 Runtime Cancel Command。 |
| `validateRuntimeCancellationTargetResult` | 函数 | <code>validateRuntimeCancellationTargetResult(input: unknown): { status: "failed" &#124; "cancelled" &#124; "already_terminal" &#124; "not_found"; targetType: "session_command" &#124; "activity" &#124; "child_run"; targetId: string; error?: { code: "RUNTIME_INVALID_INPUT" &#124; "RUNTIME_MESSAGE_BUS_UNAVAILABLE" &#124; "RUNTIME_MESSAGE_SCHEMA_INVALID" &#124; "RUNTIME_MESSAGE_DEAD_LETTERED" &#124; "RUNTIME_SESSION_QUEUE_CONFLICT" &#124; "RUNTIME_SESSION_QUEUE_OVERFLOW" ...</code> | 校验 Runtime Cancellation Target Result。 |
| `validateRuntimeCancelResult` | 函数 | <code>validateRuntimeCancelResult(input: unknown): RuntimeCancelResult</code> | 校验 Runtime Cancel Result。 |
