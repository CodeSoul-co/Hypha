# `@codesoul-co/hypha-inference` / `plasmod`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/plasmod.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)
- Exports: **2**

## Using this module

Use the Plasmod module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  InMemoryPlasmodHotLayer,
} from '@codesoul-co/hypha-inference';

import type {
  InMemoryPlasmodHotLayerOptions,
} from '@codesoul-co/hypha-inference';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryPlasmodHotLayer` | class | <code>new InMemoryPlasmodHotLayer(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | In Memory Plasmod Hot Layer class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryPlasmodHotLayerOptions` | interface | <code>interface InMemoryPlasmodHotLayerOptions</code> | In Memory Plasmod Hot Layer Options interface with 6 public fields or methods. |

## `InMemoryPlasmodHotLayer`

In Memory Plasmod Hot Layer class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryPlasmodHotLayer } from '@codesoul-co/hypha-inference';`
- Source module: [`plasmod`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)

### Declaration

```text
export declare class InMemoryPlasmodHotLayer implements PlasmodHotLayer {
    constructor(nowOrOptions?: (() => Date) | InMemoryPlasmodHotLayerOptions);
    prepare(input: PlasmodHotLayerPrepareInput): Promise<PlasmodHotLayerPrepareResult>;
    invalidateSegment(segmentId: string, _reason: string): Promise<void>;
    getSessionState(stateId: string): PlasmodSessionState | null;
    getCacheMetadata(segmentId: string): PlasmodCacheMetadata | null;
    snapshot(): {
            prefixRegistrySize: number;
            cacheMetadataSize: number;
            sessionStateSize: number;
            invalidationGraphSize: number;
            segmentAliasSize: number;
            reuseKeySize: number;
        };
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | Creates an instance of this class. |
| `getCacheMetadata` | method | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `getSessionState` | method | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateSegment` | method | <code>invalidateSegment(segmentId: string, _reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `prepare` | method | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `snapshot` | method | <code>snapshot(): { prefixRegistrySize: number; cacheMetadataSize: number; sessionStateSize: number; invalidationGraphSize: number; segmentAliasSize: number; reuseKeySize: number; }</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryPlasmodHotLayerOptions`

In Memory Plasmod Hot Layer Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryPlasmodHotLayerOptions } from '@codesoul-co/hypha-inference';`
- Source module: [`plasmod`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)

### Declaration

```text
export interface InMemoryPlasmodHotLayerOptions {
    now?: () => Date;
    maxSegments?: number;
    maxSessionStates?: number;
    maxAliases?: number;
    maxReuseKeys?: number;
    maxDependenciesPerSegment?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxAliases` | property | <code>maxAliases?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDependenciesPerSegment` | property | <code>maxDependenciesPerSegment?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxReuseKeys` | property | <code>maxReuseKeys?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSegments` | property | <code>maxSegments?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSessionStates` | property | <code>maxSessionStates?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
