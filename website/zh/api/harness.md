# `@codesoul-co/hypha-harness` API

Event-first 执行、追踪、投影、重放与编排。

- 安装: `npm install @codesoul-co/hypha-harness@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-harness';`
- 公共导出: **107**
- 源码模块: **11**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 15 |
| 接口 | 74 |
| 类型 | 6 |
| 函数 | 10 |
| 常量 | 2 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`bounded-fsm-driver`](/zh/api/harness/bounded-fsm-driver) | 用于使用该功能边界的公共契约与操作。Bounded FSM driver 模块公开 1 类、5 接口、1 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts) |
| [`durable-event-store-bridge`](/zh/api/harness/durable-event-store-bridge) | 用于创建、记录或读取 Event 契约。Durable event store bridge 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts) |
| [`execution-context`](/zh/api/harness/execution-context) | 用于执行该边界的运行时行为。Execution context 模块公开 1 函数、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts) |
| [`index`](/zh/api/harness/entrypoint) | 聚合 `@codesoul-co/hypha-harness` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts) |
| [`long-horizon-react-supervisor`](/zh/api/harness/long-horizon-react-supervisor) | 用于使用该功能边界的公共契约与操作。Long horizon react supervisor 模块公开 2 类、1 函数、11 接口、1 类型。 | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts) |
| [`manual-fsm-transition`](/zh/api/harness/manual-fsm-transition) | 用于使用该功能边界的公共契约与操作。Manual FSM transition 模块公开 1 类、1 常量、4 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts) |
| [`message-bus`](/zh/api/harness/message-bus) | 用于使用该功能边界的公共契约与操作。Message bus 模块公开 1 类、9 接口、2 类型。 | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts) |
| [`react-quantum-executor`](/zh/api/harness/react-quantum-executor) | 用于执行该边界的运行时行为。React quantum executor 模块公开 3 类、1 常量、1 函数、13 接口、1 类型。 | 19 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts) |
| [`recovery-loop`](/zh/api/harness/recovery-loop) | 用于处理有界恢复、重试或降级。Recovery loop 模块公开 1 函数、4 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts) |
| [`recovery-supervisor`](/zh/api/harness/recovery-supervisor) | 用于处理有界恢复、重试或降级。Recovery supervisor 模块公开 1 函数、6 接口、1 类型。 | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts) |
| [`runtime`](/zh/api/harness/runtime) | 用于执行该边界的运行时行为。Runtime 模块公开 3 类、4 函数、13 接口。 | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-harness` 包入口导出的公共 API。`packages/harness/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
