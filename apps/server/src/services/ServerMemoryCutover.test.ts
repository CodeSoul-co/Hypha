import { readFileSync } from 'fs';
import { resolve } from 'path';

const serverFiles = [
  'apps/server/src/app.ts',
  'apps/server/src/routes/chat.routes.ts',
  'apps/server/src/routes/memory.routes.ts',
];

describe('Server canonical Memory cutover', () => {
  it('keeps legacy Memory implementations out of the product runtime path', () => {
    for (const file of serverFiles) {
      const source = readFileSync(resolve(process.cwd(), file), 'utf8');
      expect(source).not.toMatch(
        /(?:getTemporaryMemory|getPermanentMemory|TemporaryMemory|PermanentMemory)/
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
