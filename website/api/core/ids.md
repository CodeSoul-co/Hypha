# `@codesoul-co/hypha-core` / `ids`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/ids.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)
- Exports: **3**

## Using this module

Use the Ids module for using the public contracts and operations for this capability boundary. It exports 1 function, 1 interface, 1 type.

### Import from the package entrypoint

```ts
import {
  formatFrameworkId,
} from '@codesoul-co/hypha-core';

import type {
  FrameworkId,
  FrameworkIdPrefix,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `formatFrameworkId` | function | <code>formatFrameworkId(id: FrameworkId): string</code> | Format Framework ID function with 1 public call signature; parameters and return types are listed below. |
| `FrameworkId` | interface | <code>interface FrameworkId</code> | Framework ID interface with 2 public fields or methods. |
| `FrameworkIdPrefix` | type | <code>type FrameworkIdPrefix = 'workspace' &#124; 'session' &#124; 'run' &#124; 'step' &#124; 'event' &#124; 'agent' &#124; 'skill' &#124; 'tool' &#124; 'memory' &#124; 'model' &#124; 'domain' &#124; 'workflow' &#124; 'policy' &#124; 'artifact'</code> | Public type alias for Framework ID Prefix; the declaration contains its complete type expression. |

## `formatFrameworkId`

Format Framework ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { formatFrameworkId } from '@codesoul-co/hypha-core';`
- Source module: [`ids`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)

### Declaration

```text
export declare function formatFrameworkId(id: FrameworkId): string;
```

### Call signature

```text
formatFrameworkId(id: FrameworkId): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | <code>FrameworkId</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `FrameworkId`

Framework ID interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { FrameworkId } from '@codesoul-co/hypha-core';`
- Source module: [`ids`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)

### Declaration

```text
export interface FrameworkId {
    prefix: FrameworkIdPrefix;
    value: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `prefix` | property | <code>prefix: FrameworkIdPrefix</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FrameworkIdPrefix`

Public type alias for Framework ID Prefix; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FrameworkIdPrefix } from '@codesoul-co/hypha-core';`
- Source module: [`ids`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)

### Declaration

```text
export type FrameworkIdPrefix = 'workspace' | 'session' | 'run' | 'step' | 'event' | 'agent' | 'skill' | 'tool' | 'memory' | 'model' | 'domain' | 'workflow' | 'policy' | 'artifact';
```
