import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';

describe('Mem0 OSS local deployment template', () => {
  it('pins upstream source and storage while keeping auth and loopback binding enabled', () => {
    const composePath = resolve(process.cwd(), 'configs/memory/mem0-oss/compose.yaml');
    const compose = parse(readFileSync(composePath, 'utf8')) as {
      services: Record<string, Record<string, unknown>>;
    };
    const mem0 = compose.services.mem0 as {
      build: { context: string; dockerfile: string };
      ports: string[];
      environment: Record<string, string>;
      volumes: string[];
    };
    const postgres = compose.services.postgres as { image: string };

    expect(mem0.build).toEqual({
      context: 'https://github.com/mem0ai/mem0.git#b357a5a1b03c299ec8229c268e63cfac0f7c6566',
      dockerfile: 'server/dev.Dockerfile',
    });
    expect(mem0.ports).toContain('127.0.0.1:${HYPHA_MEM0_OSS_PORT:-8888}:8000');
    expect(mem0.volumes).toContain('mem0-history:/app/history');
    expect(mem0.environment).toMatchObject({
      ADMIN_API_KEY: '${HYPHA_MEM0_OSS_API_KEY:?set HYPHA_MEM0_OSS_API_KEY}',
      AUTH_DISABLED: 'false',
      OPENAI_BASE_URL: '${OPENAI_BASE_URL:-https://api.openai.com/v1}',
      MEM0_DEFAULT_LLM_MODEL: '${MEM0_DEFAULT_LLM_MODEL:-openai/gpt-4.1-nano}',
      MEM0_DEFAULT_EMBEDDER_MODEL: '${MEM0_DEFAULT_EMBEDDER_MODEL:-openai/text-embedding-3-small}',
      MEM0_TELEMETRY: '${MEM0_TELEMETRY:-false}',
    });
    expect(postgres.image).toMatch(/^pgvector\/pgvector:pg17@sha256:[a-f0-9]{64}$/u);
  });
});
