# `@codesoul-co/hypha-core` / `contracts/react-continuation-schemas`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/react-continuation-schemas.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/react-continuation-schemas.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `continueReActCommandPayloadDefinition` | 常量 | <code>const continueReActCommandPayloadDefinition: SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;</code> | 由 `contracts/react-continuation-schemas` 模块导出的 continue Re Act Command Payload Definition 常量。 |
| `continueReActCommandPayloadV1Example` | 常量 | <code>const continueReActCommandPayloadV1Example: ContinueReActCommandPayloadV1</code> | continue Re Act Command Payload V1 的有效示例值。 |
| `continueReActCommandPayloadV1JsonSchema` | 常量 | <code>const continueReActCommandPayloadV1JsonSchema: JsonSchema</code> | continue Re Act Command Payload V1 的 JSON Schema。 |
| `continueReActCommandPayloadV1Schema` | 常量 | <code>const continueReActCommandPayloadV1Schema: z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; checkpointRef: z.ZodString; checkpointHash: z.ZodString; checkpointSequence: z.ZodNumber; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict",...</code> | continue Re Act Command Payload V1 的运行时 Schema。 |
| `reActContinuationContractDefinitions` | 常量 | <code>const reActContinuationContractDefinitions: readonly [SpecSchemaDefinition&lt;ContinueReActCommandPayloadV1&gt;, SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;]</code> | 由 `contracts/react-continuation-schemas` 模块导出的 re Act Continuation Contract Definitions 常量。 |
| `reActContinuationContractJsonSchemas` | 常量 | <code>const reActContinuationContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `contracts/react-continuation-schemas` 模块导出的 re Act Continuation Contract Json Schemas 常量。 |
| `reActQuantumDescriptorDefinition` | 常量 | <code>const reActQuantumDescriptorDefinition: SpecSchemaDefinition&lt;ReActQuantumDescriptor&gt;</code> | 由 `contracts/react-continuation-schemas` 模块导出的 re Act Quantum Descriptor Definition 常量。 |
| `reActQuantumDescriptorExample` | 常量 | <code>const reActQuantumDescriptorExample: ReActQuantumDescriptor</code> | re Act Quantum Descriptor 的有效示例值。 |
| `reActQuantumDescriptorJsonSchema` | 常量 | <code>const reActQuantumDescriptorJsonSchema: JsonSchema</code> | re Act Quantum Descriptor 的 JSON Schema。 |
| `reActQuantumDescriptorSchema` | 常量 | <code>const reActQuantumDescriptorSchema: z.ZodDiscriminatedUnion&lt;"trigger", [z.ZodObject&lt;{ trigger: z.ZodLiteral&lt;"initial"&gt;; version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; sessionId: z.ZodString; userId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string...</code> | re Act Quantum Descriptor 的运行时 Schema。 |
| `validateContinueReActCommandPayload` | 函数 | <code>validateContinueReActCommandPayload(input: unknown): ContinueReActCommandPayloadV1</code> | 校验 Continue Re Act Command Payload。 |
| `validateReActQuantumDescriptor` | 函数 | <code>validateReActQuantumDescriptor(input: unknown): ReActQuantumDescriptor</code> | 校验 Re Act Quantum Descriptor。 |
