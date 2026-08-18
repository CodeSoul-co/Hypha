# `@codesoul-co/hypha-memory` / `memory-server-migration-contract`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 源码: [`packages/memory/src/memory-server-migration-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)
- 导出数: **7**

## 模块用法

用于声明并运行时校验契约。Memory server migration contract 模块公开 1 常量、1 函数、3 接口、2 类型。

### 从包入口导入

```ts
import {
  memoryServerMigrationAcceptance,
  verifyRedisWorkingMemoryRetention,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryServerMigrationAcceptance,
  MemoryServerMigrationSharedFixture,
  RedisWorkingMemoryRetentionCase,
  MemoryServerConsumer,
  MemoryServerMigrationIssue,
} from '@codesoul-co/hypha-memory';
```

### 使用要点

- 5 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 1 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。


## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptance` | 常量 | <code>const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance</code> | 由 `memory-server-migration-contract` 模块导出的 Memory Server Migration Acceptance 常量。 |
| `verifyRedisWorkingMemoryRetention` | 函数 | <code>verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[]</code> | Verify Redis Working Memory Retention 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `MemoryServerMigrationAcceptance` | 接口 | <code>interface MemoryServerMigrationAcceptance</code> | Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests. |
| `MemoryServerMigrationSharedFixture` | 接口 | <code>interface MemoryServerMigrationSharedFixture</code> | Memory Server Migration Shared Fixture 接口，共包含 5 个公开字段或方法。 |
| `RedisWorkingMemoryRetentionCase` | 接口 | <code>interface RedisWorkingMemoryRetentionCase</code> | Redis Working Memory Retention Case 接口，共包含 3 个公开字段或方法。 |
| `MemoryServerConsumer` | 类型 | <code>type MemoryServerConsumer = 'chat' &#124; 'memory-routes' &#124; 'tool' &#124; 'workflow' &#124; 'harness'</code> | Memory Server Consumer 公共类型别名；完整类型表达式见声明。 |
| `MemoryServerMigrationIssue` | 类型 | <code>type MemoryServerMigrationIssue = 'P0-1' &#124; 'P0-2' &#124; 'P0-3'</code> | Memory Server Migration Issue 公共类型别名；完整类型表达式见声明。 |

## `memoryServerMigrationAcceptance`

由 `memory-server-migration-contract` 模块导出的 Memory Server Migration Acceptance 常量。

- 种类: 常量
- 导入: `import { memoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export declare const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance;
```

## `verifyRedisWorkingMemoryRetention`

Verify Redis Working Memory Retention 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { verifyRedisWorkingMemoryRetention } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export declare function verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[];
```

### 调用签名

```text
verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[]
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `observedCounts` | <code>readonly number[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string[]`
- 说明: 返回值契约由上述类型定义。

## `MemoryServerMigrationAcceptance`

Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests.

- 种类: 接口
- 导入: `import type { MemoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export interface MemoryServerMigrationAcceptance {
    contractRef: MemoryContractSpecRef;
    issues: readonly ['P0-1', 'P0-2', 'P0-3'];
    canonicalService: '@codesoul-co/hypha-memory.MemoryApplicationService';
    requiredConsumers: readonly ['chat', 'memory-routes', 'tool', 'workflow', 'harness'];
    prohibitedRuntimeDependencies: readonly ['TemporaryMemory', 'PermanentMemory'];
    canonicalConsumption: {
        serviceRegistration: 'single';
        minimumProfileSwitchCases: 2;
        compositionReceiptRequired: true;
        allowedLegacyAdapterResponsibilities: readonly ['delegate', 'scope_mapping', 'error_mapping'];
        prohibitedLegacyAdapterResponsibilities: readonly [
            'business_rules',
            'provider_selection',
            'independent_persistence'
        ];
    };
    migration: {
        phases: readonly [
            'planned',
            'shadow_read',
            'bounded_dual_write',
            'verify',
            'cutover',
            'retire',
            'rollback'
        ];
        dualWriteRequirements: readonly ['deadlineAt', 'revision', 'idempotencyKey', 'checkpointRef'];
        requiredEventFields: readonly ['migrationRevision', 'activePath', 'shadowResult', 'reason'];
        retirementConditions: readonly [
            'legacyReadTraffic',
            'legacyWriteTraffic',
            'reconciliationPassed',
            'rollbackWindowClosed',
            'legacyImports',
            'legacyRegistrations'
        ];
    };
    sharedFixture: MemoryServerMigrationSharedFixture;
    redisWorkingMemory: {
        trimMode: 'MAXLEN';
        trimArgumentSemantics: 'target_max_length';
        trimPrecision: 'exact';
        maxZeroBehavior: 'clear';
        newestReadCommand: 'XREVRANGE';
        emptyLatestResult: 'null';
        cleanupCommand: 'SCAN';
        scanBudgetRequired: true;
        requiredBoundaryCases: readonly [
            'max_zero',
            'empty_to_one',
            'at_max',
            'max_plus_one',
            'large_batch',
            'concurrent',
            'scope_isolation',
            'restart_latest',
            'empty_latest',
            'scan_multi_page',
            'repeated_cursor'
        ];
        prohibitedCommands: readonly ['XTRIM MAXLEN with deletion count', 'XRANGE + -', 'KEYS'];
        retentionCases: readonly RedisWorkingMemoryRetentionCase[];
    };
    permanentMemory: {
        emptyResultCause: 'not_found_only';
        providerFailureResult: 'normalized_error';
        requiredFailureDisposition: 'retry_reconcile_quarantine_or_dlq';
        requiredOperations: readonly ['get', 'list', 'delete', 'write'];
        requiredFailureCases: readonly [
            'explicit_not_found',
            'network_timeout',
            'connection_unavailable',
            'authentication',
            'authorization',
            'write_conflict',
            'validation',
            'cursor_interrupted',
            'write_outcome_unknown',
            'retry_exhausted',
            'persistent_anomaly',
            'unknown_provider_error'
        ];
        requiredErrorContext: readonly [
            'operation',
            'providerRef',
            'profileRef',
            'scopeHash',
            'causeRef'
        ];
        recoveryDispositions: readonly ['retry', 'reconcile', 'quarantine', 'dlq'];
        prohibitedFailureResults: readonly ['null', 'empty_array', 'false', 'zero_stats', 'success'];
        safeDiagnosticsOnly: true;
        failureEventRequired: true;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalConsumption` | 属性 | <code>canonicalConsumption: { serviceRegistration: "single"; minimumProfileSwitchCases: 2; compositionReceiptRequired: true; allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]; prohibitedLegacyAdapterResponsibilities: readonly ["business_rules", "provider_selection", "independent_persistence"]; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `canonicalService` | 属性 | <code>canonicalService: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contractRef` | 属性 | <code>contractRef: MemoryContractSpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `issues` | 属性 | <code>issues: readonly ["P0-1", "P0-2", "P0-3"]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migration` | 属性 | <code>migration: { phases: readonly ["planned", "shadow_read", "bounded_dual_write", "verify", "cutover", "retire", "rollback"]; dualWriteRequirements: readonly ["deadlineAt", "revision", "idempotencyKey", "checkpointRef"]; requiredEventFields: readonly ["migrationRevision", "activePath", "shadowResult", "reason"]; retirementConditions: readonly ["legacyReadTraffic", "legacyWriteTraffic", "reconciliationPassed", "rollba...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permanentMemory` | 属性 | <code>permanentMemory: { emptyResultCause: "not_found_only"; providerFailureResult: "normalized_error"; requiredFailureDisposition: "retry_reconcile_quarantine_or_dlq"; requiredOperations: readonly ["get", "list", "delete", "write"]; requiredFailureCases: readonly ["explicit_not_found", "network_timeout", "connection_unavailable", "authentication", "authorization", "write_conflict", "validation", "cursor_interrupted", "...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `prohibitedRuntimeDependencies` | 属性 | <code>prohibitedRuntimeDependencies: readonly ["TemporaryMemory", "PermanentMemory"]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `redisWorkingMemory` | 属性 | <code>redisWorkingMemory: { trimMode: "MAXLEN"; trimArgumentSemantics: "target_max_length"; trimPrecision: "exact"; maxZeroBehavior: "clear"; newestReadCommand: "XREVRANGE"; emptyLatestResult: "null"; cleanupCommand: "SCAN"; scanBudgetRequired: true; requiredBoundaryCases: readonly ["max_zero", "empty_to_one", "at_max", "max_plus_one", "large_batch", "concurrent", "scope_isolation", "restart_latest", "empty_latest", "sc...</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredConsumers` | 属性 | <code>requiredConsumers: readonly ["chat", "memory-routes", "tool", "workflow", "harness"]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sharedFixture` | 属性 | <code>sharedFixture: MemoryServerMigrationSharedFixture</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerMigrationSharedFixture`

Memory Server Migration Shared Fixture 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryServerMigrationSharedFixture } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export interface MemoryServerMigrationSharedFixture {
    scope: ManagedMemoryScope;
    observedAt: string;
    canonicalServiceInstanceId: string;
    migration: {
        revision: string;
        phase: 'planned';
        deadlineAt: string;
    };
    failure: {
        operation: 'get';
        providerId: string;
        expectedError: NormalizedMemoryError;
    };
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `canonicalServiceInstanceId` | 属性 | <code>canonicalServiceInstanceId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `failure` | 属性 | <code>failure: { operation: "get"; providerId: string; expectedError: NormalizedMemoryError; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `migration` | 属性 | <code>migration: { revision: string; phase: "planned"; deadlineAt: string; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: ManagedMemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RedisWorkingMemoryRetentionCase`

Redis Working Memory Retention Case 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RedisWorkingMemoryRetentionCase } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export interface RedisWorkingMemoryRetentionCase {
    beforeAppend: number;
    maxMessages: number;
    expectedAfterAppend: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `beforeAppend` | 属性 | <code>beforeAppend: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expectedAfterAppend` | 属性 | <code>expectedAfterAppend: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryServerConsumer`

Memory Server Consumer 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryServerConsumer } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export type MemoryServerConsumer = 'chat' | 'memory-routes' | 'tool' | 'workflow' | 'harness';
```

## `MemoryServerMigrationIssue`

Memory Server Migration Issue 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { MemoryServerMigrationIssue } from '@codesoul-co/hypha-memory';`
- 源码模块: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### 声明

```text
export type MemoryServerMigrationIssue = 'P0-1' | 'P0-2' | 'P0-3';
```
