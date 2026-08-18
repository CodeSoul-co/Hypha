# `@codesoul-co/hypha-tools` / `workspace`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `WorkspaceRuntimeConfig` | interface | <code>interface WorkspaceRuntimeConfig</code> | Field contract for Workspace Runtime Config; see all contract members below. |
| `WorkspaceRuntimePort` | interface | <code>interface WorkspaceRuntimePort</code> | Field contract for Workspace Runtime Port; see all contract members below. |
| `WorkspaceRuntimeRequest` | interface | <code>interface WorkspaceRuntimeRequest</code> | Field contract for Workspace Runtime Request; see all contract members below. |
| `WorkspaceFileOperation` | type | <code>type WorkspaceFileOperation = 'read' &#124; 'write' &#124; 'list' &#124; 'execute'</code> | Public type alias for Workspace File Operation. |

## `WorkspaceRuntimeConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executePaths` | property | <code>executePaths: string[]</code> | Public execute Paths property. |
| `execution` | property | <code>execution: { enabled: boolean; timeoutMs: number; maxOutputBytes: number; }</code> | Public execution property. |
| `readPaths` | property | <code>readPaths: string[]</code> | Public read Paths property. |
| `workingDirectory` | property | <code>workingDirectory: string</code> | Public working Directory property. |
| `writePaths` | property | <code>writePaths: string[]</code> | Public write Paths property. |

## `WorkspaceRuntimePort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `execute` | method | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |

## `WorkspaceRuntimeRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args: string[]</code> | Public args property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `cwd` | property | <code>cwd: string</code> | Public cwd property. |
| `executable` | property | <code>executable: boolean</code> | Public executable property. |
| `operation` | property | <code>operation: WorkspaceFileOperation</code> | Public operation property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
