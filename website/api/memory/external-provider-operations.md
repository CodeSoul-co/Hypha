# `@codesoul-co/hypha-memory` / `external-provider-operations`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/external-provider-operations.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)
- Exports: **10**

## Using this module

Use the External provider operations module for binding external or local providers to Hypha ports. It exports 2 classes, 1 constant, 4 functions, 2 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  InMemoryExternalProviderOperationStore,
  StructuredExternalProviderOperationStore,
  externalProviderOperationSchema,
  createExternalProviderOperation,
  externalProviderOperationId,
  fingerprintExternalOperationFailure,
  resolveExternalProviderOperationStore,
} from '@codesoul-co/hypha-memory';

import type {
  ExternalProviderOperation,
  ExternalProviderOperationStore,
  ExternalProviderOperationState,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryExternalProviderOperationStore` | class | <code>new InMemoryExternalProviderOperationStore(): InMemoryExternalProviderOperationStore</code> | In Memory External Provider Operation Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `StructuredExternalProviderOperationStore` | class | <code>new StructuredExternalProviderOperationStore(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | Structured External Provider Operation Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `externalProviderOperationSchema` | constant | <code>const externalProviderOperationSchema: ZodType&lt;ExternalProviderOperation, ZodTypeDef, ExternalProviderOperation&gt;</code> | Runtime schema for External Provider Operation. |
| `createExternalProviderOperation` | function | <code>createExternalProviderOperation(input: Omit&lt;ExternalProviderOperation, "id" &#124; "scopeHash" &#124; "attempts" &#124; "createdAt" &#124; "updatedAt"&gt; &amp; { now?: string; }): ExternalProviderOperation</code> | Create External Provider Operation function with 1 public call signature; parameters and return types are listed below. |
| `externalProviderOperationId` | function | <code>externalProviderOperationId(providerId: string, operationId: string): string</code> | External Provider Operation ID function with 1 public call signature; parameters and return types are listed below. |
| `fingerprintExternalOperationFailure` | function | <code>fingerprintExternalOperationFailure(error: NormalizedMemoryError): string</code> | Fingerprint External Operation Failure function with 1 public call signature; parameters and return types are listed below. |
| `resolveExternalProviderOperationStore` | function | <code>resolveExternalProviderOperationStore(store: ExternalProviderOperationStore &#124; undefined, profile: "production" &#124; "test" &#124; "ephemeral"): ExternalProviderOperationStore</code> | Resolve External Provider Operation Store function with 1 public call signature; parameters and return types are listed below. |
| `ExternalProviderOperation` | interface | <code>interface ExternalProviderOperation</code> | External Provider Operation interface with 19 public fields or methods. |
| `ExternalProviderOperationStore` | interface | <code>interface ExternalProviderOperationStore</code> | External Provider Operation Store interface with 5 public fields or methods. |
| `ExternalProviderOperationState` | type | <code>type ExternalProviderOperationState = 'pending' &#124; 'running' &#124; 'reconcile_required' &#124; 'succeeded' &#124; 'failed' &#124; 'cancelled' &#124; 'dead_letter'</code> | Public type alias for External Provider Operation State; the declaration contains its complete type expression. |

## `InMemoryExternalProviderOperationStore`

In Memory External Provider Operation Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare class InMemoryExternalProviderOperationStore implements ExternalProviderOperationStore {
    readonly durability: "ephemeral";
    get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
    claim(operation: ExternalProviderOperation): Promise<{
            operation: ExternalProviderOperation;
            created: boolean;
        }>;
    set(operation: ExternalProviderOperation): Promise<void>;
    listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryExternalProviderOperationStore</code> | Creates an instance of this class. |
| `durability` | property | <code>readonly durability: "ephemeral"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listRecoverable` | method | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `StructuredExternalProviderOperationStore`

Structured External Provider Operation Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { StructuredExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare class StructuredExternalProviderOperationStore implements ExternalProviderOperationStore {
    readonly durability: "durable";
    constructor(options: {
            store: StructuredStoreProvider;
            table?: string;
        });
    get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
    claim(operation: ExternalProviderOperation): Promise<{
            operation: ExternalProviderOperation;
            created: boolean;
        }>;
    set(operation: ExternalProviderOperation): Promise<void>;
    listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: { store: StructuredStoreProvider; table?: string; }): StructuredExternalProviderOperationStore</code> | Creates an instance of this class. |
| `durability` | property | <code>readonly durability: "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listRecoverable` | method | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `externalProviderOperationSchema`

Runtime schema for External Provider Operation.

- Kind: constant
- Import: `import { externalProviderOperationSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare const externalProviderOperationSchema: ZodType<ExternalProviderOperation, ZodTypeDef, ExternalProviderOperation>;
```

## `createExternalProviderOperation`

Create External Provider Operation function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createExternalProviderOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare function createExternalProviderOperation(input: Omit<ExternalProviderOperation, 'id' | 'scopeHash' | 'attempts' | 'createdAt' | 'updatedAt'> & {
    now?: string;
}): ExternalProviderOperation;
```

### Call signature

```text
createExternalProviderOperation(input: Omit<ExternalProviderOperation, "id" | "scopeHash" | "attempts" | "createdAt" | "updatedAt"> & { now?: string; }): ExternalProviderOperation
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;ExternalProviderOperation, "id" &#124; "attempts" &#124; "createdAt" &#124; "updatedAt" &#124; "scopeHash"&gt; &amp; { now?: string; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExternalProviderOperation`
- Description: The return contract is defined by the type shown above.

## `externalProviderOperationId`

External Provider Operation ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { externalProviderOperationId } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare function externalProviderOperationId(providerId: string, operationId: string): string;
```

### Call signature

```text
externalProviderOperationId(providerId: string, operationId: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `providerId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `operationId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `fingerprintExternalOperationFailure`

Fingerprint External Operation Failure function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { fingerprintExternalOperationFailure } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare function fingerprintExternalOperationFailure(error: NormalizedMemoryError): string;
```

### Call signature

```text
fingerprintExternalOperationFailure(error: NormalizedMemoryError): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>NormalizedMemoryError</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `resolveExternalProviderOperationStore`

Resolve External Provider Operation Store function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export declare function resolveExternalProviderOperationStore(store: ExternalProviderOperationStore | undefined, profile: 'production' | 'test' | 'ephemeral'): ExternalProviderOperationStore;
```

### Call signature

```text
resolveExternalProviderOperationStore(store: ExternalProviderOperationStore | undefined, profile: "production" | "test" | "ephemeral"): ExternalProviderOperationStore
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `store` | <code>ExternalProviderOperationStore</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `profile` | <code>"ephemeral" &#124; "production" &#124; "test"</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ExternalProviderOperationStore`
- Description: The return contract is defined by the type shown above.

## `ExternalProviderOperation`

External Provider Operation interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export interface ExternalProviderOperation {
    id: string;
    providerId: string;
    operationId: string;
    externalOperationId?: string;
    kind: 'mem0_event' | 'vertex_lro' | 'hindsight_operation' | 'unknown_write';
    state: ExternalProviderOperationState;
    scope: ManagedMemoryScope;
    scopeHash: string;
    profileRef: MemoryContractSpecRef;
    principal: {
        principalId: string;
        userId?: string;
    };
    attempts: number;
    deadlineAt?: string;
    nextAttemptAt?: string;
    cancellationRequestedAt?: string;
    failure?: NormalizedMemoryError;
    failureFingerprint?: string;
    createdAt: string;
    updatedAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cancellationRequestedAt` | property | <code>cancellationRequestedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `externalOperationId` | property | <code>externalOperationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failure` | property | <code>failure?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureFingerprint` | property | <code>failureFingerprint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "mem0_event" &#124; "vertex_lro" &#124; "hindsight_operation" &#124; "unknown_write"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextAttemptAt` | property | <code>nextAttemptAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: { principalId: string; userId?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: ExternalProviderOperationState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExternalProviderOperationStore`

External Provider Operation Store interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExternalProviderOperationStore } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export interface ExternalProviderOperationStore {
    readonly durability: 'ephemeral' | 'durable';
    get(providerId: string, operationId: string): Promise<ExternalProviderOperation | null>;
    claim(operation: ExternalProviderOperation): Promise<{
        operation: ExternalProviderOperation;
        created: boolean;
    }>;
    set(operation: ExternalProviderOperation): Promise<void>;
    listRecoverable(providerId?: string, now?: string): Promise<ExternalProviderOperation[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(operation: ExternalProviderOperation): Promise&lt;{ operation: ExternalProviderOperation; created: boolean; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `durability` | property | <code>readonly durability: "ephemeral" &#124; "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `get` | method | <code>get(providerId: string, operationId: string): Promise&lt;ExternalProviderOperation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listRecoverable` | method | <code>listRecoverable(providerId?: string, now?: string): Promise&lt;ExternalProviderOperation[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(operation: ExternalProviderOperation): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExternalProviderOperationState`

Public type alias for External Provider Operation State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExternalProviderOperationState } from '@codesoul-co/hypha-memory';`
- Source module: [`external-provider-operations`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/external-provider-operations.ts)

### Declaration

```text
export type ExternalProviderOperationState = 'pending' | 'running' | 'reconcile_required' | 'succeeded' | 'failed' | 'cancelled' | 'dead_letter';
```
