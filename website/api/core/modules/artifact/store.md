# `@codesoul-co/hypha-core` / `modules/artifact/store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Source: [`packages/core/src/modules/artifact/store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)
- Exports: **36**

## Using this module

Use the Store module for persisting and reading data at this boundary. It exports 26 constants, 10 functions.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- The module exposes 10 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 26 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { artifactByteRangeSchema } from '@codesoul-co/hypha-core';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = artifactByteRangeSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactByteRangeJsonSchema` | constant | <code>const artifactByteRangeJsonSchema: JsonSchema</code> | JSON Schema for Artifact Byte Range. |
| `artifactByteRangeSchema` | constant | <code>const artifactByteRangeSchema: z.ZodEffects&lt;z.ZodObject&lt;{ start: z.ZodNumber; endInclusive: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number &#124; undefined; }, { start: number; endInclusive?: number &#124; undefined; }&gt;, { start: number; endInclusive?: number &#124; undefined; }, { start: number; endInclusive?: number &#124; undefined; }&gt;</code> | Runtime schema for Artifact Byte Range. |
| `artifactByteSourceSchema` | constant | <code>const artifactByteSourceSchema: z.ZodType&lt;ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource&gt;</code> | Runtime schema for Artifact Byte Source. |
| `artifactContentJsonSchema` | constant | <code>const artifactContentJsonSchema: JsonSchema</code> | JSON Schema for Artifact Content. |
| `artifactContentSchema` | constant | <code>const artifactContentSchema: z.ZodObject&lt;{ stream: z.ZodType&lt;AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;, z.ZodTypeDef, AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;&gt;; contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; range: z.ZodOptional&lt;z.ZodEffects&lt;z.ZodObject&lt;{ start: z.ZodNumber; endInclusive: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strict", z.ZodTyp...</code> | Runtime schema for Artifact Content. |
| `artifactCopyRequestJsonSchema` | constant | <code>const artifactCopyRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Copy Request. |
| `artifactCopyRequestSchema` | constant | <code>const artifactCopyRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; source: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: str...</code> | Runtime schema for Artifact Copy Request. |
| `artifactDownloadAccessJsonSchema` | constant | <code>const artifactDownloadAccessJsonSchema: JsonSchema</code> | JSON Schema for Artifact Download Access. |
| `artifactDownloadAccessRequestExample` | constant | <code>const artifactDownloadAccessRequestExample: ArtifactDownloadAccessRequest</code> | Valid example value for Artifact Download Access Request. |
| `artifactDownloadAccessRequestJsonSchema` | constant | <code>const artifactDownloadAccessRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Download Access Request. |
| `artifactDownloadAccessRequestSchema` | constant | <code>const artifactDownloadAccessRequestSchema: z.ZodObject&lt;{ ref: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string &#124; undefined; bu...</code> | Runtime schema for Artifact Download Access Request. |
| `artifactDownloadAccessSchema` | constant | <code>const artifactDownloadAccessSchema: z.ZodObject&lt;{ method: z.ZodLiteral&lt;"GET"&gt;; url: z.ZodString; expiresAt: z.ZodString; headers: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodString&gt;&gt;; }, "strict", z.ZodTypeAny, { expiresAt: string; method: "GET"; url: string; headers?: Record&lt;string, string&gt; &#124; undefined; }, { expiresAt: string; method: "GET"; url: string; headers?: Record&lt;string, string&gt; &#124; undefined; }&gt;</code> | Runtime schema for Artifact Download Access. |
| `artifactGetRequestExample` | constant | <code>const artifactGetRequestExample: ArtifactGetRequest</code> | Valid example value for Artifact Get Request. |
| `artifactGetRequestJsonSchema` | constant | <code>const artifactGetRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Get Request. |
| `artifactGetRequestSchema` | constant | <code>const artifactGetRequestSchema: z.ZodObject&lt;{ ref: z.ZodObject&lt;{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional&lt;z.ZodString&gt;; objectKey: z.ZodString; versionId: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; region: z.ZodOptional&lt;z.ZodString&gt;; encrypted: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string &#124; undefined; bucketOrNames...</code> | Runtime schema for Artifact Get Request. |
| `artifactObjectKeySchema` | constant | <code>const artifactObjectKeySchema: z.ZodEffects&lt;z.ZodString, string, string&gt;</code> | Runtime schema for Artifact Object Key. |
| `artifactObjectMetadataJsonSchema` | constant | <code>const artifactObjectMetadataJsonSchema: JsonSchema</code> | JSON Schema for Artifact Object Metadata. |
| `artifactObjectMetadataSchema` | constant | <code>const artifactObjectMetadataSchema: z.ZodObject&lt;{ contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional&lt;z.ZodString&gt;; etag: z.ZodOptional&lt;z.ZodString&gt;; lastModifiedAt: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodString&gt;&gt;; }, "strict", z.ZodTypeAny, { sizeBytes: number; contentHash: string; mimeType?: string &#124; undefined; etag?: string &#124; undefined; metadata?:...</code> | Runtime schema for Artifact Object Metadata. |
| `artifactPutRequestExample` | constant | <code>const artifactPutRequestExample: ArtifactPutRequest</code> | Valid example value for Artifact Put Request. |
| `artifactPutRequestJsonSchema` | constant | <code>const artifactPutRequestJsonSchema: JsonSchema</code> | JSON Schema for Artifact Put Request. |
| `artifactPutRequestSchema` | constant | <code>const artifactPutRequestSchema: z.ZodObject&lt;{ operationId: z.ZodString; objectKey: z.ZodEffects&lt;z.ZodString, string, string&gt;; content: z.ZodType&lt;ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource&gt;; expectedContentHash: z.ZodOptional&lt;z.ZodString&gt;; sizeBytes: z.ZodOptional&lt;z.ZodNumber&gt;; mimeType: z.ZodOptional&lt;z.ZodString&gt;; metadata: z.ZodOptional&lt;z.ZodRecord&lt;z.ZodString, z.ZodString&gt;&gt;; ifAbsent: z.ZodOptional&lt;z.Z...</code> | Runtime schema for Artifact Put Request. |
| `artifactStoreCapabilitiesExample` | constant | <code>const artifactStoreCapabilitiesExample: ArtifactStoreCapabilities</code> | Valid example value for Artifact Store Capabilities. |
| `artifactStoreCapabilitiesJsonSchema` | constant | <code>const artifactStoreCapabilitiesJsonSchema: JsonSchema</code> | JSON Schema for Artifact Store Capabilities. |
| `artifactStoreCapabilitiesSchema` | constant | <code>const artifactStoreCapabilitiesSchema: z.ZodObject&lt;{ versioning: z.ZodBoolean; rangeRead: z.ZodBoolean; signedAccess: z.ZodBoolean; serverSideCopy: z.ZodBoolean; encryption: z.ZodBoolean; multipartUpload: z.ZodBoolean; contentAddressing: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentAddressing: boolean; versioning: boolean; rangeRead: boolean; signedAccess: boolean; serverSideCopy: boolean; encryption: boolean...</code> | Runtime schema for Artifact Store Capabilities. |
| `artifactStoreContractJsonSchemas` | constant | <code>const artifactStoreContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Artifact Store Contract JSON Schemas constant exported by the `modules/artifact/store` module. |
| `artifactStreamSchema` | constant | <code>const artifactStreamSchema: z.ZodType&lt;AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;, z.ZodTypeDef, AsyncIterable&lt;Uint8Array&lt;ArrayBufferLike&gt;&gt;&gt;</code> | Runtime schema for Artifact Stream. |
| `isArtifactByteSource` | function | <code>isArtifactByteSource(value: unknown): value is ArtifactByteSource</code> | Is Artifact Byte Source function with 1 public call signature; parameters and return types are listed below. |
| `isArtifactStream` | function | <code>isArtifactStream(value: unknown): value is AsyncIterable&lt;Uint8Array&gt;</code> | Is Artifact Stream function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactContent` | function | <code>validateArtifactContent(input: unknown): ArtifactContent</code> | Validate Artifact Content function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactDownloadAccess` | function | <code>validateArtifactDownloadAccess(input: unknown): ArtifactDownloadAccess</code> | Validate Artifact Download Access function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactDownloadAccessRequest` | function | <code>validateArtifactDownloadAccessRequest(input: unknown): ArtifactDownloadAccessRequest</code> | Validate Artifact Download Access Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactGetRequest` | function | <code>validateArtifactGetRequest(input: unknown): ArtifactGetRequest</code> | Validate Artifact Get Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactObjectMetadata` | function | <code>validateArtifactObjectMetadata(input: unknown): ArtifactObjectMetadata</code> | Validate Artifact Object Metadata function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactPutRequest` | function | <code>validateArtifactPutRequest(input: unknown): ArtifactPutRequest</code> | Validate Artifact Put Request function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactStorageRef` | function | <code>validateArtifactStorageRef(input: unknown): { storeId: string; objectKey: string; versionId?: string &#124; undefined; bucketOrNamespace?: string &#124; undefined; etag?: string &#124; undefined; region?: string &#124; undefined; encrypted?: boolean &#124; undefined; }</code> | Validate Artifact Storage Ref function with 1 public call signature; parameters and return types are listed below. |
| `validateArtifactStoreCapabilities` | function | <code>validateArtifactStoreCapabilities(input: unknown): ArtifactStoreCapabilities</code> | Validate Artifact Store Capabilities function with 1 public call signature; parameters and return types are listed below. |

## `artifactByteRangeJsonSchema`

JSON Schema for Artifact Byte Range.

- Kind: constant
- Import: `import { artifactByteRangeJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactByteRangeJsonSchema: JsonSchema;
```

## `artifactByteRangeSchema`

Runtime schema for Artifact Byte Range.

- Kind: constant
- Import: `import { artifactByteRangeSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactByteRangeSchema: z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>;
```

## `artifactByteSourceSchema`

Runtime schema for Artifact Byte Source.

- Kind: constant
- Import: `import { artifactByteSourceSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactByteSourceSchema: z.ZodType<ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource>;
```

## `artifactContentJsonSchema`

JSON Schema for Artifact Content.

- Kind: constant
- Import: `import { artifactContentJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactContentJsonSchema: JsonSchema;
```

## `artifactContentSchema`

Runtime schema for Artifact Content.

- Kind: constant
- Import: `import { artifactContentSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactContentSchema: z.ZodObject<{ stream: z.ZodType<AsyncIterable<Uint8Array<ArrayBufferLike>>, z.ZodTypeDef, AsyncIterable<Uint8Array<ArrayBufferLike>>>; contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; range: z.ZodOptional<z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>>; }, "strict", z.ZodTypeAny, { sizeBytes: number; contentHash: string; stream: AsyncIterable<Uint8Array<ArrayBufferLike>>; mimeType?: string | undefined; etag?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }, { sizeBytes: number; contentHash: string; stream: AsyncIterable<Uint8Array<ArrayBufferLike>>; mimeType?: string | undefined; etag?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }>;
```

## `artifactCopyRequestJsonSchema`

JSON Schema for Artifact Copy Request.

- Kind: constant
- Import: `import { artifactCopyRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactCopyRequestJsonSchema: JsonSchema;
```

## `artifactCopyRequestSchema`

Runtime schema for Artifact Copy Request.

- Kind: constant
- Import: `import { artifactCopyRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactCopyRequestSchema: z.ZodObject<{ operationId: z.ZodString; source: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>; targetObjectKey: z.ZodEffects<z.ZodString, string, string>; ifAbsent: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { operationId: string; source: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; targetObjectKey: string; ifAbsent?: boolean | undefined; }, { operationId: string; source: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; targetObjectKey: string; ifAbsent?: boolean | undefined; }>;
```

## `artifactDownloadAccessJsonSchema`

JSON Schema for Artifact Download Access.

- Kind: constant
- Import: `import { artifactDownloadAccessJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactDownloadAccessJsonSchema: JsonSchema;
```

## `artifactDownloadAccessRequestExample`

Valid example value for Artifact Download Access Request.

- Kind: constant
- Import: `import { artifactDownloadAccessRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactDownloadAccessRequestExample: ArtifactDownloadAccessRequest;
```

## `artifactDownloadAccessRequestJsonSchema`

JSON Schema for Artifact Download Access Request.

- Kind: constant
- Import: `import { artifactDownloadAccessRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactDownloadAccessRequestJsonSchema: JsonSchema;
```

## `artifactDownloadAccessRequestSchema`

Runtime schema for Artifact Download Access Request.

- Kind: constant
- Import: `import { artifactDownloadAccessRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactDownloadAccessRequestSchema: z.ZodObject<{ ref: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>; expiresInSeconds: z.ZodNumber; responseMimeType: z.ZodOptional<z.ZodString>; responseFilename: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expiresInSeconds: number; responseMimeType?: string | undefined; responseFilename?: string | undefined; }, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expiresInSeconds: number; responseMimeType?: string | undefined; responseFilename?: string | undefined; }>;
```

## `artifactDownloadAccessSchema`

Runtime schema for Artifact Download Access.

- Kind: constant
- Import: `import { artifactDownloadAccessSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactDownloadAccessSchema: z.ZodObject<{ method: z.ZodLiteral<"GET">; url: z.ZodString; expiresAt: z.ZodString; headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; }, "strict", z.ZodTypeAny, { expiresAt: string; method: "GET"; url: string; headers?: Record<string, string> | undefined; }, { expiresAt: string; method: "GET"; url: string; headers?: Record<string, string> | undefined; }>;
```

## `artifactGetRequestExample`

Valid example value for Artifact Get Request.

- Kind: constant
- Import: `import { artifactGetRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactGetRequestExample: ArtifactGetRequest;
```

## `artifactGetRequestJsonSchema`

JSON Schema for Artifact Get Request.

- Kind: constant
- Import: `import { artifactGetRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactGetRequestJsonSchema: JsonSchema;
```

## `artifactGetRequestSchema`

Runtime schema for Artifact Get Request.

- Kind: constant
- Import: `import { artifactGetRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactGetRequestSchema: z.ZodObject<{ ref: z.ZodObject<{ storeId: z.ZodString; bucketOrNamespace: z.ZodOptional<z.ZodString>; objectKey: z.ZodString; versionId: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; region: z.ZodOptional<z.ZodString>; encrypted: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }, { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }>; range: z.ZodOptional<z.ZodEffects<z.ZodObject<{ start: z.ZodNumber; endInclusive: z.ZodOptional<z.ZodNumber>; }, "strict", z.ZodTypeAny, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>, { start: number; endInclusive?: number | undefined; }, { start: number; endInclusive?: number | undefined; }>>; expectedContentHash: z.ZodOptional<z.ZodString>; }, "strict", z.ZodTypeAny, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }, { ref: { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }; expectedContentHash?: string | undefined; range?: { start: number; endInclusive?: number | undefined; } | undefined; }>;
```

## `artifactObjectKeySchema`

Runtime schema for Artifact Object Key.

- Kind: constant
- Import: `import { artifactObjectKeySchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactObjectKeySchema: z.ZodEffects<z.ZodString, string, string>;
```

## `artifactObjectMetadataJsonSchema`

JSON Schema for Artifact Object Metadata.

- Kind: constant
- Import: `import { artifactObjectMetadataJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactObjectMetadataJsonSchema: JsonSchema;
```

## `artifactObjectMetadataSchema`

Runtime schema for Artifact Object Metadata.

- Kind: constant
- Import: `import { artifactObjectMetadataSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactObjectMetadataSchema: z.ZodObject<{ contentHash: z.ZodString; sizeBytes: z.ZodNumber; mimeType: z.ZodOptional<z.ZodString>; etag: z.ZodOptional<z.ZodString>; lastModifiedAt: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; }, "strict", z.ZodTypeAny, { sizeBytes: number; contentHash: string; mimeType?: string | undefined; etag?: string | undefined; metadata?: Record<string, string> | undefined; lastModifiedAt?: string | undefined; }, { sizeBytes: number; contentHash: string; mimeType?: string | undefined; etag?: string | undefined; metadata?: Record<string, string> | undefined; lastModifiedAt?: string | undefined; }>;
```

## `artifactPutRequestExample`

Valid example value for Artifact Put Request.

- Kind: constant
- Import: `import { artifactPutRequestExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactPutRequestExample: ArtifactPutRequest;
```

## `artifactPutRequestJsonSchema`

JSON Schema for Artifact Put Request.

- Kind: constant
- Import: `import { artifactPutRequestJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactPutRequestJsonSchema: JsonSchema;
```

## `artifactPutRequestSchema`

Runtime schema for Artifact Put Request.

- Kind: constant
- Import: `import { artifactPutRequestSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactPutRequestSchema: z.ZodObject<{ operationId: z.ZodString; objectKey: z.ZodEffects<z.ZodString, string, string>; content: z.ZodType<ArtifactByteSource, z.ZodTypeDef, ArtifactByteSource>; expectedContentHash: z.ZodOptional<z.ZodString>; sizeBytes: z.ZodOptional<z.ZodNumber>; mimeType: z.ZodOptional<z.ZodString>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>; ifAbsent: z.ZodOptional<z.ZodBoolean>; }, "strict", z.ZodTypeAny, { objectKey: string; operationId: string; content: ArtifactByteSource; mimeType?: string | undefined; sizeBytes?: number | undefined; metadata?: Record<string, string> | undefined; expectedContentHash?: string | undefined; ifAbsent?: boolean | undefined; }, { objectKey: string; operationId: string; content: ArtifactByteSource; mimeType?: string | undefined; sizeBytes?: number | undefined; metadata?: Record<string, string> | undefined; expectedContentHash?: string | undefined; ifAbsent?: boolean | undefined; }>;
```

## `artifactStoreCapabilitiesExample`

Valid example value for Artifact Store Capabilities.

- Kind: constant
- Import: `import { artifactStoreCapabilitiesExample } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactStoreCapabilitiesExample: ArtifactStoreCapabilities;
```

## `artifactStoreCapabilitiesJsonSchema`

JSON Schema for Artifact Store Capabilities.

- Kind: constant
- Import: `import { artifactStoreCapabilitiesJsonSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactStoreCapabilitiesJsonSchema: JsonSchema;
```

## `artifactStoreCapabilitiesSchema`

Runtime schema for Artifact Store Capabilities.

- Kind: constant
- Import: `import { artifactStoreCapabilitiesSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactStoreCapabilitiesSchema: z.ZodObject<{ versioning: z.ZodBoolean; rangeRead: z.ZodBoolean; signedAccess: z.ZodBoolean; serverSideCopy: z.ZodBoolean; encryption: z.ZodBoolean; multipartUpload: z.ZodBoolean; contentAddressing: z.ZodBoolean; }, "strict", z.ZodTypeAny, { contentAddressing: boolean; versioning: boolean; rangeRead: boolean; signedAccess: boolean; serverSideCopy: boolean; encryption: boolean; multipartUpload: boolean; }, { contentAddressing: boolean; versioning: boolean; rangeRead: boolean; signedAccess: boolean; serverSideCopy: boolean; encryption: boolean; multipartUpload: boolean; }>;
```

## `artifactStoreContractJsonSchemas`

Artifact Store Contract JSON Schemas constant exported by the `modules/artifact/store` module.

- Kind: constant
- Import: `import { artifactStoreContractJsonSchemas } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactStoreContractJsonSchemas: Record<string, JsonSchema>;
```

## `artifactStreamSchema`

Runtime schema for Artifact Stream.

- Kind: constant
- Import: `import { artifactStreamSchema } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare const artifactStreamSchema: z.ZodType<AsyncIterable<Uint8Array<ArrayBufferLike>>, z.ZodTypeDef, AsyncIterable<Uint8Array<ArrayBufferLike>>>;
```

## `isArtifactByteSource`

Is Artifact Byte Source function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isArtifactByteSource } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function isArtifactByteSource(value: unknown): value is ArtifactByteSource;
```

### Call signature

```text
isArtifactByteSource(value: unknown): value is ArtifactByteSource
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is ArtifactByteSource`
- Description: The return contract is defined by the type shown above.

## `isArtifactStream`

Is Artifact Stream function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { isArtifactStream } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function isArtifactStream(value: unknown): value is AsyncIterable<Uint8Array>;
```

### Call signature

```text
isArtifactStream(value: unknown): value is AsyncIterable<Uint8Array>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `value` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `value is AsyncIterable<Uint8Array<ArrayBufferLike>>`
- Description: The return contract is defined by the type shown above.

## `validateArtifactContent`

Validate Artifact Content function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactContent } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactContent(input: unknown): ArtifactContent;
```

### Call signature

```text
validateArtifactContent(input: unknown): ArtifactContent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactContent`
- Description: The return contract is defined by the type shown above.

## `validateArtifactDownloadAccess`

Validate Artifact Download Access function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactDownloadAccess } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactDownloadAccess(input: unknown): ArtifactDownloadAccess;
```

### Call signature

```text
validateArtifactDownloadAccess(input: unknown): ArtifactDownloadAccess
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactDownloadAccess`
- Description: The return contract is defined by the type shown above.

## `validateArtifactDownloadAccessRequest`

Validate Artifact Download Access Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactDownloadAccessRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactDownloadAccessRequest(input: unknown): ArtifactDownloadAccessRequest;
```

### Call signature

```text
validateArtifactDownloadAccessRequest(input: unknown): ArtifactDownloadAccessRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactDownloadAccessRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactGetRequest`

Validate Artifact Get Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactGetRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactGetRequest(input: unknown): ArtifactGetRequest;
```

### Call signature

```text
validateArtifactGetRequest(input: unknown): ArtifactGetRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactGetRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactObjectMetadata`

Validate Artifact Object Metadata function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactObjectMetadata } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactObjectMetadata(input: unknown): ArtifactObjectMetadata;
```

### Call signature

```text
validateArtifactObjectMetadata(input: unknown): ArtifactObjectMetadata
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactObjectMetadata`
- Description: The return contract is defined by the type shown above.

## `validateArtifactPutRequest`

Validate Artifact Put Request function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactPutRequest } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactPutRequest(input: unknown): ArtifactPutRequest;
```

### Call signature

```text
validateArtifactPutRequest(input: unknown): ArtifactPutRequest
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactPutRequest`
- Description: The return contract is defined by the type shown above.

## `validateArtifactStorageRef`

Validate Artifact Storage Ref function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactStorageRef } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

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

### Call signature

```text
validateArtifactStorageRef(input: unknown): { storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `{ storeId: string; objectKey: string; versionId?: string | undefined; bucketOrNamespace?: string | undefined; etag?: string | undefined; region?: string | undefined; encrypted?: boolean | undefined; }`
- Description: The return contract is defined by the type shown above.

## `validateArtifactStoreCapabilities`

Validate Artifact Store Capabilities function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateArtifactStoreCapabilities } from '@codesoul-co/hypha-core';`
- Source module: [`modules/artifact/store`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store.ts)

### Declaration

```text
export declare function validateArtifactStoreCapabilities(input: unknown): ArtifactStoreCapabilities;
```

### Call signature

```text
validateArtifactStoreCapabilities(input: unknown): ArtifactStoreCapabilities
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ArtifactStoreCapabilities`
- Description: The return contract is defined by the type shown above.
