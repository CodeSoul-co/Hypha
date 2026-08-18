# `@codesoul-co/hypha-adapters-local` / `local-process-output-stream-registry`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-output-stream-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)
- Exports: **2**

## Using this module

Use the Local process output stream registry module for registering and resolving versioned capabilities or implementations. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  LocalProcessOutputStreamRegistry,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessOutputStreamRegistryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessOutputStreamRegistry` | class | <code>new LocalProcessOutputStreamRegistry(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8. |
| `LocalProcessOutputStreamRegistryOptions` | interface | <code>interface LocalProcessOutputStreamRegistryOptions</code> | Local Process Output Stream Registry Options interface with 3 public fields or methods. |

## `LocalProcessOutputStreamRegistry`

Bounded replay and live-follow registry for Local Process output. Raw bytes are represented as base64 so chunk boundaries cannot corrupt UTF-8.

- Kind: class
- Import: `import { LocalProcessOutputStreamRegistry } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-stream-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)

### Declaration

```text
export declare class LocalProcessOutputStreamRegistry {
    constructor(options?: LocalProcessOutputStreamRegistryOptions);
    begin(executionId: string, principal: ExecutionPrincipal): void;
    publish(executionId: string, stream: CommandOutputChunk['stream'], bytes: Uint8Array, truncated?: boolean): CommandOutputChunk;
    complete(executionId: string): void;
    stream(request: RemoteOutputStreamRequest): AsyncIterable<CommandOutputChunk>;
    close(): void;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `begin` | method | <code>begin(executionId: string, principal: ExecutionPrincipal): void</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close(): void</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(executionId: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: LocalProcessOutputStreamRegistryOptions): LocalProcessOutputStreamRegistry</code> | Creates an instance of this class. |
| `publish` | method | <code>publish(executionId: string, stream: CommandOutputChunk["stream"], bytes: Uint8Array, truncated?: boolean): CommandOutputChunk</code> | Public method; parameters and return type are shown in the signature. |
| `stream` | method | <code>stream(request: RemoteOutputStreamRequest): AsyncIterable&lt;CommandOutputChunk&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalProcessOutputStreamRegistryOptions`

Local Process Output Stream Registry Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputStreamRegistryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-output-stream-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-output-stream-registry.ts)

### Declaration

```text
export interface LocalProcessOutputStreamRegistryOptions {
    maxRetainedChunks?: number;
    maxTrackedExecutions?: number;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxRetainedChunks` | property | <code>maxRetainedChunks?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTrackedExecutions` | property | <code>maxTrackedExecutions?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
