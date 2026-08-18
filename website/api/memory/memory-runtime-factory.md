# `@codesoul-co/hypha-memory` / `memory-runtime-factory`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/memory-runtime-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)
- Exports: **14**

## Using this module

Use the Memory runtime factory module for executing runtime behavior at this boundary. It exports 2 classes, 2 constants, 1 function, 8 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  MemoryManagementProviderRegistry,
  MemoryRuntimeFactory,
  memoryRuntimeConfigSchema,
  memoryRuntimeProfileSchema,
  validateMemoryRuntimeConfig,
} from '@codesoul-co/hypha-memory';

import type {
  MemoryManagementProviderFactory,
  MemoryManagementProviderFactoryContext,
  MemoryManagementProviderInstallation,
  MemoryRuntime,
  MemoryRuntimeCompositionReceipt,
  MemoryRuntimeConfig,
  MemoryRuntimeFactoryOptions,
  MemoryRuntimeProfile,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 2 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MemoryManagementProviderRegistry` | class | <code>new MemoryManagementProviderRegistry(): MemoryManagementProviderRegistry</code> | Memory Management Provider Registry class with 3 public constructor or member entries; its exact declarations are listed below. |
| `MemoryRuntimeFactory` | class | <code>new MemoryRuntimeFactory(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | Strict composition root for all Memory consumers. |
| `memoryRuntimeConfigSchema` | constant | <code>const memoryRuntimeConfigSchema: ZodType&lt;MemoryRuntimeConfig, ZodTypeDef, MemoryRuntimeConfig&gt;</code> | Runtime schema for Memory Runtime Config. |
| `memoryRuntimeProfileSchema` | constant | <code>const memoryRuntimeProfileSchema: ZodType&lt;MemoryRuntimeProfile, ZodTypeDef, MemoryRuntimeProfile&gt;</code> | Runtime schema for Memory Runtime Profile. |
| `validateMemoryRuntimeConfig` | function | <code>validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig</code> | Validate Memory Runtime Config function with 1 public call signature; parameters and return types are listed below. |
| `MemoryManagementProviderFactory` | interface | <code>interface MemoryManagementProviderFactory</code> | Memory Management Provider Factory interface with 3 public fields or methods. |
| `MemoryManagementProviderFactoryContext` | interface | <code>interface MemoryManagementProviderFactoryContext</code> | Memory Management Provider Factory Context interface with 3 public fields or methods. |
| `MemoryManagementProviderInstallation` | interface | <code>interface MemoryManagementProviderInstallation</code> | Memory Management Provider Installation interface with 4 public fields or methods. |
| `MemoryRuntime` | interface | <code>interface MemoryRuntime</code> | Memory Runtime interface with 10 public fields or methods. |
| `MemoryRuntimeCompositionReceipt` | interface | <code>interface MemoryRuntimeCompositionReceipt</code> | Memory Runtime Composition Receipt interface with 10 public fields or methods. |
| `MemoryRuntimeConfig` | interface | <code>interface MemoryRuntimeConfig</code> | Memory Runtime Config interface with 2 public fields or methods. |
| `MemoryRuntimeFactoryOptions` | interface | <code>interface MemoryRuntimeFactoryOptions</code> | Memory Runtime Factory Options interface with 12 public fields or methods. |
| `MemoryRuntimeProfile` | interface | <code>interface MemoryRuntimeProfile</code> | Memory Runtime Profile interface with 2 public fields or methods. |
| `MemoryRuntimeSearchCacheOptions` | type | <code>type MemoryRuntimeSearchCacheOptions = Omit&lt;CachedMemoryManagementProviderOptions, 'provider' &#124; 'providerRevision' &#124; 'requiredScopeFields' &#124; 'cacheAuthorization' &#124; 'requireCacheAuthorization'&gt;</code> | Public type alias for Memory Runtime Search Cache Options; the declaration contains its complete type expression. |

## `MemoryManagementProviderRegistry`

Memory Management Provider Registry class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryManagementProviderRegistry } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export declare class MemoryManagementProviderRegistry {
    register(factory: MemoryManagementProviderFactory): this;
    resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): MemoryManagementProviderRegistry</code> | Creates an instance of this class. |
| `register` | method | <code>register(factory: MemoryManagementProviderFactory): MemoryManagementProviderRegistry</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(spec: MemoryManagementProviderSpec): MemoryManagementProviderFactory</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryRuntimeFactory`

Strict composition root for all Memory consumers.

- Kind: class
- Import: `import { MemoryRuntimeFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export declare class MemoryRuntimeFactory {
    constructor(options: MemoryRuntimeFactoryOptions);
    create(input: unknown, references?: ReadonlyMap<string, unknown>): Promise<MemoryRuntime>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: MemoryRuntimeFactoryOptions): MemoryRuntimeFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `memoryRuntimeConfigSchema`

Runtime schema for Memory Runtime Config.

- Kind: constant
- Import: `import { memoryRuntimeConfigSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export declare const memoryRuntimeConfigSchema: ZodType<MemoryRuntimeConfig, ZodTypeDef, MemoryRuntimeConfig>;
```

## `memoryRuntimeProfileSchema`

Runtime schema for Memory Runtime Profile.

- Kind: constant
- Import: `import { memoryRuntimeProfileSchema } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export declare const memoryRuntimeProfileSchema: ZodType<MemoryRuntimeProfile, ZodTypeDef, MemoryRuntimeProfile>;
```

## `validateMemoryRuntimeConfig`

Validate Memory Runtime Config function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateMemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export declare function validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig;
```

### Call signature

```text
validateMemoryRuntimeConfig(input: unknown): MemoryRuntimeConfig
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `MemoryRuntimeConfig`
- Description: The return contract is defined by the type shown above.

## `MemoryManagementProviderFactory`

Memory Management Provider Factory interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagementProviderFactory } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryManagementProviderFactory {
    readonly id: string;
    supports(spec: MemoryManagementProviderSpec): boolean;
    create(context: MemoryManagementProviderFactoryContext): Promise<MemoryManagementProvider | MemoryManagementProviderInstallation>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(context: MemoryManagementProviderFactoryContext): Promise&lt;MemoryManagementProvider &#124; MemoryManagementProviderInstallation&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supports` | method | <code>supports(spec: MemoryManagementProviderSpec): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryManagementProviderFactoryContext`

Memory Management Provider Factory Context interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagementProviderFactoryContext } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryManagementProviderFactoryContext {
    profile: MemoryProfileSpec;
    spec: MemoryManagementProviderSpec;
    references?: ReadonlyMap<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `references` | property | <code>references?: ReadonlyMap&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: MemoryManagementProviderSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryManagementProviderInstallation`

Memory Management Provider Installation interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryManagementProviderInstallation } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryManagementProviderInstallation {
    provider: MemoryManagementProvider;
    reconciliationStore?: MemoryLifecycleTaskStore;
    resources?: unknown;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reconciliationStore` | property | <code>reconciliationStore?: MemoryLifecycleTaskStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>resources?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntime`

Memory Runtime interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntime } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryRuntime {
    service: MemoryApplicationService;
    provider: MemoryManagementProvider;
    profile: MemoryProfileSpec;
    providerSpec: MemoryManagementProviderSpec;
    profileHash: string;
    capabilities: MemoryManagementCapabilities;
    compositionReceipt: MemoryRuntimeCompositionReceipt;
    resources?: unknown;
    close(): Promise<void>;
    telemetry?: MemoryProviderTelemetry;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: MemoryManagementCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `compositionReceipt` | property | <code>compositionReceipt: MemoryRuntimeCompositionReceipt</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: MemoryManagementProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerSpec` | property | <code>providerSpec: MemoryManagementProviderSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resources` | property | <code>resources?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `service` | property | <code>service: MemoryApplicationService</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `telemetry` | property | <code>telemetry?: MemoryProviderTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeCompositionReceipt`

Memory Runtime Composition Receipt interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeCompositionReceipt } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryRuntimeCompositionReceipt {
    runtimeId: string;
    serviceInstanceId: string;
    serviceContract: '@codesoul-co/hypha-memory.MemoryApplicationService';
    activeProfileId: string;
    providerId: string;
    providerSpecId: string;
    configHash: string;
    profileHash: string;
    resolvedDependencyRefs: string[];
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeProfileId` | property | <code>activeProfileId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `configHash` | property | <code>configHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileHash` | property | <code>profileHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerSpecId` | property | <code>providerSpecId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolvedDependencyRefs` | property | <code>resolvedDependencyRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serviceContract` | property | <code>serviceContract: "@codesoul-co/hypha-memory.MemoryApplicationService"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `serviceInstanceId` | property | <code>serviceInstanceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeConfig`

Memory Runtime Config interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeConfig } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryRuntimeConfig {
    activeProfile: string;
    profiles: Record<string, MemoryRuntimeProfile>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeProfile` | property | <code>activeProfile: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profiles` | property | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeFactoryOptions`

Memory Runtime Factory Options interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeFactoryOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryRuntimeFactoryOptions {
    registry: MemoryManagementProviderRegistry;
    activities: DefaultMemoryActivityPortOptions;
    eventContext: (request: MemoryRuntimeRequestContext) => MemoryEventContext;
    contextBuilder?: MemoryContextBuilder;
    contextGateway?: ContextInjectionGateway;
    reconciliationStore?: MemoryLifecycleTaskStore;
    telemetry?: MemoryProviderTelemetry;
    operationalMetrics?: MemoryOperationalMetrics;
    providerCostEstimator?: MemoryProviderCostEstimator;
    searchCache?: MemoryRuntimeSearchCacheOptions;
    projectionInvalidation?: MemoryProjectionInvalidationPort;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activities` | property | <code>activities: DefaultMemoryActivityPortOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextBuilder` | property | <code>contextBuilder?: MemoryContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextGateway` | property | <code>contextGateway?: ContextInjectionGateway</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventContext` | method | <code>eventContext(request: MemoryRuntimeRequestContext): MemoryEventContext</code> | Public method; parameters and return type are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `operationalMetrics` | property | <code>operationalMetrics?: MemoryOperationalMetrics</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `projectionInvalidation` | property | <code>projectionInvalidation?: MemoryProjectionInvalidationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerCostEstimator` | method | <code>providerCostEstimator?(operation: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperation, request: unknown): import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/provider-observability").MemoryProviderOperationEstimate</code> | Public method; parameters and return type are shown in the signature. |
| `reconciliationStore` | property | <code>reconciliationStore?: MemoryLifecycleTaskStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `registry` | property | <code>registry: MemoryManagementProviderRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `searchCache` | property | <code>searchCache?: MemoryRuntimeSearchCacheOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `telemetry` | property | <code>telemetry?: MemoryProviderTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeProfile`

Memory Runtime Profile interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryRuntimeProfile } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export interface MemoryRuntimeProfile {
    profile: MemoryProfileSpec;
    management: MemoryManagementProviderSpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `management` | property | <code>management: MemoryManagementProviderSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: MemoryProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryRuntimeSearchCacheOptions`

Public type alias for Memory Runtime Search Cache Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryRuntimeSearchCacheOptions } from '@codesoul-co/hypha-memory';`
- Source module: [`memory-runtime-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-factory.ts)

### Declaration

```text
export type MemoryRuntimeSearchCacheOptions = Omit<CachedMemoryManagementProviderOptions, 'provider' | 'providerRevision' | 'requiredScopeFields' | 'cacheAuthorization' | 'requireCacheAuthorization'>;
```
