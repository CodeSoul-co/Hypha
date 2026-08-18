# `@codesoul-co/hypha-adapters-local` / `sqlite-driver`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Source: [`packages/adapters-local/src/sqlite-driver.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)
- Exports: **4**

## Using this module

Use the Sqlite driver module for using the public contracts and operations for this capability boundary. It exports 1 function, 3 interfaces.

### Import from the package entrypoint

```ts
import {
  loadSqlite,
} from '@codesoul-co/hypha-adapters-local';

import type {
  SqliteDatabaseSync,
  SqliteModule,
  SqliteStatementSync,
} from '@codesoul-co/hypha-adapters-local';
```

### Usage patterns

- Use the 3 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 function as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.


## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `loadSqlite` | function | <code>loadSqlite(required?: boolean): SqliteModule &#124; null</code> | Load Sqlite function with 1 public call signature; parameters and return types are listed below. |
| `SqliteDatabaseSync` | interface | <code>interface SqliteDatabaseSync</code> | Sqlite Database Sync interface with 3 public fields or methods. |
| `SqliteModule` | interface | <code>interface SqliteModule</code> | Sqlite Module interface with 1 public fields or methods. |
| `SqliteStatementSync` | interface | <code>interface SqliteStatementSync</code> | Sqlite Statement Sync interface with 3 public fields or methods. |

## `loadSqlite`

Load Sqlite function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { loadSqlite } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### Declaration

```text
export declare function loadSqlite(required?: boolean): SqliteModule | null;
```

### Call signature

```text
loadSqlite(required?: boolean): SqliteModule | null
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `required` | <code>boolean</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SqliteModule`
- Description: The return contract is defined by the type shown above.

## `SqliteDatabaseSync`

Sqlite Database Sync interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SqliteDatabaseSync } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### Declaration

```text
export interface SqliteDatabaseSync {
    exec(sql: string): void;
    prepare(sql: string): SqliteStatementSync;
    close?(): void;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close?(): void</code> | Public method; parameters and return type are shown in the signature. |
| `exec` | method | <code>exec(sql: string): void</code> | Public method; parameters and return type are shown in the signature. |
| `prepare` | method | <code>prepare(sql: string): SqliteStatementSync</code> | Public method; parameters and return type are shown in the signature. |

## `SqliteModule`

Sqlite Module interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { SqliteModule } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### Declaration

```text
export interface SqliteModule {
    DatabaseSync: new (filename: string) => SqliteDatabaseSync;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DatabaseSync` | property | <code>DatabaseSync: new (filename: string) =&gt; SqliteDatabaseSync</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SqliteStatementSync`

Sqlite Statement Sync interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SqliteStatementSync } from '@codesoul-co/hypha-adapters-local';`
- Source module: [`sqlite-driver`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/sqlite-driver.ts)

### Declaration

```text
export interface SqliteStatementSync {
    get(...params: unknown[]): Record<string, unknown> | undefined;
    all(...params: unknown[]): Array<Record<string, unknown>>;
    run(...params: unknown[]): unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `all` | method | <code>all(...params: unknown[]): Array&lt;Record&lt;string, unknown&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `get` | method | <code>get(...params: unknown[]): Record&lt;string, unknown&gt; &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `run` | method | <code>run(...params: unknown[]): unknown</code> | Public method; parameters and return type are shown in the signature. |
