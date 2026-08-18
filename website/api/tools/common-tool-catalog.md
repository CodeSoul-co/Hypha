# `@codesoul-co/hypha-tools` / `common-tool-catalog`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/common-tool-catalog.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tool-catalog.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `COMMON_TOOL_IDS` | constant | <code>const COMMON_TOOL_IDS: Readonly&lt;{ readonly json: "utility.json"; readonly text: "utility.text"; readonly hash: "utility.hash"; readonly time: "utility.time"; readonly files: "common.files"; readonly artifact: "common.artifact"; readonly httpFetch: "common.http_fetch"; readonly search: "common.search"; readonly memory: "common.memory"; readonly command: "common.command"; readonly mcpResource: "common.mcp_resource";...</code> | COMMON TOOL IDS constant exported by the `common-tool-catalog` module. |
| `commonToolCatalogSpecs` | constant | <code>const commonToolCatalogSpecs: readonly ToolSpec[]</code> | common Tool Catalog Specs constant exported by the `common-tool-catalog` module. |
| `assertCanonicalCommonToolCatalog` | function | <code>assertCanonicalCommonToolCatalog(): void</code> | Asserts Canonical Common Tool Catalog at this module boundary. |
| `resolveCommonToolSpec` | function | <code>resolveCommonToolSpec(id: string): ToolSpec &#124; null</code> | Resolves Common Tool Spec at this module boundary. |
| `CommonToolId` | type | <code>type CommonToolId = (typeof COMMON_TOOL_IDS)[keyof typeof COMMON_TOOL_IDS]</code> | Public type alias for Common Tool Id. |
