// Global types for OrbitAgent

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Base types
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditable {
  createdBy?: string;
  updatedBy?: string;
}

// Message types
export type MessageRole = 'system' | 'user' | 'assistant' | 'function';

export interface IMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface IConversation {
  id: string;
  userId: string;
  sessionId: string;
  agentId: string;
  modelId: string;
  modelProvider: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    title?: string;
    tags?: string[];
    [key: string]: any;
  };
}

// Session types
export interface ISession {
  id: string;
  userId: string;
  conversationId: string;
  createdAt: Date;
  lastActivityAt: Date;
  metadata?: Record<string, any>;
}

// API Response types
export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    pageSize?: number;
    total?: number;
    [key: string]: any;
  };
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Stream types
export interface IStreamChunk {
  type: 'content' | 'tool_call' | 'tool_result' | 'error' | 'done';
  content?: string;
  toolCall?: {
    name: string;
    input: any;
  };
  toolResult?: any;
  error?: string;
}

// Tool types
export interface IToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, any>;
}

export interface IToolCall {
  id: string;
  name: string;
  input: any;
  result?: any;
  error?: string;
}

// Skill types
export interface ISkillTrigger {
  type: 'keyword' | 'regex' | 'intent';
  pattern: string | RegExp;
}

export interface ISkillContext {
  userId: string;
  sessionId: string;
  conversation: IConversation;
  currentMessage: IMessage;
  variables: Record<string, any>;
}

// Pagination
export interface IPaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Filter types
export interface IDateRangeFilter {
  startDate?: Date;
  endDate?: Date;
}

// Health check
export interface IHealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  services: {
    mongodb: boolean;
    redis: boolean;
    llm: Record<string, boolean>;
  };
  uptime: number;
  timestamp: Date;
}
