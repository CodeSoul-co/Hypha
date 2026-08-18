# `@codesoul-co/hypha-core` / `modules/runtime/runtime-io-helpers`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-io-helpers.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-io-helpers.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultRuntimeEventHelper` | class | <code>new DefaultRuntimeEventHelper(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | Runtime implementation for Default Runtime Event Helper; see its public constructor and members below. |
| `DefaultRuntimeResourceHelper` | class | <code>new DefaultRuntimeResourceHelper(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | Runtime implementation for Default Runtime Resource Helper; see its public constructor and members below. |
| `DurableRuntimeEventCommitPort` | class | <code>new DurableRuntimeEventCommitPort(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | Runtime implementation for Durable Runtime Event Commit Port; see its public constructor and members below. |
| `createRuntimeIoHelperSdk` | function | <code>createRuntimeIoHelperSdk(options: { event: DefaultRuntimeEventHelperOptions; resource: RuntimeResourceHelperDependencies; }): RuntimeIoHelperSdk</code> | Creates Runtime Io Helper Sdk at this module boundary. |
| `DefaultRuntimeEventHelperOptions` | interface | <code>interface DefaultRuntimeEventHelperOptions</code> | Field contract for Default Runtime Event Helper Options; see all contract members below. |

## `DefaultRuntimeEventHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append&lt;T extends RuntimeJsonValue&gt;(type: `runtime.observation.${string}`, payload: T, options?: RuntimeEventAppendOptions): Promise&lt;FrameworkEvent&lt;T&gt;&gt;</code> | Appends append at this module boundary. |
| `appendBatch` | method | <code>appendBatch(inputs: RuntimeObservationEventInput[]): Promise&lt;FrameworkEvent[]&gt;</code> | Appends Batch at this module boundary. |
| `constructor` | constructor | <code>(options: DefaultRuntimeEventHelperOptions): DefaultRuntimeEventHelper</code> | Creates an instance of this class. |
| `readSince` | method | <code>readSince(sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public runtime operation for read Since. |

## `DefaultRuntimeResourceHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquire` | method | <code>acquire(resources: Omit&lt;RuntimeResourceRequest, "requestedClaimId"&gt;[], options: RuntimeResourceAcquireOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for acquire. |
| `assertCurrent` | method | <code>assertCurrent(claim: RuntimeResourceClaim): Promise&lt;RuntimeResourceClaim&gt;</code> | Asserts Current at this module boundary. |
| `constructor` | constructor | <code>(dependencies: RuntimeResourceHelperDependencies): DefaultRuntimeResourceHelper</code> | Creates an instance of this class. |
| `release` | method | <code>release(claims: RuntimeResourceClaim[]): Promise&lt;void&gt;</code> | Public runtime operation for release. |
| `renew` | method | <code>renew(claims: RuntimeResourceClaim[], options: RuntimeResourceRenewOptions): Promise&lt;RuntimeResourceClaim[]&gt;</code> | Public runtime operation for renew. |

## `DurableRuntimeEventCommitPort` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeEventCommitRequest): Promise&lt;FrameworkEvent[]&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(store: DurableEventStore): DurableRuntimeEventCommitPort</code> | Creates an instance of this class. |
| `readSince` | method | <code>readSince(scope: RuntimeScope, sequence: number): Promise&lt;FrameworkEvent[]&gt;</code> | Public runtime operation for read Since. |

## `DefaultRuntimeEventHelperOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `clock` | property | <code>clock: { now(): Promise&lt;string&gt;; }</code> | Public clock property. |
| `execution` | property | <code>execution: RuntimeHelperExecutionScope</code> | Public execution property. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public ids property. |
| `port` | property | <code>port: RuntimeEventCommitPort</code> | Public port property. |
