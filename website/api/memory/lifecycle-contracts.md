# `@codesoul-co/hypha-memory` / `lifecycle-contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/lifecycle-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)
- Exports: **22**

## Using this module

Use the Lifecycle contracts module for declaring and runtime-validating contracts. It exports 20 interfaces, 2 types.

### Import from the package entrypoint

```ts
import type {
  EpisodicRecordInput,
  ExtractedMemoryCandidate,
  ExtractedMemoryEvidence,
  MemoryExtractionBatch,
  MemoryExtractionCursor,
  MemoryExtractionJob,
  MemoryExtractionProfileSpec,
  MemoryExtractionRequest,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 22 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EpisodicRecordInput` | interface | <code>interface EpisodicRecordInput</code> | Episodic Record Input interface with 14 public fields or methods. |
| `ExtractedMemoryCandidate` | interface | <code>interface ExtractedMemoryCandidate</code> | Extracted Memory Candidate interface with 20 public fields or methods. |
| `ExtractedMemoryEvidence` | interface | <code>interface ExtractedMemoryEvidence</code> | Extracted Memory Evidence interface with 4 public fields or methods. |
| `MemoryExtractionBatch` | interface | <code>interface MemoryExtractionBatch</code> | Memory Extraction Batch interface with 9 public fields or methods. |
| `MemoryExtractionCursor` | interface | <code>interface MemoryExtractionCursor</code> | Memory Extraction Cursor interface with 6 public fields or methods. |
| `MemoryExtractionJob` | interface | <code>interface MemoryExtractionJob</code> | Memory Extraction Job interface with 16 public fields or methods. |
| `MemoryExtractionProfileSpec` | interface | <code>interface MemoryExtractionProfileSpec</code> | Memory Extraction Profile Spec interface with 14 public fields or methods. |
| `MemoryExtractionRequest` | interface | <code>interface MemoryExtractionRequest</code> | Memory Extraction Request interface with 9 public fields or methods. |
| `MemoryExtractionSourceAdapter` | interface | <code>interface MemoryExtractionSourceAdapter</code> | Memory Extraction Source Adapter interface with 4 public fields or methods. |
| `MemoryExtractionSourceBatch` | interface | <code>interface MemoryExtractionSourceBatch</code> | Memory Extraction Source Batch interface with 3 public fields or methods. |
| `MemoryExtractionSourceRef` | interface | <code>interface MemoryExtractionSourceRef</code> | Memory Extraction Source Ref interface with 15 public fields or methods. |
| `MemoryExtractionStageSpec` | interface | <code>interface MemoryExtractionStageSpec</code> | Memory Extraction Stage Spec interface with 6 public fields or methods. |
| `MemoryExtractor` | interface | <code>interface MemoryExtractor</code> | Memory Extractor interface with 3 public fields or methods. |
| `MemoryMaintenanceApplyRequest` | interface | <code>interface MemoryMaintenanceApplyRequest</code> | Memory Maintenance Apply Request interface with 3 public fields or methods. |
| `MemoryMaintenanceDecision` | interface | <code>interface MemoryMaintenanceDecision</code> | Memory Maintenance Decision interface with 18 public fields or methods. |
| `MemoryMaintenancePlanner` | interface | <code>interface MemoryMaintenancePlanner</code> | Memory Maintenance Planner interface with 3 public fields or methods. |
| `MemoryMaintenancePlanRequest` | interface | <code>interface MemoryMaintenancePlanRequest</code> | Memory Maintenance Plan Request interface with 5 public fields or methods. |
| `MemoryMaintenancePolicySpec` | interface | <code>interface MemoryMaintenancePolicySpec</code> | Memory Maintenance Policy Spec interface with 8 public fields or methods. |
| `NormalizedExtractionInput` | interface | <code>interface NormalizedExtractionInput</code> | Normalized Extraction Input interface with 3 public fields or methods. |
| `TruthAssertion` | interface | <code>interface TruthAssertion</code> | Truth Assertion interface with 11 public fields or methods. |
| `MemoryExtractionSourceType` | type | <code>type MemoryExtractionSourceType = 'conversation' &#124; 'truth' &#124; 'episodic_record' &#124; 'runtime_event' &#124; 'tool_observation' &#124; 'artifact' &#124; 'structured_record' &#124; 'custom'</code> | Public type alias for Memory Extraction Source Type; the declaration contains its complete type expression. |
| `MemoryMaintenanceAction` | type | <code>type MemoryMaintenanceAction = 'create' &#124; 'noop' &#124; 'reuse' &#124; 'update' &#124; 'merge' &#124; 'supersede' &#124; 'invalidate' &#124; 'reject' &#124; 'require_review'</code> | Public type alias for Memory Maintenance Action; the declaration contains its complete type expression. |

## `EpisodicRecordInput`

Episodic Record Input interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { EpisodicRecordInput } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface EpisodicRecordInput {
    episodeId: string;
    title?: string;
    startAt: string;
    endAt?: string;
    actors?: string[];
    goal?: string;
    actions?: string[];
    observations?: string[];
    outcome?: unknown;
    success?: boolean;
    failureCode?: string;
    causalEventIds?: string[];
    artifactRefs?: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actions` | property | <code>actions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `actors` | property | <code>actors?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `causalEventIds` | property | <code>causalEventIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `endAt` | property | <code>endAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `episodeId` | property | <code>episodeId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `failureCode` | property | <code>failureCode?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `goal` | property | <code>goal?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observations` | property | <code>observations?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outcome` | property | <code>outcome?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startAt` | property | <code>startAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `success` | property | <code>success?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `title` | property | <code>title?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExtractedMemoryCandidate`

Extracted Memory Candidate interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { ExtractedMemoryCandidate } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface ExtractedMemoryCandidate {
    candidateId: string;
    type: ManagedMemoryType;
    content: unknown;
    canonicalText: string;
    summary?: string;
    confidence: number;
    importance?: number;
    canonicalKey?: string;
    subject?: string;
    predicate?: string;
    object?: unknown;
    temporal?: {
        observedAt?: string;
        validFrom?: string;
        validTo?: string;
        temporalConfidence?: number;
    };
    entities?: MemoryEntityRef[];
    relations?: MemoryRelation[];
    sensitive?: boolean;
    authority?: MemoryExtractionSourceRef['authority'];
    evidence: ExtractedMemoryEvidence[];
    extractionRationale?: string;
    extractionProfileRevision: string;
    sourceHash: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authority` | property | <code>authority?: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `candidateId` | property | <code>candidateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `canonicalKey` | property | <code>canonicalKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `canonicalText` | property | <code>canonicalText: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entities` | property | <code>entities?: MemoryEntityRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidence` | property | <code>evidence: ExtractedMemoryEvidence[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractionProfileRevision` | property | <code>extractionProfileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractionRationale` | property | <code>extractionRationale?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importance` | property | <code>importance?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `object` | property | <code>object?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `predicate` | property | <code>predicate?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relations` | property | <code>relations?: MemoryRelation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitive` | property | <code>sensitive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHash` | property | <code>sourceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subject` | property | <code>subject?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `temporal` | property | <code>temporal?: { observedAt?: string; validFrom?: string; validTo?: string; temporalConfidence?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: ManagedMemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ExtractedMemoryEvidence`

Extracted Memory Evidence interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ExtractedMemoryEvidence } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface ExtractedMemoryEvidence {
    sourceRef: MemoryExtractionSourceRef;
    sourceSpan?: {
        messageId?: string;
        eventId?: string;
        artifactRef?: string;
        start?: number;
        end?: number;
        quoteHash?: string;
    };
    supportType: 'direct' | 'derived' | 'contradicting';
    confidence?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRef` | property | <code>sourceRef: MemoryExtractionSourceRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceSpan` | property | <code>sourceSpan?: { messageId?: string; eventId?: string; artifactRef?: string; start?: number; end?: number; quoteHash?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supportType` | property | <code>supportType: "derived" &#124; "direct" &#124; "contradicting"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionBatch`

Memory Extraction Batch interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionBatch } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionBatch {
    id: string;
    jobId: string;
    sourceRefs: MemoryExtractionSourceRef[];
    candidates: ExtractedMemoryCandidate[];
    rejectedCandidates: MemoryRejectedItem[];
    sourceHash: string;
    extractorVersion: string;
    modelObservationRef?: string;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidates` | property | <code>candidates: ExtractedMemoryCandidate[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractorVersion` | property | <code>extractorVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jobId` | property | <code>jobId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelObservationRef` | property | <code>modelObservationRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectedCandidates` | property | <code>rejectedCandidates: MemoryRejectedItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHash` | property | <code>sourceHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRefs` | property | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionCursor`

Memory Extraction Cursor interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionCursor } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionCursor {
    sourceType: MemoryExtractionSourceType;
    sourceId: string;
    sequence?: number;
    timestamp?: string;
    sourceHash?: string;
    opaqueCursor?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `opaqueCursor` | property | <code>opaqueCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sequence` | property | <code>sequence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHash` | property | <code>sourceHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceType` | property | <code>sourceType: MemoryExtractionSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionJob`

Memory Extraction Job interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionJob } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionJob {
    id: string;
    operationId: string;
    scopeHash: string;
    profileRef: MemoryContractSpecRef;
    profileRevision: string;
    sourceRefs: MemoryExtractionSourceRef[];
    status: 'queued' | 'running' | 'awaiting_review' | 'completed' | 'partial' | 'failed' | 'cancelled';
    cursorBefore?: MemoryExtractionCursor;
    cursorAfter?: MemoryExtractionCursor;
    attempts: number;
    leaseOwner?: string;
    leaseExpiresAt?: string;
    lastError?: NormalizedMemoryError;
    createdAt: string;
    startedAt?: string;
    completedAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `attempts` | property | <code>attempts: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cursorAfter` | property | <code>cursorAfter?: MemoryExtractionCursor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cursorBefore` | property | <code>cursorBefore?: MemoryExtractionCursor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastError` | property | <code>lastError?: NormalizedMemoryError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseExpiresAt` | property | <code>leaseExpiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `leaseOwner` | property | <code>leaseOwner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRefs` | property | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "partial" &#124; "awaiting_review"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionProfileSpec`

Memory Extraction Profile Spec interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionProfileSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionProfileSpec {
    id: string;
    version: string;
    revision?: string;
    acceptedSourceTypes: MemoryExtractionSourceType[];
    outputMemoryTypes: ManagedMemoryType[];
    extractor: {
        type: 'deterministic';
        extractorRef: MemoryContractSpecRef;
    } | {
        type: 'model';
        modelProfileRef: MemoryContractSpecRef;
        promptTemplateRef: MemoryContractSpecRef;
    } | {
        type: 'provider';
        providerRef: MemoryContractSpecRef;
    } | {
        type: 'hybrid';
        stages: MemoryExtractionStageSpec[];
    };
    conversation?: {
        maxMessagesPerWindow: number;
        overlapMessages?: number;
        includeSystemMessages?: boolean;
        includeToolMessages?: boolean;
        extractionTrigger: 'each_turn' | 'window' | 'run_end' | 'session_idle' | 'manual';
    };
    episodic?: {
        boundary: 'run' | 'workflow_state' | 'task' | 'time_window' | 'custom';
        includeFailedEpisodes?: boolean;
        includeIntermediateObservations?: boolean;
    };
    truth?: {
        minimumAuthority: TruthAssertion['authority'];
        requireEvidence?: boolean;
        preserveValidityInterval?: boolean;
    };
    sensitiveDataPolicyRef?: MemoryContractSpecRef;
    candidateValidation: {
        minConfidence: number;
        requireCanonicalText: boolean;
        requireEvidence: boolean;
        maxCandidatesPerJob?: number;
        rejectInstructionLikeContent?: boolean;
    };
    writePolicyRef: MemoryContractSpecRef;
    maintenancePolicyRef: MemoryContractSpecRef;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptedSourceTypes` | property | <code>acceptedSourceTypes: MemoryExtractionSourceType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `candidateValidation` | property | <code>candidateValidation: { minConfidence: number; requireCanonicalText: boolean; requireEvidence: boolean; maxCandidatesPerJob?: number; rejectInstructionLikeContent?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conversation` | property | <code>conversation?: { maxMessagesPerWindow: number; overlapMessages?: number; includeSystemMessages?: boolean; includeToolMessages?: boolean; extractionTrigger: "each_turn" &#124; "window" &#124; "run_end" &#124; "session_idle" &#124; "manual"; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `episodic` | property | <code>episodic?: { boundary: "run" &#124; "workflow_state" &#124; "task" &#124; "time_window" &#124; "custom"; includeFailedEpisodes?: boolean; includeIntermediateObservations?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extractor` | property | <code>extractor: { type: "deterministic"; extractorRef: MemoryContractSpecRef; } &#124; { type: "model"; modelProfileRef: MemoryContractSpecRef; promptTemplateRef: MemoryContractSpecRef; } &#124; { type: "provider"; providerRef: MemoryContractSpecRef; } &#124; { type: "hybrid"; stages: MemoryExtractionStageSpec[]; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maintenancePolicyRef` | property | <code>maintenancePolicyRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputMemoryTypes` | property | <code>outputMemoryTypes: ManagedMemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sensitiveDataPolicyRef` | property | <code>sensitiveDataPolicyRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truth` | property | <code>truth?: { minimumAuthority: TruthAssertion["authority"]; requireEvidence?: boolean; preserveValidityInterval?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `writePolicyRef` | property | <code>writePolicyRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionRequest`

Memory Extraction Request interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: MemoryContractSpecRef;
    sources: MemoryExtractionSourceRef[];
    mode: 'sync' | 'async';
    force?: boolean;
    idempotencyKey?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `force` | property | <code>force?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "sync" &#124; "async"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sources` | property | <code>sources: MemoryExtractionSourceRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionSourceAdapter`

Memory Extraction Source Adapter interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionSourceAdapter } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionSourceAdapter<T = unknown> {
    readonly type: MemoryExtractionSourceType;
    load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise<MemoryExtractionSourceBatch<T>>;
    normalize(batch: MemoryExtractionSourceBatch<T>): Promise<NormalizedExtractionInput[]>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `load` | method | <code>load(refs: MemoryExtractionSourceRef[], cursor?: MemoryExtractionCursor): Promise&lt;MemoryExtractionSourceBatch&lt;T&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `normalize` | method | <code>normalize(batch: MemoryExtractionSourceBatch&lt;T&gt;): Promise&lt;NormalizedExtractionInput[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `type` | property | <code>readonly type: MemoryExtractionSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionSourceBatch`

Memory Extraction Source Batch interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionSourceBatch } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionSourceBatch<T = unknown> {
    sourceRefs: MemoryExtractionSourceRef[];
    items: Array<{
        sourceRef: MemoryExtractionSourceRef;
        value: T;
    }>;
    nextCursor?: MemoryExtractionCursor;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `items` | property | <code>items: { sourceRef: MemoryExtractionSourceRef; value: T; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextCursor` | property | <code>nextCursor?: MemoryExtractionCursor</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRefs` | property | <code>sourceRefs: MemoryExtractionSourceRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionSourceRef`

Memory Extraction Source Ref interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionSourceRef } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionSourceRef {
    type: MemoryExtractionSourceType;
    sourceId: string;
    sourceVersion?: string;
    sourceHash?: string;
    sessionId?: string;
    runId?: string;
    messageIds?: string[];
    eventIds?: string[];
    artifactRefs?: string[];
    observedAt?: string;
    validFrom?: string;
    validTo?: string;
    authority?: 'unverified' | 'user_asserted' | 'system_observed' | 'verified' | 'authoritative';
    trustScore?: number;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authority` | property | <code>authority?: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageIds` | property | <code>messageIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHash` | property | <code>sourceHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceVersion` | property | <code>sourceVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustScore` | property | <code>trustScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: MemoryExtractionSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validFrom` | property | <code>validFrom?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validTo` | property | <code>validTo?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionStageSpec`

Memory Extraction Stage Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractionStageSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractionStageSpec {
    id: string;
    type: 'normalize' | 'classify' | 'extract' | 'validate' | 'enrich' | 'custom';
    handlerRef: MemoryContractSpecRef;
    optional?: boolean;
    timeoutMs?: number;
    retryPolicy?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `handlerRef` | property | <code>handlerRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `optional` | property | <code>optional?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryPolicy` | property | <code>retryPolicy?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "custom" &#124; "validate" &#124; "normalize" &#124; "classify" &#124; "extract" &#124; "enrich"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractor`

Memory Extractor interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryExtractor } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryExtractor {
    readonly id: string;
    extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise<ExtractedMemoryCandidate[]>;
    health(): Promise<ProviderHealth>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `extract` | method | <code>extract(inputs: NormalizedExtractionInput[], profile: MemoryExtractionProfileSpec): Promise&lt;ExtractedMemoryCandidate[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryMaintenanceApplyRequest`

Memory Maintenance Apply Request interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMaintenanceApplyRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryMaintenanceApplyRequest {
    decision: MemoryMaintenanceDecision;
    candidate: ExtractedMemoryCandidate;
    scope: ManagedMemoryScope;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: ExtractedMemoryCandidate</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `decision` | property | <code>decision: MemoryMaintenanceDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryMaintenanceDecision`

Memory Maintenance Decision interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMaintenanceDecision } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryMaintenanceDecision {
    id: string;
    operationId: string;
    candidateId: string;
    scopeHash: string;
    action: MemoryMaintenanceAction;
    targetMemoryIds: string[];
    expectedRevisions: Record<string, number>;
    duplicateScore?: number;
    conflictScore?: number;
    authorityComparison?: 'candidate_higher' | 'existing_higher' | 'equal' | 'unknown';
    mergedContent?: unknown;
    patch?: MemoryPatch;
    relationsToCreate?: MemoryRelation[];
    recordsToInvalidate?: string[];
    reasonCode: 'NEW_FACT' | 'EXACT_DUPLICATE' | 'SEMANTIC_DUPLICATE' | 'ADDITIONAL_EVIDENCE' | 'FACT_CORRECTION' | 'TEMPORAL_UPDATE' | 'AUTHORITY_OVERRIDE' | 'CONFLICT_REQUIRES_REVIEW' | 'LOW_CONFIDENCE' | 'POLICY_REJECTED' | 'CUSTOM';
    explanation?: string;
    policyRevision: string;
    createdAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: MemoryMaintenanceAction</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authorityComparison` | property | <code>authorityComparison?: "unknown" &#124; "candidate_higher" &#124; "existing_higher" &#124; "equal"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `candidateId` | property | <code>candidateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictScore` | property | <code>conflictScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `duplicateScore` | property | <code>duplicateScore?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expectedRevisions` | property | <code>expectedRevisions: Record&lt;string, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `explanation` | property | <code>explanation?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mergedContent` | property | <code>mergedContent?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `patch` | property | <code>patch?: MemoryPatch</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRevision` | property | <code>policyRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasonCode` | property | <code>reasonCode: "CUSTOM" &#124; "NEW_FACT" &#124; "EXACT_DUPLICATE" &#124; "SEMANTIC_DUPLICATE" &#124; "ADDITIONAL_EVIDENCE" &#124; "FACT_CORRECTION" &#124; "TEMPORAL_UPDATE" &#124; "AUTHORITY_OVERRIDE" &#124; "CONFLICT_REQUIRES_REVIEW" &#124; "LOW_CONFIDENCE" &#124; "POLICY_REJECTED"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recordsToInvalidate` | property | <code>recordsToInvalidate?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relationsToCreate` | property | <code>relationsToCreate?: MemoryRelation[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetMemoryIds` | property | <code>targetMemoryIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryMaintenancePlanner`

Memory Maintenance Planner interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMaintenancePlanner } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryMaintenancePlanner {
    plan(request: MemoryMaintenancePlanRequest): Promise<MemoryMaintenanceDecision>;
    apply(request: MemoryMaintenanceApplyRequest): Promise<ManagedMemoryWriteResult>;
    explain(decisionId: string): Promise<MemoryMaintenanceDecision | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apply` | method | <code>apply(request: MemoryMaintenanceApplyRequest): Promise&lt;ManagedMemoryWriteResult&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `explain` | method | <code>explain(decisionId: string): Promise&lt;MemoryMaintenanceDecision &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `plan` | method | <code>plan(request: MemoryMaintenancePlanRequest): Promise&lt;MemoryMaintenanceDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryMaintenancePlanRequest`

Memory Maintenance Plan Request interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMaintenancePlanRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryMaintenancePlanRequest {
    operationId: string;
    scope: ManagedMemoryScope;
    candidate: ExtractedMemoryCandidate;
    existingRecords: ManagedMemoryRecord[];
    policy: MemoryMaintenancePolicySpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `candidate` | property | <code>candidate: ExtractedMemoryCandidate</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `existingRecords` | property | <code>existingRecords: ManagedMemoryRecord&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy: MemoryMaintenancePolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryMaintenancePolicySpec`

Memory Maintenance Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { MemoryMaintenancePolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface MemoryMaintenancePolicySpec {
    id: string;
    version: string;
    revision?: string;
    preWriteRetrieval: {
        enabled: boolean;
        exactKeyLookup: boolean;
        semanticLookup?: boolean;
        maxCandidates: number;
        semanticThreshold?: number;
        includeSuperseded?: boolean;
        includeInvalidated?: boolean;
    };
    duplicateResolution: 'reuse_existing' | 'increase_support' | 'create_version' | 'require_review';
    updateResolution: 'patch_current' | 'create_version' | 'supersede' | 'require_review';
    conflictResolution: 'keep_both_marked' | 'prefer_authoritative' | 'prefer_verified' | 'prefer_latest' | 'invalidate_old' | 'require_review';
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `conflictResolution` | property | <code>conflictResolution: "prefer_latest" &#124; "prefer_verified" &#124; "require_review" &#124; "keep_both_marked" &#124; "prefer_authoritative" &#124; "invalidate_old"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `duplicateResolution` | property | <code>duplicateResolution: "reuse_existing" &#124; "increase_support" &#124; "create_version" &#124; "require_review"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preWriteRetrieval` | property | <code>preWriteRetrieval: { enabled: boolean; exactKeyLookup: boolean; semanticLookup?: boolean; maxCandidates: number; semanticThreshold?: number; includeSuperseded?: boolean; includeInvalidated?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updateResolution` | property | <code>updateResolution: "create_version" &#124; "require_review" &#124; "patch_current" &#124; "supersede"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedExtractionInput`

Normalized Extraction Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedExtractionInput } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface NormalizedExtractionInput {
    sourceRef: MemoryExtractionSourceRef;
    value: unknown;
    canonicalText?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `canonicalText` | property | <code>canonicalText?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRef` | property | <code>sourceRef: MemoryExtractionSourceRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TruthAssertion`

Truth Assertion interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { TruthAssertion } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export interface TruthAssertion {
    assertionId: string;
    subject: string;
    predicate: string;
    object: unknown;
    authority: 'user_confirmed' | 'human_reviewed' | 'system_of_record' | 'policy_defined';
    confidence: number;
    validFrom?: string;
    validTo?: string;
    supersedesAssertionId?: string;
    evidenceRefs: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `assertionId` | property | <code>assertionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `authority` | property | <code>authority: "user_confirmed" &#124; "human_reviewed" &#124; "system_of_record" &#124; "policy_defined"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evidenceRefs` | property | <code>evidenceRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `object` | property | <code>object: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `predicate` | property | <code>predicate: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subject` | property | <code>subject: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `supersedesAssertionId` | property | <code>supersedesAssertionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validFrom` | property | <code>validFrom?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `validTo` | property | <code>validTo?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryExtractionSourceType`

Public type alias for Memory Extraction Source Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryExtractionSourceType } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export type MemoryExtractionSourceType = 'conversation' | 'truth' | 'episodic_record' | 'runtime_event' | 'tool_observation' | 'artifact' | 'structured_record' | 'custom';
```

## `MemoryMaintenanceAction`

Public type alias for Memory Maintenance Action; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { MemoryMaintenanceAction } from '@codesoul-co/hypha-memory';`
- Source module: [`lifecycle-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/lifecycle-contracts.ts)

### Declaration

```text
export type MemoryMaintenanceAction = 'create' | 'noop' | 'reuse' | 'update' | 'merge' | 'supersede' | 'invalidate' | 'reject' | 'require_review';
```
