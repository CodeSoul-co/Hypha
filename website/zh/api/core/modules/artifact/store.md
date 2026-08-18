# `@codesoul-co/hypha-core` / `modules/artifact/store`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 源码: [`packages/core/src/modules/artifact/store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)
- 导出数: **36**

## 模块用法

用于持久化并读取该边界的数据。Store 模块公开 26 常量、10 函数。

### 从包入口导入

```ts
import {
  artifactByteRangeJsonSchema,
  artifactByteRangeSchema,
  artifactByteSourceSchema,
  artifactContentJsonSchema,
  artifactContentSchema,
  artifactCopyRequestJsonSchema,
  artifactCopyRequestSchema,
  artifactDownloadAccessJsonSchema,
} from '@codesoul-co/hypha-core';

// 完整导出列表见下方。
```

### 使用要点

- 10 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 26 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { artifactByteRangeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactByteRangeSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `artifactByteRangeJsonSchema` | 常量 | <code>const artifactByteRangeJsonSchema: JsonSchema</code> | Artifact Byte Range 的 JSON Schema。 |
| `artifactByteRangeSchema` | 常量 | <code>const artifactByteRangeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ start: z.ZodNumber; endInclusive: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number &#124; undefined; }, { start: number; endInclusive?: number &#124; undefined; }&gt;, { start: number; endInclusive?: number &#124; undefined; }, { start: number; endInclusive?: number &#124; undefined; }&gt;</code> | Artifact Byte Range 的运行时 Schema。 |
| `artifactByteSourceSchema` | 常量 | <code>const artifactByteSourceSchema: z.ZodType&lt;ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource&gt;</code> | Artifact Byte Source 的运行时 Schema。 |
| `artifactContentJsonSchema` | 常量 | <code>const artifactContentJsonSchema: JsonSchema</code> | Artifact Content 的 JSON Schema。 |
| `artifactContentSchema` | 常量 | <code>const artifactContentSchema: z.ZodObject&lt;{ stream: z.ZodType&lt;AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;, z.ZodTypeDef, AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;&gt;; contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; range: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ start: z.ZodNumber; endInclusive: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTyp...</code> | Artifact Content 的运行时 Schema。 |
| `artifactCopyRequestJsonSchema` | 常量 | <code>const artifactCopyRequestJsonSchema: JsonSchema</code> | Artifact Copy Request 的 JSON Schema。 |
| `artifactCopyRequestSchema` | 常量 | <code>const artifactCopyRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; source: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: str...</code> | Artifact Copy Request 的运行时 Schema。 |
| `artifactDownloadAccessJsonSchema` | 常量 | <code>const artifactDownloadAccessJsonSchema: JsonSchema</code> | Artifact Download Access 的 JSON Schema。 |
| `artifactDownloadAccessRequestExample` | 常量 | <code>const artifactDownloadAccessRequestExample: ArtifactDownloadAccessRequest</code> | Artifact Download Access Request 的有效示例值。 |
| `artifactDownloadAccessRequestJsonSchema` | 常量 | <code>const artifactDownloadAccessRequestJsonSchema: JsonSchema</code> | Artifact Download Access Request 的 JSON Schema。 |
| `artifactDownloadAccessRequestSchema` | 常量 | <code>const artifactDownloadAccessRequestSchema: z.ZodObject&lt;{ ref: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string &#124; undefined; bu...</code> | Artifact Download Access Request 的运行时 Schema。 |
| `artifactDownloadAccessSchema` | 常量 | <code>const artifactDownloadAccessSchema: z.ZodObject&lt;{ method: z.ZodLiteral&lt;"GET"&gt;; url: z.ZodString; expiresAt: z.ZodString; headers: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodString&gt;&gt;; }, "strict", z.ZodTypeAny, { expiresAt: string; method: "GET"; url: string; headers?: Record&lt;string, string&gt; &#124; undefined; }, { expiresAt: string; method: "GET"; url: string; headers?: Record&lt;string, string&gt; &#124; undefined; }&gt;</code> | Artifact Download Access 的运行时 Schema。 |
| `artifactGetRequestExample` | 常量 | <code>const artifactGetRequestExample: ArtifactGetRequest</code> | Artifact Get Request 的有效示例值。 |
| `artifactGetRequestJsonSchema` | 常量 | <code>const artifactGetRequestJsonSchema: JsonSchema</code> | Artifact Get Request 的 JSON Schema。 |
| `artifactGetRequestSchema` | 常量 | <code>const artifactGetRequestSchema: z.ZodObject&lt;{ ref: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string &#124; undefined; bucketOrNames...</code> | Artifact Get Request 的运行时 Schema。 |
| `artifactObjectKeySchema` | 常量 | <code>const artifactObjectKeySchema: z.ZodEffects&lt;z.ZodString, string, string&gt;</code> | Artifact Object Key 的运行时 Schema。 |
| `artifactObjectMetadataJsonSchema` | 常量 | <code>const artifactObjectMetadataJsonSchema: JsonSchema</code> | Artifact Object Metadata 的 JSON Schema。 |
| `artifactObjectMetadataSchema` | 常量 | <code>const artifactObjectMetadataSchema: z.ZodObject&lt;{ contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; lastModifiedAt: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodString&gt;&gt;; }, "strict", z.ZodTypeAny, { sizeBytes: number; contentHash: string; mimeType?: string &#124; undefined; etag?: string &#124; undefined; metadata?:...</code> | Artifact Object Metadata 的运行时 Schema。 |
| `artifactPutRequestExample` | 常量 | <code>const artifactPutRequestExample: ArtifactPutRequest</code> | Artifact Put Request 的有效示例值。 |
| `artifactPutRequestJsonSchema` | 常量 | <code>const artifactPutRequestJsonSchema: JsonSchema</code> | Artifact Put Request 的 JSON Schema。 |
| `artifactPutRequestSchema` | 常量 | <code>const artifactPutRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; objectKey: z.ZodEffects&lt;z.ZodString, string, string&gt;; content: z.ZodType&lt;ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource&gt;; expectedContentHash: z.ZodOptional&lt;z.ZodString&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; mimeType: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodString&gt;&gt;; ifAbsent: z.ZodOptional&lt;z.Z...</code> | Artifact Put Request 的运行时 Schema。 |
| `artifactStoreCapabilitiesExample` | 常量 | <code>const artifactStoreCapabilitiesExample: ArtifactStoreCapabilities</code> | Artifact Store Capabilities 的有效示例值。 |
| `artifactStoreCapabilitiesJsonSchema` | 常量 | <code>const artifactStoreCapabilitiesJsonSchema: JsonSchema</code> | Artifact Store Capabilities 的 JSON Schema。 |
| `artifactStoreCapabilitiesSchema` | 常量 | <code>const artifactStoreCapabilitiesSchema: z.ZodObject&lt;{ versioning: z.ZodBoolean; rangeRead: z.ZodBoolean; signedAccess: z.ZodBoolean; serverSideCopy: z.ZodBoolean; encryption: z.ZodBoolean; multipartUpload: z.ZodBoolean; contentAddressing: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentAddressing: boolean; versioning: boolean; rangeRead: boolean; signedAccess: boolean; serverSideCopy: boolean; encryption: boolean...</code> | Artifact Store Capabilities 的运行时 Schema。 |
| `artifactStoreContractJsonSchemas` | 常量 | <code>const artifactStoreContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/artifact/store` 模块导出的 Artifact Store Contract JSON Schemas 常量。 |
| `artifactStreamSchema` | 常量 | <code>const artifactStreamSchema: z.ZodType&lt;AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;, z.ZodTypeDef, AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;&gt;</code> | Artifact Stream 的运行时 Schema。 |
| `isArtifactByteSource` | 函数 | <code>isArtifactByteSource(value: unknown): value is ArtifactByteSource</code> | Is Artifact Byte Source 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `isArtifactStream` | 函数 | <code>isArtifactStream(value: unknown): value is AsyncIterable&lt;Uint8Array&gt;</code> | Is Artifact Stream 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactContent` | 函数 | <code>validateArtifactContent(input: unknown): ArtifactContent</code> | Validate Artifact Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactDownloadAccess` | 函数 | <code>validateArtifactDownloadAccess(input: unknown): ArtifactDownloadAccess</code> | Validate Artifact Download Access 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactDownloadAccessRequest` | 函数 | <code>validateArtifactDownloadAccessRequest(input: unknown): ArtifactDownloadAccessRequest</code> | Validate Artifact Download Access Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactGetRequest` | 函数 | <code>validateArtifactGetRequest(input: unknown): ArtifactGetRequest</code> | Validate Artifact Get Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactObjectMetadata` | 函数 | <code>validateArtifactObjectMetadata(input: unknown): ArtifactObjectMetadata</code> | Validate Artifact Object Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactPutRequest` | 函数 | <code>validateArtifactPutRequest(input: unknown): ArtifactPutRequest</code> | Validate Artifact Put Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactStorageRef` | 函数 | <code>validateArtifactStorageRef(input: unknown): { storeId: string; objectKey: string; versionId?: string &#124; undefined; bucketOrNamespace?: string &#124; undefined; etag?: string &#124; undefined; region?: string &#124; undefined; encrypted?: boolean &#124; undefined; }</code> | Validate Artifact Storage Ref 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateArtifactStoreCapabilities` | 函数 | <code>validateArtifactStoreCapabilities(input: unknown): ArtifactStoreCapabilities</code> | Validate Artifact Store Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |

## `artifactByteRangeJsonSchema`

Artifact Byte Range 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactByteRangeJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactByteRangeJsonSchema: JsonSchema;
```

## `artifactByteRangeSchema`

Artifact Byte Range 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactByteRangeSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactByteRangeSchema: z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>;
```

## `artifactByteSourceSchema`

Artifact Byte Source 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactByteSourceSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactByteSourceSchema: z.ZodType<ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource>;
```

## `artifactContentJsonSchema`

Artifact Content 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactContentJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactContentJsonSchema: JsonSchema;
```

## `artifactContentSchema`

Artifact Content 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactContentSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactContentSchema: z.ZodObject<{ stream: z.ZodType<AsyncIterable<Uint8Array<ArrayBufferLike>>, z.ZodTypeDef, AsyncIterable<Uint8Array<ArrayBufferLike>>>; contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; range: z.ZodOptional<z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>>; }, "strict", z.ZodTypeAny, { sizeBytes: number; contentHash: string; stream: AsyncIterable<Uint8Array<ArrayBufferLike>>; mimeType?: string | undefined; etag?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }, { sizeBytes: number; contentHash: string; stream: AsyncIterable<Uint8Array<ArrayBufferLike>>; mimeType?: string | undefined; etag?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }>;
```

## `artifactCopyRequestJsonSchema`

Artifact Copy Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactCopyRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactCopyRequestJsonSchema: JsonSchema;
```

## `artifactCopyRequestSchema`

Artifact Copy Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactCopyRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactCopyRequestSchema: z.ZodObject<{ operationId: z.ZodString; source: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>; targetObjectKey: z.ZodEffects<z.ZodString, string, string>; ifAbsent: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { operationId: string; source: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; targetObjectKey: string; ifAbsent?: boolean | undefined; }, { operationId: string; source: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; targetObjectKey: string; ifAbsent?: boolean | undefined; }>;
```

## `artifactDownloadAccessJsonSchema`

Artifact Download Access 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactDownloadAccessJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactDownloadAccessJsonSchema: JsonSchema;
```

## `artifactDownloadAccessRequestExample`

Artifact Download Access Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactDownloadAccessRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactDownloadAccessRequestExample: ArtifactDownloadAccessRequest;
```

## `artifactDownloadAccessRequestJsonSchema`

Artifact Download Access Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactDownloadAccessRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactDownloadAccessRequestJsonSchema: JsonSchema;
```

## `artifactDownloadAccessRequestSchema`

Artifact Download Access Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactDownloadAccessRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactDownloadAccessRequestSchema: z.ZodObject<{ ref: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>; expiresInSeconds: z.ZodNumber; responseMimeType: z.ZodOptional<z.ZodString>; responseFilename: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expiresInSeconds: number; responseMimeType?: string | undefined; responseFilename?: string | undefined; }, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expiresInSeconds: number; responseMimeType?: string | undefined; responseFilename?: string | undefined; }>;
```

## `artifactDownloadAccessSchema`

Artifact Download Access 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactDownloadAccessSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactDownloadAccessSchema: z.ZodObject<{ method: z.ZodLiteral<"GET">; url: z.ZodString; expiresAt: z.ZodString; headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; }, "strict", z.ZodTypeAny, { expiresAt: string; method: "GET"; url: string; headers?: Record<string, string> | undefined; }, { expiresAt: string; method: "GET"; url: string; headers?: Record<string, string> | undefined; }>;
```

## `artifactGetRequestExample`

Artifact Get Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactGetRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactGetRequestExample: ArtifactGetRequest;
```

## `artifactGetRequestJsonSchema`

Artifact Get Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactGetRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactGetRequestJsonSchema: JsonSchema;
```

## `artifactGetRequestSchema`

Artifact Get Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactGetRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactGetRequestSchema: z.ZodObject<{ ref: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>; range: z.ZodOptional<z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>>; expectedContentHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }>;
```

## `artifactObjectKeySchema`

Artifact Object Key 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactObjectKeySchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactObjectKeySchema: z.ZodEffects<z.ZodString, string, string>;
```

## `artifactObjectMetadataJsonSchema`

Artifact Object Metadata 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactObjectMetadataJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactObjectMetadataJsonSchema: JsonSchema;
```

## `artifactObjectMetadataSchema`

Artifact Object Metadata 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactObjectMetadataSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactObjectMetadataSchema: z.ZodObject<{ contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; lastModifiedAt: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; }, "strict", z.ZodTypeAny, { sizeBytes: number; contentHash: string; mimeType?: string | undefined; etag?: string | undefined; metadata?: Record<string, string> | undefined; lastModifiedAt?: string | undefined; }, { sizeBytes: number; contentHash: string; mimeType?: string | undefined; etag?: string | undefined; metadata?: Record<string, string> | undefined; lastModifiedAt?: string | undefined; }>;
```

## `artifactPutRequestExample`

Artifact Put Request 的有效示例值。

- 种类: 常量
- 导入: `import { artifactPutRequestExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactPutRequestExample: ArtifactPutRequest;
```

## `artifactPutRequestJsonSchema`

Artifact Put Request 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactPutRequestJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactPutRequestJsonSchema: JsonSchema;
```

## `artifactPutRequestSchema`

Artifact Put Request 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactPutRequestSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactPutRequestSchema: z.ZodObject<{ operationId: z.ZodString; objectKey: z.ZodEffects<z.ZodString, string, string>; content: z.ZodType<ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource>; expectedContentHash: z.ZodOptional<z.ZodString>; sizeBytes: z.ZodOptional<z.ZodNumber>; mimeType: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; ifAbsent: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { objectKey: string; operationId: string; content: ArtifactByteSource; mimeType?: string | undefined; sizeBytes?: number | undefined; metadata?: Record<string, string> | undefined; expectedContentHash?: string | undefined; ifAbsent?: boolean | undefined; }, { objectKey: string; operationId: string; content: ArtifactByteSource; mimeType?: string | undefined; sizeBytes?: number | undefined; metadata?: Record<string, string> | undefined; expectedContentHash?: string | undefined; ifAbsent?: boolean | undefined; }>;
```

## `artifactStoreCapabilitiesExample`

Artifact Store Capabilities 的有效示例值。

- 种类: 常量
- 导入: `import { artifactStoreCapabilitiesExample } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactStoreCapabilitiesExample: ArtifactStoreCapabilities;
```

## `artifactStoreCapabilitiesJsonSchema`

Artifact Store Capabilities 的 JSON Schema。

- 种类: 常量
- 导入: `import { artifactStoreCapabilitiesJsonSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactStoreCapabilitiesJsonSchema: JsonSchema;
```

## `artifactStoreCapabilitiesSchema`

Artifact Store Capabilities 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactStoreCapabilitiesSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactStoreCapabilitiesSchema: z.ZodObject<{ versioning: z.ZodBoolean; rangeRead: z.ZodBoolean; signedAccess: z.ZodBoolean; serverSideCopy: z.ZodBoolean; encryption: z.ZodBoolean; multipartUpload: z.ZodBoolean; contentAddressing: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentAddressing: boolean; versioning: boolean; rangeRead: boolean; signedAccess: boolean; serverSideCopy: boolean; encryption: boolean; multipartUpload: boolean; }, { contentAddressing: boolean; versioning: boolean; rangeRead: boolean; signedAccess: boolean; serverSideCopy: boolean; encryption: boolean; multipartUpload: boolean; }>;
```

## `artifactStoreContractJsonSchemas`

由 `modules/artifact/store` 模块导出的 Artifact Store Contract JSON Schemas 常量。

- 种类: 常量
- 导入: `import { artifactStoreContractJsonSchemas } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactStoreContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactStreamSchema`

Artifact Stream 的运行时 Schema。

- 种类: 常量
- 导入: `import { artifactStreamSchema } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare const artifactStreamSchema: z.ZodType<AsyncIterable<Uint8Array<ArrayBufferLike>>, z.ZodTypeDef, AsyncIterable<Uint8Array<ArrayBufferLike>>>;
```

## `isArtifactByteSource`

Is Artifact Byte Source 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isArtifactByteSource } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function isArtifactByteSource(value: unknown): value is ArtifactByteSource;
```

### 调用签名

```text
isArtifactByteSource(value: unknown): value is ArtifactByteSource
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is ArtifactByteSource`
- 说明: 返回值契约由上述类型定义。

## `isArtifactStream`

Is Artifact Stream 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { isArtifactStream } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function isArtifactStream(value: unknown): value is AsyncIterable<Uint8Array>;
```

### 调用签名

```text
isArtifactStream(value: unknown): value is AsyncIterable<Uint8Array>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `value is AsyncIterable<Uint8Array<ArrayBufferLike>>`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactContent`

Validate Artifact Content 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactContent } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactContent(input: unknown): ArtifactContent;
```

### 调用签名

```text
validateArtifactContent(input: unknown): ArtifactContent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactContent`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactDownloadAccess`

Validate Artifact Download Access 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactDownloadAccess } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactDownloadAccess(input: unknown): ArtifactDownloadAccess;
```

### 调用签名

```text
validateArtifactDownloadAccess(input: unknown): ArtifactDownloadAccess
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactDownloadAccess`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactDownloadAccessRequest`

Validate Artifact Download Access Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactDownloadAccessRequest(input: unknown): ArtifactDownloadAccessRequest;
```

### 调用签名

```text
validateArtifactDownloadAccessRequest(input: unknown): ArtifactDownloadAccessRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactDownloadAccessRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactGetRequest`

Validate Artifact Get Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactGetRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactGetRequest(input: unknown): ArtifactGetRequest;
```

### 调用签名

```text
validateArtifactGetRequest(input: unknown): ArtifactGetRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactGetRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactObjectMetadata`

Validate Artifact Object Metadata 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactObjectMetadata } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactObjectMetadata(input: unknown): ArtifactObjectMetadata;
```

### 调用签名

```text
validateArtifactObjectMetadata(input: unknown): ArtifactObjectMetadata
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactObjectMetadata`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactPutRequest`

Validate Artifact Put Request 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactPutRequest } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactPutRequest(input: unknown): ArtifactPutRequest;
```

### 调用签名

```text
validateArtifactPutRequest(input: unknown): ArtifactPutRequest
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactPutRequest`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactStorageRef`

Validate Artifact Storage Ref 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactStorageRef } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactStorageRef(input: unknown): {
    storeId: string;
    objectKey: string;
    versionId?: string | undefined;
    bucketOrNamespace?: string | undefined;
    etag?: string | undefined;
    region?: string | undefined;
    encrypted?: boolean | undefined;
};
```

### 调用签名

```text
validateArtifactStorageRef(input: unknown): { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `{ storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }`
- 说明: 返回值契约由上述类型定义。

## `validateArtifactStoreCapabilities`

Validate Artifact Store Capabilities 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateArtifactStoreCapabilities } from '@codesoul-co/hypha-core';`
- 源码模块: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### 声明

```text
export declare function validateArtifactStoreCapabilities(input: unknown): ArtifactStoreCapabilities;
```

### 调用签名

```text
validateArtifactStoreCapabilities(input: unknown): ArtifactStoreCapabilities
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ArtifactStoreCapabilities`
- 说明: 返回值契约由上述类型定义。
