# 组合完整系统

以下是生产组合建议的依赖顺序。每一步建立的边界会成为下一步的输入。

## 1. 产品层

Domain Pack 定义 Task/Output Schema、Workflow、Agent Patch、Capability Allow-list、Memory/Reasoning Profile、Policy、Evaluation 与部署默认值，并通过 `hypha-domain` 校验。

## 2. 执行层

把 Domain Pack 编译为 Harnessed System，应用 Agent Patch；ReAct 执行使用受保护 FSM；如有需要，再将 Workflow 映射为独立应用 FSM。

```text
DomainPack
 ├─ Agent Patch ─→ Kernel ReAct Agent
 ├─ Bindings ────→ Skills / Tools / Memory / Profiles
 ├─ Harness FSM ─→ Harnessed ReAct Execution
 └─ Workflow ────→ Optional Custom FSMProcessSpec
```

## 3. 智能层

注册 Model Provider 与 Inference Backend，再把 Reasoning Profile 中的 Model Alias 连接到它们。Provider 凭据只进入 Environment/Secret 解析。

## 4. 能力层

- Skill：版本化、有 Trust 信息的指令资产。
- Tool：类型化契约与 Handler。
- MCP：发现后归一化到 ToolRegistry 的能力。
- Memory：带 user/Session/Run Scope 的 Provider。

Domain Pack Allow-list 只缩小 Agent 可请求的范围；Policy 仍然决定某次 Invocation 能否执行。

## 5. 持久化与缓存

本地运行可用 `hypha-adapters-local` 创建 Event SQLite、Structured SQLite、Vector 与 Artifact Profile；生产环境通过 `hypha-storage` 和 Memory Interface 替换 Provider。

Serving Cache 是可选、有 Scope 的投影，不能成为事实来源。

## 6. Harness Wiring

把 Policy、Trace、EventStore、Model Inference、Governed Tool/MCP Runner 与 Governed Memory 连接到 Runner/Runtime。每个副作用都必须产生 Receipt 或 Failure Event。

## 7. API Surface

仓库 Server 提供 Durable Command API。应用在部署阶段注册 Prompt/Skill Revision，等待 `/ready`，创建/使用 Session，提交 Run Command，并通过 Run Event/Replay 跟踪执行。

```text
Web / CLI / Service
  → Session Command
  → Per-user Queue
  → Run + Events
  → Projected Session / Stream / Replay
```

## 8. 发布门禁

部署前验证 Domain Pack Load/确定性编译、Cache On/Off、Replay/Regression、非法或过期 FSM 迁移拒绝、Tool/MCP/Memory Policy Denial 与 Timeout、用户/Session/Run 隔离，以及真实持久化依赖上的 Runtime Smoke。

[Release Agent 示例](/zh/guide/examples)包含产品定义、全包 Tour、编译契约与 HTTP/FSM 入口。
