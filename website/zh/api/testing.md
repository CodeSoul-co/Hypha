# `@codesoul-co/hypha-testing` API

Trace、Replay、Fixture 与确定性断言辅助工具。

- 模块指南: [`@codesoul-co/hypha-testing`](/zh/packages/testing)
- 安装: `npm install @codesoul-co/hypha-testing@1.0.1`
- 公共导出: **46**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 9 |
| 函数 | 7 |
| 接口 | 28 |
| 类型 | 2 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`evaluation`](/zh/api/testing/evaluation) | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts) |
| [`index`](/zh/api/testing/entrypoint) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/index.ts) |
| [`mock-execution-provider`](/zh/api/testing/mock-execution-provider) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/mock-execution-provider.ts) |
| [`regression`](/zh/api/testing/regression) | 7 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts) |
| [`replay`](/zh/api/testing/replay) | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/replay.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
