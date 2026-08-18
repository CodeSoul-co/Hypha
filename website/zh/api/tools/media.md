# `@codesoul-co/hypha-tools` / `media`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/media.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)
- 导出数: **18**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `genericOcrInputJsonSchema` | 常量 | <code>const genericOcrInputJsonSchema: JsonSchema</code> | generic Ocr Input 的 JSON Schema。 |
| `genericVideoSourceInputJsonSchema` | 常量 | <code>const genericVideoSourceInputJsonSchema: JsonSchema</code> | generic Video Source Input 的 JSON Schema。 |
| `ocrRequestSchema` | 常量 | <code>const ocrRequestSchema: z.ZodObject&lt;{ source: z.ZodType&lt;OcrInputSource, z.ZodTypeDef, OcrInputSource&gt;; languages: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; pageRange: z.ZodOptional&lt;z.ZodObject&lt;{ start: z.ZodOptional&lt;z.ZodNumber&gt;; end: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { start?: number &#124; undefined; end?: number &#124; undefined; }, { start?: number &#124; undefined; end?: number &#124; undefined; }&gt;&gt;; fe...</code> | ocr Request 的运行时 Schema。 |
| `videoSourceRequestSchema` | 常量 | <code>const videoSourceRequestSchema: z.ZodObject&lt;{ url: z.ZodString; titleHint: z.ZodOptional&lt;z.ZodString&gt;; locale: z.ZodOptional&lt;z.ZodString&gt;; includeEpisodes: z.ZodOptional&lt;z.ZodBoolean&gt;; includeCaptions: z.ZodOptional&lt;z.ZodBoolean&gt;; providerHint: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { url: string; metadata?: Record&lt;string, unknown&gt; &#124; u...</code> | video Source Request 的运行时 Schema。 |
| `createOcrToolSpec` | 函数 | <code>createOcrToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | 创建 Ocr Tool Spec。 |
| `createVideoSourceToolSpec` | 函数 | <code>createVideoSourceToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | 创建 Video Source Tool Spec。 |
| `OcrBlock` | 接口 | <code>interface OcrBlock</code> | Ocr Block 的字段契约；完整字段见下表。 |
| `OcrBoundingBox` | 接口 | <code>interface OcrBoundingBox</code> | Ocr Bounding Box 的字段契约；完整字段见下表。 |
| `OcrPage` | 接口 | <code>interface OcrPage</code> | Ocr Page 的字段契约；完整字段见下表。 |
| `OcrProvider` | 接口 | <code>interface OcrProvider</code> | Ocr Provider 的字段契约；完整字段见下表。 |
| `OcrRequest` | 接口 | <code>interface OcrRequest</code> | Ocr Request 的字段契约；完整字段见下表。 |
| `OcrResult` | 接口 | <code>interface OcrResult</code> | Ocr Result 的字段契约；完整字段见下表。 |
| `VideoSourceEpisode` | 接口 | <code>interface VideoSourceEpisode</code> | Video Source Episode 的字段契约；完整字段见下表。 |
| `VideoSourcePreview` | 接口 | <code>interface VideoSourcePreview</code> | Video Source Preview 的字段契约；完整字段见下表。 |
| `VideoSourceProvider` | 接口 | <code>interface VideoSourceProvider</code> | Video Source Provider 的字段契约；完整字段见下表。 |
| `VideoSourceRequest` | 接口 | <code>interface VideoSourceRequest</code> | Video Source Request 的字段契约；完整字段见下表。 |
| `OcrInputSource` | 类型 | <code>type OcrInputSource = { type: 'artifact'; artifactRef: string; mimeType?: string; fileName?: string; } &#124; { type: 'url'; url: string; mimeType?: string; fileName?: string; } &#124; { type: 'inline'; dataBase64: string; mimeType: string; fileName?: string; } &#124; { type: 'text'; text: string; fileName?: string; }</code> | Ocr Input Source 的公共类型别名。 |
| `VideoSourceKind` | 类型 | <code>type VideoSourceKind = 'video' &#124; 'playlist' &#124; 'collection' &#124; 'live' &#124; 'unknown'</code> | Video Source Kind 的公共类型别名。 |

## `OcrBlock` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `boundingBox` | 属性 | <code>boundingBox: OcrBoundingBox</code> | bounding Box 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
| `type` | 属性 | <code>type: "unknown" &#124; "image" &#124; "table" &#124; "list" &#124; "text" &#124; "title" &#124; "formula"</code> | type 字段。 |

## `OcrBoundingBox` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `height` | 属性 | <code>height: number</code> | height 字段。 |
| `unit` | 属性 | <code>unit: "pixel" &#124; "normalized" &#124; "point"</code> | unit 字段。 |
| `width` | 属性 | <code>width: number</code> | width 字段。 |
| `x` | 属性 | <code>x: number</code> | x 字段。 |
| `y` | 属性 | <code>y: number</code> | y 字段。 |

## `OcrPage` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `blocks` | 属性 | <code>blocks: OcrBlock[]</code> | blocks 字段。 |
| `confidence` | 属性 | <code>confidence: number</code> | confidence 字段。 |
| `height` | 属性 | <code>height: number</code> | height 字段。 |
| `pageNumber` | 属性 | <code>pageNumber: number</code> | page Number 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
| `width` | 属性 | <code>width: number</code> | width 字段。 |

## `OcrProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `recognize` | 方法 | <code>recognize(request: OcrRequest, context?: ToolCallContext): Promise&lt;OcrResult&gt;</code> | recognize 的公开运行时操作。 |

## `OcrRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `features` | 属性 | <code>features: ("text" &#124; "layout" &#124; "tables" &#124; "formulas")[]</code> | features 字段。 |
| `languages` | 属性 | <code>languages: string[]</code> | languages 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `output` | 属性 | <code>output: { includeBlocks?: boolean; includeConfidence?: boolean; artifactize?: boolean; }</code> | output 字段。 |
| `pageRange` | 属性 | <code>pageRange: { start?: number; end?: number; }</code> | page Range 字段。 |
| `providerHint` | 属性 | <code>providerHint: string</code> | provider Hint 字段。 |
| `source` | 属性 | <code>source: OcrInputSource</code> | source 字段。 |

## `OcrResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs: string[]</code> | artifact Refs 字段。 |
| `detectedLanguages` | 属性 | <code>detectedLanguages: string[]</code> | detected Languages 字段。 |
| `error` | 属性 | <code>error: { code: string; message: string; retryable?: boolean; }</code> | error 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `pages` | 属性 | <code>pages: OcrPage[]</code> | pages 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `providerVersion` | 属性 | <code>providerVersion: string</code> | provider Version 字段。 |
| `status` | 属性 | <code>status: "completed" &#124; "failed" &#124; "partial"</code> | status 字段。 |
| `text` | 属性 | <code>text: string</code> | text 字段。 |
| `warnings` | 属性 | <code>warnings: string[]</code> | warnings 字段。 |

## `VideoSourceEpisode` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `captionRefs` | 属性 | <code>captionRefs: string[]</code> | caption Refs 字段。 |
| `durationSeconds` | 属性 | <code>durationSeconds: number</code> | duration Seconds 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `order` | 属性 | <code>order: number</code> | order 字段。 |
| `thumbnailUrl` | 属性 | <code>thumbnailUrl: string</code> | thumbnail Url 字段。 |
| `title` | 属性 | <code>title: string</code> | title 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |

## `VideoSourcePreview` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `author` | 属性 | <code>author: string</code> | author 字段。 |
| `canonicalUrl` | 属性 | <code>canonicalUrl: string</code> | canonical Url 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `durationSeconds` | 属性 | <code>durationSeconds: number</code> | duration Seconds 字段。 |
| `episodes` | 属性 | <code>episodes: VideoSourceEpisode[]</code> | episodes 字段。 |
| `manualEntryRequired` | 属性 | <code>manualEntryRequired: boolean</code> | manual Entry Required 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `parsedAt` | 属性 | <code>parsedAt: string</code> | parsed At 字段。 |
| `provider` | 属性 | <code>provider: string</code> | provider 字段。 |
| `publishedAt` | 属性 | <code>publishedAt: string</code> | published At 字段。 |
| `sourceId` | 属性 | <code>sourceId: string</code> | source Id 字段。 |
| `sourceKind` | 属性 | <code>sourceKind: VideoSourceKind</code> | source Kind 字段。 |
| `thumbnailUrl` | 属性 | <code>thumbnailUrl: string</code> | thumbnail Url 字段。 |
| `title` | 属性 | <code>title: string</code> | title 字段。 |
| `warnings` | 属性 | <code>warnings: string[]</code> | warnings 字段。 |

## `VideoSourceProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `preview` | 方法 | <code>preview(request: VideoSourceRequest, context?: ToolCallContext): Promise&lt;VideoSourcePreview&gt;</code> | preview 的公开运行时操作。 |
| `supports` | 方法 | <code>supports(url: string): boolean &#124; Promise&lt;boolean&gt;</code> | supports 的公开运行时操作。 |

## `VideoSourceRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `includeCaptions` | 属性 | <code>includeCaptions: boolean</code> | include Captions 字段。 |
| `includeEpisodes` | 属性 | <code>includeEpisodes: boolean</code> | include Episodes 字段。 |
| `locale` | 属性 | <code>locale: string</code> | locale 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `providerHint` | 属性 | <code>providerHint: string</code> | provider Hint 字段。 |
| `titleHint` | 属性 | <code>titleHint: string</code> | title Hint 字段。 |
| `url` | 属性 | <code>url: string</code> | url 字段。 |
