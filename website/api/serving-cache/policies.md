# `@codesoul-co/hypha-serving-cache` / `policies`

- Package index: [`@codesoul-co/hypha-serving-cache`](/api/serving-cache)
- Source: [`packages/serving-cache/src/policies.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)
- Exports: **4**

## Using this module

Use the Policies module for using the public contracts and operations for this capability boundary. It exports 1 constant, 3 functions.

### Import from the package entrypoint

```ts
import {
  defaultCachePolicy,
  cacheModeAllowsRead,
  cacheModeAllowsWrite,
  normalizeCachePolicy,
} from '@codesoul-co/hypha-serving-cache';
```

### Usage patterns

- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultCachePolicy` | constant | <code>const defaultCachePolicy: CachePolicy</code> | Default Cache Policy constant exported by the `policies` module. |
| `cacheModeAllowsRead` | function | <code>cacheModeAllowsRead(mode: CacheMode): boolean</code> | Cache Mode Allows Read function with 1 public call signature; parameters and return types are listed below. |
| `cacheModeAllowsWrite` | function | <code>cacheModeAllowsWrite(mode: CacheMode): boolean</code> | Cache Mode Allows Write function with 1 public call signature; parameters and return types are listed below. |
| `normalizeCachePolicy` | function | <code>normalizeCachePolicy(policy?: Partial&lt;CachePolicy&gt;): CachePolicy</code> | Normalize Cache Policy function with 1 public call signature; parameters and return types are listed below. |

## `defaultCachePolicy`

Default Cache Policy constant exported by the `policies` module.

- Kind: constant
- Import: `import { defaultCachePolicy } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### Declaration

```text
export declare const defaultCachePolicy: CachePolicy;
```

## `cacheModeAllowsRead`

Cache Mode Allows Read function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { cacheModeAllowsRead } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### Declaration

```text
export declare function cacheModeAllowsRead(mode: CacheMode): boolean;
```

### Call signature

```text
cacheModeAllowsRead(mode: CacheMode): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `mode` | <code>CacheMode</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `cacheModeAllowsWrite`

Cache Mode Allows Write function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { cacheModeAllowsWrite } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### Declaration

```text
export declare function cacheModeAllowsWrite(mode: CacheMode): boolean;
```

### Call signature

```text
cacheModeAllowsWrite(mode: CacheMode): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `mode` | <code>CacheMode</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `normalizeCachePolicy`

Normalize Cache Policy function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeCachePolicy } from '@codesoul-co/hypha-serving-cache';`
- Source module: [`policies`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/serving-cache/src/policies.ts)

### Declaration

```text
export declare function normalizeCachePolicy(policy?: Partial<CachePolicy>): CachePolicy;
```

### Call signature

```text
normalizeCachePolicy(policy?: Partial<CachePolicy>): CachePolicy
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `policy` | <code>Partial&lt;CachePolicy&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CachePolicy`
- Description: The return contract is defined by the type shown above.
