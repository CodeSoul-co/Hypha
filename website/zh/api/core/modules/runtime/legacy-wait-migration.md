# `@codesoul-co/hypha-core` / `modules/runtime/legacy-wait-migration`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/legacy-wait-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LEGACY_HUMAN_WAIT_MIGRATION_VERSION` | 常量 | <code>const LEGACY_HUMAN_WAIT_MIGRATION_VERSION: "1.0.0"</code> | 由 `modules/runtime/legacy-wait-migration` 模块导出的 LEGACY HUMAN WAIT MIGRATION VERSION 常量。 |
| `migrateLegacyHumanWaitEvent` | 函数 | <code>migrateLegacyHumanWaitEvent&lt;TEvent extends FrameworkEvent&gt;(event: TEvent, priorPendingActionRef?: string): { event: TEvent; entry: LegacyHumanWaitMigrationEntry; }</code> | migrate Legacy Human Wait Event 的公开运行时操作。 |
| `migrateLegacyHumanWaitEvents` | 函数 | <code>migrateLegacyHumanWaitEvents&lt;TEvent extends FrameworkEvent&gt;(events: readonly TEvent[]): LegacyHumanWaitMigrationResult&lt;TEvent&gt;</code> | migrate Legacy Human Wait Events 的公开运行时操作。 |
| `LegacyHumanWaitMigrationEntry` | 接口 | <code>interface LegacyHumanWaitMigrationEntry</code> | Legacy Human Wait Migration Entry 的字段契约；完整字段见下表。 |
| `LegacyHumanWaitMigrationReport` | 接口 | <code>interface LegacyHumanWaitMigrationReport</code> | Legacy Human Wait Migration Report 的字段契约；完整字段见下表。 |
| `LegacyHumanWaitMigrationResult` | 接口 | <code>interface LegacyHumanWaitMigrationResult</code> | Legacy Human Wait Migration Result 的字段契约；完整字段见下表。 |
| `MigratableRuntimeEvent` | 类型 | <code>type MigratableRuntimeEvent = FrameworkEvent &#124; PersistedFrameworkEvent</code> | Migratable Runtime Event 的公共类型别名。 |

## `LegacyHumanWaitMigrationEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventId` | 属性 | <code>eventId: string</code> | event Id 字段。 |
| `pendingActionRef` | 属性 | <code>pendingActionRef: string</code> | pending Action Ref 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `status` | 属性 | <code>status: "quarantined" &#124; "current" &#124; "migrated"</code> | status 字段。 |
| `waitId` | 属性 | <code>waitId: string</code> | wait Id 字段。 |

## `LegacyHumanWaitMigrationReport` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentEvents` | 属性 | <code>currentEvents: number</code> | current Events 字段。 |
| `entries` | 属性 | <code>entries: LegacyHumanWaitMigrationEntry[]</code> | entries 字段。 |
| `formatVersion` | 属性 | <code>formatVersion: "1.0.0"</code> | format Version 字段。 |
| `migratedEvents` | 属性 | <code>migratedEvents: number</code> | migrated Events 字段。 |
| `quarantinedEvents` | 属性 | <code>quarantinedEvents: number</code> | quarantined Events 字段。 |
| `quarantinedRunIds` | 属性 | <code>quarantinedRunIds: string[]</code> | quarantined Run Ids 字段。 |
| `scannedEvents` | 属性 | <code>scannedEvents: number</code> | scanned Events 字段。 |
| `waitingEvents` | 属性 | <code>waitingEvents: number</code> | waiting Events 字段。 |

## `LegacyHumanWaitMigrationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: TEvent[]</code> | events 字段。 |
| `report` | 属性 | <code>report: LegacyHumanWaitMigrationReport</code> | report 字段。 |
