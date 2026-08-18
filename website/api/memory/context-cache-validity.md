# `@codesoul-co/hypha-memory` / `context-cache-validity`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-cache-validity.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)
- Exports: **7**

## Using this module

Use the Context cache validity module for reading, writing, or coordinating cache state. It exports 2 classes, 1 function, 4 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryContextEnvelopeCacheStore,
  VersionValidContextCache,
  createContextCacheValidityHash,
} from '@codesoul-co/hypha-memory';

import type {
  ContextCacheVersionSnapshot,
  ContextEnvelopeCacheStore,
  VersionValidContextCacheOptions,
  VersionValidContextCacheRecord,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryContextEnvelopeCacheStore` | class | <code>new InMemoryContextEnvelopeCacheStore(): InMemoryContextEnvelopeCacheStore</code> | In Memory Context Envelope Cache Store class with 5 public constructor or member entries; its exact declarations are listed below. |
| `VersionValidContextCache` | class | <code>new VersionValidContextCache(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | Version Valid Context Cache class with 5 public constructor or member entries; its exact declarations are listed below. |
| `createContextCacheValidityHash` | function | <code>createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string</code> | Create Context Cache Validity Hash function with 1 public call signature; parameters and return types are listed below. |
| `ContextCacheVersionSnapshot` | interface | <code>interface ContextCacheVersionSnapshot</code> | Context Cache Version Snapshot interface with 9 public fields or methods. |
| `ContextEnvelopeCacheStore` | interface | <code>interface ContextEnvelopeCacheStore</code> | Context Envelope Cache Store interface with 4 public fields or methods. |
| `VersionValidContextCacheOptions` | interface | <code>interface VersionValidContextCacheOptions</code> | Version Valid Context Cache Options interface with 5 public fields or methods. |
| `VersionValidContextCacheRecord` | interface | <code>interface VersionValidContextCacheRecord</code> | Version Valid Context Cache Record interface with 7 public fields or methods. |

## `InMemoryContextEnvelopeCacheStore`

In Memory Context Envelope Cache Store class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryContextEnvelopeCacheStore } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export declare class InMemoryContextEnvelopeCacheStore implements ContextEnvelopeCacheStore {
    get(key: string): Promise<VersionValidContextCacheRecord | null>;
    set(key: string, value: VersionValidContextCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryContextEnvelopeCacheStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `VersionValidContextCache`

Version Valid Context Cache class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { VersionValidContextCache } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export declare class VersionValidContextCache implements MemoryProjectionInvalidationTarget {
    readonly id: string;
    constructor(options: VersionValidContextCacheOptions);
    invalidateScope(scopeHash: string): Promise<number>;
    get(key: string, current: ContextCacheVersionSnapshot): Promise<ContextEnvelope | null>;
    set(key: string, envelope: ContextEnvelope, snapshot: ContextCacheVersionSnapshot, expiresAt?: string): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: VersionValidContextCacheOptions): VersionValidContextCache</code> | Creates an instance of this class. |
| `get` | method | <code>get(key: string, current: ContextCacheVersionSnapshot): Promise&lt;ContextEnvelope &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, envelope: ContextEnvelope, snapshot: ContextCacheVersionSnapshot, expiresAt?: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createContextCacheValidityHash`

Create Context Cache Validity Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createContextCacheValidityHash } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export declare function createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string;
```

### Call signature

```text
createContextCacheValidityHash(snapshot: ContextCacheVersionSnapshot): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `snapshot` | <code>ContextCacheVersionSnapshot</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `ContextCacheVersionSnapshot`

Context Cache Version Snapshot interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ContextCacheVersionSnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export interface ContextCacheVersionSnapshot {
    contextProfileRevision: string;
    memoryProfileRevision: string;
    scopeHash: string;
    providerRevision?: string;
    policyRevision?: string;
    mutationGeneration: string;
    selectedMemoryVersionIds: string[];
    sourceHashes: Record<string, string>;
    artifactHashes?: Record<string, string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactHashes` | property | <code>artifactHashes?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfileRevision` | property | <code>contextProfileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRevision` | property | <code>memoryProfileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selectedMemoryVersionIds` | property | <code>selectedMemoryVersionIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHashes` | property | <code>sourceHashes: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextEnvelopeCacheStore`

Context Envelope Cache Store interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ContextEnvelopeCacheStore } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export interface ContextEnvelopeCacheStore {
    get(key: string): Promise<VersionValidContextCacheRecord | null>;
    set(key: string, value: VersionValidContextCacheRecord): Promise<void>;
    delete(key: string): Promise<void>;
    invalidateScope(scopeHash: string): Promise<number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(key: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(key: string): Promise&lt;VersionValidContextCacheRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `invalidateScope` | method | <code>invalidateScope(scopeHash: string): Promise&lt;number&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `set` | method | <code>set(key: string, value: VersionValidContextCacheRecord): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `VersionValidContextCacheOptions`

Version Valid Context Cache Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { VersionValidContextCacheOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export interface VersionValidContextCacheOptions {
    store: ContextEnvelopeCacheStore;
    now?: () => string;
    artifactStore?: ContextArtifactStore;
    projectionId?: string;
    generations?: MemoryMutationGenerationStore;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactStore` | property | <code>artifactStore?: ContextArtifactStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `generations` | property | <code>generations?: MemoryMutationGenerationStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `projectionId` | property | <code>projectionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: ContextEnvelopeCacheStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VersionValidContextCacheRecord`

Version Valid Context Cache Record interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { VersionValidContextCacheRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`context-cache-validity`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-cache-validity.ts)

### Declaration

```text
export interface VersionValidContextCacheRecord {
    key: string;
    envelope: ContextEnvelope;
    snapshot: ContextCacheVersionSnapshot;
    validityHash: string;
    envelopeHash: string;
    createdAt: string;
    expiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelope` | property | <code>envelope: ContextEnvelope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelopeHash` | property | <code>envelopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: ContextCacheVersionSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validityHash` | property | <code>validityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
