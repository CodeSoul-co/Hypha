# `@codesoul-co/hypha-skills` / `index`

- 包索引: [`@codesoul-co/hypha-skills`](/zh/api/skills)
- 模块指南: [学习与组合说明](/zh/packages/skills)
- 源码: [`packages/skills/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)
- 导出数: **41**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultSkillPolicy` | 类 | <code>new DefaultSkillPolicy(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | Default Skill Policy 的运行时实现；公开构造函数与成员见下表。 |
| `LocalSkillLoader` | 类 | <code>new LocalSkillLoader(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | Local Skill Loader 的运行时实现；公开构造函数与成员见下表。 |
| `SkillContextLoader` | 类 | <code>new SkillContextLoader(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | Skill Context Loader 的运行时实现；公开构造函数与成员见下表。 |
| `SkillRegistry` | 类 | <code>new SkillRegistry(): SkillRegistry</code> | Skill Registry 的运行时实现；公开构造函数与成员见下表。 |
| `SkillResolver` | 类 | <code>new SkillResolver(registry: SkillRegistry): SkillResolver</code> | Skill Resolver 的运行时实现；公开构造函数与成员见下表。 |
| `SkillSelector` | 类 | <code>new SkillSelector(registry: SkillRegistry): SkillSelector</code> | Skill Selector 的运行时实现；公开构造函数与成员见下表。 |
| `skillActivationPolicySchema` | 常量 | <code>const skillActivationPolicySchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["always", "keyword", "regex", "intent", "manual"]&gt;; patterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }&gt;</code> | skill Activation Policy 的运行时 Schema。 |
| `skillAssetRefSchema` | 常量 | <code>const skillAssetRefSchema: z.ZodObject&lt;{ path: z.ZodString; type: z.ZodEnum&lt;["reference", "script", "asset"]&gt;; loadPolicy: z.ZodOptional&lt;z.ZodEnum&lt;["frontmatter_only", "on_activation", "never"]&gt;&gt;; }, "strip", z.ZodTypeAny, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation" &#124; undefined; }, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPo...</code> | skill Asset Ref 的运行时 Schema。 |
| `skillRefSchema` | 常量 | <code>const skillRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; }&gt;</code> | skill Ref 的运行时 Schema。 |
| `skillSpecDefinition` | 常量 | <code>const skillSpecDefinition: SpecSchemaDefinition&lt;SkillSpec&gt;</code> | skill Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `skillSpecDefinitions` | 常量 | <code>const skillSpecDefinitions: readonly [SpecSchemaDefinition&lt;SkillSpec&gt;]</code> | 由 `index` 模块导出的 skill Spec Definitions 常量。 |
| `skillSpecExample` | 常量 | <code>const skillSpecExample: SkillSpec</code> | skill Spec 的有效示例值。 |
| `skillSpecJsonSchema` | 常量 | <code>const skillSpecJsonSchema: JsonSchema</code> | skill Spec 的 JSON Schema。 |
| `skillSpecJsonSchemas` | 常量 | <code>const skillSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 skill Spec Json Schemas 常量。 |
| `skillSpecSchema` | 常量 | <code>const skillSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { description: z.ZodString; enabled: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; activationPolicy: z.ZodOptional&lt;...</code> | skill Spec 的运行时 Schema。 |
| `createEffectiveAgentCapabilitySnapshot` | 函数 | <code>createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly&lt;EffectiveAgentCapabilitySnapshot&gt;</code> | 创建 Effective Agent Capability Snapshot。 |
| `listLocalSkillFiles` | 函数 | <code>listLocalSkillFiles(directory: string, recursive?: boolean): Promise&lt;string[]&gt;</code> | 列出 Local Skill Files。 |
| `loadSkillMarkdownFile` | 函数 | <code>loadSkillMarkdownFile(filePath: string): Promise&lt;ParsedSkillMarkdown&gt;</code> | 加载 Skill Markdown File。 |
| `parseSkillMarkdown` | 函数 | <code>parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown</code> | 解析并校验 Skill Markdown。 |
| `validateSkillSpec` | 函数 | <code>validateSkillSpec(input: unknown): SkillSpec</code> | 校验 Skill Spec。 |
| `AgentCapabilityConstraint` | 接口 | <code>interface AgentCapabilityConstraint</code> | Agent Capability Constraint 的字段契约；完整字段见下表。 |
| `EffectiveAgentCapabilitySnapshotInput` | 接口 | <code>interface EffectiveAgentCapabilitySnapshotInput</code> | Effective Agent Capability Snapshot Input 的字段契约；完整字段见下表。 |
| `LoadedSkillAsset` | 接口 | <code>interface LoadedSkillAsset extends SkillAssetRef</code> | Loaded Skill Asset 的字段契约；完整字段见下表。 |
| `LoadedSkillContext` | 接口 | <code>interface LoadedSkillContext</code> | Loaded Skill Context 的字段契约；完整字段见下表。 |
| `LocalSkillLoaderOptions` | 接口 | <code>interface LocalSkillLoaderOptions</code> | Local Skill Loader Options 的字段契约；完整字段见下表。 |
| `ParsedSkillMarkdown` | 接口 | <code>interface ParsedSkillMarkdown</code> | Parsed Skill Markdown 的字段契约；完整字段见下表。 |
| `ResolvedSkill` | 接口 | <code>interface ResolvedSkill</code> | Resolved Skill 的字段契约；完整字段见下表。 |
| `SkillActivationPolicy` | 接口 | <code>interface SkillActivationPolicy</code> | Skill Activation Policy 的字段契约；完整字段见下表。 |
| `SkillAssetRef` | 接口 | <code>interface SkillAssetRef</code> | Skill Asset Ref 的字段契约；完整字段见下表。 |
| `SkillContextLoadInput` | 接口 | <code>interface SkillContextLoadInput</code> | Skill Context Load Input 的字段契约；完整字段见下表。 |
| `SkillLoader` | 接口 | <code>interface SkillLoader</code> | Skill Loader 的字段契约；完整字段见下表。 |
| `SkillPolicy` | 接口 | <code>interface SkillPolicy</code> | Skill Policy 的字段契约；完整字段见下表。 |
| `SkillPolicyDecision` | 接口 | <code>interface SkillPolicyDecision</code> | Skill Policy Decision 的字段契约；完整字段见下表。 |
| `SkillPolicyInput` | 接口 | <code>interface SkillPolicyInput</code> | Skill Policy Input 的字段契约；完整字段见下表。 |
| `SkillRef` | 接口 | <code>interface SkillRef</code> | Skill Ref 的字段契约；完整字段见下表。 |
| `SkillResolutionContext` | 接口 | <code>interface SkillResolutionContext</code> | Skill Resolution Context 的字段契约；完整字段见下表。 |
| `SkillSelection` | 接口 | <code>interface SkillSelection</code> | Skill Selection 的字段契约；完整字段见下表。 |
| `SkillSelectionRejection` | 接口 | <code>interface SkillSelectionRejection</code> | Skill Selection Rejection 的字段契约；完整字段见下表。 |
| `SkillSelectionResult` | 接口 | <code>interface SkillSelectionResult</code> | Skill Selection Result 的字段契约；完整字段见下表。 |
| `SkillSpec` | 接口 | <code>interface SkillSpec extends VersionedSpec, SpecMetadata</code> | Skill Spec 的字段契约；完整字段见下表。 |
| `SkillActivationMode` | 类型 | <code>type SkillActivationMode = 'always' &#124; 'keyword' &#124; 'regex' &#124; 'intent' &#124; 'manual'</code> | Skill Activation Mode 的公共类型别名。 |

## `DefaultSkillPolicy` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | 评估 evaluate。 |

## `LocalSkillLoader` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | 加载 load。 |
| `loadInto` | 方法 | <code>loadInto(registry: SkillRegistry): Promise&lt;SkillSpec[]&gt;</code> | 加载 Into。 |

## `SkillContextLoader` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(input: SkillContextLoadInput): Promise&lt;LoadedSkillContext&gt;</code> | 加载 load。 |

## `SkillRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): SkillRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(skillId: string): SkillSpec &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(): SkillSpec[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(skill: SkillSpec): void</code> | 注册 register。 |
| `registerMany` | 方法 | <code>registerMany(skills: SkillSpec[]): void</code> | 注册 Many。 |

## `SkillResolver` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(registry: SkillRegistry): SkillResolver</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve(context: SkillResolutionContext): ResolvedSkill[]</code> | 解析 resolve。 |

## `SkillSelector` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(registry: SkillRegistry): SkillSelector</code> | 创建该类的实例。 |
| `select` | 方法 | <code>select(context: SkillResolutionContext): SkillSelectionResult</code> | select 的公开运行时操作。 |

## `AgentCapabilityConstraint` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedExecutionProfiles` | 属性 | <code>allowedExecutionProfiles: string[]</code> | allowed Execution Profiles 字段。 |
| `allowedMCPServerIds` | 属性 | <code>allowedMCPServerIds: string[]</code> | allowed MCP Server Ids 字段。 |
| `allowedToolIds` | 属性 | <code>allowedToolIds: string[]</code> | allowed Tool Ids 字段。 |
| `maximumSideEffectLevel` | 属性 | <code>maximumSideEffectLevel: SideEffectLevel</code> | maximum Side Effect Level 字段。 |
| `memoryAccess` | 属性 | <code>memoryAccess: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | memory Access 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |

## `EffectiveAgentCapabilitySnapshotInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeSkills` | 属性 | <code>activeSkills: LoadedSkillContext[]</code> | active Skills 字段。 |
| `agent` | 属性 | <code>agent: AgentCapabilityConstraint</code> | agent 字段。 |
| `agentId` | 属性 | <code>agentId: string</code> | agent Id 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `domain` | 属性 | <code>domain: AgentCapabilityConstraint</code> | domain 字段。 |
| `domainId` | 属性 | <code>domainId: string</code> | domain Id 字段。 |
| `expiresAt` | 属性 | <code>expiresAt: string</code> | expires At 字段。 |
| `principalId` | 属性 | <code>principalId: string</code> | principal Id 字段。 |
| `runId` | 属性 | <code>runId: string</code> | run Id 字段。 |
| `tenantId` | 属性 | <code>tenantId: string</code> | tenant Id 字段。 |

## `LoadedSkillAsset` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `absolutePath` | 属性 | <code>absolutePath: string</code> | absolute Path 字段。 |
| `content` | 属性 | <code>content: string</code> | content 字段。 |
| `loadPolicy` | 属性 | <code>loadPolicy: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | load Policy 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `truncated` | 属性 | <code>truncated: boolean</code> | truncated 字段。 |
| `type` | 属性 | <code>type: "reference" &#124; "script" &#124; "asset"</code> | type 字段。 |

## `LoadedSkillContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activation` | 属性 | <code>activation: { reason: string; matchedPatterns: string[]; }</code> | activation 字段。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | allowed Tools 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `memoryAccessPolicy` | 属性 | <code>memoryAccessPolicy: string</code> | memory Access Policy 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `policyDecision` | 属性 | <code>policyDecision: SkillPolicyDecision</code> | policy Decision 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `references` | 属性 | <code>references: LoadedSkillAsset[]</code> | references 字段。 |
| `requiredMCPServers` | 属性 | <code>requiredMCPServers: string[]</code> | required MCP Servers 字段。 |
| `requiredTools` | 属性 | <code>requiredTools: string[]</code> | required Tools 字段。 |
| `sideEffectPolicy` | 属性 | <code>sideEffectPolicy: string</code> | side Effect Policy 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `LocalSkillLoaderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `directories` | 属性 | <code>directories: string[]</code> | directories 字段。 |
| `includeDisabled` | 属性 | <code>includeDisabled: boolean</code> | include Disabled 字段。 |
| `recursive` | 属性 | <code>recursive: boolean</code> | recursive 字段。 |

## `ParsedSkillMarkdown` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filePath` | 属性 | <code>filePath: string</code> | file Path 字段。 |
| `slug` | 属性 | <code>slug: string</code> | slug 字段。 |
| `spec` | 属性 | <code>spec: SkillSpec</code> | spec 字段。 |

## `ResolvedSkill` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `loadedInstructions` | 属性 | <code>loadedInstructions: string</code> | loaded Instructions 字段。 |
| `loadedReferences` | 属性 | <code>loadedReferences: SkillAssetRef[]</code> | loaded References 字段。 |
| `spec` | 属性 | <code>spec: SkillSpec</code> | spec 字段。 |

## `SkillActivationPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: SkillActivationMode</code> | mode 字段。 |
| `patterns` | 属性 | <code>patterns: string[]</code> | patterns 字段。 |

## `SkillAssetRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `loadPolicy` | 属性 | <code>loadPolicy: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | load Policy 字段。 |
| `path` | 属性 | <code>path: string</code> | path 字段。 |
| `type` | 属性 | <code>type: "reference" &#124; "script" &#124; "asset"</code> | type 字段。 |

## `SkillContextLoadInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxChars` | 属性 | <code>maxChars: number</code> | max Chars 字段。 |
| `policyDecision` | 属性 | <code>policyDecision: SkillPolicyDecision</code> | policy Decision 字段。 |
| `selection` | 属性 | <code>selection: SkillSelection</code> | selection 字段。 |

## `SkillLoader` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `load` | 方法 | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | 加载 load。 |

## `SkillPolicy` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | 评估 evaluate。 |

## `SkillPolicyDecision` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | allowed 字段。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | allowed Tools 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyId` | 属性 | <code>policyId: string</code> | policy Id 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview: boolean</code> | requires Human Review 字段。 |

## `SkillPolicyInput` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: SkillResolutionContext</code> | context 字段。 |
| `selection` | 属性 | <code>selection: SkillSelection</code> | selection 字段。 |

## `SkillRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `SkillResolutionContext` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentSkillRefs` | 属性 | <code>agentSkillRefs: SkillRef[]</code> | agent Skill Refs 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: string[]</code> | allowed Skills 字段。 |
| `availableToolRefs` | 属性 | <code>availableToolRefs: string[]</code> | available Tool Refs 字段。 |
| `inputText` | 属性 | <code>inputText: string</code> | input Text 字段。 |
| `intent` | 属性 | <code>intent: string</code> | intent 字段。 |
| `manualSkillIds` | 属性 | <code>manualSkillIds: string[]</code> | manual Skill Ids 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[]</code> | required Skills 字段。 |

## `SkillSelection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `matchedPatterns` | 属性 | <code>matchedPatterns: string[]</code> | matched Patterns 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `spec` | 属性 | <code>spec: SkillSpec</code> | spec 字段。 |

## `SkillSelectionRejection` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | reason 字段。 |
| `skillId` | 属性 | <code>skillId: string</code> | skill Id 字段。 |

## `SkillSelectionResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `rejected` | 属性 | <code>rejected: SkillSelectionRejection[]</code> | rejected 字段。 |
| `selected` | 属性 | <code>selected: SkillSelection[]</code> | selected 字段。 |

## `SkillSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activationPolicy` | 属性 | <code>activationPolicy: SkillActivationPolicy</code> | activation Policy 字段。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | allowed Tools 字段。 |
| `assets` | 属性 | <code>assets: SkillAssetRef[]</code> | assets 字段。 |
| `contextBudget` | 属性 | <code>contextBudget: number</code> | context Budget 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `enabled` | 属性 | <code>enabled: boolean</code> | enabled 字段。 |
| `evaluationCases` | 属性 | <code>evaluationCases: string[]</code> | evaluation Cases 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | input schema 字段。 |
| `instructions` | 属性 | <code>instructions: string</code> | instructions 字段。 |
| `memoryAccessPolicy` | 属性 | <code>memoryAccessPolicy: string</code> | memory Access Policy 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputContract` | 属性 | <code>outputContract: JsonSchema</code> | output Contract 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `provenance` | 属性 | <code>provenance: Record&lt;string, unknown&gt;</code> | provenance 字段。 |
| `references` | 属性 | <code>references: SkillAssetRef[]</code> | references 字段。 |
| `requiredMCPServers` | 属性 | <code>requiredMCPServers: string[]</code> | required MCP Servers 字段。 |
| `requiredTools` | 属性 | <code>requiredTools: string[]</code> | required Tools 字段。 |
| `scripts` | 属性 | <code>scripts: SkillAssetRef[]</code> | scripts 字段。 |
| `sideEffectPolicy` | 属性 | <code>sideEffectPolicy: string</code> | side Effect Policy 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
