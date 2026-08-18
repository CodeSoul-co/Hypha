# `@codesoul-co/hypha-tools` / `common-tool-ports`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/common-tool-ports.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)
- Exports: **14**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactUtilityToolSpec` | constant | <code>const artifactUtilityToolSpec: ToolSpec</code> | artifact Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `commandUtilityToolSpec` | constant | <code>const commandUtilityToolSpec: ToolSpec</code> | command Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `commonPortToolSpecs` | constant | <code>const commonPortToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | common Port Tool Specs constant exported by the `common-tool-ports` module. |
| `fileUtilityToolSpec` | constant | <code>const fileUtilityToolSpec: ToolSpec</code> | file Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `hashReferenceUtilityToolSpec` | constant | <code>const hashReferenceUtilityToolSpec: ToolSpec</code> | hash Reference Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `httpFetchUtilityToolSpec` | constant | <code>const httpFetchUtilityToolSpec: ToolSpec</code> | http Fetch Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `mcpResourceUtilityToolSpec` | constant | <code>const mcpResourceUtilityToolSpec: ToolSpec</code> | mcp Resource Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `memoryUtilityToolSpec` | constant | <code>const memoryUtilityToolSpec: ToolSpec</code> | memory Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `searchUtilityToolSpec` | constant | <code>const searchUtilityToolSpec: ToolSpec</code> | search Utility Tool Spec constant exported by the `common-tool-ports` module. |
| `createPortBackedCommonToolBindings` | function | <code>createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[]</code> | Creates Port Backed Common Tool Bindings at this module boundary. |
| `CommonToolBinding` | interface | <code>interface CommonToolBinding</code> | Field contract for Common Tool Binding; see all contract members below. |
| `CommonToolPort` | interface | <code>interface CommonToolPort</code> | Field contract for Common Tool Port; see all contract members below. |
| `CommonToolPortRequest` | interface | <code>interface CommonToolPortRequest</code> | Field contract for Common Tool Port Request; see all contract members below. |
| `CommonToolPorts` | interface | <code>interface CommonToolPorts</code> | Field contract for Common Tool Ports; see all contract members below. |

## `CommonToolBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapter` | property | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | Public adapter property. |
| `spec` | property | <code>spec: ToolSpec</code> | Public spec property. |

## `CommonToolPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: CommonToolPortRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |

## `CommonToolPortRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public context property. |
| `input` | property | <code>input: Record&lt;string, unknown&gt;</code> | Public input property. |
| `operation` | property | <code>operation: string</code> | Public operation property. |

## `CommonToolPorts` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: CommonToolPort</code> | Public artifacts property. |
| `command` | property | <code>command: CommonToolPort</code> | Public command property. |
| `files` | property | <code>files: CommonToolPort</code> | Public files property. |
| `hashReference` | property | <code>hashReference: CommonToolPort</code> | Public hash Reference property. |
| `httpFetch` | property | <code>httpFetch: CommonToolPort</code> | Public http Fetch property. |
| `mcpResource` | property | <code>mcpResource: CommonToolPort</code> | Public mcp Resource property. |
| `memory` | property | <code>memory: CommonToolPort</code> | Public memory property. |
| `search` | property | <code>search: CommonToolPort</code> | Public search property. |
