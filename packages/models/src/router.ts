import { FrameworkError, isFrameworkError } from '@hypha/core';
import type {
  ModelAliasSpec,
  ModelCapabilities,
  ModelProvider,
  ModelRegistry,
  ModelRequest,
  ModelResponse,
  ModelRoutingSpec,
  ModelStreamEvent,
} from './index';

export type ModelProviderErrorCode =
  | 'MODEL_PROVIDER_ERROR'
  | 'MODEL_PROVIDER_HTTP_ERROR'
  | 'MODEL_PROVIDER_TIMEOUT'
  | 'MODEL_PROVIDER_RATE_LIMITED'
  | 'MODEL_PROVIDER_AUTH_FAILED'
  | 'MODEL_PROVIDER_BAD_REQUEST'
  | 'MODEL_PROVIDER_STREAM_ERROR'
  | 'MODEL_PROVIDER_NOT_FOUND'
  | 'MODEL_ALIAS_NOT_FOUND'
  | 'MODEL_ROUTING_FAILED';

export interface ModelProviderErrorInit {
  code: ModelProviderErrorCode;
  message: string;
  providerId?: string;
  modelAlias?: string;
  status?: number;
  retryable?: boolean;
  raw?: unknown;
  cause?: unknown;
}

export class ModelProviderError extends FrameworkError {
  override readonly code: ModelProviderErrorCode;
  readonly providerId?: string;
  readonly modelAlias?: string;
  readonly status?: number;
  readonly retryable: boolean;
  readonly raw?: unknown;

  constructor(init: ModelProviderErrorInit) {
    super({
      code: init.code,
      message: init.message,
      context: {
        providerId: init.providerId,
        modelAlias: init.modelAlias,
        status: init.status,
        retryable: init.retryable ?? isRetryableStatus(init.status),
      },
      cause: init.cause,
    });
    this.name = 'ModelProviderError';
    this.code = init.code;
    this.providerId = init.providerId;
    this.modelAlias = init.modelAlias;
    this.status = init.status;
    this.retryable = init.retryable ?? isRetryableStatus(init.status);
    this.raw = init.raw;
  }
}

export interface NormalizedProviderErrorContext {
  providerId?: string;
  modelAlias?: string;
  operation?: 'generate' | 'stream' | 'count_tokens' | 'health';
}

export function normalizeModelProviderError(
  error: unknown,
  context: NormalizedProviderErrorContext = {}
): ModelProviderError {
  if (error instanceof ModelProviderError) {
    return error;
  }
  const status = extractStatus(error);
  const message = extractMessage(error);
  return new ModelProviderError({
    code: statusToModelErrorCode(status),
    message,
    providerId: context.providerId,
    modelAlias: context.modelAlias,
    status,
    retryable: isRetryableStatus(status),
    raw: extractRawError(error),
    cause: error,
  });
}

export interface ResolvedModelRoute {
  alias: string;
  providerId: string;
  providerModel: string;
  spec?: ModelAliasSpec;
}

export function parseModelTarget(
  target: string
): Pick<ResolvedModelRoute, 'providerId' | 'providerModel'> | null {
  const separator = target.indexOf(':');
  if (separator <= 0 || separator === target.length - 1) {
    return null;
  }
  return {
    providerId: target.slice(0, separator),
    providerModel: target.slice(separator + 1),
  };
}

export class ModelAliasRegistry {
  private readonly aliases = new Map<string, ModelAliasSpec>();

  constructor(aliases: ModelAliasSpec[] = []) {
    aliases.forEach((alias) => this.register(alias));
  }

  register(alias: ModelAliasSpec): void {
    this.aliases.set(alias.alias, alias);
  }

  registerTarget(alias: string, target: string, version = '0.0.0'): ModelAliasSpec {
    const parsed = parseModelTarget(target);
    if (!parsed) {
      throw new ModelProviderError({
        code: 'MODEL_ALIAS_NOT_FOUND',
        message: `Invalid model target: ${target}`,
        modelAlias: alias,
        retryable: false,
      });
    }
    const spec: ModelAliasSpec = {
      id: `model.alias.${alias}`,
      version,
      alias,
      providerId: parsed.providerId,
      providerModel: parsed.providerModel,
    };
    this.register(spec);
    return spec;
  }

  resolve(aliasOrTarget: string): ResolvedModelRoute {
    const spec = this.aliases.get(aliasOrTarget);
    if (spec) {
      return {
        alias: spec.alias,
        providerId: spec.providerId,
        providerModel: spec.providerModel,
        spec,
      };
    }
    const parsed = parseModelTarget(aliasOrTarget);
    if (parsed) {
      return {
        alias: aliasOrTarget,
        providerId: parsed.providerId,
        providerModel: parsed.providerModel,
      };
    }
    throw new ModelProviderError({
      code: 'MODEL_ALIAS_NOT_FOUND',
      message: `Model alias not configured: ${aliasOrTarget}`,
      modelAlias: aliasOrTarget,
      retryable: false,
    });
  }

  list(): ModelAliasSpec[] {
    return Array.from(this.aliases.values());
  }
}

export interface ModelRouterOptions {
  id?: string;
  registry: Pick<ModelRegistry, 'get' | 'list'>;
  aliases?: ModelAliasSpec[];
  routing?: ModelRoutingSpec;
  fallbackAliases?: string[];
}

export class ModelRouter implements ModelProvider<ModelRequest, ModelResponse> {
  readonly id: string;
  private readonly aliases: ModelAliasRegistry;
  private readonly fallbackAliases: string[];

  constructor(private readonly options: ModelRouterOptions) {
    this.id = options.id ?? options.routing?.id ?? 'model-router';
    this.aliases = new ModelAliasRegistry([
      ...(options.aliases ?? []),
      ...(options.routing?.aliases ?? []),
    ]);
    this.fallbackAliases = [
      ...(options.fallbackAliases ?? []),
      ...(options.routing?.fallbackAliases ?? []),
    ];
  }

  capabilities(): ModelCapabilities {
    const aggregate: ModelCapabilities = {};
    for (const provider of this.options.registry.list()) {
      const capabilities = provider.capabilities();
      for (const [key, value] of Object.entries(capabilities) as Array<
        [keyof ModelCapabilities, boolean | undefined]
      >) {
        aggregate[key] = Boolean(aggregate[key] || value);
      }
    }
    return aggregate;
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    const errors: ModelProviderError[] = [];
    for (const route of this.resolveCandidateRoutes(request.modelAlias)) {
      const provider = this.options.registry.get(route.providerId);
      if (!provider) {
        errors.push(
          new ModelProviderError({
            code: 'MODEL_PROVIDER_NOT_FOUND',
            message: `Model provider not found: ${route.providerId}`,
            providerId: route.providerId,
            modelAlias: route.alias,
            retryable: false,
          })
        );
        continue;
      }
      try {
        const response = await provider.generate(this.toProviderRequest(request, route));
        return this.annotateResponse(response, route);
      } catch (error) {
        const normalized = normalizeModelProviderError(error, {
          providerId: route.providerId,
          modelAlias: route.alias,
          operation: 'generate',
        });
        errors.push(normalized);
        if (!normalized.retryable) break;
      }
    }
    throw this.routingFailure(request.modelAlias, errors);
  }

  async *stream(request: ModelRequest): AsyncIterable<ModelStreamEvent> {
    const errors: ModelProviderError[] = [];
    for (const route of this.resolveCandidateRoutes(request.modelAlias)) {
      const provider = this.options.registry.get(route.providerId);
      if (!provider?.stream) {
        errors.push(
          new ModelProviderError({
            code: provider ? 'MODEL_PROVIDER_STREAM_ERROR' : 'MODEL_PROVIDER_NOT_FOUND',
            message: provider
              ? `Model provider does not support streaming: ${route.providerId}`
              : `Model provider not found: ${route.providerId}`,
            providerId: route.providerId,
            modelAlias: route.alias,
            retryable: Boolean(!provider),
          })
        );
        continue;
      }
      try {
        for await (const event of provider.stream(this.toProviderRequest(request, route))) {
          yield event;
        }
        return;
      } catch (error) {
        const normalized = normalizeModelProviderError(error, {
          providerId: route.providerId,
          modelAlias: route.alias,
          operation: 'stream',
        });
        errors.push(normalized);
        if (!normalized.retryable) break;
      }
    }
    throw this.routingFailure(request.modelAlias, errors);
  }

  resolve(aliasOrTarget: string): ResolvedModelRoute {
    return this.aliases.resolve(aliasOrTarget);
  }

  listAliases(): ModelAliasSpec[] {
    return this.aliases.list();
  }

  private resolveCandidateRoutes(modelAlias: string): ResolvedModelRoute[] {
    const requested = this.aliases.resolve(modelAlias);
    const fallbacks = this.fallbackAliases
      .filter((alias) => alias !== modelAlias)
      .map((alias) => this.aliases.resolve(alias));
    return [requested, ...fallbacks];
  }

  private toProviderRequest(request: ModelRequest, route: ResolvedModelRoute): ModelRequest {
    return {
      ...request,
      modelAlias: route.providerModel,
      metadata: {
        ...request.metadata,
        requestedModelAlias: request.modelAlias,
        resolvedModelAlias: route.alias,
        providerId: route.providerId,
        providerModel: route.providerModel,
      },
    };
  }

  private annotateResponse(response: ModelResponse, route: ResolvedModelRoute): ModelResponse {
    return {
      ...response,
      providerId: response.providerId ?? route.providerId,
      model: response.model ?? route.providerModel,
      metadata: {
        ...response.metadata,
        modelAlias: route.alias,
        providerId: route.providerId,
        providerModel: route.providerModel,
      },
    };
  }

  private routingFailure(modelAlias: string, errors: ModelProviderError[]): ModelProviderError {
    const last = errors[errors.length - 1];
    return new ModelProviderError({
      code: last?.code ?? 'MODEL_ROUTING_FAILED',
      message: last
        ? `Model routing failed for ${modelAlias}: ${last.message}`
        : `Model routing failed for ${modelAlias}`,
      modelAlias,
      providerId: last?.providerId,
      status: last?.status,
      retryable: false,
      raw: errors.map((error) => ({
        code: error.code,
        message: error.message,
        providerId: error.providerId,
        status: error.status,
        retryable: error.retryable,
      })),
      cause: last,
    });
  }
}

function statusToModelErrorCode(status: number | undefined): ModelProviderErrorCode {
  if (status === 401 || status === 403) return 'MODEL_PROVIDER_AUTH_FAILED';
  if (status === 400 || status === 422) return 'MODEL_PROVIDER_BAD_REQUEST';
  if (status === 408) return 'MODEL_PROVIDER_TIMEOUT';
  if (status === 429) return 'MODEL_PROVIDER_RATE_LIMITED';
  if (status && status >= 500) return 'MODEL_PROVIDER_HTTP_ERROR';
  return 'MODEL_PROVIDER_ERROR';
}

function isRetryableStatus(status: number | undefined): boolean {
  return (
    status === undefined || status === 408 || status === 429 || Boolean(status && status >= 500)
  );
}

function extractStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const candidate = error as {
    status?: unknown;
    response?: { status?: unknown };
    context?: { status?: unknown };
  };
  const status = candidate.status ?? candidate.response?.status ?? candidate.context?.status;
  return typeof status === 'number' ? status : undefined;
}

function extractMessage(error: unknown): string {
  if (isFrameworkError(error)) return error.message;
  if (error instanceof Error) return error.message;
  if (!error || typeof error !== 'object') return String(error);
  const candidate = error as {
    message?: unknown;
    response?: { data?: { error?: { message?: unknown }; message?: unknown } };
  };
  const providerMessage =
    candidate.response?.data?.error?.message ?? candidate.response?.data?.message;
  if (typeof providerMessage === 'string') return providerMessage;
  if (typeof candidate.message === 'string') return candidate.message;
  return String(error);
}

function extractRawError(error: unknown): unknown {
  if (!error || typeof error !== 'object') return error;
  const candidate = error as {
    response?: { data?: unknown };
    raw?: unknown;
  };
  return candidate.response?.data ?? candidate.raw ?? error;
}
