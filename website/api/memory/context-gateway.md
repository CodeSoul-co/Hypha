# `@codesoul-co/hypha-memory` / `context-gateway`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-gateway.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)
- Exports: **6**

## Using this module

Use the Context gateway module for using the public contracts and operations for this capability boundary. It exports 1 class, 4 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  DefaultMemoryContextGateway,
} from '@codesoul-co/hypha-memory';

import type {
  ContextGatewayRequest,
  ContextGatewayResult,
  DefaultMemoryContextGatewayOptions,
  MemoryContextGateway,
  ContextGatewayConsumer,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryContextGateway` | class | <code>new DefaultMemoryContextGateway(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | Canonical Context entry point shared by Chat, Workflow, and Harness consumers. |
| `ContextGatewayRequest` | interface | <code>interface ContextGatewayRequest extends ResolvedContextBuildInput</code> | Context Gateway Request interface with 20 public fields or methods. |
| `ContextGatewayResult` | interface | <code>interface ContextGatewayResult</code> | Context Gateway Result interface with 4 public fields or methods. |
| `DefaultMemoryContextGatewayOptions` | interface | <code>interface DefaultMemoryContextGatewayOptions</code> | Default Memory Context Gateway Options interface with 5 public fields or methods. |
| `MemoryContextGateway` | interface | <code>interface MemoryContextGateway</code> | Memory Context Gateway interface with 1 public fields or methods. |
| `ContextGatewayConsumer` | type | <code>type ContextGatewayConsumer = 'chat' &#124; 'workflow' &#124; 'harness'</code> | Public type alias for Context Gateway Consumer; the declaration contains its complete type expression. |

## `DefaultMemoryContextGateway`

Canonical Context entry point shared by Chat, Workflow, and Harness consumers.

- Kind: class
- Import: `import { DefaultMemoryContextGateway } from '@codesoul-co/hypha-memory';`
- Source module: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### Declaration

```text
export declare class DefaultMemoryContextGateway implements MemoryContextGateway {
    constructor(options: DefaultMemoryContextGatewayOptions);
    build(request: ContextGatewayRequest, signal?: AbortSignal): Promise<ContextGatewayResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: DefaultMemoryContextGatewayOptions): DefaultMemoryContextGateway</code> | Creates an instance of this class. |

## `ContextGatewayRequest`

Context Gateway Request interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { ContextGatewayRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### Declaration

```text
export interface ContextGatewayRequest extends ResolvedContextBuildInput {
    consumer: ContextGatewayConsumer;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumer` | property | <code>consumer: ContextGatewayConsumer</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `explicitSourceRefs` | property | <code>explicitSourceRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageCursor` | property | <code>messageCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousContextHash` | property | <code>previousContextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeStateRef` | property | <code>runtimeStateRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenizerRef` | property | <code>tokenizerRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextGatewayResult`

Context Gateway Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ContextGatewayResult } from '@codesoul-co/hypha-memory';`
- Source module: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### Declaration

```text
export interface ContextGatewayResult {
    envelope: ContextEnvelope;
    explanation: ContextBuildExplanation;
    sourceItemCount: number;
    consumer: ContextGatewayConsumer;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `consumer` | property | <code>consumer: ContextGatewayConsumer</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelope` | property | <code>envelope: ContextEnvelope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `explanation` | property | <code>explanation: ContextBuildExplanation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceItemCount` | property | <code>sourceItemCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DefaultMemoryContextGatewayOptions`

Default Memory Context Gateway Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { DefaultMemoryContextGatewayOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### Declaration

```text
export interface DefaultMemoryContextGatewayOptions {
    resolver: ContextSourceResolverRegistry;
    builder: MemoryContextBuilder;
    injection: ContextInjectionGateway;
    activityHook?: MemoryActivityHarnessHook;
    eventContext?: (request: ContextGatewayRequest) => MemoryActivityRequest['eventContext'];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityHook` | property | <code>activityHook?: MemoryActivityHarnessHook</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `builder` | property | <code>builder: MemoryContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventContext` | method | <code>eventContext?(request: ContextGatewayRequest): MemoryActivityRequest["eventContext"]</code> | Public method; parameters and return type are shown in the signature. |
| `injection` | property | <code>injection: ContextInjectionGateway</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolver` | property | <code>resolver: ContextSourceResolverRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryContextGateway`

Memory Context Gateway interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryContextGateway } from '@codesoul-co/hypha-memory';`
- Source module: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### Declaration

```text
export interface MemoryContextGateway {
    build(request: ContextGatewayRequest, signal?: AbortSignal): Promise<ContextGatewayResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextGatewayRequest, signal?: AbortSignal): Promise&lt;ContextGatewayResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContextGatewayConsumer`

Public type alias for Context Gateway Consumer; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ContextGatewayConsumer } from '@codesoul-co/hypha-memory';`
- Source module: [`context-gateway`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-gateway.ts)

### Declaration

```text
export type ContextGatewayConsumer = 'chat' | 'workflow' | 'harness';
```
