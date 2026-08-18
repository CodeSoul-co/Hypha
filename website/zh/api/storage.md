# `@codesoul-co/hypha-storage` API

Provider-neutral 存储拓扑契约与 Profile Builder。

- 安装: `npm install @codesoul-co/hypha-storage@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-storage';`
- 公共导出: **51**
- 源码模块: **2**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 常量 | 17 |
| 函数 | 19 |
| 接口 | 7 |
| 类型 | 8 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`index`](/zh/api/storage/entrypoint) | 聚合 `@codesoul-co/hypha-storage` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 46 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/index.ts) |
| [`recovery`](/zh/api/storage/recovery) | 用于处理有界恢复、重试或降级。Recovery 模块公开 2 函数、2 接口、1 类型。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/storage/src/recovery.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-storage` 包入口导出的公共 API。`packages/storage/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
