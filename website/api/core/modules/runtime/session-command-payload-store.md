# `@codesoul-co/hypha-core` / `modules/runtime/session-command-payload-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/session-command-payload-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)
- Exports: **5**

## Using this module

Use the Session command payload store module for persisting and reading data at this boundary. It exports 1 class, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  ArtifactSessionCommandPayloadStore,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactSessionCommandPayloadStoreOptions,
  PutSessionCommandPayloadRequest,
  SessionCommandPayloadReference,
  GetSessionCommandPayloadRequest,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactSessionCommandPayloadStore` | class | <code>new ArtifactSessionCommandPayloadStore(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | Stores canonical command JSON outside the Queue while retaining a verified durable reference. |
| `ArtifactSessionCommandPayloadStoreOptions` | interface | <code>interface ArtifactSessionCommandPayloadStoreOptions</code> | Artifact Session Command Payload Store Options interface with 2 public fields or methods. |
| `PutSessionCommandPayloadRequest` | interface | <code>interface PutSessionCommandPayloadRequest</code> | Put Session Command Payload Request interface with 2 public fields or methods. |
| `SessionCommandPayloadReference` | interface | <code>interface SessionCommandPayloadReference</code> | Session Command Payload Reference interface with 2 public fields or methods. |
| `GetSessionCommandPayloadRequest` | type | <code>type GetSessionCommandPayloadRequest = SessionCommandPayloadReference</code> | Public type alias for Get Session Command Payload Request; the declaration contains its complete type expression. |

## `ArtifactSessionCommandPayloadStore`

Stores canonical command JSON outside the Queue while retaining a verified durable reference.

- Kind: class
- Import: `import { ArtifactSessionCommandPayloadStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### Declaration

```text
export declare class ArtifactSessionCommandPayloadStore {
    constructor(options: ArtifactSessionCommandPayloadStoreOptions);
    put(request: PutSessionCommandPayloadRequest): Promise<SessionCommandPayloadReference>;
    get(request: GetSessionCommandPayloadRequest): Promise<unknown>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(request: GetSessionCommandPayloadRequest): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(request: PutSessionCommandPayloadRequest): Promise&lt;SessionCommandPayloadReference&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactSessionCommandPayloadStoreOptions`

Artifact Session Command Payload Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactSessionCommandPayloadStoreOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### Declaration

```text
export interface ArtifactSessionCommandPayloadStoreOptions {
    artifacts: ArtifactStoreProvider;
    maxPayloadBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxPayloadBytes` | property | <code>maxPayloadBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PutSessionCommandPayloadRequest`

Put Session Command Payload Request interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { PutSessionCommandPayloadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### Declaration

```text
export interface PutSessionCommandPayloadRequest {
    commandId: string;
    payload: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionCommandPayloadReference`

Session Command Payload Reference interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SessionCommandPayloadReference } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### Declaration

```text
export interface SessionCommandPayloadReference {
    payloadRef: string;
    payloadHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadRef` | property | <code>payloadRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `GetSessionCommandPayloadRequest`

Public type alias for Get Session Command Payload Request; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { GetSessionCommandPayloadRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/session-command-payload-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)

### Declaration

```text
export type GetSessionCommandPayloadRequest = SessionCommandPayloadReference;
```
