# `@codesoul-co/hypha-tools` / `tool-families`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/tool-families.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/tool-families.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `governedToolFamilySpecs` | constant | <code>const governedToolFamilySpecs: readonly ToolSpec[]</code> | governed Tool Family Specs constant exported by the `tool-families` module. |
| `createGovernedToolFamilyBindings` | function | <code>createGovernedToolFamilyBindings(ports: Readonly&lt;Record&lt;string, GovernedToolFamilyPort&gt;&gt;): GovernedToolFamilyBinding[]</code> | Creates Governed Tool Family Bindings at this module boundary. |
| `GovernedToolFamilyBinding` | interface | <code>interface GovernedToolFamilyBinding</code> | Field contract for Governed Tool Family Binding; see all contract members below. |
| `GovernedToolFamilyPort` | interface | <code>interface GovernedToolFamilyPort</code> | Field contract for Governed Tool Family Port; see all contract members below. |

## `GovernedToolFamilyBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapter` | property | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | Public adapter property. |
| `spec` | property | <code>spec: ToolSpec</code> | Public spec property. |

## `GovernedToolFamilyPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(input: { toolId: string; input: Record&lt;string, unknown&gt;; context: ToolCallContext; }): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |
