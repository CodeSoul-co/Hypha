# `@codesoul-co/hypha-adapters-local` / `local-process-output-artifacts`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-output-artifacts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)
- Exports: **7**

## Using this module

Use the Local process output artifacts module for using the public contracts and operations for this capability boundary. It exports 1 class, 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  ArtifactManagerLocalProcessOutputPort,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerLocalProcessOutputPortOptions,
  LocalProcessOutputArtifactPort,
  LocalProcessOutputArtifactRequest,
  LocalProcessOutputArtifactStream,
  LocalProcessOutputArtifactStreamRequest,
  LocalProcessArtifactStream,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerLocalProcessOutputPort` | class | <code>new ArtifactManagerLocalProcessOutputPort(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure. |
| `ArtifactManagerLocalProcessOutputPortOptions` | interface | <code>interface ArtifactManagerLocalProcessOutputPortOptions</code> | Artifact Manager Local Process Output Port Options interface with 3 public fields or methods. |
| `LocalProcessOutputArtifactPort` | interface | <code>interface LocalProcessOutputArtifactPort</code> | Local Process Output Artifact Port interface with 2 public fields or methods. |
| `LocalProcessOutputArtifactRequest` | interface | <code>interface LocalProcessOutputArtifactRequest</code> | Local Process Output Artifact Request interface with 7 public fields or methods. |
| `LocalProcessOutputArtifactStream` | interface | <code>interface LocalProcessOutputArtifactStream</code> | Local Process Output Artifact Stream interface with 3 public fields or methods. |
| `LocalProcessOutputArtifactStreamRequest` | interface | <code>interface LocalProcessOutputArtifactStreamRequest</code> | Local Process Output Artifact Stream Request interface with 3 public fields or methods. |
| `LocalProcessArtifactStream` | type | <code>type LocalProcessArtifactStream = 'stdout' &#124; 'stderr'</code> | Public type alias for Local Process Artifact Stream; the declaration contains its complete type expression. |

## `ArtifactManagerLocalProcessOutputPort`

Persists Local Process output through the governed ArtifactManager. `store` retains the bounded compatibility path; `openStream` forwards raw process bytes with bounded producer backpressure.

- Kind: class
- Import: `import { ArtifactManagerLocalProcessOutputPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export declare class ArtifactManagerLocalProcessOutputPort implements LocalProcessOutputArtifactPort {
    constructor(options: ArtifactManagerLocalProcessOutputPortOptions);
    store(request: LocalProcessOutputArtifactRequest): Promise<string>;
    openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactManagerLocalProcessOutputPortOptions): ArtifactManagerLocalProcessOutputPort</code> | Creates an instance of this class. |
| `openStream` | method | <code>openStream(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | Public method; parameters and return type are shown in the signature. |
| `store` | method | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactManagerLocalProcessOutputPortOptions`

Artifact Manager Local Process Output Port Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactManagerLocalProcessOutputPortOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export interface ArtifactManagerLocalProcessOutputPortOptions {
    manager: Pick<ArtifactManager, 'create'>;
    profileRef: SpecRef;
    maxBufferedStreamBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxBufferedStreamBytes` | property | <code>maxBufferedStreamBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessOutputArtifactPort`

Local Process Output Artifact Port interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputArtifactPort } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export interface LocalProcessOutputArtifactPort {
    store(request: LocalProcessOutputArtifactRequest): Promise<string>;
    openStream?(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `openStream` | method | <code>openStream?(request: LocalProcessOutputArtifactStreamRequest): LocalProcessOutputArtifactStream</code> | Public method; parameters and return type are shown in the signature. |
| `store` | method | <code>store(request: LocalProcessOutputArtifactRequest): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalProcessOutputArtifactRequest`

Local Process Output Artifact Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputArtifactRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export interface LocalProcessOutputArtifactRequest {
    executionId: string;
    request: CommandExecutionRequest;
    stream: LocalProcessArtifactStream;
    content: Uint8Array;
    contentHash: string;
    observedBytes: number;
    truncated: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: Uint8Array&lt;ArrayBufferLike&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedBytes` | property | <code>observedBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | property | <code>stream: LocalProcessArtifactStream</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncated` | property | <code>truncated: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessOutputArtifactStream`

Local Process Output Artifact Stream interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputArtifactStream } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export interface LocalProcessOutputArtifactStream {
    append(chunk: Uint8Array): Promise<void>;
    complete(): Promise<string>;
    abort(error: unknown): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abort` | method | <code>abort(error: unknown): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `append` | method | <code>append(chunk: Uint8Array): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalProcessOutputArtifactStreamRequest`

Local Process Output Artifact Stream Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputArtifactStreamRequest } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export interface LocalProcessOutputArtifactStreamRequest {
    executionId: string;
    request: CommandExecutionRequest;
    stream: LocalProcessArtifactStream;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | property | <code>stream: LocalProcessArtifactStream</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessArtifactStream`

Public type alias for Local Process Artifact Stream; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalProcessArtifactStream } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-artifacts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-artifacts.ts)

### Declaration

```text
export type LocalProcessArtifactStream = 'stdout' | 'stderr';
```
