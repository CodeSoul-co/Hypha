# `@codesoul-co/hypha-adapters-local` / `sqlite-execution-store-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-execution-store-factory.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SQLiteExecutionStoreFactory` | class | <code>new SQLiteExecutionStoreFactory(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | Runtime implementation for SQ Lite Execution Store Factory; see its public constructor and members below. |
| `SQLITE_EXECUTION_STORE_ID` | constant | <code>const SQLITE_EXECUTION_STORE_ID: "execution-store.sqlite"</code> | SQLITE EXECUTION STORE ID constant exported by the `sqlite-execution-store-factory` module. |

## `SQLiteExecutionStoreFactory` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: SQLiteExecutionStoreOptions): SQLiteExecutionStoreFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): Promise&lt;ExecutionStore&gt;</code> | Creates create at this module boundary. |
| `storeId` | property | <code>storeId: "execution-store.sqlite"</code> | Public store Id property. |
