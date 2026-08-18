# `@codesoul-co/hypha-models` API

模型 Provider Registry、路由与确定性 Mock Provider。

- 安装: `npm install @codesoul-co/hypha-models@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-models';`
- 公共导出: **55**
- 源码模块: **3**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 8 |
| 常量 | 16 |
| 函数 | 8 |
| 接口 | 21 |
| 类型 | 2 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`index`](/zh/api/models/entrypoint) | 聚合 `@codesoul-co/hypha-models` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 36 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts) |
| [`providers`](/zh/api/models/providers) | 用于把外部或本地 Provider 绑定到 Hypha Port。Providers 模块公开 3 类、3 函数、3 接口。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts) |
| [`router`](/zh/api/models/router) | 用于使用该功能边界的公共契约与操作。Router 模块公开 3 类、2 函数、4 接口、1 类型。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-models` 包入口导出的公共 API。`packages/models/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
