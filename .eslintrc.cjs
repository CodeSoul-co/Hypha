module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    es2022: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  ignorePatterns: [
    'dist/',
    'node_modules/',
    'coverage/',
    'logs/',
    'packages/*/dist/',
    'apps/*/dist/',
  ],
  rules: {
    'no-empty': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
};
