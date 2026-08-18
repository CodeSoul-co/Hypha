# `@codesoul-co/hypha-adapters-local` / `local-process-resource-accounting`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-resource-accounting.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)
- Exports: **2**

## Using this module

Use the Local process resource accounting module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  LocalProcessResourceAccountant,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessResourceEvidence,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessResourceAccountant` | class | <code>new LocalProcessResourceAccountant(): LocalProcessResourceAccountant</code> | Reports only evidence the host Local Process adapter can actually observe. |
| `LocalProcessResourceEvidence` | interface | <code>interface LocalProcessResourceEvidence</code> | Local Process Resource Evidence interface with 2 public fields or methods. |

## `LocalProcessResourceAccountant`

Reports only evidence the host Local Process adapter can actually observe.

- Kind: class
- Import: `import { LocalProcessResourceAccountant } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-resource-accounting`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)

### Declaration

```text
export declare class LocalProcessResourceAccountant {
    account(result: LocalProcessRunResult): LocalProcessResourceEvidence;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `account` | method | <code>account(result: LocalProcessRunResult): LocalProcessResourceEvidence</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): LocalProcessResourceAccountant</code> | Creates an instance of this class. |

## `LocalProcessResourceEvidence`

Local Process Resource Evidence interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessResourceEvidence } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-resource-accounting`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)

### Declaration

```text
export interface LocalProcessResourceEvidence {
    usage: ExecutionResourceUsage;
    metadata: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage: ExecutionResourceUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
