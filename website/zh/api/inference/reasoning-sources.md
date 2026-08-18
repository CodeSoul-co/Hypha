# `@codesoul-co/hypha-inference` / `reasoning-sources`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/reasoning-sources.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)
- 导出数: **3**

## 模块用法

用于使用该功能边界的公共契约与操作。Reasoning sources 模块公开 2 常量、1 函数。

### 从包入口导入

```ts
import {
  BUILT_IN_REASONING_STRATEGY_DESCRIPTORS,
  REACT_OFFICIAL_REFERENCES,
  builtInReasoningDescriptor,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 2 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `BUILT_IN_REASONING_STRATEGY_DESCRIPTORS` | 常量 | <code>const BUILT_IN_REASONING_STRATEGY_DESCRIPTORS: ReasoningStrategyDescriptor[]</code> | 由 `reasoning-sources` 模块导出的 BUILT IN REASONING STRATEGY DESCRIPTORS 常量。 |
| `REACT_OFFICIAL_REFERENCES` | 常量 | <code>const REACT_OFFICIAL_REFERENCES: ReasoningStrategyReference[]</code> | 由 `reasoning-sources` 模块导出的 REACT OFFICIAL REFERENCES 常量。 |
| `builtInReasoningDescriptor` | 函数 | <code>builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor</code> | Built In Reasoning Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `BUILT_IN_REASONING_STRATEGY_DESCRIPTORS`

由 `reasoning-sources` 模块导出的 BUILT IN REASONING STRATEGY DESCRIPTORS 常量。

- 种类: 常量
- 导入: `import { BUILT_IN_REASONING_STRATEGY_DESCRIPTORS } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-sources`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)

### 声明

```text
export declare const BUILT_IN_REASONING_STRATEGY_DESCRIPTORS: ReasoningStrategyDescriptor[];
```

## `REACT_OFFICIAL_REFERENCES`

由 `reasoning-sources` 模块导出的 REACT OFFICIAL REFERENCES 常量。

- 种类: 常量
- 导入: `import { REACT_OFFICIAL_REFERENCES } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-sources`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)

### 声明

```text
export declare const REACT_OFFICIAL_REFERENCES: ReasoningStrategyReference[];
```

## `builtInReasoningDescriptor`

Built In Reasoning Descriptor 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { builtInReasoningDescriptor } from '@codesoul-co/hypha-inference';`
- 源码模块: [`reasoning-sources`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/reasoning-sources.ts)

### 声明

```text
export declare function builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor;
```

### 调用签名

```text
builtInReasoningDescriptor(id: string): ReasoningStrategyDescriptor
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `id` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReasoningStrategyDescriptor`
- 说明: 返回值契约由上述类型定义。
