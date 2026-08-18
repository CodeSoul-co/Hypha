# `@codesoul-co/hypha-tools` / `common-tools`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/common-tools.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/common-tools.ts)
- Exports: **17**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `COMMON_TOOL_LIMITS` | constant | <code>const COMMON_TOOL_LIMITS: Readonly&lt;{ maxTextCharacters: 1000000; maxJsonDepth: 64; maxJsonNodes: 100000; maxPointerSegments: 128; maxMatches: 1000; maxQueryCharacters: 4096; }&gt;</code> | COMMON TOOL LIMITS constant exported by the `common-tools` module. |
| `commonUtilityToolSpecs` | constant | <code>const commonUtilityToolSpecs: readonly [ToolSpec, ToolSpec, ToolSpec, ToolSpec]</code> | common Utility Tool Specs constant exported by the `common-tools` module. |
| `hashUtilityToolSpec` | constant | <code>const hashUtilityToolSpec: ToolSpec</code> | hash Utility Tool Spec constant exported by the `common-tools` module. |
| `jsonUtilityToolSpec` | constant | <code>const jsonUtilityToolSpec: ToolSpec</code> | json Utility Tool Spec constant exported by the `common-tools` module. |
| `textUtilityToolSpec` | constant | <code>const textUtilityToolSpec: ToolSpec</code> | text Utility Tool Spec constant exported by the `common-tools` module. |
| `timeUtilityToolSpec` | constant | <code>const timeUtilityToolSpec: ToolSpec</code> | time Utility Tool Spec constant exported by the `common-tools` module. |
| `executeHashUtility` | function | <code>executeHashUtility(input: HashUtilityInput): Record&lt;string, unknown&gt;</code> | Public runtime operation for execute Hash Utility. |
| `executeJsonUtility` | function | <code>executeJsonUtility(input: JsonUtilityInput): Record&lt;string, unknown&gt;</code> | Public runtime operation for execute Json Utility. |
| `executeTextUtility` | function | <code>executeTextUtility(input: TextUtilityInput): Record&lt;string, unknown&gt;</code> | Public runtime operation for execute Text Utility. |
| `executeTimeUtility` | function | <code>executeTimeUtility(input: TimeUtilityInput, now?: () =&gt; Date): Record&lt;string, unknown&gt;</code> | Public runtime operation for execute Time Utility. |
| `sanitizeJsonValue` | function | <code>sanitizeJsonValue(value: unknown): JsonValue</code> | Public runtime operation for sanitize Json Value. |
| `JsonObject` | interface | <code>interface JsonObject</code> | Field contract for Json Object; see all contract members below. |
| `TextUtilityInput` | interface | <code>interface TextUtilityInput</code> | Field contract for Text Utility Input; see all contract members below. |
| `HashUtilityInput` | type | <code>type HashUtilityInput = { operation: 'sha256_text'; text: string; } &#124; { operation: 'sha256_json'; value: unknown; }</code> | Public type alias for Hash Utility Input. |
| `JsonUtilityInput` | type | <code>type JsonUtilityInput = { operation: 'parse'; text: string; } &#124; { operation: 'stringify'; value: unknown; pretty?: boolean; } &#124; { operation: 'get'; value: unknown; pointer: string; } &#124; { operation: 'keys'; value: unknown; } &#124; { operation: 'validate'; value: unknown; schema: JsonSchema; }</code> | Public type alias for Json Utility Input. |
| `JsonValue` | type | <code>type JsonValue = null &#124; boolean &#124; number &#124; string &#124; JsonValue[] &#124; JsonObject</code> | Public type alias for Json Value. |
| `TimeUtilityInput` | type | <code>type TimeUtilityInput = { operation: 'now'; } &#124; { operation: 'parse'; value: string; } &#124; { operation: 'format'; value: string &#124; number; timeZone?: string; locale?: string; }</code> | Public type alias for Time Utility Input. |

## `TextUtilityInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `caseSensitive` | property | <code>caseSensitive: boolean</code> | Public case Sensitive property. |
| `end` | property | <code>end: number</code> | Public end property. |
| `maxResults` | property | <code>maxResults: number</code> | Public max Results property. |
| `mode` | property | <code>mode: "spaces" &#124; "lines"</code> | Public mode property. |
| `operation` | property | <code>operation: "length" &#124; "line_select" &#124; "literal_find" &#124; "literal_replace" &#124; "slice" &#124; "normalize_whitespace" &#124; "split" &#124; "join"</code> | Public operation property. |
| `parts` | property | <code>parts: string[]</code> | Public parts property. |
| `query` | property | <code>query: string</code> | Public query property. |
| `replacement` | property | <code>replacement: string</code> | Public replacement property. |
| `separator` | property | <code>separator: string</code> | Public separator property. |
| `start` | property | <code>start: number</code> | Public start property. |
| `text` | property | <code>text: string</code> | Public text property. |
