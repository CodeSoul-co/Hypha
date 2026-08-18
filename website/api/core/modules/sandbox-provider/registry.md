# `@codesoul-co/hypha-core` / `modules/sandbox-provider/registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/sandbox-provider/registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)
- Exports: **2**

## Using this module

Use the Registry module for binding external or local providers to Hypha ports. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  SandboxProviderRegistry,
} from '@codesoul-co/hypha-core';

import type {
  SandboxProviderRegistration,
} from '@codesoul-co/hypha-core';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SandboxProviderRegistry` | class | <code>new SandboxProviderRegistry(): SandboxProviderRegistry</code> | Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core. |
| `SandboxProviderRegistration` | interface | <code>interface SandboxProviderRegistration</code> | Sandbox Provider Registration interface with 2 public fields or methods. |

## `SandboxProviderRegistry`

Provider-neutral DI registry. It selects only from explicit Environment fields and never imports a concrete adapter into core.

- Kind: class
- Import: `import { SandboxProviderRegistry } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)

### Declaration

```text
export declare class SandboxProviderRegistry {
    register(factory: SandboxProviderFactory): void;
    unregister(providerType: SandboxProviderType, providerId: string): boolean;
    list(providerType?: SandboxProviderType): SandboxProviderRegistration[];
    resolve(selection: SandboxProviderSelection): SandboxProviderFactory;
    create(selection: SandboxProviderSelection): Promise<SandboxProvider>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): SandboxProviderRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(selection: SandboxProviderSelection): Promise&lt;SandboxProvider&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(providerType?: SandboxProviderType): SandboxProviderRegistration[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(factory: SandboxProviderFactory): void</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(selection: SandboxProviderSelection): SandboxProviderFactory</code> | Public method; parameters and return type are shown in the signature. |
| `unregister` | method | <code>unregister(providerType: SandboxProviderType, providerId: string): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `SandboxProviderRegistration`

Sandbox Provider Registration interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SandboxProviderRegistration } from '@codesoul-co/hypha-core';`
- Source module: [`modules/sandbox-provider/registry`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/registry.ts)

### Declaration

```text
export interface SandboxProviderRegistration {
    providerType: SandboxProviderType;
    providerId: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerType` | property | <code>providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
