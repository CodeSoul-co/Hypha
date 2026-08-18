# `@codesoul-co/hypha-adapters-local` / `local-sandbox-lifecycle`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-sandbox-lifecycle.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)
- Exports: **2**

## Using this module

Use the Local sandbox lifecycle module for using the public contracts and operations for this capability boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  LocalSandboxLifecycle,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalSandboxLifecycleOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalSandboxLifecycle` | class | <code>new LocalSandboxLifecycle(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | Local Process identity wrapper around the provider-neutral lifecycle state. |
| `LocalSandboxLifecycleOptions` | interface | <code>interface LocalSandboxLifecycleOptions</code> | Local Sandbox Lifecycle Options interface with 4 public fields or methods. |

## `LocalSandboxLifecycle`

Local Process identity wrapper around the provider-neutral lifecycle state.

- Kind: class
- Import: `import { LocalSandboxLifecycle } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-sandbox-lifecycle`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)

### Declaration

```text
export declare class LocalSandboxLifecycle extends InMemorySandboxLifecycle {
    constructor(options: LocalSandboxLifecycleOptions);
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `beginTermination` | method | <code>beginTermination(input: SandboxTerminateRequest): SandboxRecord</code> | Public method; parameters and return type are shown in the signature. |
| `cleanup` | method | <code>cleanup(input: SandboxCleanupRequest): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: LocalSandboxLifecycleOptions): LocalSandboxLifecycle</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: SandboxCreateRequest, metadata: Record&lt;string, unknown&gt;): SandboxRecord</code> | Public method; parameters and return type are shown in the signature. |
| `environmentForCommand` | method | <code>environmentForCommand(request: CommandExecutionRequest): ExecutionEnvironmentSpec</code> | Public method; parameters and return type are shown in the signature. |
| `finishTermination` | method | <code>finishTermination(sandboxId: string): SandboxRecord</code> | Public method; parameters and return type are shown in the signature. |
| `markBusy` | method | <code>markBusy(sandboxId: string, executionId: string): SandboxRecord</code> | Public method; parameters and return type are shown in the signature. |
| `markExecutionComplete` | method | <code>markExecutionComplete(sandboxId: string, executionId: string, completedAt: string): SandboxRecord</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(input: SandboxStartRequest): SandboxRecord</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(input: SandboxStatusRequest): SandboxRecord &#124; null</code> | Public method; parameters and return type are shown in the signature. |

## `LocalSandboxLifecycleOptions`

Local Sandbox Lifecycle Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LocalSandboxLifecycleOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-sandbox-lifecycle`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-sandbox-lifecycle.ts)

### Declaration

```text
export interface LocalSandboxLifecycleOptions {
    providerId: string;
    workspaceRoot: string;
    now?: () => string;
    sandboxId?: (request: SandboxCreateRequest) => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sandboxId` | method | <code>sandboxId?(request: SandboxCreateRequest): string</code> | Public method; parameters and return type are shown in the signature. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
