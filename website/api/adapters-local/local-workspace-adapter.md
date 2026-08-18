# `@codesoul-co/hypha-adapters-local` / `local-workspace-adapter`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-workspace-adapter.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)
- Exports: **3**

## Using this module

Use the Local workspace adapter module for declaring and enforcing workspace scope boundaries. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  LocalWorkspaceAdapter,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalWorkspaceAdapterOptions,
  LocalWorkspaceCaptureOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalWorkspaceAdapter` | class | <code>new LocalWorkspaceAdapter(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | Adapts a governed Workspace root to Local Process mutation evidence. |
| `LocalWorkspaceAdapterOptions` | interface | <code>interface LocalWorkspaceAdapterOptions</code> | Local Workspace Adapter Options interface with 4 public fields or methods. |
| `LocalWorkspaceCaptureOptions` | interface | <code>interface LocalWorkspaceCaptureOptions</code> | Local Workspace Capture Options interface with 1 public fields or methods. |

## `LocalWorkspaceAdapter`

Adapts a governed Workspace root to Local Process mutation evidence.

- Kind: class
- Import: `import { LocalWorkspaceAdapter } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-workspace-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)

### Declaration

```text
export declare class LocalWorkspaceAdapter {
    readonly workspaceRoot: string;
    constructor(options: LocalWorkspaceAdapterOptions);
    assertAvailable(): Promise<void>;
    capture(options?: LocalWorkspaceCaptureOptions): Promise<LocalWorkspaceSnapshot>;
    diff(before: LocalWorkspaceSnapshot, after: LocalWorkspaceSnapshot, detectedAt: string): FileMutation[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertAvailable` | method | <code>assertAvailable(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capture` | method | <code>capture(options?: LocalWorkspaceCaptureOptions): Promise&lt;LocalWorkspaceSnapshot&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: LocalWorkspaceAdapterOptions): LocalWorkspaceAdapter</code> | Creates an instance of this class. |
| `diff` | method | <code>diff(before: LocalWorkspaceSnapshot, after: LocalWorkspaceSnapshot, detectedAt: string): FileMutation[]</code> | Public method; parameters and return type are shown in the signature. |
| `workspaceRoot` | property | <code>readonly workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalWorkspaceAdapterOptions`

Local Workspace Adapter Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { LocalWorkspaceAdapterOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-workspace-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)

### Declaration

```text
export interface LocalWorkspaceAdapterOptions {
    workspaceRoot: string;
    maxTrackedFiles?: number;
    maxTrackedBytes?: number;
    maxCaptureDurationMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCaptureDurationMs` | property | <code>maxCaptureDurationMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTrackedBytes` | property | <code>maxTrackedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTrackedFiles` | property | <code>maxTrackedFiles?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceRoot` | property | <code>workspaceRoot: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalWorkspaceCaptureOptions`

Local Workspace Capture Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { LocalWorkspaceCaptureOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-workspace-adapter`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-workspace-adapter.ts)

### Declaration

```text
export interface LocalWorkspaceCaptureOptions {
    abortSignal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
