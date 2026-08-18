# `@codesoul-co/hypha-harness` / `long-horizon-react-supervisor`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/long-horizon-react-supervisor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/long-horizon-react-supervisor.ts)
- Exports: **15**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LongHorizonReActSupervisor` | class | <code>new LongHorizonReActSupervisor(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision. |
| `ServerIngressReActContinuationScheduler` | class | <code>new ServerIngressReActContinuationScheduler(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation. |
| `reActContinuationIdempotencyKey` | function | <code>reActContinuationIdempotencyKey(input: ContinueReActCommandPayloadV1): string</code> | Public runtime operation for re Act Continuation Idempotency Key. |
| `CoordinateReActQuantumResultInput` | interface | <code>interface CoordinateReActQuantumResultInput</code> | Field contract for Coordinate Re Act Quantum Result Input; see all contract members below. |
| `EnqueueReActContinuationCommandRequest` | interface | <code>interface EnqueueReActContinuationCommandRequest</code> | Field contract for Enqueue Re Act Continuation Command Request; see all contract members below. |
| `LongHorizonReActQuantumInput` | interface | <code>interface LongHorizonReActQuantumInput</code> | Field contract for Long Horizon Re Act Quantum Input; see all contract members below. |
| `LongHorizonReActQuantumResult` | interface | <code>interface LongHorizonReActQuantumResult</code> | Field contract for Long Horizon Re Act Quantum Result; see all contract members below. |
| `LongHorizonReActSupervisorOptions` | interface | <code>interface LongHorizonReActSupervisorOptions</code> | Field contract for Long Horizon Re Act Supervisor Options; see all contract members below. |
| `ReActContinuationCommandIngress` | interface | <code>interface ReActContinuationCommandIngress</code> | Field contract for Re Act Continuation Command Ingress; see all contract members below. |
| `ReActContinuationIntent` | interface | <code>interface ReActContinuationIntent</code> | Field contract for Re Act Continuation Intent; see all contract members below. |
| `ReActContinuationScheduler` | interface | <code>interface ReActContinuationScheduler</code> | Field contract for Re Act Continuation Scheduler; see all contract members below. |
| `ReActContinuationScheduleRequest` | interface | <code>interface ReActContinuationScheduleRequest</code> | Field contract for Re Act Continuation Schedule Request; see all contract members below. |
| `ReActContinuationScheduleResult` | interface | <code>interface ReActContinuationScheduleResult</code> | Field contract for Re Act Continuation Schedule Result; see all contract members below. |
| `ServerIngressReActContinuationSchedulerOptions` | interface | <code>interface ServerIngressReActContinuationSchedulerOptions</code> | Field contract for Server Ingress Re Act Continuation Scheduler Options; see all contract members below. |
| `LongHorizonReActDisposition` | type | <code>type LongHorizonReActDisposition = 'completed' &#124; 'continuation_scheduled' &#124; 'continuation_required' &#124; 'waiting_human' &#124; 'cancelled' &#124; 'failed'</code> | Public type alias for Long Horizon Re Act Disposition. |

## `LongHorizonReActSupervisor` public members

Executes exactly one bounded ReAct quantum. It never hides an unbounded loop. A retryable quantum boundary is handed to a durable scheduler; global budget, deadline, and non-progress boundaries require an explicit operator/workflow decision.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LongHorizonReActSupervisorOptions): LongHorizonReActSupervisor</code> | Creates an instance of this class. |
| `coordinateResult` | method | <code>coordinateResult(input: CoordinateReActQuantumResultInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | Public runtime operation for coordinate Result. |
| `runQuantum` | method | <code>runQuantum(input: LongHorizonReActQuantumInput): Promise&lt;LongHorizonReActQuantumResult&gt;</code> | Public runtime operation for run Quantum. |

## `ServerIngressReActContinuationScheduler` public members

Sends a complete continuation envelope through the Server command ingress. The ingress owns payload persistence and Queue reference/hash generation.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ServerIngressReActContinuationSchedulerOptions): ServerIngressReActContinuationScheduler</code> | Creates an instance of this class. |
| `schedule` | method | <code>schedule(input: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | Public runtime operation for schedule. |

## `CoordinateReActQuantumResultInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `continuation` | property | <code>continuation: ReActContinuationIntent</code> | Public continuation property. |
| `react` | property | <code>react: ReActRunResult</code> | Public react property. |

## `EnqueueReActContinuationCommandRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `commandType` | property | <code>commandType: "continue_react"</code> | Public command Type property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `idempotencyKey` | property | <code>idempotencyKey: string</code> | Public idempotency Key property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `payload` | property | <code>payload: ContinueReActCommandPayloadV1</code> | Public payload property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `targetRunId` | property | <code>targetRunId: string</code> | Public target Run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `LongHorizonReActQuantumInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ReActRunContext</code> | Public context property. |
| `continuation` | property | <code>continuation: ReActContinuationIntent</code> | Public continuation property. |
| `control` | property | <code>control: ReActRunControl</code> | Public control property. |

## `LongHorizonReActQuantumResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: LongHorizonReActDisposition</code> | Public disposition property. |
| `react` | property | <code>react: ReActRunResult</code> | Public react property. |
| `scheduledTaskId` | property | <code>scheduledTaskId: string</code> | Public scheduled Task Id property. |
| `scheduleReused` | property | <code>scheduleReused: boolean</code> | Public schedule Reused property. |

## `LongHorizonReActSupervisorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `runner` | property | <code>runner: Pick&lt;ReActRunner, "run"&gt;</code> | Public runner property. |
| `scheduler` | property | <code>scheduler: ReActContinuationScheduler</code> | Public scheduler property. |

## `ReActContinuationCommandIngress` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `enqueue` | method | <code>enqueue(request: EnqueueReActContinuationCommandRequest): Promise&lt;Pick&lt;SessionCommandRecord, "id" &#124; "status"&gt;&gt;</code> | Public runtime operation for enqueue. |

## `ReActContinuationIntent` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `buildPayload` | method | <code>buildPayload(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): ContinueReActCommandPayloadV1 &#124; Promise&lt;ContinueReActCommandPayloadV1&gt;</code> | Builds Payload at this module boundary. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ReActContinuationScheduler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `schedule` | method | <code>schedule(request: ReActContinuationScheduleRequest): Promise&lt;ReActContinuationScheduleResult&gt;</code> | Public runtime operation for schedule. |

## `ReActContinuationScheduleRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `availableAt` | property | <code>availableAt: string</code> | Public available At property. |
| `maxAttempts` | property | <code>maxAttempts: number</code> | Public max Attempts property. |
| `payload` | property | <code>payload: ContinueReActCommandPayloadV1</code> | Public payload property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |
| `workspaceId` | property | <code>workspaceId: string</code> | Public workspace Id property. |

## `ReActContinuationScheduleResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |
| `taskId` | property | <code>taskId: string</code> | Public task Id property. |

## `ServerIngressReActContinuationSchedulerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ingress` | property | <code>ingress: ReActContinuationCommandIngress</code> | Public ingress property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
