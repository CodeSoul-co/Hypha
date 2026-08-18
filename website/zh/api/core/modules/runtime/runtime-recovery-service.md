# `@codesoul-co/hypha-core` / `modules/runtime/runtime-recovery-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-recovery-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)
- 导出数: **3**

## 模块用法

用于执行该边界的运行时行为。Runtime recovery service 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  RuntimeRecoveryService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityRedispatchRecoveryPort,
  RuntimeRecoveryServiceOptions,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeRecoveryService` | 类 | <code>new RuntimeRecoveryService(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | Runtime Recovery Service 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeActivityRedispatchRecoveryPort` | 接口 | <code>interface RuntimeActivityRedispatchRecoveryPort</code> | Runtime Activity Redispatch Recovery Port 接口，共包含 1 个公开字段或方法。 |
| `RuntimeRecoveryServiceOptions` | 接口 | <code>interface RuntimeRecoveryServiceOptions</code> | Runtime Recovery Service Options 接口，共包含 11 个公开字段或方法。 |

## `RuntimeRecoveryService`

Runtime Recovery Service 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeRecoveryService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-recovery-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)

### 声明

```text
export declare class RuntimeRecoveryService {
    constructor(options: RuntimeRecoveryServiceOptions);
    scan(input: RuntimeRecoveryScanRequest): Promise<RuntimeRecoveryScanResult>;
    recover(input: RuntimeRecoveryCommand): Promise<RuntimeRecoveryResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeRecoveryServiceOptions): RuntimeRecoveryService</code> | 创建该类的实例。 |
| `recover` | 方法 | <code>recover(input: RuntimeRecoveryCommand): Promise&lt;RuntimeRecoveryResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `scan` | 方法 | <code>scan(input: RuntimeRecoveryScanRequest): Promise&lt;RuntimeRecoveryScanResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeActivityRedispatchRecoveryPort`

Runtime Activity Redispatch Recovery Port 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeActivityRedispatchRecoveryPort } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-recovery-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)

### 声明

```text
export interface RuntimeActivityRedispatchRecoveryPort {
    redispatch(command: RuntimeActivityRedispatchCommand): Promise<RuntimeActivityRedispatchResult>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `redispatch` | 方法 | <code>redispatch(command: RuntimeActivityRedispatchCommand): Promise&lt;RuntimeActivityRedispatchResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeRecoveryServiceOptions`

Runtime Recovery Service Options 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeRecoveryServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-recovery-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-recovery-service.ts)

### 声明

```text
export interface RuntimeRecoveryServiceOptions {
    events: EventRuntime;
    projections: ProjectionEngine;
    projectionStore: ProjectionStore<RuntimeOrchestrationProjection>;
    runLeases: RunLeaseStore;
    stateClaims: StateExecutionClaimStore;
    activities: RuntimeActivityReconciliationPort;
    redispatches: RuntimeActivityRedispatchRecoveryPort;
    cancellations: RuntimeCancellationRecoveryPort;
    requeue: RuntimeRecoveryRequeuePort;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activities` | 属性 | <code>activities: RuntimeActivityReconciliationPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cancellations` | 属性 | <code>cancellations: RuntimeCancellationRecoveryPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>events: EventRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `projections` | 属性 | <code>projections: ProjectionEngine</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projectionStore` | 属性 | <code>projectionStore: ProjectionStore&lt;RuntimeOrchestrationProjection&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redispatches` | 属性 | <code>redispatches: RuntimeActivityRedispatchRecoveryPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requeue` | 属性 | <code>requeue: RuntimeRecoveryRequeuePort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLeases` | 属性 | <code>runLeases: RunLeaseStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateClaims` | 属性 | <code>stateClaims: StateExecutionClaimStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
