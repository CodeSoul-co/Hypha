# `@codesoul-co/hypha-core` / `contracts/sandbox-provider`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/contracts/sandbox-provider.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/contracts/sandbox-provider.ts)
- Exports: **9**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `SandboxCapabilityDerivationInput` | interface | <code>interface SandboxCapabilityDerivationInput</code> | Field contract for Sandbox Capability Derivation Input; see all contract members below. |
| `SandboxCapabilityNegotiationRequest` | interface | <code>interface SandboxCapabilityNegotiationRequest</code> | Field contract for Sandbox Capability Negotiation Request; see all contract members below. |
| `SandboxCapabilityNegotiationResult` | interface | <code>interface SandboxCapabilityNegotiationResult</code> | Field contract for Sandbox Capability Negotiation Result; see all contract members below. |
| `SandboxCapabilityRequirement` | interface | <code>interface SandboxCapabilityRequirement</code> | Field contract for Sandbox Capability Requirement; see all contract members below. |
| `SandboxProvider` | interface | <code>interface SandboxProvider</code> | Field contract for Sandbox Provider; see all contract members below. |
| `SandboxProviderFactory` | interface | <code>interface SandboxProviderFactory</code> | Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id. |
| `SandboxCapabilityName` | type | <code>type SandboxCapabilityName = keyof SandboxProviderCapabilities</code> | Public type alias for Sandbox Capability Name. |
| `SandboxProviderSelection` | type | <code>type SandboxProviderSelection = Pick&lt;ExecutionEnvironmentSpec, 'provider' &#124; 'providerRef'&gt;</code> | Public type alias for Sandbox Provider Selection. |
| `SandboxProviderType` | type | <code>type SandboxProviderType = ExecutionEnvironmentSpec['provider']</code> | Public type alias for Sandbox Provider Type. |

## `SandboxCapabilityDerivationInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `additionalRequirements` | property | <code>additionalRequirements: SandboxCapabilityRequirement[]</code> | Public additional Requirements property. |
| `command` | property | <code>command: Pick&lt;CommandExecutionRequest, "snapshotBefore" &#124; "snapshotAfter" &#124; "snapshotOnFailure"&gt;</code> | Public command property. |
| `environment` | property | <code>environment: ExecutionEnvironmentSpec</code> | Public environment property. |

## `SandboxCapabilityNegotiationRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: SandboxProviderCapabilities</code> | Public capabilities property. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public evaluated At property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `requirements` | property | <code>requirements: SandboxCapabilityRequirement[]</code> | Public requirements property. |

## `SandboxCapabilityNegotiationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | property | <code>capabilities: SandboxProviderCapabilities</code> | Public capabilities property. |
| `compatible` | property | <code>compatible: boolean</code> | Public compatible property. |
| `evaluatedAt` | property | <code>evaluatedAt: string</code> | Public evaluated At property. |
| `missingCapabilities` | property | <code>missingCapabilities: (keyof SandboxProviderCapabilities)[]</code> | Public missing Capabilities property. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `requirements` | property | <code>requirements: SandboxCapabilityRequirement[]</code> | Public requirements property. |

## `SandboxCapabilityRequirement` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capability` | property | <code>capability: keyof SandboxProviderCapabilities</code> | Public capability property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `source` | property | <code>source: "policy" &#124; "environment" &#124; "command" &#124; "runtime"</code> | Public source property. |

## `SandboxProvider` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cancel` | method | <code>cancel(request: ExecutionCancelRequest): Promise&lt;void&gt;</code> | Cancels cancel at this module boundary. |
| `capabilities` | method | <code>capabilities(): Promise&lt;SandboxProviderCapabilities&gt;</code> | Public runtime operation for capabilities. |
| `cleanup` | method | <code>cleanup(request: SandboxCleanupRequest): Promise&lt;void&gt;</code> | Public runtime operation for cleanup. |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public runtime operation for close. |
| `create` | method | <code>create(request: SandboxCreateRequest): Promise&lt;SandboxRecord&gt;</code> | Creates create at this module boundary. |
| `execute` | method | <code>execute(request: CommandExecutionRequest): Promise&lt;CommandExecutionResult&gt;</code> | Public runtime operation for execute. |
| `health` | method | <code>health(): Promise&lt;ProviderHealth&gt;</code> | Public runtime operation for health. |
| `id` | property | <code>id: string</code> | Public id property. |
| `start` | method | <code>start(request: SandboxStartRequest): Promise&lt;SandboxRecord&gt;</code> | Starts start at this module boundary. |
| `status` | method | <code>status(request: SandboxStatusRequest): Promise&lt;SandboxRecord &#124; null&gt;</code> | Public runtime operation for status. |
| `terminate` | method | <code>terminate(request: SandboxTerminateRequest): Promise&lt;void&gt;</code> | Public runtime operation for terminate. |

## `SandboxProviderFactory` contract members

Composition-root contract for constructing a configured SandboxProvider. Concrete adapters own their options; core only knows the provider type and stable id.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(): SandboxProvider &#124; Promise&lt;SandboxProvider&gt;</code> | Creates create at this module boundary. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
| `providerType` | property | <code>providerType: "mock" &#124; "local_process" &#124; "docker" &#124; "remote_sandbox" &#124; "custom"</code> | Public provider Type property. |
