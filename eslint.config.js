/* eslint-disable import-x/no-named-as-default-member */

import js from '@eslint/js';
import { loadConfig } from '@sveltejs/load-config';
import tsParser from '@typescript-eslint/parser';
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

const loadedConfig = await loadConfig('./', { traverse: false });
if (!loadedConfig) {
  throw new Error('No Svelte config found');
}
if ('error' in loadedConfig) {
  throw new Error(
    `Failed to load Svelte config from ${loadedConfig.configFilePath}`,
    { cause: loadedConfig.error },
  );
}
const svelteConfig = loadedConfig.config;

export default defineConfig([
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
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
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
      'import-x/resolver': {
        typescript: {
          project: 'tsconfig.json',
        },
      },
    },
    rules: {
      'no-warning-comments': ['warn', { terms: ['todo', 'fixme', '@@@'] }],
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-duplicates': ['error', { 'prefer-inline': true }],
      'import-x/order': 'off',
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
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs?.recommended?.rules,
      '@typescript-eslint/unbound-method': 'off',
    },
  },
]);
