import { svelteTesting } from '@testing-library/svelte/vite';
import type { PluginOption } from 'vite';
import {
  coverageConfigDefaults,
  defineConfig,
  mergeConfig,
} from 'vitest/config';

import viteConfig from './vite.config.js';

// Run tests in browser environment
// https://github.com/testing-library/svelte-testing-library/issues/222
const vitestBrowserConditionPlugin: PluginOption = {
  name: 'vite-plugin-vitest-browser-condition',
  config({ resolve }) {
    if (process.env.VITEST) {
      resolve?.conditions?.unshift('browser');
    }
  },
};

/**
 * @see https://vitest.dev/config/#configuration
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [vitestBrowserConditionPlugin, svelteTesting()],
    test: {
      include: ['./test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      globals: true,
      environment: 'jsdom',
      watch: false,
      setupFiles: './test/setup.ts',
      clearMocks: true,
      reporters: 'dot',
      coverage: {
        enabled: true,
        reporter: ['text-summary', 'html'],
        include: ['src/**/*.{js,ts,svelte}'],
        exclude: [
          'src/**/*.d.ts',
          'src/routes/styleguide/**/*',
          'src/routes/+layout.*',
          ...coverageConfigDefaults.exclude,
        ],
        all: true,
        skipFull: true,
        reportOnFailure: true,
      },
    },
  }),
);
