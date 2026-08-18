# `@codesoul-co/hypha-tools` API

Tool 契约、Registry、受控执行与 Workspace 边界。

- 模块指南: [`@codesoul-co/hypha-tools`](/zh/packages/tools)
- 安装: `npm install @codesoul-co/hypha-tools@1.0.1`
- 公共导出: **263**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 21 |
| 常量 | 76 |
| 函数 | 26 |
| 接口 | 120 |
| 类型 | 20 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`adapter-factory`](/zh/api/tools/adapter-factory) | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts) |
| [`common-tool-catalog`](/zh/api/tools/common-tool-catalog) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts) |
| [`common-tool-ports`](/zh/api/tools/common-tool-ports) | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts) |
| [`common-tools`](/zh/api/tools/common-tools) | 17 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts) |
| [`contracts`](/zh/api/tools/contracts) | 76 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/contracts.ts) |
| [`execution-adapter`](/zh/api/tools/execution-adapter) | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/execution-adapter.ts) |
| [`index`](/zh/api/tools/entrypoint) | 85 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/index.ts) |
| [`media`](/zh/api/tools/media) | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts) |
| [`secrets`](/zh/api/tools/secrets) | 5 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/secrets.ts) |
| [`tool-families`](/zh/api/tools/tool-families) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts) |
| [`workspace`](/zh/api/tools/workspace) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
