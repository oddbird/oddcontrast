module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json', 'test/tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  plugins: ['simple-import-sort', 'import', 'svelte3', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  settings: {
    'svelte3/typescript': true,
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json', 'test/tsconfig.json'],
      },
    },
  },
  rules: {
    'import/order': 0,
    'simple-import-sort/imports': 1,
    'sort-imports': 0,
    'no-warning-comments': [
      1,
      {
        terms: ['todo', 'fixme', '@@@'],
      },
    ],
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
  },
};
