# `@codesoul-co/hypha-memory` / `memory-server-redis-migration-acceptance`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-redis-migration-acceptance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-acceptance.ts)
- Exports: **3**

## Using this module

Use the Memory server redis migration acceptance module for using the public contracts and operations for this capability boundary. It exports 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  runRedisWorkingMemoryBehaviorAcceptance,
} from '@codesoul-co/hypha-memory';

import type {
  RedisWorkingMemoryBehaviorFinding,
  RedisWorkingMemoryBehaviorReport,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runRedisWorkingMemoryBehaviorAcceptance` | function | <code>runRedisWorkingMemoryBehaviorAcceptance(factory: WorkingMemoryMigrationHarnessFactory, cases?: readonly RedisWorkingMemoryBoundaryCase[]): Promise&lt;RedisWorkingMemoryBehaviorReport&gt;</code> | Run Redis Working Memory Behavior Acceptance function with 1 public call signature; parameters and return types are listed below. |
| `RedisWorkingMemoryBehaviorFinding` | interface | <code>interface RedisWorkingMemoryBehaviorFinding</code> | Redis Working Memory Behavior Finding interface with 3 public fields or methods. |
| `RedisWorkingMemoryBehaviorReport` | interface | <code>interface RedisWorkingMemoryBehaviorReport</code> | Redis Working Memory Behavior Report interface with 3 public fields or methods. |

## `runRedisWorkingMemoryBehaviorAcceptance`

Run Redis Working Memory Behavior Acceptance function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { runRedisWorkingMemoryBehaviorAcceptance } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-acceptance.ts)

### Declaration

```text
export declare function runRedisWorkingMemoryBehaviorAcceptance(factory: WorkingMemoryMigrationHarnessFactory, cases?: readonly RedisWorkingMemoryBoundaryCase[]): Promise<RedisWorkingMemoryBehaviorReport>;
```

### Call signature

```text
runRedisWorkingMemoryBehaviorAcceptance(factory: WorkingMemoryMigrationHarnessFactory, cases?: readonly RedisWorkingMemoryBoundaryCase[]): Promise<RedisWorkingMemoryBehaviorReport>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `factory` | <code>WorkingMemoryMigrationHarnessFactory</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `cases` | <code>readonly RedisWorkingMemoryBoundaryCase[]</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<RedisWorkingMemoryBehaviorReport>`
- Description: The return contract is defined by the type shown above.

## `RedisWorkingMemoryBehaviorFinding`

Redis Working Memory Behavior Finding interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisWorkingMemoryBehaviorFinding } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-acceptance.ts)

### Declaration

```text
export interface RedisWorkingMemoryBehaviorFinding {
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

## `RedisWorkingMemoryBehaviorReport`

Redis Working Memory Behavior Report interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RedisWorkingMemoryBehaviorReport } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-redis-migration-acceptance`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-redis-migration-acceptance.ts)

### Declaration

```text
export interface RedisWorkingMemoryBehaviorReport {
    passed: boolean;
    cases: number;
    findings: RedisWorkingMemoryBehaviorFinding[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `findings` | property | <code>findings: RedisWorkingMemoryBehaviorFinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `passed` | property | <code>passed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
