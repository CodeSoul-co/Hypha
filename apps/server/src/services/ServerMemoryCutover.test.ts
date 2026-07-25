import { existsSync, readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';

const retiredFiles = [
  'apps/server/src/core/memory/TemporaryMemory.ts',
  'apps/server/src/core/memory/PermanentMemory.ts',
  'apps/server/src/models/Conversation.ts',
  'apps/server/src/services/ServerMemoryMigrationRehearsal.ts',
];

describe('Server canonical Memory cutover', () => {
  it('removes legacy implementations and imports from the Server runtime', () => {
    for (const file of retiredFiles) {
      expect(existsSync(resolve(process.cwd(), file))).toBe(false);
    }

    for (const file of productionTypeScriptFiles(resolve(process.cwd(), 'apps/server/src'))) {
      const source = readFileSync(file, 'utf8');
      expect(source).not.toMatch(
        /(?:getTemporaryMemory|getPermanentMemory|core\/memory\/(?:TemporaryMemory|PermanentMemory)|ServerMemoryMigrationRehearsal)/
      );
    }
  });

  it('binds every required consumer and keeps route mapping free of direct stores', () => {
    const app = readFileSync(resolve(process.cwd(), 'apps/server/src/app.ts'), 'utf8');
    const chat = readFileSync(
      resolve(process.cwd(), 'apps/server/src/routes/chat.routes.ts'),
      'utf8'
    );
    const memoryRoutes = readFileSync(
      resolve(process.cwd(), 'apps/server/src/routes/memory.routes.ts'),
      'utf8'
    );
    const mapping = readFileSync(
      resolve(process.cwd(), 'apps/server/src/services/ServerMemoryOperations.ts'),
      'utf8'
    );

    expect(app).toContain("getMemoryApplicationService('tool')");
    expect(app).toContain("getMemoryApplicationService('workflow')");
    expect(app).toContain("getMemoryApplicationService('harness')");
    expect(chat).toContain("getServerMemoryOperations('chat')");
    expect(memoryRoutes).toContain("getServerMemoryOperations('memory-routes')");
    expect(mapping).not.toMatch(
      /(?:getMongoConnection|getRedisClient|MongoDB|Redis|ProviderRegistry)/
    );
  });
});

function productionTypeScriptFiles(directory: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const candidate = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...productionTypeScriptFiles(candidate));
    } else if (entry.isFile() && candidate.endsWith('.ts') && !candidate.endsWith('.test.ts')) {
      files.push(candidate);
    }
  }
  return files;
}
