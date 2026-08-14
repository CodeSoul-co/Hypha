<p align="center">
  <img src="docs/hypha_logo.png" alt="hypha logo" width="180" />
</p>

<p align="center">
  <strong>面向受治理、持久且可复用领域 Agent 的 Agent Core + Production Harness。</strong>
</p>

<p align="center">
  <sub>DomainPack · Event-first Runtime · Governed Capabilities · Recovery · Cache & Reuse</sub>
</p>

<p align="center">
  <a href="README.md">English</a> | 中文
</p>

<p align="center">
  <a href="https://codesoul-co.github.io/Hypha/"><strong>用户使用文档</strong></a>
  · <a href="https://hypha.code-soul.com/"><strong>官方网站</strong></a>
  · <a href="https://github.com/CodeSoul-co/Hypha/releases/tag/v1.0.1">v1.0.1 Release</a>
  · <a href="https://www.npmjs.com/org/codesoul-co">npm Packages</a>
</p>

> **当前公开版本：** v1.0.1，共 15 个版本对齐的 `@codesoul-co/hypha-*` 包。
> [版本化用户文档](https://codesoul-co.github.io/Hypha/)包含全部包的 API 用法、自定义 FSM 控制和完整系统组合示例。

## hypha 是什么？

hypha 是一个开源 TypeScript 框架，由相互协作的 **Agent Core** 与 **Production Harness** 两层构成。
Agent Core 负责推理/ReAct、规划、Tool 选择、Memory 访问，以及模型与 Context 编排；Production
Harness 则通过 FSM 控制、Policy/Approval、Checkpoint、恢复、回放与审计，把这些决策转化为有边界、
以 Event 为依据的执行。

产品特定行为通过 `DomainPack` 声明，而不是硬编码进 Runtime。DomainPack 将任务、Workflow、
Capability、Prompt、Memory、Policy、Evaluation 与输出契约编译到共享 Core + Harness 中。横跨各层的
**Cache & Reuse Plane** 会复用推理、Tool、Memory、Execution 与 Inference 中已经验证的工作，同时
始终保持为可丢弃的投影视图：Cache 可以加速执行，但不能成为授权依据，也不能取代 Event、Artifact、
Receipt 或 Checkpoint 证据。

## 架构概览

<p align="center">
  <img src="docs/readme/hypha-framework.png"
       alt="Hypha 架构：DomainPack、Agent Core、Production Harness、Cache & Reuse Plane 与领域 Agent 示例"
       width="1050" />
</p>

<p align="center">
  <em>同一套 Agent Core + Production Harness 可以加载不同 DomainPack；Cache & Reuse Plane 则横跨
  推理、Tool、Memory、Execution 与 Inference。</em>
</p>

| 层                      | 主要职责                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Agent Core**          | 推理/ReAct、规划、Tool 选择、Memory 访问，以及模型与 Context 编排。                                                        |
| **Production Harness**  | FSM 执行、Event/Checkpoint 控制、Policy/Approval、Continuation、恢复、审计与回放。                                         |
| **DomainPack**          | 声明产品特定的任务、Workflow、Capability、Memory、Skill、Prompt、Policy、Evaluation 与输出契约，并将其编译到共享 Runtime。 |
| **Cache & Reuse Plane** | 复用已验证的模型工作、推理结构、Tool/Execution 结果、Memory/Context 投影和 Prefix/KV 状态，但不成为事实来源或授权依据。    |

这种分层让同一套 Runtime 能够支持差异很大的 Agent 产品。Coding Agent、Finance Agent、Legal Agent
或 Research Agent 可以共享 Core + Harness，只需替换 DomainPack、Capability Binding、Policy、
Evaluation Contract 与领域状态。

## Cache 管理与类型化 Cache Tree

Cache 在 hypha 中是一等控制面，而非单一的响应缓存功能。Exact LLM Response、推理子图、Tool Result、
Memory Projection 与 KV Prefix 的有效性和失效条件各不相同，因此系统将其拆分为多个复用层。

| Cache 层                   | 可复用单元                                             | 典型有效性边界                                                                                    |
| -------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Serving Cache**          | Exact、Normalized 的模型响应                           | 模型/Provider 身份、Normalized Request、Scope、TTL 与响应有效性。                                 |
| **Thinking Cache**         | 推理节点、路径或可复用子图                             | 模型/Provider、推理策略/版本、Prompt Block、Tool Schema、Inference Parameter 与 Scope。           |
| **WorkCache**              | 从 Event 派生的类型化 Agent 工作                       | Source Event Provenance、依赖/Revision Closure、Scope、Validity State 与未来需求。                |
| **Tool / Execution Cache** | 符合条件的只读 Tool Result 或确定性 Execution Result   | Capability Revision、Policy、外部状态证据、Workspace/Environment Snapshot、Idempotency 与 Scope。 |
| **Memory / Context Cache** | Memory Search 与已组装的 Context Projection            | Memory Scope、Mutation Generation、Source Revision、Provenance 与 Context Policy。                |
| **Prefix / KV Cache**      | Prompt Prefix Block、Provider Prefix 或后端 KV Segment | 模型/Backend、Agent/Session/Domain Scope、Prompt Dependency 与 Prefix/KV Revision。               |

<p align="center">
  <img src="docs/readme/cache-tree-management.png"
       alt="分层 Cache Tree：Artifact Type Root、Hash Prefix Parent、Full-key Leaf、插入、查找与局部失效"
       width="760" />
</p>

Cache Tree 使用类型化 Root 划分可复用 Artifact，以紧凑 Parent Node 按 Hash Prefix 路由查找，并在
Leaf 保存完整 Logical Key。插入新 Leaf 不需要重建无关分支，过期 Leaf 也能局部失效。因此物理 Tree
只是查找结构，Event 与 Artifact 证据仍然是事实来源。

WorkCache 将这种查找模式扩展为面向 Agent 执行的**语义 Cache Tree**：

| 语义 Tree          | 复用内容                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `PlanTree`         | Plan、Plan Branch 与可复用的 Planning Artifact。                                                     |
| `ComputationTree`  | 推理/计算节点与派生工作，同时也是 Thinking Cache 的天然承载层。                                      |
| `ToolTree`         | 符合条件的 Tool Call Result 及其 Provenance/Validity Metadata。                                      |
| `ObservationTree`  | 与 Source Evidence 和 Scope 绑定的可复用 Observation。                                               |
| `VerificationTree` | Verification、Checking 与 Output Validation 工作。                                                   |
| `MemoryTree`       | 有效性跟随 Memory Mutation Generation 与 Scope 的 Memory-derived Projection。                        |
| `RecoveryTree`     | 按 Failure Context 与相关 Runtime Revision 索引的 Recovery Knowledge；Hit 仅用于建议，必须重新验证。 |
| `PromptPrefixTree` | Provider/Backend Prefix Reuse 使用的稳定 Prompt Block 与 Prefix Materialization。                    |

核心不变量是**复用不产生授权**。Cache Hit 可以避免重复计算，但不能授权 Tool、跳过 Policy 或
Approval、伪造 Receipt、推进 FSM，或取代 Event 与 Artifact 证据。因此，Cache Lookup、Validation、
Invalidation 与 Bypass 都属于 Runtime 控制，而不是隐藏的实现细节。

## 跨 Benchmark 的 Cache 诊断

<p align="center">
  <img src="docs/readme/cache-benchmark-diagnostics.png"
       alt="通过 Ablation 得出的 Cache 组件贡献：Finance、TabMWP、tau-squared、总体成功率、API 成本节省与延迟节省"
       width="1050" />
</p>

<p align="center">
  <em>通过 Ablation 得出的组件贡献，覆盖任务成功率、API 成本节省与延迟节省。</em>
</p>

## 产品模型

| 概念         | 职责                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| `DomainPack` | 声明任务、工作流、输出契约、Skill、Tool、MCP、Memory、Context、Policy、Evaluation、Regression 与部署引用。 |
| `Agent`      | 选择模型别名，并接收 DomainPack 编译出的能力引用。                                                         |
| `Session`    | 保存用户与产品上下文，引用 DomainPack 和可选 Session Profile。                                             |
| `Run`        | Session 下的一次持久化执行。                                                                               |
| `Event`      | 最小事实记录；状态、回放、审计与回归视图都从 Event 投影。                                                  |
| `Artifact`   | 保存内容寻址的输入、输出、Checkpoint 与执行证据。                                                          |

Canonical 执行路径如下：

```text
DomainPack
  -> 校验后的 Binding 与依赖快照
  -> Framework-owned Harness FSM
  -> 有界 ReAct Quantum 与 Domain Pipeline 证据
  -> 受治理的 Tool / MCP / Memory / Execution Activity
  -> Event + Receipt + Artifact 证据
  -> Projection、Continuation、Recovery、Replay 与 Evaluation
```

任何 Cache Hit 或 Provider Response 都不能授权副作用、推进 FSM，也不能替代 Event 与 Artifact
证据。Tool、MCP、Memory、文件、Execution 和外部写入必须经过 Policy、Trace、Cancellation、
Deadline、Idempotency 与 Harness 边界。

## 内置能力

| 模块            | Runtime 能力                                                                                                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime         | ReAct + FSM、持久 Session Command、有界 Continuation、Timer、Lease、Fencing、Cancellation、Recovery Worker、人工复核、Replay、Audit 与 Regression Projection。                                 |
| Domain          | YAML/JSON/TypeScript DomainPack、运行时校验、Overlay、Registry、确定性编译器、依赖快照与 Agent Patch。                                                                                         |
| Memory          | 统一治理契约下的 Hypha Native Memory、Native Lite、Mem0 OSS、Mem0 Platform 与 Vertex AI Memory Bank Adapter。                                                                                  |
| Tool 与 MCP     | Local、HTTP、Plugin、Mock、MCP Adapter 共用一条受治理 Invocation 路径，并支持 Capability Snapshot 与 Drift Control。                                                                           |
| Skill 与 Prompt | Built-in、Filesystem、Package、签名 Remote Skill Registry、渐进加载、版本化 Prompt 引用与模板。                                                                                                |
| Execution       | Provider-neutral Workspace、Sandbox、Command、Artifact、Store、Lease、Recovery 与 Cache 契约，以及 Local Process、Docker、Remote HTTP、SQLite、PostgreSQL、本地文件、S3-compatible Adapter。   |
| Cache           | Serving Cache、Event-derived WorkCache、Thinking Cache、类型化语义 Cache Tree、Capability Result Cache、Memory/Context Projection、Prefix/KV Reuse，以及有 Scope 的 Validity 与 Invalidation。 |
| 应用界面        | 使用同一 Framework Runtime 的 Express API Server 与示例 CLI。                                                                                                                                  |

## 快速开始

### 环境要求

- Node.js 22 或更高版本
- npm
- MongoDB 与 Redis（内置 API Server 需要）
- 至少一个已配置的模型 Provider，或可访问的本地模型服务

### 1. 安装工作区

```bash
git clone https://github.com/CodeSoul-co/Hypha.git
cd Hypha
npm ci
cp .env.example .env
```

产品配置不要直接写入 Git 跟踪的模板。通过 `HYPHA_CONFIG_PATH` 指向用户所有的 YAML Overlay；
无冲突更新目录结构参见[升级指南](UPGRADING.md)。

如果只需要临时本地环境，可以使用容器启动 MongoDB 与 Redis：

```bash
docker run -d --name hypha-mongodb -p 27017:27017 mongo:8
docker run -d --name hypha-redis -p 6379:6379 redis:7-alpine
```

也可以通过 `MONGODB_URI` 与 `REDIS_URL` 使用自托管或托管服务。

### 2. 配置身份与模型 Provider

编辑 `.env`。Credential 不应写入 `config.yaml` 或提交到源码仓库。

```bash
HYPHA_OWNER_EMAIL=owner@example.com
HYPHA_OWNER_PASSWORD=replace-with-a-private-password
JWT_SECRET=replace-with-at-least-32-random-characters

HYPHA_LLM_DEFAULT_PROVIDER=openai
HYPHA_LLM_DEFAULT_MODEL=gpt-4o-mini
OPENAI_API_KEY=your-provider-key
```

默认部署为单用户模式：系统在启动时创建已配置的 Owner，注册接口保持关闭。内部数据访问仍然
保留 user、Session、Run、Workspace 与 tenant 边界。

### 3. 启动并验证 Server

```bash
npm run dev
```

在另一个终端执行：

```bash
curl -fsS http://127.0.0.1:3000/api/v1/health
curl -fsS http://127.0.0.1:3000/api/v1/ready
```

`/health` 只表示进程存活；`/ready` 才是流量门禁。当 Storage、所选模型 Provider、Memory、
Canonical Runtime Graph 或必要 Worker 没有就绪时，`/ready` 会失败关闭。路由文档位于
`http://127.0.0.1:3000/api/v1/docs`。

### 4. 使用 CLI

```bash
npm run cli -- login --email owner@example.com
npm run cli -- chat "解释当前 Runtime" --stream
npm run cli -- tools
npm run cli -- skills
npm run cli -- workflows
```

CLI 默认将 Endpoint 配置与 JWT 保存到 `~/.hypha`。可通过 `HYPHA_BASE_URL` 与 `HYPHA_HOME`
连接其他 Server 或隔离不同客户端配置。

## 使用 DomainPack 开发 Agent

DomainPack 是框架支持的产品集成边界。产品特定的 Task、Prompt、Workflow、Rule 与 Capability
选择应放在 DomainPack 或产品应用中，而不是写入 `@codesoul-co/hypha-core`、`@codesoul-co/hypha-kernel` 或通用 Runtime。

如果应用通过版本化 npm release 使用 Hypha，并需要独立的 Prompt、Skill、Tool、Policy、契约测试与
HTTP Run 提交示例，请参见 [`release-agent` 示例](examples/release-agent/README.md)。

### 1. 声明 Domain

可以从 [`configs/domain-packs/minimal.domain.yaml`](configs/domain-packs/minimal.domain.yaml)
开始。生产级 DomainPack 通常包含：

| 声明                                     | 控制内容                                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `taskSchemas`                            | 可接受的任务类型、输入 Schema、输出契约引用与默认 Workflow。                                                                                                  |
| `outputContracts`                        | 可由程序验证的最终输出 Schema。                                                                                                                               |
| `sessionProfiles`                        | 默认 Metadata，以及 Memory、Context、Reasoning、Tool、MCP、Skill、Policy Profile 引用。                                                                       |
| `workflows`                              | 产品 Stage、Guard、Retry/Timeout、人工复核、State-scoped Capability 与拓扑证据。ReAct Run 保留受保护的 Harness FSM；Custom FSM Run 可使用独立验证的应用拓扑。 |
| `tools`, `toolProfiles`                  | 稳定 Tool Contract，以及允许绑定到可执行 Adapter 的 Profile。                                                                                                 |
| `mcpProfiles`                            | Server 引用、Capability Import Rule、Trust Policy 与版本固定策略。                                                                                            |
| `memoryProfiles`, `contextProfiles`      | Memory 选择、读写策略、Context Source、Provenance 与 Token Budget。                                                                                           |
| `allowedSkills`, `skillPolicies`         | Agent 可加载的 Skill，以及每个 Skill 可使用的 Tool 与 Policy。                                                                                                |
| `allowedPromptRefs`, `defaultPromptRefs` | 必须由应用组合层解析的版本化 Prompt Template。                                                                                                                |
| `policies`, `businessRules`              | Permission、Approval、Precondition、Postcondition 与输出约束。                                                                                                |
| `evaluationProfiles`, `regressionCases`  | Event-derived 验收与回归定义。                                                                                                                                |

Provider URL、Bearer Token、API Key 与部署 Secret 不应写入 DomainPack。DomainPack 只选择稳定的
Profile 引用，由可信应用组合层将其解析为真实 Provider。

### 2. 加载、校验与编译

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  DomainPackRegistry,
  LocalDomainPackLoader,
} from '@codesoul-co/hypha-domain';

const registry = new DomainPackRegistry();

await new LocalDomainPackLoader({
  directories: ['configs/domain-packs'],
}).loadInto(registry);

const domainPack = registry.get('domain.minimal', '0.0.0');
if (!domainPack) throw new Error('DomainPack not found');

const compiled = compileDomainPackToHarnessedSystem(domainPack, {
  agentRef: { id: 'agent.default', version: '1.0.0' },
  taskSchemaId: 'task.minimal',
  workflowId: 'workflow.minimal',
  sessionProfileId: 'session.local',
  memoryProfileId: 'memory.local',
});

const agent = applyDomainAgentPatch(
  {
    id: 'agent.default',
    version: '1.0.0',
    name: 'Default Agent',
    modelAlias: 'default-chat',
  },
  compiled.agentPatch
);
```

编译器会验证内部引用，并输出应用组合所需的完整数据：

| 编译结果                 | 集成方式                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `fsmProcess`             | 注册由 Framework 所有的 Canonical Harness `FSMProcessSpec`。                                   |
| `harnessedSystem`        | 绑定 Agent、FSM、Policy、Trace、Memory、MCP、Context、Tool、Skill、Evaluation 与 Output 引用。 |
| `agentPatch`             | 将已解析的 Prompt、Skill、Tool、Memory、Context、Reasoning 与 Policy 引用应用到 Agent。        |
| `bindings`               | 只注册已选择的具体 Capability 与 State-level Allowlist。                                       |
| `sessionInitialization`  | 创建 Session Metadata 与默认 Profile 引用。                                                    |
| `dependencySnapshot`     | 持久化 Replay 和 Cache Validity 所需的完整版本化依赖闭包。                                     |
| `processHash` 与 `audit` | 证明某个 Run 使用的编译输入与 Workflow 身份。                                                  |

### 3. 显式注册编译结果

DomainPack 文件不会因为存在于磁盘上就自动获得执行权限。应用启动时，可信组合层必须：

1. 将 DomainPack 加载到 `DomainPackRegistry`，并编译选定的 Task、Workflow 与 Profile。
2. 解析 Agent 的模型别名和版本化 Prompt 引用。
3. 注册所选 Skill，并执行 Workflow State 的 `allowedSkills` 与 `requiredSkills`。
4. 通过 Governed Tool Runner，把声明的 Tool Contract 绑定到 Local、HTTP、Plugin、Execution 或
   MCP Adapter。
5. 连接并审批编译结果要求的精确 MCP Capability Revision。
6. 通过 Server Memory Runtime 配置解析所选 Memory Profile。
7. 使用 `sessionInitialization` 创建 Session，并将 `processHash` 与 `dependencySnapshot` 和 Run
   的 Event Evidence 一起持久化。
8. 通过 Canonical Runtime 执行 `fsmProcess`，将 Domain Stage ID 记录为 Event Evidence，并且仅从
   Event 与持久 Checkpoint 派生状态。

显式激活可以防止未经审核的 YAML、Skill、Tool 或 Remote MCP Catalog 变化静默获得运行权限。

### 自定义 FSM 拓扑与所有者控制

不包含 ReAct 的 Workflow Run 可以执行经过校验的应用自有 `FSMProcessSpec`，包括自定义 State
ID、Transition、Guard、Retry/Timeout 声明与 Terminal State。ReAct Run 继续使用框架固定的
Harness FSM，避免产品拓扑绕过 Reasoning、Policy、Activity、Observation、Verification、Memory
或 Recovery 阶段。

可以使用 `@codesoul-co/hypha-fsm` 的 `analyzeFSMTopology()` 检查可达、不可达、非终态死路与循环 State。
Server 提供 `GET /runtime/runs/:runId/fsm` 和受治理的所有者接口
`POST /runtime/runs/:runId/fsm/transitions`。人工 Transition 必须携带精确 Process 身份、期望
State、Run Revision、幂等键、原因和可选 Guard Variables；Runtime 还会执行权限、Policy、
Lease、Fencing、Terminal、Event 与 Replay 校验。完整用法参见
[`自定义 FSM 拓扑`](docs/guides/custom-fsm.md)。

### 4. 在 Workflow State 收窄 Capability

DomainPack 的 Capability 声明是上限；每个 Workflow State 应继续收窄权限：

```yaml
states:
  - id: Research
    goal: Collect bounded evidence.
    allowedTools: [common.search]
    allowedSkills: [skill.context-enrichment]
    requiredSkills: [skill.context-enrichment]
    allowedMCPProfiles: [mcp.local]
    permissionScopes: [search.query]
    policyRefs: [policy.readonly]
    timeoutPolicy:
      timeoutMs: 30000
      onTimeout: fail
    retryPolicy:
      maxAttempts: 2
```

如果必要 Skill 或 Capability 缺失、不可信、被 Policy 拒绝、已过期，或与 Run Snapshot 不一致，
系统会在 Inference 或 Dispatch 之前失败关闭。

### 5. 使用 Overlay 扩展 DomainPack

通过 `extendDomainPack()` 按稳定 ID Upsert 或删除声明，并分配新版本，无需复制整个基础包：

```ts
import { extendDomainPack } from '@codesoul-co/hypha-domain';

const customized = extendDomainPack(domainPack, {
  version: '1.1.0',
  defaultSkills: [{ id: 'skill.context-enrichment', version: '0.0.0' }],
  remove: { regressionCases: ['regression.obsolete'] },
});
```

扩展结果会再次经过完整校验。因此，删除被引用的 Tool、Policy、Prompt、Skill、Memory Profile 或
Output Contract 时，必须同步更新所有依赖引用。

### 6. 将 Domain 作为产品契约测试

每个受支持的 DomainPack 选择组合都应验证：

- Schema 校验与未解析引用拒绝；
- 确定性的 `processHash` 与依赖快照；
- 合法和非法 FSM Transition、Retry、Timeout、Cancellation 与 Terminal State；
- State-scoped Tool、MCP、Skill、Prompt、Memory 与 Policy Enforcement；
- 人工复核的 Approve、Reject、Expiry 与 Resume Revalidation；
- Event-derived Replay、Audit、Regression 与 Output Contract Validation；
- Cache 开启或关闭时，Source-of-truth 行为保持一致。

完整字段与示例请参见 [`DomainPack 指南`](docs/guides/domain-packs.md)和
[`Framework API`](docs/api/framework.md)。

## 配置 Memory

内置 Server 读取 [`configs/memory-profiles.yaml`](configs/memory-profiles.yaml)。可以修改其中的
Active Profile，或通过 `HYPHA_MEMORY_CONFIG_PATH` 指向另一份经过校验的 Profile Set。

| Profile              | 适用拓扑                    | 部署配置                                                                             |
| -------------------- | --------------------------- | ------------------------------------------------------------------------------------ |
| `native-lite`        | Embedded、单进程            | 本地 SQLite Record、进程内 Working State、本地 Vector 与 Embedding Adapter。         |
| `native-default`     | 持久化 Hypha Native Runtime | MongoDB Record/History/Outbox Evidence 与 Redis Working State。                      |
| `mem0-oss`           | 自托管 Mem0                 | `HYPHA_MEM0_OSS_URL`、可选 API Key，以及 Hypha 自有持久 Mapping/Operation Evidence。 |
| `mem0-platform`      | 托管 Mem0                   | `HYPHA_MEM0_PLATFORM_TOKEN` 与 Hypha 自有持久 Mapping/Operation Evidence。           |
| `memorybank-managed` | Vertex AI Memory Bank       | Project、Location、Reasoning Engine 与短期 Google Authorization 配置。               |

Profile 不会把 Credential 写入 DomainPack 或 Memory Spec。Provider 调用保持 Scope 隔离、可审计、
幂等、Revision-aware，并在重放不确定写入之前完成对账。参见
[`Memory Provider Profile`](docs/guides/memory-provider-profiles.md)与
[`外部 Memory Runtime`](docs/guides/memory-external-provider-runtime.md)。

## 配置 Tool、MCP、Skill 与 Prompt

- Tool Definition 与可信 Adapter Binding 位于 `config.yaml`、`configs/tools.yaml` 和应用组合层。
- Local MCP 使用 Command 与 Args；Remote MCP 使用 Endpoint 与 Secret Reference。新发现的
  Capability Revision 必须满足 Trust 与 Approval Policy。
- Skill 可以来自 Built-in、`~/.hypha/skills`、Package Registry 或显式启用的签名 Remote Registry。
  必要 Skill 不可用时，Startup 或 Context Construction 会失败。
- Prompt Template 位于 `apps/server/src/prompts`。DomainPack 引用版本化 Prompt ID，不把部署相关
  Prompt 加载逻辑写入 Core。

Server 内置受治理的 `utility.json`、`utility.text`、`utility.hash`、Filesystem、Search 与真实 Local
stdio MCP 路径。配置和调用契约参见 [`Tool Adapter`](docs/guides/tool-adapters.md)、
[`Tool/MCP 安全`](docs/guides/tool-mcp-security.md)和 [`HTTP API`](docs/api/http.md)。

## Runtime、Execution 与恢复

Express Server 在启动时组合 Canonical Event Authority 与持久执行图。Session-command、ReAct
Continuation、Timer、Recovery 与 Reconciliation Worker 会在 Readiness 前执行初始扫描；关闭时则
在 Provider 仍可用时完成 Worker Drain。

长程任务以有界 Quantum 推进。下一轮从 Event、Checkpoint、Artifact、Capability Snapshot 与
Provider Receipt 重建。Recovery 使用显式的有界 Retry、Reconciliation、Fallback、Degradation、
Compensation、Human Review、Quarantine、Cancellation 与 Failure State；重复进入 Loop 本身不被视为
有效进展。

Execution Provider 必须显式注册。框架提供 Local Process、Docker、Remote Sandbox HTTP、
PostgreSQL Execution Record 与 S3-compatible Artifact Adapter；部署只应激活其明确授信且能够完成
真实验证的 Provider。参见 [`Execution 架构`](docs/architecture/execution.md)与
[`Runtime 模型`](docs/reference/runtime-model.md)。

## Cache 模型

详细架构参见[Cache 管理与类型化 Cache Tree](#cache-管理与类型化-cache-tree)。运行层面：

- **Serving Cache**：复用 Exact、Normalized 的模型响应。通过 `HYPHA_SERVING_CACHE=memory`、
  `sqlite` 或 `redis` 开启。
- **WorkCache**：保存有边界、从 Event 派生的 Projection 与语义 Cache Tree。可设置
  `HYPHA_WORKCACHE=off`、`memory`、`sqlite` 或 `redis`。
- **Thinking Cache**：当当前模型、推理方式、Prompt、Tool Schema 与 Scope Identity 仍然有效时，
  通过面向计算的 WorkCache Projection 复用推理节点、路径与子图。
- **Tool Result Cache**：仅对符合要求的 `none`/`read` 调用启用；读取还必须携带稳定的外部状态证据。
- **Execution、Memory/Context、Prompt Prefix 与 Prefix/KV Cache**：继续接受各自的 Capability、
  Dependency、Revision、Provenance 与 Scope 校验；部署只能启用其能够验证的 Provider。

所有 Cache 都是可丢弃的 View。Cache Miss 或 Cache Provider 故障可以 Bypass；Cache Hit 不能授权
副作用、跳过 Policy 或 Approval、伪造 Receipt、推进 FSM，或取代 Event 与 Artifact 证据。启用或
关闭 Cache 的执行必须保持相同的事实来源语义。

## HTTP API

默认 API Prefix 为 `/api/v1`。受保护的 Route 使用
`Authorization: Bearer <jwt>`。主要接口包括：

- `/chat` 与 `/chat/stream`：Agent 交互；
- `/runtime/runs/:runId` 及其 `/events`、`/replay`、`/audit`、`/regression` 投影；
- `/tools`、`/tool-invocations`、`/tool-approvals` 与 `/mcp`：受治理 Capability；
- `/memory` 与 `/memory-admin`：具备 Scope 的 Memory 操作；
- `/skills`、`/workflows`、`/models`、`/usage`、`/status` 与 `/docs`。

请求与响应契约参见 [`docs/api/http.md`](docs/api/http.md)。

由已挂载 Express Router 自动生成的 OpenAPI 3.1 位于 `/api/v1/openapi.json` 与
`/api/v1/docs/openapi.json`。

## 生产部署

接入生产流量之前：

1. 设置 `NODE_ENV=production`，替换 Owner 与 JWT Secret，并使用专用 `.env` 或 Secret Manager。
2. 配置持久 MongoDB 与 Redis Endpoint、TLS、Authentication、Backup 与 Retention。
3. 配置至少一个健康的模型 Provider 和稳定 Model Alias。
4. 限制 Filesystem Root；非必要时关闭 Process Execution；使用 Container 或 Remote Sandbox 隔离
   不可信代码。
5. 固定并审批 MCP Capability、Skill Artifact、DomainPack Version、Prompt 与 Provider Revision。
6. 持久化 `data/`，或使用经过目标环境验收的 Provider 替换 Local Adapter。
7. 仅在 `/api/v1/ready` 成功后接入流量。
8. 在目标环境执行 Release 与真实 Provider Acceptance Suite，所有必要用例必须 0 skipped。

```bash
npm run lint
npm run typecheck
npm run build
npm test
npm run test:release
```

当必要的真实 Memory 或 Execution Service、Credential 不可用时，`npm run test:release` 会主动失败。

完成构建后，可以使用生产环境启动编译后的 Server：

```bash
npm run build
NODE_ENV=production npm start
```

## Workspace Package

Hypha v1.0.1 已发布 15 个版本对齐的 npm Library；应用应在整个依赖图中固定相同的精确版本。
根 Workspace、内置 Server、CLI 及所有标记为 private 的 Package 仍是源码/部署 Surface。参见
[VitePress Package 文档](https://codesoul-co.github.io/Hypha/zh/packages/)、
[Release 与 npm Package](docs/guides/releases.md)及[升级指南](UPGRADING.md)。

| Package                                                                           | 职责                                                                                   |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@codesoul-co/hypha-core`                                                         | 公共 Spec、Schema、Event、Policy、Runtime、Artifact、Workspace 与 Execution Contract。 |
| `@codesoul-co/hypha-fsm`                                                          | FSM Spec、自定义拓扑分析、Snapshot、Transition、Guard 与 Recovery Semantics。          |
| `@codesoul-co/hypha-kernel`                                                       | 受治理的 ReAct 与 FSM Coordination。                                                   |
| `@codesoul-co/hypha-harness`                                                      | 有界执行、Tracing、Recovery、Continuation 与 Side-effect Hook。                        |
| `@codesoul-co/hypha-domain`                                                       | DomainPack Loading、Validation、Overlay、Registry 与 Compilation。                     |
| `@codesoul-co/hypha-memory`                                                       | Memory Profile、Provider Adapter、Context Assembly、Migration 与 Governance。          |
| `@codesoul-co/hypha-tools`、`@codesoul-co/hypha-mcp`、`@codesoul-co/hypha-skills` | Capability Contract、Registry、Execution、Trust 与 Progressive Loading。               |
| `@codesoul-co/hypha-inference`、`@codesoul-co/hypha-models`                       | Model Alias、Routing、Inference Backend、Prompt Compilation 与 Normalized Response。   |
| `@codesoul-co/hypha-storage`、`@codesoul-co/hypha-adapters-local`                 | Storage Contract 与本地/自托管 Provider Adapter。                                      |
| `@codesoul-co/hypha-serving-cache`                                                | 使用 Memory、SQLite 与 Redis Store 的 Exact Model Response Cache。                     |
| `@codesoul-co/hypha-testing`                                                      | Contract Fixture 与测试支持。                                                          |

## 文档

- [中英双语 VitePress 文档与完整 Package 参考](https://codesoul-co.github.io/Hypha/zh/)
- [官方网站](https://hypha.code-soul.com/)
- [文档索引](docs/README.md)
- [系统架构](docs/reference/architecture.md)
- [Framework API](docs/api/framework.md)
- [HTTP API](docs/api/http.md)
- [DomainPack](docs/guides/domain-packs.md)
- [本地开发](docs/guides/local-development.md)
- [Memory](docs/architecture/memory.md)
- [Tool 与 MCP](docs/architecture/tool-mcp.md)
- [Execution](docs/architecture/execution.md)
- [FSM Recovery](docs/architecture/fsm-recovery.md)
- [品牌与 Logo 政策](BRAND_POLICY.md)

## License 与品牌政策

本仓库的**源代码**使用 [Apache License 2.0](LICENSE) 授权。在遵守该许可证条款的前提下，允许商业
使用、修改、分发与私有使用。

**Hypha 名称、Logo、Wordmark、Icon 及其他指定品牌素材不属于 Apache-2.0 的授权范围**。仅可在如实
引用 Hypha 项目或注明出处时原样复制官方 Hypha Logo。可以按比例缩放或进行无损格式转换，但必须
保持其视觉外观不变。

未经适用权利人事先书面许可，不得对 Hypha Logo 重新着色、裁剪、拉伸、旋转、重绘、制作动画、
添加效果、与其他标记组合或创建衍生版本；也不得以暗示官方发行、背书、认证、赞助或隶属关系的
方式使用 Hypha 品牌。

商业产品可以依据 Apache-2.0 使用本软件，但修改后的 Fork 与第三方产品必须使用自己的主品牌。
完整品牌素材条款参见 [BRAND_POLICY.md](BRAND_POLICY.md)。
