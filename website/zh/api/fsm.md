# `@codesoul-co/hypha-fsm` API

FSM Spec、拓扑分析、Snapshot、迁移与恢复。

- 安装: `npm install @codesoul-co/hypha-fsm@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-fsm';`
- 公共导出: **77**
- 源码模块: **2**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 1 |
| 常量 | 20 |
| 函数 | 22 |
| 接口 | 24 |
| 类型 | 10 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`index`](/zh/api/fsm/entrypoint) | 聚合 `@codesoul-co/hypha-fsm` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 50 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts) |
| [`recovery`](/zh/api/fsm/recovery) | 用于处理有界恢复、重试或降级。Recovery 模块公开 7 常量、5 函数、10 接口、5 类型。 | 27 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/recovery.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-fsm` 包入口导出的公共 API。`packages/fsm/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
