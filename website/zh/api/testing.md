# `@codesoul-co/hypha-testing` API

Trace、Replay、Fixture 与确定性断言辅助工具。

- 安装: `npm install @codesoul-co/hypha-testing@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-testing';`
- 公共导出: **46**
- 源码模块: **5**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 9 |
| 函数 | 7 |
| 接口 | 28 |
| 类型 | 2 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`evaluation`](/zh/api/testing/evaluation) | 用于使用该功能边界的公共契约与操作。Evaluation 模块公开 3 类、1 函数、10 接口、1 类型。 | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts) |
| [`index`](/zh/api/testing/entrypoint) | 聚合 `@codesoul-co/hypha-testing` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts) |
| [`mock-execution-provider`](/zh/api/testing/mock-execution-provider) | 用于把外部或本地 Provider 绑定到 Hypha Port。Mock execution provider 模块公开 2 类、2 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts) |
| [`regression`](/zh/api/testing/regression) | 用于使用该功能边界的公共契约与操作。Regression 模块公开 1 类、5 接口、1 类型。 | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts) |
| [`replay`](/zh/api/testing/replay) | 用于使用该功能边界的公共契约与操作。Replay 模块公开 3 类、3 函数、10 接口。 | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-testing` 包入口导出的公共 API。`packages/testing/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
