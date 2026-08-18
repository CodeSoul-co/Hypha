# `@codesoul-co/hypha-kernel` API

ReAct Agent Spec 与 Kernel 组合契约。

- 模块指南: [`@codesoul-co/hypha-kernel`](/zh/packages/kernel)
- 安装: `npm install @codesoul-co/hypha-kernel@1.0.1`
- 公共导出: **85**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 12 |
| 常量 | 21 |
| 函数 | 8 |
| 接口 | 39 |
| 类型 | 5 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`index`](/zh/api/kernel/entrypoint) | 85 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
