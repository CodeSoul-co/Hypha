# `@codesoul-co/hypha-memory` / `memory-server-consumer-migration`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-consumer-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)
- 导出数: **13**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedLegacyAdapterResponsibilities` | 常量 | <code>const allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]</code> | 由 `memory-server-consumer-migration` 模块导出的 allowed Legacy Adapter Responsibilities 常量。 |
| `assertCanonicalConsumerSet` | 函数 | <code>assertCanonicalConsumerSet(bindings: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void</code> | 断言 Canonical Consumer Set。 |
| `createMemoryServerCanonicalMigrationState` | 函数 | <code>createMemoryServerCanonicalMigrationState(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState</code> | 创建 Memory Server Canonical Migration State。 |
| `transitionMemoryServerCanonicalMigration` | 函数 | <code>transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult</code> | 迁移 Memory Server Canonical Migration。 |
| `CanonicalProfileSwitchObservation` | 接口 | <code>interface CanonicalProfileSwitchObservation</code> | Canonical Profile Switch Observation 的字段契约；完整字段见下表。 |
| `MemoryServerCanonicalMigrationState` | 接口 | <code>interface MemoryServerCanonicalMigrationState</code> | Memory Server Canonical Migration State 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationReconciliation` | 接口 | <code>interface MemoryServerMigrationReconciliation</code> | Memory Server Migration Reconciliation 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationRetirementEvidence` | 接口 | <code>interface MemoryServerMigrationRetirementEvidence</code> | Memory Server Migration Retirement Evidence 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationTransitionEvent` | 接口 | <code>interface MemoryServerMigrationTransitionEvent</code> | Memory Server Migration Transition Event 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationTransitionInput` | 接口 | <code>interface MemoryServerMigrationTransitionInput</code> | Memory Server Migration Transition Input 的字段契约；完整字段见下表。 |
| `MemoryServerMigrationTransitionResult` | 接口 | <code>interface MemoryServerMigrationTransitionResult</code> | Memory Server Migration Transition Result 的字段契约；完整字段见下表。 |
| `AllowedLegacyAdapterResponsibility` | 类型 | <code>type AllowedLegacyAdapterResponsibility = (typeof allowedLegacyAdapterResponsibilities)[number]</code> | Allowed Legacy Adapter Responsibility 的公共类型别名。 |
| `MemoryServerMigrationPhase` | 类型 | <code>type MemoryServerMigrationPhase = 'planned' &#124; 'shadow_read' &#124; 'bounded_dual_write' &#124; 'verify' &#124; 'cutover' &#124; 'retire' &#124; 'rollback'</code> | Memory Server Migration Phase 的公共类型别名。 |

## `CanonicalProfileSwitchObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `expectedProviderId` | 属性 | <code>expectedProviderId: string</code> | expected Provider Id 字段。 |
| `observedReadProviderId` | 属性 | <code>observedReadProviderId: string</code> | observed Read Provider Id 字段。 |
| `observedWriteProviderId` | 属性 | <code>observedWriteProviderId: string</code> | observed Write Provider Id 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |

## `MemoryServerCanonicalMigrationState` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activePath` | 属性 | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | active Path 字段。 |
| `dualWrite` | 属性 | <code>dualWrite: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | dual Write 字段。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | migration Id 字段。 |
| `phase` | 属性 | <code>phase: MemoryServerMigrationPhase</code> | phase 字段。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | reconciliation 字段。 |
| `retirement` | 属性 | <code>retirement: MemoryServerMigrationRetirementEvidence</code> | retirement 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `MemoryServerMigrationReconciliation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `comparedRecords` | 属性 | <code>comparedRecords: number</code> | compared Records 字段。 |
| `mismatchCount` | 属性 | <code>mismatchCount: number</code> | mismatch Count 字段。 |
| `shadowResult` | 属性 | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | shadow Result 字段。 |
| `status` | 属性 | <code>status: "failed" &#124; "not_run" &#124; "passed"</code> | status 字段。 |

## `MemoryServerMigrationRetirementEvidence` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `legacyImports` | 属性 | <code>legacyImports: number</code> | legacy Imports 字段。 |
| `legacyReadTraffic` | 属性 | <code>legacyReadTraffic: number</code> | legacy Read Traffic 字段。 |
| `legacyRegistrations` | 属性 | <code>legacyRegistrations: number</code> | legacy Registrations 字段。 |
| `legacyWriteTraffic` | 属性 | <code>legacyWriteTraffic: number</code> | legacy Write Traffic 字段。 |
| `rollbackWindowEndsAt` | 属性 | <code>rollbackWindowEndsAt: string</code> | rollback Window Ends At 字段。 |

## `MemoryServerMigrationTransitionEvent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activePath` | 属性 | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | active Path 字段。 |
| `checkpointRef` | 属性 | <code>checkpointRef: string</code> | checkpoint Ref 字段。 |
| `fromPhase` | 属性 | <code>fromPhase: MemoryServerMigrationPhase</code> | from Phase 字段。 |
| `migrationId` | 属性 | <code>migrationId: string</code> | migration Id 字段。 |
| `migrationRevision` | 属性 | <code>migrationRevision: string</code> | migration Revision 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `shadowResult` | 属性 | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | shadow Result 字段。 |
| `toPhase` | 属性 | <code>toPhase: MemoryServerMigrationPhase</code> | to Phase 字段。 |
| `type` | 属性 | <code>type: "memory.server_migration.transitioned"</code> | type 字段。 |

## `MemoryServerMigrationTransitionInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `dualWrite` | 属性 | <code>dualWrite: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | dual Write 字段。 |
| `expectedRevision` | 属性 | <code>expectedRevision: string</code> | expected Revision 字段。 |
| `occurredAt` | 属性 | <code>occurredAt: string</code> | occurred At 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `reconciliation` | 属性 | <code>reconciliation: MemoryServerMigrationReconciliation</code> | reconciliation 字段。 |
| `retirement` | 属性 | <code>retirement: MemoryServerMigrationRetirementEvidence</code> | retirement 字段。 |
| `targetPhase` | 属性 | <code>targetPhase: "verify" &#124; "shadow_read" &#124; "bounded_dual_write" &#124; "cutover" &#124; "retire" &#124; "rollback"</code> | target Phase 字段。 |

## `MemoryServerMigrationTransitionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `event` | 属性 | <code>event: MemoryServerMigrationTransitionEvent</code> | event 字段。 |
| `state` | 属性 | <code>state: MemoryServerCanonicalMigrationState</code> | state 字段。 |
