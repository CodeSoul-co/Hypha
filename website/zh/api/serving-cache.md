# `@codesoul-co/hypha-serving-cache` API

Serving Cache Key、Store、Policy 与缓存协调。

- 模块指南: [`@codesoul-co/hypha-serving-cache`](/zh/packages/serving-cache)
- 安装: `npm install @codesoul-co/hypha-serving-cache@1.0.1`
- 公共导出: **64**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 8 |
| 接口 | 23 |
| 函数 | 15 |
| 常量 | 7 |
| 类型 | 11 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`cache-manager`](/zh/api/serving-cache/cache-manager) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/cache-manager.ts) |
| [`key`](/zh/api/serving-cache/key) | 6 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/key.ts) |
| [`middleware/llm-cache-middleware`](/zh/api/serving-cache/middleware/llm-cache-middleware) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/middleware/llm-cache-middleware.ts) |
| [`policies`](/zh/api/serving-cache/policies) | 4 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts) |
| [`prefix-shape`](/zh/api/serving-cache/prefix-shape) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts) |
| [`schemas`](/zh/api/serving-cache/schemas) | 10 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/schemas.ts) |
| [`stores/memory-store`](/zh/api/serving-cache/stores/memory-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/memory-store.ts) |
| [`stores/redis-store`](/zh/api/serving-cache/stores/redis-store) | 3 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/redis-store.ts) |
| [`stores/sqlite-store`](/zh/api/serving-cache/stores/sqlite-store) | 2 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/stores/sqlite-store.ts) |
| [`types`](/zh/api/serving-cache/types) | 29 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/types.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
