# `@codesoul-co/hypha-core` / `modules/artifact/gc`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)
- Exports: **2**

## Using this module

Use the Gc module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function.

### Import from the package entrypoint

```ts
import {
  DefaultArtifactGarbageCollector,
  validateArtifactGarbageCollectionRequest,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultArtifactGarbageCollector` | class | <code>new DefaultArtifactGarbageCollector(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | Default Artifact Garbage Collector class with 2 public constructor or member entries; its exact declarations are listed below. |
| `validateArtifactGarbageCollectionRequest` | function | <code>validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest</code> | Validate Artifact Garbage Collection Request function with 1 public call signature; parameters and return types are listed below. |

## `DefaultArtifactGarbageCollector`

Default Artifact Garbage Collector class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultArtifactGarbageCollector } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)

### Declaration

```text
export declare class DefaultArtifactGarbageCollector implements ArtifactGarbageCollector {
    constructor(options: DefaultArtifactGarbageCollectorOptions);
    collect(input: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | Creates an instance of this class. |

## `validateArtifactGarbageCollectionRequest`

Validate Artifact Garbage Collection Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactGarbageCollectionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)

### Declaration

```text
export declare function validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest;
```

### Call signature

```text
validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>ArtifactGarbageCollectionRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactGarbageCollectionRequest`
- Description: The return contract is defined by the type shown above.
