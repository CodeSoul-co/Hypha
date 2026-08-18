# `@codesoul-co/hypha-memory` / `context-builder`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-builder.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)
- Exports: **4**

## Using this module

Use the Context builder module for using the public contracts and operations for this capability boundary. It exports 4 classes.

### Import from the package entrypoint

```ts
import {
  CalibratedCharacterTokenEstimator,
  DefaultContextInjectionGateway,
  DefaultMemoryContextBuilder,
  MetadataContextItemPolicyEvaluator,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CalibratedCharacterTokenEstimator` | class | <code>new CalibratedCharacterTokenEstimator(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | Calibrated Character Token Estimator class with 3 public constructor or member entries; its exact declarations are listed below. |
| `DefaultContextInjectionGateway` | class | <code>new DefaultContextInjectionGateway(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | Default Context Injection Gateway class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DefaultMemoryContextBuilder` | class | <code>new DefaultMemoryContextBuilder(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | Default Memory Context Builder class with 3 public constructor or member entries; its exact declarations are listed below. |
| `MetadataContextItemPolicyEvaluator` | class | <code>new MetadataContextItemPolicyEvaluator(): MetadataContextItemPolicyEvaluator</code> | Metadata Context Item Policy Evaluator class with 2 public constructor or member entries; its exact declarations are listed below. |

## `CalibratedCharacterTokenEstimator`

Calibrated Character Token Estimator class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { CalibratedCharacterTokenEstimator } from '@codesoul-co/hypha-memory';`
- Source module: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### Declaration

```text
export declare class CalibratedCharacterTokenEstimator implements TokenEstimator {
    readonly id = "tokenizer.calibrated-character-v1";
    constructor(charactersPerToken?: number);
    estimate(text: string): number;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | Creates an instance of this class. |
| `estimate` | method | <code>estimate(text: string): number</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: "tokenizer.calibrated-character-v1"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DefaultContextInjectionGateway`

Default Context Injection Gateway class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultContextInjectionGateway } from '@codesoul-co/hypha-memory';`
- Source module: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### Declaration

```text
export declare class DefaultContextInjectionGateway implements ContextInjectionGateway {
    constructor(now?: () => string, artifactStore?: ContextArtifactStore | undefined);
    buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise<ContextEnvelope>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildEnvelope` | method | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | Creates an instance of this class. |

## `DefaultMemoryContextBuilder`

Default Memory Context Builder class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultMemoryContextBuilder } from '@codesoul-co/hypha-memory';`
- Source module: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### Declaration

```text
export declare class DefaultMemoryContextBuilder implements MemoryContextBuilder {
    constructor(tokenizer?: TokenEstimator, now?: () => string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore | undefined);
    build(request: ContextBuildInput): Promise<ContextBundle>;
    explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | Creates an instance of this class. |
| `explain` | method | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MetadataContextItemPolicyEvaluator`

Metadata Context Item Policy Evaluator class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MetadataContextItemPolicyEvaluator } from '@codesoul-co/hypha-memory';`
- Source module: [`context-builder`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)

### Declaration

```text
export declare class MetadataContextItemPolicyEvaluator implements ContextItemPolicyEvaluator {
    evaluate(input: ContextItemPolicyInput): Promise<{
            allowed: boolean;
            reason?: string;
        }>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): MetadataContextItemPolicyEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;{ allowed: boolean; reason?: string; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
