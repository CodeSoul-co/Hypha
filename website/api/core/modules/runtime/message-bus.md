# `@codesoul-co/hypha-core` / `modules/runtime/message-bus`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/message-bus.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)
- Exports: **14**

## Using this module

Use the Message bus module for executing runtime behavior at this boundary. It exports 1 class, 7 functions, 6 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryMessageBus,
  addMilliseconds,
  busError,
  createRuntimeMessageEnvelope,
  isAtOrBefore,
  nonEmpty,
  nonNegative,
  positive,
} from '@codesoul-co/hypha-core';

import type {
  InMemoryMessageBusOptions,
  MessageBus,
  MessageDelivery,
  MessagePublishRequest,
  MessagePublishResult,
  MessageSubscriptionRequest,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 7 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMessageBus` | class | <code>new InMemoryMessageBus(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | In Memory Message Bus class with 7 public constructor or member entries; its exact declarations are listed below. |
| `addMilliseconds` | function | <code>addMilliseconds(timestamp: string, milliseconds: number): string</code> | Add Milliseconds function with 1 public call signature; parameters and return types are listed below. |
| `busError` | function | <code>busError(code: string, message: string, context?: Record&lt;string, unknown&gt;): FrameworkError</code> | Bus Error function with 1 public call signature; parameters and return types are listed below. |
| `createRuntimeMessageEnvelope` | function | <code>createRuntimeMessageEnvelope&lt;TPayload&gt;(input: RuntimeMessageEnvelopeInput&lt;TPayload&gt;): RuntimeMessageEnvelope&lt;TPayload&gt;</code> | Create Runtime Message Envelope function with 1 public call signature; parameters and return types are listed below. |
| `isAtOrBefore` | function | <code>isAtOrBefore(left: string, right: string): boolean</code> | Is At Or Before function with 1 public call signature; parameters and return types are listed below. |
| `nonEmpty` | function | <code>nonEmpty(value: unknown, label: string): asserts value is string</code> | Non Empty function with 1 public call signature; parameters and return types are listed below. |
| `nonNegative` | function | <code>nonNegative(value: number, label?: string): number</code> | Non Negative function with 1 public call signature; parameters and return types are listed below. |
| `positive` | function | <code>positive(value: number, label: string): number</code> | Positive function with 1 public call signature; parameters and return types are listed below. |
| `InMemoryMessageBusOptions` | interface | <code>interface InMemoryMessageBusOptions</code> | In Memory Message Bus Options interface with 6 public fields or methods. |
| `MessageBus` | interface | <code>interface MessageBus</code> | Message Bus interface with 5 public fields or methods. |
| `MessageDelivery` | interface | <code>interface MessageDelivery</code> | Message Delivery interface with 9 public fields or methods. |
| `MessagePublishRequest` | interface | <code>interface MessagePublishRequest</code> | Message Publish Request interface with 1 public fields or methods. |
| `MessagePublishResult` | interface | <code>interface MessagePublishResult</code> | Message Publish Result interface with 6 public fields or methods. |
| `MessageSubscriptionRequest` | interface | <code>interface MessageSubscriptionRequest</code> | Message Subscription Request interface with 8 public fields or methods. |

## `InMemoryMessageBus`

In Memory Message Bus class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryMessageBus } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare class InMemoryMessageBus implements MessageBus {
    constructor(options?: InMemoryMessageBusOptions);
    publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult>;
    publishBatch<TPayload>(requests: MessagePublishRequest<TPayload>[]): Promise<MessagePublishResult[]>;
    subscribe<TPayload>(request: MessageSubscriptionRequest): AsyncIterable<MessageDelivery<TPayload>>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
    listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: InMemoryMessageBusOptions): InMemoryMessageBus</code> | Creates an instance of this class. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listDeadLetters` | method | <code>listDeadLetters(consumerGroup: string): RuntimeMessageEnvelope[]</code> | Public method; parameters and return type are shown in the signature. |
| `publish` | method | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `publishBatch` | method | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `subscribe` | method | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `addMilliseconds`

Add Milliseconds function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { addMilliseconds } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function addMilliseconds(timestamp: string, milliseconds: number): string;
```

### Call signature

```text
addMilliseconds(timestamp: string, milliseconds: number): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `timestamp` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `milliseconds` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `busError`

Bus Error function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { busError } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function busError(code: string, message: string, context?: Record<string, unknown>): FrameworkError;
```

### Call signature

```text
busError(code: string, message: string, context?: Record<string, unknown>): FrameworkError
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `message` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>Record&lt;string, unknown&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FrameworkError`
- Description: The return contract is defined by the type shown above.

## `createRuntimeMessageEnvelope`

Create Runtime Message Envelope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createRuntimeMessageEnvelope } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function createRuntimeMessageEnvelope<TPayload>(input: RuntimeMessageEnvelopeInput<TPayload>): RuntimeMessageEnvelope<TPayload>;
```

### Call signature

```text
createRuntimeMessageEnvelope<TPayload>(input: RuntimeMessageEnvelopeInput<TPayload>): RuntimeMessageEnvelope<TPayload>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>RuntimeMessageEnvelopeInput&lt;TPayload&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeMessageEnvelope<TPayload>`
- Description: The return contract is defined by the type shown above.

## `isAtOrBefore`

Is At Or Before function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isAtOrBefore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function isAtOrBefore(left: string, right: string): boolean;
```

### Call signature

```text
isAtOrBefore(left: string, right: string): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `left` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `right` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `nonEmpty`

Non Empty function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { nonEmpty } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function nonEmpty(value: unknown, label: string): asserts value is string;
```

### Call signature

```text
nonEmpty(value: unknown, label: string): asserts value is string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `label` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `asserts value is string`
- Description: The return contract is defined by the type shown above.

## `nonNegative`

Non Negative function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { nonNegative } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function nonNegative(value: number, label?: string): number;
```

### Call signature

```text
nonNegative(value: number, label?: string): number
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `label` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `number`
- Description: The return contract is defined by the type shown above.

## `positive`

Positive function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { positive } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export declare function positive(value: number, label: string): number;
```

### Call signature

```text
positive(value: number, label: string): number
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `label` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `number`
- Description: The return contract is defined by the type shown above.

## `InMemoryMessageBusOptions`

In Memory Message Bus Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryMessageBusOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export interface InMemoryMessageBusOptions {
    now?: () => string;
    maxDeliveryAttempts?: number;
    defaultAckDeadlineMs?: number;
    maxMessageBytes?: number;
    maxQueueDepth?: number;
    pollIntervalMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultAckDeadlineMs` | property | <code>defaultAckDeadlineMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDeliveryAttempts` | property | <code>maxDeliveryAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMessageBytes` | property | <code>maxMessageBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxQueueDepth` | property | <code>maxQueueDepth?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `pollIntervalMs` | property | <code>pollIntervalMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageBus`

Message Bus interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MessageBus } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export interface MessageBus {
    publish<TPayload>(request: MessagePublishRequest<TPayload>): Promise<MessagePublishResult>;
    publishBatch<TPayload>(requests: MessagePublishRequest<TPayload>[]): Promise<MessagePublishResult[]>;
    subscribe<TPayload>(request: MessageSubscriptionRequest): AsyncIterable<MessageDelivery<TPayload>>;
    health(): Promise<ProviderHealth>;
    close(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `publish` | method | <code>publish&lt;TPayload&gt;(request: MessagePublishRequest&lt;TPayload&gt;): Promise&lt;MessagePublishResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `publishBatch` | method | <code>publishBatch&lt;TPayload&gt;(requests: MessagePublishRequest&lt;TPayload&gt;[]): Promise&lt;MessagePublishResult[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `subscribe` | method | <code>subscribe&lt;TPayload&gt;(request: MessageSubscriptionRequest): AsyncIterable&lt;MessageDelivery&lt;TPayload&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MessageDelivery`

Message Delivery interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MessageDelivery } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export interface MessageDelivery<TPayload = unknown> {
    envelope: RuntimeMessageEnvelope<TPayload>;
    deliveryId: string;
    attempt: number;
    receivedAt: string;
    ackDeadlineAt: string;
    ack(): Promise<void>;
    nack(options?: {
        delayMs?: number;
        reason?: string;
    }): Promise<void>;
    deadLetter(reason: string): Promise<void>;
    extendAckDeadline(extensionMs: number): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ack` | method | <code>ack(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `ackDeadlineAt` | property | <code>ackDeadlineAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `attempt` | property | <code>attempt: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLetter` | method | <code>deadLetter(reason: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `deliveryId` | property | <code>deliveryId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelope` | property | <code>envelope: RuntimeMessageEnvelope&lt;TPayload&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extendAckDeadline` | method | <code>extendAckDeadline(extensionMs: number): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `nack` | method | <code>nack(options?: { delayMs?: number; reason?: string; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `receivedAt` | property | <code>receivedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessagePublishRequest`

Message Publish Request interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MessagePublishRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export interface MessagePublishRequest<TPayload = unknown> {
    envelope: RuntimeMessageEnvelopeInput<TPayload>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `envelope` | property | <code>envelope: RuntimeMessageEnvelopeInput&lt;TPayload&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessagePublishResult`

Message Publish Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MessagePublishResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export interface MessagePublishResult {
    messageId: string;
    topic: string;
    partitionKey: string;
    sequence: number;
    publishedAt: string;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `messageId` | property | <code>messageId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topic` | property | <code>topic: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MessageSubscriptionRequest`

Message Subscription Request interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MessageSubscriptionRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-bus`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-bus.ts)

### Declaration

```text
export interface MessageSubscriptionRequest {
    consumerId: string;
    consumerGroup?: string;
    topic: string;
    partitionKey?: string;
    maxMessages?: number;
    idleTimeoutMs?: number;
    ackDeadlineMs?: number;
    signal?: AbortSignal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ackDeadlineMs` | property | <code>ackDeadlineMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consumerGroup` | property | <code>consumerGroup?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consumerId` | property | <code>consumerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idleTimeoutMs` | property | <code>idleTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMessages` | property | <code>maxMessages?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `partitionKey` | property | <code>partitionKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `signal` | property | <code>signal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `topic` | property | <code>topic: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
