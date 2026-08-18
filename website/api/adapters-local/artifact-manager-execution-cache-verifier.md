# `@codesoul-co/hypha-adapters-local` / `artifact-manager-execution-cache-verifier`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)
- Exports: **2**

## Using this module

Use the Artifact manager execution cache verifier module for executing runtime behavior at this boundary. It exports 1 class, 1 interface.

### Import from the package entrypoint

```ts
import {
  ArtifactManagerExecutionCacheVerifier,
} from '@codesoul-co/hypha-adapters-local';

import type {
  ArtifactManagerExecutionCacheVerifierOptions,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 1 type/interface export as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerExecutionCacheVerifier` | class | <code>new ArtifactManagerExecutionCacheVerifier(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks. |
| `ArtifactManagerExecutionCacheVerifierOptions` | interface | <code>interface ArtifactManagerExecutionCacheVerifierOptions</code> | Artifact Manager Execution Cache Verifier Options interface with 3 public fields or methods. |

## `ArtifactManagerExecutionCacheVerifier`

Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks.

- Kind: class
- Import: `import { ArtifactManagerExecutionCacheVerifier } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-manager-execution-cache-verifier`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)

### Declaration

```text
export declare class ArtifactManagerExecutionCacheVerifier implements ExecutionCacheArtifactVerifier {
    constructor(options: ArtifactManagerExecutionCacheVerifierOptions);
    verify(rawScope: ExecutionCacheScope, rawArtifacts: ExecutionCacheArtifactReference[]): Promise<boolean>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | Creates an instance of this class. |
| `verify` | method | <code>verify(rawScope: ExecutionCacheScope, rawArtifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactManagerExecutionCacheVerifierOptions`

Artifact Manager Execution Cache Verifier Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactManagerExecutionCacheVerifierOptions } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`artifact-manager-execution-cache-verifier`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)

### Declaration

```text
export interface ArtifactManagerExecutionCacheVerifierOptions {
    manager: Pick<ArtifactManager, 'read'>;
    resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal | Promise<ExecutionPrincipal>;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "read"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `resolvePrincipal` | method | <code>resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal &#124; Promise&lt;ExecutionPrincipal&gt;</code> | Public method; parameters and return type are shown in the signature. |
