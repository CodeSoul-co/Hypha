# `@codesoul-co/hypha-domain` / `index`

- 包索引: [`@codesoul-co/hypha-domain`](/zh/api/domain)
- 模块指南: [学习与组合说明](/zh/packages/domain)
- 源码: [`packages/domain/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)
- 导出数: **80**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DomainCompiler` | 类 | <code>new DomainCompiler(): DomainCompiler</code> | Domain Compiler 的运行时实现；公开构造函数与成员见下表。 |
| `DomainPackRegistry` | 类 | <code>new DomainPackRegistry(): DomainPackRegistry</code> | Domain Pack Registry 的运行时实现；公开构造函数与成员见下表。 |
| `LocalDomainPackLoader` | 类 | <code>new LocalDomainPackLoader(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | Local Domain Pack Loader 的运行时实现；公开构造函数与成员见下表。 |
| `WorkflowCompiler` | 类 | <code>new WorkflowCompiler(): WorkflowCompiler</code> | Workflow Compiler 的运行时实现；公开构造函数与成员见下表。 |
| `businessRuleEffectSchema` | 常量 | <code>const businessRuleEffectSchema: z.ZodEnum&lt;["constraint", "precondition", "postcondition", "guidance"]&gt;</code> | business Rule Effect 的运行时 Schema。 |
| `businessRuleScopeSchema` | 常量 | <code>const businessRuleScopeSchema: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "output"]&gt;</code> | business Rule Scope 的运行时 Schema。 |
| `businessRuleSpecDefinition` | 常量 | <code>const businessRuleSpecDefinition: SpecSchemaDefinition&lt;BusinessRuleSpec&gt;</code> | business Rule Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `businessRuleSpecExample` | 常量 | <code>const businessRuleSpecExample: BusinessRuleSpec</code> | business Rule Spec 的有效示例值。 |
| `businessRuleSpecJsonSchema` | 常量 | <code>const businessRuleSpecJsonSchema: JsonSchema</code> | business Rule Spec 的 JSON Schema。 |
| `businessRuleSpecSchema` | 常量 | <code>const businessRuleSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "outp...</code> | business Rule Spec 的运行时 Schema。 |
| `DOMAIN_COMPILER_VERSION` | 常量 | <code>const DOMAIN_COMPILER_VERSION: "1.0.0"</code> | 由 `index` 模块导出的 DOMAIN COMPILER VERSION 常量。 |
| `domainAgenticReasoningModeSchema` | 常量 | <code>const domainAgenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | domain Agentic Reasoning Mode 的运行时 Schema。 |
| `domainPackSpecDefinition` | 常量 | <code>const domainPackSpecDefinition: SpecSchemaDefinition&lt;DomainPackSpec&gt;</code> | domain Pack Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `domainPackSpecExample` | 常量 | <code>const domainPackSpecExample: DomainPackSpec</code> | domain Pack Spec 的有效示例值。 |
| `domainPackSpecJsonSchema` | 常量 | <code>const domainPackSpecJsonSchema: JsonSchema</code> | domain Pack Spec 的 JSON Schema。 |
| `domainPackSpecSchema` | 常量 | <code>const domainPackSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; taskSchemas: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;...</code> | domain Pack Spec 的运行时 Schema。 |
| `domainPromptRefSchema` | 常量 | <code>const domainPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; required?: boolean &#124; undefined; priority?: number &#124; undefined; }, { id: string; version?: string &#124;...</code> | domain Prompt Ref 的运行时 Schema。 |
| `domainReasoningPersistenceSchema` | 常量 | <code>const domainReasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | domain Reasoning Persistence 的运行时 Schema。 |
| `domainSpecDefinitions` | 常量 | <code>const domainSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowSpec&gt;, SpecSchemaDefinition&lt;ReasoningSpec&gt;, SpecSchemaDefinition&lt;BusinessRuleSpec&gt;, SpecSchemaDefinition&lt;DomainPackSpec&gt;]</code> | 由 `index` 模块导出的 domain Spec Definitions 常量。 |
| `domainSpecJsonSchemas` | 常量 | <code>const domainSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 domain Spec Json Schemas 常量。 |
| `domainThinkingModeSchema` | 常量 | <code>const domainThinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | domain Thinking Mode 的运行时 Schema。 |
| `reasoningSpecDefinition` | 常量 | <code>const reasoningSpecDefinition: SpecSchemaDefinition&lt;ReasoningSpec&gt;</code> | reasoning Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `reasoningSpecExample` | 常量 | <code>const reasoningSpecExample: ReasoningSpec</code> | reasoning Spec 的有效示例值。 |
| `reasoningSpecJsonSchema` | 常量 | <code>const reasoningSpecJsonSchema: JsonSchema</code> | reasoning Spec 的 JSON Schema。 |
| `reasoningSpecSchema` | 常量 | <code>const reasoningSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { thinkingMode: z.ZodEnum&lt;["none", "summary", "structured"]&gt;; agenticMode: z.ZodEnum&lt;...</code> | reasoning Spec 的运行时 Schema。 |
| `riskProfileSpecSchema` | 常量 | <code>const riskProfileSpecSchema: z.ZodObject&lt;{ defaultRiskLevel: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; escalationPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }&gt;</code> | risk Profile Spec 的运行时 Schema。 |
| `sessionProfileSpecSchema` | 常量 | <code>const sessionProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { metadataSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;...</code> | session Profile Spec 的运行时 Schema。 |
| `skillPolicyBindingSchema` | 常量 | <code>const skillPolicyBindingSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { skillRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; ...</code> | skill Policy Binding 的运行时 Schema。 |
| `taskSchemaSpecSchema` | 常量 | <code>const taskSchemaSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { taskType: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema...</code> | task Schema Spec 的运行时 Schema。 |
| `workflowSpecDefinition` | 常量 | <code>const workflowSpecDefinition: SpecSchemaDefinition&lt;WorkflowSpec&gt;</code> | workflow Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workflowSpecExample` | 常量 | <code>const workflowSpecExample: WorkflowSpec</code> | workflow Spec 的有效示例值。 |
| `workflowSpecJsonSchema` | 常量 | <code>const workflowSpecJsonSchema: JsonSchema</code> | workflow Spec 的 JSON Schema。 |
| `workflowSpecSchema` | 常量 | <code>const workflowSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; terminalStates: z.ZodArray&lt;z.ZodString, "many"&gt;; states: ...</code> | workflow Spec 的运行时 Schema。 |
| `workflowStateSpecSchema` | 常量 | <code>const workflowStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; goal: z.ZodString; inputContract: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; outputCon...</code> | workflow State Spec 的运行时 Schema。 |
| `workflowTransitionSpecSchema` | 常量 | <code>const workflowTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }&gt;</code> | workflow Transition Spec 的运行时 Schema。 |
| `applyDomainAgentPatch` | 函数 | <code>applyDomainAgentPatch&lt;TAgent extends DomainAgentPatchTarget&gt;(agent: TAgent, patch: DomainAgentPatch): TAgent</code> | 应用 Domain Agent Patch。 |
| `compileDomainPackToHarnessedSystem` | 函数 | <code>compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | 编译 Domain Pack To Harnessed System。 |
| `compileWorkflowToFSM` | 函数 | <code>compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | 编译 Workflow To FSM。 |
| `createWorkflowDependencySnapshot` | 函数 | <code>createWorkflowDependencySnapshot(input: Omit&lt;WorkflowDependencySnapshot, "dependencyHash"&gt;): WorkflowDependencySnapshot</code> | 创建 Workflow Dependency Snapshot。 |
| `extendDomainPack` | 函数 | <code>extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec</code> | extend Domain Pack 的公开运行时操作。 |
| `initializeDomainSession` | 函数 | <code>initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization</code> | initialize Domain Session 的公开运行时操作。 |
| `listLocalDomainPackFiles` | 函数 | <code>listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise&lt;string[]&gt;</code> | 列出 Local Domain Pack Files。 |
| `loadDomainPackFile` | 函数 | <code>loadDomainPackFile(filePath: string): Promise&lt;DomainPackSpec&gt;</code> | 加载 Domain Pack File。 |
| `parseDomainPackDocument` | 函数 | <code>parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec</code> | 解析并校验 Domain Pack Document。 |
| `resolveWorkflowToolExecutionScope` | 函数 | <code>resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope</code> | 解析 Workflow Tool Execution Scope。 |
| `validateDomainPackSpec` | 函数 | <code>validateDomainPackSpec(input: unknown): DomainPackSpec</code> | 校验 Domain Pack Spec。 |
| `validateWorkflowSpec` | 函数 | <code>validateWorkflowSpec(input: unknown): WorkflowSpec</code> | 校验 Workflow Spec。 |
| `BusinessRuleSpec` | 接口 | <code>interface BusinessRuleSpec extends VersionedSpec, SpecMetadata</code> | Business Rule Spec 的字段契约；完整字段见下表。 |
| `DomainAgentPatch` | 接口 | <code>interface DomainAgentPatch</code> | Domain Agent Patch 的字段契约；完整字段见下表。 |
| `DomainAgentPatchTarget` | 接口 | <code>interface DomainAgentPatchTarget</code> | Domain Agent Patch Target 的字段契约；完整字段见下表。 |
| `DomainBindingResolution` | 接口 | <code>interface DomainBindingResolution</code> | Domain Binding Resolution 的字段契约；完整字段见下表。 |
| `DomainCompilationAudit` | 接口 | <code>interface DomainCompilationAudit</code> | Domain Compilation Audit 的字段契约；完整字段见下表。 |
| `DomainCompilationResult` | 接口 | <code>interface DomainCompilationResult</code> | Domain Compilation Result 的字段契约；完整字段见下表。 |
| `DomainCompileOptions` | 接口 | <code>interface DomainCompileOptions</code> | Domain Compile Options 的字段契约；完整字段见下表。 |
| `DomainPackRegistryEntry` | 接口 | <code>interface DomainPackRegistryEntry</code> | Domain Pack Registry Entry 的字段契约；完整字段见下表。 |
| `DomainPackSpec` | 接口 | <code>interface DomainPackSpec extends VersionedSpec, SpecMetadata</code> | Domain Pack Spec 的字段契约；完整字段见下表。 |
| `DomainPromptRef` | 接口 | <code>interface DomainPromptRef extends SpecRef</code> | Domain Prompt Ref 的字段契约；完整字段见下表。 |
| `DomainSessionInitialization` | 接口 | <code>interface DomainSessionInitialization</code> | Domain Session Initialization 的字段契约；完整字段见下表。 |
| `DomainSessionInitOptions` | 接口 | <code>interface DomainSessionInitOptions</code> | Domain Session Init Options 的字段契约；完整字段见下表。 |
| `LocalDomainPackLoaderOptions` | 接口 | <code>interface LocalDomainPackLoaderOptions</code> | Local Domain Pack Loader Options 的字段契约；完整字段见下表。 |
| `ReasoningSpec` | 接口 | <code>interface ReasoningSpec extends VersionedSpec, SpecMetadata</code> | Reasoning Spec 的字段契约；完整字段见下表。 |
| `RiskProfileSpec` | 接口 | <code>interface RiskProfileSpec</code> | Risk Profile Spec 的字段契约；完整字段见下表。 |
| `SessionProfileSpec` | 接口 | <code>interface SessionProfileSpec extends VersionedSpec, SpecMetadata</code> | Session Profile Spec 的字段契约；完整字段见下表。 |
| `SkillPolicyBinding` | 接口 | <code>interface SkillPolicyBinding extends VersionedSpec, SpecMetadata</code> | Skill Policy Binding 的字段契约；完整字段见下表。 |
| `TaskInstance` | 接口 | <code>interface TaskInstance</code> | Task Instance 的字段契约；完整字段见下表。 |
| `TaskSchemaSpec` | 接口 | <code>interface TaskSchemaSpec extends VersionedSpec, SpecMetadata</code> | Task Schema Spec 的字段契约；完整字段见下表。 |
| `WorkflowCompileOptions` | 接口 | <code>interface WorkflowCompileOptions</code> | Workflow Compile Options 的字段契约；完整字段见下表。 |
| `WorkflowDependencySnapshot` | 接口 | <code>interface WorkflowDependencySnapshot</code> | Workflow Dependency Snapshot 的字段契约；完整字段见下表。 |
| `WorkflowSpec` | 接口 | <code>interface WorkflowSpec extends VersionedSpec, SpecMetadata</code> | Workflow Spec 的字段契约；完整字段见下表。 |
| `WorkflowStateBinding` | 接口 | <code>interface WorkflowStateBinding</code> | Workflow State Binding 的字段契约；完整字段见下表。 |
| `WorkflowStateSpec` | 接口 | <code>interface WorkflowStateSpec extends SpecMetadata</code> | Workflow State Spec 的字段契约；完整字段见下表。 |
| `WorkflowTransitionSpec` | 接口 | <code>interface WorkflowTransitionSpec</code> | Workflow Transition Spec 的字段契约；完整字段见下表。 |
| `BusinessRuleEffect` | 类型 | <code>type BusinessRuleEffect = 'constraint' &#124; 'precondition' &#124; 'postcondition' &#124; 'guidance'</code> | Business Rule Effect 的公共类型别名。 |
| `BusinessRuleScope` | 类型 | <code>type BusinessRuleScope = 'domain' &#124; 'task' &#124; 'workflow' &#124; 'state' &#124; 'tool' &#124; 'memory' &#124; 'output'</code> | Business Rule Scope 的公共类型别名。 |
| `DomainAgenticReasoningMode` | 类型 | <code>type DomainAgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Domain Agentic Reasoning Mode 的公共类型别名。 |
| `DomainPackOverlay` | 类型 | <code>type DomainPackOverlay = Partial&lt;Omit&lt;DomainPackSpec, 'id' &#124; 'version' &#124; 'name' &#124; 'taskSchemas' &#124; 'workflows'&gt;&gt; &amp; { id?: string; version?: string; name?: string; taskSchemas?: TaskSchemaSpec[]; workflows?: WorkflowSpec[]; remove?: DomainPackOverlayRemovals; }</code> | Domain Pack Overlay 的公共类型别名。 |
| `DomainPackOverlayCollection` | 类型 | <code>type DomainPackOverlayCollection = 'taskSchemas' &#124; 'outputContracts' &#124; 'sessionProfiles' &#124; 'workflows' &#124; 'allowedSkills' &#124; 'defaultSkills' &#124; 'skillPolicies' &#124; 'allowedPromptRefs' &#124; 'defaultPromptRefs' &#124; 'tools' &#124; 'toolProfiles' &#124; 'mcpProfiles' &#124; 'memoryProfiles' &#124; 'contextProfiles' &#124; 'reasoningProfiles' &#124; 'businessRules' &#124; 'policies' &#124; 'evaluationProfiles' &#124; 'regressionCases'</code> | Domain Pack Overlay Collection 的公共类型别名。 |
| `DomainPackOverlayRemovals` | 类型 | <code>type DomainPackOverlayRemovals = Partial&lt;Record&lt;DomainPackOverlayCollection, string[]&gt;&gt;</code> | Domain Pack Overlay Removals 的公共类型别名。 |
| `DomainReasoningPersistence` | 类型 | <code>type DomainReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Domain Reasoning Persistence 的公共类型别名。 |
| `DomainThinkingMode` | 类型 | <code>type DomainThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Domain Thinking Mode 的公共类型别名。 |

## `DomainCompiler` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | 编译 compile。 |
| `constructor` | 构造函数 | <code>(): DomainCompiler</code> | 创建该类的实例。 |

## `DomainPackRegistry` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DomainPackRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string, version?: string): DomainPackSpec &#124; null</code> | 读取 get。 |
| `list` | 方法 | <code>list(): DomainPackRegistryEntry[]</code> | 列出 list。 |
| `register` | 方法 | <code>register(spec: DomainPackSpec, source?: string): DomainPackSpec</code> | 注册 register。 |
| `registerMany` | 方法 | <code>registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[]</code> | 注册 Many。 |
| `resolve` | 方法 | <code>resolve(id: string, version?: string): DomainPackRegistryEntry &#124; undefined</code> | 解析 resolve。 |

## `LocalDomainPackLoader` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(): Promise&lt;DomainPackRegistryEntry[]&gt;</code> | 加载 load。 |
| `loadInto` | 方法 | <code>loadInto(registry: DomainPackRegistry): Promise&lt;DomainPackSpec[]&gt;</code> | 加载 Into。 |

## `WorkflowCompiler` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | 编译 compile。 |
| `constructor` | 构造函数 | <code>(): WorkflowCompiler</code> | 创建该类的实例。 |

## `BusinessRuleSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `effect` | 属性 | <code>effect: BusinessRuleEffect</code> | effect 字段。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: string[]</code> | evaluation Refs 字段。 |
| `expression` | 属性 | <code>expression: string</code> | expression 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | input schema 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputContractRef` | 属性 | <code>outputContractRef: string</code> | output Contract Ref 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `scope` | 属性 | <code>scope: BusinessRuleScope</code> | scope 字段。 |
| `severity` | 属性 | <code>severity: RiskLevel</code> | severity 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `DomainAgentPatch` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextSpecRef` | 属性 | <code>contextSpecRef: SpecRef</code> | context Spec Ref 字段。 |
| `mcpProfileRef` | 属性 | <code>mcpProfileRef: string</code> | mcp Profile Ref 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: string</code> | memory Profile Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `promptRefs` | 属性 | <code>promptRefs: DomainPromptRef[]</code> | prompt Refs 字段。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef: string</code> | reasoning Profile Ref 字段。 |
| `skillRefs` | 属性 | <code>skillRefs: SkillRef[]</code> | skill Refs 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: string[]</code> | tool Refs 字段。 |

## `DomainAgentPatchTarget` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextSpecRef` | 属性 | <code>contextSpecRef: SpecRef</code> | context Spec Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: string</code> | memory Profile Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelAlias` | 属性 | <code>modelAlias: string</code> | model Alias 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `promptRefs` | 属性 | <code>promptRefs: DomainPromptRef[]</code> | prompt Refs 字段。 |
| `skillRefs` | 属性 | <code>skillRefs: SkillRef[]</code> | skill Refs 字段。 |
| `systemInstructions` | 属性 | <code>systemInstructions: string</code> | system Instructions 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: string[]</code> | tool Refs 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `DomainBindingResolution` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs: DomainPromptRef[]</code> | allowed Prompt Refs 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: SkillRef[]</code> | allowed Skills 字段。 |
| `businessRules` | 属性 | <code>businessRules: BusinessRuleSpec[]</code> | business Rules 字段。 |
| `contextProfile` | 属性 | <code>contextProfile: ContextSpec</code> | context Profile 字段。 |
| `defaultPromptRefs` | 属性 | <code>defaultPromptRefs: DomainPromptRef[]</code> | default Prompt Refs 字段。 |
| `defaultSkills` | 属性 | <code>defaultSkills: SkillRef[]</code> | default Skills 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `evaluations` | 属性 | <code>evaluations: EvaluationSpec[]</code> | evaluations 字段。 |
| `mcpProfile` | 属性 | <code>mcpProfile: MCPIntegrationSpec</code> | mcp Profile 字段。 |
| `mcpProfiles` | 属性 | <code>mcpProfiles: MCPIntegrationSpec[]</code> | mcp Profiles 字段。 |
| `memoryProfile` | 属性 | <code>memoryProfile: MemorySpec</code> | memory Profile 字段。 |
| `outputContract` | 属性 | <code>outputContract: OutputContractSpec</code> | output Contract 字段。 |
| `policies` | 属性 | <code>policies: PolicySpec[]</code> | policies 字段。 |
| `reasoningProfile` | 属性 | <code>reasoningProfile: ReasoningSpec</code> | reasoning Profile 字段。 |
| `reasoningProfiles` | 属性 | <code>reasoningProfiles: ReasoningSpec[]</code> | reasoning Profiles 字段。 |
| `regressionCases` | 属性 | <code>regressionCases: RegressionSpec[]</code> | regression Cases 字段。 |
| `sessionProfile` | 属性 | <code>sessionProfile: SessionProfileSpec</code> | session Profile 字段。 |
| `skillPolicies` | 属性 | <code>skillPolicies: SkillPolicyBinding[]</code> | skill Policies 字段。 |
| `taskSchema` | 属性 | <code>taskSchema: TaskSchemaSpec</code> | task schema 字段。 |
| `toolProfiles` | 属性 | <code>toolProfiles: ToolProfileSpec[]</code> | tool Profiles 字段。 |
| `tools` | 属性 | <code>tools: ToolSpec[]</code> | tools 字段。 |
| `workflow` | 属性 | <code>workflow: WorkflowSpec</code> | workflow 字段。 |
| `workflowStates` | 属性 | <code>workflowStates: WorkflowStateBinding[]</code> | workflow States 字段。 |

## `DomainCompilationAudit` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `compilationHash` | 属性 | <code>compilationHash: string</code> | compilation Hash 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `mcpRefs` | 属性 | <code>mcpRefs: SpecRef[]</code> | mcp Refs 字段。 |
| `promptRefs` | 属性 | <code>promptRefs: DomainPromptRef[]</code> | prompt Refs 字段。 |
| `skillRefs` | 属性 | <code>skillRefs: SkillRef[]</code> | skill Refs 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | tool Refs 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |
| `workflowStateBindingsHash` | 属性 | <code>workflowStateBindingsHash: string</code> | workflow State Bindings Hash 字段。 |

## `DomainCompilationResult` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentPatch` | 属性 | <code>agentPatch: DomainAgentPatch</code> | agent Patch 字段。 |
| `audit` | 属性 | <code>audit: DomainCompilationAudit</code> | audit 字段。 |
| `bindings` | 属性 | <code>bindings: DomainBindingResolution</code> | bindings 字段。 |
| `compilerVersion` | 属性 | <code>compilerVersion: string</code> | compiler Version 字段。 |
| `dependencySnapshot` | 属性 | <code>dependencySnapshot: WorkflowDependencySnapshot</code> | dependency Snapshot 字段。 |
| `domainPack` | 属性 | <code>domainPack: DomainPackSpec</code> | domain Pack 字段。 |
| `fsmProcess` | 属性 | <code>fsmProcess: FSMProcessSpec</code> | fsm Process 字段。 |
| `harnessedSystem` | 属性 | <code>harnessedSystem: HarnessedAgentSystemSpec</code> | harnessed System 字段。 |
| `processHash` | 属性 | <code>processHash: string</code> | process Hash 字段。 |
| `sessionInitialization` | 属性 | <code>sessionInitialization: DomainSessionInitialization</code> | session Initialization 字段。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | workflow Ref 字段。 |

## `DomainCompileOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `agentSkillRefs` | 属性 | <code>agentSkillRefs: SkillRef[]</code> | agent Skill Refs 字段。 |
| `agentToolRefs` | 属性 | <code>agentToolRefs: string[]</code> | agent Tool Refs 字段。 |
| `contextProfileId` | 属性 | <code>contextProfileId: string</code> | context Profile Id 字段。 |
| `deploymentRef` | 属性 | <code>deploymentRef: SpecRef</code> | deployment Ref 字段。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: string[]</code> | evaluation Refs 字段。 |
| `mcpProfileId` | 属性 | <code>mcpProfileId: string</code> | mcp Profile Id 字段。 |
| `memoryProfileId` | 属性 | <code>memoryProfileId: string</code> | memory Profile Id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `modelProfileRef` | 属性 | <code>modelProfileRef: SpecRef</code> | model Profile Ref 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `reasoningProfileId` | 属性 | <code>reasoningProfileId: string</code> | reasoning Profile Id 字段。 |
| `regressionRef` | 属性 | <code>regressionRef: SpecRef</code> | regression Ref 字段。 |
| `replayRef` | 属性 | <code>replayRef: SpecRef</code> | replay Ref 字段。 |
| `sessionProfileId` | 属性 | <code>sessionProfileId: string</code> | session Profile Id 字段。 |
| `systemId` | 属性 | <code>systemId: string</code> | system Id 字段。 |
| `systemVersion` | 属性 | <code>systemVersion: string</code> | system Version 字段。 |
| `taskSchemaId` | 属性 | <code>taskSchemaId: string</code> | task Schema Id 字段。 |
| `traceRef` | 属性 | <code>traceRef: SpecRef</code> | trace Ref 字段。 |
| `workflowId` | 属性 | <code>workflowId: string</code> | workflow Id 字段。 |

## `DomainPackRegistryEntry` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `source` | 属性 | <code>source: string</code> | source 字段。 |
| `spec` | 属性 | <code>spec: DomainPackSpec</code> | spec 字段。 |

## `DomainPackSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs: DomainPromptRef[]</code> | allowed Prompt Refs 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: SkillRef[]</code> | allowed Skills 字段。 |
| `businessRules` | 属性 | <code>businessRules: BusinessRuleSpec[]</code> | business Rules 字段。 |
| `contextProfiles` | 属性 | <code>contextProfiles: ContextSpec[]</code> | context Profiles 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultPromptRefs` | 属性 | <code>defaultPromptRefs: DomainPromptRef[]</code> | default Prompt Refs 字段。 |
| `defaultReasoningProfile` | 属性 | <code>defaultReasoningProfile: string</code> | default Reasoning Profile 字段。 |
| `defaultSkills` | 属性 | <code>defaultSkills: SkillRef[]</code> | default Skills 字段。 |
| `defaultWorkflow` | 属性 | <code>defaultWorkflow: string</code> | default Workflow 字段。 |
| `deploymentProfile` | 属性 | <code>deploymentProfile: DeploymentSpec</code> | deployment Profile 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `evaluationProfiles` | 属性 | <code>evaluationProfiles: EvaluationSpec[]</code> | evaluation Profiles 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `mcpProfiles` | 属性 | <code>mcpProfiles: MCPIntegrationSpec[]</code> | mcp Profiles 字段。 |
| `memoryProfiles` | 属性 | <code>memoryProfiles: MemorySpec[]</code> | memory Profiles 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputContracts` | 属性 | <code>outputContracts: OutputContractSpec[]</code> | output Contracts 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `policies` | 属性 | <code>policies: PolicySpec[]</code> | policies 字段。 |
| `reasoningProfiles` | 属性 | <code>reasoningProfiles: ReasoningSpec[]</code> | reasoning Profiles 字段。 |
| `regressionCases` | 属性 | <code>regressionCases: RegressionSpec[]</code> | regression Cases 字段。 |
| `sessionProfiles` | 属性 | <code>sessionProfiles: SessionProfileSpec[]</code> | session Profiles 字段。 |
| `skillPolicies` | 属性 | <code>skillPolicies: SkillPolicyBinding[]</code> | skill Policies 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `taskSchemas` | 属性 | <code>taskSchemas: TaskSchemaSpec[]</code> | task Schemas 字段。 |
| `toolProfiles` | 属性 | <code>toolProfiles: ToolProfileSpec[]</code> | tool Profiles 字段。 |
| `tools` | 属性 | <code>tools: ToolSpec[]</code> | tools 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |
| `workflows` | 属性 | <code>workflows: WorkflowSpec[]</code> | workflows 字段。 |

## `DomainPromptRef` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `priority` | 属性 | <code>priority: number</code> | priority 字段。 |
| `required` | 属性 | <code>required: boolean</code> | required 字段。 |
| `revision` | 属性 | <code>revision: string</code> | revision 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `DomainSessionInitialization` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextProfileRef` | 属性 | <code>contextProfileRef: string</code> | context Profile Ref 字段。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | domain Pack Ref 字段。 |
| `mcpProfileRef` | 属性 | <code>mcpProfileRef: string</code> | mcp Profile Ref 字段。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef: string</code> | memory Profile Ref 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef: string</code> | reasoning Profile Ref 字段。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef: SpecRef</code> | session Profile Ref 字段。 |
| `skillPolicyRef` | 属性 | <code>skillPolicyRef: string</code> | skill Policy Ref 字段。 |
| `toolProfileRef` | 属性 | <code>toolProfileRef: string</code> | tool Profile Ref 字段。 |

## `DomainSessionInitOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `profileId` | 属性 | <code>profileId: string</code> | profile Id 字段。 |

## `LocalDomainPackLoaderOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `directories` | 属性 | <code>directories: string[]</code> | directories 字段。 |
| `extensions` | 属性 | <code>extensions: string[]</code> | extensions 字段。 |
| `recursive` | 属性 | <code>recursive: boolean</code> | recursive 字段。 |

## `ReasoningSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticMode` | 属性 | <code>agenticMode: DomainAgenticReasoningMode</code> | agentic Mode 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `maxSteps` | 属性 | <code>maxSteps: number</code> | max Steps 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `metadataSchema` | 属性 | <code>metadataSchema: JsonSchema</code> | metadata schema 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `persist` | 属性 | <code>persist: DomainReasoningPersistence</code> | persist 字段。 |
| `plannerRef` | 属性 | <code>plannerRef: string</code> | planner Ref 字段。 |
| `reasonerRef` | 属性 | <code>reasonerRef: string</code> | reasoner Ref 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `thinkingMode` | 属性 | <code>thinkingMode: DomainThinkingMode</code> | thinking Mode 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `RiskProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultRiskLevel` | 属性 | <code>defaultRiskLevel: RiskLevel</code> | default Risk Level 字段。 |
| `escalationPolicyRef` | 属性 | <code>escalationPolicyRef: string</code> | escalation Policy Ref 字段。 |

## `SessionProfileSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultContextProfileRef` | 属性 | <code>defaultContextProfileRef: string</code> | default Context Profile Ref 字段。 |
| `defaultMCPProfileRef` | 属性 | <code>defaultMCPProfileRef: string</code> | default MCP Profile Ref 字段。 |
| `defaultMemoryProfileRef` | 属性 | <code>defaultMemoryProfileRef: string</code> | default Memory Profile Ref 字段。 |
| `defaultMetadata` | 属性 | <code>defaultMetadata: Record&lt;string, unknown&gt;</code> | default Metadata 字段。 |
| `defaultPolicyRefs` | 属性 | <code>defaultPolicyRefs: string[]</code> | default Policy Refs 字段。 |
| `defaultReasoningProfileRef` | 属性 | <code>defaultReasoningProfileRef: string</code> | default Reasoning Profile Ref 字段。 |
| `defaultSkillPolicyRef` | 属性 | <code>defaultSkillPolicyRef: string</code> | default Skill Policy Ref 字段。 |
| `defaultToolProfileRef` | 属性 | <code>defaultToolProfileRef: string</code> | default Tool Profile Ref 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadataSchema` | 属性 | <code>metadataSchema: JsonSchema</code> | metadata schema 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `SkillPolicyBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | allowed Tools 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `requiredTools` | 属性 | <code>requiredTools: string[]</code> | required Tools 字段。 |
| `skillRef` | 属性 | <code>skillRef: SkillRef</code> | skill Ref 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | trust Level 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `TaskInstance` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptanceCriteria` | 属性 | <code>acceptanceCriteria: unknown</code> | acceptance Criteria 字段。 |
| `constraints` | 属性 | <code>constraints: TConstraints</code> | constraints 字段。 |
| `domainId` | 属性 | <code>domainId: string</code> | domain Id 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `input` | 属性 | <code>input: TInput</code> | input 字段。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | metadata 字段。 |
| `riskLevel` | 属性 | <code>riskLevel: RiskLevel</code> | risk Level 字段。 |
| `taskSchemaId` | 属性 | <code>taskSchemaId: string</code> | task Schema Id 字段。 |

## `TaskSchemaSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptanceCriteriaSchema` | 属性 | <code>acceptanceCriteriaSchema: JsonSchema</code> | acceptance Criteria schema 字段。 |
| `constraintsSchema` | 属性 | <code>constraintsSchema: JsonSchema</code> | constraints schema 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `defaultSkillRefs` | 属性 | <code>defaultSkillRefs: SkillRef[]</code> | default Skill Refs 字段。 |
| `defaultWorkflowRef` | 属性 | <code>defaultWorkflowRef: string</code> | default Workflow Ref 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | input schema 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputContractRef` | 属性 | <code>outputContractRef: string</code> | output Contract Ref 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `riskProfile` | 属性 | <code>riskProfile: RiskProfileSpec</code> | risk Profile 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `taskType` | 属性 | <code>taskType: string</code> | task Type 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `WorkflowCompileOptions` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | agent Ref 字段。 |
| `fsmProcessId` | 属性 | <code>fsmProcessId: string</code> | fsm Process Id 字段。 |
| `workflowId` | 属性 | <code>workflowId: string</code> | workflow Id 字段。 |

## `WorkflowDependencySnapshot` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRefs` | 属性 | <code>agentRefs: SpecRef[]</code> | agent Refs 字段。 |
| `businessRuleRefs` | 属性 | <code>businessRuleRefs: SpecRef[]</code> | business Rule Refs 字段。 |
| `contextProfileRefs` | 属性 | <code>contextProfileRefs: SpecRef[]</code> | context Profile Refs 字段。 |
| `dependencyHash` | 属性 | <code>dependencyHash: string</code> | dependency Hash 字段。 |
| `deploymentRefs` | 属性 | <code>deploymentRefs: SpecRef[]</code> | deployment Refs 字段。 |
| `domainPackRefs` | 属性 | <code>domainPackRefs: SpecRef[]</code> | domain Pack Refs 字段。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: SpecRef[]</code> | evaluation Refs 字段。 |
| `mcpProfileRefs` | 属性 | <code>mcpProfileRefs: SpecRef[]</code> | mcp Profile Refs 字段。 |
| `memoryProfileRefs` | 属性 | <code>memoryProfileRefs: SpecRef[]</code> | memory Profile Refs 字段。 |
| `modelProfileRefs` | 属性 | <code>modelProfileRefs: SpecRef[]</code> | model Profile Refs 字段。 |
| `outputContractRefs` | 属性 | <code>outputContractRefs: SpecRef[]</code> | output Contract Refs 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: SpecRef[]</code> | policy Refs 字段。 |
| `reasoningProfileRefs` | 属性 | <code>reasoningProfileRefs: SpecRef[]</code> | reasoning Profile Refs 字段。 |
| `regressionRefs` | 属性 | <code>regressionRefs: SpecRef[]</code> | regression Refs 字段。 |
| `replayRefs` | 属性 | <code>replayRefs: SpecRef[]</code> | replay Refs 字段。 |
| `sessionProfileRefs` | 属性 | <code>sessionProfileRefs: SpecRef[]</code> | session Profile Refs 字段。 |
| `skillPolicyRefs` | 属性 | <code>skillPolicyRefs: SpecRef[]</code> | skill Policy Refs 字段。 |
| `skillRefs` | 属性 | <code>skillRefs: SpecRef[]</code> | skill Refs 字段。 |
| `taskSchemaRefs` | 属性 | <code>taskSchemaRefs: SpecRef[]</code> | task Schema Refs 字段。 |
| `toolProfileRefs` | 属性 | <code>toolProfileRefs: SpecRef[]</code> | tool Profile Refs 字段。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | tool Refs 字段。 |
| `traceRefs` | 属性 | <code>traceRefs: SpecRef[]</code> | trace Refs 字段。 |
| `workspaceProfileRefs` | 属性 | <code>workspaceProfileRefs: SpecRef[]</code> | workspace Profile Refs 字段。 |

## `WorkflowSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `initialState` | 属性 | <code>initialState: string</code> | initial State 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `states` | 属性 | <code>states: WorkflowStateSpec[]</code> | states 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `terminalStates` | 属性 | <code>terminalStates: string[]</code> | terminal States 字段。 |
| `transitions` | 属性 | <code>transitions: WorkflowTransitionSpec[]</code> | transitions 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |
| `version` | 属性 | <code>version: string</code> | version 字段。 |

## `WorkflowStateBinding` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | 属性 | <code>allowedMCPProfileRefs: SpecRef[]</code> | allowed MCP Profile Refs 字段。 |
| `allowedMCPProfiles` | 属性 | <code>allowedMCPProfiles: string[]</code> | allowed MCP Profiles 字段。 |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs: DomainPromptRef[]</code> | allowed Prompt Refs 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: string[]</code> | allowed Skills 字段。 |
| `allowedToolRefs` | 属性 | <code>allowedToolRefs: SpecRef[]</code> | allowed Tool Refs 字段。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | allowed Tools 字段。 |
| `capabilityLoadPolicy` | 属性 | <code>capabilityLoadPolicy: "eager" &#124; "lazy" &#124; "model_selected"</code> | capability Load Policy 字段。 |
| `deniedToolRefs` | 属性 | <code>deniedToolRefs: SpecRef[]</code> | denied Tool Refs 字段。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: string[]</code> | evaluation Refs 字段。 |
| `humanApprovalPolicyRef` | 属性 | <code>humanApprovalPolicyRef: SpecRef</code> | human Approval Policy Ref 字段。 |
| `memoryPolicyRef` | 属性 | <code>memoryPolicyRef: string</code> | memory Policy Ref 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef: string</code> | reasoning Profile Ref 字段。 |
| `requiredPromptRefs` | 属性 | <code>requiredPromptRefs: DomainPromptRef[]</code> | required Prompt Refs 字段。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[]</code> | required Skills 字段。 |
| `stateId` | 属性 | <code>stateId: string</code> | state Id 字段。 |
| `toolProfileRefs` | 属性 | <code>toolProfileRefs: SpecRef[]</code> | tool Profile Refs 字段。 |

## `WorkflowStateSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | 属性 | <code>allowedMCPProfileRefs: SpecRef[]</code> | allowed MCP Profile Refs 字段。 |
| `allowedMCPProfiles` | 属性 | <code>allowedMCPProfiles: string[]</code> | allowed MCP Profiles 字段。 |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs: DomainPromptRef[]</code> | allowed Prompt Refs 字段。 |
| `allowedSkills` | 属性 | <code>allowedSkills: string[]</code> | allowed Skills 字段。 |
| `allowedToolRefs` | 属性 | <code>allowedToolRefs: SpecRef[]</code> | allowed Tool Refs 字段。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | allowed Tools 字段。 |
| `capabilityLoadPolicy` | 属性 | <code>capabilityLoadPolicy: "eager" &#124; "lazy" &#124; "model_selected"</code> | capability Load Policy 字段。 |
| `createdAt` | 属性 | <code>createdAt: string</code> | created At 字段。 |
| `deniedToolRefs` | 属性 | <code>deniedToolRefs: SpecRef[]</code> | denied Tool Refs 字段。 |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: string[]</code> | evaluation Refs 字段。 |
| `goal` | 属性 | <code>goal: string</code> | goal 字段。 |
| `humanApprovalPolicyRef` | 属性 | <code>humanApprovalPolicyRef: SpecRef</code> | human Approval Policy Ref 字段。 |
| `humanReviewPolicy` | 属性 | <code>humanReviewPolicy: HumanReviewPolicySpec</code> | human Review Policy 字段。 |
| `humanReviewRef` | 属性 | <code>humanReviewRef: string</code> | human Review Ref 字段。 |
| `id` | 属性 | <code>id: string</code> | id 字段。 |
| `inputContract` | 属性 | <code>inputContract: JsonSchema</code> | input Contract 字段。 |
| `memoryPolicyRef` | 属性 | <code>memoryPolicyRef: string</code> | memory Policy Ref 字段。 |
| `name` | 属性 | <code>name: string</code> | name 字段。 |
| `outputContract` | 属性 | <code>outputContract: JsonSchema</code> | output Contract 字段。 |
| `owner` | 属性 | <code>owner: string</code> | owner 字段。 |
| `permissionScopes` | 属性 | <code>permissionScopes: string[]</code> | permission Scopes 字段。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | policy Refs 字段。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef: string</code> | reasoning Profile Ref 字段。 |
| `requiredPromptRefs` | 属性 | <code>requiredPromptRefs: DomainPromptRef[]</code> | required Prompt Refs 字段。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[]</code> | required Skills 字段。 |
| `retryPolicy` | 属性 | <code>retryPolicy: RetryPolicySpec</code> | retry Policy 字段。 |
| `retryPolicyRef` | 属性 | <code>retryPolicyRef: string</code> | retry Policy Ref 字段。 |
| `tags` | 属性 | <code>tags: string[]</code> | tags 字段。 |
| `timeoutMs` | 属性 | <code>timeoutMs: number</code> | timeout Ms 字段。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy: TimeoutPolicySpec</code> | timeout Policy 字段。 |
| `toolProfileRefs` | 属性 | <code>toolProfileRefs: SpecRef[]</code> | tool Profile Refs 字段。 |
| `updatedAt` | 属性 | <code>updatedAt: string</code> | updated At 字段。 |

## `WorkflowTransitionSpec` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description: string</code> | description 字段。 |
| `from` | 属性 | <code>from: string</code> | from 字段。 |
| `guard` | 属性 | <code>guard: string</code> | guard 字段。 |
| `to` | 属性 | <code>to: string</code> | to 字段。 |
