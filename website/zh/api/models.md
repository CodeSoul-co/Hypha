# `@codesoul-co/hypha-models` API

模型 Provider Registry、路由与确定性 Mock Provider。

- 模块指南: [`@codesoul-co/hypha-models`](/zh/packages/models)
- 安装: `npm install @codesoul-co/hypha-models@1.0.1`
- 公共导出: **55**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 8 |
| 常量 | 16 |
| 函数 | 8 |
| 接口 | 21 |
| 类型 | 2 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`index`](/zh/api/models/entrypoint) | 36 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts) |
| [`providers`](/zh/api/models/providers) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/providers.ts) |
| [`router`](/zh/api/models/router) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/router.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
