# `@codesoul-co/hypha-adapters-local` / `projection-store`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/projection-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/projection-store.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteProjectionStore` | class | <code>new SQLiteProjectionStore&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | Runtime implementation for SQ Lite Projection Store; see its public constructor and members below. |
| `SQLiteProjectionStoreOptions` | interface | <code>interface SQLiteProjectionStoreOptions</code> | Field contract for SQ Lite Projection Store Options; see all contract members below. |

## `SQLiteProjectionStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): void</code> | Public runtime operation for close. |
| `constructor` | constructor | <code>&lt;TState = unknown&gt;(options: SQLiteProjectionStoreOptions): SQLiteProjectionStore&lt;TState&gt;</code> | Creates an instance of this class. |
| `delete` | method | <code>delete(projectionId: string, key: string): Promise&lt;void&gt;</code> | Deletes delete at this module boundary. |
| `get` | method | <code>get(projectionId: string, key: string): Promise&lt;ProjectionRecord&lt;TState&gt; &#124; null&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(record: ProjectionRecord&lt;TState&gt;, expectedRevision?: number): Promise&lt;void&gt;</code> | Public runtime operation for put. |

## `SQLiteProjectionStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filename` | property | <code>filename: string</code> | Public filename property. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
