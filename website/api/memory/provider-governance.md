# `@codesoul-co/hypha-memory` / `provider-governance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/provider-governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)
- Exports: **8**

## Using this module

Use the Provider governance module for binding external or local providers to Hypha ports. It exports 1 class, 2 functions, 5 interfaces.

### Import from the package entrypoint

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

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryProviderQuota` | class | <code>new InMemoryMemoryProviderQuota(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | In Memory Memory Provider Quota class with 4 public constructor or member entries; its exact declarations are listed below. |
| `createMemoryDeletionEvidence` | function | <code>createMemoryDeletionEvidence(input: { operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }): MemoryDeletionEvidence</code> | Create Memory Deletion Evidence function with 1 public call signature; parameters and return types are listed below. |
| `verifyMemoryDeletionEvidence` | function | <code>verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean</code> | Verify Memory Deletion Evidence function with 1 public call signature; parameters and return types are listed below. |
| `MemoryDeletionEvidence` | interface | <code>interface MemoryDeletionEvidence</code> | Memory Deletion Evidence interface with 12 public fields or methods. |
| `MemoryProviderBackupRestoreCapabilities` | interface | <code>interface MemoryProviderBackupRestoreCapabilities</code> | Memory Provider Backup Restore Capabilities interface with 7 public fields or methods. |
| `MemoryProviderQuotaDecision` | interface | <code>interface MemoryProviderQuotaDecision</code> | Memory Provider Quota Decision interface with 4 public fields or methods. |
| `MemoryProviderQuotaPolicy` | interface | <code>interface MemoryProviderQuotaPolicy</code> | Memory Provider Quota Policy interface with 5 public fields or methods. |
| `MemoryProviderUsage` | interface | <code>interface MemoryProviderUsage</code> | Memory Provider Usage interface with 5 public fields or methods. |

## `InMemoryMemoryProviderQuota`

In Memory Memory Provider Quota class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMemoryProviderQuota } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

```text
export declare class InMemoryMemoryProviderQuota {
    constructor(policies: MemoryProviderQuotaPolicy[], now?: () => Date);
    check(providerId: string, requestedCostUnits?: number, requestedBytes?: number): MemoryProviderQuotaDecision;
    record(providerId: string, costUnits?: number, storedBytesDelta?: number): MemoryProviderUsage;
    snapshot(providerId: string): MemoryProviderUsage;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `check` | method | <code>check(providerId: string, requestedCostUnits?: number, requestedBytes?: number): MemoryProviderQuotaDecision</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(policies: MemoryProviderQuotaPolicy[], now?: () =&gt; Date): InMemoryMemoryProviderQuota</code> | Creates an instance of this class. |
| `record` | method | <code>record(providerId: string, costUnits?: number, storedBytesDelta?: number): MemoryProviderUsage</code> | Public method; parameters and return type are shown in the signature. |
| `snapshot` | method | <code>snapshot(providerId: string): MemoryProviderUsage</code> | Public method; parameters and return type are shown in the signature. |

## `createMemoryDeletionEvidence`

Create Memory Deletion Evidence function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemoryDeletionEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

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

### Call signature

```text
createMemoryDeletionEvidence(input: { operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }): MemoryDeletionEvidence
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ operationId: string; providerId: string; scope: ManagedMemoryScope; requestedMemoryIds: string[]; deletedMemoryIds: string[]; mode: MemoryDeletionEvidence["mode"]; completedAt?: string; providerReceiptRef?: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryDeletionEvidence`
- Description: The return contract is defined by the type shown above.

## `verifyMemoryDeletionEvidence`

Verify Memory Deletion Evidence function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { verifyMemoryDeletionEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

```text
export declare function verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean;
```

### Call signature

```text
verifyMemoryDeletionEvidence(evidence: MemoryDeletionEvidence): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `evidence` | <code>MemoryDeletionEvidence</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `MemoryDeletionEvidence`

Memory Deletion Evidence interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDeletionEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deletedMemoryIds` | property | <code>deletedMemoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "soft" &#124; "hard" &#124; "compliance"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingMemoryIds` | property | <code>pendingMemoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `proofHash` | property | <code>proofHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerReceiptRef` | property | <code>providerReceiptRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receiptId` | property | <code>receiptId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedMemoryIds` | property | <code>requestedMemoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderBackupRestoreCapabilities`

Memory Provider Backup Restore Capabilities interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderBackupRestoreCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `exportRecords` | property | <code>exportRecords: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exportVersions` | property | <code>exportVersions: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importRecords` | property | <code>importRecords: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pointInTimeRestore` | property | <code>pointInTimeRestore: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveScopeHashes` | property | <code>preserveScopeHashes: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveStableIds` | property | <code>preserveStableIds: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerReceiptExport` | property | <code>providerReceiptExport: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderQuotaDecision`

Memory Provider Quota Decision interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderQuotaDecision } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

```text
export interface MemoryProviderQuotaDecision {
    allowed: boolean;
    reason?: 'operation_quota' | 'cost_quota' | 'storage_quota';
    remainingOperations: number;
    remainingCostUnits?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: "operation_quota" &#124; "cost_quota" &#124; "storage_quota"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `remainingCostUnits` | property | <code>remainingCostUnits?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `remainingOperations` | property | <code>remainingOperations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderQuotaPolicy`

Memory Provider Quota Policy interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderQuotaPolicy } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

```text
export interface MemoryProviderQuotaPolicy {
    providerId: string;
    windowMs: number;
    maxOperations: number;
    maxCostUnits?: number;
    maxStoredBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCostUnits` | property | <code>maxCostUnits?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxOperations` | property | <code>maxOperations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxStoredBytes` | property | <code>maxStoredBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `windowMs` | property | <code>windowMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryProviderUsage`

Memory Provider Usage interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryProviderUsage } from '@codesoul-co/hypha-memory';`
- Source module: [`provider-governance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/provider-governance.ts)

### Declaration

```text
export interface MemoryProviderUsage {
    providerId: string;
    windowStartedAt: string;
    operations: number;
    costUnits: number;
    storedBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `costUnits` | property | <code>costUnits: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operations` | property | <code>operations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storedBytes` | property | <code>storedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `windowStartedAt` | property | <code>windowStartedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
