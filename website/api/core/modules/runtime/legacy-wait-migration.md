# `@codesoul-co/hypha-core` / `modules/runtime/legacy-wait-migration`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/legacy-wait-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LEGACY_HUMAN_WAIT_MIGRATION_VERSION` | constant | <code>const LEGACY_HUMAN_WAIT_MIGRATION_VERSION: "1.0.0"</code> | LEGACY HUMAN WAIT MIGRATION VERSION constant exported by the `modules/runtime/legacy-wait-migration` module. |
| `migrateLegacyHumanWaitEvent` | function | <code>migrateLegacyHumanWaitEvent&lt;TEvent extends FrameworkEvent&gt;(event: TEvent, priorPendingActionRef?: string): { event: TEvent; entry: LegacyHumanWaitMigrationEntry; }</code> | Public runtime operation for migrate Legacy Human Wait Event. |
| `migrateLegacyHumanWaitEvents` | function | <code>migrateLegacyHumanWaitEvents&lt;TEvent extends FrameworkEvent&gt;(events: readonly TEvent[]): LegacyHumanWaitMigrationResult&lt;TEvent&gt;</code> | Public runtime operation for migrate Legacy Human Wait Events. |
| `LegacyHumanWaitMigrationEntry` | interface | <code>interface LegacyHumanWaitMigrationEntry</code> | Field contract for Legacy Human Wait Migration Entry; see all contract members below. |
| `LegacyHumanWaitMigrationReport` | interface | <code>interface LegacyHumanWaitMigrationReport</code> | Field contract for Legacy Human Wait Migration Report; see all contract members below. |
| `LegacyHumanWaitMigrationResult` | interface | <code>interface LegacyHumanWaitMigrationResult</code> | Field contract for Legacy Human Wait Migration Result; see all contract members below. |
| `MigratableRuntimeEvent` | type | <code>type MigratableRuntimeEvent = FrameworkEvent &#124; PersistedFrameworkEvent</code> | Public type alias for Migratable Runtime Event. |

## `LegacyHumanWaitMigrationEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventId` | property | <code>eventId: string</code> | Public event Id property. |
| `pendingActionRef` | property | <code>pendingActionRef: string</code> | Public pending Action Ref property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `status` | property | <code>status: "quarantined" &#124; "current" &#124; "migrated"</code> | Public status property. |
| `waitId` | property | <code>waitId: string</code> | Public wait Id property. |

## `LegacyHumanWaitMigrationReport` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentEvents` | property | <code>currentEvents: number</code> | Public current Events property. |
| `entries` | property | <code>entries: LegacyHumanWaitMigrationEntry[]</code> | Public entries property. |
| `formatVersion` | property | <code>formatVersion: "1.0.0"</code> | Public format Version property. |
| `migratedEvents` | property | <code>migratedEvents: number</code> | Public migrated Events property. |
| `quarantinedEvents` | property | <code>quarantinedEvents: number</code> | Public quarantined Events property. |
| `quarantinedRunIds` | property | <code>quarantinedRunIds: string[]</code> | Public quarantined Run Ids property. |
| `scannedEvents` | property | <code>scannedEvents: number</code> | Public scanned Events property. |
| `waitingEvents` | property | <code>waitingEvents: number</code> | Public waiting Events property. |

## `LegacyHumanWaitMigrationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: TEvent[]</code> | Public events property. |
| `report` | property | <code>report: LegacyHumanWaitMigrationReport</code> | Public report property. |
