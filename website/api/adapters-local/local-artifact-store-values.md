# `@codesoul-co/hypha-adapters-local` / `local-artifact-store-values`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-store-values.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-store-values.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cloneLocalArtifactMetadata` | function | <code>cloneLocalArtifactMetadata(value?: Record&lt;string, string&gt;): Record&lt;string, string&gt; &#124; undefined</code> | Public runtime operation for clone Local Artifact Metadata. |
| `localManifestMetadata` | function | <code>localManifestMetadata(manifest: LocalArtifactObjectManifest): ArtifactObjectMetadata</code> | Public runtime operation for local Manifest Metadata. |
| `normalizeLocalArtifactRange` | function | <code>normalizeLocalArtifactRange(range: ArtifactGetRequest["range"], sizeBytes: number): { start: number; endInclusive: number; } &#124; undefined</code> | Normalizes Local Artifact Range at this module boundary. |
| `normalizeLocalArtifactStoreError` | function | <code>normalizeLocalArtifactStoreError(error: unknown, operation: string): ArtifactStoreAdapterError</code> | Normalizes Local Artifact Store Error at this module boundary. |
