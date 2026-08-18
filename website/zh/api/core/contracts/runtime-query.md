# `@codesoul-co/hypha-core` / `contracts/runtime-query`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/runtime-query.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)
- 导出数: **6**

## 模块用法

用于声明并运行时校验契约。Runtime query 模块公开 6 接口。

### 从包入口导入

```ts
import type {
  RuntimeQueryRequest,
  RuntimeQueryServiceContract,
  RuntimeRunView,
  RuntimeStateExplanation,
  RuntimeTimelineRequest,
  RuntimeTimelineResult,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 6 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeQueryRequest` | 接口 | <code>interface RuntimeQueryRequest</code> | Runtime Query Request 接口，共包含 1 个公开字段或方法。 |
| `RuntimeQueryServiceContract` | 接口 | <code>interface RuntimeQueryServiceContract</code> | Runtime Query Service Contract 接口，共包含 5 个公开字段或方法。 |
| `RuntimeRunView` | 接口 | <code>interface RuntimeRunView</code> | Runtime Run View 接口，共包含 7 个公开字段或方法。 |
| `RuntimeStateExplanation` | 接口 | <code>interface RuntimeStateExplanation</code> | Runtime State Explanation 接口，共包含 10 个公开字段或方法。 |
| `RuntimeTimelineRequest` | 接口 | <code>interface RuntimeTimelineRequest extends RuntimeQueryRequest</code> | Runtime Timeline Request 接口，共包含 5 个公开字段或方法。 |
| `RuntimeTimelineResult` | 接口 | <code>interface RuntimeTimelineResult</code> | Runtime Timeline Result 接口，共包含 5 个公开字段或方法。 |

## `RuntimeQueryRequest`

Runtime Query Request 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeQueryRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### 声明

```text
export interface RuntimeQueryRequest {
    scope: RuntimeScope;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeQueryServiceContract`

Runtime Query Service Contract 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeQueryServiceContract } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### 声明

```text
export interface RuntimeQueryServiceContract {
    getRun(request: RuntimeQueryRequest): Promise<RuntimeRunView | null>;
    getFSM(request: RuntimeQueryRequest): Promise<RuntimeOrchestrationProjection | null>;
    getTimeline(request: RuntimeTimelineRequest): Promise<RuntimeTimelineResult>;
    getPendingWaits(request: RuntimeQueryRequest): Promise<RuntimePendingWaitProjection[]>;
    explainState(request: RuntimeQueryRequest): Promise<RuntimeStateExplanation | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `explainState` | 方法 | <code>explainState(request: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getFSM` | 方法 | <code>getFSM(request: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPendingWaits` | 方法 | <code>getPendingWaits(request: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRun` | 方法 | <code>getRun(request: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getTimeline` | 方法 | <code>getTimeline(request: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeRunView`

Runtime Run View 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRunView } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### 声明

```text
export interface RuntimeRunView {
    scope: RuntimeScope;
    projectionVersion: string;
    projection: RuntimeOrchestrationProjection;
    projectionLastSequence: number;
    eventHeadSequence: number;
    projectionLag: number;
    refreshedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventHeadSequence` | 属性 | <code>eventHeadSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionLag` | 属性 | <code>projectionLag: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionLastSequence` | 属性 | <code>projectionLastSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionVersion` | 属性 | <code>projectionVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `refreshedAt` | 属性 | <code>refreshedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeStateExplanation`

Runtime State Explanation 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeStateExplanation } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### 声明

```text
export interface RuntimeStateExplanation {
    scope: RuntimeScope;
    runStatus: RuntimeOrchestrationProjection['runStatus'];
    currentState?: string;
    stateAttempt: number;
    statePath: string[];
    pendingWaitId?: string;
    pendingTransitionEventId?: string;
    pendingActivityIds: string[];
    lastEventSequence: number;
    source: 'runtime.orchestration.projection';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentState` | 属性 | <code>currentState?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastEventSequence` | 属性 | <code>lastEventSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActivityIds` | 属性 | <code>pendingActivityIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingTransitionEventId` | 属性 | <code>pendingTransitionEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingWaitId` | 属性 | <code>pendingWaitId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runStatus` | 属性 | <code>runStatus: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/contracts/runtime-projection").RuntimeOrchestrationRunStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "runtime.orchestration.projection"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttempt` | 属性 | <code>stateAttempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeTimelineRequest`

Runtime Timeline Request 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTimelineRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### 声明

```text
export interface RuntimeTimelineRequest extends RuntimeQueryRequest {
    fromSequence?: number;
    toSequence?: number;
    types?: FrameworkEventType[];
    limit?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fromSequence` | 属性 | <code>fromSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `limit` | 属性 | <code>limit?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toSequence` | 属性 | <code>toSequence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `types` | 属性 | <code>types?: FrameworkEventType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeTimelineResult`

Runtime Timeline Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeTimelineResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/runtime-query`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-query.ts)

### 声明

```text
export interface RuntimeTimelineResult {
    scope: RuntimeScope;
    events: PersistedFrameworkEvent[];
    eventCount: number;
    eventHeadSequence: number;
    refreshedAt: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventCount` | 属性 | <code>eventCount: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventHeadSequence` | 属性 | <code>eventHeadSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: PersistedFrameworkEvent&lt;unknown&gt;[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `refreshedAt` | 属性 | <code>refreshedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
