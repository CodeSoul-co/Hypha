# `@codesoul-co/hypha-core` / `modules/runtime/runtime-cancellation-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-cancellation-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Runtime cancellation service 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  RuntimeCancellationService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeCancellationServiceOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeCancellationService` | 类 | <code>new RuntimeCancellationService(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | Runtime Cancellation Service 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeCancellationServiceOptions` | 接口 | <code>interface RuntimeCancellationServiceOptions</code> | Runtime Cancellation Service Options 接口，共包含 9 个公开字段或方法。 |

## `RuntimeCancellationService`

Runtime Cancellation Service 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeCancellationService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-cancellation-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)

### 声明

```text
export declare class RuntimeCancellationService {
    constructor(options: RuntimeCancellationServiceOptions);
    cancel(input: RuntimeCancelCommand): Promise<RuntimeCancelResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(input: RuntimeCancelCommand): Promise&lt;RuntimeCancelResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: RuntimeCancellationServiceOptions): RuntimeCancellationService</code> | 创建该类的实例。 |

## `RuntimeCancellationServiceOptions`

Runtime Cancellation Service Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeCancellationServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-cancellation-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-cancellation-service.ts)

### 声明

```text
export interface RuntimeCancellationServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    commands: Pick<SessionQueue, 'cancelPending'>;
    activities: RuntimeActivityCancellationPort;
    children: RuntimeChildRunCancellationPort;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: RuntimeActivityCancellationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `children` | 属性 | <code>children: RuntimeChildRunCancellationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commands` | 属性 | <code>commands: Pick&lt;SessionQueue, "cancelPending"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
