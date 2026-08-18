# `@codesoul-co/hypha-core` / `modules/runtime/runtime-helper-sdk`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-helper-sdk.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)
- Exports: **8**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultRuntimeTransitionHelper` | class | <code>new DefaultRuntimeTransitionHelper(): DefaultRuntimeTransitionHelper</code> | Runtime implementation for Default Runtime Transition Helper; see its public constructor and members below. |
| `DefaultRuntimeWaitHelper` | class | <code>new DefaultRuntimeWaitHelper(): DefaultRuntimeWaitHelper</code> | Runtime implementation for Default Runtime Wait Helper; see its public constructor and members below. |
| `DeterministicRuntimeClockHelper` | class | <code>new DeterministicRuntimeClockHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | Runtime implementation for Deterministic Runtime Clock Helper; see its public constructor and members below. |
| `DeterministicRuntimeIdHelper` | class | <code>new DeterministicRuntimeIdHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | Runtime implementation for Deterministic Runtime Id Helper; see its public constructor and members below. |
| `InMemoryRuntimeDeterminismStore` | class | <code>new InMemoryRuntimeDeterminismStore(): InMemoryRuntimeDeterminismStore</code> | Runtime implementation for In Memory Runtime Determinism Store; see its public constructor and members below. |
| `createRuntimeHelperSdk` | function | <code>createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk</code> | Creates Runtime Helper Sdk at this module boundary. |
| `deterministicObservationKey` | function | <code>deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string</code> | Public runtime operation for deterministic Observation Key. |
| `CreateRuntimeHelperSdkOptions` | interface | <code>interface CreateRuntimeHelperSdkOptions</code> | Field contract for Create Runtime Helper Sdk Options; see all contract members below. |

## `DefaultRuntimeTransitionHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `complete` | method | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | Public runtime operation for complete. |
| `constructor` | constructor | <code>(): DefaultRuntimeTransitionHelper</code> | Creates an instance of this class. |
| `continue` | method | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | Public runtime operation for continue. |
| `fail` | method | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | Public runtime operation for fail. |
| `propose` | method | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | Public runtime operation for propose. |

## `DefaultRuntimeWaitHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DefaultRuntimeWaitHelper</code> | Creates an instance of this class. |
| `human` | method | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | Public runtime operation for human. |
| `pause` | method | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | Public runtime operation for pause. |
| `signal` | method | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | Public runtime operation for signal. |
| `timer` | method | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | Public runtime operation for timer. |

## `DeterministicRuntimeClockHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | Creates an instance of this class. |
| `now` | method | <code>now(): Promise&lt;string&gt;</code> | Public runtime operation for now. |
| `sleepUntil` | method | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | Public runtime operation for sleep Until. |

## `DeterministicRuntimeIdHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | Creates an instance of this class. |
| `next` | method | <code>next(namespace: string): Promise&lt;string&gt;</code> | Public runtime operation for next. |

## `InMemoryRuntimeDeterminismStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryRuntimeDeterminismStore</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | Resolves resolve at this module boundary. |

## `CreateRuntimeHelperSdkOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `determinismStore` | property | <code>determinismStore: RuntimeDeterminismStore</code> | Public determinism Store property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `scope` | property | <code>scope: RuntimeDeterminismScope</code> | Public scope property. |
