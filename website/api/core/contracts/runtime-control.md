# `@codesoul-co/hypha-core` / `contracts/runtime-control`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-control.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)
- Exports: **9**

## Using this module

Use the Runtime control module for declaring and runtime-validating contracts. It exports 2 constants, 4 interfaces, 3 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_CONTROL_DISPOSITIONS,
  RUNTIME_CONTROL_KINDS,
} from '@codesoul-co/hypha-core';

import type {
  RuntimePauseCommand,
  RuntimeResumeCommand,
  RuntimeRunControlResult,
  RuntimeSignalCommand,
  RuntimeControlDisposition,
  RuntimeControlKind,
  RuntimeRunControlCommand,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_CONTROL_DISPOSITIONS` | constant | <code>const RUNTIME_CONTROL_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"]</code> | RUNTIME CONTROL DISPOSITIONS constant exported by the `contracts/runtime-control` module. |
| `RUNTIME_CONTROL_KINDS` | constant | <code>const RUNTIME_CONTROL_KINDS: readonly ["pause", "resume", "signal"]</code> | RUNTIME CONTROL KINDS constant exported by the `contracts/runtime-control` module. |
| `RuntimePauseCommand` | interface | <code>interface RuntimePauseCommand extends RuntimeRunControlCommandBase</code> | Runtime Pause Command interface with 10 public fields or methods. |
| `RuntimeResumeCommand` | interface | <code>interface RuntimeResumeCommand extends RuntimeRunControlCommandBase</code> | Runtime Resume Command interface with 10 public fields or methods. |
| `RuntimeRunControlResult` | interface | <code>interface RuntimeRunControlResult</code> | Runtime Run Control Result interface with 6 public fields or methods. |
| `RuntimeSignalCommand` | interface | <code>interface RuntimeSignalCommand extends RuntimeRunControlCommandBase</code> | Runtime Signal Command interface with 10 public fields or methods. |
| `RuntimeControlDisposition` | type | <code>type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number]</code> | Public type alias for Runtime Control Disposition; the declaration contains its complete type expression. |
| `RuntimeControlKind` | type | <code>type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number]</code> | Public type alias for Runtime Control Kind; the declaration contains its complete type expression. |
| `RuntimeRunControlCommand` | type | <code>type RuntimeRunControlCommand = RuntimePauseCommand &#124; RuntimeResumeCommand &#124; RuntimeSignalCommand</code> | Public type alias for Runtime Run Control Command; the declaration contains its complete type expression. |

## `RUNTIME_CONTROL_DISPOSITIONS`

RUNTIME CONTROL DISPOSITIONS constant exported by the `contracts/runtime-control` module.

- Kind: constant
- Import: `import { RUNTIME_CONTROL_DISPOSITIONS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export declare const RUNTIME_CONTROL_DISPOSITIONS: readonly ["applied", "reused", "lease_unavailable"];
```

## `RUNTIME_CONTROL_KINDS`

RUNTIME CONTROL KINDS constant exported by the `contracts/runtime-control` module.

- Kind: constant
- Import: `import { RUNTIME_CONTROL_KINDS } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export declare const RUNTIME_CONTROL_KINDS: readonly ["pause", "resume", "signal"];
```

## `RuntimePauseCommand`

Runtime Pause Command interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimePauseCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export interface RuntimePauseCommand extends RuntimeRunControlCommandBase {
    kind: 'pause';
    reason: string;
    resumeKey?: string;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "pause"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resumeKey` | property | <code>resumeKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeResumeCommand`

Runtime Resume Command interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeResumeCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export interface RuntimeResumeCommand extends RuntimeRunControlCommandBase {
    kind: 'resume';
    key?: string;
    payload?: RuntimeJsonValue;
    requestedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "resume"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload?: RuntimeJsonValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestedAt` | property | <code>requestedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRunControlResult`

Runtime Run Control Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRunControlResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export interface RuntimeRunControlResult {
    commandId: string;
    kind: RuntimeControlKind;
    disposition: RuntimeControlDisposition;
    eventIds: string[];
    runRevision: number;
    projection: RuntimeOrchestrationProjection;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "applied" &#124; "reused" &#124; "lease_unavailable"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "signal" &#124; "resume" &#124; "pause"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projection` | property | <code>projection: RuntimeOrchestrationProjection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runRevision` | property | <code>runRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeSignalCommand`

Runtime Signal Command interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeSignalCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export interface RuntimeSignalCommand extends RuntimeRunControlCommandBase {
    kind: 'signal';
    key: string;
    payload: RuntimeJsonValue;
    sentAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `key` | property | <code>key: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "signal"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: RuntimeJsonValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sentAt` | property | <code>sentAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeControlDisposition`

Public type alias for Runtime Control Disposition; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeControlDisposition } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export type RuntimeControlDisposition = (typeof RUNTIME_CONTROL_DISPOSITIONS)[number];
```

## `RuntimeControlKind`

Public type alias for Runtime Control Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeControlKind } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export type RuntimeControlKind = (typeof RUNTIME_CONTROL_KINDS)[number];
```

## `RuntimeRunControlCommand`

Public type alias for Runtime Run Control Command; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeRunControlCommand } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-control`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-control.ts)

### Declaration

```text
export type RuntimeRunControlCommand = RuntimePauseCommand | RuntimeResumeCommand | RuntimeSignalCommand;
```
