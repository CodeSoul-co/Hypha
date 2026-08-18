# `@codesoul-co/hypha-adapters-local` / `local-artifact-files`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/local-artifact-files.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/local-artifact-files.ts)
- 导出数: **17**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `LocalArtifactIntegrityError` | 类 | <code>new LocalArtifactIntegrityError(message: string): LocalArtifactIntegrityError</code> | Local Artifact Integrity Error 的运行时实现；公开构造函数与成员见下表。 |
| `LocalArtifactTransferAbortedError` | 类 | <code>new LocalArtifactTransferAbortedError(): LocalArtifactTransferAbortedError</code> | Local Artifact Transfer Aborted Error 的运行时实现；公开构造函数与成员见下表。 |
| `ensureSafeLocalArtifactDirectory` | 函数 | <code>ensureSafeLocalArtifactDirectory(root: string, directory: string): Promise&lt;void&gt;</code> | ensure Safe Local Artifact Directory 的公开运行时操作。 |
| `ensureSafeLocalArtifactFile` | 函数 | <code>ensureSafeLocalArtifactFile(root: string, filename: string): Promise&lt;void&gt;</code> | ensure Safe Local Artifact File 的公开运行时操作。 |
| `hashLocalArtifactFile` | 函数 | <code>hashLocalArtifactFile(filename: string, root?: string, abortSignal?: AbortSignal): Promise&lt;{ contentHash: string; sizeBytes: number; }&gt;</code> | 判断是否存在 h Local Artifact File。 |
| `isNodeError` | 函数 | <code>isNodeError(error: unknown, code: string): boolean</code> | 判断 Node Error。 |
| `listLocalArtifactFiles` | 函数 | <code>listLocalArtifactFiles(root: string, extension?: string): Promise&lt;string[]&gt;</code> | 列出 Local Artifact Files。 |
| `localArtifactBlobPath` | 函数 | <code>localArtifactBlobPath(paths: LocalArtifactStorePaths, contentHash: string): string</code> | local Artifact Blob Path 的公开运行时操作。 |
| `localArtifactManifestPath` | 函数 | <code>localArtifactManifestPath(paths: LocalArtifactStorePaths, objectKey: string): string</code> | local Artifact Manifest Path 的公开运行时操作。 |
| `pathExists` | 函数 | <code>pathExists(filename: string): Promise&lt;boolean&gt;</code> | path Exists 的公开运行时操作。 |
| `prepareLocalArtifactStore` | 函数 | <code>prepareLocalArtifactStore(rootPath: string): Promise&lt;LocalArtifactStorePaths&gt;</code> | prepare Local Artifact Store 的公开运行时操作。 |
| `publishLocalArtifactBlob` | 函数 | <code>publishLocalArtifactBlob(root: string, temporaryPath: string, blobPath: string, expectedHash: string, expectedSizeBytes: number): Promise&lt;void&gt;</code> | publish Local Artifact Blob 的公开运行时操作。 |
| `streamLocalArtifactFile` | 函数 | <code>streamLocalArtifactFile(filename: string, range?: ArtifactByteRange, root?: string, abortSignal?: AbortSignal): AsyncIterable&lt;Uint8Array&gt;</code> | stream Local Artifact File 的公开运行时操作。 |
| `writeJsonAtomically` | 函数 | <code>writeJsonAtomically(root: string, filename: string, value: unknown, options?: { ifAbsent?: boolean; }): Promise&lt;void&gt;</code> | write Json Atomically 的公开运行时操作。 |
| `writeLocalArtifactTempFile` | 函数 | <code>writeLocalArtifactTempFile(source: ArtifactByteSource, paths: LocalArtifactStorePaths, maxBytes: number, abortSignal?: AbortSignal): Promise&lt;LocalArtifactTempFile&gt;</code> | write Local Artifact Temp File 的公开运行时操作。 |
| `LocalArtifactStorePaths` | 接口 | <code>interface LocalArtifactStorePaths</code> | Local Artifact Store Paths 的字段契约；完整字段见下表。 |
| `LocalArtifactTempFile` | 接口 | <code>interface LocalArtifactTempFile</code> | Local Artifact Temp File 的字段契约；完整字段见下表。 |

## `LocalArtifactIntegrityError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `constructor` | 构造函数 | <code>(message: string): LocalArtifactIntegrityError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LocalArtifactTransferAbortedError` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cause` | 属性 | <code>cause: unknown</code> | cause 字段。 |
| `code` | 属性 | <code>code: "LOCAL_ARTIFACT_TRANSFER_ABORTED"</code> | code 字段。 |
| `constructor` | 构造函数 | <code>(): LocalArtifactTransferAbortedError</code> | 创建该类的实例。 |
| `message` | 属性 | <code>message: string</code> | message 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `stack` | 属性 | <code>stack: string</code> | stack 字段。 |
| `static captureStackTrace` | 方法 | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | 方法 | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | prepare Stack Trace 的公开运行时操作。 |
| `static stackTraceLimit` | 属性 | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LocalArtifactStorePaths` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blobs` | 属性 | <code>blobs: string</code> | blobs 字段。 |
| `objects` | 属性 | <code>objects: string</code> | objects 字段。 |
| `root` | 属性 | <code>root: string</code> | root 字段。 |
| `temporary` | 属性 | <code>temporary: string</code> | temporary 字段。 |

## `LocalArtifactTempFile` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contentHash` | 属性 | <code>contentHash: string</code> | content Hash 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `sizeBytes` | 属性 | <code>sizeBytes: number</code> | size Bytes 字段。 |
