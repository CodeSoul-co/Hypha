# `@codesoul-co/hypha-core` / `modules/sandbox-provider/index`

- 包索引: [`@codesoul-co/hypha-core`](/zh/api/core)
- 模块指南: [学习与组合说明](/zh/packages/core)
- 源码: [`packages/core/src/modules/sandbox-provider/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/sandbox-provider/index.ts)
- 导出数: **17**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `sandboxCapabilityDerivationInputJsonSchema` | 常量 | <code>const sandboxCapabilityDerivationInputJsonSchema: JsonSchema</code> | sandbox Capability Derivation Input 的 JSON Schema。 |
| `sandboxCapabilityDerivationInputSchema` | 常量 | <code>const sandboxCapabilityDerivationInputSchema: z.ZodObject&lt;{ environment: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { revision: z.ZodOptional&lt;...</code> | sandbox Capability Derivation Input 的运行时 Schema。 |
| `sandboxCapabilityNames` | 常量 | <code>const sandboxCapabilityNames: readonly ["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]</code> | 由 `modules/sandbox-provider/index` 模块导出的 sandbox Capability Names 常量。 |
| `sandboxCapabilityNameSchema` | 常量 | <code>const sandboxCapabilityNameSchema: z.ZodEnum&lt;["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]&gt;</code> | sandbox Capability Name 的运行时 Schema。 |
| `sandboxCapabilityNegotiationRequestExample` | 常量 | <code>const sandboxCapabilityNegotiationRequestExample: SandboxCapabilityNegotiationRequest</code> | sandbox Capability Negotiation Request 的有效示例值。 |
| `sandboxCapabilityNegotiationRequestJsonSchema` | 常量 | <code>const sandboxCapabilityNegotiationRequestJsonSchema: JsonSchema</code> | sandbox Capability Negotiation Request 的 JSON Schema。 |
| `sandboxCapabilityNegotiationRequestSchema` | 常量 | <code>const sandboxCapabilityNegotiationRequestSchema: z.ZodObject&lt;{ providerId: z.ZodString; capabilities: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; snapshots: z.ZodBoolean; imageDigestPin...</code> | sandbox Capability Negotiation Request 的运行时 Schema。 |
| `sandboxCapabilityNegotiationResultExample` | 常量 | <code>const sandboxCapabilityNegotiationResultExample: SandboxCapabilityNegotiationResult</code> | sandbox Capability Negotiation Result 的有效示例值。 |
| `sandboxCapabilityNegotiationResultJsonSchema` | 常量 | <code>const sandboxCapabilityNegotiationResultJsonSchema: JsonSchema</code> | sandbox Capability Negotiation Result 的 JSON Schema。 |
| `sandboxCapabilityNegotiationResultSchema` | 常量 | <code>const sandboxCapabilityNegotiationResultSchema: z.ZodEffects&lt;z.ZodObject&lt;{ providerId: z.ZodString; compatible: z.ZodBoolean; capabilities: z.ZodObject&lt;{ processIsolation: z.ZodBoolean; filesystemIsolation: z.ZodBoolean; networkIsolation: z.ZodBoolean; cpuLimits: z.ZodBoolean; memoryLimits: z.ZodBoolean; diskLimits: z.ZodBoolean; pidsLimit: z.ZodBoolean; cancellation: z.ZodBoolean; processTreeKill: z.ZodBoolean; s...</code> | sandbox Capability Negotiation Result 的运行时 Schema。 |
| `sandboxCapabilityRequirementJsonSchema` | 常量 | <code>const sandboxCapabilityRequirementJsonSchema: JsonSchema</code> | sandbox Capability Requirement 的 JSON Schema。 |
| `sandboxCapabilityRequirementSchema` | 常量 | <code>const sandboxCapabilityRequirementSchema: z.ZodObject&lt;{ capability: z.ZodEnum&lt;["processIsolation", "filesystemIsolation", "networkIsolation", "cpuLimits", "memoryLimits", "diskLimits", "pidsLimit", "cancellation", "processTreeKill", "snapshots", "imageDigestPinning", "remoteExecution"]&gt;; source: z.ZodEnum&lt;["environment", "command", "policy", "runtime"]&gt;; reason: z.ZodString; }, "strict", z.ZodTypeAny, { reason: st...</code> | sandbox Capability Requirement 的运行时 Schema。 |
| `sandboxProviderContractJsonSchemas` | 常量 | <code>const sandboxProviderContractJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `modules/sandbox-provider/index` 模块导出的 sandbox Provider Contract Json Schemas 常量。 |
| `deriveSandboxCapabilityRequirements` | 函数 | <code>deriveSandboxCapabilityRequirements(input: SandboxCapabilityDerivationInput): SandboxCapabilityRequirement[]</code> | derive Sandbox Capability Requirements 的公开运行时操作。 |
| `negotiateSandboxCapabilities` | 函数 | <code>negotiateSandboxCapabilities(request: SandboxCapabilityNegotiationRequest): SandboxCapabilityNegotiationResult</code> | negotiate Sandbox Capabilities 的公开运行时操作。 |
| `validateSandboxCapabilityNegotiationRequest` | 函数 | <code>validateSandboxCapabilityNegotiationRequest(input: unknown): SandboxCapabilityNegotiationRequest</code> | 校验 Sandbox Capability Negotiation Request。 |
| `validateSandboxCapabilityNegotiationResult` | 函数 | <code>validateSandboxCapabilityNegotiationResult(input: unknown): SandboxCapabilityNegotiationResult</code> | 校验 Sandbox Capability Negotiation Result。 |
