# `@codesoul-co/hypha-adapters-local` / `common-tool-port-bindings`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/common-tool-port-bindings.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)
- Exports: **7**

## Using this module

Use the Common tool port bindings module for defining or implementing provider-neutral ports. It exports 3 classes, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  ArtifactManagerCommonToolPort,
  GovernedCommandCommonToolPort,
  WorkspaceCommonToolPort,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerCommonToolPortOptions,
  CommonToolProviderPort,
  CommonToolProviderRequest,
  GovernedCommandDispatchFactory,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerCommonToolPort` | class | <code>new ArtifactManagerCommonToolPort(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed. |
| `GovernedCommandCommonToolPort` | class | <code>new GovernedCommandCommonToolPort(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | Binds common.command to the authorization-verifying ExecutionPort boundary. |
| `WorkspaceCommonToolPort` | class | <code>new WorkspaceCommonToolPort(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding. |
| `ArtifactManagerCommonToolPortOptions` | interface | <code>interface ArtifactManagerCommonToolPortOptions</code> | Artifact Manager Common Tool Port Options interface with 2 public fields or methods. |
| `CommonToolProviderPort` | interface | <code>interface CommonToolProviderPort</code> | Common Tool Provider Port interface with 1 public fields or methods. |
| `CommonToolProviderRequest` | interface | <code>interface CommonToolProviderRequest</code> | Structural mirror of the tools-owned CommonToolPort boundary. |
| `GovernedCommandDispatchFactory` | type | <code>type GovernedCommandDispatchFactory = (request: CommonToolProviderRequest) =&gt; Promise&lt;ExecutionDispatchRequest&gt; &#124; ExecutionDispatchRequest</code> | Public type alias for Governed Command Dispatch Factory; the declaration contains its complete type expression. |

## `ArtifactManagerCommonToolPort`

Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed.

- Kind: class
- Import: `import { ArtifactManagerCommonToolPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export declare class ArtifactManagerCommonToolPort implements CommonToolProviderPort {
    constructor(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions);
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `GovernedCommandCommonToolPort`

Binds common.command to the authorization-verifying ExecutionPort boundary.

- Kind: class
- Import: `import { GovernedCommandCommonToolPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export declare class GovernedCommandCommonToolPort implements CommonToolProviderPort {
    constructor(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory);
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `WorkspaceCommonToolPort`

Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding.

- Kind: class
- Import: `import { WorkspaceCommonToolPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export declare class WorkspaceCommonToolPort implements CommonToolProviderPort {
    constructor(workspace: WorkspaceRuntimePort);
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactManagerCommonToolPortOptions`

Artifact Manager Common Tool Port Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactManagerCommonToolPortOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export interface ArtifactManagerCommonToolPortOptions {
    profileRef: SpecRef;
    maxReadBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxReadBytes` | property | <code>maxReadBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CommonToolProviderPort`

Common Tool Provider Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { CommonToolProviderPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export interface CommonToolProviderPort {
    execute(request: CommonToolProviderRequest): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `CommonToolProviderRequest`

Structural mirror of the tools-owned CommonToolPort boundary.

- Kind: interface
- Import: `import type { CommonToolProviderRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export interface CommonToolProviderRequest {
    operation: string;
    input: Record<string, unknown>;
    context: ToolCallContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GovernedCommandDispatchFactory`

Public type alias for Governed Command Dispatch Factory; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { GovernedCommandDispatchFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`common-tool-port-bindings`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)

### Declaration

```text
export type GovernedCommandDispatchFactory = (request: CommonToolProviderRequest) => Promise<ExecutionDispatchRequest> | ExecutionDispatchRequest;
```
