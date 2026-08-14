# 智能：Models 与 Inference

模型模块用于标准化 Provider 行为。应用与 Kernel 应使用 Alias 或 Backend ID，而不是依赖具体 Provider SDK 类型。

## [`hypha-models`](./models)

在稳定接口后注册实现，并独立校验路由。

```ts
import {
  MockModelProvider, ModelRegistry, modelRoutingSpecDefinition,
} from '@codesoul-co/hypha-models';

const models = new ModelRegistry();
models.register(new MockModelProvider('deterministic-test'));
const routing = modelRoutingSpecDefinition.parse(
  modelRoutingSpecDefinition.example,
);
const provider = models.get('deterministic-test');
if (!provider) throw new Error('Model provider is not registered');
```

确定性契约测试使用 `MockModelProvider`。Concrete Provider 只在可信 Server 组合层注册，并通过 `reasoning.primary` 之类的版本化 Alias 寻址。

## [`hypha-inference`](./inference)

InferenceManager 在请求到达 Backend 前完成标准化，也是 Prompt 证据与 Prefix/KV Cache 的协调点。

```ts
import { InferenceManager } from '@codesoul-co/hypha-inference';

const inference = new InferenceManager();
inference.register({
  id: 'primary',
  infer: async (request) => ({
    id: `response-${request.stepId}`, output: request.input,
  }),
});
const response = await inference.infer('primary', {
  runId: 'run-1', stepId: 'step-think',
  modelAlias: 'reasoning.primary', input: 'Summarize the evidence.',
});
```

## 生产绑定

1. 部署阶段校验 Routing Alias。
2. 启动时注册 Provider Adapter。
3. Kernel 只通过 InferenceManager 发送标准化请求。
4. 经 Harness 记录经长度限制与脱敏的请求/响应证据。
5. Cache Hit 只是投影，不能替代 Run Event。

Provider API Key 只能进入 Environment/Secret 解析，不能放进 Domain Pack、Prompt、Event 或公开配置示例。
