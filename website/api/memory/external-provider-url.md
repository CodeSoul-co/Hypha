# `@codesoul-co/hypha-memory` / `external-provider-url`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/external-provider-url.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)
- Exports: **3**

## Using this module

Use the External provider url module for binding external or local providers to Hypha ports. It exports 2 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  isLoopbackHostname,
  normalizeExternalProviderBaseUrl,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalProviderBaseUrlOptions,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `isLoopbackHostname` | function | <code>isLoopbackHostname(hostname: string): boolean</code> | Is Loopback Hostname function with 1 public call signature; parameters and return types are listed below. |
| `normalizeExternalProviderBaseUrl` | function | <code>normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string</code> | Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination. |
| `ExternalProviderBaseUrlOptions` | interface | <code>interface ExternalProviderBaseUrlOptions</code> | External Provider Base URL Options interface with 3 public fields or methods. |

## `isLoopbackHostname`

Is Loopback Hostname function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isLoopbackHostname } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-url`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)

### Declaration

```text
export declare function isLoopbackHostname(hostname: string): boolean;
```

### Call signature

```text
isLoopbackHostname(hostname: string): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `hostname` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `normalizeExternalProviderBaseUrl`

Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination.

- Kind: function
- Import: `import { normalizeExternalProviderBaseUrl } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-url`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)

### Declaration

```text
export declare function normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string;
```

### Call signature

```text
normalizeExternalProviderBaseUrl(value: string, options: ExternalProviderBaseUrlOptions): string
```

Normalizes an external Memory Provider base URL and fails closed before a credential can be attached to an unsafe or ambiguous destination.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>ExternalProviderBaseUrlOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `ExternalProviderBaseUrlOptions`

External Provider Base URL Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderBaseUrlOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-url`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-url.ts)

### Declaration

```text
export interface ExternalProviderBaseUrlOptions {
    providerName: string;
    allowLoopbackHttp?: boolean;
    allowInsecureForTests?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowInsecureForTests` | property | <code>allowInsecureForTests?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowLoopbackHttp` | property | <code>allowLoopbackHttp?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerName` | property | <code>providerName: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
