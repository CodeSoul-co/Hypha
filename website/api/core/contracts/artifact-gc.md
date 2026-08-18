# `@codesoul-co/hypha-core` / `contracts/artifact-gc`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact-gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)
- Exports: **8**

## Using this module

Use the Artifact gc module for declaring and runtime-validating contracts. It exports 8 interfaces.

### Import from the package entrypoint

```ts
import type {
  ArtifactGarbageCollectionCandidate,
  ArtifactGarbageCollectionClaimRequest,
  ArtifactGarbageCollectionFailure,
  ArtifactGarbageCollectionRequest,
  ArtifactGarbageCollectionResult,
  ArtifactGarbageCollectionScanRequest,
  ArtifactGarbageCollector,
  DefaultArtifactGarbageCollectorOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactGarbageCollectionCandidate` | interface | <code>interface ArtifactGarbageCollectionCandidate</code> | Artifact Garbage Collection Candidate interface with 5 public fields or methods. |
| `ArtifactGarbageCollectionClaimRequest` | interface | <code>interface ArtifactGarbageCollectionClaimRequest</code> | Artifact Garbage Collection Claim Request interface with 4 public fields or methods. |
| `ArtifactGarbageCollectionFailure` | interface | <code>interface ArtifactGarbageCollectionFailure</code> | Artifact Garbage Collection Failure interface with 4 public fields or methods. |
| `ArtifactGarbageCollectionRequest` | interface | <code>interface ArtifactGarbageCollectionRequest</code> | Artifact Garbage Collection Request interface with 4 public fields or methods. |
| `ArtifactGarbageCollectionResult` | interface | <code>interface ArtifactGarbageCollectionResult</code> | Artifact Garbage Collection Result interface with 12 public fields or methods. |
| `ArtifactGarbageCollectionScanRequest` | interface | <code>interface ArtifactGarbageCollectionScanRequest</code> | Artifact Garbage Collection Scan Request interface with 2 public fields or methods. |
| `ArtifactGarbageCollector` | interface | <code>interface ArtifactGarbageCollector</code> | Artifact Garbage Collector interface with 1 public fields or methods. |
| `DefaultArtifactGarbageCollectorOptions` | interface | <code>interface DefaultArtifactGarbageCollectorOptions</code> | Default Artifact Garbage Collector Options interface with 5 public fields or methods. |

## `ArtifactGarbageCollectionCandidate`

Artifact Garbage Collection Candidate interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollectionCandidate } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollectionCandidate {
    storageRef: ArtifactStorageRef;
    contentHash: string;
    sizeBytes: number;
    versionIds: string[];
    profileRefs: SpecRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRefs` | property | <code>profileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionIds` | property | <code>versionIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGarbageCollectionClaimRequest`

Artifact Garbage Collection Claim Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollectionClaimRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollectionClaimRequest {
    claimId: string;
    claimedAt: string;
    staleBefore: string;
    candidate: ArtifactGarbageCollectionCandidate;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: ArtifactGarbageCollectionCandidate</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimedAt` | property | <code>claimedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimId` | property | <code>claimId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `staleBefore` | property | <code>staleBefore: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGarbageCollectionFailure`

Artifact Garbage Collection Failure interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollectionFailure } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollectionFailure {
    storageRef: ArtifactStorageRef;
    code: string;
    message: string;
    retryable: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGarbageCollectionRequest`

Artifact Garbage Collection Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollectionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollectionRequest {
    operationId: string;
    dryRun?: boolean;
    limit?: number;
    claimTtlSeconds?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimTtlSeconds` | property | <code>claimTtlSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dryRun` | property | <code>dryRun?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGarbageCollectionResult`

Artifact Garbage Collection Result interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollectionResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollectionResult {
    operationId: string;
    dryRun: boolean;
    candidateObjects: number;
    claimedObjects: number;
    deletedObjects: number;
    missingObjects: number;
    skippedPolicyObjects: number;
    skippedConcurrentObjects: number;
    reclaimedBytes: number;
    failures: ArtifactGarbageCollectionFailure[];
    startedAt: string;
    completedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidateObjects` | property | <code>candidateObjects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `claimedObjects` | property | <code>claimedObjects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deletedObjects` | property | <code>deletedObjects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dryRun` | property | <code>dryRun: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failures` | property | <code>failures: ArtifactGarbageCollectionFailure[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingObjects` | property | <code>missingObjects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reclaimedBytes` | property | <code>reclaimedBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skippedConcurrentObjects` | property | <code>skippedConcurrentObjects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skippedPolicyObjects` | property | <code>skippedPolicyObjects: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGarbageCollectionScanRequest`

Artifact Garbage Collection Scan Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollectionScanRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollectionScanRequest {
    limit?: number;
    staleBefore: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `limit` | property | <code>limit?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `staleBefore` | property | <code>staleBefore: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGarbageCollector`

Artifact Garbage Collector interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGarbageCollector } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface ArtifactGarbageCollector {
    collect(request: ArtifactGarbageCollectionRequest): Promise<ArtifactGarbageCollectionResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(request: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultArtifactGarbageCollectorOptions`

Default Artifact Garbage Collector Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { DefaultArtifactGarbageCollectorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-gc`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-gc.ts)

### Declaration

```text
export interface DefaultArtifactGarbageCollectorOptions {
    profiles: ArtifactProfileSpec[];
    stores: ArtifactStoreProvider[];
    repository: ArtifactRecordRepository;
    idGenerator: () => string;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `idGenerator` | method | <code>idGenerator(): string</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `profiles` | property | <code>profiles: ArtifactProfileSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `repository` | property | <code>repository: ArtifactRecordRepository</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stores` | property | <code>stores: ArtifactStoreProvider[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
