# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-permanent-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)
- Exports: **3**

## Using this module

Use the Memory server permanent migration acceptance module for using the public contracts and operations for this capability boundary. It exports 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  runPermanentMemoryBehaviorAcceptance,
} from '@codesoul-co/hypha-memory';

import type {
  PermanentMemoryBehaviorFinding,
  PermanentMemoryBehaviorReport,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runPermanentMemoryBehaviorAcceptance` | function | <code>runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise&lt;PermanentMemoryBehaviorReport&gt;</code> | Run Permanent Memory Behavior Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `PermanentMemoryBehaviorFinding` | interface | <code>interface PermanentMemoryBehaviorFinding</code> | Permanent Memory Behavior Finding interface with 3 public fields or methods. |
| `PermanentMemoryBehaviorReport` | interface | <code>interface PermanentMemoryBehaviorReport</code> | Permanent Memory Behavior Report interface with 3 public fields or methods. |

## `runPermanentMemoryBehaviorAcceptance`

Run Permanent Memory Behavior Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runPermanentMemoryBehaviorAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)

### Declaration

```text
export declare function runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise<PermanentMemoryBehaviorReport>;
```

### Call signature

```text
runPermanentMemoryBehaviorAcceptance(factory: PermanentMemoryMigrationHarnessFactory, fixtures?: readonly PermanentMemoryFailureFixture[]): Promise<PermanentMemoryBehaviorReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `factory` | <code>PermanentMemoryMigrationHarnessFactory</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `fixtures` | <code>readonly PermanentMemoryFailureFixture[]</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<PermanentMemoryBehaviorReport>`
- Description: The return contract is defined by the type shown above.

## `PermanentMemoryBehaviorFinding`

Permanent Memory Behavior Finding interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryBehaviorFinding } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)

### Declaration

```text
export interface PermanentMemoryBehaviorFinding {
    fixtureId: string;
    code: string;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixtureId` | property | <code>fixtureId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryBehaviorReport`

Permanent Memory Behavior Report interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryBehaviorReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration-acceptance.ts)

### Declaration

```text
export interface PermanentMemoryBehaviorReport {
    passed: boolean;
    cases: number;
    findings: PermanentMemoryBehaviorFinding[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `findings` | property | <code>findings: PermanentMemoryBehaviorFinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
