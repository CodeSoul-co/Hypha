# `@codesoul-co/hypha-core` / `contracts/runtime-message-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/runtime-message-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-message-schemas.ts)
- Exports: **10**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runtimeMessageContractDefinitions` | constant | <code>const runtimeMessageContractDefinitions: readonly [SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;]</code> | runtime Message Contract Definitions constant exported by the `contracts/runtime-message-schemas` module. |
| `runtimeMessageContractJsonSchemas` | constant | <code>const runtimeMessageContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | runtime Message Contract Json Schemas constant exported by the `contracts/runtime-message-schemas` module. |
| `runtimeMessageEnvelopeDefinition` | constant | <code>const runtimeMessageEnvelopeDefinition: SpecSchemaDefinition&lt;RuntimeMessageEnvelope&lt;unknown&gt;&gt;</code> | runtime Message Envelope Definition constant exported by the `contracts/runtime-message-schemas` module. |
| `runtimeMessageEnvelopeExample` | constant | <code>const runtimeMessageEnvelopeExample: RuntimeMessageEnvelope&lt;unknown&gt;</code> | Valid example value for runtime Message Envelope. |
| `runtimeMessageEnvelopeInputSchema` | constant | <code>const runtimeMessageEnvelopeInputSchema: z.ZodObject&lt;{ payloadHash: z.ZodOptional&lt;z.ZodString&gt;; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projecti...</code> | Runtime schema for runtime Message Envelope Input. |
| `runtimeMessageEnvelopeJsonSchema` | constant | <code>const runtimeMessageEnvelopeJsonSchema: JsonSchema</code> | JSON Schema for runtime Message Envelope. |
| `runtimeMessageEnvelopeSchema` | constant | <code>const runtimeMessageEnvelopeSchema: z.ZodObject&lt;{ payloadHash: z.ZodString; messageId: z.ZodString; messageType: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtim...</code> | Runtime schema for runtime Message Envelope. |
| `runtimeMessageTypeSchema` | constant | <code>const runtimeMessageTypeSchema: z.ZodEnum&lt;["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]&gt;</code> | Runtime schema for runtime Message Type. |
| `validateRuntimeMessageEnvelope` | function | <code>validateRuntimeMessageEnvelope(input: unknown): RuntimeMessageEnvelope</code> | Validates Runtime Message Envelope at this module boundary. |
| `validateRuntimeMessageEnvelopeInput` | function | <code>validateRuntimeMessageEnvelopeInput(input: unknown): RuntimeMessageEnvelopeInput</code> | Validates Runtime Message Envelope Input at this module boundary. |
