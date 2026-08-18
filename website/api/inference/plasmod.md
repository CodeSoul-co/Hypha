# `@codesoul-co/hypha-inference` / `plasmod`

- Package index: [`@codesoul-co/hypha-inference`](/api/inference)
- Package guide: [learning and composition guide](/packages/inference)
- Source: [`packages/inference/src/plasmod.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/inference/src/plasmod.ts)
- Exports: **2**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryPlasmodHotLayer` | class | <code>new InMemoryPlasmodHotLayer(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | Runtime implementation for In Memory Plasmod Hot Layer; see its public constructor and members below. |
| `InMemoryPlasmodHotLayerOptions` | interface | <code>interface InMemoryPlasmodHotLayerOptions</code> | Field contract for In Memory Plasmod Hot Layer Options; see all contract members below. |

## `InMemoryPlasmodHotLayer` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(nowOrOptions?: (() =&gt; Date) &#124; InMemoryPlasmodHotLayerOptions): InMemoryPlasmodHotLayer</code> | Creates an instance of this class. |
| `getCacheMetadata` | method | <code>getCacheMetadata(segmentId: string): PlasmodCacheMetadata &#124; null</code> | Gets Cache Metadata at this module boundary. |
| `getSessionState` | method | <code>getSessionState(stateId: string): PlasmodSessionState &#124; null</code> | Gets Session State at this module boundary. |
| `invalidateSegment` | method | <code>invalidateSegment(segmentId: string, _reason: string): Promise&lt;void&gt;</code> | Public runtime operation for invalidate Segment. |
| `prepare` | method | <code>prepare(input: PlasmodHotLayerPrepareInput): Promise&lt;PlasmodHotLayerPrepareResult&gt;</code> | Public runtime operation for prepare. |
| `snapshot` | method | <code>snapshot(): { prefixRegistrySize: number; cacheMetadataSize: number; sessionStateSize: number; invalidationGraphSize: number; segmentAliasSize: number; reuseKeySize: number; }</code> | Public runtime operation for snapshot. |

## `InMemoryPlasmodHotLayerOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `maxAliases` | property | <code>maxAliases: number</code> | Public max Aliases property. |
| `maxDependenciesPerSegment` | property | <code>maxDependenciesPerSegment: number</code> | Public max Dependencies Per Segment property. |
| `maxReuseKeys` | property | <code>maxReuseKeys: number</code> | Public max Reuse Keys property. |
| `maxSegments` | property | <code>maxSegments: number</code> | Public max Segments property. |
| `maxSessionStates` | property | <code>maxSessionStates: number</code> | Public max Session States property. |
| `now` | method | <code>now(): Date</code> | Public runtime operation for now. |
