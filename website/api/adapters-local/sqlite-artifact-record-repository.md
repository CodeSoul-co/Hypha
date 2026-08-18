# `@codesoul-co/hypha-adapters-local` / `sqlite-artifact-record-repository`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-artifact-record-repository.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)
- Exports: **2**

## Using this module

Use the Sqlite artifact record repository module for persisting and reading data at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SQLiteArtifactRecordRepository,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SQLiteArtifactRecordRepositoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteArtifactRecordRepository` | class | <code>new SQLiteArtifactRecordRepository(options: SQLiteArtifactRecordRepositoryOptions): SQLiteArtifactRecordRepository</code> | SQLite Artifact Record Repository class with 14 public constructor or member entries; its exact declarations are listed below. |
| `SQLiteArtifactRecordRepositoryOptions` | interface | <code>interface SQLiteArtifactRecordRepositoryOptions</code> | SQLite Artifact Record Repository Options interface with 5 public fields or methods. |

## `SQLiteArtifactRecordRepository`

SQLite Artifact Record Repository class with 14 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SQLiteArtifactRecordRepository } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)

### Declaration

```text
export declare class SQLiteArtifactRecordRepository implements ArtifactRecordRepository {
    readonly id: string;
    readonly filename: string;
    constructor(options: SQLiteArtifactRecordRepositoryOptions);
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
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimGarbageCollection` | method | <code>claimGarbageCollection(request: ArtifactGarbageCollectionClaimRequest): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `commit` | method | <code>commit(request: ArtifactRecordCommitRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `completeGarbageCollection` | method | <code>completeGarbageCollection(claimId: string, completedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SQLiteArtifactRecordRepositoryOptions): SQLiteArtifactRecordRepository</code> | Creates an instance of this class. |
| `filename` | property | <code>readonly filename: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `findIdempotency` | method | <code>findIdempotency(operationId: string, idempotencyKey: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(artifactId: string, versionId?: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getByVersionId` | method | <code>getByVersionId(versionId: string): Promise&lt;StoredArtifactRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `list` | method | <code>list(): Promise&lt;StoredArtifactRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listGarbageCollectionCandidates` | method | <code>listGarbageCollectionCandidates(request: ArtifactGarbageCollectionScanRequest): Promise&lt;ArtifactGarbageCollectionCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `releaseGarbageCollection` | method | <code>releaseGarbageCollection(claimId: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SQLiteArtifactRecordRepositoryOptions`

SQLite Artifact Record Repository Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { SQLiteArtifactRecordRepositoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-artifact-record-repository`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-artifact-record-repository.ts)

### Declaration

```text
export interface SQLiteArtifactRecordRepositoryOptions {
    rootPath: string;
    filename?: string;
    id?: string;
    busyTimeoutMs?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `busyTimeoutMs` | property | <code>busyTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `filename` | property | <code>filename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `rootPath` | property | <code>rootPath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
