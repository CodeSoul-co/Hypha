# `@codesoul-co/hypha-core` / `modules/runtime/event-schema-registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/event-schema-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)
- Exports: **6**

## Using this module

Use the Event schema registry module for declaring and runtime-validating contracts. It exports 1 class, 5 interfaces.

### Import from the package entrypoint

```ts
import {
  InMemoryEventSchemaRegistry,
} from '@codesoul-co/hypha-core';

import type {
  EventSchemaDefinition,
  EventSchemaRegistry,
  EventUpcaster,
  EventValidationIssue,
  EventValidationResult,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 5 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryEventSchemaRegistry` | class | <code>new InMemoryEventSchemaRegistry(): InMemoryEventSchemaRegistry</code> | In Memory Event Schema Registry class with 5 public constructor or member entries; its exact declarations are listed below. |
| `EventSchemaDefinition` | interface | <code>interface EventSchemaDefinition</code> | Event Schema Definition interface with 6 public fields or methods. |
| `EventSchemaRegistry` | interface | <code>interface EventSchemaRegistry</code> | Event Schema Registry interface with 4 public fields or methods. |
| `EventUpcaster` | interface | <code>interface EventUpcaster</code> | Event Upcaster interface with 5 public fields or methods. |
| `EventValidationIssue` | interface | <code>interface EventValidationIssue</code> | Event Validation Issue interface with 3 public fields or methods. |
| `EventValidationResult` | interface | <code>interface EventValidationResult</code> | Event Validation Result interface with 5 public fields or methods. |

## `InMemoryEventSchemaRegistry`

In Memory Event Schema Registry class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryEventSchemaRegistry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### Declaration

```text
export declare class InMemoryEventSchemaRegistry implements EventSchemaRegistry {
    constructor();
    register(definition: EventSchemaDefinition): Promise<void>;
    registerUpcaster(upcaster: EventUpcaster): Promise<void>;
    validate(event: EventCreateInput): Promise<EventValidationResult>;
    upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise<PersistedFrameworkEvent>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryEventSchemaRegistry</code> | Creates an instance of this class. |
| `register` | method | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `registerUpcaster` | method | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upcast` | method | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `validate` | method | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EventSchemaDefinition`

Event Schema Definition interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { EventSchemaDefinition } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### Declaration

```text
export interface EventSchemaDefinition {
    eventType: string;
    version: string;
    schema: JsonSchema;
    schemaHash: string;
    sensitivePaths?: string[];
    upcasterRefs?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventType` | property | <code>eventType: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schema` | property | <code>schema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaHash` | property | <code>schemaHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitivePaths` | property | <code>sensitivePaths?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `upcasterRefs` | property | <code>upcasterRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventSchemaRegistry`

Event Schema Registry interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { EventSchemaRegistry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### Declaration

```text
export interface EventSchemaRegistry {
    register(definition: EventSchemaDefinition): Promise<void>;
    registerUpcaster(upcaster: EventUpcaster): Promise<void>;
    validate(event: EventCreateInput): Promise<EventValidationResult>;
    upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise<PersistedFrameworkEvent>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `register` | method | <code>register(definition: EventSchemaDefinition): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `registerUpcaster` | method | <code>registerUpcaster(upcaster: EventUpcaster): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `upcast` | method | <code>upcast(event: PersistedFrameworkEvent, targetVersion?: string): Promise&lt;PersistedFrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `validate` | method | <code>validate(event: EventCreateInput): Promise&lt;EventValidationResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `EventUpcaster`

Event Upcaster interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { EventUpcaster } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### Declaration

```text
export interface EventUpcaster {
    ref: string;
    eventType: string;
    fromVersion: string;
    toVersion: string;
    upcast(payload: unknown): unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventType` | property | <code>eventType: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fromVersion` | property | <code>fromVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ref` | property | <code>ref: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toVersion` | property | <code>toVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `upcast` | method | <code>upcast(payload: unknown): unknown</code> | Public method; parameters and return type are shown in the signature. |

## `EventValidationIssue`

Event Validation Issue interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { EventValidationIssue } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### Declaration

```text
export interface EventValidationIssue {
    path: string;
    code: string;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `code` | property | <code>code: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EventValidationResult`

Event Validation Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { EventValidationResult } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/event-schema-registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/event-schema-registry.ts)

### Declaration

```text
export interface EventValidationResult {
    valid: boolean;
    eventType: string;
    version: string;
    schemaHash?: string;
    issues: EventValidationIssue[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventType` | property | <code>eventType: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `issues` | property | <code>issues: EventValidationIssue[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaHash` | property | <code>schemaHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `valid` | property | <code>valid: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
