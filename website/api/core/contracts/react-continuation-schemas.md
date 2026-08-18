# `@codesoul-co/hypha-core` / `contracts/react-continuation-schemas`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/react-continuation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `continueReActCommandPayloadDefinition` | constant | <code>const continueReActCommandPayloadDefinition: SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;</code> | continue Re Act Command Payload Definition constant exported by the `contracts/react-continuation-schemas` module. |
| `continueReActCommandPayloadV1Example` | constant | <code>const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1</code> | Valid example value for continue Re Act Command Payload V1. |
| `continueReActCommandPayloadV1JsonSchema` | constant | <code>const continueReActCommandPayloadV1JsonSchema: JsonSchema</code> | JSON Schema for continue Re Act Command Payload V1. |
| `continueReActCommandPayloadV1Schema` | constant | <code>const continueReActCommandPayloadV1Schema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; checkpointRef: z.ZodString; checkpointHash: z.ZodString; checkpointSequence: z.ZodNumber; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict",...</code> | Runtime schema for continue Re Act Command Payload V1. |
| `reActContinuationContractDefinitions` | constant | <code>const reActContinuationContractDefinitions: readonly [SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;, SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;]</code> | re Act Continuation Contract Definitions constant exported by the `contracts/react-continuation-schemas` module. |
| `reActContinuationContractJsonSchemas` | constant | <code>const reActContinuationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | re Act Continuation Contract Json Schemas constant exported by the `contracts/react-continuation-schemas` module. |
| `reActQuantumDescriptorDefinition` | constant | <code>const reActQuantumDescriptorDefinition: SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;</code> | re Act Quantum Descriptor Definition constant exported by the `contracts/react-continuation-schemas` module. |
| `reActQuantumDescriptorExample` | constant | <code>const reActQuantumDescriptorExample: ReActQuantumDescriptor</code> | Valid example value for re Act Quantum Descriptor. |
| `reActQuantumDescriptorJsonSchema` | constant | <code>const reActQuantumDescriptorJsonSchema: JsonSchema</code> | JSON Schema for re Act Quantum Descriptor. |
| `reActQuantumDescriptorSchema` | constant | <code>const reActQuantumDescriptorSchema: z.ZodDiscriminatedUnion&lt;"trigger", [z.ZodObject&lt;{ trigger: z.ZodLiteral&lt;"initial"&gt;; version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string...</code> | Runtime schema for re Act Quantum Descriptor. |
| `validateContinueReActCommandPayload` | function | <code>validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1</code> | Validates Continue Re Act Command Payload at this module boundary. |
| `validateReActQuantumDescriptor` | function | <code>validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor</code> | Validates Re Act Quantum Descriptor at this module boundary. |
