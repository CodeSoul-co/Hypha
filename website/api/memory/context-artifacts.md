# `@codesoul-co/hypha-memory` / `context-artifacts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)
- Exports: **11**

## Using this module

Use the Context artifacts module for using the public contracts and operations for this capability boundary. It exports 2 classes, 2 functions, 6 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  InMemoryContextArtifactStore,
  ProviderBackedContextArtifactStore,
  contextArtifactContentHash,
  validateContextArtifactReference,
} from '@codesoul-co/hypha-memory';

import type {
  ContextArtifactReadExpectation,
  ContextArtifactRecord,
  ContextArtifactRef,
  ContextArtifactStore,
  ContextArtifactWriteRequest,
  ProviderBackedContextArtifactStoreOptions,
  InMemoryContextArtifactBacking,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryContextArtifactStore` | class | <code>new InMemoryContextArtifactStore(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | In Memory Context Artifact Store class with 5 public constructor or member entries; its exact declarations are listed below. |
| `ProviderBackedContextArtifactStore` | class | <code>new ProviderBackedContextArtifactStore(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | Provider Backed Context Artifact Store class with 5 public constructor or member entries; its exact declarations are listed below. |
| `contextArtifactContentHash` | function | <code>contextArtifactContentHash(content: string): string</code> | Context Artifact Content Hash function with 1 public call signature; parameters and return types are listed below. |
| `validateContextArtifactReference` | function | <code>validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void</code> | Validate Context Artifact Reference function with 1 public call signature; parameters and return types are listed below. |
| `ContextArtifactReadExpectation` | interface | <code>interface ContextArtifactReadExpectation</code> | Context Artifact Read Expectation interface with 2 public fields or methods. |
| `ContextArtifactRecord` | interface | <code>interface ContextArtifactRecord</code> | Context Artifact Record interface with 2 public fields or methods. |
| `ContextArtifactRef` | interface | <code>interface ContextArtifactRef</code> | Context Artifact Ref interface with 10 public fields or methods. |
| `ContextArtifactStore` | interface | <code>interface ContextArtifactStore</code> | Context Artifact Store interface with 4 public fields or methods. |
| `ContextArtifactWriteRequest` | interface | <code>interface ContextArtifactWriteRequest</code> | Context Artifact Write Request interface with 6 public fields or methods. |
| `ProviderBackedContextArtifactStoreOptions` | interface | <code>interface ProviderBackedContextArtifactStoreOptions</code> | Provider Backed Context Artifact Store Options interface with 2 public fields or methods. |
| `InMemoryContextArtifactBacking` | type | <code>type InMemoryContextArtifactBacking = Map&lt;string, ContextArtifactRecord&gt;</code> | Public type alias for In Memory Context Artifact Backing; the declaration contains its complete type expression. |

## `InMemoryContextArtifactStore`

In Memory Context Artifact Store class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryContextArtifactStore } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export declare class InMemoryContextArtifactStore implements ContextArtifactStore {
    readonly durability: "ephemeral";
    constructor(records?: InMemoryContextArtifactBacking);
    put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
    read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
    delete(reference: ContextArtifactRef): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(records?: InMemoryContextArtifactBacking): InMemoryContextArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `durability` | property | <code>readonly durability: "ephemeral"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `put` | method | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ProviderBackedContextArtifactStore`

Provider Backed Context Artifact Store class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ProviderBackedContextArtifactStore } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export declare class ProviderBackedContextArtifactStore implements ContextArtifactStore {
    readonly durability: 'ephemeral' | 'durable';
    constructor(options: ProviderBackedContextArtifactStoreOptions);
    put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
    read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
    delete(reference: ContextArtifactRef): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ProviderBackedContextArtifactStoreOptions): ProviderBackedContextArtifactStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `durability` | property | <code>readonly durability: "ephemeral" &#124; "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `put` | method | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `contextArtifactContentHash`

Context Artifact Content Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { contextArtifactContentHash } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export declare function contextArtifactContentHash(content: string): string;
```

### Call signature

```text
contextArtifactContentHash(content: string): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `validateContextArtifactReference`

Validate Context Artifact Reference function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateContextArtifactReference } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export declare function validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void;
```

### Call signature

```text
validateContextArtifactReference(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `reference` | <code>ContextArtifactRef</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expected` | <code>ContextArtifactReadExpectation</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `ContextArtifactReadExpectation`

Context Artifact Read Expectation interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ContextArtifactReadExpectation } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export interface ContextArtifactReadExpectation {
    scopeHash: string;
    profileRevision: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextArtifactRecord`

Context Artifact Record interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ContextArtifactRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export interface ContextArtifactRecord {
    reference: ContextArtifactRef;
    content: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reference` | property | <code>reference: ContextArtifactRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextArtifactRef`

Context Artifact Ref interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ContextArtifactRef } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export interface ContextArtifactRef {
    id: string;
    path: string;
    contentHash: string;
    sizeBytes: number;
    contentType: 'text/plain; charset=utf-8';
    scopeHash: string;
    profileRevision: string;
    sourceItemId: string;
    createdAt: string;
    expiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentType` | property | <code>contentType: "text/plain; charset=utf-8"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceItemId` | property | <code>sourceItemId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextArtifactStore`

Context Artifact Store interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ContextArtifactStore } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export interface ContextArtifactStore {
    readonly durability: 'ephemeral' | 'durable';
    put(request: ContextArtifactWriteRequest): Promise<ContextArtifactRef>;
    read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise<string>;
    delete(reference: ContextArtifactRef): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(reference: ContextArtifactRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `durability` | property | <code>readonly durability: "ephemeral" &#124; "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `put` | method | <code>put(request: ContextArtifactWriteRequest): Promise&lt;ContextArtifactRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `read` | method | <code>read(reference: ContextArtifactRef, expected: ContextArtifactReadExpectation): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContextArtifactWriteRequest`

Context Artifact Write Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ContextArtifactWriteRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export interface ContextArtifactWriteRequest {
    content: string;
    scopeHash: string;
    profileRevision: string;
    sourceItemId: string;
    createdAt: string;
    expiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceItemId` | property | <code>sourceItemId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ProviderBackedContextArtifactStoreOptions`

Provider Backed Context Artifact Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ProviderBackedContextArtifactStoreOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export interface ProviderBackedContextArtifactStoreOptions {
    provider: ArtifactStoreProvider;
    durability?: 'ephemeral' | 'durable';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `durability` | property | <code>durability?: "ephemeral" &#124; "durable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: ArtifactStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryContextArtifactBacking`

Public type alias for In Memory Context Artifact Backing; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { InMemoryContextArtifactBacking } from '@codesoul-co/hypha-memory';`
- Source module: [`context-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-artifacts.ts)

### Declaration

```text
export type InMemoryContextArtifactBacking = Map<string, ContextArtifactRecord>;
```
