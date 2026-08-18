# `@codesoul-co/hypha-adapters-local` / `local-sandbox-lifecycle`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-sandbox-lifecycle.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalSandboxLifecycle` | class | <code>new LocalSandboxLifecycle(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | Local Process identity wrapper around the provider-neutral lifecycle state. |
| `LocalSandboxLifecycleOptions` | interface | <code>interface LocalSandboxLifecycleOptions</code> | Field contract for Local Sandbox Lifecycle Options; see all contract members below. |

## `LocalSandboxLifecycle` public members

Local Process identity wrapper around the provider-neutral lifecycle state.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `beginTermination` | method | <code>beginTermination(input: SandboxTerminateRequest): SandboxRecord</code> | Public runtime operation for begin Termination. |
| `cleanup` | method | <code>cleanup(input: SandboxCleanupRequest): void</code> | Public runtime operation for cleanup. |
| `constructor` | constructor | <code>(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: SandboxCreateRequest, metadata: Record&lt;string, unknown&gt;): SandboxRecord</code> | Creates create at this module boundary. |
| `environmentForCommand` | method | <code>environmentForCommand(request: CommandExecutionRequest): ExecutionEnvironmentSpec</code> | Public runtime operation for environment For Command. |
| `finishTermination` | method | <code>finishTermination(sandboxId: string): SandboxRecord</code> | Public runtime operation for finish Termination. |
| `markBusy` | method | <code>markBusy(sandboxId: string, executionId: string): SandboxRecord</code> | Public runtime operation for mark Busy. |
| `markExecutionComplete` | method | <code>markExecutionComplete(sandboxId: string, executionId: string, completedAt: string): SandboxRecord</code> | Public runtime operation for mark Execution Complete. |
| `start` | method | <code>start(input: SandboxStartRequest): SandboxRecord</code> | Starts start at this module boundary. |
| `status` | method | <code>status(input: SandboxStatusRequest): SandboxRecord &#124; null</code> | Public runtime operation for status. |

## `LocalSandboxLifecycleOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `sandboxId` | method | <code>sandboxId(request: SandboxCreateRequest): string</code> | Public runtime operation for sandbox Id. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public workspace Root property. |
