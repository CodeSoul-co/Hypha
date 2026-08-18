# `@codesoul-co/hypha-adapters-local` / `local-process-result`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/local-process-result.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)
- Exports: **3**

## Using this module

Use the Local process result module for using the public contracts and operations for this capability boundary. It exports 1 function, 2 interfaces.

### Import from the package entrypoint

```ts
import {
  buildLocalProcessResult,
} from '@codesoul-co/hypha-adapters-local';

import type {
  BuildLocalProcessResultInput,
  LocalProcessOutputArtifactRefs,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 2 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildLocalProcessResult` | function | <code>buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult</code> | Build Local Process Result function with 1 public call signature; parameters and return types are listed below. |
| `BuildLocalProcessResultInput` | interface | <code>interface BuildLocalProcessResultInput</code> | Build Local Process Result Input interface with 7 public fields or methods. |
| `LocalProcessOutputArtifactRefs` | interface | <code>interface LocalProcessOutputArtifactRefs</code> | Local Process Output Artifact Refs interface with 2 public fields or methods. |

## `buildLocalProcessResult`

Build Local Process Result function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { buildLocalProcessResult } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-result`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)

### Declaration

```text
export declare function buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult;
```

### Call signature

```text
buildLocalProcessResult(input: BuildLocalProcessResultInput): CommandExecutionResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>BuildLocalProcessResultInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `CommandExecutionResult`
- Description: The return contract is defined by the type shown above.

## `BuildLocalProcessResultInput`

Build Local Process Result Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { BuildLocalProcessResultInput } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-result`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)

### Declaration

```text
export interface BuildLocalProcessResultInput {
    providerId: string;
    request: CommandExecutionRequest;
    executionId: string;
    processResult: LocalProcessRunResult;
    changedFiles: FileMutation[];
    resourceAccountant: LocalProcessResourceAccountant;
    outputArtifacts?: LocalProcessOutputArtifactRefs;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `changedFiles` | property | <code>changedFiles: FileMutation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputArtifacts` | property | <code>outputArtifacts?: LocalProcessOutputArtifactRefs</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processResult` | property | <code>processResult: LocalProcessRunResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `request` | property | <code>request: CommandExecutionRequest</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resourceAccountant` | property | <code>resourceAccountant: LocalProcessResourceAccountant</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalProcessOutputArtifactRefs`

Local Process Output Artifact Refs interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { LocalProcessOutputArtifactRefs } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`local-process-result`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-result.ts)

### Declaration

```text
export interface LocalProcessOutputArtifactRefs {
    stdout?: string;
    stderr?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `stderr` | property | <code>stderr?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stdout` | property | <code>stdout?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
