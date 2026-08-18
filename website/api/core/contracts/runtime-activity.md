# `@codesoul-co/hypha-core` / `contracts/runtime-activity`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-activity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)
- Exports: **4**

## Using this module

Use the Runtime activity module for declaring and runtime-validating contracts. It exports 2 constants, 1 interface, 1 type.

### Import from the package entrypoint

```ts
import {
  RUNTIME_ACTIVITY_DESCRIPTOR_VERSION,
  RUNTIME_ACTIVITY_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeActivityDescriptor,
  RuntimeActivityKind,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_ACTIVITY_DESCRIPTOR_VERSION` | constant | <code>const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION: "1.0.0"</code> | RUNTIME ACTIVITY DESCRIPTOR VERSION constant exported by the `contracts/runtime-activity` module. |
| `RUNTIME_ACTIVITY_KINDS` | constant | <code>const RUNTIME_ACTIVITY_KINDS: readonly ["react_quantum", "tool", "memory", "execution", "mcp", "policy"]</code> | RUNTIME ACTIVITY KINDS constant exported by the `contracts/runtime-activity` module. |
| `RuntimeActivityDescriptor` | interface | <code>interface RuntimeActivityDescriptor</code> | Runtime Activity Descriptor interface with 13 public fields or methods. |
| `RuntimeActivityKind` | type | <code>type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number]</code> | Public type alias for Runtime Activity Kind; the declaration contains its complete type expression. |

## `RUNTIME_ACTIVITY_DESCRIPTOR_VERSION`

RUNTIME ACTIVITY DESCRIPTOR VERSION constant exported by the `contracts/runtime-activity` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_DESCRIPTOR_VERSION } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_DESCRIPTOR_VERSION: "1.0.0";
```

## `RUNTIME_ACTIVITY_KINDS`

RUNTIME ACTIVITY KINDS constant exported by the `contracts/runtime-activity` module.

- Kind: constant
- Import: `import { RUNTIME_ACTIVITY_KINDS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### Declaration

```text
export declare const RUNTIME_ACTIVITY_KINDS: readonly ["react_quantum", "tool", "memory", "execution", "mcp", "policy"];
```

## `RuntimeActivityDescriptor`

Runtime Activity Descriptor interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityDescriptor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### Declaration

```text
export interface RuntimeActivityDescriptor {
    version: typeof RUNTIME_ACTIVITY_DESCRIPTOR_VERSION;
    activityId: string;
    activityKind: RuntimeActivityKind;
    runId: string;
    stateId: string;
    stateAttempt: number;
    operationId: string;
    inputRef: string;
    inputHash: string;
    providerRef?: string;
    providerRevision?: string;
    idempotencyKey: string;
    deadlineAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityKind` | property | <code>activityKind: "memory" &#124; "mcp" &#124; "policy" &#124; "tool" &#124; "execution" &#124; "react_quantum"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputHash` | property | <code>inputHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputRef` | property | <code>inputRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRef` | property | <code>providerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttempt` | property | <code>stateAttempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityKind`

Public type alias for Runtime Activity Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeActivityKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-activity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-activity.ts)

### Declaration

```text
export type RuntimeActivityKind = (typeof RUNTIME_ACTIVITY_KINDS)[number];
```
