# `@codesoul-co/hypha-core` / `contracts/runtime-human-task-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-human-task-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-human-task-schemas.ts)
- Exports: **15**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeHumanTaskContractDefinitions` | constant | <code>const runtimeHumanTaskContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeHumanTask&gt;, SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;]</code> | runtime Human Task Contract Definitions constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskContractJsonSchemas` | constant | <code>const runtimeHumanTaskContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | runtime Human Task Contract Json Schemas constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskDecisionCommandDefinition` | constant | <code>const runtimeHumanTaskDecisionCommandDefinition: SpecSchemaDefinition&lt;RuntimeHumanTaskDecisionCommand&gt;</code> | runtime Human Task Decision Command Definition constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskDecisionCommandExample` | constant | <code>const runtimeHumanTaskDecisionCommandExample: RuntimeHumanTaskDecisionCommand</code> | Valid example value for runtime Human Task Decision Command. |
| `runtimeHumanTaskDecisionCommandJsonSchema` | constant | <code>const runtimeHumanTaskDecisionCommandJsonSchema: JsonSchema</code> | JSON Schema for runtime Human Task Decision Command. |
| `runtimeHumanTaskDecisionCommandSchema` | constant | <code>const runtimeHumanTaskDecisionCommandSchema: z.ZodEffects&lt;z.ZodObject&lt;{ commandId: z.ZodString; scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; workspaceId: z.ZodOptional&lt;z.ZodString&gt;; sessionId: z.ZodString; runId: z.ZodString; agentId: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { userId: string; sessionId: string; runId: string; tenantId?: string &#124; undefined; workspace...</code> | Runtime schema for runtime Human Task Decision Command. |
| `runtimeHumanTaskDefinition` | constant | <code>const runtimeHumanTaskDefinition: SpecSchemaDefinition&lt;RuntimeHumanTask&gt;</code> | runtime Human Task Definition constant exported by the `contracts/runtime-human-task-schemas` module. |
| `runtimeHumanTaskExample` | constant | <code>const runtimeHumanTaskExample: RuntimeHumanTask</code> | Valid example value for runtime Human Task. |
| `runtimeHumanTaskJsonSchema` | constant | <code>const runtimeHumanTaskJsonSchema: JsonSchema</code> | JSON Schema for runtime Human Task. |
| `runtimeHumanTaskRequestJsonSchema` | constant | <code>const runtimeHumanTaskRequestJsonSchema: JsonSchema</code> | JSON Schema for runtime Human Task Request. |
| `runtimeHumanTaskRequestSchema` | constant | <code>const runtimeHumanTaskRequestSchema: z.ZodEffects&lt;z.ZodObject&lt;{ taskId: z.ZodString; kind: z.ZodEnum&lt;["tool", "skill", "prompt", "memory", "execution", "mcp", "policy"]&gt;; subjectRef: z.ZodString; subjectHash: z.ZodString; requestedBy: z.ZodString; allowedDecisionScopes: z.ZodArray&lt;z.ZodString, "many"&gt;; requestedAt: z.ZodString; expiresAt: z.ZodOptional&lt;z.ZodString&gt;; checkpointRef: z.ZodOptional&lt;z.ZodString&gt;; polic...</code> | Runtime schema for runtime Human Task Request. |
| `runtimeHumanTaskSchema` | constant | <code>const runtimeHumanTaskSchema: z.ZodEffects&lt;z.ZodEffects&lt;z.ZodObject&lt;{ runId: z.ZodString; stateId: z.ZodString; stateAttempt: z.ZodNumber; status: z.ZodEnum&lt;["pending", "approved", "rejected", "expired", "cancelled", "superseded"]&gt;; revision: z.ZodNumber; decisionEventId: z.ZodOptional&lt;z.ZodString&gt;; decisionCommandId: z.ZodOptional&lt;z.ZodString&gt;; decisionIdempotencyKey: z.ZodOptional&lt;z.ZodString&gt;; decidedBy: z.ZodO...</code> | Runtime schema for runtime Human Task. |
| `validateRuntimeHumanTask` | function | <code>validateRuntimeHumanTask(input: unknown): RuntimeHumanTask</code> | Validates Runtime Human Task at this module boundary. |
| `validateRuntimeHumanTaskDecisionCommand` | function | <code>validateRuntimeHumanTaskDecisionCommand(input: unknown): RuntimeHumanTaskDecisionCommand</code> | Validates Runtime Human Task Decision Command at this module boundary. |
| `validateRuntimeHumanTaskRequest` | function | <code>validateRuntimeHumanTaskRequest(input: unknown): RuntimeHumanTaskRequest</code> | Validates Runtime Human Task Request at this module boundary. |
