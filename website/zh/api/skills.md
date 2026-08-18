# `@codesoul-co/hypha-skills` API

版本化 Skill 定义与渐进加载 Registry。

- 模块指南: [`@codesoul-co/hypha-skills`](/zh/packages/skills)
- 安装: `npm install @codesoul-co/hypha-skills@1.0.1`
- 公共导出: **50**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 7 |
| 常量 | 9 |
| 函数 | 5 |
| 接口 | 28 |
| 类型 | 1 |

## 源码模块

| 模块 | 导出数 | 源码 |
| --- | ---: | --- |
| [`index`](/zh/api/skills/entrypoint) | 41 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts) |
| [`remote-registry`](/zh/api/skills/remote-registry) | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts) |

## 阅读顺序

先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。

## 使用约定

- 从包入口导入，不依赖未导出的内部文件。
- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。
- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。
- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。
