import { z, type ZodType } from 'zod';
import type { JsonSchema } from '@hypha/core';
import type { ToolCallContext, ToolSpec } from './index';

export type OcrInputSource =
  | { type: 'artifact'; artifactRef: string; mimeType?: string; fileName?: string }
  | { type: 'url'; url: string; mimeType?: string; fileName?: string }
  | { type: 'inline'; dataBase64: string; mimeType: string; fileName?: string }
  | { type: 'text'; text: string; fileName?: string };

export interface OcrRequest {
  source: OcrInputSource;
  languages?: string[];
  pageRange?: { start?: number; end?: number };
  features?: Array<'text' | 'layout' | 'tables' | 'formulas'>;
  output?: { includeBlocks?: boolean; includeConfidence?: boolean; artifactize?: boolean };
  providerHint?: string;
  metadata?: Record<string, unknown>;
}

export interface OcrBoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  unit?: 'pixel' | 'normalized' | 'point';
}

export interface OcrBlock {
  id?: string;
  type: 'text' | 'title' | 'list' | 'table' | 'formula' | 'image' | 'unknown';
  text?: string;
  confidence?: number;
  boundingBox?: OcrBoundingBox;
  metadata?: Record<string, unknown>;
}

export interface OcrPage {
  pageNumber: number;
  text: string;
  confidence?: number;
  width?: number;
  height?: number;
  blocks?: OcrBlock[];
  artifactRefs?: string[];
}

export interface OcrResult {
  status: 'completed' | 'partial' | 'failed';
  provider: string;
  providerVersion?: string;
  text?: string;
  pages: OcrPage[];
  detectedLanguages?: string[];
  artifactRefs?: string[];
  warnings?: string[];
  error?: { code: string; message: string; retryable?: boolean };
  metadata?: Record<string, unknown>;
}

export interface OcrProvider {
  readonly id: string;
  recognize(request: OcrRequest, context?: ToolCallContext): Promise<OcrResult>;
  health?(): Promise<{ status: 'healthy' | 'degraded' | 'unavailable'; message?: string }>;
}

export type VideoSourceKind = 'video' | 'playlist' | 'collection' | 'live' | 'unknown';

export interface VideoSourceRequest {
  url: string;
  titleHint?: string;
  locale?: string;
  includeEpisodes?: boolean;
  includeCaptions?: boolean;
  providerHint?: string;
  metadata?: Record<string, unknown>;
}

export interface VideoSourceEpisode {
  id?: string;
  title: string;
  order: number;
  durationSeconds?: number;
  url?: string;
  thumbnailUrl?: string;
  captionRefs?: string[];
  metadata?: Record<string, unknown>;
}

export interface VideoSourcePreview {
  provider: string;
  sourceKind: VideoSourceKind;
  sourceId?: string;
  canonicalUrl: string;
  title: string;
  description?: string;
  author?: string;
  durationSeconds?: number;
  publishedAt?: string;
  thumbnailUrl?: string;
  episodes: VideoSourceEpisode[];
  parsedAt: string;
  warnings?: string[];
  manualEntryRequired?: boolean;
  metadata?: Record<string, unknown>;
}

export interface VideoSourceProvider {
  readonly id: string;
  supports(url: string): boolean | Promise<boolean>;
  preview(request: VideoSourceRequest, context?: ToolCallContext): Promise<VideoSourcePreview>;
  health?(): Promise<{ status: 'healthy' | 'degraded' | 'unavailable'; message?: string }>;
}

const ocrSourceSchema: ZodType<OcrInputSource> = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('artifact'),
    artifactRef: z.string().min(1),
    mimeType: z.string().optional(),
    fileName: z.string().optional(),
  }),
  z.object({
    type: z.literal('url'),
    url: z.string().url(),
    mimeType: z.string().optional(),
    fileName: z.string().optional(),
  }),
  z.object({
    type: z.literal('inline'),
    dataBase64: z.string().min(1),
    mimeType: z.string().min(1),
    fileName: z.string().optional(),
  }),
  z.object({ type: z.literal('text'), text: z.string(), fileName: z.string().optional() }),
]);

export const ocrRequestSchema = z.object({
  source: ocrSourceSchema,
  languages: z.array(z.string()).optional(),
  pageRange: z
    .object({
      start: z.number().int().positive().optional(),
      end: z.number().int().positive().optional(),
    })
    .optional(),
  features: z.array(z.enum(['text', 'layout', 'tables', 'formulas'])).optional(),
  output: z
    .object({
      includeBlocks: z.boolean().optional(),
      includeConfidence: z.boolean().optional(),
      artifactize: z.boolean().optional(),
    })
    .optional(),
  providerHint: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<OcrRequest>;

export const videoSourceRequestSchema = z.object({
  url: z.string().url(),
  titleHint: z.string().optional(),
  locale: z.string().optional(),
  includeEpisodes: z.boolean().optional(),
  includeCaptions: z.boolean().optional(),
  providerHint: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
}) satisfies ZodType<VideoSourceRequest>;

export const genericOcrInputJsonSchema: JsonSchema = {
  type: 'object',
  required: ['source'],
  additionalProperties: false,
  properties: {
    source: {
      type: 'object',
      required: ['type'],
      properties: {
        type: { enum: ['artifact', 'url', 'inline', 'text'] },
        artifactRef: { type: 'string' },
        url: { type: 'string' },
        dataBase64: { type: 'string' },
        text: { type: 'string' },
        mimeType: { type: 'string' },
        fileName: { type: 'string' },
      },
    },
    languages: { type: 'array', items: { type: 'string' } },
    pageRange: { type: 'object' },
    features: { type: 'array', items: { type: 'string' } },
    output: { type: 'object' },
    providerHint: { type: 'string' },
    metadata: { type: 'object' },
  },
};

export const genericVideoSourceInputJsonSchema: JsonSchema = {
  type: 'object',
  required: ['url'],
  additionalProperties: false,
  properties: {
    url: { type: 'string' },
    titleHint: { type: 'string' },
    locale: { type: 'string' },
    includeEpisodes: { type: 'boolean' },
    includeCaptions: { type: 'boolean' },
    providerHint: { type: 'string' },
    metadata: { type: 'object' },
  },
};

export function createOcrToolSpec(overrides: Partial<ToolSpec> = {}): ToolSpec {
  return {
    id: 'tool.media.ocr',
    version: '1.0.0',
    name: 'media_ocr',
    description: 'Recognize text and optional layout from an approved document or image source.',
    inputSchema: genericOcrInputJsonSchema,
    sideEffectLevel: 'read',
    permissionScope: ['media.ocr.read'],
    source: 'custom',
    tags: ['media', 'ocr', 'document'],
    ...overrides,
  };
}

export function createVideoSourceToolSpec(overrides: Partial<ToolSpec> = {}): ToolSpec {
  return {
    id: 'tool.media.video-source.preview',
    version: '1.0.0',
    name: 'video_source_preview',
    description:
      'Resolve normalized public metadata and episodes from a supported video source URL.',
    inputSchema: genericVideoSourceInputJsonSchema,
    sideEffectLevel: 'read',
    permissionScope: ['media.video.metadata.read'],
    source: 'custom',
    tags: ['media', 'video', 'metadata'],
    ...overrides,
  };
}
