# `@codesoul-co/hypha-core` / `contracts/recovery`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/contracts/recovery.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)
- 导出数: **23**

## 模块用法

用于声明并运行时校验契约。Recovery 模块公开 4 常量、5 函数、9 接口、5 类型。

### 从包入口导入

```ts
import {
  defaultRecoveryConvergencePolicy,
  RECOVERY_CATEGORIES,
  RECOVERY_MODULES,
  RECOVERY_STRATEGIES,
  recoveryEvidenceHash,
  recoveryFailureFingerprint,
  recoveryKnowledgeKeyMatches,
  recoveryKnowledgeScopeMatches,
} from '@codesoul-co/hypha-core';

import type {
  RecoveryAttemptRecord,
  RecoveryCaseSnapshot,
  RecoveryConvergencePolicy,
  RecoveryEvidence,
  RecoveryFailure,
  RecoveryKnowledge,
  RecoveryKnowledgeKey,
  RecoveryKnowledgePort,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 14 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 5 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 4 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultRecoveryConvergencePolicy` | 常量 | <code>const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy</code> | 由 `contracts/recovery` 模块导出的 Default Recovery Convergence Policy 常量。 |
| `RECOVERY_CATEGORIES` | 常量 | <code>const RECOVERY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"]</code> | 由 `contracts/recovery` 模块导出的 RECOVERY CATEGORIES 常量。 |
| `RECOVERY_MODULES` | 常量 | <code>const RECOVERY_MODULES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"]</code> | 由 `contracts/recovery` 模块导出的 RECOVERY MODULES 常量。 |
| `RECOVERY_STRATEGIES` | 常量 | <code>const RECOVERY_STRATEGIES: readonly ["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"]</code> | 由 `contracts/recovery` 模块导出的 RECOVERY STRATEGIES 常量。 |
| `recoveryEvidenceHash` | 函数 | <code>recoveryEvidenceHash(evidence: RecoveryEvidence): string</code> | Recovery Evidence Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `recoveryFailureFingerprint` | 函数 | <code>recoveryFailureFingerprint(failure: RecoveryFailure): string</code> | Recovery Failure Fingerprint 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `recoveryKnowledgeKeyMatches` | 函数 | <code>recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean</code> | Recovery Knowledge Key Matches 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `recoveryKnowledgeScopeMatches` | 函数 | <code>recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope &#124; undefined, actual: RecoveryKnowledgeScope &#124; undefined): boolean</code> | Recovery Knowledge Scope Matches 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `stableRecoveryHash` | 函数 | <code>stableRecoveryHash(value: unknown): string</code> | Stable Recovery Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `RecoveryAttemptRecord` | 接口 | <code>interface RecoveryAttemptRecord</code> | Recovery Attempt Record 接口，共包含 12 个公开字段或方法。 |
| `RecoveryCaseSnapshot` | 接口 | <code>interface RecoveryCaseSnapshot</code> | Recovery Case Snapshot 接口，共包含 15 个公开字段或方法。 |
| `RecoveryConvergencePolicy` | 接口 | <code>interface RecoveryConvergencePolicy</code> | Recovery Convergence Policy 接口，共包含 6 个公开字段或方法。 |
| `RecoveryEvidence` | 接口 | <code>interface RecoveryEvidence</code> | Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages. |
| `RecoveryFailure` | 接口 | <code>interface RecoveryFailure</code> | Recovery Failure 接口，共包含 14 个公开字段或方法。 |
| `RecoveryKnowledge` | 接口 | <code>interface RecoveryKnowledge</code> | Recovery Knowledge 接口，共包含 7 个公开字段或方法。 |
| `RecoveryKnowledgeKey` | 接口 | <code>interface RecoveryKnowledgeKey</code> | Recovery Knowledge Key 接口，共包含 6 个公开字段或方法。 |
| `RecoveryKnowledgePort` | 接口 | <code>interface RecoveryKnowledgePort</code> | Cache implementations are hints only. The supervisor must revalidate a hit. |
| `RecoveryKnowledgeScope` | 接口 | <code>interface RecoveryKnowledgeScope</code> | Recovery Knowledge Scope 接口，共包含 6 个公开字段或方法。 |
| `RecoveryCaseStatus` | 类型 | <code>type RecoveryCaseStatus = 'active' &#124; 'suspended' &#124; 'recovered' &#124; 'degraded' &#124; 'compensated' &#124; 'quarantined' &#124; 'failed' &#124; 'cancelled'</code> | Recovery Case Status 公共类型别名；完整类型表达式见声明。 |
| `RecoveryCategory` | 类型 | <code>type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number]</code> | Recovery Category 公共类型别名；完整类型表达式见声明。 |
| `RecoveryModule` | 类型 | <code>type RecoveryModule = (typeof RECOVERY_MODULES)[number]</code> | Recovery Module 公共类型别名；完整类型表达式见声明。 |
| `RecoverySideEffectState` | 类型 | <code>type RecoverySideEffectState = 'none' &#124; 'not_started' &#124; 'committed' &#124; 'unknown'</code> | Recovery Side Effect State 公共类型别名；完整类型表达式见声明。 |
| `RecoveryStrategy` | 类型 | <code>type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number]</code> | Recovery Strategy 公共类型别名；完整类型表达式见声明。 |

## `defaultRecoveryConvergencePolicy`

由 `contracts/recovery` 模块导出的 Default Recovery Convergence Policy 常量。

- 种类: 常量
- 导入: `import { defaultRecoveryConvergencePolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare const defaultRecoveryConvergencePolicy: RecoveryConvergencePolicy;
```

## `RECOVERY_CATEGORIES`

由 `contracts/recovery` 模块导出的 RECOVERY CATEGORIES 常量。

- 种类: 常量
- 导入: `import { RECOVERY_CATEGORIES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare const RECOVERY_CATEGORIES: readonly ["validation", "policy_denied", "authentication", "authorization", "rate_limit", "timeout", "transient_dependency", "permanent_dependency", "concurrency_conflict", "resource_exhausted", "tool_failure", "inference_failure", "memory_failure", "execution_failure", "storage_failure", "message_failure", "cache_failure", "invariant_violation", "cancellation", "unknown"];
```

## `RECOVERY_MODULES`

由 `contracts/recovery` 模块导出的 RECOVERY MODULES 常量。

- 种类: 常量
- 导入: `import { RECOVERY_MODULES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare const RECOVERY_MODULES: readonly ["fsm", "inference", "tool", "memory", "execution", "mcp", "workspace", "storage", "message_bus", "cache", "policy", "domain", "unknown"];
```

## `RECOVERY_STRATEGIES`

由 `contracts/recovery` 模块导出的 RECOVERY STRATEGIES 常量。

- 种类: 常量
- 导入: `import { RECOVERY_STRATEGIES } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare const RECOVERY_STRATEGIES: readonly ["retry", "reconcile", "fallback", "degrade", "compensate", "wait", "human_review", "quarantine", "fail", "cancel"];
```

## `recoveryEvidenceHash`

Recovery Evidence Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { recoveryEvidenceHash } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare function recoveryEvidenceHash(evidence: RecoveryEvidence): string;
```

### 调用签名

```text
recoveryEvidenceHash(evidence: RecoveryEvidence): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `evidence` | <code>RecoveryEvidence</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `recoveryFailureFingerprint`

Recovery Failure Fingerprint 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { recoveryFailureFingerprint } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare function recoveryFailureFingerprint(failure: RecoveryFailure): string;
```

### 调用签名

```text
recoveryFailureFingerprint(failure: RecoveryFailure): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `failure` | <code>RecoveryFailure</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `recoveryKnowledgeKeyMatches`

Recovery Knowledge Key Matches 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { recoveryKnowledgeKeyMatches } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare function recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean;
```

### 调用签名

```text
recoveryKnowledgeKeyMatches(expected: RecoveryKnowledgeKey, actual: RecoveryKnowledgeKey): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `expected` | <code>RecoveryKnowledgeKey</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `actual` | <code>RecoveryKnowledgeKey</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `recoveryKnowledgeScopeMatches`

Recovery Knowledge Scope Matches 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { recoveryKnowledgeScopeMatches } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare function recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope | undefined, actual: RecoveryKnowledgeScope | undefined): boolean;
```

### 调用签名

```text
recoveryKnowledgeScopeMatches(expected: RecoveryKnowledgeScope | undefined, actual: RecoveryKnowledgeScope | undefined): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `expected` | <code>RecoveryKnowledgeScope</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `actual` | <code>RecoveryKnowledgeScope</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `stableRecoveryHash`

Stable Recovery Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { stableRecoveryHash } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export declare function stableRecoveryHash(value: unknown): string;
```

### 调用签名

```text
stableRecoveryHash(value: unknown): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `RecoveryAttemptRecord`

Recovery Attempt Record 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryAttemptRecord } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryAttemptRecord {
    cycle: number;
    participantId: string;
    module: RecoveryModule;
    strategy: RecoveryStrategy;
    fingerprint: string;
    startedAt: string;
    completedAt?: string;
    status: 'started' | 'succeeded' | 'failed' | 'no_progress' | 'skipped';
    evidenceBeforeHash: string;
    evidenceAfterHash?: string;
    errorCode?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cycle` | 属性 | <code>cycle: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `errorCode` | 属性 | <code>errorCode?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidenceAfterHash` | 属性 | <code>evidenceAfterHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidenceBeforeHash` | 属性 | <code>evidenceBeforeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fingerprint` | 属性 | <code>fingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `participantId` | 属性 | <code>participantId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `startedAt` | 属性 | <code>startedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "failed" &#124; "started" &#124; "succeeded" &#124; "no_progress" &#124; "skipped"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryCaseSnapshot`

Recovery Case Snapshot 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryCaseSnapshot } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryCaseSnapshot {
    id: string;
    runId: string;
    fsmState: string;
    rootFingerprint: string;
    status: RecoveryCaseStatus;
    openedAt: string;
    updatedAt: string;
    cycles: number;
    noProgressCycles: number;
    lastEvidenceHash: string;
    lastFailure?: RecoveryFailure;
    attempts: RecoveryAttemptRecord[];
    outputs: Record<string, unknown>;
    degradedParticipants: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `attempts` | 属性 | <code>attempts: RecoveryAttemptRecord[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cycles` | 属性 | <code>cycles: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `degradedParticipants` | 属性 | <code>degradedParticipants: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastEvidenceHash` | 属性 | <code>lastEvidenceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastFailure` | 属性 | <code>lastFailure?: RecoveryFailure</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `noProgressCycles` | 属性 | <code>noProgressCycles: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `openedAt` | 属性 | <code>openedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputs` | 属性 | <code>outputs: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootFingerprint` | 属性 | <code>rootFingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: RecoveryCaseStatus</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryConvergencePolicy`

Recovery Convergence Policy 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryConvergencePolicy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryConvergencePolicy {
    maxCycles: number;
    maxNoProgressCycles: number;
    maxSameStrategyAttempts: number;
    maxElapsedMs: number;
    onNoProgress: Extract<RecoveryStrategy, 'fallback' | 'degrade' | 'human_review' | 'quarantine' | 'fail'>;
    onExhausted: Extract<RecoveryStrategy, 'human_review' | 'quarantine' | 'fail'>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCycles` | 属性 | <code>maxCycles: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxElapsedMs` | 属性 | <code>maxElapsedMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxNoProgressCycles` | 属性 | <code>maxNoProgressCycles: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSameStrategyAttempts` | 属性 | <code>maxSameStrategyAttempts: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onExhausted` | 属性 | <code>onExhausted: "fail" &#124; "human_review" &#124; "quarantine"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `onNoProgress` | 属性 | <code>onNoProgress: "fail" &#124; "human_review" &#124; "fallback" &#124; "degrade" &#124; "quarantine"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryEvidence`

Facts that can prove whether a recovery attempt changed the underlying state. Callers should prefer stable revisions, receipts, checksums, and provider state over human-readable messages.

- 种类: 接口
- 导入: `import type { RecoveryEvidence } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryEvidence {
    observedAt: string;
    operationKey: string;
    dependencyKey?: string;
    state?: string;
    revision?: string | number;
    receiptStatus?: 'accepted' | 'completed' | 'rejected' | 'unknown';
    idempotencyKey?: string;
    inputHash?: string;
    outputHash?: string;
    policyRevision?: string;
    specRevision?: string;
    providerRevision?: string;
    sourceHashes?: Record<string, string>;
    markers?: Record<string, string | number | boolean | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dependencyKey` | 属性 | <code>dependencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputHash` | 属性 | <code>inputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `markers` | 属性 | <code>markers?: Record&lt;string, string &#124; number &#124; boolean&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationKey` | 属性 | <code>operationKey: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputHash` | 属性 | <code>outputHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptStatus` | 属性 | <code>receiptStatus?: "unknown" &#124; "accepted" &#124; "completed" &#124; "rejected"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string &#124; number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceHashes` | 属性 | <code>sourceHashes?: Record&lt;string, string&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `state` | 属性 | <code>state?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryFailure`

Recovery Failure 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryFailure } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryFailure {
    id: string;
    module: RecoveryModule;
    category: RecoveryCategory;
    code: string;
    message: string;
    occurredAt: string;
    retryable: boolean;
    sideEffectState: RecoverySideEffectState;
    compensationAvailable?: boolean;
    retryAfterMs?: number;
    circuitKey?: string;
    rootCauseKey?: string;
    evidence: RecoveryEvidence;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `category` | 属性 | <code>category: "unknown" &#124; "cancellation" &#124; "timeout" &#124; "validation" &#124; "policy_denied" &#124; "authentication" &#124; "authorization" &#124; "rate_limit" &#124; "transient_dependency" &#124; "permanent_dependency" &#124; "concurrency_conflict" &#124; "resource_exhausted" &#124; "tool_failure" &#124; "inference_failure" &#124; "memory_failure" &#124; "execution_failure" &#124; "storage_failure" &#124; "message_failure" &#124; "cache_failure" &#124; "invariant_violation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `circuitKey` | 属性 | <code>circuitKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `code` | 属性 | <code>code: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compensationAvailable` | 属性 | <code>compensationAvailable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evidence` | 属性 | <code>evidence: RecoveryEvidence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryAfterMs` | 属性 | <code>retryAfterMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rootCauseKey` | 属性 | <code>rootCauseKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectState` | 属性 | <code>sideEffectState: RecoverySideEffectState</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryKnowledge`

Recovery Knowledge 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryKnowledge } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryKnowledge {
    key: RecoveryKnowledgeKey;
    strategy: RecoveryStrategy;
    outcome: Extract<RecoveryCaseStatus, 'recovered' | 'degraded' | 'compensated' | 'failed'>;
    evidenceHash: string;
    learnedAt: string;
    expiresAt?: string;
    validation: {
        status: 'verified' | 'negative';
        sourceEventId?: string;
        proof?: Record<string, unknown>;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidenceHash` | 属性 | <code>evidenceHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `key` | 属性 | <code>key: RecoveryKnowledgeKey</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `learnedAt` | 属性 | <code>learnedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outcome` | 属性 | <code>outcome: "degraded" &#124; "failed" &#124; "recovered" &#124; "compensated"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `strategy` | 属性 | <code>strategy: "fail" &#124; "retry" &#124; "human_review" &#124; "reconcile" &#124; "fallback" &#124; "degrade" &#124; "compensate" &#124; "wait" &#124; "quarantine" &#124; "cancel"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `validation` | 属性 | <code>validation: { status: "verified" &#124; "negative"; sourceEventId?: string; proof?: Record&lt;string, unknown&gt;; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryKnowledgeKey`

Recovery Knowledge Key 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryKnowledgeKey } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryKnowledgeKey {
    fingerprint: string;
    participantId: string;
    /**
     * New runtime writes always include scope. Absence is accepted only for
     * legacy Provider migration and must not be persisted by strict adapters.
     */
    scope?: RecoveryKnowledgeScope;
    policyRevision?: string;
    specRevision?: string;
    providerRevision?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `fingerprint` | 属性 | <code>fingerprint: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `participantId` | 属性 | <code>participantId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRevision` | 属性 | <code>policyRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerRevision` | 属性 | <code>providerRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: RecoveryKnowledgeScope</code> | New runtime writes always include scope. Absence is accepted only for legacy Provider migration and must not be persisted by strict adapters. |
| `specRevision` | 属性 | <code>specRevision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryKnowledgePort`

Cache implementations are hints only. The supervisor must revalidate a hit.

- 种类: 接口
- 导入: `import type { RecoveryKnowledgePort } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryKnowledgePort {
    get(key: RecoveryKnowledgeKey): Promise<RecoveryKnowledge | null>;
    put(knowledge: RecoveryKnowledge): Promise<void>;
    invalidate(key: RecoveryKnowledgeKey, reason: string): Promise<void>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `get` | 方法 | <code>get(key: RecoveryKnowledgeKey): Promise&lt;RecoveryKnowledge &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `invalidate` | 方法 | <code>invalidate(key: RecoveryKnowledgeKey, reason: string): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(knowledge: RecoveryKnowledge): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `RecoveryKnowledgeScope`

Recovery Knowledge Scope 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RecoveryKnowledgeScope } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export interface RecoveryKnowledgeScope {
    tenantId?: string;
    userId: string;
    workspaceId?: string;
    sessionId?: string;
    agentId?: string;
    domainPackId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackId` | 属性 | <code>domainPackId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceId` | 属性 | <code>workspaceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RecoveryCaseStatus`

Recovery Case Status 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RecoveryCaseStatus } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export type RecoveryCaseStatus = 'active' | 'suspended' | 'recovered' | 'degraded' | 'compensated' | 'quarantined' | 'failed' | 'cancelled';
```

## `RecoveryCategory`

Recovery Category 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RecoveryCategory } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export type RecoveryCategory = (typeof RECOVERY_CATEGORIES)[number];
```

## `RecoveryModule`

Recovery Module 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RecoveryModule } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export type RecoveryModule = (typeof RECOVERY_MODULES)[number];
```

## `RecoverySideEffectState`

Recovery Side Effect State 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RecoverySideEffectState } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export type RecoverySideEffectState = 'none' | 'not_started' | 'committed' | 'unknown';
```

## `RecoveryStrategy`

Recovery Strategy 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { RecoveryStrategy } from '@codesoul-co/hypha-core';`
- 源码模块: [`contracts/recovery`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/recovery.ts)

### 声明

```text
export type RecoveryStrategy = (typeof RECOVERY_STRATEGIES)[number];
```
