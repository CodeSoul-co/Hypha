# `@codesoul-co/hypha-core` / `modules/artifact/gc`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/artifact/gc.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/artifact/gc.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DefaultArtifactGarbageCollector` | class | <code>new DefaultArtifactGarbageCollector(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | Runtime implementation for Default Artifact Garbage Collector; see its public constructor and members below. |
| `validateArtifactGarbageCollectionRequest` | function | <code>validateArtifactGarbageCollectionRequest(request: ArtifactGarbageCollectionRequest): ArtifactGarbageCollectionRequest</code> | Validates Artifact Garbage Collection Request at this module boundary. |

## `DefaultArtifactGarbageCollector` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `collect` | method | <code>collect(input: ArtifactGarbageCollectionRequest): Promise&lt;ArtifactGarbageCollectionResult&gt;</code> | Public runtime operation for collect. |
| `constructor` | constructor | <code>(options: DefaultArtifactGarbageCollectorOptions): DefaultArtifactGarbageCollector</code> | Creates an instance of this class. |
