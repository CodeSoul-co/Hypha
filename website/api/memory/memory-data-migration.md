# `@codesoul-co/hypha-memory` / `memory-data-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-data-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)
- Exports: **8**

## Using this module

Use the Memory data migration module for using the public contracts and operations for this capability boundary. It exports 2 classes, 1 function, 5 interfaces.

### Import from the package entrypoint

```ts
import {
  MemoryDataMigrationCoordinator,
  StructuredMemoryDataMigrationStateStore,
  migrationPlanHash,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryDataMigrationCoordinatorOptions,
  MemoryDataMigrationPlan,
  MemoryDataMigrationState,
  MemoryDataMigrationStateStore,
  MemoryDataMigrationStep,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryDataMigrationCoordinator` | class | <code>new MemoryDataMigrationCoordinator(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | Resumable migration/rollback runner. Step implementations remain with the data owner. |
| `StructuredMemoryDataMigrationStateStore` | class | <code>new StructuredMemoryDataMigrationStateStore(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | Structured Memory Data Migration State Store class with 3 public constructor or member entries; its exact declarations are listed below. |
| `migrationPlanHash` | function | <code>migrationPlanHash(plan: MemoryDataMigrationPlan): string</code> | Migration Plan Hash function with 1 public call signature; parameters and return types are listed below. |
| `MemoryDataMigrationCoordinatorOptions` | interface | <code>interface MemoryDataMigrationCoordinatorOptions</code> | Memory Data Migration Coordinator Options interface with 2 public fields or methods. |
| `MemoryDataMigrationPlan` | interface | <code>interface MemoryDataMigrationPlan</code> | Memory Data Migration Plan interface with 5 public fields or methods. |
| `MemoryDataMigrationState` | interface | <code>interface MemoryDataMigrationState</code> | Memory Data Migration State interface with 9 public fields or methods. |
| `MemoryDataMigrationStateStore` | interface | <code>interface MemoryDataMigrationStateStore</code> | Memory Data Migration State Store interface with 2 public fields or methods. |
| `MemoryDataMigrationStep` | interface | <code>interface MemoryDataMigrationStep</code> | Memory Data Migration Step interface with 3 public fields or methods. |

## `MemoryDataMigrationCoordinator`

Resumable migration/rollback runner. Step implementations remain with the data owner.

- Kind: class
- Import: `import { MemoryDataMigrationCoordinator } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export declare class MemoryDataMigrationCoordinator {
    constructor(options: MemoryDataMigrationCoordinatorOptions);
    apply(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState>;
    rollback(plan: MemoryDataMigrationPlan): Promise<MemoryDataMigrationState>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MemoryDataMigrationCoordinatorOptions): MemoryDataMigrationCoordinator</code> | Creates an instance of this class. |
| `rollback` | method | <code>rollback(plan: MemoryDataMigrationPlan): Promise&lt;MemoryDataMigrationState&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredMemoryDataMigrationStateStore`

Structured Memory Data Migration State Store class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredMemoryDataMigrationStateStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export declare class StructuredMemoryDataMigrationStateStore implements MemoryDataMigrationStateStore {
    constructor(store: StructuredStoreProvider, table?: string);
    get(planId: string): Promise<MemoryDataMigrationState | null>;
    save(state: MemoryDataMigrationState): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(store: StructuredStoreProvider, table?: string): StructuredMemoryDataMigrationStateStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `migrationPlanHash`

Migration Plan Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { migrationPlanHash } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export declare function migrationPlanHash(plan: MemoryDataMigrationPlan): string;
```

### Call signature

```text
migrationPlanHash(plan: MemoryDataMigrationPlan): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `plan` | <code>MemoryDataMigrationPlan</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `MemoryDataMigrationCoordinatorOptions`

Memory Data Migration Coordinator Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDataMigrationCoordinatorOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export interface MemoryDataMigrationCoordinatorOptions {
    stateStore: MemoryDataMigrationStateStore;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `stateStore` | property | <code>stateStore: MemoryDataMigrationStateStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDataMigrationPlan`

Memory Data Migration Plan interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDataMigrationPlan } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export interface MemoryDataMigrationPlan {
    id: string;
    version: string;
    source: string;
    target: string;
    steps: readonly MemoryDataMigrationStep[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `steps` | property | <code>steps: readonly MemoryDataMigrationStep[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `target` | property | <code>target: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDataMigrationState`

Memory Data Migration State interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDataMigrationState } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export interface MemoryDataMigrationState {
    id: string;
    planId: string;
    planVersion: string;
    planHash: string;
    state: 'pending' | 'applying' | 'applied' | 'rolling_back' | 'rolled_back' | 'failed';
    appliedStepIds: string[];
    activeStepId?: string;
    lastError?: ReturnType<typeof normalizeMemoryError>;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeStepId` | property | <code>activeStepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `appliedStepIds` | property | <code>appliedStepIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planHash` | property | <code>planHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planId` | property | <code>planId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `planVersion` | property | <code>planVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "failed" &#124; "applied" &#124; "pending" &#124; "applying" &#124; "rolling_back" &#124; "rolled_back"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryDataMigrationStateStore`

Memory Data Migration State Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDataMigrationStateStore } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export interface MemoryDataMigrationStateStore {
    get(planId: string): Promise<MemoryDataMigrationState | null>;
    save(state: MemoryDataMigrationState): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(planId: string): Promise&lt;MemoryDataMigrationState &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `save` | method | <code>save(state: MemoryDataMigrationState): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryDataMigrationStep`

Memory Data Migration Step interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryDataMigrationStep } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-data-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-data-migration.ts)

### Declaration

```text
export interface MemoryDataMigrationStep {
    id: string;
    apply(): Promise<void>;
    rollback(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rollback` | method | <code>rollback(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
