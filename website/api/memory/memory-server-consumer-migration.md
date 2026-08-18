# `@codesoul-co/hypha-memory` / `memory-server-consumer-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-consumer-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)
- Exports: **13**

## Using this module

Use the Memory server consumer migration module for using the public contracts and operations for this capability boundary. It exports 1 constant, 3 functions, 7 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  allowedLegacyAdapterResponsibilities,
  assertCanonicalConsumerSet,
  createMemoryServerCanonicalMigrationState,
  transitionMemoryServerCanonicalMigration,
} from '@codesoul-co/hypha-memory';

import type {
  CanonicalProfileSwitchObservation,
  MemoryServerCanonicalMigrationState,
  MemoryServerMigrationReconciliation,
  MemoryServerMigrationRetirementEvidence,
  MemoryServerMigrationTransitionEvent,
  MemoryServerMigrationTransitionInput,
  MemoryServerMigrationTransitionResult,
  AllowedLegacyAdapterResponsibility,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedLegacyAdapterResponsibilities` | constant | <code>const allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"]</code> | Allowed Legacy Adapter Responsibilities constant exported by the `memory-server-consumer-migration` module. |
| `assertCanonicalConsumerSet` | function | <code>assertCanonicalConsumerSet(bindings: Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void</code> | Assert Canonical Consumer Set function with 1 public call signature; parameters and return types are listed below. |
| `createMemoryServerCanonicalMigrationState` | function | <code>createMemoryServerCanonicalMigrationState(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState</code> | Create Memory Server Canonical Migration State function with 1 public call signature; parameters and return types are listed below. |
| `transitionMemoryServerCanonicalMigration` | function | <code>transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult</code> | Transition Memory Server Canonical Migration function with 1 public call signature; parameters and return types are listed below. |
| `CanonicalProfileSwitchObservation` | interface | <code>interface CanonicalProfileSwitchObservation</code> | Canonical Profile Switch Observation interface with 4 public fields or methods. |
| `MemoryServerCanonicalMigrationState` | interface | <code>interface MemoryServerCanonicalMigrationState</code> | Memory Server Canonical Migration State interface with 8 public fields or methods. |
| `MemoryServerMigrationReconciliation` | interface | <code>interface MemoryServerMigrationReconciliation</code> | Memory Server Migration Reconciliation interface with 4 public fields or methods. |
| `MemoryServerMigrationRetirementEvidence` | interface | <code>interface MemoryServerMigrationRetirementEvidence</code> | Memory Server Migration Retirement Evidence interface with 5 public fields or methods. |
| `MemoryServerMigrationTransitionEvent` | interface | <code>interface MemoryServerMigrationTransitionEvent</code> | Memory Server Migration Transition Event interface with 10 public fields or methods. |
| `MemoryServerMigrationTransitionInput` | interface | <code>interface MemoryServerMigrationTransitionInput</code> | Memory Server Migration Transition Input interface with 7 public fields or methods. |
| `MemoryServerMigrationTransitionResult` | interface | <code>interface MemoryServerMigrationTransitionResult</code> | Memory Server Migration Transition Result interface with 2 public fields or methods. |
| `AllowedLegacyAdapterResponsibility` | type | <code>type AllowedLegacyAdapterResponsibility = (typeof allowedLegacyAdapterResponsibilities)[number]</code> | Public type alias for Allowed Legacy Adapter Responsibility; the declaration contains its complete type expression. |
| `MemoryServerMigrationPhase` | type | <code>type MemoryServerMigrationPhase = 'planned' &#124; 'shadow_read' &#124; 'bounded_dual_write' &#124; 'verify' &#124; 'cutover' &#124; 'retire' &#124; 'rollback'</code> | Public type alias for Memory Server Migration Phase; the declaration contains its complete type expression. |

## `allowedLegacyAdapterResponsibilities`

Allowed Legacy Adapter Responsibilities constant exported by the `memory-server-consumer-migration` module.

- Kind: constant
- Import: `import { allowedLegacyAdapterResponsibilities } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export declare const allowedLegacyAdapterResponsibilities: readonly ["delegate", "scope_mapping", "error_mapping"];
```

## `assertCanonicalConsumerSet`

Assert Canonical Consumer Set function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { assertCanonicalConsumerSet } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export declare function assertCanonicalConsumerSet(bindings: Partial<Record<MemoryServerConsumer, string>>, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void;
```

### Call signature

```text
assertCanonicalConsumerSet(bindings: Partial<Record<MemoryServerConsumer, string>>, expectedServiceInstanceId: string, consumers: readonly MemoryServerConsumer[]): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `bindings` | <code>Partial&lt;Record&lt;MemoryServerConsumer, string&gt;&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectedServiceInstanceId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `consumers` | <code>readonly MemoryServerConsumer[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `createMemoryServerCanonicalMigrationState`

Create Memory Server Canonical Migration State function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemoryServerCanonicalMigrationState } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export declare function createMemoryServerCanonicalMigrationState(input: {
    migrationId: string;
    revision: string;
    createdAt: string;
}): MemoryServerCanonicalMigrationState;
```

### Call signature

```text
createMemoryServerCanonicalMigrationState(input: { migrationId: string; revision: string; createdAt: string; }): MemoryServerCanonicalMigrationState
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>{ migrationId: string; revision: string; createdAt: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryServerCanonicalMigrationState`
- Description: The return contract is defined by the type shown above.

## `transitionMemoryServerCanonicalMigration`

Transition Memory Server Canonical Migration function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { transitionMemoryServerCanonicalMigration } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export declare function transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult;
```

### Call signature

```text
transitionMemoryServerCanonicalMigration(current: MemoryServerCanonicalMigrationState, input: MemoryServerMigrationTransitionInput): MemoryServerMigrationTransitionResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `current` | <code>MemoryServerCanonicalMigrationState</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>MemoryServerMigrationTransitionInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryServerMigrationTransitionResult`
- Description: The return contract is defined by the type shown above.

## `CanonicalProfileSwitchObservation`

Canonical Profile Switch Observation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { CanonicalProfileSwitchObservation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface CanonicalProfileSwitchObservation {
    profileId: string;
    expectedProviderId: string;
    observedReadProviderId: string;
    observedWriteProviderId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedProviderId` | property | <code>expectedProviderId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedReadProviderId` | property | <code>observedReadProviderId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedWriteProviderId` | property | <code>observedWriteProviderId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerCanonicalMigrationState`

Memory Server Canonical Migration State interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerCanonicalMigrationState } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface MemoryServerCanonicalMigrationState {
    migrationId: string;
    revision: string;
    phase: MemoryServerMigrationPhase;
    activePath: 'legacy' | 'dual' | 'canonical';
    updatedAt: string;
    dualWrite?: {
        deadlineAt: string;
        idempotencyKey: string;
        checkpointRef: string;
    };
    reconciliation: MemoryServerMigrationReconciliation;
    retirement?: MemoryServerMigrationRetirementEvidence;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activePath` | property | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dualWrite` | property | <code>dualWrite?: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migrationId` | property | <code>migrationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `phase` | property | <code>phase: MemoryServerMigrationPhase</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliation` | property | <code>reconciliation: MemoryServerMigrationReconciliation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retirement` | property | <code>retirement?: MemoryServerMigrationRetirementEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationReconciliation`

Memory Server Migration Reconciliation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationReconciliation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface MemoryServerMigrationReconciliation {
    status: 'not_run' | 'passed' | 'failed';
    comparedRecords: number;
    mismatchCount: number;
    shadowResult: 'not_run' | 'matched' | 'mismatched';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `comparedRecords` | property | <code>comparedRecords: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mismatchCount` | property | <code>mismatchCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shadowResult` | property | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "failed" &#124; "not_run" &#124; "passed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationRetirementEvidence`

Memory Server Migration Retirement Evidence interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationRetirementEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface MemoryServerMigrationRetirementEvidence {
    legacyReadTraffic: number;
    legacyWriteTraffic: number;
    legacyImports: number;
    legacyRegistrations: number;
    rollbackWindowEndsAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `legacyImports` | property | <code>legacyImports: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyReadTraffic` | property | <code>legacyReadTraffic: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyRegistrations` | property | <code>legacyRegistrations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `legacyWriteTraffic` | property | <code>legacyWriteTraffic: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rollbackWindowEndsAt` | property | <code>rollbackWindowEndsAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationTransitionEvent`

Memory Server Migration Transition Event interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationTransitionEvent } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface MemoryServerMigrationTransitionEvent {
    type: 'memory.server_migration.transitioned';
    migrationId: string;
    migrationRevision: string;
    fromPhase: MemoryServerMigrationPhase;
    toPhase: MemoryServerMigrationPhase;
    activePath: 'legacy' | 'dual' | 'canonical';
    shadowResult: MemoryServerMigrationReconciliation['shadowResult'];
    checkpointRef?: string;
    reason: string;
    occurredAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activePath` | property | <code>activePath: "legacy" &#124; "dual" &#124; "canonical"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointRef` | property | <code>checkpointRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fromPhase` | property | <code>fromPhase: MemoryServerMigrationPhase</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migrationId` | property | <code>migrationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migrationRevision` | property | <code>migrationRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `shadowResult` | property | <code>shadowResult: "not_run" &#124; "matched" &#124; "mismatched"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toPhase` | property | <code>toPhase: MemoryServerMigrationPhase</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "memory.server_migration.transitioned"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationTransitionInput`

Memory Server Migration Transition Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationTransitionInput } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface MemoryServerMigrationTransitionInput {
    targetPhase: Exclude<MemoryServerMigrationPhase, 'planned'>;
    expectedRevision: string;
    occurredAt: string;
    reason: string;
    dualWrite?: {
        deadlineAt: string;
        idempotencyKey: string;
        checkpointRef: string;
    };
    reconciliation?: MemoryServerMigrationReconciliation;
    retirement?: MemoryServerMigrationRetirementEvidence;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dualWrite` | property | <code>dualWrite?: { deadlineAt: string; idempotencyKey: string; checkpointRef: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevision` | property | <code>expectedRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `occurredAt` | property | <code>occurredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliation` | property | <code>reconciliation?: MemoryServerMigrationReconciliation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retirement` | property | <code>retirement?: MemoryServerMigrationRetirementEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetPhase` | property | <code>targetPhase: "verify" &#124; "shadow_read" &#124; "bounded_dual_write" &#124; "cutover" &#124; "retire" &#124; "rollback"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryServerMigrationTransitionResult`

Memory Server Migration Transition Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryServerMigrationTransitionResult } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export interface MemoryServerMigrationTransitionResult {
    state: MemoryServerCanonicalMigrationState;
    event: MemoryServerMigrationTransitionEvent;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `event` | property | <code>event: MemoryServerMigrationTransitionEvent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: MemoryServerCanonicalMigrationState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AllowedLegacyAdapterResponsibility`

Public type alias for Allowed Legacy Adapter Responsibility; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { AllowedLegacyAdapterResponsibility } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export type AllowedLegacyAdapterResponsibility = (typeof allowedLegacyAdapterResponsibilities)[number];
```

## `MemoryServerMigrationPhase`

Public type alias for Memory Server Migration Phase; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryServerMigrationPhase } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-consumer-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-consumer-migration.ts)

### Declaration

```text
export type MemoryServerMigrationPhase = 'planned' | 'shadow_read' | 'bounded_dual_write' | 'verify' | 'cutover' | 'retire' | 'rollback';
```
