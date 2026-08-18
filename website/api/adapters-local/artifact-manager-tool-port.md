# `@codesoul-co/hypha-adapters-local` / `artifact-manager-tool-port`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/artifact-manager-tool-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerToolPort` | class | <code>new ArtifactManagerToolPort(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | Routes governed Tool result bytes through the Core ArtifactManager. |
| `ArtifactManagerToolPortOptions` | interface | <code>interface ArtifactManagerToolPortOptions</code> | Field contract for Artifact Manager Tool Port Options; see all contract members below. |
| `ToolArtifactManagerContext` | interface | <code>interface ToolArtifactManagerContext</code> | Field contract for Tool Artifact Manager Context; see all contract members below. |

## `ArtifactManagerToolPort` public members

Routes governed Tool result bytes through the Core ArtifactManager.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | Creates an instance of this class. |
| `store` | method | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public runtime operation for store. |

## `ArtifactManagerToolPortOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | Public manager property. |
| `resolveContext` | method | <code>resolveContext(request: { invocationId: string; toolId: string; }): ToolArtifactManagerContext &#124; Promise&lt;ToolArtifactManagerContext&gt;</code> | Resolves Context at this module boundary. |

## `ToolArtifactManagerContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public principal property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |
