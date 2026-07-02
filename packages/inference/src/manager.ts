import type { InferenceProvider, InferenceRequest, InferenceResponse } from './types';

export class InferenceManager {
  private readonly providers = new Map<string, InferenceProvider>();

  register(provider: InferenceProvider): void {
    this.providers.set(provider.id, provider);
  }

  get(providerId: string): InferenceProvider | null {
    return this.providers.get(providerId) ?? null;
  }

  async infer(providerId: string, request: InferenceRequest): Promise<InferenceResponse> {
    const provider = this.get(providerId);
    if (!provider) {
      throw new Error(`Inference provider not found: ${providerId}`);
    }
    return provider.infer(request);
  }
}
