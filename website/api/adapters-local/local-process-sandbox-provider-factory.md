# `@codesoul-co/hypha-adapters-local` / `local-process-sandbox-provider-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)
- Exports: **3**

## Using this module

Use the Local process sandbox provider factory module for binding external or local providers to Hypha ports. It exports 1 class, 1 constant, 1 type.

### Import from the package entrypoint

```ts
import {
  LocalProcessSandboxProviderFactory,
  LOCAL_PROCESS_SANDBOX_PROVIDER_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  LocalProcessSandboxProviderFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessSandboxProviderFactory` | class | <code>new LocalProcessSandboxProviderFactory(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands. |
| `LOCAL_PROCESS_SANDBOX_PROVIDER_ID` | constant | <code>const LOCAL_PROCESS_SANDBOX_PROVIDER_ID: "provider.local-process"</code> | LOCAL PROCESS SANDBOX PROVIDER ID constant exported by the `local-process-sandbox-provider-factory` module. |
| `LocalProcessSandboxProviderFactoryOptions` | type | <code>type LocalProcessSandboxProviderFactoryOptions = Omit&lt;LocalProcessExecutionProviderOptions, 'id'&gt; &amp; { providerId?: string; createWorkspaceRoot?: boolean; }</code> | Public type alias for Local Process Sandbox Provider Factory Options; the declaration contains its complete type expression. |

## `LocalProcessSandboxProviderFactory`

Composition adapter for the trusted-development Local Process Provider. Registration is explicit. The optional root creation is limited to the configured Workspace boundary; the Provider still resolves and validates the real path and executable identities before running commands.

- Kind: class
- Import: `import { LocalProcessSandboxProviderFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)

### Declaration

```text
export declare class LocalProcessSandboxProviderFactory implements SandboxProviderFactory {
    readonly providerType: "local_process";
    readonly providerId: string;
    constructor(options: LocalProcessSandboxProviderFactoryOptions);
    create(): Promise<SandboxProvider>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalProcessSandboxProviderFactoryOptions): LocalProcessSandboxProviderFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): Promise&lt;SandboxProvider&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerType` | property | <code>readonly providerType: "local_process"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LOCAL_PROCESS_SANDBOX_PROVIDER_ID`

LOCAL PROCESS SANDBOX PROVIDER ID constant exported by the `local-process-sandbox-provider-factory` module.

- Kind: constant
- Import: `import { LOCAL_PROCESS_SANDBOX_PROVIDER_ID } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)

### Declaration

```text
export declare const LOCAL_PROCESS_SANDBOX_PROVIDER_ID: "provider.local-process";
```

## `LocalProcessSandboxProviderFactoryOptions`

Public type alias for Local Process Sandbox Provider Factory Options; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { LocalProcessSandboxProviderFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-sandbox-provider-factory.ts)

### Declaration

```text
export type LocalProcessSandboxProviderFactoryOptions = Omit<LocalProcessExecutionProviderOptions, 'id'> & {
    providerId?: string;
    createWorkspaceRoot?: boolean;
};
```
