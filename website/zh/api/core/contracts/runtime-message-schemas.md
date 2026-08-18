# `@codesoul-co/hypha-core` / `contracts/runtime-message-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/runtime-message-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)
- 导出数: **10**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runtimeMessageContractDefinitions` | 常量 | <code>const runtimeMessageContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;]</code> | 由 `contracts/runtime-message-schemas` 模块导出的 runtime Message Contract Definitions 常量。 |
| `runtimeMessageContractJsonSchemas` | 常量 | <code>const runtimeMessageContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/runtime-message-schemas` 模块导出的 runtime Message Contract Json Schemas 常量。 |
| `runtimeMessageEnvelopeDefinition` | 常量 | <code>const runtimeMessageEnvelopeDefinition: SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;</code> | 由 `contracts/runtime-message-schemas` 模块导出的 runtime Message Envelope Definition 常量。 |
| `runtimeMessageEnvelopeExample` | 常量 | <code>const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope&lt;unknown&gt;</code> | runtime Message Envelope 的有效示例值。 |
| `runtimeMessageEnvelopeInputSchema` | 常量 | <code>const runtimeMessageEnvelopeInputSchema: z.ZodObject&lt;{ payloadHash: z.ZodOptional&lt;z.ZodString&gt;; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projecti...</code> | runtime Message Envelope Input 的运行时 Schema。 |
| `runtimeMessageEnvelopeJsonSchema` | 常量 | <code>const runtimeMessageEnvelopeJsonSchema: JsonSchema</code> | runtime Message Envelope 的 JSON Schema。 |
| `runtimeMessageEnvelopeSchema` | 常量 | <code>const runtimeMessageEnvelopeSchema: z.ZodObject&lt;{ payloadHash: z.ZodString; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtim...</code> | runtime Message Envelope 的运行时 Schema。 |
| `runtimeMessageTypeSchema` | 常量 | <code>const runtimeMessageTypeSchema: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]&gt;</code> | runtime Message Type 的运行时 Schema。 |
| `validateRuntimeMessageEnvelope` | 函数 | <code>validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope</code> | 校验 Runtime Message Envelope。 |
| `validateRuntimeMessageEnvelopeInput` | 函数 | <code>validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput</code> | 校验 Runtime Message Envelope Input。 |
