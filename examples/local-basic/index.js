const fs = require('fs');
const os = require('os');
const path = require('path');
const { createFrameworkEvent } = require('@hypha/core');
const { createLocalStorageBackbone } = require('@hypha/adapters-local');

async function main() {
  const rootPath = fs.mkdtempSync(path.join(os.tmpdir(), 'hypha-local-basic-'));
  const storage = createLocalStorageBackbone({
    rootPath,
    sqliteMode: 'sqlite',
  });

  await storage.eventStore.append(
    createFrameworkEvent({
      id: 'run_local_basic:created',
      type: 'run.created',
      runId: 'run_local_basic',
      sessionId: 'session_local_basic',
      payload: { source: 'examples/local-basic' },
    })
  );

  await storage.memory.write(
    { userId: 'owner', sessionId: 'session_local_basic', runId: 'run_local_basic' },
    {
      id: 'memory_local_basic',
      type: 'semantic',
      value: 'hypha local storage backbone is running',
      provenance: { eventId: 'run_local_basic:created' },
      createdAt: new Date().toISOString(),
    },
    { requireProvenance: true }
  );

  const artifact = await storage.artifacts.put(
    'runs/run_local_basic/output.json',
    JSON.stringify({ ok: true }, null, 2),
    { contentType: 'application/json' }
  );

  const events = await storage.eventStore.list({ runId: 'run_local_basic' });
  const memories = await storage.memory.read(
    { userId: 'owner', sessionId: 'session_local_basic', runId: 'run_local_basic' },
    {}
  );

  console.log(
    JSON.stringify(
      {
        rootPath,
        events: events.length,
        memories: memories.length,
        artifact: artifact.path,
        profiles: storage.profiles.map((profile) => profile.id),
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
