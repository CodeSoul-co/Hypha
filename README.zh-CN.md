<p align="center">
  <img src="docs/hypha_logo.png" alt="hypha logo" width="180" />
</p>

<h1 align="center">hypha</h1>

<p align="center">
  <strong>面向生产环境、具备治理能力、持久执行能力和可扩展性的 TypeScript AI Agent 框架。</strong>
</p>

<p align="center">
  <a href="README.md">English</a> | 中文
</p>

## hypha 是什么？

hypha 是一个用于开发 Agent 产品的 TypeScript 源码工作区。它不把 Agent 简化为一次模型调用，
而是将 ReAct 推理循环、显式有限状态机（FSM）、持久事件、受策略控制的副作用、回放、恢复、评估
和 provider-neutral 扩展契约组合为统一框架。

框架严格分离产品领域声明与运行时内核。产品通过 `DomainPack` 定义任务和工作流；hypha 将其编译为
FSM Process 与版本化依赖快照。API、CLI、Worker 或其他应用界面可以复用同一套 Runtime，而无需把
产品规则写入 Framework Core。

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
  -> FSM Process
  -> 有界 ReAct Quantum
  -> 受治理的 Tool / MCP / Memory / Execution Activity
  -> Event + Receipt + Artifact 证据
  -> Projection、Continuation、Recovery、Replay 与 Evaluation
```

任何 Cache Hit 或 Provider Response 都不能授权副作用、推进 FSM，也不能替代 Event 与 Artifact
证据。Tool、MCP、Memory、文件、Execution 和外部写入必须经过 Policy、Trace、Cancellation、
Deadline、Idempotency 与 Harness 边界。

## 内置能力

| 模块            | Runtime 能力                                                                                                                                                                                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime         | ReAct + FSM、持久 Session Command、有界 Continuation、Timer、Lease、Fencing、Cancellation、Recovery Worker、人工复核、Replay、Audit 与 Regression Projection。                               |
| Domain          | YAML/JSON/TypeScript DomainPack、运行时校验、Overlay、Registry、确定性编译器、依赖快照与 Agent Patch。                                                                                       |
| Memory          | 统一治理契约下的 Hypha Native Memory、Native Lite、Mem0 OSS、Mem0 Platform 与 Vertex AI Memory Bank Adapter。                                                                                |
| Tool 与 MCP     | Local、HTTP、Plugin、Mock、MCP Adapter 共用一条受治理 Invocation 路径，并支持 Capability Snapshot 与 Drift Control。                                                                         |
| Skill 与 Prompt | Built-in、Filesystem、Package、签名 Remote Skill Registry、渐进加载、版本化 Prompt 引用与模板。                                                                                              |
| Execution       | Provider-neutral Workspace、Sandbox、Command、Artifact、Store、Lease、Recovery 与 Cache 契约，以及 Local Process、Docker、Remote HTTP、SQLite、PostgreSQL、本地文件、S3-compatible Adapter。 |
| Cache           | Exact LLM Serving Cache，以及有边界、有作用域、可失效的 Event-derived WorkCache。                                                                                                            |
| 应用界面        | 使用同一 Framework Runtime 的 Express API Server 与示例 CLI。                                                                                                                                |

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
选择应放在 DomainPack 或产品应用中，而不是写入 `@hypha/core`、`@hypha/kernel` 或通用 Runtime。

### 1. 声明 Domain

可以从 [`configs/domain-packs/minimal.domain.yaml`](configs/domain-packs/minimal.domain.yaml)
开始。生产级 DomainPack 通常包含：

| 声明                                     | 控制内容                                                                                |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `taskSchemas`                            | 可接受的任务类型、输入 Schema、输出契约引用与默认 Workflow。                            |
| `outputContracts`                        | 可由程序验证的最终输出 Schema。                                                         |
| `sessionProfiles`                        | 默认 Metadata，以及 Memory、Context、Reasoning、Tool、MCP、Skill、Policy Profile 引用。 |
| `workflows`                              | FSM State、Transition、Guard、Retry/Timeout、人工复核与 State-scoped Capability。       |
| `tools`, `toolProfiles`                  | 稳定 Tool Contract，以及允许绑定到可执行 Adapter 的 Profile。                           |
| `mcpProfiles`                            | Server 引用、Capability Import Rule、Trust Policy 与版本固定策略。                      |
| `memoryProfiles`, `contextProfiles`      | Memory 选择、读写策略、Context Source、Provenance 与 Token Budget。                     |
| `allowedSkills`, `skillPolicies`         | Agent 可加载的 Skill，以及每个 Skill 可使用的 Tool 与 Policy。                          |
| `allowedPromptRefs`, `defaultPromptRefs` | 必须由应用组合层解析的版本化 Prompt Template。                                          |
| `policies`, `businessRules`              | Permission、Approval、Precondition、Postcondition 与输出约束。                          |
| `evaluationProfiles`, `regressionCases`  | Event-derived 验收与回归定义。                                                          |

Provider URL、Bearer Token、API Key 与部署 Secret 不应写入 DomainPack。DomainPack 只选择稳定的
Profile 引用，由可信应用组合层将其解析为真实 Provider。

### 2. 加载、校验与编译

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  DomainPackRegistry,
  LocalDomainPackLoader,
} from '@hypha/domain';

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
| `fsmProcess`             | 注册 Runtime 实际执行的精确 `FSMProcessSpec`。                                                 |
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
8. 通过 Canonical Runtime 执行 `fsmProcess`，仅从 Event 与持久 Checkpoint 派生状态。

显式激活可以防止未经审核的 YAML、Skill、Tool 或 Remote MCP Catalog 变化静默获得运行权限。

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
import { extendDomainPack } from '@hypha/domain';

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

- **Serving Cache**：复用 Exact、Normalized 的模型响应。通过 `HYPHA_SERVING_CACHE=memory`、
  `sqlite` 或 `redis` 开启。
- **WorkCache**：保存从 Event 派生的有界投影。可设置 `HYPHA_WORKCACHE=off`、`memory`、`sqlite`
  或 `redis`。
- **Tool Result Cache**：仅对符合要求的 `none`/`read` 调用启用；读取还必须携带稳定的外部状态证据。

所有 Cache 都是可丢弃的 View。Cache Miss 或故障可以 Bypass；Cache Hit 不能授权副作用、跳过
Policy、伪造 Receipt 或推进 FSM。

## HTTP API

默认 API Prefix 为 `/api/v1`。受保护的 Route 使用
`Authorization: Bearer <jwt>`。主要接口包括：

- `/chat` 与 `/chat/stream`：Agent 交互；
- `/runtime/runs/:runId` 及其 `/events`、`/replay`、`/audit`、`/regression` 投影；
- `/tools`、`/tool-invocations`、`/tool-approvals` 与 `/mcp`：受治理 Capability；
- `/memory` 与 `/memory-admin`：具备 Scope 的 Memory 操作；
- `/skills`、`/workflows`、`/models`、`/usage`、`/status` 与 `/docs`。

请求与响应契约参见 [`docs/api/http.md`](docs/api/http.md)。

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

| Package                                       | 职责                                                                                   |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `@hypha/core`                                 | 公共 Spec、Schema、Event、Policy、Runtime、Artifact、Workspace 与 Execution Contract。 |
| `@hypha/fsm`                                  | FSM Spec、Snapshot、Transition、Guard 与 Recovery Semantics。                          |
| `@hypha/kernel`                               | 受治理的 ReAct 与 FSM Coordination。                                                   |
| `@hypha/harness`                              | 有界执行、Tracing、Recovery、Continuation 与 Side-effect Hook。                        |
| `@hypha/domain`                               | DomainPack Loading、Validation、Overlay、Registry 与 Compilation。                     |
| `@hypha/memory`                               | Memory Profile、Provider Adapter、Context Assembly、Migration 与 Governance。          |
| `@hypha/tools`、`@hypha/mcp`、`@hypha/skills` | Capability Contract、Registry、Execution、Trust 与 Progressive Loading。               |
| `@hypha/inference`、`@hypha/models`           | Model Alias、Routing、Inference Backend、Prompt Compilation 与 Normalized Response。   |
| `@hypha/storage`、`@hypha/adapters-local`     | Storage Contract 与本地/自托管 Provider Adapter。                                      |
| `@hypha/serving-cache`、`@hypha/workcache`    | Exact Model Response Cache 与 Event-derived Runtime Cache。                            |
| `@hypha/testing`                              | Contract Fixture 与测试支持。                                                          |

## 文档

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

## License

MIT
