# `@codesoul-co/hypha-memory` / `canonical-runtime-config`

- Package index: [`@codesoul-co/hypha-memory`](/api/memory)
- Package guide: [learning and composition guide](/packages/memory)
- Source: [`packages/memory/src/canonical-runtime-config.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/canonical-runtime-config.ts)
- Exports: **7**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `CanonicalMemoryRuntimeLoader` | class | <code>new CanonicalMemoryRuntimeLoader(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | Runtime implementation for Canonical Memory Runtime Loader; see its public constructor and members below. |
| `canonicalMemoryRuntimeConfigExample` | constant | <code>const canonicalMemoryRuntimeConfigExample: CanonicalMemoryRuntimeConfig</code> | Valid example value for canonical Memory Runtime Config. |
| `canonicalMemoryRuntimeConfigJsonSchema` | constant | <code>const canonicalMemoryRuntimeConfigJsonSchema: JsonSchema</code> | JSON Schema for canonical Memory Runtime Config. |
| `canonicalMemoryRuntimeConfigSchema` | constant | <code>const canonicalMemoryRuntimeConfigSchema: ZodType&lt;CanonicalMemoryRuntimeConfig, ZodTypeDef, CanonicalMemoryRuntimeConfig&gt;</code> | Runtime schema for canonical Memory Runtime Config. |
| `CanonicalMemoryRuntimeConfig` | interface | <code>interface CanonicalMemoryRuntimeConfig extends MemoryRuntimeConfig</code> | Field contract for Canonical Memory Runtime Config; see all contract members below. |
| `LoadedCanonicalMemoryRuntimeConfig` | interface | <code>interface LoadedCanonicalMemoryRuntimeConfig</code> | Field contract for Loaded Canonical Memory Runtime Config; see all contract members below. |
| `MemoryRuntimeReferenceResolver` | interface | <code>interface MemoryRuntimeReferenceResolver</code> | Field contract for Memory Runtime Reference Resolver; see all contract members below. |

## `CanonicalMemoryRuntimeLoader` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(resolver: MemoryRuntimeReferenceResolver): CanonicalMemoryRuntimeLoader</code> | Creates an instance of this class. |
| `create` | method | <code>create(factory: MemoryRuntimeFactory, input: unknown): Promise&lt;MemoryRuntime&gt;</code> | Creates create at this module boundary. |
| `load` | method | <code>load(input: unknown): Promise&lt;LoadedCanonicalMemoryRuntimeConfig&gt;</code> | Loads load at this module boundary. |

## `CanonicalMemoryRuntimeConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activeProfile` | property | <code>activeProfile: string</code> | Public active Profile property. |
| `profiles` | property | <code>profiles: Record&lt;string, MemoryRuntimeProfile&gt;</code> | Public profiles property. |
| `schemaVersion` | property | <code>schemaVersion: "1.0"</code> | Public schema Version property. |

## `LoadedCanonicalMemoryRuntimeConfig` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `config` | property | <code>config: MemoryRuntimeConfig</code> | Public config property. |
| `references` | property | <code>references: ReadonlyMap&lt;string, unknown&gt;</code> | Public references property. |

## `MemoryRuntimeReferenceResolver` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `resolve` | method | <code>resolve(reference: string, kind: "connection" &#124; "secret" &#124; "environment" &#124; "dependency"): Promise&lt;unknown&gt;</code> | Resolves resolve at this module boundary. |
