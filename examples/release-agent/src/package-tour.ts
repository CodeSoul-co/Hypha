import { buildReleaseAgent } from './agent';
import { runAllFeatureExamples } from './features';

async function tourPackages() {
  const features = await runAllFeatureExamples();
  const releaseAgent = await buildReleaseAgent();

  return {
    packages: 15,
    features,
    composedAgent: releaseAgent.agent.id,
  };
}

tourPackages()
  .then((result) => {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
