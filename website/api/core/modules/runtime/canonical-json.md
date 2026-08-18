# `@codesoul-co/hypha-core` / `modules/runtime/canonical-json`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/canonical-json.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)
- Exports: **3**

## Using this module

Use the Canonical JSON module for executing runtime behavior at this boundary. It exports 2 functions, 1 type.

### Import from the package entrypoint

```ts
import {
  canonicalizeJson,
  hashCanonicalJson,
} from '@codesoul-co/hypha-core';

import type {
  CanonicalJsonValue,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalizeJson` | function | <code>canonicalizeJson(value: unknown): string</code> | Canonicalize JSON function with 1 public call signature; parameters and return types are listed below. |
| `hashCanonicalJson` | function | <code>hashCanonicalJson(value: unknown): string</code> | Hash Canonical JSON function with 1 public call signature; parameters and return types are listed below. |
| `CanonicalJsonValue` | type | <code>type CanonicalJsonValue = null &#124; boolean &#124; number &#124; string &#124; CanonicalJsonValue[] &#124; { [key: string]: CanonicalJsonValue; }</code> | Public type alias for Canonical JSON Value; the declaration contains its complete type expression. |

## `canonicalizeJson`

Canonicalize JSON function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canonicalizeJson } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/canonical-json`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)

### Declaration

```text
export declare function canonicalizeJson(value: unknown): string;
```

### Call signature

```text
canonicalizeJson(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `hashCanonicalJson`

Hash Canonical JSON function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashCanonicalJson } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/canonical-json`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)

### Declaration

```text
export declare function hashCanonicalJson(value: unknown): string;
```

### Call signature

```text
hashCanonicalJson(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `CanonicalJsonValue`

Public type alias for Canonical JSON Value; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { CanonicalJsonValue } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/canonical-json`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/canonical-json.ts)

### Declaration

```text
export type CanonicalJsonValue = null | boolean | number | string | CanonicalJsonValue[] | {
    [key: string]: CanonicalJsonValue;
};
```
