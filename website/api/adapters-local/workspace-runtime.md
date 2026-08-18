# `@codesoul-co/hypha-adapters-local` / `workspace-runtime`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/workspace-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts)
- Exports: **1**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalWorkspaceRuntime` | class | <code>new LocalWorkspaceRuntime(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | Runtime implementation for Local Workspace Runtime; see its public constructor and members below. |

## `LocalWorkspaceRuntime` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `initialize` | method | <code>initialize(): Promise&lt;void&gt;</code> | Public runtime operation for initialize. |
