import { IMessage } from '../../types';

// Temporary memory types (Redis)
export interface TempMessage extends IMessage {
  userId: string;
  sessionId: string;
  modelId?: string;
  modelProvider?: string;
}

export interface TempMemoryOptions {
  maxPairs: number;
  ttl: number;
}

// Permanent memory types (MongoDB)
export interface PermanentConversation {
  id: string;
  userId: string;
  sessionId: string;
  agentId: string;
  modelId: string;
  modelProvider: string;
  title?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

export interface PermanentMessage {
  id: string;
  conversationId: string;
  role: 'system' | 'user' | 'assistant' | 'function';
  content: string;
  timestamp: Date;
  modelId?: string;
  modelProvider?: string;
  tokens?: number;
  attachments?: Attachment[];
  metadata?: Record<string, any>;
}

export interface Attachment {
  type: 'image' | 'file' | 'audio';
  url: string;
  name?: string;
  mimeType?: string;
}

// Memory operations
export interface IMemoryStore {
  addMessage(sessionId: string, message: TempMessage): Promise<void>;
  getMessages(sessionId: string, limit?: number): Promise<TempMessage[]>;
  clearMessages(sessionId: string): Promise<void>;
  getAllSessions(userId: string): Promise<string[]>;
}

export interface IPermanentStore {
  // Conversation operations
  createConversation(conversation: Omit<PermanentConversation, 'id' | 'createdAt' | 'updatedAt'>): Promise<PermanentConversation>;
  getConversation(id: string): Promise<PermanentConversation | null>;
  updateConversation(id: string, updates: Partial<PermanentConversation>): Promise<PermanentConversation | null>;
  deleteConversation(id: string): Promise<boolean>;
  listConversations(userId: string, options?: ListConversationsOptions): Promise<PermanentConversation[]>;

  // Message operations
  addMessage(conversationId: string, message: Omit<PermanentMessage, 'id' | 'conversationId' | 'timestamp'>): Promise<PermanentMessage>;
  getMessages(conversationId: string, options?: ListMessagesOptions): Promise<PermanentMessage[]>;
  deleteMessage(conversationId: string, messageId: string): Promise<boolean>;

  // Search
  searchConversations(userId: string, query: string, options?: SearchOptions): Promise<PermanentConversation[]>;
  searchMessages(userId: string, query: string, options?: SearchOptions): Promise<PermanentMessage[]>;
}

export interface ListConversationsOptions {
  page?: number;
  pageSize?: number;
  agentId?: string;
  isArchived?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface ListMessagesOptions {
  page?: number;
  pageSize?: number;
  startDate?: Date;
  endDate?: Date;
  roles?: Array<'system' | 'user' | 'assistant' | 'function'>;
}

export interface SearchOptions {
  page?: number;
  pageSize?: number;
}
