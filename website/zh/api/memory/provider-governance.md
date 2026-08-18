# `@codesoul-co/hypha-memory` / `provider-governance`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/provider-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryProviderQuota` | 类 | <code>new InMemoryMemoryProviderQuota(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | In Memory Memory Provider Quota 的运行时实现；公开构造函数与成员见下表。 |
| `createMemoryDeletionEvidence` | 函数 | <code>createMemoryDeletionEvidence(input: { operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }): MemoryDeletionEvidence</code> | 创建 Memory Deletion Evidence。 |
| `verifyMemoryDeletionEvidence` | 函数 | <code>verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean</code> | verify Memory Deletion Evidence 的公开运行时操作。 |
| `MemoryDeletionEvidence` | 接口 | <code>interface MemoryDeletionEvidence</code> | Memory Deletion Evidence 的字段契约；完整字段见下表。 |
| `MemoryProviderBackupRestoreCapabilities` | 接口 | <code>interface MemoryProviderBackupRestoreCapabilities</code> | Memory Provider Backup Restore Capabilities 的字段契约；完整字段见下表。 |
| `MemoryProviderQuotaDecision` | 接口 | <code>interface MemoryProviderQuotaDecision</code> | Memory Provider Quota Decision 的字段契约；完整字段见下表。 |
| `MemoryProviderQuotaPolicy` | 接口 | <code>interface MemoryProviderQuotaPolicy</code> | Memory Provider Quota Policy 的字段契约；完整字段见下表。 |
| `MemoryProviderUsage` | 接口 | <code>interface MemoryProviderUsage</code> | Memory Provider Usage 的字段契约；完整字段见下表。 |

## `InMemoryMemoryProviderQuota` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `check` | 方法 | <code>check(providerId: string, requestedCostUnits?: number, requestedBytes?: number): MemoryProviderQuotaDecision</code> | check 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | 创建该类的实例。 |
| `record` | 方法 | <code>record(providerId: string, costUnits?: number, storedBytesDelta?: number): MemoryProviderUsage</code> | 记录 record。 |
| `snapshot` | 方法 | <code>snapshot(providerId: string): MemoryProviderUsage</code> | snapshot 的公开运行时操作。 |

## `MemoryDeletionEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `deletedMemoryIds` | 属性 | <code>deletedMemoryIds: string[]</code> | deleted Memory Ids 字段。 |
| `mode` | 属性 | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | mode 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `pendingMemoryIds` | 属性 | <code>pendingMemoryIds: string[]</code> | pending Memory Ids 字段。 |
| `proofHash` | 属性 | <code>proofHash: string</code> | proof Hash 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerReceiptRef` | 属性 | <code>providerReceiptRef: string</code> | provider Receipt Ref 字段。 |
| `receiptId` | 属性 | <code>receiptId: string</code> | receipt Id 字段。 |
| `requestedMemoryIds` | 属性 | <code>requestedMemoryIds: string[]</code> | requested Memory Ids 字段。 |
| `schemaVersion` | 属性 | <code>schemaVersion: "1.0"</code> | schema Version 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |

## `MemoryProviderBackupRestoreCapabilities` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `exportRecords` | 属性 | <code>exportRecords: boolean</code> | export Records 字段。 |
| `exportVersions` | 属性 | <code>exportVersions: boolean</code> | export Versions 字段。 |
| `importRecords` | 属性 | <code>importRecords: boolean</code> | import Records 字段。 |
| `pointInTimeRestore` | 属性 | <code>pointInTimeRestore: boolean</code> | point In Time Restore 字段。 |
| `preserveScopeHashes` | 属性 | <code>preserveScopeHashes: boolean</code> | preserve Scope Hashes 字段。 |
| `preserveStableIds` | 属性 | <code>preserveStableIds: boolean</code> | preserve Stable Ids 字段。 |
| `providerReceiptExport` | 属性 | <code>providerReceiptExport: boolean</code> | provider Receipt Export 字段。 |

## `MemoryProviderQuotaDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `reason` | 属性 | <code>reason: "operation_quota" &#124; "cost_quota" &#124; "storage_quota"</code> | reason 字段。 |
| `remainingCostUnits` | 属性 | <code>remainingCostUnits: number</code> | remaining Cost Units 字段。 |
| `remainingOperations` | 属性 | <code>remainingOperations: number</code> | remaining Operations 字段。 |

## `MemoryProviderQuotaPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCostUnits` | 属性 | <code>maxCostUnits: number</code> | max Cost Units 字段。 |
| `maxOperations` | 属性 | <code>maxOperations: number</code> | max Operations 字段。 |
| `maxStoredBytes` | 属性 | <code>maxStoredBytes: number</code> | max Stored Bytes 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `windowMs` | 属性 | <code>windowMs: number</code> | window Ms 字段。 |

## `MemoryProviderUsage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `costUnits` | 属性 | <code>costUnits: number</code> | cost Units 字段。 |
| `operations` | 属性 | <code>operations: number</code> | operations 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `storedBytes` | 属性 | <code>storedBytes: number</code> | stored Bytes 字段。 |
| `windowStartedAt` | 属性 | <code>windowStartedAt: string</code> | window Started At 字段。 |
