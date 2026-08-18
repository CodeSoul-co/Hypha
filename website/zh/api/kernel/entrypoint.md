# `@codesoul-co/hypha-kernel` / `index`

- 包索引: [`@codesoul-co/hypha-kernel`](/zh/api/kernel)
- 模块指南: [学习与组合说明](/zh/packages/kernel)
- 源码: [`packages/kernel/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)
- 导出数: **85**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `BasicReActAgentRuntime` | 类 | <code>new BasicReActAgentRuntime(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | Basic Re Act Agent Runtime 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultAgenticReasoner` | 类 | <code>new DefaultAgenticReasoner(now?: () =&gt; string): DefaultAgenticReasoner</code> | Default Agentic Reasoner 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultContextBuilder` | 类 | <code>new DefaultContextBuilder(): DefaultContextBuilder</code> | Default Context Builder 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultThinkingPlanner` | 类 | <code>new DefaultThinkingPlanner(now?: () =&gt; string): DefaultThinkingPlanner</code> | Default Thinking Planner 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultVerifier` | 类 | <code>new DefaultVerifier(): DefaultVerifier</code> | Default Verifier 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryReActContinuationCheckpointStore` | 类 | <code>new InMemoryReActContinuationCheckpointStore(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | In Memory Re Act Continuation Checkpoint Store 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryContextBuilder` | 类 | <code>new MemoryContextBuilder(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | Memory Context Builder 的运行时实现；公开构造函数与成员见下表。 |
| `ReActAgentRunner` | 类 | <code>new ReActAgentRunner(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | Re Act Agent Runner 的运行时实现；公开构造函数与成员见下表。 |
| `ReActRunner` | 类 | <code>new ReActRunner(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | Re Act Runner 的运行时实现；公开构造函数与成员见下表。 |
| `ReasoningContextBuilder` | 类 | <code>new ReasoningContextBuilder(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | Reasoning Context Builder 的运行时实现；公开构造函数与成员见下表。 |
| `SkillContextBuilder` | 类 | <code>new SkillContextBuilder(options: SkillContextBuilderOptions): SkillContextBuilder</code> | Skill Context Builder 的运行时实现；公开构造函数与成员见下表。 |
| `ToolRunnerActivityAdapter` | 类 | <code>new ToolRunnerActivityAdapter(runner: ToolRunner): ToolRunnerActivityAdapter</code> | Tool Runner Activity Adapter 的运行时实现；公开构造函数与成员见下表。 |
| `agenticReasoningModeSchema` | 常量 | <code>const agenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | agentic Reasoning Mode 的运行时 Schema。 |
| `kernelSpecDefinitions` | 常量 | <code>const kernelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ReActAgentSpec&gt;, SpecSchemaDefinition&lt;ReasoningConfig&gt;]</code> | 由 `index` 模块导出的 kernel Spec Definitions 常量。 |
| `kernelSpecJsonSchemas` | 常量 | <code>const kernelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 kernel Spec Json Schemas 常量。 |
| `REACT_PHASE_ORDER` | 常量 | <code>const REACT_PHASE_ORDER: ReActPhase[]</code> | 由 `index` 模块导出的 REACT PHASE ORDER 常量。 |
| `REACT_SUSPENSION_REASONS` | 常量 | <code>const REACT_SUSPENSION_REASONS: readonly ["quantum_exhausted", "iteration_budget_exhausted", "model_call_budget_exhausted", "tool_call_budget_exhausted", "token_budget_exhausted", "non_progress", "deadline_exceeded"]</code> | 由 `index` 模块导出的 REACT SUSPENSION REASONS 常量。 |
| `reActActionSchema` | 常量 | <code>const reActActionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["tool", "model", "finish", "human_review"]&gt;; toolCallId: z.ZodOptional&lt;z.ZodString&gt;; target: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodUnknown, unknown, unknown&gt;&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"; reason?: string &#124; undefined; toolCallId?: ...</code> | re Act Action 的运行时 Schema。 |
| `reactAgentSpecDefinition` | 常量 | <code>const reactAgentSpecDefinition: SpecSchemaDefinition&lt;ReActAgentSpec&gt;</code> | react Agent Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `reactAgentSpecExample` | 常量 | <code>const reactAgentSpecExample: ReActAgentSpec</code> | react Agent Spec 的有效示例值。 |
| `reactAgentSpecJsonSchema` | 常量 | <code>const reactAgentSpecJsonSchema: JsonSchema</code> | react Agent Spec 的 JSON Schema。 |
| `reactAgentSpecSchema` | 常量 | <code>const reactAgentSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; modelAlias: z.ZodString; systemInstructions: z.ZodOptional&lt;z.ZodString&gt;; promptRefs: z.ZodOptional&lt;z.Zo...</code> | react Agent Spec 的运行时 Schema。 |
| `reActContinuationCheckpointJsonSchema` | 常量 | <code>const reActContinuationCheckpointJsonSchema: JsonSchema</code> | re Act Continuation Checkpoint 的 JSON Schema。 |
| `reActContinuationCheckpointSchema` | 常量 | <code>const reActContinuationCheckpointSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; }, "strict", z.ZodTypeAny, { version: string; id: string; }, { version: string; id: string; }&gt;; nextPhase: z.ZodEnum&lt;["reason", "act"]&gt;; messages: z.ZodArray&lt;z.ZodObject&lt;{ role: z.ZodEnum&lt;[...</code> | re Act Continuation Checkpoint 的运行时 Schema。 |
| `reActExecutionBudgetJsonSchema` | 常量 | <code>const reActExecutionBudgetJsonSchema: JsonSchema</code> | re Act Execution Budget 的 JSON Schema。 |
| `reActExecutionBudgetSchema` | 常量 | <code>const reActExecutionBudgetSchema: z.ZodObject&lt;{ maxIterations: z.ZodNumber; maxModelCalls: z.ZodNumber; maxToolCalls: z.ZodNumber; maxTotalTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxConsecutiveNoProgress: z.ZodNumber; quantumIterations: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; ...</code> | re Act Execution Budget 的运行时 Schema。 |
| `reactPhaseSchema` | 常量 | <code>const reactPhaseSchema: z.ZodEnum&lt;["observe", "reason", "select_action", "policy_check", "act", "observe_result", "verify", "memory_sync", "complete", "fail", "human_review", "suspend", "cancel"]&gt;</code> | react Phase 的运行时 Schema。 |
| `reasoningConfigExample` | 常量 | <code>const reasoningConfigExample: ReasoningConfig</code> | reasoning Config 的有效示例值。 |
| `reasoningConfigJsonSchema` | 常量 | <code>const reasoningConfigJsonSchema: JsonSchema</code> | reasoning Config 的 JSON Schema。 |
| `reasoningConfigSchema` | 常量 | <code>const reasoningConfigSchema: z.ZodObject&lt;{ thinkingMode: z.ZodOptional&lt;z.ZodEnum&lt;["none", "summary", "structured"]&gt;&gt;; agenticMode: z.ZodOptional&lt;z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;&gt;; maxSteps: z.ZodOptional&lt;z.ZodNumber&gt;; persist: z.ZodOptional&lt;z.ZodEnum&lt;["summary_only", "events_only"]&gt;&gt;; plannerRef: z.ZodOptional&lt;z.ZodString&gt;; reasonerRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodR...</code> | reasoning Config 的运行时 Schema。 |
| `reasoningConfigSpecDefinition` | 常量 | <code>const reasoningConfigSpecDefinition: SpecSchemaDefinition&lt;ReasoningConfig&gt;</code> | reasoning Config Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `reasoningPersistenceSchema` | 常量 | <code>const reasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | reasoning Persistence 的运行时 Schema。 |
| `thinkingModeSchema` | 常量 | <code>const thinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | thinking Mode 的运行时 Schema。 |
| `createEpisodicMemorySync` | 函数 | <code>createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable&lt;ReActRunnerOptions["syncMemory"]&gt;</code> | 创建 Episodic Memory Sync。 |
| `createReActStep` | 函数 | <code>createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep</code> | 创建 Re Act Step。 |
| `reActContinuationScopeHash` | 函数 | <code>reActContinuationScopeHash(context: ReActRunContext): string</code> | re Act Continuation Scope Hash 的公开运行时操作。 |
| `validateReActAction` | 函数 | <code>validateReActAction(input: unknown): ReActAction</code> | 校验 Re Act Action。 |
| `validateReActAgentSpec` | 函数 | <code>validateReActAgentSpec(input: unknown): ReActAgentSpec</code> | 校验 Re Act Agent Spec。 |
| `validateReActContinuationCheckpoint` | 函数 | <code>validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint</code> | 校验 Re Act Continuation Checkpoint。 |
| `validateReActExecutionBudget` | 函数 | <code>validateReActExecutionBudget(input: unknown): ReActExecutionBudget</code> | 校验 Re Act Execution Budget。 |
| `validateReasoningConfig` | 函数 | <code>validateReasoningConfig(input: unknown): ReasoningConfig</code> | 校验 Reasoning Config。 |
| `AgenticReasoner` | 接口 | <code>interface AgenticReasoner</code> | Agentic Reasoner 的字段契约；完整字段见下表。 |
| `AgenticReasonerInput` | 接口 | <code>interface AgenticReasonerInput</code> | Agentic Reasoner Input 的字段契约；完整字段见下表。 |
| `AgenticReasoningDecision` | 接口 | <code>interface AgenticReasoningDecision</code> | Agentic Reasoning Decision 的字段契约；完整字段见下表。 |
| `BasicReActAgentRuntimeOptions` | 接口 | <code>interface BasicReActAgentRuntimeOptions</code> | Basic Re Act Agent Runtime Options 的字段契约；完整字段见下表。 |
| `BuiltAgentContext` | 接口 | <code>interface BuiltAgentContext extends ReActRunContext</code> | Built Agent Context 的字段契约；完整字段见下表。 |
| `ContextBudget` | 接口 | <code>interface ContextBudget</code> | Context Budget 的字段契约；完整字段见下表。 |
| `ContextBuilder` | 接口 | <code>interface ContextBuilder</code> | Context Builder 的字段契约；完整字段见下表。 |
| `ContextBuildInput` | 接口 | <code>interface ContextBuildInput</code> | Context Build Input 的字段契约；完整字段见下表。 |
| `ContextProvenance` | 接口 | <code>interface ContextProvenance</code> | Context Provenance 的字段契约；完整字段见下表。 |
| `EpisodicMemorySyncOptions` | 接口 | <code>interface EpisodicMemorySyncOptions</code> | Episodic Memory Sync Options 的字段契约；完整字段见下表。 |
| `InMemoryReActContinuationCheckpointStoreOptions` | 接口 | <code>interface InMemoryReActContinuationCheckpointStoreOptions</code> | In Memory Re Act Continuation Checkpoint Store Options 的字段契约；完整字段见下表。 |
| `MemoryContextBuilderOptions` | 接口 | <code>interface MemoryContextBuilderOptions</code> | Memory Context Builder Options 的字段契约；完整字段见下表。 |
| `MemoryContextItem` | 接口 | <code>interface MemoryContextItem</code> | Memory Context Item 的字段契约；完整字段见下表。 |
| `ReActAction` | 接口 | <code>interface ReActAction</code> | Re Act Action 的字段契约；完整字段见下表。 |
| `ReActAgentRunnerOptions` | 接口 | <code>interface ReActAgentRunnerOptions extends Omit&lt;ReActRunnerOptions, 'toolRunner'&gt;</code> | Re Act Agent Runner Options 的字段契约；完整字段见下表。 |
| `ReActAgentRuntime` | 接口 | <code>interface ReActAgentRuntime</code> | Re Act Agent Runtime 的字段契约；完整字段见下表。 |
| `ReActAgentSpec` | 接口 | <code>interface ReActAgentSpec extends VersionedSpec, SpecMetadata</code> | Re Act Agent Spec 的字段契约；完整字段见下表。 |
| `ReActContinuationCheckpoint` | 接口 | <code>interface ReActContinuationCheckpoint</code> | Re Act Continuation Checkpoint 的字段契约；完整字段见下表。 |
| `ReActContinuationCheckpointPutResult` | 接口 | <code>interface ReActContinuationCheckpointPutResult</code> | Re Act Continuation Checkpoint Put Result 的字段契约；完整字段见下表。 |
| `ReActContinuationCheckpointStore` | 接口 | <code>interface ReActContinuationCheckpointStore</code> | Re Act Continuation Checkpoint Store 的字段契约；完整字段见下表。 |
| `ReActExecutionBudget` | 接口 | <code>interface ReActExecutionBudget</code> | Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget. |
| `ReActObservation` | 接口 | <code>interface ReActObservation</code> | Re Act Observation 的字段契约；完整字段见下表。 |
| `ReActRunContext` | 接口 | <code>interface ReActRunContext</code> | Re Act Run Context 的字段契约；完整字段见下表。 |
| `ReActRunControl` | 接口 | <code>interface ReActRunControl</code> | Re Act Run Control 的字段契约；完整字段见下表。 |
| `ReActRunnerOptions` | 接口 | <code>interface ReActRunnerOptions</code> | Re Act Runner Options 的字段契约；完整字段见下表。 |
| `ReActRunResult` | 接口 | <code>interface ReActRunResult</code> | Re Act Run Result 的字段契约；完整字段见下表。 |
| `ReActStep` | 接口 | <code>interface ReActStep</code> | Re Act Step 的字段契约；完整字段见下表。 |
| `ReActSuspension` | 接口 | <code>interface ReActSuspension</code> | Re Act Suspension 的字段契约；完整字段见下表。 |
| `ReasoningConfig` | 接口 | <code>interface ReasoningConfig</code> | Reasoning Config 的字段契约；完整字段见下表。 |
| `ReasoningContextBuilderOptions` | 接口 | <code>interface ReasoningContextBuilderOptions</code> | Reasoning Context Builder Options 的字段契约；完整字段见下表。 |
| `RequiredReasoningConfig` | 接口 | <code>interface RequiredReasoningConfig extends Required&lt;Omit&lt;ReasoningConfig, 'plannerRef' &#124; 'reasonerRef' &#124; 'metadata'&gt;&gt;</code> | Required Reasoning Config 的字段契约；完整字段见下表。 |
| `SkillContextBuilderOptions` | 接口 | <code>interface SkillContextBuilderOptions</code> | Skill Context Builder Options 的字段契约；完整字段见下表。 |
| `ThinkingPlan` | 接口 | <code>interface ThinkingPlan</code> | Thinking Plan 的字段契约；完整字段见下表。 |
| `ThinkingPlanner` | 接口 | <code>interface ThinkingPlanner</code> | Thinking Planner 的字段契约；完整字段见下表。 |
| `ThinkingPlannerInput` | 接口 | <code>interface ThinkingPlannerInput</code> | Thinking Planner Input 的字段契约；完整字段见下表。 |
| `ToolActivityPort` | 接口 | <code>interface ToolActivityPort</code> | Tool Activity Port 的字段契约；完整字段见下表。 |
| `ToolActivityRequest` | 接口 | <code>interface ToolActivityRequest</code> | Tool Activity Request 的字段契约；完整字段见下表。 |
| `ToolActivityResult` | 接口 | <code>interface ToolActivityResult</code> | Tool Activity Result 的字段契约；完整字段见下表。 |
| `Verifier` | 接口 | <code>interface Verifier</code> | Verifier 的字段契约；完整字段见下表。 |
| `AgenticReasoningMode` | 类型 | <code>type AgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Agentic Reasoning Mode 的公共类型别名。 |
| `ReActPhase` | 类型 | <code>type ReActPhase = 'observe' &#124; 'reason' &#124; 'select_action' &#124; 'policy_check' &#124; 'act' &#124; 'observe_result' &#124; 'verify' &#124; 'memory_sync' &#124; 'complete' &#124; 'fail' &#124; 'human_review' &#124; 'suspend' &#124; 'cancel'</code> | Re Act Phase 的公共类型别名。 |
| `ReActSuspensionReason` | 类型 | <code>type ReActSuspensionReason = (typeof REACT_SUSPENSION_REASONS)[number]</code> | Re Act Suspension Reason 的公共类型别名。 |
| `ReasoningPersistence` | 类型 | <code>type ReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Reasoning Persistence 的公共类型别名。 |
| `ThinkingMode` | 类型 | <code>type ThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Thinking Mode 的公共类型别名。 |

## `BasicReActAgentRuntime` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | 创建该类的实例。 |
| `reason` | 方法 | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | reason 的公开运行时操作。 |
| `selectAction` | 方法 | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | select Action 的公开运行时操作。 |
| `verify` | 方法 | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | verify 的公开运行时操作。 |

## `DefaultAgenticReasoner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(now?: () =&gt; string): DefaultAgenticReasoner</code> | 创建该类的实例。 |
| `decide` | 方法 | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | 决定 decide。 |

## `DefaultContextBuilder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(): DefaultContextBuilder</code> | 创建该类的实例。 |

## `DefaultThinkingPlanner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(now?: () =&gt; string): DefaultThinkingPlanner</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | 规划 plan。 |

## `DefaultVerifier` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultVerifier</code> | 创建该类的实例。 |
| `verify` | 方法 | <code>verify(_context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | verify 的公开运行时操作。 |

## `InMemoryReActContinuationCheckpointStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | put 的公开运行时操作。 |

## `MemoryContextBuilder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | 创建该类的实例。 |

## `ReActAgentRunner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(input: ContextBuildInput, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | run 的公开运行时操作。 |

## `ReActRunner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(context: ReActRunContext, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | run 的公开运行时操作。 |

## `ReasoningContextBuilder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | 创建该类的实例。 |

## `SkillContextBuilder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(options: SkillContextBuilderOptions): SkillContextBuilder</code> | 创建该类的实例。 |

## `ToolRunnerActivityAdapter` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | 取消 cancel。 |
| `constructor` | 构造函数 | <code>(runner: ToolRunner): ToolRunnerActivityAdapter</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | execute 的公开运行时操作。 |

## `AgenticReasoner` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decide` | 方法 | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | 决定 decide。 |

## `AgenticReasonerInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `config` | 属性 | <code>config: RequiredReasoningConfig</code> | config 字段。 |
| `context` | 属性 | <code>context: BuiltAgentContext</code> | context 字段。 |
| `thinkingPlan` | 属性 | <code>thinkingPlan: ThinkingPlan</code> | thinking Plan 字段。 |

## `AgenticReasoningDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actionType` | 属性 | <code>actionType: "human_review" &#124; "tool" &#124; "model" &#124; "reason" &#124; "finish"</code> | action Type 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: AgenticReasoningMode</code> | mode 字段。 |
| `rationale` | 属性 | <code>rationale: string</code> | rationale 字段。 |
| `recommendedPhase` | 属性 | <code>recommendedPhase: ReActPhase</code> | recommended Phase 字段。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | requires Human Review 字段。 |
| `toolCandidates` | 属性 | <code>toolCandidates: string[]</code> | tool Candidates 字段。 |
| `verificationStrategy` | 属性 | <code>verificationStrategy: string</code> | verification Strategy 字段。 |

## `BasicReActAgentRuntimeOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verifier` | 属性 | <code>verifier: Verifier</code> | verifier 字段。 |

## `BuiltAgentContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeSkills` | 属性 | <code>activeSkills: LoadedSkillContext[]</code> | active Skills 字段。 |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | agent 字段。 |
| `contextBudget` | 属性 | <code>contextBudget: ContextBudget</code> | context Budget 字段。 |
| `contextProvenance` | 属性 | <code>contextProvenance: ContextProvenance[]</code> | context Provenance 字段。 |
| `contextSpec` | 属性 | <code>contextSpec: ContextSpec</code> | context Spec 字段。 |
| `memoryContext` | 属性 | <code>memoryContext: MemoryContextItem[]</code> | memory Context 字段。 |
| `memoryScope` | 属性 | <code>memoryScope: MemoryScope</code> | memory Scope 字段。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig: ReasoningConfig</code> | reasoning Config 字段。 |
| `reasoningDecision` | 属性 | <code>reasoningDecision: AgenticReasoningDecision</code> | reasoning Decision 字段。 |
| `rejectedSkills` | 属性 | <code>rejectedSkills: { skillId: string; reason: string; }[]</code> | rejected Skills 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sourceInput` | 属性 | <code>sourceInput: unknown</code> | source Input 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `thinkingPlan` | 属性 | <code>thinkingPlan: ThinkingPlan</code> | thinking Plan 字段。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope: ToolExecutionScope</code> | tool Execution Scope 字段。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal: ToolPrincipal</code> | tool Principal 字段。 |

## `ContextBudget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxMemoryChars` | 属性 | <code>maxMemoryChars: number</code> | max Memory Chars 字段。 |
| `maxMemoryItems` | 属性 | <code>maxMemoryItems: number</code> | max Memory Items 字段。 |
| `maxMessages` | 属性 | <code>maxMessages: number</code> | max Messages 字段。 |
| `maxTotalChars` | 属性 | <code>maxTotalChars: number</code> | max Total Chars 字段。 |

## `ContextBuilder` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 构建 build。 |

## `ContextBuildInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | agent 字段。 |
| `contextSpec` | 属性 | <code>contextSpec: ContextSpec</code> | context Spec 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `memoryScope` | 属性 | <code>memoryScope: MemoryScope</code> | memory Scope 字段。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope: ToolExecutionScope</code> | tool Execution Scope 字段。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal: ToolPrincipal</code> | tool Principal 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `ContextProvenance` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `includedAt` | 属性 | <code>includedAt: string</code> | included At 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `source` | 属性 | <code>source: "memory" &#124; "skill" &#124; "system" &#124; "input"</code> | source 字段。 |
| `type` | 属性 | <code>type: string</code> | type 字段。 |

## `EpisodicMemorySyncOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowLongTerm` | 属性 | <code>allowLongTerm: boolean</code> | allow Long Term 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `idPrefix` | 属性 | <code>idPrefix: string</code> | id Prefix 字段。 |
| `memory` | 属性 | <code>memory: Pick&lt;MemoryManager, "write"&gt;</code> | memory 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `visibility` | 属性 | <code>visibility: "workspace" &#124; "private" &#124; "public"</code> | visibility 字段。 |

## `InMemoryReActContinuationCheckpointStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCheckpointBytes` | 属性 | <code>maxCheckpointBytes: number</code> | max Checkpoint Bytes 字段。 |
| `maxCheckpoints` | 属性 | <code>maxCheckpoints: number</code> | max Checkpoints 字段。 |
| `maxIdempotencyRecords` | 属性 | <code>maxIdempotencyRecords: number</code> | max Idempotency Records 字段。 |

## `MemoryContextBuilderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseBuilder` | 属性 | <code>baseBuilder: ContextBuilder</code> | base Builder 字段。 |
| `budget` | 属性 | <code>budget: ContextBudget</code> | budget 字段。 |
| `embeddings` | 属性 | <code>embeddings: EmbeddingProvider</code> | embeddings 字段。 |
| `memory` | 属性 | <code>memory: Pick&lt;MemoryManager, "search"&gt;</code> | memory 字段。 |
| `memoryTypes` | 属性 | <code>memoryTypes: MemoryType[]</code> | memory Types 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `query` | 属性 | <code>query: MemorySearchQuery &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; MemorySearchQuery &#124; Promise&lt;MemorySearchQuery&gt;)</code> | query 字段。 |

## `MemoryContextItem` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `score` | 属性 | <code>score: number</code> | score 字段。 |
| `type` | 属性 | <code>type: MemoryType</code> | type 字段。 |

## `ReActAction` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `target` | 属性 | <code>target: string</code> | target 字段。 |
| `toolCallId` | 属性 | <code>toolCallId: string</code> | tool Call Id 字段。 |
| `type` | 属性 | <code>type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"</code> | type 字段。 |

## `ReActAgentRunnerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticReasoner` | 属性 | <code>agenticReasoner: AgenticReasoner</code> | agentic Reasoner 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | allowed Skills 字段。 |
| `checkpointStore` | 属性 | <code>checkpointStore: ReActContinuationCheckpointStore</code> | checkpoint Store 字段。 |
| `contextBuilder` | 属性 | <code>contextBuilder: ContextBuilder</code> | context Builder 字段。 |
| `continueAfterTool` | 属性 | <code>continueAfterTool: boolean</code> | continue After Tool 字段。 |
| `executionBudget` | 属性 | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | execution Budget 字段。 |
| `inference` | 属性 | <code>inference: InferenceProvider</code> | inference 字段。 |
| `maxIterations` | 属性 | <code>maxIterations: number</code> | max Iterations 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onCheckpoint` | 方法 | <code>onCheckpoint(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 处理 Checkpoint。 |
| `onResume` | 方法 | <code>onResume(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 处理 Resume。 |
| `onStep` | 方法 | <code>onStep(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | 处理 Step。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig: ReasoningConfig</code> | reasoning Config 字段。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | required Skills 字段。 |
| `resolveToolExecutionScope` | 方法 | <code>resolveToolExecutionScope(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | 解析 Tool Execution Scope。 |
| `retainCheckpointUntilOutcome` | 属性 | <code>retainCheckpointUntilOutcome: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `runtime` | 属性 | <code>runtime: ReActAgentRuntime</code> | runtime 字段。 |
| `skillContextLoader` | 属性 | <code>skillContextLoader: SkillContextLoader</code> | skill Context Loader 字段。 |
| `skillPolicy` | 属性 | <code>skillPolicy: SkillPolicy</code> | skill Policy 字段。 |
| `skillRegistry` | 属性 | <code>skillRegistry: SkillRegistry</code> | skill Registry 字段。 |
| `skillSelector` | 属性 | <code>skillSelector: SkillSelector</code> | skill Selector 字段。 |
| `syncMemory` | 方法 | <code>syncMemory(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | sync Memory 的公开运行时操作。 |
| `thinkingPlanner` | 属性 | <code>thinkingPlanner: ThinkingPlanner</code> | thinking Planner 字段。 |
| `toolRunner` | 属性 | <code>toolRunner: ToolRunner</code> | tool Runner 字段。 |
| `verifier` | 属性 | <code>verifier: Verifier</code> | verifier 字段。 |

## `ReActAgentRuntime` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 方法 | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | reason 的公开运行时操作。 |
| `selectAction` | 方法 | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | select Action 的公开运行时操作。 |
| `verify` | 方法 | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | verify 的公开运行时操作。 |

## `ReActAgentSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextSpecRef` | 属性 | <code>contextSpecRef: SpecRef</code> | context Spec Ref 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: string</code> | memory Profile Ref 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `promptRefs` | 属性 | <code>promptRefs: AgentPromptRef[]</code> | prompt Refs 字段。 |
| `reasoning` | 属性 | <code>reasoning: ReasoningConfig</code> | reasoning 字段。 |
| `skillRefs` | 属性 | <code>skillRefs: SkillRef[]</code> | skill Refs 字段。 |
| `systemInstructions` | 属性 | <code>systemInstructions: string</code> | system Instructions 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: string[]</code> | tool Refs 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `ReActContinuationCheckpoint` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `consecutiveNoProgress` | 属性 | <code>consecutiveNoProgress: number</code> | consecutive No Progress 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `iterations` | 属性 | <code>iterations: number</code> | iterations 字段。 |
| `lastProgressFingerprint` | 属性 | <code>lastProgressFingerprint: string</code> | last Progress Fingerprint 字段。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | messages 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: number</code> | model Calls 字段。 |
| `nextPhase` | 属性 | <code>nextPhase: "reason" &#124; "act"</code> | next Phase 字段。 |
| `pendingAction` | 属性 | <code>pendingAction: ReActAction</code> | pending Action 字段。 |
| `pendingToolInvocationId` | 属性 | <code>pendingToolInvocationId: string</code> | pending Tool Invocation Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `stepSequence` | 属性 | <code>stepSequence: number</code> | step Sequence 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: number</code> | tool Calls 字段。 |
| `toolInvocationSequence` | 属性 | <code>toolInvocationSequence: number</code> | tool Invocation Sequence 字段。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | total Tokens 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `ReActContinuationCheckpointPutResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoint` | 属性 | <code>checkpoint: ReActContinuationCheckpoint</code> | checkpoint 字段。 |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |

## `ReActContinuationCheckpointStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(checkpoint: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | put 的公开运行时操作。 |

## `ReActExecutionBudget` 契约字段

Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `maxConsecutiveNoProgress` | 属性 | <code>maxConsecutiveNoProgress: number</code> | max Consecutive No Progress 字段。 |
| `maxIterations` | 属性 | <code>maxIterations: number</code> | max Iterations 字段。 |
| `maxModelCalls` | 属性 | <code>maxModelCalls: number</code> | max Model Calls 字段。 |
| `maxToolCalls` | 属性 | <code>maxToolCalls: number</code> | max Tool Calls 字段。 |
| `maxTotalTokens` | 属性 | <code>maxTotalTokens: number</code> | max Total Tokens 字段。 |
| `quantumIterations` | 属性 | <code>quantumIterations: number</code> | quantum Iterations 字段。 |

## `ReActObservation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `source` | 属性 | <code>source: "memory" &#124; "system" &#124; "human" &#124; "tool" &#124; "model"</code> | source 字段。 |
| `value` | 属性 | <code>value: TValue</code> | value 字段。 |

## `ReActRunContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeSkills` | 属性 | <code>activeSkills: LoadedSkillContext[]</code> | active Skills 字段。 |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | agent 字段。 |
| `contextSpec` | 属性 | <code>contextSpec: ContextSpec</code> | context Spec 字段。 |
| `memoryScope` | 属性 | <code>memoryScope: MemoryScope</code> | memory Scope 字段。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig: ReasoningConfig</code> | reasoning Config 字段。 |
| `reasoningDecision` | 属性 | <code>reasoningDecision: AgenticReasoningDecision</code> | reasoning Decision 字段。 |
| `rejectedSkills` | 属性 | <code>rejectedSkills: { skillId: string; reason: string; }[]</code> | rejected Skills 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `thinkingPlan` | 属性 | <code>thinkingPlan: ThinkingPlan</code> | thinking Plan 字段。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope: ToolExecutionScope</code> | tool Execution Scope 字段。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal: ToolPrincipal</code> | tool Principal 字段。 |

## `ReActRunControl` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `checkpoint` | 属性 | <code>checkpoint: ReActContinuationCheckpoint</code> | checkpoint 字段。 |
| `executionBudget` | 属性 | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | execution Budget 字段。 |
| `resumeFromCheckpointStore` | 属性 | <code>resumeFromCheckpointStore: boolean</code> | resume From Checkpoint Store 字段。 |

## `ReActRunnerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointStore` | 属性 | <code>checkpointStore: ReActContinuationCheckpointStore</code> | checkpoint Store 字段。 |
| `continueAfterTool` | 属性 | <code>continueAfterTool: boolean</code> | continue After Tool 字段。 |
| `executionBudget` | 属性 | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | execution Budget 字段。 |
| `inference` | 属性 | <code>inference: InferenceProvider</code> | inference 字段。 |
| `maxIterations` | 属性 | <code>maxIterations: number</code> | max Iterations 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onCheckpoint` | 方法 | <code>onCheckpoint(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 处理 Checkpoint。 |
| `onResume` | 方法 | <code>onResume(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 处理 Resume。 |
| `onStep` | 方法 | <code>onStep(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | 处理 Step。 |
| `resolveToolExecutionScope` | 方法 | <code>resolveToolExecutionScope(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | 解析 Tool Execution Scope。 |
| `retainCheckpointUntilOutcome` | 属性 | <code>retainCheckpointUntilOutcome: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `syncMemory` | 方法 | <code>syncMemory(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | sync Memory 的公开运行时操作。 |
| `toolRunner` | 属性 | <code>toolRunner: ToolRunner</code> | tool Runner 字段。 |

## `ReActRunResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoint` | 属性 | <code>checkpoint: ReActContinuationCheckpoint</code> | checkpoint 字段。 |
| `error` | 属性 | <code>error: unknown</code> | error 字段。 |
| `finalAction` | 属性 | <code>finalAction: ReActAction</code> | final Action 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "human_review_required"</code> | status 字段。 |
| `steps` | 属性 | <code>steps: ReActStep[]</code> | steps 字段。 |
| `suspension` | 属性 | <code>suspension: ReActSuspension</code> | suspension 字段。 |

## `ReActStep` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `phase` | 属性 | <code>phase: ReActPhase</code> | phase 字段。 |
| `traceEventId` | 属性 | <code>traceEventId: string</code> | trace Event Id 字段。 |

## `ReActSuspension` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `reason` | 属性 | <code>reason: "quantum_exhausted" &#124; "iteration_budget_exhausted" &#124; "model_call_budget_exhausted" &#124; "tool_call_budget_exhausted" &#124; "token_budget_exhausted" &#124; "non_progress" &#124; "deadline_exceeded"</code> | reason 字段。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | requires Human Review 字段。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | retryable 字段。 |

## `ReasoningConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticMode` | 属性 | <code>agenticMode: AgenticReasoningMode</code> | agentic Mode 字段。 |
| `maxSteps` | 属性 | <code>maxSteps: number</code> | max Steps 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `persist` | 属性 | <code>persist: ReasoningPersistence</code> | persist 字段。 |
| `plannerRef` | 属性 | <code>plannerRef: string</code> | planner Ref 字段。 |
| `reasonerRef` | 属性 | <code>reasonerRef: string</code> | reasoner Ref 字段。 |
| `thinkingMode` | 属性 | <code>thinkingMode: ThinkingMode</code> | thinking Mode 字段。 |

## `ReasoningContextBuilderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseBuilder` | 属性 | <code>baseBuilder: ContextBuilder</code> | base Builder 字段。 |
| `config` | 属性 | <code>config: ReasoningConfig</code> | config 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `planner` | 属性 | <code>planner: ThinkingPlanner</code> | planner 字段。 |
| `reasoner` | 属性 | <code>reasoner: AgenticReasoner</code> | reasoner 字段。 |

## `RequiredReasoningConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticMode` | 属性 | <code>agenticMode: AgenticReasoningMode</code> | agentic Mode 字段。 |
| `maxSteps` | 属性 | <code>maxSteps: number</code> | max Steps 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `persist` | 属性 | <code>persist: ReasoningPersistence</code> | persist 字段。 |
| `plannerRef` | 属性 | <code>plannerRef: string</code> | planner Ref 字段。 |
| `reasonerRef` | 属性 | <code>reasonerRef: string</code> | reasoner Ref 字段。 |
| `thinkingMode` | 属性 | <code>thinkingMode: ThinkingMode</code> | thinking Mode 字段。 |

## `SkillContextBuilderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedSkills` | 属性 | <code>allowedSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | allowed Skills 字段。 |
| `availableToolRefs` | 属性 | <code>availableToolRefs: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; Promise&lt;string[]&gt;)</code> | available Tool Refs 字段。 |
| `baseBuilder` | 属性 | <code>baseBuilder: ContextBuilder</code> | base Builder 字段。 |
| `contextLoader` | 属性 | <code>contextLoader: SkillContextLoader</code> | context Loader 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `policy` | 属性 | <code>policy: SkillPolicy</code> | policy 字段。 |
| `registry` | 属性 | <code>registry: SkillRegistry</code> | registry 字段。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | required Skills 字段。 |
| `selector` | 属性 | <code>selector: SkillSelector</code> | selector 字段。 |

## `ThinkingPlan` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constraints` | 属性 | <code>constraints: string[]</code> | constraints 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `intent` | 属性 | <code>intent: string</code> | intent 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `mode` | 属性 | <code>mode: "structured" &#124; "summary"</code> | mode 字段。 |
| `plan` | 属性 | <code>plan: string[]</code> | plan 字段。 |
| `risks` | 属性 | <code>risks: string[]</code> | risks 字段。 |
| `successCriteria` | 属性 | <code>successCriteria: string[]</code> | success Criteria 字段。 |
| `summary` | 属性 | <code>summary: string</code> | summary 字段。 |

## `ThinkingPlanner` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `plan` | 方法 | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | 规划 plan。 |

## `ThinkingPlannerInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `config` | 属性 | <code>config: RequiredReasoningConfig</code> | config 字段。 |
| `context` | 属性 | <code>context: BuiltAgentContext</code> | context 字段。 |

## `ToolActivityPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | 取消 cancel。 |
| `execute` | 方法 | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | execute 的公开运行时操作。 |

## `ToolActivityRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef: string</code> | contract Snapshot Ref 字段。 |
| `deadlineAt` | 属性 | <code>deadlineAt: string</code> | deadline At 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `operationId` | 属性 | <code>operationId: string</code> | operation Id 字段。 |
| `principal` | 属性 | <code>principal: ToolPrincipal</code> | principal 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `stateAttemptId` | 属性 | <code>stateAttemptId: string</code> | state Attempt Id 字段。 |
| `toolRef` | 属性 | <code>toolRef: SpecRef</code> | tool Ref 字段。 |

## `ToolActivityResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequestRef` | 属性 | <code>approvalRequestRef: string</code> | approval Request Ref 字段。 |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `error` | 属性 | <code>error: NormalizedToolError</code> | error 字段。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | event Ids 字段。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | invocation Id 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "waiting_approval"</code> | status 字段。 |

## `Verifier` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | verify 的公开运行时操作。 |
