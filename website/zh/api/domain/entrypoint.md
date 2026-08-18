# `@codesoul-co/hypha-domain` / `index`

- 包索引: [`@codesoul-co/hypha-domain`](/zh/api/domain)
- 源码: [`packages/domain/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)
- 导出数: **80**

## 模块用法

聚合 `@codesoul-co/hypha-domain` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

```ts
import {
  DomainCompiler,
  DomainPackRegistry,
  LocalDomainPackLoader,
  WorkflowCompiler,
  businessRuleEffectSchema,
  businessRuleScopeSchema,
  businessRuleSpecDefinition,
  businessRuleSpecExample,
} from '@codesoul-co/hypha-domain';

import type {
  BusinessRuleSpec,
  DomainAgentPatch,
  DomainAgentPatchTarget,
  DomainBindingResolution,
  DomainCompilationAudit,
  DomainCompilationResult,
  DomainCompileOptions,
  DomainPackRegistryEntry,
} from '@codesoul-co/hypha-domain';

// 完整导出列表见下方。
```

### 使用要点

- 33 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 4 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 12 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 31 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { businessRuleEffectSchema } from '@codesoul-co/hypha-domain';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = businessRuleEffectSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DomainCompiler` | 类 | <code>new DomainCompiler(): DomainCompiler</code> | Domain Compiler 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `DomainPackRegistry` | 类 | <code>new DomainPackRegistry(): DomainPackRegistry</code> | Domain Pack Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalDomainPackLoader` | 类 | <code>new LocalDomainPackLoader(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | Local Domain Pack Loader 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `WorkflowCompiler` | 类 | <code>new WorkflowCompiler(): WorkflowCompiler</code> | Workflow Compiler 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `businessRuleEffectSchema` | 常量 | <code>const businessRuleEffectSchema: z.ZodEnum&lt;["constraint", "precondition", "postcondition", "guidance"]&gt;</code> | Business Rule Effect 的运行时 Schema。 |
| `businessRuleScopeSchema` | 常量 | <code>const businessRuleScopeSchema: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "output"]&gt;</code> | Business Rule Scope 的运行时 Schema。 |
| `businessRuleSpecDefinition` | 常量 | <code>const businessRuleSpecDefinition: SpecSchemaDefinition&lt;BusinessRuleSpec&gt;</code> | Business Rule Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `businessRuleSpecExample` | 常量 | <code>const businessRuleSpecExample: BusinessRuleSpec</code> | Business Rule Spec 的有效示例值。 |
| `businessRuleSpecJsonSchema` | 常量 | <code>const businessRuleSpecJsonSchema: JsonSchema</code> | Business Rule Spec 的 JSON Schema。 |
| `businessRuleSpecSchema` | 常量 | <code>const businessRuleSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "outp...</code> | Business Rule Spec 的运行时 Schema。 |
| `DOMAIN_COMPILER_VERSION` | 常量 | <code>const DOMAIN_COMPILER_VERSION: "1.0.0"</code> | 由 `index` 模块导出的 DOMAIN COMPILER VERSION 常量。 |
| `domainAgenticReasoningModeSchema` | 常量 | <code>const domainAgenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | Domain Agentic Reasoning Mode 的运行时 Schema。 |
| `domainPackSpecDefinition` | 常量 | <code>const domainPackSpecDefinition: SpecSchemaDefinition&lt;DomainPackSpec&gt;</code> | Domain Pack Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `domainPackSpecExample` | 常量 | <code>const domainPackSpecExample: DomainPackSpec</code> | Domain Pack Spec 的有效示例值。 |
| `domainPackSpecJsonSchema` | 常量 | <code>const domainPackSpecJsonSchema: JsonSchema</code> | Domain Pack Spec 的 JSON Schema。 |
| `domainPackSpecSchema` | 常量 | <code>const domainPackSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; taskSchemas: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;...</code> | Domain Pack Spec 的运行时 Schema。 |
| `domainPromptRefSchema` | 常量 | <code>const domainPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; required?: boolean &#124; undefined; priority?: number &#124; undefined; }, { id: string; version?: string &#124;...</code> | Domain Prompt Ref 的运行时 Schema。 |
| `domainReasoningPersistenceSchema` | 常量 | <code>const domainReasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | Domain Reasoning Persistence 的运行时 Schema。 |
| `domainSpecDefinitions` | 常量 | <code>const domainSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowSpec&gt;, SpecSchemaDefinition&lt;ReasoningSpec&gt;, SpecSchemaDefinition&lt;BusinessRuleSpec&gt;, SpecSchemaDefinition&lt;DomainPackSpec&gt;]</code> | 由 `index` 模块导出的 Domain Spec Definitions 常量。 |
| `domainSpecJsonSchemas` | 常量 | <code>const domainSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Domain Spec JSON Schemas 常量。 |
| `domainThinkingModeSchema` | 常量 | <code>const domainThinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | Domain Thinking Mode 的运行时 Schema。 |
| `reasoningSpecDefinition` | 常量 | <code>const reasoningSpecDefinition: SpecSchemaDefinition&lt;ReasoningSpec&gt;</code> | Reasoning Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `reasoningSpecExample` | 常量 | <code>const reasoningSpecExample: ReasoningSpec</code> | Reasoning Spec 的有效示例值。 |
| `reasoningSpecJsonSchema` | 常量 | <code>const reasoningSpecJsonSchema: JsonSchema</code> | Reasoning Spec 的 JSON Schema。 |
| `reasoningSpecSchema` | 常量 | <code>const reasoningSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { thinkingMode: z.ZodEnum&lt;["none", "summary", "structured"]&gt;; agenticMode: z.ZodEnum&lt;...</code> | Reasoning Spec 的运行时 Schema。 |
| `riskProfileSpecSchema` | 常量 | <code>const riskProfileSpecSchema: z.ZodObject&lt;{ defaultRiskLevel: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; escalationPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }&gt;</code> | Risk Profile Spec 的运行时 Schema。 |
| `sessionProfileSpecSchema` | 常量 | <code>const sessionProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { metadataSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;...</code> | Session Profile Spec 的运行时 Schema。 |
| `skillPolicyBindingSchema` | 常量 | <code>const skillPolicyBindingSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { skillRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; ...</code> | Skill Policy Binding 的运行时 Schema。 |
| `taskSchemaSpecSchema` | 常量 | <code>const taskSchemaSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { taskType: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema...</code> | Task Schema Spec 的运行时 Schema。 |
| `workflowSpecDefinition` | 常量 | <code>const workflowSpecDefinition: SpecSchemaDefinition&lt;WorkflowSpec&gt;</code> | Workflow Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `workflowSpecExample` | 常量 | <code>const workflowSpecExample: WorkflowSpec</code> | Workflow Spec 的有效示例值。 |
| `workflowSpecJsonSchema` | 常量 | <code>const workflowSpecJsonSchema: JsonSchema</code> | Workflow Spec 的 JSON Schema。 |
| `workflowSpecSchema` | 常量 | <code>const workflowSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; terminalStates: z.ZodArray&lt;z.ZodString, "many"&gt;; states: ...</code> | Workflow Spec 的运行时 Schema。 |
| `workflowStateSpecSchema` | 常量 | <code>const workflowStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; goal: z.ZodString; inputContract: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; outputCon...</code> | Workflow State Spec 的运行时 Schema。 |
| `workflowTransitionSpecSchema` | 常量 | <code>const workflowTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }&gt;</code> | Workflow Transition Spec 的运行时 Schema。 |
| `applyDomainAgentPatch` | 函数 | <code>applyDomainAgentPatch&lt;TAgent extends DomainAgentPatchTarget&gt;(agent: TAgent, patch: DomainAgentPatch): TAgent</code> | Apply Domain Agent Patch 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `compileDomainPackToHarnessedSystem` | 函数 | <code>compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | Compile Domain Pack To Harnessed System 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `compileWorkflowToFSM` | 函数 | <code>compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | Compile Workflow To FSM 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `createWorkflowDependencySnapshot` | 函数 | <code>createWorkflowDependencySnapshot(input: Omit&lt;WorkflowDependencySnapshot, "dependencyHash"&gt;): WorkflowDependencySnapshot</code> | Create Workflow Dependency Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `extendDomainPack` | 函数 | <code>extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec</code> | Extend Domain Pack 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `initializeDomainSession` | 函数 | <code>initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization</code> | Initialize Domain Session 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `listLocalDomainPackFiles` | 函数 | <code>listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise&lt;string[]&gt;</code> | List Local Domain Pack Files 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `loadDomainPackFile` | 函数 | <code>loadDomainPackFile(filePath: string): Promise&lt;DomainPackSpec&gt;</code> | Load Domain Pack File 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `parseDomainPackDocument` | 函数 | <code>parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec</code> | Parse Domain Pack Document 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveWorkflowToolExecutionScope` | 函数 | <code>resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope</code> | Resolve Workflow Tool Execution Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateDomainPackSpec` | 函数 | <code>validateDomainPackSpec(input: unknown): DomainPackSpec</code> | Validate Domain Pack Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `validateWorkflowSpec` | 函数 | <code>validateWorkflowSpec(input: unknown): WorkflowSpec</code> | Validate Workflow Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `BusinessRuleSpec` | 接口 | <code>interface BusinessRuleSpec extends VersionedSpec, SpecMetadata</code> | Business Rule Spec 接口，共包含 17 个公开字段或方法。 |
| `DomainAgentPatch` | 接口 | <code>interface DomainAgentPatch</code> | Domain Agent Patch 接口，共包含 9 个公开字段或方法。 |
| `DomainAgentPatchTarget` | 接口 | <code>interface DomainAgentPatchTarget</code> | Domain Agent Patch Target 接口，共包含 12 个公开字段或方法。 |
| `DomainBindingResolution` | 接口 | <code>interface DomainBindingResolution</code> | Domain Binding Resolution 接口，共包含 23 个公开字段或方法。 |
| `DomainCompilationAudit` | 接口 | <code>interface DomainCompilationAudit</code> | Domain Compilation Audit 接口，共包含 9 个公开字段或方法。 |
| `DomainCompilationResult` | 接口 | <code>interface DomainCompilationResult</code> | Domain Compilation Result 接口，共包含 11 个公开字段或方法。 |
| `DomainCompileOptions` | 接口 | <code>interface DomainCompileOptions</code> | Domain Compile Options 接口，共包含 20 个公开字段或方法。 |
| `DomainPackRegistryEntry` | 接口 | <code>interface DomainPackRegistryEntry</code> | Domain Pack Registry Entry 接口，共包含 2 个公开字段或方法。 |
| `DomainPackSpec` | 接口 | <code>interface DomainPackSpec extends VersionedSpec, SpecMetadata</code> | Domain Pack Spec 接口，共包含 31 个公开字段或方法。 |
| `DomainPromptRef` | 接口 | <code>interface DomainPromptRef extends SpecRef</code> | Domain Prompt Ref 接口，共包含 5 个公开字段或方法。 |
| `DomainSessionInitialization` | 接口 | <code>interface DomainSessionInitialization</code> | Domain Session Initialization 接口，共包含 10 个公开字段或方法。 |
| `DomainSessionInitOptions` | 接口 | <code>interface DomainSessionInitOptions</code> | Domain Session Init Options 接口，共包含 2 个公开字段或方法。 |
| `LocalDomainPackLoaderOptions` | 接口 | <code>interface LocalDomainPackLoaderOptions</code> | Local Domain Pack Loader Options 接口，共包含 3 个公开字段或方法。 |
| `ReasoningSpec` | 接口 | <code>interface ReasoningSpec extends VersionedSpec, SpecMetadata</code> | Reasoning Spec 接口，共包含 16 个公开字段或方法。 |
| `RiskProfileSpec` | 接口 | <code>interface RiskProfileSpec</code> | Risk Profile Spec 接口，共包含 2 个公开字段或方法。 |
| `SessionProfileSpec` | 接口 | <code>interface SessionProfileSpec extends VersionedSpec, SpecMetadata</code> | Session Profile Spec 接口，共包含 17 个公开字段或方法。 |
| `SkillPolicyBinding` | 接口 | <code>interface SkillPolicyBinding extends VersionedSpec, SpecMetadata</code> | Skill Policy Binding 接口，共包含 14 个公开字段或方法。 |
| `TaskInstance` | 接口 | <code>interface TaskInstance</code> | Task Instance 接口，共包含 8 个公开字段或方法。 |
| `TaskSchemaSpec` | 接口 | <code>interface TaskSchemaSpec extends VersionedSpec, SpecMetadata</code> | Task Schema Spec 接口，共包含 16 个公开字段或方法。 |
| `WorkflowCompileOptions` | 接口 | <code>interface WorkflowCompileOptions</code> | Workflow Compile Options 接口，共包含 3 个公开字段或方法。 |
| `WorkflowDependencySnapshot` | 接口 | <code>interface WorkflowDependencySnapshot</code> | Workflow Dependency Snapshot 接口，共包含 23 个公开字段或方法。 |
| `WorkflowSpec` | 接口 | <code>interface WorkflowSpec extends VersionedSpec, SpecMetadata</code> | Workflow Spec 接口，共包含 12 个公开字段或方法。 |
| `WorkflowStateBinding` | 接口 | <code>interface WorkflowStateBinding</code> | Workflow State Binding 接口，共包含 18 个公开字段或方法。 |
| `WorkflowStateSpec` | 接口 | <code>interface WorkflowStateSpec extends SpecMetadata</code> | Workflow State Spec 接口，共包含 33 个公开字段或方法。 |
| `WorkflowTransitionSpec` | 接口 | <code>interface WorkflowTransitionSpec</code> | Workflow Transition Spec 接口，共包含 4 个公开字段或方法。 |
| `BusinessRuleEffect` | 类型 | <code>type BusinessRuleEffect = 'constraint' &#124; 'precondition' &#124; 'postcondition' &#124; 'guidance'</code> | Business Rule Effect 公共类型别名；完整类型表达式见声明。 |
| `BusinessRuleScope` | 类型 | <code>type BusinessRuleScope = 'domain' &#124; 'task' &#124; 'workflow' &#124; 'state' &#124; 'tool' &#124; 'memory' &#124; 'output'</code> | Business Rule Scope 公共类型别名；完整类型表达式见声明。 |
| `DomainAgenticReasoningMode` | 类型 | <code>type DomainAgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Domain Agentic Reasoning Mode 公共类型别名；完整类型表达式见声明。 |
| `DomainPackOverlay` | 类型 | <code>type DomainPackOverlay = Partial&lt;Omit&lt;DomainPackSpec, 'id' &#124; 'version' &#124; 'name' &#124; 'taskSchemas' &#124; 'workflows'&gt;&gt; &amp; { id?: string; version?: string; name?: string; taskSchemas?: TaskSchemaSpec[]; workflows?: WorkflowSpec[]; remove?: DomainPackOverlayRemovals; }</code> | Domain Pack Overlay 公共类型别名；完整类型表达式见声明。 |
| `DomainPackOverlayCollection` | 类型 | <code>type DomainPackOverlayCollection = 'taskSchemas' &#124; 'outputContracts' &#124; 'sessionProfiles' &#124; 'workflows' &#124; 'allowedSkills' &#124; 'defaultSkills' &#124; 'skillPolicies' &#124; 'allowedPromptRefs' &#124; 'defaultPromptRefs' &#124; 'tools' &#124; 'toolProfiles' &#124; 'mcpProfiles' &#124; 'memoryProfiles' &#124; 'contextProfiles' &#124; 'reasoningProfiles' &#124; 'businessRules' &#124; 'policies' &#124; 'evaluationProfiles' &#124; 'regressionCases'</code> | Domain Pack Overlay Collection 公共类型别名；完整类型表达式见声明。 |
| `DomainPackOverlayRemovals` | 类型 | <code>type DomainPackOverlayRemovals = Partial&lt;Record&lt;DomainPackOverlayCollection, string[]&gt;&gt;</code> | Domain Pack Overlay Removals 公共类型别名；完整类型表达式见声明。 |
| `DomainReasoningPersistence` | 类型 | <code>type DomainReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Domain Reasoning Persistence 公共类型别名；完整类型表达式见声明。 |
| `DomainThinkingMode` | 类型 | <code>type DomainThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Domain Thinking Mode 公共类型别名；完整类型表达式见声明。 |

## `DomainCompiler`

Domain Compiler 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DomainCompiler } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare class DomainCompiler {
    compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): DomainCompiler</code> | 创建该类的实例。 |

## `DomainPackRegistry`

Domain Pack Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DomainPackRegistry } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare class DomainPackRegistry {
    register(spec: DomainPackSpec, source?: string): DomainPackSpec;
    registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[];
    resolve(id: string, version?: string): DomainPackRegistryEntry | undefined;
    get(id: string, version?: string): DomainPackSpec | null;
    list(): DomainPackRegistryEntry[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): DomainPackRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string, version?: string): DomainPackSpec &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): DomainPackRegistryEntry[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(spec: DomainPackSpec, source?: string): DomainPackSpec</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerMany` | 方法 | <code>registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(id: string, version?: string): DomainPackRegistryEntry &#124; undefined</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalDomainPackLoader`

Local Domain Pack Loader 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalDomainPackLoader } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare class LocalDomainPackLoader {
    constructor(options: LocalDomainPackLoaderOptions);
    load(): Promise<DomainPackRegistryEntry[]>;
    loadInto(registry: DomainPackRegistry): Promise<DomainPackSpec[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(): Promise&lt;DomainPackRegistryEntry[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `loadInto` | 方法 | <code>loadInto(registry: DomainPackRegistry): Promise&lt;DomainPackSpec[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `WorkflowCompiler`

Workflow Compiler 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { WorkflowCompiler } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare class WorkflowCompiler {
    compile(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `compile` | 方法 | <code>compile(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | 公开方法；参数与返回类型以签名列为准。 |
| `constructor` | 构造函数 | <code>(): WorkflowCompiler</code> | 创建该类的实例。 |

## `businessRuleEffectSchema`

Business Rule Effect 的运行时 Schema。

- 种类: 常量
- 导入: `import { businessRuleEffectSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const businessRuleEffectSchema: z.ZodEnum<["constraint", "precondition", "postcondition", "guidance"]>;
```

## `businessRuleScopeSchema`

Business Rule Scope 的运行时 Schema。

- 种类: 常量
- 导入: `import { businessRuleScopeSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const businessRuleScopeSchema: z.ZodEnum<["domain", "task", "workflow", "state", "tool", "memory", "output"]>;
```

## `businessRuleSpecDefinition`

Business Rule Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { businessRuleSpecDefinition } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const businessRuleSpecDefinition: SpecSchemaDefinition<BusinessRuleSpec>;
```

## `businessRuleSpecExample`

Business Rule Spec 的有效示例值。

- 种类: 常量
- 导入: `import { businessRuleSpecExample } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const businessRuleSpecExample: BusinessRuleSpec;
```

## `businessRuleSpecJsonSchema`

Business Rule Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { businessRuleSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const businessRuleSpecJsonSchema: JsonSchema;
```

## `businessRuleSpecSchema`

Business Rule Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { businessRuleSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const businessRuleSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { scope: z.ZodEnum<["domain", "task", "workflow", "state", "tool", "memory", "output"]>; effect: z.ZodEnum<["constraint", "precondition", "postcondition", "guidance"]>; expression: z.ZodOptional<z.ZodString>; inputSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; outputContractRef: z.ZodOptional<z.ZodString>; policyRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; evaluationRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; severity: z.ZodOptional<z.ZodEnum<["low", "medium", "high", "critical"]>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; version: string; scope: "domain" | "task" | "workflow" | "state" | "tool" | "memory" | "output"; effect: "constraint" | "precondition" | "postcondition" | "guidance"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; expression?: string | undefined; inputSchema?: JsonSchema | undefined; outputContractRef?: string | undefined; policyRefs?: string[] | undefined; evaluationRefs?: string[] | undefined; severity?: "low" | "medium" | "high" | "critical" | undefined; }, { id: string; version: string; scope: "domain" | "task" | "workflow" | "state" | "tool" | "memory" | "output"; effect: "constraint" | "precondition" | "postcondition" | "guidance"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; expression?: string | undefined; inputSchema?: JsonSchema | undefined; outputContractRef?: string | undefined; policyRefs?: string[] | undefined; evaluationRefs?: string[] | undefined; severity?: "low" | "medium" | "high" | "critical" | undefined; }>;
```

## `DOMAIN_COMPILER_VERSION`

由 `index` 模块导出的 DOMAIN COMPILER VERSION 常量。

- 种类: 常量
- 导入: `import { DOMAIN_COMPILER_VERSION } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const DOMAIN_COMPILER_VERSION: "1.0.0";
```

## `domainAgenticReasoningModeSchema`

Domain Agentic Reasoning Mode 的运行时 Schema。

- 种类: 常量
- 导入: `import { domainAgenticReasoningModeSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainAgenticReasoningModeSchema: z.ZodEnum<["react", "fsm_react", "tot", "critique"]>;
```

## `domainPackSpecDefinition`

Domain Pack Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { domainPackSpecDefinition } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainPackSpecDefinition: SpecSchemaDefinition<DomainPackSpec>;
```

## `domainPackSpecExample`

Domain Pack Spec 的有效示例值。

- 种类: 常量
- 导入: `import { domainPackSpecExample } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainPackSpecExample: DomainPackSpec;
```

## `domainPackSpecJsonSchema`

Domain Pack Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { domainPackSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainPackSpecJsonSchema: JsonSchema;
```

## `domainPackSpecSchema`

Domain Pack Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { domainPackSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const domainPackSpecSchema: (typeof import('@codesoul-co/hypha-domain'))['domainPackSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `domainPromptRefSchema`

Domain Prompt Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { domainPromptRefSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainPromptRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; } & { required: z.ZodOptional<z.ZodBoolean>; priority: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; required?: boolean | undefined; priority?: number | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; required?: boolean | undefined; priority?: number | undefined; }>;
```

## `domainReasoningPersistenceSchema`

Domain Reasoning Persistence 的运行时 Schema。

- 种类: 常量
- 导入: `import { domainReasoningPersistenceSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainReasoningPersistenceSchema: z.ZodEnum<["summary_only", "events_only"]>;
```

## `domainSpecDefinitions`

由 `index` 模块导出的 Domain Spec Definitions 常量。

- 种类: 常量
- 导入: `import { domainSpecDefinitions } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainSpecDefinitions: readonly [SpecSchemaDefinition<WorkflowSpec>, SpecSchemaDefinition<ReasoningSpec>, SpecSchemaDefinition<BusinessRuleSpec>, SpecSchemaDefinition<DomainPackSpec>];
```

## `domainSpecJsonSchemas`

由 `index` 模块导出的 Domain Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { domainSpecJsonSchemas } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainSpecJsonSchemas: Record<string, JsonSchema>;
```

## `domainThinkingModeSchema`

Domain Thinking Mode 的运行时 Schema。

- 种类: 常量
- 导入: `import { domainThinkingModeSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const domainThinkingModeSchema: z.ZodEnum<["none", "summary", "structured"]>;
```

## `reasoningSpecDefinition`

Reasoning Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { reasoningSpecDefinition } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const reasoningSpecDefinition: SpecSchemaDefinition<ReasoningSpec>;
```

## `reasoningSpecExample`

Reasoning Spec 的有效示例值。

- 种类: 常量
- 导入: `import { reasoningSpecExample } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const reasoningSpecExample: ReasoningSpec;
```

## `reasoningSpecJsonSchema`

Reasoning Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { reasoningSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const reasoningSpecJsonSchema: JsonSchema;
```

## `reasoningSpecSchema`

Reasoning Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { reasoningSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const reasoningSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { thinkingMode: z.ZodEnum<["none", "summary", "structured"]>; agenticMode: z.ZodEnum<["react", "fsm_react", "tot", "critique"]>; maxSteps: z.ZodOptional<z.ZodNumber>; persist: z.ZodOptional<z.ZodEnum<["summary_only", "events_only"]>>; plannerRef: z.ZodOptional<z.ZodString>; reasonerRef: z.ZodOptional<z.ZodString>; metadataSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; version: string; thinkingMode: "none" | "summary" | "structured"; agenticMode: "react" | "fsm_react" | "tot" | "critique"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadataSchema?: JsonSchema | undefined; metadata?: Record<string, unknown> | undefined; }, { id: string; version: string; thinkingMode: "none" | "summary" | "structured"; agenticMode: "react" | "fsm_react" | "tot" | "critique"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadataSchema?: JsonSchema | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `riskProfileSpecSchema`

Risk Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { riskProfileSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const riskProfileSpecSchema: z.ZodObject<{ defaultRiskLevel: z.ZodEnum<["low", "medium", "high", "critical"]>; escalationPolicyRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }>;
```

## `sessionProfileSpecSchema`

Session Profile Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { sessionProfileSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const sessionProfileSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { metadataSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; defaultMetadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; defaultMemoryProfileRef: z.ZodOptional<z.ZodString>; defaultContextProfileRef: z.ZodOptional<z.ZodString>; defaultReasoningProfileRef: z.ZodOptional<z.ZodString>; defaultToolProfileRef: z.ZodOptional<z.ZodString>; defaultMCPProfileRef: z.ZodOptional<z.ZodString>; defaultSkillPolicyRef: z.ZodOptional<z.ZodString>; defaultPolicyRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadataSchema?: JsonSchema | undefined; defaultMetadata?: Record<string, unknown> | undefined; defaultMemoryProfileRef?: string | undefined; defaultContextProfileRef?: string | undefined; defaultReasoningProfileRef?: string | undefined; defaultToolProfileRef?: string | undefined; defaultMCPProfileRef?: string | undefined; defaultSkillPolicyRef?: string | undefined; defaultPolicyRefs?: string[] | undefined; }, { id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadataSchema?: JsonSchema | undefined; defaultMetadata?: Record<string, unknown> | undefined; defaultMemoryProfileRef?: string | undefined; defaultContextProfileRef?: string | undefined; defaultReasoningProfileRef?: string | undefined; defaultToolProfileRef?: string | undefined; defaultMCPProfileRef?: string | undefined; defaultSkillPolicyRef?: string | undefined; defaultPolicyRefs?: string[] | undefined; }>;
```

## `skillPolicyBindingSchema`

Skill Policy Binding 的运行时 Schema。

- 种类: 常量
- 导入: `import { skillPolicyBindingSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const skillPolicyBindingSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { skillRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>; policyRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiredTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; version: string; skillRef: { id: string; revision?: string | undefined; version?: string | undefined; }; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; policyRefs?: string[] | undefined; allowedTools?: string[] | undefined; requiredTools?: string[] | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }, { id: string; version: string; skillRef: { id: string; revision?: string | undefined; version?: string | undefined; }; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; policyRefs?: string[] | undefined; allowedTools?: string[] | undefined; requiredTools?: string[] | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }>;
```

## `taskSchemaSpecSchema`

Task Schema Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { taskSchemaSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const taskSchemaSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { taskType: z.ZodString; inputSchema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>; constraintsSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; acceptanceCriteriaSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; outputContractRef: z.ZodString; riskProfile: z.ZodOptional<z.ZodObject<{ defaultRiskLevel: z.ZodEnum<["low", "medium", "high", "critical"]>; escalationPolicyRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }>>; defaultWorkflowRef: z.ZodOptional<z.ZodString>; defaultSkillRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; inputSchema: JsonSchema; outputContractRef: string; taskType: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; constraintsSchema?: JsonSchema | undefined; acceptanceCriteriaSchema?: JsonSchema | undefined; riskProfile?: { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; } | undefined; defaultWorkflowRef?: string | undefined; defaultSkillRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }, { id: string; version: string; inputSchema: JsonSchema; outputContractRef: string; taskType: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; constraintsSchema?: JsonSchema | undefined; acceptanceCriteriaSchema?: JsonSchema | undefined; riskProfile?: { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; } | undefined; defaultWorkflowRef?: string | undefined; defaultSkillRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }>;
```

## `workflowSpecDefinition`

Workflow Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { workflowSpecDefinition } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const workflowSpecDefinition: SpecSchemaDefinition<WorkflowSpec>;
```

## `workflowSpecExample`

Workflow Spec 的有效示例值。

- 种类: 常量
- 导入: `import { workflowSpecExample } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const workflowSpecExample: WorkflowSpec;
```

## `workflowSpecJsonSchema`

Workflow Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { workflowSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const workflowSpecJsonSchema: JsonSchema;
```

## `workflowSpecSchema`

Workflow Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workflowSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workflowSpecSchema: (typeof import('@codesoul-co/hypha-domain'))['workflowSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `workflowStateSpecSchema`

Workflow State Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workflowStateSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const workflowStateSpecSchema: (typeof import('@codesoul-co/hypha-domain'))['workflowStateSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `workflowTransitionSpecSchema`

Workflow Transition Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { workflowTransitionSpecSchema } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare const workflowTransitionSpecSchema: z.ZodObject<{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string | undefined; guard?: string | undefined; }, { from: string; to: string; description?: string | undefined; guard?: string | undefined; }>;
```

## `applyDomainAgentPatch`

Apply Domain Agent Patch 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { applyDomainAgentPatch } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function applyDomainAgentPatch<TAgent extends DomainAgentPatchTarget>(agent: TAgent, patch: DomainAgentPatch): TAgent;
```

### 调用签名

```text
applyDomainAgentPatch<TAgent extends DomainAgentPatchTarget>(agent: TAgent, patch: DomainAgentPatch): TAgent
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `agent` | <code>TAgent</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `patch` | <code>DomainAgentPatch</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `TAgent`
- 说明: 返回值契约由上述类型定义。

## `compileDomainPackToHarnessedSystem`

Compile Domain Pack To Harnessed System 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { compileDomainPackToHarnessedSystem } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult;
```

### 调用签名

```text
compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>DomainPackSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>DomainCompileOptions</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainCompilationResult`
- 说明: 返回值契约由上述类型定义。

## `compileWorkflowToFSM`

Compile Workflow To FSM 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { compileWorkflowToFSM } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec;
```

### 调用签名

```text
compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `domainPack` | <code>DomainPackSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>WorkflowCompileOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `FSMProcessSpec`
- 说明: 返回值契约由上述类型定义。

## `createWorkflowDependencySnapshot`

Create Workflow Dependency Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createWorkflowDependencySnapshot } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function createWorkflowDependencySnapshot(input: Omit<WorkflowDependencySnapshot, 'dependencyHash'>): WorkflowDependencySnapshot;
```

### 调用签名

```text
createWorkflowDependencySnapshot(input: Omit<WorkflowDependencySnapshot, "dependencyHash">): WorkflowDependencySnapshot
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;WorkflowDependencySnapshot, "dependencyHash"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkflowDependencySnapshot`
- 说明: 返回值契约由上述类型定义。

## `extendDomainPack`

Extend Domain Pack 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { extendDomainPack } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec;
```

### 调用签名

```text
extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `base` | <code>DomainPackSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `overlay` | <code>DomainPackOverlay</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainPackSpec`
- 说明: 返回值契约由上述类型定义。

## `initializeDomainSession`

Initialize Domain Session 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { initializeDomainSession } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization;
```

### 调用签名

```text
initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `domainPack` | <code>DomainPackSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `options` | <code>DomainSessionInitOptions</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainSessionInitialization`
- 说明: 返回值契约由上述类型定义。

## `listLocalDomainPackFiles`

List Local Domain Pack Files 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { listLocalDomainPackFiles } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise<string[]>;
```

### 调用签名

```text
listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise<string[]>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `directory` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `recursive` | <code>boolean</code> | 否 | 可选参数；接受的值由类型列定义。 |
| `extensions` | <code>string[]</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<string[]>`
- 说明: 返回值契约由上述类型定义。

## `loadDomainPackFile`

Load Domain Pack File 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { loadDomainPackFile } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function loadDomainPackFile(filePath: string): Promise<DomainPackSpec>;
```

### 调用签名

```text
loadDomainPackFile(filePath: string): Promise<DomainPackSpec>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `filePath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<DomainPackSpec>`
- 说明: 返回值契约由上述类型定义。

## `parseDomainPackDocument`

Parse Domain Pack Document 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseDomainPackDocument } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec;
```

### 调用签名

```text
parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `raw` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `filePath` | <code>string</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainPackSpec`
- 说明: 返回值契约由上述类型定义。

## `resolveWorkflowToolExecutionScope`

Resolve Workflow Tool Execution Scope 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { resolveWorkflowToolExecutionScope } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope;
```

### 调用签名

```text
resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `workflowStates` | <code>WorkflowStateBinding[]</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `stateId` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ToolExecutionScope`
- 说明: 返回值契约由上述类型定义。

## `validateDomainPackSpec`

Validate Domain Pack Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateDomainPackSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function validateDomainPackSpec(input: unknown): DomainPackSpec;
```

### 调用签名

```text
validateDomainPackSpec(input: unknown): DomainPackSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `DomainPackSpec`
- 说明: 返回值契约由上述类型定义。

## `validateWorkflowSpec`

Validate Workflow Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateWorkflowSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export declare function validateWorkflowSpec(input: unknown): WorkflowSpec;
```

### 调用签名

```text
validateWorkflowSpec(input: unknown): WorkflowSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `WorkflowSpec`
- 说明: 返回值契约由上述类型定义。

## `BusinessRuleSpec`

Business Rule Spec 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { BusinessRuleSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface BusinessRuleSpec extends VersionedSpec, SpecMetadata {
    scope: BusinessRuleScope;
    effect: BusinessRuleEffect;
    expression?: string;
    inputSchema?: JsonSchema;
    outputContractRef?: string;
    policyRefs?: string[];
    evaluationRefs?: string[];
    severity?: RiskLevel;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `effect` | 属性 | <code>effect: BusinessRuleEffect</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expression` | 属性 | <code>expression?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContractRef` | 属性 | <code>outputContractRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: BusinessRuleScope</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `severity` | 属性 | <code>severity?: RiskLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainAgentPatch`

Domain Agent Patch 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainAgentPatch } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainAgentPatch {
    promptRefs: DomainPromptRef[];
    skillRefs: SkillRef[];
    toolRefs: string[];
    memoryProfileRef?: string;
    mcpProfileRef?: string;
    contextSpecRef?: SpecRef;
    reasoningProfileRef?: string;
    policyRefs?: string[];
    metadata: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextSpecRef` | 属性 | <code>contextSpecRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfileRef` | 属性 | <code>mcpProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptRefs` | 属性 | <code>promptRefs: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRefs` | 属性 | <code>skillRefs: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainAgentPatchTarget`

Domain Agent Patch Target 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainAgentPatchTarget } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainAgentPatchTarget {
    [key: string]: unknown;
    id?: string;
    version?: string;
    name?: string;
    modelAlias?: string;
    systemInstructions?: string;
    promptRefs?: DomainPromptRef[];
    skillRefs?: SkillRef[];
    toolRefs?: string[];
    memoryProfileRef?: string;
    contextSpecRef?: SpecRef;
    policyRefs?: string[];
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextSpecRef` | 属性 | <code>contextSpecRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelAlias` | 属性 | <code>modelAlias?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptRefs` | 属性 | <code>promptRefs?: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRefs` | 属性 | <code>skillRefs?: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `systemInstructions` | 属性 | <code>systemInstructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainBindingResolution`

Domain Binding Resolution 接口，共包含 23 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainBindingResolution } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainBindingResolution {
    domainPackRef: SpecRef;
    taskSchema?: TaskSchemaSpec;
    outputContract?: OutputContractSpec;
    sessionProfile?: SessionProfileSpec;
    workflow: WorkflowSpec;
    memoryProfile?: MemorySpec;
    mcpProfile?: MCPIntegrationSpec;
    contextProfile?: ContextSpec;
    reasoningProfile?: ReasoningSpec;
    mcpProfiles: MCPIntegrationSpec[];
    reasoningProfiles: ReasoningSpec[];
    policies: PolicySpec[];
    evaluations: EvaluationSpec[];
    regressionCases: RegressionSpec[];
    businessRules: BusinessRuleSpec[];
    tools: ToolSpec[];
    toolProfiles: ToolProfileSpec[];
    allowedSkills: SkillRef[];
    defaultSkills: SkillRef[];
    skillPolicies: SkillPolicyBinding[];
    allowedPromptRefs: DomainPromptRef[];
    defaultPromptRefs: DomainPromptRef[];
    workflowStates: WorkflowStateBinding[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `businessRules` | 属性 | <code>businessRules: BusinessRuleSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfile` | 属性 | <code>contextProfile?: ContextSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultPromptRefs` | 属性 | <code>defaultPromptRefs: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultSkills` | 属性 | <code>defaultSkills: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluations` | 属性 | <code>evaluations: EvaluationSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfile` | 属性 | <code>mcpProfile?: MCPIntegrationSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfiles` | 属性 | <code>mcpProfiles: MCPIntegrationSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfile` | 属性 | <code>memoryProfile?: MemorySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: OutputContractSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policies` | 属性 | <code>policies: PolicySpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfile` | 属性 | <code>reasoningProfile?: ReasoningSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfiles` | 属性 | <code>reasoningProfiles: ReasoningSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `regressionCases` | 属性 | <code>regressionCases: RegressionSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfile` | 属性 | <code>sessionProfile?: SessionProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillPolicies` | 属性 | <code>skillPolicies: SkillPolicyBinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskSchema` | 属性 | <code>taskSchema?: TaskSchemaSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolProfiles` | 属性 | <code>toolProfiles: ToolProfileSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools: ToolSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflow` | 属性 | <code>workflow: WorkflowSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowStates` | 属性 | <code>workflowStates: WorkflowStateBinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainCompilationAudit`

Domain Compilation Audit 接口，共包含 9 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainCompilationAudit } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainCompilationAudit {
    compilationHash: string;
    domainPackRef: SpecRef;
    workflowRef: SpecRef;
    agentRef: SpecRef;
    promptRefs: DomainPromptRef[];
    skillRefs: SkillRef[];
    toolRefs: SpecRef[];
    mcpRefs: SpecRef[];
    workflowStateBindingsHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compilationHash` | 属性 | <code>compilationHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpRefs` | 属性 | <code>mcpRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptRefs` | 属性 | <code>promptRefs: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRefs` | 属性 | <code>skillRefs: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowStateBindingsHash` | 属性 | <code>workflowStateBindingsHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainCompilationResult`

Domain Compilation Result 接口，共包含 11 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainCompilationResult } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainCompilationResult {
    domainPack: DomainPackSpec;
    bindings: DomainBindingResolution;
    fsmProcess: FSMProcessSpec;
    workflowRef: SpecRef;
    compilerVersion: string;
    processHash: string;
    dependencySnapshot: WorkflowDependencySnapshot;
    harnessedSystem: HarnessedAgentSystemSpec;
    agentPatch: DomainAgentPatch;
    sessionInitialization: DomainSessionInitialization;
    audit: DomainCompilationAudit;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentPatch` | 属性 | <code>agentPatch: DomainAgentPatch</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `audit` | 属性 | <code>audit: DomainCompilationAudit</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `bindings` | 属性 | <code>bindings: DomainBindingResolution</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `compilerVersion` | 属性 | <code>compilerVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencySnapshot` | 属性 | <code>dependencySnapshot: WorkflowDependencySnapshot</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPack` | 属性 | <code>domainPack: DomainPackSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmProcess` | 属性 | <code>fsmProcess: FSMProcessSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `harnessedSystem` | 属性 | <code>harnessedSystem: HarnessedAgentSystemSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `processHash` | 属性 | <code>processHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionInitialization` | 属性 | <code>sessionInitialization: DomainSessionInitialization</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowRef` | 属性 | <code>workflowRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainCompileOptions`

Domain Compile Options 接口，共包含 20 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainCompileOptions } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainCompileOptions {
    systemId?: string;
    systemVersion?: string;
    agentRef: SpecRef;
    agentSkillRefs?: SkillRef[];
    agentToolRefs?: string[];
    taskSchemaId?: string;
    workflowId?: string;
    sessionProfileId?: string;
    memoryProfileId?: string;
    mcpProfileId?: string;
    contextProfileId?: string;
    reasoningProfileId?: string;
    policyRefs?: string[];
    evaluationRefs?: string[];
    traceRef?: SpecRef;
    modelProfileRef?: SpecRef;
    replayRef?: SpecRef;
    regressionRef?: SpecRef;
    deploymentRef?: SpecRef;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentSkillRefs` | 属性 | <code>agentSkillRefs?: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentToolRefs` | 属性 | <code>agentToolRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfileId` | 属性 | <code>contextProfileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deploymentRef` | 属性 | <code>deploymentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfileId` | 属性 | <code>mcpProfileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileId` | 属性 | <code>memoryProfileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelProfileRef` | 属性 | <code>modelProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfileId` | 属性 | <code>reasoningProfileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `regressionRef` | 属性 | <code>regressionRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replayRef` | 属性 | <code>replayRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfileId` | 属性 | <code>sessionProfileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `systemId` | 属性 | <code>systemId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `systemVersion` | 属性 | <code>systemVersion?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskSchemaId` | 属性 | <code>taskSchemaId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceRef` | 属性 | <code>traceRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowId` | 属性 | <code>workflowId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainPackRegistryEntry`

Domain Pack Registry Entry 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainPackRegistryEntry } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainPackRegistryEntry {
    spec: DomainPackSpec;
    source?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `source` | 属性 | <code>source?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: DomainPackSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainPackSpec`

Domain Pack Spec 接口，共包含 31 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainPackSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainPackSpec extends VersionedSpec, SpecMetadata {
    name: string;
    taskSchemas: TaskSchemaSpec[];
    outputContracts: OutputContractSpec[];
    sessionProfiles?: SessionProfileSpec[];
    workflows: WorkflowSpec[];
    defaultWorkflow?: string;
    allowedSkills?: SkillRef[];
    defaultSkills?: SkillRef[];
    skillPolicies?: SkillPolicyBinding[];
    allowedPromptRefs?: DomainPromptRef[];
    defaultPromptRefs?: DomainPromptRef[];
    tools?: ToolSpec[];
    toolProfiles?: ToolProfileSpec[];
    mcpProfiles?: MCPIntegrationSpec[];
    memoryProfiles?: MemorySpec[];
    contextProfiles?: ContextSpec[];
    reasoningProfiles?: ReasoningSpec[];
    defaultReasoningProfile?: string;
    businessRules?: BusinessRuleSpec[];
    policies?: PolicySpec[];
    evaluationProfiles?: EvaluationSpec[];
    regressionCases?: RegressionSpec[];
    deploymentProfile?: DeploymentSpec;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs?: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills?: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `businessRules` | 属性 | <code>businessRules?: BusinessRuleSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfiles` | 属性 | <code>contextProfiles?: ContextSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultPromptRefs` | 属性 | <code>defaultPromptRefs?: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultReasoningProfile` | 属性 | <code>defaultReasoningProfile?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultSkills` | 属性 | <code>defaultSkills?: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultWorkflow` | 属性 | <code>defaultWorkflow?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deploymentProfile` | 属性 | <code>deploymentProfile?: DeploymentSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationProfiles` | 属性 | <code>evaluationProfiles?: EvaluationSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfiles` | 属性 | <code>mcpProfiles?: MCPIntegrationSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfiles` | 属性 | <code>memoryProfiles?: MemorySpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContracts` | 属性 | <code>outputContracts: OutputContractSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policies` | 属性 | <code>policies?: PolicySpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfiles` | 属性 | <code>reasoningProfiles?: ReasoningSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `regressionCases` | 属性 | <code>regressionCases?: RegressionSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfiles` | 属性 | <code>sessionProfiles?: SessionProfileSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillPolicies` | 属性 | <code>skillPolicies?: SkillPolicyBinding[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskSchemas` | 属性 | <code>taskSchemas: TaskSchemaSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolProfiles` | 属性 | <code>toolProfiles?: ToolProfileSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tools` | 属性 | <code>tools?: ToolSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflows` | 属性 | <code>workflows: WorkflowSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainPromptRef`

Domain Prompt Ref 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainPromptRef } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainPromptRef extends SpecRef {
    required?: boolean;
    priority?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainSessionInitialization`

Domain Session Initialization 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainSessionInitialization } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainSessionInitialization {
    domainPackRef: SpecRef;
    sessionProfileRef?: SpecRef;
    metadata: Record<string, unknown>;
    memoryProfileRef?: string;
    contextProfileRef?: string;
    reasoningProfileRef?: string;
    toolProfileRef?: string;
    mcpProfileRef?: string;
    skillPolicyRef?: string;
    policyRefs?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `contextProfileRef` | 属性 | <code>contextProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRef` | 属性 | <code>domainPackRef: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfileRef` | 属性 | <code>mcpProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRef` | 属性 | <code>memoryProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfileRef` | 属性 | <code>sessionProfileRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillPolicyRef` | 属性 | <code>skillPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolProfileRef` | 属性 | <code>toolProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `DomainSessionInitOptions`

Domain Session Init Options 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { DomainSessionInitOptions } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface DomainSessionInitOptions {
    profileId?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `profileId` | 属性 | <code>profileId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalDomainPackLoaderOptions`

Local Domain Pack Loader Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalDomainPackLoaderOptions } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface LocalDomainPackLoaderOptions {
    directories: string[];
    recursive?: boolean;
    extensions?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `directories` | 属性 | <code>directories: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `extensions` | 属性 | <code>extensions?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recursive` | 属性 | <code>recursive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ReasoningSpec`

Reasoning Spec 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ReasoningSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface ReasoningSpec extends VersionedSpec, SpecMetadata {
    thinkingMode: DomainThinkingMode;
    agenticMode: DomainAgenticReasoningMode;
    maxSteps?: number;
    persist?: DomainReasoningPersistence;
    plannerRef?: string;
    reasonerRef?: string;
    metadataSchema?: JsonSchema;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agenticMode` | 属性 | <code>agenticMode: DomainAgenticReasoningMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maxSteps` | 属性 | <code>maxSteps?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadataSchema` | 属性 | <code>metadataSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `persist` | 属性 | <code>persist?: DomainReasoningPersistence</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `plannerRef` | 属性 | <code>plannerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasonerRef` | 属性 | <code>reasonerRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `thinkingMode` | 属性 | <code>thinkingMode: DomainThinkingMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `RiskProfileSpec`

Risk Profile Spec 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { RiskProfileSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface RiskProfileSpec {
    defaultRiskLevel: RiskLevel;
    escalationPolicyRef?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `defaultRiskLevel` | 属性 | <code>defaultRiskLevel: RiskLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `escalationPolicyRef` | 属性 | <code>escalationPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SessionProfileSpec`

Session Profile Spec 接口，共包含 17 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SessionProfileSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface SessionProfileSpec extends VersionedSpec, SpecMetadata {
    metadataSchema?: JsonSchema;
    defaultMetadata?: Record<string, unknown>;
    defaultMemoryProfileRef?: string;
    defaultContextProfileRef?: string;
    defaultReasoningProfileRef?: string;
    defaultToolProfileRef?: string;
    defaultMCPProfileRef?: string;
    defaultSkillPolicyRef?: string;
    defaultPolicyRefs?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultContextProfileRef` | 属性 | <code>defaultContextProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultMCPProfileRef` | 属性 | <code>defaultMCPProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultMemoryProfileRef` | 属性 | <code>defaultMemoryProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultMetadata` | 属性 | <code>defaultMetadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultPolicyRefs` | 属性 | <code>defaultPolicyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultReasoningProfileRef` | 属性 | <code>defaultReasoningProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultSkillPolicyRef` | 属性 | <code>defaultSkillPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultToolProfileRef` | 属性 | <code>defaultToolProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadataSchema` | 属性 | <code>metadataSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillPolicyBinding`

Skill Policy Binding 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillPolicyBinding } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface SkillPolicyBinding extends VersionedSpec, SpecMetadata {
    skillRef: SkillRef;
    policyRefs?: string[];
    allowedTools?: string[];
    requiredTools?: string[];
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedTools` | 属性 | <code>allowedTools?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredTools` | 属性 | <code>requiredTools?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRef` | 属性 | <code>skillRef: SkillRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TaskInstance`

Task Instance 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TaskInstance } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface TaskInstance<TInput = unknown, TConstraints = unknown> {
    id: string;
    domainId: string;
    taskSchemaId: string;
    input: TInput;
    constraints?: TConstraints;
    acceptanceCriteria?: unknown;
    riskLevel?: RiskLevel;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptanceCriteria` | 属性 | <code>acceptanceCriteria?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constraints` | 属性 | <code>constraints?: TConstraints</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainId` | 属性 | <code>domainId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `input` | 属性 | <code>input: TInput</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `riskLevel` | 属性 | <code>riskLevel?: RiskLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskSchemaId` | 属性 | <code>taskSchemaId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `TaskSchemaSpec`

Task Schema Spec 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { TaskSchemaSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface TaskSchemaSpec extends VersionedSpec, SpecMetadata {
    taskType: string;
    inputSchema: JsonSchema;
    constraintsSchema?: JsonSchema;
    acceptanceCriteriaSchema?: JsonSchema;
    outputContractRef: string;
    riskProfile?: RiskProfileSpec;
    defaultWorkflowRef?: string;
    defaultSkillRefs?: SkillRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptanceCriteriaSchema` | 属性 | <code>acceptanceCriteriaSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `constraintsSchema` | 属性 | <code>constraintsSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultSkillRefs` | 属性 | <code>defaultSkillRefs?: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `defaultWorkflowRef` | 属性 | <code>defaultWorkflowRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContractRef` | 属性 | <code>outputContractRef: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `riskProfile` | 属性 | <code>riskProfile?: RiskProfileSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskType` | 属性 | <code>taskType: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowCompileOptions`

Workflow Compile Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowCompileOptions } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface WorkflowCompileOptions {
    workflowId?: string;
    /** @deprecated Harness FSM identity is framework-owned and cannot be overridden. */
    fsmProcessId?: string;
    agentRef?: SpecRef;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRef` | 属性 | <code>agentRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `fsmProcessId` | 属性 | <code>fsmProcessId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workflowId` | 属性 | <code>workflowId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowDependencySnapshot`

Workflow Dependency Snapshot 接口，共包含 23 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowDependencySnapshot } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface WorkflowDependencySnapshot {
    domainPackRefs: SpecRef[];
    taskSchemaRefs: SpecRef[];
    outputContractRefs: SpecRef[];
    sessionProfileRefs: SpecRef[];
    agentRefs: SpecRef[];
    skillRefs: SpecRef[];
    skillPolicyRefs: SpecRef[];
    toolRefs: SpecRef[];
    toolProfileRefs: SpecRef[];
    mcpProfileRefs: SpecRef[];
    memoryProfileRefs: SpecRef[];
    contextProfileRefs: SpecRef[];
    reasoningProfileRefs: SpecRef[];
    workspaceProfileRefs: SpecRef[];
    businessRuleRefs: SpecRef[];
    policyRefs: SpecRef[];
    evaluationRefs: SpecRef[];
    traceRefs: SpecRef[];
    modelProfileRefs: SpecRef[];
    replayRefs: SpecRef[];
    regressionRefs: SpecRef[];
    deploymentRefs: SpecRef[];
    dependencyHash: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentRefs` | 属性 | <code>agentRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `businessRuleRefs` | 属性 | <code>businessRuleRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextProfileRefs` | 属性 | <code>contextProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `dependencyHash` | 属性 | <code>dependencyHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deploymentRefs` | 属性 | <code>deploymentRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainPackRefs` | 属性 | <code>domainPackRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `mcpProfileRefs` | 属性 | <code>mcpProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryProfileRefs` | 属性 | <code>memoryProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `modelProfileRefs` | 属性 | <code>modelProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContractRefs` | 属性 | <code>outputContractRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfileRefs` | 属性 | <code>reasoningProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `regressionRefs` | 属性 | <code>regressionRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `replayRefs` | 属性 | <code>replayRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sessionProfileRefs` | 属性 | <code>sessionProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillPolicyRefs` | 属性 | <code>skillPolicyRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillRefs` | 属性 | <code>skillRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskSchemaRefs` | 属性 | <code>taskSchemaRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolProfileRefs` | 属性 | <code>toolProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolRefs` | 属性 | <code>toolRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `traceRefs` | 属性 | <code>traceRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `workspaceProfileRefs` | 属性 | <code>workspaceProfileRefs: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowSpec`

Workflow Spec 接口，共包含 12 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface WorkflowSpec extends VersionedSpec, SpecMetadata {
    initialState: string;
    terminalStates: string[];
    states: WorkflowStateSpec[];
    transitions: WorkflowTransitionSpec[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `initialState` | 属性 | <code>initialState: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `states` | 属性 | <code>states: WorkflowStateSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `terminalStates` | 属性 | <code>terminalStates: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `transitions` | 属性 | <code>transitions: WorkflowTransitionSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowStateBinding`

Workflow State Binding 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowStateBinding } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface WorkflowStateBinding {
    stateId: string;
    allowedTools: string[];
    allowedSkills: string[];
    requiredSkills: string[];
    allowedPromptRefs: DomainPromptRef[];
    requiredPromptRefs: DomainPromptRef[];
    allowedMCPProfiles: string[];
    memoryPolicyRef?: string;
    reasoningProfileRef?: string;
    policyRefs: string[];
    evaluationRefs: string[];
    toolProfileRefs?: SpecRef[];
    allowedToolRefs?: SpecRef[];
    deniedToolRefs?: SpecRef[];
    allowedMCPProfileRefs?: SpecRef[];
    humanApprovalPolicyRef?: SpecRef;
    permissionScopes?: string[];
    capabilityLoadPolicy?: 'eager' | 'lazy' | 'model_selected';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | 属性 | <code>allowedMCPProfileRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedMCPProfiles` | 属性 | <code>allowedMCPProfiles: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedToolRefs` | 属性 | <code>allowedToolRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityLoadPolicy` | 属性 | <code>capabilityLoadPolicy?: "eager" &#124; "lazy" &#124; "model_selected"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedToolRefs` | 属性 | <code>deniedToolRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanApprovalPolicyRef` | 属性 | <code>humanApprovalPolicyRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryPolicyRef` | 属性 | <code>memoryPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredPromptRefs` | 属性 | <code>requiredPromptRefs: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSkills` | 属性 | <code>requiredSkills: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stateId` | 属性 | <code>stateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolProfileRefs` | 属性 | <code>toolProfileRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowStateSpec`

Workflow State Spec 接口，共包含 33 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowStateSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface WorkflowStateSpec extends SpecMetadata {
    id: string;
    goal: string;
    inputContract?: JsonSchema;
    outputContract?: JsonSchema;
    allowedTools?: string[];
    allowedSkills?: string[];
    requiredSkills?: string[];
    allowedPromptRefs?: DomainPromptRef[];
    requiredPromptRefs?: DomainPromptRef[];
    allowedMCPProfiles?: string[];
    toolProfileRefs?: SpecRef[];
    allowedToolRefs?: SpecRef[];
    deniedToolRefs?: SpecRef[];
    allowedMCPProfileRefs?: SpecRef[];
    humanApprovalPolicyRef?: SpecRef;
    permissionScopes?: string[];
    capabilityLoadPolicy?: 'eager' | 'lazy' | 'model_selected';
    memoryPolicyRef?: string;
    reasoningProfileRef?: string;
    policyRefs?: string[];
    evaluationRefs?: string[];
    humanReviewRef?: string;
    humanReviewPolicy?: HumanReviewPolicySpec;
    timeoutMs?: number;
    timeoutPolicy?: TimeoutPolicySpec;
    retryPolicyRef?: string;
    retryPolicy?: RetryPolicySpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | 属性 | <code>allowedMCPProfileRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedMCPProfiles` | 属性 | <code>allowedMCPProfiles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedPromptRefs` | 属性 | <code>allowedPromptRefs?: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedToolRefs` | 属性 | <code>allowedToolRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedTools` | 属性 | <code>allowedTools?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `capabilityLoadPolicy` | 属性 | <code>capabilityLoadPolicy?: "eager" &#124; "lazy" &#124; "model_selected"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `deniedToolRefs` | 属性 | <code>deniedToolRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationRefs` | 属性 | <code>evaluationRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `goal` | 属性 | <code>goal: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanApprovalPolicyRef` | 属性 | <code>humanApprovalPolicyRef?: SpecRef</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanReviewPolicy` | 属性 | <code>humanReviewPolicy?: HumanReviewPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `humanReviewRef` | 属性 | <code>humanReviewRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputContract` | 属性 | <code>inputContract?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryPolicyRef` | 属性 | <code>memoryPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `permissionScopes` | 属性 | <code>permissionScopes?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reasoningProfileRef` | 属性 | <code>reasoningProfileRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredPromptRefs` | 属性 | <code>requiredPromptRefs?: DomainPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSkills` | 属性 | <code>requiredSkills?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryPolicy` | 属性 | <code>retryPolicy?: RetryPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `retryPolicyRef` | 属性 | <code>retryPolicyRef?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutMs` | 属性 | <code>timeoutMs?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `timeoutPolicy` | 属性 | <code>timeoutPolicy?: TimeoutPolicySpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `toolProfileRefs` | 属性 | <code>toolProfileRefs?: SpecRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `WorkflowTransitionSpec`

Workflow Transition Spec 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { WorkflowTransitionSpec } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export interface WorkflowTransitionSpec {
    from: string;
    to: string;
    guard?: string;
    description?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `from` | 属性 | <code>from: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `guard` | 属性 | <code>guard?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `to` | 属性 | <code>to: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `BusinessRuleEffect`

Business Rule Effect 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { BusinessRuleEffect } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type BusinessRuleEffect = 'constraint' | 'precondition' | 'postcondition' | 'guidance';
```

## `BusinessRuleScope`

Business Rule Scope 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { BusinessRuleScope } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type BusinessRuleScope = 'domain' | 'task' | 'workflow' | 'state' | 'tool' | 'memory' | 'output';
```

## `DomainAgenticReasoningMode`

Domain Agentic Reasoning Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { DomainAgenticReasoningMode } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type DomainAgenticReasoningMode = 'react' | 'fsm_react' | 'tot' | 'critique';
```

## `DomainPackOverlay`

Domain Pack Overlay 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { DomainPackOverlay } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type DomainPackOverlay = Partial<Omit<DomainPackSpec, 'id' | 'version' | 'name' | 'taskSchemas' | 'workflows'>> & {
    id?: string;
    version?: string;
    name?: string;
    taskSchemas?: TaskSchemaSpec[];
    workflows?: WorkflowSpec[];
    remove?: DomainPackOverlayRemovals;
};
```

## `DomainPackOverlayCollection`

Domain Pack Overlay Collection 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { DomainPackOverlayCollection } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type DomainPackOverlayCollection = 'taskSchemas' | 'outputContracts' | 'sessionProfiles' | 'workflows' | 'allowedSkills' | 'defaultSkills' | 'skillPolicies' | 'allowedPromptRefs' | 'defaultPromptRefs' | 'tools' | 'toolProfiles' | 'mcpProfiles' | 'memoryProfiles' | 'contextProfiles' | 'reasoningProfiles' | 'businessRules' | 'policies' | 'evaluationProfiles' | 'regressionCases';
```

## `DomainPackOverlayRemovals`

Domain Pack Overlay Removals 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { DomainPackOverlayRemovals } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type DomainPackOverlayRemovals = Partial<Record<DomainPackOverlayCollection, string[]>>;
```

## `DomainReasoningPersistence`

Domain Reasoning Persistence 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { DomainReasoningPersistence } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type DomainReasoningPersistence = 'summary_only' | 'events_only';
```

## `DomainThinkingMode`

Domain Thinking Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { DomainThinkingMode } from '@codesoul-co/hypha-domain';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### 声明

```text
export type DomainThinkingMode = 'none' | 'summary' | 'structured';
```
