# `@codesoul-co/hypha-core` / `contracts/runtime-query-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-query-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)
- 导出数: **22**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeQueryContractDefinitions` | 常量 | <code>const runtimeQueryContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;, SpecSchemaDefinition&lt;RuntimeRunView&gt;, SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;]</code> | 由 `contracts/runtime-query-schemas` 模块导出的 runtime Query Contract Definitions 常量。 |
| `runtimeQueryContractJsonSchemas` | 常量 | <code>const runtimeQueryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 runtime Query Contract Json Schemas 常量。 |
| `runtimeQueryRequestDefinition` | 常量 | <code>const runtimeQueryRequestDefinition: SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 runtime Query Request Definition 常量。 |
| `runtimeQueryRequestExample` | 常量 | <code>const runtimeQueryRequestExample: RuntimeQueryRequest</code> | runtime Query Request 的有效示例值。 |
| `runtimeQueryRequestJsonSchema` | 常量 | <code>const runtimeQueryRequestJsonSchema: JsonSchema</code> | runtime Query Request 的 JSON Schema。 |
| `runtimeQueryRequestSchema` | 常量 | <code>const runtimeQueryRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; undef...</code> | runtime Query Request 的运行时 Schema。 |
| `runtimeRunViewDefinition` | 常量 | <code>const runtimeRunViewDefinition: SpecSchemaDefinition&lt;RuntimeRunView&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 runtime Run View Definition 常量。 |
| `runtimeRunViewExample` | 常量 | <code>const runtimeRunViewExample: RuntimeRunView</code> | runtime Run View 的有效示例值。 |
| `runtimeRunViewJsonSchema` | 常量 | <code>const runtimeRunViewJsonSchema: JsonSchema</code> | runtime Run View 的 JSON Schema。 |
| `runtimeRunViewSchema` | 常量 | <code>const runtimeRunViewSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string...</code> | runtime Run View 的运行时 Schema。 |
| `runtimeStateExplanationDefinition` | 常量 | <code>const runtimeStateExplanationDefinition: SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 runtime State Explanation Definition 常量。 |
| `runtimeStateExplanationExample` | 常量 | <code>const runtimeStateExplanationExample: RuntimeStateExplanation</code> | runtime State Explanation 的有效示例值。 |
| `runtimeStateExplanationJsonSchema` | 常量 | <code>const runtimeStateExplanationJsonSchema: JsonSchema</code> | runtime State Explanation 的 JSON Schema。 |
| `runtimeStateExplanationSchema` | 常量 | <code>const runtimeStateExplanationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; u...</code> | runtime State Explanation 的运行时 Schema。 |
| `runtimeTimelineRequestDefinition` | 常量 | <code>const runtimeTimelineRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;</code> | 由 `contracts/runtime-query-schemas` 模块导出的 runtime Timeline Request Definition 常量。 |
| `runtimeTimelineRequestExample` | 常量 | <code>const runtimeTimelineRequestExample: RuntimeTimelineRequest</code> | runtime Timeline Request 的有效示例值。 |
| `runtimeTimelineRequestJsonSchema` | 常量 | <code>const runtimeTimelineRequestJsonSchema: JsonSchema</code> | runtime Timeline Request 的 JSON Schema。 |
| `runtimeTimelineRequestSchema` | 常量 | <code>const runtimeTimelineRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?...</code> | runtime Timeline Request 的运行时 Schema。 |
| `validateRuntimeQueryRequest` | 函数 | <code>validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest</code> | 校验 Runtime Query Request。 |
| `validateRuntimeRunView` | 函数 | <code>validateRuntimeRunView(input: unknown): RuntimeRunView</code> | 校验 Runtime Run View。 |
| `validateRuntimeStateExplanation` | 函数 | <code>validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation</code> | 校验 Runtime State Explanation。 |
| `validateRuntimeTimelineRequest` | 函数 | <code>validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest</code> | 校验 Runtime Timeline Request。 |
