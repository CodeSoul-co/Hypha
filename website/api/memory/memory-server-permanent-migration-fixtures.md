# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-fixtures`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-permanent-migration-fixtures.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)
- Exports: **6**

## Using this module

Use the Memory server permanent migration fixtures module for writing deterministic tests and contract assertions. It exports 1 constant, 2 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  permanentMemoryFailureFixtures,
  createPermanentMemoryMigrationAdapterHarness,
  createReferencePermanentMemoryMigrationHarness,
} from '@codesoul-co/hypha-memory';

import type {
  PermanentMemoryFailureFixture,
  PermanentMemoryMigrationAcceptanceHarness,
  PermanentMemoryMigrationHarnessFactory,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `permanentMemoryFailureFixtures` | constant | <code>const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[]</code> | Permanent Memory Failure Fixtures constant exported by the `memory-server-permanent-migration-fixtures` module. |
| `createPermanentMemoryMigrationAdapterHarness` | function | <code>createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | Create Permanent Memory Migration Adapter Harness function with 1 public call signature; parameters and return types are listed below. |
| `createReferencePermanentMemoryMigrationHarness` | function | <code>createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness</code> | Create Reference Permanent Memory Migration Harness function with 1 public call signature; parameters and return types are listed below. |
| `PermanentMemoryFailureFixture` | interface | <code>interface PermanentMemoryFailureFixture</code> | Permanent Memory Failure Fixture interface with 10 public fields or methods. |
| `PermanentMemoryMigrationAcceptanceHarness` | interface | <code>interface PermanentMemoryMigrationAcceptanceHarness</code> | Permanent Memory Migration Acceptance Harness interface with 2 public fields or methods. |
| `PermanentMemoryMigrationHarnessFactory` | type | <code>type PermanentMemoryMigrationHarnessFactory = (fixture: PermanentMemoryFailureFixture) =&gt; PermanentMemoryMigrationAcceptanceHarness</code> | Public type alias for Permanent Memory Migration Harness Factory; the declaration contains its complete type expression. |

## `permanentMemoryFailureFixtures`

Permanent Memory Failure Fixtures constant exported by the `memory-server-permanent-migration-fixtures` module.

- Kind: constant
- Import: `import { permanentMemoryFailureFixtures } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### Declaration

```text
export declare const permanentMemoryFailureFixtures: readonly PermanentMemoryFailureFixture[];
```

## `createPermanentMemoryMigrationAdapterHarness`

Create Permanent Memory Migration Adapter Harness function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createPermanentMemoryMigrationAdapterHarness } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### Declaration

```text
export declare function createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness;
```

### Call signature

```text
createPermanentMemoryMigrationAdapterHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fixture` | <code>PermanentMemoryFailureFixture</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PermanentMemoryMigrationAcceptanceHarness`
- Description: The return contract is defined by the type shown above.

## `createReferencePermanentMemoryMigrationHarness`

Create Reference Permanent Memory Migration Harness function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createReferencePermanentMemoryMigrationHarness } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### Declaration

```text
export declare function createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness;
```

### Call signature

```text
createReferencePermanentMemoryMigrationHarness(fixture: PermanentMemoryFailureFixture): PermanentMemoryMigrationAcceptanceHarness
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fixture` | <code>PermanentMemoryFailureFixture</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PermanentMemoryMigrationAcceptanceHarness`
- Description: The return contract is defined by the type shown above.

## `PermanentMemoryFailureFixture`

Permanent Memory Failure Fixture interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryFailureFixture } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### Declaration

```text
export interface PermanentMemoryFailureFixture {
    id: string;
    operation: PermanentMemoryMigrationOperation;
    providerError: Record<string, unknown>;
    expectedCode?: NormalizedMemoryError['code'];
    expectedRetryable?: boolean;
    expectedDisposition?: PermanentMemoryFailureDisposition;
    expectedFinalState?: PermanentMemoryFailureFinalState;
    expectedEmpty?: 'null' | 'array' | 'false';
    attempt?: number;
    maxAttempts?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedCode` | property | <code>expectedCode?: "MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PR...</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedDisposition` | property | <code>expectedDisposition?: PermanentMemoryFailureDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedEmpty` | property | <code>expectedEmpty?: "array" &#124; "null" &#124; "false"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedFinalState` | property | <code>expectedFinalState?: PermanentMemoryFailureFinalState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRetryable` | property | <code>expectedRetryable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: PermanentMemoryMigrationOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerError` | property | <code>providerError: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryMigrationAcceptanceHarness`

Permanent Memory Migration Acceptance Harness interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryMigrationAcceptanceHarness } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### Declaration

```text
export interface PermanentMemoryMigrationAcceptanceHarness {
    port: PermanentMemoryMigrationPort;
    events: PermanentMemoryFailureEvent[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: PermanentMemoryFailureEvent[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `port` | property | <code>port: PermanentMemoryMigrationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryMigrationHarnessFactory`

Public type alias for Permanent Memory Migration Harness Factory; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PermanentMemoryMigrationHarnessFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-fixtures`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-fixtures.ts)

### Declaration

```text
export type PermanentMemoryMigrationHarnessFactory = (fixture: PermanentMemoryFailureFixture) => PermanentMemoryMigrationAcceptanceHarness;
```
