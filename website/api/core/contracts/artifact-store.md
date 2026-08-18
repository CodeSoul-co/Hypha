# `@codesoul-co/hypha-core` / `contracts/artifact-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)
- Exports: **13**

## Using this module

Use the Artifact store module for declaring and runtime-validating contracts. It exports 12 interfaces, 1 type.

### Import from the package entrypoint

```ts
import type {
  ArtifactByteRange,
  ArtifactContent,
  ArtifactCopyRequest,
  ArtifactDownloadAccess,
  ArtifactDownloadAccessRequest,
  ArtifactGetRequest,
  ArtifactObjectMetadata,
  ArtifactOperationOptions,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 13 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactByteRange` | interface | <code>interface ArtifactByteRange</code> | Artifact Byte Range interface with 2 public fields or methods. |
| `ArtifactContent` | interface | <code>interface ArtifactContent</code> | Artifact Content interface with 6 public fields or methods. |
| `ArtifactCopyRequest` | interface | <code>interface ArtifactCopyRequest</code> | Artifact Copy Request interface with 4 public fields or methods. |
| `ArtifactDownloadAccess` | interface | <code>interface ArtifactDownloadAccess</code> | Artifact Download Access interface with 4 public fields or methods. |
| `ArtifactDownloadAccessRequest` | interface | <code>interface ArtifactDownloadAccessRequest</code> | Artifact Download Access Request interface with 4 public fields or methods. |
| `ArtifactGetRequest` | interface | <code>interface ArtifactGetRequest</code> | Artifact Get Request interface with 3 public fields or methods. |
| `ArtifactObjectMetadata` | interface | <code>interface ArtifactObjectMetadata</code> | Artifact Object Metadata interface with 6 public fields or methods. |
| `ArtifactOperationOptions` | interface | <code>interface ArtifactOperationOptions</code> | Artifact Operation Options interface with 1 public fields or methods. |
| `ArtifactPutRequest` | interface | <code>interface ArtifactPutRequest</code> | Artifact Put Request interface with 8 public fields or methods. |
| `ArtifactStoreCapabilities` | interface | <code>interface ArtifactStoreCapabilities</code> | Artifact Store Capabilities interface with 7 public fields or methods. |
| `ArtifactStoreProvider` | interface | <code>interface ArtifactStoreProvider</code> | Artifact Store Provider interface with 11 public fields or methods. |
| `ArtifactStoreProviderFactory` | interface | <code>interface ArtifactStoreProviderFactory</code> | Artifact Store Provider Factory interface with 2 public fields or methods. |
| `ArtifactByteSource` | type | <code>type ArtifactByteSource = Uint8Array &#124; AsyncIterable&lt;Uint8Array&gt;</code> | Public type alias for Artifact Byte Source; the declaration contains its complete type expression. |

## `ArtifactByteRange`

Artifact Byte Range interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactByteRange } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactByteRange {
    start: number;
    endInclusive?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `endInclusive` | property | <code>endInclusive?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `start` | property | <code>start: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactContent`

Artifact Content interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactContent } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactContent {
    stream: AsyncIterable<Uint8Array>;
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    etag?: string;
    range?: ArtifactByteRange;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `etag` | property | <code>etag?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `range` | property | <code>range?: ArtifactByteRange</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | property | <code>stream: AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactCopyRequest`

Artifact Copy Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactCopyRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactCopyRequest {
    operationId: string;
    source: ArtifactStorageRef;
    targetObjectKey: string;
    ifAbsent?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ifAbsent` | property | <code>ifAbsent?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetObjectKey` | property | <code>targetObjectKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactDownloadAccess`

Artifact Download Access interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactDownloadAccess } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactDownloadAccess {
    method: 'GET';
    url: string;
    expiresAt: string;
    headers?: Record<string, string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresAt` | property | <code>expiresAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `headers` | property | <code>headers?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `method` | property | <code>method: "GET"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactDownloadAccessRequest`

Artifact Download Access Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactDownloadAccessRequest {
    ref: ArtifactStorageRef;
    expiresInSeconds: number;
    responseMimeType?: string;
    responseFilename?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expiresInSeconds` | property | <code>expiresInSeconds: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ref` | property | <code>ref: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseFilename` | property | <code>responseFilename?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseMimeType` | property | <code>responseMimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactGetRequest`

Artifact Get Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactGetRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactGetRequest {
    ref: ArtifactStorageRef;
    range?: ArtifactByteRange;
    expectedContentHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `range` | property | <code>range?: ArtifactByteRange</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ref` | property | <code>ref: ArtifactStorageRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactObjectMetadata`

Artifact Object Metadata interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactObjectMetadata } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactObjectMetadata {
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    etag?: string;
    lastModifiedAt?: string;
    metadata?: Record<string, string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `etag` | property | <code>etag?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastModifiedAt` | property | <code>lastModifiedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactOperationOptions`

Artifact Operation Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactOperationOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactOperationOptions {
    abortSignal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactPutRequest`

Artifact Put Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactPutRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactPutRequest {
    operationId: string;
    objectKey: string;
    content: ArtifactByteSource;
    expectedContentHash?: string;
    sizeBytes?: number;
    mimeType?: string;
    metadata?: Record<string, string>;
    ifAbsent?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: ArtifactByteSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedContentHash` | property | <code>expectedContentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ifAbsent` | property | <code>ifAbsent?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `objectKey` | property | <code>objectKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactStoreCapabilities`

Artifact Store Capabilities interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactStoreCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactStoreCapabilities {
    versioning: boolean;
    rangeRead: boolean;
    signedAccess: boolean;
    serverSideCopy: boolean;
    encryption: boolean;
    multipartUpload: boolean;
    contentAddressing: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentAddressing` | property | <code>contentAddressing: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `encryption` | property | <code>encryption: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `multipartUpload` | property | <code>multipartUpload: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rangeRead` | property | <code>rangeRead: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serverSideCopy` | property | <code>serverSideCopy: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signedAccess` | property | <code>signedAccess: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versioning` | property | <code>versioning: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactStoreProvider`

Artifact Store Provider interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactStoreProvider } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactStoreProvider {
    readonly id: string;
    capabilities(): Promise<ArtifactStoreCapabilities>;
    put(request: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise<ArtifactStorageRef>;
    get(request: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise<ArtifactContent>;
    head(ref: ArtifactStorageRef): Promise<ArtifactObjectMetadata | null>;
    exists(ref: ArtifactStorageRef): Promise<boolean>;
    delete(ref: ArtifactStorageRef): Promise<void>;
    copy(request: ArtifactCopyRequest): Promise<ArtifactStorageRef>;
    createDownloadAccess?(request: ArtifactDownloadAccessRequest): Promise<ArtifactDownloadAccess>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): Promise&lt;ArtifactStoreCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `copy` | method | <code>copy(request: ArtifactCopyRequest): Promise&lt;ArtifactStorageRef&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createDownloadAccess` | method | <code>createDownloadAccess?(request: ArtifactDownloadAccessRequest): Promise&lt;ArtifactDownloadAccess&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `delete` | method | <code>delete(ref: ArtifactStorageRef): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `exists` | method | <code>exists(ref: ArtifactStorageRef): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(request: ArtifactGetRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactContent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `head` | method | <code>head(ref: ArtifactStorageRef): Promise&lt;ArtifactObjectMetadata &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `put` | method | <code>put(request: ArtifactPutRequest, options?: ArtifactOperationOptions): Promise&lt;ArtifactStorageRef&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactStoreProviderFactory`

Artifact Store Provider Factory interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactStoreProviderFactory } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export interface ArtifactStoreProviderFactory {
    readonly providerId: string;
    create(): ArtifactStoreProvider | Promise<ArtifactStoreProvider>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(): ArtifactStoreProvider &#124; Promise&lt;ArtifactStoreProvider&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactByteSource`

Public type alias for Artifact Byte Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactByteSource } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-store.ts)

### Declaration

```text
export type ArtifactByteSource = Uint8Array | AsyncIterable<Uint8Array>;
```
