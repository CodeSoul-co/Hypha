# `@codesoul-co/hypha-core` / `modules/runtime/runtime-checkpoint-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-checkpoint-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime checkpoint service 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  RuntimeCheckpointService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCheckpointServiceOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeCheckpointService` | 类 | <code>new RuntimeCheckpointService(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | Runtime Checkpoint Service 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeCheckpointServiceOptions` | 接口 | <code>interface RuntimeCheckpointServiceOptions</code> | Runtime Checkpoint Service Options 接口，共包含 7 个公开字段或方法。 |

## `RuntimeCheckpointService`

Runtime Checkpoint Service 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeCheckpointService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-checkpoint-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)

### 声明

```text
export declare class RuntimeCheckpointService {
    constructor(options: RuntimeCheckpointServiceOptions);
    create(input: RuntimeCheckpointCreateCommand): Promise<RuntimeCheckpointCreateResult>;
    load(input: RuntimeCheckpointLoadRequest): Promise<RuntimeCheckpointLoadResult | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeCheckpointServiceOptions): RuntimeCheckpointService</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: RuntimeCheckpointCreateCommand): Promise&lt;RuntimeCheckpointCreateResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `load` | 方法 | <code>load(input: RuntimeCheckpointLoadRequest): Promise&lt;RuntimeCheckpointLoadResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeCheckpointServiceOptions`

Runtime Checkpoint Service Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCheckpointServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-checkpoint-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-checkpoint-service.ts)

### 声明

```text
export interface RuntimeCheckpointServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    checkpoints: RuntimeCheckpointStore;
    runLeases: RunLeaseStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoints` | 属性 | <code>checkpoints: RuntimeCheckpointStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
