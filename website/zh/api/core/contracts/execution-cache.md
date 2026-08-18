# `@codesoul-co/hypha-core` / `contracts/execution-cache`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/execution-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)
- 导出数: **21**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionCacheArtifactReference` | 接口 | <code>interface ExecutionCacheArtifactReference</code> | Execution Cache Artifact Reference 的字段契约；完整字段见下表。 |
| `ExecutionCacheArtifactVerifier` | 接口 | <code>interface ExecutionCacheArtifactVerifier</code> | Execution Cache Artifact Verifier 的字段契约；完整字段见下表。 |
| `ExecutionCacheEntryProjection` | 接口 | <code>interface ExecutionCacheEntryProjection</code> | Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope. |
| `ExecutionCacheEvent` | 接口 | <code>interface ExecutionCacheEvent</code> | Execution Cache Event 的字段契约；完整字段见下表。 |
| `ExecutionCacheLookupInput` | 接口 | <code>interface ExecutionCacheLookupInput</code> | Execution Cache Lookup Input 的字段契约；完整字段见下表。 |
| `ExecutionCacheRecord` | 接口 | <code>interface ExecutionCacheRecord</code> | Versioned envelope persisted by an Execution Result Cache store. |
| `ExecutionCacheResultMetadata` | 接口 | <code>interface ExecutionCacheResultMetadata</code> | Bounded result fields allowed in a Cache entry. |
| `ExecutionCacheReuseAssessmentInput` | 接口 | <code>interface ExecutionCacheReuseAssessmentInput</code> | Execution Cache Reuse Assessment Input 的字段契约；完整字段见下表。 |
| `ExecutionCacheScope` | 接口 | <code>interface ExecutionCacheScope</code> | Mandatory ownership boundary for persisted Execution Cache records. |
| `ExecutionCacheStore` | 接口 | <code>interface ExecutionCacheStore</code> | Execution Cache Store 的字段契约；完整字段见下表。 |
| `ExecutionCacheValidityInput` | 接口 | <code>interface ExecutionCacheValidityInput</code> | Exact Execution-owned validity input consumed by Cache integrations. |
| `ExecutionCacheWriteInput` | 接口 | <code>interface ExecutionCacheWriteInput extends ExecutionCacheLookupInput</code> | Execution Cache Write Input 的字段契约；完整字段见下表。 |
| `ExecutionCommandFingerprintInput` | 接口 | <code>interface ExecutionCommandFingerprintInput</code> | Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded. |
| `ExecutionEnvironmentFingerprint` | 接口 | <code>interface ExecutionEnvironmentFingerprint</code> | Resolved environment facts used to prove that a cache key is stable. |
| `ExecutionFingerprintHasher` | 接口 | <code>interface ExecutionFingerprintHasher</code> | Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string. |
| `ExecutionCacheFailureMode` | 类型 | <code>type ExecutionCacheFailureMode = 'bypass' &#124; 'strict'</code> | Execution Cache Failure Mode 的公共类型别名。 |
| `ExecutionCacheLookupResult` | 类型 | <code>type ExecutionCacheLookupResult = { hit: true; key: string; projection: ExecutionCacheEntryProjection; ageMs: number; } &#124; { hit: false; reason: ExecutionCacheMissReason; key?: string; }</code> | Execution Cache Lookup Result 的公共类型别名。 |
| `ExecutionCacheMissReason` | 类型 | <code>type ExecutionCacheMissReason = 'not_found' &#124; 'expired' &#124; 'scope_mismatch' &#124; 'key_mismatch' &#124; 'validity_changed' &#124; 'artifact_verification_unavailable' &#124; 'artifact_verification_failed' &#124; 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect' &#124; 'not_cacheable_status' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Execution Cache Miss Reason 的公共类型别名。 |
| `ExecutionCacheReuseAssessment` | 类型 | <code>type ExecutionCacheReuseAssessment = { reusable: true; } &#124; { reusable: false; reason: ExecutionCacheReuseBlockReason; }</code> | Execution Cache Reuse Assessment 的公共类型别名。 |
| `ExecutionCacheReuseBlockReason` | 类型 | <code>type ExecutionCacheReuseBlockReason = 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect'</code> | Execution Cache Reuse Block Reason 的公共类型别名。 |
| `ExecutionEnvironmentFingerprintResolution` | 类型 | <code>type ExecutionEnvironmentFingerprintResolution = { status: 'resolved'; fingerprint: ExecutionEnvironmentFingerprint; } &#124; { status: 'unavailable'; reason: string; }</code> | Execution Environment Fingerprint Resolution 的公共类型别名。 |

## `ExecutionCacheArtifactReference` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | artifact Ref 字段。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |

## `ExecutionCacheArtifactVerifier` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(scope: ExecutionCacheScope, artifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | verify 的公开运行时操作。 |

## `ExecutionCacheEntryProjection` 契约字段

Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ExecutionCacheArtifactReference[]</code> | artifacts 字段。 |
| `commandHash` | 属性 | <code>commandHash: string</code> | command Hash 字段。 |
| `resultMetadata` | 属性 | <code>resultMetadata: ExecutionCacheResultMetadata</code> | result Metadata 字段。 |
| `validity` | 属性 | <code>validity: ExecutionCacheValidityInput</code> | validity 字段。 |
| `validityHash` | 属性 | <code>validityHash: string</code> | validity Hash 字段。 |

## `ExecutionCacheEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ageMs` | 属性 | <code>ageMs: number</code> | age Ms 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `reason` | 属性 | <code>reason: ExecutionCacheMissReason</code> | reason 字段。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | scope 字段。 |
| `type` | 属性 | <code>type: "execution.cache.lookup" &#124; "execution.cache.hit" &#124; "execution.cache.miss" &#124; "execution.cache.write" &#124; "execution.cache.invalidate" &#124; "execution.cache.bypass"</code> | type 字段。 |

## `ExecutionCacheLookupInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: ExecutionCommandFingerprintInput</code> | command 字段。 |
| `environmentFingerprintStatus` | 属性 | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | environment Fingerprint Status 字段。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | scope 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `validity` | 属性 | <code>validity: ExecutionCacheValidityInput</code> | validity 字段。 |

## `ExecutionCacheRecord` 契约字段

Versioned envelope persisted by an Execution Result Cache store.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: number</code> | created At 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: number</code> | expires At 字段。 |
| `key` | 属性 | <code>key: string</code> | key 字段。 |
| `keyVersion` | 属性 | <code>keyVersion: "1"</code> | key Version 字段。 |
| `projection` | 属性 | <code>projection: ExecutionCacheEntryProjection</code> | projection 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | scope 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |

## `ExecutionCacheResultMetadata` 契约字段

Bounded result fields allowed in a Cache entry.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `executionId` | 属性 | <code>executionId: string</code> | execution Id 字段。 |
| `exitCode` | 属性 | <code>exitCode: number</code> | exit Code 字段。 |
| `latencyMs` | 属性 | <code>latencyMs: number</code> | latency Ms 字段。 |
| `providerReceiptHash` | 属性 | <code>providerReceiptHash: string</code> | provider Receipt Hash 字段。 |
| `resourceUsage` | 属性 | <code>resourceUsage: ExecutionResourceUsage</code> | resource Usage 字段。 |
| `signal` | 属性 | <code>signal: string</code> | signal 字段。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | started At 字段。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | status 字段。 |

## `ExecutionCacheReuseAssessmentInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `environmentFingerprintStatus` | 属性 | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | environment Fingerprint Status 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |

## `ExecutionCacheScope` 契约字段

Mandatory ownership boundary for persisted Execution Cache records.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ExecutionCacheStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear(): Promise&lt;void&gt;</code> | clear 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | 读取 get。 |
| `set` | 方法 | <code>set(key: string, record: ExecutionCacheRecord): Promise&lt;void&gt;</code> | 写入 set。 |

## `ExecutionCacheValidityInput` 契约字段

Exact Execution-owned validity input consumed by Cache integrations.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `argsHash` | 属性 | <code>argsHash: string</code> | args Hash 字段。 |
| `commandPolicyRevision` | 属性 | <code>commandPolicyRevision: string</code> | command Policy Revision 字段。 |
| `dependencyLockHash` | 属性 | <code>dependencyLockHash: string</code> | dependency Lock Hash 字段。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | environment Hash 字段。 |
| `executable` | 属性 | <code>executable: string</code> | executable 字段。 |
| `imageDigest` | 属性 | <code>imageDigest: string</code> | image Digest 字段。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | network Policy Hash 字段。 |
| `secretVersionSetHash` | 属性 | <code>secretVersionSetHash: string</code> | secret Version Set Hash 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |
| `workspaceSnapshotHash` | 属性 | <code>workspaceSnapshotHash: string</code> | workspace Snapshot Hash 字段。 |

## `ExecutionCacheWriteInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: ExecutionCommandFingerprintInput</code> | command 字段。 |
| `environmentFingerprintStatus` | 属性 | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | environment Fingerprint Status 字段。 |
| `projection` | 属性 | <code>projection: ExecutionCacheEntryProjection</code> | projection 字段。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | scope 字段。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | side Effect Level 字段。 |
| `ttlMs` | 属性 | <code>ttlMs: number</code> | ttl Ms 字段。 |
| `validity` | 属性 | <code>validity: ExecutionCacheValidityInput</code> | validity 字段。 |

## `ExecutionCommandFingerprintInput` 契约字段

Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `argsHash` | 属性 | <code>argsHash: string</code> | args Hash 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | environment Hash 字段。 |
| `executable` | 属性 | <code>executable: string</code> | executable 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | network Policy Hash 字段。 |
| `relevantEnvHash` | 属性 | <code>relevantEnvHash: string</code> | relevant Env Hash 字段。 |
| `secretVersionSetHash` | 属性 | <code>secretVersionSetHash: string</code> | secret Version Set Hash 字段。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | source Tree Hash 字段。 |

## `ExecutionEnvironmentFingerprint` 契约字段

Resolved environment facts used to prove that a cache key is stable.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dependencyLockHash` | 属性 | <code>dependencyLockHash: string</code> | dependency Lock Hash 字段。 |
| `environmentRef` | 属性 | <code>environmentRef: SpecRef</code> | environment Ref 字段。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | environment Revision 字段。 |
| `executableVersions` | 属性 | <code>executableVersions: Record&lt;string, string&gt;</code> | executable Versions 字段。 |
| `fingerprintHash` | 属性 | <code>fingerprintHash: string</code> | fingerprint Hash 字段。 |
| `imageDigest` | 属性 | <code>imageDigest: string</code> | image Digest 字段。 |
| `mountPolicyHash` | 属性 | <code>mountPolicyHash: string</code> | mount Policy Hash 字段。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | network Policy Hash 字段。 |
| `platform` | 属性 | <code>platform: string</code> | platform 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `resourcePolicyHash` | 属性 | <code>resourcePolicyHash: string</code> | resource Policy Hash 字段。 |
| `secretVersionSetHash` | 属性 | <code>secretVersionSetHash: string</code> | secret Version Set Hash 字段。 |

## `ExecutionFingerprintHasher` 契约字段

Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `algorithm` | 属性 | <code>algorithm: "sha256"</code> | algorithm 字段。 |
| `hashUtf8` | 方法 | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | 判断是否存在 h Utf8。 |
