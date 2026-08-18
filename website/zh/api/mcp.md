# `@codesoul-co/hypha-mcp` API

MCP 集成 Spec、Client、Policy 与生命周期管理。

- 安装: `npm install @codesoul-co/hypha-mcp@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-mcp';`
- 公共导出: **122**
- 源码模块: **7**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 12 |
| 常量 | 32 |
| 函数 | 14 |
| 接口 | 56 |
| 类型 | 8 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`catalog`](/zh/api/mcp/catalog) | 用于注册并解析版本化能力或实现。Catalog 模块公开 6 类、4 常量、1 函数、11 接口、2 类型。 | 24 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts) |
| [`connection-manager`](/zh/api/mcp/connection-manager) | 用于使用该功能边界的公共契约与操作。Connection manager 模块公开 2 类、4 常量、2 函数、9 接口、1 类型。 | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts) |
| [`contracts`](/zh/api/mcp/contracts) | 用于声明并运行时校验契约。Contracts 模块公开 14 常量、9 接口、2 类型。 | 25 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts) |
| [`coordination`](/zh/api/mcp/coordination) | 用于使用该功能边界的公共契约与操作。Coordination 模块公开 1 类、3 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts) |
| [`governance`](/zh/api/mcp/governance) | 用于实施 Policy 与治理检查。Governance 模块公开 1 类、5 函数、3 接口、2 类型。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts) |
| [`index`](/zh/api/mcp/entrypoint) | 聚合 `@codesoul-co/hypha-mcp` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 32 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts) |
| [`oauth`](/zh/api/mcp/oauth) | 用于使用该功能边界的公共契约与操作。Oauth 模块公开 1 类、2 函数、5 接口。 | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-mcp` 包入口导出的公共 API。`packages/mcp/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
