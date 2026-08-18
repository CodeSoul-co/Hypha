# `@codesoul-co/hypha-core` / `modules/runtime/session-command-payload-store`

- Package index: [`@codesoul-co/hypha-core`](/api/core)
- Package guide: [learning and composition guide](/packages/core)
- Source: [`packages/core/src/modules/runtime/session-command-payload-store.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/core/src/modules/runtime/session-command-payload-store.ts)
- Exports: **5**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `ArtifactSessionCommandPayloadStore` | class | <code>new ArtifactSessionCommandPayloadStore(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | Stores canonical command JSON outside the Queue while retaining a verified durable reference. |
| `ArtifactSessionCommandPayloadStoreOptions` | interface | <code>interface ArtifactSessionCommandPayloadStoreOptions</code> | Field contract for Artifact Session Command Payload Store Options; see all contract members below. |
| `PutSessionCommandPayloadRequest` | interface | <code>interface PutSessionCommandPayloadRequest</code> | Field contract for Put Session Command Payload Request; see all contract members below. |
| `SessionCommandPayloadReference` | interface | <code>interface SessionCommandPayloadReference</code> | Field contract for Session Command Payload Reference; see all contract members below. |
| `GetSessionCommandPayloadRequest` | type | <code>type GetSessionCommandPayloadRequest = SessionCommandPayloadReference</code> | Public type alias for Get Session Command Payload Request. |

## `ArtifactSessionCommandPayloadStore` public members

Stores canonical command JSON outside the Queue while retaining a verified durable reference.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(options: ArtifactSessionCommandPayloadStoreOptions): ArtifactSessionCommandPayloadStore</code> | Creates an instance of this class. |
| `get` | method | <code>get(request: GetSessionCommandPayloadRequest): Promise&lt;unknown&gt;</code> | Gets get at this module boundary. |
| `put` | method | <code>put(request: PutSessionCommandPayloadRequest): Promise&lt;SessionCommandPayloadReference&gt;</code> | Public runtime operation for put. |

## `ArtifactSessionCommandPayloadStoreOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `artifacts` | property | <code>artifacts: ArtifactStoreProvider</code> | Public artifacts property. |
| `maxPayloadBytes` | property | <code>maxPayloadBytes: number</code> | Public max Payload Bytes property. |

## `PutSessionCommandPayloadRequest` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `commandId` | property | <code>commandId: string</code> | Public command Id property. |
| `payload` | property | <code>payload: unknown</code> | Public payload property. |

## `SessionCommandPayloadReference` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `payloadHash` | property | <code>payloadHash: string</code> | Public payload Hash property. |
| `payloadRef` | property | <code>payloadRef: string</code> | Public payload Ref property. |
