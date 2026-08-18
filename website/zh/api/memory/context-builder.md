# `@codesoul-co/hypha-memory` / `context-builder`

- 包索引: [`@codesoul-co/hypha-memory`](/zh/api/memory)
- 模块指南: [学习与组合说明](/zh/packages/memory)
- 源码: [`packages/memory/src/context-builder.ts`](https://github.com/CodeSoul-co/Hypha/blob/main/packages/memory/src/context-builder.ts)
- 导出数: **4**

## 公共导出

| Symbol | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `CalibratedCharacterTokenEstimator` | 类 | <code>new CalibratedCharacterTokenEstimator(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | Calibrated Character Token Estimator 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultContextInjectionGateway` | 类 | <code>new DefaultContextInjectionGateway(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | Default Context Injection Gateway 的运行时实现；公开构造函数与成员见下表。 |
| `DefaultMemoryContextBuilder` | 类 | <code>new DefaultMemoryContextBuilder(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | Default Memory Context Builder 的运行时实现；公开构造函数与成员见下表。 |
| `MetadataContextItemPolicyEvaluator` | 类 | <code>new MetadataContextItemPolicyEvaluator(): MetadataContextItemPolicyEvaluator</code> | Metadata Context Item Policy Evaluator 的运行时实现；公开构造函数与成员见下表。 |

## `CalibratedCharacterTokenEstimator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(charactersPerToken?: number): CalibratedCharacterTokenEstimator</code> | 创建该类的实例。 |
| `estimate` | 方法 | <code>estimate(text: string): number</code> | estimate 的公开运行时操作。 |
| `id` | 属性 | <code>id: "tokenizer.calibrated-character-v1"</code> | id 字段。 |

## `DefaultContextInjectionGateway` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `buildEnvelope` | 方法 | <code>buildEnvelope(bundle: ContextBundle, profile: ContextProfileSpec): Promise&lt;ContextEnvelope&gt;</code> | 构建 Envelope。 |
| `constructor` | 构造函数 | <code>(now?: () =&gt; string, artifactStore?: ContextArtifactStore &#124; undefined): DefaultContextInjectionGateway</code> | 创建该类的实例。 |

## `DefaultMemoryContextBuilder` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `build` | 方法 | <code>build(request: ContextBuildInput): Promise&lt;ContextBundle&gt;</code> | 构建 build。 |
| `constructor` | 构造函数 | <code>(tokenizer?: TokenEstimator, now?: () =&gt; string, compactor?: ContextCompactor, policy?: ContextItemPolicyEvaluator, artifactStore?: ContextArtifactStore &#124; undefined): DefaultMemoryContextBuilder</code> | 创建该类的实例。 |
| `explain` | 方法 | <code>explain(contextHash: string): Promise&lt;ContextBuildExplanation &#124; null&gt;</code> | explain 的公开运行时操作。 |

## `MetadataContextItemPolicyEvaluator` 公开成员

| 成员 | 种类 | 签名 | 说明 |
| --- | --- | --- | --- |
| `constructor` | 构造函数 | <code>(): MetadataContextItemPolicyEvaluator</code> | 创建该类的实例。 |
| `evaluate` | 方法 | <code>evaluate(input: ContextItemPolicyInput): Promise&lt;{ allowed: boolean; reason?: string; }&gt;</code> | 评估 evaluate。 |
