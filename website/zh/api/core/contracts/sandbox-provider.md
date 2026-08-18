# `@codesoul-co/hypha-core` / `contracts/sandbox-provider`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/contracts/sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)
- 导出数: **9**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `SandboxCapabilityDerivationInput` | 接口 | <code>interface SandboxCapabilityDerivationInput</code> | Sandbox Capability Derivation Input 的字段契约；完整字段见下表。 |
| `SandboxCapabilityNegotiationRequest` | 接口 | <code>interface SandboxCapabilityNegotiationRequest</code> | Sandbox Capability Negotiation Request 的字段契约；完整字段见下表。 |
| `SandboxCapabilityNegotiationResult` | 接口 | <code>interface SandboxCapabilityNegotiationResult</code> | Sandbox Capability Negotiation Result 的字段契约；完整字段见下表。 |
| `SandboxCapabilityRequirement` | 接口 | <code>interface SandboxCapabilityRequirement</code> | Sandbox Capability Requirement 的字段契约；完整字段见下表。 |
| `SandboxProvider` | 接口 | <code>interface SandboxProvider</code> | Sandbox Provider 的字段契约；完整字段见下表。 |
| `SandboxProviderFactory` | 接口 | <code>interface SandboxProviderFactory</code> | Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id. |
| `SandboxCapabilityName` | 类型 | <code>type SandboxCapabilityName = keyof SandboxProviderCapabilities</code> | Sandbox Capability Name 的公共类型别名。 |
| `SandboxProviderSelection` | 类型 | <code>type SandboxProviderSelection = Pick&lt;ExecutionEnvironmentSpec, 'provider' &#124; 'providerRef'&gt;</code> | Sandbox Provider Selection 的公共类型别名。 |
| `SandboxProviderType` | 类型 | <code>type SandboxProviderType = ExecutionEnvironmentSpec['provider']</code> | Sandbox Provider Type 的公共类型别名。 |

## `SandboxCapabilityDerivationInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `additionalRequirements` | 属性 | <code>additionalRequirements: SandboxCapabilityRequirement[]</code> | additional Requirements 字段。 |
| `command` | 属性 | <code>command: Pick&lt;CommandExecutionRequest, "snapshotBefore" &#124; "snapshotAfter" &#124; "snapshotOnFailure"&gt;</code> | command 字段。 |
| `environment` | 属性 | <code>environment: ExecutionEnvironmentSpec</code> | environment 字段。 |

## `SandboxCapabilityNegotiationRequest` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: SandboxProviderCapabilities</code> | capabilities 字段。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | evaluated At 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `requirements` | 属性 | <code>requirements: SandboxCapabilityRequirement[]</code> | requirements 字段。 |

## `SandboxCapabilityNegotiationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilities` | 属性 | <code>capabilities: SandboxProviderCapabilities</code> | capabilities 字段。 |
| `compatible` | 属性 | <code>compatible: boolean</code> | compatible 字段。 |
| `evaluatedAt` | 属性 | <code>evaluatedAt: string</code> | evaluated At 字段。 |
| `missingCapabilities` | 属性 | <code>missingCapabilities: (keyof SandboxProviderCapabilities)[]</code> | missing Capabilities 字段。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `requirements` | 属性 | <code>requirements: SandboxCapabilityRequirement[]</code> | requirements 字段。 |

## `SandboxCapabilityRequirement` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capability` | 属性 | <code>capability: keyof SandboxProviderCapabilities</code> | capability 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `source` | 属性 | <code>source: "policy" &#124; "environment" &#124; "command" &#124; "runtime"</code> | source 字段。 |

## `SandboxProvider` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cancel` | 方法 | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | 取消 cancel。 |
| `capabilities` | 方法 | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | capabilities 的公开运行时操作。 |
| `cleanup` | 方法 | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | cleanup 的公开运行时操作。 |
| `close` | 方法 | <code>close(): Promise&lt;void&gt;</code> | close 的公开运行时操作。 |
| `create` | 方法 | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | 创建 create。 |
| `execute` | 方法 | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | execute 的公开运行时操作。 |
| `health` | 方法 | <code>health(): Promise&lt;ProviderHealth&gt;</code> | health 的公开运行时操作。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `start` | 方法 | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | 启动 start。 |
| `status` | 方法 | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | status 的公开运行时操作。 |
| `terminate` | 方法 | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | terminate 的公开运行时操作。 |

## `SandboxProviderFactory` 契约字段

Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id.

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `create` | 方法 | <code>create(): SandboxProvider &#124; Promise&lt;SandboxProvider&gt;</code> | 创建 create。 |
| `providerId` | 属性 | <code>providerId: string</code> | provider Id 字段。 |
| `providerType` | 属性 | <code>providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | provider Type 字段。 |
