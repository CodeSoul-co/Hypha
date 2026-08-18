# `@codesoul-co/hypha-memory` / `memory-server-migration-rehearsal`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-rehearsal.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)
- Exports: **9**

## Using this module

Use the Memory server migration rehearsal module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function, 7 interfaces.

### Import from the package entrypoint

```ts
import {
  MemoryServerMigrationRehearsal,
  planMemoryServerMigrationInventories,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryServerMigrationFinishInput,
  MemoryServerMigrationInventoryPlan,
  MemoryServerMigrationInventoryRecord,
  MemoryServerMigrationPrepareInput,
  MemoryServerMigrationRehearsalCheckpoint,
  MemoryServerMigrationRehearsalCheckpointStore,
  MemoryServerMigrationRehearsalDataPort,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryServerMigrationRehearsal` | class | <code>new MemoryServerMigrationRehearsal(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | Memory Server Migration Rehearsal class with 5 public constructor or member entries; its exact declarations are listed below. |
| `planMemoryServerMigrationInventories` | function | <code>planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan</code> | Plan Memory Server Migration Inventories function with 1 public call signature; parameters and return types are listed below. |
| `MemoryServerMigrationFinishInput` | interface | <code>interface MemoryServerMigrationFinishInput</code> | Memory Server Migration Finish Input interface with 3 public fields or methods. |
| `MemoryServerMigrationInventoryPlan` | interface | <code>interface MemoryServerMigrationInventoryPlan</code> | Memory Server Migration Inventory Plan interface with 7 public fields or methods. |
| `MemoryServerMigrationInventoryRecord` | interface | <code>interface MemoryServerMigrationInventoryRecord</code> | Memory Server Migration Inventory Record interface with 2 public fields or methods. |
| `MemoryServerMigrationPrepareInput` | interface | <code>interface MemoryServerMigrationPrepareInput</code> | Memory Server Migration Prepare Input interface with 5 public fields or methods. |
| `MemoryServerMigrationRehearsalCheckpoint` | interface | <code>interface MemoryServerMigrationRehearsalCheckpoint</code> | Memory Server Migration Rehearsal Checkpoint interface with 4 public fields or methods. |
| `MemoryServerMigrationRehearsalCheckpointStore` | interface | <code>interface MemoryServerMigrationRehearsalCheckpointStore</code> | Memory Server Migration Rehearsal Checkpoint Store interface with 2 public fields or methods. |
| `MemoryServerMigrationRehearsalDataPort` | interface | <code>interface MemoryServerMigrationRehearsalDataPort</code> | Memory Server Migration Rehearsal Data Port interface with 6 public fields or methods. |

## `MemoryServerMigrationRehearsal`

Memory Server Migration Rehearsal class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryServerMigrationRehearsal } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export declare class MemoryServerMigrationRehearsal {
    constructor(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore);
    plan(): Promise<MemoryServerMigrationInventoryPlan>;
    prepare(input: MemoryServerMigrationPrepareInput): Promise<MemoryServerMigrationRehearsalCheckpoint>;
    rollback(input: MemoryServerMigrationFinishInput): Promise<MemoryServerMigrationRehearsalCheckpoint>;
    retire(input: MemoryServerMigrationFinishInput & {
            rollbackWindowEndsAt: string;
        }): Promise<MemoryServerMigrationRehearsalCheckpoint>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(): Promise&lt;MemoryServerMigrationInventoryPlan&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `prepare` | method | <code>prepare(input: MemoryServerMigrationPrepareInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `retire` | method | <code>retire(input: MemoryServerMigrationFinishInput &amp; { rollbackWindowEndsAt: string; }): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `rollback` | method | <code>rollback(input: MemoryServerMigrationFinishInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `planMemoryServerMigrationInventories`

Plan Memory Server Migration Inventories function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { planMemoryServerMigrationInventories } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export declare function planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan;
```

### Call signature

```text
planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `legacyInput` | <code>readonly MemoryServerMigrationInventoryRecord[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `canonicalInput` | <code>readonly MemoryServerMigrationInventoryRecord[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryServerMigrationInventoryPlan`
- Description: The return contract is defined by the type shown above.

## `MemoryServerMigrationFinishInput`

Memory Server Migration Finish Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationFinishInput } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationFinishInput {
    migrationId: string;
    expectedRevision: string;
    occurredAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migrationId` | property | <code>migrationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationInventoryPlan`

Memory Server Migration Inventory Plan interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationInventoryPlan } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationInventoryPlan {
    legacyRecords: number;
    canonicalRecords: number;
    matchingRecords: number;
    missingCanonicalKeys: string[];
    unexpectedCanonicalKeys: string[];
    digestMismatchKeys: string[];
    reconciliation: MemoryServerMigrationReconciliation;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalRecords` | property | <code>canonicalRecords: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `digestMismatchKeys` | property | <code>digestMismatchKeys: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyRecords` | property | <code>legacyRecords: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `matchingRecords` | property | <code>matchingRecords: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingCanonicalKeys` | property | <code>missingCanonicalKeys: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `unexpectedCanonicalKeys` | property | <code>unexpectedCanonicalKeys: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationInventoryRecord`

Memory Server Migration Inventory Record interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationInventoryRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationInventoryRecord {
    key: string;
    digest: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `digest` | property | <code>digest: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationPrepareInput`

Memory Server Migration Prepare Input interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationPrepareInput } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationPrepareInput {
    migrationId: string;
    revision: string;
    occurredAt: string;
    dualWriteDeadlineAt: string;
    checkpointRef: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dualWriteDeadlineAt` | property | <code>dualWriteDeadlineAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migrationId` | property | <code>migrationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationRehearsalCheckpoint`

Memory Server Migration Rehearsal Checkpoint interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationRehearsalCheckpoint } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationRehearsalCheckpoint {
    state: MemoryServerCanonicalMigrationState;
    events: readonly MemoryServerMigrationTransitionEvent[];
    importedCanonicalIds: readonly string[];
    reconciliation: MemoryServerMigrationReconciliation;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: readonly MemoryServerMigrationTransitionEvent[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importedCanonicalIds` | property | <code>importedCanonicalIds: readonly string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: MemoryServerCanonicalMigrationState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationRehearsalCheckpointStore`

Memory Server Migration Rehearsal Checkpoint Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationRehearsalCheckpointStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationRehearsalCheckpointStore {
    load(migrationId: string): Promise<MemoryServerMigrationRehearsalCheckpoint | null>;
    save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `load` | method | <code>load(migrationId: string): Promise&lt;MemoryServerMigrationRehearsalCheckpoint &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryServerMigrationRehearsalDataPort`

Memory Server Migration Rehearsal Data Port interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationRehearsalDataPort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-rehearsal`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)

### Declaration

```text
export interface MemoryServerMigrationRehearsalDataPort {
    listLegacy(): Promise<readonly MemoryServerMigrationInventoryRecord[]>;
    listCanonical(): Promise<readonly MemoryServerMigrationInventoryRecord[]>;
    importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string): Promise<{
        canonicalId: string;
    }>;
    writeDualProbe(idempotencyKey: string): Promise<{
        record: MemoryServerMigrationInventoryRecord;
        canonicalId: string;
    }>;
    removeCanonical(canonicalIds: readonly string[]): Promise<void>;
    observeRetirement(): Promise<Omit<MemoryServerMigrationRetirementEvidence, 'rollbackWindowEndsAt'>>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `importCanonical` | method | <code>importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string): Promise&lt;{ canonicalId: string; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listCanonical` | method | <code>listCanonical(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listLegacy` | method | <code>listLegacy(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `observeRetirement` | method | <code>observeRetirement(): Promise&lt;Omit&lt;MemoryServerMigrationRetirementEvidence, "rollbackWindowEndsAt"&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `removeCanonical` | method | <code>removeCanonical(canonicalIds: readonly string[]): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `writeDualProbe` | method | <code>writeDualProbe(idempotencyKey: string): Promise&lt;{ record: MemoryServerMigrationInventoryRecord; canonicalId: string; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
