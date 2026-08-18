# `@codesoul-co/hypha-harness` / `runtime`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/runtime.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/runtime.ts)
- Exports: **20**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `EventFirstRuntime` | class | <code>new EventFirstRuntime(events?: EventStore): EventFirstRuntime</code> | Runtime implementation for Event First Runtime; see its public constructor and members below. |
| `HarnessedReActFSMRunner` | class | <code>new HarnessedReActFSMRunner(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | Runtime implementation for Harnessed Re Act FSM Runner; see its public constructor and members below. |
| `RunManager` | class | <code>new RunManager(options?: RunManagerOptions): RunManager</code> | Runtime implementation for Run Manager; see its public constructor and members below. |
| `projectAudit` | function | <code>projectAudit(events: FrameworkEvent[]): AuditProjection</code> | Projects Audit at this module boundary. |
| `projectReplay` | function | <code>projectReplay(events: FrameworkEvent[]): ReplayProjection</code> | Projects Replay at this module boundary. |
| `projectRun` | function | <code>projectRun(events: FrameworkEvent[]): RuntimeRun &#124; null</code> | Projects Run at this module boundary. |
| `projectSession` | function | <code>projectSession(events: FrameworkEvent[]): RuntimeSession &#124; null</code> | Projects Session at this module boundary. |
| `AppendRunEventInput` | interface | <code>interface AppendRunEventInput</code> | Field contract for Append Run Event Input; see all contract members below. |
| `AuditProjection` | interface | <code>interface AuditProjection</code> | Field contract for Audit Projection; see all contract members below. |
| `CreateRunInput` | interface | <code>interface CreateRunInput</code> | Field contract for Create Run Input; see all contract members below. |
| `CreateSessionInput` | interface | <code>interface CreateSessionInput</code> | Field contract for Create Session Input; see all contract members below. |
| `HarnessedReActFSMRunInput` | interface | <code>interface HarnessedReActFSMRunInput extends ContextBuildInput&lt;TInput&gt;</code> | Field contract for Harnessed Re Act FSM Run Input; see all contract members below. |
| `HarnessedReActFSMRunnerOptions` | interface | <code>interface HarnessedReActFSMRunnerOptions</code> | Field contract for Harnessed Re Act FSM Runner Options; see all contract members below. |
| `HarnessedReActFSMRunResult` | interface | <code>interface HarnessedReActFSMRunResult</code> | Field contract for Harnessed Re Act FSM Run Result; see all contract members below. |
| `RegressionProjection` | interface | <code>interface RegressionProjection</code> | Field contract for Regression Projection; see all contract members below. |
| `ReplayProjection` | interface | <code>interface ReplayProjection</code> | Field contract for Replay Projection; see all contract members below. |
| `RunExecutionContext` | interface | <code>interface RunExecutionContext</code> | Field contract for Run Execution Context; see all contract members below. |
| `RunManagerOptions` | interface | <code>interface RunManagerOptions</code> | Field contract for Run Manager Options; see all contract members below. |
| `RuntimeRun` | interface | <code>interface RuntimeRun</code> | Field contract for Runtime Run; see all contract members below. |
| `RuntimeSession` | interface | <code>interface RuntimeSession</code> | Field contract for Runtime Session; see all contract members below. |

## `EventFirstRuntime` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appendRunEvent` | method | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | Appends Run Event at this module boundary. |
| `constructor` | constructor | <code>(events?: EventStore): EventFirstRuntime</code> | Creates an instance of this class. |
| `createRun` | method | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | Creates Run at this module boundary. |
| `createSession` | method | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | Creates Session at this module boundary. |
| `listEvents` | method | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | Lists Events at this module boundary. |
| `projectAudit` | method | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | Projects Audit at this module boundary. |
| `projectRegression` | method | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | Projects Regression at this module boundary. |
| `projectReplay` | method | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | Projects Replay at this module boundary. |
| `projectRun` | method | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | Projects Run at this module boundary. |
| `projectSession` | method | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | Projects Session at this module boundary. |

## `HarnessedReActFSMRunner` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: HarnessedReActFSMRunnerOptions): HarnessedReActFSMRunner</code> | Creates an instance of this class. |
| `run` | method | <code>run(input: HarnessedReActFSMRunInput): Promise&lt;HarnessedReActFSMRunResult&gt;</code> | Public runtime operation for run. |

## `RunManager` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `appendRunEvent` | method | <code>appendRunEvent(input: AppendRunEventInput): Promise&lt;FrameworkEvent&gt;</code> | Appends Run Event at this module boundary. |
| `cancelRun` | method | <code>cancelRun(context: RunExecutionContext, reason?: string, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Cancels Run at this module boundary. |
| `completeRun` | method | <code>completeRun(context: RunExecutionContext, output: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public runtime operation for complete Run. |
| `constructor` | constructor | <code>(options?: RunManagerOptions): RunManager</code> | Creates an instance of this class. |
| `createRun` | method | <code>createRun(input: CreateRunInput): Promise&lt;RuntimeRun&gt;</code> | Creates Run at this module boundary. |
| `createSession` | method | <code>createSession(input: CreateSessionInput): Promise&lt;RuntimeSession&gt;</code> | Creates Session at this module boundary. |
| `eventRuntime` | method | <code>eventRuntime(): EventFirstRuntime</code> | Public runtime operation for event Runtime. |
| `failRun` | method | <code>failRun(context: RunExecutionContext, error: unknown, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public runtime operation for fail Run. |
| `listEvents` | method | <code>listEvents(runId: string): Promise&lt;FrameworkEvent[]&gt;</code> | Lists Events at this module boundary. |
| `projectAudit` | method | <code>projectAudit(runId: string): Promise&lt;AuditProjection&gt;</code> | Projects Audit at this module boundary. |
| `projectRegression` | method | <code>projectRegression(runId: string): Promise&lt;RegressionProjection&gt;</code> | Projects Regression at this module boundary. |
| `projectReplay` | method | <code>projectReplay(runId: string): Promise&lt;ReplayProjection&gt;</code> | Projects Replay at this module boundary. |
| `projectRun` | method | <code>projectRun(runId: string): Promise&lt;RuntimeRun &#124; null&gt;</code> | Projects Run at this module boundary. |
| `projectSession` | method | <code>projectSession(sessionId: string): Promise&lt;RuntimeSession &#124; null&gt;</code> | Projects Session at this module boundary. |
| `recordAgentDeliberationCompleted` | method | <code>recordAgentDeliberationCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Agent Deliberation Completed at this module boundary. |
| `recordAgentDeliberationStarted` | method | <code>recordAgentDeliberationStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Agent Deliberation Started at this module boundary. |
| `recordContextBuildCompleted` | method | <code>recordContextBuildCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Context Build Completed at this module boundary. |
| `recordContextBuildStarted` | method | <code>recordContextBuildStarted(context: RunExecutionContext): Promise&lt;FrameworkEvent&gt;</code> | Records Context Build Started at this module boundary. |
| `recordContextCompacted` | method | <code>recordContextCompacted(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Records Context Compacted at this module boundary. |
| `recordHumanReviewApproved` | method | <code>recordHumanReviewApproved(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Records Human Review Approved at this module boundary. |
| `recordHumanReviewRejected` | method | <code>recordHumanReviewRejected(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Records Human Review Rejected at this module boundary. |
| `recordHumanReviewRequested` | method | <code>recordHumanReviewRequested(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Records Human Review Requested at this module boundary. |
| `recordReactContinuationCheckpoint` | method | <code>recordReactContinuationCheckpoint(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint): Promise&lt;FrameworkEvent&gt;</code> | Records React Continuation Checkpoint at this module boundary. |
| `recordReactContinuationResumed` | method | <code>recordReactContinuationResumed(context: RunExecutionContext, checkpoint: ReActContinuationCheckpoint, resumedAt: string): Promise&lt;FrameworkEvent&gt;</code> | Records React Continuation Resumed at this module boundary. |
| `recordReactContinuationSuspended` | method | <code>recordReactContinuationSuspended(context: RunExecutionContext, result: ReActRunResult): Promise&lt;FrameworkEvent&gt;</code> | Records React Continuation Suspended at this module boundary. |
| `recordReactStep` | method | <code>recordReactStep(context: RunExecutionContext, step: ReActStep): Promise&lt;FrameworkEvent&gt;</code> | Records React Step at this module boundary. |
| `recordReasoningDecision` | method | <code>recordReasoningDecision(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Reasoning Decision at this module boundary. |
| `recordSkillCompleted` | method | <code>recordSkillCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Skill Completed at this module boundary. |
| `recordSkillLoaded` | method | <code>recordSkillLoaded(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Skill Loaded at this module boundary. |
| `recordSkillSelected` | method | <code>recordSkillSelected(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Skill Selected at this module boundary. |
| `recordStateEntered` | method | <code>recordStateEntered(context: RunExecutionContext, record: FSMStateEnteredRecord): Promise&lt;FrameworkEvent&gt;</code> | Records State Entered at this module boundary. |
| `recordThinkingCompleted` | method | <code>recordThinkingCompleted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Thinking Completed at this module boundary. |
| `recordThinkingStarted` | method | <code>recordThinkingStarted(context: RunExecutionContext, payload: Record&lt;string, unknown&gt;): Promise&lt;FrameworkEvent&gt;</code> | Records Thinking Started at this module boundary. |
| `recordTransitionAccepted` | method | <code>recordTransitionAccepted(context: RunExecutionContext, transition: StateTransition): Promise&lt;FrameworkEvent&gt;</code> | Records Transition Accepted at this module boundary. |
| `startRun` | method | <code>startRun(run: RuntimeRun, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Starts Run at this module boundary. |
| `waitForHumanReview` | method | <code>waitForHumanReview(context: RunExecutionContext, payload?: Record&lt;string, unknown&gt;, timestamp?: string): Promise&lt;FrameworkEvent&gt;</code> | Public runtime operation for wait For Human Review. |

## `AppendRunEventInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `fsmState` | property | <code>fsmState: string</code> | Public fsm State property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `payload` | property | <code>payload: TPayload</code> | Public payload property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `type` | property | <code>type: import("/Users/erwin/Downloads/codespace/Hypha/packages/core/dist/events").FrameworkEventType</code> | Public type property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `AuditProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventCount` | property | <code>eventCount: number</code> | Public event Count property. |
| `memoryWriteCount` | property | <code>memoryWriteCount: number</code> | Public memory Write Count property. |
| `missingRunIds` | property | <code>missingRunIds: string[]</code> | Public missing Run Ids property. |
| `policyDecisionCount` | property | <code>policyDecisionCount: number</code> | Public policy Decision Count property. |
| `reasoningDecisionCount` | property | <code>reasoningDecisionCount: number</code> | Public reasoning Decision Count property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `skillActivationCount` | property | <code>skillActivationCount: number</code> | Public skill Activation Count property. |
| `toolCallCount` | property | <code>toolCallCount: number</code> | Public tool Call Count property. |

## `CreateRunInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |

## `CreateSessionInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sessionProfileRef` | property | <code>sessionProfileRef: SpecRef</code> | Public session Profile Ref property. |
| `timestamp` | property | <code>timestamp: string</code> | Public timestamp property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `HarnessedReActFSMRunInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agent` | property | <code>agent: ReActAgentSpec</code> | Public agent property. |
| `contextSpec` | property | <code>contextSpec: ContextSpec</code> | Public context Spec property. |
| `createSession` | property | <code>createSession: boolean</code> | Public create Session property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `memoryScope` | property | <code>memoryScope: MemoryScope</code> | Public memory Scope property. |
| `messages` | property | <code>messages: ModelMessage[]</code> | Public messages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `resumeFromCheckpoint` | property | <code>resumeFromCheckpoint: boolean</code> | Public resume From Checkpoint property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `toolExecutionScope` | property | <code>toolExecutionScope: ToolExecutionScope</code> | Public tool Execution Scope property. |
| `toolPrincipal` | property | <code>toolPrincipal: ToolPrincipal</code> | Public tool Principal property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |

## `HarnessedReActFSMRunnerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticReasoner` | property | <code>agenticReasoner: AgenticReasoner</code> | Public agentic Reasoner property. |
| `allowedSkills` | property | <code>allowedSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public allowed Skills property. |
| `contextBuilder` | property | <code>contextBuilder: ContextBuilder</code> | Public context Builder property. |
| `continueAfterTool` | property | <code>continueAfterTool: boolean</code> | Public continue After Tool property. |
| `executionBudget` | property | <code>executionBudget: Partial&lt;ReActExecutionBudget&gt;</code> | Public execution Budget property. |
| `fsmSpec` | property | <code>fsmSpec: FSMProcessSpec</code> | Public fsm Spec property. |
| `inference` | property | <code>inference: InferenceProvider</code> | Public inference property. |
| `maxIterations` | property | <code>maxIterations: number</code> | Public max Iterations property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `reactCheckpointStore` | property | <code>reactCheckpointStore: ReActContinuationCheckpointStore</code> | Public react Checkpoint Store property. |
| `reactRuntime` | property | <code>reactRuntime: ReActAgentRuntime</code> | Public react Runtime property. |
| `reasoningConfig` | property | <code>reasoningConfig: ReasoningConfig</code> | Public reasoning Config property. |
| `requiredSkills` | property | <code>requiredSkills: string[] &#124; ((input: ContextBuildInput, base: BuiltAgentContext) =&gt; string[] &#124; undefined &#124; Promise&lt;string[] &#124; undefined&gt;)</code> | Public required Skills property. |
| `resolveToolExecutionScope` | method | <code>resolveToolExecutionScope(input: { fsmState: string; context: BuiltAgentContext; toolId: string; }): ToolExecutionScope &#124; undefined</code> | Resolves Tool Execution Scope at this module boundary. |
| `runManager` | property | <code>runManager: RunManager</code> | Public run Manager property. |
| `skillContextLoader` | property | <code>skillContextLoader: SkillContextLoader</code> | Public skill Context Loader property. |
| `skillPolicy` | property | <code>skillPolicy: SkillPolicy</code> | Public skill Policy property. |
| `skillRegistry` | property | <code>skillRegistry: SkillRegistry</code> | Public skill Registry property. |
| `skillSelector` | property | <code>skillSelector: SkillSelector</code> | Public skill Selector property. |
| `thinkingPlanner` | property | <code>thinkingPlanner: ThinkingPlanner</code> | Public thinking Planner property. |
| `toolRunner` | property | <code>toolRunner: ToolRunner</code> | Public tool Runner property. |
| `verifier` | property | <code>verifier: Verifier</code> | Public verifier property. |

## `HarnessedReActFSMRunResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `fsmSnapshot` | property | <code>fsmSnapshot: import("/Users/erwin/Downloads/codespace/Hypha/packages/fsm/dist/index").FSMSnapshot</code> | Public fsm Snapshot property. |
| `react` | property | <code>react: ReActRunResult</code> | Public react property. |
| `run` | property | <code>run: RuntimeRun</code> | Public run property. |

## `RegressionProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `eventTypes` | property | <code>eventTypes: string[]</code> | Public event Types property. |
| `finalOutput` | property | <code>finalOutput: unknown</code> | Public final Output property. |
| `memoryWriteCount` | property | <code>memoryWriteCount: number</code> | Public memory Write Count property. |
| `reasoningDecisionCount` | property | <code>reasoningDecisionCount: number</code> | Public reasoning Decision Count property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `skillActivationCount` | property | <code>skillActivationCount: number</code> | Public skill Activation Count property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `toolCalls` | property | <code>toolCalls: { toolId?: unknown; status: string; }[]</code> | Public tool Calls property. |

## `ReplayProjection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: FrameworkEvent&lt;unknown&gt;[]</code> | Public events property. |
| `finalOutput` | property | <code>finalOutput: unknown</code> | Public final Output property. |
| `memoryEventIds` | property | <code>memoryEventIds: string[]</code> | Public memory Event Ids property. |
| `memoryReads` | property | <code>memoryReads: FrameworkEvent&lt;unknown&gt;[]</code> | Public memory Reads property. |
| `memoryWrites` | property | <code>memoryWrites: FrameworkEvent&lt;unknown&gt;[]</code> | Public memory Writes property. |
| `modelCalls` | property | <code>modelCalls: FrameworkEvent&lt;unknown&gt;[]</code> | Public model Calls property. |
| `policyDecisionEventIds` | property | <code>policyDecisionEventIds: string[]</code> | Public policy Decision Event Ids property. |
| `policyDecisions` | property | <code>policyDecisions: FrameworkEvent&lt;unknown&gt;[]</code> | Public policy Decisions property. |
| `reasoningEventIds` | property | <code>reasoningEventIds: string[]</code> | Public reasoning Event Ids property. |
| `reasoningEvents` | property | <code>reasoningEvents: FrameworkEvent&lt;unknown&gt;[]</code> | Public reasoning Events property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `skillEventIds` | property | <code>skillEventIds: string[]</code> | Public skill Event Ids property. |
| `skillEvents` | property | <code>skillEvents: FrameworkEvent&lt;unknown&gt;[]</code> | Public skill Events property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `toolCallEventIds` | property | <code>toolCallEventIds: string[]</code> | Public tool Call Event Ids property. |
| `toolCalls` | property | <code>toolCalls: FrameworkEvent&lt;unknown&gt;[]</code> | Public tool Calls property. |

## `RunExecutionContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `RunManagerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `operationalTelemetry` | property | <code>operationalTelemetry: RuntimeOperationalTelemetry</code> | Public operational Telemetry property. |
| `runtime` | property | <code>runtime: EventFirstRuntime</code> | Public runtime property. |

## `RuntimeRun` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `completedAt` | property | <code>completedAt: string</code> | Public completed At property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `output` | property | <code>output: unknown</code> | Public output property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: "completed" &#124; "queued" &#124; "running" &#124; "cancelled" &#124; "failed" &#124; "waiting_human"</code> | Public status property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |

## `RuntimeSession` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `sessionProfileRef` | property | <code>sessionProfileRef: SpecRef</code> | Public session Profile Ref property. |
| `status` | property | <code>status: "active" &#124; "closed"</code> | Public status property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
