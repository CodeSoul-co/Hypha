# `@codesoul-co/hypha-tools` / `workspace`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)
- Exports: **4**

## Using this module

Use the Workspace module for declaring and enforcing workspace scope boundaries. It exports 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import type {
  WorkspaceRuntimeConfig,
  WorkspaceRuntimePort,
  WorkspaceRuntimeRequest,
  WorkspaceFileOperation,
} from '@codesoul-co/hypha-tools';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `WorkspaceRuntimeConfig` | interface | <code>interface WorkspaceRuntimeConfig</code> | Workspace Runtime Config interface with 5 public fields or methods. |
| `WorkspaceRuntimePort` | interface | <code>interface WorkspaceRuntimePort</code> | Workspace Runtime Port interface with 3 public fields or methods. |
| `WorkspaceRuntimeRequest` | interface | <code>interface WorkspaceRuntimeRequest</code> | Workspace Runtime Request interface with 8 public fields or methods. |
| `WorkspaceFileOperation` | type | <code>type WorkspaceFileOperation = 'read' &#124; 'write' &#124; 'list' &#124; 'execute'</code> | Public type alias for Workspace File Operation; the declaration contains its complete type expression. |

## `WorkspaceRuntimeConfig`

Workspace Runtime Config interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceRuntimeConfig } from '@codesoul-co/hypha-tools';`
- Source module: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### Declaration

```text
export interface WorkspaceRuntimeConfig {
    workingDirectory: string;
    readPaths: string[];
    writePaths: string[];
    executePaths: string[];
    execution: {
        enabled: boolean;
        timeoutMs: number;
        maxOutputBytes: number;
    };
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executePaths` | property | <code>executePaths: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `execution` | property | <code>execution: { enabled: boolean; timeoutMs: number; maxOutputBytes: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readPaths` | property | <code>readPaths: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workingDirectory` | property | <code>workingDirectory: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writePaths` | property | <code>writePaths: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceRuntimePort`

Workspace Runtime Port interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceRuntimePort } from '@codesoul-co/hypha-tools';`
- Source module: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### Declaration

```text
export interface WorkspaceRuntimePort {
    execute(request: WorkspaceRuntimeRequest): Promise<unknown>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `WorkspaceRuntimeRequest`

Workspace Runtime Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { WorkspaceRuntimeRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### Declaration

```text
export interface WorkspaceRuntimeRequest {
    operation: WorkspaceFileOperation;
    path: string;
    content?: string;
    executable?: boolean;
    args?: string[];
    cwd?: string;
    timeoutMs?: number;
    signal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `args` | property | <code>args?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cwd` | property | <code>cwd?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executable` | property | <code>executable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: WorkspaceFileOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkspaceFileOperation`

Public type alias for Workspace File Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { WorkspaceFileOperation } from '@codesoul-co/hypha-tools';`
- Source module: [`workspace`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)

### Declaration

```text
export type WorkspaceFileOperation = 'read' | 'write' | 'list' | 'execute';
```
