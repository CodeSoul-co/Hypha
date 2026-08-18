# `@codesoul-co/hypha-skills` / `index`

- Package index: [`@codesoul-co/hypha-skills`](/api/skills)
- Source: [`packages/skills/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)
- Exports: **42**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-skills`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  DefaultSkillPolicy,
  LocalSkillLoader,
  SkillContextLoader,
  SkillRegistry,
  SkillResolver,
  SkillSelector,
  skillActivationPolicySchema,
  skillAssetRefSchema,
} from '@codesoul-co/hypha-skills';

import type {
  AgentCapabilityConstraint,
  EffectiveAgentCapabilitySnapshotInput,
  LoadedSkillAsset,
  LoadedSkillContext,
  LocalSkillLoaderOptions,
  ParsedSkillMarkdown,
  ResolvedSkill,
  SkillActivationPolicy,
} from '@codesoul-co/hypha-skills';

// The complete export list is documented below.
```

### Usage patterns

- Use the 21 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 6 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 6 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 9 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { skillActivationPolicySchema } from '@codesoul-co/hypha-skills';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = skillActivationPolicySchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultSkillPolicy` | class | <code>new DefaultSkillPolicy(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | Default Skill Policy class with 2 public constructor or member entries; its exact declarations are listed below. |
| `LocalSkillLoader` | class | <code>new LocalSkillLoader(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | Local Skill Loader class with 3 public constructor or member entries; its exact declarations are listed below. |
| `SkillContextLoader` | class | <code>new SkillContextLoader(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | Skill Context Loader class with 2 public constructor or member entries; its exact declarations are listed below. |
| `SkillRegistry` | class | <code>new SkillRegistry(): SkillRegistry</code> | Skill Registry class with 5 public constructor or member entries; its exact declarations are listed below. |
| `SkillResolver` | class | <code>new SkillResolver(registry: SkillRegistry): SkillResolver</code> | Skill Resolver class with 2 public constructor or member entries; its exact declarations are listed below. |
| `SkillSelector` | class | <code>new SkillSelector(registry: SkillRegistry): SkillSelector</code> | Skill Selector class with 2 public constructor or member entries; its exact declarations are listed below. |
| `skillActivationPolicySchema` | constant | <code>const skillActivationPolicySchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["always", "keyword", "regex", "intent", "manual"]&gt;; patterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }&gt;</code> | Runtime schema for Skill Activation Policy. |
| `skillAssetRefSchema` | constant | <code>const skillAssetRefSchema: z.ZodObject&lt;{ path: z.ZodString; type: z.ZodEnum&lt;["reference", "script", "asset"]&gt;; loadPolicy: z.ZodOptional&lt;z.ZodEnum&lt;["frontmatter_only", "on_activation", "never"]&gt;&gt;; }, "strip", z.ZodTypeAny, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation" &#124; undefined; }, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPo...</code> | Runtime schema for Skill Asset Ref. |
| `skillRefSchema` | constant | <code>const skillRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; }&gt;</code> | Runtime schema for Skill Ref. |
| `skillSpecDefinition` | constant | <code>const skillSpecDefinition: SpecSchemaDefinition&lt;SkillSpec&gt;</code> | Runtime validation entrypoint for the Skill spec, combining its parser, example and JSON Schema. |
| `skillSpecDefinitions` | constant | <code>const skillSpecDefinitions: readonly [SpecSchemaDefinition&lt;SkillSpec&gt;]</code> | Skill Spec Definitions constant exported by the `index` module. |
| `skillSpecExample` | constant | <code>const skillSpecExample: SkillSpec</code> | Valid example value for Skill Spec. |
| `skillSpecJsonSchema` | constant | <code>const skillSpecJsonSchema: JsonSchema</code> | JSON Schema for Skill Spec. |
| `skillSpecJsonSchemas` | constant | <code>const skillSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Skill Spec JSON Schemas constant exported by the `index` module. |
| `skillSpecSchema` | constant | <code>const skillSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { description: z.ZodString; enabled: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; activationPolicy: z.ZodOptional&lt;...</code> | Runtime schema for Skill Spec. |
| `createEffectiveAgentCapabilitySnapshot` | function | <code>createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly&lt;EffectiveAgentCapabilitySnapshot&gt;</code> | Create Effective Agent Capability Snapshot function with 1 public call signature; parameters and return types are listed below. |
| `listLocalSkillFiles` | function | <code>listLocalSkillFiles(directory: string, recursive?: boolean): Promise&lt;string[]&gt;</code> | List Local Skill Files function with 1 public call signature; parameters and return types are listed below. |
| `loadSkillMarkdownFile` | function | <code>loadSkillMarkdownFile(filePath: string): Promise&lt;ParsedSkillMarkdown&gt;</code> | Load Skill Markdown File function with 1 public call signature; parameters and return types are listed below. |
| `parseSkillMarkdown` | function | <code>parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown</code> | Parse Skill Markdown function with 1 public call signature; parameters and return types are listed below. |
| `resolveBuiltinSkillsDirectory` | function | <code>resolveBuiltinSkillsDirectory(): string</code> | Resolves the directory that ships Hypha's built-in skills (context-enrichment, intent-classification) inside this npm package. The published tarball includes `builtins/` next to `dist/`, so consumers can load the framework built-ins without a source checkout of the Server. |
| `validateSkillSpec` | function | <code>validateSkillSpec(input: unknown): SkillSpec</code> | Validate Skill Spec function with 1 public call signature; parameters and return types are listed below. |
| `AgentCapabilityConstraint` | interface | <code>interface AgentCapabilityConstraint</code> | Agent Capability Constraint interface with 6 public fields or methods. |
| `EffectiveAgentCapabilitySnapshotInput` | interface | <code>interface EffectiveAgentCapabilitySnapshotInput</code> | Effective Agent Capability Snapshot Input interface with 10 public fields or methods. |
| `LoadedSkillAsset` | interface | <code>interface LoadedSkillAsset extends SkillAssetRef</code> | Loaded Skill Asset interface with 6 public fields or methods. |
| `LoadedSkillContext` | interface | <code>interface LoadedSkillContext</code> | Loaded Skill Context interface with 16 public fields or methods. |
| `LocalSkillLoaderOptions` | interface | <code>interface LocalSkillLoaderOptions</code> | Local Skill Loader Options interface with 3 public fields or methods. |
| `ParsedSkillMarkdown` | interface | <code>interface ParsedSkillMarkdown</code> | Parsed Skill Markdown interface with 3 public fields or methods. |
| `ResolvedSkill` | interface | <code>interface ResolvedSkill</code> | Resolved Skill interface with 3 public fields or methods. |
| `SkillActivationPolicy` | interface | <code>interface SkillActivationPolicy</code> | Skill Activation Policy interface with 2 public fields or methods. |
| `SkillAssetRef` | interface | <code>interface SkillAssetRef</code> | Skill Asset Ref interface with 3 public fields or methods. |
| `SkillContextLoadInput` | interface | <code>interface SkillContextLoadInput</code> | Skill Context Load Input interface with 3 public fields or methods. |
| `SkillLoader` | interface | <code>interface SkillLoader</code> | Skill Loader interface with 1 public fields or methods. |
| `SkillPolicy` | interface | <code>interface SkillPolicy</code> | Skill Policy interface with 1 public fields or methods. |
| `SkillPolicyDecision` | interface | <code>interface SkillPolicyDecision</code> | Skill Policy Decision interface with 6 public fields or methods. |
| `SkillPolicyInput` | interface | <code>interface SkillPolicyInput</code> | Skill Policy Input interface with 2 public fields or methods. |
| `SkillRef` | interface | <code>interface SkillRef</code> | Skill Ref interface with 2 public fields or methods. |
| `SkillResolutionContext` | interface | <code>interface SkillResolutionContext</code> | Skill Resolution Context interface with 8 public fields or methods. |
| `SkillSelection` | interface | <code>interface SkillSelection</code> | Skill Selection interface with 4 public fields or methods. |
| `SkillSelectionRejection` | interface | <code>interface SkillSelectionRejection</code> | Skill Selection Rejection interface with 2 public fields or methods. |
| `SkillSelectionResult` | interface | <code>interface SkillSelectionResult</code> | Skill Selection Result interface with 2 public fields or methods. |
| `SkillSpec` | interface | <code>interface SkillSpec extends VersionedSpec, SpecMetadata</code> | Skill Spec interface with 26 public fields or methods. |
| `SkillActivationMode` | type | <code>type SkillActivationMode = 'always' &#124; 'keyword' &#124; 'regex' &#124; 'intent' &#124; 'manual'</code> | Public type alias for Skill Activation Mode; the declaration contains its complete type expression. |

## `DefaultSkillPolicy`

Default Skill Policy class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { DefaultSkillPolicy } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare class DefaultSkillPolicy implements SkillPolicy {
    constructor(options?: {
            allowedTrustLevels?: Array<NonNullable<SkillSpec['trustLevel']>>;
            requireRegisteredTools?: boolean;
        });
    evaluate(input: SkillPolicyInput): Promise<SkillPolicyDecision>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | Creates an instance of this class. |
| `evaluate` | method | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LocalSkillLoader`

Local Skill Loader class with 3 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LocalSkillLoader } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare class LocalSkillLoader implements SkillLoader {
    constructor(options: LocalSkillLoaderOptions);
    load(): Promise<SkillSpec[]>;
    loadInto(registry: SkillRegistry): Promise<SkillSpec[]>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | Creates an instance of this class. |
| `load` | method | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `loadInto` | method | <code>loadInto(registry: SkillRegistry): Promise&lt;SkillSpec[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SkillContextLoader`

Skill Context Loader class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SkillContextLoader } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare class SkillContextLoader {
    constructor(options?: {
            defaultMaxChars?: number;
            maxReferences?: number;
            maxFileBytes?: number;
            readTimeoutMs?: number;
        });
    load(input: SkillContextLoadInput): Promise<LoadedSkillContext>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | Creates an instance of this class. |
| `load` | method | <code>load(input: SkillContextLoadInput): Promise&lt;LoadedSkillContext&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SkillRegistry`

Skill Registry class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SkillRegistry } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare class SkillRegistry {
    register(skill: SkillSpec): void;
    registerMany(skills: SkillSpec[]): void;
    get(skillId: string): SkillSpec | null;
    list(): SkillSpec[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): SkillRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(skillId: string): SkillSpec &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): SkillSpec[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(skill: SkillSpec): void</code> | Public method; parameters and return type are shown in the signature. |
| `registerMany` | method | <code>registerMany(skills: SkillSpec[]): void</code> | Public method; parameters and return type are shown in the signature. |

## `SkillResolver`

Skill Resolver class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SkillResolver } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare class SkillResolver {
    constructor(registry: SkillRegistry);
    resolve(context: SkillResolutionContext): ResolvedSkill[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(registry: SkillRegistry): SkillResolver</code> | Creates an instance of this class. |
| `resolve` | method | <code>resolve(context: SkillResolutionContext): ResolvedSkill[]</code> | Public method; parameters and return type are shown in the signature. |

## `SkillSelector`

Skill Selector class with 2 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { SkillSelector } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare class SkillSelector {
    constructor(registry: SkillRegistry);
    select(context: SkillResolutionContext): SkillSelectionResult;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(registry: SkillRegistry): SkillSelector</code> | Creates an instance of this class. |
| `select` | method | <code>select(context: SkillResolutionContext): SkillSelectionResult</code> | Public method; parameters and return type are shown in the signature. |

## `skillActivationPolicySchema`

Runtime schema for Skill Activation Policy.

- Kind: constant
- Import: `import { skillActivationPolicySchema } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillActivationPolicySchema: z.ZodObject<{ mode: z.ZodEnum<["always", "keyword", "regex", "intent", "manual"]>; patterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { mode: "always" | "keyword" | "regex" | "intent" | "manual"; patterns?: string[] | undefined; }, { mode: "always" | "keyword" | "regex" | "intent" | "manual"; patterns?: string[] | undefined; }>;
```

## `skillAssetRefSchema`

Runtime schema for Skill Asset Ref.

- Kind: constant
- Import: `import { skillAssetRefSchema } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillAssetRefSchema: z.ZodObject<{ path: z.ZodString; type: z.ZodEnum<["reference", "script", "asset"]>; loadPolicy: z.ZodOptional<z.ZodEnum<["frontmatter_only", "on_activation", "never"]>>; }, "strip", z.ZodTypeAny, { path: string; type: "reference" | "script" | "asset"; loadPolicy?: "never" | "frontmatter_only" | "on_activation" | undefined; }, { path: string; type: "reference" | "script" | "asset"; loadPolicy?: "never" | "frontmatter_only" | "on_activation" | undefined; }>;
```

## `skillRefSchema`

Runtime schema for Skill Ref.

- Kind: constant
- Import: `import { skillRefSchema } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; }, { id: string; version?: string | undefined; }>;
```

## `skillSpecDefinition`

Runtime validation entrypoint for the Skill spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { skillSpecDefinition } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillSpecDefinition: SpecSchemaDefinition<SkillSpec>;
```

## `skillSpecDefinitions`

Skill Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { skillSpecDefinitions } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillSpecDefinitions: readonly [SpecSchemaDefinition<SkillSpec>];
```

## `skillSpecExample`

Valid example value for Skill Spec.

- Kind: constant
- Import: `import { skillSpecExample } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillSpecExample: SkillSpec;
```

## `skillSpecJsonSchema`

JSON Schema for Skill Spec.

- Kind: constant
- Import: `import { skillSpecJsonSchema } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillSpecJsonSchema: JsonSchema;
```

## `skillSpecJsonSchemas`

Skill Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { skillSpecJsonSchemas } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare const skillSpecJsonSchemas: Record<string, JsonSchema>;
```

## `skillSpecSchema`

Runtime schema for Skill Spec.

- Kind: constant
- Import: `import { skillSpecSchema } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const skillSpecSchema: (typeof import('@codesoul-co/hypha-skills'))['skillSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `createEffectiveAgentCapabilitySnapshot`

Create Effective Agent Capability Snapshot function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { createEffectiveAgentCapabilitySnapshot } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare function createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly<EffectiveAgentCapabilitySnapshot>;
```

### Call signature

```text
createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly<EffectiveAgentCapabilitySnapshot>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>EffectiveAgentCapabilitySnapshotInput</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Readonly<EffectiveAgentCapabilitySnapshot>`
- Description: The return contract is defined by the type shown above.

## `listLocalSkillFiles`

List Local Skill Files function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { listLocalSkillFiles } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare function listLocalSkillFiles(directory: string, recursive?: boolean): Promise<string[]>;
```

### Call signature

```text
listLocalSkillFiles(directory: string, recursive?: boolean): Promise<string[]>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directory` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `recursive` | <code>boolean</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<string[]>`
- Description: The return contract is defined by the type shown above.

## `loadSkillMarkdownFile`

Load Skill Markdown File function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { loadSkillMarkdownFile } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare function loadSkillMarkdownFile(filePath: string): Promise<ParsedSkillMarkdown>;
```

### Call signature

```text
loadSkillMarkdownFile(filePath: string): Promise<ParsedSkillMarkdown>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `filePath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<ParsedSkillMarkdown>`
- Description: The return contract is defined by the type shown above.

## `parseSkillMarkdown`

Parse Skill Markdown function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseSkillMarkdown } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare function parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown;
```

### Call signature

```text
parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `raw` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `filePath` | <code>string</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ParsedSkillMarkdown`
- Description: The return contract is defined by the type shown above.

## `resolveBuiltinSkillsDirectory`

Resolves the directory that ships Hypha's built-in skills (context-enrichment, intent-classification) inside this npm package. The published tarball includes `builtins/` next to `dist/`, so consumers can load the framework built-ins without a source checkout of the Server.

- Kind: function
- Import: `import { resolveBuiltinSkillsDirectory } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare function resolveBuiltinSkillsDirectory(): string;
```

### Call signature

```text
resolveBuiltinSkillsDirectory(): string
```

Resolves the directory that ships Hypha's built-in skills (context-enrichment, intent-classification) inside this npm package. The published tarball includes `builtins/` next to `dist/`, so consumers can load the framework built-ins without a source checkout of the Server.

#### Parameters

No parameters.

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `validateSkillSpec`

Validate Skill Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateSkillSpec } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export declare function validateSkillSpec(input: unknown): SkillSpec;
```

### Call signature

```text
validateSkillSpec(input: unknown): SkillSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `SkillSpec`
- Description: The return contract is defined by the type shown above.

## `AgentCapabilityConstraint`

Agent Capability Constraint interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { AgentCapabilityConstraint } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface AgentCapabilityConstraint {
    allowedToolIds?: string[];
    allowedMCPServerIds?: string[];
    memoryAccess?: EffectiveAgentCapabilitySnapshot['memoryAccess'];
    allowedExecutionProfiles?: string[];
    maximumSideEffectLevel?: SideEffectLevel;
    policyRefs?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowedExecutionProfiles` | property | <code>allowedExecutionProfiles?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedMCPServerIds` | property | <code>allowedMCPServerIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedToolIds` | property | <code>allowedToolIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maximumSideEffectLevel` | property | <code>maximumSideEffectLevel?: SideEffectLevel</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryAccess` | property | <code>memoryAccess?: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyRefs` | property | <code>policyRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `EffectiveAgentCapabilitySnapshotInput`

Effective Agent Capability Snapshot Input interface with 10 public fields or methods.

- Kind: interface
- Import: `import type { EffectiveAgentCapabilitySnapshotInput } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface EffectiveAgentCapabilitySnapshotInput {
    runId: string;
    agentId: string;
    principalId: string;
    tenantId?: string;
    domainId?: string;
    createdAt?: string;
    expiresAt?: string;
    agent: AgentCapabilityConstraint;
    domain: AgentCapabilityConstraint;
    activeSkills: LoadedSkillContext[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeSkills` | property | <code>activeSkills: LoadedSkillContext[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agent` | property | <code>agent: AgentCapabilityConstraint</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `agentId` | property | <code>agentId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domain` | property | <code>domain: AgentCapabilityConstraint</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainId` | property | <code>domainId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LoadedSkillAsset`

Loaded Skill Asset interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { LoadedSkillAsset } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface LoadedSkillAsset extends SkillAssetRef {
    absolutePath?: string;
    content?: string;
    truncated?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `absolutePath` | property | <code>absolutePath?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `loadPolicy` | property | <code>loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `truncated` | property | <code>truncated?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "reference" &#124; "script" &#124; "asset"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LoadedSkillContext`

Loaded Skill Context interface with 16 public fields or methods.

- Kind: interface
- Import: `import type { LoadedSkillContext } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface LoadedSkillContext {
    id: string;
    version: string;
    name?: string;
    description: string;
    instructions?: string;
    references: LoadedSkillAsset[];
    allowedTools: string[];
    requiredTools: string[];
    requiredMCPServers: string[];
    memoryAccessPolicy?: string;
    sideEffectPolicy?: string;
    trustLevel?: SkillSpec['trustLevel'];
    provenance?: Record<string, unknown>;
    policyDecision: SkillPolicyDecision;
    activation: {
        reason: string;
        matchedPatterns: string[];
    };
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activation` | property | <code>activation: { reason: string; matchedPatterns: string[]; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryAccessPolicy` | property | <code>memoryAccessPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecision` | property | <code>policyDecision: SkillPolicyDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `references` | property | <code>references: LoadedSkillAsset[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredMCPServers` | property | <code>requiredMCPServers: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredTools` | property | <code>requiredTools: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectPolicy` | property | <code>sideEffectPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `LocalSkillLoaderOptions`

Local Skill Loader Options interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { LocalSkillLoaderOptions } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface LocalSkillLoaderOptions {
    directories: string[];
    recursive?: boolean;
    includeDisabled?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `directories` | property | <code>directories: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `includeDisabled` | property | <code>includeDisabled?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `recursive` | property | <code>recursive?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ParsedSkillMarkdown`

Parsed Skill Markdown interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ParsedSkillMarkdown } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface ParsedSkillMarkdown {
    filePath: string;
    slug: string;
    spec: SkillSpec;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `filePath` | property | <code>filePath: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `slug` | property | <code>slug: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: SkillSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResolvedSkill`

Resolved Skill interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedSkill } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface ResolvedSkill {
    spec: SkillSpec;
    loadedInstructions?: string;
    loadedReferences: SkillAssetRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `loadedInstructions` | property | <code>loadedInstructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `loadedReferences` | property | <code>loadedReferences: SkillAssetRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: SkillSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillActivationPolicy`

Skill Activation Policy interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SkillActivationPolicy } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillActivationPolicy {
    mode: SkillActivationMode;
    patterns?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `mode` | property | <code>mode: SkillActivationMode</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `patterns` | property | <code>patterns?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillAssetRef`

Skill Asset Ref interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SkillAssetRef } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillAssetRef {
    path: string;
    type: 'reference' | 'script' | 'asset';
    loadPolicy?: 'frontmatter_only' | 'on_activation' | 'never';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `loadPolicy` | property | <code>loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `path` | property | <code>path: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "reference" &#124; "script" &#124; "asset"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillContextLoadInput`

Skill Context Load Input interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { SkillContextLoadInput } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillContextLoadInput {
    selection: SkillSelection;
    policyDecision: SkillPolicyDecision;
    maxChars?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxChars` | property | <code>maxChars?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyDecision` | property | <code>policyDecision: SkillPolicyDecision</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selection` | property | <code>selection: SkillSelection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillLoader`

Skill Loader interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { SkillLoader } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillLoader {
    load(): Promise<SkillSpec[]>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `load` | method | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SkillPolicy`

Skill Policy interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { SkillPolicy } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillPolicy {
    evaluate(input: SkillPolicyInput): Promise<SkillPolicyDecision>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `evaluate` | method | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `SkillPolicyDecision`

Skill Policy Decision interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { SkillPolicyDecision } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillPolicyDecision {
    allowed: boolean;
    reason?: string;
    requiresHumanReview?: boolean;
    allowedTools: string[];
    policyId?: string;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `allowed` | property | <code>allowed: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedTools` | property | <code>allowedTools: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `policyId` | property | <code>policyId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiresHumanReview` | property | <code>requiresHumanReview?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillPolicyInput`

Skill Policy Input interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SkillPolicyInput } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillPolicyInput {
    selection: SkillSelection;
    context: SkillResolutionContext;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `context` | property | <code>context: SkillResolutionContext</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selection` | property | <code>selection: SkillSelection</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillRef`

Skill Ref interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SkillRef } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillRef {
    id: string;
    version?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillResolutionContext`

Skill Resolution Context interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { SkillResolutionContext } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillResolutionContext {
    agentSkillRefs: SkillRef[];
    intent?: string;
    inputText?: string;
    allowedSkills?: string[];
    requiredSkills?: string[];
    manualSkillIds?: string[];
    availableToolRefs?: string[];
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentSkillRefs` | property | <code>agentSkillRefs: SkillRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedSkills` | property | <code>allowedSkills?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `availableToolRefs` | property | <code>availableToolRefs?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputText` | property | <code>inputText?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `intent` | property | <code>intent?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `manualSkillIds` | property | <code>manualSkillIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredSkills` | property | <code>requiredSkills?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillSelection`

Skill Selection interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { SkillSelection } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillSelection {
    spec: SkillSpec;
    reason: string;
    matchedPatterns: string[];
    priority: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `matchedPatterns` | property | <code>matchedPatterns: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `spec` | property | <code>spec: SkillSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillSelectionRejection`

Skill Selection Rejection interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SkillSelectionRejection } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillSelectionRejection {
    skillId: string;
    reason: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `reason` | property | <code>reason: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `skillId` | property | <code>skillId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillSelectionResult`

Skill Selection Result interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { SkillSelectionResult } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillSelectionResult {
    selected: SkillSelection[];
    rejected: SkillSelectionRejection[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `rejected` | property | <code>rejected: SkillSelectionRejection[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `selected` | property | <code>selected: SkillSelection[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillSpec`

Skill Spec interface with 26 public fields or methods.

- Kind: interface
- Import: `import type { SkillSpec } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export interface SkillSpec extends VersionedSpec, SpecMetadata {
    id: string;
    version: string;
    name?: string;
    description: string;
    enabled?: boolean;
    priority?: number;
    activationPolicy?: SkillActivationPolicy;
    instructions?: string;
    references?: SkillAssetRef[];
    scripts?: SkillAssetRef[];
    assets?: SkillAssetRef[];
    allowedTools?: string[];
    requiredTools?: string[];
    requiredMCPServers?: string[];
    memoryAccessPolicy?: string;
    sideEffectPolicy?: string;
    contextBudget?: number;
    inputSchema?: JsonSchema;
    outputContract?: JsonSchema;
    evaluationCases?: string[];
    provenance?: Record<string, unknown>;
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activationPolicy` | property | <code>activationPolicy?: SkillActivationPolicy</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `allowedTools` | property | <code>allowedTools?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `assets` | property | <code>assets?: SkillAssetRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contextBudget` | property | <code>contextBudget?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `enabled` | property | <code>enabled?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `evaluationCases` | property | <code>evaluationCases?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `memoryAccessPolicy` | property | <code>memoryAccessPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputContract` | property | <code>outputContract?: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `priority` | property | <code>priority?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `references` | property | <code>references?: SkillAssetRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredMCPServers` | property | <code>requiredMCPServers?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredTools` | property | <code>requiredTools?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scripts` | property | <code>scripts?: SkillAssetRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `sideEffectPolicy` | property | <code>sideEffectPolicy?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `SkillActivationMode`

Public type alias for Skill Activation Mode; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { SkillActivationMode } from '@codesoul-co/hypha-skills';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### Declaration

```text
export type SkillActivationMode = 'always' | 'keyword' | 'regex' | 'intent' | 'manual';
```
