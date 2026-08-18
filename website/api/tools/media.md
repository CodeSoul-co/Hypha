# `@codesoul-co/hypha-tools` / `media`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Package guide: [learning and composition guide](/packages/tools)
- Source: [`packages/tools/src/media.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)
- Exports: **18**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `genericOcrInputJsonSchema` | constant | <code>const genericOcrInputJsonSchema: JsonSchema</code> | JSON Schema for generic Ocr Input. |
| `genericVideoSourceInputJsonSchema` | constant | <code>const genericVideoSourceInputJsonSchema: JsonSchema</code> | JSON Schema for generic Video Source Input. |
| `ocrRequestSchema` | constant | <code>const ocrRequestSchema: z.ZodObject&lt;{ source: z.ZodType&lt;OcrInputSource, z.ZodTypeDef, OcrInputSource&gt;; languages: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; pageRange: z.ZodOptional&lt;z.ZodObject&lt;{ start: z.ZodOptional&lt;z.ZodNumber&gt;; end: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { start?: number &#124; undefined; end?: number &#124; undefined; }, { start?: number &#124; undefined; end?: number &#124; undefined; }&gt;&gt;; fe...</code> | Runtime schema for ocr Request. |
| `videoSourceRequestSchema` | constant | <code>const videoSourceRequestSchema: z.ZodObject&lt;{ url: z.ZodString; titleHint: z.ZodOptional&lt;z.ZodString&gt;; locale: z.ZodOptional&lt;z.ZodString&gt;; includeEpisodes: z.ZodOptional&lt;z.ZodBoolean&gt;; includeCaptions: z.ZodOptional&lt;z.ZodBoolean&gt;; providerHint: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { url: string; metadata?: Record&lt;string, unknown&gt; &#124; u...</code> | Runtime schema for video Source Request. |
| `createOcrToolSpec` | function | <code>createOcrToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | Creates Ocr Tool Spec at this module boundary. |
| `createVideoSourceToolSpec` | function | <code>createVideoSourceToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | Creates Video Source Tool Spec at this module boundary. |
| `OcrBlock` | interface | <code>interface OcrBlock</code> | Field contract for Ocr Block; see all contract members below. |
| `OcrBoundingBox` | interface | <code>interface OcrBoundingBox</code> | Field contract for Ocr Bounding Box; see all contract members below. |
| `OcrPage` | interface | <code>interface OcrPage</code> | Field contract for Ocr Page; see all contract members below. |
| `OcrProvider` | interface | <code>interface OcrProvider</code> | Field contract for Ocr Provider; see all contract members below. |
| `OcrRequest` | interface | <code>interface OcrRequest</code> | Field contract for Ocr Request; see all contract members below. |
| `OcrResult` | interface | <code>interface OcrResult</code> | Field contract for Ocr Result; see all contract members below. |
| `VideoSourceEpisode` | interface | <code>interface VideoSourceEpisode</code> | Field contract for Video Source Episode; see all contract members below. |
| `VideoSourcePreview` | interface | <code>interface VideoSourcePreview</code> | Field contract for Video Source Preview; see all contract members below. |
| `VideoSourceProvider` | interface | <code>interface VideoSourceProvider</code> | Field contract for Video Source Provider; see all contract members below. |
| `VideoSourceRequest` | interface | <code>interface VideoSourceRequest</code> | Field contract for Video Source Request; see all contract members below. |
| `OcrInputSource` | type | <code>type OcrInputSource = { type: 'artifact'; artifactRef: string; mimeType?: string; fileName?: string; } &#124; { type: 'url'; url: string; mimeType?: string; fileName?: string; } &#124; { type: 'inline'; dataBase64: string; mimeType: string; fileName?: string; } &#124; { type: 'text'; text: string; fileName?: string; }</code> | Public type alias for Ocr Input Source. |
| `VideoSourceKind` | type | <code>type VideoSourceKind = 'video' &#124; 'playlist' &#124; 'collection' &#124; 'live' &#124; 'unknown'</code> | Public type alias for Video Source Kind. |

## `OcrBlock` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `boundingBox` | property | <code>boundingBox: OcrBoundingBox</code> | Public bounding Box property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `text` | property | <code>text: string</code> | Public text property. |
| `type` | property | <code>type: "unknown" &#124; "image" &#124; "table" &#124; "list" &#124; "text" &#124; "title" &#124; "formula"</code> | Public type property. |

## `OcrBoundingBox` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `height` | property | <code>height: number</code> | Public height property. |
| `unit` | property | <code>unit: "pixel" &#124; "normalized" &#124; "point"</code> | Public unit property. |
| `width` | property | <code>width: number</code> | Public width property. |
| `x` | property | <code>x: number</code> | Public x property. |
| `y` | property | <code>y: number</code> | Public y property. |

## `OcrPage` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `blocks` | property | <code>blocks: OcrBlock[]</code> | Public blocks property. |
| `confidence` | property | <code>confidence: number</code> | Public confidence property. |
| `height` | property | <code>height: number</code> | Public height property. |
| `pageNumber` | property | <code>pageNumber: number</code> | Public page Number property. |
| `text` | property | <code>text: string</code> | Public text property. |
| `width` | property | <code>width: number</code> | Public width property. |

## `OcrProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `recognize` | method | <code>recognize(request: OcrRequest, context?: ToolCallContext): Promise&lt;OcrResult&gt;</code> | Public runtime operation for recognize. |

## `OcrRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `features` | property | <code>features: ("text" &#124; "layout" &#124; "tables" &#124; "formulas")[]</code> | Public features property. |
| `languages` | property | <code>languages: string[]</code> | Public languages property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `output` | property | <code>output: { includeBlocks?: boolean; includeConfidence?: boolean; artifactize?: boolean; }</code> | Public output property. |
| `pageRange` | property | <code>pageRange: { start?: number; end?: number; }</code> | Public page Range property. |
| `providerHint` | property | <code>providerHint: string</code> | Public provider Hint property. |
| `source` | property | <code>source: OcrInputSource</code> | Public source property. |

## `OcrResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs: string[]</code> | Public artifact Refs property. |
| `detectedLanguages` | property | <code>detectedLanguages: string[]</code> | Public detected Languages property. |
| `error` | property | <code>error: { code: string; message: string; retryable?: boolean; }</code> | Public error property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `pages` | property | <code>pages: OcrPage[]</code> | Public pages property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `providerVersion` | property | <code>providerVersion: string</code> | Public provider Version property. |
| `status` | property | <code>status: "completed" &#124; "failed" &#124; "partial"</code> | Public status property. |
| `text` | property | <code>text: string</code> | Public text property. |
| `warnings` | property | <code>warnings: string[]</code> | Public warnings property. |

## `VideoSourceEpisode` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `captionRefs` | property | <code>captionRefs: string[]</code> | Public caption Refs property. |
| `durationSeconds` | property | <code>durationSeconds: number</code> | Public duration Seconds property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `order` | property | <code>order: number</code> | Public order property. |
| `thumbnailUrl` | property | <code>thumbnailUrl: string</code> | Public thumbnail Url property. |
| `title` | property | <code>title: string</code> | Public title property. |
| `url` | property | <code>url: string</code> | Public url property. |

## `VideoSourcePreview` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `author` | property | <code>author: string</code> | Public author property. |
| `canonicalUrl` | property | <code>canonicalUrl: string</code> | Public canonical Url property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `durationSeconds` | property | <code>durationSeconds: number</code> | Public duration Seconds property. |
| `episodes` | property | <code>episodes: VideoSourceEpisode[]</code> | Public episodes property. |
| `manualEntryRequired` | property | <code>manualEntryRequired: boolean</code> | Public manual Entry Required property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `parsedAt` | property | <code>parsedAt: string</code> | Public parsed At property. |
| `provider` | property | <code>provider: string</code> | Public provider property. |
| `publishedAt` | property | <code>publishedAt: string</code> | Public published At property. |
| `sourceId` | property | <code>sourceId: string</code> | Public source Id property. |
| `sourceKind` | property | <code>sourceKind: VideoSourceKind</code> | Public source Kind property. |
| `thumbnailUrl` | property | <code>thumbnailUrl: string</code> | Public thumbnail Url property. |
| `title` | property | <code>title: string</code> | Public title property. |
| `warnings` | property | <code>warnings: string[]</code> | Public warnings property. |

## `VideoSourceProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `preview` | method | <code>preview(request: VideoSourceRequest, context?: ToolCallContext): Promise&lt;VideoSourcePreview&gt;</code> | Public runtime operation for preview. |
| `supports` | method | <code>supports(url: string): boolean &#124; Promise&lt;boolean&gt;</code> | Public runtime operation for supports. |

## `VideoSourceRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `includeCaptions` | property | <code>includeCaptions: boolean</code> | Public include Captions property. |
| `includeEpisodes` | property | <code>includeEpisodes: boolean</code> | Public include Episodes property. |
| `locale` | property | <code>locale: string</code> | Public locale property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `providerHint` | property | <code>providerHint: string</code> | Public provider Hint property. |
| `titleHint` | property | <code>titleHint: string</code> | Public title Hint property. |
| `url` | property | <code>url: string</code> | Public url property. |
