# `@codesoul-co/hypha-serving-cache` / `prefix-shape`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/prefix-shape.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)
- Exports: **2**

## Using this module

Use the Prefix shape module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  PrefixCacheShapeTracker,
} from '@codesoul-co/hypha-serving-cache';

import type {
  PrefixCacheShapeInput,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PrefixCacheShapeTracker` | class | <code>new PrefixCacheShapeTracker(maxSnapshots?: number): PrefixCacheShapeTracker</code> | Prefix Cache Shape Tracker class with 2 public constructor or member entries; its exact declarations are listed below. |
| `PrefixCacheShapeInput` | interface | <code>interface PrefixCacheShapeInput</code> | Prefix Cache Shape Input interface with 4 public fields or methods. |

## `PrefixCacheShapeTracker`

Prefix Cache Shape Tracker class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { PrefixCacheShapeTracker } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`prefix-shape`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)

### Declaration

```text
export declare class PrefixCacheShapeTracker {
    constructor(maxSnapshots?: number);
    observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(maxSnapshots?: number): PrefixCacheShapeTracker</code> | Creates an instance of this class. |
| `observe` | method | <code>observe(input: PrefixCacheShapeInput): PrefixCacheShapeObservation</code> | Public method; parameters and return type are shown in the signature. |

## `PrefixCacheShapeInput`

Prefix Cache Shape Input interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { PrefixCacheShapeInput } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`prefix-shape`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/prefix-shape.ts)

### Declaration

```text
export interface PrefixCacheShapeInput {
    provider: string;
    model: string;
    scope?: CacheScope;
    prefixMetadata: PromptPrefixMetadata;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `model` | property | <code>model: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixMetadata` | property | <code>prefixMetadata: PromptPrefixMetadata</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: CacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
