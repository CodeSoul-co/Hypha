# `@codesoul-co/hypha-adapters-local` / `workspace-runtime`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/workspace-runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts)
- Exports: **1**

## Using this module

Use the Workspace runtime module for declaring and enforcing workspace scope boundaries. It exports 1 class.

### Import from the package entrypoint

```ts
import {
  LocalWorkspaceRuntime,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalWorkspaceRuntime` | class | <code>new LocalWorkspaceRuntime(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | Local Workspace Runtime class with 4 public constructor or member entries; its exact declarations are listed below. |

## `LocalWorkspaceRuntime`

Local Workspace Runtime class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalWorkspaceRuntime } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`workspace-runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/workspace-runtime.ts)

### Declaration

```text
export declare class LocalWorkspaceRuntime implements WorkspaceRuntimePort {
    constructor(config: WorkspaceRuntimeConfig);
    initialize(): Promise<void>;
    execute(request: WorkspaceRuntimeRequest): Promise<unknown>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(config: WorkspaceRuntimeConfig): LocalWorkspaceRuntime</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `initialize` | method | <code>initialize(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
