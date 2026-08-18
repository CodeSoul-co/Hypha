# `@codesoul-co/hypha-memory` / `memory-worker-supervisor`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-worker-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-worker-supervisor.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `MemoryWorkerSupervisor` | 类 | <code>new MemoryWorkerSupervisor(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | Owns startup recovery and graceful shutdown for restart-safe Memory workers. |
| `MemoryWorkerSupervisorOptions` | 接口 | <code>interface MemoryWorkerSupervisorOptions</code> | Memory Worker Supervisor Options 的字段契约；完整字段见下表。 |
| `SupervisedMemoryWorker` | 接口 | <code>interface SupervisedMemoryWorker</code> | Supervised Memory Worker 的字段契约；完整字段见下表。 |

## `MemoryWorkerSupervisor` 公开成员

Owns startup recovery and graceful shutdown for restart-safe Memory workers.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: MemoryWorkerSupervisorOptions): MemoryWorkerSupervisor</code> | 创建该类的实例。 |
| `start` | 方法 | <code>start(): Promise&lt;void&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(): "idle" &#124; "starting" &#124; "running" &#124; "stopping" &#124; "stopped"</code> | status 的公开运行时操作。 |
| `stop` | 方法 | <code>stop(): Promise&lt;void&gt;</code> | stop 的公开运行时操作。 |

## `MemoryWorkerSupervisorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `workers` | 属性 | <code>workers: readonly SupervisedMemoryWorker[]</code> | workers 字段。 |

## `SupervisedMemoryWorker` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runOnce` | 方法 | <code>runOnce(): Promise&lt;unknown&gt;</code> | run Once 的公开运行时操作。 |
| `start` | 方法 | <code>start(): void</code> | 启动 start。 |
| `stopAndDrain` | 方法 | <code>stopAndDrain(): Promise&lt;void&gt;</code> | stop And Drain 的公开运行时操作。 |
