# `@codesoul-co/hypha-mcp`

`hypha-mcp` 管理 MCP Server、Capability Discovery、OAuth/Connection 生命周期与 Tool 归一化。Server 只有在可信组合层允许并桥接到受治理 Tool 路径后才可被 Agent 使用。

```bash
npm install @codesoul-co/hypha-mcp@1.0.1
```

## 主要导出

| 导出 | 用途 |
| --- | --- |
| `MCPIntegrationSpec` / `mcpIntegrationSpecDefinition` | 声明允许的 Server/Capability |
| `MCPConnectionManager` | 连接生命周期与健康状态 |
| `MCPCapabilityCatalog` | 发现并快照 Tool/Resource/Prompt |
| `MCPGateway` / `GovernedMCPGateway` | 中立调用与治理 |
| `MCPToolRegistryBridge` | 把批准的 MCP Tool 注册到 `ToolRegistry` |
| OAuth 契约 | 不向 Agent 暴露 Token 的授权流程 |

## 声明 Server

```ts
import { mcpIntegrationSpecDefinition } from '@codesoul-co/hypha-mcp';

const integration = mcpIntegrationSpecDefinition.parse({
  id: 'mcp.docs',
  version: '1.0.0',
  servers: [{
    id: 'docs',
    mode: 'local',
    command: 'docs-mcp',
    args: ['./docs'],
  }],
  allowedCapabilities: ['search'],
});
```

Spec 只是权限/配置输入，不会直接启动进程。Command、Endpoint、Environment 与 Credential 由可信服务组合层解析。

## Runtime 流程

```text
Domain Pack Allow-list → Connection Policy/Transport
→ Initialize/Discovery → 不可变 Capability Snapshot
→ Bridge 到 ToolRegistry → Governed Tool Execution
→ Receipt + Event/Trace
```

本地进程需要可执行文件 Allow-list、参数/环境清理、资源和生命周期限制；远程 Endpoint 需要 HTTPS、Redirect/Host 校验、Auth 与响应上限。OAuth Token 留在 Credential Store。断线重连不能重复不确定副作用。

Release Acceptance 应运行真实 Local Transport 且 0 skipped，并覆盖初始化失败、超时、取消、恶意 Endpoint、Capability Drift 和 Cleanup。

