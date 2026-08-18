# `@codesoul-co/hypha-kernel` / `index`

- Package index: [`@codesoul-co/hypha-kernel`](/api/kernel)
- Package guide: [learning and composition guide](/packages/kernel)
- Source: [`packages/kernel/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)
- Exports: **85**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `BasicReActAgentRuntime` | class | <code>new BasicReActAgentRuntime(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | Runtime implementation for Basic Re Act Agent Runtime; see its public constructor and members below. |
| `DefaultAgenticReasoner` | class | <code>new DefaultAgenticReasoner(now?: () =&gt; string): DefaultAgenticReasoner</code> | Runtime implementation for Default Agentic Reasoner; see its public constructor and members below. |
| `DefaultContextBuilder` | class | <code>new DefaultContextBuilder(): DefaultContextBuilder</code> | Runtime implementation for Default Context Builder; see its public constructor and members below. |
| `DefaultThinkingPlanner` | class | <code>new DefaultThinkingPlanner(now?: () =&gt; string): DefaultThinkingPlanner</code> | Runtime implementation for Default Thinking Planner; see its public constructor and members below. |
| `DefaultVerifier` | class | <code>new DefaultVerifier(): DefaultVerifier</code> | Runtime implementation for Default Verifier; see its public constructor and members below. |
| `InMemoryReActContinuationCheckpointStore` | class | <code>new InMemoryReActContinuationCheckpointStore(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | Runtime implementation for In Memory Re Act Continuation Checkpoint Store; see its public constructor and members below. |
| `MemoryContextBuilder` | class | <code>new MemoryContextBuilder(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | Runtime implementation for Memory Context Builder; see its public constructor and members below. |
| `ReActAgentRunner` | class | <code>new ReActAgentRunner(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | Runtime implementation for Re Act Agent Runner; see its public constructor and members below. |
| `ReActRunner` | class | <code>new ReActRunner(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | Runtime implementation for Re Act Runner; see its public constructor and members below. |
| `ReasoningContextBuilder` | class | <code>new ReasoningContextBuilder(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | Runtime implementation for Reasoning Context Builder; see its public constructor and members below. |
| `SkillContextBuilder` | class | <code>new SkillContextBuilder(options: SkillContextBuilderOptions): SkillContextBuilder</code> | Runtime implementation for Skill Context Builder; see its public constructor and members below. |
| `ToolRunnerActivityAdapter` | class | <code>new ToolRunnerActivityAdapter(runner: ToolRunner): ToolRunnerActivityAdapter</code> | Runtime implementation for Tool Runner Activity Adapter; see its public constructor and members below. |
| `agenticReasoningModeSchema` | constant | <code>const agenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | Runtime schema for agentic Reasoning Mode. |
| `kernelSpecDefinitions` | constant | <code>const kernelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ReActAgentSpec&gt;, SpecSchemaDefinition&lt;ReasoningConfig&gt;]</code> | kernel Spec Definitions constant exported by the `index` module. |
| `kernelSpecJsonSchemas` | constant | <code>const kernelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | kernel Spec Json Schemas constant exported by the `index` module. |
| `REACT_PHASE_ORDER` | constant | <code>const REACT_PHASE_ORDER: ReActPhase[]</code> | REACT PHASE ORDER constant exported by the `index` module. |
| `REACT_SUSPENSION_REASONS` | constant | <code>const REACT_SUSPENSION_REASONS: readonly ["quantum_exhausted", "iteration_budget_exhausted", "model_call_budget_exhausted", "tool_call_budget_exhausted", "token_budget_exhausted", "non_progress", "deadline_exceeded"]</code> | REACT SUSPENSION REASONS constant exported by the `index` module. |
| `reActActionSchema` | constant | <code>const reActActionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["tool", "model", "finish", "human_review"]&gt;; toolCallId: z.ZodOptional&lt;z.ZodString&gt;; target: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodUnknown, unknown, unknown&gt;&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"; reason?: string &#124; undefined; toolCallId?: ...</code> | Runtime schema for re Act Action. |
| `reactAgentSpecDefinition` | constant | <code>const reactAgentSpecDefinition: SpecSchemaDefinition&lt;ReActAgentSpec&gt;</code> | Runtime validation entrypoint for the react Agent spec, combining its parser, example and JSON Schema. |
| `reactAgentSpecExample` | constant | <code>const reactAgentSpecExample: ReActAgentSpec</code> | Valid example value for react Agent Spec. |
| `reactAgentSpecJsonSchema` | constant | <code>const reactAgentSpecJsonSchema: JsonSchema</code> | JSON Schema for react Agent Spec. |
| `reactAgentSpecSchema` | constant | <code>const reactAgentSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; modelAlias: z.ZodString; systemInstructions: z.ZodOptional&lt;z.ZodString&gt;; promptRefs: z.ZodOptional&lt;z.Zo...</code> | Runtime schema for react Agent Spec. |
| `reActContinuationCheckpointJsonSchema` | constant | <code>const reActContinuationCheckpointJsonSchema: JsonSchema</code> | JSON Schema for re Act Continuation Checkpoint. |
| `reActContinuationCheckpointSchema` | constant | <code>const reActContinuationCheckpointSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; }, "strict", z.ZodTypeAny, { version: string; id: string; }, { version: string; id: string; }&gt;; nextPhase: z.ZodEnum&lt;["reason", "act"]&gt;; messages: z.ZodArray&lt;z.ZodObject&lt;{ role: z.ZodEnum&lt;[...</code> | Runtime schema for re Act Continuation Checkpoint. |
| `reActExecutionBudgetJsonSchema` | constant | <code>const reActExecutionBudgetJsonSchema: JsonSchema</code> | JSON Schema for re Act Execution Budget. |
| `reActExecutionBudgetSchema` | constant | <code>const reActExecutionBudgetSchema: z.ZodObject&lt;{ maxIterations: z.ZodNumber; maxModelCalls: z.ZodNumber; maxToolCalls: z.ZodNumber; maxTotalTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxConsecutiveNoProgress: z.ZodNumber; quantumIterations: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; ...</code> | Runtime schema for re Act Execution Budget. |
| `reactPhaseSchema` | constant | <code>const reactPhaseSchema: z.ZodEnum&lt;["observe", "reason", "select_action", "policy_check", "act", "observe_result", "verify", "memory_sync", "complete", "fail", "human_review", "suspend", "cancel"]&gt;</code> | Runtime schema for react Phase. |
| `reasoningConfigExample` | constant | <code>const reasoningConfigExample: ReasoningConfig</code> | Valid example value for reasoning Config. |
| `reasoningConfigJsonSchema` | constant | <code>const reasoningConfigJsonSchema: JsonSchema</code> | JSON Schema for reasoning Config. |
| `reasoningConfigSchema` | constant | <code>const reasoningConfigSchema: z.ZodObject&lt;{ thinkingMode: z.ZodOptional&lt;z.ZodEnum&lt;["none", "summary", "structured"]&gt;&gt;; agenticMode: z.ZodOptional&lt;z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;&gt;; maxSteps: z.ZodOptional&lt;z.ZodNumber&gt;; persist: z.ZodOptional&lt;z.ZodEnum&lt;["summary_only", "events_only"]&gt;&gt;; plannerRef: z.ZodOptional&lt;z.ZodString&gt;; reasonerRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodR...</code> | Runtime schema for reasoning Config. |
| `reasoningConfigSpecDefinition` | constant | <code>const reasoningConfigSpecDefinition: SpecSchemaDefinition&lt;ReasoningConfig&gt;</code> | Runtime validation entrypoint for the reasoning Config spec, combining its parser, example and JSON Schema. |
| `reasoningPersistenceSchema` | constant | <code>const reasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | Runtime schema for reasoning Persistence. |
| `thinkingModeSchema` | constant | <code>const thinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | Runtime schema for thinking Mode. |
| `createEpisodicMemorySync` | function | <code>createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable&lt;ReActRunnerOptions["syncMemory"]&gt;</code> | Creates Episodic Memory Sync at this module boundary. |
| `createReActStep` | function | <code>createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep</code> | Creates Re Act Step at this module boundary. |
| `reActContinuationScopeHash` | function | <code>reActContinuationScopeHash(context: ReActRunContext): string</code> | Public runtime operation for re Act Continuation Scope Hash. |
| `validateReActAction` | function | <code>validateReActAction(input: unknown): ReActAction</code> | Validates Re Act Action at this module boundary. |
| `validateReActAgentSpec` | function | <code>validateReActAgentSpec(input: unknown): ReActAgentSpec</code> | Validates Re Act Agent Spec at this module boundary. |
| `validateReActContinuationCheckpoint` | function | <code>validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint</code> | Validates Re Act Continuation Checkpoint at this module boundary. |
| `validateReActExecutionBudget` | function | <code>validateReActExecutionBudget(input: unknown): ReActExecutionBudget</code> | Validates Re Act Execution Budget at this module boundary. |
| `validateReasoningConfig` | function | <code>validateReasoningConfig(input: unknown): ReasoningConfig</code> | Validates Reasoning Config at this module boundary. |
| `AgenticReasoner` | interface | <code>interface AgenticReasoner</code> | Field contract for Agentic Reasoner; see all contract members below. |
| `AgenticReasonerInput` | interface | <code>interface AgenticReasonerInput</code> | Field contract for Agentic Reasoner Input; see all contract members below. |
| `AgenticReasoningDecision` | interface | <code>interface AgenticReasoningDecision</code> | Field contract for Agentic Reasoning Decision; see all contract members below. |
| `BasicReActAgentRuntimeOptions` | interface | <code>interface BasicReActAgentRuntimeOptions</code> | Field contract for Basic Re Act Agent Runtime Options; see all contract members below. |
| `BuiltAgentContext` | interface | <code>interface BuiltAgentContext extends ReActRunContext</code> | Field contract for Built Agent Context; see all contract members below. |
| `ContextBudget` | interface | <code>interface ContextBudget</code> | Field contract for Context Budget; see all contract members below. |
| `ContextBuilder` | interface | <code>interface ContextBuilder</code> | Field contract for Context Builder; see all contract members below. |
| `ContextBuildInput` | interface | <code>interface ContextBuildInput</code> | Field contract for Context Build Input; see all contract members below. |
| `ContextProvenance` | interface | <code>interface ContextProvenance</code> | Field contract for Context Provenance; see all contract members below. |
| `EpisodicMemorySyncOptions` | interface | <code>interface EpisodicMemorySyncOptions</code> | Field contract for Episodic Memory Sync Options; see all contract members below. |
| `InMemoryReActContinuationCheckpointStoreOptions` | interface | <code>interface InMemoryReActContinuationCheckpointStoreOptions</code> | Field contract for In Memory Re Act Continuation Checkpoint Store Options; see all contract members below. |
| `MemoryContextBuilderOptions` | interface | <code>interface MemoryContextBuilderOptions</code> | Field contract for Memory Context Builder Options; see all contract members below. |
| `MemoryContextItem` | interface | <code>interface MemoryContextItem</code> | Field contract for Memory Context Item; see all contract members below. |
| `ReActAction` | interface | <code>interface ReActAction</code> | Field contract for Re Act Action; see all contract members below. |
| `ReActAgentRunnerOptions` | interface | <code>interface ReActAgentRunnerOptions extends Omit&lt;ReActRunnerOptions, 'toolRunner'&gt;</code> | Field contract for Re Act Agent Runner Options; see all contract members below. |
| `ReActAgentRuntime` | interface | <code>interface ReActAgentRuntime</code> | Field contract for Re Act Agent Runtime; see all contract members below. |
| `ReActAgentSpec` | interface | <code>interface ReActAgentSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Re Act Agent Spec; see all contract members below. |
| `ReActContinuationCheckpoint` | interface | <code>interface ReActContinuationCheckpoint</code> | Field contract for Re Act Continuation Checkpoint; see all contract members below. |
| `ReActContinuationCheckpointPutResult` | interface | <code>interface ReActContinuationCheckpointPutResult</code> | Field contract for Re Act Continuation Checkpoint Put Result; see all contract members below. |
| `ReActContinuationCheckpointStore` | interface | <code>interface ReActContinuationCheckpointStore</code> | Field contract for Re Act Continuation Checkpoint Store; see all contract members below. |
| `ReActExecutionBudget` | interface | <code>interface ReActExecutionBudget</code> | Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget. |
| `ReActObservation` | interface | <code>interface ReActObservation</code> | Field contract for Re Act Observation; see all contract members below. |
| `ReActRunContext` | interface | <code>interface ReActRunContext</code> | Field contract for Re Act Run Context; see all contract members below. |
| `ReActRunControl` | interface | <code>interface ReActRunControl</code> | Field contract for Re Act Run Control; see all contract members below. |
| `ReActRunnerOptions` | interface | <code>interface ReActRunnerOptions</code> | Field contract for Re Act Runner Options; see all contract members below. |
| `ReActRunResult` | interface | <code>interface ReActRunResult</code> | Field contract for Re Act Run Result; see all contract members below. |
| `ReActStep` | interface | <code>interface ReActStep</code> | Field contract for Re Act Step; see all contract members below. |
| `ReActSuspension` | interface | <code>interface ReActSuspension</code> | Field contract for Re Act Suspension; see all contract members below. |
| `ReasoningConfig` | interface | <code>interface ReasoningConfig</code> | Field contract for Reasoning Config; see all contract members below. |
| `ReasoningContextBuilderOptions` | interface | <code>interface ReasoningContextBuilderOptions</code> | Field contract for Reasoning Context Builder Options; see all contract members below. |
| `RequiredReasoningConfig` | interface | <code>interface RequiredReasoningConfig extends Required&lt;Omit&lt;ReasoningConfig, 'plannerRef' &#124; 'reasonerRef' &#124; 'metadata'&gt;&gt;</code> | Field contract for Required Reasoning Config; see all contract members below. |
| `SkillContextBuilderOptions` | interface | <code>interface SkillContextBuilderOptions</code> | Field contract for Skill Context Builder Options; see all contract members below. |
| `ThinkingPlan` | interface | <code>interface ThinkingPlan</code> | Field contract for Thinking Plan; see all contract members below. |
| `ThinkingPlanner` | interface | <code>interface ThinkingPlanner</code> | Field contract for Thinking Planner; see all contract members below. |
| `ThinkingPlannerInput` | interface | <code>interface ThinkingPlannerInput</code> | Field contract for Thinking Planner Input; see all contract members below. |
| `ToolActivityPort` | interface | <code>interface ToolActivityPort</code> | Field contract for Tool Activity Port; see all contract members below. |
| `ToolActivityRequest` | interface | <code>interface ToolActivityRequest</code> | Field contract for Tool Activity Request; see all contract members below. |
| `ToolActivityResult` | interface | <code>interface ToolActivityResult</code> | Field contract for Tool Activity Result; see all contract members below. |
| `Verifier` | interface | <code>interface Verifier</code> | Field contract for Verifier; see all contract members below. |
| `AgenticReasoningMode` | type | <code>type AgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Public type alias for Agentic Reasoning Mode. |
| `ReActPhase` | type | <code>type ReActPhase = 'observe' &#124; 'reason' &#124; 'select_action' &#124; 'policy_check' &#124; 'act' &#124; 'observe_result' &#124; 'verify' &#124; 'memory_sync' &#124; 'complete' &#124; 'fail' &#124; 'human_review' &#124; 'suspend' &#124; 'cancel'</code> | Public type alias for Re Act Phase. |
| `ReActSuspensionReason` | type | <code>type ReActSuspensionReason = (typeof REACT_SUSPENSION_REASONS)[number]</code> | Public type alias for Re Act Suspension Reason. |
| `ReasoningPersistence` | type | <code>type ReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Public type alias for Reasoning Persistence. |
| `ThinkingMode` | type | <code>type ThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Public type alias for Thinking Mode. |

## `BasicReActAgentRuntime` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | Creates an instance of this class. |
| `reason` | method | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | Public runtime operation for reason. |
| `selectAction` | method | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | Public runtime operation for select Action. |
| `verify` | method | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public runtime operation for verify. |

## `DefaultAgenticReasoner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(now?: () =&gt; string): DefaultAgenticReasoner</code> | Creates an instance of this class. |
| `decide` | method | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | Decides decide at this module boundary. |

## `DefaultContextBuilder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(): DefaultContextBuilder</code> | Creates an instance of this class. |

## `DefaultThinkingPlanner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(now?: () =&gt; string): DefaultThinkingPlanner</code> | Creates an instance of this class. |
| `plan` | method | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | Plans plan at this module boundary. |

## `DefaultVerifier` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultVerifier</code> | Creates an instance of this class. |
| `verify` | method | <code>verify(_context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public runtime operation for verify. |

## `InMemoryReActContinuationCheckpointStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | Public runtime operation for put. |

## `MemoryContextBuilder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | Creates an instance of this class. |

## `ReActAgentRunner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | Creates an instance of this class. |
| `run` | method | <code>run(input: ContextBuildInput, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | Public runtime operation for run. |

## `ReActRunner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | Creates an instance of this class. |
| `run` | method | <code>run(context: ReActRunContext, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | Public runtime operation for run. |

## `ReasoningContextBuilder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | Creates an instance of this class. |

## `SkillContextBuilder` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Builds build at this module boundary. |
| `constructor` | constructor | <code>(options: SkillContextBuilderOptions): SkillContextBuilder</code> | Creates an instance of this class. |

## `ToolRunnerActivityAdapter` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | Cancels cancel at this module boundary. |
| `constructor` | constructor | <code>(runner: ToolRunner): ToolRunnerActivityAdapter</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | Public runtime operation for execute. |

## `AgenticReasoner` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decide` | method | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | Decides decide at this module boundary. |

## `AgenticReasonerInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `config` | property | <code>config: RequiredReasoningConfig</code> | Public config property. |
| `context` | property | <code>context: BuiltAgentContext</code> | Public context property. |
| `thinkingPlan` | property | <code>thinkingPlan: ThinkingPlan</code> | Public thinking Plan property. |

## `AgenticReasoningDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `actionType` | property | <code>actionType: "human_review" &#124; "tool" &#124; "model" &#124; "reason" &#124; "finish"</code> | Public action Type property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: AgenticReasoningMode</code> | Public mode property. |
| `rationale` | property | <code>rationale: string</code> | Public rationale property. |
| `recommendedPhase` | property | <code>recommendedPhase: ReActPhase</code> | Public recommended Phase property. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public requires Human Review property. |
| `toolCandidates` | property | <code>toolCandidates: string[]</code> | Public tool Candidates property. |
| `verificationStrategy` | property | <code>verificationStrategy: string</code> | Public verification Strategy property. |

## `BasicReActAgentRuntimeOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verifier` | property | <code>verifier: Verifier</code> | Public verifier property. |

## `BuiltAgentContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeSkills` | property | <code>activeSkills: LoadedSkillContext[]</code> | Public active Skills property. |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public agent property. |
| `contextBudget` | property | <code>contextBudget: ContextBudget</code> | Public context Budget property. |
| `contextProvenance` | property | <code>contextProvenance: ContextProvenance[]</code> | Public context Provenance property. |
| `contextSpec` | property | <code>contextSpec: ContextSpec</code> | Public context Spec property. |
| `memoryContext` | property | <code>memoryContext: MemoryContextItem[]</code> | Public memory Context property. |
| `memoryScope` | property | <code>memoryScope: MemoryScope</code> | Public memory Scope property. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `reasoningConfig` | property | <code>reasoningConfig: ReasoningConfig</code> | Public reasoning Config property. |
| `reasoningDecision` | property | <code>reasoningDecision: AgenticReasoningDecision</code> | Public reasoning Decision property. |
| `rejectedSkills` | property | <code>rejectedSkills: { skillId: string; reason: string; }[]</code> | Public rejected Skills property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sourceInput` | property | <code>sourceInput: unknown</code> | Public source Input property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `thinkingPlan` | property | <code>thinkingPlan: ThinkingPlan</code> | Public thinking Plan property. |
| `toolExecutionScope` | property | <code>toolExecutionScope: ToolExecutionScope</code> | Public tool Execution Scope property. |
| `toolPrincipal` | property | <code>toolPrincipal: ToolPrincipal</code> | Public tool Principal property. |

## `ContextBudget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxMemoryChars` | property | <code>maxMemoryChars: number</code> | Public max Memory Chars property. |
| `maxMemoryItems` | property | <code>maxMemoryItems: number</code> | Public max Memory Items property. |
| `maxMessages` | property | <code>maxMessages: number</code> | Public max Messages property. |
| `maxTotalChars` | property | <code>maxTotalChars: number</code> | Public max Total Chars property. |

## `ContextBuilder` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `build` | method | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | Builds build at this module boundary. |

## `ContextBuildInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public agent property. |
| `contextSpec` | property | <code>contextSpec: ContextSpec</code> | Public context Spec property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `memoryScope` | property | <code>memoryScope: MemoryScope</code> | Public memory Scope property. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `toolExecutionScope` | property | <code>toolExecutionScope: ToolExecutionScope</code> | Public tool Execution Scope property. |
| `toolPrincipal` | property | <code>toolPrincipal: ToolPrincipal</code> | Public tool Principal property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `ContextProvenance` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `includedAt` | property | <code>includedAt: string</code> | Public included At property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `source` | property | <code>source: "memory" &#124; "skill" &#124; "system" &#124; "input"</code> | Public source property. |
| `type` | property | <code>type: string</code> | Public type property. |

## `EpisodicMemorySyncOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowLongTerm` | property | <code>allowLongTerm: boolean</code> | Public allow Long Term property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `idPrefix` | property | <code>idPrefix: string</code> | Public id Prefix property. |
| `memory` | property | <code>memory: Pick&lt;MemoryManager, "write"&gt;</code> | Public memory property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `source` | property | <code>source: string</code> | Public source property. |
| `visibility` | property | <code>visibility: "workspace" &#124; "private" &#124; "public"</code> | Public visibility property. |

## `InMemoryReActContinuationCheckpointStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxCheckpointBytes` | property | <code>maxCheckpointBytes: number</code> | Public max Checkpoint Bytes property. |
| `maxCheckpoints` | property | <code>maxCheckpoints: number</code> | Public max Checkpoints property. |
| `maxIdempotencyRecords` | property | <code>maxIdempotencyRecords: number</code> | Public max Idempotency Records property. |

## `MemoryContextBuilderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseBuilder` | property | <code>baseBuilder: ContextBuilder</code> | Public base Builder property. |
| `budget` | property | <code>budget: ContextBudget</code> | Public budget property. |
| `embeddings` | property | <code>embeddings: EmbeddingProvider</code> | Public embeddings property. |
| `memory` | property | <code>memory: Pick&lt;MemoryManager, "search"&gt;</code> | Public memory property. |
| `memoryTypes` | property | <code>memoryTypes: MemoryType[]</code> | Public memory Types property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `query` | property | <code>query: MemorySearchQuery &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; MemorySearchQuery &#124; Promise&lt;MemorySearchQuery&gt;)</code> | Public query property. |

## `MemoryContextItem` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public content property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `score` | property | <code>score: number</code> | Public score property. |
| `type` | property | <code>type: MemoryType</code> | Public type property. |

## `ReActAction` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `target` | property | <code>target: string</code> | Public target property. |
| `toolCallId` | property | <code>toolCallId: string</code> | Public tool Call Id property. |
| `type` | property | <code>type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"</code> | Public type property. |

## `ReActAgentRunnerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticReasoner` | property | <code>agenticReasoner: AgenticReasoner</code> | Public agentic Reasoner property. |
| `allowedSkills` | property | <code>allowedSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public allowed Skills property. |
| `checkpointStore` | property | <code>checkpointStore: ReActContinuationCheckpointStore</code> | Public checkpoint Store property. |
| `contextBuilder` | property | <code>contextBuilder: ContextBuilder</code> | Public context Builder property. |
| `continueAfterTool` | property | <code>continueAfterTool: boolean</code> | Public continue After Tool property. |
| `executionBudget` | property | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | Public execution Budget property. |
| `inference` | property | <code>inference: InferenceProvider</code> | Public inference property. |
| `maxIterations` | property | <code>maxIterations: number</code> | Public max Iterations property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onCheckpoint` | method | <code>onCheckpoint(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Handles Checkpoint at this module boundary. |
| `onResume` | method | <code>onResume(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Handles Resume at this module boundary. |
| `onStep` | method | <code>onStep(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | Handles Step at this module boundary. |
| `reasoningConfig` | property | <code>reasoningConfig: ReasoningConfig</code> | Public reasoning Config property. |
| `requiredSkills` | property | <code>requiredSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public required Skills property. |
| `resolveToolExecutionScope` | method | <code>resolveToolExecutionScope(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | Resolves Tool Execution Scope at this module boundary. |
| `retainCheckpointUntilOutcome` | property | <code>retainCheckpointUntilOutcome: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `runtime` | property | <code>runtime: ReActAgentRuntime</code> | Public runtime property. |
| `skillContextLoader` | property | <code>skillContextLoader: SkillContextLoader</code> | Public skill Context Loader property. |
| `skillPolicy` | property | <code>skillPolicy: SkillPolicy</code> | Public skill Policy property. |
| `skillRegistry` | property | <code>skillRegistry: SkillRegistry</code> | Public skill Registry property. |
| `skillSelector` | property | <code>skillSelector: SkillSelector</code> | Public skill Selector property. |
| `syncMemory` | method | <code>syncMemory(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | Public runtime operation for sync Memory. |
| `thinkingPlanner` | property | <code>thinkingPlanner: ThinkingPlanner</code> | Public thinking Planner property. |
| `toolRunner` | property | <code>toolRunner: ToolRunner</code> | Public tool Runner property. |
| `verifier` | property | <code>verifier: Verifier</code> | Public verifier property. |

## `ReActAgentRuntime` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | method | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | Public runtime operation for reason. |
| `selectAction` | method | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | Public runtime operation for select Action. |
| `verify` | method | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public runtime operation for verify. |

## `ReActAgentSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextSpecRef` | property | <code>contextSpecRef: SpecRef</code> | Public context Spec Ref property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: string</code> | Public memory Profile Ref property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `promptRefs` | property | <code>promptRefs: AgentPromptRef[]</code> | Public prompt Refs property. |
| `reasoning` | property | <code>reasoning: ReasoningConfig</code> | Public reasoning property. |
| `skillRefs` | property | <code>skillRefs: SkillRef[]</code> | Public skill Refs property. |
| `systemInstructions` | property | <code>systemInstructions: string</code> | Public system Instructions property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `toolRefs` | property | <code>toolRefs: string[]</code> | Public tool Refs property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ReActContinuationCheckpoint` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `consecutiveNoProgress` | property | <code>consecutiveNoProgress: number</code> | Public consecutive No Progress property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `iterations` | property | <code>iterations: number</code> | Public iterations property. |
| `lastProgressFingerprint` | property | <code>lastProgressFingerprint: string</code> | Public last Progress Fingerprint property. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public messages property. |
| `modelCalls` | property | <code>modelCalls: number</code> | Public model Calls property. |
| `nextPhase` | property | <code>nextPhase: "reason" &#124; "act"</code> | Public next Phase property. |
| `pendingAction` | property | <code>pendingAction: ReActAction</code> | Public pending Action property. |
| `pendingToolInvocationId` | property | <code>pendingToolInvocationId: string</code> | Public pending Tool Invocation Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `stepSequence` | property | <code>stepSequence: number</code> | Public step Sequence property. |
| `toolCalls` | property | <code>toolCalls: number</code> | Public tool Calls property. |
| `toolInvocationSequence` | property | <code>toolInvocationSequence: number</code> | Public tool Invocation Sequence property. |
| `totalTokens` | property | <code>totalTokens: number</code> | Public total Tokens property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `ReActContinuationCheckpointPutResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoint` | property | <code>checkpoint: ReActContinuationCheckpoint</code> | Public checkpoint property. |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |

## `ReActContinuationCheckpointStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(checkpoint: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | Public runtime operation for put. |

## `ReActExecutionBudget` contract members

Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `maxConsecutiveNoProgress` | property | <code>maxConsecutiveNoProgress: number</code> | Public max Consecutive No Progress property. |
| `maxIterations` | property | <code>maxIterations: number</code> | Public max Iterations property. |
| `maxModelCalls` | property | <code>maxModelCalls: number</code> | Public max Model Calls property. |
| `maxToolCalls` | property | <code>maxToolCalls: number</code> | Public max Tool Calls property. |
| `maxTotalTokens` | property | <code>maxTotalTokens: number</code> | Public max Total Tokens property. |
| `quantumIterations` | property | <code>quantumIterations: number</code> | Public quantum Iterations property. |

## `ReActObservation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `source` | property | <code>source: "memory" &#124; "system" &#124; "human" &#124; "tool" &#124; "model"</code> | Public source property. |
| `value` | property | <code>value: TValue</code> | Public value property. |

## `ReActRunContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeSkills` | property | <code>activeSkills: LoadedSkillContext[]</code> | Public active Skills property. |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public agent property. |
| `contextSpec` | property | <code>contextSpec: ContextSpec</code> | Public context Spec property. |
| `memoryScope` | property | <code>memoryScope: MemoryScope</code> | Public memory Scope property. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `reasoningConfig` | property | <code>reasoningConfig: ReasoningConfig</code> | Public reasoning Config property. |
| `reasoningDecision` | property | <code>reasoningDecision: AgenticReasoningDecision</code> | Public reasoning Decision property. |
| `rejectedSkills` | property | <code>rejectedSkills: { skillId: string; reason: string; }[]</code> | Public rejected Skills property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `thinkingPlan` | property | <code>thinkingPlan: ThinkingPlan</code> | Public thinking Plan property. |
| `toolExecutionScope` | property | <code>toolExecutionScope: ToolExecutionScope</code> | Public tool Execution Scope property. |
| `toolPrincipal` | property | <code>toolPrincipal: ToolPrincipal</code> | Public tool Principal property. |

## `ReActRunControl` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `checkpoint` | property | <code>checkpoint: ReActContinuationCheckpoint</code> | Public checkpoint property. |
| `executionBudget` | property | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | Public execution Budget property. |
| `resumeFromCheckpointStore` | property | <code>resumeFromCheckpointStore: boolean</code> | Public resume From Checkpoint Store property. |

## `ReActRunnerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointStore` | property | <code>checkpointStore: ReActContinuationCheckpointStore</code> | Public checkpoint Store property. |
| `continueAfterTool` | property | <code>continueAfterTool: boolean</code> | Public continue After Tool property. |
| `executionBudget` | property | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | Public execution Budget property. |
| `inference` | property | <code>inference: InferenceProvider</code> | Public inference property. |
| `maxIterations` | property | <code>maxIterations: number</code> | Public max Iterations property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onCheckpoint` | method | <code>onCheckpoint(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Handles Checkpoint at this module boundary. |
| `onResume` | method | <code>onResume(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | Handles Resume at this module boundary. |
| `onStep` | method | <code>onStep(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | Handles Step at this module boundary. |
| `resolveToolExecutionScope` | method | <code>resolveToolExecutionScope(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | Resolves Tool Execution Scope at this module boundary. |
| `retainCheckpointUntilOutcome` | property | <code>retainCheckpointUntilOutcome: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `syncMemory` | method | <code>syncMemory(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | Public runtime operation for sync Memory. |
| `toolRunner` | property | <code>toolRunner: ToolRunner</code> | Public tool Runner property. |

## `ReActRunResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpoint` | property | <code>checkpoint: ReActContinuationCheckpoint</code> | Public checkpoint property. |
| `error` | property | <code>error: unknown</code> | Public error property. |
| `finalAction` | property | <code>finalAction: ReActAction</code> | Public final Action property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "human_review_required"</code> | Public status property. |
| `steps` | property | <code>steps: ReActStep[]</code> | Public steps property. |
| `suspension` | property | <code>suspension: ReActSuspension</code> | Public suspension property. |

## `ReActStep` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `phase` | property | <code>phase: ReActPhase</code> | Public phase property. |
| `traceEventId` | property | <code>traceEventId: string</code> | Public trace Event Id property. |

## `ReActSuspension` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `message` | property | <code>message: string</code> | Public message property. |
| `reason` | property | <code>reason: "quantum_exhausted" &#124; "iteration_budget_exhausted" &#124; "model_call_budget_exhausted" &#124; "tool_call_budget_exhausted" &#124; "token_budget_exhausted" &#124; "non_progress" &#124; "deadline_exceeded"</code> | Public reason property. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public requires Human Review property. |
| `retryable` | property | <code>retryable: boolean</code> | Public retryable property. |

## `ReasoningConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticMode` | property | <code>agenticMode: AgenticReasoningMode</code> | Public agentic Mode property. |
| `maxSteps` | property | <code>maxSteps: number</code> | Public max Steps property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `persist` | property | <code>persist: ReasoningPersistence</code> | Public persist property. |
| `plannerRef` | property | <code>plannerRef: string</code> | Public planner Ref property. |
| `reasonerRef` | property | <code>reasonerRef: string</code> | Public reasoner Ref property. |
| `thinkingMode` | property | <code>thinkingMode: ThinkingMode</code> | Public thinking Mode property. |

## `ReasoningContextBuilderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `baseBuilder` | property | <code>baseBuilder: ContextBuilder</code> | Public base Builder property. |
| `config` | property | <code>config: ReasoningConfig</code> | Public config property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `planner` | property | <code>planner: ThinkingPlanner</code> | Public planner property. |
| `reasoner` | property | <code>reasoner: AgenticReasoner</code> | Public reasoner property. |

## `RequiredReasoningConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticMode` | property | <code>agenticMode: AgenticReasoningMode</code> | Public agentic Mode property. |
| `maxSteps` | property | <code>maxSteps: number</code> | Public max Steps property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `persist` | property | <code>persist: ReasoningPersistence</code> | Public persist property. |
| `plannerRef` | property | <code>plannerRef: string</code> | Public planner Ref property. |
| `reasonerRef` | property | <code>reasonerRef: string</code> | Public reasoner Ref property. |
| `thinkingMode` | property | <code>thinkingMode: ThinkingMode</code> | Public thinking Mode property. |

## `SkillContextBuilderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedSkills` | property | <code>allowedSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public allowed Skills property. |
| `availableToolRefs` | property | <code>availableToolRefs: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; Promise&lt;string[]&gt;)</code> | Public available Tool Refs property. |
| `baseBuilder` | property | <code>baseBuilder: ContextBuilder</code> | Public base Builder property. |
| `contextLoader` | property | <code>contextLoader: SkillContextLoader</code> | Public context Loader property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `policy` | property | <code>policy: SkillPolicy</code> | Public policy property. |
| `registry` | property | <code>registry: SkillRegistry</code> | Public registry property. |
| `requiredSkills` | property | <code>requiredSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public required Skills property. |
| `selector` | property | <code>selector: SkillSelector</code> | Public selector property. |

## `ThinkingPlan` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constraints` | property | <code>constraints: string[]</code> | Public constraints property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `intent` | property | <code>intent: string</code> | Public intent property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mode` | property | <code>mode: "structured" &#124; "summary"</code> | Public mode property. |
| `plan` | property | <code>plan: string[]</code> | Public plan property. |
| `risks` | property | <code>risks: string[]</code> | Public risks property. |
| `successCriteria` | property | <code>successCriteria: string[]</code> | Public success Criteria property. |
| `summary` | property | <code>summary: string</code> | Public summary property. |

## `ThinkingPlanner` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `plan` | method | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | Plans plan at this module boundary. |

## `ThinkingPlannerInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `config` | property | <code>config: RequiredReasoningConfig</code> | Public config property. |
| `context` | property | <code>context: BuiltAgentContext</code> | Public context property. |

## `ToolActivityPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | Cancels cancel at this module boundary. |
| `execute` | method | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | Public runtime operation for execute. |

## `ToolActivityRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contractSnapshotRef` | property | <code>contractSnapshotRef: string</code> | Public contract Snapshot Ref property. |
| `deadlineAt` | property | <code>deadlineAt: string</code> | Public deadline At property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `operationId` | property | <code>operationId: string</code> | Public operation Id property. |
| `principal` | property | <code>principal: ToolPrincipal</code> | Public principal property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `stateAttemptId` | property | <code>stateAttemptId: string</code> | Public state Attempt Id property. |
| `toolRef` | property | <code>toolRef: SpecRef</code> | Public tool Ref property. |

## `ToolActivityResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvalRequestRef` | property | <code>approvalRequestRef: string</code> | Public approval Request Ref property. |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `error` | property | <code>error: NormalizedToolError</code> | Public error property. |
| `eventIds` | property | <code>eventIds: string[]</code> | Public event Ids property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `status` | property | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "waiting_approval"</code> | Public status property. |

## `Verifier` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `verify` | method | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | Public runtime operation for verify. |
