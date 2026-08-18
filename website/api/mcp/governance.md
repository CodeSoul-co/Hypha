# `@codesoul-co/hypha-mcp` / `governance`

- Package index: [`@codesoul-co/hypha-mcp`](/api/mcp)
- Package guide: [learning and composition guide](/packages/mcp)
- Source: [`packages/mcp/src/governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)
- Exports: **11**

## Public exports

| Symbol | Kind | Signature | Description |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityBaselineStore` | class | <code>new InMemoryMCPCapabilityBaselineStore(): InMemoryMCPCapabilityBaselineStore</code> | Runtime implementation for In Memory MCP Capability Baseline Store; see its public constructor and members below. |
| `attestCapability` | function | <code>attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor</code> | Public runtime operation for attest Capability. |
| `capabilityHash` | function | <code>capabilityHash(capability: MCPCapabilityDescriptor): string</code> | Public runtime operation for capability Hash. |
| `capabilityKey` | function | <code>capabilityKey(capability: Pick&lt;MCPCapabilityDescriptor, "serverId" &#124; "capabilityId"&gt;): string</code> | Public runtime operation for capability Key. |
| `evaluateCapabilityDrift` | function | <code>evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation</code> | Evaluates Capability Drift at this module boundary. |
| `governedSideEffectLevel` | function | <code>governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel</code> | Public runtime operation for governed Side Effect Level. |
| `MCPCapabilityBaselineStore` | interface | <code>interface MCPCapabilityBaselineStore</code> | Field contract for MCP Capability Baseline Store; see all contract members below. |
| `MCPDriftEvaluation` | interface | <code>interface MCPDriftEvaluation</code> | Field contract for MCP Drift Evaluation; see all contract members below. |
| `MCPDriftRecord` | interface | <code>interface MCPDriftRecord</code> | Field contract for MCP Drift Record; see all contract members below. |
| `MCPDriftPolicy` | type | <code>type MCPDriftPolicy = 'quarantine' &#124; 'accept'</code> | Public type alias for MCP Drift Policy. |
| `MCPDriftStatus` | type | <code>type MCPDriftStatus = 'added' &#124; 'unchanged' &#124; 'changed' &#124; 'removed'</code> | Public type alias for MCP Drift Status. |

## `InMemoryMCPCapabilityBaselineStore` public members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `constructor` | constructor | <code>(): InMemoryMCPCapabilityBaselineStore</code> | Creates an instance of this class. |
| `load` | method | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Loads load at this module boundary. |
| `save` | method | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MCPCapabilityBaselineStore` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `load` | method | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | Loads load at this module boundary. |
| `save` | method | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | Saves save at this module boundary. |

## `MCPDriftEvaluation` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `acceptedBaseline` | property | <code>acceptedBaseline: MCPCapabilityDescriptor[]</code> | Public accepted Baseline property. |
| `current` | property | <code>current: MCPCapabilityDescriptor[]</code> | Public current property. |
| `quarantinedKeys` | property | <code>quarantinedKeys: Set&lt;string&gt;</code> | Public quarantined Keys property. |
| `records` | property | <code>records: MCPDriftRecord[]</code> | Public records property. |

## `MCPDriftRecord` contract members

| Member | Kind | Signature | Description |
| --- | --- | --- | --- |
| `capabilityId` | property | <code>capabilityId: string</code> | Public capability Id property. |
| `capabilityKey` | property | <code>capabilityKey: string</code> | Public capability Key property. |
| `currentHash` | property | <code>currentHash: string</code> | Public current Hash property. |
| `previousHash` | property | <code>previousHash: string</code> | Public previous Hash property. |
| `serverId` | property | <code>serverId: string</code> | Public server Id property. |
| `status` | property | <code>status: MCPDriftStatus</code> | Public status property. |
