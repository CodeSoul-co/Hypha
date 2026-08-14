# 可运行示例

仓库中的 [`examples/release-agent`](https://github.com/CodeSoul-co/Hypha/tree/main/examples/release-agent) 是应用形态示例，精确固定全部 15 个 `@codesoul-co/hypha-*` v1.0.1 包。

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

## 15 包 Tour 分别验证什么

Tour 不只是 Import Smoke；它实际执行每个已发布包的一条稳定边界。

| 包 | 操作 | 预期证据 |
| --- | --- | --- |
| [`hypha-core`](/zh/packages/core) | 解析 Harnessed System、创建作用域 Event | System/Event ID |
| [`hypha-storage`](/zh/packages/storage) | 构建 SQLite 拓扑 | Provider Engine |
| [`hypha-fsm`](/zh/packages/fsm) | 解析/分析拓扑并创建 Snapshot | 初始/可达状态 |
| [`hypha-kernel`](/zh/packages/kernel) | 解析 ReAct Agent Spec | Agent ID |
| [`hypha-harness`](/zh/packages/harness) | 记录 Event 并投影 Session | Session ID |
| [`hypha-models`](/zh/packages/models) | 注册 Mock Provider、解析 Routing | Provider/Alias 数量 |
| [`hypha-inference`](/zh/packages/inference) | 执行统一 Inference | Echo Response |
| [`hypha-memory`](/zh/packages/memory) | 解析 Memory Spec | Memory Profile ID |
| [`hypha-skills`](/zh/packages/skills) | 解析并注册 Skill | Skill ID |
| [`hypha-tools`](/zh/packages/tools) | 解析并注册 Tool Handler | Tool Contract ID |
| [`hypha-mcp`](/zh/packages/mcp) | 解析 Integration Spec | Server ID |
| [`hypha-domain`](/zh/packages/domain) | 解析并编译 Domain Pack | Pack/Workflow ID |
| [`hypha-adapters-local`](/zh/packages/adapters-local) | 创建本地 Profile | SQLite/Vector/Artifact Engine |
| [`hypha-serving-cache`](/zh/packages/serving-cache) | 生成 Key、写入并读取 | Cache Hit |
| [`hypha-testing`](/zh/packages/testing) | 断言确定性 State Path | `true` |

## 运行全包 Tour

```bash
git clone https://github.com/CodeSoul-co/Hypha.git
cd Hypha/examples/release-agent
npm install
npm run tour
npm run compile-agent
npm test
```

`tour` 只在所有代表性边界成功后输出 JSON。`compile-agent` 输出两个不同 Process：

- `reactHarnessFsm`：Framework 拥有的 ReAct 生命周期。
- `customWorkflowFsm`：从 Domain Pack Workflow 生成的应用拓扑。

Contract Test 会把同一 Pack 编译两次，比较 Harness System 和两套 FSM，并断言 Output、Memory、Reasoning、Evaluation、Tool 与 Skill Binding。Compiler 不确定或依赖快照变化都会使测试失败。

```text
npm run tour
  → 15 个包边界全部成功后输出 JSON
npm run compile-agent
  → 输出 Agent Patch、Harness FSM 与应用 FSM
npm test
  → "Release Agent contract is deterministic and valid."
```

示例把所有依赖固定在 `1.0.1`，同时也是外部 Consumer 兼容性测试。升级时一起更新全部 Hypha 包，并重跑三个命令。

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

在线执行顺序为：

1. 使用配置的 Owner 登录并获取 Bearer Token。
2. 注册版本化 Prompt，安装并激活 Skill。
3. 本地编译 Domain Pack 并应用 Agent Patch。
4. 使用 `Idempotency-Key` 提交 `start-run`。
5. 轮询 Session Command，直到 `applied`、`reused` 或终态拒绝。
6. 跟踪 Run/Event Stream 与 Replay Projection。

启动独立应用 FSM 并前进一条允许的边：

```bash
npm run run:fsm
```

`run:fsm` 先读取当前 FSM View，再提交包含 `processId`、`processVersion`、`expectedState` 与 `expectedRunRevision` 的迁移；旧客户端会被拒绝，不能覆盖较新状态。

## 改造成自己的系统

1. 把 `examples/release-agent` 复制到新应用仓库。
2. 重命名 Agent/Task/Workflow/Profile ID 并替换 Schema。
3. 使用产品节点、边、Guard、Retry 与 Review Policy 替换 Workflow。
4. 在可信组合层注册真实 Model、Tool、MCP 与 Memory Adapter。
5. 保持所有包的精确版本一致。
6. 连接 External Write 前加入 Replay/Regression Fixture。
7. 使用真实部署依赖运行[发布门禁](/zh/guide/full-system#发布门禁)。

::: danger 凭据
示例值只是占位符。真实 Owner Password、Provider Key 与 MCP Credential 不能进入 YAML、Event、Trace、源码或文档。
:::
