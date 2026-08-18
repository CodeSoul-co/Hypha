# `@codesoul-co/hypha-testing` / `regression`

- Package index: [`@codesoul-co/hypha-testing`](/api/testing)
- Source: [`packages/testing/src/regression.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)
- Exports: **7**

## Using this module

Use the Regression module for using the public contracts and operations for this capability boundary. It exports 1 class, 5 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  RegressionRunner,
} from '@codesoul-co/hypha-testing';

import type {
  RegressionCase,
  RegressionCaseResult,
  RegressionRunnerOptions,
  RegressionRunResult,
  RegressionSpecRunInput,
  RegressionCheck,
} from '@codesoul-co/hypha-testing';
```

### Usage patterns

- Use the 6 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `RegressionRunner` | class | <code>new RegressionRunner(options?: RegressionRunnerOptions): RegressionRunner</code> | Regression Runner class with 4 public constructor or member entries; its exact declarations are listed below. |
| `RegressionCase` | interface | <code>interface RegressionCase</code> | Regression Case interface with 6 public fields or methods. |
| `RegressionCaseResult` | interface | <code>interface RegressionCaseResult</code> | Regression Case Result interface with 8 public fields or methods. |
| `RegressionRunnerOptions` | interface | <code>interface RegressionRunnerOptions</code> | Regression Runner Options interface with 9 public fields or methods. |
| `RegressionRunResult` | interface | <code>interface RegressionRunResult</code> | Regression Run Result interface with 7 public fields or methods. |
| `RegressionSpecRunInput` | interface | <code>interface RegressionSpecRunInput</code> | Regression Spec Run Input interface with 9 public fields or methods. |
| `RegressionCheck` | type | <code>type RegressionCheck = 'event_types' &#124; 'state_path' &#124; 'tool_calls' &#124; 'policy_decisions' &#124; 'output_contract'</code> | Public type alias for Regression Check; the declaration contains its complete type expression. |

## `RegressionRunner`

Regression Runner class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RegressionRunner } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export declare class RegressionRunner {
    constructor(options?: RegressionRunnerOptions);
    runCase(regressionCase: RegressionCase): RegressionCaseResult;
    runSpec(input: RegressionSpecRunInput): RegressionRunResult;
    runSpecAndRecord(input: RegressionSpecRunInput): Promise<RegressionRunResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: RegressionRunnerOptions): RegressionRunner</code> | Creates an instance of this class. |
| `runCase` | method | <code>runCase(regressionCase: RegressionCase): RegressionCaseResult</code> | Public method; parameters and return type are shown in the signature. |
| `runSpec` | method | <code>runSpec(input: RegressionSpecRunInput): RegressionRunResult</code> | Public method; parameters and return type are shown in the signature. |
| `runSpecAndRecord` | method | <code>runSpecAndRecord(input: RegressionSpecRunInput): Promise&lt;RegressionRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RegressionCase`

Regression Case interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { RegressionCase } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export interface RegressionCase {
    id: string;
    fixture: ReplayFixture;
    actualEvents?: FrameworkEvent[];
    requiredChecks?: RegressionCheck[];
    outputContract?: OutputContractSpec;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualEvents` | property | <code>actualEvents?: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixture` | property | <code>fixture: ReplayFixture</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredChecks` | property | <code>requiredChecks?: RegressionCheck[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionCaseResult`

Regression Case Result interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RegressionCaseResult } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export interface RegressionCaseResult {
    id: string;
    fixtureId: string;
    runId: string;
    status: EvaluationStatus;
    checks: EvaluationCheckResult[];
    traceDiff: TraceDiff;
    outputContractResult?: EvaluationResult;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checks` | property | <code>checks: EvaluationCheckResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixtureId` | property | <code>fixtureId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContractResult` | property | <code>outputContractResult?: EvaluationResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: EvaluationStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceDiff` | property | <code>traceDiff: TraceDiff</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionRunnerOptions`

Regression Runner Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RegressionRunnerOptions } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export interface RegressionRunnerOptions {
    replayEngine?: ReplayEngine;
    outputValidator?: OutputContractValidator;
    now?: () => string;
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
| `replayEngine` | property | <code>replayEngine?: ReplayEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trace` | property | <code>trace?: TraceRecorder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionRunResult`

Regression Run Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RegressionRunResult } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export interface RegressionRunResult {
    id: string;
    status: EvaluationStatus;
    specId?: string;
    startedAt: string;
    completedAt: string;
    cases: RegressionCaseResult[];
    summary: {
        total: number;
        passed: number;
        failed: number;
    };
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cases` | property | <code>cases: RegressionCaseResult[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `specId` | property | <code>specId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `startedAt` | property | <code>startedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: EvaluationStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: { total: number; passed: number; failed: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionSpecRunInput`

Regression Spec Run Input interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { RegressionSpecRunInput } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export interface RegressionSpecRunInput {
    spec: RegressionSpec;
    fixtures: ReplayFixture[] | Map<string, ReplayFixture>;
    actualEventsByFixtureId?: Map<string, FrameworkEvent[]>;
    outputContractsByFixtureId?: Map<string, OutputContractSpec>;
    runId?: string;
    sessionId?: string;
    workspaceId?: string;
    agentId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actualEventsByFixtureId` | property | <code>actualEventsByFixtureId?: Map&lt;string, FrameworkEvent&lt;unknown&gt;[]&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fixtures` | property | <code>fixtures: ReplayFixture[] &#124; Map&lt;string, ReplayFixture&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContractsByFixtureId` | property | <code>outputContractsByFixtureId?: Map&lt;string, OutputContractSpec&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: RegressionSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceId` | property | <code>workspaceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionCheck`

Public type alias for Regression Check; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { RegressionCheck } from '@codesoul-co/hypha-testing';`
- Source module: [`regression`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/testing/src/regression.ts)

### Declaration

```text
export type RegressionCheck = 'event_types' | 'state_path' | 'tool_calls' | 'policy_decisions' | 'output_contract';
```
