# `@codesoul-co/hypha-memory` / `memory-utils`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-utils.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)
- Exports: **7**

## Using this module

Use the Memory utils module for using the public contracts and operations for this capability boundary. It exports 7 functions.

### Import from the package entrypoint

```ts
import {
  hashMemoryContent,
  hashMemoryScope,
  isNormalizedMemoryError,
  memoryError,
  normalizeMemoryError,
  sha256,
  stableStringify,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- The module exposes 7 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `hashMemoryContent` | function | <code>hashMemoryContent(content: unknown): string</code> | Hash Memory Content function with 1 public call signature; parameters and return types are listed below. |
| `hashMemoryScope` | function | <code>hashMemoryScope(scope: ManagedMemoryScope): string</code> | Hash Memory Scope function with 1 public call signature; parameters and return types are listed below. |
| `isNormalizedMemoryError` | function | <code>isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError</code> | Is Normalized Memory Error function with 1 public call signature; parameters and return types are listed below. |
| `memoryError` | function | <code>memoryError(code: NormalizedMemoryError["code"], message: string, retryable?: boolean, details?: Record&lt;string, unknown&gt;): NormalizedMemoryError</code> | Memory Error function with 1 public call signature; parameters and return types are listed below. |
| `normalizeMemoryError` | function | <code>normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError["code"]): NormalizedMemoryError</code> | Normalize Memory Error function with 1 public call signature; parameters and return types are listed below. |
| `sha256` | function | <code>sha256(value: unknown): string</code> | Sha256 function with 1 public call signature; parameters and return types are listed below. |
| `stableStringify` | function | <code>stableStringify(value: unknown): string</code> | Stable Stringify function with 1 public call signature; parameters and return types are listed below. |

## `hashMemoryContent`

Hash Memory Content function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashMemoryContent } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function hashMemoryContent(content: unknown): string;
```

### Call signature

```text
hashMemoryContent(content: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `hashMemoryScope`

Hash Memory Scope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { hashMemoryScope } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function hashMemoryScope(scope: ManagedMemoryScope): string;
```

### Call signature

```text
hashMemoryScope(scope: ManagedMemoryScope): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `scope` | <code>ManagedMemoryScope</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `isNormalizedMemoryError`

Is Normalized Memory Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isNormalizedMemoryError } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError;
```

### Call signature

```text
isNormalizedMemoryError(value: unknown): value is NormalizedMemoryError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is NormalizedMemoryError`
- Description: The return contract is defined by the type shown above.

## `memoryError`

Memory Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { memoryError } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function memoryError(code: NormalizedMemoryError['code'], message: string, retryable?: boolean, details?: Record<string, unknown>): NormalizedMemoryError;
```

### Call signature

```text
memoryError(code: NormalizedMemoryError["code"], message: string, retryable?: boolean, details?: Record<string, unknown>): NormalizedMemoryError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | <code>"MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TIMEOUT"...</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `message` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `retryable` | <code>boolean</code> | No | Optional parameter; accepted values are defined by the type column. |
| `details` | <code>Record&lt;string, unknown&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedMemoryError`
- Description: The return contract is defined by the type shown above.

## `normalizeMemoryError`

Normalize Memory Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeMemoryError } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError['code']): NormalizedMemoryError;
```

### Call signature

```text
normalizeMemoryError(error: unknown, fallbackCode?: NormalizedMemoryError["code"]): NormalizedMemoryError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `fallbackCode` | <code>"MEMORY_INVALID_INPUT" &#124; "MEMORY_EXTRACTION_SOURCE_UNAVAILABLE" &#124; "MEMORY_EXTRACTION_FAILED" &#124; "MEMORY_EXTRACTION_CURSOR_CONFLICT" &#124; "MEMORY_MAINTENANCE_CONFLICT" &#124; "MEMORY_RANKING_FAILED" &#124; "MEMORY_IDEMPOTENCY_CONFLICT" &#124; "MEMORY_SCOPE_DENIED" &#124; "MEMORY_PERMISSION_DENIED" &#124; "MEMORY_NOT_FOUND" &#124; "MEMORY_REVISION_CONFLICT" &#124; "MEMORY_PROVIDER_NOT_INSTALLED" &#124; "MEMORY_PROVIDER_UNAVAILABLE" &#124; "MEMORY_PROVIDER_TIMEOUT"...</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedMemoryError`
- Description: The return contract is defined by the type shown above.

## `sha256`

Sha256 function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { sha256 } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function sha256(value: unknown): string;
```

### Call signature

```text
sha256(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `stableStringify`

Stable Stringify function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { stableStringify } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-utils`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-utils.ts)

### Declaration

```text
export declare function stableStringify(value: unknown): string;
```

### Call signature

```text
stableStringify(value: unknown): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.
