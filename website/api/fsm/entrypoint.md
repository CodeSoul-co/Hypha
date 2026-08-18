# `@codesoul-co/hypha-fsm` / `index`

- Package index: [`@codesoul-co/hypha-fsm`](/api/fsm)
- Source: [`packages/fsm/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)
- Exports: **50**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-fsm`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  FSMRuntime,
  defaultReActFSMProcessSpec,
  fsmProcessSpecDefinition,
  fsmProcessSpecExample,
  fsmProcessSpecJsonSchema,
  fsmProcessSpecSchema,
  fsmSpecDefinitions,
  fsmSpecJsonSchemas,
} from '@codesoul-co/hypha-fsm';

import type {
  FSMGuardContext,
  FSMProcessSpec,
  FSMRecoveryDecisionRecord,
  FSMRuntimeCancelOptions,
  FSMRuntimeOptions,
  FSMRuntimeTransitionOptions,
  FSMSnapshot,
  FSMStateEnteredRecord,
} from '@codesoul-co/hypha-fsm';

// The complete export list is documented below.
```

### Usage patterns

- Use the 19 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 17 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 13 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { fsmProcessSpecSchema } from '@codesoul-co/hypha-fsm';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = fsmProcessSpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FSMRuntime` | class | <code>new FSMRuntime(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | FSM Runtime class with 8 public constructor or member entries; its exact declarations are listed below. |
| `defaultReActFSMProcessSpec` | constant | <code>const defaultReActFSMProcessSpec: FSMProcessSpec</code> | Default ReAct FSM Process Spec constant exported by the `index` module. |
| `fsmProcessSpecDefinition` | constant | <code>const fsmProcessSpecDefinition: SpecSchemaDefinition&lt;FSMProcessSpec&gt;</code> | Runtime validation entrypoint for the FSM Process spec, combining its parser, example and JSON Schema. |
| `fsmProcessSpecExample` | constant | <code>const fsmProcessSpecExample: FSMProcessSpec</code> | Valid example value for FSM Process Spec. |
| `fsmProcessSpecJsonSchema` | constant | <code>const fsmProcessSpecJsonSchema: JsonSchema</code> | JSON Schema for FSM Process Spec. |
| `fsmProcessSpecSchema` | constant | <code>const fsmProcessSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; states: z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodOptional&lt;z....</code> | Runtime schema for FSM Process Spec. |
| `fsmSpecDefinitions` | constant | <code>const fsmSpecDefinitions: readonly [SpecSchemaDefinition&lt;FSMProcessSpec&gt;]</code> | FSM Spec Definitions constant exported by the `index` module. |
| `fsmSpecJsonSchemas` | constant | <code>const fsmSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | FSM Spec JSON Schemas constant exported by the `index` module. |
| `fsmStateSpecSchema` | constant | <code>const fsmStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["idle", "run_initialized", "context_built", "reasoning", "action_selected", "poli...</code> | Runtime schema for FSM State Spec. |
| `fsmTransitionSpecSchema` | constant | <code>const fsmTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; traceEvent: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; traceEvent?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?...</code> | Runtime schema for FSM Transition Spec. |
| `HARNESS_FSM_STATE_IDS` | constant | <code>const HARNESS_FSM_STATE_IDS: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Recovering", "Compensating", "Quarantined", "HumanReview", "Completed", "Failed", "Cancelled"]</code> | Stable Harness states owned by the framework runtime. Domain Packs may bind capabilities and policy to these phases, but must not add, remove, rename, or reconnect them. |
| `HARNESS_STATE_CAPABILITY_AREA` | constant | <code>const HARNESS_STATE_CAPABILITY_AREA: Readonly&lt;Record&lt;"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled", HarnessCapabilityArea&gt;&gt;</code> | `activity` is the governed side-effect phase shared by Tool, MCP, Execution, file, Memory-write, and external-write adapters. The concrete activity type remains Event evidence; it never becomes a Domain-defined FSM state. |
| `REACT_FSM_STATE_PATH` | constant | <code>const REACT_FSM_STATE_PATH: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Completed"]</code> | REACT FSM STATE PATH constant exported by the `index` module. |
| `REACT_PHASE_TO_HARNESS_STATE` | constant | <code>const REACT_PHASE_TO_HARNESS_STATE: Readonly&lt;{ reason: "Reasoning"; select_action: "ActionSelected"; policy_check: "PolicyChecked"; act: "Acting"; observe_result: "ObservationRecorded"; verify: "Verifying"; memory_sync: "MemorySync"; complete: "Completed"; fail: "Failed"; human_review: "HumanReview"; cancel: "Cancelled"; }&gt;</code> | REACT PHASE TO HARNESS STATE constant exported by the `index` module. |
| `analyzeFSMTopology` | function | <code>analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis</code> | Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow. |
| `applyTransition` | function | <code>applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string &#124; FSMTransitionOptions): FSMSnapshot</code> | Apply Transition function with 1 public call signature; parameters and return types are listed below. |
| `applyTransitionWithRuntimePolicy` | function | <code>applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;FSMSnapshot&gt;</code> | Apply Transition With Runtime Policy function with 1 public call signature; parameters and return types are listed below. |
| `assertHarnessFSMProcessSpec` | function | <code>assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void</code> | Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow. |
| `canRetryState` | function | <code>canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean</code> | Can Retry State function with 1 public call signature; parameters and return types are listed below. |
| `createHarnessFSMProcessSpec` | function | <code>createHarnessFSMProcessSpec(): FSMProcessSpec</code> | Returns an isolated copy so composition code cannot mutate the shared contract. |
| `createInitialSnapshot` | function | <code>createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot</code> | Create Initial Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `evaluateGuardExpression` | function | <code>evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean</code> | Evaluate Guard Expression function with 1 public call signature; parameters and return types are listed below. |
| `evaluateStateTimeout` | function | <code>evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation &#124; null</code> | Evaluate State Timeout function with 1 public call signature; parameters and return types are listed below. |
| `getAllowedTransitions` | function | <code>getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[]</code> | Get Allowed Transitions function with 1 public call signature; parameters and return types are listed below. |
| `harnessStateForReActPhase` | function | <code>harnessStateForReActPhase(phase: string): HarnessFSMStateId &#124; undefined</code> | Harness State For ReAct Phase function with 1 public call signature; parameters and return types are listed below. |
| `isHarnessFSMProcessSpec` | function | <code>isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean</code> | Returns false for either an invalid process or a valid non-Harness topology. |
| `isHarnessFSMStateId` | function | <code>isHarnessFSMStateId(value: string): value is HarnessFSMStateId</code> | Is Harness FSM State ID function with 1 public call signature; parameters and return types are listed below. |
| `parseFSMProcessSpec` | function | <code>parseFSMProcessSpec(input: unknown): FSMProcessSpec</code> | Parse FSM Process Spec function with 1 public call signature; parameters and return types are listed below. |
| `planHarnessCapabilityPath` | function | <code>planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[]</code> | Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work. |
| `validateFSMProcessSpec` | function | <code>validateFSMProcessSpec(spec: FSMProcessSpec): void</code> | Validate FSM Process Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateFSMSnapshot` | function | <code>validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void</code> | Validate FSM Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `FSMGuardContext` | interface | <code>interface FSMGuardContext</code> | FSM Guard Context interface with 3 public fields or methods. |
| `FSMProcessSpec` | interface | <code>interface FSMProcessSpec extends VersionedSpec, SpecMetadata</code> | FSM Process Spec interface with 13 public fields or methods. |
| `FSMRecoveryDecisionRecord` | interface | <code>interface FSMRecoveryDecisionRecord</code> | FSM Recovery Decision Record interface with 4 public fields or methods. |
| `FSMRuntimeCancelOptions` | interface | <code>interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions</code> | FSM Runtime Cancel Options interface with 8 public fields or methods. |
| `FSMRuntimeOptions` | interface | <code>interface FSMRuntimeOptions</code> | FSM Runtime Options interface with 5 public fields or methods. |
| `FSMRuntimeTransitionOptions` | interface | <code>interface FSMRuntimeTransitionOptions extends FSMTransitionOptions</code> | FSM Runtime Transition Options interface with 7 public fields or methods. |
| `FSMSnapshot` | interface | <code>interface FSMSnapshot</code> | FSM Snapshot interface with 8 public fields or methods. |
| `FSMStateEnteredRecord` | interface | <code>interface FSMStateEnteredRecord</code> | FSM State Entered Record interface with 7 public fields or methods. |
| `FSMStateSpec` | interface | <code>interface FSMStateSpec extends SpecMetadata</code> | FSM State Spec interface with 15 public fields or methods. |
| `FSMTimeoutEvaluation` | interface | <code>interface FSMTimeoutEvaluation</code> | FSM Timeout Evaluation interface with 5 public fields or methods. |
| `FSMTopologyAnalysis` | interface | <code>interface FSMTopologyAnalysis</code> | FSM Topology Analysis interface with 5 public fields or methods. |
| `FSMTransitionOptions` | interface | <code>interface FSMTransitionOptions</code> | FSM Transition Options interface with 3 public fields or methods. |
| `FSMTransitionSpec` | interface | <code>interface FSMTransitionSpec</code> | FSM Transition Spec interface with 5 public fields or methods. |
| `StateTransition` | interface | <code>interface StateTransition</code> | State Transition interface with 8 public fields or methods. |
| `FSMGuardEvaluator` | type | <code>type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) =&gt; boolean</code> | Public type alias for FSM Guard Evaluator; the declaration contains its complete type expression. |
| `FSMStateKind` | type | <code>type FSMStateKind = 'idle' &#124; 'run_initialized' &#124; 'context_built' &#124; 'reasoning' &#124; 'action_selected' &#124; 'policy_checked' &#124; 'acting' &#124; 'observation_recorded' &#124; 'verifying' &#124; 'memory_sync' &#124; 'recovering' &#124; 'compensating' &#124; 'quarantined' &#124; 'human_review' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'domain'</code> | Public type alias for FSM State Kind; the declaration contains its complete type expression. |
| `FsmTerminalStatus` | type | <code>type FsmTerminalStatus = 'completed' &#124; 'failed' &#124; 'cancelled'</code> | Public type alias for FSM Terminal Status; the declaration contains its complete type expression. |
| `HarnessCapabilityArea` | type | <code>type HarnessCapabilityArea = 'lifecycle' &#124; 'context' &#124; 'reasoning' &#124; 'policy' &#124; 'activity' &#124; 'observation' &#124; 'verification' &#124; 'memory' &#124; 'recovery' &#124; 'human_review' &#124; 'terminal'</code> | Public type alias for Harness Capability Area; the declaration contains its complete type expression. |
| `HarnessFSMStateId` | type | <code>type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number]</code> | Public type alias for Harness FSM State ID; the declaration contains its complete type expression. |

## `FSMRuntime`

FSM Runtime class with 8 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { FSMRuntime } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare class FSMRuntime {
    constructor(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot);
    getSnapshot(): FSMSnapshot;
    start(metadata?: Record<string, unknown>): Promise<FSMSnapshot>;
    transition(to: string, options?: FSMRuntimeTransitionOptions): Promise<StateTransition>;
    transitionPath(states: string[], options?: FSMRuntimeTransitionOptions): Promise<StateTransition[]>;
    cancel(options?: FSMRuntimeCancelOptions): Promise<StateTransition>;
    decideRecovery(anomaly: FSMAnomaly, options?: {
            stateId?: string;
            now?: string;
        }): Promise<FSMRecoveryDecision>;
    registerRecoverySuccess(circuitKey: string, now?: string): FSMSnapshot;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(options?: FSMRuntimeCancelOptions): Promise&lt;StateTransition&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | Creates an instance of this class. |
| `decideRecovery` | method | <code>decideRecovery(anomaly: FSMAnomaly, options?: { stateId?: string; now?: string; }): Promise&lt;FSMRecoveryDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `getSnapshot` | method | <code>getSnapshot(): FSMSnapshot</code> | Public method; parameters and return type are shown in the signature. |
| `registerRecoverySuccess` | method | <code>registerRecoverySuccess(circuitKey: string, now?: string): FSMSnapshot</code> | Public method; parameters and return type are shown in the signature. |
| `start` | method | <code>start(metadata?: Record&lt;string, unknown&gt;): Promise&lt;FSMSnapshot&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transition` | method | <code>transition(to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `transitionPath` | method | <code>transitionPath(states: string[], options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `defaultReActFSMProcessSpec`

Default ReAct FSM Process Spec constant exported by the `index` module.

- Kind: constant
- Import: `import { defaultReActFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const defaultReActFSMProcessSpec: FSMProcessSpec;
```

## `fsmProcessSpecDefinition`

Runtime validation entrypoint for the FSM Process spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { fsmProcessSpecDefinition } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const fsmProcessSpecDefinition: SpecSchemaDefinition<FSMProcessSpec>;
```

## `fsmProcessSpecExample`

Valid example value for FSM Process Spec.

- Kind: constant
- Import: `import { fsmProcessSpecExample } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const fsmProcessSpecExample: FSMProcessSpec;
```

## `fsmProcessSpecJsonSchema`

JSON Schema for FSM Process Spec.

- Kind: constant
- Import: `import { fsmProcessSpecJsonSchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const fsmProcessSpecJsonSchema: JsonSchema;
```

## `fsmProcessSpecSchema`

Runtime schema for FSM Process Spec.

- Kind: constant
- Import: `import { fsmProcessSpecSchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const fsmProcessSpecSchema: (typeof import('@codesoul-co/hypha-fsm'))['fsmProcessSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `fsmSpecDefinitions`

FSM Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { fsmSpecDefinitions } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const fsmSpecDefinitions: readonly [SpecSchemaDefinition<FSMProcessSpec>];
```

## `fsmSpecJsonSchemas`

FSM Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { fsmSpecJsonSchemas } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const fsmSpecJsonSchemas: Record<string, JsonSchema>;
```

## `fsmStateSpecSchema`

Runtime schema for FSM State Spec.

- Kind: constant
- Import: `import { fsmStateSpecSchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const fsmStateSpecSchema: (typeof import('@codesoul-co/hypha-fsm'))['fsmStateSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `fsmTransitionSpecSchema`

Runtime schema for FSM Transition Spec.

- Kind: constant
- Import: `import { fsmTransitionSpecSchema } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const fsmTransitionSpecSchema: z.ZodObject<{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; traceEvent: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string | undefined; guard?: string | undefined; traceEvent?: string | undefined; }, { from: string; to: string; description?: string | undefined; guard?: string | undefined; traceEvent?: string | undefined; }>;
```

## `HARNESS_FSM_STATE_IDS`

Stable Harness states owned by the framework runtime. Domain Packs may bind capabilities and policy to these phases, but must not add, remove, rename, or reconnect them.

- Kind: constant
- Import: `import { HARNESS_FSM_STATE_IDS } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const HARNESS_FSM_STATE_IDS: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Recovering", "Compensating", "Quarantined", "HumanReview", "Completed", "Failed", "Cancelled"];
```

## `HARNESS_STATE_CAPABILITY_AREA`

`activity` is the governed side-effect phase shared by Tool, MCP, Execution, file, Memory-write, and external-write adapters. The concrete activity type remains Event evidence; it never becomes a Domain-defined FSM state.

- Kind: constant
- Import: `import { HARNESS_STATE_CAPABILITY_AREA } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const HARNESS_STATE_CAPABILITY_AREA: Readonly<Record<"Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled", HarnessCapabilityArea>>;
```

## `REACT_FSM_STATE_PATH`

REACT FSM STATE PATH constant exported by the `index` module.

- Kind: constant
- Import: `import { REACT_FSM_STATE_PATH } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const REACT_FSM_STATE_PATH: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Completed"];
```

## `REACT_PHASE_TO_HARNESS_STATE`

REACT PHASE TO HARNESS STATE constant exported by the `index` module.

- Kind: constant
- Import: `import { REACT_PHASE_TO_HARNESS_STATE } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare const REACT_PHASE_TO_HARNESS_STATE: Readonly<{ reason: "Reasoning"; select_action: "ActionSelected"; policy_check: "PolicyChecked"; act: "Acting"; observe_result: "ObservationRecorded"; verify: "Verifying"; memory_sync: "MemorySync"; complete: "Completed"; fail: "Failed"; human_review: "HumanReview"; cancel: "Cancelled"; }>;
```

## `analyzeFSMTopology`

Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow.

- Kind: function
- Import: `import { analyzeFSMTopology } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis;
```

### Call signature

```text
analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis
```

Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMTopologyAnalysis`
- Description: The return contract is defined by the type shown above.

## `applyTransition`

Apply Transition function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { applyTransition } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string | FSMTransitionOptions): FSMSnapshot;
```

### Call signature

```text
applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string | FSMTransitionOptions): FSMSnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `snapshot` | <code>FSMSnapshot</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `to` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `nowOrOptions` | <code>string &#124; FSMTransitionOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMSnapshot`
- Description: The return contract is defined by the type shown above.

## `applyTransitionWithRuntimePolicy`

Apply Transition With Runtime Policy function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { applyTransitionWithRuntimePolicy } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise<FSMSnapshot>;
```

### Call signature

```text
applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise<FSMSnapshot>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `snapshot` | <code>FSMSnapshot</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `to` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>FSMRuntimeTransitionOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<FSMSnapshot>`
- Description: The return contract is defined by the type shown above.

## `assertHarnessFSMProcessSpec`

Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow.

- Kind: function
- Import: `import { assertHarnessFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void;
```

### Call signature

```text
assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void
```

Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `canRetryState`

Can Retry State function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { canRetryState } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean;
```

### Call signature

```text
canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `stateId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `attemptedCount` | <code>number</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `createHarnessFSMProcessSpec`

Returns an isolated copy so composition code cannot mutate the shared contract.

- Kind: function
- Import: `import { createHarnessFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function createHarnessFSMProcessSpec(): FSMProcessSpec;
```

### Call signature

```text
createHarnessFSMProcessSpec(): FSMProcessSpec
```

Returns an isolated copy so composition code cannot mutate the shared contract.

#### Parameters

No parameters.

#### Returns

- Type: `FSMProcessSpec`
- Description: The return contract is defined by the type shown above.

## `createInitialSnapshot`

Create Initial Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createInitialSnapshot } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot;
```

### Call signature

```text
createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `runId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMSnapshot`
- Description: The return contract is defined by the type shown above.

## `evaluateGuardExpression`

Evaluate Guard Expression function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { evaluateGuardExpression } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean;
```

### Call signature

```text
evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `guard` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `context` | <code>FSMGuardContext</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `evaluateStateTimeout`

Evaluate State Timeout function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { evaluateStateTimeout } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation | null;
```

### Call signature

```text
evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `snapshot` | <code>FSMSnapshot</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `now` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMTimeoutEvaluation`
- Description: The return contract is defined by the type shown above.

## `getAllowedTransitions`

Get Allowed Transitions function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { getAllowedTransitions } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[];
```

### Call signature

```text
getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[]
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `stateId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMTransitionSpec[]`
- Description: The return contract is defined by the type shown above.

## `harnessStateForReActPhase`

Harness State For ReAct Phase function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { harnessStateForReActPhase } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function harnessStateForReActPhase(phase: string): HarnessFSMStateId | undefined;
```

### Call signature

```text
harnessStateForReActPhase(phase: string): HarnessFSMStateId | undefined
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `phase` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `"Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled"`
- Description: The return contract is defined by the type shown above.

## `isHarnessFSMProcessSpec`

Returns false for either an invalid process or a valid non-Harness topology.

- Kind: function
- Import: `import { isHarnessFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean;
```

### Call signature

```text
isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean
```

Returns false for either an invalid process or a valid non-Harness topology.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `boolean`
- Description: The return contract is defined by the type shown above.

## `isHarnessFSMStateId`

Is Harness FSM State ID function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isHarnessFSMStateId } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function isHarnessFSMStateId(value: string): value is HarnessFSMStateId;
```

### Call signature

```text
isHarnessFSMStateId(value: string): value is HarnessFSMStateId
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is "Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled"`
- Description: The return contract is defined by the type shown above.

## `parseFSMProcessSpec`

Parse FSM Process Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function parseFSMProcessSpec(input: unknown): FSMProcessSpec;
```

### Call signature

```text
parseFSMProcessSpec(input: unknown): FSMProcessSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMProcessSpec`
- Description: The return contract is defined by the type shown above.

## `planHarnessCapabilityPath`

Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work.

- Kind: function
- Import: `import { planHarnessCapabilityPath } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[];
```

### Call signature

```text
planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[]
```

Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | <code>"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled"</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `to` | <code>"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled"</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `("Idle" | "RunInitialized" | "ContextBuilt" | "Reasoning" | "ActionSelected" | "PolicyChecked" | "Acting" | "ObservationRecorded" | "Verifying" | "MemorySync" | "Recovering" | "Compensating" | "Quarantined" | "HumanReview" | "Completed" | "Failed" | "Cancelled")[]`
- Description: The return contract is defined by the type shown above.

## `validateFSMProcessSpec`

Validate FSM Process Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateFSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function validateFSMProcessSpec(spec: FSMProcessSpec): void;
```

### Call signature

```text
validateFSMProcessSpec(spec: FSMProcessSpec): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `validateFSMSnapshot`

Validate FSM Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateFSMSnapshot } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export declare function validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void;
```

### Call signature

```text
validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>FSMProcessSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `snapshot` | <code>FSMSnapshot</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `expectedRunId` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `FSMGuardContext`

FSM Guard Context interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { FSMGuardContext } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMGuardContext {
    input?: unknown;
    variables?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variables` | property | <code>variables?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMProcessSpec`

FSM Process Spec interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { FSMProcessSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMProcessSpec extends VersionedSpec, SpecMetadata {
    initialState: string;
    states: FSMStateSpec[];
    transitions: FSMTransitionSpec[];
    terminalStates: string[];
    recoveryPolicy?: FSMRecoveryPolicySpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `initialState` | property | <code>initialState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recoveryPolicy` | property | <code>recoveryPolicy?: FSMRecoveryPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `states` | property | <code>states: FSMStateSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalStates` | property | <code>terminalStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transitions` | property | <code>transitions: FSMTransitionSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRecoveryDecisionRecord`

FSM Recovery Decision Record interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { FSMRecoveryDecisionRecord } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMRecoveryDecisionRecord {
    processId: string;
    runId: string;
    decision: FSMRecoveryDecision;
    snapshot: FSMSnapshot;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decision` | property | <code>decision: FSMRecoveryDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processId` | property | <code>processId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRuntimeCancelOptions`

FSM Runtime Cancel Options interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { FSMRuntimeCancelOptions } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions {
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext?: FSMGuardContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guardEvaluator` | method | <code>guardEvaluator?(guard: string, context: FSMGuardContext): boolean</code> | Public method; parameters and return type are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | property | <code>now?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy?: PolicyEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRuntimeOptions`

FSM Runtime Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { FSMRuntimeOptions } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMRuntimeOptions {
    now?: () => string;
    policy?: PolicyEngine;
    onStateEntered?: (record: FSMStateEnteredRecord) => Promise<void> | void;
    onTransition?: (record: StateTransition) => Promise<void> | void;
    onRecoveryDecision?: (record: FSMRecoveryDecisionRecord) => Promise<void> | void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onRecoveryDecision` | method | <code>onRecoveryDecision?(record: FSMRecoveryDecisionRecord): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `onStateEntered` | method | <code>onStateEntered?(record: FSMStateEnteredRecord): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `onTransition` | method | <code>onTransition?(record: StateTransition): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>policy?: PolicyEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMRuntimeTransitionOptions`

FSM Runtime Transition Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { FSMRuntimeTransitionOptions } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMRuntimeTransitionOptions extends FSMTransitionOptions {
    userId?: string;
    stepId?: string;
    policy?: PolicyEngine;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext?: FSMGuardContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guardEvaluator` | method | <code>guardEvaluator?(guard: string, context: FSMGuardContext): boolean</code> | Public method; parameters and return type are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | property | <code>now?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policy` | property | <code>policy?: PolicyEngine</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMSnapshot`

FSM Snapshot interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { FSMSnapshot } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMSnapshot {
    processId: string;
    runId: string;
    currentState: string;
    statePath: string[];
    status: 'running' | FsmTerminalStatus;
    updatedAt: string;
    recovery?: FSMRecoverySnapshot;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentState` | property | <code>currentState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processId` | property | <code>processId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recovery` | property | <code>recovery?: FSMRecoverySnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `statePath` | property | <code>statePath: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "running" &#124; FsmTerminalStatus</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMStateEnteredRecord`

FSM State Entered Record interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { FSMStateEnteredRecord } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMStateEnteredRecord {
    processId: string;
    runId: string;
    stateId: string;
    fromState?: string;
    snapshot: FSMSnapshot;
    enteredAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enteredAt` | property | <code>enteredAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fromState` | property | <code>fromState?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processId` | property | <code>processId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMStateSpec`

FSM State Spec interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { FSMStateSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMStateSpec extends SpecMetadata {
    id: string;
    kind?: FSMStateKind;
    entryAction?: string;
    exitAction?: string;
    timeoutPolicy?: TimeoutPolicySpec;
    retryPolicy?: RetryPolicySpec;
    humanReviewPolicy?: HumanReviewPolicySpec;
    policyRefs?: string[];
    traceEvents?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `entryAction` | property | <code>entryAction?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `exitAction` | property | <code>exitAction?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanReviewPolicy` | property | <code>humanReviewPolicy?: HumanReviewPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind?: FSMStateKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryPolicy` | property | <code>retryPolicy?: RetryPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutPolicy` | property | <code>timeoutPolicy?: TimeoutPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceEvents` | property | <code>traceEvents?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMTimeoutEvaluation`

FSM Timeout Evaluation interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { FSMTimeoutEvaluation } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMTimeoutEvaluation {
    timedOut: boolean;
    action?: NonNullable<TimeoutPolicySpec['onTimeout']>;
    stateId: string;
    elapsedMs: number;
    timeoutMs: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action?: NonNullable&lt;"fail" &#124; "retry" &#124; "human_review"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `elapsedMs` | property | <code>elapsedMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timedOut` | property | <code>timedOut: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMTopologyAnalysis`

FSM Topology Analysis interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { FSMTopologyAnalysis } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMTopologyAnalysis {
    initialState: string;
    reachableStates: string[];
    unreachableStates: string[];
    deadEndStates: string[];
    cycleStates: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cycleStates` | property | <code>cycleStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadEndStates` | property | <code>deadEndStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `initialState` | property | <code>initialState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reachableStates` | property | <code>reachableStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `unreachableStates` | property | <code>unreachableStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMTransitionOptions`

FSM Transition Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { FSMTransitionOptions } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMTransitionOptions {
    now?: string;
    guardContext?: FSMGuardContext;
    guardEvaluator?: FSMGuardEvaluator;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext?: FSMGuardContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guardEvaluator` | method | <code>guardEvaluator?(guard: string, context: FSMGuardContext): boolean</code> | Public method; parameters and return type are shown in the signature. |
| `now` | property | <code>now?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMTransitionSpec`

FSM Transition Spec interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { FSMTransitionSpec } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface FSMTransitionSpec {
    from: string;
    to: string;
    guard?: string;
    description?: string;
    traceEvent?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `from` | property | <code>from: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guard` | property | <code>guard?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceEvent` | property | <code>traceEvent?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `StateTransition`

State Transition interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { StateTransition } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export interface StateTransition {
    processId: string;
    runId: string;
    from: string;
    to: string;
    transition: FSMTransitionSpec;
    snapshot: FSMSnapshot;
    acceptedAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptedAt` | property | <code>acceptedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `from` | property | <code>from: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processId` | property | <code>processId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transition` | property | <code>transition: FSMTransitionSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `FSMGuardEvaluator`

Public type alias for FSM Guard Evaluator; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMGuardEvaluator } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) => boolean;
```

## `FSMStateKind`

Public type alias for FSM State Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FSMStateKind } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export type FSMStateKind = 'idle' | 'run_initialized' | 'context_built' | 'reasoning' | 'action_selected' | 'policy_checked' | 'acting' | 'observation_recorded' | 'verifying' | 'memory_sync' | 'recovering' | 'compensating' | 'quarantined' | 'human_review' | 'completed' | 'failed' | 'cancelled' | 'domain';
```

## `FsmTerminalStatus`

Public type alias for FSM Terminal Status; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { FsmTerminalStatus } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export type FsmTerminalStatus = 'completed' | 'failed' | 'cancelled';
```

## `HarnessCapabilityArea`

Public type alias for Harness Capability Area; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { HarnessCapabilityArea } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export type HarnessCapabilityArea = 'lifecycle' | 'context' | 'reasoning' | 'policy' | 'activity' | 'observation' | 'verification' | 'memory' | 'recovery' | 'human_review' | 'terminal';
```

## `HarnessFSMStateId`

Public type alias for Harness FSM State ID; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { HarnessFSMStateId } from '@codesoul-co/hypha-fsm';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)

### Declaration

```text
export type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number];
```
