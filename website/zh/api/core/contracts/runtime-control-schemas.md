# `@codesoul-co/hypha-core` / `contracts/runtime-control-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-control-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control-schemas.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeControlContractDefinitions` | 常量 | <code>const runtimeControlContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeRunControlCommand&gt;, SpecSchemaDefinition&lt;RuntimeRunControlResult&gt;]</code> | 由 `contracts/runtime-control-schemas` 模块导出的 runtime Control Contract Definitions 常量。 |
| `runtimeControlContractJsonSchemas` | 常量 | <code>const runtimeControlContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-control-schemas` 模块导出的 runtime Control Contract Json Schemas 常量。 |
| `runtimePauseCommandSchema` | 常量 | <code>const runtimePauseCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"pause"&gt;; reason: z.ZodString; resumeKey: z.ZodOptional&lt;z.ZodString&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { ...</code> | runtime Pause Command 的运行时 Schema。 |
| `runtimeResumeCommandSchema` | 常量 | <code>const runtimeResumeCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"resume"&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; payload: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentI...</code> | runtime Resume Command 的运行时 Schema。 |
| `runtimeRunControlCommandDefinition` | 常量 | <code>const runtimeRunControlCommandDefinition: SpecSchemaDefinition&lt;RuntimeRunControlCommand&gt;</code> | 由 `contracts/runtime-control-schemas` 模块导出的 runtime Run Control Command Definition 常量。 |
| `runtimeRunControlCommandExample` | 常量 | <code>const runtimeRunControlCommandExample: RuntimeRunControlCommand</code> | runtime Run Control Command 的有效示例值。 |
| `runtimeRunControlCommandJsonSchema` | 常量 | <code>const runtimeRunControlCommandJsonSchema: JsonSchema</code> | runtime Run Control Command 的 JSON Schema。 |
| `runtimeRunControlCommandSchema` | 常量 | <code>const runtimeRunControlCommandSchema: z.ZodDiscriminatedUnion&lt;"kind", [z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"pause"&gt;; reason: z.ZodString; resumeKey: z.ZodOptional&lt;z.ZodString&gt;; requestedAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.Zod...</code> | runtime Run Control Command 的运行时 Schema。 |
| `runtimeRunControlResultDefinition` | 常量 | <code>const runtimeRunControlResultDefinition: SpecSchemaDefinition&lt;RuntimeRunControlResult&gt;</code> | 由 `contracts/runtime-control-schemas` 模块导出的 runtime Run Control Result Definition 常量。 |
| `runtimeRunControlResultExample` | 常量 | <code>const runtimeRunControlResultExample: RuntimeRunControlResult</code> | runtime Run Control Result 的有效示例值。 |
| `runtimeRunControlResultJsonSchema` | 常量 | <code>const runtimeRunControlResultJsonSchema: JsonSchema</code> | runtime Run Control Result 的 JSON Schema。 |
| `runtimeRunControlResultSchema` | 常量 | <code>const runtimeRunControlResultSchema: z.ZodObject&lt;{ commandId: z.ZodString; kind: z.ZodEnum&lt;["pause", "resume", "signal"]&gt;; disposition: z.ZodEnum&lt;["applied", "reused", "lease_unavailable"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; runRevision: z.ZodNumber; projection: z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; runStatus: z.ZodEnum&lt;[import("./runtime-projection").RuntimeOrchestrationRunStatus, ...import("./r...</code> | runtime Run Control Result 的运行时 Schema。 |
| `runtimeSignalCommandSchema` | 常量 | <code>const runtimeSignalCommandSchema: z.ZodObject&lt;{ kind: z.ZodLiteral&lt;"signal"&gt;; key: z.ZodString; payload: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; sentAt: z.ZodString; commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "...</code> | runtime Signal Command 的运行时 Schema。 |
| `validateRuntimeRunControlCommand` | 函数 | <code>validateRuntimeRunControlCommand(input: unknown): RuntimeRunControlCommand</code> | 校验 Runtime Run Control Command。 |
| `validateRuntimeRunControlResult` | 函数 | <code>validateRuntimeRunControlResult(input: unknown): RuntimeRunControlResult</code> | 校验 Runtime Run Control Result。 |
