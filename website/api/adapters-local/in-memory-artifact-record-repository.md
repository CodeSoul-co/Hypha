# `@codesoul-co/hypha-adapters-local` / `in-memory-artifact-record-repository`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/in-memory-artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-artifact-record-repository.ts)
- Exports: **2**

## Using this module

Use the In memory artifact record repository module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  InMemoryArtifactRecordRepository,
} from '@codesoul-co/hypha-adapters-local';

import type {
  InMemoryArtifactRecordRepositoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryArtifactRecordRepository` | class | <code>new InMemoryArtifactRecordRepository(options?: InMemoryArtifactRecordRepositoryOptions): InMemoryArtifactRecordRepository</code> | In Memory Artifact Record Repository class with 12 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryArtifactRecordRepositoryOptions` | interface | <code>interface InMemoryArtifactRecordRepositoryOptions</code> | In Memory Artifact Record Repository Options interface with 2 public fields or methods. |

## `InMemoryArtifactRecordRepository`

In Memory Artifact Record Repository class with 12 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryArtifactRecordRepository } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-artifact-record-repository.ts)

### Declaration

```text
export declare class InMemoryArtifactRecordRepository implements ArtifactRecordRepository {
    readonly id: string;
    constructor(options?: InMemoryArtifactRecordRepositoryOptions);
    get(artifactId: string, versionId?: string): Promise<StoredArtifactRecord | null>;
    getByVersionId(versionId: string): Promise<StoredArtifactRecord | null>;
    list(): Promise<StoredArtifactRecord[]>;
    findIdempotency(operationId: string, idempotencyKey: string): Promise<StoredArtifactRecord | null>;
    commit(request: ArtifactRecordCommitRequest): Promise<void>;
    listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise<ArtifactGarbageCollectionCandidate[]>;
    claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise<boolean>;
    completeGarbageCollection(claimId: string, completedAt: string): Promise<void>;
    releaseGarbageCollection(claimId: string): Promise<void>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimGarbageCollection` | method | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `commit` | method | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `completeGarbageCollection` | method | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryArtifactRecordRepositoryOptions): InMemoryArtifactRecordRepository</code> | Creates an instance of this class. |
| `findIdempotency` | method | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getByVersionId` | method | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listGarbageCollectionCandidates` | method | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `releaseGarbageCollection` | method | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryArtifactRecordRepositoryOptions`

In Memory Artifact Record Repository Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryArtifactRecordRepositoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`in-memory-artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/in-memory-artifact-record-repository.ts)

### Declaration

```text
export interface InMemoryArtifactRecordRepositoryOptions {
    id?: string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
