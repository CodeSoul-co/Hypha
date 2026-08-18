# `@codesoul-co/hypha-inference` / `reasoning`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/reasoning.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)
- Exports: **13**

## Using this module

Use the Reasoning module for using the public contracts and operations for this capability boundary. It exports 1 class, 6 interfaces, 6 types.

### Import from the package entrypoint

```ts
import {
  ReasoningOrchestrator,
} from '@codesoul-co/hypha-inference';

import type {
  ReasoningBudget,
  ReasoningOptions,
  ReasoningRequest,
  ThoughtEdge,
  ThoughtGraph,
  ThoughtNode,
  ReasoningAggregation,
  ReasoningMethod,
} from '@codesoul-co/hypha-inference';

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ReasoningOrchestrator` | class | <code>new ReasoningOrchestrator(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | Reasoning Orchestrator class with 5 public constructor or member entries; its exact declarations are listed below. |
| `ReasoningBudget` | interface | <code>interface ReasoningBudget</code> | Reasoning Budget interface with 3 public fields or methods. |
| `ReasoningOptions` | interface | <code>interface ReasoningOptions</code> | Reasoning Options interface with 14 public fields or methods. |
| `ReasoningRequest` | interface | <code>interface ReasoningRequest extends InferenceRequest&lt;TInput&gt;</code> | Reasoning Request interface with 19 public fields or methods. |
| `ThoughtEdge` | interface | <code>interface ThoughtEdge</code> | Thought Edge interface with 3 public fields or methods. |
| `ThoughtGraph` | interface | <code>interface ThoughtGraph</code> | Thought Graph interface with 5 public fields or methods. |
| `ThoughtNode` | interface | <code>interface ThoughtNode</code> | Thought Node interface with 9 public fields or methods. |
| `ReasoningAggregation` | type | <code>type ReasoningAggregation = 'first' &#124; 'majority_vote' &#124; 'score' &#124; 'llm_judge'</code> | Public type alias for Reasoning Aggregation; the declaration contains its complete type expression. |
| `ReasoningMethod` | type | <code>type ReasoningMethod = 'direct' &#124; 'cot' &#124; 'tot' &#124; 'got' &#124; 'self_consistency'</code> | Public type alias for Reasoning Method; the declaration contains its complete type expression. |
| `ReasoningTraceEvent` | type | <code>type ReasoningTraceEvent = { type: 'reasoning.strategy.started'; method: ReasoningMethod; strategyId?: string; requestId: string; } &#124; { type: 'reasoning.node.generated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.evaluated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.selected'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.strategy.comp...</code> | Public type alias for Reasoning Trace Event; the declaration contains its complete type expression. |
| `ReasoningTraceSink` | type | <code>type ReasoningTraceSink = (event: ReasoningTraceEvent) =&gt; Promise&lt;void&gt; &#124; void</code> | Public type alias for Reasoning Trace Sink; the declaration contains its complete type expression. |
| `ThoughtEdgeType` | type | <code>type ThoughtEdgeType = 'expand' &#124; 'merge' &#124; 'refine' &#124; 'criticize' &#124; 'validate'</code> | Public type alias for Thought Edge Type; the declaration contains its complete type expression. |
| `ThoughtNodeStatus` | type | <code>type ThoughtNodeStatus = 'candidate' &#124; 'evaluated' &#124; 'selected' &#124; 'rejected'</code> | Public type alias for Thought Node Status; the declaration contains its complete type expression. |

## `ReasoningOrchestrator`

Reasoning Orchestrator class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ReasoningOrchestrator } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export declare class ReasoningOrchestrator implements InferenceProvider {
    readonly id: string;
    readonly registry: ReasoningStrategyRegistry;
    constructor(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry);
    infer(request: ReasoningRequest): Promise<InferenceResponse>;
    stream(request: ReasoningRequest): AsyncIterable<InferenceResponse>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: ReasoningRequest): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `registry` | property | <code>readonly registry: ReasoningStrategyRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: ReasoningRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReasoningBudget`

Reasoning Budget interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningBudget } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export interface ReasoningBudget {
    maxModelCalls?: number;
    maxNodes?: number;
    timeoutMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxModelCalls` | property | <code>maxModelCalls?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxNodes` | property | <code>maxNodes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningOptions`

Reasoning Options interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export interface ReasoningOptions {
    method: ReasoningMethod;
    strategyRef?: string;
    branches?: number;
    maxDepth?: number;
    beamWidth?: number;
    maxNodes?: number;
    revealReasoning?: boolean;
    aggregation?: ReasoningAggregation;
    evaluatorRef?: string;
    strategyVersion?: string;
    budget?: ReasoningBudget;
    evaluator?: (responses: InferenceResponse[]) => Promise<InferenceResponse>;
    scorer?: (response: InferenceResponse, node: ThoughtNode) => Promise<number> | number;
    trace?: ReasoningTraceSink;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aggregation` | property | <code>aggregation?: ReasoningAggregation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `beamWidth` | property | <code>beamWidth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `branches` | property | <code>branches?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `budget` | property | <code>budget?: ReasoningBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluator` | method | <code>evaluator?(responses: InferenceResponse[]): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `evaluatorRef` | property | <code>evaluatorRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDepth` | property | <code>maxDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxNodes` | property | <code>maxNodes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `method` | property | <code>method: ReasoningMethod</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revealReasoning` | property | <code>revealReasoning?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scorer` | method | <code>scorer?(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt; &#124; number</code> | Public method; parameters and return type are shown in the signature. |
| `strategyRef` | property | <code>strategyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `strategyVersion` | property | <code>strategyVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | method | <code>trace?(event: ReasoningTraceEvent): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |

## `ReasoningRequest`

Reasoning Request interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningRequest } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export interface ReasoningRequest<TInput = unknown> extends InferenceRequest<TInput> {
    reasoning?: ReasoningOptions;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `backendId` | property | <code>backendId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cachePolicy` | property | <code>cachePolicy?: InferenceCachePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheScope` | property | <code>cacheScope?: InferenceCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCache` | property | <code>kvCache?: KvCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `options` | property | <code>options?: InferenceGenerationOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefix` | property | <code>prefix?: PrefixCacheRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoning` | property | <code>reasoning?: ReasoningOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedKvCacheValue` | property | <code>resolvedKvCacheValue?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedPrefixContent` | property | <code>resolvedPrefixContent?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: InferenceToolDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ThoughtEdge`

Thought Edge interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ThoughtEdge } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export interface ThoughtEdge {
    from: string;
    to: string;
    type: ThoughtEdgeType;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `from` | property | <code>from: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: ThoughtEdgeType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ThoughtGraph`

Thought Graph interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ThoughtGraph } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export interface ThoughtGraph {
    id: string;
    method: Extract<ReasoningMethod, 'tot' | 'got'>;
    nodes: ThoughtNode[];
    edges: ThoughtEdge[];
    selectedNodeId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `edges` | property | <code>edges: ThoughtEdge[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `method` | property | <code>method: "tot" &#124; "got"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nodes` | property | <code>nodes: ThoughtNode[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selectedNodeId` | property | <code>selectedNodeId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ThoughtNode`

Thought Node interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ThoughtNode } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export interface ThoughtNode {
    id: string;
    parentIds: string[];
    depth: number;
    branchIndex: number;
    status: ThoughtNodeStatus;
    score?: number;
    outputHash?: string;
    responseId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `branchIndex` | property | <code>branchIndex: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `depth` | property | <code>depth: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputHash` | property | <code>outputHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parentIds` | property | <code>parentIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseId` | property | <code>responseId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: ThoughtNodeStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningAggregation`

Public type alias for Reasoning Aggregation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReasoningAggregation } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export type ReasoningAggregation = 'first' | 'majority_vote' | 'score' | 'llm_judge';
```

## `ReasoningMethod`

Public type alias for Reasoning Method; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReasoningMethod } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export type ReasoningMethod = 'direct' | 'cot' | 'tot' | 'got' | 'self_consistency';
```

## `ReasoningTraceEvent`

Public type alias for Reasoning Trace Event; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReasoningTraceEvent } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export type ReasoningTraceEvent = {
    type: 'reasoning.strategy.started';
    method: ReasoningMethod;
    strategyId?: string;
    requestId: string;
} | {
    type: 'reasoning.node.generated';
    method: ReasoningMethod;
    node: ThoughtNode;
} | {
    type: 'reasoning.node.evaluated';
    method: ReasoningMethod;
    node: ThoughtNode;
} | {
    type: 'reasoning.node.selected';
    method: ReasoningMethod;
    node: ThoughtNode;
} | {
    type: 'reasoning.strategy.completed';
    method: ReasoningMethod;
    strategyId?: string;
    requestId: string;
    modelCalls: number;
    nodeCount: number;
};
```

## `ReasoningTraceSink`

Public type alias for Reasoning Trace Sink; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReasoningTraceSink } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export type ReasoningTraceSink = (event: ReasoningTraceEvent) => Promise<void> | void;
```

## `ThoughtEdgeType`

Public type alias for Thought Edge Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ThoughtEdgeType } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export type ThoughtEdgeType = 'expand' | 'merge' | 'refine' | 'criticize' | 'validate';
```

## `ThoughtNodeStatus`

Public type alias for Thought Node Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ThoughtNodeStatus } from '@codesoul-co/hypha-inference';`
- Source module: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### Declaration

```text
export type ThoughtNodeStatus = 'candidate' | 'evaluated' | 'selected' | 'rejected';
```
