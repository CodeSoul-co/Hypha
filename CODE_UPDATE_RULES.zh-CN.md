# Hypha 代码更新规则（Team Code Update Rules）

> 适用范围：Hypha 仓库内所有代码、配置、示例、文档、测试、脚本与工程结构更新。  
> 目标：保证团队成员在快速迭代时，始终遵守 Hypha 的 harness-oriented 架构方向，避免把 demo 逻辑、业务逻辑、展示媒介或 provider 细节耦合进框架核心。
---
## 0. 强制原则

本规则使用以下约束词：

- **MUST**：必须遵守，PR 不满足时不得合并。
- **SHOULD**：默认应遵守，偏离时必须在 PR 中解释原因。
- **MAY**：允许，但必须不破坏核心边界。

Hypha 的代码更新必须遵守以下总原则：

1. **Spec first**：新增能力必须先定义稳定 spec / interface，再实现 provider / adapter / runtime。
2. **Harness first**：任何 agent 行为都必须可追踪、可治理、可评估、可回放。
3. **Local first, interface reserved**：早期优先支持本地 SQLite、本地向量索引和文件系统，但接口必须预留 Postgres、pgvector、Milvus、Chroma、Qdrant、Redis、Plasmod、S3 等扩展空间。
4. **OpenAI first, provider neutral**：OpenAI 是第一核心 provider；DeepSeek 通过 OpenAI-compatible provider 接入；core 不允许硬编码具体 provider 的 SDK、模型名或响应结构。
5. **ReAct + FSM only**：agent 执行必须基于 ReAct；软件工程运行语义必须通过 FSM 表达。禁止隐藏式 while-loop agent。
6. **Workflow belongs to DomainPack**：workflow 是 DomainPack 调用和设计的 spec，并通过 compiler 转成 FSMProcessSpec。
7. **Skill belongs to Agent**：skill 是配置到 agent 上的可复用过程能力。DomainPack 可以限制、默认启用或引用 skill，但不应把 skill 当成 workflow 的替代品。
8. **Apps are surfaces**：CLI、Web、Server、Demo UI 都是展示或调用媒介，不能混入 framework core。
9. **No direct side effects**：工具调用、MCP 调用、memory write、外部系统写入、文件写入都必须经过 policy、trace 和 harness hook。
10. **Every change is testable**：新增能力必须有对应测试；新增 spec 必须有 schema / type 测试；新增 provider 必须有 mock / contract test。

---

## 1. 仓库边界规则

### 1.1 推荐目录结构

Hypha 仓库应采用 monorepo-style 分层：

```text
packages/
  core/          # 公共类型、spec、错误、事件、工具函数
  kernel/        # ReAct planner / executor / router
  fsm/           # FSM runtime、state、transition、guard
  harness/       # run、trace、policy、eval、replay、regression
  models/        # ModelProvider abstraction + OpenAI / DeepSeek adapters
  memory/        # SQLite、local vector、artifact、hybrid memory providers
  tools/         # ToolSpec、ToolRegistry、ToolRunner、tool governance
  mcp/           # MCPGateway、MCP capability normalization
  skills/        # SkillSpec、SkillRegistry、SkillResolver
  domain/        # DomainPackSpec、WorkflowSpec、WorkflowCompiler
  testing/       # testing utilities、fixtures、golden traces

apps/
  cli/           # CLI 展示媒介
  web/           # Web UI 展示媒介
  server/        # HTTP / API server 展示媒介

examples/
  local-basic/
  simple-research-task/
  simple-document-qa/

docs/
  rfc/
  adr/
  architecture/
  guides/
```

### 1.2 禁止事项

以下行为默认禁止：

```text
在 packages/core 中引入 OpenAI、DeepSeek、SQLite、MCP、Express、React、Next.js 等具体实现依赖。
在 packages/kernel 中直接访问数据库、文件系统、HTTP API 或 MCP server。
在 packages/domain 中写死法律、教育、数据分析等具体业务逻辑。
在 apps/cli 或 apps/web 中定义 framework core type。
把 demo prompt、demo tool、demo workflow 放进 core。
绕过 ToolRunner / PolicyEngine 直接执行 tool。
绕过 MemoryProvider 直接写 SQLite 或 vector index。
绕过 TraceRecorder 直接 console.log 作为运行记录。
```

### 1.3 允许的依赖方向

依赖方向必须单向：

```text
apps/*
  -> packages/*

examples/*
  -> packages/*

packages/domain
  -> packages/core
  -> packages/fsm
  -> packages/skills
  -> packages/tools
  -> packages/memory

packages/kernel
  -> packages/core
  -> packages/tools interfaces
  -> packages/memory interfaces
  -> packages/models interfaces

packages/harness
  -> packages/core
  -> packages/fsm
  -> packages/tools interfaces
  -> packages/memory interfaces

packages/models / memory / mcp
  -> packages/core
```

禁止反向依赖：

```text
packages/core -> apps/*
packages/kernel -> apps/*
packages/kernel -> concrete providers
packages/domain -> apps/*
```

---

## 2. Spec-first 开发规则

任何新能力必须先回答：

```text
它属于哪个 spec？
它是否需要 runtime？
它是否需要 policy？
它是否产生 trace event？
它是否影响 replay？
它是否需要 evaluation？
它是否会引入 provider lock-in？
```

### 2.1 新增能力必须先定义 spec

例如：

```text
新增 memory 后端之前，先定义 / 扩展 MemoryProvider interface。
新增模型之前，先定义 / 扩展 ModelProvider interface。
新增 MCP server 接入之前，先定义 MCPConnectorSpec。
新增 domain workflow 之前，先定义 WorkflowSpec。
新增 skill 之前，先定义 SkillSpec。
```

### 2.2 Spec 必须具备版本字段

所有跨模块、跨运行、跨持久化的 spec 都必须包含：

```ts
interface VersionedSpec {
  id: string;
  version: string;
}
```

推荐补充：

```ts
interface SpecMetadata {
  name?: string;
  description?: string;
  owner?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}
```

### 2.3 Spec 不能依赖具体 provider 类型

错误示例：

```ts
interface MemorySpec {
  sqlitePath: string;
  chromaCollection: string;
}
```

正确示例：

```ts
interface MemorySpec {
  structuredStore?: StructuredStoreConfig;
  vectorIndex?: VectorIndexConfig;
  artifactStore?: ArtifactStoreConfig;
  writePolicy?: MemoryWritePolicy;
  retrievalPolicy?: MemoryRetrievalPolicy;
}
```

具体 SQLite、local vector、Chroma、Milvus 配置应放在 provider config，不应污染抽象 spec。

---

## 3. ReAct + FSM 规则

### 3.1 所有 agent 必须基于 ReAct

Hypha 中 agent 的基本行为必须使用 ReAct 结构表达：

```text
Reason
  -> Act
  -> Observe
  -> Verify
  -> Update state / memory
  -> Reason | Complete | Fail | HumanReview
```

禁止新增以下形式：

```text
hidden prompt chain
untyped autonomous loop
unbounded recursive agent call
agent directly calls provider SDK and tools
```

### 3.2 FSM 是运行语义，不是可选装饰

所有长期任务、workflow、tool execution、human review、failure recovery 必须能映射到 FSM 状态：

```text
Idle
RunInitialized
ContextBuilt
Reasoning
ActionSelected
PolicyChecked
Acting
ObservationRecorded
Verifying
MemorySync
HumanReview
Completed
Failed
Cancelled
```

新增状态必须定义：

```text
state id
allowed transitions
entry action
exit action
guards
retry policy
timeout policy
trace events
failure semantics
```

### 3.3 禁止隐藏状态

任何运行时状态不得只存在于 prompt 或 model context 中。必须写入：

```text
RunState
FSMState
TraceEvent
MemoryRecord
Artifact
```

---

## 4. Workflow / DomainPack 规则

### 4.1 Workflow 是 DomainPack 调用的 spec

Workflow 不直接配置到 agent 上。正确关系是：

```text
DomainPack.workflow
  -> WorkflowSpec
  -> WorkflowCompiler
  -> FSMProcessSpec
  -> FSMRuntime
  -> ReActAgent 在每个 state 内执行 Reason + Act
```

### 4.2 DomainPack 不应过早绑定具体领域实现

早期只允许做 minimal domain example，用来验证抽象：

```text
simple-research-task
simple-document-qa
simple-code-review
```

不要在 core 阶段实现大而全的：

```text
完整 legal domain
完整 education domain
完整 data analysis domain
完整 enterprise QA domain
```

这些应作为后续 domain package / examples，而不是 core。

### 4.3 DomainPack 应只描述领域约束和绑定

一个 DomainPack 可以包括：

```text
TaskSchemaSpec
WorkflowSpec
OutputContractSpec
PolicyBinding
MemoryProfile
SkillBinding
ToolProfile
MCPProfile
EvaluationProfile
RegressionCases
```

DomainPack 不应直接执行 tool，不应直接写 memory，不应直接调用 model。

### 4.4 WorkflowSpec 必须可编译、可测试、可回放

WorkflowSpec 必须满足：

```text
每个 workflow state 可以编译成 FSM state。
每个 transition 有 guard 或默认规则。
每个 state 的 input / output contract 可测试。
每次 state transition 必须写 trace event。
workflow 执行失败后可以 replay。
```

---

## 5. Skill 规则

### 5.1 Skill 配置到 Agent 上

正确关系是：

```text
ReActAgentSpec.skills = [SkillRef]
```

DomainPack 可以做：

```text
allowedSkills
defaultSkills
requiredSkills per workflow state
skill policy override
```

但 DomainPack 不应把 workflow 写成 skill，也不应把 skill 当成 workflow engine。

### 5.2 Skill 是可复用过程能力包

Skill 不是普通 prompt fragment。Skill 必须具备：

```text
id
version
description
activation policy
instructions
allowed tools
required resources
memory access policy
context budget
input schema
output contract
eval cases
trace behavior
```

### 5.3 Skill 必须支持 progressive disclosure

Skill 的完整说明、references、scripts、assets 不应默认全部塞进 model context。

必须通过 SkillResolver / ContextBuilder 决定：

```text
什么时候激活 skill
加载哪些 skill frontmatter
加载哪些 instruction
加载哪些 reference
是否允许执行 skill scripts
```

### 5.4 Skill 内部动作仍必须经过 harness

Skill 不能直接绕过：

```text
ToolRunner
PolicyEngine
TraceRecorder
MemoryProvider
HumanReviewManager
```

即使 skill 内部有 script，也必须经过 policy 和 sandbox 策略。

---

## 6. MCP 规则

### 6.1 MCP 是 connector layer，不是核心 runtime

MCP 接入必须走：

```text
MCP server
  -> MCPGateway
  -> capability discovery
  -> descriptor validation
  -> normalize to ToolSpec / ResourceSpec / PromptTemplateSpec
  -> PolicyEngine
  -> TraceRecorder
  -> ToolRunner / ContextBuilder
```

禁止：

```text
Agent 直接调用 MCP client。
MCP tool 直接暴露给 model，不经过 ToolSpec normalize。
MCP resource 直接进入 context，不经过 ContextPolicy。
MCP prompt 直接拼进 system prompt，不经过 PromptTemplateSpec / SkillSpec 审核。
```

### 6.2 MCP capability 必须被治理

每个 MCP capability 必须记录：

```text
server id
server version / capability hash
capability type: tool | resource | prompt | workflow candidate
normalized spec id
permission scope
side effect level
input schema
output schema
trust level
```

### 6.3 MCP 调用必须可 trace、可 replay

每次 MCP 调用必须产生 trace event：

```text
MCPServerConnected
MCPCapabilityDiscovered
MCPCapabilityNormalized
MCPToolCallRequested
MCPToolCallPolicyChecked
MCPToolCallExecuted
MCPResourceRead
MCPError
```

Replay 时必须支持：

```text
mock previous response
re-run with same MCP server
fail if server version / capability hash changed
```

---

## 7. Memory / State 规则

### 7.1 早期实现必须 local-first

当前优先支持：

```text
SQLiteStructuredStore
LocalVectorIndexProvider
FileArtifactStore
HybridMemoryProvider
```

设计含义：

```text
SQLite = structured source of truth
LocalVector = semantic recall index
FileArtifact = large outputs / snapshots / documents
HybridMemory = structured metadata + vector recall + artifact pointer
```

### 7.2 接口必须预留外部存储

接口必须允许后续支持：

```text
Postgres
pgvector
Milvus
Chroma
Qdrant
Redis
MongoDB
Plasmod
S3 / object storage
```

禁止把 SQLite path、local vector implementation、embedding model name 写进业务 spec。

### 7.3 MemoryProvider 必须分层

推荐接口拆分：

```text
StructuredStoreProvider
VectorIndexProvider
ArtifactStoreProvider
EmbeddingProvider
MemoryProvider
```

其中 `MemoryProvider` 负责统一 agentic memory 语义：

```text
read
search
write
update
invalidate
summarize
audit
```

### 7.4 Memory write 必须经过治理

所有 memory write 必须具备：

```text
scope
source
confidence
provenance
TTL / expiry
visibility
redaction policy
write policy
trace event
```

禁止：

```text
agent 直接把任意模型输出写进 long-term memory。
retrieved content 无 provenance 进入 memory。
memory write 不产生 trace。
```

### 7.5 Memory 不等于 context

Memory 是持久化存储；Context 是本次 model call 的输入视图。

所有 context 必须通过 ContextBuilder 构建：

```text
memory retrieval
artifact loading
skill instruction loading
domain policy injection
token budget control
provenance tagging
instruction / data boundary tagging
```

---

## 8. Model Provider 规则

### 8.1 OpenAI first

第一核心 provider 是：

```text
OpenAIProvider
```

它应该作为 ModelProvider interface 的主要参考实现。

### 8.2 DeepSeek 通过 OpenAI-compatible provider 接入

DeepSeek 不应作为独立破坏抽象的特殊 provider。推荐：

```text
OpenAICompatibleProvider
  -> DeepSeekProvider config profile
```

Provider 配置应通过：

```text
baseURL
apiKeyEnv
modelAlias
capabilities
timeout
retry
```

### 8.3 Core 禁止硬编码模型名

禁止：

```ts
const model = "gpt-4.1";
const model = "deepseek-chat";
```

应使用：

```ts
model: "default-reasoning"
model: "default-fast"
model: "default-embedding"
```

并在 config 中绑定真实模型：

```ts
modelAliases: {
  "default-reasoning": "openai:gpt-...",
  "default-fast": "deepseek:..."
}
```

### 8.4 Provider response 必须 normalize

Agent Kernel 不能感知不同 provider 的原始响应结构。

必须统一成：

```ts
ModelResponse = {
  id: string;
  content: ModelContent[];
  toolCalls?: NormalizedToolCall[];
  usage?: ModelUsage;
  raw?: unknown;
}
```

`raw` 只能用于 debug / trace，不得被 kernel 依赖。

---

## 9. Tool 规则

### 9.1 Tool 不是普通函数

每个 Tool 必须是被治理的 capability：

```text
ToolSpec = {
  id,
  version,
  description,
  inputSchema,
  outputSchema,
  sideEffectLevel,
  permissionScope,
  preconditions,
  postconditions,
  timeoutPolicy,
  retryPolicy,
  auditPolicy,
  humanApprovalPolicy
}
```

### 9.2 Tool 调用必须经过统一管道

正确调用链：

```text
Agent selects action
  -> ToolManager resolves ToolSpec
  -> PolicyEngine checks permission
  -> HumanReview if required
  -> ToolRunner executes
  -> TraceRecorder records input / output / error
  -> Observation returned to agent
```

禁止任何 agent / skill / workflow 直接调用 tool handler。

### 9.3 Tool side effect 必须声明

必须使用统一 side effect level：

```text
none
read
write
external_effect
irreversible
```

`external_effect` 和 `irreversible` 默认需要 policy 或 human review。

---

## 10. Trace / Replay / Regression 规则

### 10.1 Every action is an event

以下操作必须写 trace event：

```text
run start / end
FSM state enter / exit
model call start / end
tool call request / execution / result
MCP capability discovery / invocation
policy decision
human review request / result
memory read / write / invalidation
skill activation / completion
context build
workflow transition
evaluation result
replay start / result
regression result
```

### 10.2 Trace 必须是结构化数据

禁止只写：

```ts
console.log("agent called tool")
```

必须写：

```ts
trace.record({
  type: "ToolCallExecuted",
  runId,
  stepId,
  toolId,
  toolVersion,
  inputHash,
  outputHash,
  latencyMs,
  status,
});
```

### 10.3 Replay 不是日志回放

Replay 必须至少保存：

```text
model provider / model alias
prompt / context hash
tool spec version
tool inputs / outputs
MCP server capability hash
memory snapshot or read set
FSM state path
policy decisions
human review decisions
eval results
artifact references
```

### 10.4 Regression 必须绑定 golden cases

新增核心能力时，必须至少有一种 regression fixture：

```text
golden trace
golden output
golden state path
golden tool-call sequence
golden policy decision
```

---

## 11. Evaluation 规则

### 11.1 Eval 必须分层

不要只做 final answer judge。至少区分：

```text
SchemaEval
OutputContractEval
ToolTraceEval
PolicyEval
ProcessEval
CostEval
LatencyEval
RegressionEval
HumanEval
```

### 11.2 LLM-as-judge 不能替代 deterministic eval

优先级：

```text
schema validation
business rule validation
tool trace validation
unit / integration tests
LLM judge
human review
```

LLM judge 只用于主观质量、完整性、语义合理性，不应用于替代权限、安全、schema、业务硬规则。

---

## 12. CLI / Web / Server 规则

### 12.1 CLI、Web、Server 是展示媒介

它们只能调用 packages 暴露的 API，不能定义核心逻辑。

```text
apps/cli    -> run local harness, inspect traces, replay runs
apps/web    -> visualize runs, traces, evals, domain packs
apps/server -> expose API endpoints for external usage
```

### 12.2 Apps 不得反向污染 core

禁止：

```text
为了 CLI 方便，修改 core event shape。
为了 Web UI 方便，把 UI state 写进 harness core。
为了 server endpoint 方便，把 HTTP request 类型传进 kernel。
```

正确做法：

```text
apps 层做 adapter / mapper。
packages 层保持纯业务抽象和 runtime 抽象。
```

---

## 13. TypeScript 代码风格规则

### 13.1 必须使用 strict TypeScript

所有 packages 必须开启：

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

### 13.2 禁止滥用 any

禁止：

```ts
function run(input: any): any {}
```

允许在 provider raw response 中使用：

```ts
raw?: unknown;
```

如果必须使用 `any`，PR 必须说明原因，并添加 TODO issue。

### 13.3 Public API 必须显式类型

导出的函数、class、interface 必须显式类型：

```ts
export interface ModelProvider {}
export async function runAgent(input: RunInput): Promise<RunResult> {}
```

### 13.4 Error 必须结构化

禁止只 throw string：

```ts
throw "failed";
```

应使用：

```ts
throw new HyphaError({
  code: "TOOL_POLICY_DENIED",
  message: "Tool call denied by policy",
  context: { toolId, runId },
});
```

### 13.5 Runtime validation 必须在边界层发生

外部输入必须通过 schema validation：

```text
config loading
DomainPack loading
Skill loading
MCP descriptor normalization
Tool input validation
Model provider response normalization
```

---

## 14. Testing 规则

### 14.1 每类模块必须有对应测试

```text
core spec           -> type / schema tests
fsm runtime         -> state transition tests
kernel              -> ReAct loop tests with mock model/tool
models              -> provider normalization contract tests
memory              -> local SQLite/vector integration tests
mcp                 -> mock MCP gateway tests
skills              -> skill resolution / context injection tests
domain              -> workflow compile tests
harness             -> trace / replay / policy tests
apps                -> smoke tests only
```

### 14.2 新 provider 必须有 contract test

任何 provider 必须证明：

```text
符合 interface
错误能 normalize
timeout / retry 可控
usage / cost 可记录
trace event 可生成
```

### 14.3 新 workflow 必须有 state path test

每个 WorkflowSpec 必须测试：

```text
正常路径
失败路径
retry 路径
human review 路径
cancel 路径
```

### 14.4 新 memory 行为必须有 consistency test

HybridMemoryProvider 必须测试：

```text
structured record exists
vector index updated
artifact reference valid
invalidation 同步
search result provenance exists
```

---

## 15. PR 更新规则

### 15.1 PR 必须说明改动类型

每个 PR 标题建议使用：

```text
feat(core): add VersionedSpec
feat(memory): add SQLiteStructuredStore
feat(models): add OpenAIProvider
feat(domain): add WorkflowCompiler MVP
fix(fsm): handle guarded transition failure
docs(rules): update team code rules
refactor(kernel): split planner and executor
```

### 15.2 PR 描述必须包含 checklist

每个 PR 必须包含：

```md
## What changed

## Why

## Architecture impact
- [ ] core spec changed
- [ ] provider changed
- [ ] runtime behavior changed
- [ ] trace / replay affected
- [ ] policy affected
- [ ] domain / workflow affected
- [ ] skill affected
- [ ] MCP affected
- [ ] app surface affected

## Tests
- [ ] unit tests
- [ ] integration tests
- [ ] contract tests
- [ ] regression / golden tests
- [ ] manually tested

## Compatibility
- [ ] no provider lock-in
- [ ] no hardcoded model names
- [ ] no direct DB / vector dependency in core
- [ ] no CLI / Web logic in packages core
- [ ] migration documented if needed
```

### 15.3 Definition of Done

PR 合并前必须满足：

```text
npm run typecheck passes
npm test passes
npm run build passes
public API typed
new spec documented
new provider tested with mock / contract
trace behavior documented if runtime behavior changed
replay impact explained if trace changed
policy impact explained if tool / MCP / memory write changed
no secrets committed
no demo logic in core
```

---

## 16. RFC / ADR 规则

### 16.1 什么时候必须写 RFC

以下改动必须先写 RFC：

```text
新增或修改核心 spec
新增 packages/* 模块
改变 FSM runtime semantics
改变 TraceEvent schema
改变 Replay semantics
新增 ModelProvider 类型
新增 MemoryProvider 类型
新增 DomainPack / Workflow compiler 语义
新增 MCPGateway 架构能力
新增 Skill activation / loading 语义
引入新的外部基础设施依赖
```

RFC 路径：

```text
docs/rfc/YYYY-MM-DD-title.md
```

### 16.2 什么时候必须写 ADR

以下决策必须写 ADR：

```text
选择某个默认本地向量实现
选择 SQLite library
选择 package manager / monorepo 工具
选择 trace event 存储格式
选择 replay snapshot 格式
选择 CLI / web app framework
```

ADR 路径：

```text
docs/adr/ADR-0001-title.md
```

---

## 17. Security / Secret 规则

### 17.1 禁止提交 secrets

禁止提交：

```text
API key
.env
provider token
private certificate
user data
production trace containing PII
```

必须使用：

```text
.env.example
runtime config
secret manager adapter
```

### 17.2 高风险动作默认需要 policy

以下动作默认高风险：

```text
external write
email / message send
payment / purchase
delete / overwrite file
database write / schema migration
network call to untrusted endpoint
memory write to long-term scope
MCP tool with write / external_effect / irreversible side effect
```

高风险动作必须支持：

```text
policy deny
human approval
sandbox
audit trace
replay record
```

---

## 18. Documentation 规则

### 18.1 新能力必须有文档

新增 public capability 必须更新至少一个：

```text
README.md / README.zh-CN.md
docs/architecture/*
docs/guides/*
DEVELOPMENT_BACKBONE.zh-CN.md
CODE_UPDATE_RULES.zh-CN.md
examples/*/README.md
```

### 18.2 文档必须同步术语

必须统一使用：

```text
ReActAgentSpec
FSMProcessSpec
WorkflowSpec
DomainPackSpec
SkillSpec
MCPIntegrationSpec
ToolSpec
MemorySpec
ContextSpec
PolicySpec
TraceSpec
ReplaySpec
EvaluationSpec
RegressionSpec
```

禁止同一个概念混用多个名字。

---

## 19. 禁止的快捷实现

为了避免早期技术债，以下快捷实现禁止进入 main：

```text
把 prompt 当成 policy。
把 console.log 当成 trace。
把 test script 当成 regression。
把 vector DB 当成 memory 全部语义。
把 MCP server 直接暴露给 agent。
把 skill 当成 workflow engine。
把 workflow 写死在 agent prompt 中。
把 domain 逻辑写进 kernel。
把 provider SDK response 泄漏到 kernel。
把 CLI / Web 状态写进 core。
把 model name 写死在代码中。
把 long-term memory write 做成无审核 append。
```

---
# 20. 最终判断标准

每一次代码更新都必须能回答：

```text
这个改动是否保持 Hypha 的 harness-oriented 定位？
它是否仍然 local-first 但 provider-neutral？
它是否遵守 ReAct + FSM？
它是否正确处理 workflow 属于 DomainPack、skill 属于 Agent？
它是否经过 policy、trace、replay、eval 的基本路径？
它是否保持 apps 与 packages 的边界？
它是否让未来团队协作更容易，而不是更混乱？
```

如果答案是否定的，这个改动不应合并。
 