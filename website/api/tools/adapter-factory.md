# `@codesoul-co/hypha-tools` / `adapter-factory`

- Package index: [`@codesoul-co/hypha-tools`](/api/tools)
- Source: [`packages/tools/src/adapter-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)
- Exports: **17**

## Using this module

Use the Adapter factory module for binding external or local providers to Hypha ports. It exports 2 classes, 3 constants, 3 functions, 8 interfaces, 1 type.

### Import from the package entrypoint

```ts
import {
  LoadedToolAdapterProfiles,
  ToolAdapterFactoryRegistry,
  toolAdapterKinds,
  toolAdapterProfileSchema,
  toolAdapterProfilesDocumentSchema,
  loadToolAdapterProfiles,
  parseToolAdapterProfilesDocument,
  registerConcreteToolAdapterFactories,
} from '@codesoul-co/hypha-tools';

import type {
  ConcreteToolAdapterFactoryDependencies,
  LoadedToolAdapterProfile,
  ToolAdapterFactory,
  ToolAdapterFactoryInput,
  ToolAdapterFactoryRegistryOptions,
  ToolAdapterProfile,
  ToolAdapterProfilesDocument,
  ToolSpecReference,
} from '@codesoul-co/hypha-tools';

// The complete export list is documented below.
```

### Usage patterns

- Use the 9 type/interface exports as static contracts in application code, adapters, or tests. Import them with `import type`; they do not exist at runtime.
- The module exposes 2 classes as constructable runtime implementations. Each symbol entry lists its constructor and public methods.
- The module exposes 3 functions as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.
- The 3 constant/enum exports provide stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.

### Runtime validation example

```ts
import { toolAdapterProfileSchema } from '@codesoul-co/hypha-tools';

declare function loadExternalInput(): unknown;
const input: unknown = loadExternalInput();
const parsed = toolAdapterProfileSchema.parse(input);
```

Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `LoadedToolAdapterProfiles` | class | <code>new LoadedToolAdapterProfiles(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | Loaded Tool Adapter Profiles class with 5 public constructor or member entries; its exact declarations are listed below. |
| `ToolAdapterFactoryRegistry` | class | <code>new ToolAdapterFactoryRegistry(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration. |
| `toolAdapterKinds` | constant | <code>const toolAdapterKinds: readonly ["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]</code> | Tool Adapter Kinds constant exported by the `adapter-factory` module. |
| `toolAdapterProfileSchema` | constant | <code>const toolAdapterProfileSchema: z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: string; version?: string &#124; undefined; revision?...</code> | Runtime schema for Tool Adapter Profile. |
| `toolAdapterProfilesDocumentSchema` | constant | <code>const toolAdapterProfilesDocumentSchema: z.ZodObject&lt;{ profiles: z.ZodArray&lt;z.ZodEffects&lt;z.ZodObject&lt;{ id: z.ZodString; kind: z.ZodEnum&lt;["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"]&gt;; required: z.ZodDefault&lt;z.ZodBoolean&gt;; toolSpecRef: z.ZodObject&lt;{ id: z.ZodString; version: z.ZodOptional&lt;z.ZodString&gt;; revision: z.ZodOptional&lt;z.ZodString&gt;; }, "strict", z.ZodTypeAny, { id: str...</code> | Runtime schema for Tool Adapter Profiles Document. |
| `loadToolAdapterProfiles` | function | <code>loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise&lt;LoadedToolAdapterProfiles&gt;</code> | Load Tool Adapter Profiles function with 1 public call signature; parameters and return types are listed below. |
| `parseToolAdapterProfilesDocument` | function | <code>parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument</code> | Parse Tool Adapter Profiles Document function with 1 public call signature; parameters and return types are listed below. |
| `registerConcreteToolAdapterFactories` | function | <code>registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void</code> | Registers the complete declarative factory surface used by server composition. |
| `ConcreteToolAdapterFactoryDependencies` | interface | <code>interface ConcreteToolAdapterFactoryDependencies</code> | Concrete Tool Adapter Factory Dependencies interface with 6 public fields or methods. |
| `LoadedToolAdapterProfile` | interface | <code>interface LoadedToolAdapterProfile</code> | Loaded Tool Adapter Profile interface with 5 public fields or methods. |
| `ToolAdapterFactory` | interface | <code>interface ToolAdapterFactory</code> | Tool Adapter Factory interface with 2 public fields or methods. |
| `ToolAdapterFactoryInput` | interface | <code>interface ToolAdapterFactoryInput</code> | Tool Adapter Factory Input interface with 4 public fields or methods. |
| `ToolAdapterFactoryRegistryOptions` | interface | <code>interface ToolAdapterFactoryRegistryOptions</code> | Tool Adapter Factory Registry Options interface with 2 public fields or methods. |
| `ToolAdapterProfile` | interface | <code>interface ToolAdapterProfile</code> | Tool Adapter Profile interface with 9 public fields or methods. |
| `ToolAdapterProfilesDocument` | interface | <code>interface ToolAdapterProfilesDocument</code> | Tool Adapter Profiles Document interface with 1 public fields or methods. |
| `ToolSpecReference` | interface | <code>interface ToolSpecReference</code> | Tool Spec Reference interface with 3 public fields or methods. |
| `ToolAdapterKind` | type | <code>type ToolAdapterKind = (typeof toolAdapterKinds)[number]</code> | Public type alias for Tool Adapter Kind; the declaration contains its complete type expression. |

## `LoadedToolAdapterProfiles`

Loaded Tool Adapter Profiles class with 5 public constructor or member entries; its exact declarations are listed below.

- Kind: class
- Import: `import { LoadedToolAdapterProfiles } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export declare class LoadedToolAdapterProfiles {
    constructor(entries: Map<string, LoadedToolAdapterProfile>);
    list(): LoadedToolAdapterProfile[];
    get(profileId: string): LoadedToolAdapterProfile | undefined;
    health(): Promise<Record<string, Awaited<ReturnType<ToolAdapter['health']>>>>;
    close(): Promise<void>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `close` | method | <code>close(): Promise&lt;void&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `constructor` | constructor | <code>(entries: Map&lt;string, LoadedToolAdapterProfile&gt;): LoadedToolAdapterProfiles</code> | Creates an instance of this class. |
| `get` | method | <code>get(profileId: string): LoadedToolAdapterProfile &#124; undefined</code> | Public method; parameters and return type are shown in the signature. |
| `health` | method | <code>health(): Promise&lt;Record&lt;string, Awaited&lt;ReturnType&lt;ToolAdapter["health"]&gt;&gt;&gt;&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `list` | method | <code>list(): LoadedToolAdapterProfile[]</code> | Public method; parameters and return type are shown in the signature. |

## `ToolAdapterFactoryRegistry`

Creates adapters from declarative profiles without allowing profiles to smuggle executable factories or plaintext credentials through configuration.

- Kind: class
- Import: `import { ToolAdapterFactoryRegistry } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export declare class ToolAdapterFactoryRegistry {
    constructor(options: ToolAdapterFactoryRegistryOptions);
    register(factory: ToolAdapterFactory): void;
    create(untrustedProfile: ToolAdapterProfile): Promise<{
            profile: ToolAdapterProfile;
            toolSpec: ToolSpec;
            adapter: ToolAdapter;
        }>;
}
```

### Public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ToolAdapterFactoryRegistryOptions): ToolAdapterFactoryRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(untrustedProfile: ToolAdapterProfile): Promise&lt;{ profile: ToolAdapterProfile; toolSpec: ToolSpec; adapter: ToolAdapter; }&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `register` | method | <code>register(factory: ToolAdapterFactory): void</code> | Public method; parameters and return type are shown in the signature. |

## `toolAdapterKinds`

Tool Adapter Kinds constant exported by the `adapter-factory` module.

- Kind: constant
- Import: `import { toolAdapterKinds } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export declare const toolAdapterKinds: readonly ["local_function", "http", "plugin", "mcp_stdio", "mcp_streamable_http", "execution"];
```

## `toolAdapterProfileSchema`

Runtime schema for Tool Adapter Profile.

- Kind: constant
- Import: `import { toolAdapterProfileSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolAdapterProfileSchema: (typeof import('@codesoul-co/hypha-tools'))['toolAdapterProfileSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `toolAdapterProfilesDocumentSchema`

Runtime schema for Tool Adapter Profiles Document.

- Kind: constant
- Import: `import { toolAdapterProfilesDocumentSchema } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
// Exact type resolved from the package entrypoint; see source for the compiler expansion.
export declare const toolAdapterProfilesDocumentSchema: (typeof import('@codesoul-co/hypha-tools'))['toolAdapterProfilesDocumentSchema'];
```

> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.

## `loadToolAdapterProfiles`

Load Tool Adapter Profiles function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { loadToolAdapterProfiles } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export declare function loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise<LoadedToolAdapterProfiles>;
```

### Call signature

```text
loadToolAdapterProfiles(input: unknown, registry: ToolAdapterFactoryRegistry): Promise<LoadedToolAdapterProfiles>
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `registry` | <code>ToolAdapterFactoryRegistry</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `Promise<LoadedToolAdapterProfiles>`
- Description: The return contract is defined by the type shown above.

## `parseToolAdapterProfilesDocument`

Parse Tool Adapter Profiles Document function with 1 public call signature; parameters and return types are listed below.

- Kind: function
- Import: `import { parseToolAdapterProfilesDocument } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export declare function parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument;
```

### Call signature

```text
parseToolAdapterProfilesDocument(input: unknown): ToolAdapterProfilesDocument
```

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `input` | <code>unknown</code> | Yes | Required parameter; accepted values are defined by the type column. |

#### Returns

- Type: `ToolAdapterProfilesDocument`
- Description: The return contract is defined by the type shown above.

## `registerConcreteToolAdapterFactories`

Registers the complete declarative factory surface used by server composition.

- Kind: function
- Import: `import { registerConcreteToolAdapterFactories } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export declare function registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void;
```

### Call signature

```text
registerConcreteToolAdapterFactories(registry: ToolAdapterFactoryRegistry, dependencies?: ConcreteToolAdapterFactoryDependencies): void
```

Registers the complete declarative factory surface used by server composition.

#### Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `registry` | <code>ToolAdapterFactoryRegistry</code> | Yes | Required parameter; accepted values are defined by the type column. |
| `dependencies` | <code>ConcreteToolAdapterFactoryDependencies</code> | No | Optional parameter; accepted values are defined by the type column. |

#### Returns

- Type: `void`
- Description: Returns no value.

## `ConcreteToolAdapterFactoryDependencies`

Concrete Tool Adapter Factory Dependencies interface with 6 public fields or methods.

- Kind: interface
- Import: `import type { ConcreteToolAdapterFactoryDependencies } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ConcreteToolAdapterFactoryDependencies {
    localFunctions?: Readonly<Record<string, ToolHandler>>;
    plugins?: Readonly<Record<string, ToolHandler>>;
    mcpPort?: MCPToolInvocationPort;
    prepareMCPConnection?(input: ToolAdapterFactoryInput): Promise<{
        port: MCPToolInvocationPort;
        close?(): Promise<void>;
    }>;
    createExecutionAdapter?(input: ToolAdapterFactoryInput): Promise<ToolAdapter>;
    fetch?: typeof fetch;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `createExecutionAdapter` | method | <code>createExecutionAdapter?(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `fetch` | method | <code>fetch?(input: RequestInfo &#124; URL, init?: RequestInit): Promise&lt;Response&gt; &#124; fetch?(input: string &#124; URL &#124; Request, init?: RequestInit): Promise&lt;Response&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `localFunctions` | property | <code>localFunctions?: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `mcpPort` | property | <code>mcpPort?: MCPToolInvocationPort</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `plugins` | property | <code>plugins?: Readonly&lt;Record&lt;string, ToolHandler&gt;&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `prepareMCPConnection` | method | <code>prepareMCPConnection?(input: ToolAdapterFactoryInput): Promise&lt;{ port: MCPToolInvocationPort; close?(): Promise&lt;void&gt;; }&gt;</code> | Public method; parameters and return type are shown in the signature. |

## `LoadedToolAdapterProfile`

Loaded Tool Adapter Profile interface with 5 public fields or methods.

- Kind: interface
- Import: `import type { LoadedToolAdapterProfile } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface LoadedToolAdapterProfile {
    profile: ToolAdapterProfile;
    toolSpec?: ToolSpec;
    adapter?: ToolAdapter;
    status: 'ready' | 'degraded';
    error?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `adapter` | property | <code>adapter?: ToolAdapter&lt;unknown, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `error` | property | <code>error?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `profile` | property | <code>profile: ToolAdapterProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `status` | property | <code>status: "degraded" &#124; "ready"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolSpec` | property | <code>toolSpec?: ToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterFactory`

Tool Adapter Factory interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapterFactory } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ToolAdapterFactory {
    readonly kind: ToolAdapterKind;
    create(input: ToolAdapterFactoryInput): Promise<ToolAdapter>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `create` | method | <code>create(input: ToolAdapterFactoryInput): Promise&lt;ToolAdapter&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `kind` | property | <code>readonly kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterFactoryInput`

Tool Adapter Factory Input interface with 4 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapterFactoryInput } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ToolAdapterFactoryInput {
    profile: ToolAdapterProfile;
    toolSpec: ToolSpec;
    resolveCredential(): Promise<string | null>;
    acquireCredential(): Promise<CredentialLease | null>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acquireCredential` | method | <code>acquireCredential(): Promise&lt;CredentialLease &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `profile` | property | <code>profile: ToolAdapterProfile</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `resolveCredential` | method | <code>resolveCredential(): Promise&lt;string &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `toolSpec` | property | <code>toolSpec: ToolSpec</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterFactoryRegistryOptions`

Tool Adapter Factory Registry Options interface with 2 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapterFactoryRegistryOptions } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ToolAdapterFactoryRegistryOptions {
    resolveToolSpec(reference: ToolSpecReference): Promise<ToolSpec | null>;
    secretResolver?: ToolSecretResolver;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolveToolSpec` | method | <code>resolveToolSpec(reference: ToolSpecReference): Promise&lt;ToolSpec &#124; null&gt;</code> | Public method; parameters and return type are shown in the signature. |
| `secretResolver` | property | <code>secretResolver?: ToolSecretResolver</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterProfile`

Tool Adapter Profile interface with 9 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapterProfile } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ToolAdapterProfile {
    id: string;
    kind: ToolAdapterKind;
    required?: boolean;
    toolSpecRef: ToolSpecReference;
    endpoint?: string;
    credentialRef?: string;
    requiredCapabilities?: Array<keyof ToolAdapterCapabilities>;
    binding?: {
        localFunctionId?: string;
        pluginId?: string;
        executionPortRef?: string;
        mcpServerId?: string;
        mcpCapabilityId?: string;
        mcpConnectionProfileRef?: string;
    };
    /** @deprecated Use the typed binding object. */
    config?: Record<string, unknown>;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `binding` | property | <code>binding?: { localFunctionId?: string; pluginId?: string; executionPortRef?: string; mcpServerId?: string; mcpCapabilityId?: string; mcpConnectionProfileRef?: string; }</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `config` | property | <code>config?: Record&lt;string, unknown&gt;</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `credentialRef` | property | <code>credentialRef?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `endpoint` | property | <code>endpoint?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `kind` | property | <code>kind: "http" &#124; "execution" &#124; "plugin" &#124; "local_function" &#124; "mcp_stdio" &#124; "mcp_streamable_http"</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `required` | property | <code>required?: boolean</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `requiredCapabilities` | property | <code>requiredCapabilities?: (keyof ToolAdapterCapabilities)[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `toolSpecRef` | property | <code>toolSpecRef: ToolSpecReference</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterProfilesDocument`

Tool Adapter Profiles Document interface with 1 public fields or methods.

- Kind: interface
- Import: `import type { ToolAdapterProfilesDocument } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ToolAdapterProfilesDocument {
    profiles: ToolAdapterProfile[];
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `profiles` | property | <code>profiles: ToolAdapterProfile[]</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolSpecReference`

Tool Spec Reference interface with 3 public fields or methods.

- Kind: interface
- Import: `import type { ToolSpecReference } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export interface ToolSpecReference {
    id: string;
    version?: string;
    revision?: string;
}
```

### Contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `id` | property | <code>id: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `revision` | property | <code>revision?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |
| `version` | property | <code>version?: string</code> | Public property; its type, readonly modifier and optionality are shown in the signature. |

## `ToolAdapterKind`

Public type alias for Tool Adapter Kind; the declaration contains its complete type expression.

- Kind: type
- Import: `import type { ToolAdapterKind } from '@codesoul-co/hypha-tools';`
- Source module: [`adapter-factory`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/tools/src/adapter-factory.ts)

### Declaration

```text
export type ToolAdapterKind = (typeof toolAdapterKinds)[number];
```
