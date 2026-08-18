# `@codesoul-co/hypha-core` / `contracts/runtime-replay-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-replay-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-replay-schemas.ts)
- 导出数: **22**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeReplayContractDefinitions` | 常量 | <code>const runtimeReplayContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeReplayRequest&gt;, SpecSchemaDefinition&lt;RuntimeReplayResult&gt;, SpecSchemaDefinition&lt;RuntimeReplayVerificationRequest&gt;, SpecSchemaDefinition&lt;RuntimeReplayVerificationResult&gt;]</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 runtime Replay Contract Definitions 常量。 |
| `runtimeReplayContractJsonSchemas` | 常量 | <code>const runtimeReplayContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 runtime Replay Contract Json Schemas 常量。 |
| `runtimeReplayRequestDefinition` | 常量 | <code>const runtimeReplayRequestDefinition: SpecSchemaDefinition&lt;RuntimeReplayRequest&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 runtime Replay Request Definition 常量。 |
| `runtimeReplayRequestExample` | 常量 | <code>const runtimeReplayRequestExample: RuntimeReplayRequest</code> | runtime Replay Request 的有效示例值。 |
| `runtimeReplayRequestJsonSchema` | 常量 | <code>const runtimeReplayRequestJsonSchema: JsonSchema</code> | runtime Replay Request 的 JSON Schema。 |
| `runtimeReplayRequestSchema` | 常量 | <code>const runtimeReplayRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; unde...</code> | runtime Replay Request 的运行时 Schema。 |
| `runtimeReplayResultDefinition` | 常量 | <code>const runtimeReplayResultDefinition: SpecSchemaDefinition&lt;RuntimeReplayResult&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 runtime Replay Result Definition 常量。 |
| `runtimeReplayResultExample` | 常量 | <code>const runtimeReplayResultExample: RuntimeReplayResult</code> | runtime Replay Result 的有效示例值。 |
| `runtimeReplayResultJsonSchema` | 常量 | <code>const runtimeReplayResultJsonSchema: JsonSchema</code> | runtime Replay Result 的 JSON Schema。 |
| `runtimeReplayResultSchema` | 常量 | <code>const runtimeReplayResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRunId: z.ZodString; mode: z.ZodLiteral&lt;"deterministic"&gt;; checkpointId: z.ZodString; baseEventSequence: z.ZodNumber; targetEventSequence: z.ZodNumber; replayedEventCount: z.ZodNumber; appliedEventCount: z.ZodNumber; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; workflowRevision: z.ZodString; processHash: z.ZodString; dependencySnapshotRef: z.ZodString; ...</code> | runtime Replay Result 的运行时 Schema。 |
| `runtimeReplayVerificationRequestDefinition` | 常量 | <code>const runtimeReplayVerificationRequestDefinition: SpecSchemaDefinition&lt;RuntimeReplayVerificationRequest&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 runtime Replay Verification Request Definition 常量。 |
| `runtimeReplayVerificationRequestExample` | 常量 | <code>const runtimeReplayVerificationRequestExample: RuntimeReplayVerificationRequest</code> | runtime Replay Verification Request 的有效示例值。 |
| `runtimeReplayVerificationRequestJsonSchema` | 常量 | <code>const runtimeReplayVerificationRequestJsonSchema: JsonSchema</code> | runtime Replay Verification Request 的 JSON Schema。 |
| `runtimeReplayVerificationRequestSchema` | 常量 | <code>const runtimeReplayVerificationRequestSchema: z.ZodObject&lt;{ replay: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; u...</code> | runtime Replay Verification Request 的运行时 Schema。 |
| `runtimeReplayVerificationResultDefinition` | 常量 | <code>const runtimeReplayVerificationResultDefinition: SpecSchemaDefinition&lt;RuntimeReplayVerificationResult&gt;</code> | 由 `contracts/runtime-replay-schemas` 模块导出的 runtime Replay Verification Result Definition 常量。 |
| `runtimeReplayVerificationResultExample` | 常量 | <code>const runtimeReplayVerificationResultExample: RuntimeReplayVerificationResult</code> | runtime Replay Verification Result 的有效示例值。 |
| `runtimeReplayVerificationResultJsonSchema` | 常量 | <code>const runtimeReplayVerificationResultJsonSchema: JsonSchema</code> | runtime Replay Verification Result 的 JSON Schema。 |
| `runtimeReplayVerificationResultSchema` | 常量 | <code>const runtimeReplayVerificationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ replay: z.ZodEffects&lt;z.ZodObject&lt;{ sourceRunId: z.ZodString; mode: z.ZodLiteral&lt;"deterministic"&gt;; checkpointId: z.ZodString; baseEventSequence: z.ZodNumber; targetEventSequence: z.ZodNumber; replayedEventCount: z.ZodNumber; appliedEventCount: z.ZodNumber; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; workflowRevision: z.ZodString; processHash: z....</code> | runtime Replay Verification Result 的运行时 Schema。 |
| `validateRuntimeReplayRequest` | 函数 | <code>validateRuntimeReplayRequest(input: unknown): RuntimeReplayRequest</code> | 校验 Runtime Replay Request。 |
| `validateRuntimeReplayResult` | 函数 | <code>validateRuntimeReplayResult(input: unknown): RuntimeReplayResult</code> | 校验 Runtime Replay Result。 |
| `validateRuntimeReplayVerificationRequest` | 函数 | <code>validateRuntimeReplayVerificationRequest(input: unknown): RuntimeReplayVerificationRequest</code> | 校验 Runtime Replay Verification Request。 |
| `validateRuntimeReplayVerificationResult` | 函数 | <code>validateRuntimeReplayVerificationResult(input: unknown): RuntimeReplayVerificationResult</code> | 校验 Runtime Replay Verification Result。 |
