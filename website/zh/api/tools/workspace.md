# `@codesoul-co/hypha-tools` / `workspace`

- 包索引: [`@codesoul-co/hypha-tools`](/zh/api/tools)
- 模块指南: [学习与组合说明](/zh/packages/tools)
- 源码: [`packages/tools/src/workspace.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/workspace.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `WorkspaceRuntimeConfig` | 接口 | <code>interface WorkspaceRuntimeConfig</code> | Workspace Runtime Config 的字段契约；完整字段见下表。 |
| `WorkspaceRuntimePort` | 接口 | <code>interface WorkspaceRuntimePort</code> | Workspace Runtime Port 的字段契约；完整字段见下表。 |
| `WorkspaceRuntimeRequest` | 接口 | <code>interface WorkspaceRuntimeRequest</code> | Workspace Runtime Request 的字段契约；完整字段见下表。 |
| `WorkspaceFileOperation` | 类型 | <code>type WorkspaceFileOperation = 'read' &#124; 'write' &#124; 'list' &#124; 'execute'</code> | Workspace File Operation 的公共类型别名。 |

## `WorkspaceRuntimeConfig` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `executePaths` | 属性 | <code>executePaths: string[]</code> | execute Paths 字段。 |
| `execution` | 属性 | <code>execution: { enabled: boolean; timeoutMs: number; maxOutputBytes: number; }</code> | execution 字段。 |
| `readPaths` | 属性 | <code>readPaths: string[]</code> | read Paths 字段。 |
| `workingDirectory` | 属性 | <code>workingDirectory: string</code> | working Directory 字段。 |
| `writePaths` | 属性 | <code>writePaths: string[]</code> | write Paths 字段。 |

## `WorkspaceRuntimePort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `execute` | 方法 | <code>execute(request: WorkspaceRuntimeRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |

## `WorkspaceRuntimeRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `args` | 属性 | <code>args: string[]</code> | args 字段。 |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `cwd` | 属性 | <code>cwd: string</code> | cwd 字段。 |
| `executable` | 属性 | <code>executable: boolean</code> | executable 字段。 |
| `operation` | 属性 | <code>operation: WorkspaceFileOperation</code> | operation 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `signal` | 属性 | <code>signal: AbortSignal</code> | signal 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
