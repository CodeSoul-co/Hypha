# `@codesoul-co/hypha-memory` / `memory-runtime-coordinator`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/memory-runtime-coordinator.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/memory-runtime-coordinator.ts)
- Exports: **12**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMemoryRuntimeControlStore` | class | <code>new InMemoryMemoryRuntimeControlStore(): InMemoryMemoryRuntimeControlStore</code> | Runtime implementation for In Memory Memory Runtime Control Store; see its public constructor and members below. |
| `MemoryRuntimeCoordinator` | class | <code>new MemoryRuntimeCoordinator(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | Runtime implementation for Memory Runtime Coordinator; see its public constructor and members below. |
| `StructuredMemoryRuntimeControlStore` | class | <code>new StructuredMemoryRuntimeControlStore(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | Runtime implementation for Structured Memory Runtime Control Store; see its public constructor and members below. |
| `MemoryRuntimeActiveState` | interface | <code>interface MemoryRuntimeActiveState extends MemoryRuntimeRevisionState</code> | Field contract for Memory Runtime Active State; see all contract members below. |
| `MemoryRuntimeControlStore` | interface | <code>interface MemoryRuntimeControlStore</code> | Field contract for Memory Runtime Control Store; see all contract members below. |
| `MemoryRuntimeCoordinatorOptions` | interface | <code>interface MemoryRuntimeCoordinatorOptions</code> | Field contract for Memory Runtime Coordinator Options; see all contract members below. |
| `MemoryRuntimeCreator` | interface | <code>interface MemoryRuntimeCreator</code> | Field contract for Memory Runtime Creator; see all contract members below. |
| `MemoryRuntimeGeneration` | interface | <code>interface MemoryRuntimeGeneration</code> | Field contract for Memory Runtime Generation; see all contract members below. |
| `MemoryRuntimeRevisionState` | interface | <code>interface MemoryRuntimeRevisionState</code> | Field contract for Memory Runtime Revision State; see all contract members below. |
| `MemoryRuntimeSwitchResult` | interface | <code>interface MemoryRuntimeSwitchResult extends MemoryRuntimeGeneration</code> | Field contract for Memory Runtime Switch Result; see all contract members below. |
| `StructuredMemoryRuntimeControlStoreOptions` | interface | <code>interface StructuredMemoryRuntimeControlStoreOptions</code> | Field contract for Structured Memory Runtime Control Store Options; see all contract members below. |
| `MemoryRuntimeRevisionStatus` | type | <code>type MemoryRuntimeRevisionStatus = 'active' &#124; 'draining' &#124; 'retired' &#124; 'quarantined'</code> | Public type alias for Memory Runtime Revision Status. |

## `InMemoryMemoryRuntimeControlStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | Public runtime operation for activate. |
| `constructor` | constructor | <code>(): InMemoryMemoryRuntimeControlStore</code> | Creates an instance of this class. |
| `durability` | property | <code>durability: "ephemeral"</code> | Public durability property. |
| `getActive` | method | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | Gets Active at this module boundary. |
| `getRevision` | method | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | Gets Revision at this module boundary. |
| `listRevisions` | method | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | Lists Revisions at this module boundary. |
| `setRevision` | method | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | Sets Revision at this module boundary. |

## `MemoryRuntimeCoordinator` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>(options: MemoryRuntimeCoordinatorOptions): MemoryRuntimeCoordinator</code> | Creates an instance of this class. |
| `current` | method | <code>current(): MemoryRuntimeGeneration &#124; null</code> | Public runtime operation for current. |
| `drain` | method | <code>drain(): Promise&lt;void&gt;</code> | Public runtime operation for drain. |
| `initialize` | method | <code>initialize(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | Public runtime operation for initialize. |
| `probeActive` | method | <code>probeActive(): Promise&lt;MemoryRuntimeRevisionState&gt;</code> | Public runtime operation for probe Active. |
| `switchRevision` | method | <code>switchRevision(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;, expectedProfileRevision?: string): Promise&lt;MemoryRuntimeSwitchResult&gt;</code> | Public runtime operation for switch Revision. |
| `withRuntime` | method | <code>withRuntime&lt;T&gt;(operation: (runtime: MemoryRuntime, generation: MemoryRuntimeGeneration) =&gt; Promise&lt;T&gt;): Promise&lt;T&gt;</code> | Public runtime operation for with Runtime. |

## `StructuredMemoryRuntimeControlStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | Public runtime operation for activate. |
| `constructor` | constructor | <code>(options: StructuredMemoryRuntimeControlStoreOptions): StructuredMemoryRuntimeControlStore</code> | Creates an instance of this class. |
| `durability` | property | <code>durability: "durable"</code> | Public durability property. |
| `getActive` | method | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | Gets Active at this module boundary. |
| `getRevision` | method | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | Gets Revision at this module boundary. |
| `listRevisions` | method | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | Lists Revisions at this module boundary. |
| `setRevision` | method | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | Sets Revision at this module boundary. |

## `MemoryRuntimeActiveState` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | Public capability Snapshot property. |
| `coordinatorId` | property | <code>coordinatorId: string</code> | Public coordinator Id property. |
| `generation` | property | <code>generation: number</code> | Public generation property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `quarantineError` | property | <code>quarantineError: NormalizedMemoryError</code> | Public quarantine Error property. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public runtime Id property. |
| `status` | property | <code>status: MemoryRuntimeRevisionStatus</code> | Public status property. |

## `MemoryRuntimeControlStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activate` | method | <code>activate(coordinatorId: string, expectedGeneration: number &#124; null, next: MemoryRuntimeActiveState, previous?: MemoryRuntimeRevisionState): Promise&lt;boolean&gt;</code> | Public runtime operation for activate. |
| `durability` | property | <code>durability: "ephemeral" &#124; "durable"</code> | Public durability property. |
| `getActive` | method | <code>getActive(coordinatorId: string): Promise&lt;MemoryRuntimeActiveState &#124; null&gt;</code> | Gets Active at this module boundary. |
| `getRevision` | method | <code>getRevision(coordinatorId: string, profileRevision: string): Promise&lt;MemoryRuntimeRevisionState &#124; null&gt;</code> | Gets Revision at this module boundary. |
| `listRevisions` | method | <code>listRevisions(coordinatorId: string): Promise&lt;MemoryRuntimeRevisionState[]&gt;</code> | Lists Revisions at this module boundary. |
| `setRevision` | method | <code>setRevision(state: MemoryRuntimeRevisionState): Promise&lt;void&gt;</code> | Sets Revision at this module boundary. |

## `MemoryRuntimeCoordinatorOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityProbeIntervalMs` | property | <code>capabilityProbeIntervalMs: number</code> | Public capability Probe Interval Ms property. |
| `factory` | property | <code>factory: MemoryRuntimeFactory &#124; MemoryRuntimeCreator</code> | Public factory property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
| `requireDurableStore` | property | <code>requireDurableStore: boolean</code> | Public require Durable Store property. |
| `store` | property | <code>store: MemoryRuntimeControlStore</code> | Public store property. |

## `MemoryRuntimeCreator` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: unknown, references?: ReadonlyMap&lt;string, unknown&gt;): Promise&lt;MemoryRuntime&gt;</code> | Creates create at this module boundary. |

## `MemoryRuntimeGeneration` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generation` | property | <code>generation: number</code> | Public generation property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public runtime Id property. |

## `MemoryRuntimeRevisionState` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityHash` | property | <code>capabilityHash: string</code> | Public capability Hash property. |
| `capabilitySnapshot` | property | <code>capabilitySnapshot: MemoryManagementCapabilities</code> | Public capability Snapshot property. |
| `coordinatorId` | property | <code>coordinatorId: string</code> | Public coordinator Id property. |
| `generation` | property | <code>generation: number</code> | Public generation property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `observedAt` | property | <code>observedAt: string</code> | Public observed At property. |
| `profileHash` | property | <code>profileHash: string</code> | Public profile Hash property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `quarantineError` | property | <code>quarantineError: NormalizedMemoryError</code> | Public quarantine Error property. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public runtime Id property. |
| `status` | property | <code>status: MemoryRuntimeRevisionStatus</code> | Public status property. |

## `MemoryRuntimeSwitchResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `generation` | property | <code>generation: number</code> | Public generation property. |
| `previousProfileRevision` | property | <code>previousProfileRevision: string</code> | Public previous Profile Revision property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |
| `profileRevision` | property | <code>profileRevision: string</code> | Public profile Revision property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerRevision` | property | <code>providerRevision: string</code> | Public provider Revision property. |
| `runtimeId` | property | <code>runtimeId: string</code> | Public runtime Id property. |

## `StructuredMemoryRuntimeControlStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeTable` | property | <code>activeTable: string</code> | Public active Table property. |
| `provider` | property | <code>provider: StructuredStoreProvider</code> | Public provider property. |
| `revisionTable` | property | <code>revisionTable: string</code> | Public revision Table property. |
