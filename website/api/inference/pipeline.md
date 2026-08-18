# `@codesoul-co/hypha-inference` / `pipeline`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/pipeline.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)
- Exports: **2**

## Using this module

Use the Pipeline module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  HyphaInferencePipeline,
} from '@codesoul-co/hypha-inference';

import type {
  HyphaInferencePipelineOptions,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `HyphaInferencePipeline` | class | <code>new HyphaInferencePipeline(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | Hypha Inference Pipeline class with 4 public constructor or member entries; its exact declarations are listed below. |
| `HyphaInferencePipelineOptions` | interface | <code>interface HyphaInferencePipelineOptions</code> | Hypha Inference Pipeline Options interface with 7 public fields or methods. |

## `HyphaInferencePipeline`

Hypha Inference Pipeline class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { HyphaInferencePipeline } from '@codesoul-co/hypha-inference';`
- Source module: [`pipeline`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)

### Declaration

```text
export declare class HyphaInferencePipeline implements InferenceProvider {
    readonly id: string;
    constructor(options?: HyphaInferencePipelineOptions);
    infer(request: InferenceRequest): Promise<InferenceResponse>;
    stream(request: InferenceRequest): AsyncIterable<InferenceResponse>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: HyphaInferencePipelineOptions): HyphaInferencePipeline</code> | Creates an instance of this class. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `infer` | method | <code>infer(request: InferenceRequest): Promise&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream(request: InferenceRequest): AsyncIterable&lt;InferenceResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `HyphaInferencePipelineOptions`

Hypha Inference Pipeline Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { HyphaInferencePipelineOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`pipeline`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/pipeline.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `backends` | property | <code>backends?: InferenceBackendRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compiler` | property | <code>compiler?: PromptCompiler</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultBackendId` | property | <code>defaultBackendId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hotLayer` | property | <code>hotLayer?: PlasmodHotLayer</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reusePolicy` | property | <code>reusePolicy?: PlasmodReusePolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `segmenter` | property | <code>segmenter?: PrefixSegmenter</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
