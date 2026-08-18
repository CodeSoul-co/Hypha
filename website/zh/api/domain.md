# `@codesoul-co/hypha-domain` API

Domain Pack 校验及向运行时契约的编译。

- 模块指南: [`@codesoul-co/hypha-domain`](/zh/packages/domain)
- 安装: `npm install @codesoul-co/hypha-domain@1.0.1`
- 公共导出: **81**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 4 |
| 常量 | 32 |
| 函数 | 12 |
| 接口 | 25 |
| 类型 | 8 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`index`](/zh/api/domain/entrypoint) | 80 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts) |
| [`research-evidence-example`](/zh/api/domain/research-evidence-example) | 1 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/research-evidence-example.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
