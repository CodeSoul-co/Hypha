import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
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
  private templateDir: string;
  private cacheEnabled: boolean;
  private cache: Map<string, string> = new Map();

  constructor(templateDir?: string, cacheEnabled?: boolean) {
    this.templateDir = templateDir || path.resolve(process.cwd(), 'prompts');
    this.cacheEnabled = cacheEnabled ?? true;
  }

  async initialize(): Promise<void> {
    await this.loadTemplatesFromDir();
    logger.info('PromptManager initialized', { templateCount: this.templates.size });
  }

  async destroy(): Promise<void> {
    this.templates.clear();
    this.cache.clear();
    logger.info('PromptManager destroyed');
  }

  register(template: PromptTemplate): void {
    const key = this.getTemplateKey(template.id, template.category);
    this.templates.set(key, template);
    logger.info(`Prompt template registered: ${template.id} (${template.category})`);
  }

  unregister(id: string, category?: string): boolean {
    const key = this.getTemplateKey(id, category || 'common');
    const result = this.templates.delete(key);

    // Also clear from cache
    this.cache.delete(key);

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

  render(id: string, variables: Record<string, any>, category?: string): string {
    const key = this.getTemplateKey(id, category || 'common');

    // Check cache first
    if (this.cacheEnabled && this.cache.has(key)) {
      return this.replaceVariables(this.cache.get(key)!, variables);
    }

    const template = this.templates.get(key);
    if (!template) {
      throw new Error(`Prompt template not found: ${id}`);
    }

    // Cache the rendered result if caching is enabled
    if (this.cacheEnabled) {
      this.cache.set(key, template.content);
    }

    return this.replaceVariables(template.content, {
      ...this.getDefaultVariables(template),
      ...variables,
    });
  }

  renderWithValidation(id: string, variables: Record<string, any>, category?: string): {
    success: boolean;
    result?: string;
    errors?: string[];
  } {
    const errors: string[] = [];
    const template = this.get(id, category);

    if (!template) {
      return { success: false, errors: [`Template not found: ${id}`] };
    }

    // Validate required variables
    for (const variable of template.variables) {
      if (variable.required && (variables[variable.name] === undefined || variables[variable.name] === null)) {
        if (variable.default === undefined) {
          errors.push(`Required variable missing: ${variable.name}`);
        }
      }
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    try {
      const result = this.render(id, variables, category);
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
        result = result.replace(new RegExp(`\\{\\{${name}\\}\\}`, 'g'), stringValue);

        // Handle ${variable} format
        result = result.replace(new RegExp(`\\$\\{${name}\\}`, 'g'), stringValue);

        // Handle $variable format (simple)
        result = result.replace(new RegExp(`\\$${name}\\b`, 'g'), stringValue);
      }
    }

    // Remove any remaining unresolved variables (optional)
    result = result.replace(/\{\{[^}]+\}\}/g, '');
    result = result.replace(/\$\{[^}]+\}/g, '');

    return result;
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

        const files = fs.readdirSync(categoryDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml') || f.endsWith('.md'));

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
    await this.loadTemplatesFromDir();
    logger.info('Prompt templates reloaded');
  }
}

// Singleton instance
let promptManagerInstance: PromptManager | null = null;

export function getPromptManager(): PromptManager {
  if (!promptManagerInstance) {
    const config = getConfig();
    promptManagerInstance = new PromptManager(
      config.prompts.templatesPath,
      config.prompts.cacheEnabled
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

export default PromptManager;
