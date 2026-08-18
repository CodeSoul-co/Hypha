# `@codesoul-co/hypha-core` / `contracts/execution-output`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/execution-output.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)
- Exports: **11**

## Using this module

Use the Execution output module for declaring and runtime-validating contracts. It exports 9 interfaces, 2 types.

### Import from the package entrypoint

```ts
import type {
  CollectedExecutionOutput,
  ExecutionOutputArtifactManager,
  ExecutionOutputCollectionContext,
  ExecutionOutputCollectionItem,
  ExecutionOutputCollectionPlan,
  ExecutionOutputCollectionPolicy,
  ExecutionOutputCollectionResult,
  ExecutionOutputCollector,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CollectedExecutionOutput` | interface | <code>interface CollectedExecutionOutput</code> | Collected Execution Output interface with 6 public fields or methods. |
| `ExecutionOutputArtifactManager` | interface | <code>interface ExecutionOutputArtifactManager</code> | Minimal Artifact Manager port required by output collection. |
| `ExecutionOutputCollectionContext` | interface | <code>interface ExecutionOutputCollectionContext</code> | Identity and Artifact policy context supplied by the Execution composition root. |
| `ExecutionOutputCollectionItem` | interface | <code>interface ExecutionOutputCollectionItem</code> | A bounded, content-addressed file that may be handed to Artifact collection. |
| `ExecutionOutputCollectionPlan` | interface | <code>interface ExecutionOutputCollectionPlan</code> | Deterministic output of policy evaluation; creating Artifact records is a later side effect. |
| `ExecutionOutputCollectionPolicy` | interface | <code>interface ExecutionOutputCollectionPolicy</code> | Framework-level rules for collecting files produced by an Execution. |
| `ExecutionOutputCollectionResult` | interface | <code>interface ExecutionOutputCollectionResult</code> | Execution Output Collection Result interface with 5 public fields or methods. |
| `ExecutionOutputCollector` | interface | <code>interface ExecutionOutputCollector</code> | Execution Output Collector interface with 1 public fields or methods. |
| `ExecutionOutputPlanner` | interface | <code>interface ExecutionOutputPlanner</code> | Execution Output Planner interface with 1 public fields or methods. |
| `ExecutionOutputSkipReason` | type | <code>type ExecutionOutputSkipReason = 'not_included' &#124; 'excluded' &#124; 'unsupported_mutation' &#124; 'missing_integrity_evidence' &#124; 'artifact_limit' &#124; 'byte_limit'</code> | Public type alias for Execution Output Skip Reason; the declaration contains its complete type expression. |
| `ExecutionOutputTerminalStatus` | type | <code>type ExecutionOutputTerminalStatus = Exclude&lt;CommandExecutionStatus, 'queued' &#124; 'starting' &#124; 'running' &#124; 'cancelling'&gt;</code> | Public type alias for Execution Output Terminal Status; the declaration contains its complete type expression. |

## `CollectedExecutionOutput`

Collected Execution Output interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { CollectedExecutionOutput } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface CollectedExecutionOutput {
    relativePath: string;
    artifactRef: string;
    versionId: string;
    contentHash: string;
    sizeBytes: number;
    status: ArtifactStatus;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: ArtifactStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOutputArtifactManager`

Minimal Artifact Manager port required by output collection.

- Kind: interface
- Import: `import type { ExecutionOutputArtifactManager } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputArtifactManager {
    createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise<ArtifactRecord>;
    finalize(request: ArtifactFinalizeRequest): Promise<ArtifactRecord>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createFromWorkspace` | method | <code>createFromWorkspace(request: ArtifactFromWorkspaceRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `finalize` | method | <code>finalize(request: ArtifactFinalizeRequest): Promise&lt;ArtifactRecord&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionOutputCollectionContext`

Identity and Artifact policy context supplied by the Execution composition root.

- Kind: interface
- Import: `import type { ExecutionOutputCollectionContext } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputCollectionContext {
    operationId: string;
    principal: ExecutionPrincipal;
    profileRef: SpecRef;
    userId: string;
    tenantId?: string;
    workspaceId: string;
    sessionId?: string;
    runId?: string;
    agentId?: string;
    idempotencyKeyPrefix?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKeyPrefix` | property | <code>idempotencyKeyPrefix?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOutputCollectionItem`

A bounded, content-addressed file that may be handed to Artifact collection.

- Kind: interface
- Import: `import type { ExecutionOutputCollectionItem } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputCollectionItem {
    relativePath: string;
    contentHash: string;
    sizeBytes: number;
    kind: ArtifactKind;
    mimeType?: string;
    existingArtifactRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `existingArtifactRef` | property | <code>existingArtifactRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: ArtifactKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mimeType` | property | <code>mimeType?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relativePath` | property | <code>relativePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOutputCollectionPlan`

Deterministic output of policy evaluation; creating Artifact records is a later side effect.

- Kind: interface
- Import: `import type { ExecutionOutputCollectionPlan } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputCollectionPlan {
    executionId: string;
    status: ExecutionOutputTerminalStatus;
    items: ExecutionOutputCollectionItem[];
    existingArtifactRefs: string[];
    totalBytes: number;
    finalize: boolean;
    skipped: Record<ExecutionOutputSkipReason, number>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `existingArtifactRefs` | property | <code>existingArtifactRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalize` | property | <code>finalize: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `items` | property | <code>items: ExecutionOutputCollectionItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skipped` | property | <code>skipped: Record&lt;ExecutionOutputSkipReason, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: ExecutionOutputTerminalStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOutputCollectionPolicy`

Framework-level rules for collecting files produced by an Execution.

- Kind: interface
- Import: `import type { ExecutionOutputCollectionPolicy } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputCollectionPolicy {
    includePatterns?: string[];
    excludePatterns?: string[];
    maxArtifacts?: number;
    maxTotalBytes?: number;
    classifyByExtension?: boolean;
    finalizeOnSuccess?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `classifyByExtension` | property | <code>classifyByExtension?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `excludePatterns` | property | <code>excludePatterns?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalizeOnSuccess` | property | <code>finalizeOnSuccess?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includePatterns` | property | <code>includePatterns?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxArtifacts` | property | <code>maxArtifacts?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalBytes` | property | <code>maxTotalBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOutputCollectionResult`

Execution Output Collection Result interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionOutputCollectionResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputCollectionResult {
    executionId: string;
    collected: CollectedExecutionOutput[];
    existingArtifactRefs: string[];
    artifactRefs: string[];
    finalizedArtifactRefs: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `collected` | property | <code>collected: CollectedExecutionOutput[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionId` | property | <code>executionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `existingArtifactRefs` | property | <code>existingArtifactRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalizedArtifactRefs` | property | <code>finalizedArtifactRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExecutionOutputCollector`

Execution Output Collector interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionOutputCollector } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputCollector {
    collect(plan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise<ExecutionOutputCollectionResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(plan: ExecutionOutputCollectionPlan, context: ExecutionOutputCollectionContext): Promise&lt;ExecutionOutputCollectionResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionOutputPlanner`

Execution Output Planner interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ExecutionOutputPlanner } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export interface ExecutionOutputPlanner {
    plan(result: CommandExecutionResult, policy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `plan` | method | <code>plan(result: CommandExecutionResult, policy: ExecutionOutputCollectionPolicy): ExecutionOutputCollectionPlan</code> | Public method; parameters and return type are shown in the signature. |

## `ExecutionOutputSkipReason`

Public type alias for Execution Output Skip Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionOutputSkipReason } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export type ExecutionOutputSkipReason = 'not_included' | 'excluded' | 'unsupported_mutation' | 'missing_integrity_evidence' | 'artifact_limit' | 'byte_limit';
```

## `ExecutionOutputTerminalStatus`

Public type alias for Execution Output Terminal Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ExecutionOutputTerminalStatus } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/execution-output`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/execution-output.ts)

### Declaration

```text
export type ExecutionOutputTerminalStatus = Exclude<CommandExecutionStatus, 'queued' | 'starting' | 'running' | 'cancelling'>;
```
