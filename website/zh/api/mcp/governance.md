# `@codesoul-co/hypha-mcp` / `governance`

- 包索引: [`@codesoul-co/hypha-mcp`](/zh/api/mcp)
- 模块指南: [学习与组合说明](/zh/packages/mcp)
- 源码: [`packages/mcp/src/governance.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/mcp/src/governance.ts)
- 导出数: **11**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `InMemoryMCPCapabilityBaselineStore` | 类 | <code>new InMemoryMCPCapabilityBaselineStore(): InMemoryMCPCapabilityBaselineStore</code> | In Memory MCP Capability Baseline Store 的运行时实现；公开构造函数与成员见下表。 |
| `attestCapability` | 函数 | <code>attestCapability(capability: MCPCapabilityDescriptor): MCPCapabilityDescriptor</code> | attest Capability 的公开运行时操作。 |
| `capabilityHash` | 函数 | <code>capabilityHash(capability: MCPCapabilityDescriptor): string</code> | capability Hash 的公开运行时操作。 |
| `capabilityKey` | 函数 | <code>capabilityKey(capability: Pick&lt;MCPCapabilityDescriptor, "serverId" &#124; "capabilityId"&gt;): string</code> | capability Key 的公开运行时操作。 |
| `evaluateCapabilityDrift` | 函数 | <code>evaluateCapabilityDrift(discovered: MCPCapabilityDescriptor[], baseline: MCPCapabilityDescriptor[], policy?: MCPDriftPolicy): MCPDriftEvaluation</code> | 评估 Capability Drift。 |
| `governedSideEffectLevel` | 函数 | <code>governedSideEffectLevel(capability: MCPCapabilityDescriptor): SideEffectLevel</code> | governed Side Effect Level 的公开运行时操作。 |
| `MCPCapabilityBaselineStore` | 接口 | <code>interface MCPCapabilityBaselineStore</code> | MCP Capability Baseline Store 的字段契约；完整字段见下表。 |
| `MCPDriftEvaluation` | 接口 | <code>interface MCPDriftEvaluation</code> | MCP Drift Evaluation 的字段契约；完整字段见下表。 |
| `MCPDriftRecord` | 接口 | <code>interface MCPDriftRecord</code> | MCP Drift Record 的字段契约；完整字段见下表。 |
| `MCPDriftPolicy` | 类型 | <code>type MCPDriftPolicy = 'quarantine' &#124; 'accept'</code> | MCP Drift Policy 的公共类型别名。 |
| `MCPDriftStatus` | 类型 | <code>type MCPDriftStatus = 'added' &#124; 'unchanged' &#124; 'changed' &#124; 'removed'</code> | MCP Drift Status 的公共类型别名。 |

## `InMemoryMCPCapabilityBaselineStore` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): InMemoryMCPCapabilityBaselineStore</code> | 创建该类的实例。 |
| `load` | 方法 | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 加载 load。 |
| `save` | 方法 | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | 保存 save。 |

## `MCPCapabilityBaselineStore` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `load` | 方法 | <code>load(integrationId: string): Promise&lt;MCPCapabilityDescriptor[]&gt;</code> | 加载 load。 |
| `save` | 方法 | <code>save(integrationId: string, capabilities: MCPCapabilityDescriptor[]): Promise&lt;void&gt;</code> | 保存 save。 |

## `MCPDriftEvaluation` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `acceptedBaseline` | 属性 | <code>acceptedBaseline: MCPCapabilityDescriptor[]</code> | accepted Baseline 字段。 |
| `current` | 属性 | <code>current: MCPCapabilityDescriptor[]</code> | current 字段。 |
| `quarantinedKeys` | 属性 | <code>quarantinedKeys: Set&lt;string&gt;</code> | quarantined Keys 字段。 |
| `records` | 属性 | <code>records: MCPDriftRecord[]</code> | records 字段。 |

## `MCPDriftRecord` 契约字段

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `capabilityId` | 属性 | <code>capabilityId: string</code> | capability Id 字段。 |
| `capabilityKey` | 属性 | <code>capabilityKey: string</code> | capability Key 字段。 |
| `currentHash` | 属性 | <code>currentHash: string</code> | current Hash 字段。 |
| `previousHash` | 属性 | <code>previousHash: string</code> | previous Hash 字段。 |
| `serverId` | 属性 | <code>serverId: string</code> | server Id 字段。 |
| `status` | 属性 | <code>status: MCPDriftStatus</code> | status 字段。 |
