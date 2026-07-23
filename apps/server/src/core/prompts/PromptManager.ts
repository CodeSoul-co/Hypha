import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import {
  AgentPromptRegistry,
  type AgentPromptResolutionContext,
  type AgentPromptRef,
  type AgentPromptResolution,
  type AgentPromptSpec,
} from '@hypha/inference';
import { logger } from '../../utils/logger';
import { getConfig } from '../../config';

// Prompt template types
export interface PromptTemplate {
  id: string;
  name: string;
  description?: string;
  category: 'system' | 'user' | 'assistant' | 'common';
  content: string;
  variables: PromptVariable[];
  metadata?: Record<string, any>;
}

export interface PromptVariable {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description?: string;
  required: boolean;
  default?: any;
}

// Prompt manager
export class PromptManager {
  private templates: Map<string, PromptTemplate> = new Map();
  private readonly agentPrompts = new AgentPromptRegistry();
  private readonly dynamicAgentPromptKeys = new Set<string>();
  private templateDir: string;
  private registryPath: string;
  private cacheEnabled: boolean;
  private cache: Map<string, string> = new Map();
  private initialized = false;

  constructor(templateDir?: string, cacheEnabled?: boolean, registryPath?: string) {
    this.templateDir = templateDir || path.resolve(process.cwd(), 'apps/server/src/prompts');
    this.cacheEnabled = cacheEnabled ?? true;
    this.registryPath = registryPath || path.resolve(process.cwd(), 'data/prompts/registry.json');
  }

  async initialize(): Promise<void> {
    await this.loadTemplatesFromDir();
    await this.loadPersistentAgentPrompts();
    this.initialized = true;
    logger.info('PromptManager initialized', { templateCount: this.templates.size });
  }

  async ensureInitialized(): Promise<void> {
    if (this.initialized) return;
    await this.initialize();
  }

  async destroy(): Promise<void> {
    this.templates.clear();
    for (const prompt of this.agentPrompts.list()) {
      this.agentPrompts.unregister(prompt.id, prompt.version);
    }
    this.cache.clear();
    this.dynamicAgentPromptKeys.clear();
    this.initialized = false;
    logger.info('PromptManager destroyed');
  }

  register(template: PromptTemplate): void {
    const key = this.getTemplateKey(template.id, template.category);
    this.templates.set(key, template);
    const agentPrompt = toAgentPromptSpec(template);
    if (agentPrompt) this.agentPrompts.register(agentPrompt, { replace: true });
    logger.info(`Prompt template registered: ${template.id} (${template.category})`);
  }

  unregister(id: string, category?: string): boolean {
    const key = this.getTemplateKey(id, category || 'common');
    const result = this.templates.delete(key);

    // Also clear from cache
    this.cache.delete(key);
    this.agentPrompts.unregister(id);

    return result;
  }

  get(id: string, category?: string): PromptTemplate | null {
    const key = this.getTemplateKey(id, category || 'common');
    return this.templates.get(key) || null;
  }

  list(category?: string): PromptTemplate[] {
    const templates: PromptTemplate[] = [];

    for (const template of this.templates.values()) {
      if (!category || template.category === category) {
        templates.push(template);
      }
    }

    return templates;
  }

  async registerAgentPrompt(
    spec: AgentPromptSpec,
    options: { expectedRevision?: number } = {}
  ): Promise<AgentPromptSpec> {
    const stored = this.agentPrompts.register(spec, {
      replace: options.expectedRevision !== undefined,
      expectedRevision: options.expectedRevision,
    });
    this.dynamicAgentPromptKeys.add(this.agentPromptKey(stored));
    await this.persistAgentPrompts();
    return stored;
  }

  async unregisterAgentPrompt(id: string, version?: string): Promise<boolean> {
    const removed = this.agentPrompts.unregister(id, version);
    if (!removed) return false;
    if (version) this.dynamicAgentPromptKeys.delete(`${id}@${version}`);
    else {
      for (const key of this.dynamicAgentPromptKeys) {
        if (key.startsWith(`${id}@`)) this.dynamicAgentPromptKeys.delete(key);
      }
    }
    await this.persistAgentPrompts();
    return true;
  }

  listAgentPrompts(): AgentPromptSpec[] {
    return this.agentPrompts.list();
  }

  resolveAgentPrompts(
    refs: AgentPromptRef[],
    context: AgentPromptResolutionContext
  ): AgentPromptResolution {
    return this.agentPrompts.resolve(refs, context);
  }

  render(id: string, variables: Record<string, any>, category?: string): string {
    const key = this.getTemplateKey(id, category || 'common');

    const template = this.templates.get(key);
    if (!template) {
      throw new Error(`Prompt template not found: ${id}`);
    }

    if (this.cacheEnabled && !this.cache.has(key)) {
      this.cache.set(key, template.content);
    }

    const content = this.cacheEnabled ? this.cache.get(key)! : template.content;
    return this.replaceVariables(content, this.getRenderVariables(template, variables));
  }

  renderWithValidation(
    id: string,
    variables: Record<string, any>,
    category?: string
  ): {
    success: boolean;
    result?: string;
    errors?: string[];
  } {
    const errors: string[] = [];
    const template = this.get(id, category);

    if (!template) {
      return { success: false, errors: [`Template not found: ${id}`] };
    }

    const renderVariables = this.getRenderVariables(template, variables);

    for (const variable of template.variables) {
      if (
        variable.required &&
        (renderVariables[variable.name] === undefined ||
          renderVariables[variable.name] === null ||
          renderVariables[variable.name] === '')
      ) {
        errors.push(`Required variable missing: ${variable.name}`);
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    try {
      const result = this.replaceVariables(template.content, renderVariables);
      const unresolved = this.findUnresolvedVariables(result);
      if (unresolved.length > 0) {
        return {
          success: false,
          errors: unresolved.map((name) => `Unresolved variable: ${name}`),
        };
      }
      return { success: true, result };
    } catch (error) {
      return { success: false, errors: [error instanceof Error ? error.message : String(error)] };
    }
  }

  private replaceVariables(template: string, variables: Record<string, any>): string {
    let result = template;

    // Replace {{variable}} and ${variable} patterns
    for (const [name, value] of Object.entries(variables)) {
      if (value !== undefined && value !== null) {
        const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

        // Handle {{variable}} format
        const escapedName = escapeRegExp(name);
        result = result.replace(new RegExp(`\\{\\{\\s*${escapedName}\\s*\\}\\}`, 'g'), stringValue);

        // Handle ${variable} format
        result = result.replace(new RegExp(`\\$\\{\\s*${escapedName}\\s*\\}`, 'g'), stringValue);

        // Handle $variable format (simple)
        result = result.replace(new RegExp(`\\$${escapedName}\\b`, 'g'), stringValue);
      }
    }

    return result;
  }

  private getRenderVariables(
    template: PromptTemplate,
    variables: Record<string, any>
  ): Record<string, any> {
    const resolved = {
      ...this.getDefaultVariables(template),
      ...variables,
    };

    for (const variable of template.variables) {
      if (
        !variable.required &&
        resolved[variable.name] === undefined &&
        variable.default === undefined
      ) {
        resolved[variable.name] = '';
      }
    }

    return resolved;
  }

  private findUnresolvedVariables(rendered: string): string[] {
    const names = new Set<string>();
    for (const match of rendered.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g)) {
      names.add(match[1].trim());
    }
    for (const match of rendered.matchAll(/\$\{\s*([^}]+?)\s*\}/g)) {
      names.add(match[1].trim());
    }
    return Array.from(names).sort();
  }

  private getDefaultVariables(template: PromptTemplate): Record<string, any> {
    const defaults: Record<string, any> = {};

    for (const variable of template.variables) {
      if (variable.default !== undefined) {
        defaults[variable.name] = variable.default;
      }
    }

    return defaults;
  }

  private getTemplateKey(id: string, category: string): string {
    return `${category}:${id}`;
  }

  private async loadTemplatesFromDir(): Promise<void> {
    try {
      const categories = ['system', 'user', 'assistant', 'common'];

      for (const category of categories) {
        const categoryDir = path.join(this.templateDir, category);

        if (!fs.existsSync(categoryDir)) {
          continue;
        }

        const files = fs
          .readdirSync(categoryDir)
          .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml') || f.endsWith('.md'));

        for (const file of files) {
          try {
            const filePath = path.join(categoryDir, file);
            const content = fs.readFileSync(filePath, 'utf-8');

            if (file.endsWith('.yaml') || file.endsWith('.yml')) {
              const template = yaml.load(content) as PromptTemplate;
              if (template && template.id) {
                template.category = category as PromptTemplate['category'];
                this.register(template);
              }
            } else if (file.endsWith('.md')) {
              // Markdown files are treated as simple templates
              const id = path.basename(file, '.md');
              const template: PromptTemplate = {
                id,
                name: id,
                category: category as PromptTemplate['category'],
                content,
                variables: [],
              };
              this.register(template);
            }
          } catch (error) {
            logger.error(`Failed to load template from ${file}:`, error);
          }
        }
      }
    } catch (error) {
      logger.error('Failed to load templates from directory:', error);
    }
  }

  async reload(): Promise<void> {
    this.templates.clear();
    this.cache.clear();
    for (const prompt of this.agentPrompts.list()) {
      this.agentPrompts.unregister(prompt.id, prompt.version);
    }
    await this.loadTemplatesFromDir();
    await this.loadPersistentAgentPrompts();
    logger.info('Prompt templates reloaded');
  }

  private agentPromptKey(spec: Pick<AgentPromptSpec, 'id' | 'version'>): string {
    return `${spec.id}@${spec.version}`;
  }

  private async loadPersistentAgentPrompts(): Promise<void> {
    let raw: string;
    try {
      raw = await fsp.readFile(this.registryPath, 'utf8');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return;
      throw error;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed))
      throw new Error('Persisted agent prompt registry must be an array.');
    for (const candidate of parsed) {
      const stored = this.agentPrompts.register(candidate as AgentPromptSpec, { replace: true });
      this.dynamicAgentPromptKeys.add(this.agentPromptKey(stored));
    }
  }

  private async persistAgentPrompts(): Promise<void> {
    const prompts = this.agentPrompts
      .list()
      .filter((prompt) => this.dynamicAgentPromptKeys.has(this.agentPromptKey(prompt)));
    const directory = path.dirname(this.registryPath);
    await fsp.mkdir(directory, { recursive: true, mode: 0o700 });
    const temporary = `${this.registryPath}.${process.pid}.${Date.now()}.tmp`;
    await fsp.writeFile(temporary, `${JSON.stringify(prompts, null, 2)}\n`, {
      encoding: 'utf8',
      mode: 0o600,
      flag: 'wx',
    });
    await fsp.rename(temporary, this.registryPath);
  }
}

function toAgentPromptSpec(template: PromptTemplate): AgentPromptSpec | null {
  if (template.category !== 'system' && template.category !== 'common') return null;
  const metadata = template.metadata ?? {};
  return {
    id: template.id,
    version: typeof metadata.version === 'string' ? metadata.version : '1.0.0',
    name: template.name,
    description: template.description,
    role: template.category === 'system' ? 'system' : 'developer',
    template: template.content,
    variables: template.variables.map((variable) => ({
      name: variable.name,
      type: variable.type,
      description: variable.description,
      required: variable.required,
      default: variable.default,
    })),
    stable: typeof metadata.stable === 'boolean' ? metadata.stable : true,
    cacheable: typeof metadata.cacheable === 'boolean' ? metadata.cacheable : true,
    metadata,
  };
}

// Singleton instance
let promptManagerInstance: PromptManager | null = null;

export function getPromptManager(): PromptManager {
  if (!promptManagerInstance) {
    const config = getConfig();
    promptManagerInstance = new PromptManager(
      config.prompts.templatesPath,
      config.prompts.cacheEnabled,
      config.prompts.registryPath
    );
  }
  return promptManagerInstance;
}

export async function initializePromptManager(): Promise<PromptManager> {
  const manager = getPromptManager();
  await manager.initialize();
  return manager;
}

export async function destroyPromptManager(): Promise<void> {
  if (promptManagerInstance) {
    await promptManagerInstance.destroy();
    promptManagerInstance = null;
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default PromptManager;
