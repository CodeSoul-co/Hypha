# `@codesoul-co/hypha-domain`

`hypha-domain` 定义应用自有 Domain Pack，并把选中的 Task、Workflow 与 Profile 编译成已校验的 FSM 和 Agent System Binding。业务流程、Schema、Policy 与 Evaluation Fixture 应放在这里。

```bash
npm install @codesoul-co/hypha-domain@1.0.1
```

## Domain Pack 内容

| 定义 | 用途 |
| --- | --- |
| Task Schema / Output Contract | 校验产品输入输出 |
| `WorkflowSpec` | 应用节点、边、Guard 与策略 |
| Session Profile | 产品上下文默认值，不是事实状态 |
| Skill/Tool/MCP Allow-list | 限制 Workflow/State 能力 |
| Memory/Context/Reasoning Profile | 绑定 Provider-neutral 行为 |
| Policy / Business Rule | 治理产品决策与副作用 |
| Evaluation / Regression | 跨版本证明行为 |

## 加载与编译

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';

const pack = await loadDomainPackFile('./agent/domain-pack.yaml');
const compiled = compileDomainPackToHarnessedSystem(pack, {
  agentRef: { id: 'agent.release-research', version: '1.0.0' },
  taskSchemaId: 'task.research',
  workflowId: 'workflow.research',
  memoryProfileId: 'memory.release',
  reasoningProfileId: 'reasoning.release',
  agentSkillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
  agentToolRefs: ['search'],
});

const agent = applyDomainAgentPatch(
  {
    id: 'agent.release-research',
    version: '1.0.0',
    name: 'Release research agent',
    modelAlias: 'reasoning.primary',
  },
  compiled.agentPatch,
);
```

编译结果包含 Binding、应用 `fsmProcess`、受保护 `harnessedSystem`、Agent Patch、Session 初始化与确定性依赖/审计 Hash。Run Evidence 应记录选中版本和 Hash。

应用 Workflow 可定义/调整节点、边、Guard、Timeout、Retry 与 Human Review；独立 Harness FSM 仍由 Framework 保护。State Binding 可进一步缩小 Tool、Skill、Prompt、MCP、Memory 与 Permission Scope，但最终仍由 Registry/Policy/Governed Runner 执行授权。

完整示例见[组合完整系统](/zh/guide/full-system)。
