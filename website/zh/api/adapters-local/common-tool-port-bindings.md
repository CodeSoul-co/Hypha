# `@codesoul-co/hypha-adapters-local` / `common-tool-port-bindings`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/common-tool-port-bindings.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)
- 导出数: **7**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerCommonToolPort` | 类 | <code>new ArtifactManagerCommonToolPort(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed. |
| `GovernedCommandCommonToolPort` | 类 | <code>new GovernedCommandCommonToolPort(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | Binds common.command to the authorization-verifying ExecutionPort boundary. |
| `WorkspaceCommonToolPort` | 类 | <code>new WorkspaceCommonToolPort(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding. |
| `ArtifactManagerCommonToolPortOptions` | 接口 | <code>interface ArtifactManagerCommonToolPortOptions</code> | Artifact Manager Common Tool Port Options 的字段契约；完整字段见下表。 |
| `CommonToolProviderPort` | 接口 | <code>interface CommonToolProviderPort</code> | Common Tool Provider Port 的字段契约；完整字段见下表。 |
| `CommonToolProviderRequest` | 接口 | <code>interface CommonToolProviderRequest</code> | Structural mirror of the tools-owned CommonToolPort boundary. |
| `GovernedCommandDispatchFactory` | 类型 | <code>type GovernedCommandDispatchFactory = (request: CommonToolProviderRequest) =&gt; Promise&lt;ExecutionDispatchRequest&gt; &#124; ExecutionDispatchRequest</code> | Governed Command Dispatch Factory 的公共类型别名。 |

## `ArtifactManagerCommonToolPort` 公开成员

Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |

## `GovernedCommandCommonToolPort` 公开成员

Binds common.command to the authorization-verifying ExecutionPort boundary.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |

## `WorkspaceCommonToolPort` 公开成员

Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | 创建该类的实例。 |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |

## `ArtifactManagerCommonToolPortOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxReadBytes` | 属性 | <code>maxReadBytes: number</code> | max Read Bytes 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |

## `CommonToolProviderPort` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `execute` | 方法 | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | execute 的公开运行时操作。 |

## `CommonToolProviderRequest` 契约字段

Structural mirror of the tools-owned CommonToolPort boundary.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: ToolCallContext</code> | context 字段。 |
| `input` | 属性 | <code>input: Record&lt;string, unknown&gt;</code> | input 字段。 |
| `operation` | 属性 | <code>operation: string</code> | operation 字段。 |
