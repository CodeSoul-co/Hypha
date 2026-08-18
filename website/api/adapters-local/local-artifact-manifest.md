# `@codesoul-co/hypha-adapters-local` / `local-artifact-manifest`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-manifest.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)
- Exports: **5**

## Using this module

Use the Local artifact manifest module for using the public contracts and operations for this capability boundary. It exports 4 functions, 1 interface.

### Import from the package entrypoint

```ts
import {
  deleteLocalArtifactManifest,
  listLocalArtifactManifests,
  readLocalArtifactManifest,
  writeLocalArtifactManifest,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalArtifactObjectManifest,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deleteLocalArtifactManifest` | function | <code>deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;void&gt;</code> | Delete Local Artifact Manifest function with 1 public call signature; parameters and return types are listed below. |
| `listLocalArtifactManifests` | function | <code>listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise&lt;LocalArtifactObjectManifest[]&gt;</code> | List Local Artifact Manifests function with 1 public call signature; parameters and return types are listed below. |
| `readLocalArtifactManifest` | function | <code>readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;LocalArtifactObjectManifest &#124; null&gt;</code> | Read Local Artifact Manifest function with 1 public call signature; parameters and return types are listed below. |
| `writeLocalArtifactManifest` | function | <code>writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | Write Local Artifact Manifest function with 1 public call signature; parameters and return types are listed below. |
| `LocalArtifactObjectManifest` | interface | <code>interface LocalArtifactObjectManifest</code> | Local Artifact Object Manifest interface with 8 public fields or methods. |

## `deleteLocalArtifactManifest`

Delete Local Artifact Manifest function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { deleteLocalArtifactManifest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### Declaration

```text
export declare function deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<void>;
```

### Call signature

```text
deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `objectKey` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `listLocalArtifactManifests`

List Local Artifact Manifests function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { listLocalArtifactManifests } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### Declaration

```text
export declare function listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise<LocalArtifactObjectManifest[]>;
```

### Call signature

```text
listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise<LocalArtifactObjectManifest[]>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<LocalArtifactObjectManifest[]>`
- Description: The return contract is defined by the type shown above.

## `readLocalArtifactManifest`

Read Local Artifact Manifest function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { readLocalArtifactManifest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### Declaration

```text
export declare function readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<LocalArtifactObjectManifest | null>;
```

### Call signature

```text
readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise<LocalArtifactObjectManifest | null>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `objectKey` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<LocalArtifactObjectManifest>`
- Description: The return contract is defined by the type shown above.

## `writeLocalArtifactManifest`

Write Local Artifact Manifest function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { writeLocalArtifactManifest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### Declaration

```text
export declare function writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: {
    ifAbsent?: boolean;
}): Promise<void>;
```

### Call signature

```text
writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: { ifAbsent?: boolean; }): Promise<void>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `paths` | <code>LocalArtifactStorePaths</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `manifest` | <code>LocalArtifactObjectManifest</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>{ ifAbsent?: boolean; }</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<void>`
- Description: The return contract is defined by the type shown above.

## `LocalArtifactObjectManifest`

Local Artifact Object Manifest interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { LocalArtifactObjectManifest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-artifact-manifest`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)

### Declaration

```text
export interface LocalArtifactObjectManifest {
    schemaVersion: 1;
    objectKey: string;
    contentHash: string;
    sizeBytes: number;
    mimeType?: string;
    etag: string;
    metadata?: Record<string, string>;
    lastModifiedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `etag` | property | <code>etag: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastModifiedAt` | property | <code>lastModifiedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `objectKey` | property | <code>objectKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: 1</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
