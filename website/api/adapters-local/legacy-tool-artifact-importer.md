# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-importer`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-importer.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-importer.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactImporter` | class | <code>new LegacyToolArtifactImporter(options: LegacyToolArtifactImporterOptions): LegacyToolArtifactImporter</code> | Imports one explicitly identified legacy Tool file into Core ArtifactManager. |
| `LegacyToolArtifactImportError` | class | <code>new LegacyToolArtifactImportError(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactImportError</code> | Runtime implementation for Legacy Tool Artifact Import Error; see its public constructor and members below. |
| `legacyArtifactReference` | function | <code>legacyArtifactReference(relativePath: string, sizeBytes: number): string</code> | Public runtime operation for legacy Artifact Reference. |
| `LegacyToolArtifactImporterOptions` | interface | <code>interface LegacyToolArtifactImporterOptions</code> | Field contract for Legacy Tool Artifact Importer Options; see all contract members below. |
| `LegacyToolArtifactImportRequest` | interface | <code>interface LegacyToolArtifactImportRequest</code> | Field contract for Legacy Tool Artifact Import Request; see all contract members below. |
| `LegacyToolArtifactImportResult` | interface | <code>interface LegacyToolArtifactImportResult</code> | Field contract for Legacy Tool Artifact Import Result; see all contract members below. |
| `LegacyToolArtifactImportErrorCode` | type | <code>type LegacyToolArtifactImportErrorCode = 'LEGACY_ARTIFACT_INVALID_PATH' &#124; 'LEGACY_ARTIFACT_NOT_FOUND' &#124; 'LEGACY_ARTIFACT_TOO_LARGE' &#124; 'LEGACY_ARTIFACT_ID_MISMATCH' &#124; 'LEGACY_ARTIFACT_SIZE_MISMATCH' &#124; 'LEGACY_ARTIFACT_CONTENT_MISMATCH'</code> | Public type alias for Legacy Tool Artifact Import Error Code. |

## `LegacyToolArtifactImporter` public members

Imports one explicitly identified legacy Tool file into Core ArtifactManager.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactImporterOptions): LegacyToolArtifactImporter</code> | Creates an instance of this class. |
| `import` | method | <code>import(request: LegacyToolArtifactImportRequest): Promise&lt;LegacyToolArtifactImportResult&gt;</code> | Public runtime operation for import. |

## `LegacyToolArtifactImportError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: LegacyToolArtifactImportErrorCode</code> | Public code property. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactImportErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactImportError</code> | Creates an instance of this class. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactImporterOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `legacyRootPath` | property | <code>legacyRootPath: string</code> | Public legacy Root Path property. |
| `manager` | property | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | Public manager property. |
| `maxArtifactBytes` | property | <code>maxArtifactBytes: number</code> | Public max Artifact Bytes property. |

## `LegacyToolArtifactImportRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolArtifactManagerContext</code> | Public context property. |
| `expectedContentHash` | property | <code>expectedContentHash: string</code> | Public expected Content Hash property. |
| `expectedLegacyArtifactId` | property | <code>expectedLegacyArtifactId: string</code> | Public expected Legacy Artifact Id property. |
| `expectedSizeBytes` | property | <code>expectedSizeBytes: number</code> | Public expected Size Bytes property. |
| `invocationId` | property | <code>invocationId: string</code> | Public invocation Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `mimeType` | property | <code>mimeType: string</code> | Public mime Type property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `toolId` | property | <code>toolId: string</code> | Public tool Id property. |

## `LegacyToolArtifactImportResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifactId` | property | <code>artifactId: string</code> | Public artifact Id property. |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public legacy Artifact Id property. |
| `revision` | property | <code>revision: number</code> | Public revision property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
| `versionId` | property | <code>versionId: string</code> | Public version Id property. |
