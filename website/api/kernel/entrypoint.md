# `@codesoul-co/hypha-kernel` / `index`

- Package index: [`@codesoul-co/hypha-kernel`](/api/kernel)
- Source: [`packages/kernel/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)
- Exports: **85**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-kernel`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  BasicReActAgentRuntime,
  DefaultAgenticReasoner,
  DefaultContextBuilder,
  DefaultThinkingPlanner,
  DefaultVerifier,
  InMemoryReActContinuationCheckpointStore,
  MemoryContextBuilder,
  ReActAgentRunner,
} from '@codesoul-co/hypha-kernel';

import type {
  AgenticReasoner,
  AgenticReasonerInput,
  AgenticReasoningDecision,
  BasicReActAgentRuntimeOptions,
  BuiltAgentContext,
  ContextBudget,
  ContextBuilder,
  ContextBuildInput,
} from '@codesoul-co/hypha-kernel';

// The complete export list is documented below.
```

### Usage patterns

- Use the 44 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 12 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 8 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 21 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { agenticReasoningModeSchema } from '@codesoul-co/hypha-kernel';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = agenticReasoningModeSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `BasicReActAgentRuntime` | class | <code>new BasicReActAgentRuntime(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | Basic ReAct Agent Runtime class with 4 public constructor or member entries; its exact declarations are listed below. |
| `DefaultAgenticReasoner` | class | <code>new DefaultAgenticReasoner(now?: () =&gt; string): DefaultAgenticReasoner</code> | Default Agentic Reasoner class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DefaultContextBuilder` | class | <code>new DefaultContextBuilder(): DefaultContextBuilder</code> | Default Context Builder class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DefaultThinkingPlanner` | class | <code>new DefaultThinkingPlanner(now?: () =&gt; string): DefaultThinkingPlanner</code> | Default Thinking Planner class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DefaultVerifier` | class | <code>new DefaultVerifier(): DefaultVerifier</code> | Default Verifier class with 2 public constructor or member entries; its exact declarations are listed below. |
| `InMemoryReActContinuationCheckpointStore` | class | <code>new InMemoryReActContinuationCheckpointStore(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | In Memory ReAct Continuation Checkpoint Store class with 4 public constructor or member entries; its exact declarations are listed below. |
| `MemoryContextBuilder` | class | <code>new MemoryContextBuilder(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | Memory Context Builder class with 2 public constructor or member entries; its exact declarations are listed below. |
| `ReActAgentRunner` | class | <code>new ReActAgentRunner(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | ReAct Agent Runner class with 2 public constructor or member entries; its exact declarations are listed below. |
| `ReActRunner` | class | <code>new ReActRunner(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | ReAct Runner class with 2 public constructor or member entries; its exact declarations are listed below. |
| `ReasoningContextBuilder` | class | <code>new ReasoningContextBuilder(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | Reasoning Context Builder class with 2 public constructor or member entries; its exact declarations are listed below. |
| `SkillContextBuilder` | class | <code>new SkillContextBuilder(options: SkillContextBuilderOptions): SkillContextBuilder</code> | Skill Context Builder class with 2 public constructor or member entries; its exact declarations are listed below. |
| `ToolRunnerActivityAdapter` | class | <code>new ToolRunnerActivityAdapter(runner: ToolRunner): ToolRunnerActivityAdapter</code> | Tool Runner Activity Adapter class with 3 public constructor or member entries; its exact declarations are listed below. |
| `agenticReasoningModeSchema` | constant | <code>const agenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | Runtime schema for Agentic Reasoning Mode. |
| `kernelSpecDefinitions` | constant | <code>const kernelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ReActAgentSpec&gt;, SpecSchemaDefinition&lt;ReasoningConfig&gt;]</code> | Kernel Spec Definitions constant exported by the `index` module. |
| `kernelSpecJsonSchemas` | constant | <code>const kernelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Kernel Spec JSON Schemas constant exported by the `index` module. |
| `REACT_PHASE_ORDER` | constant | <code>const REACT_PHASE_ORDER: ReActPhase[]</code> | REACT PHASE ORDER constant exported by the `index` module. |
| `REACT_SUSPENSION_REASONS` | constant | <code>const REACT_SUSPENSION_REASONS: readonly ["quantum_exhausted", "iteration_budget_exhausted", "model_call_budget_exhausted", "tool_call_budget_exhausted", "token_budget_exhausted", "non_progress", "deadline_exceeded"]</code> | REACT SUSPENSION REASONS constant exported by the `index` module. |
| `reActActionSchema` | constant | <code>const reActActionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["tool", "model", "finish", "human_review"]&gt;; toolCallId: z.ZodOptional&lt;z.ZodString&gt;; target: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodUnknown, unknown, unknown&gt;&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"; reason?: string &#124; undefined; toolCallId?: ...</code> | Runtime schema for Re Act Action. |
| `reactAgentSpecDefinition` | constant | <code>const reactAgentSpecDefinition: SpecSchemaDefinition&lt;ReActAgentSpec&gt;</code> | Runtime validation entrypoint for the React Agent spec, combining its parser, example and JSON Schema. |
| `reactAgentSpecExample` | constant | <code>const reactAgentSpecExample: ReActAgentSpec</code> | Valid example value for React Agent Spec. |
| `reactAgentSpecJsonSchema` | constant | <code>const reactAgentSpecJsonSchema: JsonSchema</code> | JSON Schema for React Agent Spec. |
| `reactAgentSpecSchema` | constant | <code>const reactAgentSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; modelAlias: z.ZodString; systemInstructions: z.ZodOptional&lt;z.ZodString&gt;; promptRefs: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for React Agent Spec. |
| `reActContinuationCheckpointJsonSchema` | constant | <code>const reActContinuationCheckpointJsonSchema: JsonSchema</code> | JSON Schema for Re Act Continuation Checkpoint. |
| `reActContinuationCheckpointSchema` | constant | <code>const reActContinuationCheckpointSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; }, "strict", z.ZodTypeAny, { version: string; id: string; }, { version: string; id: string; }&gt;; nextPhase: z.ZodEnum&lt;["reason", "act"]&gt;; messages: z.ZodArray&lt;z.ZodObject&lt;{ role: z.ZodEnum&lt;[...</code> | Runtime schema for Re Act Continuation Checkpoint. |
| `reActExecutionBudgetJsonSchema` | constant | <code>const reActExecutionBudgetJsonSchema: JsonSchema</code> | JSON Schema for Re Act Execution Budget. |
| `reActExecutionBudgetSchema` | constant | <code>const reActExecutionBudgetSchema: z.ZodObject&lt;{ maxIterations: z.ZodNumber; maxModelCalls: z.ZodNumber; maxToolCalls: z.ZodNumber; maxTotalTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxConsecutiveNoProgress: z.ZodNumber; quantumIterations: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; ...</code> | Runtime schema for Re Act Execution Budget. |
| `reactPhaseSchema` | constant | <code>const reactPhaseSchema: z.ZodEnum&lt;["observe", "reason", "select_action", "policy_check", "act", "observe_result", "verify", "memory_sync", "complete", "fail", "human_review", "suspend", "cancel"]&gt;</code> | Runtime schema for React Phase. |
| `reasoningConfigExample` | constant | <code>const reasoningConfigExample: ReasoningConfig</code> | Valid example value for Reasoning Config. |
| `reasoningConfigJsonSchema` | constant | <code>const reasoningConfigJsonSchema: JsonSchema</code> | JSON Schema for Reasoning Config. |
| `reasoningConfigSchema` | constant | <code>const reasoningConfigSchema: z.ZodObject&lt;{ thinkingMode: z.ZodOptional&lt;z.ZodEnum&lt;["none", "summary", "structured"]&gt;&gt;; agenticMode: z.ZodOptional&lt;z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;&gt;; maxSteps: z.ZodOptional&lt;z.ZodNumber&gt;; persist: z.ZodOptional&lt;z.ZodEnum&lt;["summary_only", "events_only"]&gt;&gt;; plannerRef: z.ZodOptional&lt;z.ZodString&gt;; reasonerRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodR...</code> | Runtime schema for Reasoning Config. |
| `reasoningConfigSpecDefinition` | constant | <code>const reasoningConfigSpecDefinition: SpecSchemaDefinition&lt;ReasoningConfig&gt;</code> | Runtime validation entrypoint for the Reasoning Config spec, combining its parser, example and JSON Schema. |
| `reasoningPersistenceSchema` | constant | <code>const reasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | Runtime schema for Reasoning Persistence. |
| `thinkingModeSchema` | constant | <code>const thinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | Runtime schema for Thinking Mode. |
| `createEpisodicMemorySync` | function | <code>createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable&lt;ReActRunnerOptions["syncMemory"]&gt;</code> | Create Episodic Memory Sync function with 1 public call signature; parameters and return types are listed below. |
| `createReActStep` | function | <code>createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep</code> | Create ReAct Step function with 1 public call signature; parameters and return types are listed below. |
| `reActContinuationScopeHash` | function | <code>reActContinuationScopeHash(context: ReActRunContext): string</code> | Re Act Continuation Scope Hash function with 1 public call signature; parameters and return types are listed below. |
| `validateReActAction` | function | <code>validateReActAction(input: unknown): ReActAction</code> | Validate ReAct Action function with 1 public call signature; parameters and return types are listed below. |
| `validateReActAgentSpec` | function | <code>validateReActAgentSpec(input: unknown): ReActAgentSpec</code> | Validate ReAct Agent Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateReActContinuationCheckpoint` | function | <code>validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint</code> | Validate ReAct Continuation Checkpoint function with 1 public call signature; parameters and return types are listed below. |
| `validateReActExecutionBudget` | function | <code>validateReActExecutionBudget(input: unknown): ReActExecutionBudget</code> | Validate ReAct Execution Budget function with 1 public call signature; parameters and return types are listed below. |
| `validateReasoningConfig` | function | <code>validateReasoningConfig(input: unknown): ReasoningConfig</code> | Validate Reasoning Config function with 1 public call signature; parameters and return types are listed below. |
| `AgenticReasoner` | interface | <code>interface AgenticReasoner</code> | Agentic Reasoner interface with 1 public fields or methods. |
| `AgenticReasonerInput` | interface | <code>interface AgenticReasonerInput</code> | Agentic Reasoner Input interface with 3 public fields or methods. |
| `AgenticReasoningDecision` | interface | <code>interface AgenticReasoningDecision</code> | Agentic Reasoning Decision interface with 11 public fields or methods. |
| `BasicReActAgentRuntimeOptions` | interface | <code>interface BasicReActAgentRuntimeOptions</code> | Basic ReAct Agent Runtime Options interface with 1 public fields or methods. |
| `BuiltAgentContext` | interface | <code>interface BuiltAgentContext extends ReActRunContext</code> | Built Agent Context interface with 18 public fields or methods. |
| `ContextBudget` | interface | <code>interface ContextBudget</code> | Context Budget interface with 4 public fields or methods. |
| `ContextBuilder` | interface | <code>interface ContextBuilder</code> | Context Builder interface with 1 public fields or methods. |
| `ContextBuildInput` | interface | <code>interface ContextBuildInput</code> | Context Build Input interface with 12 public fields or methods. |
| `ContextProvenance` | interface | <code>interface ContextProvenance</code> | Context Provenance interface with 6 public fields or methods. |
| `EpisodicMemorySyncOptions` | interface | <code>interface EpisodicMemorySyncOptions</code> | Episodic Memory Sync Options interface with 7 public fields or methods. |
| `InMemoryReActContinuationCheckpointStoreOptions` | interface | <code>interface InMemoryReActContinuationCheckpointStoreOptions</code> | In Memory ReAct Continuation Checkpoint Store Options interface with 3 public fields or methods. |
| `MemoryContextBuilderOptions` | interface | <code>interface MemoryContextBuilderOptions</code> | Memory Context Builder Options interface with 7 public fields or methods. |
| `MemoryContextItem` | interface | <code>interface MemoryContextItem</code> | Memory Context Item interface with 5 public fields or methods. |
| `ReActAction` | interface | <code>interface ReActAction</code> | ReAct Action interface with 5 public fields or methods. |
| `ReActAgentRunnerOptions` | interface | <code>interface ReActAgentRunnerOptions extends Omit&lt;ReActRunnerOptions, 'toolRunner'&gt;</code> | ReAct Agent Runner Options interface with 25 public fields or methods. |
| `ReActAgentRuntime` | interface | <code>interface ReActAgentRuntime</code> | ReAct Agent Runtime interface with 3 public fields or methods. |
| `ReActAgentSpec` | interface | <code>interface ReActAgentSpec extends VersionedSpec, SpecMetadata</code> | ReAct Agent Spec interface with 17 public fields or methods. |
| `ReActContinuationCheckpoint` | interface | <code>interface ReActContinuationCheckpoint</code> | ReAct Continuation Checkpoint interface with 19 public fields or methods. |
| `ReActContinuationCheckpointPutResult` | interface | <code>interface ReActContinuationCheckpointPutResult</code> | ReAct Continuation Checkpoint Put Result interface with 2 public fields or methods. |
| `ReActContinuationCheckpointStore` | interface | <code>interface ReActContinuationCheckpointStore</code> | ReAct Continuation Checkpoint Store interface with 3 public fields or methods. |
| `ReActExecutionBudget` | interface | <code>interface ReActExecutionBudget</code> | Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget. |
| `ReActObservation` | interface | <code>interface ReActObservation</code> | ReAct Observation interface with 3 public fields or methods. |
| `ReActRunContext` | interface | <code>interface ReActRunContext</code> | ReAct Run Context interface with 14 public fields or methods. |
| `ReActRunControl` | interface | <code>interface ReActRunControl</code> | ReAct Run Control interface with 4 public fields or methods. |
| `ReActRunnerOptions` | interface | <code>interface ReActRunnerOptions</code> | ReAct Runner Options interface with 13 public fields or methods. |
| `ReActRunResult` | interface | <code>interface ReActRunResult</code> | ReAct Run Result interface with 8 public fields or methods. |
| `ReActStep` | interface | <code>interface ReActStep</code> | ReAct Step interface with 5 public fields or methods. |
| `ReActSuspension` | interface | <code>interface ReActSuspension</code> | ReAct Suspension interface with 4 public fields or methods. |
| `ReasoningConfig` | interface | <code>interface ReasoningConfig</code> | Reasoning Config interface with 7 public fields or methods. |
| `ReasoningContextBuilderOptions` | interface | <code>interface ReasoningContextBuilderOptions</code> | Reasoning Context Builder Options interface with 5 public fields or methods. |
| `RequiredReasoningConfig` | interface | <code>interface RequiredReasoningConfig extends Required&lt;Omit&lt;ReasoningConfig, 'plannerRef' &#124; 'reasonerRef' &#124; 'metadata'&gt;&gt;</code> | Required Reasoning Config interface with 7 public fields or methods. |
| `SkillContextBuilderOptions` | interface | <code>interface SkillContextBuilderOptions</code> | Skill Context Builder Options interface with 9 public fields or methods. |
| `ThinkingPlan` | interface | <code>interface ThinkingPlan</code> | Thinking Plan interface with 10 public fields or methods. |
| `ThinkingPlanner` | interface | <code>interface ThinkingPlanner</code> | Thinking Planner interface with 1 public fields or methods. |
| `ThinkingPlannerInput` | interface | <code>interface ThinkingPlannerInput</code> | Thinking Planner Input interface with 2 public fields or methods. |
| `ToolActivityPort` | interface | <code>interface ToolActivityPort</code> | Tool Activity Port interface with 2 public fields or methods. |
| `ToolActivityRequest` | interface | <code>interface ToolActivityRequest</code> | Tool Activity Request interface with 10 public fields or methods. |
| `ToolActivityResult` | interface | <code>interface ToolActivityResult</code> | Tool Activity Result interface with 7 public fields or methods. |
| `Verifier` | interface | <code>interface Verifier</code> | Verifier interface with 1 public fields or methods. |
| `AgenticReasoningMode` | type | <code>type AgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Public type alias for Agentic Reasoning Mode; the declaration contains its complete type expression. |
| `ReActPhase` | type | <code>type ReActPhase = 'observe' &#124; 'reason' &#124; 'select_action' &#124; 'policy_check' &#124; 'act' &#124; 'observe_result' &#124; 'verify' &#124; 'memory_sync' &#124; 'complete' &#124; 'fail' &#124; 'human_review' &#124; 'suspend' &#124; 'cancel'</code> | Public type alias for ReAct Phase; the declaration contains its complete type expression. |
| `ReActSuspensionReason` | type | <code>type ReActSuspensionReason = (typeof REACT_SUSPENSION_REASONS)[number]</code> | Public type alias for ReAct Suspension Reason; the declaration contains its complete type expression. |
| `ReasoningPersistence` | type | <code>type ReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Public type alias for Reasoning Persistence; the declaration contains its complete type expression. |
| `ThinkingMode` | type | <code>type ThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Public type alias for Thinking Mode; the declaration contains its complete type expression. |

## `BasicReActAgentRuntime`

Basic ReAct Agent Runtime class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { BasicReActAgentRuntime } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class BasicReActAgentRuntime implements ReActAgentRuntime {
    constructor(options?: BasicReActAgentRuntimeOptions);
    reason(context: ReActRunContext): Promise<InferenceRequest>;
    selectAction(response: InferenceResponse): Promise<ReActAction>;
    verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | Creates an instance of this class. |
| `reason` | method | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `selectAction` | method | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verify` | method | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultAgenticReasoner`

Default Agentic Reasoner class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultAgenticReasoner } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class DefaultAgenticReasoner implements AgenticReasoner {
    constructor(now?: () => string);
    decide(input: AgenticReasonerInput): Promise<AgenticReasoningDecision>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(now?: () =&gt; string): DefaultAgenticReasoner</code> | Creates an instance of this class. |
| `decide` | method | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultContextBuilder`

Default Context Builder class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultContextBuilder } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class DefaultContextBuilder implements ContextBuilder {
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): DefaultContextBuilder</code> | Creates an instance of this class. |

## `DefaultThinkingPlanner`

Default Thinking Planner class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultThinkingPlanner } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class DefaultThinkingPlanner implements ThinkingPlanner {
    constructor(now?: () => string);
    plan(input: ThinkingPlannerInput): Promise<ThinkingPlan>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(now?: () =&gt; string): DefaultThinkingPlanner</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `DefaultVerifier`

Default Verifier class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultVerifier } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class DefaultVerifier implements Verifier {
    verify(_context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultVerifier</code> | Creates an instance of this class. |
| `verify` | method | <code>verify(_context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `InMemoryReActContinuationCheckpointStore`

In Memory ReAct Continuation Checkpoint Store class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { InMemoryReActContinuationCheckpointStore } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class InMemoryReActContinuationCheckpointStore implements ReActContinuationCheckpointStore {
    constructor(options?: InMemoryReActContinuationCheckpointStoreOptions);
    put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise<ReActContinuationCheckpointPutResult>;
    get(runId: string, stepId: string, expectedScopeHash: string): Promise<ReActContinuationCheckpoint | null>;
    delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise<boolean>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `MemoryContextBuilder`

Memory Context Builder class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MemoryContextBuilder } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class MemoryContextBuilder implements ContextBuilder {
    constructor(options: MemoryContextBuilderOptions);
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | Creates an instance of this class. |

## `ReActAgentRunner`

ReAct Agent Runner class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ReActAgentRunner } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class ReActAgentRunner {
    constructor(options: ReActAgentRunnerOptions);
    run(input: ContextBuildInput, control?: ReActRunControl): Promise<ReActRunResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | Creates an instance of this class. |
| `run` | method | <code>run(input: ContextBuildInput, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActRunner`

ReAct Runner class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ReActRunner } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class ReActRunner {
    constructor(runtime: ReActAgentRuntime, options: ReActRunnerOptions);
    run(context: ReActRunContext, control?: ReActRunControl): Promise<ReActRunResult>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | Creates an instance of this class. |
| `run` | method | <code>run(context: ReActRunContext, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReasoningContextBuilder`

Reasoning Context Builder class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ReasoningContextBuilder } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class ReasoningContextBuilder implements ContextBuilder {
    constructor(options?: ReasoningContextBuilderOptions);
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | Creates an instance of this class. |

## `SkillContextBuilder`

Skill Context Builder class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SkillContextBuilder } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class SkillContextBuilder implements ContextBuilder {
    constructor(options: SkillContextBuilderOptions);
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(options: SkillContextBuilderOptions): SkillContextBuilder</code> | Creates an instance of this class. |

## `ToolRunnerActivityAdapter`

Tool Runner Activity Adapter class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ToolRunnerActivityAdapter } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare class ToolRunnerActivityAdapter implements ToolActivityPort {
    constructor(runner: ToolRunner);
    execute(request: ToolActivityRequest): Promise<ToolActivityResult>;
    cancel(invocationId: string, reason?: string): Promise<ToolActivityResult | null>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(runner: ToolRunner): ToolRunnerActivityAdapter</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `agenticReasoningModeSchema`

Runtime schema for Agentic Reasoning Mode.

- Kind: constant
- Import: `import { agenticReasoningModeSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const agenticReasoningModeSchema: z.ZodEnum<["react", "fsm_react", "tot", "critique"]>;
```

## `kernelSpecDefinitions`

Kernel Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { kernelSpecDefinitions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const kernelSpecDefinitions: readonly [SpecSchemaDefinition<ReActAgentSpec>, SpecSchemaDefinition<ReasoningConfig>];
```

## `kernelSpecJsonSchemas`

Kernel Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { kernelSpecJsonSchemas } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const kernelSpecJsonSchemas: Record<string, JsonSchema>;
```

## `REACT_PHASE_ORDER`

REACT PHASE ORDER constant exported by the `index` module.

- Kind: constant
- Import: `import { REACT_PHASE_ORDER } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const REACT_PHASE_ORDER: ReActPhase[];
```

## `REACT_SUSPENSION_REASONS`

REACT SUSPENSION REASONS constant exported by the `index` module.

- Kind: constant
- Import: `import { REACT_SUSPENSION_REASONS } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const REACT_SUSPENSION_REASONS: readonly ["quantum_exhausted", "iteration_budget_exhausted", "model_call_budget_exhausted", "tool_call_budget_exhausted", "token_budget_exhausted", "non_progress", "deadline_exceeded"];
```

## `reActActionSchema`

Runtime schema for Re Act Action.

- Kind: constant
- Import: `import { reActActionSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reActActionSchema: z.ZodEffects<z.ZodObject<{ type: z.ZodEnum<["tool", "model", "finish", "human_review"]>; toolCallId: z.ZodOptional<z.ZodString>; target: z.ZodOptional<z.ZodString>; input: z.ZodOptional<z.ZodEffects<z.ZodUnknown, unknown, unknown>>; reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }>, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }>;
```

## `reactAgentSpecDefinition`

Runtime validation entrypoint for the React Agent spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reactAgentSpecDefinition: SpecSchemaDefinition<ReActAgentSpec>;
```

## `reactAgentSpecExample`

Valid example value for React Agent Spec.

- Kind: constant
- Import: `import { reactAgentSpecExample } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reactAgentSpecExample: ReActAgentSpec;
```

## `reactAgentSpecJsonSchema`

JSON Schema for React Agent Spec.

- Kind: constant
- Import: `import { reactAgentSpecJsonSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reactAgentSpecJsonSchema: JsonSchema;
```

## `reactAgentSpecSchema`

Runtime schema for React Agent Spec.

- Kind: constant
- Import: `import { reactAgentSpecSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const reactAgentSpecSchema: (typeof import('@codesoul-co/hypha-kernel'))['reactAgentSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `reActContinuationCheckpointJsonSchema`

JSON Schema for Re Act Continuation Checkpoint.

- Kind: constant
- Import: `import { reActContinuationCheckpointJsonSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reActContinuationCheckpointJsonSchema: JsonSchema;
```

## `reActContinuationCheckpointSchema`

Runtime schema for Re Act Continuation Checkpoint.

- Kind: constant
- Import: `import { reActContinuationCheckpointSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const reActContinuationCheckpointSchema: (typeof import('@codesoul-co/hypha-kernel'))['reActContinuationCheckpointSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `reActExecutionBudgetJsonSchema`

JSON Schema for Re Act Execution Budget.

- Kind: constant
- Import: `import { reActExecutionBudgetJsonSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reActExecutionBudgetJsonSchema: JsonSchema;
```

## `reActExecutionBudgetSchema`

Runtime schema for Re Act Execution Budget.

- Kind: constant
- Import: `import { reActExecutionBudgetSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reActExecutionBudgetSchema: z.ZodObject<{ maxIterations: z.ZodNumber; maxModelCalls: z.ZodNumber; maxToolCalls: z.ZodNumber; maxTotalTokens: z.ZodOptional<z.ZodNumber>; maxConsecutiveNoProgress: z.ZodNumber; quantumIterations: z.ZodNumber; deadlineAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; quantumIterations: number; maxTotalTokens?: number | undefined; deadlineAt?: string | undefined; }, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; quantumIterations: number; maxTotalTokens?: number | undefined; deadlineAt?: string | undefined; }>;
```

## `reactPhaseSchema`

Runtime schema for React Phase.

- Kind: constant
- Import: `import { reactPhaseSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reactPhaseSchema: z.ZodEnum<["observe", "reason", "select_action", "policy_check", "act", "observe_result", "verify", "memory_sync", "complete", "fail", "human_review", "suspend", "cancel"]>;
```

## `reasoningConfigExample`

Valid example value for Reasoning Config.

- Kind: constant
- Import: `import { reasoningConfigExample } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reasoningConfigExample: ReasoningConfig;
```

## `reasoningConfigJsonSchema`

JSON Schema for Reasoning Config.

- Kind: constant
- Import: `import { reasoningConfigJsonSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reasoningConfigJsonSchema: JsonSchema;
```

## `reasoningConfigSchema`

Runtime schema for Reasoning Config.

- Kind: constant
- Import: `import { reasoningConfigSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reasoningConfigSchema: z.ZodObject<{ thinkingMode: z.ZodOptional<z.ZodEnum<["none", "summary", "structured"]>>; agenticMode: z.ZodOptional<z.ZodEnum<["react", "fsm_react", "tot", "critique"]>>; maxSteps: z.ZodOptional<z.ZodNumber>; persist: z.ZodOptional<z.ZodEnum<["summary_only", "events_only"]>>; plannerRef: z.ZodOptional<z.ZodString>; reasonerRef: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { thinkingMode?: "none" | "summary" | "structured" | undefined; agenticMode?: "react" | "fsm_react" | "tot" | "critique" | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { thinkingMode?: "none" | "summary" | "structured" | undefined; agenticMode?: "react" | "fsm_react" | "tot" | "critique" | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `reasoningConfigSpecDefinition`

Runtime validation entrypoint for the Reasoning Config spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { reasoningConfigSpecDefinition } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reasoningConfigSpecDefinition: SpecSchemaDefinition<ReasoningConfig>;
```

## `reasoningPersistenceSchema`

Runtime schema for Reasoning Persistence.

- Kind: constant
- Import: `import { reasoningPersistenceSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const reasoningPersistenceSchema: z.ZodEnum<["summary_only", "events_only"]>;
```

## `thinkingModeSchema`

Runtime schema for Thinking Mode.

- Kind: constant
- Import: `import { thinkingModeSchema } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare const thinkingModeSchema: z.ZodEnum<["none", "summary", "structured"]>;
```

## `createEpisodicMemorySync`

Create Episodic Memory Sync function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createEpisodicMemorySync } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable<ReActRunnerOptions['syncMemory']>;
```

### Call signature

```text
createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable<ReActRunnerOptions["syncMemory"]>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | <code>EpisodicMemorySyncOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `(context: ReActRunContext, observation: ReActObservation) => Promise<void>`
- Description: The return contract is defined by the type shown above.

## `createReActStep`

Create ReAct Step function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createReActStep } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep;
```

### Call signature

```text
createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `phase` | <code>ReActPhase</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `input` | <code>unknown</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReActStep`
- Description: The return contract is defined by the type shown above.

## `reActContinuationScopeHash`

Re Act Continuation Scope Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { reActContinuationScopeHash } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function reActContinuationScopeHash(context: ReActRunContext): string;
```

### Call signature

```text
reActContinuationScopeHash(context: ReActRunContext): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `context` | <code>ReActRunContext</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `validateReActAction`

Validate ReAct Action function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReActAction } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function validateReActAction(input: unknown): ReActAction;
```

### Call signature

```text
validateReActAction(input: unknown): ReActAction
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReActAction`
- Description: The return contract is defined by the type shown above.

## `validateReActAgentSpec`

Validate ReAct Agent Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReActAgentSpec } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function validateReActAgentSpec(input: unknown): ReActAgentSpec;
```

### Call signature

```text
validateReActAgentSpec(input: unknown): ReActAgentSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReActAgentSpec`
- Description: The return contract is defined by the type shown above.

## `validateReActContinuationCheckpoint`

Validate ReAct Continuation Checkpoint function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReActContinuationCheckpoint } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint;
```

### Call signature

```text
validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReActContinuationCheckpoint`
- Description: The return contract is defined by the type shown above.

## `validateReActExecutionBudget`

Validate ReAct Execution Budget function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReActExecutionBudget } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function validateReActExecutionBudget(input: unknown): ReActExecutionBudget;
```

### Call signature

```text
validateReActExecutionBudget(input: unknown): ReActExecutionBudget
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReActExecutionBudget`
- Description: The return contract is defined by the type shown above.

## `validateReasoningConfig`

Validate Reasoning Config function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateReasoningConfig } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export declare function validateReasoningConfig(input: unknown): ReasoningConfig;
```

### Call signature

```text
validateReasoningConfig(input: unknown): ReasoningConfig
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ReasoningConfig`
- Description: The return contract is defined by the type shown above.

## `AgenticReasoner`

Agentic Reasoner interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { AgenticReasoner } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface AgenticReasoner {
    decide(input: AgenticReasonerInput): Promise<AgenticReasoningDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decide` | method | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `AgenticReasonerInput`

Agentic Reasoner Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { AgenticReasonerInput } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface AgenticReasonerInput {
    context: BuiltAgentContext;
    config: RequiredReasoningConfig;
    thinkingPlan?: ThinkingPlan;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `config` | property | <code>config: RequiredReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context: BuiltAgentContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingPlan` | property | <code>thinkingPlan?: ThinkingPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgenticReasoningDecision`

Agentic Reasoning Decision interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { AgenticReasoningDecision } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface AgenticReasoningDecision {
    id: string;
    mode: AgenticReasoningMode;
    recommendedPhase: ReActPhase;
    actionType: 'reason' | ReActAction['type'];
    toolCandidates: string[];
    requiresHumanReview: boolean;
    verificationStrategy: string;
    rationale: string;
    confidence?: number;
    createdAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actionType` | property | <code>actionType: "human_review" &#124; "tool" &#124; "model" &#124; "reason" &#124; "finish"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: AgenticReasoningMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rationale` | property | <code>rationale: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recommendedPhase` | property | <code>recommendedPhase: ReActPhase</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCandidates` | property | <code>toolCandidates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verificationStrategy` | property | <code>verificationStrategy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BasicReActAgentRuntimeOptions`

Basic ReAct Agent Runtime Options interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { BasicReActAgentRuntimeOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface BasicReActAgentRuntimeOptions {
    verifier?: Verifier;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verifier` | property | <code>verifier?: Verifier</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BuiltAgentContext`

Built Agent Context interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { BuiltAgentContext } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface BuiltAgentContext extends ReActRunContext {
    sourceInput?: unknown;
    contextBudget?: ContextBudget;
    contextProvenance?: ContextProvenance[];
    memoryContext?: MemoryContextItem[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeSkills` | property | <code>activeSkills?: LoadedSkillContext[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextBudget` | property | <code>contextBudget?: ContextBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProvenance` | property | <code>contextProvenance?: ContextProvenance[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSpec` | property | <code>contextSpec?: ContextSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryContext` | property | <code>memoryContext?: MemoryContextItem[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryScope` | property | <code>memoryScope?: MemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningConfig` | property | <code>reasoningConfig?: ReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningDecision` | property | <code>reasoningDecision?: AgenticReasoningDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectedSkills` | property | <code>rejectedSkills?: { skillId: string; reason: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceInput` | property | <code>sourceInput?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingPlan` | property | <code>thinkingPlan?: ThinkingPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolExecutionScope` | property | <code>toolExecutionScope?: ToolExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolPrincipal` | property | <code>toolPrincipal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextBudget`

Context Budget interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ContextBudget } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ContextBudget {
    maxMessages?: number;
    maxMemoryItems?: number;
    maxMemoryChars?: number;
    maxTotalChars?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxMemoryChars` | property | <code>maxMemoryChars?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMemoryItems` | property | <code>maxMemoryItems?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxMessages` | property | <code>maxMessages?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalChars` | property | <code>maxTotalChars?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextBuilder`

Context Builder interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ContextBuilder } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ContextBuilder {
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ContextBuildInput`

Context Build Input interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ContextBuildInput } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ContextBuildInput<TInput = unknown> {
    runId: string;
    stepId: string;
    sessionId?: string;
    userId?: string;
    agent: ReActAgentSpec;
    input: TInput;
    messages?: ModelMessage[];
    memoryScope?: MemoryScope;
    contextSpec?: ContextSpec;
    metadata?: Record<string, unknown>;
    toolExecutionScope?: ToolExecutionScope;
    toolPrincipal?: ToolPrincipal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSpec` | property | <code>contextSpec?: ContextSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryScope` | property | <code>memoryScope?: MemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages?: ModelMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionId` | property | <code>sessionId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolExecutionScope` | property | <code>toolExecutionScope?: ToolExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolPrincipal` | property | <code>toolPrincipal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `userId` | property | <code>userId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ContextProvenance`

Context Provenance interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ContextProvenance } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ContextProvenance {
    source: 'memory' | 'input' | 'system' | 'skill';
    id: string;
    type?: string;
    score?: number;
    provenance?: Record<string, unknown>;
    includedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includedAt` | property | <code>includedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "memory" &#124; "skill" &#124; "system" &#124; "input"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EpisodicMemorySyncOptions`

Episodic Memory Sync Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { EpisodicMemorySyncOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface EpisodicMemorySyncOptions {
    memory: Pick<MemoryManager, 'write'>;
    now?: () => string;
    source?: string;
    idPrefix?: string;
    confidence?: number;
    visibility?: MemoryRecord['visibility'];
    allowLongTerm?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowLongTerm` | property | <code>allowLongTerm?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idPrefix` | property | <code>idPrefix?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memory` | property | <code>memory: Pick&lt;MemoryManager, "write"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `source` | property | <code>source?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `visibility` | property | <code>visibility?: "workspace" &#124; "private" &#124; "public"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `InMemoryReActContinuationCheckpointStoreOptions`

In Memory ReAct Continuation Checkpoint Store Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { InMemoryReActContinuationCheckpointStoreOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface InMemoryReActContinuationCheckpointStoreOptions {
    maxCheckpoints?: number;
    maxIdempotencyRecords?: number;
    maxCheckpointBytes?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCheckpointBytes` | property | <code>maxCheckpointBytes?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxCheckpoints` | property | <code>maxCheckpoints?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIdempotencyRecords` | property | <code>maxIdempotencyRecords?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryContextBuilderOptions`

Memory Context Builder Options interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { MemoryContextBuilderOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface MemoryContextBuilderOptions {
    memory: Pick<MemoryManager, 'search'>;
    embeddings?: EmbeddingProvider;
    baseBuilder?: ContextBuilder;
    budget?: ContextBudget;
    memoryTypes?: MemoryType[];
    now?: () => string;
    query?: MemorySearchQuery | ((input: ContextBuildInput, base: BuiltAgentContext) => MemorySearchQuery | Promise<MemorySearchQuery>);
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseBuilder` | property | <code>baseBuilder?: ContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `budget` | property | <code>budget?: ContextBudget</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddings` | property | <code>embeddings?: EmbeddingProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memory` | property | <code>memory: Pick&lt;MemoryManager, "search"&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryTypes` | property | <code>memoryTypes?: MemoryType[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `query` | property | <code>query?: MemorySearchQuery &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; MemorySearchQuery &#124; Promise&lt;MemorySearchQuery&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `MemoryContextItem`

Memory Context Item interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { MemoryContextItem } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface MemoryContextItem {
    id: string;
    type: MemoryType;
    content: string;
    score?: number;
    provenance: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `score` | property | <code>score?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: MemoryType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActAction`

ReAct Action interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ReActAction } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActAction {
    type: 'tool' | 'model' | 'finish' | 'human_review';
    toolCallId?: string;
    target?: string;
    input?: unknown;
    reason?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `target` | property | <code>target?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCallId` | property | <code>toolCallId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActAgentRunnerOptions`

ReAct Agent Runner Options interface with 25 public fields or methods.

- Kind: interface
- Import: `import type { ReActAgentRunnerOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActAgentRunnerOptions extends Omit<ReActRunnerOptions, 'toolRunner'> {
    toolRunner?: ToolRunner;
    contextBuilder?: ContextBuilder;
    verifier?: Verifier;
    runtime?: ReActAgentRuntime;
    thinkingPlanner?: ThinkingPlanner;
    agenticReasoner?: AgenticReasoner;
    reasoningConfig?: ReasoningConfig;
    skillRegistry?: SkillRegistry;
    skillSelector?: SkillSelector;
    skillContextLoader?: SkillContextLoader;
    skillPolicy?: SkillPolicy;
    allowedSkills?: SkillContextBuilderOptions['allowedSkills'];
    requiredSkills?: SkillContextBuilderOptions['requiredSkills'];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticReasoner` | property | <code>agenticReasoner?: AgenticReasoner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpointStore` | property | <code>checkpointStore?: ReActContinuationCheckpointStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextBuilder` | property | <code>contextBuilder?: ContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `continueAfterTool` | property | <code>continueAfterTool?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionBudget` | property | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inference` | property | <code>inference: InferenceProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIterations` | property | <code>maxIterations?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onCheckpoint` | method | <code>onCheckpoint?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `onResume` | method | <code>onResume?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `onStep` | method | <code>onStep?(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `reasoningConfig` | property | <code>reasoningConfig?: ReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSkills` | property | <code>requiredSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveToolExecutionScope` | method | <code>resolveToolExecutionScope?(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `retainCheckpointUntilOutcome` | property | <code>retainCheckpointUntilOutcome?: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `runtime` | property | <code>runtime?: ReActAgentRuntime</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillContextLoader` | property | <code>skillContextLoader?: SkillContextLoader</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillPolicy` | property | <code>skillPolicy?: SkillPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRegistry` | property | <code>skillRegistry?: SkillRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillSelector` | property | <code>skillSelector?: SkillSelector</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `syncMemory` | method | <code>syncMemory?(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `thinkingPlanner` | property | <code>thinkingPlanner?: ThinkingPlanner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRunner` | property | <code>toolRunner?: ToolRunner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `verifier` | property | <code>verifier?: Verifier</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActAgentRuntime`

ReAct Agent Runtime interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReActAgentRuntime } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActAgentRuntime {
    reason(context: ReActRunContext): Promise<InferenceRequest>;
    selectAction(response: InferenceResponse): Promise<ReActAction>;
    verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | method | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `selectAction` | method | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `verify` | method | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActAgentSpec`

ReAct Agent Spec interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { ReActAgentSpec } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActAgentSpec extends VersionedSpec, SpecMetadata {
    name: string;
    modelAlias: string;
    systemInstructions?: string;
    promptRefs?: AgentPromptRef[];
    skillRefs?: SkillRef[];
    toolRefs?: string[];
    memoryProfileRef?: string;
    policyRefs?: string[];
    contextSpecRef?: SpecRef;
    reasoning?: ReasoningConfig;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextSpecRef` | property | <code>contextSpecRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptRefs` | property | <code>promptRefs?: AgentPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoning` | property | <code>reasoning?: ReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRefs` | property | <code>skillRefs?: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `systemInstructions` | property | <code>systemInstructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContinuationCheckpoint`

ReAct Continuation Checkpoint interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationCheckpoint } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActContinuationCheckpoint {
    version: '1.0.0';
    runId: string;
    stepId: string;
    scopeHash: string;
    agentRef: SpecRef;
    nextPhase: 'reason' | 'act';
    messages: ModelMessage[];
    iterations: number;
    modelCalls: number;
    toolCalls: number;
    totalTokens: number;
    toolInvocationSequence: number;
    stepSequence: number;
    consecutiveNoProgress: number;
    lastProgressFingerprint?: string;
    pendingAction?: ReActAction;
    pendingToolInvocationId?: string;
    createdAt: string;
    updatedAt: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `consecutiveNoProgress` | property | <code>consecutiveNoProgress: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `iterations` | property | <code>iterations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `lastProgressFingerprint` | property | <code>lastProgressFingerprint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelCalls` | property | <code>modelCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `nextPhase` | property | <code>nextPhase: "reason" &#124; "act"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingAction` | property | <code>pendingAction?: ReActAction</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pendingToolInvocationId` | property | <code>pendingToolInvocationId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepSequence` | property | <code>stepSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolInvocationSequence` | property | <code>toolInvocationSequence: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: "1.0.0"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContinuationCheckpointPutResult`

ReAct Continuation Checkpoint Put Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationCheckpointPutResult } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActContinuationCheckpointPutResult {
    checkpoint: ReActContinuationCheckpoint;
    reused: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoint` | property | <code>checkpoint: ReActContinuationCheckpoint</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reused` | property | <code>reused: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActContinuationCheckpointStore`

ReAct Continuation Checkpoint Store interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReActContinuationCheckpointStore } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActContinuationCheckpointStore {
    put(checkpoint: ReActContinuationCheckpoint, idempotencyKey: string): Promise<ReActContinuationCheckpointPutResult>;
    get(runId: string, stepId: string, expectedScopeHash: string): Promise<ReActContinuationCheckpoint | null>;
    delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise<boolean>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `put` | method | <code>put(checkpoint: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ReActExecutionBudget`

Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget.

- Kind: interface
- Import: `import type { ReActExecutionBudget } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActExecutionBudget {
    maxIterations: number;
    maxModelCalls: number;
    maxToolCalls: number;
    maxTotalTokens?: number;
    maxConsecutiveNoProgress: number;
    quantumIterations: number;
    deadlineAt?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxConsecutiveNoProgress` | property | <code>maxConsecutiveNoProgress: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIterations` | property | <code>maxIterations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxModelCalls` | property | <code>maxModelCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxToolCalls` | property | <code>maxToolCalls: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTotalTokens` | property | <code>maxTotalTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `quantumIterations` | property | <code>quantumIterations: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActObservation`

ReAct Observation interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ReActObservation } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActObservation<TValue = unknown> {
    source: 'model' | 'tool' | 'memory' | 'human' | 'system';
    value: TValue;
    provenance?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: "memory" &#124; "system" &#124; "human" &#124; "tool" &#124; "model"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `value` | property | <code>value: TValue</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActRunContext`

ReAct Run Context interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ReActRunContext } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActRunContext {
    runId: string;
    stepId: string;
    agent: ReActAgentSpec;
    messages: ModelMessage[];
    memoryScope?: MemoryScope;
    contextSpec?: ContextSpec;
    metadata?: Record<string, unknown>;
    reasoningConfig?: ReasoningConfig;
    thinkingPlan?: ThinkingPlan;
    reasoningDecision?: AgenticReasoningDecision;
    activeSkills?: LoadedSkillContext[];
    rejectedSkills?: Array<{
        skillId: string;
        reason: string;
    }>;
    toolExecutionScope?: ToolExecutionScope;
    toolPrincipal?: ToolPrincipal;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeSkills` | property | <code>activeSkills?: LoadedSkillContext[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextSpec` | property | <code>contextSpec?: ContextSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryScope` | property | <code>memoryScope?: MemoryScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningConfig` | property | <code>reasoningConfig?: ReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningDecision` | property | <code>reasoningDecision?: AgenticReasoningDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `rejectedSkills` | property | <code>rejectedSkills?: { skillId: string; reason: string; }[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingPlan` | property | <code>thinkingPlan?: ThinkingPlan</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolExecutionScope` | property | <code>toolExecutionScope?: ToolExecutionScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolPrincipal` | property | <code>toolPrincipal?: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActRunControl`

ReAct Run Control interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ReActRunControl } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActRunControl {
    checkpoint?: ReActContinuationCheckpoint;
    executionBudget?: Partial<ReActExecutionBudget>;
    abortSignal?: AbortSignal;
    resumeFromCheckpointStore?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal?: AbortSignal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `checkpoint` | property | <code>checkpoint?: ReActContinuationCheckpoint</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionBudget` | property | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resumeFromCheckpointStore` | property | <code>resumeFromCheckpointStore?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActRunnerOptions`

ReAct Runner Options interface with 13 public fields or methods.

- Kind: interface
- Import: `import type { ReActRunnerOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActRunnerOptions {
    inference: InferenceProvider;
    toolRunner?: ToolRunner;
    maxIterations?: number;
    executionBudget?: Partial<ReActExecutionBudget>;
    checkpointStore?: ReActContinuationCheckpointStore;
    continueAfterTool?: boolean;
    onStep?: (step: ReActStep) => Promise<void> | void;
    onCheckpoint?: (checkpoint: ReActContinuationCheckpoint) => Promise<void> | void;
    onResume?: (checkpoint: ReActContinuationCheckpoint) => Promise<void> | void;
    syncMemory?: (context: ReActRunContext, observation: ReActObservation) => Promise<void>;
    /**
     * Keep the latest durable checkpoint until an outer transaction records the
     * terminal/waiting outcome. Production quantum executors use this to avoid
     * an unrecoverable gap between Runner completion and Event persistence.
     */
    retainCheckpointUntilOutcome?: boolean;
    resolveToolExecutionScope?: (context: ReActRunContext, action: ReActAction) => ToolExecutionScope | undefined;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointStore` | property | <code>checkpointStore?: ReActContinuationCheckpointStore</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `continueAfterTool` | property | <code>continueAfterTool?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `executionBudget` | property | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inference` | property | <code>inference: InferenceProvider</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxIterations` | property | <code>maxIterations?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `onCheckpoint` | method | <code>onCheckpoint?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `onResume` | method | <code>onResume?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `onStep` | method | <code>onStep?(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | Public method; parameters and return type are shown in the signature. |
| `resolveToolExecutionScope` | method | <code>resolveToolExecutionScope?(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `retainCheckpointUntilOutcome` | property | <code>retainCheckpointUntilOutcome?: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `syncMemory` | method | <code>syncMemory?(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `toolRunner` | property | <code>toolRunner?: ToolRunner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActRunResult`

ReAct Run Result interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ReActRunResult } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActRunResult {
    runId: string;
    status: 'completed' | 'failed' | 'human_review_required' | 'suspended' | 'cancelled';
    steps: ReActStep[];
    output?: unknown;
    finalAction?: ReActAction;
    checkpoint?: ReActContinuationCheckpoint;
    suspension?: ReActSuspension;
    error?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoint` | property | <code>checkpoint?: ReActContinuationCheckpoint</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `finalAction` | property | <code>finalAction?: ReActAction</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "human_review_required"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `steps` | property | <code>steps: ReActStep[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `suspension` | property | <code>suspension?: ReActSuspension</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActStep`

ReAct Step interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ReActStep } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActStep {
    id: string;
    phase: ReActPhase;
    input?: unknown;
    output?: unknown;
    traceEventId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `phase` | property | <code>phase: ReActPhase</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceEventId` | property | <code>traceEventId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReActSuspension`

ReAct Suspension interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ReActSuspension } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReActSuspension {
    reason: ReActSuspensionReason;
    retryable: boolean;
    requiresHumanReview: boolean;
    message: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `message` | property | <code>message: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: "quantum_exhausted" &#124; "iteration_budget_exhausted" &#124; "model_call_budget_exhausted" &#124; "tool_call_budget_exhausted" &#124; "token_budget_exhausted" &#124; "non_progress" &#124; "deadline_exceeded"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryable` | property | <code>retryable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningConfig`

Reasoning Config interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningConfig } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReasoningConfig {
    thinkingMode?: ThinkingMode;
    agenticMode?: AgenticReasoningMode;
    maxSteps?: number;
    persist?: ReasoningPersistence;
    plannerRef?: string;
    reasonerRef?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticMode` | property | <code>agenticMode?: AgenticReasoningMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSteps` | property | <code>maxSteps?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persist` | property | <code>persist?: ReasoningPersistence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plannerRef` | property | <code>plannerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasonerRef` | property | <code>reasonerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingMode` | property | <code>thinkingMode?: ThinkingMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningContextBuilderOptions`

Reasoning Context Builder Options interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningContextBuilderOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ReasoningContextBuilderOptions {
    baseBuilder?: ContextBuilder;
    planner?: ThinkingPlanner;
    reasoner?: AgenticReasoner;
    config?: ReasoningConfig;
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseBuilder` | property | <code>baseBuilder?: ContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `config` | property | <code>config?: ReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `planner` | property | <code>planner?: ThinkingPlanner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoner` | property | <code>reasoner?: AgenticReasoner</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RequiredReasoningConfig`

Required Reasoning Config interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { RequiredReasoningConfig } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface RequiredReasoningConfig extends Required<Omit<ReasoningConfig, 'plannerRef' | 'reasonerRef' | 'metadata'>> {
    plannerRef?: string;
    reasonerRef?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticMode` | property | <code>agenticMode?: AgenticReasoningMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSteps` | property | <code>maxSteps?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persist` | property | <code>persist?: ReasoningPersistence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plannerRef` | property | <code>plannerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasonerRef` | property | <code>reasonerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingMode` | property | <code>thinkingMode?: ThinkingMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillContextBuilderOptions`

Skill Context Builder Options interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { SkillContextBuilderOptions } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface SkillContextBuilderOptions {
    registry: SkillRegistry;
    baseBuilder?: ContextBuilder;
    selector?: SkillSelector;
    contextLoader?: SkillContextLoader;
    policy?: SkillPolicy;
    allowedSkills?: string[] | ((input: ContextBuildInput, base: BuiltAgentContext) => string[] | undefined | Promise<string[] | undefined>);
    requiredSkills?: string[] | ((input: ContextBuildInput, base: BuiltAgentContext) => string[] | undefined | Promise<string[] | undefined>);
    availableToolRefs?: string[] | ((input: ContextBuildInput, base: BuiltAgentContext) => string[] | Promise<string[]>);
    now?: () => string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedSkills` | property | <code>allowedSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableToolRefs` | property | <code>availableToolRefs?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; Promise&lt;string[]&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseBuilder` | property | <code>baseBuilder?: ContextBuilder</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextLoader` | property | <code>contextLoader?: SkillContextLoader</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `now` | method | <code>now?(): string</code> | Public method; parameters and return type are shown in the signature. |
| `policy` | property | <code>policy?: SkillPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `registry` | property | <code>registry: SkillRegistry</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSkills` | property | <code>requiredSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selector` | property | <code>selector?: SkillSelector</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ThinkingPlan`

Thinking Plan interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ThinkingPlan } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ThinkingPlan {
    id: string;
    mode: Exclude<ThinkingMode, 'none'>;
    intent: string;
    constraints: string[];
    successCriteria: string[];
    plan: string[];
    risks: string[];
    summary: string;
    createdAt: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constraints` | property | <code>constraints: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `intent` | property | <code>intent: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mode` | property | <code>mode: "structured" &#124; "summary"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plan` | property | <code>plan: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `risks` | property | <code>risks: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `successCriteria` | property | <code>successCriteria: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `summary` | property | <code>summary: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ThinkingPlanner`

Thinking Planner interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ThinkingPlanner } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ThinkingPlanner {
    plan(input: ThinkingPlannerInput): Promise<ThinkingPlan>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `plan` | method | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ThinkingPlannerInput`

Thinking Planner Input interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ThinkingPlannerInput } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ThinkingPlannerInput {
    context: BuiltAgentContext;
    config: RequiredReasoningConfig;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `config` | property | <code>config: RequiredReasoningConfig</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `context` | property | <code>context: BuiltAgentContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolActivityPort`

Tool Activity Port interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolActivityPort } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ToolActivityPort {
    execute(request: ToolActivityRequest): Promise<ToolActivityResult>;
    cancel(invocationId: string, reason?: string): Promise<ToolActivityResult | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `execute` | method | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ToolActivityRequest`

Tool Activity Request interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { ToolActivityRequest } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ToolActivityRequest {
    operationId: string;
    invocationId: string;
    runId: string;
    stateAttemptId: string;
    toolRef: SpecRef;
    input: unknown;
    principal: ToolPrincipal;
    deadlineAt?: string;
    idempotencyKey?: string;
    contractSnapshotRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractSnapshotRef` | property | <code>contractSnapshotRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deadlineAt` | property | <code>deadlineAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `idempotencyKey` | property | <code>idempotencyKey?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `operationId` | property | <code>operationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: ToolPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateAttemptId` | property | <code>stateAttemptId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRef` | property | <code>toolRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolActivityResult`

Tool Activity Result interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { ToolActivityResult } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface ToolActivityResult {
    invocationId: string;
    status: 'completed' | 'failed' | 'denied' | 'waiting_approval' | 'cancelled' | 'conflict';
    output?: unknown;
    artifactRefs?: string[];
    approvalRequestRef?: string;
    eventIds: string[];
    error?: NormalizedToolError;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequestRef` | property | <code>approvalRequestRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: NormalizedToolError</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `invocationId` | property | <code>invocationId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "waiting_approval"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `Verifier`

Verifier interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { Verifier } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export interface Verifier {
    verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `AgenticReasoningMode`

Public type alias for Agentic Reasoning Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { AgenticReasoningMode } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export type AgenticReasoningMode = 'react' | 'fsm_react' | 'tot' | 'critique';
```

## `ReActPhase`

Public type alias for ReAct Phase; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReActPhase } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export type ReActPhase = 'observe' | 'reason' | 'select_action' | 'policy_check' | 'act' | 'observe_result' | 'verify' | 'memory_sync' | 'complete' | 'fail' | 'human_review' | 'suspend' | 'cancel';
```

## `ReActSuspensionReason`

Public type alias for ReAct Suspension Reason; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReActSuspensionReason } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export type ReActSuspensionReason = (typeof REACT_SUSPENSION_REASONS)[number];
```

## `ReasoningPersistence`

Public type alias for Reasoning Persistence; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ReasoningPersistence } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export type ReasoningPersistence = 'summary_only' | 'events_only';
```

## `ThinkingMode`

Public type alias for Thinking Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ThinkingMode } from '@codesoul-co/hypha-kernel';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### Declaration

```text
export type ThinkingMode = 'none' | 'summary' | 'structured';
```
