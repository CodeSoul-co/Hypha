# `@codesoul-co/hypha-memory` / `provider-governance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/provider-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryProviderQuota` | class | <code>new InMemoryMemoryProviderQuota(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | Runtime implementation for In Memory Memory Provider Quota; see its public constructor and members below. |
| `createMemoryDeletionEvidence` | function | <code>createMemoryDeletionEvidence(input: { operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }): MemoryDeletionEvidence</code> | Creates Memory Deletion Evidence at this module boundary. |
| `verifyMemoryDeletionEvidence` | function | <code>verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean</code> | Public runtime operation for verify Memory Deletion Evidence. |
| `MemoryDeletionEvidence` | interface | <code>interface MemoryDeletionEvidence</code> | Field contract for Memory Deletion Evidence; see all contract members below. |
| `MemoryProviderBackupRestoreCapabilities` | interface | <code>interface MemoryProviderBackupRestoreCapabilities</code> | Field contract for Memory Provider Backup Restore Capabilities; see all contract members below. |
| `MemoryProviderQuotaDecision` | interface | <code>interface MemoryProviderQuotaDecision</code> | Field contract for Memory Provider Quota Decision; see all contract members below. |
| `MemoryProviderQuotaPolicy` | interface | <code>interface MemoryProviderQuotaPolicy</code> | Field contract for Memory Provider Quota Policy; see all contract members below. |
| `MemoryProviderUsage` | interface | <code>interface MemoryProviderUsage</code> | Field contract for Memory Provider Usage; see all contract members below. |

## `InMemoryMemoryProviderQuota` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `check` | method | <code>check(providerId: string, requestedCostUnits?: number, requestedBytes?: number): MemoryProviderQuotaDecision</code> | Public runtime operation for check. |
| `constructor` | constructor | <code>(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | Creates an instance of this class. |
| `record` | method | <code>record(providerId: string, costUnits?: number, storedBytesDelta?: number): MemoryProviderUsage</code> | Records record at this module boundary. |
| `snapshot` | method | <code>snapshot(providerId: string): MemoryProviderUsage</code> | Public runtime operation for snapshot. |

## `MemoryDeletionEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `deletedMemoryIds` | property | <code>deletedMemoryIds: string[]</code> | Public deleted Memory Ids property. |
| `mode` | property | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | Public mode property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `pendingMemoryIds` | property | <code>pendingMemoryIds: string[]</code> | Public pending Memory Ids property. |
| `proofHash` | property | <code>proofHash: string</code> | Public proof Hash property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerReceiptRef` | property | <code>providerReceiptRef: string</code> | Public provider Receipt Ref property. |
| `receiptId` | property | <code>receiptId: string</code> | Public receipt Id property. |
| `requestedMemoryIds` | property | <code>requestedMemoryIds: string[]</code> | Public requested Memory Ids property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |

## `MemoryProviderBackupRestoreCapabilities` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `exportRecords` | property | <code>exportRecords: boolean</code> | Public export Records property. |
| `exportVersions` | property | <code>exportVersions: boolean</code> | Public export Versions property. |
| `importRecords` | property | <code>importRecords: boolean</code> | Public import Records property. |
| `pointInTimeRestore` | property | <code>pointInTimeRestore: boolean</code> | Public point In Time Restore property. |
| `preserveScopeHashes` | property | <code>preserveScopeHashes: boolean</code> | Public preserve Scope Hashes property. |
| `preserveStableIds` | property | <code>preserveStableIds: boolean</code> | Public preserve Stable Ids property. |
| `providerReceiptExport` | property | <code>providerReceiptExport: boolean</code> | Public provider Receipt Export property. |

## `MemoryProviderQuotaDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `reason` | property | <code>reason: "operation_quota" &#124; "cost_quota" &#124; "storage_quota"</code> | Public reason property. |
| `remainingCostUnits` | property | <code>remainingCostUnits: number</code> | Public remaining Cost Units property. |
| `remainingOperations` | property | <code>remainingOperations: number</code> | Public remaining Operations property. |

## `MemoryProviderQuotaPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCostUnits` | property | <code>maxCostUnits: number</code> | Public max Cost Units property. |
| `maxOperations` | property | <code>maxOperations: number</code> | Public max Operations property. |
| `maxStoredBytes` | property | <code>maxStoredBytes: number</code> | Public max Stored Bytes property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `windowMs` | property | <code>windowMs: number</code> | Public window Ms property. |

## `MemoryProviderUsage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `costUnits` | property | <code>costUnits: number</code> | Public cost Units property. |
| `operations` | property | <code>operations: number</code> | Public operations property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `storedBytes` | property | <code>storedBytes: number</code> | Public stored Bytes property. |
| `windowStartedAt` | property | <code>windowStartedAt: string</code> | Public window Started At property. |
