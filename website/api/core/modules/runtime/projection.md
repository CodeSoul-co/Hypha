# `@codesoul-co/hypha-core` / `modules/runtime/projection`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/projection.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/projection.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryProjectionStore` | class | <code>new InMemoryProjectionStore&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | Runtime implementation for In Memory Projection Store; see its public constructor and members below. |
| `ProjectionEngine` | class | <code>new ProjectionEngine(options: ProjectionEngineOptions): ProjectionEngine</code> | Runtime implementation for Projection Engine; see its public constructor and members below. |
| `validateProjectionRecord` | function | <code>validateProjectionRecord&lt;TState&gt;(record: ProjectionRecord&lt;TState&gt;): void</code> | Validates Projection Record at this module boundary. |
| `ProjectionDefinition` | interface | <code>interface ProjectionDefinition</code> | Field contract for Projection Definition; see all contract members below. |
| `ProjectionEngineOptions` | interface | <code>interface ProjectionEngineOptions</code> | Field contract for Projection Engine Options; see all contract members below. |
| `ProjectionRecord` | interface | <code>interface ProjectionRecord</code> | Field contract for Projection Record; see all contract members below. |
| `ProjectionStore` | interface | <code>interface ProjectionStore</code> | Field contract for Projection Store; see all contract members below. |

## `InMemoryProjectionStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>&lt;TState = unknown&gt;(): InMemoryProjectionStore&lt;TState&gt;</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | Public runtime operation for put. |

## `ProjectionEngine` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ProjectionEngineOptions): ProjectionEngine</code> | Creates an instance of this class. |
| `rebuild` | method | <code>rebuild&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | Public runtime operation for rebuild. |
| `update` | method | <code>update&lt;TState&gt;(definition: ProjectionDefinition&lt;TState&gt;, store: ProjectionStore&lt;TState&gt;, scope: EventStreamScope, key?: string): Promise&lt;ProjectionRecord&lt;TState&gt;&gt;</code> | Public runtime operation for update. |

## `ProjectionDefinition` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `applies` | method | <code>applies(event: PersistedFrameworkEvent): boolean</code> | Public runtime operation for applies. |
| `id` | property | <code>id: string</code> | Public id property. |
| `initialState` | method | <code>initialState(): TState</code> | Public runtime operation for initial State. |
| `reduce` | method | <code>reduce(state: TState, event: PersistedFrameworkEvent): TState</code> | Public runtime operation for reduce. |
| `version` | property | <code>version: string</code> | Public version property. |

## `ProjectionEngineOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `events` | property | <code>events: Pick&lt;EventRuntime, "read"&gt;</code> | Public events property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |

## `ProjectionRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `key` | property | <code>key: string</code> | Public key property. |
| `lastSequence` | property | <code>lastSequence: number</code> | Public last Sequence property. |
| `projectionId` | property | <code>projectionId: string</code> | Public projection Id property. |
| `projectionVersion` | property | <code>projectionVersion: string</code> | Public projection Version property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `state` | property | <code>state: TState</code> | Public state property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `ProjectionStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `delete` | method | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | Public runtime operation for put. |
