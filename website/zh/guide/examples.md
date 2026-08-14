# 可运行示例

仓库中的 [`examples/release-agent`](https://github.com/CodeSoul-co/Hypha/tree/main/examples/release-agent) 是应用形态的示例，固定使用全部 15 个 `@codesoul-co/hypha-*` v1.0.1 包。

## 文件分别演示什么

| 文件 | 内容 |
| --- | --- |
| `agent/domain-pack.yaml` | 产品 Schema、Workflow、Profile、Capability Allow-list、Policy 与 Fixture |
| `agent/prompt.json` | 版本化 Prompt 注册请求 |
| `agent/skill.md` | 渐进式 Skill 与 Trust 声明 |
| `agent/hypha.user.yaml` | Server 部署 Overlay |
| `src/package-tour.ts` | 全部公开包各一个代表性边界 |
| `src/agent.ts` | Domain 编译、Agent Patch 与自定义 FSM 生成 |
| `src/contract.test.ts` | 确定性编译/拓扑断言 |
| `src/run-agent.ts` | Prompt/Skill 注册与 Durable ReAct Run 提交 |
| `src/run-fsm.ts` | 自定义 FSM Run 与 Revision-aware 迁移 |

## 运行全包 Tour

```bash
git clone https://github.com/CodeSoul-co/Hypha.git
cd Hypha/examples/release-agent
npm install
npm run tour
npm run compile-agent
npm test
```

`tour` 导入全部 15 个包，所有代表性边界通过后才输出 JSON。`compile-agent` 会输出两个不同 Process：

- `reactHarnessFsm`：Framework 拥有的 ReAct 生命周期。
- `customWorkflowFsm`：从 Domain Pack Workflow 生成的应用拓扑。

## 连接 Server 运行

在 Hypha 仓库中使用示例 Overlay 启动 Server：

```bash
export HYPHA_CONFIG_PATH=/absolute/path/to/examples/release-agent/agent/hypha.user.yaml
npm run dev
```

然后在示例目录设置 Owner 账号并提交任务：

```bash
export HYPHA_BASE_URL=http://127.0.0.1:3000/api/v1
export HYPHA_OWNER_EMAIL=owner@example.com
export HYPHA_OWNER_PASSWORD=replace-with-a-private-password
npm run run -- "What guarantees make Hypha Event-first?"
```

启动独立应用 FSM 并前进一条允许的边：

```bash
npm run run:fsm
```

使用返回的 Session Command、Run 与 Event ID 跟踪执行。应查询 Command Status、Run、Event 与 Replay，而不是把最初 HTTP 响应当成执行结果。

## 改造成自己的系统

1. 把 `examples/release-agent` 复制到新的应用仓库。
2. 重命名 Agent/Task/Workflow/Profile ID 并替换 Schema。
3. 使用产品状态与 Guard 替换 Workflow。
4. 在可信组合层注册真实 Model、Tool、MCP 与 Memory Adapter。
5. 保持所有包的精确版本一致。
6. 连接 External Write 前先加入 Regression Fixture。

::: danger 凭据
示例值只是占位符。真实 Owner Password、Provider Key 与 MCP Credential 不能进入 YAML、Event、Trace、源码或文档。
:::
