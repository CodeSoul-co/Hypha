# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-descriptor-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)
- Exports: **4**

## Using this module

Use the Runtime activity descriptor store module for persisting and reading data at this boundary. It exports 1 class, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  ArtifactRuntimeActivityDescriptorStore,
} from '@codesoul-co/hypha-core';

import type {
  ArtifactRuntimeActivityDescriptorStoreOptions,
  RuntimeActivityDescriptorReference,
  RuntimeActivityDescriptorStore,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactRuntimeActivityDescriptorStore` | class | <code>new ArtifactRuntimeActivityDescriptorStore(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | Persists immutable Activity descriptors outside HumanTask Events. |
| `ArtifactRuntimeActivityDescriptorStoreOptions` | interface | <code>interface ArtifactRuntimeActivityDescriptorStoreOptions</code> | Artifact Runtime Activity Descriptor Store Options interface with 2 public fields or methods. |
| `RuntimeActivityDescriptorReference` | interface | <code>interface RuntimeActivityDescriptorReference</code> | Runtime Activity Descriptor Reference interface with 2 public fields or methods. |
| `RuntimeActivityDescriptorStore` | interface | <code>interface RuntimeActivityDescriptorStore</code> | Runtime Activity Descriptor Store interface with 2 public fields or methods. |

## `ArtifactRuntimeActivityDescriptorStore`

Persists immutable Activity descriptors outside HumanTask Events.

- Kind: class
- Import: `import { ArtifactRuntimeActivityDescriptorStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### Declaration

```text
export declare class ArtifactRuntimeActivityDescriptorStore implements RuntimeActivityDescriptorStore {
    constructor(options: ArtifactRuntimeActivityDescriptorStoreOptions);
    put(input: RuntimeActivityDescriptor): Promise<RuntimeActivityDescriptorReference>;
    get(reference: RuntimeActivityDescriptorReference): Promise<RuntimeActivityDescriptor>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(input: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactRuntimeActivityDescriptorStoreOptions`

Artifact Runtime Activity Descriptor Store Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRuntimeActivityDescriptorStoreOptions } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### Declaration

```text
export interface ArtifactRuntimeActivityDescriptorStoreOptions {
    artifacts: ArtifactStoreProvider;
    maxDescriptorBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxDescriptorBytes` | property | <code>maxDescriptorBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityDescriptorReference`

Runtime Activity Descriptor Reference interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityDescriptorReference } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### Declaration

```text
export interface RuntimeActivityDescriptorReference {
    activityDescriptorRef: string;
    activityDescriptorHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeActivityDescriptorStore`

Runtime Activity Descriptor Store interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeActivityDescriptorStore } from '@codesoul-co/hypha-core';`
- Source module: [`modules/runtime/runtime-activity-descriptor-store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)

### Declaration

```text
export interface RuntimeActivityDescriptorStore {
    put(descriptor: RuntimeActivityDescriptor): Promise<RuntimeActivityDescriptorReference>;
    get(reference: RuntimeActivityDescriptorReference): Promise<RuntimeActivityDescriptor>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(descriptor: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | Public method; parameters and return type are shown in the signature. |
