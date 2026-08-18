# `@codesoul-co/hypha-core` / `contracts/sandbox-provider`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)
- Exports: **9**

## Using this module

Use the Sandbox provider module for declaring and runtime-validating contracts. It exports 6 interfaces, 3 types.

### Import from the package entrypoint

```ts
import type {
  SandboxCapabilityDerivationInput,
  SandboxCapabilityNegotiationRequest,
  SandboxCapabilityNegotiationResult,
  SandboxCapabilityRequirement,
  SandboxProvider,
  SandboxProviderFactory,
  SandboxCapabilityName,
  SandboxProviderSelection,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SandboxCapabilityDerivationInput` | interface | <code>interface SandboxCapabilityDerivationInput</code> | Sandbox Capability Derivation Input interface with 3 public fields or methods. |
| `SandboxCapabilityNegotiationRequest` | interface | <code>interface SandboxCapabilityNegotiationRequest</code> | Sandbox Capability Negotiation Request interface with 4 public fields or methods. |
| `SandboxCapabilityNegotiationResult` | interface | <code>interface SandboxCapabilityNegotiationResult</code> | Sandbox Capability Negotiation Result interface with 6 public fields or methods. |
| `SandboxCapabilityRequirement` | interface | <code>interface SandboxCapabilityRequirement</code> | Sandbox Capability Requirement interface with 3 public fields or methods. |
| `SandboxProvider` | interface | <code>interface SandboxProvider</code> | Sandbox Provider interface with 11 public fields or methods. |
| `SandboxProviderFactory` | interface | <code>interface SandboxProviderFactory</code> | Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id. |
| `SandboxCapabilityName` | type | <code>type SandboxCapabilityName = keyof SandboxProviderCapabilities</code> | Public type alias for Sandbox Capability Name; the declaration contains its complete type expression. |
| `SandboxProviderSelection` | type | <code>type SandboxProviderSelection = Pick&lt;ExecutionEnvironmentSpec, 'provider' &#124; 'providerRef'&gt;</code> | Public type alias for Sandbox Provider Selection; the declaration contains its complete type expression. |
| `SandboxProviderType` | type | <code>type SandboxProviderType = ExecutionEnvironmentSpec['provider']</code> | Public type alias for Sandbox Provider Type; the declaration contains its complete type expression. |

## `SandboxCapabilityDerivationInput`

Sandbox Capability Derivation Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SandboxCapabilityDerivationInput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export interface SandboxCapabilityDerivationInput {
    environment: ExecutionEnvironmentSpec;
    command?: Pick<CommandExecutionRequest, 'snapshotBefore' | 'snapshotAfter' | 'snapshotOnFailure'>;
    additionalRequirements?: SandboxCapabilityRequirement[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `additionalRequirements` | property | <code>additionalRequirements?: SandboxCapabilityRequirement[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `command` | property | <code>command?: Pick&lt;CommandExecutionRequest, "snapshotBefore" &#124; "snapshotAfter" &#124; "snapshotOnFailure"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxCapabilityNegotiationRequest`

Sandbox Capability Negotiation Request interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { SandboxCapabilityNegotiationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export interface SandboxCapabilityNegotiationRequest {
    providerId: string;
    capabilities: SandboxProviderCapabilities;
    requirements: SandboxCapabilityRequirement[];
    evaluatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: SandboxProviderCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requirements` | property | <code>requirements: SandboxCapabilityRequirement[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxCapabilityNegotiationResult`

Sandbox Capability Negotiation Result interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SandboxCapabilityNegotiationResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export interface SandboxCapabilityNegotiationResult {
    providerId: string;
    compatible: boolean;
    capabilities: SandboxProviderCapabilities;
    requirements: SandboxCapabilityRequirement[];
    missingCapabilities: SandboxCapabilityName[];
    evaluatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: SandboxProviderCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compatible` | property | <code>compatible: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingCapabilities` | property | <code>missingCapabilities: (keyof SandboxProviderCapabilities)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requirements` | property | <code>requirements: SandboxCapabilityRequirement[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxCapabilityRequirement`

Sandbox Capability Requirement interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SandboxCapabilityRequirement } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export interface SandboxCapabilityRequirement {
    capability: SandboxCapabilityName;
    source: 'environment' | 'command' | 'policy' | 'runtime';
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capability` | property | <code>capability: keyof SandboxProviderCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "policy" &#124; "environment" &#124; "command" &#124; "runtime"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxProvider`

Sandbox Provider interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { SandboxProvider } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export interface SandboxProvider {
    readonly id: string;
    capabilities(): Promise<SandboxProviderCapabilities>;
    create(request: SandboxCreateRequest): Promise<SandboxRecord>;
    start(request: SandboxStartRequest): Promise<SandboxRecord>;
    execute(request: CommandExecutionRequest): Promise<CommandExecutionResult>;
    cancel(request: ExecutionCancelRequest): Promise<void>;
    terminate(request: SandboxTerminateRequest): Promise<void>;
    status(request: SandboxStatusRequest): Promise<SandboxRecord | null>;
    cleanup(request: SandboxCleanupRequest): Promise<void>;
    health(): Promise<ProviderHealth>;
    close?(): Promise<void>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `capabilities` | method | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cleanup` | method | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `close` | method | <code>close?(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `create` | method | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `start` | method | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `status` | method | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `terminate` | method | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SandboxProviderFactory`

Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id.

- Kind: interface
- Import: `import type { SandboxProviderFactory } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export interface SandboxProviderFactory {
    readonly providerType: SandboxProviderType;
    readonly providerId: string;
    create(): SandboxProvider | Promise<SandboxProvider>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(): SandboxProvider &#124; Promise&lt;SandboxProvider&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `providerId` | property | <code>readonly providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerType` | property | <code>readonly providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SandboxCapabilityName`

Public type alias for Sandbox Capability Name; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SandboxCapabilityName } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export type SandboxCapabilityName = keyof SandboxProviderCapabilities;
```

## `SandboxProviderSelection`

Public type alias for Sandbox Provider Selection; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SandboxProviderSelection } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export type SandboxProviderSelection = Pick<ExecutionEnvironmentSpec, 'provider' | 'providerRef'>;
```

## `SandboxProviderType`

Public type alias for Sandbox Provider Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SandboxProviderType } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/sandbox-provider`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)

### Declaration

```text
export type SandboxProviderType = ExecutionEnvironmentSpec['provider'];
```
