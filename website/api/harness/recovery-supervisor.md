# `@codesoul-co/hypha-harness` / `recovery-supervisor`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/recovery-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `runRecoverySupervisor` | function | <code>runRecoverySupervisor(options: RecoverySupervisorOptions): Promise&lt;RecoverySupervisorResult&gt;</code> | Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated. |
| `RecoveryParticipant` | interface | <code>interface RecoveryParticipant</code> | Field contract for Recovery Participant; see all contract members below. |
| `RecoveryParticipantContext` | interface | <code>interface RecoveryParticipantContext</code> | Field contract for Recovery Participant Context; see all contract members below. |
| `RecoveryParticipantResult` | interface | <code>interface RecoveryParticipantResult</code> | Field contract for Recovery Participant Result; see all contract members below. |
| `RecoverySupervisorOptions` | interface | <code>interface RecoverySupervisorOptions</code> | Field contract for Recovery Supervisor Options; see all contract members below. |
| `RecoverySupervisorResult` | interface | <code>interface RecoverySupervisorResult</code> | Field contract for Recovery Supervisor Result; see all contract members below. |
| `RecoverySupervisorScheduler` | interface | <code>interface RecoverySupervisorScheduler</code> | Field contract for Recovery Supervisor Scheduler; see all contract members below. |
| `RecoveryParticipantAction` | type | <code>type RecoveryParticipantAction = (context: RecoveryParticipantContext) =&gt; Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public type alias for Recovery Participant Action. |

## `RecoveryParticipant` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `classify` | method | <code>classify(error: unknown, context: RecoveryParticipantContext): RecoveryFailure &#124; Promise&lt;RecoveryFailure&gt;</code> | Public runtime operation for classify. |
| `compensate` | method | <code>compensate(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public runtime operation for compensate. |
| `degrade` | method | <code>degrade(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public runtime operation for degrade. |
| `dependsOn` | property | <code>dependsOn: string[]</code> | Public depends On property. |
| `execute` | method | <code>execute(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public runtime operation for execute. |
| `fallback` | method | <code>fallback(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public runtime operation for fallback. |
| `id` | property | <code>id: string</code> | Public id property. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public module property. |
| `reconcile` | method | <code>reconcile(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Public runtime operation for reconcile. |

## `RecoveryParticipantContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `caseId` | property | <code>caseId: string</code> | Public case Id property. |
| `cycle` | property | <code>cycle: number</code> | Public cycle property. |
| `failure` | property | <code>failure: RecoveryFailure</code> | Public failure property. |
| `module` | property | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | Public module property. |
| `outputs` | property | <code>outputs: Readonly&lt;Record&lt;string, unknown&gt;&gt;</code> | Public outputs property. |
| `participantId` | property | <code>participantId: string</code> | Public participant Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scope` | property | <code>scope: RecoveryKnowledgeScope</code> | Public scope property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `snapshot` | property | <code>snapshot: Readonly&lt;RecoveryCaseSnapshot&gt;</code> | Public snapshot property. |

## `RecoveryParticipantResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evidence` | property | <code>evidence: RecoveryEvidence</code> | Public evidence property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `output` | property | <code>output: TOutput</code> | Public output property. |

## `RecoverySupervisorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `caseId` | property | <code>caseId: string</code> | Public case Id property. |
| `domainPackId` | property | <code>domainPackId: string</code> | Public domain Pack Id property. |
| `fsm` | property | <code>fsm: FSMRuntime</code> | Public fsm property. |
| `knowledge` | property | <code>knowledge: RecoveryKnowledgePort</code> | Public knowledge property. |
| `maxInlineDelayMs` | property | <code>maxInlineDelayMs: number</code> | Public max Inline Delay Ms property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `participants` | property | <code>participants: RecoveryParticipant&lt;unknown&gt;[]</code> | Public participants property. |
| `policy` | property | <code>policy: Partial&lt;RecoveryConvergencePolicy&gt;</code> | Public policy property. |
| `scheduler` | property | <code>scheduler: RecoverySupervisorScheduler</code> | Public scheduler property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `trace` | property | <code>trace: TraceRecorder</code> | Public trace property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `RecoverySupervisorResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `error` | property | <code>error: unknown</code> | Public error property. |
| `failure` | property | <code>failure: RecoveryFailure</code> | Public failure property. |
| `outputs` | property | <code>outputs: Record&lt;string, unknown&gt;</code> | Public outputs property. |
| `snapshot` | property | <code>snapshot: RecoveryCaseSnapshot</code> | Public snapshot property. |
| `status` | property | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "quarantined" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | Public status property. |

## `RecoverySupervisorScheduler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `wait` | method | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | Public runtime operation for wait. |
