# `@codesoul-co/hypha-core` / `modules/runtime/run-control`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/run-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)
- 导出数: **2**

## 模块用法

用于执行该边界的运行时行为。Run control 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  RuntimeRunControlService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeRunControlServiceOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeRunControlService` | 类 | <code>new RuntimeRunControlService(options: RuntimeRunControlServiceOptions): RuntimeRunControlService</code> | Runtime Run Control Service 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeRunControlServiceOptions` | 接口 | <code>interface RuntimeRunControlServiceOptions</code> | Runtime Run Control Service Options 接口，共包含 6 个公开字段或方法。 |

## `RuntimeRunControlService`

Runtime Run Control Service 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeRunControlService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/run-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)

### 声明

```text
export declare class RuntimeRunControlService {
    constructor(options: RuntimeRunControlServiceOptions);
    execute(input: RuntimeRunControlCommand): Promise<RuntimeRunControlResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeRunControlServiceOptions): RuntimeRunControlService</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(input: RuntimeRunControlCommand): Promise&lt;RuntimeRunControlResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeRunControlServiceOptions`

Runtime Run Control Service Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRunControlServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/run-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/run-control.ts)

### 声明

```text
export interface RuntimeRunControlServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
