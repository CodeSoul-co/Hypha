# `@codesoul-co/hypha-inference` / `prefix`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/prefix.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Prefix 模块公开 1 类、1 函数。

### 从包入口导入

```ts
import {
  DefaultPrefixSegmenter,
  estimateTokenCount,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultPrefixSegmenter` | 类 | <code>new DefaultPrefixSegmenter(): DefaultPrefixSegmenter</code> | Default Prefix Segmenter 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `estimateTokenCount` | 函数 | <code>estimateTokenCount(content: string): number</code> | Estimate Token Count 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `DefaultPrefixSegmenter`

Default Prefix Segmenter 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultPrefixSegmenter } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prefix`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)

### 声明

```text
export declare class DefaultPrefixSegmenter implements PrefixSegmenter {
    segment(prompt: CompiledPrompt): Promise<PrefixSegmentationResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultPrefixSegmenter</code> | 创建该类的实例。 |
| `segment` | 方法 | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `estimateTokenCount`

Estimate Token Count 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { estimateTokenCount } from '@codesoul-co/hypha-inference';`
- 源码模块: [`prefix`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)

### 声明

```text
export declare function estimateTokenCount(content: string): number;
```

### 调用签名

```text
estimateTokenCount(content: string): number
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `content` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `number`
- 说明: 返回值契约由上述类型定义。
