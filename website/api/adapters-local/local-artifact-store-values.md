# `@codesoul-co/hypha-adapters-local` / `local-artifact-store-values`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-store-values.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)
- Exports: **4**

## Using this module

Use the Local artifact store values module for persisting and reading data at this boundary. It exports 4 functions.

### Import from the package entrypoint

```ts
import {
  cloneLocalArtifactMetadata,
  localManifestMetadata,
  normalizeLocalArtifactRange,
  normalizeLocalArtifactStoreError,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cloneLocalArtifactMetadata` | function | <code>cloneLocalArtifactMetadata(value?: Record&lt;string, string&gt;): Record&lt;string, string&gt; &#124; undefined</code> | Clone Local Artifact Metadata function with 1 public call signature; parameters and return types are listed below. |
| `localManifestMetadata` | function | <code>localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata</code> | Local Manifest Metadata function with 1 public call signature; parameters and return types are listed below. |
| `normalizeLocalArtifactRange` | function | <code>normalizeLocalArtifactRange(range: ArtifactGetRequest["range"], sizeBytes: number): { start: number; endInclusive: number; } &#124; undefined</code> | Normalize Local Artifact Range function with 1 public call signature; parameters and return types are listed below. |
| `normalizeLocalArtifactStoreError` | function | <code>normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError</code> | Normalize Local Artifact Store Error function with 1 public call signature; parameters and return types are listed below. |

## `cloneLocalArtifactMetadata`

Clone Local Artifact Metadata function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { cloneLocalArtifactMetadata } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### Declaration

```text
export declare function cloneLocalArtifactMetadata(value?: Record<string, string>): Record<string, string> | undefined;
```

### Call signature

```text
cloneLocalArtifactMetadata(value?: Record<string, string>): Record<string, string> | undefined
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>Record&lt;string, string&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Record<string, string>`
- Description: The return contract is defined by the type shown above.

## `localManifestMetadata`

Local Manifest Metadata function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { localManifestMetadata } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### Declaration

```text
export declare function localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata;
```

### Call signature

```text
localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `manifest` | <code>LocalArtifactObjectManifest</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactObjectMetadata`
- Description: The return contract is defined by the type shown above.

## `normalizeLocalArtifactRange`

Normalize Local Artifact Range function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeLocalArtifactRange } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### Declaration

```text
export declare function normalizeLocalArtifactRange(range: ArtifactGetRequest['range'], sizeBytes: number): {
    start: number;
    endInclusive: number;
} | undefined;
```

### Call signature

```text
normalizeLocalArtifactRange(range: ArtifactGetRequest["range"], sizeBytes: number): { start: number; endInclusive: number; } | undefined
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `range` | <code>ArtifactByteRange</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `sizeBytes` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ start: number; endInclusive: number; }`
- Description: The return contract is defined by the type shown above.

## `normalizeLocalArtifactStoreError`

Normalize Local Artifact Store Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { normalizeLocalArtifactStoreError } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-store-values`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)

### Declaration

```text
export declare function normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError;
```

### Call signature

```text
normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `operation` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactStoreAdapterError`
- Description: The return contract is defined by the type shown above.
