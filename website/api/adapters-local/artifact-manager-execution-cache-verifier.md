# `@codesoul-co/hypha-adapters-local` / `artifact-manager-execution-cache-verifier`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-execution-cache-verifier.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerExecutionCacheVerifier` | class | <code>new ArtifactManagerExecutionCacheVerifier(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks. |
| `ArtifactManagerExecutionCacheVerifierOptions` | interface | <code>interface ArtifactManagerExecutionCacheVerifierOptions</code> | Field contract for Artifact Manager Execution Cache Verifier Options; see all contract members below. |

## `ArtifactManagerExecutionCacheVerifier` public members

Revalidates every cached Artifact through the governed ArtifactManager before an Execution cache hit is reused. Reading the complete stream deliberately completes the Store's verify-on-read digest and immutable-version checks.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactManagerExecutionCacheVerifierOptions): ArtifactManagerExecutionCacheVerifier</code> | Creates an instance of this class. |
| `verify` | method | <code>verify(rawScope: ExecutionCacheScope, rawArtifacts: ExecutionCacheArtifactReference[]): Promise&lt;boolean&gt;</code> | Public runtime operation for verify. |

## `ArtifactManagerExecutionCacheVerifierOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "read"&gt;</code> | Public manager property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `resolvePrincipal` | method | <code>resolvePrincipal(scope: ExecutionCacheScope): ExecutionPrincipal &#124; Promise&lt;ExecutionPrincipal&gt;</code> | Resolves Principal at this module boundary. |
