# `@codesoul-co/hypha-inference` / `reasoning`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/reasoning.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)
- 导出数: **13**

## 模块用法

用于使用该功能边界的公共契约与操作。Reasoning 模块公开 1 类、6 接口、6 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ReasoningOrchestrator` | 类 | <code>new ReasoningOrchestrator(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | Reasoning Orchestrator 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReasoningBudget` | 接口 | <code>interface ReasoningBudget</code> | Reasoning Budget 接口，共包含 3 个公开字段或方法。 |
| `ReasoningOptions` | 接口 | <code>interface ReasoningOptions</code> | Reasoning Options 接口，共包含 14 个公开字段或方法。 |
| `ReasoningRequest` | 接口 | <code>interface ReasoningRequest extends InferenceRequest&lt;TInput&gt;</code> | Reasoning Request 接口，共包含 19 个公开字段或方法。 |
| `ThoughtEdge` | 接口 | <code>interface ThoughtEdge</code> | Thought Edge 接口，共包含 3 个公开字段或方法。 |
| `ThoughtGraph` | 接口 | <code>interface ThoughtGraph</code> | Thought Graph 接口，共包含 5 个公开字段或方法。 |
| `ThoughtNode` | 接口 | <code>interface ThoughtNode</code> | Thought Node 接口，共包含 9 个公开字段或方法。 |
| `ReasoningAggregation` | 类型 | <code>type ReasoningAggregation = 'first' &#124; 'majority_vote' &#124; 'score' &#124; 'llm_judge'</code> | Reasoning Aggregation 公共类型别名；完整类型表达式见声明。 |
| `ReasoningMethod` | 类型 | <code>type ReasoningMethod = 'direct' &#124; 'cot' &#124; 'tot' &#124; 'got' &#124; 'self_consistency'</code> | Reasoning Method 公共类型别名；完整类型表达式见声明。 |
| `ReasoningTraceEvent` | 类型 | <code>type ReasoningTraceEvent = { type: 'reasoning.strategy.started'; method: ReasoningMethod; strategyId?: string; requestId: string; } &#124; { type: 'reasoning.node.generated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.evaluated'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.node.selected'; method: ReasoningMethod; node: ThoughtNode; } &#124; { type: 'reasoning.strategy.comp...</code> | Reasoning Trace Event 公共类型别名；完整类型表达式见声明。 |
| `ReasoningTraceSink` | 类型 | <code>type ReasoningTraceSink = (event: ReasoningTraceEvent) =&gt; Promise&lt;void&gt; &#124; void</code> | Reasoning Trace Sink 公共类型别名；完整类型表达式见声明。 |
| `ThoughtEdgeType` | 类型 | <code>type ThoughtEdgeType = 'expand' &#124; 'merge' &#124; 'refine' &#124; 'criticize' &#124; 'validate'</code> | Thought Edge Type 公共类型别名；完整类型表达式见声明。 |
| `ThoughtNodeStatus` | 类型 | <code>type ThoughtNodeStatus = 'candidate' &#124; 'evaluated' &#124; 'selected' &#124; 'rejected'</code> | Thought Node Status 公共类型别名；完整类型表达式见声明。 |

## `ReasoningOrchestrator`

Reasoning Orchestrator 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ReasoningOrchestrator } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export declare class ReasoningOrchestrator implements InferenceProvider {
    readonly id: string;
    readonly registry: ReasoningStrategyRegistry;
    constructor(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry);
    infer(request: ReasoningRequest): Promise<InferenceResponse>;
    stream(request: ReasoningRequest): AsyncIterable<InferenceResponse>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(provider: InferenceProvider, id?: string, registry?: ReasoningStrategyRegistry): ReasoningOrchestrator</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: ReasoningRequest): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registry` | 属性 | <code>readonly registry: ReasoningStrategyRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stream` | 方法 | <code>stream(request: ReasoningRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReasoningBudget`

Reasoning Budget 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningBudget } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export interface ReasoningBudget {
    maxModelCalls?: number;
    maxNodes?: number;
    timeoutMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxModelCalls` | 属性 | <code>maxModelCalls?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxNodes` | 属性 | <code>maxNodes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningOptions`

Reasoning Options 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `aggregation` | 属性 | <code>aggregation?: ReasoningAggregation</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `beamWidth` | 属性 | <code>beamWidth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `branches` | 属性 | <code>branches?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `budget` | 属性 | <code>budget?: ReasoningBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluator` | 方法 | <code>evaluator?(responses: InferenceResponse[]): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `evaluatorRef` | 属性 | <code>evaluatorRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxDepth` | 属性 | <code>maxDepth?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxNodes` | 属性 | <code>maxNodes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `method` | 属性 | <code>method: ReasoningMethod</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revealReasoning` | 属性 | <code>revealReasoning?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scorer` | 方法 | <code>scorer?(response: InferenceResponse, node: ThoughtNode): Promise&lt;number&gt; &#124; number</code> | 公开方法；参数与返回类型以签名列为准。 |
| `strategyRef` | 属性 | <code>strategyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategyVersion` | 属性 | <code>strategyVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 方法 | <code>trace?(event: ReasoningTraceEvent): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReasoningRequest`

Reasoning Request 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningRequest } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export interface ReasoningRequest<TInput = unknown> extends InferenceRequest<TInput> {
    reasoning?: ReasoningOptions;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `backendId` | 属性 | <code>backendId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cachePolicy` | 属性 | <code>cachePolicy?: InferenceCachePolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheScope` | 属性 | <code>cacheScope?: InferenceCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `kvCache` | 属性 | <code>kvCache?: KvCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `options` | 属性 | <code>options?: InferenceGenerationOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefix` | 属性 | <code>prefix?: PrefixCacheRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoning` | 属性 | <code>reasoning?: ReasoningOptions</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedKvCacheValue` | 属性 | <code>resolvedKvCacheValue?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedPrefixContent` | 属性 | <code>resolvedPrefixContent?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: InferenceToolDescriptor[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trace` | 属性 | <code>trace?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ThoughtEdge`

Thought Edge 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ThoughtEdge } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export interface ThoughtEdge {
    from: string;
    to: string;
    type: ThoughtEdgeType;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `from` | 属性 | <code>from: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: ThoughtEdgeType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ThoughtGraph`

Thought Graph 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ThoughtGraph } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export interface ThoughtGraph {
    id: string;
    method: Extract<ReasoningMethod, 'tot' | 'got'>;
    nodes: ThoughtNode[];
    edges: ThoughtEdge[];
    selectedNodeId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `edges` | 属性 | <code>edges: ThoughtEdge[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `method` | 属性 | <code>method: "tot" &#124; "got"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nodes` | 属性 | <code>nodes: ThoughtNode[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selectedNodeId` | 属性 | <code>selectedNodeId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ThoughtNode`

Thought Node 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ThoughtNode } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `branchIndex` | 属性 | <code>branchIndex: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `depth` | 属性 | <code>depth: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parentIds` | 属性 | <code>parentIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `responseId` | 属性 | <code>responseId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: ThoughtNodeStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningAggregation`

Reasoning Aggregation 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReasoningAggregation } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export type ReasoningAggregation = 'first' | 'majority_vote' | 'score' | 'llm_judge';
```

## `ReasoningMethod`

Reasoning Method 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReasoningMethod } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export type ReasoningMethod = 'direct' | 'cot' | 'tot' | 'got' | 'self_consistency';
```

## `ReasoningTraceEvent`

Reasoning Trace Event 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReasoningTraceEvent } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

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

Reasoning Trace Sink 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReasoningTraceSink } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export type ReasoningTraceSink = (event: ReasoningTraceEvent) => Promise<void> | void;
```

## `ThoughtEdgeType`

Thought Edge Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ThoughtEdgeType } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export type ThoughtEdgeType = 'expand' | 'merge' | 'refine' | 'criticize' | 'validate';
```

## `ThoughtNodeStatus`

Thought Node Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ThoughtNodeStatus } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts)

### 声明

```text
export type ThoughtNodeStatus = 'candidate' | 'evaluated' | 'selected' | 'rejected';
```
