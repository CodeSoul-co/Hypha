# `@codesoul-co/hypha-tools` / `common-tools`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/common-tools.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)
- 导出数: **17**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `COMMON_TOOL_LIMITS` | 常量 | <code>const COMMON_TOOL_LIMITS: Readonly&lt;{ maxTextCharacters: 1000000; maxJsonDepth: 64; maxJsonNodes: 100000; maxPointerSegments: 128; maxMatches: 1000; maxQueryCharacters: 4096; }&gt;</code> | 由 `common-tools` 模块导出的 COMMON TOOL LIMITS 常量。 |
| `commonUtilityToolSpecs` | 常量 | <code>const commonUtilityToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | 由 `common-tools` 模块导出的 common Utility Tool Specs 常量。 |
| `hashUtilityToolSpec` | 常量 | <code>const hashUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 hash Utility Tool Spec 常量。 |
| `jsonUtilityToolSpec` | 常量 | <code>const jsonUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 json Utility Tool Spec 常量。 |
| `textUtilityToolSpec` | 常量 | <code>const textUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 text Utility Tool Spec 常量。 |
| `timeUtilityToolSpec` | 常量 | <code>const timeUtilityToolSpec: ToolSpec</code> | 由 `common-tools` 模块导出的 time Utility Tool Spec 常量。 |
| `executeHashUtility` | 函数 | <code>executeHashUtility(input: HashUtilityInput): Record&lt;string, unknown&gt;</code> | execute Hash Utility 的公开运行时操作。 |
| `executeJsonUtility` | 函数 | <code>executeJsonUtility(input: JsonUtilityInput): Record&lt;string, unknown&gt;</code> | execute Json Utility 的公开运行时操作。 |
| `executeTextUtility` | 函数 | <code>executeTextUtility(input: TextUtilityInput): Record&lt;string, unknown&gt;</code> | execute Text Utility 的公开运行时操作。 |
| `executeTimeUtility` | 函数 | <code>executeTimeUtility(input: TimeUtilityInput, now?: () =&gt; Date): Record&lt;string, unknown&gt;</code> | execute Time Utility 的公开运行时操作。 |
| `sanitizeJsonValue` | 函数 | <code>sanitizeJsonValue(value: unknown): JsonValue</code> | sanitize Json Value 的公开运行时操作。 |
| `JsonObject` | 接口 | <code>interface JsonObject</code> | Json Object 的字段契约；完整字段见下表。 |
| `TextUtilityInput` | 接口 | <code>interface TextUtilityInput</code> | Text Utility Input 的字段契约；完整字段见下表。 |
| `HashUtilityInput` | 类型 | <code>type HashUtilityInput = { operation: 'sha256_text'; text: string; } &#124; { operation: 'sha256_json'; value: unknown; }</code> | Hash Utility Input 的公共类型别名。 |
| `JsonUtilityInput` | 类型 | <code>type JsonUtilityInput = { operation: 'parse'; text: string; } &#124; { operation: 'stringify'; value: unknown; pretty?: boolean; } &#124; { operation: 'get'; value: unknown; pointer: string; } &#124; { operation: 'keys'; value: unknown; } &#124; { operation: 'validate'; value: unknown; schema: JsonSchema; }</code> | Json Utility Input 的公共类型别名。 |
| `JsonValue` | 类型 | <code>type JsonValue = null &#124; boolean &#124; number &#124; string &#124; JsonValue[] &#124; JsonObject</code> | Json Value 的公共类型别名。 |
| `TimeUtilityInput` | 类型 | <code>type TimeUtilityInput = { operation: 'now'; } &#124; { operation: 'parse'; value: string; } &#124; { operation: 'format'; value: string &#124; number; timeZone?: string; locale?: string; }</code> | Time Utility Input 的公共类型别名。 |

## `TextUtilityInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `caseSensitive` | 属性 | <code>caseSensitive: boolean</code> | case Sensitive 字段。 |
| `end` | 属性 | <code>end: number</code> | end 字段。 |
| `maxResults` | 属性 | <code>maxResults: number</code> | max Results 字段。 |
| `mode` | 属性 | <code>mode: "spaces" &#124; "lines"</code> | mode 字段。 |
| `operation` | 属性 | <code>operation: "length" &#124; "line_select" &#124; "literal_find" &#124; "literal_replace" &#124; "slice" &#124; "normalize_whitespace" &#124; "split" &#124; "join"</code> | operation 字段。 |
| `parts` | 属性 | <code>parts: string[]</code> | parts 字段。 |
| `query` | 属性 | <code>query: string</code> | query 字段。 |
| `replacement` | 属性 | <code>replacement: string</code> | replacement 字段。 |
| `separator` | 属性 | <code>separator: string</code> | separator 字段。 |
| `start` | 属性 | <code>start: number</code> | start 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
