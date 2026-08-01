import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import http from 'http';

import { getConfig, runtimeConfig } from './config';
import { logger } from './utils/logger';
import { initializeDatabases, closeDatabases, checkStorageHealth } from './services/database';
import { initializeLLM, destroyLLM, getLLMManager } from './core/llm/LLMFactory';
import { initializeSkillManager, destroySkillManager } from './core/skills/SkillManager';
import { initializeToolManager, destroyToolManager } from './core/tools/ToolManager';
import { initializeWorkflowEngine, destroyWorkflowEngine } from './core/workflow/WorkflowEngine';
import { initializePromptManager, destroyPromptManager } from './core/prompts/PromptManager';
import {
  closeServerMemoryComposition,
  getMemoryApplicationService,
  getServerMemoryComposition,
  initializeServerMemoryComposition,
  sanitizeServerMemoryOperationalError,
} from './services/ServerMemoryComposition';
import {
  initSingleUserOwner,
  getSingleUserToken,
  initDevTestUser,
  initDevAdminUser,
  getDevTestToken,
} from './services/DevAuth';
import routes from './routes';
import { errorHandler, notFoundHandler, requestLogger } from './middleware/errorHandler';
import { createApiRateLimiter } from './middleware/rateLimiter';
import { HTTP_STATUS } from './constants';
import {
  createServerCompatibilityEventStore,
  destroyEventRuntime,
  getEventRuntime,
  initializeEventRuntime,
  serverRuntimeEventDatabasePath,
} from './services/EventRuntime';
import { formatLocalHealthBaseUrl } from './utils/serverAddress';
import { ServerCanonicalRuntime } from './runtime/ServerCanonicalRuntime';
import { createServerProductionRuntime } from './runtime/ServerProductionRuntime';
import { createServerProductionSessionCommands } from './runtime/ServerProductionSessionCommands';
import { ServerShutdownCoordinator } from './runtime/ServerShutdownCoordinator';
import {
  bindServerRuntimeReadiness,
  clearServerRuntimeReadiness,
} from './services/ServerRuntimeReadiness';

class Application {
  private app: Express;
  private config: ReturnType<typeof getConfig>;
  private server: http.Server | null = null;
  private canonicalRuntime: ServerCanonicalRuntime | null = null;
  private shutdownCoordinator: ServerShutdownCoordinator | null = null;

  constructor() {
    this.app = express();
    this.config = getConfig();
  }

  async initialize(): Promise<void> {
    try {
      // Setup middleware
      this.setupMiddleware();

      // Setup routes
      this.setupRoutes();

      // Setup error handling
      this.setupErrorHandling();

      // Initialize services
      await this.initializeServices();

      logger.info('Application initialized successfully');
    } catch (error) {
      await this.stop().catch((shutdownError) => {
        logger.error('Failed to clean up after initialization failure:', shutdownError);
      });
      throw error;
    }
  }

  private setupMiddleware(): void {
    // Security middleware
    this.app.use(
      helmet({
        contentSecurityPolicy: false, // Disable for API
      })
    );

    // CORS
    this.app.use(
      cors({
        origin: '*', // Configure for production
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key', 'Idempotency-Key'],
      })
    );

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use(requestLogger);

    // Rate limiting must run before routes; middleware registered after the
    // terminal 404/error handlers can never protect successful requests.
    const limiter = createApiRateLimiter(this.config.rateLimit);
    if (limiter) this.app.use(limiter);
  }

  private setupRoutes(): void {
    const apiPrefix = this.config.app.apiPrefix;

    // API routes
    this.app.use(apiPrefix, routes);

    // Root endpoint - redirect to status page
    this.app.get('/', (_req, res) => {
      res.redirect(`${apiPrefix}/status/page`);
    });
  }

  private setupErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(errorHandler);
  }

  private async initializeServices(): Promise<void> {
    logger.info('Initializing services...');

    // Initialize runtime storage connections
    await initializeDatabases();

    // Seed local accounts as soon as persistence is ready. Single-user mode
    // creates only the owner account; multi-user dev mode keeps admin/test.
    await this.initializeLocalUsers();

    // Initialize LLM Manager
    await initializeLLM();

    // Fail-fast guard: if the configured default provider didn't initialize
    // (typically missing API key), fall back to any provider that did so chat
    // calls don't 500 with "No adapter available for provider: X". The
    // previous behaviour was to silently boot with a broken default.
    await this.ensureDefaultProviderAvailable();

    // Establish the canonical Event authority before any subsystem can emit
    // lifecycle facts. Migration and bounded replay must complete first.
    await this.initializeCanonicalRuntime();

    // Initialize the unique canonical Memory application service after its
    // storage dependencies and Event fact store are ready.
    await initializeServerMemoryComposition(this.canonicalRuntime!.get().events);

    // Bind every Memory-capable Server subsystem to that same service instance.
    getMemoryApplicationService('tool');
    getMemoryApplicationService('workflow');
    getMemoryApplicationService('harness');

    // Initialize Skill Manager
    await initializeSkillManager();

    // Initialize Tool Manager
    await initializeToolManager();

    // Recover persisted Tool invocations after their adapters are available.
    await getEventRuntime().recoverToolInvocations();

    // Initialize Workflow Engine
    await initializeWorkflowEngine();

    // Initialize Prompt Manager
    await initializePromptManager();

    // Compose the canonical execution graph only after every adapter, Skill,
    // Tool, Workflow, and Prompt dependency is ready. Worker startup performs
    // an initial durable sweep and fails closed before /ready can return 200.
    await this.activateCanonicalExecution();

    logger.info('All services initialized');
  }

  private async activateCanonicalExecution(): Promise<void> {
    const runtime = this.canonicalRuntime;
    if (!runtime) {
      throw new Error('Canonical Runtime Event authority is not initialized');
    }
    const adapters = getEventRuntime().canonicalExecutionAdapters();
    const cancellations = runtime.composeCancellations({
      activities: adapters.cancellationActivities,
      children: adapters.cancellationChildren,
    });
    const workers = runtimeConfig().canonical.workers;
    const production = createServerProductionRuntime({
      ...adapters,
      cancellations,
      workerId: workers.workerId,
      leaseTtlMs: workers.leaseTtlMs,
      pageLimit: workers.pageLimit,
      timerPollIntervalMs: workers.timerPollIntervalMs,
      timerErrorBackoffMs: workers.timerErrorBackoffMs,
      recoveryPollIntervalMs: workers.recoveryPollIntervalMs,
      recoveryErrorBackoffMs: workers.recoveryErrorBackoffMs,
      autoRecoverReasons: workers.autoRecoverReasons,
    });
    const composition = runtime.composeRuntime(production.execution);
    const commands = await createServerProductionSessionCommands({
      queue: composition.sessionQueue,
      artifactRoot: workers.commandArtifactRoot,
      workerId: `${workers.workerId}:commands`,
      leaseMs: workers.commandLeaseMs,
      pollIntervalMs: workers.commandPollIntervalMs,
      errorBackoffMs: workers.commandErrorBackoffMs,
      renewalIntervalMs: workers.commandRenewalIntervalMs,
      maxHandlerDurationMs: workers.commandMaxHandlerDurationMs,
      shutdownDrainMs: workers.commandShutdownDrainMs,
      startRun: (input, runId) => getEventRuntime().startRunWithId(input, runId),
      onError: (error) => logger.error('Session Command worker polling failed', error),
    });
    getEventRuntime().bindSessionCommandIngress(commands);
    const active = await runtime.startWorkers({
      ...production.workers,
      commands: { runtime: commands },
    });
    logger.info('Canonical Runtime durable workers activated', {
      workers: active.status(),
    });
    const readiness = runtime.executionReadiness();
    if (!readiness.ready) {
      logger.warn('Canonical Runtime remains unavailable for execution traffic', { readiness });
    }
  }

  private async initializeCanonicalRuntime(): Promise<void> {
    const legacyEvents = createServerCompatibilityEventStore();
    const limits = runtimeConfig().canonical;
    const runtime = new ServerCanonicalRuntime({
      filename: serverRuntimeEventDatabasePath(),
      legacyEvents,
      maxLegacyEvents: limits.maxLegacyEvents,
      auditLimits: {
        pageSize: limits.auditPageSize,
        pageMaxBytes: limits.auditPageMaxBytes,
        maxEvents: limits.auditMaxEvents,
        maxBytes: limits.auditMaxBytes,
        maxDurationMs: limits.auditMaxDurationMs,
      },
    });
    try {
      const composition = await runtime.initialize();
      initializeEventRuntime({
        events: composition.events,
        eventDbPath: serverRuntimeEventDatabasePath(),
        humanWaits: composition.humanWaits,
        cancellations: { cancel: (command) => runtime.cancel(command) },
      });
      this.canonicalRuntime = runtime;
      bindServerRuntimeReadiness(() => runtime.executionReadiness());
      logger.info('Canonical Runtime initialized', {
        migratedEvents: composition.migration.migratedEvents,
        alreadyCanonicalEvents: composition.migration.alreadyCanonicalEvents,
      });
    } catch (error) {
      await runtime.close();
      throw error;
    }
  }

  private async initializeLocalUsers(): Promise<void> {
    try {
      if (this.config.auth.mode === 'single-user') {
        await initSingleUserOwner();
        return;
      }

      if (this.config.app.env !== 'production') {
        await initDevAdminUser();
        await initDevTestUser();
      }
    } catch (err) {
      logger.warn('Local user initialization failed:', err);
    }
  }

  private async ensureDefaultProviderAvailable(): Promise<void> {
    const llm = getLLMManager();
    const wanted = llm.getDefaultProvider();
    const available = llm.getAvailableProviders();

    if (available.length === 0) {
      logger.warn(
        'No LLM providers initialized — chat endpoints will fail until an API key is configured.'
      );
      return;
    }

    if (!llm.isProviderAvailable(wanted)) {
      const fallback = available[0];
      logger.warn(
        `Configured defaultProvider="${wanted}" is not initialized (missing API key?). ` +
          `Falling back to "${fallback}". Set llm.defaultProvider in config.yaml to silence this warning.`
      );
      await llm.setDefaultProvider(fallback);
    }
  }

  async start(): Promise<void> {
    const { host, port } = this.config.app;
    await new Promise<void>((resolve, reject) => {
      const server = this.app.listen(port, host);
      this.server = server;
      const onError = (error: Error) => {
        server.off('listening', onListening);
        this.server = null;
        reject(error);
      };
      const onListening = () => {
        server.off('error', onError);
        resolve();
      };
      server.once('error', onError);
      server.once('listening', onListening);
    });
    logger.info(`Server started`, {
      host,
      port,
      env: this.config.app.env,
      url: `http://${host}:${port}`,
    });

    await this.startupHealthCheck(host, port);
  }

  private async startupHealthCheck(host: string, port: number): Promise<void> {
    const baseUrl = formatLocalHealthBaseUrl(host, port);
    const apiBase = `${baseUrl}${this.config.app.apiPrefix}`;
    const checks: { name: string; status: 'pass' | 'fail'; detail?: string }[] = [];

    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    logger.info('🔍  Starting health checks...');
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // 1. Check document storage
    try {
      const dbHealth = await checkStorageHealth();
      if (dbHealth.mongodb) {
        checks.push({
          name: 'Document Store',
          status: 'pass',
          detail: 'MongoDB connected',
        });
        logger.info('  ✅ Document   │ MongoDB connected');
      } else {
        checks.push({
          name: 'Document Store',
          status: 'fail',
          detail: 'MongoDB disconnected',
        });
        logger.error('  ❌ Document   │ MongoDB disconnected');
      }
    } catch (err) {
      checks.push({ name: 'Document Store', status: 'fail', detail: String(err) });
      logger.error('  ❌ Document   │ Error:', err);
    }

    // 2. Check messaging storage
    try {
      const dbHealth = await checkStorageHealth();
      if (dbHealth.redis) {
        checks.push({
          name: 'Messaging Store',
          status: 'pass',
          detail: 'Redis connected',
        });
        logger.info('  ✅ Messaging  │ Redis connected');
      } else {
        checks.push({
          name: 'Messaging Store',
          status: 'fail',
          detail: 'Redis disconnected',
        });
        logger.error('  ❌ Messaging  │ Redis disconnected');
      }
    } catch (err) {
      checks.push({ name: 'Messaging Store', status: 'fail', detail: String(err) });
      logger.error('  ❌ Messaging  │ Error:', err);
    }

    // 3. Check canonical Memory composition and its active provider.
    try {
      const memoryReadiness = await getServerMemoryComposition().readiness();
      checks.push({
        name: 'Memory',
        status: memoryReadiness.ready ? 'pass' : 'fail',
        detail:
          memoryReadiness.message ??
          `${memoryReadiness.state}/${memoryReadiness.providerStatus ?? 'unavailable'}`,
      });
      if (memoryReadiness.ready) {
        logger.info(`  Memory      | ${memoryReadiness.providerStatus}`);
      } else {
        logger.error(`  Memory      | ${memoryReadiness.state}`);
      }
    } catch (err) {
      const safeError = sanitizeServerMemoryOperationalError(err);
      checks.push({ name: 'Memory', status: 'fail', detail: safeError });
      logger.error('  Memory      | Error:', safeError);
    }

    // 4. Check both the canonical Event authority and the executable Runtime.
    // Event-store health alone must never be reported as continuous execution
    // readiness when the graph or durable workers have not been started.
    try {
      const runtimeHealth = await this.canonicalRuntime?.get().backbone.eventStore.health();
      const execution = this.canonicalRuntime?.executionReadiness();
      const eventStoreHealthy = runtimeHealth?.status === 'healthy';
      const healthy = eventStoreHealthy && execution?.ready === true;
      checks.push({
        name: 'Runtime',
        status: healthy ? 'pass' : 'fail',
        detail: !eventStoreHealthy
          ? (runtimeHealth?.message ?? runtimeHealth?.status ?? 'Event authority not initialized')
          : (execution?.message ?? 'Runtime execution state is unavailable'),
      });
      if (healthy) {
        logger.info('  ✅ Runtime     │ Canonical execution workers ready');
      } else {
        logger.error(
          `  ❌ Runtime     │ ${
            !eventStoreHealthy
              ? 'Canonical Event store unavailable'
              : (execution?.message ?? 'Execution state unavailable')
          }`
        );
      }
    } catch (err) {
      checks.push({ name: 'Runtime', status: 'fail', detail: String(err) });
      logger.error('  ❌ Runtime     │ Error:', err);
    }

    // 5. Check the API readiness endpoint. `/health` is deliberately only a
    // liveness probe and must not be used as release or traffic readiness.
    try {
      const response = await fetch(`${apiBase}/ready`);
      if (response.ok) {
        checks.push({ name: 'API /ready', status: 'pass', detail: '200 OK' });
        logger.info('  ✅ API Ready  │ 200 OK');
      } else {
        checks.push({
          name: 'API /ready',
          status: 'fail',
          detail: `${response.status}`,
        });
        logger.error(`  ❌ API Ready  │ ${response.status}`);
      }
    } catch (err) {
      checks.push({ name: 'API /ready', status: 'fail', detail: String(err) });
      logger.error('  ❌ API Ready  │ Error:', err);
    }

    // 6. Check LLM Providers
    try {
      const llmManager = getLLMManager();
      const llmHealth = await llmManager.healthCheck();
      const healthyProviders = Object.entries(llmHealth)
        .filter(([, healthy]) => healthy)
        .map(([name]) => name);

      if (healthyProviders.length > 0) {
        checks.push({
          name: 'LLM Providers',
          status: 'pass',
          detail: healthyProviders.join(', '),
        });
        logger.info(`  ✅ LLM         │ ${healthyProviders.join(', ')}`);
      } else {
        checks.push({
          name: 'LLM Providers',
          status: 'fail',
          detail: 'No providers available',
        });
        logger.warn('  ⚠️  LLM         │ No providers available (check API keys)');
      }
    } catch (err) {
      checks.push({
        name: 'LLM Providers',
        status: 'fail',
        detail: String(err),
      });
      logger.error('  ❌ LLM         │ Error:', err);
    }

    // Summary
    const passed = checks.filter((c) => c.status === 'pass').length;
    const failed = checks.filter((c) => c.status === 'fail').length;

    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (failed === 0) {
      logger.info(`🚀  All systems ready! (${passed}/${checks.length} checks passed)`);
      logger.info(`📖  API Docs: ${apiBase}/docs`);
      logger.info(`📊  Status:   ${apiBase}/status/page`);
      logger.info(`💰  Usage:    ${apiBase}/usage/page`);

      // Dev mode: print local credentials for quick CLI/API testing.
      if (this.config.app.env === 'development') {
        try {
          if (this.config.auth.mode === 'single-user') {
            const ownerCreds = await initSingleUserOwner();
            if (ownerCreds) {
              logger.info('🔐  [Single User Mode] Owner Account Ready:');
              logger.info(`    Email:    ${ownerCreds.email}`);
              const ownerToken = await getSingleUserToken();
              if (ownerToken) {
                logger.info('');
                logger.info(`    Client usage: POST ${apiBase}/dev/token returns token`);
                logger.info('    Credentials and tokens are intentionally not printed.');
              }
            }
          } else {
            const adminCreds = await initDevAdminUser();
            if (adminCreds) {
              logger.info('🔐  [Dev Mode] Admin Account Ready:');
              logger.info(`    Email:    ${adminCreds.email}`);
              logger.info('    Password: configured in env or config; not printed.');
            }
            logger.info('');

            const devCreds = await initDevTestUser();
            if (devCreds) {
              logger.info('');
              logger.info('🔧  [Dev Mode] Test User Ready:');
              logger.info(`    Email:    ${devCreds.email}`);
              const devToken = await getDevTestToken();
              if (devToken) {
                logger.info('');
                logger.info(`    Client usage: POST ${apiBase}/dev/token returns token`);
                logger.info('    Credentials and tokens are intentionally not printed.');
              }
            }
          }
        } catch (err) {
          logger.warn('    ⚠️  Local user init failed:', err);
        }
      }
    } else {
      logger.warn(`⚠️   ${failed} check(s) failed! (${passed}/${checks.length} passed)`);
      logger.warn(`🔧  Review logs above for details`);
    }
    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  }

  async stop(): Promise<void> {
    logger.info('Shutting down...');
    if (!this.shutdownCoordinator) {
      this.shutdownCoordinator = new ServerShutdownCoordinator({
        stopIntake: async () => {
          if (!this.server) return;
          const server = this.server;
          await new Promise<void>((resolve, reject) => {
            server.close((error) => (error ? reject(error) : resolve()));
          });
          this.server = null;
        },
        drainWorkersAndReleaseLeases: async () => {
          // Memory workers may emit terminal lifecycle facts while draining,
          // so the canonical Event authority must outlive Memory shutdown.
          await closeServerMemoryComposition();
          destroyEventRuntime();
          await this.canonicalRuntime?.close();
          this.canonicalRuntime = null;
          clearServerRuntimeReadiness();
        },
        closeServicesAndConnections: async () => {
          await destroyLLM();
          await destroySkillManager();
          await destroyToolManager();
          await destroyWorkflowEngine();
          await destroyPromptManager();
          await closeDatabases();
        },
      });
    }
    await this.shutdownCoordinator.stop();
    logger.info('Shutdown complete');
  }

  getApp(): Express {
    return this.app;
  }
}

// Create application instance
const app = new Application();

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM received');
  await app.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT received');
  await app.stop();
  process.exit(0);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection at:', promise, 'reason:', reason);
});

// Start the application
async function main() {
  try {
    await app.initialize();
    await app.start();
  } catch (error) {
    logger.error('Failed to start application:', error);
    await app.stop().catch((shutdownError) => {
      logger.error('Failed to clean up after startup failure:', shutdownError);
    });
    process.exit(1);
  }
}

// Only auto-start when invoked as the entrypoint (npm run dev / node dist/apps/server/app.js).
// Imported (e.g. by tests/supertest) the app instance is exported for the caller
// to drive directly without booting the listener.
if (require.main === module) {
  main();
}

export default app;
