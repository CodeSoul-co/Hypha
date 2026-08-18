# `@codesoul-co/hypha-models` / `index`

- Package index: [`@codesoul-co/hypha-models`](/api/models)
- Source: [`packages/models/src/index.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)
- Exports: **36**

## Using this module

Aggregates the public entrypoint exports for `@codesoul-co/hypha-models`; applications import these symbols from the package entrypoint instead of internal file paths.

### Import from the package entrypoint

```ts
import {
  MockModelProvider,
  ModelRegistry,
  modelAliasSpecDefinition,
  modelAliasSpecExample,
  modelAliasSpecJsonSchema,
  modelAliasSpecSchema,
  modelCapabilitiesSchema,
  modelProviderSpecDefinition,
} from '@codesoul-co/hypha-models';

import type {
  ModelAliasSpec,
  ModelCacheControl,
  ModelCapabilities,
  ModelMessage,
  ModelProvider,
  ModelProviderSpec,
  ModelRequest,
  ModelResponse,
} from '@codesoul-co/hypha-models';

// The complete export list is documented below.
```

### Usage patterns

- Use the 15 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 16 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { modelAliasSpecSchema } from '@codesoul-co/hypha-models';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = modelAliasSpecSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `MockModelProvider` | class | <code>new MockModelProvider(id?: string): MockModelProvider</code> | Mock Model Provider class with 6 public constructor or member entries; its exact declarations are listed below. |
| `ModelRegistry` | class | <code>new ModelRegistry(): ModelRegistry</code> | Model Registry class with 4 public constructor or member entries; its exact declarations are listed below. |
| `modelAliasSpecDefinition` | constant | <code>const modelAliasSpecDefinition: SpecSchemaDefinition&lt;ModelAliasSpec&gt;</code> | Runtime validation entrypoint for the Model Alias spec, combining its parser, example and JSON Schema. |
| `modelAliasSpecExample` | constant | <code>const modelAliasSpecExample: ModelAliasSpec</code> | Valid example value for Model Alias Spec. |
| `modelAliasSpecJsonSchema` | constant | <code>const modelAliasSpecJsonSchema: JsonSchema</code> | JSON Schema for Model Alias Spec. |
| `modelAliasSpecSchema` | constant | <code>const modelAliasSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip...</code> | Runtime schema for Model Alias Spec. |
| `modelCapabilitiesSchema` | constant | <code>const modelCapabilitiesSchema: z.ZodObject&lt;{ chat: z.ZodOptional&lt;z.ZodBoolean&gt;; streaming: z.ZodOptional&lt;z.ZodBoolean&gt;; toolCalling: z.ZodOptional&lt;z.ZodBoolean&gt;; jsonMode: z.ZodOptional&lt;z.ZodBoolean&gt;; embeddings: z.ZodOptional&lt;z.ZodBoolean&gt;; reasoning: z.ZodOptional&lt;z.ZodBoolean&gt;; prefixCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; kvCaching: z.ZodOptional&lt;z.ZodBoolean&gt;; }, "strip", z.ZodTypeAny, { chat?: boolean &#124; undefi...</code> | Runtime schema for Model Capabilities. |
| `modelProviderSpecDefinition` | constant | <code>const modelProviderSpecDefinition: SpecSchemaDefinition&lt;ModelProviderSpec&gt;</code> | Runtime validation entrypoint for the Model Provider spec, combining its parser, example and JSON Schema. |
| `modelProviderSpecExample` | constant | <code>const modelProviderSpecExample: ModelProviderSpec</code> | Valid example value for Model Provider Spec. |
| `modelProviderSpecJsonSchema` | constant | <code>const modelProviderSpecJsonSchema: JsonSchema</code> | JSON Schema for Model Provider Spec. |
| `modelProviderSpecSchema` | constant | <code>const modelProviderSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { type: z.ZodString; defaultModelAlias: z.ZodOptional&lt;z.ZodString&gt;; capabilities:...</code> | Runtime schema for Model Provider Spec. |
| `modelRequestSchema` | constant | <code>const modelRequestSchema: z.ZodObject&lt;{ runId: z.ZodString; stepId: z.ZodString; modelAlias: z.ZodString; instructions: z.ZodOptional&lt;z.ZodString&gt;; input: z.ZodUnknown; tools: z.ZodOptional&lt;z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; name: z.ZodString; description: z.ZodString; inputSchema: z.ZodType&lt;JsonSchema, z.ZodTypeDef, JsonSchema&gt;; }, "strip", z.ZodTypeAny, { id: string; name: string; description: string; inp...</code> | Runtime schema for Model Request. |
| `modelRoutingSpecDefinition` | constant | <code>const modelRoutingSpecDefinition: SpecSchemaDefinition&lt;ModelRoutingSpec&gt;</code> | Runtime validation entrypoint for the Model Routing spec, combining its parser, example and JSON Schema. |
| `modelRoutingSpecExample` | constant | <code>const modelRoutingSpecExample: ModelRoutingSpec</code> | Valid example value for Model Routing Spec. |
| `modelRoutingSpecJsonSchema` | constant | <code>const modelRoutingSpecJsonSchema: JsonSchema</code> | JSON Schema for Model Routing Spec. |
| `modelRoutingSpecSchema` | constant | <code>const modelRoutingSpecSchema: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodString; } &amp; { name: z.ZodOptional&lt;z.ZodString&gt;; description: z.ZodOptional&lt;z.ZodString&gt;; owner: z.ZodOptional&lt;z.ZodString&gt;; tags: z.ZodOptional&lt;z.ZodArray&lt;z.ZodString, "many"&gt;&gt;; createdAt: z.ZodOptional&lt;z.ZodString&gt;; updatedAt: z.ZodOptional&lt;z.ZodString&gt;; } &amp; { defaultAlias: z.ZodString; aliases: z.ZodArray&lt;z.ZodObject&lt;{ id: z.ZodString; ve...</code> | Runtime schema for Model Routing Spec. |
| `modelSpecDefinitions` | constant | <code>const modelSpecDefinitions: readonly [SpecSchemaDefinition&lt;ModelProviderSpec&gt;, SpecSchemaDefinition&lt;ModelAliasSpec&gt;, SpecSchemaDefinition&lt;ModelRoutingSpec&gt;]</code> | Model Spec Definitions constant exported by the `index` module. |
| `modelSpecJsonSchemas` | constant | <code>const modelSpecJsonSchemas: Record&lt;string, JsonSchema&gt;</code> | Model Spec JSON Schemas constant exported by the `index` module. |
| `validateModelAliasSpec` | function | <code>validateModelAliasSpec(input: unknown): ModelAliasSpec</code> | Validate Model Alias Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateModelProviderSpec` | function | <code>validateModelProviderSpec(input: unknown): ModelProviderSpec</code> | Validate Model Provider Spec function with 1 public call signature; parameters and return types are listed below. |
| `validateModelRoutingSpec` | function | <code>validateModelRoutingSpec(input: unknown): ModelRoutingSpec</code> | Validate Model Routing Spec function with 1 public call signature; parameters and return types are listed below. |
| `ModelAliasSpec` | interface | <code>interface ModelAliasSpec extends VersionedSpec, SpecMetadata</code> | Model Alias Spec interface with 11 public fields or methods. |
| `ModelCacheControl` | interface | <code>interface ModelCacheControl</code> | Model Cache Control interface with 4 public fields or methods. |
| `ModelCapabilities` | interface | <code>interface ModelCapabilities</code> | Model Capabilities interface with 8 public fields or methods. |
| `ModelMessage` | interface | <code>interface ModelMessage</code> | Model Message interface with 4 public fields or methods. |
| `ModelProvider` | interface | <code>interface ModelProvider</code> | Model Provider interface with 5 public fields or methods. |
| `ModelProviderSpec` | interface | <code>interface ModelProviderSpec extends VersionedSpec, SpecMetadata</code> | Model Provider Spec interface with 14 public fields or methods. |
| `ModelRequest` | interface | <code>interface ModelRequest</code> | Model Request interface with 12 public fields or methods. |
| `ModelResponse` | interface | <code>interface ModelResponse</code> | Model Response interface with 8 public fields or methods. |
| `ModelRoutingSpec` | interface | <code>interface ModelRoutingSpec extends VersionedSpec, SpecMetadata</code> | Model Routing Spec interface with 11 public fields or methods. |
| `ModelStreamEvent` | interface | <code>interface ModelStreamEvent</code> | Model Stream Event interface with 5 public fields or methods. |
| `ModelToolDescriptor` | interface | <code>interface ModelToolDescriptor</code> | Model Tool Descriptor interface with 4 public fields or methods. |
| `ModelUsage` | interface | <code>interface ModelUsage</code> | Model Usage interface with 5 public fields or methods. |
| `NormalizedToolCall` | interface | <code>interface NormalizedToolCall</code> | Normalized Tool Call interface with 3 public fields or methods. |
| `ReasoningOptions` | interface | <code>interface ReasoningOptions</code> | Reasoning Options interface with 2 public fields or methods. |
| `ModelProviderType` | type | <code>type ModelProviderType = 'openai' &#124; 'openai-compatible' &#124; 'mock' &#124; string</code> | Public type alias for Model Provider Type; the declaration contains its complete type expression. |

## `MockModelProvider`

Mock Model Provider class with 6 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { MockModelProvider } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare class MockModelProvider implements ModelProvider {
    readonly id: string;
    constructor(id?: string);
    capabilities(): ModelCapabilities;
    generate(request: ModelRequest): Promise<ModelResponse>;
    stream(request: ModelRequest): AsyncIterable<ModelStreamEvent>;
    countTokens(input: unknown): Promise<ModelUsage>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(id?: string): MockModelProvider</code> | Creates an instance of this class. |
| `countTokens` | method | <code>countTokens(input: unknown): Promise&lt;ModelUsage&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `generate` | method | <code>generate(request: ModelRequest): Promise&lt;ModelResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>readonly id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream(request: ModelRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ModelRegistry`

Model Registry class with 4 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { ModelRegistry } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare class ModelRegistry {
    register(provider: ModelProvider): void;
    get(providerId: string): ModelProvider | null;
    list(): ModelProvider[];
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ModelRegistry</code> | Creates an instance of this class. |
| `get` | method | <code>get(providerId: string): ModelProvider &#124; null</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): ModelProvider[]</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(provider: ModelProvider): void</code> | Public method; parameters and return type are shown in the signature. |

## `modelAliasSpecDefinition`

Runtime validation entrypoint for the Model Alias spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { modelAliasSpecDefinition } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelAliasSpecDefinition: SpecSchemaDefinition<ModelAliasSpec>;
```

## `modelAliasSpecExample`

Valid example value for Model Alias Spec.

- Kind: constant
- Import: `import { modelAliasSpecExample } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelAliasSpecExample: ModelAliasSpec;
```

## `modelAliasSpecJsonSchema`

JSON Schema for Model Alias Spec.

- Kind: constant
- Import: `import { modelAliasSpecJsonSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelAliasSpecJsonSchema: JsonSchema;
```

## `modelAliasSpecSchema`

Runtime schema for Model Alias Spec.

- Kind: constant
- Import: `import { modelAliasSpecSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelAliasSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }>;
```

## `modelCapabilitiesSchema`

Runtime schema for Model Capabilities.

- Kind: constant
- Import: `import { modelCapabilitiesSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelCapabilitiesSchema: z.ZodObject<{ chat: z.ZodOptional<z.ZodBoolean>; streaming: z.ZodOptional<z.ZodBoolean>; toolCalling: z.ZodOptional<z.ZodBoolean>; jsonMode: z.ZodOptional<z.ZodBoolean>; embeddings: z.ZodOptional<z.ZodBoolean>; reasoning: z.ZodOptional<z.ZodBoolean>; prefixCaching: z.ZodOptional<z.ZodBoolean>; kvCaching: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }>;
```

## `modelProviderSpecDefinition`

Runtime validation entrypoint for the Model Provider spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { modelProviderSpecDefinition } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelProviderSpecDefinition: SpecSchemaDefinition<ModelProviderSpec>;
```

## `modelProviderSpecExample`

Valid example value for Model Provider Spec.

- Kind: constant
- Import: `import { modelProviderSpecExample } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelProviderSpecExample: ModelProviderSpec;
```

## `modelProviderSpecJsonSchema`

JSON Schema for Model Provider Spec.

- Kind: constant
- Import: `import { modelProviderSpecJsonSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelProviderSpecJsonSchema: JsonSchema;
```

## `modelProviderSpecSchema`

Runtime schema for Model Provider Spec.

- Kind: constant
- Import: `import { modelProviderSpecSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelProviderSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { type: z.ZodString; defaultModelAlias: z.ZodOptional<z.ZodString>; capabilities: z.ZodOptional<z.ZodObject<{ chat: z.ZodOptional<z.ZodBoolean>; streaming: z.ZodOptional<z.ZodBoolean>; toolCalling: z.ZodOptional<z.ZodBoolean>; jsonMode: z.ZodOptional<z.ZodBoolean>; embeddings: z.ZodOptional<z.ZodBoolean>; reasoning: z.ZodOptional<z.ZodBoolean>; prefixCaching: z.ZodOptional<z.ZodBoolean>; kvCaching: z.ZodOptional<z.ZodBoolean>; }, "strip", z.ZodTypeAny, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }, { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; }>>; apiKeyEnv: z.ZodOptional<z.ZodString>; baseUrl: z.ZodOptional<z.ZodString>; timeoutMs: z.ZodOptional<z.ZodNumber>; }, "strip", z.ZodTypeAny, { type: string; id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; defaultModelAlias?: string | undefined; capabilities?: { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; } | undefined; apiKeyEnv?: string | undefined; baseUrl?: string | undefined; timeoutMs?: number | undefined; }, { type: string; id: string; version: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; defaultModelAlias?: string | undefined; capabilities?: { chat?: boolean | undefined; streaming?: boolean | undefined; toolCalling?: boolean | undefined; jsonMode?: boolean | undefined; embeddings?: boolean | undefined; reasoning?: boolean | undefined; prefixCaching?: boolean | undefined; kvCaching?: boolean | undefined; } | undefined; apiKeyEnv?: string | undefined; baseUrl?: string | undefined; timeoutMs?: number | undefined; }>;
```

## `modelRequestSchema`

Runtime schema for Model Request.

- Kind: constant
- Import: `import { modelRequestSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const modelRequestSchema: (typeof import('@codesoul-co/hypha-models'))['modelRequestSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `modelRoutingSpecDefinition`

Runtime validation entrypoint for the Model Routing spec, combining its parser, example and JSON Schema.

- Kind: constant
- Import: `import { modelRoutingSpecDefinition } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelRoutingSpecDefinition: SpecSchemaDefinition<ModelRoutingSpec>;
```

## `modelRoutingSpecExample`

Valid example value for Model Routing Spec.

- Kind: constant
- Import: `import { modelRoutingSpecExample } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelRoutingSpecExample: ModelRoutingSpec;
```

## `modelRoutingSpecJsonSchema`

JSON Schema for Model Routing Spec.

- Kind: constant
- Import: `import { modelRoutingSpecJsonSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelRoutingSpecJsonSchema: JsonSchema;
```

## `modelRoutingSpecSchema`

Runtime schema for Model Routing Spec.

- Kind: constant
- Import: `import { modelRoutingSpecSchema } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelRoutingSpecSchema: z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { defaultAlias: z.ZodString; aliases: z.ZodArray<z.ZodObject<{ id: z.ZodString; version: z.ZodString; } & { name: z.ZodOptional<z.ZodString>; description: z.ZodOptional<z.ZodString>; owner: z.ZodOptional<z.ZodString>; tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; createdAt: z.ZodOptional<z.ZodString>; updatedAt: z.ZodOptional<z.ZodString>; } & { alias: z.ZodString; providerId: z.ZodString; providerModel: z.ZodString; }, "strip", z.ZodTypeAny, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }, { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }>, "many">; fallbackAliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>; }, "strip", z.ZodTypeAny, { id: string; version: string; defaultAlias: string; aliases: { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }[]; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; fallbackAliases?: string[] | undefined; }, { id: string; version: string; defaultAlias: string; aliases: { id: string; version: string; alias: string; providerId: string; providerModel: string; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; }[]; name?: string | undefined; description?: string | undefined; owner?: string | undefined; tags?: string[] | undefined; createdAt?: string | undefined; updatedAt?: string | undefined; fallbackAliases?: string[] | undefined; }>;
```

## `modelSpecDefinitions`

Model Spec Definitions constant exported by the `index` module.

- Kind: constant
- Import: `import { modelSpecDefinitions } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelSpecDefinitions: readonly [SpecSchemaDefinition<ModelProviderSpec>, SpecSchemaDefinition<ModelAliasSpec>, SpecSchemaDefinition<ModelRoutingSpec>];
```

## `modelSpecJsonSchemas`

Model Spec JSON Schemas constant exported by the `index` module.

- Kind: constant
- Import: `import { modelSpecJsonSchemas } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare const modelSpecJsonSchemas: Record<string, JsonSchema>;
```

## `validateModelAliasSpec`

Validate Model Alias Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateModelAliasSpec } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare function validateModelAliasSpec(input: unknown): ModelAliasSpec;
```

### Call signature

```text
validateModelAliasSpec(input: unknown): ModelAliasSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ModelAliasSpec`
- Description: The return contract is defined by the type shown above.

## `validateModelProviderSpec`

Validate Model Provider Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateModelProviderSpec } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare function validateModelProviderSpec(input: unknown): ModelProviderSpec;
```

### Call signature

```text
validateModelProviderSpec(input: unknown): ModelProviderSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ModelProviderSpec`
- Description: The return contract is defined by the type shown above.

## `validateModelRoutingSpec`

Validate Model Routing Spec function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { validateModelRoutingSpec } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export declare function validateModelRoutingSpec(input: unknown): ModelRoutingSpec;
```

### Call signature

```text
validateModelRoutingSpec(input: unknown): ModelRoutingSpec
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ModelRoutingSpec`
- Description: The return contract is defined by the type shown above.

## `ModelAliasSpec`

Model Alias Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ModelAliasSpec } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelAliasSpec extends VersionedSpec, SpecMetadata {
    alias: string;
    providerId: string;
    providerModel: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `alias` | property | <code>alias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerModel` | property | <code>providerModel: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelCacheControl`

Model Cache Control interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ModelCacheControl } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelCacheControl {
    prefixContent?: string;
    kvCacheValue?: unknown;
    kvCacheRef?: {
        id: string;
        provider: string;
        modelAlias: string;
        scope: 'run' | 'session' | 'workspace';
        expiresAt?: string;
        metadata?: Record<string, unknown>;
    };
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `kvCacheRef` | property | <code>kvCacheRef?: { id: string; provider: string; modelAlias: string; scope: "run" &#124; "session" &#124; "workspace"; expiresAt?: string; metadata?: Record&lt;string, unknown&gt;; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCacheValue` | property | <code>kvCacheValue?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixContent` | property | <code>prefixContent?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelCapabilities`

Model Capabilities interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ModelCapabilities } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelCapabilities {
    chat?: boolean;
    streaming?: boolean;
    toolCalling?: boolean;
    jsonMode?: boolean;
    embeddings?: boolean;
    reasoning?: boolean;
    prefixCaching?: boolean;
    kvCaching?: boolean;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `chat` | property | <code>chat?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `embeddings` | property | <code>embeddings?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `jsonMode` | property | <code>jsonMode?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kvCaching` | property | <code>kvCaching?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prefixCaching` | property | <code>prefixCaching?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoning` | property | <code>reasoning?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `streaming` | property | <code>streaming?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalling` | property | <code>toolCalling?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelMessage`

Model Message interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ModelMessage } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelMessage {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    name?: string;
    toolCallId?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `role` | property | <code>role: "system" &#124; "tool" &#124; "user" &#124; "assistant"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCallId` | property | <code>toolCallId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelProvider`

Model Provider interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ModelProvider } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelProvider<TRequest = ModelRequest, TResponse = ModelResponse> {
    id: string;
    capabilities(): ModelCapabilities;
    generate(request: TRequest): Promise<TResponse>;
    stream?(request: TRequest): AsyncIterable<ModelStreamEvent>;
    countTokens?(input: unknown): Promise<ModelUsage>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilities` | method | <code>capabilities(): ModelCapabilities</code> | Public method; parameters and return type are shown in the signature. |
| `countTokens` | method | <code>countTokens?(input: unknown): Promise&lt;ModelUsage&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `generate` | method | <code>generate(request: TRequest): Promise&lt;TResponse&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stream` | method | <code>stream?(request: TRequest): AsyncIterable&lt;ModelStreamEvent&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `ModelProviderSpec`

Model Provider Spec interface with 14 public fields or methods.

- Kind: interface
- Import: `import type { ModelProviderSpec } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelProviderSpec extends VersionedSpec, SpecMetadata {
    id: string;
    type: ModelProviderType;
    defaultModelAlias?: string;
    capabilities?: ModelCapabilities;
    apiKeyEnv?: string;
    baseUrl?: string;
    timeoutMs?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `apiKeyEnv` | property | <code>apiKeyEnv?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `baseUrl` | property | <code>baseUrl?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `capabilities` | property | <code>capabilities?: ModelCapabilities</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultModelAlias` | property | <code>defaultModelAlias?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `timeoutMs` | property | <code>timeoutMs?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelRequest`

Model Request interface with 12 public fields or methods.

- Kind: interface
- Import: `import type { ModelRequest } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelRequest<TInput = unknown> {
    runId: string;
    stepId: string;
    modelAlias: string;
    instructions?: string;
    input: TInput;
    tools?: ModelToolDescriptor[];
    responseFormat?: SpecRef | JsonSchema;
    reasoning?: ReasoningOptions;
    temperature?: number;
    maxTokens?: number;
    cache?: ModelCacheControl;
    metadata?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cache` | property | <code>cache?: ModelCacheControl</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `input` | property | <code>input: TInput</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `instructions` | property | <code>instructions?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `maxTokens` | property | <code>maxTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `modelAlias` | property | <code>modelAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `reasoning` | property | <code>reasoning?: ReasoningOptions</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `responseFormat` | property | <code>responseFormat?: SpecRef &#124; JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `runId` | property | <code>runId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `stepId` | property | <code>stepId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `temperature` | property | <code>temperature?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tools` | property | <code>tools?: ModelToolDescriptor[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelResponse`

Model Response interface with 8 public fields or methods.

- Kind: interface
- Import: `import type { ModelResponse } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelResponse<TContent = string> {
    id: string;
    providerId?: string;
    model?: string;
    content: TContent;
    toolCalls?: NormalizedToolCall[];
    usage?: ModelUsage;
    metadata?: Record<string, unknown>;
    raw?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content: TContent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `metadata` | property | <code>metadata?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `model` | property | <code>model?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `providerId` | property | <code>providerId?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `raw` | property | <code>raw?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCalls` | property | <code>toolCalls?: NormalizedToolCall[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage?: ModelUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelRoutingSpec`

Model Routing Spec interface with 11 public fields or methods.

- Kind: interface
- Import: `import type { ModelRoutingSpec } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelRoutingSpec extends VersionedSpec, SpecMetadata {
    defaultAlias: string;
    aliases: ModelAliasSpec[];
    fallbackAliases?: string[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `aliases` | property | <code>aliases: ModelAliasSpec[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `createdAt` | property | <code>createdAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `defaultAlias` | property | <code>defaultAlias: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `description` | property | <code>description?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `fallbackAliases` | property | <code>fallbackAliases?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `owner` | property | <code>owner?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `tags` | property | <code>tags?: string[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `updatedAt` | property | <code>updatedAt?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelStreamEvent`

Model Stream Event interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ModelStreamEvent } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelStreamEvent<TContent = string> {
    type: 'delta' | 'tool_call' | 'usage' | 'done' | 'error';
    content?: TContent;
    toolCall?: NormalizedToolCall;
    usage?: ModelUsage;
    error?: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `content` | property | <code>content?: TContent</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolCall` | property | <code>toolCall?: NormalizedToolCall</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `type` | property | <code>type: "error" &#124; "delta" &#124; "tool_call" &#124; "usage" &#124; "done"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `usage` | property | <code>usage?: ModelUsage</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelToolDescriptor`

Model Tool Descriptor interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ModelToolDescriptor } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelToolDescriptor {
    id: string;
    name: string;
    description: string;
    inputSchema: JsonSchema;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `description` | property | <code>description: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputSchema` | property | <code>inputSchema: JsonSchema</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `name` | property | <code>name: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelUsage`

Model Usage interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { ModelUsage } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ModelUsage {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
    cacheHitTokens?: number;
    cacheMissTokens?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `cacheHitTokens` | property | <code>cacheHitTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `cacheMissTokens` | property | <code>cacheMissTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `inputTokens` | property | <code>inputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `outputTokens` | property | <code>outputTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `totalTokens` | property | <code>totalTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `NormalizedToolCall`

Normalized Tool Call interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { NormalizedToolCall } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface NormalizedToolCall {
    id: string;
    toolId: string;
    arguments: unknown;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `arguments` | property | <code>arguments: unknown</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolId` | property | <code>toolId: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ReasoningOptions`

Reasoning Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ReasoningOptions } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export interface ReasoningOptions {
    effort?: 'low' | 'medium' | 'high';
    budgetTokens?: number;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `budgetTokens` | property | <code>budgetTokens?: number</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `effort` | property | <code>effort?: "low" &#124; "medium" &#124; "high"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ModelProviderType`

Public type alias for Model Provider Type; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ModelProviderType } from '@codesoul-co/hypha-models';`
- Source module: [`index`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/models/src/index.ts)

### Declaration

```text
export type ModelProviderType = 'openai' | 'openai-compatible' | 'mock' | string;
```
