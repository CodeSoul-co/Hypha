# `@codesoul-co/hypha-memory` / `context-gateway`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/context-gateway.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryContextGateway` | class | <code>new DefaultMemoryContextGateway(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | Canonical Context entry point shared by Chat, Workflow, and Harness consumers. |
| `ContextGatewayRequest` | interface | <code>interface ContextGatewayRequest extends ResolvedContextBuildInput</code> | Field contract for Context Gateway Request; see all contract members below. |
| `ContextGatewayResult` | interface | <code>interface ContextGatewayResult</code> | Field contract for Context Gateway Result; see all contract members below. |
| `DefaultMemoryContextGatewayOptions` | interface | <code>interface DefaultMemoryContextGatewayOptions</code> | Field contract for Default Memory Context Gateway Options; see all contract members below. |
| `MemoryContextGateway` | interface | <code>interface MemoryContextGateway</code> | Field contract for Memory Context Gateway; see all contract members below. |
| `ContextGatewayConsumer` | type | <code>type ContextGatewayConsumer = 'chat' &#124; 'workflow' &#124; 'harness'</code> | Public type alias for Context Gateway Consumer. |

## `DefaultMemoryContextGateway` public members

Canonical Context entry point shared by Chat, Workflow, and Harness consumers.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | Creates an instance of this class. |

## `ContextGatewayRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumer` | property | <code>consumer: ContextGatewayConsumer</code> | Public consumer property. |
| `explicitSourceRefs` | property | <code>explicitSourceRefs: string[]</code> | Public explicit Source Refs property. |
| `messageCursor` | property | <code>messageCursor: string</code> | Public message Cursor property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public model Context Window Tokens property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `previousContextHash` | property | <code>previousContextHash: string</code> | Public previous Context Hash property. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public principal property. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public profile property. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public profile Ref property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public reserved Instruction Tokens property. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public reserved Output Tokens property. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public reserved System Tokens property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `runtimeStateRef` | property | <code>runtimeStateRef: string</code> | Public runtime State Ref property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tokenizerRef` | property | <code>tokenizerRef: MemoryContractSpecRef</code> | Public tokenizer Ref property. |

## `ContextGatewayResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumer` | property | <code>consumer: ContextGatewayConsumer</code> | Public consumer property. |
| `envelope` | property | <code>envelope: ContextEnvelope</code> | Public envelope property. |
| `explanation` | property | <code>explanation: ContextBuildExplanation</code> | Public explanation property. |
| `sourceItemCount` | property | <code>sourceItemCount: number</code> | Public source Item Count property. |

## `DefaultMemoryContextGatewayOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityHook` | property | <code>activityHook: MemoryActivityHarnessHook</code> | Public activity Hook property. |
| `builder` | property | <code>builder: MemoryContextBuilder</code> | Public builder property. |
| `eventContext` | method | <code>eventContext(request: ContextGatewayRequest): MemoryActivityRequest["eventContext"]</code> | Public runtime operation for event Context. |
| `injection` | property | <code>injection: ContextInjectionGateway</code> | Public injection property. |
| `resolver` | property | <code>resolver: ContextSourceResolverRegistry</code> | Public resolver property. |

## `MemoryContextGateway` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | Builds build at this module boundary. |
