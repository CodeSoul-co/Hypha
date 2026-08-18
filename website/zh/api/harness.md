# `@codesoul-co/hypha-harness` API

Event-first 执行、追踪、投影、重放与编排。

- 模块指南: [`@codesoul-co/hypha-harness`](/zh/packages/harness)
- 安装: `npm install @codesoul-co/hypha-harness@1.0.1`
- 公共导出: **107**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 15 |
| 接口 | 74 |
| 类型 | 6 |
| 函数 | 10 |
| 常量 | 2 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`bounded-fsm-driver`](/zh/api/harness/bounded-fsm-driver) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/bounded-fsm-driver.ts) |
| [`durable-event-store-bridge`](/zh/api/harness/durable-event-store-bridge) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts) |
| [`execution-context`](/zh/api/harness/execution-context) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts) |
| [`index`](/zh/api/harness/entrypoint) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/index.ts) |
| [`long-horizon-react-supervisor`](/zh/api/harness/long-horizon-react-supervisor) | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts) |
| [`manual-fsm-transition`](/zh/api/harness/manual-fsm-transition) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/manual-fsm-transition.ts) |
| [`message-bus`](/zh/api/harness/message-bus) | 12 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts) |
| [`react-quantum-executor`](/zh/api/harness/react-quantum-executor) | 19 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts) |
| [`recovery-loop`](/zh/api/harness/recovery-loop) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-loop.ts) |
| [`recovery-supervisor`](/zh/api/harness/recovery-supervisor) | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts) |
| [`runtime`](/zh/api/harness/runtime) | 20 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
