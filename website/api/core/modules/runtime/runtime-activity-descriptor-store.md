# `@codesoul-co/hypha-core` / `modules/runtime/runtime-activity-descriptor-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/runtime-activity-descriptor-store.ts)
- Exports: **4**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactRuntimeActivityDescriptorStore` | class | <code>new ArtifactRuntimeActivityDescriptorStore(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | Persists immutable Activity descriptors outside HumanTask Events. |
| `ArtifactRuntimeActivityDescriptorStoreOptions` | interface | <code>interface ArtifactRuntimeActivityDescriptorStoreOptions</code> | Field contract for Artifact Runtime Activity Descriptor Store Options; see all contract members below. |
| `RuntimeActivityDescriptorReference` | interface | <code>interface RuntimeActivityDescriptorReference</code> | Field contract for Runtime Activity Descriptor Reference; see all contract members below. |
| `RuntimeActivityDescriptorStore` | interface | <code>interface RuntimeActivityDescriptorStore</code> | Field contract for Runtime Activity Descriptor Store; see all contract members below. |

## `ArtifactRuntimeActivityDescriptorStore` public members

Persists immutable Activity descriptors outside HumanTask Events.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactRuntimeActivityDescriptorStoreOptions): ArtifactRuntimeActivityDescriptorStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(input: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | Public runtime operation for put. |

## `ArtifactRuntimeActivityDescriptorStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public artifacts property. |
| `maxDescriptorBytes` | property | <code>maxDescriptorBytes: number</code> | Public max Descriptor Bytes property. |

## `RuntimeActivityDescriptorReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `activityDescriptorHash` | property | <code>activityDescriptorHash: string</code> | Public activity Descriptor Hash property. |
| `activityDescriptorRef` | property | <code>activityDescriptorRef: string</code> | Public activity Descriptor Ref property. |

## `RuntimeActivityDescriptorStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `get` | method | <code>get(reference: RuntimeActivityDescriptorReference): Promise&lt;RuntimeActivityDescriptor&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(descriptor: RuntimeActivityDescriptor): Promise&lt;RuntimeActivityDescriptorReference&gt;</code> | Public runtime operation for put. |
