# `@codesoul-co/hypha-memory` / `memory-server-permanent-migration`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-server-permanent-migration.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)
- Exports: **14**

## Using this module

Use the Memory server permanent migration module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 functions, 7 interfaces, 3 types.

### Import from the package entrypoint

```ts
import {
  PermanentMemoryMigrationAdapter,
  decidePermanentMemoryFailure,
  isExplicitPermanentMemoryNotFound,
  normalizePermanentMemoryProviderError,
} from '@codesoul-co/hypha-memory';

import type {
  PermanentMemoryFailureDecision,
  PermanentMemoryFailureEvent,
  PermanentMemoryFailureObserver,
  PermanentMemoryMigrationAdapterOptions,
  PermanentMemoryMigrationPort,
  PermanentMemoryMigrationProvider,
  PermanentMemoryMigrationRequest,
  PermanentMemoryFailureDisposition,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 10 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PermanentMemoryMigrationAdapter` | class | <code>new PermanentMemoryMigrationAdapter(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | Permanent Memory Migration Adapter class with 5 public constructor or member entries; its exact declarations are listed below. |
| `decidePermanentMemoryFailure` | function | <code>decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision</code> | Decide Permanent Memory Failure function with 1 public call signature; parameters and return types are listed below. |
| `isExplicitPermanentMemoryNotFound` | function | <code>isExplicitPermanentMemoryNotFound(error: unknown): boolean</code> | Is Explicit Permanent Memory Not Found function with 1 public call signature; parameters and return types are listed below. |
| `normalizePermanentMemoryProviderError` | function | <code>normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError</code> | Normalize Permanent Memory Provider Error function with 1 public call signature; parameters and return types are listed below. |
| `PermanentMemoryFailureDecision` | interface | <code>interface PermanentMemoryFailureDecision</code> | Permanent Memory Failure Decision interface with 6 public fields or methods. |
| `PermanentMemoryFailureEvent` | interface | <code>interface PermanentMemoryFailureEvent</code> | Permanent Memory Failure Event interface with 10 public fields or methods. |
| `PermanentMemoryFailureObserver` | interface | <code>interface PermanentMemoryFailureObserver</code> | Permanent Memory Failure Observer interface with 1 public fields or methods. |
| `PermanentMemoryMigrationAdapterOptions` | interface | <code>interface PermanentMemoryMigrationAdapterOptions</code> | Permanent Memory Migration Adapter Options interface with 2 public fields or methods. |
| `PermanentMemoryMigrationPort` | interface | <code>interface PermanentMemoryMigrationPort</code> | Permanent Memory Migration Port interface with 4 public fields or methods. |
| `PermanentMemoryMigrationProvider` | interface | <code>interface PermanentMemoryMigrationProvider</code> | Permanent Memory Migration Provider interface with 4 public fields or methods. |
| `PermanentMemoryMigrationRequest` | interface | <code>interface PermanentMemoryMigrationRequest</code> | Permanent Memory Migration Request interface with 7 public fields or methods. |
| `PermanentMemoryFailureDisposition` | type | <code>type PermanentMemoryFailureDisposition = 'retry' &#124; 'reconcile' &#124; 'quarantine' &#124; 'dlq'</code> | Public type alias for Permanent Memory Failure Disposition; the declaration contains its complete type expression. |
| `PermanentMemoryFailureFinalState` | type | <code>type PermanentMemoryFailureFinalState = 'waiting' &#124; 'reconciling' &#124; 'quarantined' &#124; 'dead_lettered'</code> | Public type alias for Permanent Memory Failure Final State; the declaration contains its complete type expression. |
| `PermanentMemoryMigrationOperation` | type | <code>type PermanentMemoryMigrationOperation = 'get' &#124; 'list' &#124; 'delete' &#124; 'write'</code> | Public type alias for Permanent Memory Migration Operation; the declaration contains its complete type expression. |

## `PermanentMemoryMigrationAdapter`

Permanent Memory Migration Adapter class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { PermanentMemoryMigrationAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export declare class PermanentMemoryMigrationAdapter implements PermanentMemoryMigrationPort {
    constructor(options: PermanentMemoryMigrationAdapterOptions);
    get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null>;
    list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]>;
    delete(request: PermanentMemoryMigrationRequest): Promise<boolean>;
    write<TValue = unknown>(request: PermanentMemoryMigrationRequest, value: TValue): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: PermanentMemoryMigrationAdapterOptions): PermanentMemoryMigrationAdapter</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `decidePermanentMemoryFailure`

Decide Permanent Memory Failure function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { decidePermanentMemoryFailure } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export declare function decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision;
```

### Call signature

```text
decidePermanentMemoryFailure(error: NormalizedMemoryError, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): PermanentMemoryFailureDecision
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>NormalizedMemoryError</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `request` | <code>PermanentMemoryMigrationRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `operation` | <code>PermanentMemoryMigrationOperation</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `PermanentMemoryFailureDecision`
- Description: The return contract is defined by the type shown above.

## `isExplicitPermanentMemoryNotFound`

Is Explicit Permanent Memory Not Found function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isExplicitPermanentMemoryNotFound } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export declare function isExplicitPermanentMemoryNotFound(error: unknown): boolean;
```

### Call signature

```text
isExplicitPermanentMemoryNotFound(error: unknown): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `normalizePermanentMemoryProviderError`

Normalize Permanent Memory Provider Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizePermanentMemoryProviderError } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export declare function normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError;
```

### Call signature

```text
normalizePermanentMemoryProviderError(providerError: unknown, request: PermanentMemoryMigrationRequest, operation: PermanentMemoryMigrationOperation): NormalizedMemoryError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `providerError` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `request` | <code>PermanentMemoryMigrationRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `operation` | <code>PermanentMemoryMigrationOperation</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `NormalizedMemoryError`
- Description: The return contract is defined by the type shown above.

## `PermanentMemoryFailureDecision`

Permanent Memory Failure Decision interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryFailureDecision } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryFailureDecision {
    disposition: PermanentMemoryFailureDisposition;
    finalState: PermanentMemoryFailureFinalState;
    retryable: boolean;
    attempt: number;
    maxAttempts: number;
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: PermanentMemoryFailureDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalState` | property | <code>finalState: PermanentMemoryFailureFinalState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryFailureEvent`

Permanent Memory Failure Event interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryFailureEvent } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryFailureEvent {
    type: 'permanent_memory.operation_failed';
    operationId: string;
    operation: PermanentMemoryMigrationOperation;
    providerRef: string;
    profileRef: string;
    scopeHash: string;
    attempt: number;
    error: NormalizedMemoryError;
    disposition: PermanentMemoryFailureDisposition;
    finalState: PermanentMemoryFailureFinalState;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: PermanentMemoryFailureDisposition</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalState` | property | <code>finalState: PermanentMemoryFailureFinalState</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: PermanentMemoryMigrationOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRef` | property | <code>providerRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "permanent_memory.operation_failed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryFailureObserver`

Permanent Memory Failure Observer interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryFailureObserver } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryFailureObserver {
    record(event: PermanentMemoryFailureEvent): void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(event: PermanentMemoryFailureEvent): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PermanentMemoryMigrationAdapterOptions`

Permanent Memory Migration Adapter Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryMigrationAdapterOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryMigrationAdapterOptions {
    provider: PermanentMemoryMigrationProvider;
    observer?: PermanentMemoryFailureObserver;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `observer` | property | <code>observer?: PermanentMemoryFailureObserver</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: PermanentMemoryMigrationProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryMigrationPort`

Permanent Memory Migration Port interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryMigrationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryMigrationPort {
    get<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue | null>;
    list<TValue = unknown>(request: PermanentMemoryMigrationRequest): Promise<TValue[]>;
    delete(request: PermanentMemoryMigrationRequest): Promise<boolean>;
    write<TValue = unknown>(request: PermanentMemoryMigrationRequest, value: TValue): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(request: PermanentMemoryMigrationRequest): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest): Promise&lt;TValue[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write&lt;TValue = unknown&gt;(request: PermanentMemoryMigrationRequest, value: TValue): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PermanentMemoryMigrationProvider`

Permanent Memory Migration Provider interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryMigrationProvider } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryMigrationProvider {
    get<TValue = unknown>(scope: ManagedMemoryScope, recordId: string): Promise<TValue | null>;
    list<TValue = unknown>(scope: ManagedMemoryScope): Promise<TValue[]>;
    delete(scope: ManagedMemoryScope, recordId: string): Promise<boolean>;
    write<TValue = unknown>(scope: ManagedMemoryScope, recordId: string, value: TValue): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(scope: ManagedMemoryScope, recordId: string): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string): Promise&lt;TValue &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list&lt;TValue = unknown&gt;(scope: ManagedMemoryScope): Promise&lt;TValue[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `write` | method | <code>write&lt;TValue = unknown&gt;(scope: ManagedMemoryScope, recordId: string, value: TValue): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PermanentMemoryMigrationRequest`

Permanent Memory Migration Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { PermanentMemoryMigrationRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export interface PermanentMemoryMigrationRequest {
    operationId: string;
    scope: ManagedMemoryScope;
    providerRef: string;
    profileRef: string;
    recordId?: string;
    attempt?: number;
    maxAttempts?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempt` | property | <code>attempt?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRef` | property | <code>providerRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordId` | property | <code>recordId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PermanentMemoryFailureDisposition`

Public type alias for Permanent Memory Failure Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PermanentMemoryFailureDisposition } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export type PermanentMemoryFailureDisposition = 'retry' | 'reconcile' | 'quarantine' | 'dlq';
```

## `PermanentMemoryFailureFinalState`

Public type alias for Permanent Memory Failure Final State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PermanentMemoryFailureFinalState } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export type PermanentMemoryFailureFinalState = 'waiting' | 'reconciling' | 'quarantined' | 'dead_lettered';
```

## `PermanentMemoryMigrationOperation`

Public type alias for Permanent Memory Migration Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { PermanentMemoryMigrationOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-server-permanent-migration`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-server-permanent-migration.ts)

### Declaration

```text
export type PermanentMemoryMigrationOperation = 'get' | 'list' | 'delete' | 'write';
```
