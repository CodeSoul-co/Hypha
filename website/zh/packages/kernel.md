# `@codesoul-co/hypha-kernel`

`hypha-kernel` 提供 Provider-neutral 的 Agent 与 ReAct 推理契约，通过 Port 协调 Context、Inference、Skill、Tool 与 Memory，把业务工作流拓扑留给 Domain Pack/FSM。

```bash
npm install @codesoul-co/hypha-kernel@1.0.1
```

## 主要导出

| 导出 | 职责 |
| --- | --- |
| `ReActAgentSpec` | 版本化 Agent 配置和能力引用 |
| `reactAgentSpecDefinition` | Parser、示例与 JSON Schema |
| `ReActRunner` | 有界的 Provider-neutral ReAct 循环 |
| `ReActAgentRunner` | 解析 Agent 与已加载能力 |
| `ToolRunnerActivityAdapter` | 把受治理 Tool 结果转换成 Kernel Activity |
| `ReActAgentRuntime` | 启动/恢复 Agent 的 Port |

## 定义 Agent

```ts
import { reactAgentSpecDefinition } from '@codesoul-co/hypha-kernel';

const agent = reactAgentSpecDefinition.parse({
  ...reactAgentSpecDefinition.example,
  id: 'agent.release-research',
  version: '1.0.0',
  name: 'Release research agent',
  modelAlias: 'reasoning.primary',
  promptRefs: [{ id: 'prompt.release-research', version: '1.0.0' }],
  skillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
  toolRefs: ['search'],
});
```

Agent 只引用 Alias/Ref，不保存 Provider 对象或密钥。启动时通过 [`hypha-models`](./models) 或 [`hypha-inference`](./inference) 解析。

## 执行边界

```text
构建 Context → 推理 → 选择动作 → Policy 检查
→ 受治理动作 → Observation → 验证 → Memory 同步
```

每个副作用都必须经过注入 Port。Tool 使用 `ToolRunnerActivityAdapter`，Memory 写入、Inference 与 Trace 也要使用对应治理绑定，Domain 代码不能在推理循环内直接调用 SDK。

## Budget 与终止

配置有限的步骤、Token、时间和恢复预算，显式处理完成、失败、取消与人工审核。长任务由 [`hypha-harness`](./harness) 拆成可恢复 Quantum，而不是隐藏在无限循环里。

Kernel 负责推理语义；[`hypha-domain`](./domain) 负责产品定义；[`hypha-fsm`](./fsm) 负责合法状态移动；HTTP/CLI/UI 属于应用层。

