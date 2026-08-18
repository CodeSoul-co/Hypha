# `@codesoul-co/hypha-memory` / `memory-server-migration-contract`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-migration-contract.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)
- Exports: **7**

## Using this module

Use the Memory server migration contract module for declaring and runtime-validating contracts. It exports 1 constant, 1 function, 3 interfaces, 2 types.

### Import from the package entrypoint

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

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryServerMigrationAcceptance` | constant | <code>const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance</code> | Memory Server Migration Acceptance constant exported by the `memory-server-migration-contract` module. |
| `verifyRedisWorkingMemoryRetention` | function | <code>verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[]</code> | Verify Redis Working Memory Retention function with 1 public call signature; parameters and return types are listed below. |
| `MemoryServerMigrationAcceptance` | interface | <code>interface MemoryServerMigrationAcceptance</code> | Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests. |
| `MemoryServerMigrationSharedFixture` | interface | <code>interface MemoryServerMigrationSharedFixture</code> | Memory Server Migration Shared Fixture interface with 5 public fields or methods. |
| `RedisWorkingMemoryRetentionCase` | interface | <code>interface RedisWorkingMemoryRetentionCase</code> | Redis Working Memory Retention Case interface with 3 public fields or methods. |
| `MemoryServerConsumer` | type | <code>type MemoryServerConsumer = 'chat' &#124; 'memory-routes' &#124; 'tool' &#124; 'workflow' &#124; 'harness'</code> | Public type alias for Memory Server Consumer; the declaration contains its complete type expression. |
| `MemoryServerMigrationIssue` | type | <code>type MemoryServerMigrationIssue = 'P0-1' &#124; 'P0-2' &#124; 'P0-3'</code> | Public type alias for Memory Server Migration Issue; the declaration contains its complete type expression. |

## `memoryServerMigrationAcceptance`

Memory Server Migration Acceptance constant exported by the `memory-server-migration-contract` module.

- Kind: constant
- Import: `import { memoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

```text
export declare const memoryServerMigrationAcceptance: MemoryServerMigrationAcceptance;
```

## `verifyRedisWorkingMemoryRetention`

Verify Redis Working Memory Retention function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { verifyRedisWorkingMemoryRetention } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

```text
export declare function verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[];
```

### Call signature

```text
verifyRedisWorkingMemoryRetention(observedCounts: readonly number[], acceptance?: MemoryServerMigrationAcceptance): string[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `observedCounts` | <code>readonly number[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `acceptance` | <code>MemoryServerMigrationAcceptance</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string[]`
- Description: The return contract is defined by the type shown above.

## `MemoryServerMigrationAcceptance`

Framework-owned handoff contract for the Server/dev composition migration. It contains no Server implementation and can be consumed by integration tests.

- Kind: interface
- Import: `import type { MemoryServerMigrationAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalConsumption` | property | <code>canonicalConsumption: { serviceRegistration: "single"; minimumProfileSwitchCases: 2; compositionReceiptRequired: true; allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]; prohibitedLegacyAdapterResponsibilities: readonly ["business_rules", "provider_selection", "independent_persistence"]; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `canonicalService` | property | <code>canonicalService: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contractRef` | property | <code>contractRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issues` | property | <code>issues: readonly ["P0-1", "P0-2", "P0-3"]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migration` | property | <code>migration: { phases: readonly ["planned", "shadow_read", "bounded_dual_write", "verify", "cutover", "retire", "rollback"]; dualWriteRequirements: readonly ["deadlineAt", "revision", "idempotencyKey", "checkpointRef"]; requiredEventFields: readonly ["migrationRevision", "activePath", "shadowResult", "reason"]; retirementConditions: readonly ["legacyReadTraffic", "legacyWriteTraffic", "reconciliationPassed", "rollba...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permanentMemory` | property | <code>permanentMemory: { emptyResultCause: "not_found_only"; providerFailureResult: "normalized_error"; requiredFailureDisposition: "retry_reconcile_quarantine_or_dlq"; requiredOperations: readonly ["get", "list", "delete", "write"]; requiredFailureCases: readonly ["explicit_not_found", "network_timeout", "connection_unavailable", "authentication", "authorization", "write_conflict", "validation", "cursor_interrupted", "...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prohibitedRuntimeDependencies` | property | <code>prohibitedRuntimeDependencies: readonly ["TemporaryMemory", "PermanentMemory"]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `redisWorkingMemory` | property | <code>redisWorkingMemory: { trimMode: "MAXLEN"; trimArgumentSemantics: "target_max_length"; trimPrecision: "exact"; maxZeroBehavior: "clear"; newestReadCommand: "XREVRANGE"; emptyLatestResult: "null"; cleanupCommand: "SCAN"; scanBudgetRequired: true; requiredBoundaryCases: readonly ["max_zero", "empty_to_one", "at_max", "max_plus_one", "large_batch", "concurrent", "scope_isolation", "restart_latest", "empty_latest", "sc...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredConsumers` | property | <code>requiredConsumers: readonly ["chat", "memory-routes", "tool", "workflow", "harness"]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sharedFixture` | property | <code>sharedFixture: MemoryServerMigrationSharedFixture</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationSharedFixture`

Memory Server Migration Shared Fixture interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationSharedFixture } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalServiceInstanceId` | property | <code>canonicalServiceInstanceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure: { operation: "get"; providerId: string; expectedError: NormalizedMemoryError; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migration` | property | <code>migration: { revision: string; phase: "planned"; deadlineAt: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RedisWorkingMemoryRetentionCase`

Redis Working Memory Retention Case interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisWorkingMemoryRetentionCase } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

```text
export interface RedisWorkingMemoryRetentionCase {
    beforeAppend: number;
    maxMessages: number;
    expectedAfterAppend: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `beforeAppend` | property | <code>beforeAppend: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedAfterAppend` | property | <code>expectedAfterAppend: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerConsumer`

Public type alias for Memory Server Consumer; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryServerConsumer } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

```text
export type MemoryServerConsumer = 'chat' | 'memory-routes' | 'tool' | 'workflow' | 'harness';
```

## `MemoryServerMigrationIssue`

Public type alias for Memory Server Migration Issue; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryServerMigrationIssue } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-migration-contract`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-migration-contract.ts)

### Declaration

```text
export type MemoryServerMigrationIssue = 'P0-1' | 'P0-2' | 'P0-3';
```
