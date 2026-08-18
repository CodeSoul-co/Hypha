# `@codesoul-co/hypha-memory` / `memory-events`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-events.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)
- Exports: **6**

## Using this module

Use the Memory events module for creating, recording, or reading Event contracts. It exports 2 functions, 3 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  memoryEventIdempotencyKey,
  sanitizeMemoryEventPayload,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryEventContext,
  MemoryEventPayloadBase,
  MemoryEventPublisher,
  MemoryEventType,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 4 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryEventIdempotencyKey` | function | <code>memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string</code> | Memory Event Idempotency Key function with 1 public call signature; parameters and return types are listed below. |
| `sanitizeMemoryEventPayload` | function | <code>sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase</code> | Sanitize Memory Event Payload function with 1 public call signature; parameters and return types are listed below. |
| `MemoryEventContext` | interface | <code>interface MemoryEventContext</code> | Memory Event Context interface with 7 public fields or methods. |
| `MemoryEventPayloadBase` | interface | <code>interface MemoryEventPayloadBase</code> | Memory Event Payload Base interface with 12 public fields or methods. |
| `MemoryEventPublisher` | interface | <code>interface MemoryEventPublisher</code> | Memory Event Publisher interface with 1 public fields or methods. |
| `MemoryEventType` | type | <code>type MemoryEventType = Extract&lt;FrameworkEventType, `memory.${string}` &#124; `context.${string}`&gt;</code> | Public type alias for Memory Event Type; the declaration contains its complete type expression. |

## `memoryEventIdempotencyKey`

Memory Event Idempotency Key function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { memoryEventIdempotencyKey } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### Declaration

```text
export declare function memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string;
```

### Call signature

```text
memoryEventIdempotencyKey(type: MemoryEventType, payload: MemoryEventPayloadBase): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | <code>MemoryEventType</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `payload` | <code>MemoryEventPayloadBase</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `sanitizeMemoryEventPayload`

Sanitize Memory Event Payload function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { sanitizeMemoryEventPayload } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### Declaration

```text
export declare function sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase;
```

### Call signature

```text
sanitizeMemoryEventPayload(payload: MemoryEventPayloadBase): MemoryEventPayloadBase
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `payload` | <code>MemoryEventPayloadBase</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryEventPayloadBase`
- Description: The return contract is defined by the type shown above.

## `MemoryEventContext`

Memory Event Context interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEventContext } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### Declaration

```text
export interface MemoryEventContext {
    userId: string;
    tenantId?: string;
    runId: string;
    sessionId?: string;
    workspaceId?: string;
    stepId?: string;
    agentId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryEventPayloadBase`

Memory Event Payload Base interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEventPayloadBase } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### Declaration

```text
export interface MemoryEventPayloadBase {
    operationId: string;
    profileId?: string;
    profileRevision?: string;
    providerId?: string;
    scopeHash: string;
    memoryId?: string;
    memoryVersionId?: string;
    itemCount?: number;
    latencyMs?: number;
    status?: string;
    error?: NormalizedMemoryError;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `itemCount` | property | <code>itemCount?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `latencyMs` | property | <code>latencyMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionId` | property | <code>memoryVersionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryEventPublisher`

Memory Event Publisher interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEventPublisher } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### Declaration

```text
export interface MemoryEventPublisher {
    publish(type: MemoryEventType, payload: MemoryEventPayloadBase, context: MemoryEventContext): Promise<string>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `publish` | method | <code>publish(type: MemoryEventType, payload: MemoryEventPayloadBase, context: MemoryEventContext): Promise&lt;string&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryEventType`

Public type alias for Memory Event Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryEventType } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-events`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-events.ts)

### Declaration

```text
export type MemoryEventType = Extract<FrameworkEventType, `memory.${string}` | `context.${string}`>;
```
