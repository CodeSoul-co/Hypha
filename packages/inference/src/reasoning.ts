import type { InferenceProvider, InferenceRequest, InferenceResponse } from './types';

export type ReasoningMethod = 'direct' | 'cot' | 'tot' | 'self_consistency';

export interface ReasoningOptions {
  method: ReasoningMethod;
  branches?: number;
  maxDepth?: number;
  revealReasoning?: boolean;
  evaluator?: (responses: InferenceResponse[]) => Promise<InferenceResponse>;
}

export interface ReasoningRequest<TInput = unknown> extends InferenceRequest<TInput> {
  reasoning?: ReasoningOptions;
}

export class ReasoningOrchestrator {
  constructor(private readonly provider: InferenceProvider) {}

  async infer(request: ReasoningRequest): Promise<InferenceResponse> {
    const options = request.reasoning ?? { method: 'direct' as const };
    switch (options.method) {
      case 'direct':
        return this.provider.infer(request);
      case 'cot':
        return this.runChainOfThought(request, options);
      case 'tot':
        return this.runTreeOfThought(request, options);
      case 'self_consistency':
        return this.runSelfConsistency(request, options);
    }
  }

  private async runChainOfThought(
    request: ReasoningRequest,
    options: ReasoningOptions
  ): Promise<InferenceResponse> {
    return this.provider.infer({
      ...request,
      metadata: {
        ...request.metadata,
        reasoningMethod: 'cot',
        revealReasoning: options.revealReasoning ?? false,
      },
    });
  }

  private async runTreeOfThought(
    request: ReasoningRequest,
    options: ReasoningOptions
  ): Promise<InferenceResponse> {
    const branches = Math.max(1, options.branches ?? 3);
    const responses = await Promise.all(
      Array.from({ length: branches }, (_value, index) =>
        this.provider.infer({
          ...request,
          metadata: {
            ...request.metadata,
            reasoningMethod: 'tot',
            branchIndex: index,
            maxDepth: options.maxDepth ?? 2,
          },
        })
      )
    );
    return options.evaluator ? options.evaluator(responses) : responses[0];
  }

  private async runSelfConsistency(
    request: ReasoningRequest,
    options: ReasoningOptions
  ): Promise<InferenceResponse> {
    const branches = Math.max(1, options.branches ?? 3);
    const responses = await Promise.all(
      Array.from({ length: branches }, (_value, index) =>
        this.provider.infer({
          ...request,
          metadata: {
            ...request.metadata,
            reasoningMethod: 'self_consistency',
            sampleIndex: index,
          },
        })
      )
    );
    return options.evaluator ? options.evaluator(responses) : responses[0];
  }
}
