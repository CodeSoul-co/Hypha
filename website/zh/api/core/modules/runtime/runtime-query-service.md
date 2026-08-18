# `@codesoul-co/hypha-core` / `modules/runtime/runtime-query-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-query-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime query service 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  RuntimeQueryService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeQueryServiceOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeQueryService` | 类 | <code>new RuntimeQueryService(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | Runtime Query Service 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeQueryServiceOptions` | 接口 | <code>interface RuntimeQueryServiceOptions</code> | Runtime Query Service Options 接口，共包含 4 个公开字段或方法。 |

## `RuntimeQueryService`

Runtime Query Service 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeQueryService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-query-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)

### 声明

```text
export declare class RuntimeQueryService implements RuntimeQueryServiceContract {
    constructor(options: RuntimeQueryServiceOptions);
    getRun(input: RuntimeQueryRequest): Promise<RuntimeRunView | null>;
    getFSM(input: RuntimeQueryRequest): Promise<RuntimeOrchestrationProjection | null>;
    getTimeline(input: RuntimeTimelineRequest): Promise<RuntimeTimelineResult>;
    getPendingWaits(input: RuntimeQueryRequest): Promise<RuntimePendingWaitProjection[]>;
    explainState(input: RuntimeQueryRequest): Promise<RuntimeStateExplanation | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeQueryServiceOptions): RuntimeQueryService</code> | 创建该类的实例。 |
| `explainState` | 方法 | <code>explainState(input: RuntimeQueryRequest): Promise&lt;RuntimeStateExplanation &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getFSM` | 方法 | <code>getFSM(input: RuntimeQueryRequest): Promise&lt;RuntimeOrchestrationProjection &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getPendingWaits` | 方法 | <code>getPendingWaits(input: RuntimeQueryRequest): Promise&lt;RuntimePendingWaitProjection[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getRun` | 方法 | <code>getRun(input: RuntimeQueryRequest): Promise&lt;RuntimeRunView &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `getTimeline` | 方法 | <code>getTimeline(input: RuntimeTimelineRequest): Promise&lt;RuntimeTimelineResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeQueryServiceOptions`

Runtime Query Service Options 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeQueryServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-query-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-query-service.ts)

### 声明

```text
export interface RuntimeQueryServiceOptions {
    events: Pick<EventRuntime, 'read' | 'getStreamHead'>;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: Pick&lt;EventRuntime, "read" &#124; "getStreamHead"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
