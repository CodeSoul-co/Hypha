# `@codesoul-co/hypha-core` / `contracts/runtime-query-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-query-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query-schemas.ts)
- Exports: **22**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeQueryContractDefinitions` | constant | <code>const runtimeQueryContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;, SpecSchemaDefinition&lt;RuntimeRunView&gt;, SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;]</code> | runtime Query Contract Definitions constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeQueryContractJsonSchemas` | constant | <code>const runtimeQueryContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | runtime Query Contract Json Schemas constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeQueryRequestDefinition` | constant | <code>const runtimeQueryRequestDefinition: SpecSchemaDefinition&lt;RuntimeQueryRequest&gt;</code> | runtime Query Request Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeQueryRequestExample` | constant | <code>const runtimeQueryRequestExample: RuntimeQueryRequest</code> | Valid example value for runtime Query Request. |
| `runtimeQueryRequestJsonSchema` | constant | <code>const runtimeQueryRequestJsonSchema: JsonSchema</code> | JSON Schema for runtime Query Request. |
| `runtimeQueryRequestSchema` | constant | <code>const runtimeQueryRequestSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; undef...</code> | Runtime schema for runtime Query Request. |
| `runtimeRunViewDefinition` | constant | <code>const runtimeRunViewDefinition: SpecSchemaDefinition&lt;RuntimeRunView&gt;</code> | runtime Run View Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeRunViewExample` | constant | <code>const runtimeRunViewExample: RuntimeRunView</code> | Valid example value for runtime Run View. |
| `runtimeRunViewJsonSchema` | constant | <code>const runtimeRunViewJsonSchema: JsonSchema</code> | JSON Schema for runtime Run View. |
| `runtimeRunViewSchema` | constant | <code>const runtimeRunViewSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string...</code> | Runtime schema for runtime Run View. |
| `runtimeStateExplanationDefinition` | constant | <code>const runtimeStateExplanationDefinition: SpecSchemaDefinition&lt;RuntimeStateExplanation&gt;</code> | runtime State Explanation Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeStateExplanationExample` | constant | <code>const runtimeStateExplanationExample: RuntimeStateExplanation</code> | Valid example value for runtime State Explanation. |
| `runtimeStateExplanationJsonSchema` | constant | <code>const runtimeStateExplanationJsonSchema: JsonSchema</code> | JSON Schema for runtime State Explanation. |
| `runtimeStateExplanationSchema` | constant | <code>const runtimeStateExplanationSchema: z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?: string &#124; u...</code> | Runtime schema for runtime State Explanation. |
| `runtimeTimelineRequestDefinition` | constant | <code>const runtimeTimelineRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimelineRequest&gt;</code> | runtime Timeline Request Definition constant exported by the `contracts/runtime-query-schemas` module. |
| `runtimeTimelineRequestExample` | constant | <code>const runtimeTimelineRequestExample: RuntimeTimelineRequest</code> | Valid example value for runtime Timeline Request. |
| `runtimeTimelineRequestJsonSchema` | constant | <code>const runtimeTimelineRequestJsonSchema: JsonSchema</code> | JSON Schema for runtime Timeline Request. |
| `runtimeTimelineRequestSchema` | constant | <code>const runtimeTimelineRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { sessionId: string; runId: string; userId: string; workspaceId?: string &#124; undefined; agentId?: string &#124; undefined; tenantId?...</code> | Runtime schema for runtime Timeline Request. |
| `validateRuntimeQueryRequest` | function | <code>validateRuntimeQueryRequest(input: unknown): RuntimeQueryRequest</code> | Validates Runtime Query Request at this module boundary. |
| `validateRuntimeRunView` | function | <code>validateRuntimeRunView(input: unknown): RuntimeRunView</code> | Validates Runtime Run View at this module boundary. |
| `validateRuntimeStateExplanation` | function | <code>validateRuntimeStateExplanation(input: unknown): RuntimeStateExplanation</code> | Validates Runtime State Explanation at this module boundary. |
| `validateRuntimeTimelineRequest` | function | <code>validateRuntimeTimelineRequest(input: unknown): RuntimeTimelineRequest</code> | Validates Runtime Timeline Request at this module boundary. |
