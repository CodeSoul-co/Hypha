import { getLLMManager } from '../core/llm/LLMFactory';
import { checkStorageHealth, StorageHealth } from './database';

export type HealthState = 'healthy' | 'unhealthy';

export interface HealthComponent {
  status: HealthState;
  required: boolean;
  detail?: string;
}

export interface LivenessSnapshot {
  status: 'alive';
  timestamp: string;
  uptime: number;
}

export interface ReadinessSnapshot {
  status: 'ready' | 'not_ready';
  ready: boolean;
  timestamp: string;
  components: {
    runtime: HealthComponent;
    mongodb: HealthComponent;
    redis: HealthComponent;
    defaultModel: HealthComponent;
  };
}

export interface HealthServiceDependencies {
  storageHealth: () => Promise<StorageHealth>;
  modelHealth: () => Promise<{ defaultProvider: string; healthy: boolean }>;
  now: () => string;
  uptime: () => number;
}

export class HealthService {
  private runtimeInitialized = false;
  private runtimeFailure?: string;

  constructor(private readonly dependencies: HealthServiceDependencies = defaultDependencies()) {}

  beginRuntimeInitialization(): void {
    this.runtimeInitialized = false;
    this.runtimeFailure = undefined;
  }

  setRuntimeInitialized(initialized: boolean): void {
    if (!initialized) {
      this.runtimeInitialized = false;
      return;
    }
    if (this.runtimeFailure) {
      this.runtimeInitialized = false;
      throw new Error(`Runtime cannot become ready after a fatal failure: ${this.runtimeFailure}`);
    }
    this.runtimeInitialized = true;
  }

  setRuntimeFailure(error: unknown): void {
    this.runtimeInitialized = false;
    this.runtimeFailure =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : typeof error === 'string' && error.trim()
          ? error.trim()
          : 'Runtime service reported an unknown fatal error';
  }

  liveness(): LivenessSnapshot {
    return {
      status: 'alive',
      timestamp: this.dependencies.now(),
      uptime: this.dependencies.uptime(),
    };
  }

  async readiness(): Promise<ReadinessSnapshot> {
    const [storageResult, modelResult] = await Promise.allSettled([
      this.dependencies.storageHealth(),
      this.dependencies.modelHealth(),
    ]);
    const storage = storageResult.status === 'fulfilled' ? storageResult.value : undefined;
    const model = modelResult.status === 'fulfilled' ? modelResult.value : undefined;
    const components = {
      runtime: component(
        this.runtimeInitialized,
        true,
        this.runtimeInitialized
          ? undefined
          : (this.runtimeFailure ?? 'Runtime services are still initializing')
      ),
      mongodb: component(Boolean(storage?.mongodb), true),
      redis: component(Boolean(storage?.redis), true),
      defaultModel: component(
        Boolean(model?.healthy),
        true,
        model ? `provider=${model.defaultProvider}` : 'Default model health probe failed'
      ),
    };
    const ready = Object.values(components).every(
      (entry) => !entry.required || entry.status === 'healthy'
    );

    return {
      status: ready ? 'ready' : 'not_ready',
      ready,
      timestamp: this.dependencies.now(),
      components,
    };
  }
}

function component(healthy: boolean, required: boolean, detail?: string): HealthComponent {
  return {
    status: healthy ? 'healthy' : 'unhealthy',
    required,
    ...(detail ? { detail } : {}),
  };
}

function defaultDependencies(): HealthServiceDependencies {
  return {
    storageHealth: checkStorageHealth,
    modelHealth: async () => {
      const manager = getLLMManager();
      const defaultProvider = manager.getDefaultProvider();
      const health = await manager.healthCheck();
      return { defaultProvider, healthy: health[defaultProvider] === true };
    },
    now: () => new Date().toISOString(),
    uptime: () => process.uptime(),
  };
}

let healthService: HealthService | null = null;

export function getHealthService(): HealthService {
  if (!healthService) healthService = new HealthService();
  return healthService;
}
