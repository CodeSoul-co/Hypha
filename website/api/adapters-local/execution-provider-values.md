# `@codesoul-co/hypha-adapters-local` / `execution-provider-values`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/execution-provider-values.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)
- Exports: **5**

## Using this module

Use the Execution provider values module for binding external or local providers to Hypha ports. It exports 5 functions.

### Import from the package entrypoint

```ts
import {
  cloneExecutionValue,
  hashExecutionBytes,
  hashExecutionText,
  hashExecutionValue,
  shortExecutionHash,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- The module exposes 5 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cloneExecutionValue` | function | <code>cloneExecutionValue&lt;T&gt;(value: T): T</code> | Clone Execution Value function with 1 public call signature; parameters and return types are listed below. |
| `hashExecutionBytes` | function | <code>hashExecutionBytes(value: Uint8Array): string</code> | Hash Execution Bytes function with 1 public call signature; parameters and return types are listed below. |
| `hashExecutionText` | function | <code>hashExecutionText(value: string): string</code> | Hash Execution Text function with 1 public call signature; parameters and return types are listed below. |
| `hashExecutionValue` | function | <code>hashExecutionValue(value: unknown): string</code> | Hash Execution Value function with 1 public call signature; parameters and return types are listed below. |
| `shortExecutionHash` | function | <code>shortExecutionHash(value: string, length?: number): string</code> | Short Execution Hash function with 1 public call signature; parameters and return types are listed below. |

## `cloneExecutionValue`

Clone Execution Value function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { cloneExecutionValue } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`execution-provider-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)

### Declaration

```text
export declare function cloneExecutionValue<T>(value: T): T;
```

### Call signature

```text
cloneExecutionValue<T>(value: T): T
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>T</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `T`
- Description: The return contract is defined by the type shown above.

## `hashExecutionBytes`

Hash Execution Bytes function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashExecutionBytes } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`execution-provider-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)

### Declaration

```text
export declare function hashExecutionBytes(value: Uint8Array): string;
```

### Call signature

```text
hashExecutionBytes(value: Uint8Array): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>Uint8Array&lt;ArrayBufferLike&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `hashExecutionText`

Hash Execution Text function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashExecutionText } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`execution-provider-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)

### Declaration

```text
export declare function hashExecutionText(value: string): string;
```

### Call signature

```text
hashExecutionText(value: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `hashExecutionValue`

Hash Execution Value function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashExecutionValue } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`execution-provider-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)

### Declaration

```text
export declare function hashExecutionValue(value: unknown): string;
```

### Call signature

```text
hashExecutionValue(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `shortExecutionHash`

Short Execution Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { shortExecutionHash } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`execution-provider-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/execution-provider-values.ts)

### Declaration

```text
export declare function shortExecutionHash(value: string, length?: number): string;
```

### Call signature

```text
shortExecutionHash(value: string, length?: number): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `length` | <code>number</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.
