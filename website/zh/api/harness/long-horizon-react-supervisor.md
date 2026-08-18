# `@codesoul-co/hypha-harness` / `long-horizon-react-supervisor`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/long-horizon-react-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)
- 导出数: **15**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LongHorizonReActSupervisor` | 类 | <code>new LongHorizonReActSupervisor(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision. |
| `ServerIngressReActContinuationScheduler` | 类 | <code>new ServerIngressReActContinuationScheduler(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation. |
| `reActContinuationIdempotencyKey` | 函数 | <code>reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string</code> | re Act Continuation Idempotency Key 的公开运行时操作。 |
| `CoordinateReActQuantumResultInput` | 接口 | <code>interface CoordinateReActQuantumResultInput</code> | Coordinate Re Act Quantum Result Input 的字段契约；完整字段见下表。 |
| `EnqueueReActContinuationCommandRequest` | 接口 | <code>interface EnqueueReActContinuationCommandRequest</code> | Enqueue Re Act Continuation Command Request 的字段契约；完整字段见下表。 |
| `LongHorizonReActQuantumInput` | 接口 | <code>interface LongHorizonReActQuantumInput</code> | Long Horizon Re Act Quantum Input 的字段契约；完整字段见下表。 |
| `LongHorizonReActQuantumResult` | 接口 | <code>interface LongHorizonReActQuantumResult</code> | Long Horizon Re Act Quantum Result 的字段契约；完整字段见下表。 |
| `LongHorizonReActSupervisorOptions` | 接口 | <code>interface LongHorizonReActSupervisorOptions</code> | Long Horizon Re Act Supervisor Options 的字段契约；完整字段见下表。 |
| `ReActContinuationCommandIngress` | 接口 | <code>interface ReActContinuationCommandIngress</code> | Re Act Continuation Command Ingress 的字段契约；完整字段见下表。 |
| `ReActContinuationIntent` | 接口 | <code>interface ReActContinuationIntent</code> | Re Act Continuation Intent 的字段契约；完整字段见下表。 |
| `ReActContinuationScheduler` | 接口 | <code>interface ReActContinuationScheduler</code> | Re Act Continuation Scheduler 的字段契约；完整字段见下表。 |
| `ReActContinuationScheduleRequest` | 接口 | <code>interface ReActContinuationScheduleRequest</code> | Re Act Continuation Schedule Request 的字段契约；完整字段见下表。 |
| `ReActContinuationScheduleResult` | 接口 | <code>interface ReActContinuationScheduleResult</code> | Re Act Continuation Schedule Result 的字段契约；完整字段见下表。 |
| `ServerIngressReActContinuationSchedulerOptions` | 接口 | <code>interface ServerIngressReActContinuationSchedulerOptions</code> | Server Ingress Re Act Continuation Scheduler Options 的字段契约；完整字段见下表。 |
| `LongHorizonReActDisposition` | 类型 | <code>type LongHorizonReActDisposition = 'completed' &#124; 'continuation_scheduled' &#124; 'continuation_required' &#124; 'waiting_human' &#124; 'cancelled' &#124; 'failed'</code> | Long Horizon Re Act Disposition 的公共类型别名。 |

## `LongHorizonReActSupervisor` 公开成员

Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | 创建该类的实例。 |
| `coordinateResult` | 方法 | <code>coordinateResult(input: CoordinateReActQuantumResultInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | coordinate Result 的公开运行时操作。 |
| `runQuantum` | 方法 | <code>runQuantum(input: LongHorizonReActQuantumInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | run Quantum 的公开运行时操作。 |

## `ServerIngressReActContinuationScheduler` 公开成员

Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | 创建该类的实例。 |
| `schedule` | 方法 | <code>schedule(input: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | schedule 的公开运行时操作。 |

## `CoordinateReActQuantumResultInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `continuation` | 属性 | <code>continuation: ReActContinuationIntent</code> | continuation 字段。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | react 字段。 |

## `EnqueueReActContinuationCommandRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `commandType` | 属性 | <code>commandType: "continue_react"</code> | command Type 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `idempotencyKey` | 属性 | <code>idempotencyKey: string</code> | idempotency Key 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `payload` | 属性 | <code>payload: ContinueReActCommandPayloadV1</code> | payload 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `targetRunId` | 属性 | <code>targetRunId: string</code> | target Run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `LongHorizonReActQuantumInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ReActRunContext</code> | context 字段。 |
| `continuation` | 属性 | <code>continuation: ReActContinuationIntent</code> | continuation 字段。 |
| `control` | 属性 | <code>control: ReActRunControl</code> | control 字段。 |

## `LongHorizonReActQuantumResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: LongHorizonReActDisposition</code> | disposition 字段。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | react 字段。 |
| `scheduledTaskId` | 属性 | <code>scheduledTaskId: string</code> | scheduled Task Id 字段。 |
| `scheduleReused` | 属性 | <code>scheduleReused: boolean</code> | schedule Reused 字段。 |

## `LongHorizonReActSupervisorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `runner` | 属性 | <code>runner: Pick&lt;ReActRunner, "run"&gt;</code> | runner 字段。 |
| `scheduler` | 属性 | <code>scheduler: ReActContinuationScheduler</code> | scheduler 字段。 |

## `ReActContinuationCommandIngress` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `enqueue` | 方法 | <code>enqueue(request: EnqueueReActContinuationCommandRequest): Promise&lt;Pick&lt;SessionCommandRecord, "id" &#124; "status"&gt;&gt;</code> | enqueue 的公开运行时操作。 |

## `ReActContinuationIntent` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `buildPayload` | 方法 | <code>buildPayload(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): ContinueReActCommandPayloadV1 &#124; Promise&lt;ContinueReActCommandPayloadV1&gt;</code> | 构建 Payload。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ReActContinuationScheduler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `schedule` | 方法 | <code>schedule(request: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | schedule 的公开运行时操作。 |

## `ReActContinuationScheduleRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `availableAt` | 属性 | <code>availableAt: string</code> | available At 字段。 |
| `maxAttempts` | 属性 | <code>maxAttempts: number</code> | max Attempts 字段。 |
| `payload` | 属性 | <code>payload: ContinueReActCommandPayloadV1</code> | payload 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |

## `ReActContinuationScheduleResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |
| `taskId` | 属性 | <code>taskId: string</code> | task Id 字段。 |

## `ServerIngressReActContinuationSchedulerOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ingress` | 属性 | <code>ingress: ReActContinuationCommandIngress</code> | ingress 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
