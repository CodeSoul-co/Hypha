# `@codesoul-co/hypha-inference` / `pipeline`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/pipeline.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HyphaInferencePipeline` | class | <code>new HyphaInferencePipeline(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | Runtime implementation for Hypha Inference Pipeline; see its public constructor and members below. |
| `HyphaInferencePipelineOptions` | interface | <code>interface HyphaInferencePipelineOptions</code> | Field contract for Hypha Inference Pipeline Options; see all contract members below. |

## `HyphaInferencePipeline` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | Creates an instance of this class. |
| `id` | property | <code>id: string</code> | Public id property. |
| `infer` | method | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | Public runtime operation for infer. |
| `stream` | method | <code>stream(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public runtime operation for stream. |

## `HyphaInferencePipelineOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backends` | property | <code>backends: InferenceBackendRegistry</code> | Public backends property. |
| `compiler` | property | <code>compiler: PromptCompiler</code> | Public compiler property. |
| `defaultBackendId` | property | <code>defaultBackendId: string</code> | Public default Backend Id property. |
| `hotLayer` | property | <code>hotLayer: PlasmodHotLayer</code> | Public hot Layer property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `reusePolicy` | property | <code>reusePolicy: PlasmodReusePolicy</code> | Public reuse Policy property. |
| `segmenter` | property | <code>segmenter: PrefixSegmenter</code> | Public segmenter property. |
