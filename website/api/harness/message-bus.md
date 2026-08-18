# `@codesoul-co/hypha-harness` / `message-bus`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)
- Exports: **12**

## Using this module

Use the Message bus module for using the public contracts and operations for this capability boundary. It exports 1 class, 9 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  InMemoryMessageBus,
} from '@codesoul-co/hypha-harness';

import type {
  InMemoryMessageBusOptions,
  MessageAckInput,
  MessageAddress,
  MessageBus,
  MessageFailInput,
  MessageListFilter,
  PublishMessageInput,
  PullMessageFilter,
} from '@codesoul-co/hypha-harness';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | class | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | In Memory Message Bus class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryMessageBusOptions` | interface | <code>interface InMemoryMessageBusOptions</code> | In Memory Message Bus Options interface with 6 public fields or methods. |
| `MessageAckInput` | interface | <code>interface MessageAckInput</code> | Message Ack Input interface with 7 public fields or methods. |
| `MessageAddress` | interface | <code>interface MessageAddress</code> | Message Address interface with 2 public fields or methods. |
| `MessageBus` | interface | <code>interface MessageBus</code> | Message Bus interface with 5 public fields or methods. |
| `MessageFailInput` | interface | <code>interface MessageFailInput extends MessageAckInput</code> | Message Fail Input interface with 11 public fields or methods. |
| `MessageListFilter` | interface | <code>interface MessageListFilter</code> | Message List Filter interface with 5 public fields or methods. |
| `PublishMessageInput` | interface | <code>interface PublishMessageInput</code> | Publish Message Input interface with 16 public fields or methods. |
| `PullMessageFilter` | interface | <code>interface PullMessageFilter</code> | Pull Message Filter interface with 6 public fields or methods. |
| `RuntimeMessage` | interface | <code>interface RuntimeMessage</code> | Runtime Message interface with 20 public fields or methods. |
| `MessageAddressKind` | type | <code>type MessageAddressKind = 'runtime' &#124; 'session' &#124; 'workflow' &#124; 'agent' &#124; 'tool' &#124; 'human'</code> | Public type alias for Message Address Kind; the declaration contains its complete type expression. |
| `MessageStatus` | type | <code>type MessageStatus = 'queued' &#124; 'delivered' &#124; 'acknowledged' &#124; 'failed' &#124; 'dead_lettered'</code> | Public type alias for Message Status; the declaration contains its complete type expression. |

## `InMemoryMessageBus`

In Memory Message Bus class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMessageBus } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export declare class InMemoryMessageBus implements MessageBus {
    constructor(options?: InMemoryMessageBusOptions);
    publish<TPayload = unknown>(input: PublishMessageInput<TPayload>): Promise<RuntimeMessage<TPayload>>;
    pull<TPayload = unknown>(filter: PullMessageFilter): Promise<RuntimeMessage<TPayload> | null>;
    acknowledge(input: MessageAckInput): Promise<RuntimeMessage | null>;
    fail(input: MessageFailInput): Promise<RuntimeMessage | null>;
    list(filter?: MessageListFilter): Promise<RuntimeMessage[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acknowledge` | method | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | Creates an instance of this class. |
| `fail` | method | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `publish` | method | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `pull` | method | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryMessageBusOptions`

In Memory Message Bus Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryMessageBusOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface InMemoryMessageBusOptions {
    trace?: TraceRecorder;
    now?: () => string;
    maxDeliveryAttempts?: number;
    initialRetryDelayMs?: number;
    maxRetryDelayMs?: number;
    retryMultiplier?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `initialRetryDelayMs` | property | <code>initialRetryDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDeliveryAttempts` | property | <code>maxDeliveryAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxRetryDelayMs` | property | <code>maxRetryDelayMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `retryMultiplier` | property | <code>retryMultiplier?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageAckInput`

Message Ack Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MessageAckInput } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface MessageAckInput {
    id: string;
    userId: string;
    sessionId: string;
    runId?: string;
    handledBy?: MessageAddress;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `handledBy` | property | <code>handledBy?: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageAddress`

Message Address interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MessageAddress } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface MessageAddress {
    kind: MessageAddressKind;
    id: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: MessageAddressKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageBus`

Message Bus interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MessageBus } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface MessageBus {
    publish<TPayload = unknown>(input: PublishMessageInput<TPayload>): Promise<RuntimeMessage<TPayload>>;
    pull<TPayload = unknown>(filter: PullMessageFilter): Promise<RuntimeMessage<TPayload> | null>;
    acknowledge(input: MessageAckInput): Promise<RuntimeMessage | null>;
    fail(input: MessageFailInput): Promise<RuntimeMessage | null>;
    list(filter?: MessageListFilter): Promise<RuntimeMessage[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acknowledge` | method | <code>acknowledge(input: MessageAckInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(input: MessageFailInput): Promise&lt;RuntimeMessage &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(filter?: MessageListFilter): Promise&lt;RuntimeMessage[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `publish` | method | <code>publish&lt;TPayload = unknown&gt;(input: PublishMessageInput&lt;TPayload&gt;): Promise&lt;RuntimeMessage&lt;TPayload&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `pull` | method | <code>pull&lt;TPayload = unknown&gt;(filter: PullMessageFilter): Promise&lt;RuntimeMessage&lt;TPayload&gt; &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MessageFailInput`

Message Fail Input interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { MessageFailInput } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface MessageFailInput extends MessageAckInput {
    reason?: string;
    deadLetter?: boolean;
    retry?: boolean;
    retryAfterMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deadLetter` | property | <code>deadLetter?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `handledBy` | property | <code>handledBy?: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retry` | property | <code>retry?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryAfterMs` | property | <code>retryAfterMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageListFilter`

Message List Filter interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MessageListFilter } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface MessageListFilter {
    userId?: string;
    sessionId?: string;
    runId?: string;
    to?: MessageAddress;
    status?: MessageStatus;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status?: MessageStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to?: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PublishMessageInput`

Publish Message Input interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { PublishMessageInput } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface PublishMessageInput<TPayload = unknown> {
    id: string;
    type: string;
    userId: string;
    sessionId: string;
    runId: string;
    from: MessageAddress;
    to: MessageAddress;
    payload: TPayload;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    correlationId?: string;
    causationId?: string;
    availableAt?: string;
    expiresAt?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `from` | property | <code>from: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `PullMessageFilter`

Pull Message Filter interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { PullMessageFilter } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface PullMessageFilter {
    userId: string;
    sessionId: string;
    to: MessageAddress;
    runId?: string;
    fsmState?: string;
    now?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | property | <code>now?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeMessage`

Runtime Message interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessage } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export interface RuntimeMessage<TPayload = unknown> {
    id: string;
    type: string;
    userId: string;
    sessionId: string;
    runId: string;
    from: MessageAddress;
    to: MessageAddress;
    payload: TPayload;
    status: MessageStatus;
    createdAt: string;
    updatedAt: string;
    stepId?: string;
    agentId?: string;
    fsmState?: string;
    correlationId?: string;
    causationId?: string;
    availableAt?: string;
    expiresAt?: string;
    attemptCount: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attemptCount` | property | <code>attemptCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableAt` | property | <code>availableAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causationId` | property | <code>causationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `correlationId` | property | <code>correlationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `from` | property | <code>from: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: MessageStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: MessageAddress</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageAddressKind`

Public type alias for Message Address Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MessageAddressKind } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export type MessageAddressKind = 'runtime' | 'session' | 'workflow' | 'agent' | 'tool' | 'human';
```

## `MessageStatus`

Public type alias for Message Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MessageStatus } from '@codesoul-co/hypha-harness';`
- Source module: [`message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/message-bus.ts)

### Declaration

```text
export type MessageStatus = 'queued' | 'delivered' | 'acknowledged' | 'failed' | 'dead_lettered';
```
