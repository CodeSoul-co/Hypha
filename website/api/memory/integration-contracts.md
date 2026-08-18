# `@codesoul-co/hypha-memory` / `integration-contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/integration-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)
- Exports: **32**

## Using this module

Use the Integration contracts module for declaring and runtime-validating contracts. It exports 2 classes, 8 functions, 20 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  DefaultMemoryActivityPort,
  MemoryContextInferenceBridge,
  createContextBuildActivityHandler,
  createDomainMemoryDependencySnapshot,
  createMemoryCacheValidityInput,
  createMemorySearchActivityHandler,
  memoryCacheValidityHash,
  memoryRecordVersionSetHash,
} from '@codesoul-co/hypha-memory';

import type {
  DefaultMemoryActivityPortOptions,
  DomainMemoryDependencySnapshot,
  InferenceContextInput,
  InferenceContextPort,
  MemoryActivityHarnessHook,
  MemoryActivityObserver,
  MemoryActivityPolicyDecision,
  MemoryActivityPolicyPort,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 22 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultMemoryActivityPort` | class | <code>new DefaultMemoryActivityPort(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | Default Memory Activity Port class with 3 public constructor or member entries; its exact declarations are listed below. |
| `MemoryContextInferenceBridge` | class | <code>new MemoryContextInferenceBridge(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | Memory Context Inference Bridge class with 2 public constructor or member entries; its exact declarations are listed below. |
| `createContextBuildActivityHandler` | function | <code>createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler</code> | Create Context Build Activity Handler function with 1 public call signature; parameters and return types are listed below. |
| `createDomainMemoryDependencySnapshot` | function | <code>createDomainMemoryDependencySnapshot(input: Omit&lt;DomainMemoryDependencySnapshot, "dependencyHash" &#124; "createdAt"&gt;, now?: string): DomainMemoryDependencySnapshot</code> | Create Domain Memory Dependency Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `createMemoryCacheValidityInput` | function | <code>createMemoryCacheValidityInput(input: Omit&lt;MemoryCacheValidityInput, "scopeHash"&gt; &amp; { scope: ManagedMemoryScope; }): MemoryCacheValidityInput</code> | Create Memory Cache Validity Input function with 1 public call signature; parameters and return types are listed below. |
| `createMemorySearchActivityHandler` | function | <code>createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler</code> | Create Memory Search Activity Handler function with 1 public call signature; parameters and return types are listed below. |
| `memoryCacheValidityHash` | function | <code>memoryCacheValidityHash(input: MemoryCacheValidityInput): string</code> | Memory Cache Validity Hash function with 1 public call signature; parameters and return types are listed below. |
| `memoryRecordVersionSetHash` | function | <code>memoryRecordVersionSetHash(versionIds: string[]): string</code> | Memory Record Version Set Hash function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryBindingCapabilities` | function | <code>validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[]</code> | Validate Memory Binding Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `validateMemoryProfileCapabilities` | function | <code>validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[]</code> | Validate Memory Profile Capabilities function with 1 public call signature; parameters and return types are listed below. |
| `DefaultMemoryActivityPortOptions` | interface | <code>interface DefaultMemoryActivityPortOptions</code> | Default Memory Activity Port Options interface with 4 public fields or methods. |
| `DomainMemoryDependencySnapshot` | interface | <code>interface DomainMemoryDependencySnapshot</code> | Domain Memory Dependency Snapshot interface with 10 public fields or methods. |
| `InferenceContextInput` | interface | <code>interface InferenceContextInput</code> | Inference Context Input interface with 3 public fields or methods. |
| `InferenceContextPort` | interface | <code>interface InferenceContextPort</code> | Inference Context Port interface with 1 public fields or methods. |
| `MemoryActivityHarnessHook` | interface | <code>interface MemoryActivityHarnessHook</code> | Memory Activity Harness Hook interface with 2 public fields or methods. |
| `MemoryActivityObserver` | interface | <code>interface MemoryActivityObserver</code> | Memory Activity Observer interface with 3 public fields or methods. |
| `MemoryActivityPolicyDecision` | interface | <code>interface MemoryActivityPolicyDecision</code> | Memory Activity Policy Decision interface with 3 public fields or methods. |
| `MemoryActivityPolicyPort` | interface | <code>interface MemoryActivityPolicyPort</code> | Memory Activity Policy Port interface with 1 public fields or methods. |
| `MemoryActivityPort` | interface | <code>interface MemoryActivityPort</code> | Memory Activity Port interface with 1 public fields or methods. |
| `MemoryActivityRequest` | interface | <code>interface MemoryActivityRequest</code> | Memory Activity Request interface with 9 public fields or methods. |
| `MemoryActivityResult` | interface | <code>interface MemoryActivityResult</code> | Memory Activity Result interface with 8 public fields or methods. |
| `MemoryCacheInvalidation` | interface | <code>interface MemoryCacheInvalidation</code> | Memory Cache Invalidation interface with 7 public fields or methods. |
| `MemoryCacheValidityInput` | interface | <code>interface MemoryCacheValidityInput</code> | Memory Cache Validity Input interface with 10 public fields or methods. |
| `MemoryContextInferenceResult` | interface | <code>interface MemoryContextInferenceResult</code> | Memory Context Inference Result interface with 2 public fields or methods. |
| `MemoryEvaluationCase` | interface | <code>interface MemoryEvaluationCase</code> | Memory Evaluation Case interface with 6 public fields or methods. |
| `MemoryEvaluationObservation` | interface | <code>interface MemoryEvaluationObservation</code> | Memory Evaluation Observation interface with 7 public fields or methods. |
| `MemoryEvaluationPort` | interface | <code>interface MemoryEvaluationPort</code> | Memory Evaluation Port interface with 1 public fields or methods. |
| `MemoryReplayReference` | interface | <code>interface MemoryReplayReference</code> | Memory Replay Reference interface with 7 public fields or methods. |
| `SessionMemoryBinding` | interface | <code>interface SessionMemoryBinding</code> | Session Memory Binding interface with 4 public fields or methods. |
| `WorkflowStateMemoryBinding` | interface | <code>interface WorkflowStateMemoryBinding</code> | Workflow State Memory Binding interface with 8 public fields or methods. |
| `MemoryActivityHandler` | type | <code>type MemoryActivityHandler = (request: MemoryActivityRequest, signal?: AbortSignal) =&gt; Promise&lt;Omit&lt;MemoryActivityResult, 'operationId'&gt;&gt;</code> | Public type alias for Memory Activity Handler; the declaration contains its complete type expression. |
| `MemoryActivityOperation` | type | <code>type MemoryActivityOperation = 'add' &#124; 'extract' &#124; 'search' &#124; 'get' &#124; 'list' &#124; 'update' &#124; 'write' &#124; 'maintain' &#124; 'delete' &#124; 'history' &#124; 'build_context'</code> | Public type alias for Memory Activity Operation; the declaration contains its complete type expression. |

## `DefaultMemoryActivityPort`

Default Memory Activity Port class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultMemoryActivityPort } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare class DefaultMemoryActivityPort implements MemoryActivityPort {
    constructor(options: DefaultMemoryActivityPortOptions);
    register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): this;
    execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultMemoryActivityPortOptions): DefaultMemoryActivityPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(operation: MemoryActivityOperation, handler: MemoryActivityHandler): DefaultMemoryActivityPort</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryContextInferenceBridge`

Memory Context Inference Bridge class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryContextInferenceBridge } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare class MemoryContextInferenceBridge {
    constructor(activities: MemoryActivityPort, inference: InferenceContextPort);
    execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryContextInferenceResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(activities: MemoryActivityPort, inference: InferenceContextPort): MemoryContextInferenceBridge</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryContextInferenceResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `createContextBuildActivityHandler`

Create Context Build Activity Handler function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createContextBuildActivityHandler } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler;
```

### Call signature

```text
createContextBuildActivityHandler(builder: MemoryContextBuilder, gateway: ContextInjectionGateway): MemoryActivityHandler
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `builder` | <code>MemoryContextBuilder</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `gateway` | <code>ContextInjectionGateway</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryActivityHandler`
- Description: The return contract is defined by the type shown above.

## `createDomainMemoryDependencySnapshot`

Create Domain Memory Dependency Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createDomainMemoryDependencySnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function createDomainMemoryDependencySnapshot(input: Omit<DomainMemoryDependencySnapshot, 'dependencyHash' | 'createdAt'>, now?: string): DomainMemoryDependencySnapshot;
```

### Call signature

```text
createDomainMemoryDependencySnapshot(input: Omit<DomainMemoryDependencySnapshot, "dependencyHash" | "createdAt">, now?: string): DomainMemoryDependencySnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;DomainMemoryDependencySnapshot, "createdAt" &#124; "dependencyHash"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainMemoryDependencySnapshot`
- Description: The return contract is defined by the type shown above.

## `createMemoryCacheValidityInput`

Create Memory Cache Validity Input function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemoryCacheValidityInput } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function createMemoryCacheValidityInput(input: Omit<MemoryCacheValidityInput, 'scopeHash'> & {
    scope: ManagedMemoryScope;
}): MemoryCacheValidityInput;
```

### Call signature

```text
createMemoryCacheValidityInput(input: Omit<MemoryCacheValidityInput, "scopeHash"> & { scope: ManagedMemoryScope; }): MemoryCacheValidityInput
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;MemoryCacheValidityInput, "scopeHash"&gt; &amp; { scope: ManagedMemoryScope; }</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryCacheValidityInput`
- Description: The return contract is defined by the type shown above.

## `createMemorySearchActivityHandler`

Create Memory Search Activity Handler function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createMemorySearchActivityHandler } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler;
```

### Call signature

```text
createMemorySearchActivityHandler(provider: MemoryManagementProvider): MemoryActivityHandler
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `provider` | <code>MemoryManagementProvider</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryActivityHandler`
- Description: The return contract is defined by the type shown above.

## `memoryCacheValidityHash`

Memory Cache Validity Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { memoryCacheValidityHash } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function memoryCacheValidityHash(input: MemoryCacheValidityInput): string;
```

### Call signature

```text
memoryCacheValidityHash(input: MemoryCacheValidityInput): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>MemoryCacheValidityInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `memoryRecordVersionSetHash`

Memory Record Version Set Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { memoryRecordVersionSetHash } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function memoryRecordVersionSetHash(versionIds: string[]): string;
```

### Call signature

```text
memoryRecordVersionSetHash(versionIds: string[]): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `versionIds` | <code>string[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `validateMemoryBindingCapabilities`

Validate Memory Binding Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryBindingCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[];
```

### Call signature

```text
validateMemoryBindingCapabilities(binding: WorkflowStateMemoryBinding, capabilities: MemoryManagementCapabilities): string[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `binding` | <code>WorkflowStateMemoryBinding</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `capabilities` | <code>MemoryManagementCapabilities</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string[]`
- Description: The return contract is defined by the type shown above.

## `validateMemoryProfileCapabilities`

Validate Memory Profile Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryProfileCapabilities } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export declare function validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[];
```

### Call signature

```text
validateMemoryProfileCapabilities(profile: MemoryProfileSpec, capabilities: MemoryManagementCapabilities): string[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `profile` | <code>MemoryProfileSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `capabilities` | <code>MemoryManagementCapabilities</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string[]`
- Description: The return contract is defined by the type shown above.

## `DefaultMemoryActivityPortOptions`

Default Memory Activity Port Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { DefaultMemoryActivityPortOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface DefaultMemoryActivityPortOptions {
    policy: MemoryActivityPolicyPort;
    events: MemoryEventPublisher;
    harness: MemoryActivityHarnessHook;
    observers?: MemoryActivityObserver[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: MemoryEventPublisher</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `harness` | property | <code>harness: MemoryActivityHarnessHook</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observers` | property | <code>observers?: MemoryActivityObserver[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy: MemoryActivityPolicyPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainMemoryDependencySnapshot`

Domain Memory Dependency Snapshot interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { DomainMemoryDependencySnapshot } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface DomainMemoryDependencySnapshot {
    domainPackRef: SpecRef;
    memoryProfileRef?: SpecRef;
    contextProfileRef?: SpecRef;
    extractionProfileRef?: SpecRef;
    providerRefs: SpecRef[];
    policyRefs: SpecRef[];
    scopeTemplate?: Partial<ManagedMemoryScope>;
    capabilitySnapshot: Partial<MemoryManagementCapabilities>;
    dependencyHash: string;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: Partial&lt;MemoryManagementCapabilities&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfileRef` | property | <code>contextProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencyHash` | property | <code>dependencyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractionProfileRef` | property | <code>extractionProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRefs` | property | <code>providerRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeTemplate` | property | <code>scopeTemplate?: Partial&lt;ManagedMemoryScope&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceContextInput`

Inference Context Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InferenceContextInput } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface InferenceContextInput {
    envelope: ContextEnvelope;
    contextHash: string;
    provenanceRequired: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextHash` | property | <code>contextHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `envelope` | property | <code>envelope: ContextEnvelope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenanceRequired` | property | <code>provenanceRequired: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InferenceContextPort`

Inference Context Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { InferenceContextPort } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface InferenceContextPort<TOutput = unknown> {
    invoke(input: InferenceContextInput, signal?: AbortSignal): Promise<TOutput>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `invoke` | method | <code>invoke(input: InferenceContextInput, signal?: AbortSignal): Promise&lt;TOutput&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryActivityHarnessHook`

Memory Activity Harness Hook interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityHarnessHook } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityHarnessHook {
    beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void | Promise<void>;
    afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `afterExecute` | method | <code>afterExecute(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `beforeExecute` | method | <code>beforeExecute(request: MemoryActivityRequest, signal: AbortSignal): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryActivityObserver`

Memory Activity Observer interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityObserver } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityObserver {
    onStarted?(request: MemoryActivityRequest): void | Promise<void>;
    onCompleted?(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
    onFailed?(request: MemoryActivityRequest, result: MemoryActivityResult): void | Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `onCompleted` | method | <code>onCompleted?(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `onFailed` | method | <code>onFailed?(request: MemoryActivityRequest, result: MemoryActivityResult): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `onStarted` | method | <code>onStarted?(request: MemoryActivityRequest): void &#124; Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryActivityPolicyDecision`

Memory Activity Policy Decision interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityPolicyDecision } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityPolicyDecision {
    allowed: boolean;
    reason?: string;
    policyRevision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryActivityPolicyPort`

Memory Activity Policy Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityPolicyPort } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityPolicyPort {
    authorize(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityPolicyDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authorize` | method | <code>authorize(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityPolicyDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryActivityPort`

Memory Activity Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityPort } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityPort {
    execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise<MemoryActivityResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: MemoryActivityRequest, signal?: AbortSignal): Promise&lt;MemoryActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryActivityRequest`

Memory Activity Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityRequest {
    operationId: string;
    operation: MemoryActivityOperation;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: SpecRef;
    eventContext: MemoryEventContext;
    payload: unknown;
    timeoutMs?: number;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventContext` | property | <code>eventContext: MemoryEventContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operation` | property | <code>operation: MemoryActivityOperation</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryActivityResult`

Memory Activity Result interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryActivityResult } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryActivityResult {
    operationId: string;
    status: 'completed' | 'failed' | 'cancelled' | 'partial';
    memoryRefs?: string[];
    contextEnvelopeRef?: string;
    eventIds: string[];
    error?: NormalizedMemoryError;
    evidence?: MemoryProviderReturnEvidence;
    output?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextEnvelopeRef` | property | <code>contextEnvelopeRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidence` | property | <code>evidence?: MemoryProviderReturnEvidence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryRefs` | property | <code>memoryRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryCacheInvalidation`

Memory Cache Invalidation interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryCacheInvalidation } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryCacheInvalidation {
    operationId: string;
    scopeHash: string;
    reason: 'created' | 'updated' | 'invalidated' | 'deleted' | 'provider_revision';
    memoryIds: string[];
    memoryVersionIds?: string[];
    mutationGeneration: string;
    validityHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `memoryIds` | property | <code>memoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionIds` | property | <code>memoryVersionIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "created" &#124; "invalidated" &#124; "deleted" &#124; "updated" &#124; "provider_revision"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validityHash` | property | <code>validityHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryCacheValidityInput`

Memory Cache Validity Input interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryCacheValidityInput } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryCacheValidityInput {
    memoryProfileRevision: string;
    mutationGeneration: string;
    contextProfileRevision?: string;
    scopeHash: string;
    queryHash?: string;
    recordSetRevision?: string;
    selectedMemoryVersionIds?: string[];
    providerRevision?: string;
    embeddingRevision?: string;
    policyRevision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextProfileRevision` | property | <code>contextProfileRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddingRevision` | property | <code>embeddingRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRevision` | property | <code>memoryProfileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mutationGeneration` | property | <code>mutationGeneration: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerRevision` | property | <code>providerRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `queryHash` | property | <code>queryHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordSetRevision` | property | <code>recordSetRevision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selectedMemoryVersionIds` | property | <code>selectedMemoryVersionIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryContextInferenceResult`

Memory Context Inference Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryContextInferenceResult } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryContextInferenceResult<TOutput = unknown> {
    activity: MemoryActivityResult;
    inferenceOutput: TOutput;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activity` | property | <code>activity: MemoryActivityResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inferenceOutput` | property | <code>inferenceOutput: TOutput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryEvaluationCase`

Memory Evaluation Case interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEvaluationCase } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryEvaluationCase {
    id: string;
    category: 'extraction' | 'retrieval' | 'context' | 'lifecycle';
    inputRef: string;
    expectedRef?: string;
    metricIds: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `category` | property | <code>category: "lifecycle" &#124; "context" &#124; "extraction" &#124; "retrieval"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRef` | property | <code>expectedRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputRef` | property | <code>inputRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metricIds` | property | <code>metricIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryEvaluationObservation`

Memory Evaluation Observation interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEvaluationObservation } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryEvaluationObservation {
    caseId: string;
    operationId: string;
    traceEventIds: string[];
    memoryVersionIds?: string[];
    retrievalSnapshotId?: string;
    contextHash?: string;
    metrics?: Record<string, number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `caseId` | property | <code>caseId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextHash` | property | <code>contextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionIds` | property | <code>memoryVersionIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metrics` | property | <code>metrics?: Record&lt;string, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retrievalSnapshotId` | property | <code>retrievalSnapshotId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceEventIds` | property | <code>traceEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryEvaluationPort`

Memory Evaluation Port interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryEvaluationPort } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryEvaluationPort {
    record(observation: MemoryEvaluationObservation): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(observation: MemoryEvaluationObservation): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryReplayReference`

Memory Replay Reference interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryReplayReference } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface MemoryReplayReference {
    operationId: string;
    profileRevision: string;
    scopeHash: string;
    eventIds: string[];
    memoryVersionIds: string[];
    retrievalSnapshotId?: string;
    contextHash?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextHash` | property | <code>contextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionIds` | property | <code>memoryVersionIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retrievalSnapshotId` | property | <code>retrievalSnapshotId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionMemoryBinding`

Session Memory Binding interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { SessionMemoryBinding } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface SessionMemoryBinding {
    memoryProfileRef?: SpecRef;
    contextProfileRef?: SpecRef;
    memoryScopeTemplate?: Partial<ManagedMemoryScope>;
    sessionScopeMode?: 'isolated' | 'user_shared' | 'workspace_shared';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextProfileRef` | property | <code>contextProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryScopeTemplate` | property | <code>memoryScopeTemplate?: Partial&lt;ManagedMemoryScope&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionScopeMode` | property | <code>sessionScopeMode?: "isolated" &#124; "user_shared" &#124; "workspace_shared"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowStateMemoryBinding`

Workflow State Memory Binding interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowStateMemoryBinding } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export interface WorkflowStateMemoryBinding {
    memoryProfileRef?: SpecRef;
    contextProfileRef?: SpecRef;
    extractionProfileRef?: SpecRef;
    readPolicyRef?: SpecRef;
    writePolicyRef?: SpecRef;
    allowedMemoryTypes?: ManagedMemoryType[];
    memoryAccessMode?: 'none' | 'read' | 'write' | 'read_write';
    autoCapture?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMemoryTypes` | property | <code>allowedMemoryTypes?: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `autoCapture` | property | <code>autoCapture?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfileRef` | property | <code>contextProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractionProfileRef` | property | <code>extractionProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryAccessMode` | property | <code>memoryAccessMode?: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `readPolicyRef` | property | <code>readPolicyRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writePolicyRef` | property | <code>writePolicyRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryActivityHandler`

Public type alias for Memory Activity Handler; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryActivityHandler } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export type MemoryActivityHandler = (request: MemoryActivityRequest, signal?: AbortSignal) => Promise<Omit<MemoryActivityResult, 'operationId'>>;
```

## `MemoryActivityOperation`

Public type alias for Memory Activity Operation; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryActivityOperation } from '@codesoul-co/hypha-memory';`
- Source module: [`integration-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/integration-contracts.ts)

### Declaration

```text
export type MemoryActivityOperation = 'add' | 'extract' | 'search' | 'get' | 'list' | 'update' | 'write' | 'maintain' | 'delete' | 'history' | 'build_context';
```
