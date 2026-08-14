# 组合完整系统

完整 Hypha 应用有四个显式层次：产品定义、可信组合、受治理执行、Event 派生产品视图。按这个顺序构建，可避免 Provider 选择泄漏到 Framework 契约。

## 1. 固定包版本

一个应用使用同一 Release Line。可运行示例把全部包固定为 `1.0.1`；实际可只安装需要的模块，但不要混用不兼容版本。

```bash
npm install \
  @codesoul-co/hypha-core@1.0.1 \
  @codesoul-co/hypha-storage@1.0.1 \
  @codesoul-co/hypha-fsm@1.0.1 \
  @codesoul-co/hypha-domain@1.0.1 \
  @codesoul-co/hypha-kernel@1.0.1 \
  @codesoul-co/hypha-harness@1.0.1
```

使用到模型、能力和 Adapter 边界时，再加入对应包。

## 2. 创建产品定义

产品文件应与 Server/Provider 配置分离。

```text
agent/
├── domain-pack.yaml   # task/output/workflow/profile/policy
├── prompt.json        # 不可变 Prompt Revision
├── skill.md           # 渐进加载 Skill
└── hypha.user.yaml    # 部署 Overlay，不含 Secret
src/
├── composition.ts     # 可信 Provider/Registry Wiring
├── agent.ts           # Domain 编译与 Agent Patch
└── api.ts             # HTTP/CLI/产品 Surface
```

Domain Pack 定义 Task/Output Schema、应用 Workflow、Capability Allow-list、Memory/Reasoning Profile、Policy 与 Regression/Evaluation 引用，并由 [`hypha-domain`](/zh/packages/domain) 校验。

## 3. 编译 Domain Pack 与 Agent

```ts
import {
  applyDomainAgentPatch,
  compileDomainPackToHarnessedSystem,
  loadDomainPackFile,
} from '@codesoul-co/hypha-domain';

const domainPack = await loadDomainPackFile('./agent/domain-pack.yaml');
const compiled = compileDomainPackToHarnessedSystem(domainPack, {
  agentRef: { id: 'agent.release-research', version: '1.0.0' },
  taskSchemaId: 'task.research',
  workflowId: 'workflow.research',
  memoryProfileId: 'memory.release',
  reasoningProfileId: 'reasoning.release',
  agentSkillRefs: [{ id: 'skill.release-research', version: '1.0.0' }],
  agentToolRefs: ['search'],
});

const agent = applyDomainAgentPatch(
  {
    id: 'agent.release-research',
    version: '1.0.0',
    name: 'Release research agent',
    modelAlias: 'reasoning.primary',
  },
  compiled.agentPatch,
);
```

保持输出职责分离：

```text
DomainPack
 ├─ Agent Patch ─→ Kernel ReAct Agent
 ├─ Bindings ────→ Skill / Tool / MCP / Memory / Profile
 ├─ Harness FSM ─→ 受保护 ReAct 生命周期
 └─ Workflow FSM → 应用自有产品拓扑
```

## 4. 绑定持久化

```ts
import { createLocalStorageBackbone } from '@codesoul-co/hypha-adapters-local';
import { EventFirstRuntime } from '@codesoul-co/hypha-harness';

const local = createLocalStorageBackbone({
  rootPath: './var/hypha',
  sqliteMode: 'sqlite',
});

const runtime = new EventFirstRuntime(local.eventStore);
await runtime.createSession({
  id: 'session-1',
  userId: 'owner',
  domainPackRef: compiled.bindings.domainPackRef,
});

await runtime.createRun({
  id: 'run-1',
  sessionId: 'session-1',
  userId: 'owner',
  domainPackRef: compiled.bindings.domainPackRef,
  workflowRef: compiled.workflowRef,
  agentRef: { id: agent.id, version: agent.version },
  input: { question: 'What changed in this release?' },
});
```

多进程部署要把进程内/本地协调替换为持久 Event、Queue、Lease、Checkpoint 与 Claim Store，同时保持相同 Core/Storage Port 和 Scope。

## 5. 注册智能与能力

可信启动代码按顺序完成：

1. 用 [`hypha-models`](/zh/packages/models) 或 [`hypha-inference`](/zh/packages/inference) 注册 Provider 并解析 `reasoning.primary`。
2. 用 [`hypha-skills`](/zh/packages/skills) 注册 Skill 元数据、应用 Trust Policy，再渐进加载正文。
3. 用 [`hypha-tools`](/zh/packages/tools) 注册 Tool Spec/Handler，并经 Governed Runner 执行。
4. 用 [`hypha-mcp`](/zh/packages/mcp) 发现批准的 Capability，再桥接到 Tool Registry。
5. 用 [`hypha-memory`](/zh/packages/memory) 绑定带 Scope 的 Governed Memory Manager。
6. 可选加入 [`hypha-serving-cache`](/zh/packages/serving-cache) 作为作用域投影缓存。

Domain Pack Allow-list 只收窄可请求范围，Registry、Policy 与 Governed Runner 才决定能否执行。

## 6. 连接受治理执行

```text
HTTP / CLI / Service Command → Per-user Session Queue
→ Run Manager + Lease/Revision → Harness FSM
→ Kernel ReAct Step → Inference 或 Governed Effect Port
→ Receipt + Framework Event → Session/Run/Replay Projection
```

Tool、MCP、Memory Write、File 与 External Write 都必须产生 Receipt 或统一 Failure Event；Cancellation 与 Deadline 贯穿同一路径。

## 7. 暴露产品接口

仓库 Server 已实现 Durable Command API。Client 登录、等待 `/ready`，部署时注册不可变 Prompt/Skill Revision，创建/复用 Session，再使用 Idempotency Key 提交 `start-run`。初始响应只是 Command Acceptance，不是最终结果。

人工调整 FSM 前先读取当前 View，再提交 Process Version、Expected State 和 Run Revision。详见[控制 FSM](/zh/guide/fsm-control)。

## 8. 观察与运维

保存 Command ID、Run ID 与 Event ID。UI/Automation 读取 Session/Run Projection，诊断和 Replay 则回到 Event Stream。Telemetry 前先脱敏 Secret 并限制模型/Tool 输出。

## 发布门禁

部署前必须证明：

- Domain Pack 可加载且编译确定；
- 包版本与 Dependency Hash 一致；
- Cache On/Off 行为；
- Replay/Regression Fixture；
- 非法/过期 FSM 迁移被拒绝；
- Tool/MCP/Memory Denial、Timeout、Cancellation；
- User/Session/Run 隔离与并发 Queue；
- Restart/Recovery 与终态收敛；
- 真实 Persistence/Transport Runtime Smoke，Acceptance 0 skipped。

[Release Agent 示例](/zh/guide/examples)提供具体文件、全包 Tour、确定性 Contract Test 和 HTTP/FSM Client。
