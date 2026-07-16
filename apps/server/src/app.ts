import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import http from 'http';

import { getConfig } from './config';
import { logger } from './utils/logger';
import { initializeDatabases, closeDatabases, checkStorageHealth } from './services/database';
import { initializeLLM, destroyLLM, getLLMManager } from './core/llm/LLMFactory';
import { initializeSkillManager, destroySkillManager } from './core/skills/SkillManager';
import { initializeToolManager, destroyToolManager } from './core/tools/ToolManager';
import { initializeWorkflowEngine, destroyWorkflowEngine } from './core/workflow/WorkflowEngine';
import { initializePromptManager, destroyPromptManager } from './core/prompts/PromptManager';
import { getTemporaryMemory } from './core/memory/TemporaryMemory';
import { getPermanentMemory } from './core/memory/PermanentMemory';
import {
  initSingleUserOwner,
  getSingleUserToken,
  initDevTestUser,
  initDevAdminUser,
  getDevTestToken,
} from './services/DevAuth';
import routes from './routes';
import {
  errorHandler,
  notFoundHandler,
  requestLogger,
  rateLimitHandler,
} from './middleware/errorHandler';
import { HTTP_STATUS } from './constants';
import { getEventRuntime } from './services/EventRuntime';

class Application {
  private app: Express;
  private config: ReturnType<typeof getConfig>;
  private server: any = null;

  constructor() {
    this.app = express();
    this.config = getConfig();
  }

  async initialize(): Promise<void> {
    // Setup middleware
    this.setupMiddleware();

    // Setup routes
    this.setupRoutes();

    // Setup error handling
    this.setupErrorHandling();

    // Initialize services
    await this.initializeServices();

    logger.info('Application initialized successfully');
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
        allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
      })
    );

    // Compression
    this.app.use(compression());

    // Body parsing
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Request logging
    this.app.use(requestLogger);
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

    // Rate limiting
    if (this.config.rateLimit.enabled) {
      const limiter = rateLimit({
        windowMs: this.config.rateLimit.windowMs,
        max: this.config.rateLimit.max,
        handler: rateLimitHandler,
        standardHeaders: true,
        legacyHeaders: false,
      });

      this.app.use(limiter);
    }
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

    // Initialize Memory
    const tempMemory = getTemporaryMemory();
    await tempMemory.startCleanup();

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

    logger.info('All services initialized');
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

    return new Promise((resolve) => {
      this.server = this.app.listen(port, host, async () => {
        logger.info(`Server started`, {
          host,
          port,
          env: this.config.app.env,
          url: `http://${host}:${port}`,
        });

        // Startup health check
        await this.startupHealthCheck(host, port);

        resolve();
      });
    });
  }

  private async startupHealthCheck(host: string, port: number): Promise<void> {
    const baseUrl = `http://${host}:${port}`;
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

    // 3. Check API /health endpoint
    try {
      const response = await fetch(`${apiBase}/health`);
      if (response.ok) {
        checks.push({ name: 'API /health', status: 'pass', detail: '200 OK' });
        logger.info('  ✅ API Health │ 200 OK');
      } else {
        checks.push({
          name: 'API /health',
          status: 'fail',
          detail: `${response.status}`,
        });
        logger.error(`  ❌ API Health │ ${response.status}`);
      }
    } catch (err) {
      checks.push({ name: 'API /health', status: 'fail', detail: String(err) });
      logger.error('  ❌ API Health │ Error:', err);
    }

    // 4. Check LLM Providers
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

    // Stop accepting new connections
    if (this.server) {
      await new Promise<void>((resolve) => {
        this.server.close(() => resolve());
      });
    }

    // Cleanup services
    await getTemporaryMemory().stopCleanup();
    await destroyLLM();
    await destroySkillManager();
    await destroyToolManager();
    await destroyWorkflowEngine();
    await destroyPromptManager();

    // Close databases
    await closeDatabases();

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
