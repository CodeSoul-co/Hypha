# `@codesoul-co/hypha-skills` / `index`

- 包索引: [`@codesoul-co/hypha-skills`](/zh/api/skills)
- 源码: [`packages/skills/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)
- 导出数: **42**

## 模块用法

聚合 `@codesoul-co/hypha-skills` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。

### 从包入口导入

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

// 完整导出列表见下方。
```

### 使用要点

- 21 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 6 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 6 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 9 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { skillActivationPolicySchema } from '@codesoul-co/hypha-skills';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = skillActivationPolicySchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `DefaultSkillPolicy` | 类 | <code>new DefaultSkillPolicy(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | Default Skill Policy 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `LocalSkillLoader` | 类 | <code>new LocalSkillLoader(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | Local Skill Loader 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SkillContextLoader` | 类 | <code>new SkillContextLoader(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | Skill Context Loader 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SkillRegistry` | 类 | <code>new SkillRegistry(): SkillRegistry</code> | Skill Registry 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SkillResolver` | 类 | <code>new SkillResolver(registry: SkillRegistry): SkillResolver</code> | Skill Resolver 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `SkillSelector` | 类 | <code>new SkillSelector(registry: SkillRegistry): SkillSelector</code> | Skill Selector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `skillActivationPolicySchema` | 常量 | <code>const skillActivationPolicySchema: z.ZodObject&lt;{ mode: z.ZodEnum&lt;["always", "keyword", "regex", "intent", "manual"]&gt;; patterns: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; }, "strip", z.ZodTypeAny, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }, { mode: "always" &#124; "keyword" &#124; "regex" &#124; "intent" &#124; "manual"; patterns?: string[] &#124; undefined; }&gt;</code> | Skill Activation Policy 的运行时 Schema。 |
| `skillAssetRefSchema` | 常量 | <code>const skillAssetRefSchema: z.ZodObject&lt;{ path: z.ZodString; type: z.ZodEnum&lt;["reference", "script", "asset"]&gt;; loadPolicy: z.ZodOptional&lt;z.ZodEnum&lt;["frontmatter_only", "on_activation", "never"]&gt;&gt;; }, "strip", z.ZodTypeAny, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation" &#124; undefined; }, { path: string; type: "reference" &#124; "script" &#124; "asset"; loadPo...</code> | Skill Asset Ref 的运行时 Schema。 |
| `skillRefSchema` | 常量 | <code>const skillRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; }, { id: string; version?: string &#124; undefined; }&gt;</code> | Skill Ref 的运行时 Schema。 |
| `skillSpecDefinition` | 常量 | <code>const skillSpecDefinition: SpecSchemaDefinition&lt;SkillSpec&gt;</code> | Skill Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。 |
| `skillSpecDefinitions` | 常量 | <code>const skillSpecDefinitions: readonly [SpecSchemaDefinition&lt;SkillSpec&gt;]</code> | 由 `index` 模块导出的 Skill Spec Definitions 常量。 |
| `skillSpecExample` | 常量 | <code>const skillSpecExample: SkillSpec</code> | Skill Spec 的有效示例值。 |
| `skillSpecJsonSchema` | 常量 | <code>const skillSpecJsonSchema: JsonSchema</code> | Skill Spec 的 JSON Schema。 |
| `skillSpecJsonSchemas` | 常量 | <code>const skillSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | 由 `index` 模块导出的 Skill Spec JSON Schemas 常量。 |
| `skillSpecSchema` | 常量 | <code>const skillSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { description: z.ZodString; enabled: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; activationPolicy: z.ZodOptional&lt;...</code> | Skill Spec 的运行时 Schema。 |
| `createEffectiveAgentCapabilitySnapshot` | 函数 | <code>createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly&lt;EffectiveAgentCapabilitySnapshot&gt;</code> | Create Effective Agent Capability Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `listLocalSkillFiles` | 函数 | <code>listLocalSkillFiles(directory: string, recursive?: boolean): Promise&lt;string[]&gt;</code> | List Local Skill Files 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `loadSkillMarkdownFile` | 函数 | <code>loadSkillMarkdownFile(filePath: string): Promise&lt;ParsedSkillMarkdown&gt;</code> | Load Skill Markdown File 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `parseSkillMarkdown` | 函数 | <code>parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown</code> | Parse Skill Markdown 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `resolveBuiltinSkillsDirectory` | 函数 | <code>resolveBuiltinSkillsDirectory(): string</code> | Resolves the directory that ships Hypha's built-in skills (context-enrichment, intent-classification) inside this npm package. The published tarball includes `builtins/` next to `dist/`, so consumers can load the framework built-ins without a source checkout of the Server. |
| `validateSkillSpec` | 函数 | <code>validateSkillSpec(input: unknown): SkillSpec</code> | Validate Skill Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `AgentCapabilityConstraint` | 接口 | <code>interface AgentCapabilityConstraint</code> | Agent Capability Constraint 接口，共包含 6 个公开字段或方法。 |
| `EffectiveAgentCapabilitySnapshotInput` | 接口 | <code>interface EffectiveAgentCapabilitySnapshotInput</code> | Effective Agent Capability Snapshot Input 接口，共包含 10 个公开字段或方法。 |
| `LoadedSkillAsset` | 接口 | <code>interface LoadedSkillAsset extends SkillAssetRef</code> | Loaded Skill Asset 接口，共包含 6 个公开字段或方法。 |
| `LoadedSkillContext` | 接口 | <code>interface LoadedSkillContext</code> | Loaded Skill Context 接口，共包含 16 个公开字段或方法。 |
| `LocalSkillLoaderOptions` | 接口 | <code>interface LocalSkillLoaderOptions</code> | Local Skill Loader Options 接口，共包含 3 个公开字段或方法。 |
| `ParsedSkillMarkdown` | 接口 | <code>interface ParsedSkillMarkdown</code> | Parsed Skill Markdown 接口，共包含 3 个公开字段或方法。 |
| `ResolvedSkill` | 接口 | <code>interface ResolvedSkill</code> | Resolved Skill 接口，共包含 3 个公开字段或方法。 |
| `SkillActivationPolicy` | 接口 | <code>interface SkillActivationPolicy</code> | Skill Activation Policy 接口，共包含 2 个公开字段或方法。 |
| `SkillAssetRef` | 接口 | <code>interface SkillAssetRef</code> | Skill Asset Ref 接口，共包含 3 个公开字段或方法。 |
| `SkillContextLoadInput` | 接口 | <code>interface SkillContextLoadInput</code> | Skill Context Load Input 接口，共包含 3 个公开字段或方法。 |
| `SkillLoader` | 接口 | <code>interface SkillLoader</code> | Skill Loader 接口，共包含 1 个公开字段或方法。 |
| `SkillPolicy` | 接口 | <code>interface SkillPolicy</code> | Skill Policy 接口，共包含 1 个公开字段或方法。 |
| `SkillPolicyDecision` | 接口 | <code>interface SkillPolicyDecision</code> | Skill Policy Decision 接口，共包含 6 个公开字段或方法。 |
| `SkillPolicyInput` | 接口 | <code>interface SkillPolicyInput</code> | Skill Policy Input 接口，共包含 2 个公开字段或方法。 |
| `SkillRef` | 接口 | <code>interface SkillRef</code> | Skill Ref 接口，共包含 2 个公开字段或方法。 |
| `SkillResolutionContext` | 接口 | <code>interface SkillResolutionContext</code> | Skill Resolution Context 接口，共包含 8 个公开字段或方法。 |
| `SkillSelection` | 接口 | <code>interface SkillSelection</code> | Skill Selection 接口，共包含 4 个公开字段或方法。 |
| `SkillSelectionRejection` | 接口 | <code>interface SkillSelectionRejection</code> | Skill Selection Rejection 接口，共包含 2 个公开字段或方法。 |
| `SkillSelectionResult` | 接口 | <code>interface SkillSelectionResult</code> | Skill Selection Result 接口，共包含 2 个公开字段或方法。 |
| `SkillSpec` | 接口 | <code>interface SkillSpec extends VersionedSpec, SpecMetadata</code> | Skill Spec 接口，共包含 26 个公开字段或方法。 |
| `SkillActivationMode` | 类型 | <code>type SkillActivationMode = 'always' &#124; 'keyword' &#124; 'regex' &#124; 'intent' &#124; 'manual'</code> | Skill Activation Mode 公共类型别名；完整类型表达式见声明。 |

## `DefaultSkillPolicy`

Default Skill Policy 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { DefaultSkillPolicy } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare class DefaultSkillPolicy implements SkillPolicy {
    constructor(options?: {
            allowedTrustLevels?: Array<NonNullable<SkillSpec['trustLevel']>>;
            requireRegisteredTools?: boolean;
        });
    evaluate(input: SkillPolicyInput): Promise<SkillPolicyDecision>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: { allowedTrustLevels?: Array&lt;NonNullable&lt;SkillSpec["trustLevel"]&gt;&gt;; requireRegisteredTools?: boolean; }): DefaultSkillPolicy</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `LocalSkillLoader`

Local Skill Loader 类，共公开 3 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { LocalSkillLoader } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare class LocalSkillLoader implements SkillLoader {
    constructor(options: LocalSkillLoaderOptions);
    load(): Promise<SkillSpec[]>;
    loadInto(registry: SkillRegistry): Promise<SkillSpec[]>;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options: LocalSkillLoaderOptions): LocalSkillLoader</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |
| `loadInto` | 方法 | <code>loadInto(registry: SkillRegistry): Promise&lt;SkillSpec[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SkillContextLoader`

Skill Context Loader 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SkillContextLoader } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(options?: { defaultMaxChars?: number; maxReferences?: number; maxFileBytes?: number; readTimeoutMs?: number; }): SkillContextLoader</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(input: SkillContextLoadInput): Promise&lt;LoadedSkillContext&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SkillRegistry`

Skill Registry 类，共公开 5 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SkillRegistry } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare class SkillRegistry {
    register(skill: SkillSpec): void;
    registerMany(skills: SkillSpec[]): void;
    get(skillId: string): SkillSpec | null;
    list(): SkillSpec[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): SkillRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(skillId: string): SkillSpec &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): SkillSpec[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(skill: SkillSpec): void</code> | 公开方法；参数与返回类型以签名列为准。 |
| `registerMany` | 方法 | <code>registerMany(skills: SkillSpec[]): void</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SkillResolver`

Skill Resolver 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SkillResolver } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare class SkillResolver {
    constructor(registry: SkillRegistry);
    resolve(context: SkillResolutionContext): ResolvedSkill[];
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(registry: SkillRegistry): SkillResolver</code> | 创建该类的实例。 |
| `resolve` | 方法 | <code>resolve(context: SkillResolutionContext): ResolvedSkill[]</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SkillSelector`

Skill Selector 类，共公开 2 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { SkillSelector } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare class SkillSelector {
    constructor(registry: SkillRegistry);
    select(context: SkillResolutionContext): SkillSelectionResult;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(registry: SkillRegistry): SkillSelector</code> | 创建该类的实例。 |
| `select` | 方法 | <code>select(context: SkillResolutionContext): SkillSelectionResult</code> | 公开方法；参数与返回类型以签名列为准。 |

## `skillActivationPolicySchema`

Skill Activation Policy 的运行时 Schema。

- 种类: 常量
- 导入: `import { skillActivationPolicySchema } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillActivationPolicySchema: z.ZodObject<{ mode: z.ZodEnum<["always", "keyword", "regex", "intent", "manual"]>; patterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { mode: "always" | "keyword" | "regex" | "intent" | "manual"; patterns?: string[] | undefined; }, { mode: "always" | "keyword" | "regex" | "intent" | "manual"; patterns?: string[] | undefined; }>;
```

## `skillAssetRefSchema`

Skill Asset Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { skillAssetRefSchema } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillAssetRefSchema: z.ZodObject<{ path: z.ZodString; type: z.ZodEnum<["reference", "script", "asset"]>; loadPolicy: z.ZodOptional<z.ZodEnum<["frontmatter_only", "on_activation", "never"]>>; }, "strip", z.ZodTypeAny, { path: string; type: "reference" | "script" | "asset"; loadPolicy?: "never" | "frontmatter_only" | "on_activation" | undefined; }, { path: string; type: "reference" | "script" | "asset"; loadPolicy?: "never" | "frontmatter_only" | "on_activation" | undefined; }>;
```

## `skillRefSchema`

Skill Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { skillRefSchema } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; }, { id: string; version?: string | undefined; }>;
```

## `skillSpecDefinition`

Skill Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。

- 种类: 常量
- 导入: `import { skillSpecDefinition } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillSpecDefinition: SpecSchemaDefinition<SkillSpec>;
```

## `skillSpecDefinitions`

由 `index` 模块导出的 Skill Spec Definitions 常量。

- 种类: 常量
- 导入: `import { skillSpecDefinitions } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillSpecDefinitions: readonly [SpecSchemaDefinition<SkillSpec>];
```

## `skillSpecExample`

Skill Spec 的有效示例值。

- 种类: 常量
- 导入: `import { skillSpecExample } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillSpecExample: SkillSpec;
```

## `skillSpecJsonSchema`

Skill Spec 的 JSON Schema。

- 种类: 常量
- 导入: `import { skillSpecJsonSchema } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillSpecJsonSchema: JsonSchema;
```

## `skillSpecJsonSchemas`

由 `index` 模块导出的 Skill Spec JSON Schemas 常量。

- 种类: 常量
- 导入: `import { skillSpecJsonSchemas } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare const skillSpecJsonSchemas: Record<string, JsonSchema>;
```

## `skillSpecSchema`

Skill Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { skillSpecSchema } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const skillSpecSchema: (typeof import('@codesoul-co/hypha-skills'))['skillSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `createEffectiveAgentCapabilitySnapshot`

Create Effective Agent Capability Snapshot 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { createEffectiveAgentCapabilitySnapshot } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare function createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly<EffectiveAgentCapabilitySnapshot>;
```

### 调用签名

```text
createEffectiveAgentCapabilitySnapshot(input: EffectiveAgentCapabilitySnapshotInput): Readonly<EffectiveAgentCapabilitySnapshot>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>EffectiveAgentCapabilitySnapshotInput</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Readonly<EffectiveAgentCapabilitySnapshot>`
- 说明: 返回值契约由上述类型定义。

## `listLocalSkillFiles`

List Local Skill Files 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { listLocalSkillFiles } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare function listLocalSkillFiles(directory: string, recursive?: boolean): Promise<string[]>;
```

### 调用签名

```text
listLocalSkillFiles(directory: string, recursive?: boolean): Promise<string[]>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `directory` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `recursive` | <code>boolean</code> | 否 | 可选参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<string[]>`
- 说明: 返回值契约由上述类型定义。

## `loadSkillMarkdownFile`

Load Skill Markdown File 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { loadSkillMarkdownFile } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare function loadSkillMarkdownFile(filePath: string): Promise<ParsedSkillMarkdown>;
```

### 调用签名

```text
loadSkillMarkdownFile(filePath: string): Promise<ParsedSkillMarkdown>
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `filePath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `Promise<ParsedSkillMarkdown>`
- 说明: 返回值契约由上述类型定义。

## `parseSkillMarkdown`

Parse Skill Markdown 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { parseSkillMarkdown } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare function parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown;
```

### 调用签名

```text
parseSkillMarkdown(raw: string, filePath: string): ParsedSkillMarkdown
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `raw` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `filePath` | <code>string</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `ParsedSkillMarkdown`
- 说明: 返回值契约由上述类型定义。

## `resolveBuiltinSkillsDirectory`

Resolves the directory that ships Hypha's built-in skills (context-enrichment, intent-classification) inside this npm package. The published tarball includes `builtins/` next to `dist/`, so consumers can load the framework built-ins without a source checkout of the Server.

- 种类: 函数
- 导入: `import { resolveBuiltinSkillsDirectory } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare function resolveBuiltinSkillsDirectory(): string;
```

### 调用签名

```text
resolveBuiltinSkillsDirectory(): string
```

Resolves the directory that ships Hypha's built-in skills (context-enrichment, intent-classification) inside this npm package. The published tarball includes `builtins/` next to `dist/`, so consumers can load the framework built-ins without a source checkout of the Server.

#### 参数

无参数。

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `validateSkillSpec`

Validate Skill Spec 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { validateSkillSpec } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export declare function validateSkillSpec(input: unknown): SkillSpec;
```

### 调用签名

```text
validateSkillSpec(input: unknown): SkillSpec
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `SkillSpec`
- 说明: 返回值契约由上述类型定义。

## `AgentCapabilityConstraint`

Agent Capability Constraint 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentCapabilityConstraint } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowedExecutionProfiles` | 属性 | <code>allowedExecutionProfiles?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedMCPServerIds` | 属性 | <code>allowedMCPServerIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedToolIds` | 属性 | <code>allowedToolIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `maximumSideEffectLevel` | 属性 | <code>maximumSideEffectLevel?: SideEffectLevel</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryAccess` | 属性 | <code>memoryAccess?: "none" &#124; "read" &#124; "write" &#124; "read_write"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyRefs` | 属性 | <code>policyRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `EffectiveAgentCapabilitySnapshotInput`

Effective Agent Capability Snapshot Input 接口，共包含 10 个公开字段或方法。

- 种类: 接口
- 导入: `import type { EffectiveAgentCapabilitySnapshotInput } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activeSkills` | 属性 | <code>activeSkills: LoadedSkillContext[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agent` | 属性 | <code>agent: AgentCapabilityConstraint</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `agentId` | 属性 | <code>agentId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domain` | 属性 | <code>domain: AgentCapabilityConstraint</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainId` | 属性 | <code>domainId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `runId` | 属性 | <code>runId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LoadedSkillAsset`

Loaded Skill Asset 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LoadedSkillAsset } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface LoadedSkillAsset extends SkillAssetRef {
    absolutePath?: string;
    content?: string;
    truncated?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `absolutePath` | 属性 | <code>absolutePath?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `loadPolicy` | 属性 | <code>loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `truncated` | 属性 | <code>truncated?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "reference" &#124; "script" &#124; "asset"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LoadedSkillContext`

Loaded Skill Context 接口，共包含 16 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LoadedSkillContext } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activation` | 属性 | <code>activation: { reason: string; matchedPatterns: string[]; }</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryAccessPolicy` | 属性 | <code>memoryAccessPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecision` | 属性 | <code>policyDecision: SkillPolicyDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `references` | 属性 | <code>references: LoadedSkillAsset[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredMCPServers` | 属性 | <code>requiredMCPServers: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredTools` | 属性 | <code>requiredTools: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectPolicy` | 属性 | <code>sideEffectPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `LocalSkillLoaderOptions`

Local Skill Loader Options 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { LocalSkillLoaderOptions } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface LocalSkillLoaderOptions {
    directories: string[];
    recursive?: boolean;
    includeDisabled?: boolean;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `directories` | 属性 | <code>directories: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `includeDisabled` | 属性 | <code>includeDisabled?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `recursive` | 属性 | <code>recursive?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ParsedSkillMarkdown`

Parsed Skill Markdown 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ParsedSkillMarkdown } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface ParsedSkillMarkdown {
    filePath: string;
    slug: string;
    spec: SkillSpec;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `filePath` | 属性 | <code>filePath: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `slug` | 属性 | <code>slug: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: SkillSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResolvedSkill`

Resolved Skill 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedSkill } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface ResolvedSkill {
    spec: SkillSpec;
    loadedInstructions?: string;
    loadedReferences: SkillAssetRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `loadedInstructions` | 属性 | <code>loadedInstructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `loadedReferences` | 属性 | <code>loadedReferences: SkillAssetRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: SkillSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillActivationPolicy`

Skill Activation Policy 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillActivationPolicy } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillActivationPolicy {
    mode: SkillActivationMode;
    patterns?: string[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `mode` | 属性 | <code>mode: SkillActivationMode</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `patterns` | 属性 | <code>patterns?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillAssetRef`

Skill Asset Ref 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillAssetRef } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillAssetRef {
    path: string;
    type: 'reference' | 'script' | 'asset';
    loadPolicy?: 'frontmatter_only' | 'on_activation' | 'never';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `loadPolicy` | 属性 | <code>loadPolicy?: "never" &#124; "frontmatter_only" &#124; "on_activation"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `path` | 属性 | <code>path: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "reference" &#124; "script" &#124; "asset"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillContextLoadInput`

Skill Context Load Input 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillContextLoadInput } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillContextLoadInput {
    selection: SkillSelection;
    policyDecision: SkillPolicyDecision;
    maxChars?: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `maxChars` | 属性 | <code>maxChars?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyDecision` | 属性 | <code>policyDecision: SkillPolicyDecision</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selection` | 属性 | <code>selection: SkillSelection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillLoader`

Skill Loader 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillLoader } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillLoader {
    load(): Promise<SkillSpec[]>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `load` | 方法 | <code>load(): Promise&lt;SkillSpec[]&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SkillPolicy`

Skill Policy 接口，共包含 1 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillPolicy } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillPolicy {
    evaluate(input: SkillPolicyInput): Promise<SkillPolicyDecision>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `evaluate` | 方法 | <code>evaluate(input: SkillPolicyInput): Promise&lt;SkillPolicyDecision&gt;</code> | 公开方法；参数与返回类型以签名列为准。 |

## `SkillPolicyDecision`

Skill Policy Decision 接口，共包含 6 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillPolicyDecision } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `allowed` | 属性 | <code>allowed: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedTools` | 属性 | <code>allowedTools: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `policyId` | 属性 | <code>policyId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiresHumanReview` | 属性 | <code>requiresHumanReview?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillPolicyInput`

Skill Policy Input 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillPolicyInput } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillPolicyInput {
    selection: SkillSelection;
    context: SkillResolutionContext;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `context` | 属性 | <code>context: SkillResolutionContext</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selection` | 属性 | <code>selection: SkillSelection</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillRef`

Skill Ref 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillRef } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillRef {
    id: string;
    version?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillResolutionContext`

Skill Resolution Context 接口，共包含 8 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillResolutionContext } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentSkillRefs` | 属性 | <code>agentSkillRefs: SkillRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedSkills` | 属性 | <code>allowedSkills?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `availableToolRefs` | 属性 | <code>availableToolRefs?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputText` | 属性 | <code>inputText?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `intent` | 属性 | <code>intent?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `manualSkillIds` | 属性 | <code>manualSkillIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredSkills` | 属性 | <code>requiredSkills?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillSelection`

Skill Selection 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillSelection } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillSelection {
    spec: SkillSpec;
    reason: string;
    matchedPatterns: string[];
    priority: number;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `matchedPatterns` | 属性 | <code>matchedPatterns: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `spec` | 属性 | <code>spec: SkillSpec</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillSelectionRejection`

Skill Selection Rejection 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillSelectionRejection } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillSelectionRejection {
    skillId: string;
    reason: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `reason` | 属性 | <code>reason: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `skillId` | 属性 | <code>skillId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillSelectionResult`

Skill Selection Result 接口，共包含 2 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillSelectionResult } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export interface SkillSelectionResult {
    selected: SkillSelection[];
    rejected: SkillSelectionRejection[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `rejected` | 属性 | <code>rejected: SkillSelectionRejection[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `selected` | 属性 | <code>selected: SkillSelection[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillSpec`

Skill Spec 接口，共包含 26 个公开字段或方法。

- 种类: 接口
- 导入: `import type { SkillSpec } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

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

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `activationPolicy` | 属性 | <code>activationPolicy?: SkillActivationPolicy</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `allowedTools` | 属性 | <code>allowedTools?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `assets` | 属性 | <code>assets?: SkillAssetRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contextBudget` | 属性 | <code>contextBudget?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `createdAt` | 属性 | <code>createdAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `enabled` | 属性 | <code>enabled?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `evaluationCases` | 属性 | <code>evaluationCases?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `inputSchema` | 属性 | <code>inputSchema?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `memoryAccessPolicy` | 属性 | <code>memoryAccessPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `outputContract` | 属性 | <code>outputContract?: JsonSchema</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `owner` | 属性 | <code>owner?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `priority` | 属性 | <code>priority?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `references` | 属性 | <code>references?: SkillAssetRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredMCPServers` | 属性 | <code>requiredMCPServers?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `requiredTools` | 属性 | <code>requiredTools?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scripts` | 属性 | <code>scripts?: SkillAssetRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `sideEffectPolicy` | 属性 | <code>sideEffectPolicy?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tags` | 属性 | <code>tags?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `updatedAt` | 属性 | <code>updatedAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `SkillActivationMode`

Skill Activation Mode 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { SkillActivationMode } from '@codesoul-co/hypha-skills';`
- 源码模块: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/skills/src/index.ts)

### 声明

```text
export type SkillActivationMode = 'always' | 'keyword' | 'regex' | 'intent' | 'manual';
```
