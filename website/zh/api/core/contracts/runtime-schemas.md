# `@codesoul-co/hypha-core` / `contracts/runtime-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-schemas.ts)
- 导出数: **48**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `normalizedRuntimeErrorDefinition` | 常量 | <code>const normalizedRuntimeErrorDefinition: SpecSchemaDefinition&lt;NormalizedRuntimeError&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 normalized Runtime Error Definition 常量。 |
| `normalizedRuntimeErrorExample` | 常量 | <code>const normalizedRuntimeErrorExample: NormalizedRuntimeError</code> | normalized Runtime Error 的有效示例值。 |
| `normalizedRuntimeErrorJsonSchema` | 常量 | <code>const normalizedRuntimeErrorJsonSchema: JsonSchema</code> | normalized Runtime Error 的 JSON Schema。 |
| `normalizedRuntimeErrorSchema` | 常量 | <code>const normalizedRuntimeErrorSchema: z.ZodObject&lt;{ code: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW"...</code> | normalized Runtime Error 的运行时 Schema。 |
| `runSignalRequestDefinition` | 常量 | <code>const runSignalRequestDefinition: SpecSchemaDefinition&lt;RunSignalRequest&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 run Signal Request Definition 常量。 |
| `runSignalRequestExample` | 常量 | <code>const runSignalRequestExample: RunSignalRequest</code> | run Signal Request 的有效示例值。 |
| `runSignalRequestJsonSchema` | 常量 | <code>const runSignalRequestJsonSchema: JsonSchema</code> | run Signal Request 的 JSON Schema。 |
| `runSignalRequestSchema` | 常量 | <code>const runSignalRequestSchema: z.ZodObject&lt;{ signalId: z.ZodString; runId: z.ZodString; key: z.ZodString; principal: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodStri...</code> | run Signal Request 的运行时 Schema。 |
| `runtimeContractDefinitions` | 常量 | <code>const runtimeContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeScope&gt;, SpecSchemaDefinition&lt;RuntimePrincipal&gt;, SpecSchemaDefinition&lt;NormalizedRuntimeError&gt;, SpecSchemaDefinition&lt;RuntimeSession&gt;, SpecSchemaDefinition&lt;RuntimeRun&gt;, SpecSchemaDefinition&lt;RuntimeWaitRequest&gt;, SpecSchemaDefinition&lt;RuntimeWaitRecord&gt;, SpecSchemaDefinition&lt;RunSignalRequest&gt;]</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Contract Definitions 常量。 |
| `runtimeContractJsonSchemas` | 常量 | <code>const runtimeContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Contract Json Schemas 常量。 |
| `runtimeErrorCodeSchema` | 常量 | <code>const runtimeErrorCodeSchema: z.ZodEnum&lt;["RUNTIME_INVALID_INPUT", "RUNTIME_MESSAGE_BUS_UNAVAILABLE", "RUNTIME_MESSAGE_SCHEMA_INVALID", "RUNTIME_MESSAGE_DEAD_LETTERED", "RUNTIME_SESSION_QUEUE_CONFLICT", "RUNTIME_SESSION_QUEUE_OVERFLOW", "RUNTIME_FENCING_REJECTED", "RUNTIME_RESOURCE_CONFLICT", "RUNTIME_IDEMPOTENCY_CONFLICT", "RUNTIME_EVENT_STREAM_CORRUPT", "RUNTIME_RECOVERY_REQUIRES_REVIEW", "RUNTIME_RUN_NOT_FOUND",...</code> | runtime Error Code 的运行时 Schema。 |
| `runtimePrincipalDefinition` | 常量 | <code>const runtimePrincipalDefinition: SpecSchemaDefinition&lt;RuntimePrincipal&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Principal Definition 常量。 |
| `runtimePrincipalExample` | 常量 | <code>const runtimePrincipalExample: RuntimePrincipal</code> | runtime Principal 的有效示例值。 |
| `runtimePrincipalJsonSchema` | 常量 | <code>const runtimePrincipalJsonSchema: JsonSchema</code> | runtime Principal 的 JSON Schema。 |
| `runtimePrincipalSchema` | 常量 | <code>const runtimePrincipalSchema: z.ZodObject&lt;{ principalId: z.ZodString; type: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodOptional&lt;z.ZodString&gt;; agentId: z.ZodOptional&lt;z.ZodString&gt;; roles: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; permissionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodType&lt;JsonValue, z.Z...</code> | runtime Principal 的运行时 Schema。 |
| `runtimePrincipalTypeSchema` | 常量 | <code>const runtimePrincipalTypeSchema: z.ZodEnum&lt;["user", "agent", "service", "system"]&gt;</code> | runtime Principal Type 的运行时 Schema。 |
| `runtimeRunDefinition` | 常量 | <code>const runtimeRunDefinition: SpecSchemaDefinition&lt;RuntimeRun&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Run Definition 常量。 |
| `runtimeRunExample` | 常量 | <code>const runtimeRunExample: RuntimeRun</code> | runtime Run 的有效示例值。 |
| `runtimeRunJsonSchema` | 常量 | <code>const runtimeRunJsonSchema: JsonSchema</code> | runtime Run 的 JSON Schema。 |
| `runtimeRunSchema` | 常量 | <code>const runtimeRunSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; domainPackRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?:...</code> | runtime Run 的运行时 Schema。 |
| `runtimeRunStatusSchema` | 常量 | <code>const runtimeRunStatusSchema: z.ZodEnum&lt;["created", "queued", "starting", "acquiring", "running", "waiting", "waiting_human", "waiting_signal", "waiting_timer", "pausing", "paused", "retry_scheduled", "recovering", "cancelling", "completed", "failed", "cancelled", "timed_out"]&gt;</code> | runtime Run Status 的运行时 Schema。 |
| `runtimeScopeDefinition` | 常量 | <code>const runtimeScopeDefinition: SpecSchemaDefinition&lt;RuntimeScope&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Scope Definition 常量。 |
| `runtimeScopeExample` | 常量 | <code>const runtimeScopeExample: RuntimeScope</code> | runtime Scope 的有效示例值。 |
| `runtimeScopeJsonSchema` | 常量 | <code>const runtimeScopeJsonSchema: JsonSchema</code> | runtime Scope 的 JSON Schema。 |
| `runtimeScopeSchema` | 常量 | <code>const runtimeScopeSchema: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; }, { userId: string; s...</code> | runtime Scope 的运行时 Schema。 |
| `runtimeSessionDefinition` | 常量 | <code>const runtimeSessionDefinition: SpecSchemaDefinition&lt;RuntimeSession&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Session Definition 常量。 |
| `runtimeSessionExample` | 常量 | <code>const runtimeSessionExample: RuntimeSession</code> | runtime Session 的有效示例值。 |
| `runtimeSessionJsonSchema` | 常量 | <code>const runtimeSessionJsonSchema: JsonSchema</code> | runtime Session 的 JSON Schema。 |
| `runtimeSessionSchema` | 常量 | <code>const runtimeSessionSchema: z.ZodObject&lt;{ id: z.ZodString; revision: z.ZodNumber; tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; domainPackRef: z.ZodOptional&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; revision?: string &#124; undefined; version?: string &#124; undefined;...</code> | runtime Session 的运行时 Schema。 |
| `runtimeSessionStatusSchema` | 常量 | <code>const runtimeSessionStatusSchema: z.ZodEnum&lt;["active", "closed", "archived"]&gt;</code> | runtime Session Status 的运行时 Schema。 |
| `runtimeWaitRecordDefinition` | 常量 | <code>const runtimeWaitRecordDefinition: SpecSchemaDefinition&lt;RuntimeWaitRecord&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Wait Record Definition 常量。 |
| `runtimeWaitRecordExample` | 常量 | <code>const runtimeWaitRecordExample: RuntimeWaitRecord</code> | runtime Wait Record 的有效示例值。 |
| `runtimeWaitRecordJsonSchema` | 常量 | <code>const runtimeWaitRecordJsonSchema: JsonSchema</code> | runtime Wait Record 的 JSON Schema。 |
| `runtimeWaitRecordSchema` | 常量 | <code>const runtimeWaitRecordSchema: z.ZodObject&lt;{ id: z.ZodString; runId: z.ZodString; stateId: z.ZodString; type: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; status: z.ZodEnum&lt;["waiting", "received", "expired", "cancelled"]&gt;; expectedSchemaHash: z.ZodOptional&lt;z.ZodString&gt;; createdAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; resolvedAt: z.ZodOptional&lt;z.ZodS...</code> | runtime Wait Record 的运行时 Schema。 |
| `runtimeWaitRequestDefinition` | 常量 | <code>const runtimeWaitRequestDefinition: SpecSchemaDefinition&lt;RuntimeWaitRequest&gt;</code> | 由 `contracts/runtime-schemas` 模块导出的 runtime Wait Request Definition 常量。 |
| `runtimeWaitRequestExample` | 常量 | <code>const runtimeWaitRequestExample: RuntimeWaitRequest</code> | runtime Wait Request 的有效示例值。 |
| `runtimeWaitRequestJsonSchema` | 常量 | <code>const runtimeWaitRequestJsonSchema: JsonSchema</code> | runtime Wait Request 的 JSON Schema。 |
| `runtimeWaitRequestSchema` | 常量 | <code>const runtimeWaitRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;; key: z.ZodOptional&lt;z.ZodString&gt;; expectedSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; timeoutTransitionId: z.ZodOptional&lt;z.ZodString&gt;; pendingActionRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodS...</code> | runtime Wait Request 的运行时 Schema。 |
| `runtimeWaitStatusSchema` | 常量 | <code>const runtimeWaitStatusSchema: z.ZodEnum&lt;["waiting", "received", "expired", "cancelled"]&gt;</code> | runtime Wait Status 的运行时 Schema。 |
| `runtimeWaitTypeSchema` | 常量 | <code>const runtimeWaitTypeSchema: z.ZodEnum&lt;["human", "signal", "timer", "external_operation"]&gt;</code> | runtime Wait Type 的运行时 Schema。 |
| `validateNormalizedRuntimeError` | 函数 | <code>validateNormalizedRuntimeError(input: unknown): NormalizedRuntimeError</code> | 校验 Normalized Runtime Error。 |
| `validateRunSignalRequest` | 函数 | <code>validateRunSignalRequest(input: unknown): RunSignalRequest</code> | 校验 Run Signal Request。 |
| `validateRuntimePrincipal` | 函数 | <code>validateRuntimePrincipal(input: unknown): RuntimePrincipal</code> | 校验 Runtime Principal。 |
| `validateRuntimeRun` | 函数 | <code>validateRuntimeRun(input: unknown): RuntimeRun</code> | 校验 Runtime Run。 |
| `validateRuntimeScope` | 函数 | <code>validateRuntimeScope(input: unknown): RuntimeScope</code> | 校验 Runtime Scope。 |
| `validateRuntimeSession` | 函数 | <code>validateRuntimeSession(input: unknown): RuntimeSession</code> | 校验 Runtime Session。 |
| `validateRuntimeWaitRecord` | 函数 | <code>validateRuntimeWaitRecord(input: unknown): RuntimeWaitRecord</code> | 校验 Runtime Wait Record。 |
| `validateRuntimeWaitRequest` | 函数 | <code>validateRuntimeWaitRequest(input: unknown): RuntimeWaitRequest</code> | 校验 Runtime Wait Request。 |
