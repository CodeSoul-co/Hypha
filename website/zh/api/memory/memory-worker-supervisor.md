# `@codesoul-co/hypha-memory` / `memory-worker-supervisor`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-worker-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Memory worker supervisor 模块公开 1 类、2 接口。

### 从包入口导入

```ts
import {
  MemoryWorkerSupervisor,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryWorkerSupervisorOptions,
  SupervisedMemoryWorker,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 2 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryWorkerSupervisor` | 类 | <code>new MemoryWorkerSupervisor(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | Owns startup recovery and graceful shutdown for restart-safe Memory workers. |
| `MemoryWorkerSupervisorOptions` | 接口 | <code>interface MemoryWorkerSupervisorOptions</code> | Memory Worker Supervisor Options 接口，共包含 1 个公开字段或方法。 |
| `SupervisedMemoryWorker` | 接口 | <code>interface SupervisedMemoryWorker</code> | Supervised Memory Worker 接口，共包含 3 个公开字段或方法。 |

## `MemoryWorkerSupervisor`

Owns startup recovery and graceful shutdown for restart-safe Memory workers.

- 种类: 类
- 导入: `import { MemoryWorkerSupervisor } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-worker-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)

### 声明

```text
export declare class MemoryWorkerSupervisor {
    constructor(options: MemoryWorkerSupervisorOptions);
    start(): Promise<void>;
    stop(): Promise<void>;
    status(): 'idle' | 'starting' | 'running' | 'stopping' | 'stopped';
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | 创建该类的实例。 |
| `start` | 方法 | <code>start(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `status` | 方法 | <code>status(): "idle" &#124; "starting" &#124; "running" &#124; "stopping" &#124; "stopped"</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stop` | 方法 | <code>stop(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryWorkerSupervisorOptions`

Memory Worker Supervisor Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryWorkerSupervisorOptions } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-worker-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)

### 声明

```text
export interface MemoryWorkerSupervisorOptions {
    workers: readonly SupervisedMemoryWorker[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `workers` | 属性 | <code>workers: readonly SupervisedMemoryWorker[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SupervisedMemoryWorker`

Supervised Memory Worker 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SupervisedMemoryWorker } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-worker-supervisor`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)

### 声明

```text
export interface SupervisedMemoryWorker {
    start(): void;
    stopAndDrain(): Promise<void>;
    runOnce(): Promise<unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;unknown&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `start` | 方法 | <code>start(): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
