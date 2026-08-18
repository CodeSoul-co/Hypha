# `@codesoul-co/hypha-tools` API

Tool 契约、Registry、受控执行与 Workspace 边界。

- 安装: `npm install @codesoul-co/hypha-tools@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-tools';`
- 公共导出: **263**
- 源码模块: **11**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 21 |
| 常量 | 76 |
| 函数 | 26 |
| 接口 | 120 |
| 类型 | 20 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`adapter-factory`](/zh/api/tools/adapter-factory) | 用于把外部或本地 Provider 绑定到 Hypha Port。Adapter factory 模块公开 2 类、3 常量、3 函数、8 接口、1 类型。 | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts) |
| [`common-tool-catalog`](/zh/api/tools/common-tool-catalog) | 用于注册并解析版本化能力或实现。Common tool catalog 模块公开 2 常量、2 函数、1 类型。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts) |
| [`common-tool-ports`](/zh/api/tools/common-tool-ports) | 用于定义或实现 Provider-neutral Port。Common tool ports 模块公开 9 常量、1 函数、4 接口。 | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts) |
| [`common-tools`](/zh/api/tools/common-tools) | 用于使用该功能边界的公共契约与操作。Common tools 模块公开 6 常量、5 函数、2 接口、4 类型。 | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts) |
| [`contracts`](/zh/api/tools/contracts) | 用于声明并运行时校验契约。Contracts 模块公开 38 常量、4 函数、32 接口、2 类型。 | 76 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts) |
| [`execution-adapter`](/zh/api/tools/execution-adapter) | 用于把外部或本地 Provider 绑定到 Hypha Port。Execution adapter 模块公开 2 类、1 常量、3 函数、10 接口、2 类型。 | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts) |
| [`index`](/zh/api/tools/entrypoint) | 聚合 `@codesoul-co/hypha-tools` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 85 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts) |
| [`media`](/zh/api/tools/media) | 用于声明 Tool 的文本、图像、音频与二进制输入输出。Media 模块公开 4 常量、2 函数、10 接口、2 类型。 | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts) |
| [`secrets`](/zh/api/tools/secrets) | 用于传递受控 Secret 引用与解析契约。Secrets 模块公开 5 接口。 | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts) |
| [`tool-families`](/zh/api/tools/tool-families) | 用于使用该功能边界的公共契约与操作。Tool families 模块公开 1 常量、1 函数、2 接口。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts) |
| [`workspace`](/zh/api/tools/workspace) | 用于声明并实施 Workspace 作用域边界。Workspace 模块公开 3 接口、1 类型。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-tools` 包入口导出的公共 API。`packages/tools/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
