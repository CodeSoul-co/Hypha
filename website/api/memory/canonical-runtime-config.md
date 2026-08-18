# `@codesoul-co/hypha-memory` / `canonical-runtime-config`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/canonical-runtime-config.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)
- Exports: **7**

## Using this module

Use the Canonical runtime config module for executing runtime behavior at this boundary. It exports 1 class, 3 constants, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  CanonicalMemoryRuntimeLoader,
  canonicalMemoryRuntimeConfigExample,
  canonicalMemoryRuntimeConfigJsonSchema,
  canonicalMemoryRuntimeConfigSchema,
} from '@codesoul-co/hypha-memory';

import type {
  CanonicalMemoryRuntimeConfig,
  LoadedCanonicalMemoryRuntimeConfig,
  MemoryRuntimeReferenceResolver,
} from '@codesoul-co/hypha-memory';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CanonicalMemoryRuntimeLoader` | class | <code>new CanonicalMemoryRuntimeLoader(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | Canonical Memory Runtime Loader class with 3 public constructor or member entries; its exact declarations are listed below. |
| `canonicalMemoryRuntimeConfigExample` | constant | <code>const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig</code> | Valid example value for Canonical Memory Runtime Config. |
| `canonicalMemoryRuntimeConfigJsonSchema` | constant | <code>const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema</code> | JSON Schema for Canonical Memory Runtime Config. |
| `canonicalMemoryRuntimeConfigSchema` | constant | <code>const canonicalMemoryRuntimeConfigSchema: ZodType&lt;CanonicalMemoryRuntimeConfig, ZodTypeDef, CanonicalMemoryRuntimeConfig&gt;</code> | Runtime schema for Canonical Memory Runtime Config. |
| `CanonicalMemoryRuntimeConfig` | interface | <code>interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig</code> | Canonical Memory Runtime Config interface with 3 public fields or methods. |
| `LoadedCanonicalMemoryRuntimeConfig` | interface | <code>interface LoadedCanonicalMemoryRuntimeConfig</code> | Loaded Canonical Memory Runtime Config interface with 2 public fields or methods. |
| `MemoryRuntimeReferenceResolver` | interface | <code>interface MemoryRuntimeReferenceResolver</code> | Memory Runtime Reference Resolver interface with 1 public fields or methods. |

## `CanonicalMemoryRuntimeLoader`

Canonical Memory Runtime Loader class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { CanonicalMemoryRuntimeLoader } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export declare class CanonicalMemoryRuntimeLoader {
    constructor(resolver: MemoryRuntimeReferenceResolver);
    load(input: unknown): Promise<LoadedCanonicalMemoryRuntimeConfig>;
    create(factory: MemoryRuntimeFactory, input: unknown): Promise<MemoryRuntime>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | Creates an instance of this class. |
| `create` | method | <code>create(factory: MemoryRuntimeFactory, input: unknown): Promise&lt;MemoryRuntime&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `load` | method | <code>load(input: unknown): Promise&lt;LoadedCanonicalMemoryRuntimeConfig&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `canonicalMemoryRuntimeConfigExample`

Valid example value for Canonical Memory Runtime Config.

- Kind: constant
- Import: `import { canonicalMemoryRuntimeConfigExample } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export declare const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig;
```

## `canonicalMemoryRuntimeConfigJsonSchema`

JSON Schema for Canonical Memory Runtime Config.

- Kind: constant
- Import: `import { canonicalMemoryRuntimeConfigJsonSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export declare const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema;
```

## `canonicalMemoryRuntimeConfigSchema`

Runtime schema for Canonical Memory Runtime Config.

- Kind: constant
- Import: `import { canonicalMemoryRuntimeConfigSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export declare const canonicalMemoryRuntimeConfigSchema: ZodType<CanonicalMemoryRuntimeConfig, ZodTypeDef, CanonicalMemoryRuntimeConfig>;
```

## `CanonicalMemoryRuntimeConfig`

Canonical Memory Runtime Config interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { CanonicalMemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig {
    schemaVersion: '1.0';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeProfile` | property | <code>activeProfile: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profiles` | property | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LoadedCanonicalMemoryRuntimeConfig`

Loaded Canonical Memory Runtime Config interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LoadedCanonicalMemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export interface LoadedCanonicalMemoryRuntimeConfig {
    config: MemoryRuntimeConfig;
    references: ReadonlyMap<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `config` | property | <code>config: MemoryRuntimeConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `references` | property | <code>references: ReadonlyMap&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeReferenceResolver`

Memory Runtime Reference Resolver interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeReferenceResolver } from '@codesoul-co/hypha-memory';`
- Source module: [`canonical-runtime-config`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)

### Declaration

```text
export interface MemoryRuntimeReferenceResolver {
    resolve(reference: string, kind: 'connection' | 'secret' | 'environment' | 'dependency'): Promise<unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve(reference: string, kind: "connection" &#124; "secret" &#124; "environment" &#124; "dependency"): Promise&lt;unknown&gt;</code> | Public method; parameters and return type are shown in the signature. |
