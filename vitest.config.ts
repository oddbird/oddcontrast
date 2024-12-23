import { svelteTesting } from '@testing-library/svelte/vite';
import {
  coverageConfigDefaults,
  defineConfig,
  mergeConfig,
} from 'vitest/config';

import viteConfig from './vite.config.js';

/**
 * @see https://vitest.dev/config/#configuration
 */
export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [svelteTesting()],
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
