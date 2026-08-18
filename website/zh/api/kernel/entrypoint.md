# `@codesoul-co/hypha-kernel` / `index`

- 包索引: [`@codesoul-co/hypha-kernel`](/zh/api/kernel)
- 源码: [`packages/kernel/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)
- 导出数: **85**

## 模块用法

聚合 `@codesoul-co/hypha-kernel` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 44 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 12 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 8 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 21 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { agenticReasoningModeSchema } from '@codesoul-co/hypha-kernel';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = agenticReasoningModeSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `BasicReActAgentRuntime` | 类 | <code>new BasicReActAgentRuntime(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | Basic ReAct Agent Runtime 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultAgenticReasoner` | 类 | <code>new DefaultAgenticReasoner(now?: () =&gt; string): DefaultAgenticReasoner</code> | Default Agentic Reasoner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultContextBuilder` | 类 | <code>new DefaultContextBuilder(): DefaultContextBuilder</code> | Default Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultThinkingPlanner` | 类 | <code>new DefaultThinkingPlanner(now?: () =&gt; string): DefaultThinkingPlanner</code> | Default Thinking Planner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DefaultVerifier` | 类 | <code>new DefaultVerifier(): DefaultVerifier</code> | Default Verifier 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `InMemoryReActContinuationCheckpointStore` | 类 | <code>new InMemoryReActContinuationCheckpointStore(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | In Memory ReAct Continuation Checkpoint Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `MemoryContextBuilder` | 类 | <code>new MemoryContextBuilder(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | Memory Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReActAgentRunner` | 类 | <code>new ReActAgentRunner(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | ReAct Agent Runner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReActRunner` | 类 | <code>new ReActRunner(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | ReAct Runner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ReasoningContextBuilder` | 类 | <code>new ReasoningContextBuilder(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | Reasoning Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SkillContextBuilder` | 类 | <code>new SkillContextBuilder(options: SkillContextBuilderOptions): SkillContextBuilder</code> | Skill Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `ToolRunnerActivityAdapter` | 类 | <code>new ToolRunnerActivityAdapter(runner: ToolRunner): ToolRunnerActivityAdapter</code> | Tool Runner Activity Adapter 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `agenticReasoningModeSchema` | 常量 | <code>const agenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | Agentic Reasoning Mode 的运行时 Schema。 |
| `kernelSpecDefinitions` | 常量 | <code>const kernelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ReActAgentSpec&gt;, SpecSchemaDefinition&lt;ReasoningConfig&gt;]</code> | 由 `index` 模块导出的 Kernel Spec Definitions 常量。 |
| `kernelSpecJsonSchemas` | 常量 | <code>const kernelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Kernel Spec JSON Schemas 常量。 |
| `REACT_PHASE_ORDER` | 常量 | <code>const REACT_PHASE_ORDER: ReActPhase[]</code> | 由 `index` 模块导出的 REACT PHASE ORDER 常量。 |
| `REACT_SUSPENSION_REASONS` | 常量 | <code>const REACT_SUSPENSION_REASONS: readonly ["quantum_exhausted", "iteration_budget_exhausted", "model_call_budget_exhausted", "tool_call_budget_exhausted", "token_budget_exhausted", "non_progress", "deadline_exceeded"]</code> | 由 `index` 模块导出的 REACT SUSPENSION REASONS 常量。 |
| `reActActionSchema` | 常量 | <code>const reActActionSchema: z.ZodEffects&lt;z.ZodObject&lt;{ type: z.ZodEnum&lt;["tool", "model", "finish", "human_review"]&gt;; toolCallId: z.ZodOptional&lt;z.ZodString&gt;; target: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodUnknown, unknown, unknown&gt;&gt;; reason: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"; reason?: string &#124; undefined; toolCallId?: ...</code> | Re Act Action 的运行时 Schema。 |
| `reactAgentSpecDefinition` | 常量 | <code>const reactAgentSpecDefinition: SpecSchemaDefinition&lt;ReActAgentSpec&gt;</code> | React Agent Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `reactAgentSpecExample` | 常量 | <code>const reactAgentSpecExample: ReActAgentSpec</code> | React Agent Spec 的有效示例值。 |
| `reactAgentSpecJsonSchema` | 常量 | <code>const reactAgentSpecJsonSchema: JsonSchema</code> | React Agent Spec 的 JSON Schema。 |
| `reactAgentSpecSchema` | 常量 | <code>const reactAgentSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; modelAlias: z.ZodString; systemInstructions: z.ZodOptional&lt;z.ZodString&gt;; promptRefs: z.ZodOptional&lt;z.Zo...</code> | React Agent Spec 的运行时 Schema。 |
| `reActContinuationCheckpointJsonSchema` | 常量 | <code>const reActContinuationCheckpointJsonSchema: JsonSchema</code> | Re Act Continuation Checkpoint 的 JSON Schema。 |
| `reActContinuationCheckpointSchema` | 常量 | <code>const reActContinuationCheckpointSchema: z.ZodEffects&lt;z.ZodObject&lt;{ version: z.ZodLiteral&lt;"1.0.0"&gt;; runId: z.ZodString; stepId: z.ZodString; scopeHash: z.ZodString; agentRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; }, "strict", z.ZodTypeAny, { version: string; id: string; }, { version: string; id: string; }&gt;; nextPhase: z.ZodEnum&lt;["reason", "act"]&gt;; messages: z.ZodArray&lt;z.ZodObject&lt;{ role: z.ZodEnum&lt;[...</code> | Re Act Continuation Checkpoint 的运行时 Schema。 |
| `reActExecutionBudgetJsonSchema` | 常量 | <code>const reActExecutionBudgetJsonSchema: JsonSchema</code> | Re Act Execution Budget 的 JSON Schema。 |
| `reActExecutionBudgetSchema` | 常量 | <code>const reActExecutionBudgetSchema: z.ZodObject&lt;{ maxIterations: z.ZodNumber; maxModelCalls: z.ZodNumber; maxToolCalls: z.ZodNumber; maxTotalTokens: z.ZodOptional&lt;z.ZodNumber&gt;; maxConsecutiveNoProgress: z.ZodNumber; quantumIterations: z.ZodNumber; deadlineAt: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; ...</code> | Re Act Execution Budget 的运行时 Schema。 |
| `reactPhaseSchema` | 常量 | <code>const reactPhaseSchema: z.ZodEnum&lt;["observe", "reason", "select_action", "policy_check", "act", "observe_result", "verify", "memory_sync", "complete", "fail", "human_review", "suspend", "cancel"]&gt;</code> | React Phase 的运行时 Schema。 |
| `reasoningConfigExample` | 常量 | <code>const reasoningConfigExample: ReasoningConfig</code> | Reasoning Config 的有效示例值。 |
| `reasoningConfigJsonSchema` | 常量 | <code>const reasoningConfigJsonSchema: JsonSchema</code> | Reasoning Config 的 JSON Schema。 |
| `reasoningConfigSchema` | 常量 | <code>const reasoningConfigSchema: z.ZodObject&lt;{ thinkingMode: z.ZodOptional&lt;z.ZodEnum&lt;["none", "summary", "structured"]&gt;&gt;; agenticMode: z.ZodOptional&lt;z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;&gt;; maxSteps: z.ZodOptional&lt;z.ZodNumber&gt;; persist: z.ZodOptional&lt;z.ZodEnum&lt;["summary_only", "events_only"]&gt;&gt;; plannerRef: z.ZodOptional&lt;z.ZodString&gt;; reasonerRef: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodR...</code> | Reasoning Config 的运行时 Schema。 |
| `reasoningConfigSpecDefinition` | 常量 | <code>const reasoningConfigSpecDefinition: SpecSchemaDefinition&lt;ReasoningConfig&gt;</code> | Reasoning Config Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `reasoningPersistenceSchema` | 常量 | <code>const reasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | Reasoning Persistence 的运行时 Schema。 |
| `thinkingModeSchema` | 常量 | <code>const thinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | Thinking Mode 的运行时 Schema。 |
| `createEpisodicMemorySync` | 函数 | <code>createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable&lt;ReActRunnerOptions["syncMemory"]&gt;</code> | Create Episodic Memory Sync 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createReActStep` | 函数 | <code>createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep</code> | Create ReAct Step 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `reActContinuationScopeHash` | 函数 | <code>reActContinuationScopeHash(context: ReActRunContext): string</code> | Re Act Continuation Scope Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReActAction` | 函数 | <code>validateReActAction(input: unknown): ReActAction</code> | Validate ReAct Action 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReActAgentSpec` | 函数 | <code>validateReActAgentSpec(input: unknown): ReActAgentSpec</code> | Validate ReAct Agent Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReActContinuationCheckpoint` | 函数 | <code>validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint</code> | Validate ReAct Continuation Checkpoint 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReActExecutionBudget` | 函数 | <code>validateReActExecutionBudget(input: unknown): ReActExecutionBudget</code> | Validate ReAct Execution Budget 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateReasoningConfig` | 函数 | <code>validateReasoningConfig(input: unknown): ReasoningConfig</code> | Validate Reasoning Config 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `AgenticReasoner` | 接口 | <code>interface AgenticReasoner</code> | Agentic Reasoner 接口，共包含 1 个公开字段或方法。 |
| `AgenticReasonerInput` | 接口 | <code>interface AgenticReasonerInput</code> | Agentic Reasoner Input 接口，共包含 3 个公开字段或方法。 |
| `AgenticReasoningDecision` | 接口 | <code>interface AgenticReasoningDecision</code> | Agentic Reasoning Decision 接口，共包含 11 个公开字段或方法。 |
| `BasicReActAgentRuntimeOptions` | 接口 | <code>interface BasicReActAgentRuntimeOptions</code> | Basic ReAct Agent Runtime Options 接口，共包含 1 个公开字段或方法。 |
| `BuiltAgentContext` | 接口 | <code>interface BuiltAgentContext extends ReActRunContext</code> | Built Agent Context 接口，共包含 18 个公开字段或方法。 |
| `ContextBudget` | 接口 | <code>interface ContextBudget</code> | Context Budget 接口，共包含 4 个公开字段或方法。 |
| `ContextBuilder` | 接口 | <code>interface ContextBuilder</code> | Context Builder 接口，共包含 1 个公开字段或方法。 |
| `ContextBuildInput` | 接口 | <code>interface ContextBuildInput</code> | Context Build Input 接口，共包含 12 个公开字段或方法。 |
| `ContextProvenance` | 接口 | <code>interface ContextProvenance</code> | Context Provenance 接口，共包含 6 个公开字段或方法。 |
| `EpisodicMemorySyncOptions` | 接口 | <code>interface EpisodicMemorySyncOptions</code> | Episodic Memory Sync Options 接口，共包含 7 个公开字段或方法。 |
| `InMemoryReActContinuationCheckpointStoreOptions` | 接口 | <code>interface InMemoryReActContinuationCheckpointStoreOptions</code> | In Memory ReAct Continuation Checkpoint Store Options 接口，共包含 3 个公开字段或方法。 |
| `MemoryContextBuilderOptions` | 接口 | <code>interface MemoryContextBuilderOptions</code> | Memory Context Builder Options 接口，共包含 7 个公开字段或方法。 |
| `MemoryContextItem` | 接口 | <code>interface MemoryContextItem</code> | Memory Context Item 接口，共包含 5 个公开字段或方法。 |
| `ReActAction` | 接口 | <code>interface ReActAction</code> | ReAct Action 接口，共包含 5 个公开字段或方法。 |
| `ReActAgentRunnerOptions` | 接口 | <code>interface ReActAgentRunnerOptions extends Omit&lt;ReActRunnerOptions, 'toolRunner'&gt;</code> | ReAct Agent Runner Options 接口，共包含 25 个公开字段或方法。 |
| `ReActAgentRuntime` | 接口 | <code>interface ReActAgentRuntime</code> | ReAct Agent Runtime 接口，共包含 3 个公开字段或方法。 |
| `ReActAgentSpec` | 接口 | <code>interface ReActAgentSpec extends VersionedSpec, SpecMetadata</code> | ReAct Agent Spec 接口，共包含 17 个公开字段或方法。 |
| `ReActContinuationCheckpoint` | 接口 | <code>interface ReActContinuationCheckpoint</code> | ReAct Continuation Checkpoint 接口，共包含 19 个公开字段或方法。 |
| `ReActContinuationCheckpointPutResult` | 接口 | <code>interface ReActContinuationCheckpointPutResult</code> | ReAct Continuation Checkpoint Put Result 接口，共包含 2 个公开字段或方法。 |
| `ReActContinuationCheckpointStore` | 接口 | <code>interface ReActContinuationCheckpointStore</code> | ReAct Continuation Checkpoint Store 接口，共包含 3 个公开字段或方法。 |
| `ReActExecutionBudget` | 接口 | <code>interface ReActExecutionBudget</code> | Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget. |
| `ReActObservation` | 接口 | <code>interface ReActObservation</code> | ReAct Observation 接口，共包含 3 个公开字段或方法。 |
| `ReActRunContext` | 接口 | <code>interface ReActRunContext</code> | ReAct Run Context 接口，共包含 14 个公开字段或方法。 |
| `ReActRunControl` | 接口 | <code>interface ReActRunControl</code> | ReAct Run Control 接口，共包含 4 个公开字段或方法。 |
| `ReActRunnerOptions` | 接口 | <code>interface ReActRunnerOptions</code> | ReAct Runner Options 接口，共包含 13 个公开字段或方法。 |
| `ReActRunResult` | 接口 | <code>interface ReActRunResult</code> | ReAct Run Result 接口，共包含 8 个公开字段或方法。 |
| `ReActStep` | 接口 | <code>interface ReActStep</code> | ReAct Step 接口，共包含 5 个公开字段或方法。 |
| `ReActSuspension` | 接口 | <code>interface ReActSuspension</code> | ReAct Suspension 接口，共包含 4 个公开字段或方法。 |
| `ReasoningConfig` | 接口 | <code>interface ReasoningConfig</code> | Reasoning Config 接口，共包含 7 个公开字段或方法。 |
| `ReasoningContextBuilderOptions` | 接口 | <code>interface ReasoningContextBuilderOptions</code> | Reasoning Context Builder Options 接口，共包含 5 个公开字段或方法。 |
| `RequiredReasoningConfig` | 接口 | <code>interface RequiredReasoningConfig extends Required&lt;Omit&lt;ReasoningConfig, 'plannerRef' &#124; 'reasonerRef' &#124; 'metadata'&gt;&gt;</code> | Required Reasoning Config 接口，共包含 7 个公开字段或方法。 |
| `SkillContextBuilderOptions` | 接口 | <code>interface SkillContextBuilderOptions</code> | Skill Context Builder Options 接口，共包含 9 个公开字段或方法。 |
| `ThinkingPlan` | 接口 | <code>interface ThinkingPlan</code> | Thinking Plan 接口，共包含 10 个公开字段或方法。 |
| `ThinkingPlanner` | 接口 | <code>interface ThinkingPlanner</code> | Thinking Planner 接口，共包含 1 个公开字段或方法。 |
| `ThinkingPlannerInput` | 接口 | <code>interface ThinkingPlannerInput</code> | Thinking Planner Input 接口，共包含 2 个公开字段或方法。 |
| `ToolActivityPort` | 接口 | <code>interface ToolActivityPort</code> | Tool Activity Port 接口，共包含 2 个公开字段或方法。 |
| `ToolActivityRequest` | 接口 | <code>interface ToolActivityRequest</code> | Tool Activity Request 接口，共包含 10 个公开字段或方法。 |
| `ToolActivityResult` | 接口 | <code>interface ToolActivityResult</code> | Tool Activity Result 接口，共包含 7 个公开字段或方法。 |
| `Verifier` | 接口 | <code>interface Verifier</code> | Verifier 接口，共包含 1 个公开字段或方法。 |
| `AgenticReasoningMode` | 类型 | <code>type AgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Agentic Reasoning Mode 公共类型别名；完整类型表达式见声明。 |
| `ReActPhase` | 类型 | <code>type ReActPhase = 'observe' &#124; 'reason' &#124; 'select_action' &#124; 'policy_check' &#124; 'act' &#124; 'observe_result' &#124; 'verify' &#124; 'memory_sync' &#124; 'complete' &#124; 'fail' &#124; 'human_review' &#124; 'suspend' &#124; 'cancel'</code> | ReAct Phase 公共类型别名；完整类型表达式见声明。 |
| `ReActSuspensionReason` | 类型 | <code>type ReActSuspensionReason = (typeof REACT_SUSPENSION_REASONS)[number]</code> | ReAct Suspension Reason 公共类型别名；完整类型表达式见声明。 |
| `ReasoningPersistence` | 类型 | <code>type ReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Reasoning Persistence 公共类型别名；完整类型表达式见声明。 |
| `ThinkingMode` | 类型 | <code>type ThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Thinking Mode 公共类型别名；完整类型表达式见声明。 |

## `BasicReActAgentRuntime`

Basic ReAct Agent Runtime 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { BasicReActAgentRuntime } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class BasicReActAgentRuntime implements ReActAgentRuntime {
    constructor(options?: BasicReActAgentRuntimeOptions);
    reason(context: ReActRunContext): Promise<InferenceRequest>;
    selectAction(response: InferenceResponse): Promise<ReActAction>;
    verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: BasicReActAgentRuntimeOptions): BasicReActAgentRuntime</code> | 创建该类的实例。 |
| `reason` | 方法 | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `selectAction` | 方法 | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verify` | 方法 | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultAgenticReasoner`

Default Agentic Reasoner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultAgenticReasoner } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class DefaultAgenticReasoner implements AgenticReasoner {
    constructor(now?: () => string);
    decide(input: AgenticReasonerInput): Promise<AgenticReasoningDecision>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(now?: () =&gt; string): DefaultAgenticReasoner</code> | 创建该类的实例。 |
| `decide` | 方法 | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultContextBuilder`

Default Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultContextBuilder } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class DefaultContextBuilder implements ContextBuilder {
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): DefaultContextBuilder</code> | 创建该类的实例。 |

## `DefaultThinkingPlanner`

Default Thinking Planner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultThinkingPlanner } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class DefaultThinkingPlanner implements ThinkingPlanner {
    constructor(now?: () => string);
    plan(input: ThinkingPlannerInput): Promise<ThinkingPlan>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(now?: () =&gt; string): DefaultThinkingPlanner</code> | 创建该类的实例。 |
| `plan` | 方法 | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `DefaultVerifier`

Default Verifier 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultVerifier } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class DefaultVerifier implements Verifier {
    verify(_context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultVerifier</code> | 创建该类的实例。 |
| `verify` | 方法 | <code>verify(_context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `InMemoryReActContinuationCheckpointStore`

In Memory ReAct Continuation Checkpoint Store 类，共公开 4 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { InMemoryReActContinuationCheckpointStore } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class InMemoryReActContinuationCheckpointStore implements ReActContinuationCheckpointStore {
    constructor(options?: InMemoryReActContinuationCheckpointStoreOptions);
    put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise<ReActContinuationCheckpointPutResult>;
    get(runId: string, stepId: string, expectedScopeHash: string): Promise<ReActContinuationCheckpoint | null>;
    delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise<boolean>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: InMemoryReActContinuationCheckpointStoreOptions): InMemoryReActContinuationCheckpointStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(input: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `MemoryContextBuilder`

Memory Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { MemoryContextBuilder } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class MemoryContextBuilder implements ContextBuilder {
    constructor(options: MemoryContextBuilderOptions);
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: MemoryContextBuilderOptions): MemoryContextBuilder</code> | 创建该类的实例。 |

## `ReActAgentRunner`

ReAct Agent Runner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ReActAgentRunner } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class ReActAgentRunner {
    constructor(options: ReActAgentRunnerOptions);
    run(input: ContextBuildInput, control?: ReActRunControl): Promise<ReActRunResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ReActAgentRunnerOptions): ReActAgentRunner</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(input: ContextBuildInput, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActRunner`

ReAct Runner 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ReActRunner } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class ReActRunner {
    constructor(runtime: ReActAgentRuntime, options: ReActRunnerOptions);
    run(context: ReActRunContext, control?: ReActRunControl): Promise<ReActRunResult>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(runtime: ReActAgentRuntime, options: ReActRunnerOptions): ReActRunner</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(context: ReActRunContext, control?: ReActRunControl): Promise&lt;ReActRunResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReasoningContextBuilder`

Reasoning Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ReasoningContextBuilder } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class ReasoningContextBuilder implements ContextBuilder {
    constructor(options?: ReasoningContextBuilderOptions);
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options?: ReasoningContextBuilderOptions): ReasoningContextBuilder</code> | 创建该类的实例。 |

## `SkillContextBuilder`

Skill Context Builder 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SkillContextBuilder } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class SkillContextBuilder implements ContextBuilder {
    constructor(options: SkillContextBuilderOptions);
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(options: SkillContextBuilderOptions): SkillContextBuilder</code> | 创建该类的实例。 |

## `ToolRunnerActivityAdapter`

Tool Runner Activity Adapter 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { ToolRunnerActivityAdapter } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare class ToolRunnerActivityAdapter implements ToolActivityPort {
    constructor(runner: ToolRunner);
    execute(request: ToolActivityRequest): Promise<ToolActivityResult>;
    cancel(invocationId: string, reason?: string): Promise<ToolActivityResult | null>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(runner: ToolRunner): ToolRunnerActivityAdapter</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `agenticReasoningModeSchema`

Agentic Reasoning Mode 的运行时 Schema。

- 种类: 常量
- 导入: `import { agenticReasoningModeSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const agenticReasoningModeSchema: z.ZodEnum<["react", "fsm_react", "tot", "critique"]>;
```

## `kernelSpecDefinitions`

由 `index` 模块导出的 Kernel Spec Definitions 常量。

- 种类: 常量
- 导入: `import { kernelSpecDefinitions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const kernelSpecDefinitions: readonly [SpecSchemaDefinition<ReActAgentSpec>, SpecSchemaDefinition<ReasoningConfig>];
```

## `kernelSpecJsonSchemas`

由 `index` 模块导出的 Kernel Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { kernelSpecJsonSchemas } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const kernelSpecJsonSchemas: Record<string, JsonSchema>;
```

## `REACT_PHASE_ORDER`

由 `index` 模块导出的 REACT PHASE ORDER 常量。

- 种类: 常量
- 导入: `import { REACT_PHASE_ORDER } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const REACT_PHASE_ORDER: ReActPhase[];
```

## `REACT_SUSPENSION_REASONS`

由 `index` 模块导出的 REACT SUSPENSION REASONS 常量。

- 种类: 常量
- 导入: `import { REACT_SUSPENSION_REASONS } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const REACT_SUSPENSION_REASONS: readonly ["quantum_exhausted", "iteration_budget_exhausted", "model_call_budget_exhausted", "tool_call_budget_exhausted", "token_budget_exhausted", "non_progress", "deadline_exceeded"];
```

## `reActActionSchema`

Re Act Action 的运行时 Schema。

- 种类: 常量
- 导入: `import { reActActionSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reActActionSchema: z.ZodEffects<z.ZodObject<{ type: z.ZodEnum<["tool", "model", "finish", "human_review"]>; toolCallId: z.ZodOptional<z.ZodString>; target: z.ZodOptional<z.ZodString>; input: z.ZodOptional<z.ZodEffects<z.ZodUnknown, unknown, unknown>>; reason: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }>, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }, { type: "human_review" | "tool" | "model" | "finish"; reason?: string | undefined; toolCallId?: string | undefined; target?: string | undefined; input?: unknown; }>;
```

## `reactAgentSpecDefinition`

React Agent Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reactAgentSpecDefinition: SpecSchemaDefinition<ReActAgentSpec>;
```

## `reactAgentSpecExample`

React Agent Spec 的有效示例值。

- 种类: 常量
- 导入: `import { reactAgentSpecExample } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reactAgentSpecExample: ReActAgentSpec;
```

## `reactAgentSpecJsonSchema`

React Agent Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { reactAgentSpecJsonSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reactAgentSpecJsonSchema: JsonSchema;
```

## `reactAgentSpecSchema`

React Agent Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { reactAgentSpecSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const reactAgentSpecSchema: (typeof import('@codesoul-co/hypha-kernel'))['reactAgentSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `reActContinuationCheckpointJsonSchema`

Re Act Continuation Checkpoint 的 JSON Schema。

- 种类: 常量
- 导入: `import { reActContinuationCheckpointJsonSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reActContinuationCheckpointJsonSchema: JsonSchema;
```

## `reActContinuationCheckpointSchema`

Re Act Continuation Checkpoint 的运行时 Schema。

- 种类: 常量
- 导入: `import { reActContinuationCheckpointSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const reActContinuationCheckpointSchema: (typeof import('@codesoul-co/hypha-kernel'))['reActContinuationCheckpointSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `reActExecutionBudgetJsonSchema`

Re Act Execution Budget 的 JSON Schema。

- 种类: 常量
- 导入: `import { reActExecutionBudgetJsonSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reActExecutionBudgetJsonSchema: JsonSchema;
```

## `reActExecutionBudgetSchema`

Re Act Execution Budget 的运行时 Schema。

- 种类: 常量
- 导入: `import { reActExecutionBudgetSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reActExecutionBudgetSchema: z.ZodObject<{ maxIterations: z.ZodNumber; maxModelCalls: z.ZodNumber; maxToolCalls: z.ZodNumber; maxTotalTokens: z.ZodOptional<z.ZodNumber>; maxConsecutiveNoProgress: z.ZodNumber; quantumIterations: z.ZodNumber; deadlineAt: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; quantumIterations: number; maxTotalTokens?: number | undefined; deadlineAt?: string | undefined; }, { maxIterations: number; maxModelCalls: number; maxToolCalls: number; maxConsecutiveNoProgress: number; quantumIterations: number; maxTotalTokens?: number | undefined; deadlineAt?: string | undefined; }>;
```

## `reactPhaseSchema`

React Phase 的运行时 Schema。

- 种类: 常量
- 导入: `import { reactPhaseSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reactPhaseSchema: z.ZodEnum<["observe", "reason", "select_action", "policy_check", "act", "observe_result", "verify", "memory_sync", "complete", "fail", "human_review", "suspend", "cancel"]>;
```

## `reasoningConfigExample`

Reasoning Config 的有效示例值。

- 种类: 常量
- 导入: `import { reasoningConfigExample } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reasoningConfigExample: ReasoningConfig;
```

## `reasoningConfigJsonSchema`

Reasoning Config 的 JSON Schema。

- 种类: 常量
- 导入: `import { reasoningConfigJsonSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reasoningConfigJsonSchema: JsonSchema;
```

## `reasoningConfigSchema`

Reasoning Config 的运行时 Schema。

- 种类: 常量
- 导入: `import { reasoningConfigSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reasoningConfigSchema: z.ZodObject<{ thinkingMode: z.ZodOptional<z.ZodEnum<["none", "summary", "structured"]>>; agenticMode: z.ZodOptional<z.ZodEnum<["react", "fsm_react", "tot", "critique"]>>; maxSteps: z.ZodOptional<z.ZodNumber>; persist: z.ZodOptional<z.ZodEnum<["summary_only", "events_only"]>>; plannerRef: z.ZodOptional<z.ZodString>; reasonerRef: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { thinkingMode?: "none" | "summary" | "structured" | undefined; agenticMode?: "react" | "fsm_react" | "tot" | "critique" | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadata?: Record<string, unknown> | undefined; }, { thinkingMode?: "none" | "summary" | "structured" | undefined; agenticMode?: "react" | "fsm_react" | "tot" | "critique" | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `reasoningConfigSpecDefinition`

Reasoning Config Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { reasoningConfigSpecDefinition } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reasoningConfigSpecDefinition: SpecSchemaDefinition<ReasoningConfig>;
```

## `reasoningPersistenceSchema`

Reasoning Persistence 的运行时 Schema。

- 种类: 常量
- 导入: `import { reasoningPersistenceSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const reasoningPersistenceSchema: z.ZodEnum<["summary_only", "events_only"]>;
```

## `thinkingModeSchema`

Thinking Mode 的运行时 Schema。

- 种类: 常量
- 导入: `import { thinkingModeSchema } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare const thinkingModeSchema: z.ZodEnum<["none", "summary", "structured"]>;
```

## `createEpisodicMemorySync`

Create Episodic Memory Sync 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createEpisodicMemorySync } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable<ReActRunnerOptions['syncMemory']>;
```

### 调用签名

```text
createEpisodicMemorySync(options: EpisodicMemorySyncOptions): NonNullable<ReActRunnerOptions["syncMemory"]>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `options` | <code>EpisodicMemorySyncOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `(context: ReActRunContext, observation: ReActObservation) => Promise<void>`
- 说明: 返回值契约由上述类型定义。

## `createReActStep`

Create ReAct Step 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createReActStep } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep;
```

### 调用签名

```text
createReActStep(id: string, phase: ReActPhase, input?: unknown): ReActStep
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `id` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `phase` | <code>ReActPhase</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `input` | <code>unknown</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReActStep`
- 说明: 返回值契约由上述类型定义。

## `reActContinuationScopeHash`

Re Act Continuation Scope Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { reActContinuationScopeHash } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function reActContinuationScopeHash(context: ReActRunContext): string;
```

### 调用签名

```text
reActContinuationScopeHash(context: ReActRunContext): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `context` | <code>ReActRunContext</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `validateReActAction`

Validate ReAct Action 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReActAction } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function validateReActAction(input: unknown): ReActAction;
```

### 调用签名

```text
validateReActAction(input: unknown): ReActAction
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReActAction`
- 说明: 返回值契约由上述类型定义。

## `validateReActAgentSpec`

Validate ReAct Agent Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReActAgentSpec } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function validateReActAgentSpec(input: unknown): ReActAgentSpec;
```

### 调用签名

```text
validateReActAgentSpec(input: unknown): ReActAgentSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReActAgentSpec`
- 说明: 返回值契约由上述类型定义。

## `validateReActContinuationCheckpoint`

Validate ReAct Continuation Checkpoint 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReActContinuationCheckpoint } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint;
```

### 调用签名

```text
validateReActContinuationCheckpoint(input: unknown): ReActContinuationCheckpoint
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReActContinuationCheckpoint`
- 说明: 返回值契约由上述类型定义。

## `validateReActExecutionBudget`

Validate ReAct Execution Budget 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReActExecutionBudget } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function validateReActExecutionBudget(input: unknown): ReActExecutionBudget;
```

### 调用签名

```text
validateReActExecutionBudget(input: unknown): ReActExecutionBudget
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReActExecutionBudget`
- 说明: 返回值契约由上述类型定义。

## `validateReasoningConfig`

Validate Reasoning Config 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateReasoningConfig } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export declare function validateReasoningConfig(input: unknown): ReasoningConfig;
```

### 调用签名

```text
validateReasoningConfig(input: unknown): ReasoningConfig
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ReasoningConfig`
- 说明: 返回值契约由上述类型定义。

## `AgenticReasoner`

Agentic Reasoner 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgenticReasoner } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface AgenticReasoner {
    decide(input: AgenticReasonerInput): Promise<AgenticReasoningDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decide` | 方法 | <code>decide(input: AgenticReasonerInput): Promise&lt;AgenticReasoningDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `AgenticReasonerInput`

Agentic Reasoner Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgenticReasonerInput } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface AgenticReasonerInput {
    context: BuiltAgentContext;
    config: RequiredReasoningConfig;
    thinkingPlan?: ThinkingPlan;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `config` | 属性 | <code>config: RequiredReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context: BuiltAgentContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingPlan` | 属性 | <code>thinkingPlan?: ThinkingPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgenticReasoningDecision`

Agentic Reasoning Decision 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgenticReasoningDecision } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `actionType` | 属性 | <code>actionType: "human_review" &#124; "tool" &#124; "model" &#124; "reason" &#124; "finish"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: AgenticReasoningMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rationale` | 属性 | <code>rationale: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recommendedPhase` | 属性 | <code>recommendedPhase: ReActPhase</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCandidates` | 属性 | <code>toolCandidates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verificationStrategy` | 属性 | <code>verificationStrategy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BasicReActAgentRuntimeOptions`

Basic ReAct Agent Runtime Options 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BasicReActAgentRuntimeOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface BasicReActAgentRuntimeOptions {
    verifier?: Verifier;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verifier` | 属性 | <code>verifier?: Verifier</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BuiltAgentContext`

Built Agent Context 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BuiltAgentContext } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface BuiltAgentContext extends ReActRunContext {
    sourceInput?: unknown;
    contextBudget?: ContextBudget;
    contextProvenance?: ContextProvenance[];
    memoryContext?: MemoryContextItem[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeSkills` | 属性 | <code>activeSkills?: LoadedSkillContext[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextBudget` | 属性 | <code>contextBudget?: ContextBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProvenance` | 属性 | <code>contextProvenance?: ContextProvenance[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSpec` | 属性 | <code>contextSpec?: ContextSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryContext` | 属性 | <code>memoryContext?: MemoryContextItem[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryScope` | 属性 | <code>memoryScope?: MemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig?: ReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningDecision` | 属性 | <code>reasoningDecision?: AgenticReasoningDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectedSkills` | 属性 | <code>rejectedSkills?: { skillId: string; reason: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceInput` | 属性 | <code>sourceInput?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingPlan` | 属性 | <code>thinkingPlan?: ThinkingPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope?: ToolExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextBudget`

Context Budget 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBudget } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ContextBudget {
    maxMessages?: number;
    maxMemoryItems?: number;
    maxMemoryChars?: number;
    maxTotalChars?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxMemoryChars` | 属性 | <code>maxMemoryChars?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMemoryItems` | 属性 | <code>maxMemoryItems?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxMessages` | 属性 | <code>maxMessages?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalChars` | 属性 | <code>maxTotalChars?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextBuilder`

Context Builder 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBuilder } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ContextBuilder {
    build(input: ContextBuildInput): Promise<BuiltAgentContext>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(input: ContextBuildInput): Promise&lt;BuiltAgentContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ContextBuildInput`

Context Build Input 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextBuildInput } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSpec` | 属性 | <code>contextSpec?: ContextSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryScope` | 属性 | <code>memoryScope?: MemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages?: ModelMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionId` | 属性 | <code>sessionId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope?: ToolExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `userId` | 属性 | <code>userId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ContextProvenance`

Context Provenance 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ContextProvenance } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includedAt` | 属性 | <code>includedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "memory" &#124; "skill" &#124; "system" &#124; "input"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EpisodicMemorySyncOptions`

Episodic Memory Sync Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EpisodicMemorySyncOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowLongTerm` | 属性 | <code>allowLongTerm?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idPrefix` | 属性 | <code>idPrefix?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memory` | 属性 | <code>memory: Pick&lt;MemoryManager, "write"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `source` | 属性 | <code>source?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `visibility` | 属性 | <code>visibility?: "workspace" &#124; "private" &#124; "public"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `InMemoryReActContinuationCheckpointStoreOptions`

In Memory ReAct Continuation Checkpoint Store Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { InMemoryReActContinuationCheckpointStoreOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface InMemoryReActContinuationCheckpointStoreOptions {
    maxCheckpoints?: number;
    maxIdempotencyRecords?: number;
    maxCheckpointBytes?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxCheckpointBytes` | 属性 | <code>maxCheckpointBytes?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxCheckpoints` | 属性 | <code>maxCheckpoints?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIdempotencyRecords` | 属性 | <code>maxIdempotencyRecords?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryContextBuilderOptions`

Memory Context Builder Options 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryContextBuilderOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseBuilder` | 属性 | <code>baseBuilder?: ContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `budget` | 属性 | <code>budget?: ContextBudget</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `embeddings` | 属性 | <code>embeddings?: EmbeddingProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memory` | 属性 | <code>memory: Pick&lt;MemoryManager, "search"&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryTypes` | 属性 | <code>memoryTypes?: MemoryType[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `query` | 属性 | <code>query?: MemorySearchQuery &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; MemorySearchQuery &#124; Promise&lt;MemorySearchQuery&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `MemoryContextItem`

Memory Context Item 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { MemoryContextItem } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface MemoryContextItem {
    id: string;
    type: MemoryType;
    content: string;
    score?: number;
    provenance: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `score` | 属性 | <code>score?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: MemoryType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActAction`

ReAct Action 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActAction } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActAction {
    type: 'tool' | 'model' | 'finish' | 'human_review';
    toolCallId?: string;
    target?: string;
    input?: unknown;
    reason?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `target` | 属性 | <code>target?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCallId` | 属性 | <code>toolCallId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "human_review" &#124; "tool" &#124; "model" &#124; "finish"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActAgentRunnerOptions`

ReAct Agent Runner Options 接口，共包含 25 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActAgentRunnerOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticReasoner` | 属性 | <code>agenticReasoner?: AgenticReasoner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpointStore` | 属性 | <code>checkpointStore?: ReActContinuationCheckpointStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextBuilder` | 属性 | <code>contextBuilder?: ContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `continueAfterTool` | 属性 | <code>continueAfterTool?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionBudget` | 属性 | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inference` | 属性 | <code>inference: InferenceProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIterations` | 属性 | <code>maxIterations?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onCheckpoint` | 方法 | <code>onCheckpoint?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onResume` | 方法 | <code>onResume?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStep` | 方法 | <code>onStep?(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig?: ReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSkills` | 属性 | <code>requiredSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resolveToolExecutionScope` | 方法 | <code>resolveToolExecutionScope?(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retainCheckpointUntilOutcome` | 属性 | <code>retainCheckpointUntilOutcome?: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `runtime` | 属性 | <code>runtime?: ReActAgentRuntime</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillContextLoader` | 属性 | <code>skillContextLoader?: SkillContextLoader</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillPolicy` | 属性 | <code>skillPolicy?: SkillPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRegistry` | 属性 | <code>skillRegistry?: SkillRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillSelector` | 属性 | <code>skillSelector?: SkillSelector</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `syncMemory` | 方法 | <code>syncMemory?(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `thinkingPlanner` | 属性 | <code>thinkingPlanner?: ThinkingPlanner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRunner` | 属性 | <code>toolRunner?: ToolRunner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `verifier` | 属性 | <code>verifier?: Verifier</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActAgentRuntime`

ReAct Agent Runtime 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActAgentRuntime } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActAgentRuntime {
    reason(context: ReActRunContext): Promise<InferenceRequest>;
    selectAction(response: InferenceResponse): Promise<ReActAction>;
    verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 方法 | <code>reason(context: ReActRunContext): Promise&lt;InferenceRequest&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `selectAction` | 方法 | <code>selectAction(response: InferenceResponse): Promise&lt;ReActAction&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `verify` | 方法 | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActAgentSpec`

ReAct Agent Spec 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActAgentSpec } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextSpecRef` | 属性 | <code>contextSpecRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptRefs` | 属性 | <code>promptRefs?: AgentPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoning` | 属性 | <code>reasoning?: ReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRefs` | 属性 | <code>skillRefs?: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `systemInstructions` | 属性 | <code>systemInstructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContinuationCheckpoint`

ReAct Continuation Checkpoint 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationCheckpoint } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `consecutiveNoProgress` | 属性 | <code>consecutiveNoProgress: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `iterations` | 属性 | <code>iterations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `lastProgressFingerprint` | 属性 | <code>lastProgressFingerprint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelCalls` | 属性 | <code>modelCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `nextPhase` | 属性 | <code>nextPhase: "reason" &#124; "act"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingAction` | 属性 | <code>pendingAction?: ReActAction</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pendingToolInvocationId` | 属性 | <code>pendingToolInvocationId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepSequence` | 属性 | <code>stepSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolCalls` | 属性 | <code>toolCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolInvocationSequence` | 属性 | <code>toolInvocationSequence: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `totalTokens` | 属性 | <code>totalTokens: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContinuationCheckpointPutResult`

ReAct Continuation Checkpoint Put Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationCheckpointPutResult } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActContinuationCheckpointPutResult {
    checkpoint: ReActContinuationCheckpoint;
    reused: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoint` | 属性 | <code>checkpoint: ReActContinuationCheckpoint</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reused` | 属性 | <code>reused: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActContinuationCheckpointStore`

ReAct Continuation Checkpoint Store 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActContinuationCheckpointStore } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActContinuationCheckpointStore {
    put(checkpoint: ReActContinuationCheckpoint, idempotencyKey: string): Promise<ReActContinuationCheckpointPutResult>;
    get(runId: string, stepId: string, expectedScopeHash: string): Promise<ReActContinuationCheckpoint | null>;
    delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise<boolean>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(runId: string, stepId: string, expectedScopeHash: string, expectedStepSequence?: number): Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `get` | 方法 | <code>get(runId: string, stepId: string, expectedScopeHash: string): Promise&lt;ReActContinuationCheckpoint &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `put` | 方法 | <code>put(checkpoint: ReActContinuationCheckpoint, idempotencyKey: string): Promise&lt;ReActContinuationCheckpointPutResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ReActExecutionBudget`

Global limits survive process restarts through ReActContinuationCheckpoint. quantumIterations only bounds one worker turn; it is not a new total budget.

- 种类: 接口
- 导入: `import type { ReActExecutionBudget } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxConsecutiveNoProgress` | 属性 | <code>maxConsecutiveNoProgress: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIterations` | 属性 | <code>maxIterations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxModelCalls` | 属性 | <code>maxModelCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxToolCalls` | 属性 | <code>maxToolCalls: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxTotalTokens` | 属性 | <code>maxTotalTokens?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `quantumIterations` | 属性 | <code>quantumIterations: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActObservation`

ReAct Observation 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActObservation } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActObservation<TValue = unknown> {
    source: 'model' | 'tool' | 'memory' | 'human' | 'system';
    value: TValue;
    provenance?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: "memory" &#124; "system" &#124; "human" &#124; "tool" &#124; "model"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `value` | 属性 | <code>value: TValue</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActRunContext`

ReAct Run Context 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActRunContext } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeSkills` | 属性 | <code>activeSkills?: LoadedSkillContext[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextSpec` | 属性 | <code>contextSpec?: ContextSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryScope` | 属性 | <code>memoryScope?: MemoryScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig?: ReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningDecision` | 属性 | <code>reasoningDecision?: AgenticReasoningDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `rejectedSkills` | 属性 | <code>rejectedSkills?: { skillId: string; reason: string; }[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stepId` | 属性 | <code>stepId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingPlan` | 属性 | <code>thinkingPlan?: ThinkingPlan</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope?: ToolExecutionScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal?: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActRunControl`

ReAct Run Control 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActRunControl } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActRunControl {
    checkpoint?: ReActContinuationCheckpoint;
    executionBudget?: Partial<ReActExecutionBudget>;
    abortSignal?: AbortSignal;
    resumeFromCheckpointStore?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal?: AbortSignal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `checkpoint` | 属性 | <code>checkpoint?: ReActContinuationCheckpoint</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionBudget` | 属性 | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `resumeFromCheckpointStore` | 属性 | <code>resumeFromCheckpointStore?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActRunnerOptions`

ReAct Runner Options 接口，共包含 13 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActRunnerOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointStore` | 属性 | <code>checkpointStore?: ReActContinuationCheckpointStore</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `continueAfterTool` | 属性 | <code>continueAfterTool?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `executionBudget` | 属性 | <code>executionBudget?: Partial&lt;ReActExecutionBudget&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inference` | 属性 | <code>inference: InferenceProvider</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxIterations` | 属性 | <code>maxIterations?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onCheckpoint` | 方法 | <code>onCheckpoint?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onResume` | 方法 | <code>onResume?(checkpoint: ReActContinuationCheckpoint): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `onStep` | 方法 | <code>onStep?(step: ReActStep): Promise&lt;void&gt; &#124; void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolveToolExecutionScope` | 方法 | <code>resolveToolExecutionScope?(context: ReActRunContext, action: ReActAction): ToolExecutionScope &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |
| `retainCheckpointUntilOutcome` | 属性 | <code>retainCheckpointUntilOutcome?: boolean</code> | Keep the latest durable checkpoint until an outer transaction records the terminal/waiting outcome. Production quantum executors use this to avoid an unrecoverable gap between Runner completion and Event persistence. |
| `syncMemory` | 方法 | <code>syncMemory?(context: ReActRunContext, observation: ReActObservation): Promise&lt;void&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `toolRunner` | 属性 | <code>toolRunner?: ToolRunner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActRunResult`

ReAct Run Result 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActRunResult } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpoint` | 属性 | <code>checkpoint?: ReActContinuationCheckpoint</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `finalAction` | 属性 | <code>finalAction?: ReActAction</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "human_review_required"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `steps` | 属性 | <code>steps: ReActStep[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `suspension` | 属性 | <code>suspension?: ReActSuspension</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActStep`

ReAct Step 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActStep } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActStep {
    id: string;
    phase: ReActPhase;
    input?: unknown;
    output?: unknown;
    traceEventId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `phase` | 属性 | <code>phase: ReActPhase</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceEventId` | 属性 | <code>traceEventId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReActSuspension`

ReAct Suspension 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReActSuspension } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReActSuspension {
    reason: ReActSuspensionReason;
    retryable: boolean;
    requiresHumanReview: boolean;
    message: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `message` | 属性 | <code>message: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: "quantum_exhausted" &#124; "iteration_budget_exhausted" &#124; "model_call_budget_exhausted" &#124; "tool_call_budget_exhausted" &#124; "token_budget_exhausted" &#124; "non_progress" &#124; "deadline_exceeded"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryable` | 属性 | <code>retryable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningConfig`

Reasoning Config 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningConfig } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticMode` | 属性 | <code>agenticMode?: AgenticReasoningMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSteps` | 属性 | <code>maxSteps?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persist` | 属性 | <code>persist?: ReasoningPersistence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plannerRef` | 属性 | <code>plannerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasonerRef` | 属性 | <code>reasonerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingMode` | 属性 | <code>thinkingMode?: ThinkingMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningContextBuilderOptions`

Reasoning Context Builder Options 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningContextBuilderOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ReasoningContextBuilderOptions {
    baseBuilder?: ContextBuilder;
    planner?: ThinkingPlanner;
    reasoner?: AgenticReasoner;
    config?: ReasoningConfig;
    now?: () => string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `baseBuilder` | 属性 | <code>baseBuilder?: ContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `config` | 属性 | <code>config?: ReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `planner` | 属性 | <code>planner?: ThinkingPlanner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoner` | 属性 | <code>reasoner?: AgenticReasoner</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RequiredReasoningConfig`

Required Reasoning Config 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RequiredReasoningConfig } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface RequiredReasoningConfig extends Required<Omit<ReasoningConfig, 'plannerRef' | 'reasonerRef' | 'metadata'>> {
    plannerRef?: string;
    reasonerRef?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticMode` | 属性 | <code>agenticMode?: AgenticReasoningMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSteps` | 属性 | <code>maxSteps?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persist` | 属性 | <code>persist?: ReasoningPersistence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plannerRef` | 属性 | <code>plannerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasonerRef` | 属性 | <code>reasonerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingMode` | 属性 | <code>thinkingMode?: ThinkingMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillContextBuilderOptions`

Skill Context Builder Options 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillContextBuilderOptions } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedSkills` | 属性 | <code>allowedSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableToolRefs` | 属性 | <code>availableToolRefs?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; Promise&lt;string[]&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `baseBuilder` | 属性 | <code>baseBuilder?: ContextBuilder</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextLoader` | 属性 | <code>contextLoader?: SkillContextLoader</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `now` | 方法 | <code>now?(): string</code> | 公开方法；参数与返回类型以签名列为准。 |
| `policy` | 属性 | <code>policy?: SkillPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `registry` | 属性 | <code>registry: SkillRegistry</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSkills` | 属性 | <code>requiredSkills?: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selector` | 属性 | <code>selector?: SkillSelector</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ThinkingPlan`

Thinking Plan 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ThinkingPlan } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constraints` | 属性 | <code>constraints: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `intent` | 属性 | <code>intent: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mode` | 属性 | <code>mode: "structured" &#124; "summary"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plan` | 属性 | <code>plan: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `risks` | 属性 | <code>risks: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `successCriteria` | 属性 | <code>successCriteria: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `summary` | 属性 | <code>summary: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ThinkingPlanner`

Thinking Planner 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ThinkingPlanner } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ThinkingPlanner {
    plan(input: ThinkingPlannerInput): Promise<ThinkingPlan>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `plan` | 方法 | <code>plan(input: ThinkingPlannerInput): Promise&lt;ThinkingPlan&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ThinkingPlannerInput`

Thinking Planner Input 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ThinkingPlannerInput } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ThinkingPlannerInput {
    context: BuiltAgentContext;
    config: RequiredReasoningConfig;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `config` | 属性 | <code>config: RequiredReasoningConfig</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `context` | 属性 | <code>context: BuiltAgentContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolActivityPort`

Tool Activity Port 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolActivityPort } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface ToolActivityPort {
    execute(request: ToolActivityRequest): Promise<ToolActivityResult>;
    cancel(invocationId: string, reason?: string): Promise<ToolActivityResult | null>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(invocationId: string, reason?: string): Promise&lt;ToolActivityResult &#124; null&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `execute` | 方法 | <code>execute(request: ToolActivityRequest): Promise&lt;ToolActivityResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `ToolActivityRequest`

Tool Activity Request 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolActivityRequest } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contractSnapshotRef` | 属性 | <code>contractSnapshotRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deadlineAt` | 属性 | <code>deadlineAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `operationId` | 属性 | <code>operationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: ToolPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateAttemptId` | 属性 | <code>stateAttemptId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRef` | 属性 | <code>toolRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ToolActivityResult`

Tool Activity Result 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ToolActivityResult } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvalRequestRef` | 属性 | <code>approvalRequestRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: NormalizedToolError</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `eventIds` | 属性 | <code>eventIds: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `invocationId` | 属性 | <code>invocationId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "cancelled" &#124; "failed" &#124; "denied" &#124; "conflict" &#124; "waiting_approval"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `Verifier`

Verifier 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { Verifier } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export interface Verifier {
    verify(context: ReActRunContext, observation: ReActObservation): Promise<ReActAction>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `verify` | 方法 | <code>verify(context: ReActRunContext, observation: ReActObservation): Promise&lt;ReActAction&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `AgenticReasoningMode`

Agentic Reasoning Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { AgenticReasoningMode } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export type AgenticReasoningMode = 'react' | 'fsm_react' | 'tot' | 'critique';
```

## `ReActPhase`

ReAct Phase 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReActPhase } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export type ReActPhase = 'observe' | 'reason' | 'select_action' | 'policy_check' | 'act' | 'observe_result' | 'verify' | 'memory_sync' | 'complete' | 'fail' | 'human_review' | 'suspend' | 'cancel';
```

## `ReActSuspensionReason`

ReAct Suspension Reason 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReActSuspensionReason } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export type ReActSuspensionReason = (typeof REACT_SUSPENSION_REASONS)[number];
```

## `ReasoningPersistence`

Reasoning Persistence 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ReasoningPersistence } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export type ReasoningPersistence = 'summary_only' | 'events_only';
```

## `ThinkingMode`

Thinking Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { ThinkingMode } from '@codesoul-co/hypha-kernel';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/kernel/src/index.ts)

### 声明

```text
export type ThinkingMode = 'none' | 'summary' | 'structured';
```
