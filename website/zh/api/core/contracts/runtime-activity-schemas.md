# `@codesoul-co/hypha-core` / `contracts/runtime-activity-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-activity-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity-schemas.ts)
- 导出数: **17**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeActivityContractDefinitions` | 常量 | <code>const runtimeActivityContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeActivityRequest&lt;RuntimeJsonValue&gt;&gt;, SpecSchemaDefinition&lt;RuntimeActivityDescriptor&gt;]</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 runtime Activity Contract Definitions 常量。 |
| `runtimeActivityContractJsonSchemas` | 常量 | <code>const runtimeActivityContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 runtime Activity Contract Json Schemas 常量。 |
| `runtimeActivityDescriptorDefinition` | 常量 | <code>const runtimeActivityDescriptorDefinition: SpecSchemaDefinition&lt;RuntimeActivityDescriptor&gt;</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 runtime Activity Descriptor Definition 常量。 |
| `runtimeActivityDescriptorExample` | 常量 | <code>const runtimeActivityDescriptorExample: RuntimeActivityDescriptor</code> | runtime Activity Descriptor 的有效示例值。 |
| `runtimeActivityDescriptorJsonSchema` | 常量 | <code>const runtimeActivityDescriptorJsonSchema: JsonSchema</code> | runtime Activity Descriptor 的 JSON Schema。 |
| `runtimeActivityDescriptorSchema` | 常量 | <code>const runtimeActivityDescriptorSchema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; activityId: z.ZodString; activityKind: z.ZodEnum&lt;["react_quantum", "tool", "memory", "execution", "mcp", "policy"]&gt;; runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; operationId: z.ZodString; inputRef: z.ZodString; inputHash: z.ZodString; providerRef: z.ZodOptional&lt;z.ZodString&gt;; providerRevision: z.ZodOptional&lt;...</code> | runtime Activity Descriptor 的运行时 Schema。 |
| `runtimeActivityInvocationSchema` | 常量 | <code>const runtimeActivityInvocationSchema: z.ZodObject&lt;{ activityId: z.ZodString; operationId: z.ZodString; activityType: z.ZodEnum&lt;["tool", "memory", "model", "execution", "custom"]&gt;; target: z.ZodString; input: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; ru...</code> | runtime Activity Invocation 的运行时 Schema。 |
| `runtimeActivityObservationJsonSchema` | 常量 | <code>const runtimeActivityObservationJsonSchema: JsonSchema</code> | runtime Activity Observation 的 JSON Schema。 |
| `runtimeActivityObservationSchema` | 常量 | <code>const runtimeActivityObservationSchema: z.ZodEffects&lt;z.ZodObject&lt;{ activityId: z.ZodString; status: z.ZodEnum&lt;["completed", "failed", "waiting", "cancelled"]&gt;; eventIds: z.ZodArray&lt;z.ZodString, "many"&gt;; output: z.ZodOptional&lt;z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;&gt;; artifactRefs: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; retryable: z.ZodOptional&lt;z.ZodBoolean&gt;; error: z.ZodOptional&lt;z.ZodOb...</code> | runtime Activity Observation 的运行时 Schema。 |
| `runtimeActivityRequestDefinition` | 常量 | <code>const runtimeActivityRequestDefinition: SpecSchemaDefinition&lt;RuntimeActivityRequest&lt;RuntimeJsonValue&gt;&gt;</code> | 由 `contracts/runtime-activity-schemas` 模块导出的 runtime Activity Request Definition 常量。 |
| `runtimeActivityRequestExample` | 常量 | <code>const runtimeActivityRequestExample: RuntimeActivityRequest&lt;RuntimeJsonValue&gt;</code> | runtime Activity Request 的有效示例值。 |
| `runtimeActivityRequestJsonSchema` | 常量 | <code>const runtimeActivityRequestJsonSchema: JsonSchema</code> | runtime Activity Request 的 JSON Schema。 |
| `runtimeActivityRequestSchema` | 常量 | <code>const runtimeActivityRequestSchema: z.ZodObject&lt;{ target: z.ZodString; input: z.ZodType&lt;RuntimeJsonValue, z.ZodTypeDef, RuntimeJsonValue&gt;; options: z.ZodOptional&lt;z.ZodObject&lt;{ effect: z.ZodOptional&lt;z.ZodEnum&lt;["pure", "idempotent", "external_effect", "irreversible"]&gt;&gt;; timeoutMs: z.ZodOptional&lt;z.ZodNumber&gt;; retry: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ maxAttempts: z.ZodNumber; initialDelayMs: z.ZodOptional&lt;z.Zod...</code> | runtime Activity Request 的运行时 Schema。 |
| `validateRuntimeActivityDescriptor` | 函数 | <code>validateRuntimeActivityDescriptor(input: unknown): RuntimeActivityDescriptor</code> | 校验 Runtime Activity Descriptor。 |
| `validateRuntimeActivityInvocation` | 函数 | <code>validateRuntimeActivityInvocation(input: unknown): RuntimeActivityInvocation</code> | 校验 Runtime Activity Invocation。 |
| `validateRuntimeActivityObservation` | 函数 | <code>validateRuntimeActivityObservation(input: unknown): RuntimeActivityObservation</code> | 校验 Runtime Activity Observation。 |
| `validateRuntimeActivityRequest` | 函数 | <code>validateRuntimeActivityRequest(input: unknown): RuntimeActivityRequest</code> | 校验 Runtime Activity Request。 |
