# `@codesoul-co/hypha-domain` API

Domain Pack 校验及向运行时契约的编译。

- 安装: `npm install @codesoul-co/hypha-domain@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-domain';`
- 公共导出: **81**
- 源码模块: **2**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 4 |
| 常量 | 32 |
| 函数 | 12 |
| 接口 | 25 |
| 类型 | 8 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`index`](/zh/api/domain/entrypoint) | 聚合 `@codesoul-co/hypha-domain` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 80 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts) |
| [`research-evidence-example`](/zh/api/domain/research-evidence-example) | 用于使用该功能边界的公共契约与操作。Research evidence example 模块公开 1 常量。 | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/research-evidence-example.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-domain` 包入口导出的公共 API。`packages/domain/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
