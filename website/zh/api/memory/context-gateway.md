# `@codesoul-co/hypha-memory` / `context-gateway`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-gateway.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)
- 导出数: **6**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultMemoryContextGateway` | 类 | <code>new DefaultMemoryContextGateway(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | Canonical Context entry point shared by Chat, Workflow, and Harness consumers. |
| `ContextGatewayRequest` | 接口 | <code>interface ContextGatewayRequest extends ResolvedContextBuildInput</code> | Context Gateway Request 的字段契约；完整字段见下表。 |
| `ContextGatewayResult` | 接口 | <code>interface ContextGatewayResult</code> | Context Gateway Result 的字段契约；完整字段见下表。 |
| `DefaultMemoryContextGatewayOptions` | 接口 | <code>interface DefaultMemoryContextGatewayOptions</code> | Default Memory Context Gateway Options 的字段契约；完整字段见下表。 |
| `MemoryContextGateway` | 接口 | <code>interface MemoryContextGateway</code> | Memory Context Gateway 的字段契约；完整字段见下表。 |
| `ContextGatewayConsumer` | 类型 | <code>type ContextGatewayConsumer = 'chat' &#124; 'workflow' &#124; 'harness'</code> | Context Gateway Consumer 的公共类型别名。 |

## `DefaultMemoryContextGateway` 公开成员

Canonical Context entry point shared by Chat, Workflow, and Harness consumers.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | 创建该类的实例。 |

## `ContextGatewayRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumer` | 属性 | <code>consumer: ContextGatewayConsumer</code> | consumer 字段。 |
| `explicitSourceRefs` | 属性 | <code>explicitSourceRefs: string[]</code> | explicit Source Refs 字段。 |
| `messageCursor` | 属性 | <code>messageCursor: string</code> | message Cursor 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelContextWindowTokens` | 属性 | <code>modelContextWindowTokens: number</code> | model Context Window Tokens 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `previousContextHash` | 属性 | <code>previousContextHash: string</code> | previous Context Hash 字段。 |
| `principal` | 属性 | <code>principal: MemoryPrincipal</code> | principal 字段。 |
| `profile` | 属性 | <code>profile: ContextProfileSpec</code> | profile 字段。 |
| `profileRef` | 属性 | <code>profileRef: MemoryContractSpecRef</code> | profile Ref 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `reservedInstructionTokens` | 属性 | <code>reservedInstructionTokens: number</code> | reserved Instruction Tokens 字段。 |
| `reservedOutputTokens` | 属性 | <code>reservedOutputTokens: number</code> | reserved Output Tokens 字段。 |
| `reservedSystemTokens` | 属性 | <code>reservedSystemTokens: number</code> | reserved System Tokens 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `runtimeStateRef` | 属性 | <code>runtimeStateRef: string</code> | runtime State Ref 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tokenizerRef` | 属性 | <code>tokenizerRef: MemoryContractSpecRef</code> | tokenizer Ref 字段。 |

## `ContextGatewayResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `consumer` | 属性 | <code>consumer: ContextGatewayConsumer</code> | consumer 字段。 |
| `envelope` | 属性 | <code>envelope: ContextEnvelope</code> | envelope 字段。 |
| `explanation` | 属性 | <code>explanation: ContextBuildExplanation</code> | explanation 字段。 |
| `sourceItemCount` | 属性 | <code>sourceItemCount: number</code> | source Item Count 字段。 |

## `DefaultMemoryContextGatewayOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activityHook` | 属性 | <code>activityHook: MemoryActivityHarnessHook</code> | activity Hook 字段。 |
| `builder` | 属性 | <code>builder: MemoryContextBuilder</code> | builder 字段。 |
| `eventContext` | 方法 | <code>eventContext(request: ContextGatewayRequest): MemoryActivityRequest["eventContext"]</code> | event Context 的公开运行时操作。 |
| `injection` | 属性 | <code>injection: ContextInjectionGateway</code> | injection 字段。 |
| `resolver` | 属性 | <code>resolver: ContextSourceResolverRegistry</code> | resolver 字段。 |

## `MemoryContextGateway` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | 构建 build。 |
