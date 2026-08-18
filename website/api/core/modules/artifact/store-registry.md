# `@codesoul-co/hypha-core` / `modules/artifact/store-registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/store-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store-registry.ts)
- Exports: **2**

## Using this module

Use the Store registry module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  ArtifactStoreProviderRegistry,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactStoreProviderRegistration,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactStoreProviderRegistry` | class | <code>new ArtifactStoreProviderRegistry(): ArtifactStoreProviderRegistry</code> | Provider-neutral DI registry for Artifact Stores. Core owns selection and lifecycle validation without importing a concrete storage adapter. |
| `ArtifactStoreProviderRegistration` | interface | <code>interface ArtifactStoreProviderRegistration</code> | Artifact Store Provider Registration interface with 1 public fields or methods. |

## `ArtifactStoreProviderRegistry`

Provider-neutral DI registry for Artifact Stores. Core owns selection and lifecycle validation without importing a concrete storage adapter.

- Kind: class
- Import: `import { ArtifactStoreProviderRegistry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store-registry.ts)

### Declaration

```text
export declare class ArtifactStoreProviderRegistry {
    register(factory: ArtifactStoreProviderFactory): void;
    unregister(providerId: string): boolean;
    list(): ArtifactStoreProviderRegistration[];
    resolve(providerId: string): ArtifactStoreProviderFactory;
    create(providerId: string): Promise<ArtifactStoreProvider>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ArtifactStoreProviderRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(providerId: string): Promise&lt;ArtifactStoreProvider&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): ArtifactStoreProviderRegistration[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(factory: ArtifactStoreProviderFactory): void</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(providerId: string): ArtifactStoreProviderFactory</code> | Public method; parameters and return type are shown in the signature. |
| `unregister` | method | <code>unregister(providerId: string): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactStoreProviderRegistration`

Artifact Store Provider Registration interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactStoreProviderRegistration } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store-registry.ts)

### Declaration

```text
export interface ArtifactStoreProviderRegistration {
    providerId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
