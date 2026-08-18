# `@codesoul-co/hypha-core` / `modules/artifact/manager-content`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/manager-content.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)
- Exports: **3**

## Using this module

Use the Manager content module for using the public contracts and operations for this capability boundary. It exports 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  persistArtifactContent,
} from '@codesoul-co/hypha-core';

import type {
  PersistArtifactContentRequest,
  PersistedArtifactContent,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `persistArtifactContent` | function | <code>persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise&lt;PersistedArtifactContent&gt;</code> | Persist Artifact Content function with 1 public call signature; parameters and return types are listed below. |
| `PersistArtifactContentRequest` | interface | <code>interface PersistArtifactContentRequest</code> | Persist Artifact Content Request interface with 8 public fields or methods. |
| `PersistedArtifactContent` | interface | <code>interface PersistedArtifactContent</code> | Persisted Artifact Content interface with 5 public fields or methods. |

## `persistArtifactContent`

Persist Artifact Content function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { persistArtifactContent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-content`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)

### Declaration

```text
export declare function persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise<PersistedArtifactContent>;
```

### Call signature

```text
persistArtifactContent(request: PersistArtifactContentRequest, options?: ArtifactOperationOptions): Promise<PersistedArtifactContent>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `request` | <code>PersistArtifactContentRequest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>ArtifactOperationOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<PersistedArtifactContent>`
- Description: The return contract is defined by the type shown above.

## `PersistArtifactContentRequest`

Persist Artifact Content Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { PersistArtifactContentRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-content`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)

### Declaration

```text
export interface PersistArtifactContentRequest {
    operationId: string;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    expectedSizeBytes?: number;
    mimeType?: string;
    profile: ArtifactProfileSpec;
    store: ArtifactStoreProvider;
    nonce: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactByteSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nonce` | property | <code>nonce: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ArtifactProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `store` | property | <code>store: ArtifactStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PersistedArtifactContent`

Persisted Artifact Content interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { PersistedArtifactContent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/manager-content`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/manager-content.ts)

### Declaration

```text
export interface PersistedArtifactContent {
    storageRef: ArtifactStorageRef;
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    deduplicated: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplicated` | property | <code>deduplicated: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `storageRef` | property | <code>storageRef: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
