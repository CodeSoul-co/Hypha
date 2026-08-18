# `@codesoul-co/hypha-core` / `modules/runtime/runtime-helper-sdk`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/runtime/runtime-helper-sdk.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-helper-sdk.ts)
- 导出数: **8**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultRuntimeTransitionHelper` | 类 | <code>new DefaultRuntimeTransitionHelper(): DefaultRuntimeTransitionHelper</code> | Default Runtime Transition Helper 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultRuntimeWaitHelper` | 类 | <code>new DefaultRuntimeWaitHelper(): DefaultRuntimeWaitHelper</code> | Default Runtime Wait Helper 的运行时实现；公开构造函数与成员见下表。 |
| `DeterministicRuntimeClockHelper` | 类 | <code>new DeterministicRuntimeClockHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | Deterministic Runtime Clock Helper 的运行时实现；公开构造函数与成员见下表。 |
| `DeterministicRuntimeIdHelper` | 类 | <code>new DeterministicRuntimeIdHelper(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | Deterministic Runtime Id Helper 的运行时实现；公开构造函数与成员见下表。 |
| `InMemoryRuntimeDeterminismStore` | 类 | <code>new InMemoryRuntimeDeterminismStore(): InMemoryRuntimeDeterminismStore</code> | In Memory Runtime Determinism Store 的运行时实现；公开构造函数与成员见下表。 |
| `createRuntimeHelperSdk` | 函数 | <code>createRuntimeHelperSdk(options: CreateRuntimeHelperSdkOptions): RuntimeHelperSdk</code> | 创建 Runtime Helper Sdk。 |
| `deterministicObservationKey` | 函数 | <code>deterministicObservationKey(scope: RuntimeDeterminismScope, key: string): string</code> | deterministic Observation Key 的公开运行时操作。 |
| `CreateRuntimeHelperSdkOptions` | 接口 | <code>interface CreateRuntimeHelperSdkOptions</code> | Create Runtime Helper Sdk Options 的字段契约；完整字段见下表。 |

## `DefaultRuntimeTransitionHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `complete` | 方法 | <code>complete(output?: RuntimeJsonValue, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeStateExecutionResult</code> | complete 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): DefaultRuntimeTransitionHelper</code> | 创建该类的实例。 |
| `continue` | 方法 | <code>continue(observation?: RuntimeJsonValue): RuntimeStateExecutionResult</code> | continue 的公开运行时操作。 |
| `fail` | 方法 | <code>fail(error: NormalizedRuntimeError): RuntimeStateExecutionResult</code> | fail 的公开运行时操作。 |
| `propose` | 方法 | <code>propose(to: string, reason?: string, variablesPatch?: Record&lt;string, RuntimeJsonValue&gt;): RuntimeTransitionProposal</code> | propose 的公开运行时操作。 |

## `DefaultRuntimeWaitHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DefaultRuntimeWaitHelper</code> | 创建该类的实例。 |
| `human` | 方法 | <code>human(request: HumanWaitRequest): RuntimeStateExecutionResult</code> | human 的公开运行时操作。 |
| `pause` | 方法 | <code>pause(request: PauseRequest): RuntimeStateExecutionResult</code> | pause 的公开运行时操作。 |
| `signal` | 方法 | <code>signal(request: SignalWaitRequest): RuntimeStateExecutionResult</code> | signal 的公开运行时操作。 |
| `timer` | 方法 | <code>timer(request: TimerWaitRequest): RuntimeStateExecutionResult</code> | timer 的公开运行时操作。 |

## `DeterministicRuntimeClockHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, waits: RuntimeWaitHelper, source?: () =&gt; string): DeterministicRuntimeClockHelper</code> | 创建该类的实例。 |
| `now` | 方法 | <code>now(): Promise&lt;string&gt;</code> | now 的公开运行时操作。 |
| `sleepUntil` | 方法 | <code>sleepUntil(isoTime: string): Promise&lt;RuntimeStateExecutionResult&gt;</code> | sleep Until 的公开运行时操作。 |

## `DeterministicRuntimeIdHelper` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(scope: RuntimeDeterminismScope, store: RuntimeDeterminismStore, source?: (namespace: string) =&gt; string): DeterministicRuntimeIdHelper</code> | 创建该类的实例。 |
| `next` | 方法 | <code>next(namespace: string): Promise&lt;string&gt;</code> | next 的公开运行时操作。 |

## `InMemoryRuntimeDeterminismStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryRuntimeDeterminismStore</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve&lt;T extends RuntimeJsonValue&gt;(request: RuntimeDeterminismResolveRequest, produce: () =&gt; T &#124; Promise&lt;T&gt;): Promise&lt;RuntimeDeterminismResolution&lt;T&gt;&gt;</code> | 解析 resolve。 |

## `CreateRuntimeHelperSdkOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `determinismStore` | 属性 | <code>determinismStore: RuntimeDeterminismStore</code> | determinism Store 字段。 |
| `nextId` | 方法 | <code>nextId(namespace: string): string</code> | next Id 的公开运行时操作。 |
| `now` | 方法 | <code>now(): string</code> | now 的公开运行时操作。 |
| `scope` | 属性 | <code>scope: RuntimeDeterminismScope</code> | scope 字段。 |
