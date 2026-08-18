# `@codesoul-co/hypha-memory` / `context-contracts`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Source: [`packages/memory/src/context-contracts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)
- Exports: **29**

## Using this module

Use the Context contracts module for declaring and runtime-validating contracts. It exports 28 interfaces, 1 type.

### Import from the package entrypoint

```ts
import type {
  ContextBudgetPlan,
  ContextBuildExplanation,
  ContextBuildInput,
  ContextBuildRequest,
  ContextBundle,
  ContextCompactionPolicySpec,
  ContextConflict,
  ContextEnvelope,
} from '@codesoul-co/hypha-memory';

// The complete export list is documented below.
```

### Usage patterns

- Use the 29 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ContextBudgetPlan` | interface | <code>interface ContextBudgetPlan</code> | Context Budget Plan interface with 6 public fields or methods. |
| `ContextBuildExplanation` | interface | <code>interface ContextBuildExplanation</code> | Context Build Explanation interface with 6 public fields or methods. |
| `ContextBuildInput` | interface | <code>interface ContextBuildInput extends ContextBuildRequest</code> | Context Build Input interface with 20 public fields or methods. |
| `ContextBuildRequest` | interface | <code>interface ContextBuildRequest</code> | Context Build Request interface with 17 public fields or methods. |
| `ContextBundle` | interface | <code>interface ContextBundle</code> | Context Bundle interface with 16 public fields or methods. |
| `ContextCompactionPolicySpec` | interface | <code>interface ContextCompactionPolicySpec</code> | Context Compaction Policy Spec interface with 6 public fields or methods. |
| `ContextConflict` | interface | <code>interface ContextConflict</code> | Context Conflict interface with 3 public fields or methods. |
| `ContextEnvelope` | interface | <code>interface ContextEnvelope</code> | Context Envelope interface with 17 public fields or methods. |
| `ContextInjectionGateway` | interface | <code>interface ContextInjectionGateway</code> | Context Injection Gateway interface with 1 public fields or methods. |
| `ContextItem` | interface | <code>interface ContextItem</code> | Context Item interface with 14 public fields or methods. |
| `ContextItemPolicyDecision` | interface | <code>interface ContextItemPolicyDecision</code> | Context Item Policy Decision interface with 2 public fields or methods. |
| `ContextItemPolicyEvaluator` | interface | <code>interface ContextItemPolicyEvaluator</code> | Context Item Policy Evaluator interface with 1 public fields or methods. |
| `ContextItemPolicyInput` | interface | <code>interface ContextItemPolicyInput</code> | Context Item Policy Input interface with 5 public fields or methods. |
| `ContextProfileSpec` | interface | <code>interface ContextProfileSpec</code> | Context Profile Spec interface with 23 public fields or methods. |
| `ContextProvenanceLabel` | interface | <code>interface ContextProvenanceLabel</code> | Context Provenance Label interface with 7 public fields or methods. |
| `ContextRankingPolicySpec` | interface | <code>interface ContextRankingPolicySpec</code> | Context Ranking Policy Spec interface with 8 public fields or methods. |
| `ContextRejectedItem` | interface | <code>interface ContextRejectedItem</code> | Context Rejected Item interface with 2 public fields or methods. |
| `ContextSourceBudget` | interface | <code>interface ContextSourceBudget</code> | Context Source Budget interface with 6 public fields or methods. |
| `ContextSourceResolutionInput` | interface | <code>interface ContextSourceResolutionInput extends ResolvedContextBuildInput</code> | Context Source Resolution Input interface with 20 public fields or methods. |
| `ContextSourceResolver` | interface | <code>interface ContextSourceResolver</code> | Context Source Resolver interface with 3 public fields or methods. |
| `ContextSourceResolverRegistry` | interface | <code>interface ContextSourceResolverRegistry</code> | Context Source Resolver Registry interface with 1 public fields or methods. |
| `ContextSourceSpec` | interface | <code>interface ContextSourceSpec</code> | Context Source Spec interface with 9 public fields or methods. |
| `ContextTruncationPolicySpec` | interface | <code>interface ContextTruncationPolicySpec</code> | Context Truncation Policy Spec interface with 5 public fields or methods. |
| `ContextTruncationRecord` | interface | <code>interface ContextTruncationRecord</code> | Context Truncation Record interface with 5 public fields or methods. |
| `MemoryContextBuilder` | interface | <code>interface MemoryContextBuilder</code> | Memory Context Builder interface with 2 public fields or methods. |
| `PromptSegment` | interface | <code>interface PromptSegment</code> | Prompt Segment interface with 8 public fields or methods. |
| `ResolvedContextBuildInput` | interface | <code>interface ResolvedContextBuildInput extends ContextBuildRequest</code> | Resolved Context Build Input interface with 19 public fields or methods. |
| `TokenEstimator` | interface | <code>interface TokenEstimator</code> | Token Estimator interface with 2 public fields or methods. |
| `ContextSourceType` | type | <code>type ContextSourceType = 'system' &#124; 'workflow_state' &#124; 'messages' &#124; 'working_memory' &#124; 'long_term_memory' &#124; 'tool_observation' &#124; 'artifact' &#124; 'human_review' &#124; 'custom'</code> | Public type alias for Context Source Type; the declaration contains its complete type expression. |

## `ContextBudgetPlan`

Context Budget Plan interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ContextBudgetPlan } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextBudgetPlan {
    totalAvailableTokens: number;
    fixedTokens: number;
    dynamicTokens: number;
    sourceBudgets: ContextSourceBudget[];
    tokenizerRef: MemoryContractSpecRef;
    safetyMarginTokens: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `dynamicTokens` | property | <code>dynamicTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixedTokens` | property | <code>fixedTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `safetyMarginTokens` | property | <code>safetyMarginTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceBudgets` | property | <code>sourceBudgets: ContextSourceBudget[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenizerRef` | property | <code>tokenizerRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalAvailableTokens` | property | <code>totalAvailableTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextBuildExplanation`

Context Build Explanation interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ContextBuildExplanation } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextBuildExplanation {
    contextHash: string;
    selectedItemIds: string[];
    omittedItemIds: string[];
    rejectedItems: ContextRejectedItem[];
    ranking: Array<{
        itemId: string;
        score: number;
        reasons: string[];
    }>;
    budgetPlan: ContextBudgetPlan;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `budgetPlan` | property | <code>budgetPlan: ContextBudgetPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextHash` | property | <code>contextHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `omittedItemIds` | property | <code>omittedItemIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ranking` | property | <code>ranking: { itemId: string; score: number; reasons: string[]; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectedItems` | property | <code>rejectedItems: ContextRejectedItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selectedItemIds` | property | <code>selectedItemIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextBuildInput`

Context Build Input interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { ContextBuildInput } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextBuildInput extends ContextBuildRequest {
    profile: ContextProfileSpec;
    sourceItems: ContextItem[];
    tokenizerRef?: MemoryContractSpecRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageCursor` | property | <code>messageCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousContextHash` | property | <code>previousContextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeStateRef` | property | <code>runtimeStateRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceItems` | property | <code>sourceItems: ContextItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenizerRef` | property | <code>tokenizerRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextBuildRequest`

Context Build Request interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { ContextBuildRequest } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextBuildRequest {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    runId: string;
    stepId?: string;
    stateId?: string;
    profileRef: MemoryContractSpecRef;
    modelContextWindowTokens: number;
    reservedSystemTokens: number;
    reservedInstructionTokens: number;
    reservedOutputTokens: number;
    runtimeStateRef?: string;
    messageCursor?: string;
    explicitSourceRefs?: string[];
    query?: string;
    previousContextHash?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageCursor` | property | <code>messageCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousContextHash` | property | <code>previousContextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeStateRef` | property | <code>runtimeStateRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextBundle`

Context Bundle interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { ContextBundle } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextBundle {
    id: string;
    runId: string;
    stepId?: string;
    profileRef: MemoryContractSpecRef;
    profileRevision: string;
    items: ContextItem[];
    totalTokens: number;
    totalCharacters: number;
    omittedItemIds: string[];
    rejectedItems: ContextRejectedItem[];
    conflicts: ContextConflict[];
    sourceHashes: Record<string, string>;
    contextHash: string;
    createdAt: string;
    metadata?: Record<string, unknown>;
    artifactRefs?: ContextArtifactRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: ContextArtifactRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflicts` | property | <code>conflicts: ContextConflict[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextHash` | property | <code>contextHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `items` | property | <code>items: ContextItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `omittedItemIds` | property | <code>omittedItemIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectedItems` | property | <code>rejectedItems: ContextRejectedItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceHashes` | property | <code>sourceHashes: Record&lt;string, string&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalCharacters` | property | <code>totalCharacters: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextCompactionPolicySpec`

Context Compaction Policy Spec interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ContextCompactionPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextCompactionPolicySpec {
    enabled: boolean;
    triggerRatio: number;
    summaryProviderRef?: MemoryContractSpecRef;
    preserveLastMessages?: number;
    persistSummaryAsMemory?: boolean;
    summaryMemoryType?: import('./contracts').ManagedMemoryType;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enabled` | property | <code>enabled: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persistSummaryAsMemory` | property | <code>persistSummaryAsMemory?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveLastMessages` | property | <code>preserveLastMessages?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summaryMemoryType` | property | <code>summaryMemoryType?: import("/Users/erwin/Downloads/codespace/Hypha/packages/memory/dist/contracts").ManagedMemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summaryProviderRef` | property | <code>summaryProviderRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `triggerRatio` | property | <code>triggerRatio: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextConflict`

Context Conflict interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ContextConflict } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextConflict {
    conflictGroupId: string;
    itemIds: string[];
    resolution?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `conflictGroupId` | property | <code>conflictGroupId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `itemIds` | property | <code>itemIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolution` | property | <code>resolution?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextEnvelope`

Context Envelope interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { ContextEnvelope } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextEnvelope {
    id: string;
    runId: string;
    stepId?: string;
    contextHash: string;
    profileRevision: string;
    budgetPlan: ContextBudgetPlan;
    systemSegments: PromptSegment[];
    instructionSegments: PromptSegment[];
    dataSegments: PromptSegment[];
    includedSourceRefs: string[];
    omittedSourceRefs: string[];
    truncationRecords: ContextTruncationRecord[];
    provenanceIndex: Record<string, ContextProvenanceLabel>;
    conflicts: ContextConflict[];
    totalTokens: number;
    createdAt: string;
    artifactRefs?: ContextArtifactRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: ContextArtifactRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `budgetPlan` | property | <code>budgetPlan: ContextBudgetPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflicts` | property | <code>conflicts: ContextConflict[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextHash` | property | <code>contextHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dataSegments` | property | <code>dataSegments: PromptSegment[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includedSourceRefs` | property | <code>includedSourceRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructionSegments` | property | <code>instructionSegments: PromptSegment[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `omittedSourceRefs` | property | <code>omittedSourceRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenanceIndex` | property | <code>provenanceIndex: Record&lt;string, ContextProvenanceLabel&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `systemSegments` | property | <code>systemSegments: PromptSegment[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncationRecords` | property | <code>truncationRecords: ContextTruncationRecord[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextInjectionGateway`

Context Injection Gateway interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ContextInjectionGateway } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextInjectionGateway {
    buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise<ContextEnvelope>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `buildEnvelope` | method | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContextItem`

Context Item interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ContextItem } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextItem {
    id: string;
    sourceType: ContextSourceType;
    sourceId?: string;
    content: unknown;
    text: string;
    tokenEstimate: number;
    priority: number;
    score?: number;
    required?: boolean;
    untrusted?: boolean;
    provenance?: MemoryProvenance | Record<string, unknown>;
    conflictGroupId?: string;
    metadata?: Record<string, unknown>;
    artifactRef?: ContextArtifactRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRef` | property | <code>artifactRef?: ContextArtifactRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictGroupId` | property | <code>conflictGroupId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt; &#124; MemoryProvenance</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceType` | property | <code>sourceType: ContextSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenEstimate` | property | <code>tokenEstimate: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `untrusted` | property | <code>untrusted?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextItemPolicyDecision`

Context Item Policy Decision interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ContextItemPolicyDecision } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextItemPolicyDecision {
    allowed: boolean;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextItemPolicyEvaluator`

Context Item Policy Evaluator interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ContextItemPolicyEvaluator } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextItemPolicyEvaluator {
    evaluate(input: ContextItemPolicyInput): Promise<ContextItemPolicyDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;ContextItemPolicyDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContextItemPolicyInput`

Context Item Policy Input interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ContextItemPolicyInput } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextItemPolicyInput {
    operationId: string;
    principal: MemoryPrincipal;
    scope: ManagedMemoryScope;
    profileRef: MemoryContractSpecRef;
    item: ContextItem;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `item` | property | <code>item: ContextItem</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextProfileSpec`

Context Profile Spec interface with 23 public fields or methods.

- Kind: interface
- Import: `import type { ContextProfileSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextProfileSpec {
    id: string;
    version: string;
    revision?: string;
    name?: string;
    description?: string;
    sources: ContextSourceSpec[];
    maxItems?: number;
    maxCharacters?: number;
    maxSerializedBytes?: number;
    maxTokens: number;
    reservedOutputTokens?: number;
    reservedSystemTokens?: number;
    deduplication: 'none' | 'id' | 'hash' | 'semantic';
    semanticDedupThreshold?: number;
    ranking: ContextRankingPolicySpec;
    truncation: ContextTruncationPolicySpec;
    conflictPolicy?: 'include_marked' | 'prefer_latest' | 'prefer_verified';
    includeProvenance: boolean;
    includeScores?: boolean;
    instructionBoundary: 'strict' | 'tagged' | 'quoted';
    untrustedContentPolicy: 'escape' | 'tag' | 'reject';
    compactionPolicy?: ContextCompactionPolicySpec;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compactionPolicy` | property | <code>compactionPolicy?: ContextCompactionPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `conflictPolicy` | property | <code>conflictPolicy?: "include_marked" &#124; "prefer_latest" &#124; "prefer_verified"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deduplication` | property | <code>deduplication: "none" &#124; "id" &#124; "semantic" &#124; "hash"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeProvenance` | property | <code>includeProvenance: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeScores` | property | <code>includeScores?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructionBoundary` | property | <code>instructionBoundary: "strict" &#124; "tagged" &#124; "quoted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCharacters` | property | <code>maxCharacters?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxItems` | property | <code>maxItems?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSerializedBytes` | property | <code>maxSerializedBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTokens` | property | <code>maxTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ranking` | property | <code>ranking: ContextRankingPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `semanticDedupThreshold` | property | <code>semanticDedupThreshold?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sources` | property | <code>sources: ContextSourceSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncation` | property | <code>truncation: ContextTruncationPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `untrustedContentPolicy` | property | <code>untrustedContentPolicy: "reject" &#124; "escape" &#124; "tag"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextProvenanceLabel`

Context Provenance Label interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ContextProvenanceLabel } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextProvenanceLabel {
    sourceType: ContextSourceType;
    sourceId: string;
    memoryId?: string;
    memoryVersionId?: string;
    authority?: 'unverified' | 'user_asserted' | 'system_observed' | 'verified' | 'authoritative';
    observedAt?: string;
    citationLabel: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `authority` | property | <code>authority?: "verified" &#124; "unverified" &#124; "user_asserted" &#124; "system_observed" &#124; "authoritative"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `citationLabel` | property | <code>citationLabel: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryId` | property | <code>memoryId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryVersionId` | property | <code>memoryVersionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `observedAt` | property | <code>observedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceType` | property | <code>sourceType: ContextSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextRankingPolicySpec`

Context Ranking Policy Spec interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ContextRankingPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextRankingPolicySpec {
    method: 'priority' | 'score_fusion' | 'reranker' | 'custom';
    recencyWeight?: number;
    relevanceWeight?: number;
    importanceWeight?: number;
    confidenceWeight?: number;
    provenanceWeight?: number;
    sourceWeights?: Record<string, number>;
    rerankerProviderRef?: MemoryContractSpecRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `confidenceWeight` | property | <code>confidenceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `importanceWeight` | property | <code>importanceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `method` | property | <code>method: "custom" &#124; "priority" &#124; "score_fusion" &#124; "reranker"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenanceWeight` | property | <code>provenanceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recencyWeight` | property | <code>recencyWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `relevanceWeight` | property | <code>relevanceWeight?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rerankerProviderRef` | property | <code>rerankerProviderRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceWeights` | property | <code>sourceWeights?: Record&lt;string, number&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextRejectedItem`

Context Rejected Item interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ContextRejectedItem } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextRejectedItem {
    itemId: string;
    reason: 'scope_denied' | 'policy_denied' | 'invalid_status' | 'duplicate' | 'budget_exceeded' | 'untrusted_rejected' | 'invalid_input';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `itemId` | property | <code>itemId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "policy_denied" &#124; "duplicate" &#124; "scope_denied" &#124; "invalid_status" &#124; "budget_exceeded" &#124; "untrusted_rejected" &#124; "invalid_input"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSourceBudget`

Context Source Budget interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ContextSourceBudget } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextSourceBudget {
    sourceId: string;
    minTokens?: number;
    targetTokens?: number;
    maxTokens: number;
    required: boolean;
    overflowPolicy: 'drop' | 'truncate' | 'summarize' | 'spill_to_artifact' | 'fail';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxTokens` | property | <code>maxTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minTokens` | property | <code>minTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `overflowPolicy` | property | <code>overflowPolicy: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `targetTokens` | property | <code>targetTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSourceResolutionInput`

Context Source Resolution Input interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { ContextSourceResolutionInput } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextSourceResolutionInput extends ResolvedContextBuildInput {
    source: ContextSourceSpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageCursor` | property | <code>messageCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousContextHash` | property | <code>previousContextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeStateRef` | property | <code>runtimeStateRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: ContextSourceSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenizerRef` | property | <code>tokenizerRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSourceResolver`

Context Source Resolver interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ContextSourceResolver } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextSourceResolver {
    readonly id: string;
    supports(source: ContextSourceSpec): boolean;
    resolve(request: ContextSourceResolutionInput): Promise<ContextItem[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolve` | method | <code>resolve(request: ContextSourceResolutionInput): Promise&lt;ContextItem[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `supports` | method | <code>supports(source: ContextSourceSpec): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `ContextSourceResolverRegistry`

Context Source Resolver Registry interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ContextSourceResolverRegistry } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextSourceResolverRegistry {
    resolve(request: ResolvedContextBuildInput): Promise<ContextItem[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve(request: ResolvedContextBuildInput): Promise&lt;ContextItem[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContextSourceSpec`

Context Source Spec interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ContextSourceSpec } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextSourceSpec {
    id: string;
    type: ContextSourceType;
    ref?: MemoryContractSpecRef;
    required?: boolean;
    priority: number;
    maxItems?: number;
    maxTokens?: number;
    overflowPolicy?: ContextSourceBudget['overflowPolicy'];
    filters?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filters` | property | <code>filters?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxItems` | property | <code>maxItems?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTokens` | property | <code>maxTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `overflowPolicy` | property | <code>overflowPolicy?: "fail" &#124; "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ref` | property | <code>ref?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: ContextSourceType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextTruncationPolicySpec`

Context Truncation Policy Spec interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ContextTruncationPolicySpec } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextTruncationPolicySpec {
    method: 'drop_lowest' | 'truncate_items' | 'summarize' | 'hybrid';
    preserveRequiredSources: boolean;
    preserveLatestMessages?: number;
    minItemTokens?: number;
    truncationMarker?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `method` | property | <code>method: "hybrid" &#124; "summarize" &#124; "drop_lowest" &#124; "truncate_items"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `minItemTokens` | property | <code>minItemTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveLatestMessages` | property | <code>preserveLatestMessages?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preserveRequiredSources` | property | <code>preserveRequiredSources: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncationMarker` | property | <code>truncationMarker?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextTruncationRecord`

Context Truncation Record interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ContextTruncationRecord } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ContextTruncationRecord {
    itemId: string;
    originalTokens: number;
    retainedTokens: number;
    method: 'drop' | 'truncate' | 'summarize' | 'spill_to_artifact';
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `itemId` | property | <code>itemId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `method` | property | <code>method: "summarize" &#124; "drop" &#124; "truncate" &#124; "spill_to_artifact"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `originalTokens` | property | <code>originalTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retainedTokens` | property | <code>retainedTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryContextBuilder`

Memory Context Builder interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { MemoryContextBuilder } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface MemoryContextBuilder {
    build(request: ContextBuildInput): Promise<ContextBundle>;
    explain(contextHash: string): Promise<ContextBuildExplanation | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `explain` | method | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `PromptSegment`

Prompt Segment interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { PromptSegment } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface PromptSegment {
    id: string;
    role: 'system' | 'developer' | 'user' | 'assistant' | 'tool' | 'data';
    text: string;
    tokenCount: number;
    trustLevel: 'trusted_instruction' | 'trusted_data' | 'untrusted_data';
    sourceRefs: string[];
    required?: boolean;
    artifactRefs?: ContextArtifactRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: ContextArtifactRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant" &#124; "developer" &#124; "data"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceRefs` | property | <code>sourceRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenCount` | property | <code>tokenCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel: "trusted_instruction" &#124; "trusted_data" &#124; "untrusted_data"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResolvedContextBuildInput`

Resolved Context Build Input interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedContextBuildInput } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface ResolvedContextBuildInput extends ContextBuildRequest {
    profile: ContextProfileSpec;
    tokenizerRef?: MemoryContractSpecRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `explicitSourceRefs` | property | <code>explicitSourceRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messageCursor` | property | <code>messageCursor?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelContextWindowTokens` | property | <code>modelContextWindowTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `previousContextHash` | property | <code>previousContextHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: MemoryPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ContextProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileRef` | property | <code>profileRef: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `query` | property | <code>query?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedInstructionTokens` | property | <code>reservedInstructionTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedOutputTokens` | property | <code>reservedOutputTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reservedSystemTokens` | property | <code>reservedSystemTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtimeStateRef` | property | <code>runtimeStateRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: ManagedMemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tokenizerRef` | property | <code>tokenizerRef?: MemoryContractSpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TokenEstimator`

Token Estimator interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { TokenEstimator } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export interface TokenEstimator {
    readonly id: string;
    estimate(text: string): number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `estimate` | method | <code>estimate(text: string): number</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextSourceType`

Public type alias for Context Source Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ContextSourceType } from '@codesoul-co/hypha-memory';`
- Source module: [`context-contracts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-contracts.ts)

### Declaration

```text
export type ContextSourceType = 'system' | 'workflow_state' | 'messages' | 'working_memory' | 'long_term_memory' | 'tool_observation' | 'artifact' | 'human_review' | 'custom';
```
