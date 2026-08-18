# `@codesoul-co/hypha-mcp` API

MCP 集成 Spec、Client、Policy 与生命周期管理。

- 模块指南: [`@codesoul-co/hypha-mcp`](/zh/packages/mcp)
- 安装: `npm install @codesoul-co/hypha-mcp@1.0.1`
- 公共导出: **122**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 12 |
| 常量 | 32 |
| 函数 | 14 |
| 接口 | 56 |
| 类型 | 8 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`catalog`](/zh/api/mcp/catalog) | 24 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/catalog.ts) |
| [`connection-manager`](/zh/api/mcp/connection-manager) | 18 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/connection-manager.ts) |
| [`contracts`](/zh/api/mcp/contracts) | 25 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/contracts.ts) |
| [`coordination`](/zh/api/mcp/coordination) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/coordination.ts) |
| [`governance`](/zh/api/mcp/governance) | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts) |
| [`index`](/zh/api/mcp/entrypoint) | 32 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/index.ts) |
| [`oauth`](/zh/api/mcp/oauth) | 8 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/oauth.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
