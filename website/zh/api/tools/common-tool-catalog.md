# `@codesoul-co/hypha-tools` / `common-tool-catalog`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/common-tool-catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)
- 导出数: **5**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `COMMON_TOOL_IDS` | 常量 | <code>const COMMON_TOOL_IDS: Readonly&lt;{ readonly json: "utility.json"; readonly text: "utility.text"; readonly hash: "utility.hash"; readonly time: "utility.time"; readonly files: "common.files"; readonly artifact: "common.artifact"; readonly httpFetch: "common.http_fetch"; readonly search: "common.search"; readonly memory: "common.memory"; readonly command: "common.command"; readonly mcpResource: "common.mcp_resource";...</code> | 由 `common-tool-catalog` 模块导出的 COMMON TOOL IDS 常量。 |
| `commonToolCatalogSpecs` | 常量 | <code>const commonToolCatalogSpecs: readonly ToolSpec[]</code> | 由 `common-tool-catalog` 模块导出的 common Tool Catalog Specs 常量。 |
| `assertCanonicalCommonToolCatalog` | 函数 | <code>assertCanonicalCommonToolCatalog(): void</code> | 断言 Canonical Common Tool Catalog。 |
| `resolveCommonToolSpec` | 函数 | <code>resolveCommonToolSpec(id: string): ToolSpec &#124; null</code> | 解析 Common Tool Spec。 |
| `CommonToolId` | 类型 | <code>type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS]</code> | Common Tool Id 的公共类型别名。 |
