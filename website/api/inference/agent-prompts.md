# `@codesoul-co/hypha-inference` / `agent-prompts`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Source: [`packages/inference/src/agent-prompts.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)
- Exports: **16**

## Using this module

Use the Agent prompts module for using the public contracts and operations for this capability boundary. It exports 1 class, 3 constants, 2 functions, 8 interfaces, 2 types.

### Import from the package entrypoint

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

// The complete export list is documented below.
```

### Usage patterns

- Use the 10 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 1 class as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 2 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { agentPromptRefSchema } from '@codesoul-co/hypha-inference';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = agentPromptRefSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `AgentPromptRegistry` | class | <code>new AgentPromptRegistry(): AgentPromptRegistry</code> | Agent Prompt Registry class with 6 public constructor or member entries; its exact declarations are listed below. |
| `agentPromptRefSchema` | constant | <code>const agentPromptRefSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; priority: z.ZodOptional&lt;z.ZodNumber&gt;; }, "strip", z.ZodTypeAny, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }, { id: string; version?: string &#124; undefined; priority?: number &#124; undefined; required?: boolean &#124; undefined; }&gt;</code> | Runtime schema for Agent Prompt Ref. |
| `agentPromptSpecSchema` | constant | <code>const agentPromptSpecSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; name: z.ZodString; description: z.ZodOptional&lt;z.ZodString&gt;; role: z.ZodEnum&lt;["system", "developer"]&gt;; template: z.ZodString; variables: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOption...</code> | Runtime schema for Agent Prompt Spec. |
| `agentPromptVariableSpecSchema` | constant | <code>const agentPromptVariableSpecSchema: z.ZodObject&lt;{ name: z.ZodString; type: z.ZodEnum&lt;["string", "number", "boolean", "array", "object"]&gt;; required: z.ZodOptional&lt;z.ZodBoolean&gt;; default: z.ZodOptional&lt;z.ZodUnknown&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; }, "strip", z.ZodTypeAny, { name: string; type: "string" &#124; "number" &#124; "boolean" &#124; "object" &#124; "array"; description?: string &#124; undefined; default?: unknown; requi...</code> | Runtime schema for Agent Prompt Variable Spec. |
| `agentPromptSubjectHash` | function | <code>agentPromptSubjectHash(spec: Pick&lt;AgentPromptSpec, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;): string</code> | Agent Prompt Subject Hash function with 1 public call signature; parameters and return types are listed below. |
| `renderAgentPrompt` | function | <code>renderAgentPrompt(spec: AgentPromptSpec, variables: Record&lt;string, unknown&gt;): string</code> | Render Agent Prompt function with 1 public call signature; parameters and return types are listed below. |
| `AgentPromptApproval` | interface | <code>interface AgentPromptApproval</code> | Agent Prompt Approval interface with 14 public fields or methods. |
| `AgentPromptPrincipal` | interface | <code>interface AgentPromptPrincipal</code> | Agent Prompt Principal interface with 4 public fields or methods. |
| `AgentPromptRef` | interface | <code>interface AgentPromptRef</code> | Agent Prompt Ref interface with 4 public fields or methods. |
| `AgentPromptResolution` | interface | <code>interface AgentPromptResolution</code> | Agent Prompt Resolution interface with 3 public fields or methods. |
| `AgentPromptResolutionContext` | interface | <code>interface AgentPromptResolutionContext</code> | Agent Prompt Resolution Context interface with 3 public fields or methods. |
| `AgentPromptSpec` | interface | <code>interface AgentPromptSpec</code> | Agent Prompt Spec interface with 19 public fields or methods. |
| `AgentPromptVariableSpec` | interface | <code>interface AgentPromptVariableSpec</code> | Agent Prompt Variable Spec interface with 5 public fields or methods. |
| `ResolvedAgentPromptBlock` | interface | <code>interface ResolvedAgentPromptBlock</code> | Resolved Agent Prompt Block interface with 18 public fields or methods. |
| `AgentPromptRole` | type | <code>type AgentPromptRole = 'system' &#124; 'developer'</code> | Public type alias for Agent Prompt Role; the declaration contains its complete type expression. |
| `AgentPromptVariableType` | type | <code>type AgentPromptVariableType = 'string' &#124; 'number' &#124; 'boolean' &#124; 'array' &#124; 'object'</code> | Public type alias for Agent Prompt Variable Type; the declaration contains its complete type expression. |

## `AgentPromptRegistry`

Agent Prompt Registry class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { AgentPromptRegistry } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

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

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): AgentPromptRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(id: string, version?: string): AgentPromptSpec &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): AgentPromptSpec[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(input: AgentPromptSpec, options?: { replace?: boolean; expectedRevision?: number; }): AgentPromptSpec</code> | Public method; parameters and return type are shown in the signature. |
| `resolve` | method | <code>resolve(refs: AgentPromptRef[], context: AgentPromptResolutionContext): AgentPromptResolution</code> | Public method; parameters and return type are shown in the signature. |
| `unregister` | method | <code>unregister(id: string, version?: string): boolean</code> | Public method; parameters and return type are shown in the signature. |

## `agentPromptRefSchema`

Runtime schema for Agent Prompt Ref.

- Kind: constant
- Import: `import { agentPromptRefSchema } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export declare const agentPromptRefSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodOptional<z.ZodString>; required: z.ZodOptional<z.ZodBoolean>; priority: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { id: string; version?: string | undefined; priority?: number | undefined; required?: boolean | undefined; }, { id: string; version?: string | undefined; priority?: number | undefined; required?: boolean | undefined; }>;
```

## `agentPromptSpecSchema`

Runtime schema for Agent Prompt Spec.

- Kind: constant
- Import: `import { agentPromptSpecSchema } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const agentPromptSpecSchema: (typeof import('@codesoul-co/hypha-inference'))['agentPromptSpecSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `agentPromptVariableSpecSchema`

Runtime schema for Agent Prompt Variable Spec.

- Kind: constant
- Import: `import { agentPromptVariableSpecSchema } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export declare const agentPromptVariableSpecSchema: z.ZodObject<{ name: z.ZodString; type: z.ZodEnum<["string", "number", "boolean", "array", "object"]>; required: z.ZodOptional<z.ZodBoolean>; default: z.ZodOptional<z.ZodUnknown>; description: z.ZodOptional<z.ZodString>; }, "strip", z.ZodTypeAny, { name: string; type: "string" | "number" | "boolean" | "object" | "array"; description?: string | undefined; default?: unknown; required?: boolean | undefined; }, { name: string; type: "string" | "number" | "boolean" | "object" | "array"; description?: string | undefined; default?: unknown; required?: boolean | undefined; }>;
```

## `agentPromptSubjectHash`

Agent Prompt Subject Hash function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { agentPromptSubjectHash } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export declare function agentPromptSubjectHash(spec: Pick<AgentPromptSpec, 'id' | 'version' | 'revision' | 'contentHash'>): string;
```

### Call signature

```text
agentPromptSubjectHash(spec: Pick<AgentPromptSpec, "id" | "version" | "revision" | "contentHash">): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>Pick&lt;AgentPromptSpec, "id" &#124; "version" &#124; "revision" &#124; "contentHash"&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `renderAgentPrompt`

Render Agent Prompt function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { renderAgentPrompt } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export declare function renderAgentPrompt(spec: AgentPromptSpec, variables: Record<string, unknown>): string;
```

### Call signature

```text
renderAgentPrompt(spec: AgentPromptSpec, variables: Record<string, unknown>): string
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `spec` | <code>AgentPromptSpec</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `variables` | <code>Record&lt;string, unknown&gt;</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `string`
- Description: The return contract is defined by the type shown above.

## `AgentPromptApproval`

Agent Prompt Approval interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptApproval } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `approvedBy` | property | <code>approvedBy: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainId` | property | <code>domainId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `expiresAt` | property | <code>expiresAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptId` | property | <code>promptId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptRevision` | property | <code>promptRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `promptVersion` | property | <code>promptVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "approved"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectHash` | property | <code>subjectHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `subjectType` | property | <code>subjectType: "agent_prompt"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `taskId` | property | <code>taskId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptPrincipal`

Agent Prompt Principal interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptPrincipal } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export interface AgentPromptPrincipal {
    principalId: string;
    tenantId?: string;
    agentId?: string;
    domainId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentId` | property | <code>agentId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainId` | property | <code>domainId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principalId` | property | <code>principalId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptRef`

Agent Prompt Ref interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptRef } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export interface AgentPromptRef {
    id: string;
    version?: string;
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
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptResolution`

Agent Prompt Resolution interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptResolution } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export interface AgentPromptResolution {
    instructions: string;
    blocks: ResolvedAgentPromptBlock[];
    missing: AgentPromptRef[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `blocks` | property | <code>blocks: ResolvedAgentPromptBlock[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `missing` | property | <code>missing: AgentPromptRef[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptResolutionContext`

Agent Prompt Resolution Context interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptResolutionContext } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export interface AgentPromptResolutionContext {
    variables: Record<string, unknown>;
    principal: AgentPromptPrincipal;
    approvals?: AgentPromptApproval[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `approvals` | property | <code>approvals?: AgentPromptApproval[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `principal` | property | <code>principal: AgentPromptPrincipal</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variables` | property | <code>variables: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptSpec`

Agent Prompt Spec interface with 19 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptSpec } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `agentIds` | property | <code>agentIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheable` | property | <code>cacheable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `contentHash` | property | <code>contentHash?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `domainIds` | property | <code>domainIds?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: AgentPromptRole</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope?: "tenant" &#124; "owner" &#124; "global"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stable` | property | <code>stable?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `template` | property | <code>template: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel?: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `variables` | property | <code>variables?: AgentPromptVariableSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptVariableSpec`

Agent Prompt Variable Spec interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { AgentPromptVariableSpec } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export interface AgentPromptVariableSpec {
    name: string;
    type: AgentPromptVariableType;
    required?: boolean;
    default?: unknown;
    description?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `default` | property | <code>default?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: AgentPromptVariableType</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ResolvedAgentPromptBlock`

Resolved Agent Prompt Block interface with 18 public fields or methods.

- Kind: interface
- Import: `import type { ResolvedAgentPromptBlock } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

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

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheable` | property | <code>cacheable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `hash` | property | <code>hash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `order` | property | <code>order: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `ownerId` | property | <code>ownerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `provenance` | property | <code>provenance?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: AgentPromptRole</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `scope` | property | <code>scope: "tenant" &#124; "owner" &#124; "global"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stable` | property | <code>stable: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateContentHash` | property | <code>templateContentHash: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateId` | property | <code>templateId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateRevision` | property | <code>templateRevision: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `templateVersion` | property | <code>templateVersion: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tenantId` | property | <code>tenantId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `trustLevel` | property | <code>trustLevel: "trusted" &#124; "reviewed" &#124; "untrusted"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "prompt-template"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `AgentPromptRole`

Public type alias for Agent Prompt Role; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { AgentPromptRole } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export type AgentPromptRole = 'system' | 'developer';
```

## `AgentPromptVariableType`

Public type alias for Agent Prompt Variable Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { AgentPromptVariableType } from '@codesoul-co/hypha-inference';`
- Source module: [`agent-prompts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/agent-prompts.ts)

### Declaration

```text
export type AgentPromptVariableType = 'string' | 'number' | 'boolean' | 'array' | 'object';
```
