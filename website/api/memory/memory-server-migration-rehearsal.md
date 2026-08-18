# `@codesoul-co/hypha-memory` / `memory-server-migration-rehearsal`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-migration-rehearsal.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-rehearsal.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryServerMigrationRehearsal` | class | <code>new MemoryServerMigrationRehearsal(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | Runtime implementation for Memory Server Migration Rehearsal; see its public constructor and members below. |
| `planMemoryServerMigrationInventories` | function | <code>planMemoryServerMigrationInventories(legacyInput: readonly MemoryServerMigrationInventoryRecord[], canonicalInput: readonly MemoryServerMigrationInventoryRecord[]): MemoryServerMigrationInventoryPlan</code> | Plans Memory Server Migration Inventories at this module boundary. |
| `MemoryServerMigrationFinishInput` | interface | <code>interface MemoryServerMigrationFinishInput</code> | Field contract for Memory Server Migration Finish Input; see all contract members below. |
| `MemoryServerMigrationInventoryPlan` | interface | <code>interface MemoryServerMigrationInventoryPlan</code> | Field contract for Memory Server Migration Inventory Plan; see all contract members below. |
| `MemoryServerMigrationInventoryRecord` | interface | <code>interface MemoryServerMigrationInventoryRecord</code> | Field contract for Memory Server Migration Inventory Record; see all contract members below. |
| `MemoryServerMigrationPrepareInput` | interface | <code>interface MemoryServerMigrationPrepareInput</code> | Field contract for Memory Server Migration Prepare Input; see all contract members below. |
| `MemoryServerMigrationRehearsalCheckpoint` | interface | <code>interface MemoryServerMigrationRehearsalCheckpoint</code> | Field contract for Memory Server Migration Rehearsal Checkpoint; see all contract members below. |
| `MemoryServerMigrationRehearsalCheckpointStore` | interface | <code>interface MemoryServerMigrationRehearsalCheckpointStore</code> | Field contract for Memory Server Migration Rehearsal Checkpoint Store; see all contract members below. |
| `MemoryServerMigrationRehearsalDataPort` | interface | <code>interface MemoryServerMigrationRehearsalDataPort</code> | Field contract for Memory Server Migration Rehearsal Data Port; see all contract members below. |

## `MemoryServerMigrationRehearsal` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(data: MemoryServerMigrationRehearsalDataPort, store: MemoryServerMigrationRehearsalCheckpointStore): MemoryServerMigrationRehearsal</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(): Promise&lt;MemoryServerMigrationInventoryPlan&gt;</code> | Plans plan at this module boundary. |
| `prepare` | method | <code>prepare(input: MemoryServerMigrationPrepareInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | Public runtime operation for prepare. |
| `retire` | method | <code>retire(input: MemoryServerMigrationFinishInput &amp; { rollbackWindowEndsAt: string; }): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | Public runtime operation for retire. |
| `rollback` | method | <code>rollback(input: MemoryServerMigrationFinishInput): Promise&lt;MemoryServerMigrationRehearsalCheckpoint&gt;</code> | Public runtime operation for rollback. |

## `MemoryServerMigrationFinishInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedRevision` | property | <code>expectedRevision: string</code> | Public expected Revision property. |
| `migrationId` | property | <code>migrationId: string</code> | Public migration Id property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |

## `MemoryServerMigrationInventoryPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalRecords` | property | <code>canonicalRecords: number</code> | Public canonical Records property. |
| `digestMismatchKeys` | property | <code>digestMismatchKeys: string[]</code> | Public digest Mismatch Keys property. |
| `legacyRecords` | property | <code>legacyRecords: number</code> | Public legacy Records property. |
| `matchingRecords` | property | <code>matchingRecords: number</code> | Public matching Records property. |
| `missingCanonicalKeys` | property | <code>missingCanonicalKeys: string[]</code> | Public missing Canonical Keys property. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public reconciliation property. |
| `unexpectedCanonicalKeys` | property | <code>unexpectedCanonicalKeys: string[]</code> | Public unexpected Canonical Keys property. |

## `MemoryServerMigrationInventoryRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `digest` | property | <code>digest: string</code> | Public digest property. |
| `key` | property | <code>key: string</code> | Public key property. |

## `MemoryServerMigrationPrepareInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public checkpoint Ref property. |
| `dualWriteDeadlineAt` | property | <code>dualWriteDeadlineAt: string</code> | Public dual Write Deadline At property. |
| `migrationId` | property | <code>migrationId: string</code> | Public migration Id property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |

## `MemoryServerMigrationRehearsalCheckpoint` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: readonly MemoryServerMigrationTransitionEvent[]</code> | Public events property. |
| `importedCanonicalIds` | property | <code>importedCanonicalIds: readonly string[]</code> | Public imported Canonical Ids property. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public reconciliation property. |
| `state` | property | <code>state: MemoryServerCanonicalMigrationState</code> | Public state property. |

## `MemoryServerMigrationRehearsalCheckpointStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `load` | method | <code>load(migrationId: string): Promise&lt;MemoryServerMigrationRehearsalCheckpoint &#124; null&gt;</code> | Loads load at this module boundary. |
| `save` | method | <code>save(migrationId: string, checkpoint: MemoryServerMigrationRehearsalCheckpoint): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MemoryServerMigrationRehearsalDataPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `importCanonical` | method | <code>importCanonical(record: MemoryServerMigrationInventoryRecord, idempotencyKey: string): Promise&lt;{ canonicalId: string; }&gt;</code> | Public runtime operation for import Canonical. |
| `listCanonical` | method | <code>listCanonical(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | Lists Canonical at this module boundary. |
| `listLegacy` | method | <code>listLegacy(): Promise&lt;readonly MemoryServerMigrationInventoryRecord[]&gt;</code> | Lists Legacy at this module boundary. |
| `observeRetirement` | method | <code>observeRetirement(): Promise&lt;Omit&lt;MemoryServerMigrationRetirementEvidence, "rollbackWindowEndsAt"&gt;&gt;</code> | Public runtime operation for observe Retirement. |
| `removeCanonical` | method | <code>removeCanonical(canonicalIds: readonly string[]): Promise&lt;void&gt;</code> | Removes Canonical at this module boundary. |
| `writeDualProbe` | method | <code>writeDualProbe(idempotencyKey: string): Promise&lt;{ record: MemoryServerMigrationInventoryRecord; canonicalId: string; }&gt;</code> | Public runtime operation for write Dual Probe. |
