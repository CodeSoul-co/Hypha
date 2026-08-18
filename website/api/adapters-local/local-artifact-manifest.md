# `@codesoul-co/hypha-adapters-local` / `local-artifact-manifest`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-manifest.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-manifest.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deleteLocalArtifactManifest` | function | <code>deleteLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;void&gt;</code> | Deletes Local Artifact Manifest at this module boundary. |
| `listLocalArtifactManifests` | function | <code>listLocalArtifactManifests(paths: LocalArtifactStorePaths): Promise&lt;LocalArtifactObjectManifest[]&gt;</code> | Lists Local Artifact Manifests at this module boundary. |
| `readLocalArtifactManifest` | function | <code>readLocalArtifactManifest(paths: LocalArtifactStorePaths, objectKey: string): Promise&lt;LocalArtifactObjectManifest &#124; null&gt;</code> | Public runtime operation for read Local Artifact Manifest. |
| `writeLocalArtifactManifest` | function | <code>writeLocalArtifactManifest(paths: LocalArtifactStorePaths, manifest: LocalArtifactObjectManifest, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | Public runtime operation for write Local Artifact Manifest. |
| `LocalArtifactObjectManifest` | interface | <code>interface LocalArtifactObjectManifest</code> | Field contract for Local Artifact Object Manifest; see all contract members below. |

## `LocalArtifactObjectManifest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `etag` | property | <code>etag: string</code> | Public etag property. |
| `lastModifiedAt` | property | <code>lastModifiedAt: string</code> | Public last Modified At property. |
| `metadata` | property | <code>metadata: Record&lt;string, string&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `objectKey` | property | <code>objectKey: string</code> | Public object Key property. |
| `schemaVersion` | property | <code>schemaVersion: 1</code> | Public schema Version property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
