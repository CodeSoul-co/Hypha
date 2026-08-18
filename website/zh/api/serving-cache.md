# `@codesoul-co/hypha-serving-cache` API

Serving Cache Key、Store、Policy 与缓存协调。

- 安装: `npm install @codesoul-co/hypha-serving-cache@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-serving-cache';`
- 公共导出: **64**
- 源码模块: **10**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 8 |
| 接口 | 23 |
| 函数 | 15 |
| 常量 | 7 |
| 类型 | 11 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`cache-manager`](/zh/api/serving-cache/cache-manager) | 用于读写或协调缓存状态。Cache manager 模块公开 2 类、1 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts) |
| [`key`](/zh/api/serving-cache/key) | 用于使用该功能边界的公共契约与操作。Key 模块公开 6 函数。 | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts) |
| [`middleware/llm-cache-middleware`](/zh/api/serving-cache/middleware/llm-cache-middleware) | 用于读写或协调缓存状态。Llm cache middleware 模块公开 1 类、2 函数。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts) |
| [`policies`](/zh/api/serving-cache/policies) | 用于使用该功能边界的公共契约与操作。Policies 模块公开 1 常量、3 函数。 | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts) |
| [`prefix-shape`](/zh/api/serving-cache/prefix-shape) | 用于使用该功能边界的公共契约与操作。Prefix shape 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts) |
| [`schemas`](/zh/api/serving-cache/schemas) | 用于声明并运行时校验契约。Schemas 模块公开 6 常量、4 函数。 | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts) |
| [`stores/memory-store`](/zh/api/serving-cache/stores/memory-store) | 用于持久化并读取该边界的数据。Memory store 模块公开 2 类。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts) |
| [`stores/redis-store`](/zh/api/serving-cache/stores/redis-store) | 用于持久化并读取该边界的数据。Redis store 模块公开 1 类、2 接口。 | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts) |
| [`stores/sqlite-store`](/zh/api/serving-cache/stores/sqlite-store) | 用于持久化并读取该边界的数据。Sqlite store 模块公开 1 类、1 接口。 | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts) |
| [`types`](/zh/api/serving-cache/types) | 用于声明并运行时校验契约。Types 模块公开 18 接口、11 类型。 | 29 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-serving-cache` 包入口导出的公共 API。`packages/serving-cache/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
