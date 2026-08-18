# `@codesoul-co/hypha-core` / `ids`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/ids.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/ids.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `formatFrameworkId` | function | <code>formatFrameworkId(id: FrameworkId): string</code> | Public runtime operation for format Framework Id. |
| `FrameworkId` | interface | <code>interface FrameworkId</code> | Field contract for Framework Id; see all contract members below. |
| `FrameworkIdPrefix` | type | <code>type FrameworkIdPrefix = 'workspace' &#124; 'session' &#124; 'run' &#124; 'step' &#124; 'event' &#124; 'agent' &#124; 'skill' &#124; 'tool' &#124; 'memory' &#124; 'model' &#124; 'domain' &#124; 'workflow' &#124; 'policy' &#124; 'artifact'</code> | Public type alias for Framework Id Prefix. |

## `FrameworkId` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `prefix` | property | <code>prefix: FrameworkIdPrefix</code> | Public prefix property. |
| `value` | property | <code>value: string</code> | Public value property. |
