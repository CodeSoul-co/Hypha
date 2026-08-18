# `@codesoul-co/hypha-harness` / `react-quantum-executor`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/react-quantum-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)
- Exports: **19**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactReActContextSnapshotStore` | class | <code>new ArtifactReActContextSnapshotStore(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | Durable content-addressed Context snapshots selected by the checkpoint scope hash. |
| `ContinuationIdentityValidator` | class | <code>new ContinuationIdentityValidator(): ContinuationIdentityValidator</code> | Runtime implementation for Continuation Identity Validator; see its public constructor and members below. |
| `ReActQuantumExecutor` | class | <code>new ReActQuantumExecutor(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence. |
| `REACT_CONTEXT_SNAPSHOT_VERSION` | constant | <code>const REACT_CONTEXT_SNAPSHOT_VERSION: "1.0.0"</code> | REACT CONTEXT SNAPSHOT VERSION constant exported by the `react-quantum-executor` module. |
| `createContinuationReActQuantumDescriptor` | function | <code>createContinuationReActQuantumDescriptor(command: Readonly&lt;SessionCommandRecord&gt;, input: unknown): ContinuationReActQuantumDescriptor</code> | Creates Continuation Re Act Quantum Descriptor at this module boundary. |
| `ArtifactReActContextSnapshotStoreOptions` | interface | <code>interface ArtifactReActContextSnapshotStoreOptions</code> | Field contract for Artifact Re Act Context Snapshot Store Options; see all contract members below. |
| `ExecuteReActQuantumRequest` | interface | <code>interface ExecuteReActQuantumRequest</code> | Field contract for Execute Re Act Quantum Request; see all contract members below. |
| `ExecuteReActQuantumResult` | interface | <code>interface ExecuteReActQuantumResult</code> | Field contract for Execute Re Act Quantum Result; see all contract members below. |
| `ReActContextSnapshot` | interface | <code>interface ReActContextSnapshot</code> | Field contract for Re Act Context Snapshot; see all contract members below. |
| `ReActContextSnapshotPutResult` | interface | <code>interface ReActContextSnapshotPutResult</code> | Field contract for Re Act Context Snapshot Put Result; see all contract members below. |
| `ReActContextSnapshotStore` | interface | <code>interface ReActContextSnapshotStore</code> | Field contract for Re Act Context Snapshot Store; see all contract members below. |
| `ReActOperationReceiptReconciler` | interface | <code>interface ReActOperationReceiptReconciler</code> | Field contract for Re Act Operation Receipt Reconciler; see all contract members below. |
| `ReActQuantumExecutorOptions` | interface | <code>interface ReActQuantumExecutorOptions</code> | Field contract for Re Act Quantum Executor Options; see all contract members below. |
| `ReActQuantumOutcomeRecorder` | interface | <code>interface ReActQuantumOutcomeRecorder</code> | Field contract for Re Act Quantum Outcome Recorder; see all contract members below. |
| `ReActQuantumRevisionValidator` | interface | <code>interface ReActQuantumRevisionValidator</code> | Field contract for Re Act Quantum Revision Validator; see all contract members below. |
| `ReActQuantumRunnerFactory` | interface | <code>interface ReActQuantumRunnerFactory</code> | Field contract for Re Act Quantum Runner Factory; see all contract members below. |
| `ReActQuantumRuntimeReader` | interface | <code>interface ReActQuantumRuntimeReader</code> | Field contract for Re Act Quantum Runtime Reader; see all contract members below. |
| `ReActQuantumRuntimeState` | interface | <code>interface ReActQuantumRuntimeState</code> | Field contract for Re Act Quantum Runtime State; see all contract members below. |
| `ReActQuantumRuntimeStatus` | type | <code>type ReActQuantumRuntimeStatus = 'created' &#124; 'running' &#124; 'waiting_human' &#124; 'completed' &#124; 'failed' &#124; 'cancelled'</code> | Public type alias for Re Act Quantum Runtime Status. |

## `ArtifactReActContextSnapshotStore` public members

Durable content-addressed Context snapshots selected by the checkpoint scope hash.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(input: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | Public runtime operation for put. |

## `ContinuationIdentityValidator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ContinuationIdentityValidator</code> | Creates an instance of this class. |
| `validateCheckpoint` | method | <code>validateCheckpoint(descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;, checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;, checkpointRef: string): void</code> | Validates Checkpoint at this module boundary. |
| `validateCommand` | method | <code>validateCommand(command: Readonly&lt;SessionCommandRecord&gt;, descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;): void</code> | Validates Command at this module boundary. |
| `validateRuntimeState` | method | <code>validateRuntimeState(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): void</code> | Validates Runtime State at this module boundary. |
| `validateSnapshot` | method | <code>validateSnapshot(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, snapshot: Readonly&lt;ReActContextSnapshot&gt;): void</code> | Validates Snapshot at this module boundary. |

## `ReActQuantumExecutor` public members

Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | Creates an instance of this class. |
| `runOneQuantum` | method | <code>runOneQuantum(input: ExecuteReActQuantumRequest): Promise&lt;ExecuteReActQuantumResult&gt;</code> | Public runtime operation for run One Quantum. |

## `ArtifactReActContextSnapshotStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public artifacts property. |
| `maxSnapshotBytes` | property | <code>maxSnapshotBytes: number</code> | Public max Snapshot Bytes property. |

## `ExecuteReActQuantumRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `command` | property | <code>command: Readonly&lt;SessionCommandRecord&gt;</code> | Public command property. |
| `descriptor` | property | <code>descriptor: ReActQuantumDescriptor</code> | Public descriptor property. |
| `signal` | property | <code>signal: AbortSignal</code> | Public signal property. |

## `ExecuteReActQuantumResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `disposition` | property | <code>disposition: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "waiting_human" &#124; "terminal"</code> | Public disposition property. |
| `react` | property | <code>react: ReActRunResult</code> | Public react property. |

## `ReActContextSnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `context` | property | <code>context: ReActRunContext</code> | Public context property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `scopeHash` | property | <code>scopeHash: string</code> | Public scope Hash property. |
| `stepId` | property | <code>stepId: string</code> | Public step Id property. |
| `version` | property | <code>version: "1.0.0"</code> | Public version property. |

## `ReActContextSnapshotPutResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reused` | property | <code>reused: boolean</code> | Public reused property. |
| `snapshot` | property | <code>snapshot: ReActContextSnapshot</code> | Public snapshot property. |
| `snapshotHash` | property | <code>snapshotHash: string</code> | Public snapshot Hash property. |

## `ReActContextSnapshotStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(snapshot: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | Public runtime operation for put. |

## `ReActOperationReceiptReconciler` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reconcile` | method | <code>reconcile(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; receiptRefs: readonly string[]; signal: AbortSignal; }): Promise&lt;void&gt;</code> | Public runtime operation for reconcile. |

## `ReActQuantumExecutorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `checkpointReferenceFor` | method | <code>checkpointReferenceFor(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): string</code> | Public runtime operation for checkpoint Reference For. |
| `checkpoints` | property | <code>checkpoints: ReActContinuationCheckpointStore</code> | Public checkpoints property. |
| `contextSnapshots` | property | <code>contextSnapshots: ReActContextSnapshotStore</code> | Public context Snapshots property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `outcomeRecorder` | property | <code>outcomeRecorder: ReActQuantumOutcomeRecorder</code> | Public outcome Recorder property. |
| `quantumIterations` | property | <code>quantumIterations: number</code> | Public quantum Iterations property. |
| `receiptReconciler` | property | <code>receiptReconciler: ReActOperationReceiptReconciler</code> | Public receipt Reconciler property. |
| `revisionValidator` | property | <code>revisionValidator: ReActQuantumRevisionValidator</code> | Public revision Validator property. |
| `runnerFactory` | property | <code>runnerFactory: ReActQuantumRunnerFactory</code> | Public runner Factory property. |
| `runtime` | property | <code>runtime: ReActQuantumRuntimeReader</code> | Public runtime property. |

## `ReActQuantumOutcomeRecorder` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `record` | method | <code>record(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; react: Readonly&lt;ReActRunResult&gt;; disposition: Exclude&lt;ExecuteReActQuantumResult["disposition"], "terminal"&gt;; signal: AbortSignal; }): Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `ReActQuantumRevisionValidator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `validate` | method | <code>validate(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): Promise&lt;void&gt;</code> | Validates validate at this module boundary. |

## `ReActQuantumRunnerFactory` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; snapshot: Readonly&lt;ReActContextSnapshot&gt;; signal: AbortSignal; }): Promise&lt;Pick&lt;ReActRunner, "run"&gt;&gt;</code> | Creates create at this module boundary. |

## `ReActQuantumRuntimeReader` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `replay` | method | <code>replay(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;): Promise&lt;ReActQuantumRuntimeState&gt;</code> | Public runtime operation for replay. |

## `ReActQuantumRuntimeState` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `cancellationRevision` | property | <code>cancellationRevision: number</code> | Public cancellation Revision property. |
| `capabilitySnapshotHash` | property | <code>capabilitySnapshotHash: string</code> | Public capability Snapshot Hash property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `promptSnapshotHash` | property | <code>promptSnapshotHash: string</code> | Public prompt Snapshot Hash property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `sessionId` | property | <code>sessionId: string</code> | Public session Id property. |
| `status` | property | <code>status: ReActQuantumRuntimeStatus</code> | Public status property. |
| `userId` | property | <code>userId: string</code> | Public user Id property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
