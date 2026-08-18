# `@codesoul-co/hypha-harness` / `execution-context`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/execution-context.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/execution-context.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createRuntimeExecutionContext` | function | <code>createRuntimeExecutionContext(options: CreateRuntimeExecutionContextOptions): RuntimeExecutionContext</code> | Creates Runtime Execution Context at this module boundary. |
| `CreateRuntimeExecutionContextOptions` | interface | <code>interface CreateRuntimeExecutionContextOptions</code> | Field contract for Create Runtime Execution Context Options; see all contract members below. |
| `RuntimeExecutionContext` | interface | <code>interface RuntimeExecutionContext</code> | Field contract for Runtime Execution Context; see all contract members below. |

## `CreateRuntimeExecutionContextOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `activityDispatchPort` | property | <code>activityDispatchPort: RuntimeActivityDispatchPort</code> | Public activity Dispatch Port property. |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `causationId` | property | <code>causationId: string</code> | Public causation Id property. |
| `determinismStore` | property | <code>determinismStore: RuntimeDeterminismStore</code> | Public determinism Store property. |
| `eventCommitPort` | property | <code>eventCommitPort: RuntimeEventCommitPort</code> | Public event Commit Port property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `principal` | property | <code>principal: RuntimePrincipal</code> | Public principal property. |
| `process` | property | <code>process: FSMProcessSpec</code> | Public process property. |
| `resourceCoordinator` | property | <code>resourceCoordinator: RuntimeResourceCoordinator</code> | Public resource Coordinator property. |
| `run` | property | <code>run: RuntimeRun</code> | Public run property. |
| `runLease` | property | <code>runLease: RunLeaseAuthorization</code> | Public run Lease property. |
| `scope` | property | <code>scope: RuntimeScope</code> | Public scope property. |
| `snapshot` | property | <code>snapshot: FSMSnapshot</code> | Public snapshot property. |

## `RuntimeExecutionContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `activities` | property | <code>activities: RuntimeActivityHelper</code> | Public activities property. |
| `attempt` | property | <code>attempt: number</code> | Public attempt property. |
| `clock` | property | <code>clock: RuntimeClockHelper</code> | Public clock property. |
| `events` | property | <code>events: RuntimeEventHelper</code> | Public events property. |
| `fencingToken` | property | <code>fencingToken: number</code> | Public fencing Token property. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public ids property. |
| `principal` | property | <code>principal: Readonly&lt;RuntimePrincipal&gt;</code> | Public principal property. |
| `process` | property | <code>process: Readonly&lt;FSMProcessSpec&gt;</code> | Public process property. |
| `resources` | property | <code>resources: RuntimeResourceHelper</code> | Public resources property. |
| `run` | property | <code>run: Readonly&lt;RuntimeRun&gt;</code> | Public run property. |
| `scope` | property | <code>scope: Readonly&lt;RuntimeScope&gt;</code> | Public scope property. |
| `snapshot` | property | <code>snapshot: Readonly&lt;FSMSnapshot&gt;</code> | Public snapshot property. |
| `state` | property | <code>state: Readonly&lt;FSMStateSpec&gt;</code> | Public state property. |
| `transitions` | property | <code>transitions: RuntimeTransitionHelper</code> | Public transitions property. |
| `waits` | property | <code>waits: RuntimeWaitHelper</code> | Public waits property. |
