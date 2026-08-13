import type { ProviderHealth } from '@codesoul-co/core';
import type { RuntimeBackbone } from './RuntimeBackbone';

export interface RuntimeBackboneResource {
  eventStore: {
    health(): Promise<ProviderHealth>;
  };
  close(): void;
}

export type RuntimeBackboneFactory<TBackbone extends RuntimeBackboneResource = RuntimeBackbone> =
  () => TBackbone | Promise<TBackbone>;

export interface RuntimeBackboneLifecycleOptions<TBackbone extends RuntimeBackboneResource> {
  audit?: (backbone: TBackbone, signal?: AbortSignal) => Promise<void>;
}

/**
 * Owns startup readiness and shutdown for one canonical Runtime backbone.
 */
export class RuntimeBackboneLifecycle<TBackbone extends RuntimeBackboneResource = RuntimeBackbone> {
  private backbone?: TBackbone;
  private initialization?: Promise<TBackbone>;
  private closed = false;

  constructor(
    private readonly factory: RuntimeBackboneFactory<TBackbone>,
    private readonly options: RuntimeBackboneLifecycleOptions<TBackbone> = {}
  ) {}

  async initialize(signal?: AbortSignal): Promise<TBackbone> {
    if (this.closed) throw new Error('Canonical Runtime lifecycle is closed');
    if (this.backbone) return this.backbone;

    const pending = this.initialization ?? this.openHealthyBackbone(signal);
    this.initialization = pending;
    try {
      return await pending;
    } catch (error) {
      if (this.initialization === pending) this.initialization = undefined;
      throw error;
    }
  }

  get(): TBackbone {
    if (this.closed) throw new Error('Canonical Runtime lifecycle is closed');
    if (!this.backbone) throw new Error('Canonical Runtime backbone is not initialized');
    return this.backbone;
  }

  isInitialized(): boolean {
    return !this.closed && this.backbone !== undefined;
  }

  async close(): Promise<void> {
    if (this.closed) return;
    this.closed = true;

    await this.initialization?.catch(() => undefined);
    const backbone = this.backbone;
    this.backbone = undefined;
    backbone?.close();
  }

  private async openHealthyBackbone(signal?: AbortSignal): Promise<TBackbone> {
    let candidate: TBackbone | undefined;
    try {
      candidate = await this.factory();
      const health = await candidate.eventStore.health();
      if (health.status !== 'healthy') {
        throw new Error(
          `Canonical Runtime event store is ${health.status}${health.message ? `: ${health.message}` : ''}`
        );
      }
      await this.options.audit?.(candidate, signal);
      if (this.closed) throw new Error('Canonical Runtime lifecycle closed during initialization');
      this.backbone = candidate;
      return candidate;
    } catch (error) {
      try {
        candidate?.close();
      } catch {
        // Preserve the startup failure that caused this candidate to be rejected.
      }
      throw error;
    }
  }
}
