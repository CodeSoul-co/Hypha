import type { DomainPackSpec } from './index';

const readTool = (id: string, scope: string, description: string) => ({
  id,
  version: '1.0.0',
  name: id,
  description,
  inputSchema: { type: 'object' as const },
  outputSchema: { type: 'object' as const },
  sideEffectLevel: 'read' as const,
  permissionScope: [scope],
});

/** A product-facing Domain Pack with narrow evidence tools and reviewed publication. */
export const researchEvidenceDomainPackExample: DomainPackSpec = {
  id: 'domain.research-evidence',
  version: '1.0.0',
  name: 'Research Evidence Review',
  description: 'Collect cited evidence, review the exact draft, then publish once.',
  taskSchemas: [
    {
      id: 'task.research-brief',
      version: '1.0.0',
      taskType: 'research_brief',
      inputSchema: {
        type: 'object',
        required: ['question'],
        properties: {
          question: { type: 'string', minLength: 1, maxLength: 10_000 },
          audience: { type: 'string', maxLength: 256 },
        },
        additionalProperties: false,
      },
      acceptanceCriteriaSchema: {
        type: 'object',
        required: ['minimumSources'],
        properties: { minimumSources: { type: 'integer', minimum: 1, maximum: 100 } },
        additionalProperties: false,
      },
      outputContractRef: 'output.research-brief',
      defaultWorkflowRef: 'workflow.research-evidence',
      riskProfile: {
        defaultRiskLevel: 'medium',
        escalationPolicyRef: 'policy.research-publish',
      },
    },
  ],
  outputContracts: [
    {
      id: 'output.research-brief',
      version: '1.0.0',
      schema: {
        type: 'object',
        required: ['answer', 'citations', 'limitations'],
        properties: {
          answer: { type: 'string' },
          citations: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              required: ['title', 'url', 'retrievedAt'],
              properties: {
                title: { type: 'string' },
                url: { type: 'string' },
                retrievedAt: { type: 'string' },
              },
              additionalProperties: false,
            },
          },
          limitations: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    },
  ],
  allowedPromptRefs: [
    { id: 'prompt.research.system', version: '1.0.0', required: true, priority: 0 },
    { id: 'prompt.research.citations', version: '1.0.0', required: true, priority: 10 },
  ],
  defaultPromptRefs: [
    { id: 'prompt.research.system', version: '1.0.0', required: true, priority: 0 },
  ],
  tools: [
    readTool('family.data.query', 'data.query', 'Read bounded evidence datasets.'),
    readTool('family.document.parse', 'document.parse', 'Parse source documents.'),
    readTool('family.git.inspect', 'git.read', 'Inspect repository evidence.'),
    {
      id: 'family.messaging.send',
      version: '1.0.0',
      name: 'family.messaging.send',
      description: 'Publish the approved brief and retain a provider receipt.',
      inputSchema: { type: 'object' },
      outputSchema: { type: 'object' },
      sideEffectLevel: 'external_effect',
      permissionScope: ['messaging.send'],
      humanApprovalPolicy: {
        required: true,
        reason: 'Publishing a research brief is an external side effect.',
      },
      idempotencyPolicy: { mode: 'required' },
    },
  ],
  policies: [
    {
      id: 'policy.research-publish',
      version: '1.0.0',
      defaultEffect: 'deny',
      rules: [
        {
          id: 'policy.research-publish.read',
          version: '1.0.0',
          effect: 'allow',
          sideEffectLevels: ['read'],
          scopes: ['data.query', 'document.parse', 'git.read'],
        },
        {
          id: 'policy.research-publish.external',
          version: '1.0.0',
          effect: 'require_human_review',
          sideEffectLevels: ['external_effect'],
          scopes: ['messaging.send'],
        },
      ],
    },
  ],
  workflows: [
    {
      id: 'workflow.research-evidence',
      version: '1.0.0',
      initialState: 'Intake',
      terminalStates: ['Completed', 'Failed'],
      states: [
        {
          id: 'Intake',
          goal: 'Validate the question and acceptance criteria.',
          allowedTools: [],
          requiredPromptRefs: [
            { id: 'prompt.research.system', version: '1.0.0', required: true },
          ],
        },
        {
          id: 'Research',
          goal: 'Collect bounded, provenance-bearing evidence.',
          allowedTools: ['family.data.query', 'family.document.parse', 'family.git.inspect'],
          permissionScopes: ['data.query', 'document.parse', 'git.read'],
          policyRefs: ['policy.research-publish'],
          capabilityLoadPolicy: 'lazy',
        },
        {
          id: 'Draft',
          goal: 'Produce a cited draft that conforms to the output contract.',
          allowedTools: [],
          requiredPromptRefs: [
            { id: 'prompt.research.citations', version: '1.0.0', required: true },
          ],
        },
        {
          id: 'HumanReview',
          goal: 'Approve the exact cited draft hash.',
          allowedTools: [],
          humanReviewPolicy: {
            required: true,
            reason: 'A reviewer must approve the exact cited draft before publication.',
            approverRole: 'research-publisher',
            timeoutPolicy: { timeoutMs: 86_400_000, onTimeout: 'fail' },
          },
        },
        {
          id: 'Publish',
          goal: 'Publish once and persist the provider receipt.',
          allowedTools: ['family.messaging.send'],
          permissionScopes: ['messaging.send'],
          policyRefs: ['policy.research-publish'],
        },
        { id: 'Completed', goal: 'Return the published, cited research brief.' },
        { id: 'Failed', goal: 'Terminate with durable failure evidence.' },
      ],
      transitions: [
        { from: 'Intake', to: 'Research' },
        { from: 'Research', to: 'Draft' },
        { from: 'Draft', to: 'HumanReview' },
        { from: 'HumanReview', to: 'Publish', guard: 'review.approved == true' },
        { from: 'HumanReview', to: 'Failed', guard: 'review.approved == false' },
        { from: 'Publish', to: 'Completed' },
      ],
    },
  ],
  defaultWorkflow: 'workflow.research-evidence',
  metadata: {
    example: true,
    ownerBranch: 'domain-tools',
    publicationRequiresReceipt: true,
  },
};
