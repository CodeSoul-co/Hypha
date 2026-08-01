const { createHash } = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');

const instructionPath = process.argv[2];
if (!instructionPath) throw new Error('instruction path is required');

void run();

async function run() {
  const instruction = JSON.parse(await fs.readFile(instructionPath, 'utf8'));
  assertInstruction(instruction);
  const workspaceRoot = path.resolve(instruction.workspaceRoot);
  const stagingPath = path.resolve(instruction.stagingPath);
  const backupPath = path.resolve(instruction.backupPath);
  const journalPath = path.join(
    path.dirname(workspaceRoot),
    `.${path.basename(workspaceRoot)}.restore-journal.json`
  );
  const journalContent = {
    version: 1,
    workspaceName: path.basename(workspaceRoot),
    stagingName: path.basename(stagingPath),
    backupName: path.basename(backupPath),
    operationId: instruction.operationId,
    snapshotRef: instruction.snapshotRef,
    ownerPid: process.pid,
    createdAt: new Date().toISOString(),
    initialTreeHash: instruction.initialTreeHash,
    targetTreeHash: instruction.targetTreeHash,
  };
  const journal = {
    ...journalContent,
    journalHash: `sha256:${createHash('sha256')
      .update(JSON.stringify(journalContent), 'utf8')
      .digest('hex')}`,
  };
  const handle = await fs.open(journalPath, 'wx', 0o600);
  try {
    await handle.writeFile(`${JSON.stringify(journal)}\n`, 'utf8');
    await handle.sync();
  } finally {
    await handle.close();
  }
  await syncParentDirectory(path.dirname(journalPath));

  if (instruction.crashPoint === 'after_journal') {
    signalCrashPoint();
    return;
  }
  await fs.rename(workspaceRoot, backupPath);
  if (instruction.crashPoint === 'after_swap') {
    await fs.rename(stagingPath, workspaceRoot);
  }
  signalCrashPoint();
}

function signalCrashPoint() {
  process.stdout.write('RESTORE_CRASH_POINT_READY\n', () => {
    setInterval(() => undefined, 1_000);
  });
}

function assertInstruction(value) {
  if (
    !value ||
    typeof value !== 'object' ||
    !['after_journal', 'after_backup', 'after_swap'].includes(value.crashPoint)
  ) {
    throw new Error('invalid crash instruction');
  }
  for (const field of [
    'workspaceRoot',
    'stagingPath',
    'backupPath',
    'operationId',
    'snapshotRef',
    'initialTreeHash',
    'targetTreeHash',
  ]) {
    if (typeof value[field] !== 'string' || value[field].length === 0) {
      throw new Error(`invalid crash instruction field: ${field}`);
    }
  }
  const workspaceRoot = path.resolve(value.workspaceRoot);
  const parent = path.dirname(workspaceRoot);
  const workspaceName = path.basename(workspaceRoot);
  const stagingPath = path.resolve(value.stagingPath);
  const backupPath = path.resolve(value.backupPath);
  if (
    path.dirname(stagingPath) !== parent ||
    path.dirname(backupPath) !== parent ||
    !path.basename(stagingPath).startsWith(`.${workspaceName}.restore-`) ||
    backupPath !== `${stagingPath}.previous`
  ) {
    throw new Error('crash instruction paths do not match the restore layout');
  }
}

async function syncParentDirectory(parent) {
  let handle;
  try {
    handle = await fs.open(parent, 'r');
    await handle.sync();
  } catch (error) {
    if (!['EINVAL', 'ENOTSUP', 'EPERM', 'EISDIR'].includes(error && error.code)) throw error;
  } finally {
    await handle?.close();
  }
}
