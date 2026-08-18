# `@codesoul-co/hypha-core` / `modules/artifact/store-registry`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/store-registry.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/store-registry.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactStoreProviderRegistry` | class | <code>new ArtifactStoreProviderRegistry(): ArtifactStoreProviderRegistry</code> | Provider-neutral DI registry for Artifact Stores. Core owns selection and lifecycle validation without importing a concrete storage adapter. |
| `ArtifactStoreProviderRegistration` | interface | <code>interface ArtifactStoreProviderRegistration</code> | Field contract for Artifact Store Provider Registration; see all contract members below. |

## `ArtifactStoreProviderRegistry` public members

Provider-neutral DI registry for Artifact Stores. Core owns selection and lifecycle validation without importing a concrete storage adapter.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): ArtifactStoreProviderRegistry</code> | Creates an instance of this class. |
| `create` | method | <code>create(providerId: string): Promise&lt;ArtifactStoreProvider&gt;</code> | Creates create at this module boundary. |
| `list` | method | <code>list(): ArtifactStoreProviderRegistration[]</code> | Lists list at this module boundary. |
| `register` | method | <code>register(factory: ArtifactStoreProviderFactory): void</code> | Registers register at this module boundary. |
| `resolve` | method | <code>resolve(providerId: string): ArtifactStoreProviderFactory</code> | Resolves resolve at this module boundary. |
| `unregister` | method | <code>unregister(providerId: string): boolean</code> | Public runtime operation for unregister. |

## `ArtifactStoreProviderRegistration` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
