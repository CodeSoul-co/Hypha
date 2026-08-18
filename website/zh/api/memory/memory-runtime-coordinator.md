# `@codesoul-co/hypha-memory` / `memory-runtime-coordinator`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/memory-runtime-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)
- 导出数: **12**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMemoryRuntimeControlStore` | 类 | <code>new InMemoryMemoryRuntimeControlStore(): InMemoryMemoryRuntimeControlStore</code> | In Memory Memory Runtime Control Store 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryRuntimeCoordinator` | 类 | <code>new MemoryRuntimeCoordinator(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | Memory Runtime Coordinator 的运行时实现；公开构造函数与成员见下表。 |
| `StructuredMemoryRuntimeControlStore` | 类 | <code>new StructuredMemoryRuntimeControlStore(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | Structured Memory Runtime Control Store 的运行时实现；公开构造函数与成员见下表。 |
| `MemoryRuntimeActiveState` | 接口 | <code>interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState</code> | Memory Runtime Active State 的字段契约；完整字段见下表。 |
| `MemoryRuntimeControlStore` | 接口 | <code>interface MemoryRuntimeControlStore</code> | Memory Runtime Control Store 的字段契约；完整字段见下表。 |
| `MemoryRuntimeCoordinatorOptions` | 接口 | <code>interface MemoryRuntimeCoordinatorOptions</code> | Memory Runtime Coordinator Options 的字段契约；完整字段见下表。 |
| `MemoryRuntimeCreator` | 接口 | <code>interface MemoryRuntimeCreator</code> | Memory Runtime Creator 的字段契约；完整字段见下表。 |
| `MemoryRuntimeGeneration` | 接口 | <code>interface MemoryRuntimeGeneration</code> | Memory Runtime Generation 的字段契约；完整字段见下表。 |
| `MemoryRuntimeRevisionState` | 接口 | <code>interface MemoryRuntimeRevisionState</code> | Memory Runtime Revision State 的字段契约；完整字段见下表。 |
| `MemoryRuntimeSwitchResult` | 接口 | <code>interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration</code> | Memory Runtime Switch Result 的字段契约；完整字段见下表。 |
| `StructuredMemoryRuntimeControlStoreOptions` | 接口 | <code>interface StructuredMemoryRuntimeControlStoreOptions</code> | Structured Memory Runtime Control Store Options 的字段契约；完整字段见下表。 |
| `MemoryRuntimeRevisionStatus` | 类型 | <code>type MemoryRuntimeRevisionStatus = 'active' &#124; 'draining' &#124; 'retired' &#124; 'quarantined'</code> | Memory Runtime Revision Status 的公共类型别名。 |

## `InMemoryMemoryRuntimeControlStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | activate 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(): InMemoryMemoryRuntimeControlStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>durability: "ephemeral"</code> | durability 字段。 |
| `getActive` | 方法 | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | 读取 Active。 |
| `getRevision` | 方法 | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | 读取 Revision。 |
| `listRevisions` | 方法 | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | 列出 Revisions。 |
| `setRevision` | 方法 | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | 写入 Revision。 |

## `MemoryRuntimeCoordinator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | 创建该类的实例。 |
| `current` | 方法 | <code>current(): MemoryRuntimeGeneration &#124; null</code> | current 的公开运行时操作。 |
| `drain` | 方法 | <code>drain(): Promise&lt;void&gt;</code> | drain 的公开运行时操作。 |
| `initialize` | 方法 | <code>initialize(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | initialize 的公开运行时操作。 |
| `probeActive` | 方法 | <code>probeActive(): Promise&lt;MemoryRuntimeRevisionState&gt;</code> | probe Active 的公开运行时操作。 |
| `switchRevision` | 方法 | <code>switchRevision(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;, expectedProfileRevision?: string): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | switch Revision 的公开运行时操作。 |
| `withRuntime` | 方法 | <code>withRuntime&lt;T&gt;(operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | with Runtime 的公开运行时操作。 |

## `StructuredMemoryRuntimeControlStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | activate 的公开运行时操作。 |
| `constructor` | 构造函数 | <code>(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | 创建该类的实例。 |
| `durability` | 属性 | <code>durability: "durable"</code> | durability 字段。 |
| `getActive` | 方法 | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | 读取 Active。 |
| `getRevision` | 方法 | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | 读取 Revision。 |
| `listRevisions` | 方法 | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | 列出 Revisions。 |
| `setRevision` | 方法 | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | 写入 Revision。 |

## `MemoryRuntimeActiveState` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | capability Snapshot 字段。 |
| `coordinatorId` | 属性 | <code>coordinatorId: string</code> | coordinator Id 字段。 |
| `generation` | 属性 | <code>generation: number</code> | generation 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `quarantineError` | 属性 | <code>quarantineError: NormalizedMemoryError</code> | quarantine Error 字段。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | runtime Id 字段。 |
| `status` | 属性 | <code>status: MemoryRuntimeRevisionStatus</code> | status 字段。 |

## `MemoryRuntimeControlStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activate` | 方法 | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | activate 的公开运行时操作。 |
| `durability` | 属性 | <code>durability: "ephemeral" &#124; "durable"</code> | durability 字段。 |
| `getActive` | 方法 | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | 读取 Active。 |
| `getRevision` | 方法 | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | 读取 Revision。 |
| `listRevisions` | 方法 | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | 列出 Revisions。 |
| `setRevision` | 方法 | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | 写入 Revision。 |

## `MemoryRuntimeCoordinatorOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityProbeIntervalMs` | 属性 | <code>capabilityProbeIntervalMs: number</code> | capability Probe Interval Ms 字段。 |
| `factory` | 属性 | <code>factory: MemoryRuntimeFactory &#124; MemoryRuntimeCreator</code> | factory 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `now` | 方法 | <code>now(): Date</code> | now 的公开运行时操作。 |
| `requireDurableStore` | 属性 | <code>requireDurableStore: boolean</code> | require Durable Store 字段。 |
| `store` | 属性 | <code>store: MemoryRuntimeControlStore</code> | store 字段。 |

## `MemoryRuntimeCreator` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | 创建 create。 |

## `MemoryRuntimeGeneration` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generation` | 属性 | <code>generation: number</code> | generation 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | runtime Id 字段。 |

## `MemoryRuntimeRevisionState` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityHash` | 属性 | <code>capabilityHash: string</code> | capability Hash 字段。 |
| `capabilitySnapshot` | 属性 | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | capability Snapshot 字段。 |
| `coordinatorId` | 属性 | <code>coordinatorId: string</code> | coordinator Id 字段。 |
| `generation` | 属性 | <code>generation: number</code> | generation 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `observedAt` | 属性 | <code>observedAt: string</code> | observed At 字段。 |
| `profileHash` | 属性 | <code>profileHash: string</code> | profile Hash 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `quarantineError` | 属性 | <code>quarantineError: NormalizedMemoryError</code> | quarantine Error 字段。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | runtime Id 字段。 |
| `status` | 属性 | <code>status: MemoryRuntimeRevisionStatus</code> | status 字段。 |

## `MemoryRuntimeSwitchResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `generation` | 属性 | <code>generation: number</code> | generation 字段。 |
| `previousProfileRevision` | 属性 | <code>previousProfileRevision: string</code> | previous Profile Revision 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |
| `profileRevision` | 属性 | <code>profileRevision: string</code> | profile Revision 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerRevision` | 属性 | <code>providerRevision: string</code> | provider Revision 字段。 |
| `runtimeId` | 属性 | <code>runtimeId: string</code> | runtime Id 字段。 |

## `StructuredMemoryRuntimeControlStoreOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeTable` | 属性 | <code>activeTable: string</code> | active Table 字段。 |
| `provider` | 属性 | <code>provider: StructuredStoreProvider</code> | provider 字段。 |
| `revisionTable` | 属性 | <code>revisionTable: string</code> | revision Table 字段。 |
