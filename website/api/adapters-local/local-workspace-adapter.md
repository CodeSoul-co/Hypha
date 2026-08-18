# `@codesoul-co/hypha-adapters-local` / `local-workspace-adapter`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-workspace-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalWorkspaceAdapter` | class | <code>new LocalWorkspaceAdapter(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | Adapts a governed Workspace root to Local Process mutation evidence. |
| `LocalWorkspaceAdapterOptions` | interface | <code>interface LocalWorkspaceAdapterOptions</code> | Field contract for Local Workspace Adapter Options; see all contract members below. |
| `LocalWorkspaceCaptureOptions` | interface | <code>interface LocalWorkspaceCaptureOptions</code> | Field contract for Local Workspace Capture Options; see all contract members below. |

## `LocalWorkspaceAdapter` public members

Adapts a governed Workspace root to Local Process mutation evidence.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertAvailable` | method | <code>assertAvailable(): Promise&lt;void&gt;</code> | Asserts Available at this module boundary. |
| `capture` | method | <code>capture(options?: LocalWorkspaceCaptureOptions): Promise&lt;LocalWorkspaceSnapshot&gt;</code> | Public runtime operation for capture. |
| `constructor` | constructor | <code>(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | Creates an instance of this class. |
| `diff` | method | <code>diff(before: LocalWorkspaceSnapshot, after: LocalWorkspaceSnapshot, detectedAt: string): FileMutation[]</code> | Public runtime operation for diff. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |

## `LocalWorkspaceAdapterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCaptureDurationMs` | property | <code>maxCaptureDurationMs: number</code> | Public max Capture Duration Ms property. |
| `maxTrackedBytes` | property | <code>maxTrackedBytes: number</code> | Public max Tracked Bytes property. |
| `maxTrackedFiles` | property | <code>maxTrackedFiles: number</code> | Public max Tracked Files property. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |

## `LocalWorkspaceCaptureOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
