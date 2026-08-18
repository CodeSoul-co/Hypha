# `@codesoul-co/hypha-inference` / `prefix`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/prefix.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)
- Exports: **2**

## Using this module

Use the Prefix module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function.

### Import from the package entrypoint

```ts
import {
  DefaultPrefixSegmenter,
  estimateTokenCount,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultPrefixSegmenter` | class | <code>new DefaultPrefixSegmenter(): DefaultPrefixSegmenter</code> | Default Prefix Segmenter class with 2 public constructor or member entries; its exact declarations are listed below. |
| `estimateTokenCount` | function | <code>estimateTokenCount(content: string): number</code> | Estimate Token Count function with 1 public call signature; parameters and return types are listed below. |

## `DefaultPrefixSegmenter`

Default Prefix Segmenter class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultPrefixSegmenter } from '@codesoul-co/hypha-inference';`
- Source module: [`prefix`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)

### Declaration

```text
export declare class DefaultPrefixSegmenter implements PrefixSegmenter {
    segment(prompt: CompiledPrompt): Promise<PrefixSegmentationResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultPrefixSegmenter</code> | Creates an instance of this class. |
| `segment` | method | <code>segment(prompt: CompiledPrompt): Promise&lt;PrefixSegmentationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `estimateTokenCount`

Estimate Token Count function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { estimateTokenCount } from '@codesoul-co/hypha-inference';`
- Source module: [`prefix`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/prefix.ts)

### Declaration

```text
export declare function estimateTokenCount(content: string): number;
```

### Call signature

```text
estimateTokenCount(content: string): number
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `number`
- Description: The return contract is defined by the type shown above.
