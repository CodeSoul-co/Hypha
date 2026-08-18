# `@codesoul-co/hypha-memory` / `memory-server-migration-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-server-migration-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptance` | constant | <code>const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance</code> | memory Server Migration Acceptance constant exported by the `memory-server-migration-contract` module. |
| `verifyRedisWorkingMemoryRetention` | function | <code>verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[]</code> | Public runtime operation for verify Redis Working Memory Retention. |
| `MemoryServerMigrationAcceptance` | interface | <code>interface MemoryServerMigrationAcceptance</code> | Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests. |
| `MemoryServerMigrationSharedFixture` | interface | <code>interface MemoryServerMigrationSharedFixture</code> | Field contract for Memory Server Migration Shared Fixture; see all contract members below. |
| `RedisWorkingMemoryRetentionCase` | interface | <code>interface RedisWorkingMemoryRetentionCase</code> | Field contract for Redis Working Memory Retention Case; see all contract members below. |
| `MemoryServerConsumer` | type | <code>type MemoryServerConsumer = 'chat' &#124; 'memory-routes' &#124; 'tool' &#124; 'workflow' &#124; 'harness'</code> | Public type alias for Memory Server Consumer. |
| `MemoryServerMigrationIssue` | type | <code>type MemoryServerMigrationIssue = 'P0-1' &#124; 'P0-2' &#124; 'P0-3'</code> | Public type alias for Memory Server Migration Issue. |

## `MemoryServerMigrationAcceptance` contract members

Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalConsumption` | property | <code>canonicalConsumption: { serviceRegistration: "single"; minimumProfileSwitchCases: 2; compositionReceiptRequired: true; allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]; prohibitedLegacyAdapterResponsibilities: readonly ["business_rules", "provider_selection", "independent_persistence"]; }</code> | Public canonical Consumption property. |
| `canonicalService` | property | <code>canonicalService: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | Public canonical Service property. |
| `contractRef` | property | <code>contractRef: MemoryContractSpecRef</code> | Public contract Ref property. |
| `issues` | property | <code>issues: readonly ["P0-1", "P0-2", "P0-3"]</code> | Public issues property. |
| `migration` | property | <code>migration: { phases: readonly ["planned", "shadow_read", "bounded_dual_write", "verify", "cutover", "retire", "rollback"]; dualWriteRequirements: readonly ["deadlineAt", "revision", "idempotencyKey", "checkpointRef"]; requiredEventFields: readonly ["migrationRevision", "activePath", "shadowResult", "reason"]; retirementConditions: readonly ["legacyReadTraffic", "legacyWriteTraffic", "reconciliationPassed", "rollba...</code> | Public migration property. |
| `permanentMemory` | property | <code>permanentMemory: { emptyResultCause: "not_found_only"; providerFailureResult: "normalized_error"; requiredFailureDisposition: "retry_reconcile_quarantine_or_dlq"; requiredOperations: readonly ["get", "list", "delete", "write"]; requiredFailureCases: readonly ["explicit_not_found", "network_timeout", "connection_unavailable", "authentication", "authorization", "write_conflict", "validation", "cursor_interrupted", "...</code> | Public permanent Memory property. |
| `prohibitedRuntimeDependencies` | property | <code>prohibitedRuntimeDependencies: readonly ["TemporaryMemory", "PermanentMemory"]</code> | Public prohibited Runtime Dependencies property. |
| `redisWorkingMemory` | property | <code>redisWorkingMemory: { trimMode: "MAXLEN"; trimArgumentSemantics: "target_max_length"; trimPrecision: "exact"; maxZeroBehavior: "clear"; newestReadCommand: "XREVRANGE"; emptyLatestResult: "null"; cleanupCommand: "SCAN"; scanBudgetRequired: true; requiredBoundaryCases: readonly ["max_zero", "empty_to_one", "at_max", "max_plus_one", "large_batch", "concurrent", "scope_isolation", "restart_latest", "empty_latest", "sc...</code> | Public redis Working Memory property. |
| `requiredConsumers` | property | <code>requiredConsumers: readonly ["chat", "memory-routes", "tool", "workflow", "harness"]</code> | Public required Consumers property. |
| `sharedFixture` | property | <code>sharedFixture: MemoryServerMigrationSharedFixture</code> | Public shared Fixture property. |

## `MemoryServerMigrationSharedFixture` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalServiceInstanceId` | property | <code>canonicalServiceInstanceId: string</code> | Public canonical Service Instance Id property. |
| `failure` | property | <code>failure: { operation: "get"; providerId: string; expectedError: NormalizedMemoryError; }</code> | Public failure property. |
| `migration` | property | <code>migration: { revision: string; phase: "planned"; deadlineAt: string; }</code> | Public migration property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public scope property. |

## `RedisWorkingMemoryRetentionCase` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `beforeAppend` | property | <code>beforeAppend: number</code> | Public before Append property. |
| `expectedAfterAppend` | property | <code>expectedAfterAppend: number</code> | Public expected After Append property. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public max Messages property. |
