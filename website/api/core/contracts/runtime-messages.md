# `@codesoul-co/hypha-core` / `contracts/runtime-messages`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/runtime-messages.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)
- Exports: **10**

## Using this module

Use the Runtime messages module for declaring and runtime-validating contracts. It exports 3 constants, 4 interfaces, 3 types.

### Import from the package entrypoint

```ts
import {
  RUNTIME_INBOX_STATUSES,
  RUNTIME_MESSAGE_TYPES,
  RUNTIME_OUTBOX_STATES,
} from '@codesoul-co/hypha-core';

import type {
  RuntimeMessageEnvelope,
  RuntimeMessageEnvelopeInput,
  RuntimeMessageInboxRecord,
  RuntimeMessageOutboxRecord,
  RuntimeMessageInboxStatus,
  RuntimeMessageOutboxState,
  RuntimeMessageType,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 7 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RUNTIME_INBOX_STATUSES` | constant | <code>const RUNTIME_INBOX_STATUSES: readonly ["processing", "applied", "ignored", "failed"]</code> | RUNTIME INBOX STATUSES constant exported by the `contracts/runtime-messages` module. |
| `RUNTIME_MESSAGE_TYPES` | constant | <code>const RUNTIME_MESSAGE_TYPES: readonly ["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"]</code> | RUNTIME MESSAGE TYPES constant exported by the `contracts/runtime-messages` module. |
| `RUNTIME_OUTBOX_STATES` | constant | <code>const RUNTIME_OUTBOX_STATES: readonly ["pending", "publishing", "published", "failed", "dead_letter"]</code> | RUNTIME OUTBOX STATES constant exported by the `contracts/runtime-messages` module. |
| `RuntimeMessageEnvelope` | interface | <code>interface RuntimeMessageEnvelope</code> | Runtime Message Envelope interface with 28 public fields or methods. |
| `RuntimeMessageEnvelopeInput` | interface | <code>interface RuntimeMessageEnvelopeInput extends Omit&lt;RuntimeMessageEnvelope&lt;TPayload&gt;, 'payloadHash' &#124; 'sequence'&gt;</code> | Runtime Message Envelope Input interface with 28 public fields or methods. |
| `RuntimeMessageInboxRecord` | interface | <code>interface RuntimeMessageInboxRecord</code> | Runtime Message Inbox Record interface with 12 public fields or methods. |
| `RuntimeMessageOutboxRecord` | interface | <code>interface RuntimeMessageOutboxRecord</code> | Runtime Message Outbox Record interface with 14 public fields or methods. |
| `RuntimeMessageInboxStatus` | type | <code>type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number]</code> | Public type alias for Runtime Message Inbox Status; the declaration contains its complete type expression. |
| `RuntimeMessageOutboxState` | type | <code>type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number]</code> | Public type alias for Runtime Message Outbox State; the declaration contains its complete type expression. |
| `RuntimeMessageType` | type | <code>type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number]</code> | Public type alias for Runtime Message Type; the declaration contains its complete type expression. |

## `RUNTIME_INBOX_STATUSES`

RUNTIME INBOX STATUSES constant exported by the `contracts/runtime-messages` module.

- Kind: constant
- Import: `import { RUNTIME_INBOX_STATUSES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export declare const RUNTIME_INBOX_STATUSES: readonly ["processing", "applied", "ignored", "failed"];
```

## `RUNTIME_MESSAGE_TYPES`

RUNTIME MESSAGE TYPES constant exported by the `contracts/runtime-messages` module.

- Kind: constant
- Import: `import { RUNTIME_MESSAGE_TYPES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export declare const RUNTIME_MESSAGE_TYPES: readonly ["runtime.command.start", "runtime.command.resume", "runtime.command.cancel", "runtime.signal", "runtime.timer.fire", "runtime.activity.requested", "runtime.activity.completed", "runtime.activity.failed", "runtime.agent.message", "runtime.child.completed", "runtime.projection.rebuild", "runtime.recovery.requested", "runtime.custom"];
```

## `RUNTIME_OUTBOX_STATES`

RUNTIME OUTBOX STATES constant exported by the `contracts/runtime-messages` module.

- Kind: constant
- Import: `import { RUNTIME_OUTBOX_STATES } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export declare const RUNTIME_OUTBOX_STATES: readonly ["pending", "publishing", "published", "failed", "dead_letter"];
```

## `RuntimeMessageEnvelope`

Runtime Message Envelope interface with 28 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessageEnvelope } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export interface RuntimeMessageEnvelope<TPayload = unknown> {
    messageId: string;
    messageType: RuntimeMessageType;
    schemaVersion: string;
    topic: string;
    partitionKey: string;
    orderingKey?: string;
    sequence?: number;
    tenantId?: string;
    workspaceId?: string;
    userId?: string;
    sessionId?: string;
    runId?: string;
    stepId?: string;
    activityId?: string;
    agentId?: string;
    correlationId?: string;
    causationId?: string;
    traceId?: string;
    principal?: RuntimePrincipal;
    payload: TPayload;
    payloadHash: string;
    priority?: number;
    availableAt?: string;
    expiresAt?: string;
    publishedAt: string;
    producerId: string;
    producerRevision?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageId` | property | <code>messageId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageType` | property | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `orderingKey` | property | <code>orderingKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal?: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `producerId` | property | <code>producerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `producerRevision` | property | <code>producerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topic` | property | <code>topic: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceId` | property | <code>traceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeMessageEnvelopeInput`

Runtime Message Envelope Input interface with 28 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessageEnvelopeInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export interface RuntimeMessageEnvelopeInput<TPayload = unknown> extends Omit<RuntimeMessageEnvelope<TPayload>, 'payloadHash' | 'sequence'> {
    payloadHash?: string;
    sequence?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityId` | property | <code>activityId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageId` | property | <code>messageId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageType` | property | <code>messageType: "runtime.activity.requested" &#124; "runtime.activity.completed" &#124; "runtime.activity.failed" &#124; "runtime.command.start" &#124; "runtime.command.resume" &#124; "runtime.command.cancel" &#124; "runtime.signal" &#124; "runtime.timer.fire" &#124; "runtime.agent.message" &#124; "runtime.child.completed" &#124; "runtime.projection.rebuild" &#124; "runtime.recovery.requested" &#124; "runtime.custom"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `orderingKey` | property | <code>orderingKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal?: RuntimePrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `producerId` | property | <code>producerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `producerRevision` | property | <code>producerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topic` | property | <code>topic: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceId` | property | <code>traceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeMessageInboxRecord`

Runtime Message Inbox Record interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessageInboxRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export interface RuntimeMessageInboxRecord {
    consumerId: string;
    messageId: string;
    payloadHash: string;
    status: RuntimeMessageInboxStatus;
    appliedEventIds?: string[];
    firstReceivedAt: string;
    lastReceivedAt: string;
    attempts: number;
    expiresAt?: string;
    processingOwner?: string;
    processingExpiresAt?: string;
    lastError?: NormalizedRuntimeError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appliedEventIds` | property | <code>appliedEventIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consumerId` | property | <code>consumerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `firstReceivedAt` | property | <code>firstReceivedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: NormalizedRuntimeError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastReceivedAt` | property | <code>lastReceivedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageId` | property | <code>messageId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processingExpiresAt` | property | <code>processingExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processingOwner` | property | <code>processingOwner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "failed" &#124; "processing" &#124; "applied" &#124; "ignored"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeMessageOutboxRecord`

Runtime Message Outbox Record interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessageOutboxRecord } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export interface RuntimeMessageOutboxRecord {
    id: string;
    eventId?: string;
    messageId: string;
    topic: string;
    partitionKey: string;
    envelope: RuntimeMessageEnvelope;
    state: RuntimeMessageOutboxState;
    attempts: number;
    availableAt: string;
    leaseOwner?: string;
    leaseExpiresAt?: string;
    lastError?: NormalizedRuntimeError;
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelope` | property | <code>envelope: RuntimeMessageEnvelope&lt;unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventId` | property | <code>eventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: NormalizedRuntimeError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseOwner` | property | <code>leaseOwner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageId` | property | <code>messageId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `state` | property | <code>state: "failed" &#124; "pending" &#124; "publishing" &#124; "published" &#124; "dead_letter"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topic` | property | <code>topic: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeMessageInboxStatus`

Public type alias for Runtime Message Inbox Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeMessageInboxStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export type RuntimeMessageInboxStatus = (typeof RUNTIME_INBOX_STATUSES)[number];
```

## `RuntimeMessageOutboxState`

Public type alias for Runtime Message Outbox State; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeMessageOutboxState } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export type RuntimeMessageOutboxState = (typeof RUNTIME_OUTBOX_STATES)[number];
```

## `RuntimeMessageType`

Public type alias for Runtime Message Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RuntimeMessageType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/runtime-messages`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/runtime-messages.ts)

### Declaration

```text
export type RuntimeMessageType = (typeof RUNTIME_MESSAGE_TYPES)[number];
```
