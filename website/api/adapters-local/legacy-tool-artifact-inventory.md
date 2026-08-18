# `@codesoul-co/hypha-adapters-local` / `legacy-tool-artifact-inventory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/legacy-tool-artifact-inventory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/legacy-tool-artifact-inventory.ts)
- Exports: **6**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LegacyToolArtifactInventory` | class | <code>new LegacyToolArtifactInventory(options: LegacyToolArtifactInventoryOptions): LegacyToolArtifactInventory</code> | Builds a deterministic, bounded, read-only inventory of old Tool outputs. |
| `LegacyToolArtifactInventoryError` | class | <code>new LegacyToolArtifactInventoryError(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactInventoryError</code> | Runtime implementation for Legacy Tool Artifact Inventory Error; see its public constructor and members below. |
| `LegacyToolArtifactInventoryEntry` | interface | <code>interface LegacyToolArtifactInventoryEntry</code> | Describes an old Tool output without treating sanitized path segments as authoritative Tool or Invocation identities. |
| `LegacyToolArtifactInventoryOptions` | interface | <code>interface LegacyToolArtifactInventoryOptions</code> | Field contract for Legacy Tool Artifact Inventory Options; see all contract members below. |
| `LegacyToolArtifactInventoryResult` | interface | <code>interface LegacyToolArtifactInventoryResult</code> | Field contract for Legacy Tool Artifact Inventory Result; see all contract members below. |
| `LegacyToolArtifactInventoryErrorCode` | type | <code>type LegacyToolArtifactInventoryErrorCode = 'LEGACY_INVENTORY_INVALID_ROOT' &#124; 'LEGACY_INVENTORY_INVALID_LAYOUT' &#124; 'LEGACY_INVENTORY_LIMIT_EXCEEDED' &#124; 'LEGACY_INVENTORY_SOURCE_CHANGED'</code> | Public type alias for Legacy Tool Artifact Inventory Error Code. |

## `LegacyToolArtifactInventory` public members

Builds a deterministic, bounded, read-only inventory of old Tool outputs.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LegacyToolArtifactInventoryOptions): LegacyToolArtifactInventory</code> | Creates an instance of this class. |
| `scan` | method | <code>scan(): Promise&lt;LegacyToolArtifactInventoryResult&gt;</code> | Public runtime operation for scan. |

## `LegacyToolArtifactInventoryError` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cause` | property | <code>cause: unknown</code> | Public cause property. |
| `code` | property | <code>code: LegacyToolArtifactInventoryErrorCode</code> | Public code property. |
| `constructor` | constructor | <code>(code: LegacyToolArtifactInventoryErrorCode, message: string, details?: Record&lt;string, unknown&gt; &#124; undefined): LegacyToolArtifactInventoryError</code> | Creates an instance of this class. |
| `details` | property | <code>details: Record&lt;string, unknown&gt;</code> | Public details property. |
| `message` | property | <code>message: string</code> | Public message property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `stack` | property | <code>stack: string</code> | Public stack property. |
| `static captureStackTrace` | method | <code>captureStackTrace(targetObject: object, constructorOpt?: Function): void</code> | Creates a `.stack` property on `targetObject`, which when accessed returns a string representing the location in the code at which `Error.captureStackTrace()` was called. ```js const myObject = {}; Error.captureStackTrace(myObject); myObject.stack; // Similar to `new Error().stack` ``` The first line of the trace will be prefixed with `${myObject.name}: ${myObject.message}`. The optional `constructorOpt` argument accepts a function. If given, all frames above `constructorOpt`, including `constructorOpt`, will be omitted from the generated stack trace. The `constructorOpt` argument is useful for hiding implementation details of error generation from the user. For instance: ```js function a() { b(); } function b() { c(); } function c() { // Create an error without stack trace to avoid calculating the stack trace twice. const { stackTraceLimit } = Error; Error.stackTraceLimit = 0; const error = new Error(); Error.stackTraceLimit = stackTraceLimit; // Capture the stack trace above function b Error.captureStackTrace(error, b); // Neither function c, nor b is included in the stack trace throw error; } a(); ``` |
| `static prepareStackTrace` | method | <code>prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any</code> | Public runtime operation for prepare Stack Trace. |
| `static stackTraceLimit` | property | <code>stackTraceLimit: number</code> | The `Error.stackTraceLimit` property specifies the number of stack frames collected by a stack trace (whether generated by `new Error().stack` or `Error.captureStackTrace(obj)`). The default value is `10` but may be set to any valid JavaScript number. Changes will affect any stack trace captured _after_ the value has been changed. If set to a non-number value, or set to a negative number, stack traces will not capture any frames. |

## `LegacyToolArtifactInventoryEntry` contract members

Describes an old Tool output without treating sanitized path segments as authoritative Tool or Invocation identities.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contentHash` | property | <code>contentHash: string</code> | Public content Hash property. |
| `legacyArtifactId` | property | <code>legacyArtifactId: string</code> | Public legacy Artifact Id property. |
| `legacyInvocationPathSegment` | property | <code>legacyInvocationPathSegment: string</code> | Public legacy Invocation Path Segment property. |
| `legacyToolPathSegment` | property | <code>legacyToolPathSegment: string</code> | Public legacy Tool Path Segment property. |
| `mimeType` | property | <code>mimeType: "application/json" &#124; "text/plain"</code> | Public mime Type property. |
| `relativePath` | property | <code>relativePath: string</code> | Public relative Path property. |
| `sizeBytes` | property | <code>sizeBytes: number</code> | Public size Bytes property. |

## `LegacyToolArtifactInventoryOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `legacyRootPath` | property | <code>legacyRootPath: string</code> | Public legacy Root Path property. |
| `maxEntries` | property | <code>maxEntries: number</code> | Public max Entries property. |
| `maxFileBytes` | property | <code>maxFileBytes: number</code> | Public max File Bytes property. |
| `maxTotalBytes` | property | <code>maxTotalBytes: number</code> | Public max Total Bytes property. |

## `LegacyToolArtifactInventoryResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `entries` | property | <code>entries: LegacyToolArtifactInventoryEntry[]</code> | Public entries property. |
| `totalBytes` | property | <code>totalBytes: number</code> | Public total Bytes property. |
