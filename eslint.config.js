/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable import/no-named-as-default-member */

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
// @ts-expect-error no types
import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

export default [
  {
    ignores: [
      '.git/*',
      '.svelte-kit/*',
      '.vscode/*',
      '.yarn/*',
      '.yarnrc.yml',
      'build/*',
      'coverage/*',
      'node_modules/*',
      'package/*',
      'src/js/api/client/*',
      'static/built/*',
      'static/styleguide/*',
      'yarn.lock',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  ...svelte.configs['flat/recommended'],
  ...svelte.configs['flat/prettier'],
  prettier,
  {
    files: ['**/*.{js,mjs,cjs,svelte,ts,cts,mts}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        project: ['tsconfig.json', 'test/tsconfig.json'],
        extraFileExtensions: ['.svelte'],
      },
    },
    plugins: { 'simple-import-sort': simpleImportSort },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['tsconfig.json', 'test/tsconfig.json'],
        },
      },
    },
    rules: {
      'no-warning-comments': ['warn', { terms: ['todo', 'fixme', '@@@'] }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import/first': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/order': 'off',
    },
  },
  {
    files: ['**/*.svelte', '*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        svelteConfig,
      },
    },
  },
  {
    files: ['src/**/*.{js,mjs,cjs,svelte,ts,cts,mts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },
  {
    files: ['test/**/*.spec.{js,ts}'],
    languageOptions: {
      globals: {
        ...vitest.environments?.env?.globals,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs?.recommended?.rules,
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
