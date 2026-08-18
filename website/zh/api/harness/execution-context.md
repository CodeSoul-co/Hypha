# `@codesoul-co/hypha-harness` / `execution-context`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 源码: [`packages/harness/src/execution-context.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)
- 导出数: **3**

## 模块用法

用于执行该边界的运行时行为。Execution context 模块公开 1 函数、2 接口。

### 从包入口导入

```ts
import {
  createRuntimeExecutionContext,
} from '@codesoul-co/hypha-harness';

import type {
  CreateRuntimeExecutionContextOptions,
  RuntimeExecutionContext,
} from '@codesoul-co/hypha-harness';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createRuntimeExecutionContext` | 函数 | <code>createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext</code> | Create Runtime Execution Context 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `CreateRuntimeExecutionContextOptions` | 接口 | <code>interface CreateRuntimeExecutionContextOptions</code> | Create Runtime Execution Context Options 接口，共包含 15 个公开字段或方法。 |
| `RuntimeExecutionContext` | 接口 | <code>interface RuntimeExecutionContext</code> | Runtime Execution Context 接口，共包含 16 个公开字段或方法。 |

## `createRuntimeExecutionContext`

Create Runtime Execution Context 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createRuntimeExecutionContext } from '@codesoul-co/hypha-harness';`
- 源码模块: [`execution-context`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)

### 声明

```text
export declare function createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext;
```

### 调用签名

```text
createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>CreateRuntimeExecutionContextOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `RuntimeExecutionContext`
- 说明: 返回值契约由上述类型定义。

## `CreateRuntimeExecutionContextOptions`

Create Runtime Execution Context Options 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { CreateRuntimeExecutionContextOptions } from '@codesoul-co/hypha-harness';`
- 源码模块: [`execution-context`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)

### 声明

```text
export interface CreateRuntimeExecutionContextOptions {
    scope: RuntimeScope;
    principal: RuntimePrincipal;
    run: RuntimeRun;
    snapshot: FSMSnapshot;
    process: FSMProcessSpec;
    attempt: number;
    runLease: RunLeaseAuthorization;
    abortSignal: AbortSignal;
    determinismStore: RuntimeDeterminismStore;
    eventCommitPort: RuntimeEventCommitPort;
    activityDispatchPort: RuntimeActivityDispatchPort;
    resourceCoordinator: RuntimeResourceCoordinator;
    causationId?: string;
    now?: () => string;
    nextId?: (namespace: string) => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activityDispatchPort` | 属性 | <code>activityDispatchPort: RuntimeActivityDispatchPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempt` | 属性 | <code>attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `causationId` | 属性 | <code>causationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `determinismStore` | 属性 | <code>determinismStore: RuntimeDeterminismStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventCommitPort` | 属性 | <code>eventCommitPort: RuntimeEventCommitPort</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextId` | 方法 | <code>nextId?(namespace: string): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `process` | 属性 | <code>process: FSMProcessSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceCoordinator` | 属性 | <code>resourceCoordinator: RuntimeResourceCoordinator</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `run` | 属性 | <code>run: RuntimeRun</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RuntimeExecutionContext`

Runtime Execution Context 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RuntimeExecutionContext } from '@codesoul-co/hypha-harness';`
- 源码模块: [`execution-context`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)

### 声明

```text
export interface RuntimeExecutionContext {
    readonly scope: Readonly<RuntimeScope>;
    readonly principal: Readonly<RuntimePrincipal>;
    readonly run: Readonly<RuntimeRun>;
    readonly snapshot: Readonly<FSMSnapshot>;
    readonly process: Readonly<FSMProcessSpec>;
    readonly state: Readonly<FSMStateSpec>;
    readonly attempt: number;
    readonly fencingToken: number;
    readonly abortSignal: AbortSignal;
    readonly events: RuntimeEventHelper;
    readonly activities: RuntimeActivityHelper;
    readonly transitions: RuntimeTransitionHelper;
    readonly waits: RuntimeWaitHelper;
    readonly resources: RuntimeResourceHelper;
    readonly clock: RuntimeClockHelper;
    readonly ids: RuntimeIdHelper;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>readonly abortSignal: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `activities` | 属性 | <code>readonly activities: RuntimeActivityHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `attempt` | 属性 | <code>readonly attempt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `clock` | 属性 | <code>readonly clock: RuntimeClockHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `events` | 属性 | <code>readonly events: RuntimeEventHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fencingToken` | 属性 | <code>readonly fencingToken: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ids` | 属性 | <code>readonly ids: RuntimeIdHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>readonly principal: Readonly&lt;RuntimePrincipal&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `process` | 属性 | <code>readonly process: Readonly&lt;FSMProcessSpec&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resources` | 属性 | <code>readonly resources: RuntimeResourceHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `run` | 属性 | <code>readonly run: Readonly&lt;RuntimeRun&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>readonly scope: Readonly&lt;RuntimeScope&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `snapshot` | 属性 | <code>readonly snapshot: Readonly&lt;FSMSnapshot&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>readonly state: Readonly&lt;FSMStateSpec&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transitions` | 属性 | <code>readonly transitions: RuntimeTransitionHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `waits` | 属性 | <code>readonly waits: RuntimeWaitHelper</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
