# `@codesoul-co/hypha-inference` / `reasoning-registry`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/reasoning-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ReasoningStrategyRegistry` | class | <code>new ReasoningStrategyRegistry(): ReasoningStrategyRegistry</code> | Runtime implementation for Reasoning Strategy Registry; see its public constructor and members below. |
| `ReasoningStrategy` | interface | <code>interface ReasoningStrategy</code> | Field contract for Reasoning Strategy; see all contract members below. |
| `ReasoningStrategyContext` | interface | <code>interface ReasoningStrategyContext</code> | Field contract for Reasoning Strategy Context; see all contract members below. |
| `ReasoningStrategyDescriptor` | interface | <code>interface ReasoningStrategyDescriptor</code> | Field contract for Reasoning Strategy Descriptor; see all contract members below. |
| `ReasoningStrategyReference` | interface | <code>interface ReasoningStrategyReference</code> | Field contract for Reasoning Strategy Reference; see all contract members below. |
| `ReasoningStrategyRuntime` | interface | <code>interface ReasoningStrategyRuntime</code> | Field contract for Reasoning Strategy Runtime; see all contract members below. |

## `ReasoningStrategyRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ReasoningStrategyRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(idOrAlias: string): ReasoningStrategy &#124; null</code> | Gets get at this module boundary. |
| `has` | method | <code>has(idOrAlias: string): boolean</code> | Checks whether has at this module boundary. |
| `list` | method | <code>list(): ReasoningStrategyDescriptor[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(strategy: ReasoningStrategy, options?: { replace?: boolean; }): void</code> | Registers register at this module boundary. |
| `require` | method | <code>require(idOrAlias: string): ReasoningStrategy</code> | Public runtime operation for require. |
| `unregister` | method | <code>unregister(id: string): boolean</code> | Public runtime operation for unregister. |

## `ReasoningStrategy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `descriptor` | property | <code>descriptor: ReasoningStrategyDescriptor</code> | Public descriptor property. |
| `execute` | method | <code>execute(context: ReasoningStrategyContext): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for execute. |
| `stream` | method | <code>stream(context: ReasoningStrategyContext): AsyncIterable&lt;InferenceResponse&gt;</code> | Public runtime operation for stream. |

## `ReasoningStrategyContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `options` | property | <code>options: ReasoningOptions</code> | Public options property. |
| `request` | property | <code>request: ReasoningRequest&lt;unknown&gt;</code> | Public request property. |
| `runtime` | property | <code>runtime: ReasoningStrategyRuntime</code> | Public runtime property. |

## `ReasoningStrategyDescriptor` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aliases` | property | <code>aliases: string[]</code> | Public aliases property. |
| `capabilities` | property | <code>capabilities: { branching: boolean; graph: boolean; aggregation: boolean; streaming: boolean; toolLoop: boolean; }</code> | Public capabilities property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `method` | property | <code>method: ReasoningMethod</code> | Public method property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `references` | property | <code>references: ReasoningStrategyReference[]</code> | Public references property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ReasoningStrategyReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kind` | property | <code>kind: "repository" &#124; "paper" &#124; "documentation"</code> | Public kind property. |
| `license` | property | <code>license: string</code> | Public license property. |
| `notes` | property | <code>notes: string</code> | Public notes property. |
| `official` | property | <code>official: boolean</code> | Public official property. |
| `repository` | property | <code>repository: string</code> | Public repository property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `title` | property | <code>title: string</code> | Public title property. |
| `url` | property | <code>url: string</code> | Public url property. |
| `usage` | property | <code>usage: "referenced" &#124; "adapted"</code> | Public usage property. |

## `ReasoningStrategyRuntime` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aggregate` | method | <code>aggregate(responses: InferenceResponse[], defaultAggregation?: ReasoningOptions["aggregation"]): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for aggregate. |
| `assertBudget` | method | <code>assertBudget(nodeCount?: number): void</code> | Asserts Budget at this module boundary. |
| `callProvider` | method | <code>callProvider(metadata: Record&lt;string, unknown&gt;): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for call Provider. |
| `maxNodes` | property | <code>maxNodes: number</code> | Public max Nodes property. |
| `modelCalls` | property | <code>modelCalls: number</code> | Public model Calls property. |
| `score` | method | <code>score(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt;</code> | Public runtime operation for score. |
| `trace` | method | <code>trace(event: ReasoningTraceEvent): Promise&lt;void&gt;</code> | Public runtime operation for trace. |
| `withReasoningMetadata` | method | <code>withReasoningMetadata(response: InferenceResponse, reasoning: Record&lt;string, unknown&gt;): InferenceResponse</code> | Public runtime operation for with Reasoning Metadata. |
