# `@codesoul-co/hypha-adapters-local` / `local-artifact-files`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/local-artifact-files.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)
- Exports: **17**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LocalArtifactIntegrityError` | class | <code>new LocalArtifactIntegrityError(message: string): LocalArtifactIntegrityError</code> | Runtime implementation for Local Artifact Integrity Error; see its public constructor and members below. |
| `LocalArtifactTransferAbortedError` | class | <code>new LocalArtifactTransferAbortedError(): LocalArtifactTransferAbortedError</code> | Runtime implementation for Local Artifact Transfer Aborted Error; see its public constructor and members below. |
| `ensureSafeLocalArtifactDirectory` | function | <code>ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise&lt;void&gt;</code> | Public runtime operation for ensure Safe Local Artifact Directory. |
| `ensureSafeLocalArtifactFile` | function | <code>ensureSafeLocalArtifactFile(root: string, filename: string): Promise&lt;void&gt;</code> | Public runtime operation for ensure Safe Local Artifact File. |
| `hashLocalArtifactFile` | function | <code>hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise&lt;{ contentHash: string; sizeBytes: number; }&gt;</code> | Checks whether h Local Artifact File at this module boundary. |
| `isNodeError` | function | <code>isNodeError(error: unknown, code: string): boolean</code> | Checks Node Error at this module boundary. |
| `listLocalArtifactFiles` | function | <code>listLocalArtifactFiles(root: string, extension?: string): Promise&lt;string[]&gt;</code> | Lists Local Artifact Files at this module boundary. |
| `localArtifactBlobPath` | function | <code>localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string</code> | Public runtime operation for local Artifact Blob Path. |
| `localArtifactManifestPath` | function | <code>localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string</code> | Public runtime operation for local Artifact Manifest Path. |
| `pathExists` | function | <code>pathExists(filename: string): Promise&lt;boolean&gt;</code> | Public runtime operation for path Exists. |
| `prepareLocalArtifactStore` | function | <code>prepareLocalArtifactStore(rootPath: string): Promise&lt;LocalArtifactStorePaths&gt;</code> | Public runtime operation for prepare Local Artifact Store. |
| `publishLocalArtifactBlob` | function | <code>publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise&lt;void&gt;</code> | Public runtime operation for publish Local Artifact Blob. |
| `streamLocalArtifactFile` | function | <code>streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable&lt;Uint8Array&gt;</code> | Public runtime operation for stream Local Artifact File. |
| `writeJsonAtomically` | function | <code>writeJsonAtomically(root: string, filename: string, value: unknown, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | Public runtime operation for write Json Atomically. |
| `writeLocalArtifactTempFile` | function | <code>writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise&lt;LocalArtifactTempFile&gt;</code> | Public runtime operation for write Local Artifact Temp File. |
| `LocalArtifactStorePaths` | interface | <code>interface LocalArtifactStorePaths</code> | Field contract for Local Artifact Store Paths; see all contract members below. |
| `LocalArtifactTempFile` | interface | <code>interface LocalArtifactTempFile</code> | Field contract for Local Artifact Temp File; see all contract members below. |

## `LocalArtifactIntegrityError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `constructor` | constructor | <code>(message: string): LocalArtifactIntegrityError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LocalArtifactTransferAbortedError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: "LOCAL_ARTIFACT_TRANSFER_ABORTED"</code> | Public code property. |
| `constructor` | constructor | <code>(): LocalArtifactTransferAbortedError</code> | Creates an instance of this class. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LocalArtifactStorePaths` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blobs` | property | <code>blobs: string</code> | Public blobs property. |
| `objects` | property | <code>objects: string</code> | Public objects property. |
| `root` | property | <code>root: string</code> | Public root property. |
| `temporary` | property | <code>temporary: string</code> | Public temporary property. |

## `LocalArtifactTempFile` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |
