import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  WorkflowDefinition,
  WorkflowExecution,
  WorkflowExecutionContext,
  IWorkflowEngine,
} from './types';
import { normalizeWorkflowExecutionContext } from './context';
import { getEventRuntime } from '../../services/EventRuntime';
import { logger } from '../../utils/logger';

export class WorkflowEngine implements IWorkflowEngine {
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private workflowDir: string;
  private autoReload: boolean;
  private reloadInterval: NodeJS.Timeout | null = null;

  constructor(workflowDir?: string, autoReload?: boolean) {
    this.workflowDir = workflowDir || path.resolve(process.cwd(), 'configs/workflows');
    this.autoReload = autoReload ?? true;
  }

  async initialize(): Promise<void> {
    await this.loadWorkflowsFromDir();

    if (this.autoReload) {
      // Set up file watcher for auto-reload in production
      this.reloadInterval = setInterval(() => {
        this.loadWorkflowsFromDir(true).catch((err) => {
          logger.error('Failed to reload workflows:', err);
        });
      }, 60000); // Check every minute
    }

    logger.info('WorkflowEngine initialized', { workflowCount: this.workflows.size });
  }

  async destroy(): Promise<void> {
    if (this.reloadInterval) {
      clearInterval(this.reloadInterval);
      this.reloadInterval = null;
    }

    this.workflows.clear();
    logger.info('WorkflowEngine destroyed');
  }

  loadWorkflow(workflow: WorkflowDefinition, isReload = false): void {
    const key = this.getWorkflowKey(workflow.name, workflow.version);
    this.workflows.set(key, workflow);
    if (isReload) {
      logger.debug(`Workflow reloaded: ${workflow.name} v${workflow.version}`);
    } else {
      logger.info(`Workflow loaded: ${workflow.name} v${workflow.version}`);
    }
  }

  unloadWorkflow(name: string, version?: string): void {
    const key = this.getWorkflowKey(name, version);
    this.workflows.delete(key);
    logger.info(`Workflow unloaded: ${name}`);
  }

  getWorkflow(name: string, version?: string): WorkflowDefinition | null {
    const key = this.getWorkflowKey(name, version);
    let workflow = this.workflows.get(key);

    // If no version specified, find the latest version
    if (!version && !workflow) {
      workflow = this.findLatestWorkflow(name) || undefined;
    }

    return workflow || null;
  }

  listWorkflows(): WorkflowDefinition[] {
    return Array.from(this.workflows.values());
  }

  async execute(
    workflowName: string,
    context: WorkflowExecutionContext,
    version?: string
  ): Promise<WorkflowExecution> {
    const workflow = this.getWorkflow(workflowName, version);
    if (!workflow) {
      throw new Error(`Workflow not found: ${workflowName}`);
    }

    const normalizedContext = normalizeWorkflowExecutionContext(
      workflow,
      context as Parameters<typeof normalizeWorkflowExecutionContext>[1],
      context.userId || 'anonymous'
    );

    const runtime = getEventRuntime();
    const runtimeSpec = runtime.createRuntimeSpecFromWorkflow(workflow);
    const run = await runtime.startRun({
      userId: normalizedContext.userId,
      sessionId: normalizedContext.sessionId,
      workflowRef: { id: workflow.name, version: workflow.version },
      domainPack: runtimeSpec.domainPack,
      fsm: runtimeSpec.fsm,
      input: { workflowName, version, context: normalizedContext },
      metadata: { surface: 'workflow-engine.execute' },
    });
    const execution = await runtime.executeWorkflow({
      runId: run.runId,
      userId: normalizedContext.userId,
      workflow,
      context: normalizedContext,
    });
    return execution;
  }

  private async loadWorkflowsFromDir(isReload = false): Promise<void> {
    try {
      if (!fs.existsSync(this.workflowDir)) {
        if (!isReload) {
          logger.warn(`Workflow directory not found: ${this.workflowDir}`);
        }
        return;
      }

      const files = fs
        .readdirSync(this.workflowDir)
        .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));

      for (const file of files) {
        try {
          const filePath = path.join(this.workflowDir, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const workflow = yaml.load(content) as WorkflowDefinition;

          if (workflow && workflow.name && workflow.stages) {
            this.loadWorkflow(workflow, isReload);
          }
        } catch (error) {
          logger.error(`Failed to load workflow from ${file}:`, error);
        }
      }
    } catch (error) {
      logger.error('Failed to load workflows from directory:', error);
    }
  }

  private getWorkflowKey(name: string, version?: string): string {
    return version ? `${name}:${version}` : name;
  }

  private findLatestWorkflow(name: string): WorkflowDefinition | null {
    let latest: WorkflowDefinition | null = null;

    for (const workflow of this.workflows.values()) {
      if (workflow.name === name) {
        if (!latest || this.compareVersions(workflow.version, latest.version) > 0) {
          latest = workflow;
        }
      }
    }

    return latest;
  }

  private compareVersions(a: string, b: string): number {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);

    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
      const partA = partsA[i] || 0;
      const partB = partsB[i] || 0;
      if (partA > partB) return 1;
      if (partA < partB) return -1;
    }

    return 0;
  }
}

// Singleton instance
let workflowEngineInstance: WorkflowEngine | null = null;

export function getWorkflowEngine(): WorkflowEngine {
  if (!workflowEngineInstance) {
    workflowEngineInstance = new WorkflowEngine();
  }
  return workflowEngineInstance;
}

export async function initializeWorkflowEngine(): Promise<WorkflowEngine> {
  const engine = getWorkflowEngine();
  await engine.initialize();
  return engine;
}

export async function destroyWorkflowEngine(): Promise<void> {
  if (workflowEngineInstance) {
    await workflowEngineInstance.destroy();
    workflowEngineInstance = null;
  }
}

export default WorkflowEngine;
