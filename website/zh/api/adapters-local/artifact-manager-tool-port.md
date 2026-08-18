# `@codesoul-co/hypha-adapters-local` / `artifact-manager-tool-port`

- 包索引: [`@codesoul-co/hypha-adapters-local`](/zh/api/adapters-local)
- 模块指南: [学习与组合说明](/zh/packages/adapters-local)
- 源码: [`packages/adapters-local/src/artifact-manager-tool-port.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/artifact-manager-tool-port.ts)
- 导出数: **3**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `ArtifactManagerToolPort` | 类 | <code>new ArtifactManagerToolPort(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | Routes governed Tool result bytes through the Core ArtifactManager. |
| `ArtifactManagerToolPortOptions` | 接口 | <code>interface ArtifactManagerToolPortOptions</code> | Artifact Manager Tool Port Options 的字段契约；完整字段见下表。 |
| `ToolArtifactManagerContext` | 接口 | <code>interface ToolArtifactManagerContext</code> | Tool Artifact Manager Context 的字段契约；完整字段见下表。 |

## `ArtifactManagerToolPort` 公开成员

Routes governed Tool result bytes through the Core ArtifactManager.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: ArtifactManagerToolPortOptions): ArtifactManagerToolPort</code> | 创建该类的实例。 |
| `store` | 方法 | <code>store(request: { invocationId: string; toolId: string; value: unknown; mimeType?: string; metadata?: Record&lt;string, unknown&gt;; }): Promise&lt;string&gt;</code> | store 的公开运行时操作。 |

## `ArtifactManagerToolPortOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `manager` | 属性 | <code>manager: Pick&lt;ArtifactManager, "create"&gt;</code> | manager 字段。 |
| `resolveContext` | 方法 | <code>resolveContext(request: { invocationId: string; toolId: string; }): ToolArtifactManagerContext &#124; Promise&lt;ToolArtifactManagerContext&gt;</code> | 解析 Context。 |

## `ToolArtifactManagerContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `principal` | 属性 | <code>principal: ExecutionPrincipal</code> | principal 字段。 |
| `profileRef` | 属性 | <code>profileRef: SpecRef</code> | profile Ref 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `sessionId` | 属性 | <code>sessionId: string</code> | session Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |
| `userId` | 属性 | <code>userId: string</code> | user Id 字段。 |
| `workspaceId` | 属性 | <code>workspaceId: string</code> | workspace Id 字段。 |
