# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-helper`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-activity-helper.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-helper.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultRuntimeActivityHelper` | class | <code>new DefaultRuntimeActivityHelper(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | Runtime implementation for Default Runtime Activity Helper; see its public constructor and members below. |
| `RuntimeEventActivityLifecycleCommitPort` | class | <code>new RuntimeEventActivityLifecycleCommitPort(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | Runtime implementation for Runtime Event Activity Lifecycle Commit Port; see its public constructor and members below. |
| `DefaultRuntimeActivityHelperOptions` | interface | <code>interface DefaultRuntimeActivityHelperOptions</code> | Field contract for Default Runtime Activity Helper Options; see all contract members below. |

## `DefaultRuntimeActivityHelper` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: DefaultRuntimeActivityHelperOptions): DefaultRuntimeActivityHelper</code> | Creates an instance of this class. |
| `custom` | method | <code>custom(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for custom. |
| `execution` | method | <code>execution(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for execution. |
| `memory` | method | <code>memory(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for memory. |
| `model` | method | <code>model(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for model. |
| `tool` | method | <code>tool(request: RuntimeActivityRequest): Promise&lt;RuntimeActivityObservation&gt;</code> | Public runtime operation for tool. |

## `RuntimeEventActivityLifecycleCommitPort` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(request: RuntimeActivityLifecycleCommitRequest): Promise&lt;FrameworkEvent&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(events: RuntimeEventCommitPort): RuntimeEventActivityLifecycleCommitPort</code> | Creates an instance of this class. |

## `DefaultRuntimeActivityHelperOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `abortSignal` | property | <code>abortSignal: AbortSignal</code> | Public abort Signal property. |
| `clock` | property | <code>clock: { now(): Promise&lt;string&gt;; }</code> | Public clock property. |
| `dispatch` | property | <code>dispatch: RuntimeActivityDispatchPort</code> | Public dispatch property. |
| `execution` | property | <code>execution: RuntimeHelperExecutionScope</code> | Public execution property. |
| `ids` | property | <code>ids: RuntimeIdHelper</code> | Public ids property. |
| `lifecycle` | property | <code>lifecycle: RuntimeActivityLifecycleCommitPort</code> | Public lifecycle property. |
