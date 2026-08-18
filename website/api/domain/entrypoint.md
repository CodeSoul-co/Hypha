# `@codesoul-co/hypha-domain` / `index`

- Package index: [`@codesoul-co/hypha-domain`](/api/domain)
- Source: [`packages/domain/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)
- Exports: **80**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-domain`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 33 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 4 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 12 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 31 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { businessRuleEffectSchema } from '@codesoul-co/hypha-domain';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = businessRuleEffectSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DomainCompiler` | class | <code>new DomainCompiler(): DomainCompiler</code> | Domain Compiler class with 2 public constructor or member entries; its exact declarations are listed below. |
| `DomainPackRegistry` | class | <code>new DomainPackRegistry(): DomainPackRegistry</code> | Domain Pack Registry class with 6 public constructor or member entries; its exact declarations are listed below. |
| `LocalDomainPackLoader` | class | <code>new LocalDomainPackLoader(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | Local Domain Pack Loader class with 3 public constructor or member entries; its exact declarations are listed below. |
| `WorkflowCompiler` | class | <code>new WorkflowCompiler(): WorkflowCompiler</code> | Workflow Compiler class with 2 public constructor or member entries; its exact declarations are listed below. |
| `businessRuleEffectSchema` | constant | <code>const businessRuleEffectSchema: z.ZodEnum&lt;["constraint", "precondition", "postcondition", "guidance"]&gt;</code> | Runtime schema for Business Rule Effect. |
| `businessRuleScopeSchema` | constant | <code>const businessRuleScopeSchema: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "output"]&gt;</code> | Runtime schema for Business Rule Scope. |
| `businessRuleSpecDefinition` | constant | <code>const businessRuleSpecDefinition: SpecSchemaDefinition&lt;BusinessRuleSpec&gt;</code> | Runtime validation entrypoint for the Business Rule spec, combining its parser, example and JSON Schema. |
| `businessRuleSpecExample` | constant | <code>const businessRuleSpecExample: BusinessRuleSpec</code> | Valid example value for Business Rule Spec. |
| `businessRuleSpecJsonSchema` | constant | <code>const businessRuleSpecJsonSchema: JsonSchema</code> | JSON Schema for Business Rule Spec. |
| `businessRuleSpecSchema` | constant | <code>const businessRuleSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { scope: z.ZodEnum&lt;["domain", "task", "workflow", "state", "tool", "memory", "outp...</code> | Runtime schema for Business Rule Spec. |
| `DOMAIN_COMPILER_VERSION` | constant | <code>const DOMAIN_COMPILER_VERSION: "1.0.0"</code> | DOMAIN COMPILER VERSION constant exported by the `index` module. |
| `domainAgenticReasoningModeSchema` | constant | <code>const domainAgenticReasoningModeSchema: z.ZodEnum&lt;["react", "fsm_react", "tot", "critique"]&gt;</code> | Runtime schema for Domain Agentic Reasoning Mode. |
| `domainPackSpecDefinition` | constant | <code>const domainPackSpecDefinition: SpecSchemaDefinition&lt;DomainPackSpec&gt;</code> | Runtime validation entrypoint for the Domain Pack spec, combining its parser, example and JSON Schema. |
| `domainPackSpecExample` | constant | <code>const domainPackSpecExample: DomainPackSpec</code> | Valid example value for Domain Pack Spec. |
| `domainPackSpecJsonSchema` | constant | <code>const domainPackSpecJsonSchema: JsonSchema</code> | JSON Schema for Domain Pack Spec. |
| `domainPackSpecSchema` | constant | <code>const domainPackSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { name: z.ZodString; taskSchemas: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;...</code> | Runtime schema for Domain Pack Spec. |
| `domainPromptRefSchema` | constant | <code>const domainPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?: string &#124; undefined; required?: boolean &#124; undefined; priority?: number &#124; undefined; }, { id: string; version?: string &#124;...</code> | Runtime schema for Domain Prompt Ref. |
| `domainReasoningPersistenceSchema` | constant | <code>const domainReasoningPersistenceSchema: z.ZodEnum&lt;["summary_only", "events_only"]&gt;</code> | Runtime schema for Domain Reasoning Persistence. |
| `domainSpecDefinitions` | constant | <code>const domainSpecDefinitions: readonly [SpecSchemaDefinition&lt;WorkflowSpec&gt;, SpecSchemaDefinition&lt;ReasoningSpec&gt;, SpecSchemaDefinition&lt;BusinessRuleSpec&gt;, SpecSchemaDefinition&lt;DomainPackSpec&gt;]</code> | Domain Spec Definitions constant exported by the `index` module. |
| `domainSpecJsonSchemas` | constant | <code>const domainSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Domain Spec JSON Schemas constant exported by the `index` module. |
| `domainThinkingModeSchema` | constant | <code>const domainThinkingModeSchema: z.ZodEnum&lt;["none", "summary", "structured"]&gt;</code> | Runtime schema for Domain Thinking Mode. |
| `reasoningSpecDefinition` | constant | <code>const reasoningSpecDefinition: SpecSchemaDefinition&lt;ReasoningSpec&gt;</code> | Runtime validation entrypoint for the Reasoning spec, combining its parser, example and JSON Schema. |
| `reasoningSpecExample` | constant | <code>const reasoningSpecExample: ReasoningSpec</code> | Valid example value for Reasoning Spec. |
| `reasoningSpecJsonSchema` | constant | <code>const reasoningSpecJsonSchema: JsonSchema</code> | JSON Schema for Reasoning Spec. |
| `reasoningSpecSchema` | constant | <code>const reasoningSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { thinkingMode: z.ZodEnum&lt;["none", "summary", "structured"]&gt;; agenticMode: z.ZodEnum&lt;...</code> | Runtime schema for Reasoning Spec. |
| `riskProfileSpecSchema` | constant | <code>const riskProfileSpecSchema: z.ZodObject&lt;{ defaultRiskLevel: z.ZodEnum&lt;["low", "medium", "high", "critical"]&gt;; escalationPolicyRef: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }, { defaultRiskLevel: "low" &#124; "medium" &#124; "high" &#124; "critical"; escalationPolicyRef?: string &#124; undefined; }&gt;</code> | Runtime schema for Risk Profile Spec. |
| `sessionProfileSpecSchema` | constant | <code>const sessionProfileSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { metadataSchema: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;...</code> | Runtime schema for Session Profile Spec. |
| `skillPolicyBindingSchema` | constant | <code>const skillPolicyBindingSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { skillRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; ...</code> | Runtime schema for Skill Policy Binding. |
| `taskSchemaSpecSchema` | constant | <code>const taskSchemaSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { taskType: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema...</code> | Runtime schema for Task Schema Spec. |
| `workflowSpecDefinition` | constant | <code>const workflowSpecDefinition: SpecSchemaDefinition&lt;WorkflowSpec&gt;</code> | Runtime validation entrypoint for the Workflow spec, combining its parser, example and JSON Schema. |
| `workflowSpecExample` | constant | <code>const workflowSpecExample: WorkflowSpec</code> | Valid example value for Workflow Spec. |
| `workflowSpecJsonSchema` | constant | <code>const workflowSpecJsonSchema: JsonSchema</code> | JSON Schema for Workflow Spec. |
| `workflowSpecSchema` | constant | <code>const workflowSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { initialState: z.ZodString; terminalStates: z.ZodArray&lt;z.ZodString, "many"&gt;; states: ...</code> | Runtime schema for Workflow Spec. |
| `workflowStateSpecSchema` | constant | <code>const workflowStateSpecSchema: z.ZodObject&lt;{ name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { id: z.ZodString; goal: z.ZodString; inputContract: z.ZodOptional&lt;z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;&gt;; outputCon...</code> | Runtime schema for Workflow State Spec. |
| `workflowTransitionSpecSchema` | constant | <code>const workflowTransitionSpecSchema: z.ZodObject&lt;{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }, { from: string; to: string; description?: string &#124; undefined; guard?: string &#124; undefined; }&gt;</code> | Runtime schema for Workflow Transition Spec. |
| `applyDomainAgentPatch` | function | <code>applyDomainAgentPatch&lt;TAgent extends DomainAgentPatchTarget&gt;(agent: TAgent, patch: DomainAgentPatch): TAgent</code> | Apply Domain Agent Patch function with 1 public call signature; parameters and return types are listed below. |
| `compileDomainPackToHarnessedSystem` | function | <code>compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | Compile Domain Pack To Harnessed System function with 1 public call signature; parameters and return types are listed below. |
| `compileWorkflowToFSM` | function | <code>compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | Compile Workflow To FSM function with 1 public call signature; parameters and return types are listed below. |
| `createWorkflowDependencySnapshot` | function | <code>createWorkflowDependencySnapshot(input: Omit&lt;WorkflowDependencySnapshot, "dependencyHash"&gt;): WorkflowDependencySnapshot</code> | Create Workflow Dependency Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `extendDomainPack` | function | <code>extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec</code> | Extend Domain Pack function with 1 public call signature; parameters and return types are listed below. |
| `initializeDomainSession` | function | <code>initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization</code> | Initialize Domain Session function with 1 public call signature; parameters and return types are listed below. |
| `listLocalDomainPackFiles` | function | <code>listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise&lt;string[]&gt;</code> | List Local Domain Pack Files function with 1 public call signature; parameters and return types are listed below. |
| `loadDomainPackFile` | function | <code>loadDomainPackFile(filePath: string): Promise&lt;DomainPackSpec&gt;</code> | Load Domain Pack File function with 1 public call signature; parameters and return types are listed below. |
| `parseDomainPackDocument` | function | <code>parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec</code> | Parse Domain Pack Document function with 1 public call signature; parameters and return types are listed below. |
| `resolveWorkflowToolExecutionScope` | function | <code>resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope</code> | Resolve Workflow Tool Execution Scope function with 1 public call signature; parameters and return types are listed below. |
| `validateDomainPackSpec` | function | <code>validateDomainPackSpec(input: unknown): DomainPackSpec</code> | Validate Domain Pack Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateWorkflowSpec` | function | <code>validateWorkflowSpec(input: unknown): WorkflowSpec</code> | Validate Workflow Spec function with 1 public call signature; parameters and return types are listed below. |
| `BusinessRuleSpec` | interface | <code>interface BusinessRuleSpec extends VersionedSpec, SpecMetadata</code> | Business Rule Spec interface with 17 public fields or methods. |
| `DomainAgentPatch` | interface | <code>interface DomainAgentPatch</code> | Domain Agent Patch interface with 9 public fields or methods. |
| `DomainAgentPatchTarget` | interface | <code>interface DomainAgentPatchTarget</code> | Domain Agent Patch Target interface with 12 public fields or methods. |
| `DomainBindingResolution` | interface | <code>interface DomainBindingResolution</code> | Domain Binding Resolution interface with 23 public fields or methods. |
| `DomainCompilationAudit` | interface | <code>interface DomainCompilationAudit</code> | Domain Compilation Audit interface with 9 public fields or methods. |
| `DomainCompilationResult` | interface | <code>interface DomainCompilationResult</code> | Domain Compilation Result interface with 11 public fields or methods. |
| `DomainCompileOptions` | interface | <code>interface DomainCompileOptions</code> | Domain Compile Options interface with 20 public fields or methods. |
| `DomainPackRegistryEntry` | interface | <code>interface DomainPackRegistryEntry</code> | Domain Pack Registry Entry interface with 2 public fields or methods. |
| `DomainPackSpec` | interface | <code>interface DomainPackSpec extends VersionedSpec, SpecMetadata</code> | Domain Pack Spec interface with 31 public fields or methods. |
| `DomainPromptRef` | interface | <code>interface DomainPromptRef extends SpecRef</code> | Domain Prompt Ref interface with 5 public fields or methods. |
| `DomainSessionInitialization` | interface | <code>interface DomainSessionInitialization</code> | Domain Session Initialization interface with 10 public fields or methods. |
| `DomainSessionInitOptions` | interface | <code>interface DomainSessionInitOptions</code> | Domain Session Init Options interface with 2 public fields or methods. |
| `LocalDomainPackLoaderOptions` | interface | <code>interface LocalDomainPackLoaderOptions</code> | Local Domain Pack Loader Options interface with 3 public fields or methods. |
| `ReasoningSpec` | interface | <code>interface ReasoningSpec extends VersionedSpec, SpecMetadata</code> | Reasoning Spec interface with 16 public fields or methods. |
| `RiskProfileSpec` | interface | <code>interface RiskProfileSpec</code> | Risk Profile Spec interface with 2 public fields or methods. |
| `SessionProfileSpec` | interface | <code>interface SessionProfileSpec extends VersionedSpec, SpecMetadata</code> | Session Profile Spec interface with 17 public fields or methods. |
| `SkillPolicyBinding` | interface | <code>interface SkillPolicyBinding extends VersionedSpec, SpecMetadata</code> | Skill Policy Binding interface with 14 public fields or methods. |
| `TaskInstance` | interface | <code>interface TaskInstance</code> | Task Instance interface with 8 public fields or methods. |
| `TaskSchemaSpec` | interface | <code>interface TaskSchemaSpec extends VersionedSpec, SpecMetadata</code> | Task Schema Spec interface with 16 public fields or methods. |
| `WorkflowCompileOptions` | interface | <code>interface WorkflowCompileOptions</code> | Workflow Compile Options interface with 3 public fields or methods. |
| `WorkflowDependencySnapshot` | interface | <code>interface WorkflowDependencySnapshot</code> | Workflow Dependency Snapshot interface with 23 public fields or methods. |
| `WorkflowSpec` | interface | <code>interface WorkflowSpec extends VersionedSpec, SpecMetadata</code> | Workflow Spec interface with 12 public fields or methods. |
| `WorkflowStateBinding` | interface | <code>interface WorkflowStateBinding</code> | Workflow State Binding interface with 18 public fields or methods. |
| `WorkflowStateSpec` | interface | <code>interface WorkflowStateSpec extends SpecMetadata</code> | Workflow State Spec interface with 33 public fields or methods. |
| `WorkflowTransitionSpec` | interface | <code>interface WorkflowTransitionSpec</code> | Workflow Transition Spec interface with 4 public fields or methods. |
| `BusinessRuleEffect` | type | <code>type BusinessRuleEffect = 'constraint' &#124; 'precondition' &#124; 'postcondition' &#124; 'guidance'</code> | Public type alias for Business Rule Effect; the declaration contains its complete type expression. |
| `BusinessRuleScope` | type | <code>type BusinessRuleScope = 'domain' &#124; 'task' &#124; 'workflow' &#124; 'state' &#124; 'tool' &#124; 'memory' &#124; 'output'</code> | Public type alias for Business Rule Scope; the declaration contains its complete type expression. |
| `DomainAgenticReasoningMode` | type | <code>type DomainAgenticReasoningMode = 'react' &#124; 'fsm_react' &#124; 'tot' &#124; 'critique'</code> | Public type alias for Domain Agentic Reasoning Mode; the declaration contains its complete type expression. |
| `DomainPackOverlay` | type | <code>type DomainPackOverlay = Partial&lt;Omit&lt;DomainPackSpec, 'id' &#124; 'version' &#124; 'name' &#124; 'taskSchemas' &#124; 'workflows'&gt;&gt; &amp; { id?: string; version?: string; name?: string; taskSchemas?: TaskSchemaSpec[]; workflows?: WorkflowSpec[]; remove?: DomainPackOverlayRemovals; }</code> | Public type alias for Domain Pack Overlay; the declaration contains its complete type expression. |
| `DomainPackOverlayCollection` | type | <code>type DomainPackOverlayCollection = 'taskSchemas' &#124; 'outputContracts' &#124; 'sessionProfiles' &#124; 'workflows' &#124; 'allowedSkills' &#124; 'defaultSkills' &#124; 'skillPolicies' &#124; 'allowedPromptRefs' &#124; 'defaultPromptRefs' &#124; 'tools' &#124; 'toolProfiles' &#124; 'mcpProfiles' &#124; 'memoryProfiles' &#124; 'contextProfiles' &#124; 'reasoningProfiles' &#124; 'businessRules' &#124; 'policies' &#124; 'evaluationProfiles' &#124; 'regressionCases'</code> | Public type alias for Domain Pack Overlay Collection; the declaration contains its complete type expression. |
| `DomainPackOverlayRemovals` | type | <code>type DomainPackOverlayRemovals = Partial&lt;Record&lt;DomainPackOverlayCollection, string[]&gt;&gt;</code> | Public type alias for Domain Pack Overlay Removals; the declaration contains its complete type expression. |
| `DomainReasoningPersistence` | type | <code>type DomainReasoningPersistence = 'summary_only' &#124; 'events_only'</code> | Public type alias for Domain Reasoning Persistence; the declaration contains its complete type expression. |
| `DomainThinkingMode` | type | <code>type DomainThinkingMode = 'none' &#124; 'summary' &#124; 'structured'</code> | Public type alias for Domain Thinking Mode; the declaration contains its complete type expression. |

## `DomainCompiler`

Domain Compiler class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DomainCompiler } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare class DomainCompiler {
    compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile(domainPack: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): DomainCompiler</code> | Creates an instance of this class. |

## `DomainPackRegistry`

Domain Pack Registry class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DomainPackRegistry } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare class DomainPackRegistry {
    register(spec: DomainPackSpec, source?: string): DomainPackSpec;
    registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[];
    resolve(id: string, version?: string): DomainPackRegistryEntry | undefined;
    get(id: string, version?: string): DomainPackSpec | null;
    list(): DomainPackRegistryEntry[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): DomainPackRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string, version?: string): DomainPackSpec &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): DomainPackRegistryEntry[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(spec: DomainPackSpec, source?: string): DomainPackSpec</code> | Public method; parameters and return type are shown in the signature. |
| `registerMany` | method | <code>registerMany(entries: DomainPackRegistryEntry[]): DomainPackSpec[]</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(id: string, version?: string): DomainPackRegistryEntry &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |

## `LocalDomainPackLoader`

Local Domain Pack Loader class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalDomainPackLoader } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare class LocalDomainPackLoader {
    constructor(options: LocalDomainPackLoaderOptions);
    load(): Promise<DomainPackRegistryEntry[]>;
    loadInto(registry: DomainPackRegistry): Promise<DomainPackSpec[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalDomainPackLoaderOptions): LocalDomainPackLoader</code> | Creates an instance of this class. |
| `load` | method | <code>load(): Promise&lt;DomainPackRegistryEntry[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `loadInto` | method | <code>loadInto(registry: DomainPackRegistry): Promise&lt;DomainPackSpec[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `WorkflowCompiler`

Workflow Compiler class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { WorkflowCompiler } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare class WorkflowCompiler {
    compile(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `compile` | method | <code>compile(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(): WorkflowCompiler</code> | Creates an instance of this class. |

## `businessRuleEffectSchema`

Runtime schema for Business Rule Effect.

- Kind: constant
- Import: `import { businessRuleEffectSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const businessRuleEffectSchema: z.ZodEnum<["constraint", "precondition", "postcondition", "guidance"]>;
```

## `businessRuleScopeSchema`

Runtime schema for Business Rule Scope.

- Kind: constant
- Import: `import { businessRuleScopeSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const businessRuleScopeSchema: z.ZodEnum<["domain", "task", "workflow", "state", "tool", "memory", "output"]>;
```

## `businessRuleSpecDefinition`

Runtime validation entrypoint for the Business Rule spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { businessRuleSpecDefinition } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const businessRuleSpecDefinition: SpecSchemaDefinition<BusinessRuleSpec>;
```

## `businessRuleSpecExample`

Valid example value for Business Rule Spec.

- Kind: constant
- Import: `import { businessRuleSpecExample } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const businessRuleSpecExample: BusinessRuleSpec;
```

## `businessRuleSpecJsonSchema`

JSON Schema for Business Rule Spec.

- Kind: constant
- Import: `import { businessRuleSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const businessRuleSpecJsonSchema: JsonSchema;
```

## `businessRuleSpecSchema`

Runtime schema for Business Rule Spec.

- Kind: constant
- Import: `import { businessRuleSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const businessRuleSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { scope: z.ZodEnum<["domain", "task", "workflow", "state", "tool", "memory", "output"]>; effect: z.ZodEnum<["constraint", "precondition", "postcondition", "guidance"]>; expression: z.ZodOptional<z.ZodString>; inputSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; outputContractRef: z.ZodOptional<z.ZodString>; policyRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; evaluationRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; severity: z.ZodOptional<z.ZodEnum<["low", "medium", "high", "critical"]>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; version: string; scope: "domain" | "task" | "workflow" | "state" | "tool" | "memory" | "output"; effect: "constraint" | "precondition" | "postcondition" | "guidance"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; expression?: string | undefined; inputSchema?: JsonSchema | undefined; outputContractRef?: string | undefined; policyRefs?: string[] | undefined; evaluationRefs?: string[] | undefined; severity?: "low" | "medium" | "high" | "critical" | undefined; }, { id: string; version: string; scope: "domain" | "task" | "workflow" | "state" | "tool" | "memory" | "output"; effect: "constraint" | "precondition" | "postcondition" | "guidance"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; expression?: string | undefined; inputSchema?: JsonSchema | undefined; outputContractRef?: string | undefined; policyRefs?: string[] | undefined; evaluationRefs?: string[] | undefined; severity?: "low" | "medium" | "high" | "critical" | undefined; }>;
```

## `DOMAIN_COMPILER_VERSION`

DOMAIN COMPILER VERSION constant exported by the `index` module.

- Kind: constant
- Import: `import { DOMAIN_COMPILER_VERSION } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const DOMAIN_COMPILER_VERSION: "1.0.0";
```

## `domainAgenticReasoningModeSchema`

Runtime schema for Domain Agentic Reasoning Mode.

- Kind: constant
- Import: `import { domainAgenticReasoningModeSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainAgenticReasoningModeSchema: z.ZodEnum<["react", "fsm_react", "tot", "critique"]>;
```

## `domainPackSpecDefinition`

Runtime validation entrypoint for the Domain Pack spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { domainPackSpecDefinition } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainPackSpecDefinition: SpecSchemaDefinition<DomainPackSpec>;
```

## `domainPackSpecExample`

Valid example value for Domain Pack Spec.

- Kind: constant
- Import: `import { domainPackSpecExample } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainPackSpecExample: DomainPackSpec;
```

## `domainPackSpecJsonSchema`

JSON Schema for Domain Pack Spec.

- Kind: constant
- Import: `import { domainPackSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainPackSpecJsonSchema: JsonSchema;
```

## `domainPackSpecSchema`

Runtime schema for Domain Pack Spec.

- Kind: constant
- Import: `import { domainPackSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const domainPackSpecSchema: (typeof import('@codesoul-co/hypha-domain'))['domainPackSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `domainPromptRefSchema`

Runtime schema for Domain Prompt Ref.

- Kind: constant
- Import: `import { domainPromptRefSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainPromptRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; } & { required: z.ZodOptional<z.ZodBoolean>; priority: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; revision?: string | undefined; required?: boolean | undefined; priority?: number | undefined; }, { id: string; version?: string | undefined; revision?: string | undefined; required?: boolean | undefined; priority?: number | undefined; }>;
```

## `domainReasoningPersistenceSchema`

Runtime schema for Domain Reasoning Persistence.

- Kind: constant
- Import: `import { domainReasoningPersistenceSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainReasoningPersistenceSchema: z.ZodEnum<["summary_only", "events_only"]>;
```

## `domainSpecDefinitions`

Domain Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { domainSpecDefinitions } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainSpecDefinitions: readonly [SpecSchemaDefinition<WorkflowSpec>, SpecSchemaDefinition<ReasoningSpec>, SpecSchemaDefinition<BusinessRuleSpec>, SpecSchemaDefinition<DomainPackSpec>];
```

## `domainSpecJsonSchemas`

Domain Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { domainSpecJsonSchemas } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainSpecJsonSchemas: Record<string, JsonSchema>;
```

## `domainThinkingModeSchema`

Runtime schema for Domain Thinking Mode.

- Kind: constant
- Import: `import { domainThinkingModeSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const domainThinkingModeSchema: z.ZodEnum<["none", "summary", "structured"]>;
```

## `reasoningSpecDefinition`

Runtime validation entrypoint for the Reasoning spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { reasoningSpecDefinition } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const reasoningSpecDefinition: SpecSchemaDefinition<ReasoningSpec>;
```

## `reasoningSpecExample`

Valid example value for Reasoning Spec.

- Kind: constant
- Import: `import { reasoningSpecExample } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const reasoningSpecExample: ReasoningSpec;
```

## `reasoningSpecJsonSchema`

JSON Schema for Reasoning Spec.

- Kind: constant
- Import: `import { reasoningSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const reasoningSpecJsonSchema: JsonSchema;
```

## `reasoningSpecSchema`

Runtime schema for Reasoning Spec.

- Kind: constant
- Import: `import { reasoningSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const reasoningSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { thinkingMode: z.ZodEnum<["none", "summary", "structured"]>; agenticMode: z.ZodEnum<["react", "fsm_react", "tot", "critique"]>; maxSteps: z.ZodOptional<z.ZodNumber>; persist: z.ZodOptional<z.ZodEnum<["summary_only", "events_only"]>>; plannerRef: z.ZodOptional<z.ZodString>; reasonerRef: z.ZodOptional<z.ZodString>; metadataSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; version: string; thinkingMode: "none" | "summary" | "structured"; agenticMode: "react" | "fsm_react" | "tot" | "critique"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadataSchema?: JsonSchema | undefined; metadata?: Record<string, unknown> | undefined; }, { id: string; version: string; thinkingMode: "none" | "summary" | "structured"; agenticMode: "react" | "fsm_react" | "tot" | "critique"; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; maxSteps?: number | undefined; persist?: "summary_only" | "events_only" | undefined; plannerRef?: string | undefined; reasonerRef?: string | undefined; metadataSchema?: JsonSchema | undefined; metadata?: Record<string, unknown> | undefined; }>;
```

## `riskProfileSpecSchema`

Runtime schema for Risk Profile Spec.

- Kind: constant
- Import: `import { riskProfileSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const riskProfileSpecSchema: z.ZodObject<{ defaultRiskLevel: z.ZodEnum<["low", "medium", "high", "critical"]>; escalationPolicyRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }>;
```

## `sessionProfileSpecSchema`

Runtime schema for Session Profile Spec.

- Kind: constant
- Import: `import { sessionProfileSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const sessionProfileSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { metadataSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; defaultMetadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; defaultMemoryProfileRef: z.ZodOptional<z.ZodString>; defaultContextProfileRef: z.ZodOptional<z.ZodString>; defaultReasoningProfileRef: z.ZodOptional<z.ZodString>; defaultToolProfileRef: z.ZodOptional<z.ZodString>; defaultMCPProfileRef: z.ZodOptional<z.ZodString>; defaultSkillPolicyRef: z.ZodOptional<z.ZodString>; defaultPolicyRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadataSchema?: JsonSchema | undefined; defaultMetadata?: Record<string, unknown> | undefined; defaultMemoryProfileRef?: string | undefined; defaultContextProfileRef?: string | undefined; defaultReasoningProfileRef?: string | undefined; defaultToolProfileRef?: string | undefined; defaultMCPProfileRef?: string | undefined; defaultSkillPolicyRef?: string | undefined; defaultPolicyRefs?: string[] | undefined; }, { id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadataSchema?: JsonSchema | undefined; defaultMetadata?: Record<string, unknown> | undefined; defaultMemoryProfileRef?: string | undefined; defaultContextProfileRef?: string | undefined; defaultReasoningProfileRef?: string | undefined; defaultToolProfileRef?: string | undefined; defaultMCPProfileRef?: string | undefined; defaultSkillPolicyRef?: string | undefined; defaultPolicyRefs?: string[] | undefined; }>;
```

## `skillPolicyBindingSchema`

Runtime schema for Skill Policy Binding.

- Kind: constant
- Import: `import { skillPolicyBindingSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const skillPolicyBindingSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { skillRef: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>; policyRefs: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; allowedTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; requiredTools: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; trustLevel: z.ZodOptional<z.ZodEnum<["trusted", "reviewed", "untrusted"]>>; metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>; }, "strip", z.ZodTypeAny, { id: string; version: string; skillRef: { id: string; revision?: string | undefined; version?: string | undefined; }; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; policyRefs?: string[] | undefined; allowedTools?: string[] | undefined; requiredTools?: string[] | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }, { id: string; version: string; skillRef: { id: string; revision?: string | undefined; version?: string | undefined; }; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; metadata?: Record<string, unknown> | undefined; policyRefs?: string[] | undefined; allowedTools?: string[] | undefined; requiredTools?: string[] | undefined; trustLevel?: "trusted" | "reviewed" | "untrusted" | undefined; }>;
```

## `taskSchemaSpecSchema`

Runtime schema for Task Schema Spec.

- Kind: constant
- Import: `import { taskSchemaSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const taskSchemaSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { taskType: z.ZodString; inputSchema: z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>; constraintsSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; acceptanceCriteriaSchema: z.ZodOptional<z.ZodType<JsonSchema, z.ZodTypeDef, JsonSchema>>; outputContractRef: z.ZodString; riskProfile: z.ZodOptional<z.ZodObject<{ defaultRiskLevel: z.ZodEnum<["low", "medium", "high", "critical"]>; escalationPolicyRef: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }, { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; }>>; defaultWorkflowRef: z.ZodOptional<z.ZodString>; defaultSkillRefs: z.ZodOptional<z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; revision: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; revision?: string | undefined; version?: string | undefined; }, { id: string; revision?: string | undefined; version?: string | undefined; }>, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; inputSchema: JsonSchema; outputContractRef: string; taskType: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; constraintsSchema?: JsonSchema | undefined; acceptanceCriteriaSchema?: JsonSchema | undefined; riskProfile?: { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; } | undefined; defaultWorkflowRef?: string | undefined; defaultSkillRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }, { id: string; version: string; inputSchema: JsonSchema; outputContractRef: string; taskType: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; constraintsSchema?: JsonSchema | undefined; acceptanceCriteriaSchema?: JsonSchema | undefined; riskProfile?: { defaultRiskLevel: "low" | "medium" | "high" | "critical"; escalationPolicyRef?: string | undefined; } | undefined; defaultWorkflowRef?: string | undefined; defaultSkillRefs?: { id: string; revision?: string | undefined; version?: string | undefined; }[] | undefined; }>;
```

## `workflowSpecDefinition`

Runtime validation entrypoint for the Workflow spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { workflowSpecDefinition } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const workflowSpecDefinition: SpecSchemaDefinition<WorkflowSpec>;
```

## `workflowSpecExample`

Valid example value for Workflow Spec.

- Kind: constant
- Import: `import { workflowSpecExample } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const workflowSpecExample: WorkflowSpec;
```

## `workflowSpecJsonSchema`

JSON Schema for Workflow Spec.

- Kind: constant
- Import: `import { workflowSpecJsonSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const workflowSpecJsonSchema: JsonSchema;
```

## `workflowSpecSchema`

Runtime schema for Workflow Spec.

- Kind: constant
- Import: `import { workflowSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workflowSpecSchema: (typeof import('@codesoul-co/hypha-domain'))['workflowSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `workflowStateSpecSchema`

Runtime schema for Workflow State Spec.

- Kind: constant
- Import: `import { workflowStateSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const workflowStateSpecSchema: (typeof import('@codesoul-co/hypha-domain'))['workflowStateSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `workflowTransitionSpecSchema`

Runtime schema for Workflow Transition Spec.

- Kind: constant
- Import: `import { workflowTransitionSpecSchema } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare const workflowTransitionSpecSchema: z.ZodObject<{ from: z.ZodString; to: z.ZodString; guard: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { from: string; to: string; description?: string | undefined; guard?: string | undefined; }, { from: string; to: string; description?: string | undefined; guard?: string | undefined; }>;
```

## `applyDomainAgentPatch`

Apply Domain Agent Patch function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { applyDomainAgentPatch } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function applyDomainAgentPatch<TAgent extends DomainAgentPatchTarget>(agent: TAgent, patch: DomainAgentPatch): TAgent;
```

### Call signature

```text
applyDomainAgentPatch<TAgent extends DomainAgentPatchTarget>(agent: TAgent, patch: DomainAgentPatch): TAgent
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `agent` | <code>TAgent</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `patch` | <code>DomainAgentPatch</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `TAgent`
- Description: The return contract is defined by the type shown above.

## `compileDomainPackToHarnessedSystem`

Compile Domain Pack To Harnessed System function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { compileDomainPackToHarnessedSystem } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult;
```

### Call signature

```text
compileDomainPackToHarnessedSystem(input: DomainPackSpec, options: DomainCompileOptions): DomainCompilationResult
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>DomainPackSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>DomainCompileOptions</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainCompilationResult`
- Description: The return contract is defined by the type shown above.

## `compileWorkflowToFSM`

Compile Workflow To FSM function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { compileWorkflowToFSM } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec;
```

### Call signature

```text
compileWorkflowToFSM(domainPack: DomainPackSpec, options?: WorkflowCompileOptions): FSMProcessSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `domainPack` | <code>DomainPackSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>WorkflowCompileOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `FSMProcessSpec`
- Description: The return contract is defined by the type shown above.

## `createWorkflowDependencySnapshot`

Create Workflow Dependency Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createWorkflowDependencySnapshot } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function createWorkflowDependencySnapshot(input: Omit<WorkflowDependencySnapshot, 'dependencyHash'>): WorkflowDependencySnapshot;
```

### Call signature

```text
createWorkflowDependencySnapshot(input: Omit<WorkflowDependencySnapshot, "dependencyHash">): WorkflowDependencySnapshot
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>Omit&lt;WorkflowDependencySnapshot, "dependencyHash"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkflowDependencySnapshot`
- Description: The return contract is defined by the type shown above.

## `extendDomainPack`

Extend Domain Pack function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { extendDomainPack } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec;
```

### Call signature

```text
extendDomainPack(base: DomainPackSpec, overlay: DomainPackOverlay): DomainPackSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `base` | <code>DomainPackSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `overlay` | <code>DomainPackOverlay</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainPackSpec`
- Description: The return contract is defined by the type shown above.

## `initializeDomainSession`

Initialize Domain Session function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { initializeDomainSession } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization;
```

### Call signature

```text
initializeDomainSession(domainPack: DomainPackSpec, options?: DomainSessionInitOptions): DomainSessionInitialization
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `domainPack` | <code>DomainPackSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `options` | <code>DomainSessionInitOptions</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainSessionInitialization`
- Description: The return contract is defined by the type shown above.

## `listLocalDomainPackFiles`

List Local Domain Pack Files function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { listLocalDomainPackFiles } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise<string[]>;
```

### Call signature

```text
listLocalDomainPackFiles(directory: string, recursive?: boolean, extensions?: string[]): Promise<string[]>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directory` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `recursive` | <code>boolean</code> | No | Optional parameter; accepted values are defined by the type column. |
| `extensions` | <code>string[]</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<string[]>`
- Description: The return contract is defined by the type shown above.

## `loadDomainPackFile`

Load Domain Pack File function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { loadDomainPackFile } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function loadDomainPackFile(filePath: string): Promise<DomainPackSpec>;
```

### Call signature

```text
loadDomainPackFile(filePath: string): Promise<DomainPackSpec>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filePath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<DomainPackSpec>`
- Description: The return contract is defined by the type shown above.

## `parseDomainPackDocument`

Parse Domain Pack Document function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseDomainPackDocument } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec;
```

### Call signature

```text
parseDomainPackDocument(raw: string, filePath?: string): DomainPackSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `raw` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `filePath` | <code>string</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainPackSpec`
- Description: The return contract is defined by the type shown above.

## `resolveWorkflowToolExecutionScope`

Resolve Workflow Tool Execution Scope function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { resolveWorkflowToolExecutionScope } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope;
```

### Call signature

```text
resolveWorkflowToolExecutionScope(workflowStates: WorkflowStateBinding[], stateId: string): ToolExecutionScope
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `workflowStates` | <code>WorkflowStateBinding[]</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `stateId` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolExecutionScope`
- Description: The return contract is defined by the type shown above.

## `validateDomainPackSpec`

Validate Domain Pack Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateDomainPackSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function validateDomainPackSpec(input: unknown): DomainPackSpec;
```

### Call signature

```text
validateDomainPackSpec(input: unknown): DomainPackSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `DomainPackSpec`
- Description: The return contract is defined by the type shown above.

## `validateWorkflowSpec`

Validate Workflow Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateWorkflowSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export declare function validateWorkflowSpec(input: unknown): WorkflowSpec;
```

### Call signature

```text
validateWorkflowSpec(input: unknown): WorkflowSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `WorkflowSpec`
- Description: The return contract is defined by the type shown above.

## `BusinessRuleSpec`

Business Rule Spec interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { BusinessRuleSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effect` | property | <code>effect: BusinessRuleEffect</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationRefs` | property | <code>evaluationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expression` | property | <code>expression?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContractRef` | property | <code>outputContractRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: BusinessRuleScope</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `severity` | property | <code>severity?: RiskLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainAgentPatch`

Domain Agent Patch interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { DomainAgentPatch } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextSpecRef` | property | <code>contextSpecRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfileRef` | property | <code>mcpProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptRefs` | property | <code>promptRefs: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRefs` | property | <code>skillRefs: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainAgentPatchTarget`

Domain Agent Patch Target interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { DomainAgentPatchTarget } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextSpecRef` | property | <code>contextSpecRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptRefs` | property | <code>promptRefs?: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRefs` | property | <code>skillRefs?: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `systemInstructions` | property | <code>systemInstructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainBindingResolution`

Domain Binding Resolution interface with 23 public fields or methods.

- Kind: interface
- Import: `import type { DomainBindingResolution } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedPromptRefs` | property | <code>allowedPromptRefs: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `businessRules` | property | <code>businessRules: BusinessRuleSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfile` | property | <code>contextProfile?: ContextSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultPromptRefs` | property | <code>defaultPromptRefs: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultSkills` | property | <code>defaultSkills: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluations` | property | <code>evaluations: EvaluationSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfile` | property | <code>mcpProfile?: MCPIntegrationSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfiles` | property | <code>mcpProfiles: MCPIntegrationSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfile` | property | <code>memoryProfile?: MemorySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: OutputContractSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policies` | property | <code>policies: PolicySpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfile` | property | <code>reasoningProfile?: ReasoningSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfiles` | property | <code>reasoningProfiles: ReasoningSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `regressionCases` | property | <code>regressionCases: RegressionSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfile` | property | <code>sessionProfile?: SessionProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillPolicies` | property | <code>skillPolicies: SkillPolicyBinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskSchema` | property | <code>taskSchema?: TaskSchemaSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolProfiles` | property | <code>toolProfiles: ToolProfileSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools: ToolSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflow` | property | <code>workflow: WorkflowSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowStates` | property | <code>workflowStates: WorkflowStateBinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainCompilationAudit`

Domain Compilation Audit interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { DomainCompilationAudit } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compilationHash` | property | <code>compilationHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpRefs` | property | <code>mcpRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptRefs` | property | <code>promptRefs: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRefs` | property | <code>skillRefs: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowStateBindingsHash` | property | <code>workflowStateBindingsHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainCompilationResult`

Domain Compilation Result interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { DomainCompilationResult } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentPatch` | property | <code>agentPatch: DomainAgentPatch</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `audit` | property | <code>audit: DomainCompilationAudit</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `bindings` | property | <code>bindings: DomainBindingResolution</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `compilerVersion` | property | <code>compilerVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencySnapshot` | property | <code>dependencySnapshot: WorkflowDependencySnapshot</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPack` | property | <code>domainPack: DomainPackSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmProcess` | property | <code>fsmProcess: FSMProcessSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `harnessedSystem` | property | <code>harnessedSystem: HarnessedAgentSystemSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `processHash` | property | <code>processHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionInitialization` | property | <code>sessionInitialization: DomainSessionInitialization</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowRef` | property | <code>workflowRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainCompileOptions`

Domain Compile Options interface with 20 public fields or methods.

- Kind: interface
- Import: `import type { DomainCompileOptions } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentSkillRefs` | property | <code>agentSkillRefs?: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentToolRefs` | property | <code>agentToolRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfileId` | property | <code>contextProfileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deploymentRef` | property | <code>deploymentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationRefs` | property | <code>evaluationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfileId` | property | <code>mcpProfileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileId` | property | <code>memoryProfileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelProfileRef` | property | <code>modelProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfileId` | property | <code>reasoningProfileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `regressionRef` | property | <code>regressionRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replayRef` | property | <code>replayRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfileId` | property | <code>sessionProfileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `systemId` | property | <code>systemId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `systemVersion` | property | <code>systemVersion?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskSchemaId` | property | <code>taskSchemaId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceRef` | property | <code>traceRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowId` | property | <code>workflowId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainPackRegistryEntry`

Domain Pack Registry Entry interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { DomainPackRegistryEntry } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface DomainPackRegistryEntry {
    spec: DomainPackSpec;
    source?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `source` | property | <code>source?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: DomainPackSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainPackSpec`

Domain Pack Spec interface with 31 public fields or methods.

- Kind: interface
- Import: `import type { DomainPackSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedPromptRefs` | property | <code>allowedPromptRefs?: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills?: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `businessRules` | property | <code>businessRules?: BusinessRuleSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfiles` | property | <code>contextProfiles?: ContextSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultPromptRefs` | property | <code>defaultPromptRefs?: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultReasoningProfile` | property | <code>defaultReasoningProfile?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultSkills` | property | <code>defaultSkills?: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultWorkflow` | property | <code>defaultWorkflow?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deploymentProfile` | property | <code>deploymentProfile?: DeploymentSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationProfiles` | property | <code>evaluationProfiles?: EvaluationSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfiles` | property | <code>mcpProfiles?: MCPIntegrationSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfiles` | property | <code>memoryProfiles?: MemorySpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContracts` | property | <code>outputContracts: OutputContractSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policies` | property | <code>policies?: PolicySpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfiles` | property | <code>reasoningProfiles?: ReasoningSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `regressionCases` | property | <code>regressionCases?: RegressionSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfiles` | property | <code>sessionProfiles?: SessionProfileSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillPolicies` | property | <code>skillPolicies?: SkillPolicyBinding[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskSchemas` | property | <code>taskSchemas: TaskSchemaSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolProfiles` | property | <code>toolProfiles?: ToolProfileSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: ToolSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflows` | property | <code>workflows: WorkflowSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainPromptRef`

Domain Prompt Ref interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { DomainPromptRef } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface DomainPromptRef extends SpecRef {
    required?: boolean;
    priority?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainSessionInitialization`

Domain Session Initialization interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { DomainSessionInitialization } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `contextProfileRef` | property | <code>contextProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRef` | property | <code>domainPackRef: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfileRef` | property | <code>mcpProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRef` | property | <code>memoryProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfileRef` | property | <code>sessionProfileRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillPolicyRef` | property | <code>skillPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolProfileRef` | property | <code>toolProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `DomainSessionInitOptions`

Domain Session Init Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { DomainSessionInitOptions } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface DomainSessionInitOptions {
    profileId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profileId` | property | <code>profileId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalDomainPackLoaderOptions`

Local Domain Pack Loader Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalDomainPackLoaderOptions } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface LocalDomainPackLoaderOptions {
    directories: string[];
    recursive?: boolean;
    extensions?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `directories` | property | <code>directories: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `extensions` | property | <code>extensions?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recursive` | property | <code>recursive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningSpec`

Reasoning Spec interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agenticMode` | property | <code>agenticMode: DomainAgenticReasoningMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxSteps` | property | <code>maxSteps?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadataSchema` | property | <code>metadataSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `persist` | property | <code>persist?: DomainReasoningPersistence</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plannerRef` | property | <code>plannerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasonerRef` | property | <code>reasonerRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `thinkingMode` | property | <code>thinkingMode: DomainThinkingMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `RiskProfileSpec`

Risk Profile Spec interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { RiskProfileSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface RiskProfileSpec {
    defaultRiskLevel: RiskLevel;
    escalationPolicyRef?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `defaultRiskLevel` | property | <code>defaultRiskLevel: RiskLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `escalationPolicyRef` | property | <code>escalationPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SessionProfileSpec`

Session Profile Spec interface with 17 public fields or methods.

- Kind: interface
- Import: `import type { SessionProfileSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultContextProfileRef` | property | <code>defaultContextProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultMCPProfileRef` | property | <code>defaultMCPProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultMemoryProfileRef` | property | <code>defaultMemoryProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultMetadata` | property | <code>defaultMetadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultPolicyRefs` | property | <code>defaultPolicyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultReasoningProfileRef` | property | <code>defaultReasoningProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultSkillPolicyRef` | property | <code>defaultSkillPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultToolProfileRef` | property | <code>defaultToolProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadataSchema` | property | <code>metadataSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillPolicyBinding`

Skill Policy Binding interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { SkillPolicyBinding } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedTools` | property | <code>allowedTools?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredTools` | property | <code>requiredTools?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRef` | property | <code>skillRef: SkillRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TaskInstance`

Task Instance interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { TaskInstance } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptanceCriteria` | property | <code>acceptanceCriteria?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constraints` | property | <code>constraints?: TConstraints</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainId` | property | <code>domainId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `riskLevel` | property | <code>riskLevel?: RiskLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskSchemaId` | property | <code>taskSchemaId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `TaskSchemaSpec`

Task Schema Spec interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { TaskSchemaSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptanceCriteriaSchema` | property | <code>acceptanceCriteriaSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `constraintsSchema` | property | <code>constraintsSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultSkillRefs` | property | <code>defaultSkillRefs?: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultWorkflowRef` | property | <code>defaultWorkflowRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContractRef` | property | <code>outputContractRef: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `riskProfile` | property | <code>riskProfile?: RiskProfileSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskType` | property | <code>taskType: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowCompileOptions`

Workflow Compile Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowCompileOptions } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface WorkflowCompileOptions {
    workflowId?: string;
    /** @deprecated Harness FSM identity is framework-owned and cannot be overridden. */
    fsmProcessId?: string;
    agentRef?: SpecRef;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRef` | property | <code>agentRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fsmProcessId` | property | <code>fsmProcessId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workflowId` | property | <code>workflowId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowDependencySnapshot`

Workflow Dependency Snapshot interface with 23 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowDependencySnapshot } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentRefs` | property | <code>agentRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `businessRuleRefs` | property | <code>businessRuleRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextProfileRefs` | property | <code>contextProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `dependencyHash` | property | <code>dependencyHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deploymentRefs` | property | <code>deploymentRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainPackRefs` | property | <code>domainPackRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationRefs` | property | <code>evaluationRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpProfileRefs` | property | <code>mcpProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryProfileRefs` | property | <code>memoryProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelProfileRefs` | property | <code>modelProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContractRefs` | property | <code>outputContractRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfileRefs` | property | <code>reasoningProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `regressionRefs` | property | <code>regressionRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `replayRefs` | property | <code>replayRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sessionProfileRefs` | property | <code>sessionProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillPolicyRefs` | property | <code>skillPolicyRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillRefs` | property | <code>skillRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskSchemaRefs` | property | <code>taskSchemaRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolProfileRefs` | property | <code>toolProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolRefs` | property | <code>toolRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `traceRefs` | property | <code>traceRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `workspaceProfileRefs` | property | <code>workspaceProfileRefs: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowSpec`

Workflow Spec interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface WorkflowSpec extends VersionedSpec, SpecMetadata {
    initialState: string;
    terminalStates: string[];
    states: WorkflowStateSpec[];
    transitions: WorkflowTransitionSpec[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `initialState` | property | <code>initialState: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `states` | property | <code>states: WorkflowStateSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `terminalStates` | property | <code>terminalStates: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `transitions` | property | <code>transitions: WorkflowTransitionSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowStateBinding`

Workflow State Binding interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowStateBinding } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | property | <code>allowedMCPProfileRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedMCPProfiles` | property | <code>allowedMCPProfiles: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedPromptRefs` | property | <code>allowedPromptRefs: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedToolRefs` | property | <code>allowedToolRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityLoadPolicy` | property | <code>capabilityLoadPolicy?: "eager" &#124; "lazy" &#124; "model_selected"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedToolRefs` | property | <code>deniedToolRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationRefs` | property | <code>evaluationRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanApprovalPolicyRef` | property | <code>humanApprovalPolicyRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryPolicyRef` | property | <code>memoryPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredPromptRefs` | property | <code>requiredPromptRefs: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSkills` | property | <code>requiredSkills: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stateId` | property | <code>stateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolProfileRefs` | property | <code>toolProfileRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowStateSpec`

Workflow State Spec interface with 33 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowStateSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedMCPProfileRefs` | property | <code>allowedMCPProfileRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedMCPProfiles` | property | <code>allowedMCPProfiles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedPromptRefs` | property | <code>allowedPromptRefs?: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedToolRefs` | property | <code>allowedToolRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedTools` | property | <code>allowedTools?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilityLoadPolicy` | property | <code>capabilityLoadPolicy?: "eager" &#124; "lazy" &#124; "model_selected"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `deniedToolRefs` | property | <code>deniedToolRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationRefs` | property | <code>evaluationRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `goal` | property | <code>goal: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanApprovalPolicyRef` | property | <code>humanApprovalPolicyRef?: SpecRef</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanReviewPolicy` | property | <code>humanReviewPolicy?: HumanReviewPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `humanReviewRef` | property | <code>humanReviewRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputContract` | property | <code>inputContract?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryPolicyRef` | property | <code>memoryPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `permissionScopes` | property | <code>permissionScopes?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoningProfileRef` | property | <code>reasoningProfileRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredPromptRefs` | property | <code>requiredPromptRefs?: DomainPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSkills` | property | <code>requiredSkills?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryPolicy` | property | <code>retryPolicy?: RetryPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `retryPolicyRef` | property | <code>retryPolicyRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutPolicy` | property | <code>timeoutPolicy?: TimeoutPolicySpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolProfileRefs` | property | <code>toolProfileRefs?: SpecRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `WorkflowTransitionSpec`

Workflow Transition Spec interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { WorkflowTransitionSpec } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export interface WorkflowTransitionSpec {
    from: string;
    to: string;
    guard?: string;
    description?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `from` | property | <code>from: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `guard` | property | <code>guard?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `to` | property | <code>to: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `BusinessRuleEffect`

Public type alias for Business Rule Effect; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { BusinessRuleEffect } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type BusinessRuleEffect = 'constraint' | 'precondition' | 'postcondition' | 'guidance';
```

## `BusinessRuleScope`

Public type alias for Business Rule Scope; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { BusinessRuleScope } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type BusinessRuleScope = 'domain' | 'task' | 'workflow' | 'state' | 'tool' | 'memory' | 'output';
```

## `DomainAgenticReasoningMode`

Public type alias for Domain Agentic Reasoning Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { DomainAgenticReasoningMode } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type DomainAgenticReasoningMode = 'react' | 'fsm_react' | 'tot' | 'critique';
```

## `DomainPackOverlay`

Public type alias for Domain Pack Overlay; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { DomainPackOverlay } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

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

Public type alias for Domain Pack Overlay Collection; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { DomainPackOverlayCollection } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type DomainPackOverlayCollection = 'taskSchemas' | 'outputContracts' | 'sessionProfiles' | 'workflows' | 'allowedSkills' | 'defaultSkills' | 'skillPolicies' | 'allowedPromptRefs' | 'defaultPromptRefs' | 'tools' | 'toolProfiles' | 'mcpProfiles' | 'memoryProfiles' | 'contextProfiles' | 'reasoningProfiles' | 'businessRules' | 'policies' | 'evaluationProfiles' | 'regressionCases';
```

## `DomainPackOverlayRemovals`

Public type alias for Domain Pack Overlay Removals; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { DomainPackOverlayRemovals } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type DomainPackOverlayRemovals = Partial<Record<DomainPackOverlayCollection, string[]>>;
```

## `DomainReasoningPersistence`

Public type alias for Domain Reasoning Persistence; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { DomainReasoningPersistence } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type DomainReasoningPersistence = 'summary_only' | 'events_only';
```

## `DomainThinkingMode`

Public type alias for Domain Thinking Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { DomainThinkingMode } from '@codesoul-co/hypha-domain';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/domain/src/index.ts)

### Declaration

```text
export type DomainThinkingMode = 'none' | 'summary' | 'structured';
```
