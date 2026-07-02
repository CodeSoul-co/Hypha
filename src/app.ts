import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import http from 'http';

import { getConfig } from './config';
import { logger } from './utils/logger';
import { initializeDatabases, closeDatabases, checkDatabasesHealth } from './services/database';
import { initializeLLM, destroyLLM, getLLMManager } from './core/llm/LLMFactory';
import { initializeSkillManager, destroySkillManager } from './core/skills/SkillManager';
import { initializeToolManager, destroyToolManager } from './core/tools/ToolManager';
import { initializeWorkflowEngine, destroyWorkflowEngine } from './core/workflow/WorkflowEngine';
import { initializePromptManager, destroyPromptManager } from './core/prompts/PromptManager';
import { getTemporaryMemory } from './core/memory/TemporaryMemory';
import { getPermanentMemory } from './core/memory/PermanentMemory';
import { initDevTestUser, initDevAdminUser, getDevTestToken } from './services/DevAuth';
import routes from './routes';
import { errorHandler, notFoundHandler, requestLogger, rateLimitHandler } from './middleware/errorHandler';
import { HTTP_STATUS } from './constants';

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
    this.app.use(helmet({
      contentSecurityPolicy: false, // Disable for API
    }));

    // CORS
    this.app.use(cors({
      origin: '*', // Configure for production
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    }));

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

    // Initialize databases
    await initializeDatabases();

    // Seed development/test users as soon as persistence is ready. This keeps
    // app.initialize() and app.start() behavior consistent.
    await this.initializeDevUsers();

    // Initialize LLM Manager
    await initializeLLM();

    // Fail-fast guard: if the configured default provider didn't initialize
    // (typically missing API key), fall back to any provider that did so chat
    // calls don't 500 with "No adapter available for provider: X". The
    // previous behaviour was to silently boot with a broken default.
    this.ensureDefaultProviderAvailable();

    // Initialize Memory
    const tempMemory = getTemporaryMemory();
    await tempMemory.startCleanup();

    // Initialize Skill Manager
    await initializeSkillManager();

    // Initialize Tool Manager
    await initializeToolManager();

    // Initialize Workflow Engine
    await initializeWorkflowEngine();

    // Initialize Prompt Manager
    await initializePromptManager();

    logger.info('All services initialized');
  }

  private async initializeDevUsers(): Promise<void> {
    if (this.config.app.env === 'production') return;

    try {
      await initDevAdminUser();
      await initDevTestUser();
    } catch (err) {
      logger.warn('Dev user initialization failed:', err);
    }
  }

  private ensureDefaultProviderAvailable(): void {
    const llm = getLLMManager();
    const wanted = llm.getDefaultProvider();
    const available = llm.getAvailableProviders();

    if (available.length === 0) {
      logger.warn('No LLM providers initialized — chat endpoints will fail until an API key is configured.');
      return;
    }

    if (!llm.isProviderAvailable(wanted)) {
      const fallback = available[0];
      logger.warn(
        `Configured defaultProvider="${wanted}" is not initialized (missing API key?). ` +
        `Falling back to "${fallback}". Set llm.defaultProvider in config.yaml to silence this warning.`
      );
      llm.setDefaultProvider(fallback).catch(err =>
        logger.error('Failed to set fallback default provider:', err)
      );
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

    // 1. Check MongoDB
    try {
      const dbHealth = await checkDatabasesHealth();
      if (dbHealth.mongodb) {
        checks.push({ name: 'MongoDB', status: 'pass', detail: 'Connected' });
        logger.info('  ✅ MongoDB    │ Connected');
      } else {
        checks.push({ name: 'MongoDB', status: 'fail', detail: 'Disconnected' });
        logger.error('  ❌ MongoDB    │ Disconnected');
      }
    } catch (err) {
      checks.push({ name: 'MongoDB', status: 'fail', detail: String(err) });
      logger.error('  ❌ MongoDB    │ Error:', err);
    }

    // 2. Check Redis
    try {
      const dbHealth = await checkDatabasesHealth();
      if (dbHealth.redis) {
        checks.push({ name: 'Redis', status: 'pass', detail: 'Connected' });
        logger.info('  ✅ Redis      │ Connected');
      } else {
        checks.push({ name: 'Redis', status: 'fail', detail: 'Disconnected' });
        logger.error('  ❌ Redis      │ Disconnected');
      }
    } catch (err) {
      checks.push({ name: 'Redis', status: 'fail', detail: String(err) });
      logger.error('  ❌ Redis      │ Error:', err);
    }

    // 3. Check API /health endpoint
    try {
      const response = await fetch(`${apiBase}/health`);
      if (response.ok) {
        checks.push({ name: 'API /health', status: 'pass', detail: '200 OK' });
        logger.info('  ✅ API Health │ 200 OK');
      } else {
        checks.push({ name: 'API /health', status: 'fail', detail: `${response.status}` });
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
        checks.push({ name: 'LLM Providers', status: 'pass', detail: healthyProviders.join(', ') });
        logger.info(`  ✅ LLM         │ ${healthyProviders.join(', ')}`);
      } else {
        checks.push({ name: 'LLM Providers', status: 'fail', detail: 'No providers available' });
        logger.warn('  ⚠️  LLM         │ No providers available (check API keys)');
      }
    } catch (err) {
      checks.push({ name: 'LLM Providers', status: 'fail', detail: String(err) });
      logger.error('  ❌ LLM         │ Error:', err);
    }

    // Summary
    const passed = checks.filter(c => c.status === 'pass').length;
    const failed = checks.filter(c => c.status === 'fail').length;

    logger.info('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    if (failed === 0) {
      logger.info(`🚀  All systems ready! (${passed}/${checks.length} checks passed)`);
      logger.info(`📖  API Docs: ${apiBase}/docs`);
      logger.info(`📊  Status:   ${apiBase}/status/page`);
      logger.info(`💰  Usage:    ${apiBase}/usage/page`);

      // Dev mode: init admin + test user and print credentials
      if (this.config.app.env === 'development') {
        try {
          // Seed admin account
          const adminCreds = await initDevAdminUser();
          if (adminCreds) {
            logger.info('🔐  [Dev Mode] Admin Account Ready:');
            logger.info(`    Email:    ${adminCreds.email}`);
            logger.info(`    Password:  ${adminCreds.password}`);
          }
          logger.info('');

          const devCreds = await initDevTestUser();
          if (devCreds) {
            logger.info('');
            logger.info('🔧  [Dev Mode] Test User Ready:');
            logger.info(`    Email:    ${devCreds.email}`);
            logger.info(`    Password:  ${devCreds.password}`);
            const devToken = await getDevTestToken();
            if (devToken) {
              logger.info(`    Token:    ${devToken}`);
              logger.info('');
              logger.info(`    Client usage: POST ${apiBase}/dev/token returns token`);
              logger.info(`    Or use:   Authorization: Bearer ${devToken}`);
            }
          }
        } catch (err) {
          logger.warn('    ⚠️  Dev test user init failed:', err);
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

// Only auto-start when invoked as the entrypoint (npm run dev / node dist/app.js).
// Imported (e.g. by tests/supertest) the app instance is exported for the caller
// to drive directly without booting the listener.
if (require.main === module) {
  main();
}

export default app;
