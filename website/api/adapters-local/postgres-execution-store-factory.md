# `@codesoul-co/hypha-adapters-local` / `postgres-execution-store-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/postgres-execution-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/postgres-execution-store-factory.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `PostgresExecutionStoreFactory` | class | <code>new PostgresExecutionStoreFactory(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry. |
| `POSTGRES_EXECUTION_STORE_ID` | constant | <code>const POSTGRES_EXECUTION_STORE_ID: "execution-store.postgres"</code> | POSTGRES EXECUTION STORE ID constant exported by the `postgres-execution-store-factory` module. |
| `PostgresExecutionStoreFactoryOptions` | type | <code>type PostgresExecutionStoreFactoryOptions = PostgresExecutionStoreConnectionOptions</code> | Public type alias for Postgres Execution Store Factory Options. |

## `PostgresExecutionStoreFactory` public members

Composition adapter for the accepted Postgres Execution Store. Registration remains explicit: callers add this factory to the Core ExecutionStoreRegistry.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: PostgresExecutionStoreFactoryOptions): PostgresExecutionStoreFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): Promise&lt;ExecutionStore&gt;</code> | Creates create at this module boundary. |
| `storeId` | property | <code>storeId: "execution-store.postgres"</code> | Public store Id property. |
