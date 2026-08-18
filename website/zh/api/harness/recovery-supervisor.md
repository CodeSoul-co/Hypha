# `@codesoul-co/hypha-harness` / `recovery-supervisor`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/recovery-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/recovery-supervisor.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `runRecoverySupervisor` | 函数 | <code>runRecoverySupervisor(options: RecoverySupervisorOptions): Promise&lt;RecoverySupervisorResult&gt;</code> | Runs a dependency-ordered, FSM-governed recovery workflow. A participant is retried only while its evidence changes or the bounded strategy budget has not been exhausted. Completed upstream participants are not repeated. |
| `RecoveryParticipant` | 接口 | <code>interface RecoveryParticipant</code> | Recovery Participant 的字段契约；完整字段见下表。 |
| `RecoveryParticipantContext` | 接口 | <code>interface RecoveryParticipantContext</code> | Recovery Participant Context 的字段契约；完整字段见下表。 |
| `RecoveryParticipantResult` | 接口 | <code>interface RecoveryParticipantResult</code> | Recovery Participant Result 的字段契约；完整字段见下表。 |
| `RecoverySupervisorOptions` | 接口 | <code>interface RecoverySupervisorOptions</code> | Recovery Supervisor Options 的字段契约；完整字段见下表。 |
| `RecoverySupervisorResult` | 接口 | <code>interface RecoverySupervisorResult</code> | Recovery Supervisor Result 的字段契约；完整字段见下表。 |
| `RecoverySupervisorScheduler` | 接口 | <code>interface RecoverySupervisorScheduler</code> | Recovery Supervisor Scheduler 的字段契约；完整字段见下表。 |
| `RecoveryParticipantAction` | 类型 | <code>type RecoveryParticipantAction = (context: RecoveryParticipantContext) =&gt; Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | Recovery Participant Action 的公共类型别名。 |

## `RecoveryParticipant` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `classify` | 方法 | <code>classify(error: unknown, context: RecoveryParticipantContext): RecoveryFailure &#124; Promise&lt;RecoveryFailure&gt;</code> | classify 的公开运行时操作。 |
| `compensate` | 方法 | <code>compensate(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | compensate 的公开运行时操作。 |
| `degrade` | 方法 | <code>degrade(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | degrade 的公开运行时操作。 |
| `dependsOn` | 属性 | <code>dependsOn: string[]</code> | depends On 字段。 |
| `execute` | 方法 | <code>execute(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | execute 的公开运行时操作。 |
| `fallback` | 方法 | <code>fallback(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | fallback 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | module 字段。 |
| `reconcile` | 方法 | <code>reconcile(context: RecoveryParticipantContext): Promise&lt;RecoveryParticipantResult&lt;TOutput&gt;&gt;</code> | reconcile 的公开运行时操作。 |

## `RecoveryParticipantContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `caseId` | 属性 | <code>caseId: string</code> | case Id 字段。 |
| `cycle` | 属性 | <code>cycle: number</code> | cycle 字段。 |
| `failure` | 属性 | <code>failure: RecoveryFailure</code> | failure 字段。 |
| `module` | 属性 | <code>module: "memory" &#124; "domain" &#124; "mcp" &#124; "policy" &#124; "workspace" &#124; "tool" &#124; "unknown" &#124; "execution" &#124; "fsm" &#124; "inference" &#124; "storage" &#124; "message_bus" &#124; "cache"</code> | module 字段。 |
| `outputs` | 属性 | <code>outputs: Readonly&lt;Record&lt;string, unknown&gt;&gt;</code> | outputs 字段。 |
| `participantId` | 属性 | <code>participantId: string</code> | participant Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scope` | 属性 | <code>scope: RecoveryKnowledgeScope</code> | scope 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `snapshot` | 属性 | <code>snapshot: Readonly&lt;RecoveryCaseSnapshot&gt;</code> | snapshot 字段。 |

## `RecoveryParticipantResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evidence` | 属性 | <code>evidence: RecoveryEvidence</code> | evidence 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: TOutput</code> | output 字段。 |

## `RecoverySupervisorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `caseId` | 属性 | <code>caseId: string</code> | case Id 字段。 |
| `domainPackId` | 属性 | <code>domainPackId: string</code> | domain Pack Id 字段。 |
| `fsm` | 属性 | <code>fsm: FSMRuntime</code> | fsm 字段。 |
| `knowledge` | 属性 | <code>knowledge: RecoveryKnowledgePort</code> | knowledge 字段。 |
| `maxInlineDelayMs` | 属性 | <code>maxInlineDelayMs: number</code> | max Inline Delay Ms 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `participants` | 属性 | <code>participants: RecoveryParticipant&lt;unknown&gt;[]</code> | participants 字段。 |
| `policy` | 属性 | <code>policy: Partial&lt;RecoveryConvergencePolicy&gt;</code> | policy 字段。 |
| `scheduler` | 属性 | <code>scheduler: RecoverySupervisorScheduler</code> | scheduler 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `trace` | 属性 | <code>trace: TraceRecorder</code> | trace 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `RecoverySupervisorResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `error` | 属性 | <code>error: unknown</code> | error 字段。 |
| `failure` | 属性 | <code>failure: RecoveryFailure</code> | failure 字段。 |
| `outputs` | 属性 | <code>outputs: Record&lt;string, unknown&gt;</code> | outputs 字段。 |
| `snapshot` | 属性 | <code>snapshot: RecoveryCaseSnapshot</code> | snapshot 字段。 |
| `status` | 属性 | <code>status: "degraded" &#124; "cancelled" &#124; "failed" &#124; "quarantined" &#124; "succeeded" &#124; "suspended" &#124; "compensated"</code> | status 字段。 |

## `RecoverySupervisorScheduler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `wait` | 方法 | <code>wait(delayMs: number, decision: FSMRecoveryDecision, signal?: AbortSignal): Promise&lt;void&gt;</code> | wait 的公开运行时操作。 |
