<p align="center">
  <img src="docs/hypha_logo.png" alt="Hypha logo" width="180" />
</p>

<h1 align="center">Hypha</h1>

<p align="center">
  <strong>面向生产级 LLM Agent 应用的 harness-oriented agent system framework。</strong>
</p>

<p align="center">
  <a href="README.md">English</a> | 中文
</p>

---

## 概览

Hypha 是一个基于 TypeScript 的开源 harness-oriented agent system framework，用于构建面向真实业务场景的生产级 LLM Agent 应用。

很多 agent 框架主要关注 agent 如何被编排：角色、prompt、工具、workflow、graph、多智能体协作或对话流程。Hypha 更关注另一个同样关键的问题：一个 agent system 如何被长期运行、评估、追踪、回放、治理和部署。

Hypha 的核心思想是：

> agent 不应该和运行、评估、追踪、治理和部署它所需的 harness 分离定义。

在 Hypha 中，基本单位不是一个孤立的 agent，而是一个自带 harness 的 agent system。每个 agent system 在定义时，不仅包含 agent 的角色、工具、记忆和执行流程，也同时包含运行规范、评估规则、trace 结构、失败回放逻辑、权限策略、回归测试配置和部署配置。

## 当前状态

这个仓库目前以 [`erwinmsmith/OrbitAgent`](https://github.com/erwinmsmith/OrbitAgent/tree/generic-framework) 的 `generic-framework` 分支作为初始 TypeScript backend base。当前初始化阶段只建立项目公开仓库、保留可运行的工程基础，并将项目说明切换为 Hypha。

后续代码演进会围绕 Hypha 的目标逐步重构和扩展，但每一步都应保持工程化、可维护、可测试、可扩展的设计。

## 为什么需要 Hypha？

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
多租户 / 多工作区配置
```

这些能力如果分散在业务代码、评估脚本、日志系统、部署脚本和调试工具中，会造成重复实现、评估不一致、失败难以复现、质量难以持续监控，也很难判断 agent 更新后是否发生退化。

Hypha 试图把这些能力统一到一个框架里：不仅帮助开发者搭建 agent，还帮助开发者运行、评估、追踪、治理和部署 agent system。

## 核心概念：Harnessed Agent System

Hypha 将每个 agent 应用视为一个完整的系统包：

```text
HarnessedAgentSystem = {
  AgentSpec,
  ToolSpec,
  MemorySpec,
  ProcessSpec,
  RuntimeHarness,
  EvaluationHarness,
  TraceSpec,
  PolicySpec,
  ReplaySpec,
  RegressionSpec,
  DeploymentSpec
}
```

这意味着，在 Hypha 中定义一个 agent system 时，开发者不仅要说明 agent 如何完成任务，也要说明：

```text
它如何运行；
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

## Domain Pack

Hypha 通过 Domain Pack 支持跨领域业务适配。

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
```

通过 Domain Pack，Hypha 可以在保持同一套 agent kernel 和 production harness 的前提下，将 agent system 适配到法律、教育、企业知识库、科研写作、数据分析、客户服务、软件工程和内部流程自动化等业务场景。

## 架构方向

Hypha 的长期架构可以分为三层：

```text
+------------------------------------------------------+
|                    Domain Packs                      |
|  Legal | Education | Enterprise QA | Research | Data  |
+------------------------------------------------------+

+------------------------------------------------------+
|                  Hypha Agent Kernel                  |
| Planner | Executor | Router | Tool Manager | Runtime |
+------------------------------------------------------+

+------------------------------------------------------+
|                Hypha Production Harness              |
| Runs | Traces | Evaluation | Replay | Policy | Audit |
+------------------------------------------------------+
```

- **Agent Kernel**：提供 planning、tool calling、routing、memory access、multi-agent coordination、output validation 和 error recovery 等通用 agent 执行能力。
- **Production Harness**：提供 run management、trace collection、cost tracking、policy enforcement、failure replay、regression testing、audit logging 和 human review。
- **Domain Pack**：定义框架如何被适配到具体业务场景。

Hypha 的架构演进应优先保持清晰边界、稳定接口、模块化实现和可测试行为，避免把业务逻辑、运行时状态、评估逻辑和部署配置耦合在同一层。

## Memory 与状态层

Hypha 不绑定单一记忆或存储实现。根据业务场景，后续可以支持：

- 向量数据库，例如 Milvus、Chroma 等；
- 关系型数据库；
- 文档、Markdown 或文件系统；
- Redis、MongoDB 或其他运行时状态存储；
- agent-native runtime state substrate，例如 Plasmod。

Hypha 与 Plasmod 可以形成互补关系：

```text
Hypha   = agent system framework + production harness
Plasmod = runtime state, event, memory, and materialized view substrate
```

Hypha 负责定义 agent system 如何被构建、运行、评估和治理；Plasmod 或其他状态层负责保存系统运行中的状态、事件、记忆、trace、可见性范围和物化视图。

## 工程原则

Hypha 的所有部分都应遵循以下原则：

- **模块化边界**：agent kernel、harness、domain pack、memory、policy、evaluation 和 deployment 需要有清晰接口。
- **可维护性优先**：避免把 demo 逻辑固化为框架核心；公共能力应通过稳定抽象沉淀。
- **可扩展性优先**：新模型、新工具、新存储、新领域和新部署方式应能通过插件化或配置化方式接入。
- **可观测与可回放**：运行、trace、错误、成本、评估和审核记录应成为系统的一等能力。
- **测试与回归**：框架能力需要配套单元测试、集成测试和回归测试策略。
- **生产约束前置**：权限、审计、人工审核、输出契约和部署配置不应在上线前才补。

## 仓库边界

本仓库默认可运行产品是 `src/` 下的 Hypha API 服务。LLM provider、tool、skill、memory、prompt、workflow 和 API route 等核心扩展区域应保留在 `src/`，并通过稳定接口和测试维护。

CLI、Web、桌面或移动端应用都应作为独立展示媒介存在。当前 CLI 保留为 `examples/cli/` 下的示例客户端；后续展示层应消费公开 API，而不是直接导入服务内部实现。

## 本地开发

当前 base 是一个 TypeScript / Express backend。运行前请准备 Node.js 18+、MongoDB 和 Redis。

```bash
npm install
cp .env.example .env
npm run dev
```

常用命令：

```bash
npm run build
npm run typecheck
npm run typecheck:cli
npm test
```

可选 CLI 示例：

```bash
npm run cli -- --help
```

默认服务地址：

```text
http://localhost:3000
```

## 许可证

MIT
