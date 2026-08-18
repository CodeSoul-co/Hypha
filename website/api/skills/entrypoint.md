# `@codesoul-co/hypha-skills` / `index`

- Package index: [`@codesoul-co/hypha-skills`](/api/skills)
- Package guide: [learning and composition guide](/packages/skills)
- Source: [`packages/skills/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)
- Exports: **41**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultSkillPolicy` | class | <code>new DefaultSkillPolicy(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | Runtime implementation for Default Skill Policy; see its public constructor and members below. |
| `LocalSkillLoader` | class | <code>new LocalSkillLoader(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | Runtime implementation for Local Skill Loader; see its public constructor and members below. |
| `SkillContextLoader` | class | <code>new SkillContextLoader(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | Runtime implementation for Skill Context Loader; see its public constructor and members below. |
| `SkillRegistry` | class | <code>new SkillRegistry(): SkillRegistry</code> | Runtime implementation for Skill Registry; see its public constructor and members below. |
| `SkillResolver` | class | <code>new SkillResolver(registry: SkillRegistry): SkillResolver</code> | Runtime implementation for Skill Resolver; see its public constructor and members below. |
| `SkillSelector` | class | <code>new SkillSelector(registry: SkillRegistry): SkillSelector</code> | Runtime implementation for Skill Selector; see its public constructor and members below. |
| `skillActivationPolicySchema` | constant | <code>const skillActivationPolicySchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["always", "keyword", "regex", "intent", "manual"]&gt;; patterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }&gt;</code> | Runtime schema for skill Activation Policy. |
| `skillAssetRefSchema` | constant | <code>const skillAssetRefSchema: z.ZodObject&lt;{ path: z.ZodString; type: z.ZodEnum&lt;["reference", "script", "asset"]&gt;; loadPolicy: z.ZodOptional&lt;z.ZodEnum&lt;["frontmatter_only", "on_activation", "never"]&gt;&gt;; }, "strip", z.ZodTypeAny, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation" &#124; undefined; }, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPo...</code> | Runtime schema for skill Asset Ref. |
| `skillRefSchema` | constant | <code>const skillRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; }&gt;</code> | Runtime schema for skill Ref. |
| `skillSpecDefinition` | constant | <code>const skillSpecDefinition: SpecSchemaDefinition&lt;SkillSpec&gt;</code> | Runtime validation entrypoint for the skill spec, combining its parser, example and JSON Schema. |
| `skillSpecDefinitions` | constant | <code>const skillSpecDefinitions: readonly [SpecSchemaDefinition&lt;SkillSpec&gt;]</code> | skill Spec Definitions constant exported by the `index` module. |
| `skillSpecExample` | constant | <code>const skillSpecExample: SkillSpec</code> | Valid example value for skill Spec. |
| `skillSpecJsonSchema` | constant | <code>const skillSpecJsonSchema: JsonSchema</code> | JSON Schema for skill Spec. |
| `skillSpecJsonSchemas` | constant | <code>const skillSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | skill Spec Json Schemas constant exported by the `index` module. |
| `skillSpecSchema` | constant | <code>const skillSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { description: z.ZodString; enabled: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; activationPolicy: z.ZodOptional&lt;...</code> | Runtime schema for skill Spec. |
| `createEffectiveAgentCapabilitySnapshot` | function | <code>createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly&lt;EffectiveAgentCapabilitySnapshot&gt;</code> | Creates Effective Agent Capability Snapshot at this module boundary. |
| `listLocalSkillFiles` | function | <code>listLocalSkillFiles(directory: string, recursive?: boolean): Promise&lt;string[]&gt;</code> | Lists Local Skill Files at this module boundary. |
| `loadSkillMarkdownFile` | function | <code>loadSkillMarkdownFile(filePath: string): Promise&lt;ParsedSkillMarkdown&gt;</code> | Loads Skill Markdown File at this module boundary. |
| `parseSkillMarkdown` | function | <code>parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown</code> | Parses and validates Skill Markdown at this module boundary. |
| `validateSkillSpec` | function | <code>validateSkillSpec(input: unknown): SkillSpec</code> | Validates Skill Spec at this module boundary. |
| `AgentCapabilityConstraint` | interface | <code>interface AgentCapabilityConstraint</code> | Field contract for Agent Capability Constraint; see all contract members below. |
| `EffectiveAgentCapabilitySnapshotInput` | interface | <code>interface EffectiveAgentCapabilitySnapshotInput</code> | Field contract for Effective Agent Capability Snapshot Input; see all contract members below. |
| `LoadedSkillAsset` | interface | <code>interface LoadedSkillAsset extends SkillAssetRef</code> | Field contract for Loaded Skill Asset; see all contract members below. |
| `LoadedSkillContext` | interface | <code>interface LoadedSkillContext</code> | Field contract for Loaded Skill Context; see all contract members below. |
| `LocalSkillLoaderOptions` | interface | <code>interface LocalSkillLoaderOptions</code> | Field contract for Local Skill Loader Options; see all contract members below. |
| `ParsedSkillMarkdown` | interface | <code>interface ParsedSkillMarkdown</code> | Field contract for Parsed Skill Markdown; see all contract members below. |
| `ResolvedSkill` | interface | <code>interface ResolvedSkill</code> | Field contract for Resolved Skill; see all contract members below. |
| `SkillActivationPolicy` | interface | <code>interface SkillActivationPolicy</code> | Field contract for Skill Activation Policy; see all contract members below. |
| `SkillAssetRef` | interface | <code>interface SkillAssetRef</code> | Field contract for Skill Asset Ref; see all contract members below. |
| `SkillContextLoadInput` | interface | <code>interface SkillContextLoadInput</code> | Field contract for Skill Context Load Input; see all contract members below. |
| `SkillLoader` | interface | <code>interface SkillLoader</code> | Field contract for Skill Loader; see all contract members below. |
| `SkillPolicy` | interface | <code>interface SkillPolicy</code> | Field contract for Skill Policy; see all contract members below. |
| `SkillPolicyDecision` | interface | <code>interface SkillPolicyDecision</code> | Field contract for Skill Policy Decision; see all contract members below. |
| `SkillPolicyInput` | interface | <code>interface SkillPolicyInput</code> | Field contract for Skill Policy Input; see all contract members below. |
| `SkillRef` | interface | <code>interface SkillRef</code> | Field contract for Skill Ref; see all contract members below. |
| `SkillResolutionContext` | interface | <code>interface SkillResolutionContext</code> | Field contract for Skill Resolution Context; see all contract members below. |
| `SkillSelection` | interface | <code>interface SkillSelection</code> | Field contract for Skill Selection; see all contract members below. |
| `SkillSelectionRejection` | interface | <code>interface SkillSelectionRejection</code> | Field contract for Skill Selection Rejection; see all contract members below. |
| `SkillSelectionResult` | interface | <code>interface SkillSelectionResult</code> | Field contract for Skill Selection Result; see all contract members below. |
| `SkillSpec` | interface | <code>interface SkillSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Skill Spec; see all contract members below. |
| `SkillActivationMode` | type | <code>type SkillActivationMode = 'always' &#124; 'keyword' &#124; 'regex' &#124; 'intent' &#124; 'manual'</code> | Public type alias for Skill Activation Mode. |

## `DefaultSkillPolicy` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | Evaluates evaluate at this module boundary. |

## `LocalSkillLoader` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | Creates an instance of this class. |
| `load` | method | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | Loads load at this module boundary. |
| `loadInto` | method | <code>loadInto(registry: SkillRegistry): Promise&lt;SkillSpec[]&gt;</code> | Loads Into at this module boundary. |

## `SkillContextLoader` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | Creates an instance of this class. |
| `load` | method | <code>load(input: SkillContextLoadInput): Promise&lt;LoadedSkillContext&gt;</code> | Loads load at this module boundary. |

## `SkillRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): SkillRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(skillId: string): SkillSpec &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): SkillSpec[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(skill: SkillSpec): void</code> | Registers register at this module boundary. |
| `registerMany` | method | <code>registerMany(skills: SkillSpec[]): void</code> | Registers Many at this module boundary. |

## `SkillResolver` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(registry: SkillRegistry): SkillResolver</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve(context: SkillResolutionContext): ResolvedSkill[]</code> | Resolves resolve at this module boundary. |

## `SkillSelector` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(registry: SkillRegistry): SkillSelector</code> | Creates an instance of this class. |
| `select` | method | <code>select(context: SkillResolutionContext): SkillSelectionResult</code> | Public runtime operation for select. |

## `AgentCapabilityConstraint` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedExecutionProfiles` | property | <code>allowedExecutionProfiles: string[]</code> | Public allowed Execution Profiles property. |
| `allowedMCPServerIds` | property | <code>allowedMCPServerIds: string[]</code> | Public allowed MCP Server Ids property. |
| `allowedToolIds` | property | <code>allowedToolIds: string[]</code> | Public allowed Tool Ids property. |
| `maximumSideEffectLevel` | property | <code>maximumSideEffectLevel: SideEffectLevel</code> | Public maximum Side Effect Level property. |
| `memoryAccess` | property | <code>memoryAccess: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | Public memory Access property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |

## `EffectiveAgentCapabilitySnapshotInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeSkills` | property | <code>activeSkills: LoadedSkillContext[]</code> | Public active Skills property. |
| `agent` | property | <code>agent: AgentCapabilityConstraint</code> | Public agent property. |
| `agentId` | property | <code>agentId: string</code> | Public agent Id property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `domain` | property | <code>domain: AgentCapabilityConstraint</code> | Public domain property. |
| `domainId` | property | <code>domainId: string</code> | Public domain Id property. |
| `expiresAt` | property | <code>expiresAt: string</code> | Public expires At property. |
| `principalId` | property | <code>principalId: string</code> | Public principal Id property. |
| `runId` | property | <code>runId: string</code> | Public run Id property. |
| `tenantId` | property | <code>tenantId: string</code> | Public tenant Id property. |

## `LoadedSkillAsset` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `absolutePath` | property | <code>absolutePath: string</code> | Public absolute Path property. |
| `content` | property | <code>content: string</code> | Public content property. |
| `loadPolicy` | property | <code>loadPolicy: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | Public load Policy property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `truncated` | property | <code>truncated: boolean</code> | Public truncated property. |
| `type` | property | <code>type: "reference" &#124; "script" &#124; "asset"</code> | Public type property. |

## `LoadedSkillContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activation` | property | <code>activation: { reason: string; matchedPatterns: string[]; }</code> | Public activation property. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public allowed Tools property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `memoryAccessPolicy` | property | <code>memoryAccessPolicy: string</code> | Public memory Access Policy property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `policyDecision` | property | <code>policyDecision: SkillPolicyDecision</code> | Public policy Decision property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `references` | property | <code>references: LoadedSkillAsset[]</code> | Public references property. |
| `requiredMCPServers` | property | <code>requiredMCPServers: string[]</code> | Public required MCP Servers property. |
| `requiredTools` | property | <code>requiredTools: string[]</code> | Public required Tools property. |
| `sideEffectPolicy` | property | <code>sideEffectPolicy: string</code> | Public side Effect Policy property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `LocalSkillLoaderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `directories` | property | <code>directories: string[]</code> | Public directories property. |
| `includeDisabled` | property | <code>includeDisabled: boolean</code> | Public include Disabled property. |
| `recursive` | property | <code>recursive: boolean</code> | Public recursive property. |

## `ParsedSkillMarkdown` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filePath` | property | <code>filePath: string</code> | Public file Path property. |
| `slug` | property | <code>slug: string</code> | Public slug property. |
| `spec` | property | <code>spec: SkillSpec</code> | Public spec property. |

## `ResolvedSkill` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `loadedInstructions` | property | <code>loadedInstructions: string</code> | Public loaded Instructions property. |
| `loadedReferences` | property | <code>loadedReferences: SkillAssetRef[]</code> | Public loaded References property. |
| `spec` | property | <code>spec: SkillSpec</code> | Public spec property. |

## `SkillActivationPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: SkillActivationMode</code> | Public mode property. |
| `patterns` | property | <code>patterns: string[]</code> | Public patterns property. |

## `SkillAssetRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `loadPolicy` | property | <code>loadPolicy: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | Public load Policy property. |
| `path` | property | <code>path: string</code> | Public path property. |
| `type` | property | <code>type: "reference" &#124; "script" &#124; "asset"</code> | Public type property. |

## `SkillContextLoadInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxChars` | property | <code>maxChars: number</code> | Public max Chars property. |
| `policyDecision` | property | <code>policyDecision: SkillPolicyDecision</code> | Public policy Decision property. |
| `selection` | property | <code>selection: SkillSelection</code> | Public selection property. |

## `SkillLoader` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `load` | method | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | Loads load at this module boundary. |

## `SkillPolicy` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | Evaluates evaluate at this module boundary. |

## `SkillPolicyDecision` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public allowed property. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public allowed Tools property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyId` | property | <code>policyId: string</code> | Public policy Id property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `requiresHumanReview` | property | <code>requiresHumanReview: boolean</code> | Public requires Human Review property. |

## `SkillPolicyInput` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: SkillResolutionContext</code> | Public context property. |
| `selection` | property | <code>selection: SkillSelection</code> | Public selection property. |

## `SkillRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `SkillResolutionContext` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentSkillRefs` | property | <code>agentSkillRefs: SkillRef[]</code> | Public agent Skill Refs property. |
| `allowedSkills` | property | <code>allowedSkills: string[]</code> | Public allowed Skills property. |
| `availableToolRefs` | property | <code>availableToolRefs: string[]</code> | Public available Tool Refs property. |
| `inputText` | property | <code>inputText: string</code> | Public input Text property. |
| `intent` | property | <code>intent: string</code> | Public intent property. |
| `manualSkillIds` | property | <code>manualSkillIds: string[]</code> | Public manual Skill Ids property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `requiredSkills` | property | <code>requiredSkills: string[]</code> | Public required Skills property. |

## `SkillSelection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `matchedPatterns` | property | <code>matchedPatterns: string[]</code> | Public matched Patterns property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `spec` | property | <code>spec: SkillSpec</code> | Public spec property. |

## `SkillSelectionRejection` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public reason property. |
| `skillId` | property | <code>skillId: string</code> | Public skill Id property. |

## `SkillSelectionResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `rejected` | property | <code>rejected: SkillSelectionRejection[]</code> | Public rejected property. |
| `selected` | property | <code>selected: SkillSelection[]</code> | Public selected property. |

## `SkillSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activationPolicy` | property | <code>activationPolicy: SkillActivationPolicy</code> | Public activation Policy property. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public allowed Tools property. |
| `assets` | property | <code>assets: SkillAssetRef[]</code> | Public assets property. |
| `contextBudget` | property | <code>contextBudget: number</code> | Public context Budget property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `enabled` | property | <code>enabled: boolean</code> | Public enabled property. |
| `evaluationCases` | property | <code>evaluationCases: string[]</code> | Public evaluation Cases property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public input schema property. |
| `instructions` | property | <code>instructions: string</code> | Public instructions property. |
| `memoryAccessPolicy` | property | <code>memoryAccessPolicy: string</code> | Public memory Access Policy property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputContract` | property | <code>outputContract: JsonSchema</code> | Public output Contract property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `provenance` | property | <code>provenance: Record&lt;string, unknown&gt;</code> | Public provenance property. |
| `references` | property | <code>references: SkillAssetRef[]</code> | Public references property. |
| `requiredMCPServers` | property | <code>requiredMCPServers: string[]</code> | Public required MCP Servers property. |
| `requiredTools` | property | <code>requiredTools: string[]</code> | Public required Tools property. |
| `scripts` | property | <code>scripts: SkillAssetRef[]</code> | Public scripts property. |
| `sideEffectPolicy` | property | <code>sideEffectPolicy: string</code> | Public side Effect Policy property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |
