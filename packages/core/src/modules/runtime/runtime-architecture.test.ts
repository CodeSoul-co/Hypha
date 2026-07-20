import fs from 'fs/promises';
import path from 'path';
import { describe, expect, it } from 'vitest';

const forbiddenImports = [
  {
    label: 'another Hypha owner package',
    pattern: /from\s+['"]@hypha\/(?:tools|memory|fsm|inference|testing|harness)(?:\/[^'"]*)?['"]/u,
  },
  {
    label: 'Server implementation',
    pattern: /from\s+['"][^'"]*apps[\\/]server(?:[\\/][^'"]*)?['"]/u,
  },
  {
    label: 'provider or storage SDK',
    pattern:
      /from\s+['"](?:openai|@anthropic-ai\/sdk|@google\/generative-ai|mongoose|ioredis)['"]/u,
  },
] as const;

describe('Runtime owner architecture', () => {
  it('keeps Runtime independent from App, provider, and Fixture Replay implementations', async () => {
    const entries = await fs.readdir(__dirname, { withFileTypes: true });
    const files = entries
      .filter(
        (entry) => entry.isFile() && entry.name.endsWith('.ts') && !entry.name.endsWith('.test.ts')
      )
      .map((entry) => entry.name)
      .sort();
    const violations: string[] = [];

    for (const file of files) {
      const source = await fs.readFile(path.join(__dirname, file), 'utf8');
      for (const rule of forbiddenImports) {
        if (rule.pattern.test(source)) violations.push(`${file}: ${rule.label}`);
      }
      if (/\bprojectReplay\b/u.test(source)) {
        violations.push(`${file}: legacy Fixture Replay projection`);
      }
    }

    expect(files).toContain('runtime-replay-service.ts');
    expect(files).toContain('runtime-query-service.ts');
    expect(violations).toEqual([]);
  });
});
