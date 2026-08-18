# `@codesoul-co/hypha-inference` / `pipeline`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/pipeline.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)
- 导出数: **2**

## 模块用法

用于使用该功能边界的公共契约与操作。Pipeline 模块公开 1 类、1 接口。

### 从包入口导入

```ts
import {
  HyphaInferencePipeline,
} from '@codesoul-co/hypha-inference';

import type {
  HyphaInferencePipelineOptions,
} from '@codesoul-co/hypha-inference';
```

### 使用要点

- 1 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HyphaInferencePipeline` | 类 | <code>new HyphaInferencePipeline(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | Hypha Inference Pipeline 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `HyphaInferencePipelineOptions` | 接口 | <code>interface HyphaInferencePipelineOptions</code> | Hypha Inference Pipeline Options 接口，共包含 7 个公开字段或方法。 |

## `HyphaInferencePipeline`

Hypha Inference Pipeline 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { HyphaInferencePipeline } from '@codesoul-co/hypha-inference';`
- 源码模块: [`pipeline`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)

### 声明

```text
export declare class HyphaInferencePipeline implements InferenceProvider {
    readonly id: string;
    constructor(options?: HyphaInferencePipelineOptions);
    infer(request: InferenceRequest): Promise<InferenceResponse>;
    stream(request: InferenceRequest): AsyncIterable<InferenceResponse>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | 创建该类的实例。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `infer` | 方法 | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `stream` | 方法 | <code>stream(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `HyphaInferencePipelineOptions`

Hypha Inference Pipeline Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { HyphaInferencePipelineOptions } from '@codesoul-co/hypha-inference';`
- 源码模块: [`pipeline`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)

### 声明

```text
export interface HyphaInferencePipelineOptions {
    id?: string;
    defaultBackendId?: string;
    compiler?: PromptCompiler;
    segmenter?: PrefixSegmenter;
    hotLayer?: PlasmodHotLayer;
    backends?: InferenceBackendRegistry;
    reusePolicy?: PlasmodReusePolicy;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backends` | 属性 | <code>backends?: InferenceBackendRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compiler` | 属性 | <code>compiler?: PromptCompiler</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultBackendId` | 属性 | <code>defaultBackendId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hotLayer` | 属性 | <code>hotLayer?: PlasmodHotLayer</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reusePolicy` | 属性 | <code>reusePolicy?: PlasmodReusePolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `segmenter` | 属性 | <code>segmenter?: PrefixSegmenter</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
