# `@codesoul-co/hypha-tools` / `media`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/media.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)
- Exports: **18**

## Using this module

Use the Media module for declaring text, image, audio, and binary Tool inputs and outputs. It exports 4 constants, 2 functions, 10 interfaces, 2 types.

### Import from the package entrypoint

```ts
import {
  genericOcrInputJsonSchema,
  genericVideoSourceInputJsonSchema,
  ocrRequestSchema,
  videoSourceRequestSchema,
  createOcrToolSpec,
  createVideoSourceToolSpec,
} from '@codesoul-co/hypha-tools';

import type {
  OcrBlock,
  OcrBoundingBox,
  OcrPage,
  OcrProvider,
  OcrRequest,
  OcrResult,
  VideoSourceEpisode,
  VideoSourcePreview,
} from '@codesoul-co/hypha-tools';

// The complete export list is documented below.
```

### Usage patterns

- Use the 12 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 4 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { ocrRequestSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = ocrRequestSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `genericOcrInputJsonSchema` | constant | <code>const genericOcrInputJsonSchema: JsonSchema</code> | JSON Schema for Generic Ocr Input. |
| `genericVideoSourceInputJsonSchema` | constant | <code>const genericVideoSourceInputJsonSchema: JsonSchema</code> | JSON Schema for Generic Video Source Input. |
| `ocrRequestSchema` | constant | <code>const ocrRequestSchema: z.ZodObject&lt;{ source: z.ZodType&lt;OcrInputSource, z.ZodTypeDef, OcrInputSource&gt;; languages: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; pageRange: z.ZodOptional&lt;z.ZodObject&lt;{ start: z.ZodOptional&lt;z.ZodNumber&gt;; end: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { start?: number &#124; undefined; end?: number &#124; undefined; }, { start?: number &#124; undefined; end?: number &#124; undefined; }&gt;&gt;; fe...</code> | Runtime schema for Ocr Request. |
| `videoSourceRequestSchema` | constant | <code>const videoSourceRequestSchema: z.ZodObject&lt;{ url: z.ZodString; titleHint: z.ZodOptional&lt;z.ZodString&gt;; locale: z.ZodOptional&lt;z.ZodString&gt;; includeEpisodes: z.ZodOptional&lt;z.ZodBoolean&gt;; includeCaptions: z.ZodOptional&lt;z.ZodBoolean&gt;; providerHint: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { url: string; metadata?: Record&lt;string, unknown&gt; &#124; u...</code> | Runtime schema for Video Source Request. |
| `createOcrToolSpec` | function | <code>createOcrToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | Create Ocr Tool Spec function with 1 public call signature; parameters and return types are listed below. |
| `createVideoSourceToolSpec` | function | <code>createVideoSourceToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | Create Video Source Tool Spec function with 1 public call signature; parameters and return types are listed below. |
| `OcrBlock` | interface | <code>interface OcrBlock</code> | Ocr Block interface with 6 public fields or methods. |
| `OcrBoundingBox` | interface | <code>interface OcrBoundingBox</code> | Ocr Bounding Box interface with 5 public fields or methods. |
| `OcrPage` | interface | <code>interface OcrPage</code> | Ocr Page interface with 7 public fields or methods. |
| `OcrProvider` | interface | <code>interface OcrProvider</code> | Ocr Provider interface with 3 public fields or methods. |
| `OcrRequest` | interface | <code>interface OcrRequest</code> | Ocr Request interface with 7 public fields or methods. |
| `OcrResult` | interface | <code>interface OcrResult</code> | Ocr Result interface with 10 public fields or methods. |
| `VideoSourceEpisode` | interface | <code>interface VideoSourceEpisode</code> | Video Source Episode interface with 8 public fields or methods. |
| `VideoSourcePreview` | interface | <code>interface VideoSourcePreview</code> | Video Source Preview interface with 15 public fields or methods. |
| `VideoSourceProvider` | interface | <code>interface VideoSourceProvider</code> | Video Source Provider interface with 4 public fields or methods. |
| `VideoSourceRequest` | interface | <code>interface VideoSourceRequest</code> | Video Source Request interface with 7 public fields or methods. |
| `OcrInputSource` | type | <code>type OcrInputSource = { type: 'artifact'; artifactRef: string; mimeType?: string; fileName?: string; } &#124; { type: 'url'; url: string; mimeType?: string; fileName?: string; } &#124; { type: 'inline'; dataBase64: string; mimeType: string; fileName?: string; } &#124; { type: 'text'; text: string; fileName?: string; }</code> | Public type alias for Ocr Input Source; the declaration contains its complete type expression. |
| `VideoSourceKind` | type | <code>type VideoSourceKind = 'video' &#124; 'playlist' &#124; 'collection' &#124; 'live' &#124; 'unknown'</code> | Public type alias for Video Source Kind; the declaration contains its complete type expression. |

## `genericOcrInputJsonSchema`

JSON Schema for Generic Ocr Input.

- Kind: constant
- Import: `import { genericOcrInputJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export declare const genericOcrInputJsonSchema: JsonSchema;
```

## `genericVideoSourceInputJsonSchema`

JSON Schema for Generic Video Source Input.

- Kind: constant
- Import: `import { genericVideoSourceInputJsonSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export declare const genericVideoSourceInputJsonSchema: JsonSchema;
```

## `ocrRequestSchema`

Runtime schema for Ocr Request.

- Kind: constant
- Import: `import { ocrRequestSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export declare const ocrRequestSchema: z.ZodObject<{ source: z.ZodType<OcrInputSource, z.ZodTypeDef, OcrInputSource>; languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; pageRange: z.ZodOptional<z.ZodObject<{ start: z.ZodOptional<z.ZodNumber>; end: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { start?: number | undefined; end?: number | undefined; }, { start?: number | undefined; end?: number | undefined; }>>; features: z.ZodOptional<z.ZodArray<z.ZodEnum<["text", "layout", "tables", "formulas"]>, "many">>; output: z.ZodOptional<z.ZodObject<{ includeBlocks: z.ZodOptional<z.ZodBoolean>; includeConfidence: z.ZodOptional<z.ZodBoolean>; artifactize: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; }, { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; }>>; providerHint: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { source: OcrInputSource; metadata?: Record<string, unknown> | undefined; output?: { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; } | undefined; languages?: string[] | undefined; pageRange?: { start?: number | undefined; end?: number | undefined; } | undefined; features?: ("text" | "layout" | "tables" | "formulas")[] | undefined; providerHint?: string | undefined; }, { source: OcrInputSource; metadata?: Record<string, unknown> | undefined; output?: { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; } | undefined; languages?: string[] | undefined; pageRange?: { start?: number | undefined; end?: number | undefined; } | undefined; features?: ("text" | "layout" | "tables" | "formulas")[] | undefined; providerHint?: string | undefined; }>;
```

## `videoSourceRequestSchema`

Runtime schema for Video Source Request.

- Kind: constant
- Import: `import { videoSourceRequestSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export declare const videoSourceRequestSchema: z.ZodObject<{ url: z.ZodString; titleHint: z.ZodOptional<z.ZodString>; locale: z.ZodOptional<z.ZodString>; includeEpisodes: z.ZodOptional<z.ZodBoolean>; includeCaptions: z.ZodOptional<z.ZodBoolean>; providerHint: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { url: string; metadata?: Record<string, unknown> | undefined; providerHint?: string | undefined; titleHint?: string | undefined; locale?: string | undefined; includeEpisodes?: boolean | undefined; includeCaptions?: boolean | undefined; }, { url: string; metadata?: Record<string, unknown> | undefined; providerHint?: string | undefined; titleHint?: string | undefined; locale?: string | undefined; includeEpisodes?: boolean | undefined; includeCaptions?: boolean | undefined; }>;
```

## `createOcrToolSpec`

Create Ocr Tool Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createOcrToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export declare function createOcrToolSpec(overrides?: Partial<ToolSpec>): ToolSpec;
```

### Call signature

```text
createOcrToolSpec(overrides?: Partial<ToolSpec>): ToolSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `overrides` | <code>Partial&lt;ToolSpec&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSpec`
- Description: The return contract is defined by the type shown above.

## `createVideoSourceToolSpec`

Create Video Source Tool Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createVideoSourceToolSpec } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export declare function createVideoSourceToolSpec(overrides?: Partial<ToolSpec>): ToolSpec;
```

### Call signature

```text
createVideoSourceToolSpec(overrides?: Partial<ToolSpec>): ToolSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `overrides` | <code>Partial&lt;ToolSpec&gt;</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolSpec`
- Description: The return contract is defined by the type shown above.

## `OcrBlock`

Ocr Block interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { OcrBlock } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface OcrBlock {
    id?: string;
    type: 'text' | 'title' | 'list' | 'table' | 'formula' | 'image' | 'unknown';
    text?: string;
    confidence?: number;
    boundingBox?: OcrBoundingBox;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `boundingBox` | property | <code>boundingBox?: OcrBoundingBox</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "unknown" &#124; "image" &#124; "table" &#124; "list" &#124; "text" &#124; "title" &#124; "formula"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OcrBoundingBox`

Ocr Bounding Box interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { OcrBoundingBox } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface OcrBoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    unit?: 'pixel' | 'normalized' | 'point';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `height` | property | <code>height: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `unit` | property | <code>unit?: "pixel" &#124; "normalized" &#124; "point"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `width` | property | <code>width: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `x` | property | <code>x: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `y` | property | <code>y: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OcrPage`

Ocr Page interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { OcrPage } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface OcrPage {
    pageNumber: number;
    text: string;
    confidence?: number;
    width?: number;
    height?: number;
    blocks?: OcrBlock[];
    artifactRefs?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `blocks` | property | <code>blocks?: OcrBlock[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `confidence` | property | <code>confidence?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `height` | property | <code>height?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pageNumber` | property | <code>pageNumber: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `width` | property | <code>width?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OcrProvider`

Ocr Provider interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { OcrProvider } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface OcrProvider {
    readonly id: string;
    recognize(request: OcrRequest, context?: ToolCallContext): Promise<OcrResult>;
    health?(): Promise<{
        status: 'healthy' | 'degraded' | 'unavailable';
        message?: string;
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health?(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recognize` | method | <code>recognize(request: OcrRequest, context?: ToolCallContext): Promise&lt;OcrResult&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `OcrRequest`

Ocr Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { OcrRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface OcrRequest {
    source: OcrInputSource;
    languages?: string[];
    pageRange?: {
        start?: number;
        end?: number;
    };
    features?: Array<'text' | 'layout' | 'tables' | 'formulas'>;
    output?: {
        includeBlocks?: boolean;
        includeConfidence?: boolean;
        artifactize?: boolean;
    };
    providerHint?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `features` | property | <code>features?: ("text" &#124; "layout" &#124; "tables" &#124; "formulas")[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `languages` | property | <code>languages?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `output` | property | <code>output?: { includeBlocks?: boolean; includeConfidence?: boolean; artifactize?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pageRange` | property | <code>pageRange?: { start?: number; end?: number; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerHint` | property | <code>providerHint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `source` | property | <code>source: OcrInputSource</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OcrResult`

Ocr Result interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { OcrResult } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface OcrResult {
    status: 'completed' | 'partial' | 'failed';
    provider: string;
    providerVersion?: string;
    text?: string;
    pages: OcrPage[];
    detectedLanguages?: string[];
    artifactRefs?: string[];
    warnings?: string[];
    error?: {
        code: string;
        message: string;
        retryable?: boolean;
    };
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactRefs` | property | <code>artifactRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `detectedLanguages` | property | <code>detectedLanguages?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: { code: string; message: string; retryable?: boolean; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `pages` | property | <code>pages: OcrPage[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerVersion` | property | <code>providerVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "completed" &#124; "failed" &#124; "partial"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `text` | property | <code>text?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `warnings` | property | <code>warnings?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VideoSourceEpisode`

Video Source Episode interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { VideoSourceEpisode } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface VideoSourceEpisode {
    id?: string;
    title: string;
    order: number;
    durationSeconds?: number;
    url?: string;
    thumbnailUrl?: string;
    captionRefs?: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `captionRefs` | property | <code>captionRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `durationSeconds` | property | <code>durationSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `order` | property | <code>order: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thumbnailUrl` | property | <code>thumbnailUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `title` | property | <code>title: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VideoSourcePreview`

Video Source Preview interface with 15 public fields or methods.

- Kind: interface
- Import: `import type { VideoSourcePreview } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface VideoSourcePreview {
    provider: string;
    sourceKind: VideoSourceKind;
    sourceId?: string;
    canonicalUrl: string;
    title: string;
    description?: string;
    author?: string;
    durationSeconds?: number;
    publishedAt?: string;
    thumbnailUrl?: string;
    episodes: VideoSourceEpisode[];
    parsedAt: string;
    warnings?: string[];
    manualEntryRequired?: boolean;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `author` | property | <code>author?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `canonicalUrl` | property | <code>canonicalUrl: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `durationSeconds` | property | <code>durationSeconds?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `episodes` | property | <code>episodes: VideoSourceEpisode[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `manualEntryRequired` | property | <code>manualEntryRequired?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `parsedAt` | property | <code>parsedAt: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provider` | property | <code>provider: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `publishedAt` | property | <code>publishedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceId` | property | <code>sourceId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sourceKind` | property | <code>sourceKind: VideoSourceKind</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thumbnailUrl` | property | <code>thumbnailUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `title` | property | <code>title: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `warnings` | property | <code>warnings?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `VideoSourceProvider`

Video Source Provider interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { VideoSourceProvider } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface VideoSourceProvider {
    readonly id: string;
    supports(url: string): boolean | Promise<boolean>;
    preview(request: VideoSourceRequest, context?: ToolCallContext): Promise<VideoSourcePreview>;
    health?(): Promise<{
        status: 'healthy' | 'degraded' | 'unavailable';
        message?: string;
    }>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `health` | method | <code>health?(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `preview` | method | <code>preview(request: VideoSourceRequest, context?: ToolCallContext): Promise&lt;VideoSourcePreview&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `supports` | method | <code>supports(url: string): boolean &#124; Promise&lt;boolean&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `VideoSourceRequest`

Video Source Request interface with 7 public fields or methods.

- Kind: interface
- Import: `import type { VideoSourceRequest } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export interface VideoSourceRequest {
    url: string;
    titleHint?: string;
    locale?: string;
    includeEpisodes?: boolean;
    includeCaptions?: boolean;
    providerHint?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `includeCaptions` | property | <code>includeCaptions?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeEpisodes` | property | <code>includeEpisodes?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `locale` | property | <code>locale?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerHint` | property | <code>providerHint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `titleHint` | property | <code>titleHint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `url` | property | <code>url: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `OcrInputSource`

Public type alias for Ocr Input Source; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { OcrInputSource } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export type OcrInputSource = {
    type: 'artifact';
    artifactRef: string;
    mimeType?: string;
    fileName?: string;
} | {
    type: 'url';
    url: string;
    mimeType?: string;
    fileName?: string;
} | {
    type: 'inline';
    dataBase64: string;
    mimeType: string;
    fileName?: string;
} | {
    type: 'text';
    text: string;
    fileName?: string;
};
```

## `VideoSourceKind`

Public type alias for Video Source Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { VideoSourceKind } from '@codesoul-co/hypha-tools';`
- Source module: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### Declaration

```text
export type VideoSourceKind = 'video' | 'playlist' | 'collection' | 'live' | 'unknown';
```
