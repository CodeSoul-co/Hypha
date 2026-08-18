# `@codesoul-co/hypha-inference` API

Provider-neutral 推理请求、路由、控制与流式处理。

- 安装: `npm install @codesoul-co/hypha-inference@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-inference';`
- 公共导出: **151**
- 源码模块: **15**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 24 |
| 常量 | 8 |
| 函数 | 15 |
| 接口 | 81 |
| 类型 | 23 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`agent-prompts`](/zh/api/inference/agent-prompts) | 用于使用该功能边界的公共契约与操作。Agent prompts 模块公开 1 类、3 常量、2 函数、8 接口、2 类型。 | 16 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts) |
| [`backends`](/zh/api/inference/backends) | 用于使用该功能边界的公共契约与操作。Backends 模块公开 7 类、1 函数、3 接口。 | 11 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/backends.ts) |
| [`cache`](/zh/api/inference/cache) | 用于读写或协调缓存状态。Cache 模块公开 2 类、4 函数、3 接口、1 类型。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/cache.ts) |
| [`drivers`](/zh/api/inference/drivers) | 用于使用该功能边界的公共契约与操作。Drivers 模块公开 3 类、7 接口、4 类型。 | 14 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/drivers.ts) |
| [`manager`](/zh/api/inference/manager) | 用于使用该功能边界的公共契约与操作。Manager 模块公开 4 类、2 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/manager.ts) |
| [`pipeline`](/zh/api/inference/pipeline) | 用于使用该功能边界的公共契约与操作。Pipeline 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts) |
| [`plasmod`](/zh/api/inference/plasmod) | 用于使用该功能边界的公共契约与操作。Plasmod 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts) |
| [`prefix`](/zh/api/inference/prefix) | 用于使用该功能边界的公共契约与操作。Prefix 模块公开 1 类、1 函数。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts) |
| [`prompt`](/zh/api/inference/prompt) | 用于使用该功能边界的公共契约与操作。Prompt 模块公开 1 类、3 函数。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt.ts) |
| [`prompt-profile`](/zh/api/inference/prompt-profile) | 用于使用该功能边界的公共契约与操作。Prompt profile 模块公开 1 类、3 常量、9 接口、2 类型。 | 15 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prompt-profile.ts) |
| [`reasoning`](/zh/api/inference/reasoning) | 用于使用该功能边界的公共契约与操作。Reasoning 模块公开 1 类、6 接口、6 类型。 | 13 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning.ts) |
| [`reasoning-registry`](/zh/api/inference/reasoning-registry) | 用于注册并解析版本化能力或实现。Reasoning registry 模块公开 1 类、5 接口。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-registry.ts) |
| [`reasoning-sources`](/zh/api/inference/reasoning-sources) | 用于使用该功能边界的公共契约与操作。Reasoning sources 模块公开 2 常量、1 函数。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts) |
| [`recovery`](/zh/api/inference/recovery) | 用于处理有界恢复、重试或降级。Recovery 模块公开 3 函数、2 接口、1 类型。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/recovery.ts) |
| [`types`](/zh/api/inference/types) | 用于声明并运行时校验契约。Types 模块公开 34 接口、7 类型。 | 41 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/types.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-inference` 包入口导出的公共 API。`packages/inference/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
