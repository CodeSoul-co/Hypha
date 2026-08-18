# `@codesoul-co/hypha-adapters-local` / `docker-sandbox-provider-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/docker-sandbox-provider-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)
- Exports: **3**

## Using this module

Use the Docker sandbox provider factory module for binding external or local providers to Hypha ports. It exports 1 class, 1 constant, 1 interface.

### Import from the package entrypoint

```ts
import {
  DockerSandboxProviderFactory,
  DOCKER_SANDBOX_PROVIDER_ID,
} from '@codesoul-co/hypha-adapters-local';

import type {
  DockerSandboxProviderFactoryOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The 1 constant/enum export provides stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DockerSandboxProviderFactory` | class | <code>new DockerSandboxProviderFactory(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry. |
| `DOCKER_SANDBOX_PROVIDER_ID` | constant | <code>const DOCKER_SANDBOX_PROVIDER_ID: "provider.docker"</code> | DOCKER SANDBOX PROVIDER ID constant exported by the `docker-sandbox-provider-factory` module. |
| `DockerSandboxProviderFactoryOptions` | interface | <code>interface DockerSandboxProviderFactoryOptions</code> | Docker Sandbox Provider Factory Options interface with 6 public fields or methods. |

## `DockerSandboxProviderFactory`

Composition adapter for the accepted Docker Provider. Registration remains explicit: callers add this factory to the Core SandboxProviderRegistry.

- Kind: class
- Import: `import { DockerSandboxProviderFactory } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`docker-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)

### Declaration

```text
export declare class DockerSandboxProviderFactory implements SandboxProviderFactory {
    readonly providerType: "docker";
    readonly providerId: string;
    constructor(options: DockerSandboxProviderFactoryOptions);
    create(): SandboxProvider;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DockerSandboxProviderFactoryOptions): DockerSandboxProviderFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): SandboxProvider</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerType` | property | <code>readonly providerType: "docker"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DOCKER_SANDBOX_PROVIDER_ID`

DOCKER SANDBOX PROVIDER ID constant exported by the `docker-sandbox-provider-factory` module.

- Kind: constant
- Import: `import { DOCKER_SANDBOX_PROVIDER_ID } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`docker-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)

### Declaration

```text
export declare const DOCKER_SANDBOX_PROVIDER_ID: "provider.docker";
```

## `DockerSandboxProviderFactoryOptions`

Docker Sandbox Provider Factory Options interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { DockerSandboxProviderFactoryOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`docker-sandbox-provider-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/docker-sandbox-provider-factory.ts)

### Declaration

```text
export interface DockerSandboxProviderFactoryOptions {
    engineScopeId: string;
    policy: DockerExecutionPolicyResolverOptions;
    outputArtifacts: DockerExecutionArtifactStreamPort;
    providerId?: string;
    dockerPath?: string;
    transport?: DockerCommandTransport;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dockerPath` | property | <code>dockerPath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `engineScopeId` | property | <code>engineScopeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputArtifacts` | property | <code>outputArtifacts: DockerExecutionArtifactStreamPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy: DockerExecutionPolicyResolverOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transport` | property | <code>transport?: DockerCommandTransport</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
