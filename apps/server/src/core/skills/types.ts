import { ISkillContext, IMessage } from '../../types';

// Skill configuration
export interface SkillConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  triggers: SkillTrigger[];
  priority: number; // Higher = runs first
}

export interface SkillTrigger {
  type: 'keyword' | 'regex' | 'intent' | 'always';
  pattern: string;
}

// Skill context
export interface SkillContext {
  userId: string;
  sessionId: string;
  conversationId?: string;
  messages: IMessage[];
  currentMessage: IMessage;
  variables: Record<string, any>;
  metadata: {
    modelId?: string;
    modelProvider?: string;
    agentId?: string;
    [key: string]: any;
  };
}

// Skill result
export interface SkillResult {
  success: boolean;
  output?: string;
  modifiedContent?: string;
  newMessages?: IMessage[];
  variables?: Record<string, any>;
  metadata?: Record<string, any>;
  error?: string;
  shouldContinue: boolean;
}

// Skill interface
export interface ISkill {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly triggers: SkillTrigger[];
  readonly priority: number;

  // Execute the skill
  execute(context: SkillContext): Promise<SkillResult>;

  // Lifecycle hooks
  onLoad?(): Promise<void>;
  onUnload?(): Promise<void>;
  onError?(error: Error): void;
}

// Base skill class
export abstract class BaseSkill implements ISkill {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly version: string;

  triggers: SkillTrigger[] = [];
  priority: number = 0;

  async execute(context: SkillContext): Promise<SkillResult> {
    try {
      return await this.run(context);
    } catch (error) {
      return {
        success: false,
        shouldContinue: true,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  protected abstract run(context: SkillContext): Promise<SkillResult>;

  async onLoad?(): Promise<void>;
  async onUnload?(): Promise<void>;
  onError?(error: Error): void;
}

// Skill manager types
export interface SkillManagerConfig {
  autoLoad: boolean;
  configPath: string;
}

export interface SkillRegistration {
  skill: ISkill;
  config: SkillConfig;
}
