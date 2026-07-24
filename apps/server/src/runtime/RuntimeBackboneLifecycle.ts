import type { ProviderHealth } from '@hypha/core';
import type { RuntimeBackbone } from './RuntimeBackbone';

export interface RuntimeBackboneResource {
  eventStore: {
    health(): Promise<ProviderHealth>;
  };
  close(): void;
}

export type RuntimeBackboneFactory<TBackbone extends RuntimeBackboneResource = RuntimeBackbone> =
  () => TBackbone | Promise<TBackbone>;

/**
 * Owns startup readiness and shutdown for one canonical Runtime backbone.
 */
export class RuntimeBackboneLifecycle<TBackbone extends RuntimeBackboneResource = RuntimeBackbone> {
  private backbone?: TBackbone;
  private initialization?: Promise<TBackbone>;
  private closed = false;

  constructor(private readonly factory: RuntimeBackboneFactory<TBackbone>) {}

  async initialize(): Promise<TBackbone> {
    if (this.closed) throw new Error('Canonical Runtime lifecycle is closed');
    if (this.backbone) return this.backbone;

    const pending = this.initialization ?? this.openHealthyBackbone();
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

  private async openHealthyBackbone(): Promise<TBackbone> {
    let candidate: TBackbone | undefined;
    try {
      candidate = await this.factory();
      const health = await candidate.eventStore.health();
      if (health.status !== 'healthy') {
        throw new Error(
          `Canonical Runtime event store is ${health.status}${health.message ? `: ${health.message}` : ''}`
        );
      }
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
