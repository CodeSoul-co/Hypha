# `@codesoul-co/hypha-core` / `contracts/artifact-retention`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/contracts/artifact-retention.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)
- Exports: **9**

## Using this module

Use the Artifact retention module for declaring and runtime-validating contracts. It exports 7 interfaces, 2 types.

### Import from the package entrypoint

```ts
import type {
  ArtifactRetentionDecision,
  ArtifactRetentionEvaluationRequest,
  ArtifactRetentionEvaluator,
  ArtifactRetentionProcessor,
  ArtifactRetentionProcessRequest,
  ArtifactRetentionProcessResult,
  DefaultArtifactRetentionProcessorOptions,
  ArtifactRetentionAction,
} from '@codesoul-co/hypha-core';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactRetentionDecision` | interface | <code>interface ArtifactRetentionDecision</code> | Artifact Retention Decision interface with 3 public fields or methods. |
| `ArtifactRetentionEvaluationRequest` | interface | <code>interface ArtifactRetentionEvaluationRequest</code> | Artifact Retention Evaluation Request interface with 3 public fields or methods. |
| `ArtifactRetentionEvaluator` | interface | <code>interface ArtifactRetentionEvaluator</code> | Artifact Retention Evaluator interface with 1 public fields or methods. |
| `ArtifactRetentionProcessor` | interface | <code>interface ArtifactRetentionProcessor</code> | Artifact Retention Processor interface with 1 public fields or methods. |
| `ArtifactRetentionProcessRequest` | interface | <code>interface ArtifactRetentionProcessRequest</code> | Artifact Retention Process Request interface with 6 public fields or methods. |
| `ArtifactRetentionProcessResult` | interface | <code>interface ArtifactRetentionProcessResult</code> | Artifact Retention Process Result interface with 7 public fields or methods. |
| `DefaultArtifactRetentionProcessorOptions` | interface | <code>interface DefaultArtifactRetentionProcessorOptions</code> | Default Artifact Retention Processor Options interface with 4 public fields or methods. |
| `ArtifactRetentionAction` | type | <code>type ArtifactRetentionAction = 'retain' &#124; 'archive' &#124; 'delete'</code> | Public type alias for Artifact Retention Action; the declaration contains its complete type expression. |
| `ArtifactRetentionDecisionReason` | type | <code>type ArtifactRetentionDecisionReason = 'not_due' &#124; 'already_terminal' &#124; 'archive_after' &#124; 'delete_after' &#124; 'expired' &#124; 'legal_hold' &#124; 'referenced' &#124; 'retain_final' &#124; 'retain_failure'</code> | Public type alias for Artifact Retention Decision Reason; the declaration contains its complete type expression. |

## `ArtifactRetentionDecision`

Artifact Retention Decision interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionDecision } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface ArtifactRetentionDecision {
    action: ArtifactRetentionAction;
    reason: ArtifactRetentionDecisionReason;
    effectiveAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: ArtifactRetentionAction</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effectiveAt` | property | <code>effectiveAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: ArtifactRetentionDecisionReason</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRetentionEvaluationRequest`

Artifact Retention Evaluation Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionEvaluationRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface ArtifactRetentionEvaluationRequest {
    record: ArtifactRecord;
    profile: ArtifactProfileSpec;
    evaluatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ArtifactProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `record` | property | <code>record: ArtifactRecord</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRetentionEvaluator`

Artifact Retention Evaluator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionEvaluator } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface ArtifactRetentionEvaluator {
    evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(request: ArtifactRetentionEvaluationRequest): ArtifactRetentionDecision</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactRetentionProcessor`

Artifact Retention Processor interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionProcessor } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface ArtifactRetentionProcessor {
    process(request: ArtifactRetentionProcessRequest): Promise<ArtifactRetentionProcessResult>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `process` | method | <code>process(request: ArtifactRetentionProcessRequest): Promise&lt;ArtifactRetentionProcessResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ArtifactRetentionProcessRequest`

Artifact Retention Process Request interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionProcessRequest } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface ArtifactRetentionProcessRequest {
    operationId: string;
    principal: ExecutionPrincipal;
    artifactId: string;
    evaluatedAt?: string;
    dryRun?: boolean;
    idempotencyKey?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dryRun` | property | <code>dryRun?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluatedAt` | property | <code>evaluatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ExecutionPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRetentionProcessResult`

Artifact Retention Process Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ArtifactRetentionProcessResult } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface ArtifactRetentionProcessResult {
    artifactId: string;
    versionId: string;
    workspaceId: string;
    decision: ArtifactRetentionDecision;
    /** True when this invocation applied the retention mutation. */
    applied: boolean;
    /** True when the same idempotent mutation was committed by an earlier attempt. */
    replayed: boolean;
    dryRun: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `applied` | property | <code>applied: boolean</code> | True when this invocation applied the retention mutation. |
| `artifactId` | property | <code>artifactId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision: ArtifactRetentionDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dryRun` | property | <code>dryRun: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replayed` | property | <code>replayed: boolean</code> | True when the same idempotent mutation was committed by an earlier attempt. |
| `versionId` | property | <code>versionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DefaultArtifactRetentionProcessorOptions`

Default Artifact Retention Processor Options interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { DefaultArtifactRetentionProcessorOptions } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export interface DefaultArtifactRetentionProcessorOptions {
    manager: ArtifactManager;
    repository: ArtifactRecordRepository;
    evaluator?: ArtifactRetentionEvaluator;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluator` | property | <code>evaluator?: ArtifactRetentionEvaluator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `manager` | property | <code>manager: ArtifactManager</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `repository` | property | <code>repository: ArtifactRecordRepository</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ArtifactRetentionAction`

Public type alias for Artifact Retention Action; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactRetentionAction } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export type ArtifactRetentionAction = 'retain' | 'archive' | 'delete';
```

## `ArtifactRetentionDecisionReason`

Public type alias for Artifact Retention Decision Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ArtifactRetentionDecisionReason } from '@codesoul-co/hypha-core';`
- Source module: [`contracts/artifact-retention`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/artifact-retention.ts)

### Declaration

```text
export type ArtifactRetentionDecisionReason = 'not_due' | 'already_terminal' | 'archive_after' | 'delete_after' | 'expired' | 'legal_hold' | 'referenced' | 'retain_final' | 'retain_failure';
```
