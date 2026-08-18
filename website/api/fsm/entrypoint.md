# `@codesoul-co/hypha-fsm` / `index`

- Package index: [`@codesoul-co/hypha-fsm`](/api/fsm)
- Package guide: [learning and composition guide](/packages/fsm)
- Source: [`packages/fsm/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/fsm/src/index.ts)
- Exports: **50**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `FSMRuntime` | class | <code>new FSMRuntime(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | Runtime implementation for FSM Runtime; see its public constructor and members below. |
| `defaultReActFSMProcessSpec` | constant | <code>const defaultReActFSMProcessSpec: FSMProcessSpec</code> | default Re Act FSM Process Spec constant exported by the `index` module. |
| `fsmProcessSpecDefinition` | constant | <code>const fsmProcessSpecDefinition: SpecSchemaDefinition&lt;FSMProcessSpec&gt;</code> | Runtime validation entrypoint for the fsm Process spec, combining its parser, example and JSON Schema. |
| `fsmProcessSpecExample` | constant | <code>const fsmProcessSpecExample: FSMProcessSpec</code> | Valid example value for fsm Process Spec. |
| `fsmProcessSpecJsonSchema` | constant | <code>const fsmProcessSpecJsonSchema: JsonSchema</code> | JSON Schema for fsm Process Spec. |
| `fsmProcessSpecSchema` | constant | <code>const fsmProcessSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; states: z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodOptional&lt;z....</code> | Runtime schema for fsm Process Spec. |
| `fsmSpecDefinitions` | constant | <code>const fsmSpecDefinitions: readonly [SpecSchemaDefinition&lt;FSMProcessSpec&gt;]</code> | fsm Spec Definitions constant exported by the `index` module. |
| `fsmSpecJsonSchemas` | constant | <code>const fsmSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | fsm Spec Json Schemas constant exported by the `index` module. |
| `fsmStateSpecSchema` | constant | <code>const fsmStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; kind: z.ZodOptional&lt;z.ZodEnum&lt;["idle", "run_initialized", "context_built", "reasoning", "action_selected", "poli...</code> | Runtime schema for fsm State Spec. |
| `fsmTransitionSpecSchema` | constant | <code>const fsmTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; traceEvent: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; traceEvent?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?...</code> | Runtime schema for fsm Transition Spec. |
| `HARNESS_FSM_STATE_IDS` | constant | <code>const HARNESS_FSM_STATE_IDS: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Recovering", "Compensating", "Quarantined", "HumanReview", "Completed", "Failed", "Cancelled"]</code> | Stable Harness states owned by the framework runtime. Domain Packs may bind capabilities and policy to these phases, but must not add, remove, rename, or reconnect them. |
| `HARNESS_STATE_CAPABILITY_AREA` | constant | <code>const HARNESS_STATE_CAPABILITY_AREA: Readonly&lt;Record&lt;"Idle" &#124; "RunInitialized" &#124; "ContextBuilt" &#124; "Reasoning" &#124; "ActionSelected" &#124; "PolicyChecked" &#124; "Acting" &#124; "ObservationRecorded" &#124; "Verifying" &#124; "MemorySync" &#124; "Recovering" &#124; "Compensating" &#124; "Quarantined" &#124; "HumanReview" &#124; "Completed" &#124; "Failed" &#124; "Cancelled", HarnessCapabilityArea&gt;&gt;</code> | `activity` is the governed side-effect phase shared by Tool, MCP, Execution, file, Memory-write, and external-write adapters. The concrete activity type remains Event evidence; it never becomes a Domain-defined FSM state. |
| `REACT_FSM_STATE_PATH` | constant | <code>const REACT_FSM_STATE_PATH: readonly ["Idle", "RunInitialized", "ContextBuilt", "Reasoning", "ActionSelected", "PolicyChecked", "Acting", "ObservationRecorded", "Verifying", "MemorySync", "Completed"]</code> | REACT FSM STATE PATH constant exported by the `index` module. |
| `REACT_PHASE_TO_HARNESS_STATE` | constant | <code>const REACT_PHASE_TO_HARNESS_STATE: Readonly&lt;{ reason: "Reasoning"; select_action: "ActionSelected"; policy_check: "PolicyChecked"; act: "Acting"; observe_result: "ObservationRecorded"; verify: "Verifying"; memory_sync: "MemorySync"; complete: "Completed"; fail: "Failed"; human_review: "HumanReview"; cancel: "Cancelled"; }&gt;</code> | REACT PHASE TO HARNESS STATE constant exported by the `index` module. |
| `analyzeFSMTopology` | function | <code>analyzeFSMTopology(spec: FSMProcessSpec): FSMTopologyAnalysis</code> | Describes graph properties without imposing product-specific topology rules. Callers can decide whether unreachable states, non-terminal dead ends, or cycles are valid for their Domain workflow. |
| `applyTransition` | function | <code>applyTransition(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, nowOrOptions?: string &#124; FSMTransitionOptions): FSMSnapshot</code> | Applies Transition at this module boundary. |
| `applyTransitionWithRuntimePolicy` | function | <code>applyTransitionWithRuntimePolicy(spec: FSMProcessSpec, snapshot: FSMSnapshot, to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;FSMSnapshot&gt;</code> | Applies Transition With Runtime Policy at this module boundary. |
| `assertHarnessFSMProcessSpec` | function | <code>assertHarnessFSMProcessSpec(spec: FSMProcessSpec): void</code> | Fails closed when an application or Domain Pack attempts to replace the Harness capability topology with a product workflow. |
| `canRetryState` | function | <code>canRetryState(spec: FSMProcessSpec, stateId: string, attemptedCount: number): boolean</code> | Checks whether it can Retry State at this module boundary. |
| `createHarnessFSMProcessSpec` | function | <code>createHarnessFSMProcessSpec(): FSMProcessSpec</code> | Returns an isolated copy so composition code cannot mutate the shared contract. |
| `createInitialSnapshot` | function | <code>createInitialSnapshot(spec: FSMProcessSpec, runId: string, now?: string): FSMSnapshot</code> | Creates Initial Snapshot at this module boundary. |
| `evaluateGuardExpression` | function | <code>evaluateGuardExpression(guard: string, context?: FSMGuardContext): boolean</code> | Evaluates Guard Expression at this module boundary. |
| `evaluateStateTimeout` | function | <code>evaluateStateTimeout(spec: FSMProcessSpec, snapshot: FSMSnapshot, now?: string): FSMTimeoutEvaluation &#124; null</code> | Evaluates State Timeout at this module boundary. |
| `getAllowedTransitions` | function | <code>getAllowedTransitions(spec: FSMProcessSpec, stateId: string): FSMTransitionSpec[]</code> | Gets Allowed Transitions at this module boundary. |
| `harnessStateForReActPhase` | function | <code>harnessStateForReActPhase(phase: string): HarnessFSMStateId &#124; undefined</code> | Public runtime operation for harness State For Re Act Phase. |
| `isHarnessFSMProcessSpec` | function | <code>isHarnessFSMProcessSpec(spec: FSMProcessSpec): boolean</code> | Returns false for either an invalid process or a valid non-Harness topology. |
| `isHarnessFSMStateId` | function | <code>isHarnessFSMStateId(value: string): value is HarnessFSMStateId</code> | Checks Harness FSM State Id at this module boundary. |
| `parseFSMProcessSpec` | function | <code>parseFSMProcessSpec(input: unknown): FSMProcessSpec</code> | Parses and validates FSM Process Spec at this module boundary. |
| `planHarnessCapabilityPath` | function | <code>planHarnessCapabilityPath(from: HarnessFSMStateId, to: HarnessFSMStateId): HarnessFSMStateId[]</code> | Plans only normal capability movement. Recovery, compensation, quarantine, human review, failure, and cancellation are selected by their dedicated supervisors and can never be traversed as a shortcut for Domain work. |
| `validateFSMProcessSpec` | function | <code>validateFSMProcessSpec(spec: FSMProcessSpec): void</code> | Validates FSM Process Spec at this module boundary. |
| `validateFSMSnapshot` | function | <code>validateFSMSnapshot(spec: FSMProcessSpec, snapshot: FSMSnapshot, expectedRunId?: string): void</code> | Validates FSM Snapshot at this module boundary. |
| `FSMGuardContext` | interface | <code>interface FSMGuardContext</code> | Field contract for FSM Guard Context; see all contract members below. |
| `FSMProcessSpec` | interface | <code>interface FSMProcessSpec extends VersionedSpec, SpecMetadata</code> | Field contract for FSM Process Spec; see all contract members below. |
| `FSMRecoveryDecisionRecord` | interface | <code>interface FSMRecoveryDecisionRecord</code> | Field contract for FSM Recovery Decision Record; see all contract members below. |
| `FSMRuntimeCancelOptions` | interface | <code>interface FSMRuntimeCancelOptions extends FSMRuntimeTransitionOptions</code> | Field contract for FSM Runtime Cancel Options; see all contract members below. |
| `FSMRuntimeOptions` | interface | <code>interface FSMRuntimeOptions</code> | Field contract for FSM Runtime Options; see all contract members below. |
| `FSMRuntimeTransitionOptions` | interface | <code>interface FSMRuntimeTransitionOptions extends FSMTransitionOptions</code> | Field contract for FSM Runtime Transition Options; see all contract members below. |
| `FSMSnapshot` | interface | <code>interface FSMSnapshot</code> | Field contract for FSM Snapshot; see all contract members below. |
| `FSMStateEnteredRecord` | interface | <code>interface FSMStateEnteredRecord</code> | Field contract for FSM State Entered Record; see all contract members below. |
| `FSMStateSpec` | interface | <code>interface FSMStateSpec extends SpecMetadata</code> | Field contract for FSM State Spec; see all contract members below. |
| `FSMTimeoutEvaluation` | interface | <code>interface FSMTimeoutEvaluation</code> | Field contract for FSM Timeout Evaluation; see all contract members below. |
| `FSMTopologyAnalysis` | interface | <code>interface FSMTopologyAnalysis</code> | Field contract for FSM Topology Analysis; see all contract members below. |
| `FSMTransitionOptions` | interface | <code>interface FSMTransitionOptions</code> | Field contract for FSM Transition Options; see all contract members below. |
| `FSMTransitionSpec` | interface | <code>interface FSMTransitionSpec</code> | Field contract for FSM Transition Spec; see all contract members below. |
| `StateTransition` | interface | <code>interface StateTransition</code> | Field contract for State Transition; see all contract members below. |
| `FSMGuardEvaluator` | type | <code>type FSMGuardEvaluator = (guard: string, context: FSMGuardContext) =&gt; boolean</code> | Public type alias for FSM Guard Evaluator. |
| `FSMStateKind` | type | <code>type FSMStateKind = 'idle' &#124; 'run_initialized' &#124; 'context_built' &#124; 'reasoning' &#124; 'action_selected' &#124; 'policy_checked' &#124; 'acting' &#124; 'observation_recorded' &#124; 'verifying' &#124; 'memory_sync' &#124; 'recovering' &#124; 'compensating' &#124; 'quarantined' &#124; 'human_review' &#124; 'completed' &#124; 'failed' &#124; 'cancelled' &#124; 'domain'</code> | Public type alias for FSM State Kind. |
| `FsmTerminalStatus` | type | <code>type FsmTerminalStatus = 'completed' &#124; 'failed' &#124; 'cancelled'</code> | Public type alias for Fsm Terminal Status. |
| `HarnessCapabilityArea` | type | <code>type HarnessCapabilityArea = 'lifecycle' &#124; 'context' &#124; 'reasoning' &#124; 'policy' &#124; 'activity' &#124; 'observation' &#124; 'verification' &#124; 'memory' &#124; 'recovery' &#124; 'human_review' &#124; 'terminal'</code> | Public type alias for Harness Capability Area. |
| `HarnessFSMStateId` | type | <code>type HarnessFSMStateId = (typeof HARNESS_FSM_STATE_IDS)[number]</code> | Public type alias for Harness FSM State Id. |

## `FSMRuntime` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(options?: FSMRuntimeCancelOptions): Promise&lt;StateTransition&gt;</code> | Cancels cancel at this module boundary. |
| `constructor` | constructor | <code>(spec: FSMProcessSpec, runId: string, options?: FSMRuntimeOptions, snapshot?: FSMSnapshot): FSMRuntime</code> | Creates an instance of this class. |
| `decideRecovery` | method | <code>decideRecovery(anomaly: FSMAnomaly, options?: { stateId?: string; now?: string; }): Promise&lt;FSMRecoveryDecision&gt;</code> | Decides Recovery at this module boundary. |
| `getSnapshot` | method | <code>getSnapshot(): FSMSnapshot</code> | Gets Snapshot at this module boundary. |
| `registerRecoverySuccess` | method | <code>registerRecoverySuccess(circuitKey: string, now?: string): FSMSnapshot</code> | Registers Recovery Success at this module boundary. |
| `start` | method | <code>start(metadata?: Record&lt;string, unknown&gt;): Promise&lt;FSMSnapshot&gt;</code> | Starts start at this module boundary. |
| `transition` | method | <code>transition(to: string, options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition&gt;</code> | Transitions transition at this module boundary. |
| `transitionPath` | method | <code>transitionPath(states: string[], options?: FSMRuntimeTransitionOptions): Promise&lt;StateTransition[]&gt;</code> | Transitions Path at this module boundary. |

## `FSMGuardContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `input` | property | <code>input: unknown</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `variables` | property | <code>variables: Record&lt;string, unknown&gt;</code> | Public variables property. |

## `FSMProcessSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `initialState` | property | <code>initialState: string</code> | Public initial State property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `recoveryPolicy` | property | <code>recoveryPolicy: FSMRecoveryPolicySpec</code> | Public recovery Policy property. |
| `states` | property | <code>states: FSMStateSpec[]</code> | Public states property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `terminalStates` | property | <code>terminalStates: string[]</code> | Public terminal States property. |
| `transitions` | property | <code>transitions: FSMTransitionSpec[]</code> | Public transitions property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `FSMRecoveryDecisionRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `decision` | property | <code>decision: FSMRecoveryDecision</code> | Public decision property. |
| `processId` | property | <code>processId: string</code> | Public process Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public snapshot property. |

## `FSMRuntimeCancelOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext: FSMGuardContext</code> | Public guard Context property. |
| `guardEvaluator` | method | <code>guardEvaluator(guard: string, context: FSMGuardContext): boolean</code> | Public runtime operation for guard Evaluator. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `now` | property | <code>now: string</code> | Public now property. |
| `policy` | property | <code>policy: PolicyEngine</code> | Public policy property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `FSMRuntimeOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `onRecoveryDecision` | method | <code>onRecoveryDecision(record: FSMRecoveryDecisionRecord): Promise&lt;void&gt; &#124; void</code> | Handles Recovery Decision at this module boundary. |
| `onStateEntered` | method | <code>onStateEntered(record: FSMStateEnteredRecord): Promise&lt;void&gt; &#124; void</code> | Handles State Entered at this module boundary. |
| `onTransition` | method | <code>onTransition(record: StateTransition): Promise&lt;void&gt; &#124; void</code> | Handles Transition at this module boundary. |
| `policy` | property | <code>policy: PolicyEngine</code> | Public policy property. |

## `FSMRuntimeTransitionOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext: FSMGuardContext</code> | Public guard Context property. |
| `guardEvaluator` | method | <code>guardEvaluator(guard: string, context: FSMGuardContext): boolean</code> | Public runtime operation for guard Evaluator. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `now` | property | <code>now: string</code> | Public now property. |
| `policy` | property | <code>policy: PolicyEngine</code> | Public policy property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |

## `FSMSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `currentState` | property | <code>currentState: string</code> | Public current State property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `processId` | property | <code>processId: string</code> | Public process Id property. |
| `recovery` | property | <code>recovery: FSMRecoverySnapshot</code> | Public recovery property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `statePath` | property | <code>statePath: string[]</code> | Public state Path property. |
| `status` | property | <code>status: "running" &#124; FsmTerminalStatus</code> | Public status property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `FSMStateEnteredRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enteredAt` | property | <code>enteredAt: string</code> | Public entered At property. |
| `fromState` | property | <code>fromState: string</code> | Public from State property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `processId` | property | <code>processId: string</code> | Public process Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public snapshot property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |

## `FSMStateSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `entryAction` | property | <code>entryAction: string</code> | Public entry Action property. |
| `exitAction` | property | <code>exitAction: string</code> | Public exit Action property. |
| `humanReviewPolicy` | property | <code>humanReviewPolicy: HumanReviewPolicySpec</code> | Public human Review Policy property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `kind` | property | <code>kind: FSMStateKind</code> | Public kind property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `retryPolicy` | property | <code>retryPolicy: RetryPolicySpec</code> | Public retry Policy property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `timeoutPolicy` | property | <code>timeoutPolicy: TimeoutPolicySpec</code> | Public timeout Policy property. |
| `traceEvents` | property | <code>traceEvents: string[]</code> | Public trace Events property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `FSMTimeoutEvaluation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `action` | property | <code>action: NonNullable&lt;"fail" &#124; "retry" &#124; "human_review"&gt;</code> | Public action property. |
| `elapsedMs` | property | <code>elapsedMs: number</code> | Public elapsed Ms property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `timedOut` | property | <code>timedOut: boolean</code> | Public timed Out property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |

## `FSMTopologyAnalysis` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cycleStates` | property | <code>cycleStates: string[]</code> | Public cycle States property. |
| `deadEndStates` | property | <code>deadEndStates: string[]</code> | Public dead End States property. |
| `initialState` | property | <code>initialState: string</code> | Public initial State property. |
| `reachableStates` | property | <code>reachableStates: string[]</code> | Public reachable States property. |
| `unreachableStates` | property | <code>unreachableStates: string[]</code> | Public unreachable States property. |

## `FSMTransitionOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `guardContext` | property | <code>guardContext: FSMGuardContext</code> | Public guard Context property. |
| `guardEvaluator` | method | <code>guardEvaluator(guard: string, context: FSMGuardContext): boolean</code> | Public runtime operation for guard Evaluator. |
| `now` | property | <code>now: string</code> | Public now property. |

## `FSMTransitionSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description: string</code> | Public description property. |
| `from` | property | <code>from: string</code> | Public from property. |
| `guard` | property | <code>guard: string</code> | Public guard property. |
| `to` | property | <code>to: string</code> | Public to property. |
| `traceEvent` | property | <code>traceEvent: string</code> | Public trace Event property. |

## `StateTransition` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptedAt` | property | <code>acceptedAt: string</code> | Public accepted At property. |
| `from` | property | <code>from: string</code> | Public from property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `processId` | property | <code>processId: string</code> | Public process Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public snapshot property. |
| `to` | property | <code>to: string</code> | Public to property. |
| `transition` | property | <code>transition: FSMTransitionSpec</code> | Public transition property. |
