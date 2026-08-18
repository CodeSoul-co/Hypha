# `@codesoul-co/hypha-memory` / `managed-credentials`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/managed-credentials.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)
- Exports: **5**

## Using this module

Use the Managed credentials module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 function, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  RenewableCredentialManager,
  staticCredentialProvider,
} from '@codesoul-co/hypha-memory';

import type {
  ManagedCredentialLease,
  RenewableCredentialManagerOptions,
  RenewableCredentialProvider,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RenewableCredentialManager` | class | <code>new RenewableCredentialManager(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | Renewable Credential Manager class with 4 public constructor or member entries; its exact declarations are listed below. |
| `staticCredentialProvider` | function | <code>staticCredentialProvider(token: string, tokenType: ManagedCredentialLease["tokenType"]): RenewableCredentialProvider</code> | Static Credential Provider function with 1 public call signature; parameters and return types are listed below. |
| `ManagedCredentialLease` | interface | <code>interface ManagedCredentialLease</code> | Managed Credential Lease interface with 3 public fields or methods. |
| `RenewableCredentialManagerOptions` | interface | <code>interface RenewableCredentialManagerOptions</code> | Renewable Credential Manager Options interface with 3 public fields or methods. |
| `RenewableCredentialProvider` | interface | <code>interface RenewableCredentialProvider</code> | Renewable Credential Provider interface with 3 public fields or methods. |

## `RenewableCredentialManager`

Renewable Credential Manager class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RenewableCredentialManager } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### Declaration

```text
export declare class RenewableCredentialManager {
    constructor(options: RenewableCredentialManagerOptions);
    get(signal?: AbortSignal): Promise<ManagedCredentialLease>;
    invalidate(): void;
    close(signal?: AbortSignal): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: RenewableCredentialManagerOptions): RenewableCredentialManager</code> | Creates an instance of this class. |
| `get` | method | <code>get(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidate` | method | <code>invalidate(): void</code> | Public method; parameters and return type are shown in the signature. |

## `staticCredentialProvider`

Static Credential Provider function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { staticCredentialProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### Declaration

```text
export declare function staticCredentialProvider(token: string, tokenType: ManagedCredentialLease['tokenType']): RenewableCredentialProvider;
```

### Call signature

```text
staticCredentialProvider(token: string, tokenType: ManagedCredentialLease["tokenType"]): RenewableCredentialProvider
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `tokenType` | <code>"api_token" &#124; "oauth_bearer"</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RenewableCredentialProvider`
- Description: The return contract is defined by the type shown above.

## `ManagedCredentialLease`

Managed Credential Lease interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ManagedCredentialLease } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### Declaration

```text
export interface ManagedCredentialLease {
    token: string;
    tokenType: 'api_token' | 'oauth_bearer';
    expiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `token` | property | <code>token: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenType` | property | <code>tokenType: "api_token" &#124; "oauth_bearer"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RenewableCredentialManagerOptions`

Renewable Credential Manager Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RenewableCredentialManagerOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### Declaration

```text
export interface RenewableCredentialManagerOptions {
    provider: RenewableCredentialProvider;
    refreshSkewMs?: number;
    now?: () => Date;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): Date</code> | Public method; parameters and return type are shown in the signature. |
| `provider` | property | <code>provider: RenewableCredentialProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `refreshSkewMs` | property | <code>refreshSkewMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RenewableCredentialProvider`

Renewable Credential Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RenewableCredentialProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`managed-credentials`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/managed-credentials.ts)

### Declaration

```text
export interface RenewableCredentialProvider {
    acquire(signal?: AbortSignal): Promise<ManagedCredentialLease>;
    revoke?(lease: ManagedCredentialLease, signal?: AbortSignal): Promise<void>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(signal?: AbortSignal): Promise&lt;ManagedCredentialLease&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `revoke` | method | <code>revoke?(lease: ManagedCredentialLease, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
