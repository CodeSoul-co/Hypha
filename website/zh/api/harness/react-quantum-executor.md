# `@codesoul-co/hypha-harness` / `react-quantum-executor`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/react-quantum-executor.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/react-quantum-executor.ts)
- 导出数: **19**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactReActContextSnapshotStore` | 类 | <code>new ArtifactReActContextSnapshotStore(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | Durable content-addressed Context snapshots selected by the checkpoint scope hash. |
| `ContinuationIdentityValidator` | 类 | <code>new ContinuationIdentityValidator(): ContinuationIdentityValidator</code> | Continuation Identity Validator 的运行时实现；公开构造函数与成员见下表。 |
| `ReActQuantumExecutor` | 类 | <code>new ReActQuantumExecutor(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence. |
| `REACT_CONTEXT_SNAPSHOT_VERSION` | 常量 | <code>const REACT_CONTEXT_SNAPSHOT_VERSION: "1.0.0"</code> | 由 `react-quantum-executor` 模块导出的 REACT CONTEXT SNAPSHOT VERSION 常量。 |
| `createContinuationReActQuantumDescriptor` | 函数 | <code>createContinuationReActQuantumDescriptor(command: Readonly&lt;SessionCommandRecord&gt;, input: unknown): ContinuationReActQuantumDescriptor</code> | 创建 Continuation Re Act Quantum Descriptor。 |
| `ArtifactReActContextSnapshotStoreOptions` | 接口 | <code>interface ArtifactReActContextSnapshotStoreOptions</code> | Artifact Re Act Context Snapshot Store Options 的字段契约；完整字段见下表。 |
| `ExecuteReActQuantumRequest` | 接口 | <code>interface ExecuteReActQuantumRequest</code> | Execute Re Act Quantum Request 的字段契约；完整字段见下表。 |
| `ExecuteReActQuantumResult` | 接口 | <code>interface ExecuteReActQuantumResult</code> | Execute Re Act Quantum Result 的字段契约；完整字段见下表。 |
| `ReActContextSnapshot` | 接口 | <code>interface ReActContextSnapshot</code> | Re Act Context Snapshot 的字段契约；完整字段见下表。 |
| `ReActContextSnapshotPutResult` | 接口 | <code>interface ReActContextSnapshotPutResult</code> | Re Act Context Snapshot Put Result 的字段契约；完整字段见下表。 |
| `ReActContextSnapshotStore` | 接口 | <code>interface ReActContextSnapshotStore</code> | Re Act Context Snapshot Store 的字段契约；完整字段见下表。 |
| `ReActOperationReceiptReconciler` | 接口 | <code>interface ReActOperationReceiptReconciler</code> | Re Act Operation Receipt Reconciler 的字段契约；完整字段见下表。 |
| `ReActQuantumExecutorOptions` | 接口 | <code>interface ReActQuantumExecutorOptions</code> | Re Act Quantum Executor Options 的字段契约；完整字段见下表。 |
| `ReActQuantumOutcomeRecorder` | 接口 | <code>interface ReActQuantumOutcomeRecorder</code> | Re Act Quantum Outcome Recorder 的字段契约；完整字段见下表。 |
| `ReActQuantumRevisionValidator` | 接口 | <code>interface ReActQuantumRevisionValidator</code> | Re Act Quantum Revision Validator 的字段契约；完整字段见下表。 |
| `ReActQuantumRunnerFactory` | 接口 | <code>interface ReActQuantumRunnerFactory</code> | Re Act Quantum Runner Factory 的字段契约；完整字段见下表。 |
| `ReActQuantumRuntimeReader` | 接口 | <code>interface ReActQuantumRuntimeReader</code> | Re Act Quantum Runtime Reader 的字段契约；完整字段见下表。 |
| `ReActQuantumRuntimeState` | 接口 | <code>interface ReActQuantumRuntimeState</code> | Re Act Quantum Runtime State 的字段契约；完整字段见下表。 |
| `ReActQuantumRuntimeStatus` | 类型 | <code>type ReActQuantumRuntimeStatus = 'created' &#124; 'running' &#124; 'waiting_human' &#124; 'completed' &#124; 'failed' &#124; 'cancelled'</code> | Re Act Quantum Runtime Status 的公共类型别名。 |

## `ArtifactReActContextSnapshotStore` 公开成员

Durable content-addressed Context snapshots selected by the checkpoint scope hash.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactReActContextSnapshotStoreOptions): ArtifactReActContextSnapshotStore</code> | 创建该类的实例。 |
| `delete` | 方法 | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(input: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | put 的公开运行时操作。 |

## `ContinuationIdentityValidator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): ContinuationIdentityValidator</code> | 创建该类的实例。 |
| `validateCheckpoint` | 方法 | <code>validateCheckpoint(descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;, checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;, checkpointRef: string): void</code> | 校验 Checkpoint。 |
| `validateCommand` | 方法 | <code>validateCommand(command: Readonly&lt;SessionCommandRecord&gt;, descriptor: Readonly&lt;ContinuationReActQuantumDescriptor&gt;): void</code> | 校验 Command。 |
| `validateRuntimeState` | 方法 | <code>validateRuntimeState(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): void</code> | 校验 Runtime State。 |
| `validateSnapshot` | 方法 | <code>validateSnapshot(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, snapshot: Readonly&lt;ReActContextSnapshot&gt;): void</code> | 校验 Snapshot。 |

## `ReActQuantumExecutor` 公开成员

Rebuilds and executes exactly one fenced ReAct quantum from durable Runtime evidence.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ReActQuantumExecutorOptions): ReActQuantumExecutor</code> | 创建该类的实例。 |
| `runOneQuantum` | 方法 | <code>runOneQuantum(input: ExecuteReActQuantumRequest): Promise&lt;ExecuteReActQuantumResult&gt;</code> | run One Quantum 的公开运行时操作。 |

## `ArtifactReActContextSnapshotStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: ArtifactStoreProvider</code> | artifacts 字段。 |
| `maxSnapshotBytes` | 属性 | <code>maxSnapshotBytes: number</code> | max Snapshot Bytes 字段。 |

## `ExecuteReActQuantumRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `command` | 属性 | <code>command: Readonly&lt;SessionCommandRecord&gt;</code> | command 字段。 |
| `descriptor` | 属性 | <code>descriptor: ReActQuantumDescriptor</code> | descriptor 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |

## `ExecuteReActQuantumResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `disposition` | 属性 | <code>disposition: "completed" &#124; "cancelled" &#124; "failed" &#124; "suspended" &#124; "waiting_human" &#124; "terminal"</code> | disposition 字段。 |
| `react` | 属性 | <code>react: ReActRunResult</code> | react 字段。 |

## `ReActContextSnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `context` | 属性 | <code>context: ReActRunContext</code> | context 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `scopeHash` | 属性 | <code>scopeHash: string</code> | scope Hash 字段。 |
| `stepId` | 属性 | <code>stepId: string</code> | step Id 字段。 |
| `version` | 属性 | <code>version: "1.0.0"</code> | version 字段。 |

## `ReActContextSnapshotPutResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reused` | 属性 | <code>reused: boolean</code> | reused 字段。 |
| `snapshot` | 属性 | <code>snapshot: ReActContextSnapshot</code> | snapshot 字段。 |
| `snapshotHash` | 属性 | <code>snapshotHash: string</code> | snapshot Hash 字段。 |

## `ReActContextSnapshotStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `delete` | 方法 | <code>delete(scopeHash: string): Promise&lt;boolean&gt;</code> | 删除 delete。 |
| `get` | 方法 | <code>get(scopeHash: string): Promise&lt;ReActContextSnapshot &#124; null&gt;</code> | 读取 get。 |
| `put` | 方法 | <code>put(snapshot: ReActContextSnapshot): Promise&lt;ReActContextSnapshotPutResult&gt;</code> | put 的公开运行时操作。 |

## `ReActOperationReceiptReconciler` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reconcile` | 方法 | <code>reconcile(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; receiptRefs: readonly string[]; signal: AbortSignal; }): Promise&lt;void&gt;</code> | reconcile 的公开运行时操作。 |

## `ReActQuantumExecutorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `checkpointReferenceFor` | 方法 | <code>checkpointReferenceFor(checkpoint: Readonly&lt;ReActContinuationCheckpoint&gt;): string</code> | checkpoint Reference For 的公开运行时操作。 |
| `checkpoints` | 属性 | <code>checkpoints: ReActContinuationCheckpointStore</code> | checkpoints 字段。 |
| `contextSnapshots` | 属性 | <code>contextSnapshots: ReActContextSnapshotStore</code> | context Snapshots 字段。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `outcomeRecorder` | 属性 | <code>outcomeRecorder: ReActQuantumOutcomeRecorder</code> | outcome Recorder 字段。 |
| `quantumIterations` | 属性 | <code>quantumIterations: number</code> | quantum Iterations 字段。 |
| `receiptReconciler` | 属性 | <code>receiptReconciler: ReActOperationReceiptReconciler</code> | receipt Reconciler 字段。 |
| `revisionValidator` | 属性 | <code>revisionValidator: ReActQuantumRevisionValidator</code> | revision Validator 字段。 |
| `runnerFactory` | 属性 | <code>runnerFactory: ReActQuantumRunnerFactory</code> | runner Factory 字段。 |
| `runtime` | 属性 | <code>runtime: ReActQuantumRuntimeReader</code> | runtime 字段。 |

## `ReActQuantumOutcomeRecorder` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `record` | 方法 | <code>record(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; react: Readonly&lt;ReActRunResult&gt;; disposition: Exclude&lt;ExecuteReActQuantumResult["disposition"], "terminal"&gt;; signal: AbortSignal; }): Promise&lt;void&gt;</code> | 记录 record。 |

## `ReActQuantumRevisionValidator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `validate` | 方法 | <code>validate(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;, state: Readonly&lt;ReActQuantumRuntimeState&gt;): Promise&lt;void&gt;</code> | 校验 validate。 |

## `ReActQuantumRunnerFactory` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: { descriptor: Readonly&lt;ReActQuantumDescriptor&gt;; state: Readonly&lt;ReActQuantumRuntimeState&gt;; snapshot: Readonly&lt;ReActContextSnapshot&gt;; signal: AbortSignal; }): Promise&lt;Pick&lt;ReActRunner, "run"&gt;&gt;</code> | 创建 create。 |

## `ReActQuantumRuntimeReader` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `replay` | 方法 | <code>replay(descriptor: Readonly&lt;ReActQuantumDescriptor&gt;): Promise&lt;ReActQuantumRuntimeState&gt;</code> | replay 的公开运行时操作。 |

## `ReActQuantumRuntimeState` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `cancellationRevision` | 属性 | <code>cancellationRevision: number</code> | cancellation Revision 字段。 |
| `capabilitySnapshotHash` | 属性 | <code>capabilitySnapshotHash: string</code> | capability Snapshot Hash 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `promptSnapshotHash` | 属性 | <code>promptSnapshotHash: string</code> | prompt Snapshot Hash 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `status` | 属性 | <code>status: ReActQuantumRuntimeStatus</code> | status 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
