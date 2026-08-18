# `@codesoul-co/hypha-fsm` / `index`

- 包索引: [`@codesoul-co/hypha-fsm`](/zh/api/fsm)
- 模块指南: [学习与组合说明](/zh/packages/fsm)
- 源码: [`packages/fsm/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)
- 导出数: **50**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `FSMRuntime` | 类 | <code>new FSMRuntime(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | FSM Runtime 的运行时实现；公开构造函数与成员见下表。 |
| `defaultReActFSMProcessSpec` | 常量 | <code>const defaultReActFSMProcessSpec: FSMProcessSpec</code> | 由 `index` 模块导出的 default Re Act FSM Process Spec 常量。 |
| `fsmProcessSpecDefinition` | 常量 | <code>const fsmProcessSpecDefinition: SpecSchemaDefinition&lt;FSMProcessSpec&gt;</code> | fsm Process Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `fsmProcessSpecExample` | 常量 | <code>const fsmProcessSpecExample: FSMProcessSpec</code> | fsm Process Spec 的有效示例值。 |
| `fsmProcessSpecJsonSchema` | 常量 | <code>const fsmProcessSpecJsonSchema: JsonSchema</code> | fsm Process Spec 的 JSON Schema。 |
| `fsmProcessSpecSchema` | 常量 | <code>const fsmProcessSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; states: z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodOptional&lt;z....</code> | fsm Process Spec 的运行时 Schema。 |
| `fsmSpecDefinitions` | 常量 | <code>const fsmSpecDefinitions: readonly [SpecSchemaDefinition&lt;FSMProcessSpec&gt;]</code> | 由 `index` 模块导出的 fsm Spec Definitions 常量。 |
| `fsmSpecJsonSchemas` | 常量 | <code>const fsmSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 fsm Spec Json Schemas 常量。 |
| `fsmStateSpecSchema` | 常量 | <code>const fsmStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["idle", "run_initialized", "context_built", "reasoning", "action_selected", "poli...</code> | fsm State Spec 的运行时 Schema。 |
| `fsmTransitionSpecSchema` | 常量 | <code>const fsmTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; traceEvent: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; traceEvent?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?...</code> | fsm Transition Spec 的运行时 Schema。 |
| `HARNESS_FSM_STATE_IDS` | 常量 | <code>const HARNESS_FSM_STATE_IDS: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Recovering", "Compensating", "Quarantined", "HumanReview", "Completed", "Failed", "Cancelled"]</code> | Stable Harness states owned by the framework runtime. Domain Packs may bind capabilities and policy to these phases, but must not add, remove, rename, or reconnect them. |
| `HARNESS_STATE_CAPABILITY_AREA` | 常量 | <code>const HARNESS_STATE_CAPABILITY_AREA: Readonly&lt;Record&lt;"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled", HarnessCapabilityArea&gt;&gt;</code> | `activity` is the governed side-effect phase shared by Tool, MCP, Execution, file, Memory-write, and external-write adapters. The concrete activity type remains Event evidence; it never becomes a Domain-defined FSM state. |
| `REACT_FSM_STATE_PATH` | 常量 | <code>const REACT_FSM_STATE_PATH: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Completed"]</code> | 由 `index` 模块导出的 REACT FSM STATE PATH 常量。 |
| `REACT_PHASE_TO_HARNESS_STATE` | 常量 | <code>const REACT_PHASE_TO_HARNESS_STATE: Readonly&lt;{ reason: "Reasoning"; select_action: "ActionSelected"; policy_check: "PolicyChecked"; act: "Acting"; observe_result: "ObservationRecorded"; verify: "Verifying"; memory_sync: "MemorySync"; complete: "Completed"; fail: "Failed"; human_review: "HumanReview"; cancel: "Cancelled"; }&gt;</code> | 由 `index` 模块导出的 REACT PHASE TO HARNESS STATE 常量。 |
| `analyzeFSMTopology` | 函数 | <code>analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis</code> | Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow. |
| `applyTransition` | 函数 | <code>applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string &#124; FSMTransitionOptions): FSMSnapshot</code> | 应用 Transition。 |
| `applyTransitionWithRuntimePolicy` | 函数 | <code>applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;FSMSnapshot&gt;</code> | 应用 Transition With Runtime Policy。 |
| `assertHarnessFSMProcessSpec` | 函数 | <code>assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void</code> | Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow. |
| `canRetryState` | 函数 | <code>canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean</code> | 判断能否 Retry State。 |
| `createHarnessFSMProcessSpec` | 函数 | <code>createHarnessFSMProcessSpec(): FSMProcessSpec</code> | Returns an isolated copy so composition code cannot mutate the shared contract. |
| `createInitialSnapshot` | 函数 | <code>createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot</code> | 创建 Initial Snapshot。 |
| `evaluateGuardExpression` | 函数 | <code>evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean</code> | 评估 Guard Expression。 |
| `evaluateStateTimeout` | 函数 | <code>evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation &#124; null</code> | 评估 State Timeout。 |
| `getAllowedTransitions` | 函数 | <code>getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[]</code> | 读取 Allowed Transitions。 |
| `harnessStateForReActPhase` | 函数 | <code>harnessStateForReActPhase(phase: string): HarnessFSMStateId &#124; undefined</code> | harness State For Re Act Phase 的公开运行时操作。 |
| `isHarnessFSMProcessSpec` | 函数 | <code>isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean</code> | Returns false for either an invalid process or a valid non-Harness topology. |
| `isHarnessFSMStateId` | 函数 | <code>isHarnessFSMStateId(value: string): value is HarnessFSMStateId</code> | 判断 Harness FSM State Id。 |
| `parseFSMProcessSpec` | 函数 | <code>parseFSMProcessSpec(input: unknown): FSMProcessSpec</code> | 解析并校验 FSM Process Spec。 |
| `planHarnessCapabilityPath` | 函数 | <code>planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[]</code> | Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work. |
| `validateFSMProcessSpec` | 函数 | <code>validateFSMProcessSpec(spec: FSMProcessSpec): void</code> | 校验 FSM Process Spec。 |
| `validateFSMSnapshot` | 函数 | <code>validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void</code> | 校验 FSM Snapshot。 |
| `FSMGuardContext` | 接口 | <code>interface FSMGuardContext</code> | FSM Guard Context 的字段契约；完整字段见下表。 |
| `FSMProcessSpec` | 接口 | <code>interface FSMProcessSpec extends VersionedSpec, SpecMetadata</code> | FSM Process Spec 的字段契约；完整字段见下表。 |
| `FSMRecoveryDecisionRecord` | 接口 | <code>interface FSMRecoveryDecisionRecord</code> | FSM Recovery Decision Record 的字段契约；完整字段见下表。 |
| `FSMRuntimeCancelOptions` | 接口 | <code>interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions</code> | FSM Runtime Cancel Options 的字段契约；完整字段见下表。 |
| `FSMRuntimeOptions` | 接口 | <code>interface FSMRuntimeOptions</code> | FSM Runtime Options 的字段契约；完整字段见下表。 |
| `FSMRuntimeTransitionOptions` | 接口 | <code>interface FSMRuntimeTransitionOptions extends FSMTransitionOptions</code> | FSM Runtime Transition Options 的字段契约；完整字段见下表。 |
| `FSMSnapshot` | 接口 | <code>interface FSMSnapshot</code> | FSM Snapshot 的字段契约；完整字段见下表。 |
| `FSMStateEnteredRecord` | 接口 | <code>interface FSMStateEnteredRecord</code> | FSM State Entered Record 的字段契约；完整字段见下表。 |
| `FSMStateSpec` | 接口 | <code>interface FSMStateSpec extends SpecMetadata</code> | FSM State Spec 的字段契约；完整字段见下表。 |
| `FSMTimeoutEvaluation` | 接口 | <code>interface FSMTimeoutEvaluation</code> | FSM Timeout Evaluation 的字段契约；完整字段见下表。 |
| `FSMTopologyAnalysis` | 接口 | <code>interface FSMTopologyAnalysis</code> | FSM Topology Analysis 的字段契约；完整字段见下表。 |
| `FSMTransitionOptions` | 接口 | <code>interface FSMTransitionOptions</code> | FSM Transition Options 的字段契约；完整字段见下表。 |
| `FSMTransitionSpec` | 接口 | <code>interface FSMTransitionSpec</code> | FSM Transition Spec 的字段契约；完整字段见下表。 |
| `StateTransition` | 接口 | <code>interface StateTransition</code> | State Transition 的字段契约；完整字段见下表。 |
| `FSMGuardEvaluator` | 类型 | <code>type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) =&gt; boolean</code> | FSM Guard Evaluator 的公共类型别名。 |
| `FSMStateKind` | 类型 | <code>type FSMStateKind = 'idle' &#124; 'run_initialized' &#124; 'context_built' &#124; 'reasoning' &#124; 'action_selected' &#124; 'policy_checked' &#124; 'acting' &#124; 'observation_recorded' &#124; 'verifying' &#124; 'memory_sync' &#124; 'recovering' &#124; 'compensating' &#124; 'quarantined' &#124; 'human_review' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'domain'</code> | FSM State Kind 的公共类型别名。 |
| `FsmTerminalStatus` | 类型 | <code>type FsmTerminalStatus = 'completed' &#124; 'failed' &#124; 'cancelled'</code> | Fsm Terminal Status 的公共类型别名。 |
| `HarnessCapabilityArea` | 类型 | <code>type HarnessCapabilityArea = 'lifecycle' &#124; 'context' &#124; 'reasoning' &#124; 'policy' &#124; 'activity' &#124; 'observation' &#124; 'verification' &#124; 'memory' &#124; 'recovery' &#124; 'human_review' &#124; 'terminal'</code> | Harness Capability Area 的公共类型别名。 |
| `HarnessFSMStateId` | 类型 | <code>type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number]</code> | Harness FSM State Id 的公共类型别名。 |

## `FSMRuntime` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(options?: FSMRuntimeCancelOptions): Promise&lt;StateTransition&gt;</code> | 取消 cancel。 |
| `constructor` | 构造函数 | <code>(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | 创建该类的实例。 |
| `decideRecovery` | 方法 | <code>decideRecovery(anomaly: FSMAnomaly, options?: { stateId?: string; now?: string; }): Promise&lt;FSMRecoveryDecision&gt;</code> | 决定 Recovery。 |
| `getSnapshot` | 方法 | <code>getSnapshot(): FSMSnapshot</code> | 读取 Snapshot。 |
| `registerRecoverySuccess` | 方法 | <code>registerRecoverySuccess(circuitKey: string, now?: string): FSMSnapshot</code> | 注册 Recovery Success。 |
| `start` | 方法 | <code>start(metadata?: Record&lt;string, unknown&gt;): Promise&lt;FSMSnapshot&gt;</code> | 启动 start。 |
| `transition` | 方法 | <code>transition(to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition&gt;</code> | 迁移 transition。 |
| `transitionPath` | 方法 | <code>transitionPath(states: string[], options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition[]&gt;</code> | 迁移 Path。 |

## `FSMGuardContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `input` | 属性 | <code>input: unknown</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `variables` | 属性 | <code>variables: Record&lt;string, unknown&gt;</code> | variables 字段。 |

## `FSMProcessSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `initialState` | 属性 | <code>initialState: string</code> | initial State 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `recoveryPolicy` | 属性 | <code>recoveryPolicy: FSMRecoveryPolicySpec</code> | recovery Policy 字段。 |
| `states` | 属性 | <code>states: FSMStateSpec[]</code> | states 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `terminalStates` | 属性 | <code>terminalStates: string[]</code> | terminal States 字段。 |
| `transitions` | 属性 | <code>transitions: FSMTransitionSpec[]</code> | transitions 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `FSMRecoveryDecisionRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `decision` | 属性 | <code>decision: FSMRecoveryDecision</code> | decision 字段。 |
| `processId` | 属性 | <code>processId: string</code> | process Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | snapshot 字段。 |

## `FSMRuntimeCancelOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext: FSMGuardContext</code> | guard Context 字段。 |
| `guardEvaluator` | 方法 | <code>guardEvaluator(guard: string, context: FSMGuardContext): boolean</code> | guard Evaluator 的公开运行时操作。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |
| `policy` | 属性 | <code>policy: PolicyEngine</code> | policy 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `FSMRuntimeOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `onRecoveryDecision` | 方法 | <code>onRecoveryDecision(record: FSMRecoveryDecisionRecord): Promise&lt;void&gt; &#124; void</code> | 处理 Recovery Decision。 |
| `onStateEntered` | 方法 | <code>onStateEntered(record: FSMStateEnteredRecord): Promise&lt;void&gt; &#124; void</code> | 处理 State Entered。 |
| `onTransition` | 方法 | <code>onTransition(record: StateTransition): Promise&lt;void&gt; &#124; void</code> | 处理 Transition。 |
| `policy` | 属性 | <code>policy: PolicyEngine</code> | policy 字段。 |

## `FSMRuntimeTransitionOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext: FSMGuardContext</code> | guard Context 字段。 |
| `guardEvaluator` | 方法 | <code>guardEvaluator(guard: string, context: FSMGuardContext): boolean</code> | guard Evaluator 的公开运行时操作。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |
| `policy` | 属性 | <code>policy: PolicyEngine</code> | policy 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |

## `FSMSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `currentState` | 属性 | <code>currentState: string</code> | current State 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `processId` | 属性 | <code>processId: string</code> | process Id 字段。 |
| `recovery` | 属性 | <code>recovery: FSMRecoverySnapshot</code> | recovery 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `statePath` | 属性 | <code>statePath: string[]</code> | state Path 字段。 |
| `status` | 属性 | <code>status: "running" &#124; FsmTerminalStatus</code> | status 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `FSMStateEnteredRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enteredAt` | 属性 | <code>enteredAt: string</code> | entered At 字段。 |
| `fromState` | 属性 | <code>fromState: string</code> | from State 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `processId` | 属性 | <code>processId: string</code> | process Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | snapshot 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |

## `FSMStateSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `entryAction` | 属性 | <code>entryAction: string</code> | entry Action 字段。 |
| `exitAction` | 属性 | <code>exitAction: string</code> | exit Action 字段。 |
| `humanReviewPolicy` | 属性 | <code>humanReviewPolicy: HumanReviewPolicySpec</code> | human Review Policy 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `kind` | 属性 | <code>kind: FSMStateKind</code> | kind 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `retryPolicy` | 属性 | <code>retryPolicy: RetryPolicySpec</code> | retry Policy 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy: TimeoutPolicySpec</code> | timeout Policy 字段。 |
| `traceEvents` | 属性 | <code>traceEvents: string[]</code> | trace Events 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `FSMTimeoutEvaluation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `action` | 属性 | <code>action: NonNullable&lt;"fail" &#124; "retry" &#124; "human_review"&gt;</code> | action 字段。 |
| `elapsedMs` | 属性 | <code>elapsedMs: number</code> | elapsed Ms 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `timedOut` | 属性 | <code>timedOut: boolean</code> | timed Out 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |

## `FSMTopologyAnalysis` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cycleStates` | 属性 | <code>cycleStates: string[]</code> | cycle States 字段。 |
| `deadEndStates` | 属性 | <code>deadEndStates: string[]</code> | dead End States 字段。 |
| `initialState` | 属性 | <code>initialState: string</code> | initial State 字段。 |
| `reachableStates` | 属性 | <code>reachableStates: string[]</code> | reachable States 字段。 |
| `unreachableStates` | 属性 | <code>unreachableStates: string[]</code> | unreachable States 字段。 |

## `FSMTransitionOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `guardContext` | 属性 | <code>guardContext: FSMGuardContext</code> | guard Context 字段。 |
| `guardEvaluator` | 方法 | <code>guardEvaluator(guard: string, context: FSMGuardContext): boolean</code> | guard Evaluator 的公开运行时操作。 |
| `now` | 属性 | <code>now: string</code> | now 字段。 |

## `FSMTransitionSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `from` | 属性 | <code>from: string</code> | from 字段。 |
| `guard` | 属性 | <code>guard: string</code> | guard 字段。 |
| `to` | 属性 | <code>to: string</code> | to 字段。 |
| `traceEvent` | 属性 | <code>traceEvent: string</code> | trace Event 字段。 |

## `StateTransition` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptedAt` | 属性 | <code>acceptedAt: string</code> | accepted At 字段。 |
| `from` | 属性 | <code>from: string</code> | from 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `processId` | 属性 | <code>processId: string</code> | process Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | snapshot 字段。 |
| `to` | 属性 | <code>to: string</code> | to 字段。 |
| `transition` | 属性 | <code>transition: FSMTransitionSpec</code> | transition 字段。 |
