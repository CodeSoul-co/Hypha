# `@codesoul-co/hypha-adapters-local` / `artifact-manager-tool-port`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/artifact-manager-tool-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)
- Exports: **3**

## Using this module

Use the Artifact manager tool port module for defining or implementing provider-neutral ports. It exports 1 class, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  ArtifactManagerToolPort,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerToolPortOptions,
  ToolArtifactManagerContext,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerToolPort` | class | <code>new ArtifactManagerToolPort(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | Routes governed Tool result bytes through the Core ArtifactManager. |
| `ArtifactManagerToolPortOptions` | interface | <code>interface ArtifactManagerToolPortOptions</code> | Artifact Manager Tool Port Options interface with 2 public fields or methods. |
| `ToolArtifactManagerContext` | interface | <code>interface ToolArtifactManagerContext</code> | Tool Artifact Manager Context interface with 8 public fields or methods. |

## `ArtifactManagerToolPort`

Routes governed Tool result bytes through the Core ArtifactManager.

- Kind: class
- Import: `import { ArtifactManagerToolPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-manager-tool-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)

### Declaration

```text
export declare class ArtifactManagerToolPort implements ToolArtifactPort {
    constructor(options: ArtifactManagerToolPortOptions);
    store(request: {
            invocationId: string;
            toolId: string;
            value: unknown;
            mimeType?: string;
            metadata?: Record<string, unknown>;
        }): Promise<string>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | Creates an instance of this class. |
| `store` | method | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactManagerToolPortOptions`

Artifact Manager Tool Port Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactManagerToolPortOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-manager-tool-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)

### Declaration

```text
export interface ArtifactManagerToolPortOptions {
    manager: Pick<ArtifactManager, 'create'>;
    resolveContext(request: {
        invocationId: string;
        toolId: string;
    }): ToolArtifactManagerContext | Promise<ToolArtifactManagerContext>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveContext` | method | <code>resolveContext(request: { invocationId: string; toolId: string; }): ToolArtifactManagerContext &#124; Promise&lt;ToolArtifactManagerContext&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolArtifactManagerContext`

Tool Artifact Manager Context interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ToolArtifactManagerContext } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-manager-tool-port`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)

### Declaration

```text
export interface ToolArtifactManagerContext {
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    workspaceId: string;
    tenantId?: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
