# `@codesoul-co/hypha-tools`

`hypha-tools` 分离类型化 Tool 契约与实现，并用 Authorization、Validation、Timeout、Cancellation、Idempotency、Cache、Approval、Receipt 与 Trace 包裹执行。

```bash
npm install @codesoul-co/hypha-tools@1.0.1
```

## 主要入口

| 导出 | 用途 |
| --- | --- |
| `ToolSpec` / `toolSpecDefinition` | 输入输出与治理契约 |
| `ToolRegistry` | 注册 Spec 和本地 Handler |
| `ToolRunner` / `GovernedToolRunner` | 受治理执行路径 |
| `ToolAuthorizer` | Principal 授权 |
| `ToolInvocationStore` | Invocation 状态与 Receipt |
| `ToolAdapterFactoryRegistry` | 构造 HTTP、MCP、Plugin、本地 Adapter |
| `ExecutionToolAdapter` | 通过 Execution 契约执行命令/Sandbox |

## 注册 Tool

```ts
import { ToolRegistry, toolSpecDefinition } from '@codesoul-co/hypha-tools';

const spec = toolSpecDefinition.parse({
  ...toolSpecDefinition.example,
  id: 'tool.lookup',
  version: '1.0.0',
  name: 'lookup',
  sideEffectLevel: 'read',
});

const tools = new ToolRegistry();
tools.register(spec, async (input) => ({
  input,
  source: 'local-index',
}));
```

Registry 示例适合确定性本地使用；生产必须经过 Governed Runner。

## 受治理路径

```text
解析 Tool → 校验 Principal/Scope/Input → Policy/人工审核
→ Idempotency/Cache → 带 Deadline/Cancellation 的 Adapter
→ 校验并限制 Output → Receipt/Artifact/Event/Trace
```

`sideEffectLevel` 只是 Policy 输入，不等于授权。文件、命令、网络和外部写入需要显式 Scope 与 Adapter 限制，Host Path 与 Secret 不可直接来自模型输入。

如果 Dispatch 后崩溃，应根据持久 Invocation/Receipt 协调结果，不能盲目重试。测试 Schema、拒绝、Approval、Timeout、Cancellation、Output Limit、重复 Idempotency Key 与 Receipt Reconciliation。

