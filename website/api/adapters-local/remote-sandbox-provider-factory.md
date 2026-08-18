# `@codesoul-co/hypha-adapters-local` / `remote-sandbox-provider-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/remote-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)
- Exports: **3**

## Using this module

Use the Remote sandbox provider factory module for binding external or local providers to Hypha ports. It exports 1 class, 1 constant, 1 interface.

### Import from the package entrypoint

```ts
import {
  RemoteSandboxProviderFactory,
  REMOTE_SANDBOX_PROVIDER_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  RemoteSandboxProviderFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RemoteSandboxProviderFactory` | class | <code>new RemoteSandboxProviderFactory(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory. |
| `REMOTE_SANDBOX_PROVIDER_ID` | constant | <code>const REMOTE_SANDBOX_PROVIDER_ID: "provider.remote-sandbox"</code> | REMOTE SANDBOX PROVIDER ID constant exported by the `remote-sandbox-provider-factory` module. |
| `RemoteSandboxProviderFactoryOptions` | interface | <code>interface RemoteSandboxProviderFactoryOptions extends Omit&lt;RemoteSandboxHttpTransportOptions, 'baseUrl'&gt;</code> | Remote Sandbox Provider Factory Options interface with 10 public fields or methods. |

## `RemoteSandboxProviderFactory`

Explicit composition boundary for a remote Sandbox deployment. Credentials remain late-bound through the transport credentialProvider so rotation does not require rebuilding the registry or retaining a token in the Factory.

- Kind: class
- Import: `import { RemoteSandboxProviderFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`remote-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)

### Declaration

```text
export declare class RemoteSandboxProviderFactory implements SandboxProviderFactory {
    readonly providerType: "remote_sandbox";
    readonly providerId: string;
    constructor(options: RemoteSandboxProviderFactoryOptions);
    create(): SandboxProvider;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: RemoteSandboxProviderFactoryOptions): RemoteSandboxProviderFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): SandboxProvider</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerType` | property | <code>readonly providerType: "remote_sandbox"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `REMOTE_SANDBOX_PROVIDER_ID`

REMOTE SANDBOX PROVIDER ID constant exported by the `remote-sandbox-provider-factory` module.

- Kind: constant
- Import: `import { REMOTE_SANDBOX_PROVIDER_ID } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`remote-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)

### Declaration

```text
export declare const REMOTE_SANDBOX_PROVIDER_ID: "provider.remote-sandbox";
```

## `RemoteSandboxProviderFactoryOptions`

Remote Sandbox Provider Factory Options interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { RemoteSandboxProviderFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`remote-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/remote-sandbox-provider-factory.ts)

### Declaration

```text
export interface RemoteSandboxProviderFactoryOptions extends Omit<RemoteSandboxHttpTransportOptions, 'baseUrl'> {
    baseUrl: string;
    providerId?: string;
    transport?: RemoteSandboxTransport;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseUrl` | property | <code>baseUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `credentialProvider` | method | <code>credentialProvider(): Promise&lt;RemoteSandboxHttpCredential&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fetch` | method | <code>fetch?(url: string, request: RemoteSandboxHttpRequest): Promise&lt;RemoteSandboxHttpResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `maxCredentialTtlMs` | property | <code>maxCredentialTtlMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxNdjsonLineCharacters` | property | <code>maxNdjsonLineCharacters?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minCredentialRemainingMs` | property | <code>minCredentialRemainingMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): number</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requestTimeoutMs` | property | <code>requestTimeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transport` | property | <code>transport?: RemoteSandboxTransport</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
