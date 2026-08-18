# `@codesoul-co/hypha-fsm` API

FSM Spec、拓扑分析、Snapshot、迁移与恢复。

- 模块指南: [`@codesoul-co/hypha-fsm`](/zh/packages/fsm)
- 安装: `npm install @codesoul-co/hypha-fsm@1.0.1`
- 公共导出: **77**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 1 |
| 常量 | 20 |
| 函数 | 22 |
| 接口 | 24 |
| 类型 | 10 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`index`](/zh/api/fsm/entrypoint) | 50 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts) |
| [`recovery`](/zh/api/fsm/recovery) | 27 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
