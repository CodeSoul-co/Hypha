import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  WorkflowDefinition,
  WorkflowStage,
  WorkflowExecution,
  WorkflowExecutionContext,
  StageResult,
  IWorkflowEngine,
} from './types';
import { getSkillManager } from '../skills/SkillManager';
import { getToolManager } from '../tools/ToolManager';
import { getLLMManager } from '../llm/LLMFactory';
import { logger } from '../../utils/logger';
import { generateId, now } from '../../utils/helpers';
import { LLMMessage } from '../llm/types';

export class WorkflowEngine implements IWorkflowEngine {
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private executions: Map<string, WorkflowExecution> = new Map();
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
        this.loadWorkflowsFromDir(true).catch(err => {
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

    // Cancel all running executions
    for (const [id, execution] of this.executions) {
      if (execution.status === 'running') {
        execution.status = 'cancelled';
        execution.completedAt = now();
      }
    }

    this.executions.clear();
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

    // Normalize context so stage handlers can safely call .map/.push on
    // messages/variables/metadata without null-checks. Callers may pass only
    // a partial context (e.g. { input: "hi" }) — we fill in the rest.
    const normalizedContext: WorkflowExecutionContext = {
      userId: context.userId || 'anonymous',
      sessionId: context.sessionId || generateId(),
      conversationId: context.conversationId,
      messages: Array.isArray(context.messages) ? context.messages : [],
      variables: {
        ...workflow.variables,
        ...(context.variables || {}),
      },
      metadata: context.metadata || {},
    };

    // If the caller passed an `input` string instead of full messages,
    // synthesize a single user turn so the LLM stage has something to work on.
    const rawInput = (context as any).input;
    if (typeof rawInput === 'string' && normalizedContext.messages.length === 0) {
      normalizedContext.messages.push({
        id: generateId(),
        role: 'user',
        content: rawInput,
        timestamp: now(),
      });
    }

    const execution: WorkflowExecution = {
      id: generateId(),
      workflowName: workflow.name,
      workflowVersion: workflow.version,
      status: 'pending',
      context: normalizedContext,
      stageResults: new Map(),
      startedAt: now(),
    };

    this.executions.set(execution.id, execution);
    execution.status = 'running';

    logger.info(`Starting workflow execution: ${workflowName}`, { executionId: execution.id });

    try {
      await this.executeStages(workflow, execution);
      execution.status = 'completed';
      execution.completedAt = now();
      logger.info(`Workflow completed: ${workflowName}`, { executionId: execution.id });
    } catch (error: any) {
      execution.status = 'failed';
      execution.error = error.message;
      execution.completedAt = now();
      logger.error(`Workflow failed: ${workflowName}`, { executionId: execution.id, error: error.message });
    }

    return execution;
  }

  async cancel(executionId: string): Promise<void> {
    const execution = this.executions.get(executionId);
    if (execution && execution.status === 'running') {
      execution.status = 'cancelled';
      execution.completedAt = now();
      logger.info(`Workflow cancelled: ${executionId}`);
    }
  }

  getExecution(executionId: string): WorkflowExecution | null {
    return this.executions.get(executionId) || null;
  }

  private async executeStages(workflow: WorkflowDefinition, execution: WorkflowExecution): Promise<void> {
    let currentStageId: string | undefined = workflow.stages[0]?.id;
    const visitedStages = new Set<string>();

    while (currentStageId && currentStageId !== 'end' && execution.status === 'running') {
      // Prevent infinite loops
      if (visitedStages.has(currentStageId)) {
        throw new Error(`Circular dependency detected in workflow: ${currentStageId}`);
      }
      visitedStages.add(currentStageId);

      const stage = workflow.stages.find(s => s.id === currentStageId);
      if (!stage) {
        throw new Error(`Stage not found: ${currentStageId}`);
      }

      execution.currentStage = currentStageId;
      logger.debug(`Executing stage: ${stage.id} (${stage.type})`, { executionId: execution.id });

      const startTime = Date.now();

      try {
        const result = await this.executeStage(stage, execution);

        const stageResult: StageResult = {
          stageId: stage.id,
          success: result.success,
          // Coerce stage output/metadata through a safe path — LLM adapters may
          // attach raw axios responses to errors that contain circular refs;
          // storing them as-is would later crash res.json() in the workflow
          // route handler ("Converting circular structure to JSON").
          output: this.safeSerialize(result.output),
          error: typeof result.error === 'string' ? result.error : result.error ? String(result.error) : undefined,
          duration: Date.now() - startTime,
          metadata: this.safeSerialize(result.metadata),
        };

        execution.stageResults.set(stage.id, stageResult);

        if (!result.success && stage.onError === 'stop') {
          // Coerce — result.error from an LLM stage can be a raw axios error
          // whose `.message` triggers circular-JSON when interpolated.
          const errMsg = stageResult.error || 'Stage failed';
          throw new Error(errMsg);
        }

        currentStageId = result.nextStage || stage.next || 'end';
      } catch (error: any) {
        execution.stageResults.set(stage.id, {
          stageId: stage.id,
          success: false,
          error: error.message,
          duration: Date.now() - startTime,
        });

        if (stage.onError === 'stop' || !stage.next) {
          throw error;
        }

        currentStageId = stage.onError || 'end';
      }
    }
  }

  private async executeStage(
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{
    success: boolean;
    output?: any;
    error?: string;
    nextStage?: string;
    metadata?: Record<string, any>;
  }> {
    // Resolve ${env.VAR} / ${VAR} / {{VAR}} in stage fields once, then dispatch
    // on the resolved stage. This is what lets `model: ${env.AGENT_DEFAULT_MODEL}`
    // in a workflow YAML actually substitute the agent's configured model.
    const resolvedStage = this.resolveStage(stage, execution.context.variables);
    switch (resolvedStage.type) {
      case 'preprocessor':
      case 'postprocessor':
        return this.executeSkillStage(resolvedStage, execution);

      case 'llm':
        return this.executeLLMStage(resolvedStage, execution);

      case 'tool-call':
        return this.executeToolStage(resolvedStage, execution);

      case 'conditional':
        return this.executeConditionalStage(resolvedStage, execution);

      case 'end':
        return { success: true, output: null, nextStage: 'end' };

      default:
        return { success: false, error: `Unknown stage type: ${resolvedStage.type}` };
    }
  }

  private async executeSkillStage(
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: any; error?: string; nextStage?: string }> {
    if (!stage.skills || stage.skills.length === 0) {
      return { success: true, nextStage: stage.next };
    }

    const skillManager = getSkillManager();
    const lastOutput: any = null;

    for (const skillId of stage.skills) {
      const skill = skillManager.getSkill(skillId);
      if (!skill) {
        logger.warn(`Skill not found: ${skillId}`);
        continue;
      }

      const result = await skill.run({
        userId: execution.context.userId,
        sessionId: execution.context.sessionId,
        conversationId: execution.context.conversationId,
        messages: execution.context.messages,
        // Fallback to an empty user turn so skills that read .currentMessage
        // don't crash on workflows started without any history.
        currentMessage: execution.context.messages[execution.context.messages.length - 1] || {
          id: generateId(),
          role: 'user',
          content: '',
          timestamp: now(),
        },
        variables: execution.context.variables,
        metadata: execution.context.metadata,
      });

      if (result.success) {
        execution.context.variables = { ...execution.context.variables, ...result.variables };
      } else {
        return { success: false, error: result.error };
      }
    }

    return { success: true, nextStage: stage.next };
  }

  private async executeLLMStage(
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: any; error?: string; nextStage?: string }> {
    const llmManager = getLLMManager();

    // Convert messages to LLM format
    const messages: LLMMessage[] = execution.context.messages.map(msg => ({
      role: msg.role as LLMMessage['role'],
      content: msg.content,
    }));

    // Add system prompt if specified
    const options: any = {};
    if (stage.prompt) {
      options.systemPrompt = this.resolveVariables(stage.prompt, execution.context.variables);
    }

    try {
      // Resolve ${env.VAR} / ${defaultModel} in the model field — executeStage's
      // resolveStage does this too, but executeLLMStage reads stage.model
      // directly so we re-resolve here to be safe.
      const llm = getLLMManager();
      const resolveVars: Record<string, any> = {
        defaultProvider: llm.getDefaultProvider(),
        defaultModel: llm.getDefaultModel(),
        ...execution.context.variables,
      };
      const resolvedModel = stage.model
        ? this.resolveVariables(stage.model, resolveVars)
        : undefined;
      const response = await llmManager.chat(messages, {
        ...options,
        model: resolvedModel,
      });

      // Add response to context
      execution.context.messages.push({
        id: generateId(),
        role: 'assistant',
        content: response.content,
        timestamp: now(),
      });

      return {
        success: true,
        output: response.content,
        nextStage: stage.next,
        metadata: { usage: response.usage },
      } as { success: boolean; output?: any; error?: string; nextStage?: string; metadata?: any };
    } catch (error: any) {
      // LLM adapters may throw axios errors with non-string `.message` that
      // contain circular refs (request ↔ response). Force to a clean string.
      const msg = typeof error?.message === 'string'
        ? error.message
        : (error instanceof Error ? error.toString() : 'LLM stage failed');
      return { success: false, error: msg };
    }
  }

  private async executeToolStage(
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: any; error?: string; nextStage?: string }> {
    if (!stage.tools || stage.tools.length === 0) {
      return { success: true, nextStage: stage.next };
    }

    const toolManager = getToolManager();

    for (const toolName of stage.tools) {
      const params = this.resolveVariables(
        execution.context.variables.toolParams || {},
        execution.context.variables
      );

      const result = await toolManager.executeTool(toolName, params);

      if (result.success) {
        execution.context.variables.toolResults = {
          ...execution.context.variables.toolResults,
          [toolName]: result.output,
        };
      } else {
        return { success: false, error: result.error };
      }
    }

    return { success: true, nextStage: stage.next };
  }

  private async executeConditionalStage(
    stage: WorkflowStage,
    execution: WorkflowExecution
  ): Promise<{ success: boolean; output?: any; error?: string; nextStage?: string }> {
    if (!stage.condition || !stage.branches) {
      return { success: true, nextStage: stage.next };
    }

    // Evaluate condition
    const conditionMet = this.evaluateCondition(stage.condition, execution.context.variables);

    // Find matching branch
    const branch = stage.branches.find(b =>
      b.condition === 'true' && conditionMet ||
      b.condition === 'false' && !conditionMet
    ) || stage.branches.find(b => b.condition === 'default');

    if (branch) {
      return { success: true, nextStage: branch.then };
    }

    return { success: true, nextStage: stage.next };
  }

  private evaluateCondition(condition: string, variables: Record<string, any>): boolean {
    // Simple condition evaluation
    try {
      // Replace variable references
      let expr = condition;
      for (const [key, value] of Object.entries(variables)) {
        expr = expr.replace(new RegExp(`\\$${key}`, 'g'), JSON.stringify(value));
      }

      // Evaluate as expression
      return !!eval(expr);
    } catch {
      logger.warn(`Failed to evaluate condition: ${condition}`);
      return false;
    }
  }

  private resolveVariables(template: any, variables: Record<string, any>): any {
    if (typeof template === 'string') {
      // Lookup order:
      //   ${env.NAME}  → process.env.NAME
      //   ${name}      → process.env.name (uppercase) if set, else variables[name]
      //   $name        → same as ${name} (bare-dollar form)
      //   {{name}}     → variables[name]
      // ${name} / $name also fall back to env so authors don't have to type
      // `env.` for UPPER_SNAKE_CASE names. Lowercase names (like `defaultModel`)
      // only resolve through `variables` since env vars are conventionally
      // uppercase.
      const lookupVar = (name: string) => {
        if (/^[A-Z][A-Z0-9_]*$/.test(name) && process.env[name] !== undefined) {
          return process.env[name] as string;
        }
        return variables[name] !== undefined ? String(variables[name]) : undefined;
      };
      let result = template.replace(/\$\{env\.([A-Za-z_][A-Za-z0-9_]*)\}/g, (_, name) => {
        return process.env[name] !== undefined ? (process.env[name] as string) : `\${env.${name}}`;
      });
      // Match any ${name} — env, camelCase, snake_case.
      result = result.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g, (m, name) => {
        const v = lookupVar(name);
        return v === undefined ? m : v;
      });
      result = result.replace(/(?<![A-Za-z0-9_])\$([A-Z][A-Z0-9_]*)\b/g, (m, name) => {
        const v = lookupVar(name);
        return v === undefined ? m : v;
      });
      // Finally substitute runtime variables in {{var}} form.
      for (const [key, value] of Object.entries(variables)) {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value));
      }
      return result;
    }

    if (Array.isArray(template)) {
      return template.map(item => this.resolveVariables(item, variables));
    }

    if (template && typeof template === 'object') {
      const result: any = {};
      for (const [key, value] of Object.entries(template)) {
        result[key] = this.resolveVariables(value, variables);
      }
      return result;
    }

    return template;
  }

  /**
   * Resolve placeholders in a stage's static fields (model, prompt, etc.) so
   * workflow YAML can use `${env.VAR}` without callers having to plumb values
   * through execution context. Falls through to existing per-stage variable
   * resolution for content produced at runtime.
   */
  private resolveStage(stage: WorkflowStage, variables: Record<string, any>): WorkflowStage {
    // Merge in framework-level variables (default model, etc.) so workflow
    // YAMLs can reference `${defaultModel}` without authors having to plumb
    // them through the execution context every time.
    const llm = getLLMManager();
    const mergedVars: Record<string, any> = {
      defaultProvider: llm.getDefaultProvider(),
      defaultModel: llm.getDefaultModel(),
      ...variables,
    };
    const resolved: WorkflowStage = { ...stage };
    if (stage.model)   resolved.model   = this.resolveVariables(stage.model, mergedVars);
    if (stage.prompt)  resolved.prompt  = this.resolveVariables(stage.prompt, mergedVars);
    if (stage.condition) resolved.condition = this.resolveVariables(stage.condition, mergedVars);
    if (stage.tools)   resolved.tools   = (stage.tools || []).map(t => this.resolveVariables(t, mergedVars));
    if (stage.skills)  resolved.skills  = (stage.skills || []).map(s => this.resolveVariables(s, mergedVars));
    if (stage.branches) {
      resolved.branches = stage.branches.map(b => ({
        ...b,
        condition: this.resolveVariables(b.condition, mergedVars),
        then: this.resolveVariables(b.then, mergedVars),
      }));
    }
    return resolved;
  }

  /**
   * Strip non-serializable values (functions, circular refs) before storing in
   * stageResults. LLM/HTTP responses can carry axios request/response objects
   * with `req` ↔ `res` cycles that crash JSON.stringify downstream.
   */
  private safeSerialize<T>(value: T): T | undefined {
    if (value === undefined || value === null) return value as any;
    try {
      return JSON.parse(JSON.stringify(value));
    } catch {
      // Fall back to a primitive description so the field is still useful in
      // /workflows/executions/:id rather than blowing up the whole response.
      try { return String(value) as any; } catch { return undefined; }
    }
  }

  private async loadWorkflowsFromDir(isReload = false): Promise<void> {
    try {
      if (!fs.existsSync(this.workflowDir)) {
        if (!isReload) {
          logger.warn(`Workflow directory not found: ${this.workflowDir}`);
        }
        return;
      }

      const files = fs.readdirSync(this.workflowDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

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
