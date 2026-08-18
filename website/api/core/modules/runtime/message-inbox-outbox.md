# `@codesoul-co/hypha-core` / `modules/runtime/message-inbox-outbox`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/message-inbox-outbox.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)
- Exports: **12**

## Using this module

Use the Message inbox outbox module for executing runtime behavior at this boundary. It exports 4 classes, 8 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryRuntimeMessageInboxStore,
  InMemoryRuntimeMessageOutboxStore,
  RuntimeInboxProcessor,
  RuntimeOutboxDispatcher,
} from '@codesoul-co/hypha-core';

import type {
  InboxClaimRequest,
  InboxClaimResult,
  RuntimeInboxHandleResult,
  RuntimeInboxProcessorOptions,
  RuntimeMessageInboxStore,
  RuntimeMessageOutboxStore,
  RuntimeOutboxDispatcherOptions,
  RuntimeOutboxDispatchResult,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 8 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryRuntimeMessageInboxStore` | class | <code>new InMemoryRuntimeMessageInboxStore(): InMemoryRuntimeMessageInboxStore</code> | In Memory Runtime Message Inbox Store class with 6 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryRuntimeMessageOutboxStore` | class | <code>new InMemoryRuntimeMessageOutboxStore(): InMemoryRuntimeMessageOutboxStore</code> | In Memory Runtime Message Outbox Store class with 7 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeInboxProcessor` | class | <code>new RuntimeInboxProcessor(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | Runtime Inbox Processor class with 2 public constructor or member entries; its exact declarations are listed below. |
| `RuntimeOutboxDispatcher` | class | <code>new RuntimeOutboxDispatcher(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | Runtime Outbox Dispatcher class with 2 public constructor or member entries; its exact declarations are listed below. |
| `InboxClaimRequest` | interface | <code>interface InboxClaimRequest</code> | Inbox Claim Request interface with 7 public fields or methods. |
| `InboxClaimResult` | interface | <code>interface InboxClaimResult</code> | Inbox Claim Result interface with 2 public fields or methods. |
| `RuntimeInboxHandleResult` | interface | <code>interface RuntimeInboxHandleResult</code> | Runtime Inbox Handle Result interface with 3 public fields or methods. |
| `RuntimeInboxProcessorOptions` | interface | <code>interface RuntimeInboxProcessorOptions</code> | Runtime Inbox Processor Options interface with 5 public fields or methods. |
| `RuntimeMessageInboxStore` | interface | <code>interface RuntimeMessageInboxStore</code> | Runtime Message Inbox Store interface with 5 public fields or methods. |
| `RuntimeMessageOutboxStore` | interface | <code>interface RuntimeMessageOutboxStore</code> | Runtime Message Outbox Store interface with 6 public fields or methods. |
| `RuntimeOutboxDispatcherOptions` | interface | <code>interface RuntimeOutboxDispatcherOptions</code> | Runtime Outbox Dispatcher Options interface with 7 public fields or methods. |
| `RuntimeOutboxDispatchResult` | interface | <code>interface RuntimeOutboxDispatchResult</code> | Runtime Outbox Dispatch Result interface with 4 public fields or methods. |

## `InMemoryRuntimeMessageInboxStore`

In Memory Runtime Message Inbox Store class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRuntimeMessageInboxStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export declare class InMemoryRuntimeMessageInboxStore implements RuntimeMessageInboxStore {
    claim(request: InboxClaimRequest): Promise<InboxClaimResult>;
    complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise<void>;
    fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise<void>;
    get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryRuntimeMessageInboxStore</code> | Creates an instance of this class. |
| `fail` | method | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryRuntimeMessageOutboxStore`

In Memory Runtime Message Outbox Store class with 7 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryRuntimeMessageOutboxStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export declare class InMemoryRuntimeMessageOutboxStore implements RuntimeMessageOutboxStore {
    enqueue(input: {
            id: string;
            eventId?: string;
            envelope: RuntimeMessageEnvelope;
            availableAt?: string;
            createdAt: string;
        }): Promise<RuntimeMessageOutboxRecord>;
    claim(input: {
            ownerId: string;
            now: string;
            leaseMs: number;
            limit: number;
        }): Promise<RuntimeMessageOutboxRecord[]>;
    markPublished(id: string, ownerId: string, publishedAt: string): Promise<void>;
    markFailed(input: {
            id: string;
            ownerId: string;
            failedAt: string;
            error: NormalizedRuntimeError;
            retryAt?: string;
            deadLetter?: boolean;
        }): Promise<void>;
    get(id: string): Promise<RuntimeMessageOutboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): InMemoryRuntimeMessageOutboxStore</code> | Creates an instance of this class. |
| `enqueue` | method | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `markFailed` | method | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `markPublished` | method | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeInboxProcessor`

Runtime Inbox Processor class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeInboxProcessor } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export declare class RuntimeInboxProcessor {
    constructor(options: RuntimeInboxProcessorOptions);
    handle(delivery: MessageDelivery, apply: (envelope: RuntimeMessageEnvelope) => Promise<string[]>): Promise<RuntimeInboxHandleResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeInboxProcessorOptions): RuntimeInboxProcessor</code> | Creates an instance of this class. |
| `handle` | method | <code>handle(delivery: MessageDelivery, apply: (envelope: RuntimeMessageEnvelope) =&gt; Promise&lt;string[]&gt;): Promise&lt;RuntimeInboxHandleResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeOutboxDispatcher`

Runtime Outbox Dispatcher class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RuntimeOutboxDispatcher } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export declare class RuntimeOutboxDispatcher {
    constructor(options: RuntimeOutboxDispatcherOptions);
    dispatch(limit?: number): Promise<RuntimeOutboxDispatchResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RuntimeOutboxDispatcherOptions): RuntimeOutboxDispatcher</code> | Creates an instance of this class. |
| `dispatch` | method | <code>dispatch(limit?: number): Promise&lt;RuntimeOutboxDispatchResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InboxClaimRequest`

Inbox Claim Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { InboxClaimRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface InboxClaimRequest {
    consumerId: string;
    ownerId: string;
    messageId: string;
    payloadHash: string;
    receivedAt: string;
    processingLeaseMs: number;
    expiresAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumerId` | property | <code>consumerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageId` | property | <code>messageId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payloadHash` | property | <code>payloadHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processingLeaseMs` | property | <code>processingLeaseMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `receivedAt` | property | <code>receivedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InboxClaimResult`

Inbox Claim Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { InboxClaimResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface InboxClaimResult {
    disposition: 'claimed' | 'duplicate' | 'busy' | 'conflict' | 'expired';
    record: RuntimeMessageInboxRecord;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "busy" &#124; "expired" &#124; "claimed" &#124; "conflict" &#124; "duplicate"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: RuntimeMessageInboxRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeInboxHandleResult`

Runtime Inbox Handle Result interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeInboxHandleResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface RuntimeInboxHandleResult {
    disposition: 'applied' | 'duplicate' | 'busy' | 'failed' | 'dead_lettered' | 'expired';
    appliedEventIds: string[];
    ackPending?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ackPending` | property | <code>ackPending?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `appliedEventIds` | property | <code>appliedEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `disposition` | property | <code>disposition: "failed" &#124; "busy" &#124; "expired" &#124; "applied" &#124; "dead_lettered" &#124; "duplicate"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeInboxProcessorOptions`

Runtime Inbox Processor Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeInboxProcessorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface RuntimeInboxProcessorOptions {
    consumerId: string;
    ownerId: string;
    inbox: RuntimeMessageInboxStore;
    now?: () => string;
    processingLeaseMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumerId` | property | <code>consumerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inbox` | property | <code>inbox: RuntimeMessageInboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processingLeaseMs` | property | <code>processingLeaseMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeMessageInboxStore`

Runtime Message Inbox Store interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessageInboxStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface RuntimeMessageInboxStore {
    claim(request: InboxClaimRequest): Promise<InboxClaimResult>;
    complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise<void>;
    fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise<void>;
    get(consumerId: string, messageId: string): Promise<RuntimeMessageInboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(request: InboxClaimRequest): Promise&lt;InboxClaimResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `complete` | method | <code>complete(consumerId: string, messageId: string, ownerId: string, appliedEventIds: string[], completedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fail` | method | <code>fail(consumerId: string, messageId: string, ownerId: string, error: NormalizedRuntimeError, failedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(consumerId: string, messageId: string): Promise&lt;RuntimeMessageInboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeMessageOutboxStore`

Runtime Message Outbox Store interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeMessageOutboxStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface RuntimeMessageOutboxStore {
    enqueue(input: {
        id: string;
        eventId?: string;
        envelope: RuntimeMessageEnvelope;
        availableAt?: string;
        createdAt: string;
    }): Promise<RuntimeMessageOutboxRecord>;
    claim(input: {
        ownerId: string;
        now: string;
        leaseMs: number;
        limit: number;
    }): Promise<RuntimeMessageOutboxRecord[]>;
    markPublished(id: string, ownerId: string, publishedAt: string): Promise<void>;
    markFailed(input: {
        id: string;
        ownerId: string;
        failedAt: string;
        error: NormalizedRuntimeError;
        retryAt?: string;
        deadLetter?: boolean;
    }): Promise<void>;
    get(id: string): Promise<RuntimeMessageOutboxRecord | null>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claim` | method | <code>claim(input: { ownerId: string; now: string; leaseMs: number; limit: number; }): Promise&lt;RuntimeMessageOutboxRecord[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `enqueue` | method | <code>enqueue(input: { id: string; eventId?: string; envelope: RuntimeMessageEnvelope; availableAt?: string; createdAt: string; }): Promise&lt;RuntimeMessageOutboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(id: string): Promise&lt;RuntimeMessageOutboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `markFailed` | method | <code>markFailed(input: { id: string; ownerId: string; failedAt: string; error: NormalizedRuntimeError; retryAt?: string; deadLetter?: boolean; }): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `markPublished` | method | <code>markPublished(id: string, ownerId: string, publishedAt: string): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeOutboxDispatcherOptions`

Runtime Outbox Dispatcher Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeOutboxDispatcherOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface RuntimeOutboxDispatcherOptions {
    ownerId: string;
    outbox: RuntimeMessageOutboxStore;
    bus: MessageBus;
    now?: () => string;
    leaseMs?: number;
    maxAttempts?: number;
    retryDelayMs?: (attempt: number) => number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `bus` | property | <code>bus: MessageBus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseMs` | property | <code>leaseMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxAttempts` | property | <code>maxAttempts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `outbox` | property | <code>outbox: RuntimeMessageOutboxStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryDelayMs` | method | <code>retryDelayMs?(attempt: number): number</code> | Public method; parameters and return type are shown in the signature. |

## `RuntimeOutboxDispatchResult`

Runtime Outbox Dispatch Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeOutboxDispatchResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/message-inbox-outbox`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/message-inbox-outbox.ts)

### Declaration

```text
export interface RuntimeOutboxDispatchResult {
    claimed: number;
    published: number;
    failed: number;
    deadLettered: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `claimed` | property | <code>claimed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadLettered` | property | <code>deadLettered: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failed` | property | <code>failed: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `published` | property | <code>published: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
