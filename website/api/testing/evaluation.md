# `@codesoul-co/hypha-testing` / `evaluation`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Source: [`packages/testing/src/evaluation.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)
- Exports: **15**

## Using this module

Use the Evaluation module for using the public contracts and operations for this capability boundary. It exports 3 classes, 1 function, 10 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  DeterministicEvaluator,
  OutputContractValidator,
  TraceCompletenessEvaluator,
  validateJsonSchemaValue,
} from '@codesoul-co/hypha-testing';

import type {
  DeterministicEvaluationInput,
  DeterministicEvaluatorOptions,
  EvaluationCheckResult,
  EvaluationEventContext,
  EvaluationResult,
  EvaluationSummary,
  JsonSchemaValidationIssue,
  OutputContractValidationInput,
} from '@codesoul-co/hypha-testing';

// The complete export list is documented below.
```

### Usage patterns

- Use the 11 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DeterministicEvaluator` | class | <code>new DeterministicEvaluator(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | Deterministic Evaluator class with 3 public constructor or member entries; its exact declarations are listed below. |
| `OutputContractValidator` | class | <code>new OutputContractValidator(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | Output Contract Validator class with 2 public constructor or member entries; its exact declarations are listed below. |
| `TraceCompletenessEvaluator` | class | <code>new TraceCompletenessEvaluator(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | Trace Completeness Evaluator class with 2 public constructor or member entries; its exact declarations are listed below. |
| `validateJsonSchemaValue` | function | <code>validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[]</code> | Validate JSON Schema Value function with 1 public call signature; parameters and return types are listed below. |
| `DeterministicEvaluationInput` | interface | <code>interface DeterministicEvaluationInput</code> | Deterministic Evaluation Input interface with 7 public fields or methods. |
| `DeterministicEvaluatorOptions` | interface | <code>interface DeterministicEvaluatorOptions</code> | Deterministic Evaluator Options interface with 9 public fields or methods. |
| `EvaluationCheckResult` | interface | <code>interface EvaluationCheckResult</code> | Evaluation Check Result interface with 7 public fields or methods. |
| `EvaluationEventContext` | interface | <code>interface EvaluationEventContext</code> | Evaluation Event Context interface with 5 public fields or methods. |
| `EvaluationResult` | interface | <code>interface EvaluationResult</code> | Evaluation Result interface with 10 public fields or methods. |
| `EvaluationSummary` | interface | <code>interface EvaluationSummary</code> | Evaluation Summary interface with 7 public fields or methods. |
| `JsonSchemaValidationIssue` | interface | <code>interface JsonSchemaValidationIssue</code> | JSON Schema Validation Issue interface with 4 public fields or methods. |
| `OutputContractValidationInput` | interface | <code>interface OutputContractValidationInput</code> | Output Contract Validation Input interface with 5 public fields or methods. |
| `TraceCompletenessEvaluatorOptions` | interface | <code>interface TraceCompletenessEvaluatorOptions</code> | Trace Completeness Evaluator Options interface with 3 public fields or methods. |
| `TraceCompletenessInput` | interface | <code>interface TraceCompletenessInput</code> | Trace Completeness Input interface with 6 public fields or methods. |
| `EvaluationStatus` | type | <code>type EvaluationStatus = 'passed' &#124; 'failed'</code> | Public type alias for Evaluation Status; the declaration contains its complete type expression. |

## `DeterministicEvaluator`

Deterministic Evaluator class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DeterministicEvaluator } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export declare class DeterministicEvaluator {
    constructor(options?: DeterministicEvaluatorOptions);
    evaluate(input: DeterministicEvaluationInput): EvaluationSummary;
    evaluateAndRecord(input: DeterministicEvaluationInput): Promise<EvaluationSummary>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: DeterministicEvaluatorOptions): DeterministicEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: DeterministicEvaluationInput): EvaluationSummary</code> | Public method; parameters and return type are shown in the signature. |
| `evaluateAndRecord` | method | <code>evaluateAndRecord(input: DeterministicEvaluationInput): Promise&lt;EvaluationSummary&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OutputContractValidator`

Output Contract Validator class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { OutputContractValidator } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export declare class OutputContractValidator {
    constructor(options?: {
            now?: () => string;
        });
    validate(input: OutputContractValidationInput): EvaluationResult;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: { now?: () =&gt; string; }): OutputContractValidator</code> | Creates an instance of this class. |
| `validate` | method | <code>validate(input: OutputContractValidationInput): EvaluationResult</code> | Public method; parameters and return type are shown in the signature. |

## `TraceCompletenessEvaluator`

Trace Completeness Evaluator class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { TraceCompletenessEvaluator } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export declare class TraceCompletenessEvaluator {
    constructor(options?: TraceCompletenessEvaluatorOptions);
    evaluate(input: TraceCompletenessInput): EvaluationResult;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: TraceCompletenessEvaluatorOptions): TraceCompletenessEvaluator</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: TraceCompletenessInput): EvaluationResult</code> | Public method; parameters and return type are shown in the signature. |

## `validateJsonSchemaValue`

Validate JSON Schema Value function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateJsonSchemaValue } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export declare function validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[];
```

### Call signature

```text
validateJsonSchemaValue(value: unknown, schema: JsonSchema, path?: string): JsonSchemaValidationIssue[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `schema` | <code>JsonSchema</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `path` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `JsonSchemaValidationIssue[]`
- Description: The return contract is defined by the type shown above.

## `DeterministicEvaluationInput`

Deterministic Evaluation Input interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { DeterministicEvaluationInput } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface DeterministicEvaluationInput {
    runId?: string;
    events?: FrameworkEvent[];
    output?: unknown;
    outputContracts?: OutputContractSpec[];
    traceSpecs?: TraceSpec[];
    evaluationSpecs?: EvaluationSpec[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluationSpecs` | property | <code>evaluationSpecs?: EvaluationSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events?: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContracts` | property | <code>outputContracts?: OutputContractSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceSpecs` | property | <code>traceSpecs?: TraceSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DeterministicEvaluatorOptions`

Deterministic Evaluator Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { DeterministicEvaluatorOptions } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface DeterministicEvaluatorOptions {
    now?: () => string;
    outputValidator?: OutputContractValidator;
    traceEvaluator?: TraceCompletenessEvaluator;
    trace?: TraceRecorder;
    eventRunId?: string;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventRunId` | property | <code>eventRunId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `outputValidator` | property | <code>outputValidator?: OutputContractValidator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceEvaluator` | property | <code>traceEvaluator?: TraceCompletenessEvaluator</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EvaluationCheckResult`

Evaluation Check Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { EvaluationCheckResult } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface EvaluationCheckResult {
    id: string;
    status: EvaluationStatus;
    message: string;
    path?: string;
    expected?: unknown;
    actual?: unknown;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expected` | property | <code>expected?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: EvaluationStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EvaluationEventContext`

Evaluation Event Context interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { EvaluationEventContext } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface EvaluationEventContext {
    runId: string;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EvaluationResult`

Evaluation Result interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { EvaluationResult } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface EvaluationResult {
    id: string;
    evaluatorId: string;
    type: string;
    status: EvaluationStatus;
    score: number;
    checks: EvaluationCheckResult[];
    runId?: string;
    startedAt: string;
    completedAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checks` | property | <code>checks: EvaluationCheckResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluatorId` | property | <code>evaluatorId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: EvaluationStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EvaluationSummary`

Evaluation Summary interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { EvaluationSummary } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface EvaluationSummary {
    id: string;
    status: EvaluationStatus;
    score: number;
    results: EvaluationResult[];
    runId?: string;
    startedAt: string;
    completedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `results` | property | <code>results: EvaluationResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: EvaluationStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `JsonSchemaValidationIssue`

JSON Schema Validation Issue interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { JsonSchemaValidationIssue } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface JsonSchemaValidationIssue {
    path: string;
    message: string;
    expected?: unknown;
    actual?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actual` | property | <code>actual?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expected` | property | <code>expected?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OutputContractValidationInput`

Output Contract Validation Input interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { OutputContractValidationInput } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface OutputContractValidationInput {
    contract: OutputContractSpec;
    output: unknown;
    runId?: string;
    evaluationId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contract` | property | <code>contract: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationId` | property | <code>evaluationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceCompletenessEvaluatorOptions`

Trace Completeness Evaluator Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { TraceCompletenessEvaluatorOptions } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface TraceCompletenessEvaluatorOptions {
    now?: () => string;
    enforceLifecyclePairs?: boolean;
    requireTerminalRun?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enforceLifecyclePairs` | property | <code>enforceLifecyclePairs?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `requireTerminalRun` | property | <code>requireTerminalRun?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TraceCompletenessInput`

Trace Completeness Input interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { TraceCompletenessInput } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export interface TraceCompletenessInput {
    events: FrameworkEvent[];
    traceSpec?: TraceSpec;
    runId?: string;
    requiredEventTypes?: string[];
    evaluationId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluationId` | property | <code>evaluationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredEventTypes` | property | <code>requiredEventTypes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceSpec` | property | <code>traceSpec?: TraceSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EvaluationStatus`

Public type alias for Evaluation Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { EvaluationStatus } from '@codesoul-co/hypha-testing';`
- Source module: [`evaluation`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/evaluation.ts)

### Declaration

```text
export type EvaluationStatus = 'passed' | 'failed';
```
