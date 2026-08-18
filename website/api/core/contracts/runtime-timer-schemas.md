# `@codesoul-co/hypha-core` / `contracts/runtime-timer-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-timer-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeTimerContractDefinitions` | constant | <code>const runtimeTimerContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;]</code> | runtime Timer Contract Definitions constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerContractJsonSchemas` | constant | <code>const runtimeTimerContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | runtime Timer Contract Json Schemas constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerSweepRequestDefinition` | constant | <code>const runtimeTimerSweepRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;</code> | runtime Timer Sweep Request Definition constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerSweepRequestExample` | constant | <code>const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest</code> | Valid example value for runtime Timer Sweep Request. |
| `runtimeTimerSweepRequestJsonSchema` | constant | <code>const runtimeTimerSweepRequestJsonSchema: JsonSchema</code> | JSON Schema for runtime Timer Sweep Request. |
| `runtimeTimerSweepRequestSchema` | constant | <code>const runtimeTimerSweepRequestSchema: z.ZodObject&lt;{ ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; limit: z.ZodNumber; cursor: z.ZodOptional&lt;z.ZodString&gt;; firedAt: z.ZodString; }, "strict", z.ZodTypeAny, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }&gt;</code> | Runtime schema for runtime Timer Sweep Request. |
| `runtimeTimerSweepResultDefinition` | constant | <code>const runtimeTimerSweepResultDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;</code> | runtime Timer Sweep Result Definition constant exported by the `contracts/runtime-timer-schemas` module. |
| `runtimeTimerSweepResultExample` | constant | <code>const runtimeTimerSweepResultExample: RuntimeTimerSweepResult</code> | Valid example value for runtime Timer Sweep Result. |
| `runtimeTimerSweepResultJsonSchema` | constant | <code>const runtimeTimerSweepResultJsonSchema: JsonSchema</code> | JSON Schema for runtime Timer Sweep Result. |
| `runtimeTimerSweepResultSchema` | constant | <code>const runtimeTimerSweepResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scanned: z.ZodNumber; fired: z.ZodNumber; notDue: z.ZodNumber; leaseUnavailable: z.ZodNumber; alreadyResolved: z.ZodNumber; results: z.ZodArray&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, {...</code> | Runtime schema for runtime Timer Sweep Result. |
| `validateRuntimeTimerSweepRequest` | function | <code>validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest</code> | Validates Runtime Timer Sweep Request at this module boundary. |
| `validateRuntimeTimerSweepResult` | function | <code>validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult</code> | Validates Runtime Timer Sweep Result at this module boundary. |
