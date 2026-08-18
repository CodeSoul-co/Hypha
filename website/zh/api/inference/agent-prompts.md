# `@codesoul-co/hypha-inference` / `agent-prompts`

- 包索引: [`@codesoul-co/hypha-inference`](/zh/api/inference)
- 源码: [`packages/inference/src/agent-prompts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)
- 导出数: **16**

## 模块用法

用于使用该功能边界的公共契约与操作。Agent prompts 模块公开 1 类、3 常量、2 函数、8 接口、2 类型。

### 从包入口导入

```ts
import {
  AgentPromptRegistry,
  agentPromptRefSchema,
  agentPromptSpecSchema,
  agentPromptVariableSpecSchema,
  agentPromptSubjectHash,
  renderAgentPrompt,
} from '@codesoul-co/hypha-inference';

import type {
  AgentPromptApproval,
  AgentPromptPrincipal,
  AgentPromptRef,
  AgentPromptResolution,
  AgentPromptResolutionContext,
  AgentPromptSpec,
  AgentPromptVariableSpec,
  ResolvedAgentPromptBlock,
} from '@codesoul-co/hypha-inference';

// 完整导出列表见下方。
```

### 使用要点

- 10 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 `import type`，运行时不应依赖它们。
- 1 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。
- 2 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。
- 3 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。

### 运行时校验示例

```ts
import { agentPromptRefSchema } from '@codesoul-co/hypha-inference';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = agentPromptRefSchema.parse(input);
```

配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `AgentPromptRegistry` | 类 | <code>new AgentPromptRegistry(): AgentPromptRegistry</code> | Agent Prompt Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。 |
| `agentPromptRefSchema` | 常量 | <code>const agentPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }&gt;</code> | Agent Prompt Ref 的运行时 Schema。 |
| `agentPromptSpecSchema` | 常量 | <code>const agentPromptSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; role: z.ZodEnum&lt;["system", "developer"]&gt;; template: z.ZodString; variables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOption...</code> | Agent Prompt Spec 的运行时 Schema。 |
| `agentPromptVariableSpecSchema` | 常量 | <code>const agentPromptVariableSpecSchema: z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOptional&lt;z.ZodUnknown&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { name: string; type: "string" &#124; "number" &#124; "boolean" &#124; "object" &#124; "array"; description?: string &#124; undefined; default?: unknown; requi...</code> | Agent Prompt Variable Spec 的运行时 Schema。 |
| `agentPromptSubjectHash` | 函数 | <code>agentPromptSubjectHash(spec: Pick&lt;AgentPromptSpec, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;): string</code> | Agent Prompt Subject Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `renderAgentPrompt` | 函数 | <code>renderAgentPrompt(spec: AgentPromptSpec, variables: Record&lt;string, unknown&gt;): string</code> | Render Agent Prompt 函数，提供 1 个公开调用签名；参数与返回类型见下表。 |
| `AgentPromptApproval` | 接口 | <code>interface AgentPromptApproval</code> | Agent Prompt Approval 接口，共包含 14 个公开字段或方法。 |
| `AgentPromptPrincipal` | 接口 | <code>interface AgentPromptPrincipal</code> | Agent Prompt Principal 接口，共包含 4 个公开字段或方法。 |
| `AgentPromptRef` | 接口 | <code>interface AgentPromptRef</code> | Agent Prompt Ref 接口，共包含 4 个公开字段或方法。 |
| `AgentPromptResolution` | 接口 | <code>interface AgentPromptResolution</code> | Agent Prompt Resolution 接口，共包含 3 个公开字段或方法。 |
| `AgentPromptResolutionContext` | 接口 | <code>interface AgentPromptResolutionContext</code> | Agent Prompt Resolution Context 接口，共包含 3 个公开字段或方法。 |
| `AgentPromptSpec` | 接口 | <code>interface AgentPromptSpec</code> | Agent Prompt Spec 接口，共包含 19 个公开字段或方法。 |
| `AgentPromptVariableSpec` | 接口 | <code>interface AgentPromptVariableSpec</code> | Agent Prompt Variable Spec 接口，共包含 5 个公开字段或方法。 |
| `ResolvedAgentPromptBlock` | 接口 | <code>interface ResolvedAgentPromptBlock</code> | Resolved Agent Prompt Block 接口，共包含 18 个公开字段或方法。 |
| `AgentPromptRole` | 类型 | <code>type AgentPromptRole = 'system' &#124; 'developer'</code> | Agent Prompt Role 公共类型别名；完整类型表达式见声明。 |
| `AgentPromptVariableType` | 类型 | <code>type AgentPromptVariableType = 'string' &#124; 'number' &#124; 'boolean' &#124; 'array' &#124; 'object'</code> | Agent Prompt Variable Type 公共类型别名；完整类型表达式见声明。 |

## `AgentPromptRegistry`

Agent Prompt Registry 类，共公开 6 个构造函数或成员；精确签名见本条目的声明与成员表。

- 种类: 类
- 导入: `import { AgentPromptRegistry } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export declare class AgentPromptRegistry {
    register(input: AgentPromptSpec, options?: {
            replace?: boolean;
            expectedRevision?: number;
        }): AgentPromptSpec;
    unregister(id: string, version?: string): boolean;
    get(id: string, version?: string): AgentPromptSpec | null;
    list(): AgentPromptSpec[];
    resolve(refs: AgentPromptRef[], context: AgentPromptResolutionContext): AgentPromptResolution;
}
```

### 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): AgentPromptRegistry</code> | 创建该类的实例。 |
| `get` | 方法 | <code>get(id: string, version?: string): AgentPromptSpec &#124; null</code> | 公开方法；参数与返回类型以签名列为准。 |
| `list` | 方法 | <code>list(): AgentPromptSpec[]</code> | 公开方法；参数与返回类型以签名列为准。 |
| `register` | 方法 | <code>register(input: AgentPromptSpec, options?: { replace?: boolean; expectedRevision?: number; }): AgentPromptSpec</code> | 公开方法；参数与返回类型以签名列为准。 |
| `resolve` | 方法 | <code>resolve(refs: AgentPromptRef[], context: AgentPromptResolutionContext): AgentPromptResolution</code> | 公开方法；参数与返回类型以签名列为准。 |
| `unregister` | 方法 | <code>unregister(id: string, version?: string): boolean</code> | 公开方法；参数与返回类型以签名列为准。 |

## `agentPromptRefSchema`

Agent Prompt Ref 的运行时 Schema。

- 种类: 常量
- 导入: `import { agentPromptRefSchema } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export declare const agentPromptRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; required: z.ZodOptional<z.ZodBoolean>; priority: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; priority?: number | undefined; required?: boolean | undefined; }, { id: string; version?: string | undefined; priority?: number | undefined; required?: boolean | undefined; }>;
```

## `agentPromptSpecSchema`

Agent Prompt Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { agentPromptSpecSchema } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
// 精确类型由包入口解析；完整编译器展开定义见源码链接。
export declare const agentPromptSpecSchema: (typeof import('@codesoul-co/hypha-inference'))['agentPromptSpecSchema'];
```

> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。

## `agentPromptVariableSpecSchema`

Agent Prompt Variable Spec 的运行时 Schema。

- 种类: 常量
- 导入: `import { agentPromptVariableSpecSchema } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export declare const agentPromptVariableSpecSchema: z.ZodObject<{ name: z.ZodString; type: z.ZodEnum<["string", "number", "boolean", "array", "object"]>; required: z.ZodOptional<z.ZodBoolean>; default: z.ZodOptional<z.ZodUnknown>; description: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { name: string; type: "string" | "number" | "boolean" | "object" | "array"; description?: string | undefined; default?: unknown; required?: boolean | undefined; }, { name: string; type: "string" | "number" | "boolean" | "object" | "array"; description?: string | undefined; default?: unknown; required?: boolean | undefined; }>;
```

## `agentPromptSubjectHash`

Agent Prompt Subject Hash 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { agentPromptSubjectHash } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export declare function agentPromptSubjectHash(spec: Pick<AgentPromptSpec, 'id' | 'version' | 'revision' | 'contentHash'>): string;
```

### 调用签名

```text
agentPromptSubjectHash(spec: Pick<AgentPromptSpec, "id" | "version" | "revision" | "contentHash">): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>Pick&lt;AgentPromptSpec, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `renderAgentPrompt`

Render Agent Prompt 函数，提供 1 个公开调用签名；参数与返回类型见下表。

- 种类: 函数
- 导入: `import { renderAgentPrompt } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export declare function renderAgentPrompt(spec: AgentPromptSpec, variables: Record<string, unknown>): string;
```

### 调用签名

```text
renderAgentPrompt(spec: AgentPromptSpec, variables: Record<string, unknown>): string
```

#### 参数

| 参数 | 类型 | 必需 | 说明 |
| --- | --- | --- | --- |
| `spec` | <code>AgentPromptSpec</code> | 是 | 必需参数；接受的值由类型列定义。 |
| `variables` | <code>Record&lt;string, unknown&gt;</code> | 是 | 必需参数；接受的值由类型列定义。 |

#### 返回值

- 类型: `string`
- 说明: 返回值契约由上述类型定义。

## `AgentPromptApproval`

Agent Prompt Approval 接口，共包含 14 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptApproval } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptApproval {
    taskId: string;
    subjectType: 'agent_prompt';
    subjectHash: string;
    promptId: string;
    promptVersion: string;
    promptRevision: number;
    contentHash: string;
    approvedBy: string;
    principalId?: string;
    tenantId?: string;
    agentId?: string;
    domainId?: string;
    expiresAt?: string;
    status: 'approved';
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `approvedBy` | 属性 | <code>approvedBy: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainId` | 属性 | <code>domainId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `expiresAt` | 属性 | <code>expiresAt?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptId` | 属性 | <code>promptId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptRevision` | 属性 | <code>promptRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `promptVersion` | 属性 | <code>promptVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `status` | 属性 | <code>status: "approved"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectHash` | 属性 | <code>subjectHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `subjectType` | 属性 | <code>subjectType: "agent_prompt"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `taskId` | 属性 | <code>taskId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptPrincipal`

Agent Prompt Principal 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptPrincipal } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptPrincipal {
    principalId: string;
    tenantId?: string;
    agentId?: string;
    domainId?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentId` | 属性 | <code>agentId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainId` | 属性 | <code>domainId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principalId` | 属性 | <code>principalId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptRef`

Agent Prompt Ref 接口，共包含 4 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptRef } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptRef {
    id: string;
    version?: string;
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
| `version` | 属性 | <code>version?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptResolution`

Agent Prompt Resolution 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptResolution } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptResolution {
    instructions: string;
    blocks: ResolvedAgentPromptBlock[];
    missing: AgentPromptRef[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `blocks` | 属性 | <code>blocks: ResolvedAgentPromptBlock[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `instructions` | 属性 | <code>instructions: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `missing` | 属性 | <code>missing: AgentPromptRef[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptResolutionContext`

Agent Prompt Resolution Context 接口，共包含 3 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptResolutionContext } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptResolutionContext {
    variables: Record<string, unknown>;
    principal: AgentPromptPrincipal;
    approvals?: AgentPromptApproval[];
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `approvals` | 属性 | <code>approvals?: AgentPromptApproval[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `principal` | 属性 | <code>principal: AgentPromptPrincipal</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variables` | 属性 | <code>variables: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptSpec`

Agent Prompt Spec 接口，共包含 19 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptSpec } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptSpec {
    id: string;
    version: string;
    name: string;
    description?: string;
    role: AgentPromptRole;
    template: string;
    variables?: AgentPromptVariableSpec[];
    stable?: boolean;
    cacheable?: boolean;
    ownerId?: string;
    tenantId?: string;
    scope?: 'global' | 'tenant' | 'owner';
    trustLevel?: 'trusted' | 'reviewed' | 'untrusted';
    agentIds?: string[];
    domainIds?: string[];
    provenance?: Record<string, unknown>;
    revision?: number;
    contentHash?: string;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `agentIds` | 属性 | <code>agentIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `cacheable` | 属性 | <code>cacheable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `contentHash` | 属性 | <code>contentHash?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `domainIds` | 属性 | <code>domainIds?: string[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `revision` | 属性 | <code>revision?: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: AgentPromptRole</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope?: "tenant" &#124; "owner" &#124; "global"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stable` | 属性 | <code>stable?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `template` | 属性 | <code>template: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `variables` | 属性 | <code>variables?: AgentPromptVariableSpec[]</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `version` | 属性 | <code>version: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptVariableSpec`

Agent Prompt Variable Spec 接口，共包含 5 个公开字段或方法。

- 种类: 接口
- 导入: `import type { AgentPromptVariableSpec } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface AgentPromptVariableSpec {
    name: string;
    type: AgentPromptVariableType;
    required?: boolean;
    default?: unknown;
    description?: string;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `default` | 属性 | <code>default?: unknown</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `description` | 属性 | <code>description?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `name` | 属性 | <code>name: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `required` | 属性 | <code>required?: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: AgentPromptVariableType</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `ResolvedAgentPromptBlock`

Resolved Agent Prompt Block 接口，共包含 18 个公开字段或方法。

- 种类: 接口
- 导入: `import type { ResolvedAgentPromptBlock } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export interface ResolvedAgentPromptBlock {
    id: string;
    type: 'prompt-template';
    role: AgentPromptRole;
    content: string;
    hash: string;
    stable: boolean;
    cacheable: boolean;
    order: number;
    templateId: string;
    templateVersion: string;
    templateRevision: number;
    templateContentHash: string;
    scope: 'global' | 'tenant' | 'owner';
    trustLevel: 'trusted' | 'reviewed' | 'untrusted';
    ownerId?: string;
    tenantId?: string;
    provenance?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
```

### 契约成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `cacheable` | 属性 | <code>cacheable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `content` | 属性 | <code>content: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `hash` | 属性 | <code>hash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `id` | 属性 | <code>id: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `metadata` | 属性 | <code>metadata?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `order` | 属性 | <code>order: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `ownerId` | 属性 | <code>ownerId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `provenance` | 属性 | <code>provenance?: Record&lt;string, unknown&gt;</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `role` | 属性 | <code>role: AgentPromptRole</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `scope` | 属性 | <code>scope: "tenant" &#124; "owner" &#124; "global"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `stable` | 属性 | <code>stable: boolean</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateContentHash` | 属性 | <code>templateContentHash: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateId` | 属性 | <code>templateId: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateRevision` | 属性 | <code>templateRevision: number</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `templateVersion` | 属性 | <code>templateVersion: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `tenantId` | 属性 | <code>tenantId?: string</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `trustLevel` | 属性 | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |
| `type` | 属性 | <code>type: "prompt-template"</code> | 公开属性；类型、只读和可选状态以签名列为准。 |

## `AgentPromptRole`

Agent Prompt Role 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { AgentPromptRole } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export type AgentPromptRole = 'system' | 'developer';
```

## `AgentPromptVariableType`

Agent Prompt Variable Type 公共类型别名；完整类型表达式见声明。

- 种类: 类型
- 导入: `import type { AgentPromptVariableType } from '@codesoul-co/hypha-inference';`
- 源码模块: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### 声明

```text
export type AgentPromptVariableType = 'string' | 'number' | 'boolean' | 'array' | 'object';
```
