# `@codesoul-co/hypha-serving-cache` / `prefix-shape`

- 包索引: [`@codesoul-co/hypha-serving-cache`](/zh/api/serving-cache)
- 源码: [`packages/serving-cache/src/prefix-shape.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Prefix shape 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  PrefixCacheShapeTracker,
} from '@codesoul-co/hypha-serving-cache';

import type {
  PrefixCacheShapeInput,
} from '@codesoul-co/hypha-serving-cache';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `PrefixCacheShapeTracker` | 类 | <code>new PrefixCacheShapeTracker(maxSnapshots?: number): PrefixCacheShapeTracker</code> | Prefix Cache Shape Tracker 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `PrefixCacheShapeInput` | 接口 | <code>interface PrefixCacheShapeInput</code> | Prefix Cache Shape Input 接口，共包含 4 个公开字段或方法。 |

## `PrefixCacheShapeTracker`

Prefix Cache Shape Tracker 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { PrefixCacheShapeTracker } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`prefix-shape`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)

### 声明

```text
export declare class PrefixCacheShapeTracker {
    constructor(maxSnapshots?: number);
    observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(maxSnapshots?: number): PrefixCacheShapeTracker</code> | 创建该类的实例。 |
| `observe` | 方法 | <code>observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation</code> | 公开方法；参数与返回类型以签名列为准。 |

## `PrefixCacheShapeInput`

Prefix Cache Shape Input 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { PrefixCacheShapeInput } from '@codesoul-co/hypha-serving-cache';`
- 源码模块: [`prefix-shape`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)

### 声明

```text
export interface PrefixCacheShapeInput {
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixMetadata: PromptPrefixMetadata;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `model` | 属性 | <code>model: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prefixMetadata` | 属性 | <code>prefixMetadata: PromptPrefixMetadata</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: CacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
