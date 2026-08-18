# `@codesoul-co/hypha-core` / `modules/runtime/runtime-replay-service`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-replay-service.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)
- Exports: **2**

## Using this module

Use the Runtime replay service module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  RuntimeReplayService,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeReplayServiceOptions,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RuntimeReplayService` | class | <code>new RuntimeReplayService(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | Runtime Replay Service class with 3 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeReplayServiceOptions` | interface | <code>interface RuntimeReplayServiceOptions</code> | Runtime Replay Service Options interface with 3 public fields or methods. |

## `RuntimeReplayService`

Runtime Replay Service class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeReplayService } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-replay-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)

### Declaration

```text
export declare class RuntimeReplayService implements RuntimeReplayServiceContract {
    constructor(options: RuntimeReplayServiceOptions);
    replay(input: RuntimeReplayRequest): Promise<RuntimeReplayResult>;
    verify(input: RuntimeReplayVerificationRequest): Promise<RuntimeReplayVerificationResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeReplayServiceOptions): RuntimeReplayService</code> | Creates an instance of this class. |
| `replay` | method | <code>replay(input: RuntimeReplayRequest): Promise&lt;RuntimeReplayResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verify` | method | <code>verify(input: RuntimeReplayVerificationRequest): Promise&lt;RuntimeReplayVerificationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeReplayServiceOptions`

Runtime Replay Service Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeReplayServiceOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-replay-service`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-replay-service.ts)

### Declaration

```text
export interface RuntimeReplayServiceOptions {
    events: Pick<EventRuntime, 'read'>;
    checkpoints: Pick<RuntimeCheckpointService, 'load'>;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoints` | property | <code>checkpoints: Pick&lt;RuntimeCheckpointService, "load"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
