import type { Router } from 'express';

export interface OpenApiMount {
  prefix: string;
  tag: string;
  router: Router;
}

export interface OpenApiDocument {
  openapi: '3.1.0';
  info: { title: string; version: string; description: string };
  servers: Array<{ url: string }>;
  paths: Record<string, Record<string, unknown>>;
  components: Record<string, unknown>;
}

let activeDocument: OpenApiDocument | undefined;

export function createOpenApiDocument(input: {
  version: string;
  basePath: string;
  mounts: OpenApiMount[];
  rootRoutes: Array<{ method: string; path: string; tag: string }>;
}): OpenApiDocument {
  const paths: OpenApiDocument['paths'] = {};
  const descriptors = [
    ...input.rootRoutes,
    ...input.mounts.flatMap((mount) =>
      expressRoutes(mount.router).map((route) => ({
        ...route,
        path: joinRoutePath(mount.prefix, route.path),
        tag: mount.tag,
      }))
    ),
  ];

  for (const descriptor of descriptors) {
    const openApiPath = descriptor.path.replace(/:([A-Za-z0-9_]+)/gu, '{$1}');
    const method = descriptor.method.toLowerCase();
    paths[openApiPath] ??= {};
    paths[openApiPath][method] = operation(descriptor.method, descriptor.path, descriptor.tag);
  }

  return {
    openapi: '3.1.0',
    info: {
      title: 'Hypha HTTP API',
      version: input.version,
      description:
        'Generated from the mounted Express route registry. Field-level contracts remain linked from docs/api/http.md.',
    },
    servers: [{ url: input.basePath }],
    paths,
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        apiKeyAuth: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
      },
      schemas: {
        SuccessEnvelope: {
          type: 'object',
          required: ['success', 'data'],
          properties: { success: { const: true }, data: {} },
        },
        ErrorEnvelope: {
          type: 'object',
          required: ['success', 'error'],
          properties: {
            success: { const: false },
            error: {
              type: 'object',
              required: ['code', 'message'],
              properties: { code: { type: 'string' }, message: { type: 'string' } },
            },
          },
        },
      },
    },
  };
}

export function setOpenApiDocument(document: OpenApiDocument): void {
  activeDocument = document;
}

export function getOpenApiDocument(): OpenApiDocument {
  if (!activeDocument) throw new Error('OpenAPI document has not been initialized');
  return activeDocument;
}

function expressRoutes(router: Router): Array<{ method: string; path: string }> {
  const stack = (router as unknown as { stack?: Array<Record<string, unknown>> }).stack ?? [];
  return stack.flatMap((layer) => {
    const route = layer.route as
      | { path?: string | string[]; methods?: Record<string, boolean> }
      | undefined;
    if (!route?.path || !route.methods) return [];
    const paths = Array.isArray(route.path) ? route.path : [route.path];
    const methods = route.methods;
    return paths.flatMap((routePath) =>
      Object.entries(methods)
        .filter(([, enabled]) => enabled)
        .map(([method]) => ({ method: method.toUpperCase(), path: routePath }))
    );
  });
}

function operation(method: string, routePath: string, tag: string): Record<string, unknown> {
  const contract = requestContract(method, routePath);
  const parameters: Array<Record<string, unknown>> = [
    ...[...routePath.matchAll(/:([A-Za-z0-9_]+)/gu)].map((match) => ({
      name: match[1],
      in: 'path',
      required: true,
      schema: { type: 'string' },
    })),
    ...(contract.parameters ?? []),
  ];
  const isPublic = publicRoute(method, routePath);
  const responseContent =
    routePath === '/chat/stream'
      ? { 'text/event-stream': { schema: { type: 'string' } } }
      : { 'application/json': { schema: { $ref: '#/components/schemas/SuccessEnvelope' } } };

  return {
    operationId: `${method.toLowerCase()}_${routePath}`.replace(/[^A-Za-z0-9]+/gu, '_'),
    tags: [tag],
    summary: `${method.toUpperCase()} ${routePath}`,
    ...(parameters.length > 0 ? { parameters } : {}),
    ...(['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())
      ? {
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: contract.bodySchema ?? { type: 'object', additionalProperties: true },
              },
            },
          },
        }
      : {}),
    security: securityRequirements(routePath, isPublic),
    responses: {
      [contract.successStatus ?? '200']: {
        description: 'Successful response',
        content: responseContent,
      },
      '400': {
        description: 'Invalid request',
        content: {
          'application/json': { schema: { $ref: '#/components/schemas/ErrorEnvelope' } },
        },
      },
    },
    'x-hypha-source': 'express-route-registry',
  };
}

function securityRequirements(
  routePath: string,
  isPublic: boolean
): Array<Record<string, never[]>> {
  if (isPublic) return [];
  if (
    routePath === '/chat' ||
    routePath.startsWith('/chat/') ||
    routePath.startsWith('/memory/') ||
    routePath.startsWith('/usage/')
  ) {
    return [{ bearerAuth: [] }, { apiKeyAuth: [] }];
  }
  return [{ bearerAuth: [] }];
}

function requestContract(
  method: string,
  routePath: string
): {
  bodySchema?: Record<string, unknown>;
  parameters?: Array<Record<string, unknown>>;
  successStatus?: string;
} {
  const key = `${method.toUpperCase()} ${routePath}`;
  const idempotencyKey = {
    name: 'Idempotency-Key',
    in: 'header',
    required: true,
    schema: { type: 'string', minLength: 1, maxLength: 256 },
  };

  if (key === 'POST /auth/login') {
    return {
      bodySchema: objectSchema(['email', 'password'], {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 1 },
      }),
    };
  }
  if (key === 'POST /skills/install') {
    return {
      bodySchema: objectSchema(
        ['source'],
        {
          source: { type: 'string', enum: ['path', 'url', 'inline'] },
          path: { type: 'string' },
          url: { type: 'string', format: 'uri' },
          content: { type: 'string' },
          filename: { type: 'string' },
          expectedSha256: { type: 'string' },
          signer: {},
          signature: {},
          manifest: { type: 'object' },
          activate: { type: 'boolean' },
        },
        true
      ),
    };
  }
  if (key === 'POST /runtime/agent-prompts') {
    return {
      successStatus: '201',
      bodySchema: objectSchema(
        ['id', 'version', 'name', 'role', 'template'],
        {
          id: { type: 'string', minLength: 1 },
          version: { type: 'string', minLength: 1 },
          name: { type: 'string', minLength: 1 },
          role: { type: 'string', enum: ['system', 'developer'] },
          template: { type: 'string', minLength: 1 },
          variables: { type: 'array', items: { type: 'object' } },
          stable: { type: 'boolean' },
          cacheable: { type: 'boolean' },
        },
        true
      ),
    };
  }
  if (key === 'POST /runtime/runs/:runId/fsm/transitions') {
    return {
      parameters: [idempotencyKey],
      bodySchema: objectSchema(
        [
          'processId',
          'processVersion',
          'expectedState',
          'expectedRunRevision',
          'targetState',
          'reason',
        ],
        {
          processId: { type: 'string', minLength: 1, maxLength: 512 },
          processVersion: { type: 'string', minLength: 1, maxLength: 128 },
          expectedState: { type: 'string', minLength: 1, maxLength: 512 },
          expectedRunRevision: { type: 'integer', minimum: 0 },
          targetState: { type: 'string', minLength: 1, maxLength: 512 },
          reason: { type: 'string', minLength: 1, maxLength: 16_384 },
          guardContext: {
            type: 'object',
            properties: {
              input: {},
              variables: { type: 'object', additionalProperties: true },
              metadata: { type: 'object', additionalProperties: true },
            },
            additionalProperties: false,
          },
        }
      ),
    };
  }
  if (key === 'POST /runtime/sessions/:sessionId/commands/start-run') {
    return {
      successStatus: '202',
      parameters: [idempotencyKey],
      bodySchema: objectSchema([], {
        input: {},
        agentId: { type: 'string', minLength: 1 },
        workflowRef: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', minLength: 1 },
            version: { type: 'string', minLength: 1 },
            revision: { type: 'string', minLength: 1 },
          },
          additionalProperties: false,
        },
        domainPack: {},
        fsm: {},
        react: { type: 'object' },
        metadata: { type: 'object' },
      }),
    };
  }
  if (key === 'POST /runtime/runs/:runId/human-tasks/:taskId/decision') {
    return {
      parameters: [idempotencyKey],
      bodySchema: objectSchema(['decision', 'expectedRevision', 'expectedSubjectHash'], {
        decision: { type: 'string', enum: ['approved', 'rejected'] },
        expectedRevision: { type: 'integer', minimum: 1 },
        expectedSubjectHash: { type: 'string', pattern: '^sha256:[a-f0-9]{64}$' },
        reason: { type: 'string', minLength: 1, maxLength: 16384 },
      }),
    };
  }
  return {};
}

function objectSchema(
  required: string[],
  properties: Record<string, unknown>,
  additionalProperties = false
): Record<string, unknown> {
  return {
    type: 'object',
    ...(required.length > 0 ? { required } : {}),
    properties,
    additionalProperties,
  };
}

function publicRoute(method: string, routePath: string): boolean {
  if (['/auth/login', '/auth/register'].includes(routePath)) return true;
  if (method.toUpperCase() !== 'GET') return false;
  return [
    '/health',
    '/ready',
    '/openapi.json',
    '/docs',
    '/docs/json',
    '/docs/openapi.json',
  ].includes(routePath);
}

function joinRoutePath(prefix: string, routePath: string): string {
  const joined = `${prefix}/${routePath}`.replace(/\/+/gu, '/');
  return joined.length > 1 && joined.endsWith('/') ? joined.slice(0, -1) : joined;
}
