# `@codesoul-co/hypha-core` / `contracts/execution-cache`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)
- Exports: **21**

## Using this module

Use the Execution cache module for declaring and runtime-validating contracts. It exports 15 interfaces, 6 types.

### Import from the package entrypoint

```ts
import type {
  ExecutionCacheArtifactReference,
  ExecutionCacheArtifactVerifier,
  ExecutionCacheEntryProjection,
  ExecutionCacheEvent,
  ExecutionCacheLookupInput,
  ExecutionCacheRecord,
  ExecutionCacheResultMetadata,
  ExecutionCacheReuseAssessmentInput,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 21 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionCacheArtifactReference` | interface | <code>interface ExecutionCacheArtifactReference</code> | Execution Cache Artifact Reference interface with 2 public fields or methods. |
| `ExecutionCacheArtifactVerifier` | interface | <code>interface ExecutionCacheArtifactVerifier</code> | Execution Cache Artifact Verifier interface with 1 public fields or methods. |
| `ExecutionCacheEntryProjection` | interface | <code>interface ExecutionCacheEntryProjection</code> | Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope. |
| `ExecutionCacheEvent` | interface | <code>interface ExecutionCacheEvent</code> | Execution Cache Event interface with 5 public fields or methods. |
| `ExecutionCacheLookupInput` | interface | <code>interface ExecutionCacheLookupInput</code> | Execution Cache Lookup Input interface with 5 public fields or methods. |
| `ExecutionCacheRecord` | interface | <code>interface ExecutionCacheRecord</code> | Versioned envelope persisted by an Execution Result Cache store. |
| `ExecutionCacheResultMetadata` | interface | <code>interface ExecutionCacheResultMetadata</code> | Bounded result fields allowed in a Cache entry. |
| `ExecutionCacheReuseAssessmentInput` | interface | <code>interface ExecutionCacheReuseAssessmentInput</code> | Execution Cache Reuse Assessment Input interface with 2 public fields or methods. |
| `ExecutionCacheScope` | interface | <code>interface ExecutionCacheScope</code> | Mandatory ownership boundary for persisted Execution Cache records. |
| `ExecutionCacheStore` | interface | <code>interface ExecutionCacheStore</code> | Execution Cache Store interface with 5 public fields or methods. |
| `ExecutionCacheValidityInput` | interface | <code>interface ExecutionCacheValidityInput</code> | Exact Execution-owned validity input consumed by Cache integrations. |
| `ExecutionCacheWriteInput` | interface | <code>interface ExecutionCacheWriteInput extends ExecutionCacheLookupInput</code> | Execution Cache Write Input interface with 7 public fields or methods. |
| `ExecutionCommandFingerprintInput` | interface | <code>interface ExecutionCommandFingerprintInput</code> | Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded. |
| `ExecutionEnvironmentFingerprint` | interface | <code>interface ExecutionEnvironmentFingerprint</code> | Resolved environment facts used to prove that a cache key is stable. |
| `ExecutionFingerprintHasher` | interface | <code>interface ExecutionFingerprintHasher</code> | Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string. |
| `ExecutionCacheFailureMode` | type | <code>type ExecutionCacheFailureMode = 'bypass' &#124; 'strict'</code> | Public type alias for Execution Cache Failure Mode; the declaration contains its complete type expression. |
| `ExecutionCacheLookupResult` | type | <code>type ExecutionCacheLookupResult = { hit: true; key: string; projection: ExecutionCacheEntryProjection; ageMs: number; } &#124; { hit: false; reason: ExecutionCacheMissReason; key?: string; }</code> | Public type alias for Execution Cache Lookup Result; the declaration contains its complete type expression. |
| `ExecutionCacheMissReason` | type | <code>type ExecutionCacheMissReason = 'not_found' &#124; 'expired' &#124; 'scope_mismatch' &#124; 'key_mismatch' &#124; 'validity_changed' &#124; 'artifact_verification_unavailable' &#124; 'artifact_verification_failed' &#124; 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect' &#124; 'not_cacheable_status' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Public type alias for Execution Cache Miss Reason; the declaration contains its complete type expression. |
| `ExecutionCacheReuseAssessment` | type | <code>type ExecutionCacheReuseAssessment = { reusable: true; } &#124; { reusable: false; reason: ExecutionCacheReuseBlockReason; }</code> | Public type alias for Execution Cache Reuse Assessment; the declaration contains its complete type expression. |
| `ExecutionCacheReuseBlockReason` | type | <code>type ExecutionCacheReuseBlockReason = 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect'</code> | Public type alias for Execution Cache Reuse Block Reason; the declaration contains its complete type expression. |
| `ExecutionEnvironmentFingerprintResolution` | type | <code>type ExecutionEnvironmentFingerprintResolution = { status: 'resolved'; fingerprint: ExecutionEnvironmentFingerprint; } &#124; { status: 'unavailable'; reason: string; }</code> | Public type alias for Execution Environment Fingerprint Resolution; the declaration contains its complete type expression. |

## `ExecutionCacheArtifactReference`

Execution Cache Artifact Reference interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheArtifactReference } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheArtifactReference {
    artifactRef: string;
    contentHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheArtifactVerifier`

Execution Cache Artifact Verifier interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheArtifactVerifier } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheArtifactVerifier {
    verify(scope: ExecutionCacheScope, artifacts: ExecutionCacheArtifactReference[]): Promise<boolean>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(scope: ExecutionCacheScope, artifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionCacheEntryProjection`

Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope.

- Kind: interface
- Import: `import type { ExecutionCacheEntryProjection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheEntryProjection {
    commandHash: string;
    validityHash: string;
    validity: ExecutionCacheValidityInput;
    resultMetadata: ExecutionCacheResultMetadata;
    artifacts: ExecutionCacheArtifactReference[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ExecutionCacheArtifactReference[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandHash` | property | <code>commandHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resultMetadata` | property | <code>resultMetadata: ExecutionCacheResultMetadata</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validity` | property | <code>validity: ExecutionCacheValidityInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validityHash` | property | <code>validityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheEvent`

Execution Cache Event interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheEvent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheEvent {
    type: 'execution.cache.lookup' | 'execution.cache.hit' | 'execution.cache.miss' | 'execution.cache.write' | 'execution.cache.invalidate' | 'execution.cache.bypass';
    key?: string;
    scope: ExecutionCacheScope;
    reason?: ExecutionCacheMissReason;
    ageMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ageMs` | property | <code>ageMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: ExecutionCacheMissReason</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "execution.cache.lookup" &#124; "execution.cache.hit" &#124; "execution.cache.miss" &#124; "execution.cache.write" &#124; "execution.cache.invalidate" &#124; "execution.cache.bypass"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheLookupInput`

Execution Cache Lookup Input interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheLookupInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheLookupInput {
    scope: ExecutionCacheScope;
    command: ExecutionCommandFingerprintInput;
    validity: ExecutionCacheValidityInput;
    sideEffectLevel: SideEffectLevel;
    environmentFingerprintStatus: ExecutionEnvironmentFingerprintResolution['status'];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: ExecutionCommandFingerprintInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentFingerprintStatus` | property | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validity` | property | <code>validity: ExecutionCacheValidityInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheRecord`

Versioned envelope persisted by an Execution Result Cache store.

- Kind: interface
- Import: `import type { ExecutionCacheRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheRecord {
    schemaVersion: '1.0';
    keyVersion: '1';
    key: string;
    scope: ExecutionCacheScope;
    projection: ExecutionCacheEntryProjection;
    createdAt: number;
    expiresAt?: number;
    sizeBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `keyVersion` | property | <code>keyVersion: "1"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: ExecutionCacheEntryProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheResultMetadata`

Bounded result fields allowed in a Cache entry.

- Kind: interface
- Import: `import type { ExecutionCacheResultMetadata } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheResultMetadata {
    executionId: string;
    status: CommandExecutionStatus;
    exitCode: number | null;
    signal?: string;
    resourceUsage?: ExecutionResourceUsage;
    providerReceiptHash?: string;
    startedAt: string;
    completedAt?: string;
    latencyMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exitCode` | property | <code>exitCode: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerReceiptHash` | property | <code>providerReceiptHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceUsage` | property | <code>resourceUsage?: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheReuseAssessmentInput`

Execution Cache Reuse Assessment Input interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheReuseAssessmentInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheReuseAssessmentInput {
    sideEffectLevel: SideEffectLevel;
    environmentFingerprintStatus: ExecutionEnvironmentFingerprintResolution['status'];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `environmentFingerprintStatus` | property | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheScope`

Mandatory ownership boundary for persisted Execution Cache records.

- Kind: interface
- Import: `import type { ExecutionCacheScope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheScope {
    tenantId?: string;
    userId: string;
    workspaceId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheStore`

Execution Cache Store interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheStore } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheStore {
    get(key: string): Promise<ExecutionCacheRecord | null>;
    set(key: string, record: ExecutionCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    clear?(): Promise<void>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, record: ExecutionCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionCacheValidityInput`

Exact Execution-owned validity input consumed by Cache integrations.

- Kind: interface
- Import: `import type { ExecutionCacheValidityInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheValidityInput {
    executable: string;
    argsHash: string;
    sourceTreeHash: string;
    workspaceSnapshotHash?: string;
    environmentHash: string;
    imageDigest?: string;
    dependencyLockHash?: string;
    networkPolicyHash: string;
    secretVersionSetHash?: string;
    commandPolicyRevision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `argsHash` | property | <code>argsHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `commandPolicyRevision` | property | <code>commandPolicyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencyLockHash` | property | <code>dependencyLockHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executable` | property | <code>executable: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imageDigest` | property | <code>imageDigest?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretVersionSetHash` | property | <code>secretVersionSetHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceSnapshotHash` | property | <code>workspaceSnapshotHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCacheWriteInput`

Execution Cache Write Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionCacheWriteInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCacheWriteInput extends ExecutionCacheLookupInput {
    projection: ExecutionCacheEntryProjection;
    ttlMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: ExecutionCommandFingerprintInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentFingerprintStatus` | property | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: ExecutionCacheEntryProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ttlMs` | property | <code>ttlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validity` | property | <code>validity: ExecutionCacheValidityInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionCommandFingerprintInput`

Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded.

- Kind: interface
- Import: `import type { ExecutionCommandFingerprintInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionCommandFingerprintInput {
    executable: string;
    argsHash: string;
    cwd?: string;
    relevantEnvHash: string;
    sourceTreeHash: string;
    environmentHash: string;
    networkPolicyHash: string;
    secretVersionSetHash?: string;
    idempotencyKey: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `argsHash` | property | <code>argsHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executable` | property | <code>executable: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relevantEnvHash` | property | <code>relevantEnvHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretVersionSetHash` | property | <code>secretVersionSetHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionEnvironmentFingerprint`

Resolved environment facts used to prove that a cache key is stable.

- Kind: interface
- Import: `import type { ExecutionEnvironmentFingerprint } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionEnvironmentFingerprint {
    environmentRef: SpecRef;
    environmentRevision: string;
    providerId: string;
    imageDigest?: string;
    platform?: string;
    executableVersions?: Record<string, string>;
    dependencyLockHash?: string;
    resourcePolicyHash: string;
    networkPolicyHash: string;
    mountPolicyHash: string;
    secretVersionSetHash?: string;
    fingerprintHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dependencyLockHash` | property | <code>dependencyLockHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRef` | property | <code>environmentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executableVersions` | property | <code>executableVersions?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fingerprintHash` | property | <code>fingerprintHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `imageDigest` | property | <code>imageDigest?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mountPolicyHash` | property | <code>mountPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `platform` | property | <code>platform?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourcePolicyHash` | property | <code>resourcePolicyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `secretVersionSetHash` | property | <code>secretVersionSetHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionFingerprintHasher`

Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string.

- Kind: interface
- Import: `import type { ExecutionFingerprintHasher } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export interface ExecutionFingerprintHasher {
    readonly algorithm: 'sha256';
    hashUtf8(canonicalValue: string): Promise<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `algorithm` | property | <code>readonly algorithm: "sha256"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hashUtf8` | method | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionCacheFailureMode`

Public type alias for Execution Cache Failure Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionCacheFailureMode } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export type ExecutionCacheFailureMode = 'bypass' | 'strict';
```

## `ExecutionCacheLookupResult`

Public type alias for Execution Cache Lookup Result; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionCacheLookupResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export type ExecutionCacheLookupResult = {
    hit: true;
    key: string;
    projection: ExecutionCacheEntryProjection;
    ageMs: number;
} | {
    hit: false;
    reason: ExecutionCacheMissReason;
    key?: string;
};
```

## `ExecutionCacheMissReason`

Public type alias for Execution Cache Miss Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionCacheMissReason } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export type ExecutionCacheMissReason = 'not_found' | 'expired' | 'scope_mismatch' | 'key_mismatch' | 'validity_changed' | 'artifact_verification_unavailable' | 'artifact_verification_failed' | 'environment_fingerprint_unavailable' | 'workspace_write' | 'external_side_effect' | 'irreversible_side_effect' | 'not_cacheable_status' | 'store_unavailable' | 'entry_oversized' | 'corrupt';
```

## `ExecutionCacheReuseAssessment`

Public type alias for Execution Cache Reuse Assessment; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionCacheReuseAssessment } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export type ExecutionCacheReuseAssessment = {
    reusable: true;
} | {
    reusable: false;
    reason: ExecutionCacheReuseBlockReason;
};
```

## `ExecutionCacheReuseBlockReason`

Public type alias for Execution Cache Reuse Block Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionCacheReuseBlockReason } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export type ExecutionCacheReuseBlockReason = 'environment_fingerprint_unavailable' | 'workspace_write' | 'external_side_effect' | 'irreversible_side_effect';
```

## `ExecutionEnvironmentFingerprintResolution`

Public type alias for Execution Environment Fingerprint Resolution; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionEnvironmentFingerprintResolution } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### Declaration

```text
export type ExecutionEnvironmentFingerprintResolution = {
    status: 'resolved';
    fingerprint: ExecutionEnvironmentFingerprint;
} | {
    status: 'unavailable';
    reason: string;
};
```
