# `@codesoul-co/hypha-tools` / `common-tool-ports`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/common-tool-ports.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-ports.ts)
- 导出数: **14**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactUtilityToolSpec` | 常量 | <code>const artifactUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 artifact Utility Tool Spec 常量。 |
| `commandUtilityToolSpec` | 常量 | <code>const commandUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 command Utility Tool Spec 常量。 |
| `commonPortToolSpecs` | 常量 | <code>const commonPortToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | 由 `common-tool-ports` 模块导出的 common Port Tool Specs 常量。 |
| `fileUtilityToolSpec` | 常量 | <code>const fileUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 file Utility Tool Spec 常量。 |
| `hashReferenceUtilityToolSpec` | 常量 | <code>const hashReferenceUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 hash Reference Utility Tool Spec 常量。 |
| `httpFetchUtilityToolSpec` | 常量 | <code>const httpFetchUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 http Fetch Utility Tool Spec 常量。 |
| `mcpResourceUtilityToolSpec` | 常量 | <code>const mcpResourceUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 mcp Resource Utility Tool Spec 常量。 |
| `memoryUtilityToolSpec` | 常量 | <code>const memoryUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 memory Utility Tool Spec 常量。 |
| `searchUtilityToolSpec` | 常量 | <code>const searchUtilityToolSpec: ToolSpec</code> | 由 `common-tool-ports` 模块导出的 search Utility Tool Spec 常量。 |
| `createPortBackedCommonToolBindings` | 函数 | <code>createPortBackedCommonToolBindings(ports: CommonToolPorts): CommonToolBinding[]</code> | 创建 Port Backed Common Tool Bindings。 |
| `CommonToolBinding` | 接口 | <code>interface CommonToolBinding</code> | Common Tool Binding 的字段契约；完整字段见下表。 |
| `CommonToolPort` | 接口 | <code>interface CommonToolPort</code> | Common Tool Port 的字段契约；完整字段见下表。 |
| `CommonToolPortRequest` | 接口 | <code>interface CommonToolPortRequest</code> | Common Tool Port Request 的字段契约；完整字段见下表。 |
| `CommonToolPorts` | 接口 | <code>interface CommonToolPorts</code> | Common Tool Ports 的字段契约；完整字段见下表。 |

## `CommonToolBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `adapter` | 属性 | <code>adapter: ToolAdapter&lt;unknown, unknown&gt;</code> | adapter 字段。 |
| `spec` | 属性 | <code>spec: ToolSpec</code> | spec 字段。 |

## `CommonToolPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: CommonToolPortRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |

## `CommonToolPortRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | context 字段。 |
| `input` | 属性 | <code>input: Record&lt;string, unknown&gt;</code> | input 字段。 |
| `operation` | 属性 | <code>operation: string</code> | operation 字段。 |

## `CommonToolPorts` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifacts` | 属性 | <code>artifacts: CommonToolPort</code> | artifacts 字段。 |
| `command` | 属性 | <code>command: CommonToolPort</code> | command 字段。 |
| `files` | 属性 | <code>files: CommonToolPort</code> | files 字段。 |
| `hashReference` | 属性 | <code>hashReference: CommonToolPort</code> | hash Reference 字段。 |
| `httpFetch` | 属性 | <code>httpFetch: CommonToolPort</code> | http Fetch 字段。 |
| `mcpResource` | 属性 | <code>mcpResource: CommonToolPort</code> | mcp Resource 字段。 |
| `memory` | 属性 | <code>memory: CommonToolPort</code> | memory 字段。 |
| `search` | 属性 | <code>search: CommonToolPort</code> | search 字段。 |
