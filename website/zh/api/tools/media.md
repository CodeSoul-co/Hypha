# `@codesoul-co/hypha-tools` / `media`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 源码: [`packages/tools/src/media.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)
- 导出数: **18**

## 模块用法

用于声明 Tool 的文本、图像、音频与二进制输入输出。Media 模块公开 4 常量、2 函数、10 接口、2 类型。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 12 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 4 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { ocrRequestSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = ocrRequestSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `genericOcrInputJsonSchema` | 常量 | <code>const genericOcrInputJsonSchema: JsonSchema</code> | Generic Ocr Input 的 JSON Schema。 |
| `genericVideoSourceInputJsonSchema` | 常量 | <code>const genericVideoSourceInputJsonSchema: JsonSchema</code> | Generic Video Source Input 的 JSON Schema。 |
| `ocrRequestSchema` | 常量 | <code>const ocrRequestSchema: z.ZodObject&lt;{ source: z.ZodType&lt;OcrInputSource, z.ZodTypeDef, OcrInputSource&gt;; languages: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; pageRange: z.ZodOptional&lt;z.ZodObject&lt;{ start: z.ZodOptional&lt;z.ZodNumber&gt;; end: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { start?: number &#124; undefined; end?: number &#124; undefined; }, { start?: number &#124; undefined; end?: number &#124; undefined; }&gt;&gt;; fe...</code> | Ocr Request 的运行时 Schema。 |
| `videoSourceRequestSchema` | 常量 | <code>const videoSourceRequestSchema: z.ZodObject&lt;{ url: z.ZodString; titleHint: z.ZodOptional&lt;z.ZodString&gt;; locale: z.ZodOptional&lt;z.ZodString&gt;; includeEpisodes: z.ZodOptional&lt;z.ZodBoolean&gt;; includeCaptions: z.ZodOptional&lt;z.ZodBoolean&gt;; providerHint: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodUnknown&gt;&gt;; }, "strip", z.ZodTypeAny, { url: string; metadata?: Record&lt;string, unknown&gt; &#124; u...</code> | Video Source Request 的运行时 Schema。 |
| `createOcrToolSpec` | 函数 | <code>createOcrToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | Create Ocr Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createVideoSourceToolSpec` | 函数 | <code>createVideoSourceToolSpec(overrides?: Partial&lt;ToolSpec&gt;): ToolSpec</code> | Create Video Source Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `OcrBlock` | 接口 | <code>interface OcrBlock</code> | Ocr Block 接口，共包含 6 个公开字段或方法。 |
| `OcrBoundingBox` | 接口 | <code>interface OcrBoundingBox</code> | Ocr Bounding Box 接口，共包含 5 个公开字段或方法。 |
| `OcrPage` | 接口 | <code>interface OcrPage</code> | Ocr Page 接口，共包含 7 个公开字段或方法。 |
| `OcrProvider` | 接口 | <code>interface OcrProvider</code> | Ocr Provider 接口，共包含 3 个公开字段或方法。 |
| `OcrRequest` | 接口 | <code>interface OcrRequest</code> | Ocr Request 接口，共包含 7 个公开字段或方法。 |
| `OcrResult` | 接口 | <code>interface OcrResult</code> | Ocr Result 接口，共包含 10 个公开字段或方法。 |
| `VideoSourceEpisode` | 接口 | <code>interface VideoSourceEpisode</code> | Video Source Episode 接口，共包含 8 个公开字段或方法。 |
| `VideoSourcePreview` | 接口 | <code>interface VideoSourcePreview</code> | Video Source Preview 接口，共包含 15 个公开字段或方法。 |
| `VideoSourceProvider` | 接口 | <code>interface VideoSourceProvider</code> | Video Source Provider 接口，共包含 4 个公开字段或方法。 |
| `VideoSourceRequest` | 接口 | <code>interface VideoSourceRequest</code> | Video Source Request 接口，共包含 7 个公开字段或方法。 |
| `OcrInputSource` | 类型 | <code>type OcrInputSource = { type: 'artifact'; artifactRef: string; mimeType?: string; fileName?: string; } &#124; { type: 'url'; url: string; mimeType?: string; fileName?: string; } &#124; { type: 'inline'; dataBase64: string; mimeType: string; fileName?: string; } &#124; { type: 'text'; text: string; fileName?: string; }</code> | Ocr Input Source 公共类型别名；完整类型表达式见声明。 |
| `VideoSourceKind` | 类型 | <code>type VideoSourceKind = 'video' &#124; 'playlist' &#124; 'collection' &#124; 'live' &#124; 'unknown'</code> | Video Source Kind 公共类型别名；完整类型表达式见声明。 |

## `genericOcrInputJsonSchema`

Generic Ocr Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { genericOcrInputJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export declare const genericOcrInputJsonSchema: JsonSchema;
```

## `genericVideoSourceInputJsonSchema`

Generic Video Source Input 的 JSON Schema。

- 种类: 常量
- 导入: `import { genericVideoSourceInputJsonSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export declare const genericVideoSourceInputJsonSchema: JsonSchema;
```

## `ocrRequestSchema`

Ocr Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { ocrRequestSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export declare const ocrRequestSchema: z.ZodObject<{ source: z.ZodType<OcrInputSource, z.ZodTypeDef, OcrInputSource>; languages: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; pageRange: z.ZodOptional<z.ZodObject<{ start: z.ZodOptional<z.ZodNumber>; end: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { start?: number | undefined; end?: number | undefined; }, { start?: number | undefined; end?: number | undefined; }>>; features: z.ZodOptional<z.ZodArray<z.ZodEnum<["text", "layout", "tables", "formulas"]>, "many">>; output: z.ZodOptional<z.ZodObject<{ includeBlocks: z.ZodOptional<z.ZodBoolean>; includeConfidence: z.ZodOptional<z.ZodBoolean>; artifactize: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; }, { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; }>>; providerHint: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { source: OcrInputSource; metadata?: Record<string, unknown> | undefined; output?: { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; } | undefined; languages?: string[] | undefined; pageRange?: { start?: number | undefined; end?: number | undefined; } | undefined; features?: ("text" | "layout" | "tables" | "formulas")[] | undefined; providerHint?: string | undefined; }, { source: OcrInputSource; metadata?: Record<string, unknown> | undefined; output?: { includeBlocks?: boolean | undefined; includeConfidence?: boolean | undefined; artifactize?: boolean | undefined; } | undefined; languages?: string[] | undefined; pageRange?: { start?: number | undefined; end?: number | undefined; } | undefined; features?: ("text" | "layout" | "tables" | "formulas")[] | undefined; providerHint?: string | undefined; }>;
```

## `videoSourceRequestSchema`

Video Source Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { videoSourceRequestSchema } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export declare const videoSourceRequestSchema: z.ZodObject<{ url: z.ZodString; titleHint: z.ZodOptional<z.ZodString>; locale: z.ZodOptional<z.ZodString>; includeEpisodes: z.ZodOptional<z.ZodBoolean>; includeCaptions: z.ZodOptional<z.ZodBoolean>; providerHint: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { url: string; metadata?: Record<string, unknown> | undefined; providerHint?: string | undefined; titleHint?: string | undefined; locale?: string | undefined; includeEpisodes?: boolean | undefined; includeCaptions?: boolean | undefined; }, { url: string; metadata?: Record<string, unknown> | undefined; providerHint?: string | undefined; titleHint?: string | undefined; locale?: string | undefined; includeEpisodes?: boolean | undefined; includeCaptions?: boolean | undefined; }>;
```

## `createOcrToolSpec`

Create Ocr Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createOcrToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export declare function createOcrToolSpec(overrides?: Partial<ToolSpec>): ToolSpec;
```

### 调用签名

```text
createOcrToolSpec(overrides?: Partial<ToolSpec>): ToolSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `overrides` | <code>Partial&lt;ToolSpec&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSpec`
- 说明: 返回值契约由上述类型定义。

## `createVideoSourceToolSpec`

Create Video Source Tool Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createVideoSourceToolSpec } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export declare function createVideoSourceToolSpec(overrides?: Partial<ToolSpec>): ToolSpec;
```

### 调用签名

```text
createVideoSourceToolSpec(overrides?: Partial<ToolSpec>): ToolSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `overrides` | <code>Partial&lt;ToolSpec&gt;</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolSpec`
- 说明: 返回值契约由上述类型定义。

## `OcrBlock`

Ocr Block 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OcrBlock } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `boundingBox` | 属性 | <code>boundingBox?: OcrBoundingBox</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "unknown" &#124; "image" &#124; "table" &#124; "list" &#124; "text" &#124; "title" &#124; "formula"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OcrBoundingBox`

Ocr Bounding Box 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OcrBoundingBox } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export interface OcrBoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
    unit?: 'pixel' | 'normalized' | 'point';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `height` | 属性 | <code>height: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `unit` | 属性 | <code>unit?: "pixel" &#124; "normalized" &#124; "point"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `width` | 属性 | <code>width: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `x` | 属性 | <code>x: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `y` | 属性 | <code>y: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OcrPage`

Ocr Page 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OcrPage } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `blocks` | 属性 | <code>blocks?: OcrBlock[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `confidence` | 属性 | <code>confidence?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `height` | 属性 | <code>height?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pageNumber` | 属性 | <code>pageNumber: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `width` | 属性 | <code>width?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OcrProvider`

Ocr Provider 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OcrProvider } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health?(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recognize` | 方法 | <code>recognize(request: OcrRequest, context?: ToolCallContext): Promise&lt;OcrResult&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `OcrRequest`

Ocr Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OcrRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `features` | 属性 | <code>features?: ("text" &#124; "layout" &#124; "tables" &#124; "formulas")[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `languages` | 属性 | <code>languages?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `output` | 属性 | <code>output?: { includeBlocks?: boolean; includeConfidence?: boolean; artifactize?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pageRange` | 属性 | <code>pageRange?: { start?: number; end?: number; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerHint` | 属性 | <code>providerHint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `source` | 属性 | <code>source: OcrInputSource</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OcrResult`

Ocr Result 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { OcrResult } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactRefs` | 属性 | <code>artifactRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `detectedLanguages` | 属性 | <code>detectedLanguages?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `error` | 属性 | <code>error?: { code: string; message: string; retryable?: boolean; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `pages` | 属性 | <code>pages: OcrPage[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerVersion` | 属性 | <code>providerVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "completed" &#124; "failed" &#124; "partial"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `text` | 属性 | <code>text?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `warnings` | 属性 | <code>warnings?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VideoSourceEpisode`

Video Source Episode 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VideoSourceEpisode } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `captionRefs` | 属性 | <code>captionRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `durationSeconds` | 属性 | <code>durationSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `order` | 属性 | <code>order: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thumbnailUrl` | 属性 | <code>thumbnailUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `title` | 属性 | <code>title: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VideoSourcePreview`

Video Source Preview 接口，共包含 15 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VideoSourcePreview } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `author` | 属性 | <code>author?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `canonicalUrl` | 属性 | <code>canonicalUrl: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `durationSeconds` | 属性 | <code>durationSeconds?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `episodes` | 属性 | <code>episodes: VideoSourceEpisode[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `manualEntryRequired` | 属性 | <code>manualEntryRequired?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `parsedAt` | 属性 | <code>parsedAt: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provider` | 属性 | <code>provider: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `publishedAt` | 属性 | <code>publishedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceId` | 属性 | <code>sourceId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sourceKind` | 属性 | <code>sourceKind: VideoSourceKind</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thumbnailUrl` | 属性 | <code>thumbnailUrl?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `title` | 属性 | <code>title: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `warnings` | 属性 | <code>warnings?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `VideoSourceProvider`

Video Source Provider 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VideoSourceProvider } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `health` | 方法 | <code>health?(): Promise&lt;{ status: "healthy" &#124; "degraded" &#124; "unavailable"; message?: string; }&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `id` | 属性 | <code>readonly id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `preview` | 方法 | <code>preview(request: VideoSourceRequest, context?: ToolCallContext): Promise&lt;VideoSourcePreview&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `supports` | 方法 | <code>supports(url: string): boolean &#124; Promise&lt;boolean&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `VideoSourceRequest`

Video Source Request 接口，共包含 7 个公开字段或方法。

- 种类: 接口
- 导入: `import type { VideoSourceRequest } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `includeCaptions` | 属性 | <code>includeCaptions?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeEpisodes` | 属性 | <code>includeEpisodes?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `locale` | 属性 | <code>locale?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `providerHint` | 属性 | <code>providerHint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `titleHint` | 属性 | <code>titleHint?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `url` | 属性 | <code>url: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `OcrInputSource`

Ocr Input Source 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { OcrInputSource } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

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

Video Source Kind 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { VideoSourceKind } from '@codesoul-co/hypha-tools';`
- 源码模块: [`media`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/media.ts)

### 声明

```text
export type VideoSourceKind = 'video' | 'playlist' | 'collection' | 'live' | 'unknown';
```
