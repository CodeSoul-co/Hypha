import { buildReleaseAgent } from './agent';

async function main(): Promise<void> {
  const { compiled, agent } = await buildReleaseAgent();
  process.stdout.write(
    `${JSON.stringify(
      {
        agent,
        domainPackRef: compiled.bindings.domainPackRef,
        workflowRef: {
          id: compiled.bindings.workflow.id,
          version: compiled.bindings.workflow.version,
        },
        fsmProcess: compiled.fsmProcess,
      },
      null,
      2
    )}\n`
  );
}

void main();
