# `@codesoul-co/hypha-core` / `modules/runtime/legacy-wait-migration`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/legacy-wait-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)
- Exports: **7**

## Using this module

Use the Legacy wait migration module for executing runtime behavior at this boundary. It exports 1 constant, 2 functions, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LEGACY_HUMAN_WAIT_MIGRATION_VERSION,
  migrateLegacyHumanWaitEvent,
  migrateLegacyHumanWaitEvents,
} from '@codesoul-co/hypha-core';

import type {
  LegacyHumanWaitMigrationEntry,
  LegacyHumanWaitMigrationReport,
  LegacyHumanWaitMigrationResult,
  MigratableRuntimeEvent,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LEGACY_HUMAN_WAIT_MIGRATION_VERSION` | constant | <code>const LEGACY_HUMAN_WAIT_MIGRATION_VERSION: "1.0.0"</code> | LEGACY HUMAN WAIT MIGRATION VERSION constant exported by the `modules/runtime/legacy-wait-migration` module. |
| `migrateLegacyHumanWaitEvent` | function | <code>migrateLegacyHumanWaitEvent&lt;TEvent extends FrameworkEvent&gt;(event: TEvent, priorPendingActionRef?: string): { event: TEvent; entry: LegacyHumanWaitMigrationEntry; }</code> | Migrate Legacy Human Wait Event function with 1 public call signature; parameters and return types are listed below. |
| `migrateLegacyHumanWaitEvents` | function | <code>migrateLegacyHumanWaitEvents&lt;TEvent extends FrameworkEvent&gt;(events: readonly TEvent[]): LegacyHumanWaitMigrationResult&lt;TEvent&gt;</code> | Migrate Legacy Human Wait Events function with 1 public call signature; parameters and return types are listed below. |
| `LegacyHumanWaitMigrationEntry` | interface | <code>interface LegacyHumanWaitMigrationEntry</code> | Legacy Human Wait Migration Entry interface with 6 public fields or methods. |
| `LegacyHumanWaitMigrationReport` | interface | <code>interface LegacyHumanWaitMigrationReport</code> | Legacy Human Wait Migration Report interface with 8 public fields or methods. |
| `LegacyHumanWaitMigrationResult` | interface | <code>interface LegacyHumanWaitMigrationResult</code> | Legacy Human Wait Migration Result interface with 2 public fields or methods. |
| `MigratableRuntimeEvent` | type | <code>type MigratableRuntimeEvent = FrameworkEvent &#124; PersistedFrameworkEvent</code> | Public type alias for Migratable Runtime Event; the declaration contains its complete type expression. |

## `LEGACY_HUMAN_WAIT_MIGRATION_VERSION`

LEGACY HUMAN WAIT MIGRATION VERSION constant exported by the `modules/runtime/legacy-wait-migration` module.

- Kind: constant
- Import: `import { LEGACY_HUMAN_WAIT_MIGRATION_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export declare const LEGACY_HUMAN_WAIT_MIGRATION_VERSION: "1.0.0";
```

## `migrateLegacyHumanWaitEvent`

Migrate Legacy Human Wait Event function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { migrateLegacyHumanWaitEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export declare function migrateLegacyHumanWaitEvent<TEvent extends FrameworkEvent>(event: TEvent, priorPendingActionRef?: string): {
    event: TEvent;
    entry: LegacyHumanWaitMigrationEntry;
};
```

### Call signature

```text
migrateLegacyHumanWaitEvent<TEvent extends FrameworkEvent>(event: TEvent, priorPendingActionRef?: string): { event: TEvent; entry: LegacyHumanWaitMigrationEntry; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `event` | <code>TEvent</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `priorPendingActionRef` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ event: TEvent; entry: LegacyHumanWaitMigrationEntry; }`
- Description: The return contract is defined by the type shown above.

## `migrateLegacyHumanWaitEvents`

Migrate Legacy Human Wait Events function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { migrateLegacyHumanWaitEvents } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export declare function migrateLegacyHumanWaitEvents<TEvent extends FrameworkEvent>(events: readonly TEvent[]): LegacyHumanWaitMigrationResult<TEvent>;
```

### Call signature

```text
migrateLegacyHumanWaitEvents<TEvent extends FrameworkEvent>(events: readonly TEvent[]): LegacyHumanWaitMigrationResult<TEvent>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>readonly TEvent[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `LegacyHumanWaitMigrationResult<TEvent>`
- Description: The return contract is defined by the type shown above.

## `LegacyHumanWaitMigrationEntry`

Legacy Human Wait Migration Entry interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LegacyHumanWaitMigrationEntry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export interface LegacyHumanWaitMigrationEntry {
    eventId: string;
    runId: string;
    status: 'current' | 'migrated' | 'quarantined';
    waitId?: string;
    pendingActionRef?: string;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventId` | property | <code>eventId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingActionRef` | property | <code>pendingActionRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "quarantined" &#124; "current" &#124; "migrated"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitId` | property | <code>waitId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyHumanWaitMigrationReport`

Legacy Human Wait Migration Report interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { LegacyHumanWaitMigrationReport } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export interface LegacyHumanWaitMigrationReport {
    formatVersion: typeof LEGACY_HUMAN_WAIT_MIGRATION_VERSION;
    scannedEvents: number;
    waitingEvents: number;
    migratedEvents: number;
    currentEvents: number;
    quarantinedEvents: number;
    quarantinedRunIds: string[];
    entries: LegacyHumanWaitMigrationEntry[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentEvents` | property | <code>currentEvents: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entries` | property | <code>entries: LegacyHumanWaitMigrationEntry[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `formatVersion` | property | <code>formatVersion: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `migratedEvents` | property | <code>migratedEvents: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantinedEvents` | property | <code>quarantinedEvents: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quarantinedRunIds` | property | <code>quarantinedRunIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scannedEvents` | property | <code>scannedEvents: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `waitingEvents` | property | <code>waitingEvents: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LegacyHumanWaitMigrationResult`

Legacy Human Wait Migration Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LegacyHumanWaitMigrationResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export interface LegacyHumanWaitMigrationResult<TEvent extends FrameworkEvent> {
    events: TEvent[];
    report: LegacyHumanWaitMigrationReport;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: TEvent[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `report` | property | <code>report: LegacyHumanWaitMigrationReport</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MigratableRuntimeEvent`

Public type alias for Migratable Runtime Event; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MigratableRuntimeEvent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/legacy-wait-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/legacy-wait-migration.ts)

### Declaration

```text
export type MigratableRuntimeEvent = FrameworkEvent | PersistedFrameworkEvent;
```
