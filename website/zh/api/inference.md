# `@codesoul-co/hypha-inference` API

Provider-neutral 推理请求、路由、控制与流式处理。

- 模块指南: [`@codesoul-co/hypha-inference`](/zh/packages/inference)
- 安装: `npm install @codesoul-co/hypha-inference@1.0.1`
- 公共导出: **151**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 24 |
| 常量 | 8 |
| 函数 | 15 |
| 接口 | 81 |
| 类型 | 23 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`agent-prompts`](/zh/api/inference/agent-prompts) | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts) |
| [`backends`](/zh/api/inference/backends) | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts) |
| [`cache`](/zh/api/inference/cache) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts) |
| [`drivers`](/zh/api/inference/drivers) | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts) |
| [`manager`](/zh/api/inference/manager) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts) |
| [`pipeline`](/zh/api/inference/pipeline) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts) |
| [`plasmod`](/zh/api/inference/plasmod) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts) |
| [`prefix`](/zh/api/inference/prefix) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts) |
| [`prompt`](/zh/api/inference/prompt) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts) |
| [`prompt-profile`](/zh/api/inference/prompt-profile) | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts) |
| [`reasoning`](/zh/api/inference/reasoning) | 13 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts) |
| [`reasoning-registry`](/zh/api/inference/reasoning-registry) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts) |
| [`reasoning-sources`](/zh/api/inference/reasoning-sources) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts) |
| [`recovery`](/zh/api/inference/recovery) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts) |
| [`types`](/zh/api/inference/types) | 41 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
