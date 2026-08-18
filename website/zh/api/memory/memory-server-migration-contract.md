# `@codesoul-co/hypha-memory` / `memory-server-migration-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-server-migration-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptance` | 常量 | <code>const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance</code> | 由 `memory-server-migration-contract` 模块导出的 memory Server Migration Acceptance 常量。 |
| `verifyRedisWorkingMemoryRetention` | 函数 | <code>verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[]</code> | verify Redis Working Memory Retention 的公开运行时操作。 |
| `MemoryServerMigrationAcceptance` | 接口 | <code>interface MemoryServerMigrationAcceptance</code> | Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests. |
| `MemoryServerMigrationSharedFixture` | 接口 | <code>interface MemoryServerMigrationSharedFixture</code> | Memory Server Migration Shared Fixture 的字段契约；完整字段见下表。 |
| `RedisWorkingMemoryRetentionCase` | 接口 | <code>interface RedisWorkingMemoryRetentionCase</code> | Redis Working Memory Retention Case 的字段契约；完整字段见下表。 |
| `MemoryServerConsumer` | 类型 | <code>type MemoryServerConsumer = 'chat' &#124; 'memory-routes' &#124; 'tool' &#124; 'workflow' &#124; 'harness'</code> | Memory Server Consumer 的公共类型别名。 |
| `MemoryServerMigrationIssue` | 类型 | <code>type MemoryServerMigrationIssue = 'P0-1' &#124; 'P0-2' &#124; 'P0-3'</code> | Memory Server Migration Issue 的公共类型别名。 |

## `MemoryServerMigrationAcceptance` 契约字段

Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalConsumption` | 属性 | <code>canonicalConsumption: { serviceRegistration: "single"; minimumProfileSwitchCases: 2; compositionReceiptRequired: true; allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]; prohibitedLegacyAdapterResponsibilities: readonly ["business_rules", "provider_selection", "independent_persistence"]; }</code> | canonical Consumption 字段。 |
| `canonicalService` | 属性 | <code>canonicalService: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | canonical Service 字段。 |
| `contractRef` | 属性 | <code>contractRef: MemoryContractSpecRef</code> | contract Ref 字段。 |
| `issues` | 属性 | <code>issues: readonly ["P0-1", "P0-2", "P0-3"]</code> | issues 字段。 |
| `migration` | 属性 | <code>migration: { phases: readonly ["planned", "shadow_read", "bounded_dual_write", "verify", "cutover", "retire", "rollback"]; dualWriteRequirements: readonly ["deadlineAt", "revision", "idempotencyKey", "checkpointRef"]; requiredEventFields: readonly ["migrationRevision", "activePath", "shadowResult", "reason"]; retirementConditions: readonly ["legacyReadTraffic", "legacyWriteTraffic", "reconciliationPassed", "rollba...</code> | migration 字段。 |
| `permanentMemory` | 属性 | <code>permanentMemory: { emptyResultCause: "not_found_only"; providerFailureResult: "normalized_error"; requiredFailureDisposition: "retry_reconcile_quarantine_or_dlq"; requiredOperations: readonly ["get", "list", "delete", "write"]; requiredFailureCases: readonly ["explicit_not_found", "network_timeout", "connection_unavailable", "authentication", "authorization", "write_conflict", "validation", "cursor_interrupted", "...</code> | permanent Memory 字段。 |
| `prohibitedRuntimeDependencies` | 属性 | <code>prohibitedRuntimeDependencies: readonly ["TemporaryMemory", "PermanentMemory"]</code> | prohibited Runtime Dependencies 字段。 |
| `redisWorkingMemory` | 属性 | <code>redisWorkingMemory: { trimMode: "MAXLEN"; trimArgumentSemantics: "target_max_length"; trimPrecision: "exact"; maxZeroBehavior: "clear"; newestReadCommand: "XREVRANGE"; emptyLatestResult: "null"; cleanupCommand: "SCAN"; scanBudgetRequired: true; requiredBoundaryCases: readonly ["max_zero", "empty_to_one", "at_max", "max_plus_one", "large_batch", "concurrent", "scope_isolation", "restart_latest", "empty_latest", "sc...</code> | redis Working Memory 字段。 |
| `requiredConsumers` | 属性 | <code>requiredConsumers: readonly ["chat", "memory-routes", "tool", "workflow", "harness"]</code> | required Consumers 字段。 |
| `sharedFixture` | 属性 | <code>sharedFixture: MemoryServerMigrationSharedFixture</code> | shared Fixture 字段。 |

## `MemoryServerMigrationSharedFixture` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalServiceInstanceId` | 属性 | <code>canonicalServiceInstanceId: string</code> | canonical Service Instance Id 字段。 |
| `failure` | 属性 | <code>failure: { operation: "get"; providerId: string; expectedError: NormalizedMemoryError; }</code> | failure 字段。 |
| `migration` | 属性 | <code>migration: { revision: string; phase: "planned"; deadlineAt: string; }</code> | migration 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | scope 字段。 |

## `RedisWorkingMemoryRetentionCase` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `beforeAppend` | 属性 | <code>beforeAppend: number</code> | before Append 字段。 |
| `expectedAfterAppend` | 属性 | <code>expectedAfterAppend: number</code> | expected After Append 字段。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | max Messages 字段。 |
