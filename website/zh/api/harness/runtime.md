# `@codesoul-co/hypha-harness` / `runtime`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)
- 导出数: **20**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `EventFirstRuntime` | 类 | <code>new EventFirstRuntime(events?: EventStore): EventFirstRuntime</code> | Event First Runtime 的运行时实现；公开构造函数与成员见下表。 |
| `HarnessedReActFSMRunner` | 类 | <code>new HarnessedReActFSMRunner(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | Harnessed Re Act FSM Runner 的运行时实现；公开构造函数与成员见下表。 |
| `RunManager` | 类 | <code>new RunManager(options?: RunManagerOptions): RunManager</code> | Run Manager 的运行时实现；公开构造函数与成员见下表。 |
| `projectAudit` | 函数 | <code>projectAudit(events: FrameworkEvent[]): AuditProjection</code> | 投影 Audit。 |
| `projectReplay` | 函数 | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | 投影 Replay。 |
| `projectRun` | 函数 | <code>projectRun(events: FrameworkEvent[]): RuntimeRun &#124; null</code> | 投影 Run。 |
| `projectSession` | 函数 | <code>projectSession(events: FrameworkEvent[]): RuntimeSession &#124; null</code> | 投影 Session。 |
| `AppendRunEventInput` | 接口 | <code>interface AppendRunEventInput</code> | Append Run Event Input 的字段契约；完整字段见下表。 |
| `AuditProjection` | 接口 | <code>interface AuditProjection</code> | Audit Projection 的字段契约；完整字段见下表。 |
| `CreateRunInput` | 接口 | <code>interface CreateRunInput</code> | Create Run Input 的字段契约；完整字段见下表。 |
| `CreateSessionInput` | 接口 | <code>interface CreateSessionInput</code> | Create Session Input 的字段契约；完整字段见下表。 |
| `HarnessedReActFSMRunInput` | 接口 | <code>interface HarnessedReActFSMRunInput extends ContextBuildInput&lt;TInput&gt;</code> | Harnessed Re Act FSM Run Input 的字段契约；完整字段见下表。 |
| `HarnessedReActFSMRunnerOptions` | 接口 | <code>interface HarnessedReActFSMRunnerOptions</code> | Harnessed Re Act FSM Runner Options 的字段契约；完整字段见下表。 |
| `HarnessedReActFSMRunResult` | 接口 | <code>interface HarnessedReActFSMRunResult</code> | Harnessed Re Act FSM Run Result 的字段契约；完整字段见下表。 |
| `RegressionProjection` | 接口 | <code>interface RegressionProjection</code> | Regression Projection 的字段契约；完整字段见下表。 |
| `ReplayProjection` | 接口 | <code>interface ReplayProjection</code> | Replay Projection 的字段契约；完整字段见下表。 |
| `RunExecutionContext` | 接口 | <code>interface RunExecutionContext</code> | Run Execution Context 的字段契约；完整字段见下表。 |
| `RunManagerOptions` | 接口 | <code>interface RunManagerOptions</code> | Run Manager Options 的字段契约；完整字段见下表。 |
| `RuntimeRun` | 接口 | <code>interface RuntimeRun</code> | Runtime Run 的字段契约；完整字段见下表。 |
| `RuntimeSession` | 接口 | <code>interface RuntimeSession</code> | Runtime Session 的字段契约；完整字段见下表。 |

## `EventFirstRuntime` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appendRunEvent` | 方法 | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | 追加 Run Event。 |
| `constructor` | 构造函数 | <code>(events?: EventStore): EventFirstRuntime</code> | 创建该类的实例。 |
| `createRun` | 方法 | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | 创建 Run。 |
| `createSession` | 方法 | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | 创建 Session。 |
| `listEvents` | 方法 | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 Events。 |
| `projectAudit` | 方法 | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | 投影 Audit。 |
| `projectRegression` | 方法 | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | 投影 Regression。 |
| `projectReplay` | 方法 | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | 投影 Replay。 |
| `projectRun` | 方法 | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | 投影 Run。 |
| `projectSession` | 方法 | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | 投影 Session。 |

## `HarnessedReActFSMRunner` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | 创建该类的实例。 |
| `run` | 方法 | <code>run(input: HarnessedReActFSMRunInput): Promise&lt;HarnessedReActFSMRunResult&gt;</code> | run 的公开运行时操作。 |

## `RunManager` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `appendRunEvent` | 方法 | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | 追加 Run Event。 |
| `cancelRun` | 方法 | <code>cancelRun(context: RunExecutionContext, reason?: string, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 取消 Run。 |
| `completeRun` | 方法 | <code>completeRun(context: RunExecutionContext, output: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | complete Run 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options?: RunManagerOptions): RunManager</code> | 创建该类的实例。 |
| `createRun` | 方法 | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | 创建 Run。 |
| `createSession` | 方法 | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | 创建 Session。 |
| `eventRuntime` | 方法 | <code>eventRuntime(): EventFirstRuntime</code> | event Runtime 的公开运行时操作。 |
| `failRun` | 方法 | <code>failRun(context: RunExecutionContext, error: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | fail Run 的公开运行时操作。 |
| `listEvents` | 方法 | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | 列出 Events。 |
| `projectAudit` | 方法 | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | 投影 Audit。 |
| `projectRegression` | 方法 | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | 投影 Regression。 |
| `projectReplay` | 方法 | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | 投影 Replay。 |
| `projectRun` | 方法 | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | 投影 Run。 |
| `projectSession` | 方法 | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | 投影 Session。 |
| `recordAgentDeliberationCompleted` | 方法 | <code>recordAgentDeliberationCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Agent Deliberation Completed。 |
| `recordAgentDeliberationStarted` | 方法 | <code>recordAgentDeliberationStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Agent Deliberation Started。 |
| `recordContextBuildCompleted` | 方法 | <code>recordContextBuildCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Context Build Completed。 |
| `recordContextBuildStarted` | 方法 | <code>recordContextBuildStarted(context: RunExecutionContext): Promise&lt;FrameworkEvent&gt;</code> | 记录 Context Build Started。 |
| `recordContextCompacted` | 方法 | <code>recordContextCompacted(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 记录 Context Compacted。 |
| `recordHumanReviewApproved` | 方法 | <code>recordHumanReviewApproved(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 记录 Human Review Approved。 |
| `recordHumanReviewRejected` | 方法 | <code>recordHumanReviewRejected(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 记录 Human Review Rejected。 |
| `recordHumanReviewRequested` | 方法 | <code>recordHumanReviewRequested(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 记录 Human Review Requested。 |
| `recordReactContinuationCheckpoint` | 方法 | <code>recordReactContinuationCheckpoint(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint): Promise&lt;FrameworkEvent&gt;</code> | 记录 React Continuation Checkpoint。 |
| `recordReactContinuationResumed` | 方法 | <code>recordReactContinuationResumed(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint, resumedAt: string): Promise&lt;FrameworkEvent&gt;</code> | 记录 React Continuation Resumed。 |
| `recordReactContinuationSuspended` | 方法 | <code>recordReactContinuationSuspended(context: RunExecutionContext, result: ReActRunResult): Promise&lt;FrameworkEvent&gt;</code> | 记录 React Continuation Suspended。 |
| `recordReactStep` | 方法 | <code>recordReactStep(context: RunExecutionContext, step: ReActStep): Promise&lt;FrameworkEvent&gt;</code> | 记录 React Step。 |
| `recordReasoningDecision` | 方法 | <code>recordReasoningDecision(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Reasoning Decision。 |
| `recordSkillCompleted` | 方法 | <code>recordSkillCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Skill Completed。 |
| `recordSkillLoaded` | 方法 | <code>recordSkillLoaded(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Skill Loaded。 |
| `recordSkillSelected` | 方法 | <code>recordSkillSelected(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Skill Selected。 |
| `recordStateEntered` | 方法 | <code>recordStateEntered(context: RunExecutionContext, record: FSMStateEnteredRecord): Promise&lt;FrameworkEvent&gt;</code> | 记录 State Entered。 |
| `recordThinkingCompleted` | 方法 | <code>recordThinkingCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Thinking Completed。 |
| `recordThinkingStarted` | 方法 | <code>recordThinkingStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | 记录 Thinking Started。 |
| `recordTransitionAccepted` | 方法 | <code>recordTransitionAccepted(context: RunExecutionContext, transition: StateTransition): Promise&lt;FrameworkEvent&gt;</code> | 记录 Transition Accepted。 |
| `startRun` | 方法 | <code>startRun(run: RuntimeRun, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | 启动 Run。 |
| `waitForHumanReview` | 方法 | <code>waitForHumanReview(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | wait For Human Review 的公开运行时操作。 |

## `AppendRunEventInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `fsmState` | 属性 | <code>fsmState: string</code> | fsm State 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `payload` | 属性 | <code>payload: TPayload</code> | payload 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `type` | 属性 | <code>type: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/events").FrameworkEventType</code> | type 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `AuditProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventCount` | 属性 | <code>eventCount: number</code> | event Count 字段。 |
| `memoryWriteCount` | 属性 | <code>memoryWriteCount: number</code> | memory Write Count 字段。 |
| `missingRunIds` | 属性 | <code>missingRunIds: string[]</code> | missing Run Ids 字段。 |
| `policyDecisionCount` | 属性 | <code>policyDecisionCount: number</code> | policy Decision Count 字段。 |
| `reasoningDecisionCount` | 属性 | <code>reasoningDecisionCount: number</code> | reasoning Decision Count 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `skillActivationCount` | 属性 | <code>skillActivationCount: number</code> | skill Activation Count 字段。 |
| `toolCallCount` | 属性 | <code>toolCallCount: number</code> | tool Call Count 字段。 |

## `CreateRunInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |

## `CreateSessionInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef: SpecRef</code> | session Profile Ref 字段。 |
| `timestamp` | 属性 | <code>timestamp: string</code> | timestamp 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `HarnessedReActFSMRunInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agent` | 属性 | <code>agent: ReActAgentSpec</code> | agent 字段。 |
| `contextSpec` | 属性 | <code>contextSpec: ContextSpec</code> | context Spec 字段。 |
| `createSession` | 属性 | <code>createSession: boolean</code> | create Session 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `memoryScope` | 属性 | <code>memoryScope: MemoryScope</code> | memory Scope 字段。 |
| `messages` | 属性 | <code>messages: ModelMessage[]</code> | messages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `resumeFromCheckpoint` | 属性 | <code>resumeFromCheckpoint: boolean</code> | resume From Checkpoint 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `toolExecutionScope` | 属性 | <code>toolExecutionScope: ToolExecutionScope</code> | tool Execution Scope 字段。 |
| `toolPrincipal` | 属性 | <code>toolPrincipal: ToolPrincipal</code> | tool Principal 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |

## `HarnessedReActFSMRunnerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticReasoner` | 属性 | <code>agenticReasoner: AgenticReasoner</code> | agentic Reasoner 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | allowed Skills 字段。 |
| `contextBuilder` | 属性 | <code>contextBuilder: ContextBuilder</code> | context Builder 字段。 |
| `continueAfterTool` | 属性 | <code>continueAfterTool: boolean</code> | continue After Tool 字段。 |
| `executionBudget` | 属性 | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | execution Budget 字段。 |
| `fsmSpec` | 属性 | <code>fsmSpec: FSMProcessSpec</code> | fsm Spec 字段。 |
| `inference` | 属性 | <code>inference: InferenceProvider</code> | inference 字段。 |
| `maxIterations` | 属性 | <code>maxIterations: number</code> | max Iterations 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `reactCheckpointStore` | 属性 | <code>reactCheckpointStore: ReActContinuationCheckpointStore</code> | react Checkpoint Store 字段。 |
| `reactRuntime` | 属性 | <code>reactRuntime: ReActAgentRuntime</code> | react Runtime 字段。 |
| `reasoningConfig` | 属性 | <code>reasoningConfig: ReasoningConfig</code> | reasoning Config 字段。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | required Skills 字段。 |
| `resolveToolExecutionScope` | 方法 | <code>resolveToolExecutionScope(input: { fsmState: string; context: BuiltAgentContext; toolId: string; }): ToolExecutionScope &#124; undefined</code> | 解析 Tool Execution Scope。 |
| `runManager` | 属性 | <code>runManager: RunManager</code> | run Manager 字段。 |
| `skillContextLoader` | 属性 | <code>skillContextLoader: SkillContextLoader</code> | skill Context Loader 字段。 |
| `skillPolicy` | 属性 | <code>skillPolicy: SkillPolicy</code> | skill Policy 字段。 |
| `skillRegistry` | 属性 | <code>skillRegistry: SkillRegistry</code> | skill Registry 字段。 |
| `skillSelector` | 属性 | <code>skillSelector: SkillSelector</code> | skill Selector 字段。 |
| `thinkingPlanner` | 属性 | <code>thinkingPlanner: ThinkingPlanner</code> | thinking Planner 字段。 |
| `toolRunner` | 属性 | <code>toolRunner: ToolRunner</code> | tool Runner 字段。 |
| `verifier` | 属性 | <code>verifier: Verifier</code> | verifier 字段。 |

## `HarnessedReActFSMRunResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `fsmSnapshot` | 属性 | <code>fsmSnapshot: import("/Users/erwin/Downloads/codespace/Hypha/packages/fsm/dist/index").FSMSnapshot</code> | fsm Snapshot 字段。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | react 字段。 |
| `run` | 属性 | <code>run: RuntimeRun</code> | run 字段。 |

## `RegressionProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `eventTypes` | 属性 | <code>eventTypes: string[]</code> | event Types 字段。 |
| `finalOutput` | 属性 | <code>finalOutput: unknown</code> | final Output 字段。 |
| `memoryWriteCount` | 属性 | <code>memoryWriteCount: number</code> | memory Write Count 字段。 |
| `reasoningDecisionCount` | 属性 | <code>reasoningDecisionCount: number</code> | reasoning Decision Count 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `skillActivationCount` | 属性 | <code>skillActivationCount: number</code> | skill Activation Count 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: { toolId?: unknown; status: string; }[]</code> | tool Calls 字段。 |

## `ReplayProjection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `events` | 属性 | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | events 字段。 |
| `finalOutput` | 属性 | <code>finalOutput: unknown</code> | final Output 字段。 |
| `memoryEventIds` | 属性 | <code>memoryEventIds: string[]</code> | memory Event Ids 字段。 |
| `memoryReads` | 属性 | <code>memoryReads: FrameworkEvent&lt;unknown&gt;[]</code> | memory Reads 字段。 |
| `memoryWrites` | 属性 | <code>memoryWrites: FrameworkEvent&lt;unknown&gt;[]</code> | memory Writes 字段。 |
| `modelCalls` | 属性 | <code>modelCalls: FrameworkEvent&lt;unknown&gt;[]</code> | model Calls 字段。 |
| `policyDecisionEventIds` | 属性 | <code>policyDecisionEventIds: string[]</code> | policy Decision Event Ids 字段。 |
| `policyDecisions` | 属性 | <code>policyDecisions: FrameworkEvent&lt;unknown&gt;[]</code> | policy Decisions 字段。 |
| `reasoningEventIds` | 属性 | <code>reasoningEventIds: string[]</code> | reasoning Event Ids 字段。 |
| `reasoningEvents` | 属性 | <code>reasoningEvents: FrameworkEvent&lt;unknown&gt;[]</code> | reasoning Events 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `skillEventIds` | 属性 | <code>skillEventIds: string[]</code> | skill Event Ids 字段。 |
| `skillEvents` | 属性 | <code>skillEvents: FrameworkEvent&lt;unknown&gt;[]</code> | skill Events 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `toolCallEventIds` | 属性 | <code>toolCallEventIds: string[]</code> | tool Call Event Ids 字段。 |
| `toolCalls` | 属性 | <code>toolCalls: FrameworkEvent&lt;unknown&gt;[]</code> | tool Calls 字段。 |

## `RunExecutionContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `RunManagerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `operationalTelemetry` | 属性 | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | operational Telemetry 字段。 |
| `runtime` | 属性 | <code>runtime: EventFirstRuntime</code> | runtime 字段。 |

## `RuntimeRun` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `completedAt` | 属性 | <code>completedAt: string</code> | completed At 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `output` | 属性 | <code>output: unknown</code> | output 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | status 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |

## `RuntimeSession` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef: SpecRef</code> | session Profile Ref 字段。 |
| `status` | 属性 | <code>status: "active" &#124; "closed"</code> | status 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
