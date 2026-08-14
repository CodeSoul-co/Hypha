# 快速开始

本指南搭建一个通过版本化 npm 库使用 Hypha 的应用。需要 Node.js 22 LTS 或更高版本。

## 1. 创建应用

```bash
mkdir my-hypha-agent && cd my-hypha-agent
npm init -y
npm install -D typescript tsx vitest @types/node
npm install \
  @codesoul-co/hypha-core@1.0.1 \
  @codesoul-co/hypha-fsm@1.0.1 \
  @codesoul-co/hypha-domain@1.0.1 \
  @codesoul-co/hypha-kernel@1.0.1 \
  @codesoul-co/hypha-harness@1.0.1
```

只有在组合真正需要时才添加 Capability/Provider 包，完整列表见[15 个模块](/zh/packages/)。

## 2. 由应用拥有产品定义

创建 `agent/` 目录：

| 文件 | 职责 |
| --- | --- |
| `domain-pack.yaml` | Task/Output Schema、Workflow、Allow-list、Profile、Policy 与 Fixture |
| `prompt.json` | 版本化 Prompt 注册请求 |
| `skill.md` | 渐进加载的指令资产与 Trust Metadata |
| `hypha.user.yaml` | 部署拥有的 Server Overlay；不能提交 Secret |

具体业务的 Workflow、Prompt 与 Schema 都属于这里，不能进入 Core、Kernel 或 Harness。

## 3. 先编译，再绑定 Provider

```ts
import {
  compileDomainPackToHarnessedSystem, loadDomainPackFile,
} from '@codesoul-co/hypha-domain';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');
const system = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.example', version: '1.0.0' },
  taskSchemaId: 'task.example', workflowId: 'workflow.example',
  agentToolRefs: ['search'],
  agentSkillRefs: [{ id: 'skill.example', version: '1.0.0' }],
});
```

编译负责校验产品意图；可信应用/Server 组合层再分别注册 Model、Tool、MCP、Memory 与 Storage Provider。

## 4. 选择执行路径

- **ReAct Agent：**通过 Kernel + Harness 执行 `system`，保持 Framework 拥有的 FSM 不变。
- **自定义 Workflow：**把 Workflow 映射到独立 `FSMProcessSpec`，校验后提交 FSM Run。

调整节点或边之前请阅读[控制 FSM](/zh/guide/fsm-control)。

## 5. 验证边界

```bash
npm run typecheck
npm test
```

至少应测试确定性编译、能力 ID、Output Schema、FSM 拓扑、Event Scope 与 Replay 后的状态。

接下来可以阅读[系统架构](/zh/guide/architecture)、[完整组合](/zh/guide/full-system)与[可运行示例](/zh/guide/examples)。
