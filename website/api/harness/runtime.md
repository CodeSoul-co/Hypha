# `@codesoul-co/hypha-harness` / `runtime`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Source: [`packages/harness/src/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)
- Exports: **20**

## Using this module

Use the Runtime module for executing runtime behavior at this boundary. It exports 3 classes, 4 functions, 13 interfaces.

### Import from the package entrypoint

```ts
import {
  EventFirstRuntime,
  HarnessedReActFSMRunner,
  RunManager,
  projectAudit,
  projectReplay,
  projectRun,
  projectSession,
} from '@codesoul-co/hypha-harness';

import type {
  AppendRunEventInput,
  AuditProjection,
  CreateRunInput,
  CreateSessionInput,
  HarnessedReActFSMRunInput,
  HarnessedReActFSMRunnerOptions,
  HarnessedReActFSMRunResult,
  RegressionProjection,
} from '@codesoul-co/hypha-harness';

// The complete export list is documented below.
```

### Usage patterns

- Use the 13 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 3 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 4 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EventFirstRuntime` | class | <code>new EventFirstRuntime(events?: EventStore): EventFirstRuntime</code> | Event First Runtime class with 10 public constructor or member entries; its exact declarations are listed below. |
| `HarnessedReActFSMRunner` | class | <code>new HarnessedReActFSMRunner(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | Harnessed ReAct FSM Runner class with 2 public constructor or member entries; its exact declarations are listed below. |
| `RunManager` | class | <code>new RunManager(options?: RunManagerOptions): RunManager</code> | Run Manager class with 36 public constructor or member entries; its exact declarations are listed below. |
| `projectAudit` | function | <code>projectAudit(events: FrameworkEvent[]): AuditProjection</code> | Project Audit function with 1 public call signature; parameters and return types are listed below. |
| `projectReplay` | function | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | Project Replay function with 1 public call signature; parameters and return types are listed below. |
| `projectRun` | function | <code>projectRun(events: FrameworkEvent[]): RuntimeRun &#124; null</code> | Project Run function with 1 public call signature; parameters and return types are listed below. |
| `projectSession` | function | <code>projectSession(events: FrameworkEvent[]): RuntimeSession &#124; null</code> | Project Session function with 1 public call signature; parameters and return types are listed below. |
| `AppendRunEventInput` | interface | <code>interface AppendRunEventInput</code> | Append Run Event Input interface with 11 public fields or methods. |
| `AuditProjection` | interface | <code>interface AuditProjection</code> | Audit Projection interface with 8 public fields or methods. |
| `CreateRunInput` | interface | <code>interface CreateRunInput</code> | Create Run Input interface with 9 public fields or methods. |
| `CreateSessionInput` | interface | <code>interface CreateSessionInput</code> | Create Session Input interface with 6 public fields or methods. |
| `HarnessedReActFSMRunInput` | interface | <code>interface HarnessedReActFSMRunInput extends ContextBuildInput&lt;TInput&gt;</code> | Harnessed ReAct FSM Run Input interface with 16 public fields or methods. |
| `HarnessedReActFSMRunnerOptions` | interface | <code>interface HarnessedReActFSMRunnerOptions</code> | Harnessed ReAct FSM Runner Options interface with 22 public fields or methods. |
| `HarnessedReActFSMRunResult` | interface | <code>interface HarnessedReActFSMRunResult</code> | Harnessed ReAct FSM Run Result interface with 4 public fields or methods. |
| `RegressionProjection` | interface | <code>interface RegressionProjection</code> | Regression Projection interface with 8 public fields or methods. |
| `ReplayProjection` | interface | <code>interface ReplayProjection</code> | Replay Projection interface with 16 public fields or methods. |
| `RunExecutionContext` | interface | <code>interface RunExecutionContext</code> | Run Execution Context interface with 4 public fields or methods. |
| `RunManagerOptions` | interface | <code>interface RunManagerOptions</code> | Run Manager Options interface with 2 public fields or methods. |
| `RuntimeRun` | interface | <code>interface RuntimeRun</code> | Runtime Run interface with 12 public fields or methods. |
| `RuntimeSession` | interface | <code>interface RuntimeSession</code> | Runtime Session interface with 8 public fields or methods. |

## `EventFirstRuntime`

Event First Runtime class with 10 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { EventFirstRuntime } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare class EventFirstRuntime {
    constructor(events?: EventStore);
    createSession(input: CreateSessionInput): Promise<RuntimeSession>;
    createRun(input: CreateRunInput): Promise<RuntimeRun>;
    appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent>;
    projectSession(sessionId: string): Promise<RuntimeSession | null>;
    projectRun(runId: string): Promise<RuntimeRun | null>;
    projectReplay(runId: string): Promise<ReplayProjection>;
    projectAudit(runId: string): Promise<AuditProjection>;
    projectRegression(runId: string): Promise<RegressionProjection>;
    listEvents(runId: string): Promise<FrameworkEvent[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appendRunEvent` | method | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(events?: EventStore): EventFirstRuntime</code> | Creates an instance of this class. |
| `createRun` | method | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createSession` | method | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listEvents` | method | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectAudit` | method | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectRegression` | method | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectReplay` | method | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectRun` | method | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectSession` | method | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `HarnessedReActFSMRunner`

Harnessed ReAct FSM Runner class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { HarnessedReActFSMRunner } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare class HarnessedReActFSMRunner {
    constructor(options: HarnessedReActFSMRunnerOptions);
    run(input: HarnessedReActFSMRunInput): Promise<HarnessedReActFSMRunResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | Creates an instance of this class. |
| `run` | method | <code>run(input: HarnessedReActFSMRunInput): Promise&lt;HarnessedReActFSMRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `RunManager`

Run Manager class with 36 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { RunManager } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare class RunManager {
    constructor(options?: RunManagerOptions);
    eventRuntime(): EventFirstRuntime;
    createSession(input: CreateSessionInput): Promise<RuntimeSession>;
    createRun(input: CreateRunInput): Promise<RuntimeRun>;
    appendRunEvent(input: AppendRunEventInput): Promise<FrameworkEvent>;
    startRun(run: RuntimeRun, timestamp?: string): Promise<FrameworkEvent>;
    recordTransitionAccepted(context: RunExecutionContext, transition: StateTransition): Promise<FrameworkEvent>;
    recordStateEntered(context: RunExecutionContext, record: FSMStateEnteredRecord): Promise<FrameworkEvent>;
    recordContextBuildStarted(context: RunExecutionContext): Promise<FrameworkEvent>;
    recordContextBuildCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordSkillSelected(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordSkillLoaded(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordSkillCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordThinkingStarted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordThinkingCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordAgentDeliberationStarted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordAgentDeliberationCompleted(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordReasoningDecision(context: RunExecutionContext, payload: Record<string, unknown>): Promise<FrameworkEvent>;
    recordReactStep(context: RunExecutionContext, step: ReActStep): Promise<FrameworkEvent>;
    recordReactContinuationCheckpoint(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint): Promise<FrameworkEvent>;
    recordReactContinuationResumed(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint, resumedAt: string): Promise<FrameworkEvent>;
    recordReactContinuationSuspended(context: RunExecutionContext, result: ReActRunResult): Promise<FrameworkEvent>;
    completeRun(context: RunExecutionContext, output: unknown, timestamp?: string): Promise<FrameworkEvent>;
    waitForHumanReview(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordHumanReviewRequested(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordHumanReviewApproved(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordHumanReviewRejected(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    recordContextCompacted(context: RunExecutionContext, payload?: Record<string, unknown>, timestamp?: string): Promise<FrameworkEvent>;
    cancelRun(context: RunExecutionContext, reason?: string, timestamp?: string): Promise<FrameworkEvent>;
    failRun(context: RunExecutionContext, error: unknown, timestamp?: string): Promise<FrameworkEvent>;
    listEvents(runId: string): Promise<FrameworkEvent[]>;
    projectRun(runId: string): Promise<RuntimeRun | null>;
    projectSession(sessionId: string): Promise<RuntimeSession | null>;
    projectReplay(runId: string): Promise<ReplayProjection>;
    projectAudit(runId: string): Promise<AuditProjection>;
    projectRegression(runId: string): Promise<RegressionProjection>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appendRunEvent` | method | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `cancelRun` | method | <code>cancelRun(context: RunExecutionContext, reason?: string, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `completeRun` | method | <code>completeRun(context: RunExecutionContext, output: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: RunManagerOptions): RunManager</code> | Creates an instance of this class. |
| `createRun` | method | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `createSession` | method | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `eventRuntime` | method | <code>eventRuntime(): EventFirstRuntime</code> | Public method; parameters and return type are shown in the signature. |
| `failRun` | method | <code>failRun(context: RunExecutionContext, error: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `listEvents` | method | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectAudit` | method | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectRegression` | method | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectReplay` | method | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectRun` | method | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `projectSession` | method | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordAgentDeliberationCompleted` | method | <code>recordAgentDeliberationCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordAgentDeliberationStarted` | method | <code>recordAgentDeliberationStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordContextBuildCompleted` | method | <code>recordContextBuildCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordContextBuildStarted` | method | <code>recordContextBuildStarted(context: RunExecutionContext): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordContextCompacted` | method | <code>recordContextCompacted(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordHumanReviewApproved` | method | <code>recordHumanReviewApproved(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordHumanReviewRejected` | method | <code>recordHumanReviewRejected(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordHumanReviewRequested` | method | <code>recordHumanReviewRequested(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordReactContinuationCheckpoint` | method | <code>recordReactContinuationCheckpoint(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordReactContinuationResumed` | method | <code>recordReactContinuationResumed(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint, resumedAt: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordReactContinuationSuspended` | method | <code>recordReactContinuationSuspended(context: RunExecutionContext, result: ReActRunResult): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordReactStep` | method | <code>recordReactStep(context: RunExecutionContext, step: ReActStep): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordReasoningDecision` | method | <code>recordReasoningDecision(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordSkillCompleted` | method | <code>recordSkillCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordSkillLoaded` | method | <code>recordSkillLoaded(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordSkillSelected` | method | <code>recordSkillSelected(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordStateEntered` | method | <code>recordStateEntered(context: RunExecutionContext, record: FSMStateEnteredRecord): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordThinkingCompleted` | method | <code>recordThinkingCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordThinkingStarted` | method | <code>recordThinkingStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `recordTransitionAccepted` | method | <code>recordTransitionAccepted(context: RunExecutionContext, transition: StateTransition): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `startRun` | method | <code>startRun(run: RuntimeRun, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `waitForHumanReview` | method | <code>waitForHumanReview(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `projectAudit`

Project Audit function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { projectAudit } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare function projectAudit(events: FrameworkEvent[]): AuditProjection;
```

### Call signature

```text
projectAudit(events: FrameworkEvent[]): AuditProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `AuditProjection`
- Description: The return contract is defined by the type shown above.

## `projectReplay`

Project Replay function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { projectReplay } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare function projectReplay(events: FrameworkEvent[]): ReplayProjection;
```

### Call signature

```text
projectReplay(events: FrameworkEvent[]): ReplayProjection
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReplayProjection`
- Description: The return contract is defined by the type shown above.

## `projectRun`

Project Run function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { projectRun } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare function projectRun(events: FrameworkEvent[]): RuntimeRun | null;
```

### Call signature

```text
projectRun(events: FrameworkEvent[]): RuntimeRun | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeRun`
- Description: The return contract is defined by the type shown above.

## `projectSession`

Project Session function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { projectSession } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export declare function projectSession(events: FrameworkEvent[]): RuntimeSession | null;
```

### Call signature

```text
projectSession(events: FrameworkEvent[]): RuntimeSession | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `events` | <code>FrameworkEvent&lt;unknown&gt;[]</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `RuntimeSession`
- Description: The return contract is defined by the type shown above.

## `AppendRunEventInput`

Append Run Event Input interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { AppendRunEventInput } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface AppendRunEventInput<TPayload = unknown> {
    id: string;
    type: FrameworkEvent['type'];
    runId: string;
    sessionId: string;
    userId: string;
    payload: TPayload;
    stepId?: string;
    fsmState?: string;
    agentId?: string;
    timestamp?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmState` | property | <code>fsmState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `payload` | property | <code>payload: TPayload</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/events").FrameworkEventType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AuditProjection`

Audit Projection interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { AuditProjection } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface AuditProjection {
    runId: string;
    eventCount: number;
    policyDecisionCount: number;
    memoryWriteCount: number;
    reasoningDecisionCount: number;
    skillActivationCount: number;
    toolCallCount: number;
    missingRunIds: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventCount` | property | <code>eventCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryWriteCount` | property | <code>memoryWriteCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missingRunIds` | property | <code>missingRunIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionCount` | property | <code>policyDecisionCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningDecisionCount` | property | <code>reasoningDecisionCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillActivationCount` | property | <code>skillActivationCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCallCount` | property | <code>toolCallCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CreateRunInput`

Create Run Input interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { CreateRunInput } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface CreateRunInput {
    id: string;
    sessionId: string;
    userId: string;
    domainPackRef?: SpecRef;
    workflowRef?: SpecRef;
    agentRef?: SpecRef;
    input?: unknown;
    metadata?: Record<string, unknown>;
    timestamp?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `CreateSessionInput`

Create Session Input interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { CreateSessionInput } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface CreateSessionInput {
    id: string;
    userId: string;
    domainPackRef?: SpecRef;
    sessionProfileRef?: SpecRef;
    metadata?: Record<string, unknown>;
    timestamp?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfileRef` | property | <code>sessionProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timestamp` | property | <code>timestamp?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HarnessedReActFSMRunInput`

Harnessed ReAct FSM Run Input interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { HarnessedReActFSMRunInput } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface HarnessedReActFSMRunInput<TInput = unknown> extends ContextBuildInput<TInput> {
    sessionId: string;
    userId: string;
    domainPackRef?: SpecRef;
    workflowRef?: SpecRef;
    createSession?: boolean;
    resumeFromCheckpoint?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSpec` | property | <code>contextSpec?: ContextSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createSession` | property | <code>createSession?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryScope` | property | <code>memoryScope?: MemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages?: ModelMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resumeFromCheckpoint` | property | <code>resumeFromCheckpoint?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolExecutionScope` | property | <code>toolExecutionScope?: ToolExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolPrincipal` | property | <code>toolPrincipal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HarnessedReActFSMRunnerOptions`

Harnessed ReAct FSM Runner Options interface with 22 public fields or methods.

- Kind: interface
- Import: `import type { HarnessedReActFSMRunnerOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface HarnessedReActFSMRunnerOptions {
    inference: InferenceProvider;
    toolRunner?: ToolRunner;
    runManager?: RunManager;
    fsmSpec?: FSMProcessSpec;
    contextBuilder?: ContextBuilder;
    skillRegistry?: SkillRegistry;
    skillSelector?: SkillSelector;
    skillContextLoader?: SkillContextLoader;
    skillPolicy?: SkillPolicy;
    allowedSkills?: SkillContextBuilderOptions['allowedSkills'];
    requiredSkills?: SkillContextBuilderOptions['requiredSkills'];
    thinkingPlanner?: ThinkingPlanner;
    agenticReasoner?: AgenticReasoner;
    reasoningConfig?: ReasoningConfig;
    verifier?: Verifier;
    reactRuntime?: ReActAgentRuntime;
    maxIterations?: number;
    executionBudget?: Partial<ReActExecutionBudget>;
    reactCheckpointStore?: ReActContinuationCheckpointStore;
    continueAfterTool?: boolean;
    resolveToolExecutionScope?: (input: {
        fsmState: string;
        context: BuiltAgentContext;
        toolId: string;
    }) => ToolExecutionScope | undefined;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticReasoner` | property | <code>agenticReasoner?: AgenticReasoner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextBuilder` | property | <code>contextBuilder?: ContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `continueAfterTool` | property | <code>continueAfterTool?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionBudget` | property | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmSpec` | property | <code>fsmSpec?: FSMProcessSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inference` | property | <code>inference: InferenceProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIterations` | property | <code>maxIterations?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `reactCheckpointStore` | property | <code>reactCheckpointStore?: ReActContinuationCheckpointStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reactRuntime` | property | <code>reactRuntime?: ReActAgentRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningConfig` | property | <code>reasoningConfig?: ReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSkills` | property | <code>requiredSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveToolExecutionScope` | method | <code>resolveToolExecutionScope?(input: { fsmState: string; context: BuiltAgentContext; toolId: string; }): ToolExecutionScope &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `runManager` | property | <code>runManager?: RunManager</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillContextLoader` | property | <code>skillContextLoader?: SkillContextLoader</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillPolicy` | property | <code>skillPolicy?: SkillPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRegistry` | property | <code>skillRegistry?: SkillRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillSelector` | property | <code>skillSelector?: SkillSelector</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingPlanner` | property | <code>thinkingPlanner?: ThinkingPlanner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRunner` | property | <code>toolRunner?: ToolRunner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifier` | property | <code>verifier?: Verifier</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `HarnessedReActFSMRunResult`

Harnessed ReAct FSM Run Result interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { HarnessedReActFSMRunResult } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface HarnessedReActFSMRunResult {
    run: RuntimeRun;
    react: ReActRunResult;
    fsmSnapshot: ReturnType<FSMRuntime['getSnapshot']>;
    events: FrameworkEvent[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmSnapshot` | property | <code>fsmSnapshot: import("/Users/erwin/Downloads/codespace/Hypha/packages/fsm/dist/index").FSMSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `react` | property | <code>react: ReActRunResult</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `run` | property | <code>run: RuntimeRun</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RegressionProjection`

Regression Projection interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RegressionProjection } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface RegressionProjection {
    runId: string;
    eventTypes: string[];
    statePath: string[];
    toolCalls: Array<{
        toolId?: unknown;
        status: string;
    }>;
    memoryWriteCount: number;
    reasoningDecisionCount: number;
    skillActivationCount: number;
    finalOutput?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalOutput` | property | <code>finalOutput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryWriteCount` | property | <code>memoryWriteCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningDecisionCount` | property | <code>reasoningDecisionCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillActivationCount` | property | <code>skillActivationCount: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: { toolId?: unknown; status: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReplayProjection`

Replay Projection interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { ReplayProjection } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface ReplayProjection {
    runId: string;
    events: FrameworkEvent[];
    statePath: string[];
    toolCallEventIds: string[];
    policyDecisionEventIds: string[];
    memoryEventIds: string[];
    reasoningEventIds: string[];
    skillEventIds: string[];
    modelCalls: FrameworkEvent[];
    toolCalls: FrameworkEvent[];
    memoryReads: FrameworkEvent[];
    memoryWrites: FrameworkEvent[];
    reasoningEvents: FrameworkEvent[];
    skillEvents: FrameworkEvent[];
    policyDecisions: FrameworkEvent[];
    finalOutput?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalOutput` | property | <code>finalOutput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryEventIds` | property | <code>memoryEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryReads` | property | <code>memoryReads: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryWrites` | property | <code>memoryWrites: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisionEventIds` | property | <code>policyDecisionEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecisions` | property | <code>policyDecisions: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningEventIds` | property | <code>reasoningEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningEvents` | property | <code>reasoningEvents: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillEventIds` | property | <code>skillEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillEvents` | property | <code>skillEvents: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCallEventIds` | property | <code>toolCallEventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: FrameworkEvent&lt;unknown&gt;[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunExecutionContext`

Run Execution Context interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { RunExecutionContext } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface RunExecutionContext {
    runId: string;
    sessionId: string;
    userId: string;
    agentId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RunManagerOptions`

Run Manager Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RunManagerOptions } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface RunManagerOptions {
    runtime?: EventFirstRuntime;
    operationalTelemetry?: RuntimeOperationalTelemetry;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `operationalTelemetry` | property | <code>operationalTelemetry?: RuntimeOperationalTelemetry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runtime` | property | <code>runtime?: EventFirstRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeRun`

Runtime Run interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeRun } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface RuntimeRun {
    id: string;
    sessionId: string;
    userId: string;
    domainPackRef?: SpecRef;
    workflowRef?: SpecRef;
    agentRef?: SpecRef;
    status: 'queued' | 'running' | 'waiting_human' | 'completed' | 'failed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    completedAt?: string;
    input?: unknown;
    output?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `completedAt` | property | <code>completedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RuntimeSession`

Runtime Session interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { RuntimeSession } from '@codesoul-co/hypha-harness';`
- Source module: [`runtime`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)

### Declaration

```text
export interface RuntimeSession {
    id: string;
    userId: string;
    domainPackRef?: SpecRef;
    sessionProfileRef?: SpecRef;
    metadata: Record<string, unknown>;
    status: 'active' | 'closed';
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfileRef` | property | <code>sessionProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "active" &#124; "closed"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
