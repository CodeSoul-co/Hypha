# `@codesoul-co/hypha-adapters-local` / `local-process-resource-accounting`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-process-resource-accounting.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-process-resource-accounting.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalProcessResourceAccountant` | class | <code>new LocalProcessResourceAccountant(): LocalProcessResourceAccountant</code> | Reports only evidence the host Local Process adapter can actually observe. |
| `LocalProcessResourceEvidence` | interface | <code>interface LocalProcessResourceEvidence</code> | Field contract for Local Process Resource Evidence; see all contract members below. |

## `LocalProcessResourceAccountant` public members

Reports only evidence the host Local Process adapter can actually observe.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `account` | method | <code>account(result: LocalProcessRunResult): LocalProcessResourceEvidence</code> | Public runtime operation for account. |
| `constructor` | constructor | <code>(): LocalProcessResourceAccountant</code> | Creates an instance of this class. |

## `LocalProcessResourceEvidence` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `usage` | property | <code>usage: ExecutionResourceUsage</code> | Public usage property. |
