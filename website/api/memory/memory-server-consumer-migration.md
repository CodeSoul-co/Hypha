# `@codesoul-co/hypha-memory` / `memory-server-consumer-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-consumer-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)
- Exports: **13**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedLegacyAdapterResponsibilities` | constant | <code>const allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]</code> | allowed Legacy Adapter Responsibilities constant exported by the `memory-server-consumer-migration` module. |
| `assertCanonicalConsumerSet` | function | <code>assertCanonicalConsumerSet(bindings: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void</code> | Asserts Canonical Consumer Set at this module boundary. |
| `createMemoryServerCanonicalMigrationState` | function | <code>createMemoryServerCanonicalMigrationState(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState</code> | Creates Memory Server Canonical Migration State at this module boundary. |
| `transitionMemoryServerCanonicalMigration` | function | <code>transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult</code> | Transitions Memory Server Canonical Migration at this module boundary. |
| `CanonicalProfileSwitchObservation` | interface | <code>interface CanonicalProfileSwitchObservation</code> | Field contract for Canonical Profile Switch Observation; see all contract members below. |
| `MemoryServerCanonicalMigrationState` | interface | <code>interface MemoryServerCanonicalMigrationState</code> | Field contract for Memory Server Canonical Migration State; see all contract members below. |
| `MemoryServerMigrationReconciliation` | interface | <code>interface MemoryServerMigrationReconciliation</code> | Field contract for Memory Server Migration Reconciliation; see all contract members below. |
| `MemoryServerMigrationRetirementEvidence` | interface | <code>interface MemoryServerMigrationRetirementEvidence</code> | Field contract for Memory Server Migration Retirement Evidence; see all contract members below. |
| `MemoryServerMigrationTransitionEvent` | interface | <code>interface MemoryServerMigrationTransitionEvent</code> | Field contract for Memory Server Migration Transition Event; see all contract members below. |
| `MemoryServerMigrationTransitionInput` | interface | <code>interface MemoryServerMigrationTransitionInput</code> | Field contract for Memory Server Migration Transition Input; see all contract members below. |
| `MemoryServerMigrationTransitionResult` | interface | <code>interface MemoryServerMigrationTransitionResult</code> | Field contract for Memory Server Migration Transition Result; see all contract members below. |
| `AllowedLegacyAdapterResponsibility` | type | <code>type AllowedLegacyAdapterResponsibility = (typeof allowedLegacyAdapterResponsibilities)[number]</code> | Public type alias for Allowed Legacy Adapter Responsibility. |
| `MemoryServerMigrationPhase` | type | <code>type MemoryServerMigrationPhase = 'planned' &#124; 'shadow_read' &#124; 'bounded_dual_write' &#124; 'verify' &#124; 'cutover' &#124; 'retire' &#124; 'rollback'</code> | Public type alias for Memory Server Migration Phase. |

## `CanonicalProfileSwitchObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedProviderId` | property | <code>expectedProviderId: string</code> | Public expected Provider Id property. |
| `observedReadProviderId` | property | <code>observedReadProviderId: string</code> | Public observed Read Provider Id property. |
| `observedWriteProviderId` | property | <code>observedWriteProviderId: string</code> | Public observed Write Provider Id property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |

## `MemoryServerCanonicalMigrationState` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activePath` | property | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | Public active Path property. |
| `dualWrite` | property | <code>dualWrite: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | Public dual Write property. |
| `migrationId` | property | <code>migrationId: string</code> | Public migration Id property. |
| `phase` | property | <code>phase: MemoryServerMigrationPhase</code> | Public phase property. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public reconciliation property. |
| `retirement` | property | <code>retirement: MemoryServerMigrationRetirementEvidence</code> | Public retirement property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `MemoryServerMigrationReconciliation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `comparedRecords` | property | <code>comparedRecords: number</code> | Public compared Records property. |
| `mismatchCount` | property | <code>mismatchCount: number</code> | Public mismatch Count property. |
| `shadowResult` | property | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | Public shadow Result property. |
| `status` | property | <code>status: "failed" &#124; "not_run" &#124; "passed"</code> | Public status property. |

## `MemoryServerMigrationRetirementEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `legacyImports` | property | <code>legacyImports: number</code> | Public legacy Imports property. |
| `legacyReadTraffic` | property | <code>legacyReadTraffic: number</code> | Public legacy Read Traffic property. |
| `legacyRegistrations` | property | <code>legacyRegistrations: number</code> | Public legacy Registrations property. |
| `legacyWriteTraffic` | property | <code>legacyWriteTraffic: number</code> | Public legacy Write Traffic property. |
| `rollbackWindowEndsAt` | property | <code>rollbackWindowEndsAt: string</code> | Public rollback Window Ends At property. |

## `MemoryServerMigrationTransitionEvent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activePath` | property | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | Public active Path property. |
| `checkpointRef` | property | <code>checkpointRef: string</code> | Public checkpoint Ref property. |
| `fromPhase` | property | <code>fromPhase: MemoryServerMigrationPhase</code> | Public from Phase property. |
| `migrationId` | property | <code>migrationId: string</code> | Public migration Id property. |
| `migrationRevision` | property | <code>migrationRevision: string</code> | Public migration Revision property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `shadowResult` | property | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | Public shadow Result property. |
| `toPhase` | property | <code>toPhase: MemoryServerMigrationPhase</code> | Public to Phase property. |
| `type` | property | <code>type: "memory.server_migration.transitioned"</code> | Public type property. |

## `MemoryServerMigrationTransitionInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dualWrite` | property | <code>dualWrite: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | Public dual Write property. |
| `expectedRevision` | property | <code>expectedRevision: string</code> | Public expected Revision property. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public occurred At property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public reconciliation property. |
| `retirement` | property | <code>retirement: MemoryServerMigrationRetirementEvidence</code> | Public retirement property. |
| `targetPhase` | property | <code>targetPhase: "verify" &#124; "shadow_read" &#124; "bounded_dual_write" &#124; "cutover" &#124; "retire" &#124; "rollback"</code> | Public target Phase property. |

## `MemoryServerMigrationTransitionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `event` | property | <code>event: MemoryServerMigrationTransitionEvent</code> | Public event property. |
| `state` | property | <code>state: MemoryServerCanonicalMigrationState</code> | Public state property. |
