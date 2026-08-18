# `@codesoul-co/hypha-core` / `contracts/execution-cache`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/execution-cache.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)
- 导出数: **21**

## 模块用法

用于声明并运行时校验契约。Execution cache 模块公开 15 接口、6 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 21 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ExecutionCacheArtifactReference` | 接口 | <code>interface ExecutionCacheArtifactReference</code> | Execution Cache Artifact Reference 接口，共包含 2 个公开字段或方法。 |
| `ExecutionCacheArtifactVerifier` | 接口 | <code>interface ExecutionCacheArtifactVerifier</code> | Execution Cache Artifact Verifier 接口，共包含 1 个公开字段或方法。 |
| `ExecutionCacheEntryProjection` | 接口 | <code>interface ExecutionCacheEntryProjection</code> | Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope. |
| `ExecutionCacheEvent` | 接口 | <code>interface ExecutionCacheEvent</code> | Execution Cache Event 接口，共包含 5 个公开字段或方法。 |
| `ExecutionCacheLookupInput` | 接口 | <code>interface ExecutionCacheLookupInput</code> | Execution Cache Lookup Input 接口，共包含 5 个公开字段或方法。 |
| `ExecutionCacheRecord` | 接口 | <code>interface ExecutionCacheRecord</code> | Versioned envelope persisted by an Execution Result Cache store. |
| `ExecutionCacheResultMetadata` | 接口 | <code>interface ExecutionCacheResultMetadata</code> | Bounded result fields allowed in a Cache entry. |
| `ExecutionCacheReuseAssessmentInput` | 接口 | <code>interface ExecutionCacheReuseAssessmentInput</code> | Execution Cache Reuse Assessment Input 接口，共包含 2 个公开字段或方法。 |
| `ExecutionCacheScope` | 接口 | <code>interface ExecutionCacheScope</code> | Mandatory ownership boundary for persisted Execution Cache records. |
| `ExecutionCacheStore` | 接口 | <code>interface ExecutionCacheStore</code> | Execution Cache Store 接口，共包含 5 个公开字段或方法。 |
| `ExecutionCacheValidityInput` | 接口 | <code>interface ExecutionCacheValidityInput</code> | Exact Execution-owned validity input consumed by Cache integrations. |
| `ExecutionCacheWriteInput` | 接口 | <code>interface ExecutionCacheWriteInput extends ExecutionCacheLookupInput</code> | Execution Cache Write Input 接口，共包含 7 个公开字段或方法。 |
| `ExecutionCommandFingerprintInput` | 接口 | <code>interface ExecutionCommandFingerprintInput</code> | Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded. |
| `ExecutionEnvironmentFingerprint` | 接口 | <code>interface ExecutionEnvironmentFingerprint</code> | Resolved environment facts used to prove that a cache key is stable. |
| `ExecutionFingerprintHasher` | 接口 | <code>interface ExecutionFingerprintHasher</code> | Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string. |
| `ExecutionCacheFailureMode` | 类型 | <code>type ExecutionCacheFailureMode = 'bypass' &#124; 'strict'</code> | Execution Cache Failure Mode 公共类型别名；完整类型表达式见声明。 |
| `ExecutionCacheLookupResult` | 类型 | <code>type ExecutionCacheLookupResult = { hit: true; key: string; projection: ExecutionCacheEntryProjection; ageMs: number; } &#124; { hit: false; reason: ExecutionCacheMissReason; key?: string; }</code> | Execution Cache Lookup Result 公共类型别名；完整类型表达式见声明。 |
| `ExecutionCacheMissReason` | 类型 | <code>type ExecutionCacheMissReason = 'not_found' &#124; 'expired' &#124; 'scope_mismatch' &#124; 'key_mismatch' &#124; 'validity_changed' &#124; 'artifact_verification_unavailable' &#124; 'artifact_verification_failed' &#124; 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect' &#124; 'not_cacheable_status' &#124; 'store_unavailable' &#124; 'entry_oversized' &#124; 'corrupt'</code> | Execution Cache Miss Reason 公共类型别名；完整类型表达式见声明。 |
| `ExecutionCacheReuseAssessment` | 类型 | <code>type ExecutionCacheReuseAssessment = { reusable: true; } &#124; { reusable: false; reason: ExecutionCacheReuseBlockReason; }</code> | Execution Cache Reuse Assessment 公共类型别名；完整类型表达式见声明。 |
| `ExecutionCacheReuseBlockReason` | 类型 | <code>type ExecutionCacheReuseBlockReason = 'environment_fingerprint_unavailable' &#124; 'workspace_write' &#124; 'external_side_effect' &#124; 'irreversible_side_effect'</code> | Execution Cache Reuse Block Reason 公共类型别名；完整类型表达式见声明。 |
| `ExecutionEnvironmentFingerprintResolution` | 类型 | <code>type ExecutionEnvironmentFingerprintResolution = { status: 'resolved'; fingerprint: ExecutionEnvironmentFingerprint; } &#124; { status: 'unavailable'; reason: string; }</code> | Execution Environment Fingerprint Resolution 公共类型别名；完整类型表达式见声明。 |

## `ExecutionCacheArtifactReference`

Execution Cache Artifact Reference 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheArtifactReference } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheArtifactReference {
    artifactRef: string;
    contentHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRef` | 属性 | <code>artifactRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheArtifactVerifier`

Execution Cache Artifact Verifier 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheArtifactVerifier } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheArtifactVerifier {
    verify(scope: ExecutionCacheScope, artifacts: ExecutionCacheArtifactReference[]): Promise<boolean>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(scope: ExecutionCacheScope, artifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionCacheEntryProjection`

Execution's projection for a generic CacheEntry value. It contains metadata, references, and hashes only; Artifact bytes and stdout/stderr are out of scope.

- 种类: 接口
- 导入: `import type { ExecutionCacheEntryProjection } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheEntryProjection {
    commandHash: string;
    validityHash: string;
    validity: ExecutionCacheValidityInput;
    resultMetadata: ExecutionCacheResultMetadata;
    artifacts: ExecutionCacheArtifactReference[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ExecutionCacheArtifactReference[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandHash` | 属性 | <code>commandHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resultMetadata` | 属性 | <code>resultMetadata: ExecutionCacheResultMetadata</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validity` | 属性 | <code>validity: ExecutionCacheValidityInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validityHash` | 属性 | <code>validityHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheEvent`

Execution Cache Event 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheEvent } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheEvent {
    type: 'execution.cache.lookup' | 'execution.cache.hit' | 'execution.cache.miss' | 'execution.cache.write' | 'execution.cache.invalidate' | 'execution.cache.bypass';
    key?: string;
    scope: ExecutionCacheScope;
    reason?: ExecutionCacheMissReason;
    ageMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ageMs` | 属性 | <code>ageMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: ExecutionCacheMissReason</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "execution.cache.lookup" &#124; "execution.cache.hit" &#124; "execution.cache.miss" &#124; "execution.cache.write" &#124; "execution.cache.invalidate" &#124; "execution.cache.bypass"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheLookupInput`

Execution Cache Lookup Input 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheLookupInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheLookupInput {
    scope: ExecutionCacheScope;
    command: ExecutionCommandFingerprintInput;
    validity: ExecutionCacheValidityInput;
    sideEffectLevel: SideEffectLevel;
    environmentFingerprintStatus: ExecutionEnvironmentFingerprintResolution['status'];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: ExecutionCommandFingerprintInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentFingerprintStatus` | 属性 | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validity` | 属性 | <code>validity: ExecutionCacheValidityInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheRecord`

Versioned envelope persisted by an Execution Result Cache store.

- 种类: 接口
- 导入: `import type { ExecutionCacheRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `keyVersion` | 属性 | <code>keyVersion: "1"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: ExecutionCacheEntryProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sizeBytes` | 属性 | <code>sizeBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheResultMetadata`

Bounded result fields allowed in a Cache entry.

- 种类: 接口
- 导入: `import type { ExecutionCacheResultMetadata } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionId` | 属性 | <code>executionId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exitCode` | 属性 | <code>exitCode: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `latencyMs` | 属性 | <code>latencyMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerReceiptHash` | 属性 | <code>providerReceiptHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourceUsage` | 属性 | <code>resourceUsage?: ExecutionResourceUsage</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `signal` | 属性 | <code>signal?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: CommandExecutionStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheReuseAssessmentInput`

Execution Cache Reuse Assessment Input 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheReuseAssessmentInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheReuseAssessmentInput {
    sideEffectLevel: SideEffectLevel;
    environmentFingerprintStatus: ExecutionEnvironmentFingerprintResolution['status'];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `environmentFingerprintStatus` | 属性 | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheScope`

Mandatory ownership boundary for persisted Execution Cache records.

- 种类: 接口
- 导入: `import type { ExecutionCacheScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheScope {
    tenantId?: string;
    userId: string;
    workspaceId: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheStore`

Execution Cache Store 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheStore } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheStore {
    get(key: string): Promise<ExecutionCacheRecord | null>;
    set(key: string, record: ExecutionCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    clear?(): Promise<void>;
    close?(): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `clear` | 方法 | <code>clear?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `close` | 方法 | <code>close?(): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `delete` | 方法 | <code>delete(key: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(key: string): Promise&lt;ExecutionCacheRecord &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `set` | 方法 | <code>set(key: string, record: ExecutionCacheRecord): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionCacheValidityInput`

Exact Execution-owned validity input consumed by Cache integrations.

- 种类: 接口
- 导入: `import type { ExecutionCacheValidityInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `argsHash` | 属性 | <code>argsHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `commandPolicyRevision` | 属性 | <code>commandPolicyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencyLockHash` | 属性 | <code>dependencyLockHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executable` | 属性 | <code>executable: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imageDigest` | 属性 | <code>imageDigest?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretVersionSetHash` | 属性 | <code>secretVersionSetHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceSnapshotHash` | 属性 | <code>workspaceSnapshotHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCacheWriteInput`

Execution Cache Write Input 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ExecutionCacheWriteInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionCacheWriteInput extends ExecutionCacheLookupInput {
    projection: ExecutionCacheEntryProjection;
    ttlMs?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: ExecutionCommandFingerprintInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentFingerprintStatus` | 属性 | <code>environmentFingerprintStatus: "resolved" &#124; "unavailable"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `projection` | 属性 | <code>projection: ExecutionCacheEntryProjection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ExecutionCacheScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectLevel` | 属性 | <code>sideEffectLevel: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ttlMs` | 属性 | <code>ttlMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validity` | 属性 | <code>validity: ExecutionCacheValidityInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionCommandFingerprintInput`

Canonical, bounded material for a Command fingerprint. Raw environment values, Secret values, stdin, and command output are deliberately excluded.

- 种类: 接口
- 导入: `import type { ExecutionCommandFingerprintInput } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `argsHash` | 属性 | <code>argsHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cwd` | 属性 | <code>cwd?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentHash` | 属性 | <code>environmentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executable` | 属性 | <code>executable: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `relevantEnvHash` | 属性 | <code>relevantEnvHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretVersionSetHash` | 属性 | <code>secretVersionSetHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceTreeHash` | 属性 | <code>sourceTreeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionEnvironmentFingerprint`

Resolved environment facts used to prove that a cache key is stable.

- 种类: 接口
- 导入: `import type { ExecutionEnvironmentFingerprint } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dependencyLockHash` | 属性 | <code>dependencyLockHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRef` | 属性 | <code>environmentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `environmentRevision` | 属性 | <code>environmentRevision: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executableVersions` | 属性 | <code>executableVersions?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fingerprintHash` | 属性 | <code>fingerprintHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `imageDigest` | 属性 | <code>imageDigest?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mountPolicyHash` | 属性 | <code>mountPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `networkPolicyHash` | 属性 | <code>networkPolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `platform` | 属性 | <code>platform?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resourcePolicyHash` | 属性 | <code>resourcePolicyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `secretVersionSetHash` | 属性 | <code>secretVersionSetHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ExecutionFingerprintHasher`

Platform-neutral SHA-256 port; adapters hash the canonical UTF-8 string.

- 种类: 接口
- 导入: `import type { ExecutionFingerprintHasher } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export interface ExecutionFingerprintHasher {
    readonly algorithm: 'sha256';
    hashUtf8(canonicalValue: string): Promise<string>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `algorithm` | 属性 | <code>readonly algorithm: "sha256"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hashUtf8` | 方法 | <code>hashUtf8(canonicalValue: string): Promise&lt;string&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ExecutionCacheFailureMode`

Execution Cache Failure Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionCacheFailureMode } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export type ExecutionCacheFailureMode = 'bypass' | 'strict';
```

## `ExecutionCacheLookupResult`

Execution Cache Lookup Result 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionCacheLookupResult } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

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

Execution Cache Miss Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionCacheMissReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export type ExecutionCacheMissReason = 'not_found' | 'expired' | 'scope_mismatch' | 'key_mismatch' | 'validity_changed' | 'artifact_verification_unavailable' | 'artifact_verification_failed' | 'environment_fingerprint_unavailable' | 'workspace_write' | 'external_side_effect' | 'irreversible_side_effect' | 'not_cacheable_status' | 'store_unavailable' | 'entry_oversized' | 'corrupt';
```

## `ExecutionCacheReuseAssessment`

Execution Cache Reuse Assessment 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionCacheReuseAssessment } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export type ExecutionCacheReuseAssessment = {
    reusable: true;
} | {
    reusable: false;
    reason: ExecutionCacheReuseBlockReason;
};
```

## `ExecutionCacheReuseBlockReason`

Execution Cache Reuse Block Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionCacheReuseBlockReason } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export type ExecutionCacheReuseBlockReason = 'environment_fingerprint_unavailable' | 'workspace_write' | 'external_side_effect' | 'irreversible_side_effect';
```

## `ExecutionEnvironmentFingerprintResolution`

Execution Environment Fingerprint Resolution 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ExecutionEnvironmentFingerprintResolution } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/execution-cache`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-cache.ts)

### 声明

```text
export type ExecutionEnvironmentFingerprintResolution = {
    status: 'resolved';
    fingerprint: ExecutionEnvironmentFingerprint;
} | {
    status: 'unavailable';
    reason: string;
};
```
