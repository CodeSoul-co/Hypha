<p align="center">
  <img src="docs/hypha_logo.png" alt="hypha logo" width="180" />
</p>

<h1 align="center">hypha</h1>

<p align="center">
  <strong>面向生产级 LLM Agent 应用的 harness-oriented agent system framework。</strong>
</p>

<p align="center">
  <a href="README.md">English</a> | 中文
</p>

---

## 概览

hypha 是一个基于 TypeScript 的开源 harness-oriented agent system framework，用于构建面向真实业务场景的生产级 LLM Agent 应用。

很多 agent 框架主要关注 agent 如何被编排：角色、prompt、工具、workflow、graph、多智能体协作或对话流程。hypha 更关注另一个同样关键的问题：一个 agent system 如何被长期运行、评估、追踪、回放、治理和部署。

hypha 的核心思想是：

> agent 不应该和运行、评估、追踪、治理和部署它所需的 harness 分离定义。

在 hypha 中，基本单位不是一个孤立的 agent，而是一个自带 harness 的 agent system。每个 agent system 在定义时，不仅包含 agent 的角色、工具、记忆和执行流程，也同时包含运行规范、评估规则、trace 结构、失败回放逻辑、权限策略、回归测试配置和部署配置。

hypha 采用 **ReAct + FSM** 的执行模型：

- **ReAct** 负责定义每个 agent 如何观察、推理、规划、行动、再次观察和验证。
- **FSM** 负责用显式状态、状态转移、转移条件和失败处理来实现这个软件工程系统。

因此，hypha 中的 agent 不是松散的 prompt chain，也不是隐藏在代码里的无限循环，而是围绕 ReAct 推理与行动过程构建的、可观测、可回放、可测试的有限状态机。

## 为什么需要 hypha？

一个原型 agent 通常只需要：

```text
prompt
tools
memory
workflow
```

但一个可以上线和长期维护的 agent system 还需要：

```text
运行生命周期管理
结构化 trace 记录
工具访问控制
输出格式校验
业务规则执行
失败案例回放
回归测试
成本监控
审计日志
人工审核
部署配置
按用户隔离和工作区配置
```

这些能力如果分散在业务代码、评估脚本、日志系统、部署脚本和调试工具中，会造成重复实现、评估不一致、失败难以复现、质量难以持续监控，也很难判断 agent 更新后是否发生退化。

hypha 试图把这些能力统一到一个框架里：不仅帮助开发者搭建 agent，还帮助开发者运行、评估、追踪、治理和部署 agent system。

## 核心概念：Harnessed Agent System

hypha 将每个 agent 应用视为一个完整的系统包：

```text
HarnessedAgentSystem = {
  ReActAgentSpec,
  ToolSpec,
  MemorySpec,
  FSMProcessSpec,
  RuntimeHarness,
  EvaluationHarness,
  TraceSpec,
  PolicySpec,
  ReplaySpec,
  RegressionSpec,
  DeploymentSpec
}
```

这意味着，在 hypha 中定义一个 agent system 时，开发者不仅要说明 agent 如何完成任务，也要说明：

```text
它如何运行；
它如何观察上下文；
它如何推理和规划；
它如何调用工具；
它如何读取和写入状态；
它如何记录 trace；
它如何校验输出；
它如何被评估；
它失败后如何回放；
它更新后如何做回归测试；
它的权限边界是什么；
它什么时候需要人工审核；
它如何部署到业务环境。
```

## ReAct + FSM 执行模型

hypha 要求所有 agent 的设计都基于 **ReAct** 模式：推理和行动交替发生，而不是先生成一次性计划再盲目执行。

一个 hypha agent 的概念循环是：

```text
Observe -> Reason / Plan -> Act -> Observe -> Verify -> Continue | Stop | Escalate
```

hypha 使用有限状态机显式实现这个循环。一个典型运行时 FSM 可以是：

```text
Idle
  -> RunInitialized
  -> ContextBuilt
  -> Reasoning
  -> ActionSelected
  -> PolicyChecked
  -> Acting
  -> ObservationRecorded
  -> Verifying
  -> MemorySync
  -> Reasoning | HumanReview | Completed | Failed
```

FSM 层为概率模型外部提供确定性软件工程边界：

- 每一次状态转移都可以 trace；
- 每一次工具调用都可以被 policy gate 检查；
- 每一次失败都可以被分类、复现和回放；
- 每一次运行都可以暂停、恢复、人工审核或终止；
- 每个 Domain Pack 都可以定制转移条件，而不需要重写 agent kernel。

hypha 的责任分离是：

```text
ReAct agent logic = 推理、规划、行动、验证
FSM runtime       = 状态转移、guard、retry、trace、replay、escalation
Production harness = 权限、评估、审计、部署、回归测试
```

## Domain Pack

hypha 通过 Domain Pack 支持跨领域业务适配。

Domain Pack 是某个业务领域的完整 agent system 定义包。它不仅包含领域 prompt 或工具列表，还包含任务结构、工具 schema、记忆结构、角色分工、业务流程、权限策略、评估指标、guardrails、输出格式和部署配置。

一个典型的 Domain Pack 可以包括：

```text
TaskSchema
ToolSchema
MemorySchema
RoleSchema
ProcessTemplate
BusinessRules
PermissionPolicy
EvaluationRubric
Guardrails
OutputContract
DeploymentConfig
FSMOverrides
RegressionCases
```

通过 Domain Pack，hypha 可以在保持同一套 agent kernel 和 production harness 的前提下，将 agent system 适配到法律、教育、企业知识库、科研写作、数据分析、客户服务、软件工程和内部流程自动化等业务场景。

## 架构方向

hypha 的长期架构可以分为三层：

```text
+------------------------------------------------------+
|                    Domain Packs                      |
|  Legal | Education | Enterprise QA | Research | Data  |
+------------------------------------------------------+

+------------------------------------------------------+
|                  hypha Agent Kernel                  |
| ReAct Planner | ReAct Executor | Router | Tool Manager |
+------------------------------------------------------+

+------------------------------------------------------+
|                hypha Production Harness              |
| FSM Runtime | Runs | Traces | Evaluation | Replay      |
| Policy | Audit | Human Review | Regression             |
+------------------------------------------------------+
```

- **Agent Kernel**：提供基于 ReAct 的 observation building、planning、reasoning、tool calling、routing、memory access、output validation 和 error recovery 等通用 agent 执行能力。
- **FSM Runtime**：通过状态、状态转移、guard、retry、中断、继续和终止状态，把 ReAct loop 显式工程化。
- **Production Harness**：提供 run management、trace collection、cost tracking、policy enforcement、failure replay、regression testing、audit logging 和 human review。
- **Domain Pack**：定义框架如何被适配到具体业务场景。

hypha 的架构演进应优先保持清晰边界、稳定接口、模块化实现和可测试行为，避免把应用逻辑、运行时状态、评估逻辑和部署配置耦合在同一层。

## 仓库结构

hypha 正在演进为 workspace 结构：

```text
packages/  框架 spec、interface、runtime contract 和 adapter
apps/      API server、CLI 等应用展示和调用媒介
configs/   本地 agent、tool、workflow 配置
docs/      架构说明、指南和共享资产
tests/     当前 app 行为的单元测试和集成测试
```

当前 Express API 服务位于 `apps/server/src`，CLI 示例位于 `apps/cli`。新的框架级能力应优先在 `packages/*` 中以 versioned spec 或 interface 的形式定义，再接入 app surface。

`packages/inference` 保留给 agent 内部 inference 编排，后续用于承载 prefix 和 KV cache 管理等机制。

Stage 0 的 package contract 已覆盖 core spec/event/policy、ReAct kernel contract、FSM 状态转移、DomainPack workflow 编译、harness trace/replay/queue、model/memory/tool/MCP/skill 抽象、inference cache 边界和本地 reference adapter。使用 `npm run test:packages` 验证这些 contract。

## Memory 与状态层

hypha 不绑定单一记忆或存储实现。Memory 在 hypha 中不是一个简单数据库选型，而是一个可插拔、可治理的 agentic memory layer。

不同 agent system 可以需要不同的 memory 模式：

- **Working memory**：当前 run 或当前任务步骤中的短期状态。
- **Episodic memory**：历史运行、trace、观察、决策和工具结果。
- **Semantic memory**：事实、文档、embedding 和语义检索知识。
- **Procedural memory**：可复用技能、任务流程、playbook 和领域规则。
- **Artifact memory**：文件、报告、代码、表格、生成结果和中间产物。
- **Governance memory**：权限决策、审批记录、审计记录、评估结果和回归结果。

根据业务场景，hypha 需要支持多种 memory backend 和混合 memory 模式：

- **向量数据库**：例如 Milvus、Chroma、pgvector、Qdrant、Weaviate 或其他 embedding store。
- **关系型数据库**：例如 PostgreSQL、MySQL、SQLite，适合结构化状态、事务记录和强一致性业务数据。
- **文档与文件系统**：例如 Markdown、JSON、本地文件、对象存储或 repository-backed artifacts。
- **运行时状态存储**：例如 Redis、MongoDB 或其他低延迟状态层。
- **混合 memory**：用向量检索做语义召回，用关系型数据库保存权威状态、版本、权限和 provenance。
- **Agent-native substrate**：例如 Plasmod 或类似的 runtime state、event、memory、materialized view 系统。

后续可以通过统一的 `MemoryProvider` 接口让这些模式可替换：

```text
MemoryProvider = {
  read(scope, query)
  search(scope, query, options)
  write(scope, record, policy)
  update(scope, recordId, patch)
  invalidate(scope, recordId, reason)
  summarize(scope, options)
  audit(scope, options)
}
```

`MemorySpec` 不只声明 memory 存在哪里，还要声明 memory 如何被 agent 使用和治理：

```text
MemorySpec = {
  providers,
  memoryTypes,
  readPolicy,
  writePolicy,
  freshnessPolicy,
  provenancePolicy,
  retentionPolicy,
  privacyPolicy,
  retrievalStrategy,
  hybridJoinStrategy
}
```

hypha 与 Plasmod 可以形成互补关系：

```text
hypha   = agent system framework + production harness
Plasmod = runtime state, event, memory, and materialized view substrate
```

hypha 负责定义 agent system 如何被构建、运行、评估和治理；Plasmod 或其他状态层负责保存系统运行中的状态、事件、记忆、trace、可见性范围和物化视图。

## 运行模式

hypha 默认采用 **单用户** 运行模式，适合本地和自托管部署。系统会根据 `config.yaml` 中的 `auth.singleUser` 准备 owner 账号，公开注册默认关闭；只有显式切换到 multi-user 并开启 registration 时才允许新增用户注册。

内部运行时仍保留 user-scoped 隔离：session、memory、token usage、API key 和操作队列都继续带有 `userId` 边界。这样默认部署保持简单，同时保留后续多用户客户端需要的并发和排队模型。

## 工程原则

hypha 的所有部分都应遵循以下原则：

- **ReAct-first agent design**：每个 agent 都必须显式暴露观察、推理、行动和验证阶段。
- **FSM-first runtime implementation**：每次运行都必须经过显式状态和受 guard 控制的状态转移。
- **模块化边界**：agent kernel、harness、domain pack、memory、policy、evaluation 和 deployment 需要有清晰接口。
- **Memory-provider neutral**：向量数据库、关系型数据库、文档存储、运行时状态存储和混合模式都应通过 adapter 支持。
- **默认单用户，内部按用户隔离**：默认部署面向一个 owner 账号，但内部 API 必须保留 `userId` 边界、按用户会话排队和多用户安全的存储结构。
- **可维护性优先**：避免把 demo 逻辑固化为框架核心；公共能力应通过稳定抽象沉淀。
- **可扩展性优先**：新模型、新工具、新存储、新领域和新部署方式应能通过插件化或配置化方式接入。
- **可观测与可回放**：运行、trace、错误、成本、评估和审核记录应成为系统的一等能力。
- **测试与回归**：框架能力需要配套单元测试、集成测试和回归测试策略。
- **生产约束前置**：权限、审计、人工审核、输出契约和部署配置不应在上线前才补。

## 支持协议
MIT
