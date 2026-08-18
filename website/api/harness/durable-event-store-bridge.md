# `@codesoul-co/hypha-harness` / `durable-event-store-bridge`

- Package index: [`@codesoul-co/hypha-harness`](/api/harness)
- Package guide: [learning and composition guide](/packages/harness)
- Source: [`packages/harness/src/durable-event-store-bridge.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/harness/src/durable-event-store-bridge.ts)
- Exports: **3**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `DurableEventStoreBridge` | class | <code>new DurableEventStoreBridge(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime. |
| `DurableEventStoreBridgeCoordination` | interface | <code>interface DurableEventStoreBridgeCoordination</code> | Field contract for Durable Event Store Bridge Coordination; see all contract members below. |
| `DurableEventStoreBridgeOptions` | interface | <code>interface DurableEventStoreBridgeOptions</code> | Field contract for Durable Event Store Bridge Options; see all contract members below. |

## `DurableEventStoreBridge` public members

Adapts the legacy append/list EventStore surface to canonical durable streams. It carries no Run state; every read is rebuilt from the durable Event Runtime.

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `append` | method | <code>append(event: FrameworkEvent): Promise&lt;void&gt;</code> | Appends append at this module boundary. |
| `constructor` | constructor | <code>(options: DurableEventStoreBridgeOptions): DurableEventStoreBridge</code> | Creates an instance of this class. |
| `list` | method | <code>list(filter?: EventFilter): Promise&lt;FrameworkEvent[]&gt;</code> | Lists list at this module boundary. |
| `record` | method | <code>record(event: FrameworkEvent): Promise&lt;void&gt;</code> | Records record at this module boundary. |

## `DurableEventStoreBridgeCoordination` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `leaseTtlMs` | property | <code>leaseTtlMs: number</code> | Public lease Ttl Ms property. |
| `nextId` | method | <code>nextId(namespace: string): string</code> | Public runtime operation for next Id. |
| `now` | method | <code>now(): string</code> | Public runtime operation for now. |
| `ownerId` | property | <code>ownerId: string</code> | Public owner Id property. |
| `runLeases` | property | <code>runLeases: RunLeaseStore</code> | Public run Leases property. |

## `DurableEventStoreBridgeOptions` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `coordination` | property | <code>coordination: DurableEventStoreBridgeCoordination</code> | Public coordination property. |
| `events` | property | <code>events: EventRuntime</code> | Public events property. |
| `maxAppendAttempts` | property | <code>maxAppendAttempts: number</code> | Public max Append Attempts property. |
| `streamHeadPageSize` | property | <code>streamHeadPageSize: number</code> | Public stream Head Page Size property. |
