# `@codesoul-co/hypha-harness` / `execution-context`

- 包索引: [`@codesoul-co/hypha-harness`](/zh/api/harness)
- 模块指南: [学习与组合说明](/zh/packages/harness)
- 源码: [`packages/harness/src/execution-context.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createRuntimeExecutionContext` | 函数 | <code>createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext</code> | 创建 Runtime Execution Context。 |
| `CreateRuntimeExecutionContextOptions` | 接口 | <code>interface CreateRuntimeExecutionContextOptions</code> | Create Runtime Execution Context Options 的字段契约；完整字段见下表。 |
| `RuntimeExecutionContext` | 接口 | <code>interface RuntimeExecutionContext</code> | Runtime Execution Context 的字段契约；完整字段见下表。 |

## `CreateRuntimeExecutionContextOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `activityDispatchPort` | 属性 | <code>activityDispatchPort: RuntimeActivityDispatchPort</code> | activity Dispatch Port 字段。 |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `causationId` | 属性 | <code>causationId: string</code> | causation Id 字段。 |
| `determinismStore` | 属性 | <code>determinismStore: RuntimeDeterminismStore</code> | determinism Store 字段。 |
| `eventCommitPort` | 属性 | <code>eventCommitPort: RuntimeEventCommitPort</code> | event Commit Port 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `principal` | 属性 | <code>principal: RuntimePrincipal</code> | principal 字段。 |
| `process` | 属性 | <code>process: FSMProcessSpec</code> | process 字段。 |
| `resourceCoordinator` | 属性 | <code>resourceCoordinator: RuntimeResourceCoordinator</code> | resource Coordinator 字段。 |
| `run` | 属性 | <code>run: RuntimeRun</code> | run 字段。 |
| `runLease` | 属性 | <code>runLease: RunLeaseAuthorization</code> | run Lease 字段。 |
| `scope` | 属性 | <code>scope: RuntimeScope</code> | scope 字段。 |
| `snapshot` | 属性 | <code>snapshot: FSMSnapshot</code> | snapshot 字段。 |

## `RuntimeExecutionContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `abortSignal` | 属性 | <code>abortSignal: AbortSignal</code> | abort Signal 字段。 |
| `activities` | 属性 | <code>activities: RuntimeActivityHelper</code> | activities 字段。 |
| `attempt` | 属性 | <code>attempt: number</code> | attempt 字段。 |
| `clock` | 属性 | <code>clock: RuntimeClockHelper</code> | clock 字段。 |
| `events` | 属性 | <code>events: RuntimeEventHelper</code> | events 字段。 |
| `fencingToken` | 属性 | <code>fencingToken: number</code> | fencing Token 字段。 |
| `ids` | 属性 | <code>ids: RuntimeIdHelper</code> | ids 字段。 |
| `principal` | 属性 | <code>principal: Readonly&lt;RuntimePrincipal&gt;</code> | principal 字段。 |
| `process` | 属性 | <code>process: Readonly&lt;FSMProcessSpec&gt;</code> | process 字段。 |
| `resources` | 属性 | <code>resources: RuntimeResourceHelper</code> | resources 字段。 |
| `run` | 属性 | <code>run: Readonly&lt;RuntimeRun&gt;</code> | run 字段。 |
| `scope` | 属性 | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | scope 字段。 |
| `snapshot` | 属性 | <code>snapshot: Readonly&lt;FSMSnapshot&gt;</code> | snapshot 字段。 |
| `state` | 属性 | <code>state: Readonly&lt;FSMStateSpec&gt;</code> | state 字段。 |
| `transitions` | 属性 | <code>transitions: RuntimeTransitionHelper</code> | transitions 字段。 |
| `waits` | 属性 | <code>waits: RuntimeWaitHelper</code> | waits 字段。 |
