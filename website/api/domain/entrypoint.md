# `@codesoul-co/hypha-domain` / `index`

- Package index: [`@codesoul-co/hypha-domain`](/api/domain)
- Package guide: [learning and composition guide](/packages/domain)
- Source: [`packages/domain/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)
- Exports: **80**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DomainCompiler` | class | <code>new DomainCompiler(): DomainCompiler</code> | Runtime implementation for Domain Compiler; see its public constructor and members below. |
| `DomainPackRegistry` | class | <code>new DomainPackRegistry(): DomainPackRegistry</code> | Runtime implementation for Domain Pack Registry; see its public constructor and members below. |
| `LocalDomainPackLoader` | class | <code>new LocalDomainPackLoader(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | Runtime implementation for Local Domain Pack Loader; see its public constructor and members below. |
| `WorkflowCompiler` | class | <code>new WorkflowCompiler(): WorkflowCompiler</code> | Runtime implementation for Workflow Compiler; see its public constructor and members below. |
| `businessRuleEffectSchema` | constant | <code>const businessRuleEffectSchema: z.ZodEnum&lt;["constraint", "precondition", "postcondition", "guidance"]&gt;</code> | Runtime schema for business Rule Effect. |
| `businessRuleScopeSchema` | constant | <code>const businessRuleScopeSchema: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "output"]&gt;</code> | Runtime schema for business Rule Scope. |
| `businessRuleSpecDefinition` | constant | <code>const businessRuleSpecDefinition: SpecSchemaDefinition&lt;BusinessRuleSpec&gt;</code> | Runtime validation entrypoint for the business Rule spec, combining its parser, example and JSON Schema. |
| `businessRuleSpecExample` | constant | <code>const businessRuleSpecExample: BusinessRuleSpec</code> | Valid example value for business Rule Spec. |
| `businessRuleSpecJsonSchema` | constant | <code>const businessRuleSpecJsonSchema: JsonSchema</code> | JSON Schema for business Rule Spec. |
| `businessRuleSpecSchema` | constant | <code>const businessRuleSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "outp...</code> | Runtime schema for business Rule Spec. |
| `DOMAIN_COMPILER_VERSION` | constant | <code>const DOMAIN_COMPILER_VERSION: "1.0.0"</code> | DOMAIN COMPILER VERSION constant exported by the `index` module. |
| `domainAgenticReasoningModeSchema` | constant | <code>const domainAgenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | Runtime schema for domain Agentic Reasoning Mode. |
| `domainPackSpecDefinition` | constant | <code>const domainPackSpecDefinition: SpecSchemaDefinition&lt;DomainPackSpec&gt;</code> | Runtime validation entrypoint for the domain Pack spec, combining its parser, example and JSON Schema. |
| `domainPackSpecExample` | constant | <code>const domainPackSpecExample: DomainPackSpec</code> | Valid example value for domain Pack Spec. |
| `domainPackSpecJsonSchema` | constant | <code>const domainPackSpecJsonSchema: JsonSchema</code> | JSON Schema for domain Pack Spec. |
| `domainPackSpecSchema` | constant | <code>const domainPackSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; taskSchemas: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;...</code> | Runtime schema for domain Pack Spec. |
| `domainPromptRefSchema` | constant | <code>const domainPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; required?: boolean &#124; undefined; priority?: number &#124; undefined; }, { id: string; version?: string &#124;...</code> | Runtime schema for domain Prompt Ref. |
| `domainReasoningPersistenceSchema` | constant | <code>const domainReasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | Runtime schema for domain Reasoning Persistence. |
| `domainSpecDefinitions` | constant | <code>const domainSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowSpec&gt;, SpecSchemaDefinition&lt;ReasoningSpec&gt;, SpecSchemaDefinition&lt;BusinessRuleSpec&gt;, SpecSchemaDefinition&lt;DomainPackSpec&gt;]</code> | domain Spec Definitions constant exported by the `index` module. |
| `domainSpecJsonSchemas` | constant | <code>const domainSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | domain Spec Json Schemas constant exported by the `index` module. |
| `domainThinkingModeSchema` | constant | <code>const domainThinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | Runtime schema for domain Thinking Mode. |
| `reasoningSpecDefinition` | constant | <code>const reasoningSpecDefinition: SpecSchemaDefinition&lt;ReasoningSpec&gt;</code> | Runtime validation entrypoint for the reasoning spec, combining its parser, example and JSON Schema. |
| `reasoningSpecExample` | constant | <code>const reasoningSpecExample: ReasoningSpec</code> | Valid example value for reasoning Spec. |
| `reasoningSpecJsonSchema` | constant | <code>const reasoningSpecJsonSchema: JsonSchema</code> | JSON Schema for reasoning Spec. |
| `reasoningSpecSchema` | constant | <code>const reasoningSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { thinkingMode: z.ZodEnum&lt;["none", "summary", "structured"]&gt;; agenticMode: z.ZodEnum&lt;...</code> | Runtime schema for reasoning Spec. |
| `riskProfileSpecSchema` | constant | <code>const riskProfileSpecSchema: z.ZodObject&lt;{ defaultRiskLevel: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; escalationPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }&gt;</code> | Runtime schema for risk Profile Spec. |
| `sessionProfileSpecSchema` | constant | <code>const sessionProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { metadataSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;...</code> | Runtime schema for session Profile Spec. |
| `skillPolicyBindingSchema` | constant | <code>const skillPolicyBindingSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { skillRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; ...</code> | Runtime schema for skill Policy Binding. |
| `taskSchemaSpecSchema` | constant | <code>const taskSchemaSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { taskType: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema...</code> | Runtime schema for task Schema Spec. |
| `workflowSpecDefinition` | constant | <code>const workflowSpecDefinition: SpecSchemaDefinition&lt;WorkflowSpec&gt;</code> | Runtime validation entrypoint for the workflow spec, combining its parser, example and JSON Schema. |
| `workflowSpecExample` | constant | <code>const workflowSpecExample: WorkflowSpec</code> | Valid example value for workflow Spec. |
| `workflowSpecJsonSchema` | constant | <code>const workflowSpecJsonSchema: JsonSchema</code> | JSON Schema for workflow Spec. |
| `workflowSpecSchema` | constant | <code>const workflowSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; terminalStates: z.ZodArray&lt;z.ZodString, "many"&gt;; states: ...</code> | Runtime schema for workflow Spec. |
| `workflowStateSpecSchema` | constant | <code>const workflowStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; goal: z.ZodString; inputContract: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; outputCon...</code> | Runtime schema for workflow State Spec. |
| `workflowTransitionSpecSchema` | constant | <code>const workflowTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }&gt;</code> | Runtime schema for workflow Transition Spec. |
| `applyDomainAgentPatch` | function | <code>applyDomainAgentPatch&lt;TAgent extends DomainAgentPatchTarget&gt;(agent: TAgent, patch: DomainAgentPatch): TAgent</code> | Applies Domain Agent Patch at this module boundary. |
| `compileDomainPackToHarnessedSystem` | function | <code>compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | Compiles Domain Pack To Harnessed System at this module boundary. |
| `compileWorkflowToFSM` | function | <code>compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | Compiles Workflow To FSM at this module boundary. |
| `createWorkflowDependencySnapshot` | function | <code>createWorkflowDependencySnapshot(input: Omit&lt;WorkflowDependencySnapshot, "dependencyHash"&gt;): WorkflowDependencySnapshot</code> | Creates Workflow Dependency Snapshot at this module boundary. |
| `extendDomainPack` | function | <code>extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec</code> | Public runtime operation for extend Domain Pack. |
| `initializeDomainSession` | function | <code>initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization</code> | Public runtime operation for initialize Domain Session. |
| `listLocalDomainPackFiles` | function | <code>listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise&lt;string[]&gt;</code> | Lists Local Domain Pack Files at this module boundary. |
| `loadDomainPackFile` | function | <code>loadDomainPackFile(filePath: string): Promise&lt;DomainPackSpec&gt;</code> | Loads Domain Pack File at this module boundary. |
| `parseDomainPackDocument` | function | <code>parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec</code> | Parses and validates Domain Pack Document at this module boundary. |
| `resolveWorkflowToolExecutionScope` | function | <code>resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope</code> | Resolves Workflow Tool Execution Scope at this module boundary. |
| `validateDomainPackSpec` | function | <code>validateDomainPackSpec(input: unknown): DomainPackSpec</code> | Validates Domain Pack Spec at this module boundary. |
| `validateWorkflowSpec` | function | <code>validateWorkflowSpec(input: unknown): WorkflowSpec</code> | Validates Workflow Spec at this module boundary. |
| `BusinessRuleSpec` | interface | <code>interface BusinessRuleSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Business Rule Spec; see all contract members below. |
| `DomainAgentPatch` | interface | <code>interface DomainAgentPatch</code> | Field contract for Domain Agent Patch; see all contract members below. |
| `DomainAgentPatchTarget` | interface | <code>interface DomainAgentPatchTarget</code> | Field contract for Domain Agent Patch Target; see all contract members below. |
| `DomainBindingResolution` | interface | <code>interface DomainBindingResolution</code> | Field contract for Domain Binding Resolution; see all contract members below. |
| `DomainCompilationAudit` | interface | <code>interface DomainCompilationAudit</code> | Field contract for Domain Compilation Audit; see all contract members below. |
| `DomainCompilationResult` | interface | <code>interface DomainCompilationResult</code> | Field contract for Domain Compilation Result; see all contract members below. |
| `DomainCompileOptions` | interface | <code>interface DomainCompileOptions</code> | Field contract for Domain Compile Options; see all contract members below. |
| `DomainPackRegistryEntry` | interface | <code>interface DomainPackRegistryEntry</code> | Field contract for Domain Pack Registry Entry; see all contract members below. |
| `DomainPackSpec` | interface | <code>interface DomainPackSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Domain Pack Spec; see all contract members below. |
| `DomainPromptRef` | interface | <code>interface DomainPromptRef extends SpecRef</code> | Field contract for Domain Prompt Ref; see all contract members below. |
| `DomainSessionInitialization` | interface | <code>interface DomainSessionInitialization</code> | Field contract for Domain Session Initialization; see all contract members below. |
| `DomainSessionInitOptions` | interface | <code>interface DomainSessionInitOptions</code> | Field contract for Domain Session Init Options; see all contract members below. |
| `LocalDomainPackLoaderOptions` | interface | <code>interface LocalDomainPackLoaderOptions</code> | Field contract for Local Domain Pack Loader Options; see all contract members below. |
| `ReasoningSpec` | interface | <code>interface ReasoningSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Reasoning Spec; see all contract members below. |
| `RiskProfileSpec` | interface | <code>interface RiskProfileSpec</code> | Field contract for Risk Profile Spec; see all contract members below. |
| `SessionProfileSpec` | interface | <code>interface SessionProfileSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Session Profile Spec; see all contract members below. |
| `SkillPolicyBinding` | interface | <code>interface SkillPolicyBinding extends VersionedSpec, SpecMetadata</code> | Field contract for Skill Policy Binding; see all contract members below. |
| `TaskInstance` | interface | <code>interface TaskInstance</code> | Field contract for Task Instance; see all contract members below. |
| `TaskSchemaSpec` | interface | <code>interface TaskSchemaSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Task Schema Spec; see all contract members below. |
| `WorkflowCompileOptions` | interface | <code>interface WorkflowCompileOptions</code> | Field contract for Workflow Compile Options; see all contract members below. |
| `WorkflowDependencySnapshot` | interface | <code>interface WorkflowDependencySnapshot</code> | Field contract for Workflow Dependency Snapshot; see all contract members below. |
| `WorkflowSpec` | interface | <code>interface WorkflowSpec extends VersionedSpec, SpecMetadata</code> | Field contract for Workflow Spec; see all contract members below. |
| `WorkflowStateBinding` | interface | <code>interface WorkflowStateBinding</code> | Field contract for Workflow State Binding; see all contract members below. |
| `WorkflowStateSpec` | interface | <code>interface WorkflowStateSpec extends SpecMetadata</code> | Field contract for Workflow State Spec; see all contract members below. |
| `WorkflowTransitionSpec` | interface | <code>interface WorkflowTransitionSpec</code> | Field contract for Workflow Transition Spec; see all contract members below. |
| `BusinessRuleEffect` | type | <code>type BusinessRuleEffect = 'constraint' &#124; 'precondition' &#124; 'postcondition' &#124; 'guidance'</code> | Public type alias for Business Rule Effect. |
| `BusinessRuleScope` | type | <code>type BusinessRuleScope = 'domain' &#124; 'task' &#124; 'workflow' &#124; 'state' &#124; 'tool' &#124; 'memory' &#124; 'output'</code> | Public type alias for Business Rule Scope. |
| `DomainAgenticReasoningMode` | type | <code>type DomainAgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Public type alias for Domain Agentic Reasoning Mode. |
| `DomainPackOverlay` | type | <code>type DomainPackOverlay = Partial&lt;Omit&lt;DomainPackSpec, 'id' &#124; 'version' &#124; 'name' &#124; 'taskSchemas' &#124; 'workflows'&gt;&gt; &amp; { id?: string; version?: string; name?: string; taskSchemas?: TaskSchemaSpec[]; workflows?: WorkflowSpec[]; remove?: DomainPackOverlayRemovals; }</code> | Public type alias for Domain Pack Overlay. |
| `DomainPackOverlayCollection` | type | <code>type DomainPackOverlayCollection = 'taskSchemas' &#124; 'outputContracts' &#124; 'sessionProfiles' &#124; 'workflows' &#124; 'allowedSkills' &#124; 'defaultSkills' &#124; 'skillPolicies' &#124; 'allowedPromptRefs' &#124; 'defaultPromptRefs' &#124; 'tools' &#124; 'toolProfiles' &#124; 'mcpProfiles' &#124; 'memoryProfiles' &#124; 'contextProfiles' &#124; 'reasoningProfiles' &#124; 'businessRules' &#124; 'policies' &#124; 'evaluationProfiles' &#124; 'regressionCases'</code> | Public type alias for Domain Pack Overlay Collection. |
| `DomainPackOverlayRemovals` | type | <code>type DomainPackOverlayRemovals = Partial&lt;Record&lt;DomainPackOverlayCollection, string[]&gt;&gt;</code> | Public type alias for Domain Pack Overlay Removals. |
| `DomainReasoningPersistence` | type | <code>type DomainReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Public type alias for Domain Reasoning Persistence. |
| `DomainThinkingMode` | type | <code>type DomainThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Public type alias for Domain Thinking Mode. |

## `DomainCompiler` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | Compiles compile at this module boundary. |
| `constructor` | constructor | <code>(): DomainCompiler</code> | Creates an instance of this class. |

## `DomainPackRegistry` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DomainPackRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string, version?: string): DomainPackSpec &#124; null</code> | Gets get at this module boundary. |
| `list` | method | <code>list(): DomainPackRegistryEntry[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(spec: DomainPackSpec, source?: string): DomainPackSpec</code> | Registers register at this module boundary. |
| `registerMany` | method | <code>registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[]</code> | Registers Many at this module boundary. |
| `resolve` | method | <code>resolve(id: string, version?: string): DomainPackRegistryEntry &#124; undefined</code> | Resolves resolve at this module boundary. |

## `LocalDomainPackLoader` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | Creates an instance of this class. |
| `load` | method | <code>load(): Promise&lt;DomainPackRegistryEntry[]&gt;</code> | Loads load at this module boundary. |
| `loadInto` | method | <code>loadInto(registry: DomainPackRegistry): Promise&lt;DomainPackSpec[]&gt;</code> | Loads Into at this module boundary. |

## `WorkflowCompiler` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | Compiles compile at this module boundary. |
| `constructor` | constructor | <code>(): WorkflowCompiler</code> | Creates an instance of this class. |

## `BusinessRuleSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `effect` | property | <code>effect: BusinessRuleEffect</code> | Public effect property. |
| `evaluationRefs` | property | <code>evaluationRefs: string[]</code> | Public evaluation Refs property. |
| `expression` | property | <code>expression: string</code> | Public expression property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public input schema property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputContractRef` | property | <code>outputContractRef: string</code> | Public output Contract Ref property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `scope` | property | <code>scope: BusinessRuleScope</code> | Public scope property. |
| `severity` | property | <code>severity: RiskLevel</code> | Public severity property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `DomainAgentPatch` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextSpecRef` | property | <code>contextSpecRef: SpecRef</code> | Public context Spec Ref property. |
| `mcpProfileRef` | property | <code>mcpProfileRef: string</code> | Public mcp Profile Ref property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: string</code> | Public memory Profile Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `promptRefs` | property | <code>promptRefs: DomainPromptRef[]</code> | Public prompt Refs property. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef: string</code> | Public reasoning Profile Ref property. |
| `skillRefs` | property | <code>skillRefs: SkillRef[]</code> | Public skill Refs property. |
| `toolRefs` | property | <code>toolRefs: string[]</code> | Public tool Refs property. |

## `DomainAgentPatchTarget` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextSpecRef` | property | <code>contextSpecRef: SpecRef</code> | Public context Spec Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: string</code> | Public memory Profile Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public model Alias property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `promptRefs` | property | <code>promptRefs: DomainPromptRef[]</code> | Public prompt Refs property. |
| `skillRefs` | property | <code>skillRefs: SkillRef[]</code> | Public skill Refs property. |
| `systemInstructions` | property | <code>systemInstructions: string</code> | Public system Instructions property. |
| `toolRefs` | property | <code>toolRefs: string[]</code> | Public tool Refs property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `DomainBindingResolution` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedPromptRefs` | property | <code>allowedPromptRefs: DomainPromptRef[]</code> | Public allowed Prompt Refs property. |
| `allowedSkills` | property | <code>allowedSkills: SkillRef[]</code> | Public allowed Skills property. |
| `businessRules` | property | <code>businessRules: BusinessRuleSpec[]</code> | Public business Rules property. |
| `contextProfile` | property | <code>contextProfile: ContextSpec</code> | Public context Profile property. |
| `defaultPromptRefs` | property | <code>defaultPromptRefs: DomainPromptRef[]</code> | Public default Prompt Refs property. |
| `defaultSkills` | property | <code>defaultSkills: SkillRef[]</code> | Public default Skills property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `evaluations` | property | <code>evaluations: EvaluationSpec[]</code> | Public evaluations property. |
| `mcpProfile` | property | <code>mcpProfile: MCPIntegrationSpec</code> | Public mcp Profile property. |
| `mcpProfiles` | property | <code>mcpProfiles: MCPIntegrationSpec[]</code> | Public mcp Profiles property. |
| `memoryProfile` | property | <code>memoryProfile: MemorySpec</code> | Public memory Profile property. |
| `outputContract` | property | <code>outputContract: OutputContractSpec</code> | Public output Contract property. |
| `policies` | property | <code>policies: PolicySpec[]</code> | Public policies property. |
| `reasoningProfile` | property | <code>reasoningProfile: ReasoningSpec</code> | Public reasoning Profile property. |
| `reasoningProfiles` | property | <code>reasoningProfiles: ReasoningSpec[]</code> | Public reasoning Profiles property. |
| `regressionCases` | property | <code>regressionCases: RegressionSpec[]</code> | Public regression Cases property. |
| `sessionProfile` | property | <code>sessionProfile: SessionProfileSpec</code> | Public session Profile property. |
| `skillPolicies` | property | <code>skillPolicies: SkillPolicyBinding[]</code> | Public skill Policies property. |
| `taskSchema` | property | <code>taskSchema: TaskSchemaSpec</code> | Public task schema property. |
| `toolProfiles` | property | <code>toolProfiles: ToolProfileSpec[]</code> | Public tool Profiles property. |
| `tools` | property | <code>tools: ToolSpec[]</code> | Public tools property. |
| `workflow` | property | <code>workflow: WorkflowSpec</code> | Public workflow property. |
| `workflowStates` | property | <code>workflowStates: WorkflowStateBinding[]</code> | Public workflow States property. |

## `DomainCompilationAudit` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `compilationHash` | property | <code>compilationHash: string</code> | Public compilation Hash property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `mcpRefs` | property | <code>mcpRefs: SpecRef[]</code> | Public mcp Refs property. |
| `promptRefs` | property | <code>promptRefs: DomainPromptRef[]</code> | Public prompt Refs property. |
| `skillRefs` | property | <code>skillRefs: SkillRef[]</code> | Public skill Refs property. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public tool Refs property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |
| `workflowStateBindingsHash` | property | <code>workflowStateBindingsHash: string</code> | Public workflow State Bindings Hash property. |

## `DomainCompilationResult` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentPatch` | property | <code>agentPatch: DomainAgentPatch</code> | Public agent Patch property. |
| `audit` | property | <code>audit: DomainCompilationAudit</code> | Public audit property. |
| `bindings` | property | <code>bindings: DomainBindingResolution</code> | Public bindings property. |
| `compilerVersion` | property | <code>compilerVersion: string</code> | Public compiler Version property. |
| `dependencySnapshot` | property | <code>dependencySnapshot: WorkflowDependencySnapshot</code> | Public dependency Snapshot property. |
| `domainPack` | property | <code>domainPack: DomainPackSpec</code> | Public domain Pack property. |
| `fsmProcess` | property | <code>fsmProcess: FSMProcessSpec</code> | Public fsm Process property. |
| `harnessedSystem` | property | <code>harnessedSystem: HarnessedAgentSystemSpec</code> | Public harnessed System property. |
| `processHash` | property | <code>processHash: string</code> | Public process Hash property. |
| `sessionInitialization` | property | <code>sessionInitialization: DomainSessionInitialization</code> | Public session Initialization property. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public workflow Ref property. |

## `DomainCompileOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `agentSkillRefs` | property | <code>agentSkillRefs: SkillRef[]</code> | Public agent Skill Refs property. |
| `agentToolRefs` | property | <code>agentToolRefs: string[]</code> | Public agent Tool Refs property. |
| `contextProfileId` | property | <code>contextProfileId: string</code> | Public context Profile Id property. |
| `deploymentRef` | property | <code>deploymentRef: SpecRef</code> | Public deployment Ref property. |
| `evaluationRefs` | property | <code>evaluationRefs: string[]</code> | Public evaluation Refs property. |
| `mcpProfileId` | property | <code>mcpProfileId: string</code> | Public mcp Profile Id property. |
| `memoryProfileId` | property | <code>memoryProfileId: string</code> | Public memory Profile Id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `modelProfileRef` | property | <code>modelProfileRef: SpecRef</code> | Public model Profile Ref property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `reasoningProfileId` | property | <code>reasoningProfileId: string</code> | Public reasoning Profile Id property. |
| `regressionRef` | property | <code>regressionRef: SpecRef</code> | Public regression Ref property. |
| `replayRef` | property | <code>replayRef: SpecRef</code> | Public replay Ref property. |
| `sessionProfileId` | property | <code>sessionProfileId: string</code> | Public session Profile Id property. |
| `systemId` | property | <code>systemId: string</code> | Public system Id property. |
| `systemVersion` | property | <code>systemVersion: string</code> | Public system Version property. |
| `taskSchemaId` | property | <code>taskSchemaId: string</code> | Public task Schema Id property. |
| `traceRef` | property | <code>traceRef: SpecRef</code> | Public trace Ref property. |
| `workflowId` | property | <code>workflowId: string</code> | Public workflow Id property. |

## `DomainPackRegistryEntry` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `source` | property | <code>source: string</code> | Public source property. |
| `spec` | property | <code>spec: DomainPackSpec</code> | Public spec property. |

## `DomainPackSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedPromptRefs` | property | <code>allowedPromptRefs: DomainPromptRef[]</code> | Public allowed Prompt Refs property. |
| `allowedSkills` | property | <code>allowedSkills: SkillRef[]</code> | Public allowed Skills property. |
| `businessRules` | property | <code>businessRules: BusinessRuleSpec[]</code> | Public business Rules property. |
| `contextProfiles` | property | <code>contextProfiles: ContextSpec[]</code> | Public context Profiles property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultPromptRefs` | property | <code>defaultPromptRefs: DomainPromptRef[]</code> | Public default Prompt Refs property. |
| `defaultReasoningProfile` | property | <code>defaultReasoningProfile: string</code> | Public default Reasoning Profile property. |
| `defaultSkills` | property | <code>defaultSkills: SkillRef[]</code> | Public default Skills property. |
| `defaultWorkflow` | property | <code>defaultWorkflow: string</code> | Public default Workflow property. |
| `deploymentProfile` | property | <code>deploymentProfile: DeploymentSpec</code> | Public deployment Profile property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `evaluationProfiles` | property | <code>evaluationProfiles: EvaluationSpec[]</code> | Public evaluation Profiles property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `mcpProfiles` | property | <code>mcpProfiles: MCPIntegrationSpec[]</code> | Public mcp Profiles property. |
| `memoryProfiles` | property | <code>memoryProfiles: MemorySpec[]</code> | Public memory Profiles property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputContracts` | property | <code>outputContracts: OutputContractSpec[]</code> | Public output Contracts property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `policies` | property | <code>policies: PolicySpec[]</code> | Public policies property. |
| `reasoningProfiles` | property | <code>reasoningProfiles: ReasoningSpec[]</code> | Public reasoning Profiles property. |
| `regressionCases` | property | <code>regressionCases: RegressionSpec[]</code> | Public regression Cases property. |
| `sessionProfiles` | property | <code>sessionProfiles: SessionProfileSpec[]</code> | Public session Profiles property. |
| `skillPolicies` | property | <code>skillPolicies: SkillPolicyBinding[]</code> | Public skill Policies property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `taskSchemas` | property | <code>taskSchemas: TaskSchemaSpec[]</code> | Public task Schemas property. |
| `toolProfiles` | property | <code>toolProfiles: ToolProfileSpec[]</code> | Public tool Profiles property. |
| `tools` | property | <code>tools: ToolSpec[]</code> | Public tools property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |
| `workflows` | property | <code>workflows: WorkflowSpec[]</code> | Public workflows property. |

## `DomainPromptRef` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public id property. |
| `priority` | property | <code>priority: number</code> | Public priority property. |
| `required` | property | <code>required: boolean</code> | Public required property. |
| `revision` | property | <code>revision: string</code> | Public revision property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `DomainSessionInitialization` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextProfileRef` | property | <code>contextProfileRef: string</code> | Public context Profile Ref property. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public domain Pack Ref property. |
| `mcpProfileRef` | property | <code>mcpProfileRef: string</code> | Public mcp Profile Ref property. |
| `memoryProfileRef` | property | <code>memoryProfileRef: string</code> | Public memory Profile Ref property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef: string</code> | Public reasoning Profile Ref property. |
| `sessionProfileRef` | property | <code>sessionProfileRef: SpecRef</code> | Public session Profile Ref property. |
| `skillPolicyRef` | property | <code>skillPolicyRef: string</code> | Public skill Policy Ref property. |
| `toolProfileRef` | property | <code>toolProfileRef: string</code> | Public tool Profile Ref property. |

## `DomainSessionInitOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `profileId` | property | <code>profileId: string</code> | Public profile Id property. |

## `LocalDomainPackLoaderOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `directories` | property | <code>directories: string[]</code> | Public directories property. |
| `extensions` | property | <code>extensions: string[]</code> | Public extensions property. |
| `recursive` | property | <code>recursive: boolean</code> | Public recursive property. |

## `ReasoningSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticMode` | property | <code>agenticMode: DomainAgenticReasoningMode</code> | Public agentic Mode property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `maxSteps` | property | <code>maxSteps: number</code> | Public max Steps property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `metadataSchema` | property | <code>metadataSchema: JsonSchema</code> | Public metadata schema property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `persist` | property | <code>persist: DomainReasoningPersistence</code> | Public persist property. |
| `plannerRef` | property | <code>plannerRef: string</code> | Public planner Ref property. |
| `reasonerRef` | property | <code>reasonerRef: string</code> | Public reasoner Ref property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `thinkingMode` | property | <code>thinkingMode: DomainThinkingMode</code> | Public thinking Mode property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `RiskProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultRiskLevel` | property | <code>defaultRiskLevel: RiskLevel</code> | Public default Risk Level property. |
| `escalationPolicyRef` | property | <code>escalationPolicyRef: string</code> | Public escalation Policy Ref property. |

## `SessionProfileSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultContextProfileRef` | property | <code>defaultContextProfileRef: string</code> | Public default Context Profile Ref property. |
| `defaultMCPProfileRef` | property | <code>defaultMCPProfileRef: string</code> | Public default MCP Profile Ref property. |
| `defaultMemoryProfileRef` | property | <code>defaultMemoryProfileRef: string</code> | Public default Memory Profile Ref property. |
| `defaultMetadata` | property | <code>defaultMetadata: Record&lt;string, unknown&gt;</code> | Public default Metadata property. |
| `defaultPolicyRefs` | property | <code>defaultPolicyRefs: string[]</code> | Public default Policy Refs property. |
| `defaultReasoningProfileRef` | property | <code>defaultReasoningProfileRef: string</code> | Public default Reasoning Profile Ref property. |
| `defaultSkillPolicyRef` | property | <code>defaultSkillPolicyRef: string</code> | Public default Skill Policy Ref property. |
| `defaultToolProfileRef` | property | <code>defaultToolProfileRef: string</code> | Public default Tool Profile Ref property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadataSchema` | property | <code>metadataSchema: JsonSchema</code> | Public metadata schema property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `SkillPolicyBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public allowed Tools property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `requiredTools` | property | <code>requiredTools: string[]</code> | Public required Tools property. |
| `skillRef` | property | <code>skillRef: SkillRef</code> | Public skill Ref property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public trust Level property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `TaskInstance` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptanceCriteria` | property | <code>acceptanceCriteria: unknown</code> | Public acceptance Criteria property. |
| `constraints` | property | <code>constraints: TConstraints</code> | Public constraints property. |
| `domainId` | property | <code>domainId: string</code> | Public domain Id property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `input` | property | <code>input: TInput</code> | Public input property. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public metadata property. |
| `riskLevel` | property | <code>riskLevel: RiskLevel</code> | Public risk Level property. |
| `taskSchemaId` | property | <code>taskSchemaId: string</code> | Public task Schema Id property. |

## `TaskSchemaSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptanceCriteriaSchema` | property | <code>acceptanceCriteriaSchema: JsonSchema</code> | Public acceptance Criteria schema property. |
| `constraintsSchema` | property | <code>constraintsSchema: JsonSchema</code> | Public constraints schema property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `defaultSkillRefs` | property | <code>defaultSkillRefs: SkillRef[]</code> | Public default Skill Refs property. |
| `defaultWorkflowRef` | property | <code>defaultWorkflowRef: string</code> | Public default Workflow Ref property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public input schema property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputContractRef` | property | <code>outputContractRef: string</code> | Public output Contract Ref property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `riskProfile` | property | <code>riskProfile: RiskProfileSpec</code> | Public risk Profile property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `taskType` | property | <code>taskType: string</code> | Public task Type property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `WorkflowCompileOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public agent Ref property. |
| `fsmProcessId` | property | <code>fsmProcessId: string</code> | Public fsm Process Id property. |
| `workflowId` | property | <code>workflowId: string</code> | Public workflow Id property. |

## `WorkflowDependencySnapshot` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRefs` | property | <code>agentRefs: SpecRef[]</code> | Public agent Refs property. |
| `businessRuleRefs` | property | <code>businessRuleRefs: SpecRef[]</code> | Public business Rule Refs property. |
| `contextProfileRefs` | property | <code>contextProfileRefs: SpecRef[]</code> | Public context Profile Refs property. |
| `dependencyHash` | property | <code>dependencyHash: string</code> | Public dependency Hash property. |
| `deploymentRefs` | property | <code>deploymentRefs: SpecRef[]</code> | Public deployment Refs property. |
| `domainPackRefs` | property | <code>domainPackRefs: SpecRef[]</code> | Public domain Pack Refs property. |
| `evaluationRefs` | property | <code>evaluationRefs: SpecRef[]</code> | Public evaluation Refs property. |
| `mcpProfileRefs` | property | <code>mcpProfileRefs: SpecRef[]</code> | Public mcp Profile Refs property. |
| `memoryProfileRefs` | property | <code>memoryProfileRefs: SpecRef[]</code> | Public memory Profile Refs property. |
| `modelProfileRefs` | property | <code>modelProfileRefs: SpecRef[]</code> | Public model Profile Refs property. |
| `outputContractRefs` | property | <code>outputContractRefs: SpecRef[]</code> | Public output Contract Refs property. |
| `policyRefs` | property | <code>policyRefs: SpecRef[]</code> | Public policy Refs property. |
| `reasoningProfileRefs` | property | <code>reasoningProfileRefs: SpecRef[]</code> | Public reasoning Profile Refs property. |
| `regressionRefs` | property | <code>regressionRefs: SpecRef[]</code> | Public regression Refs property. |
| `replayRefs` | property | <code>replayRefs: SpecRef[]</code> | Public replay Refs property. |
| `sessionProfileRefs` | property | <code>sessionProfileRefs: SpecRef[]</code> | Public session Profile Refs property. |
| `skillPolicyRefs` | property | <code>skillPolicyRefs: SpecRef[]</code> | Public skill Policy Refs property. |
| `skillRefs` | property | <code>skillRefs: SpecRef[]</code> | Public skill Refs property. |
| `taskSchemaRefs` | property | <code>taskSchemaRefs: SpecRef[]</code> | Public task Schema Refs property. |
| `toolProfileRefs` | property | <code>toolProfileRefs: SpecRef[]</code> | Public tool Profile Refs property. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public tool Refs property. |
| `traceRefs` | property | <code>traceRefs: SpecRef[]</code> | Public trace Refs property. |
| `workspaceProfileRefs` | property | <code>workspaceProfileRefs: SpecRef[]</code> | Public workspace Profile Refs property. |

## `WorkflowSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `initialState` | property | <code>initialState: string</code> | Public initial State property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `states` | property | <code>states: WorkflowStateSpec[]</code> | Public states property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `terminalStates` | property | <code>terminalStates: string[]</code> | Public terminal States property. |
| `transitions` | property | <code>transitions: WorkflowTransitionSpec[]</code> | Public transitions property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |
| `version` | property | <code>version: string</code> | Public version property. |

## `WorkflowStateBinding` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | property | <code>allowedMCPProfileRefs: SpecRef[]</code> | Public allowed MCP Profile Refs property. |
| `allowedMCPProfiles` | property | <code>allowedMCPProfiles: string[]</code> | Public allowed MCP Profiles property. |
| `allowedPromptRefs` | property | <code>allowedPromptRefs: DomainPromptRef[]</code> | Public allowed Prompt Refs property. |
| `allowedSkills` | property | <code>allowedSkills: string[]</code> | Public allowed Skills property. |
| `allowedToolRefs` | property | <code>allowedToolRefs: SpecRef[]</code> | Public allowed Tool Refs property. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public allowed Tools property. |
| `capabilityLoadPolicy` | property | <code>capabilityLoadPolicy: "eager" &#124; "lazy" &#124; "model_selected"</code> | Public capability Load Policy property. |
| `deniedToolRefs` | property | <code>deniedToolRefs: SpecRef[]</code> | Public denied Tool Refs property. |
| `evaluationRefs` | property | <code>evaluationRefs: string[]</code> | Public evaluation Refs property. |
| `humanApprovalPolicyRef` | property | <code>humanApprovalPolicyRef: SpecRef</code> | Public human Approval Policy Ref property. |
| `memoryPolicyRef` | property | <code>memoryPolicyRef: string</code> | Public memory Policy Ref property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef: string</code> | Public reasoning Profile Ref property. |
| `requiredPromptRefs` | property | <code>requiredPromptRefs: DomainPromptRef[]</code> | Public required Prompt Refs property. |
| `requiredSkills` | property | <code>requiredSkills: string[]</code> | Public required Skills property. |
| `stateId` | property | <code>stateId: string</code> | Public state Id property. |
| `toolProfileRefs` | property | <code>toolProfileRefs: SpecRef[]</code> | Public tool Profile Refs property. |

## `WorkflowStateSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | property | <code>allowedMCPProfileRefs: SpecRef[]</code> | Public allowed MCP Profile Refs property. |
| `allowedMCPProfiles` | property | <code>allowedMCPProfiles: string[]</code> | Public allowed MCP Profiles property. |
| `allowedPromptRefs` | property | <code>allowedPromptRefs: DomainPromptRef[]</code> | Public allowed Prompt Refs property. |
| `allowedSkills` | property | <code>allowedSkills: string[]</code> | Public allowed Skills property. |
| `allowedToolRefs` | property | <code>allowedToolRefs: SpecRef[]</code> | Public allowed Tool Refs property. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public allowed Tools property. |
| `capabilityLoadPolicy` | property | <code>capabilityLoadPolicy: "eager" &#124; "lazy" &#124; "model_selected"</code> | Public capability Load Policy property. |
| `createdAt` | property | <code>createdAt: string</code> | Public created At property. |
| `deniedToolRefs` | property | <code>deniedToolRefs: SpecRef[]</code> | Public denied Tool Refs property. |
| `description` | property | <code>description: string</code> | Public description property. |
| `evaluationRefs` | property | <code>evaluationRefs: string[]</code> | Public evaluation Refs property. |
| `goal` | property | <code>goal: string</code> | Public goal property. |
| `humanApprovalPolicyRef` | property | <code>humanApprovalPolicyRef: SpecRef</code> | Public human Approval Policy Ref property. |
| `humanReviewPolicy` | property | <code>humanReviewPolicy: HumanReviewPolicySpec</code> | Public human Review Policy property. |
| `humanReviewRef` | property | <code>humanReviewRef: string</code> | Public human Review Ref property. |
| `id` | property | <code>id: string</code> | Public id property. |
| `inputContract` | property | <code>inputContract: JsonSchema</code> | Public input Contract property. |
| `memoryPolicyRef` | property | <code>memoryPolicyRef: string</code> | Public memory Policy Ref property. |
| `name` | property | <code>name: string</code> | Public name property. |
| `outputContract` | property | <code>outputContract: JsonSchema</code> | Public output Contract property. |
| `owner` | property | <code>owner: string</code> | Public owner property. |
| `permissionScopes` | property | <code>permissionScopes: string[]</code> | Public permission Scopes property. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public policy Refs property. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef: string</code> | Public reasoning Profile Ref property. |
| `requiredPromptRefs` | property | <code>requiredPromptRefs: DomainPromptRef[]</code> | Public required Prompt Refs property. |
| `requiredSkills` | property | <code>requiredSkills: string[]</code> | Public required Skills property. |
| `retryPolicy` | property | <code>retryPolicy: RetryPolicySpec</code> | Public retry Policy property. |
| `retryPolicyRef` | property | <code>retryPolicyRef: string</code> | Public retry Policy Ref property. |
| `tags` | property | <code>tags: string[]</code> | Public tags property. |
| `timeoutMs` | property | <code>timeoutMs: number</code> | Public timeout Ms property. |
| `timeoutPolicy` | property | <code>timeoutPolicy: TimeoutPolicySpec</code> | Public timeout Policy property. |
| `toolProfileRefs` | property | <code>toolProfileRefs: SpecRef[]</code> | Public tool Profile Refs property. |
| `updatedAt` | property | <code>updatedAt: string</code> | Public updated At property. |

## `WorkflowTransitionSpec` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description: string</code> | Public description property. |
| `from` | property | <code>from: string</code> | Public from property. |
| `guard` | property | <code>guard: string</code> | Public guard property. |
| `to` | property | <code>to: string</code> | Public to property. |
