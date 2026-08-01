import { getLLMManager } from '../core/llm/LLMFactory';
import { getSkillManager, type ServerSkillRegistryReadiness } from '../core/skills/SkillManager';
import { getToolManager } from '../core/tools/ToolManager';
import { getServerRuntimeReadiness } from './ServerRuntimeReadiness';
import {
  getServerMemoryComposition,
  sanitizeServerMemoryOperationalError,
  type ServerMemoryReadiness,
} from './ServerMemoryComposition';
import { checkStorageHealth } from './database';

export interface ServerProductReadiness {
  ready: boolean;
  status: 'ready' | 'degraded' | 'not_ready';
  components: {
    runtime: ReturnType<typeof getServerRuntimeReadiness>;
    storage: {
      ready: boolean;
      status: 'ready' | 'failed';
      mongodb: boolean;
      redis: boolean;
      message?: string;
    };
    memory: ServerMemoryReadiness;
    llm: {
      ready: boolean;
      status: 'ready' | 'failed';
      providers: Record<string, boolean>;
      availableProviders: string[];
      message?: string;
    };
    tools: ReturnType<ReturnType<typeof getToolManager>['operationalReadiness']> & {
      health: Record<string, boolean>;
      message?: string;
    };
    skills: ServerSkillRegistryReadiness & { ready: boolean };
  };
}

export async function getServerProductReadiness(): Promise<ServerProductReadiness> {
  const runtime = getServerRuntimeReadiness();
  const [storage, memory, llm, tools] = await Promise.all([
    collectStorageReadiness(),
    collectMemoryReadiness(),
    collectLlmReadiness(),
    collectToolReadiness(),
  ]);
  const skillState = getSkillManager().readiness();
  const skills = {
    ...skillState,
    ready:
      skillState.initialized &&
      (!skillState.required || skillState.status === 'ready') &&
      skillState.status !== 'failed',
  };
  const requiredReady =
    runtime.ready && storage.ready && memory.ready && llm.ready && tools.ready && skills.ready;
  const degraded =
    memory.state === 'degraded' || tools.status === 'degraded' || skills.status === 'degraded';

  return {
    ready: requiredReady,
    status: requiredReady ? (degraded ? 'degraded' : 'ready') : 'not_ready',
    components: { runtime, storage, memory, llm, tools, skills },
  };
}

async function collectStorageReadiness(): Promise<ServerProductReadiness['components']['storage']> {
  try {
    const health = await checkStorageHealth();
    const ready = health.mongodb && health.redis;
    return {
      ready,
      status: ready ? 'ready' : 'failed',
      mongodb: health.mongodb,
      redis: health.redis,
      ...(ready ? {} : { message: 'Required storage dependencies are unavailable' }),
    };
  } catch (error) {
    return {
      ready: false,
      status: 'failed',
      mongodb: false,
      redis: false,
      message: boundedOperationalMessage(error),
    };
  }
}

async function collectMemoryReadiness(): Promise<ServerMemoryReadiness> {
  try {
    return await getServerMemoryComposition().readiness();
  } catch (error) {
    return {
      ready: false,
      state: 'failed',
      message: sanitizeServerMemoryOperationalError(error),
    };
  }
}

async function collectLlmReadiness(): Promise<ServerProductReadiness['components']['llm']> {
  try {
    const providers = await getLLMManager().healthCheck();
    const availableProviders = Object.entries(providers)
      .filter(([, healthy]) => healthy)
      .map(([provider]) => provider);
    const ready = availableProviders.length > 0;
    return {
      ready,
      status: ready ? 'ready' : 'failed',
      providers,
      availableProviders,
      ...(ready ? {} : { message: 'No healthy LLM Provider is available' }),
    };
  } catch (error) {
    return {
      ready: false,
      status: 'failed',
      providers: {},
      availableProviders: [],
      message: boundedOperationalMessage(error),
    };
  }
}

async function collectToolReadiness(): Promise<ServerProductReadiness['components']['tools']> {
  const manager = getToolManager();
  const operational = manager.operationalReadiness();
  try {
    const health = await manager.healthCheck();
    const requiredConnectionFailed = Object.entries(operational.mcpServers).some(
      ([serverId, state]) => state.required && health[serverId] !== true
    );
    return {
      ...operational,
      ready: operational.ready && !requiredConnectionFailed,
      status: requiredConnectionFailed ? 'failed' : operational.status,
      health,
      ...(requiredConnectionFailed
        ? { message: 'A required MCP server failed its live health check' }
        : {}),
    };
  } catch (error) {
    return {
      ...operational,
      ready: false,
      status: 'failed',
      health: {},
      message: boundedOperationalMessage(error),
    };
  }
}

function boundedOperationalMessage(error: unknown): string {
  return (error instanceof Error ? error.message : String(error))
    .replace(/([a-z][a-z0-9+.-]*:\/\/)[^\s/@]+:[^\s/@]+@/gi, '$1[redacted]@')
    .slice(0, 256);
}
