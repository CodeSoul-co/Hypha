# `@codesoul-co/hypha-core` / `contracts/execution-cache`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/execution-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)
- Exports: **21**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ExecutionCacheArtifactReference` | interface | <code>interface ExecutionCacheArtifactReference</code> | Field contract for Execution Cache Artifact Reference; see all contract members below. |
| `ExecutionCacheArtifactVerifier` | interface | <code>interface ExecutionCacheArtifactVerifier</code> | Field contract for Execution Cache Artifact Verifier; see all contract members below. |
| `ExecutionCacheEntryProjection` | interface | <code>interface ExecutionCacheEntryProjection</code> | Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope. |
| `ExecutionCacheEvent` | interface | <code>interface ExecutionCacheEvent</code> | Field contract for Execution Cache Event; see all contract members below. |
| `ExecutionCacheLookupInput` | interface | <code>interface ExecutionCacheLookupInput</code> | Field contract for Execution Cache Lookup Input; see all contract members below. |
| `ExecutionCacheRecord` | interface | <code>interface ExecutionCacheRecord</code> | Versioned envelope persisted by an Execution Result Cache store. |
| `ExecutionCacheResultMetadata` | interface | <code>interface ExecutionCacheResultMetadata</code> | Bounded result fields allowed in a Cache entry. |
| `ExecutionCacheReuseAssessmentInput` | interface | <code>interface ExecutionCacheReuseAssessmentInput</code> | Field contract for Execution Cache Reuse Assessment Input; see all contract members below. |
| `ExecutionCacheScope` | interface | <code>interface ExecutionCacheScope</code> | Mandatory ownership boundary for persisted Execution Cache records. |
| `ExecutionCacheStore` | interface | <code>interface ExecutionCacheStore</code> | Field contract for Execution Cache Store; see all contract members below. |
| `ExecutionCacheValidityInput` | interface | <code>interface ExecutionCacheValidityInput</code> | Exact Execution-owned validity input consumed by Cache integrations. |
| `ExecutionCacheWriteInput` | interface | <code>interface ExecutionCacheWriteInput extends ExecutionCacheLookupInput</code> | Field contract for Execution Cache Write Input; see all contract members below. |
| `ExecutionCommandFingerprintInput` | interface | <code>interface ExecutionCommandFingerprintInput</code> | Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded. |
| `ExecutionEnvironmentFingerprint` | interface | <code>interface ExecutionEnvironmentFingerprint</code> | Resolved environment facts used to prove that a cache key is stable. |
| `ExecutionFingerprintHasher` | interface | <code>interface ExecutionFingerprintHasher</code> | Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string. |
| `ExecutionCacheFailureMode` | type | <code>type ExecutionCacheFailureMode = 'bypass' &#124; 'strict'</code> | Public type alias for Execution Cache Failure Mode. |
| `ExecutionCacheLookupResult` | type | <code>type ExecutionCacheLookupResult = { hit: true; key: string; projection: ExecutionCacheEntryProjection; ageMs: number; } &#124; { hit: false; reason: ExecutionCacheMissReason; key?: string; }</code> | Public type alias for Execution Cache Lookup Result. |
| `ExecutionCacheMissReason` | type | <code>type ExecutionCacheMissReason = 'not_found' &#124; 'expired' &#124; 'scope_mismatch' &#124; 'key_mismatch' &#124; 'validity_changed' &#124; 'artifact_verification_unavailable' &#124; 'artifact_verification_failed' &#124; 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect' &#124; 'not_cacheable_status' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Public type alias for Execution Cache Miss Reason. |
| `ExecutionCacheReuseAssessment` | type | <code>type ExecutionCacheReuseAssessment = { reusable: true; } &#124; { reusable: false; reason: ExecutionCacheReuseBlockReason; }</code> | Public type alias for Execution Cache Reuse Assessment. |
| `ExecutionCacheReuseBlockReason` | type | <code>type ExecutionCacheReuseBlockReason = 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect'</code> | Public type alias for Execution Cache Reuse Block Reason. |
| `ExecutionEnvironmentFingerprintResolution` | type | <code>type ExecutionEnvironmentFingerprintResolution = { status: 'resolved'; fingerprint: ExecutionEnvironmentFingerprint; } &#124; { status: 'unavailable'; reason: string; }</code> | Public type alias for Execution Environment Fingerprint Resolution. |

## `ExecutionCacheArtifactReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public artifact Ref property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |

## `ExecutionCacheArtifactVerifier` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(scope: ExecutionCacheScope, artifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | Public runtime operation for verify. |

## `ExecutionCacheEntryProjection` contract members

Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ExecutionCacheArtifactReference[]</code> | Public artifacts property. |
| `commandHash` | property | <code>commandHash: string</code> | Public command Hash property. |
| `resultMetadata` | property | <code>resultMetadata: ExecutionCacheResultMetadata</code> | Public result Metadata property. |
| `validity` | property | <code>validity: ExecutionCacheValidityInput</code> | Public validity property. |
| `validityHash` | property | <code>validityHash: string</code> | Public validity Hash property. |

## `ExecutionCacheEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ageMs` | property | <code>ageMs: number</code> | Public age Ms property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `reason` | property | <code>reason: ExecutionCacheMissReason</code> | Public reason property. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public scope property. |
| `type` | property | <code>type: "execution.cache.lookup" &#124; "execution.cache.hit" &#124; "execution.cache.miss" &#124; "execution.cache.write" &#124; "execution.cache.invalidate" &#124; "execution.cache.bypass"</code> | Public type property. |

## `ExecutionCacheLookupInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: ExecutionCommandFingerprintInput</code> | Public command property. |
| `environmentFingerprintStatus` | property | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | Public environment Fingerprint Status property. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public scope property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `validity` | property | <code>validity: ExecutionCacheValidityInput</code> | Public validity property. |

## `ExecutionCacheRecord` contract members

Versioned envelope persisted by an Execution Result Cache store.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: number</code> | Public created At property. |
| `expiresAt` | property | <code>expiresAt: number</code> | Public expires At property. |
| `key` | property | <code>key: string</code> | Public key property. |
| `keyVersion` | property | <code>keyVersion: "1"</code> | Public key Version property. |
| `projection` | property | <code>projection: ExecutionCacheEntryProjection</code> | Public projection property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public scope property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `ExecutionCacheResultMetadata` contract members

Bounded result fields allowed in a Cache entry.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `executionId` | property | <code>executionId: string</code> | Public execution Id property. |
| `exitCode` | property | <code>exitCode: number</code> | Public exit Code property. |
| `latencyMs` | property | <code>latencyMs: number</code> | Public latency Ms property. |
| `providerReceiptHash` | property | <code>providerReceiptHash: string</code> | Public provider Receipt Hash property. |
| `resourceUsage` | property | <code>resourceUsage: ExecutionResourceUsage</code> | Public resource Usage property. |
| `signal` | property | <code>signal: string</code> | Public signal property. |
| `startedAt` | property | <code>startedAt: string</code> | Public started At property. |
| `status` | property | <code>status: CommandExecutionStatus</code> | Public status property. |

## `ExecutionCacheReuseAssessmentInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `environmentFingerprintStatus` | property | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | Public environment Fingerprint Status property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |

## `ExecutionCacheScope` contract members

Mandatory ownership boundary for persisted Execution Cache records.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ExecutionCacheStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clear` | method | <code>clear(): Promise&lt;void&gt;</code> | Public runtime operation for clear. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | Gets get at this module boundary. |
| `set` | method | <code>set(key: string, record: ExecutionCacheRecord): Promise&lt;void&gt;</code> | Sets set at this module boundary. |

## `ExecutionCacheValidityInput` contract members

Exact Execution-owned validity input consumed by Cache integrations.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `argsHash` | property | <code>argsHash: string</code> | Public args Hash property. |
| `commandPolicyRevision` | property | <code>commandPolicyRevision: string</code> | Public command Policy Revision property. |
| `dependencyLockHash` | property | <code>dependencyLockHash: string</code> | Public dependency Lock Hash property. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public environment Hash property. |
| `executable` | property | <code>executable: string</code> | Public executable property. |
| `imageDigest` | property | <code>imageDigest: string</code> | Public image Digest property. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public network Policy Hash property. |
| `secretVersionSetHash` | property | <code>secretVersionSetHash: string</code> | Public secret Version Set Hash property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |
| `workspaceSnapshotHash` | property | <code>workspaceSnapshotHash: string</code> | Public workspace Snapshot Hash property. |

## `ExecutionCacheWriteInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: ExecutionCommandFingerprintInput</code> | Public command property. |
| `environmentFingerprintStatus` | property | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | Public environment Fingerprint Status property. |
| `projection` | property | <code>projection: ExecutionCacheEntryProjection</code> | Public projection property. |
| `scope` | property | <code>scope: ExecutionCacheScope</code> | Public scope property. |
| `sideEffectLevel` | property | <code>sideEffectLevel: SideEffectLevel</code> | Public side Effect Level property. |
| `ttlMs` | property | <code>ttlMs: number</code> | Public ttl Ms property. |
| `validity` | property | <code>validity: ExecutionCacheValidityInput</code> | Public validity property. |

## `ExecutionCommandFingerprintInput` contract members

Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `argsHash` | property | <code>argsHash: string</code> | Public args Hash property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `environmentHash` | property | <code>environmentHash: string</code> | Public environment Hash property. |
| `executable` | property | <code>executable: string</code> | Public executable property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public network Policy Hash property. |
| `relevantEnvHash` | property | <code>relevantEnvHash: string</code> | Public relevant Env Hash property. |
| `secretVersionSetHash` | property | <code>secretVersionSetHash: string</code> | Public secret Version Set Hash property. |
| `sourceTreeHash` | property | <code>sourceTreeHash: string</code> | Public source Tree Hash property. |

## `ExecutionEnvironmentFingerprint` contract members

Resolved environment facts used to prove that a cache key is stable.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dependencyLockHash` | property | <code>dependencyLockHash: string</code> | Public dependency Lock Hash property. |
| `environmentRef` | property | <code>environmentRef: SpecRef</code> | Public environment Ref property. |
| `environmentRevision` | property | <code>environmentRevision: string</code> | Public environment Revision property. |
| `executableVersions` | property | <code>executableVersions: Record&lt;string, string&gt;</code> | Public executable Versions property. |
| `fingerprintHash` | property | <code>fingerprintHash: string</code> | Public fingerprint Hash property. |
| `imageDigest` | property | <code>imageDigest: string</code> | Public image Digest property. |
| `mountPolicyHash` | property | <code>mountPolicyHash: string</code> | Public mount Policy Hash property. |
| `networkPolicyHash` | property | <code>networkPolicyHash: string</code> | Public network Policy Hash property. |
| `platform` | property | <code>platform: string</code> | Public platform property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `resourcePolicyHash` | property | <code>resourcePolicyHash: string</code> | Public resource Policy Hash property. |
| `secretVersionSetHash` | property | <code>secretVersionSetHash: string</code> | Public secret Version Set Hash property. |

## `ExecutionFingerprintHasher` contract members

Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `algorithm` | property | <code>algorithm: "sha256"</code> | Public algorithm property. |
| `hashUtf8` | method | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | Checks whether h Utf8 at this module boundary. |
