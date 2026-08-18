# `@codesoul-co/hypha-inference` / `reasoning`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/reasoning.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)
- Exports: **13**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ReasoningOrchestrator` | class | <code>new ReasoningOrchestrator(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | Runtime implementation for Reasoning Orchestrator; see its public constructor and members below. |
| `ReasoningBudget` | interface | <code>interface ReasoningBudget</code> | Field contract for Reasoning Budget; see all contract members below. |
| `ReasoningOptions` | interface | <code>interface ReasoningOptions</code> | Field contract for Reasoning Options; see all contract members below. |
| `ReasoningRequest` | interface | <code>interface ReasoningRequest extends InferenceRequest&lt;TInput&gt;</code> | Field contract for Reasoning Request; see all contract members below. |
| `ThoughtEdge` | interface | <code>interface ThoughtEdge</code> | Field contract for Thought Edge; see all contract members below. |
| `ThoughtGraph` | interface | <code>interface ThoughtGraph</code> | Field contract for Thought Graph; see all contract members below. |
| `ThoughtNode` | interface | <code>interface ThoughtNode</code> | Field contract for Thought Node; see all contract members below. |
| `ReasoningAggregation` | type | <code>type ReasoningAggregation = 'first' &#124; 'majority_vote' &#124; 'score' &#124; 'llm_judge'</code> | Public type alias for Reasoning Aggregation. |
| `ReasoningMethod` | type | <code>type ReasoningMethod = 'direct' &#124; 'cot' &#124; 'tot' &#124; 'got' &#124; 'self_consistency'</code> | Public type alias for Reasoning Method. |
| `ReasoningTraceEvent` | type | <code>type ReasoningTraceEvent = { type: 'reasoning.strategy.started'; method: ReasoningMethod; strategyId?: string; requestId: string; } &#124; { type: 'reasoning.node.generated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.evaluated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.selected'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.strategy.comp...</code> | Public type alias for Reasoning Trace Event. |
| `ReasoningTraceSink` | type | <code>type ReasoningTraceSink = (event: ReasoningTraceEvent) =&gt; Promise&lt;void&gt; &#124; void</code> | Public type alias for Reasoning Trace Sink. |
| `ThoughtEdgeType` | type | <code>type ThoughtEdgeType = 'expand' &#124; 'merge' &#124; 'refine' &#124; 'criticize' &#124; 'validate'</code> | Public type alias for Thought Edge Type. |
| `ThoughtNodeStatus` | type | <code>type ThoughtNodeStatus = 'candidate' &#124; 'evaluated' &#124; 'selected' &#124; 'rejected'</code> | Public type alias for Thought Node Status. |

## `ReasoningOrchestrator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: ReasoningRequest): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for infer. |
| `registry` | property | <code>registry: ReasoningStrategyRegistry</code> | Public registry property. |
| `stream` | method | <code>stream(request: ReasoningRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public runtime operation for stream. |

## `ReasoningBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxModelCalls` | property | <code>maxModelCalls: number</code> | Public max Model Calls property. |
| `maxNodes` | property | <code>maxNodes: number</code> | Public max Nodes property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `ReasoningOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aggregation` | property | <code>aggregation: ReasoningAggregation</code> | Public aggregation property. |
| `beamWidth` | property | <code>beamWidth: number</code> | Public beam Width property. |
| `branches` | property | <code>branches: number</code> | Public branches property. |
| `budget` | property | <code>budget: ReasoningBudget</code> | Public budget property. |
| `evaluator` | method | <code>evaluator(responses: InferenceResponse[]): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for evaluator. |
| `evaluatorRef` | property | <code>evaluatorRef: string</code> | Public evaluator Ref property. |
| `maxDepth` | property | <code>maxDepth: number</code> | Public max Depth property. |
| `maxNodes` | property | <code>maxNodes: number</code> | Public max Nodes property. |
| `method` | property | <code>method: ReasoningMethod</code> | Public method property. |
| `revealReasoning` | property | <code>revealReasoning: boolean</code> | Public reveal Reasoning property. |
| `scorer` | method | <code>scorer(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt; &#124; number</code> | Public runtime operation for scorer. |
| `strategyRef` | property | <code>strategyRef: string</code> | Public strategy Ref property. |
| `strategyVersion` | property | <code>strategyVersion: string</code> | Public strategy Version property. |
| `trace` | method | <code>trace(event: ReasoningTraceEvent): Promise&lt;void&gt; &#124; void</code> | Public runtime operation for trace. |

## `ReasoningRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `backendId` | property | <code>backendId: string</code> | Public backend Id property. |
| `cachePolicy` | property | <code>cachePolicy: InferenceCachePolicy</code> | Public cache Policy property. |
| `cacheScope` | property | <code>cacheScope: InferenceCacheScope</code> | Public cache Scope property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `kvCache` | property | <code>kvCache: KvCacheRef</code> | Public kv Cache property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `options` | property | <code>options: InferenceGenerationOptions</code> | Public options property. |
| `prefix` | property | <code>prefix: PrefixCacheRef</code> | Public prefix property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `reasoning` | property | <code>reasoning: ReasoningOptions</code> | Public reasoning property. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue: unknown</code> | Public resolved Kv Cache Value property. |
| `resolvedPrefixContent` | property | <code>resolvedPrefixContent: string</code> | Public resolved Prefix Content property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tools` | property | <code>tools: InferenceToolDescriptor[]</code> | Public tools property. |
| `trace` | property | <code>trace: boolean</code> | Public trace property. |

## `ThoughtEdge` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `from` | property | <code>from: string</code> | Public from property. |
| `to` | property | <code>to: string</code> | Public to property. |
| `type` | property | <code>type: ThoughtEdgeType</code> | Public type property. |

## `ThoughtGraph` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `edges` | property | <code>edges: ThoughtEdge[]</code> | Public edges property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `method` | property | <code>method: "tot" &#124; "got"</code> | Public method property. |
| `nodes` | property | <code>nodes: ThoughtNode[]</code> | Public nodes property. |
| `selectedNodeId` | property | <code>selectedNodeId: string</code> | Public selected Node Id property. |

## `ThoughtNode` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `branchIndex` | property | <code>branchIndex: number</code> | Public branch Index property. |
| `depth` | property | <code>depth: number</code> | Public depth property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `outputHash` | property | <code>outputHash: string</code> | Public output Hash property. |
| `parentIds` | property | <code>parentIds: string[]</code> | Public parent Ids property. |
| `responseId` | property | <code>responseId: string</code> | Public response Id property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `status` | property | <code>status: ThoughtNodeStatus</code> | Public status property. |
