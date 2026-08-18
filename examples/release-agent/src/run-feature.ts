import { featureExamples, type FeatureExampleName, runFeatureExample } from './features';

async function main(): Promise<void> {
  const requested = process.argv[2] as FeatureExampleName | undefined;
  if (!requested || !(requested in featureExamples)) {
    const available = Object.keys(featureExamples).join(', ');
    throw new Error(`Choose one feature example: ${available}`);
  }

  const result = await runFeatureExample(requested);
  process.stdout.write(`${JSON.stringify({ feature: requested, result }, null, 2)}\n`);
}

void main();
