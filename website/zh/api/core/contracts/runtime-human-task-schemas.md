# `@codesoul-co/hypha-core` / `contracts/runtime-human-task-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-human-task-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeHumanTaskContractDefinitions` | 常量 | <code>const runtimeHumanTaskContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeHumanTask&gt;, SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;]</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 runtime Human Task Contract Definitions 常量。 |
| `runtimeHumanTaskContractJsonSchemas` | 常量 | <code>const runtimeHumanTaskContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 runtime Human Task Contract Json Schemas 常量。 |
| `runtimeHumanTaskDecisionCommandDefinition` | 常量 | <code>const runtimeHumanTaskDecisionCommandDefinition: SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 runtime Human Task Decision Command Definition 常量。 |
| `runtimeHumanTaskDecisionCommandExample` | 常量 | <code>const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand</code> | runtime Human Task Decision Command 的有效示例值。 |
| `runtimeHumanTaskDecisionCommandJsonSchema` | 常量 | <code>const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema</code> | runtime Human Task Decision Command 的 JSON Schema。 |
| `runtimeHumanTaskDecisionCommandSchema` | 常量 | <code>const runtimeHumanTaskDecisionCommandSchema: z.ZodEffects&lt;z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspace...</code> | runtime Human Task Decision Command 的运行时 Schema。 |
| `runtimeHumanTaskDefinition` | 常量 | <code>const runtimeHumanTaskDefinition: SpecSchemaDefinition&lt;RuntimeHumanTask&gt;</code> | 由 `contracts/runtime-human-task-schemas` 模块导出的 runtime Human Task Definition 常量。 |
| `runtimeHumanTaskExample` | 常量 | <code>const runtimeHumanTaskExample: RuntimeHumanTask</code> | runtime Human Task 的有效示例值。 |
| `runtimeHumanTaskJsonSchema` | 常量 | <code>const runtimeHumanTaskJsonSchema: JsonSchema</code> | runtime Human Task 的 JSON Schema。 |
| `runtimeHumanTaskRequestJsonSchema` | 常量 | <code>const runtimeHumanTaskRequestJsonSchema: JsonSchema</code> | runtime Human Task Request 的 JSON Schema。 |
| `runtimeHumanTaskRequestSchema` | 常量 | <code>const runtimeHumanTaskRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ taskId: z.ZodString; kind: z.ZodEnum&lt;["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]&gt;; subjectRef: z.ZodString; subjectHash: z.ZodString; requestedBy: z.ZodString; allowedDecisionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; requestedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; checkpointRef: z.ZodOptional&lt;z.ZodString&gt;; polic...</code> | runtime Human Task Request 的运行时 Schema。 |
| `runtimeHumanTaskSchema` | 常量 | <code>const runtimeHumanTaskSchema: z.ZodEffects&lt;z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; status: z.ZodEnum&lt;["pending", "approved", "rejected", "expired", "cancelled", "superseded"]&gt;; revision: z.ZodNumber; decisionEventId: z.ZodOptional&lt;z.ZodString&gt;; decisionCommandId: z.ZodOptional&lt;z.ZodString&gt;; decisionIdempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; decidedBy: z.ZodO...</code> | runtime Human Task 的运行时 Schema。 |
| `validateRuntimeHumanTask` | 函数 | <code>validateRuntimeHumanTask(input: unknown): RuntimeHumanTask</code> | 校验 Runtime Human Task。 |
| `validateRuntimeHumanTaskDecisionCommand` | 函数 | <code>validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand</code> | 校验 Runtime Human Task Decision Command。 |
| `validateRuntimeHumanTaskRequest` | 函数 | <code>validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest</code> | 校验 Runtime Human Task Request。 |
