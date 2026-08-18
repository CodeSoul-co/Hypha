# `@codesoul-co/hypha-skills` API

版本化 Skill 定义与渐进加载 Registry。

- 安装: `npm install @codesoul-co/hypha-skills@1.0.1`
- 入口导入: `import { ... } from '@codesoul-co/hypha-skills';`
- 公共导出: **51**
- 源码模块: **2**

## 导出概览

| 种类 | 数量 |
| --- | ---: |
| 类 | 7 |
| 常量 | 9 |
| 函数 | 6 |
| 接口 | 28 |
| 类型 | 1 |

## 源码模块

| 模块 | 用途 | 导出数 | 源码 |
| --- | --- | ---: | --- |
| [`index`](/zh/api/skills/entrypoint) | 聚合 `@codesoul-co/hypha-skills` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。 | 42 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts) |
| [`remote-registry`](/zh/api/skills/remote-registry) | 用于注册并解析版本化能力或实现。Remote registry 模块公开 1 类、8 接口。 | 9 | [source](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/remote-registry.ts) |

## 导入边界

本页只记录 `@codesoul-co/hypha-skills` 包入口导出的公共 API。`packages/skills/src` 中未由入口导出的实现不属于该 npm 包的公共契约。
