# `@codesoul-co/hypha-inference` / `reasoning`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/reasoning.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)
- 导出数: **13**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ReasoningOrchestrator` | 类 | <code>new ReasoningOrchestrator(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | Reasoning Orchestrator 的运行时实现；公开构造函数与成员见下表。 |
| `ReasoningBudget` | 接口 | <code>interface ReasoningBudget</code> | Reasoning Budget 的字段契约；完整字段见下表。 |
| `ReasoningOptions` | 接口 | <code>interface ReasoningOptions</code> | Reasoning Options 的字段契约；完整字段见下表。 |
| `ReasoningRequest` | 接口 | <code>interface ReasoningRequest extends InferenceRequest&lt;TInput&gt;</code> | Reasoning Request 的字段契约；完整字段见下表。 |
| `ThoughtEdge` | 接口 | <code>interface ThoughtEdge</code> | Thought Edge 的字段契约；完整字段见下表。 |
| `ThoughtGraph` | 接口 | <code>interface ThoughtGraph</code> | Thought Graph 的字段契约；完整字段见下表。 |
| `ThoughtNode` | 接口 | <code>interface ThoughtNode</code> | Thought Node 的字段契约；完整字段见下表。 |
| `ReasoningAggregation` | 类型 | <code>type ReasoningAggregation = 'first' &#124; 'majority_vote' &#124; 'score' &#124; 'llm_judge'</code> | Reasoning Aggregation 的公共类型别名。 |
| `ReasoningMethod` | 类型 | <code>type ReasoningMethod = 'direct' &#124; 'cot' &#124; 'tot' &#124; 'got' &#124; 'self_consistency'</code> | Reasoning Method 的公共类型别名。 |
| `ReasoningTraceEvent` | 类型 | <code>type ReasoningTraceEvent = { type: 'reasoning.strategy.started'; method: ReasoningMethod; strategyId?: string; requestId: string; } &#124; { type: 'reasoning.node.generated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.evaluated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.selected'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.strategy.comp...</code> | Reasoning Trace Event 的公共类型别名。 |
| `ReasoningTraceSink` | 类型 | <code>type ReasoningTraceSink = (event: ReasoningTraceEvent) =&gt; Promise&lt;void&gt; &#124; void</code> | Reasoning Trace Sink 的公共类型别名。 |
| `ThoughtEdgeType` | 类型 | <code>type ThoughtEdgeType = 'expand' &#124; 'merge' &#124; 'refine' &#124; 'criticize' &#124; 'validate'</code> | Thought Edge Type 的公共类型别名。 |
| `ThoughtNodeStatus` | 类型 | <code>type ThoughtNodeStatus = 'candidate' &#124; 'evaluated' &#124; 'selected' &#124; 'rejected'</code> | Thought Node Status 的公共类型别名。 |

## `ReasoningOrchestrator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: ReasoningRequest): Promise&lt;InferenceResponse&gt;</code> | infer 的公开运行时操作。 |
| `registry` | 属性 | <code>registry: ReasoningStrategyRegistry</code> | registry 字段。 |
| `stream` | 方法 | <code>stream(request: ReasoningRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | stream 的公开运行时操作。 |

## `ReasoningBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxModelCalls` | 属性 | <code>maxModelCalls: number</code> | max Model Calls 字段。 |
| `maxNodes` | 属性 | <code>maxNodes: number</code> | max Nodes 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `ReasoningOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aggregation` | 属性 | <code>aggregation: ReasoningAggregation</code> | aggregation 字段。 |
| `beamWidth` | 属性 | <code>beamWidth: number</code> | beam Width 字段。 |
| `branches` | 属性 | <code>branches: number</code> | branches 字段。 |
| `budget` | 属性 | <code>budget: ReasoningBudget</code> | budget 字段。 |
| `evaluator` | 方法 | <code>evaluator(responses: InferenceResponse[]): Promise&lt;InferenceResponse&gt;</code> | evaluator 的公开运行时操作。 |
| `evaluatorRef` | 属性 | <code>evaluatorRef: string</code> | evaluator Ref 字段。 |
| `maxDepth` | 属性 | <code>maxDepth: number</code> | max Depth 字段。 |
| `maxNodes` | 属性 | <code>maxNodes: number</code> | max Nodes 字段。 |
| `method` | 属性 | <code>method: ReasoningMethod</code> | method 字段。 |
| `revealReasoning` | 属性 | <code>revealReasoning: boolean</code> | reveal Reasoning 字段。 |
| `scorer` | 方法 | <code>scorer(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt; &#124; number</code> | scorer 的公开运行时操作。 |
| `strategyRef` | 属性 | <code>strategyRef: string</code> | strategy Ref 字段。 |
| `strategyVersion` | 属性 | <code>strategyVersion: string</code> | strategy Version 字段。 |
| `trace` | 方法 | <code>trace(event: ReasoningTraceEvent): Promise&lt;void&gt; &#124; void</code> | trace 的公开运行时操作。 |

## `ReasoningRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `backendId` | 属性 | <code>backendId: string</code> | backend Id 字段。 |
| `cachePolicy` | 属性 | <code>cachePolicy: InferenceCachePolicy</code> | cache Policy 字段。 |
| `cacheScope` | 属性 | <code>cacheScope: InferenceCacheScope</code> | cache Scope 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `kvCache` | 属性 | <code>kvCache: KvCacheRef</code> | kv Cache 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `options` | 属性 | <code>options: InferenceGenerationOptions</code> | options 字段。 |
| `prefix` | 属性 | <code>prefix: PrefixCacheRef</code> | prefix 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `reasoning` | 属性 | <code>reasoning: ReasoningOptions</code> | reasoning 字段。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue: unknown</code> | resolved Kv Cache Value 字段。 |
| `resolvedPrefixContent` | 属性 | <code>resolvedPrefixContent: string</code> | resolved Prefix Content 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tools` | 属性 | <code>tools: InferenceToolDescriptor[]</code> | tools 字段。 |
| `trace` | 属性 | <code>trace: boolean</code> | trace 字段。 |

## `ThoughtEdge` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `from` | 属性 | <code>from: string</code> | from 字段。 |
| `to` | 属性 | <code>to: string</code> | to 字段。 |
| `type` | 属性 | <code>type: ThoughtEdgeType</code> | type 字段。 |

## `ThoughtGraph` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `edges` | 属性 | <code>edges: ThoughtEdge[]</code> | edges 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `method` | 属性 | <code>method: "tot" &#124; "got"</code> | method 字段。 |
| `nodes` | 属性 | <code>nodes: ThoughtNode[]</code> | nodes 字段。 |
| `selectedNodeId` | 属性 | <code>selectedNodeId: string</code> | selected Node Id 字段。 |

## `ThoughtNode` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `branchIndex` | 属性 | <code>branchIndex: number</code> | branch Index 字段。 |
| `depth` | 属性 | <code>depth: number</code> | depth 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `outputHash` | 属性 | <code>outputHash: string</code> | output Hash 字段。 |
| `parentIds` | 属性 | <code>parentIds: string[]</code> | parent Ids 字段。 |
| `responseId` | 属性 | <code>responseId: string</code> | response Id 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `status` | 属性 | <code>status: ThoughtNodeStatus</code> | status 字段。 |
