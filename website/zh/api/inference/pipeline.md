# `@codesoul-co/hypha-inference` / `pipeline`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 模块指南: [学习与组合说明](/zh/packages/inference)
- 源码: [`packages/inference/src/pipeline.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)
- 导出数: **2**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `HyphaInferencePipeline` | 类 | <code>new HyphaInferencePipeline(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | Hypha Inference Pipeline 的运行时实现；公开构造函数与成员见下表。 |
| `HyphaInferencePipelineOptions` | 接口 | <code>interface HyphaInferencePipelineOptions</code> | Hypha Inference Pipeline Options 的字段契约；完整字段见下表。 |

## `HyphaInferencePipeline` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | 创建该类的实例。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `infer` | 方法 | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | infer 的公开运行时操作。 |
| `stream` | 方法 | <code>stream(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | stream 的公开运行时操作。 |

## `HyphaInferencePipelineOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `backends` | 属性 | <code>backends: InferenceBackendRegistry</code> | backends 字段。 |
| `compiler` | 属性 | <code>compiler: PromptCompiler</code> | compiler 字段。 |
| `defaultBackendId` | 属性 | <code>defaultBackendId: string</code> | default Backend Id 字段。 |
| `hotLayer` | 属性 | <code>hotLayer: PlasmodHotLayer</code> | hot Layer 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `reusePolicy` | 属性 | <code>reusePolicy: PlasmodReusePolicy</code> | reuse Policy 字段。 |
| `segmenter` | 属性 | <code>segmenter: PrefixSegmenter</code> | segmenter 字段。 |
