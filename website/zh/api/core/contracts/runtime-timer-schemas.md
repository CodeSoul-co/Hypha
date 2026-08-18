# `@codesoul-co/hypha-core` / `contracts/runtime-timer-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-timer-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-timer-schemas.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeTimerContractDefinitions` | 常量 | <code>const runtimeTimerContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;, SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;]</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 runtime Timer Contract Definitions 常量。 |
| `runtimeTimerContractJsonSchemas` | 常量 | <code>const runtimeTimerContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 runtime Timer Contract Json Schemas 常量。 |
| `runtimeTimerSweepRequestDefinition` | 常量 | <code>const runtimeTimerSweepRequestDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepRequest&gt;</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 runtime Timer Sweep Request Definition 常量。 |
| `runtimeTimerSweepRequestExample` | 常量 | <code>const runtimeTimerSweepRequestExample: RuntimeTimerSweepRequest</code> | runtime Timer Sweep Request 的有效示例值。 |
| `runtimeTimerSweepRequestJsonSchema` | 常量 | <code>const runtimeTimerSweepRequestJsonSchema: JsonSchema</code> | runtime Timer Sweep Request 的 JSON Schema。 |
| `runtimeTimerSweepRequestSchema` | 常量 | <code>const runtimeTimerSweepRequestSchema: z.ZodObject&lt;{ ownerId: z.ZodString; leaseTtlMs: z.ZodNumber; limit: z.ZodNumber; cursor: z.ZodOptional&lt;z.ZodString&gt;; firedAt: z.ZodString; }, "strict", z.ZodTypeAny, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }, { limit: number; ownerId: string; leaseTtlMs: number; firedAt: string; cursor?: string &#124; undefined; }&gt;</code> | runtime Timer Sweep Request 的运行时 Schema。 |
| `runtimeTimerSweepResultDefinition` | 常量 | <code>const runtimeTimerSweepResultDefinition: SpecSchemaDefinition&lt;RuntimeTimerSweepResult&gt;</code> | 由 `contracts/runtime-timer-schemas` 模块导出的 runtime Timer Sweep Result Definition 常量。 |
| `runtimeTimerSweepResultExample` | 常量 | <code>const runtimeTimerSweepResultExample: RuntimeTimerSweepResult</code> | runtime Timer Sweep Result 的有效示例值。 |
| `runtimeTimerSweepResultJsonSchema` | 常量 | <code>const runtimeTimerSweepResultJsonSchema: JsonSchema</code> | runtime Timer Sweep Result 的 JSON Schema。 |
| `runtimeTimerSweepResultSchema` | 常量 | <code>const runtimeTimerSweepResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ scanned: z.ZodNumber; fired: z.ZodNumber; notDue: z.ZodNumber; leaseUnavailable: z.ZodNumber; alreadyResolved: z.ZodNumber; results: z.ZodArray&lt;z.ZodObject&lt;{ scope: z.ZodObject&lt;{ tenantId: z.ZodOptional&lt;z.ZodString&gt;; userId: z.ZodString; runId: z.ZodString; }, "strict", z.ZodTypeAny, { userId: string; runId: string; tenantId?: string &#124; undefined; }, {...</code> | runtime Timer Sweep Result 的运行时 Schema。 |
| `validateRuntimeTimerSweepRequest` | 函数 | <code>validateRuntimeTimerSweepRequest(input: unknown): RuntimeTimerSweepRequest</code> | 校验 Runtime Timer Sweep Request。 |
| `validateRuntimeTimerSweepResult` | 函数 | <code>validateRuntimeTimerSweepResult(input: unknown): RuntimeTimerSweepResult</code> | 校验 Runtime Timer Sweep Result。 |
