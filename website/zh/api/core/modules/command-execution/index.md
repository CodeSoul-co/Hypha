# `@codesoul-co/hypha-core` / `modules/command-execution/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/command-execution/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/command-execution/index.ts)
- 导出数: **24**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandExecutionJsonSchemas` | 常量 | <code>const commandExecutionJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/command-execution/index` 模块导出的 command Execution Json Schemas 常量。 |
| `commandExecutionRequestExample` | 常量 | <code>const commandExecutionRequestExample: CommandExecutionRequest</code> | command Execution Request 的有效示例值。 |
| `commandExecutionRequestJsonSchema` | 常量 | <code>const commandExecutionRequestJsonSchema: JsonSchema</code> | command Execution Request 的 JSON Schema。 |
| `commandExecutionRequestSchema` | 常量 | <code>const commandExecutionRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodOptional&lt;z.ZodString&gt;; operationId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionSc...</code> | command Execution Request 的运行时 Schema。 |
| `commandExecutionResultExample` | 常量 | <code>const commandExecutionResultExample: CommandExecutionResult</code> | command Execution Result 的有效示例值。 |
| `commandExecutionResultJsonSchema` | 常量 | <code>const commandExecutionResultJsonSchema: JsonSchema</code> | command Execution Result 的 JSON Schema。 |
| `commandExecutionResultSchema` | 常量 | <code>const commandExecutionResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; revision: z.ZodNumber; sandboxId: z.ZodString; status: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;; exitCode: z.ZodNullable&lt;z.ZodNumber&gt;; signal: z.ZodOptional&lt;z.ZodString&gt;; stdout: z.ZodOptional&lt;z.ZodString&gt;; stde...</code> | command Execution Result 的运行时 Schema。 |
| `commandExecutionStatusSchema` | 常量 | <code>const commandExecutionStatusSchema: z.ZodEnum&lt;["queued", "starting", "running", "cancelling", "cancelled", "completed", "failed", "timed_out", "oom_killed", "resource_exceeded", "quarantined"]&gt;</code> | command Execution Status 的运行时 Schema。 |
| `commandExecutionStatusTransitions` | 常量 | <code>const commandExecutionStatusTransitions: Readonly&lt;Record&lt;CommandExecutionStatus, readonly CommandExecutionStatus[]&gt;&gt;</code> | 由 `modules/command-execution/index` 模块导出的 command Execution Status Transitions 常量。 |
| `commandOutputChunkExample` | 常量 | <code>const commandOutputChunkExample: CommandOutputChunk</code> | command Output Chunk 的有效示例值。 |
| `commandOutputChunkJsonSchema` | 常量 | <code>const commandOutputChunkJsonSchema: JsonSchema</code> | command Output Chunk 的 JSON Schema。 |
| `commandOutputChunkSchema` | 常量 | <code>const commandOutputChunkSchema: z.ZodEffects&lt;z.ZodObject&lt;{ executionId: z.ZodString; sequence: z.ZodNumber; stream: z.ZodEnum&lt;["stdout", "stderr"]&gt;; encoding: z.ZodEnum&lt;["utf8", "base64"]&gt;; content: z.ZodString; byteLength: z.ZodNumber; contentHash: z.ZodString; emittedAt: z.ZodString; truncated: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { executionId: string; contentHash: string; sequence: number; s...</code> | command Output Chunk 的运行时 Schema。 |
| `executionCancelRequestExample` | 常量 | <code>const executionCancelRequestExample: ExecutionCancelRequest</code> | execution Cancel Request 的有效示例值。 |
| `executionCancelRequestJsonSchema` | 常量 | <code>const executionCancelRequestJsonSchema: JsonSchema</code> | execution Cancel Request 的 JSON Schema。 |
| `executionCancelRequestSchema` | 常量 | <code>const executionCancelRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; executionId: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString,...</code> | execution Cancel Request 的运行时 Schema。 |
| `executionReceiptJsonSchema` | 常量 | <code>const executionReceiptJsonSchema: JsonSchema</code> | execution Receipt 的 JSON Schema。 |
| `executionReceiptSchema` | 常量 | <code>const executionReceiptSchema: z.ZodObject&lt;{ id: z.ZodString; providerId: z.ZodString; executionId: z.ZodString; providerExecutionRef: z.ZodOptional&lt;z.ZodString&gt;; status: z.ZodEnum&lt;["accepted", "completed", "rejected", "unknown"]&gt;; issuedAt: z.ZodString; receiptHash: z.ZodString; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strict", z.ZodTypeAny, { status: "unknown" &#124; "completed" &#124; "rejected...</code> | execution Receipt 的运行时 Schema。 |
| `executionResourceUsageJsonSchema` | 常量 | <code>const executionResourceUsageJsonSchema: JsonSchema</code> | execution Resource Usage 的 JSON Schema。 |
| `executionResourceUsageSchema` | 常量 | <code>const executionResourceUsageSchema: z.ZodObject&lt;{ cpuTimeMs: z.ZodOptional&lt;z.ZodNumber&gt;; peakMemoryBytes: z.ZodOptional&lt;z.ZodNumber&gt;; readBytes: z.ZodOptional&lt;z.ZodNumber&gt;; writtenBytes: z.ZodOptional&lt;z.ZodNumber&gt;; networkBytesSent: z.ZodOptional&lt;z.ZodNumber&gt;; networkBytesReceived: z.ZodOptional&lt;z.ZodNumber&gt;; processCountPeak: z.ZodOptional&lt;z.ZodNumber&gt;; outputBytes: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodT...</code> | execution Resource Usage 的运行时 Schema。 |
| `canTransitionCommandExecutionStatus` | 函数 | <code>canTransitionCommandExecutionStatus(from: CommandExecutionStatus, to: CommandExecutionStatus): boolean</code> | 判断能否 Transition Command Execution Status。 |
| `validateCommandExecutionRequest` | 函数 | <code>validateCommandExecutionRequest(input: unknown): CommandExecutionRequest</code> | 校验 Command Execution Request。 |
| `validateCommandExecutionResult` | 函数 | <code>validateCommandExecutionResult(input: unknown): CommandExecutionResult</code> | 校验 Command Execution Result。 |
| `validateCommandOutputChunk` | 函数 | <code>validateCommandOutputChunk(input: unknown): CommandOutputChunk</code> | 校验 Command Output Chunk。 |
| `validateExecutionCancelRequest` | 函数 | <code>validateExecutionCancelRequest(input: unknown): ExecutionCancelRequest</code> | 校验 Execution Cancel Request。 |
