# `@codesoul-co/hypha-core` / `modules/runtime/runtime-human-wait-service`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/runtime/runtime-human-wait-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)
- 导出数: **6**

## 模块用法

用于执行该边界的运行时行为。Runtime human wait service 模块公开 1 类、5 接口。

### 从包入口导入

```ts
import {
  RuntimeHumanWaitService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeHumanWaitCreateCommand,
  RuntimeHumanWaitResolveCommand,
  RuntimeHumanWaitResult,
  RuntimeHumanWaitServiceOptions,
  RuntimeHumanWaitSupersedeCommand,
} from '@codesoul-co/hypha-core';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `RuntimeHumanWaitService` | 类 | <code>new RuntimeHumanWaitService(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | Runtime Human Wait Service 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `RuntimeHumanWaitCreateCommand` | 接口 | <code>interface RuntimeHumanWaitCreateCommand</code> | Runtime Human Wait Create Command 接口，共包含 10 个公开字段或方法。 |
| `RuntimeHumanWaitResolveCommand` | 接口 | <code>interface RuntimeHumanWaitResolveCommand</code> | Runtime Human Wait Resolve Command 接口，共包含 11 个公开字段或方法。 |
| `RuntimeHumanWaitResult` | 接口 | <code>interface RuntimeHumanWaitResult</code> | Runtime Human Wait Result 接口，共包含 5 个公开字段或方法。 |
| `RuntimeHumanWaitServiceOptions` | 接口 | <code>interface RuntimeHumanWaitServiceOptions</code> | Runtime Human Wait Service Options 接口，共包含 6 个公开字段或方法。 |
| `RuntimeHumanWaitSupersedeCommand` | 接口 | <code>interface RuntimeHumanWaitSupersedeCommand</code> | Runtime Human Wait Supersede Command 接口，共包含 11 个公开字段或方法。 |

## `RuntimeHumanWaitService`

Runtime Human Wait Service 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { RuntimeHumanWaitService } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### 声明

```text
export declare class RuntimeHumanWaitService {
    constructor(options: RuntimeHumanWaitServiceOptions);
    create(input: RuntimeHumanWaitCreateCommand): Promise<RuntimeHumanWaitResult>;
    resolve(input: RuntimeHumanWaitResolveCommand): Promise<RuntimeHumanWaitResult>;
    supersede(input: RuntimeHumanWaitSupersedeCommand): Promise<RuntimeHumanWaitResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: RuntimeHumanWaitServiceOptions): RuntimeHumanWaitService</code> | 创建该类的实例。 |
| `create` | 方法 | <code>create(input: RuntimeHumanWaitCreateCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(input: RuntimeHumanWaitResolveCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `supersede` | 方法 | <code>supersede(input: RuntimeHumanWaitSupersedeCommand): Promise&lt;RuntimeHumanWaitResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RuntimeHumanWaitCreateCommand`

Runtime Human Wait Create Command 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanWaitCreateCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### 声明

```text
export interface RuntimeHumanWaitCreateCommand {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    waitId: string;
    pendingActionRef: string;
    reason: string;
    requestedAt: string;
    humanTasks?: RuntimeHumanTaskRequest[];
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanTasks` | 属性 | <code>humanTasks?: RuntimeHumanTaskRequest[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedAt` | 属性 | <code>requestedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitId` | 属性 | <code>waitId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHumanWaitResolveCommand`

Runtime Human Wait Resolve Command 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanWaitResolveCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### 声明

```text
export interface RuntimeHumanWaitResolveCommand {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    waitId?: string;
    pendingActionRef: string;
    principalId: string;
    decision: 'approved' | 'rejected' | 'expired' | 'cancelled';
    resolvedAt: string;
    humanTaskDecision?: RuntimeHumanTaskDecisionCommand;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `decision` | 属性 | <code>decision: "rejected" &#124; "cancelled" &#124; "expired" &#124; "approved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanTaskDecision` | 属性 | <code>humanTaskDecision?: RuntimeHumanTaskDecisionCommand</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolvedAt` | 属性 | <code>resolvedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitId` | 属性 | <code>waitId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHumanWaitResult`

Runtime Human Wait Result 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanWaitResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### 声明

```text
export interface RuntimeHumanWaitResult {
    commandId: string;
    disposition: 'applied' | 'reused' | 'lease_unavailable';
    eventIds: string[];
    runRevision: number;
    projection: RuntimeOrchestrationProjection;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `disposition` | 属性 | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: RuntimeOrchestrationProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runRevision` | 属性 | <code>runRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeHumanWaitServiceOptions`

Runtime Human Wait Service Options 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanWaitServiceOptions } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### 声明

```text
export interface RuntimeHumanWaitServiceOptions {
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

## `RuntimeHumanWaitSupersedeCommand`

Runtime Human Wait Supersede Command 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeHumanWaitSupersedeCommand } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/runtime/runtime-human-wait-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-human-wait-service.ts)

### 声明

```text
export interface RuntimeHumanWaitSupersedeCommand {
    commandId: string;
    scope: RuntimeScope;
    ownerId: string;
    leaseTtlMs: number;
    waitId?: string;
    pendingActionRef: string;
    principalId: string;
    supersededAt: string;
    humanTaskDecision: RuntimeHumanTaskDecisionCommand;
    replacementTask: RuntimeHumanTaskRequest;
    idempotencyKey?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `commandId` | 属性 | <code>commandId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanTaskDecision` | 属性 | <code>humanTaskDecision: RuntimeHumanTaskDecisionCommand</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `leaseTtlMs` | 属性 | <code>leaseTtlMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replacementTask` | 属性 | <code>replacementTask: RuntimeHumanTaskRequest</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `supersededAt` | 属性 | <code>supersededAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waitId` | 属性 | <code>waitId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
