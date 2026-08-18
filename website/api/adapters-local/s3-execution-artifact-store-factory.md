# `@codesoul-co/hypha-adapters-local` / `s3-execution-artifact-store-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/s3-execution-artifact-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)
- Exports: **2**

## Using this module

Use the S3 execution artifact store factory module for persisting and reading data at this boundary. It exports 1 class, 1 type.

### Import from the package entrypoint

```ts
import {
  S3ExecutionArtifactStoreFactory,
} from '@codesoul-co/hypha-adapters-local';

import type {
  S3ExecutionArtifactStoreFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `S3ExecutionArtifactStoreFactory` | class | <code>new S3ExecutionArtifactStoreFactory(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry. |
| `S3ExecutionArtifactStoreFactoryOptions` | type | <code>type S3ExecutionArtifactStoreFactoryOptions = Omit&lt;S3ExecutionArtifactStoreOptions, 'id'&gt; &amp; { providerId?: string; }</code> | Public type alias for S3 Execution Artifact Store Factory Options; the declaration contains its complete type expression. |

## `S3ExecutionArtifactStoreFactory`

Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry.

- Kind: class
- Import: `import { S3ExecutionArtifactStoreFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`s3-execution-artifact-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)

### Declaration

```text
export declare class S3ExecutionArtifactStoreFactory implements ArtifactStoreProviderFactory {
    readonly providerId: string;
    constructor(options: S3ExecutionArtifactStoreFactoryOptions);
    create(): ArtifactStoreProvider;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): ArtifactStoreProvider</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `S3ExecutionArtifactStoreFactoryOptions`

Public type alias for S3 Execution Artifact Store Factory Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { S3ExecutionArtifactStoreFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`s3-execution-artifact-store-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)

### Declaration

```text
export type S3ExecutionArtifactStoreFactoryOptions = Omit<S3ExecutionArtifactStoreOptions, 'id'> & {
    providerId?: string;
};
```
