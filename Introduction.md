# **Introduction**
**Hypha** 是一个基于 **TypeScript** 的开源 **harness-oriented agent system framework**，用于构建面向真实业务场景的生产级 LLM Agent 应用。

现有许多 agent 框架主要关注如何设计和编排 agent，例如定义角色、prompt、工具、workflow、graph、crew 或多智能体对话。这些能力对于快速构建原型非常有用，但真实业务中的 agent 系统远不止“能调用工具”或“能完成一个 workflow”。一个可以上线和长期维护的 agent 系统，还需要运行管理、trace 记录、自动评估、失败回放、回归测试、权限控制、审计日志、成本追踪、部署配置和人工审核流程。

Hypha 的核心思想是：

**agent 不应该和运行、评估、追踪、治理和部署它所需的 harness 分离定义。**

在 Hypha 中，基本单位不是一个孤立的 agent，而是一个 **自带 harness 的 agent system**。每个 agent system 在定义时，不仅包含 agent 的角色、工具、记忆和执行流程，也同时包含运行规范、评估规则、trace 结构、失败回放逻辑、权限策略、回归测试配置和部署配置。这样，一个 agent 从一开始就不是 demo，而是面向真实业务运行的系统单元。

---

## **为什么需要 Hypha？**

LLM Agent 正在逐渐进入法律咨询、教育辅导、企业知识库、科研写作、数据分析、客户服务、软件工程和办公自动化等真实业务流程。但从原型到生产环境之间，仍然存在很大的工程落差。

一个原型 agent 通常只需要：

```text
prompt
tools
memory
workflow
```

但一个生产级 agent system 还需要：

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

在很多项目中，这些能力往往被分散地、重复地写在业务代码、评估脚本、日志系统、部署脚本和调试工具中。每换一个新领域，就要重新写 prompt、工具接口、任务 schema、评估指标、权限规则、trace 逻辑和部署配置。这会导致开发成本高、系统难以复现、评估不一致、质量难以持续监控，也很难判断 agent 在更新后是否发生退化。

Hypha 试图把这些问题统一到一个框架里解决：**不仅帮助开发者搭建 agent，还帮助开发者运行、评估、追踪、治理和部署 agent system。**

---

## **核心概念：Harnessed Agent System**

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

这意味着，在 Hypha 中定义一个 agent system 时，开发者不仅要说明 agent “怎么完成任务”，也要说明：

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

因此，Hypha 的目标不是让 agent 在一次 demo 中跑通，而是让 agent system 从设计之初就具备业务上线所需的结构。

---

## **Domain Pack**

为了支持跨领域业务适配，Hypha 引入 **Domain Pack** 机制。

Domain Pack 是某个业务领域的完整 agent system 定义包。它不仅包含领域 prompt 或工具列表，还包含该领域的任务结构、工具 schema、记忆结构、角色分工、业务流程、权限策略、评估指标、guardrails、输出格式和部署配置。

一个典型的 Domain Pack 包括：

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

例如，法律场景的 Domain Pack 可以定义案件事实结构、法条检索工具、引用要求、风险审查流程、客户数据隔离策略和法律备忘录输出格式。教育场景的 Domain Pack 可以定义学生答案结构、误概念诊断流程、反馈生成规则、禁止直接泄露答案的 guardrail、学习路径输出格式和教学效果评估指标。

通过 Domain Pack，Hypha 可以让开发者在保持同一套 agent kernel 和 harness 的前提下，将 agent system 快速适配到不同业务场景。新领域的开发不再是“重写一套 agent”，而是“定义一个领域系统包”。

---

## **系统架构**

Hypha 的整体架构可以分为三层：

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

其中，**Agent Kernel** 提供通用的 agent 执行能力，包括 planning、tool calling、routing、memory access、multi-agent coordination、output validation 和 error recovery。

**Production Harness** 提供面向生产环境的运行能力，包括 run management、trace collection、cost tracking、policy enforcement、failure replay、regression testing、audit logging 和 human review。

**Domain Pack** 则定义框架如何被适配到具体业务场景。

这种设计使 Hypha 能够将“agent 怎么工作”和“agent system 怎么被运行、评估和治理”统一起来。

---

## **与 Plasmod 的关系**

Hypha 可以与 **Plasmod** 形成互补关系。Plasmod 是 agent-native database / runtime state substrate，而 Hypha 是 agent system framework + production harness。（可以提及但是现在不需要接入，而是提供向量数据库milvus、chorma等等，或者关系型数据库，或者其他memory方式，例如md等等）

可以这样理解：

```text
Hypha   = agent system framework + production harness
Plasmod = runtime state, event, memory, and materialized view substrate
```

Hypha 负责定义 agent system 如何被构建、运行、评估和治理；Plasmod 负责保存这些系统运行中的状态、事件、记忆、trace、可见性范围和物化视图。

也可以更形象地说：

**Hypha 生长并运行 agent system；Plasmod 保存它的运行状态。**

二者结合后，可以形成一套更完整的 agent-native 基础设施：Hypha 负责业务结构、执行编排和 harness，Plasmod 负责底层状态、记忆和事件存储。

---

## **Hypha 提供什么？**

Hypha 面向的是希望把 LLM Agent 真正落地到业务系统中的开发者和团队。它提供的不是一个单独的 agent demo，而是一套生产级 agent system 开发体验。

Hypha 希望实现：

```text
一次定义，稳定运行；
每次执行，都有 trace；
每个输出，都能评估；
每个失败，都能回放；
每次更新，都能回归测试；
每个工具，都有权限治理；
每个业务领域，都能通过 Domain Pack 适配；
每个 agent system，都能面向部署和长期维护。
```

因此，Hypha 特别适合构建：

```text
法律咨询 agent
合同审查 agent
教育诊断 agent
学习路径规划 agent
企业知识库 agent
客户服务 agent
科研写作 agent
数据分析 agent
软件工程 agent
内部流程自动化 agent
```

---

## **总结**

Hypha 不是另一个只关注 agent 编排的框架。它是一个 **面向 harness 的 agent system framework**。

现有 agent framework 更多帮助开发者定义 agent 如何思考、协作和调用工具；Hypha 更关注一个 agent system 如何被运行、评估、追踪、回放、治理和部署。在 Hypha 中，每个 agent 都天然携带自己的 harness，因此它从一开始就是一个面向业务上线和长期维护的系统单元。

Hypha 的目标是让 LLM Agent 从“能跑的原型”走向“可复用、可观测、可评估、可治理、可部署的业务级系统”。