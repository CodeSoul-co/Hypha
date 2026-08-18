# `@codesoul-co/hypha-adapters-local` / `local-artifact-workspace-content-reader`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-workspace-content-reader.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-workspace-content-reader.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalArtifactWorkspaceContentReader` | class | <code>new LocalArtifactWorkspaceContentReader(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory. |
| `LocalArtifactWorkspaceContentReaderOptions` | interface | <code>interface LocalArtifactWorkspaceContentReaderOptions</code> | Field contract for Local Artifact Workspace Content Reader Options; see all contract members below. |

## `LocalArtifactWorkspaceContentReader` public members

Streams governed Workspace files into ArtifactManager without exposing host paths or buffering the complete output in memory.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalArtifactWorkspaceContentReaderOptions): LocalArtifactWorkspaceContentReader</code> | Creates an instance of this class. |
| `read` | method | <code>read(request: ArtifactWorkspaceContentRequest): Promise&lt;ArtifactWorkspaceContent&gt;</code> | Public runtime operation for read. |

## `LocalArtifactWorkspaceContentReaderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `chunkSizeBytes` | property | <code>chunkSizeBytes: number</code> | Public chunk Size Bytes property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |
