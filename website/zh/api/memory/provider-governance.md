# `@codesoul-co/hypha-memory` / `provider-governance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/provider-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)
- 导出数: **8**

## 模块用法

用于把外部或本地 Provider 绑定到 Hypha Port。Provider governance 模块公开 1 类、2 函数、5 接口。

### 从包入口导入

```ts
import {
  InMemoryMemoryProviderQuota,
  createMemoryDeletionEvidence,
  verifyMemoryDeletionEvidence,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryDeletionEvidence,
  MemoryProviderBackupRestoreCapabilities,
  MemoryProviderQuotaDecision,
  MemoryProviderQuotaPolicy,
  MemoryProviderUsage,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryProviderQuota` | 类 | <code>new InMemoryMemoryProviderQuota(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | In Memory Memory Provider Quota 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `createMemoryDeletionEvidence` | 函数 | <code>createMemoryDeletionEvidence(input: { operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }): MemoryDeletionEvidence</code> | Create Memory Deletion Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `verifyMemoryDeletionEvidence` | 函数 | <code>verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean</code> | Verify Memory Deletion Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryDeletionEvidence` | 接口 | <code>interface MemoryDeletionEvidence</code> | Memory Deletion Evidence 接口，共包含 12 个公开字段或方法。 |
| `MemoryProviderBackupRestoreCapabilities` | 接口 | <code>interface MemoryProviderBackupRestoreCapabilities</code> | Memory Provider Backup Restore Capabilities 接口，共包含 7 个公开字段或方法。 |
| `MemoryProviderQuotaDecision` | 接口 | <code>interface MemoryProviderQuotaDecision</code> | Memory Provider Quota Decision 接口，共包含 4 个公开字段或方法。 |
| `MemoryProviderQuotaPolicy` | 接口 | <code>interface MemoryProviderQuotaPolicy</code> | Memory Provider Quota Policy 接口，共包含 5 个公开字段或方法。 |
| `MemoryProviderUsage` | 接口 | <code>interface MemoryProviderUsage</code> | Memory Provider Usage 接口，共包含 5 个公开字段或方法。 |

## `InMemoryMemoryProviderQuota`

In Memory Memory Provider Quota 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryMemoryProviderQuota } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export declare class InMemoryMemoryProviderQuota {
    constructor(policies: MemoryProviderQuotaPolicy[], now?: () => Date);
    check(providerId: string, requestedCostUnits?: number, requestedBytes?: number): MemoryProviderQuotaDecision;
    record(providerId: string, costUnits?: number, storedBytesDelta?: number): MemoryProviderUsage;
    snapshot(providerId: string): MemoryProviderUsage;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `check` | 方法 | <code>check(providerId: string, requestedCostUnits?: number, requestedBytes?: number): MemoryProviderQuotaDecision</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | 创建该类的实例。 |
| `record` | 方法 | <code>record(providerId: string, costUnits?: number, storedBytesDelta?: number): MemoryProviderUsage</code> | 公开方法；参数与返回类型以签名列为准。 |
| `snapshot` | 方法 | <code>snapshot(providerId: string): MemoryProviderUsage</code> | 公开方法；参数与返回类型以签名列为准。 |

## `createMemoryDeletionEvidence`

Create Memory Deletion Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createMemoryDeletionEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export declare function createMemoryDeletionEvidence(input: {
    operationId: string;
    providerId: string;
    scope: ManagedMemoryScope;
    requestedMemoryIds: string[];
    deletedMemoryIds: string[];
    mode: MemoryDeletionEvidence['mode'];
    completedAt?: string;
    providerReceiptRef?: string;
}): MemoryDeletionEvidence;
```

### 调用签名

```text
createMemoryDeletionEvidence(input: { operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }): MemoryDeletionEvidence
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>{ operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `MemoryDeletionEvidence`
- 说明: 返回值契约由上述类型定义。

## `verifyMemoryDeletionEvidence`

Verify Memory Deletion Evidence 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { verifyMemoryDeletionEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export declare function verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean;
```

### 调用签名

```text
verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `evidence` | <code>MemoryDeletionEvidence</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `boolean`
- 说明: 返回值契约由上述类型定义。

## `MemoryDeletionEvidence`

Memory Deletion Evidence 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryDeletionEvidence } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export interface MemoryDeletionEvidence {
    schemaVersion: '1.0';
    receiptId: string;
    operationId: string;
    providerId: string;
    scopeHash: string;
    requestedMemoryIds: string[];
    deletedMemoryIds: string[];
    pendingMemoryIds: string[];
    mode: 'soft' | 'hard' | 'compliance';
    completedAt: string;
    providerReceiptRef?: string;
    proofHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deletedMemoryIds` | 属性 | <code>deletedMemoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingMemoryIds` | 属性 | <code>pendingMemoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `proofHash` | 属性 | <code>proofHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerReceiptRef` | 属性 | <code>providerReceiptRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `receiptId` | 属性 | <code>receiptId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requestedMemoryIds` | 属性 | <code>requestedMemoryIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderBackupRestoreCapabilities`

Memory Provider Backup Restore Capabilities 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderBackupRestoreCapabilities } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export interface MemoryProviderBackupRestoreCapabilities {
    exportRecords: boolean;
    importRecords: boolean;
    exportVersions: boolean;
    preserveStableIds: boolean;
    preserveScopeHashes: boolean;
    pointInTimeRestore: boolean;
    providerReceiptExport: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `exportRecords` | 属性 | <code>exportRecords: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `exportVersions` | 属性 | <code>exportVersions: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `importRecords` | 属性 | <code>importRecords: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pointInTimeRestore` | 属性 | <code>pointInTimeRestore: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveScopeHashes` | 属性 | <code>preserveScopeHashes: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preserveStableIds` | 属性 | <code>preserveStableIds: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerReceiptExport` | 属性 | <code>providerReceiptExport: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderQuotaDecision`

Memory Provider Quota Decision 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderQuotaDecision } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export interface MemoryProviderQuotaDecision {
    allowed: boolean;
    reason?: 'operation_quota' | 'cost_quota' | 'storage_quota';
    remainingOperations: number;
    remainingCostUnits?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: "operation_quota" &#124; "cost_quota" &#124; "storage_quota"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `remainingCostUnits` | 属性 | <code>remainingCostUnits?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `remainingOperations` | 属性 | <code>remainingOperations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderQuotaPolicy`

Memory Provider Quota Policy 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderQuotaPolicy } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export interface MemoryProviderQuotaPolicy {
    providerId: string;
    windowMs: number;
    maxOperations: number;
    maxCostUnits?: number;
    maxStoredBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCostUnits` | 属性 | <code>maxCostUnits?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxOperations` | 属性 | <code>maxOperations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxStoredBytes` | 属性 | <code>maxStoredBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `windowMs` | 属性 | <code>windowMs: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryProviderUsage`

Memory Provider Usage 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryProviderUsage } from '@codesoul-co/hypha-memory';`
- 源码模块: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### 声明

```text
export interface MemoryProviderUsage {
    providerId: string;
    windowStartedAt: string;
    operations: number;
    costUnits: number;
    storedBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `costUnits` | 属性 | <code>costUnits: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operations` | 属性 | <code>operations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerId` | 属性 | <code>providerId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `storedBytes` | 属性 | <code>storedBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `windowStartedAt` | 属性 | <code>windowStartedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
