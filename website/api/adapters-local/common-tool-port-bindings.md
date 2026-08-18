# `@codesoul-co/hypha-adapters-local` / `common-tool-port-bindings`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/common-tool-port-bindings.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/common-tool-port-bindings.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactManagerCommonToolPort` | class | <code>new ArtifactManagerCommonToolPort(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed. |
| `GovernedCommandCommonToolPort` | class | <code>new GovernedCommandCommonToolPort(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | Binds common.command to the authorization-verifying ExecutionPort boundary. |
| `WorkspaceCommonToolPort` | class | <code>new WorkspaceCommonToolPort(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding. |
| `ArtifactManagerCommonToolPortOptions` | interface | <code>interface ArtifactManagerCommonToolPortOptions</code> | Field contract for Artifact Manager Common Tool Port Options; see all contract members below. |
| `CommonToolProviderPort` | interface | <code>interface CommonToolProviderPort</code> | Field contract for Common Tool Provider Port; see all contract members below. |
| `CommonToolProviderRequest` | interface | <code>interface CommonToolProviderRequest</code> | Structural mirror of the tools-owned CommonToolPort boundary. |
| `GovernedCommandDispatchFactory` | type | <code>type GovernedCommandDispatchFactory = (request: CommonToolProviderRequest) =&gt; Promise&lt;ExecutionDispatchRequest&gt; &#124; ExecutionDispatchRequest</code> | Public type alias for Governed Command Dispatch Factory. |

## `ArtifactManagerCommonToolPort` public members

Principal/workspace-scoped ArtifactManager binding; raw storage or host paths are never exposed.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(artifacts: ArtifactManager, options: ArtifactManagerCommonToolPortOptions): ArtifactManagerCommonToolPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |

## `GovernedCommandCommonToolPort` public members

Binds common.command to the authorization-verifying ExecutionPort boundary.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(execution: ExecutionPort, createDispatch: GovernedCommandDispatchFactory): GovernedCommandCommonToolPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |

## `WorkspaceCommonToolPort` public members

Exposes only file operations; WorkspaceRuntime.execute is never reachable through this binding.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(workspace: WorkspaceRuntimePort): WorkspaceCommonToolPort</code> | Creates an instance of this class. |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |

## `ArtifactManagerCommonToolPortOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxReadBytes` | property | <code>maxReadBytes: number</code> | Public max Read Bytes property. |
| `profileRef` | property | <code>profileRef: SpecRef</code> | Public profile Ref property. |

## `CommonToolProviderPort` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `execute` | method | <code>execute(request: CommonToolProviderRequest): Promise&lt;unknown&gt;</code> | Public runtime operation for execute. |

## `CommonToolProviderRequest` contract members

Structural mirror of the tools-owned CommonToolPort boundary.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: ToolCallContext</code> | Public context property. |
| `input` | property | <code>input: Record&lt;string, unknown&gt;</code> | Public input property. |
| `operation` | property | <code>operation: string</code> | Public operation property. |
