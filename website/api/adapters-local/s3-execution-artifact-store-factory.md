# `@codesoul-co/hypha-adapters-local` / `s3-execution-artifact-store-factory`

- Package index: [`@codesoul-co/hypha-adapters-local`](/api/adapters-local)
- Package guide: [learning and composition guide](/packages/adapters-local)
- Source: [`packages/adapters-local/src/s3-execution-artifact-store-factory.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/adapters-local/src/s3-execution-artifact-store-factory.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `S3ExecutionArtifactStoreFactory` | class | <code>new S3ExecutionArtifactStoreFactory(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry. |
| `S3ExecutionArtifactStoreFactoryOptions` | type | <code>type S3ExecutionArtifactStoreFactoryOptions = Omit&lt;S3ExecutionArtifactStoreOptions, 'id'&gt; &amp; { providerId?: string; }</code> | Public type alias for S3 Execution Artifact Store Factory Options. |

## `S3ExecutionArtifactStoreFactory` public members

Composition adapter for the accepted S3 Artifact Store. Registration remains explicit: callers add this factory to the Core ArtifactStoreProviderRegistry.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: S3ExecutionArtifactStoreFactoryOptions): S3ExecutionArtifactStoreFactory</code> | Creates an instance of this class. |
| `create` | method | <code>create(): ArtifactStoreProvider</code> | Creates create at this module boundary. |
| `providerId` | property | <code>providerId: string</code> | Public provider Id property. |
